using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.Common;
using webNews.Models.ReceiverVoucherManagement;

namespace webNews.Domain.Repositories.ReceiverVoucherManagement
{
    public class ReceiverVoucherRepository : Repository<Payment>, IReceiverVoucherRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly ISystemRepository _systemRepository;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public ReceiverVoucherRepository(IWebNewsDbConnectionFactory connectionFactory, ISystemRepository systemRepository) : base(connectionFactory)
        {
            _systemRepository = systemRepository;
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Vw_ReceiverVoucher> GetList(SearchReceiverVoucher filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_ReceiverVoucher>();

                    if (!string.IsNullOrEmpty(filter.Code))
                    {
                        query.Where(_ => _.PaymentCode == filter.Code);
                    }

                    //More filter
                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<Vw_ReceiverVoucher>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<Vw_ReceiverVoucher>
                {
                    Total = 0,
                    DataList = new List<Vw_ReceiverVoucher>()
                };
            }
        }

        public Vw_ReceiverVoucher GetReceiverVoucher(int? id = null, string code = null)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_ReceiverVoucher>();
                    if (id != null)
                    {
                        query.Where(_ => _.Id == id);
                    }
                    if (code != null)
                    {
                        query.Where(_ => _.PaymentCode == code);
                    }
                    var payment = db.Single(query);
                    return payment;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Get GetReceiverVoucher error: " + ex.Message);
                return null;
            }
        }

        public int Cancel(string paymentCode)
        {
            using (var db = _connectionFactory.Open())
            {
                try
                {
                    var payment = db.Single<Payment>(x => x.PaymentCode == paymentCode);
                    if (payment != null)
                    {
                        payment.Status = (int)PaymentActive.Cancel;
                        db.Update(payment);
                        return 1;
                    }
                    return -1;
                }
                catch (Exception ex)
                {
                    _logger.Error(ex, "Insert invoice import error: " + ex.Message);
                    return -1;
                }
            }
        }

        public int Approve(string paymentCode)
        {
            using (var db = _connectionFactory.Open())
            {
                using (var trans = db.OpenTransaction())
                {
                    try
                    {
                        var payment = db.Single<Payment>(x => x.PaymentCode == paymentCode);
                        if (payment.PaymentType == false)
                        {
                            var invoice = db.Single<InvoiceImport>(x => x.Code == payment.InvoiceCode);
                            if (invoice != null)
                            {

                                invoice.PaidMoney += payment.PaymentMoney;
                                if (invoice.RemainMoney == 0)
                                {
                                    // TH có nhiều phiếu chi cho 1 hóa đơn và đã duyệt 1 cái, trước khi duyệt cái này
                                    return 3;
                                }
                                invoice.RemainMoney -= payment.PaymentMoney;
                                if (invoice.RemainMoney == 0)
                                {
                                    invoice.Active = (int)InvoiceStatus.Complete;
                                }
                                db.Update(invoice);
                            }
                        }
                        else
                        {
                            var invoice = db.Single<InvoiceOutport>(x => x.Code == payment.InvoiceCode);
                            if (invoice != null)
                            {

                                invoice.PaidMoney += payment.PaymentMoney;
                                if (invoice.RemainMoney == 0)
                                {
                                    // TH có nhiều phiếu chi cho 1 hóa đơn và đã duyệt 1 cái, trước khi duyệt cái này
                                    return 3;
                                }
                                invoice.RemainMoney -= payment.PaymentMoney;
                                if (invoice.RemainMoney == 0)
                                {
                                    invoice.Active = (int)InvoiceStatus.Complete;
                                }
                                db.Update(invoice);
                            }
                        }

                        if (payment != null)
                        {
                            payment.Status = (int)PaymentActive.Approve;
                            db.Update(payment);
                        }
                        trans.Commit();
                        return 1;
                    }
                    catch (Exception ex)
                    {
                        _logger.Error(ex, "Insert invoice import error: " + ex.Message);
                        return -1;
                    }
                }
            }
        }

        public int CreatePayment(Payment model)
        {
            using (var db = _connectionFactory.Open())
            {
                try
                {
                    if (!string.IsNullOrEmpty(model.InvoiceCode))
                    {
                        var invoice = db.Single<InvoiceImport>(x => x.Code == model.InvoiceCode);
                        model.Payments_Person = invoice.SupplierCode;
                        model.PersonType = (int)CustomerType.Supplier;
                    }
                    db.Insert(model);
                    return 1;
                }
                catch (Exception ex)
                {
                    _logger.Error(ex, "Create Payment error: " + ex.Message);
                    return -1;
                }
            }
        }

        public int UpdatePayment(Payment model)
        {
            using (var db = _connectionFactory.Open())
            {
                try
                {
                    var payment = db.Single<Payment>(x => x.Id == model.Id);
                    if (!string.IsNullOrEmpty(model.InvoiceCode))
                    {
                        var invoice = db.Single<InvoiceImport>(x => x.Code == model.InvoiceCode);
                        var rental = db.Single<InvoiceOutport>(x => x.Code == model.InvoiceCode);
                        if (model.ReceiverType == (int)ReceiverType.Deposit)
                        {
                            if (model.PaymentMoney < rental.TotalMoney)
                            {
                                payment.PaymentMoney = model.PaymentMoney;
                            }
                            var paymentDeposit = db.Single<Payment>(x => x.InvoiceCode == model.InvoiceCode);
                            paymentDeposit.PaymentMoney = model.PaymentMoney;
                            paymentDeposit.TotalMoney = model.PaymentMoney;
                        }
                        model.Payments_Person = invoice.SupplierCode;
                        model.PersonType = (int)CustomerType.Supplier;
                    }
                    
                    payment.PaymentMoney = model.PaymentMoney;
                    payment.Description = model.Description;


                    db.Update(payment);
                    return 1;
                }
                catch (Exception ex)
                {
                    _logger.Error(ex, "Update Payment error: " + ex.Message);
                    return -1;
                }
            }
        }
    }
}
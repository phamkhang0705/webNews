using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.InvoiceOutportManagement;
using webNews.Models;
using webNews.Models.Common;
using webNews.Models.InvoiceOutportManagement;

namespace webNews.Domain.Services.InvoiceOutportManagement
{
    public class InvoiceOutportService : Service<InvoiceOutport>, IInvoiceOutportService
    {
        private readonly ISystemRepository _systemRepository;
        private readonly IInvoiceOutportRepository _importRepository;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public InvoiceOutportService(IInvoiceOutportRepository importRepository, ISystemRepository systemRepository, IRepository<InvoiceOutport> repository) : base(repository)
        {
            _importRepository = importRepository;
            _systemRepository = systemRepository;
        }

        public CoreMessageResponse CancelInvoice(string invoiceCode)
        {
            try
            {
                var isCancel = _importRepository.UpdateStatusInvoice(invoiceCode, (int)InvoiceStatus.Canceld, null);
                if (isCancel == 1)
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "01",
                        ResponseMessage = "Hủy phiếu xuất thành công"
                    };
                }
                else
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Hủy phiếu xuất thất bại"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Cancel invoice error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Hủy phiếu xuất thất bại"
                };
            }
        }

        public CoreMessageResponse DeleteInvoice(string invoiceCode)
        {
            try
            {
                var isDelete = _importRepository.DeleteInvoice(invoiceCode);
                if (isDelete == 1)
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "01",
                        ResponseMessage = "Xóa phiếu xuất thành công"
                    };
                }
                else
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Xóa phiếu xuất thất bại"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Delete invoice error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Xóa phiếu xuất thất bại"
                };
            }
        }

        public CoreMessageResponse UpdateInvoice(string invoiceCode, int? status, DateTime? createDate, string note = null)
        {
            try
            {
                var isCancel = _importRepository.UpdateStatusInvoice(invoiceCode, status ?? -1, createDate, note);
                if (isCancel == 1)
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "01",
                        ResponseMessage = "Cập nhật phiếu xuất thành công"
                    };
                }
                else
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Cập nhật phiếu xuất thất bại"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Cancel invoice error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Cập nhật phiếu xuất thất bại"
                };
            }
        }

        public CoreMessageResponse UpdateInvoice(InvoiceOutportModel model)
        {
            try
            {
                var invoice = _importRepository.GetInvoiceByCode(model.Code);

                if (invoice == null)
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Cập nhật lỗi!"
                    };
                }
                //Insert InvoiceOutport
                invoice.CustomerCode = model.CustomerCode;
                invoice.TotalQuantity = model.TotalQuantity;
                invoice.TotalMoney = model.TotalMoney;
                invoice.DiscountType = model.DiscountType;
                invoice.Discount = model.Discount;
                invoice.VAT = model.VAT;
                invoice.SumMoney = model.SumMoney;
                invoice.PaidMoney = model.PaidMoney;
                invoice.RemainMoney = model.SumMoney - model.PaidMoney;
                invoice.PayMethod = model.PayMethod;
                invoice.BankCode = model.BankCode;
                invoice.UserName = model.UserName;
                invoice.CreatedDate = DateTime.Now;
                invoice.Date = model.CreatedDate;
                invoice.IsComplete = model.SumMoney - model.PaidMoney <= 0;
                invoice.Active = model.Active;
                invoice.Note = model.Note;
                invoice.InvoiceOutportDetails = new List<InvoiceOutportDetail>();
                if (model.CategoryItems != null)
                {
                    foreach (var item in model.CategoryItems)
                    {
                        var invoiceDetail = new InvoiceOutportDetail()
                        {
                            CategoryCode = item.Code,
                            Quantity = item.Quantity,
                            Price = item.Price,
                            TotalMoney = item.TotalMoney,
                            DateLimit = item.DateLimit
                        };
                        invoice.InvoiceOutportDetails.Add(invoiceDetail);
                    }
                }

                invoice.Payment = new Payment()
                {
                    PaymentCode = _systemRepository.CodeGen(ObjectType.ReceiveVoucher, PrefixType.ReceiveVoucher),
                    UserName = model.UserName,
                    CreatedDate = model.CreatedDate,
                    PaymentMethod = model.PayMethod,
                    Description = model.Note,
                    TotalMoney = model.PaidMoney,
                    PersonType = (int)PersonType.Customer,
                    Payments_Person = model.CustomerCode,
                    BankCode = model.BankCode,
                    Status = model.Active,
                    InvoiceCode = invoice.Code,
                    RemainMoney = model.RemainMoney,
                    PaymentType = false
                };

                var res = _importRepository.UpdateInvoice(invoice);
                if (res > 0)
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "01",
                        ResponseMessage = "Thêm phiếu xuất thành công!"
                    };
                }
                else
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Có lỗi sảy ra!"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Insert invoice import error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Có lỗi hệ thống!"
                };
            }
        }

        public CoreMessageResponse CustomCreate(InvoiceOutportModel model)
        {
            try
            {
                var code = string.IsNullOrEmpty(model.Code) ? _systemRepository.CodeGen(ObjectType.InvoiceOutport, PrefixType.InvoiceOutport) : model.Code;
                //Insert InvoiceOutport
                var invoice = new InvoiceOutport
                {
                    Code = code,
                    CustomerCode = model.CustomerCode,
                    TotalQuantity = model.TotalQuantity,
                    TotalMoney = model.TotalMoney,
                    DiscountType = model.DiscountType,
                    Discount = model.Discount,
                    VAT = model.VAT,
                    SumMoney = model.SumMoney,
                    PaidMoney = model.PaidMoney,
                    RemainMoney = model.SumMoney - model.PaidMoney,
                    PayMethod = model.PayMethod,
                    BankCode = model.BankCode,
                    UserName = model.UserName,
                    CreatedDate = DateTime.Now,
                    CreatedBy = model.CreatedBy,
                    Date = model.CreatedDate,
                    Active = model.Active,
                    Note = model.Note,
                    Type = model.Type,
                    InvoiceOutportDetails = new List<InvoiceOutportDetail>()
                };
                invoice.Date = invoice.Date == DateTime.MinValue ? DateTime.Now : invoice.Date;
                if (model.CategoryItems != null)
                {
                    //Insert InvoiceOutportDetail
                    foreach (var item in model.CategoryItems)
                    {
                        var invoiceDetail = new InvoiceOutportDetail()
                        {
                            CategoryCode = item.Code,
                            Quantity = item.Quantity,
                            Price = item.Price,
                            TotalMoney = item.TotalMoney,
                        };
                        invoice.InvoiceOutportDetails.Add(invoiceDetail);
                    }
                }

                invoice.Payment = new Payment()
                {
                    PaymentCode = _systemRepository.CodeGen(ObjectType.ReceiveVoucher, PrefixType.ReceiveVoucher),
                    UserName = model.UserName,
                    CreatedDate = DateTime.Now,
                    PaymentMethod = model.PayMethod,
                    Description = model.Note,
                    TotalMoney = model.PaidMoney,
                    PersonType = (int)PersonType.Customer,
                    Payments_Person = model.CustomerCode,
                    BankCode = model.BankCode,
                    Status = model.Active,
                    InvoiceCode = invoice.Code,
                    RemainMoney = model.RemainMoney,
                    PaymentType = false,
                    CreatedBy = model.CreatedBy
                };

                var res = _importRepository.CreateInvoice(invoice);
                if (res > 0)
                {
                    if (res == 3)
                    {
                        return new CoreMessageResponse
                        {
                            ResponseCode = "00",
                            ResponseMessage = "Không đủ số lượng trong kho!"
                        };
                    }
                    return new CoreMessageResponse
                    {
                        ResponseCode = "01",
                        ResponseMessage = "Thêm phiếu xuất thành công!"
                    };
                }
                else
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Có lỗi sảy ra!"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Insert invoice import error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Có lỗi hệ thống!"
                };
            }
        }

        public bool Import(List<InvoiceOutportModel> model)
        {
            var result = false;
            try
            {
                //using (var scope = new TransactionScope(TransactionScopeOption.RequiresNew,
                //          new TransactionOptions { IsolationLevel = IsolationLevel.ReadUncommitted, Timeout = new TimeSpan(1, 0, 0) }))
                //{
                //                foreach (var item in model)
                //                {
                //                    var code = string.IsNullOrEmpty(item.Code) ? _systemRepository.CodeGen(ObjectType.InvoiceOutport, PrefixType.InvoiceOutport) : item.Code;
                //                    //Insert InvoiceOutport
                //                    var invoice = new InvoiceOutport
                //                    {
                //                        Code = code,
                //                        ProviderCode = item.ProviderCode,
                //                        TotalQuantity = item.TotalQuantity,
                //                        TotalMonney = item.TotalMoney,
                //                        DiscountType = item.DiscountType,
                //                        Discount = item.Discount,
                //                        VAT = item.VAT,
                //                        SumMonney = item.SumMonney,
                //                        PaidMonney = item.PaidMoney,
                //                        RemainMonney = item.AddToProvider ? 0 : item.SumMonney - item.PaidMoney,
                //                        PayMethod = item.PayMethod,
                //                        BankCode = item.BankCode,
                //                        UserName = item.UserName,
                //                        CreateDate = DateTime.Now,
                //                        Date = item.CreateDate,
                //                        //Truong hợp trả NCC hết nợ hoặc đã add dư nợ NCC => phiếu đã hoàn thành
                //                        IsComplete = item.SumMonney - item.PaidMoney <= 0 || (item.AddToProvider ? true : false),
                //                        BranchCode = item.BranchCode,
                //                        Active = item.Active,
                //                        StoreId = item.StoreId,
                //                        Note = item.Note,
                //                        Domain = item.Domain,
                //                        Type = item.Type,
                //                        InvoiceOutportDetails = new List<InvoiceOutport_DETAIL>()
                //                    };
                //                    invoice.Date = invoice.Date == DateTime.MinValue ? DateTime.Now : invoice.Date;
                //                    if (item.ProductItems != null)
                //                    {
                //                        //Insert InvoiceOutportDetail
                //                        foreach (var it in item.ProductItems)
                //                        {
                //                            var invoiceDetail = new InvoiceOutport_DETAIL
                //                            {
                //                                ProductCode = it.ProductCode,
                //                                Quantity = it.Quantity,
                //                                Price = it.PriceInput,
                //                                TotalMonney = it.TotalMoney,
                //                                DateLimit = it.DateLimit,
                //                                Domain = item.Domain
                //                            };
                //
                //                            invoice.InvoiceOutportDetails.Add(invoiceDetail);
                //                        }
                //                    }
                //
                //                    invoice.Payment = new PAYMENT
                //                    {
                //                        Payments_Code = _systemRepository.CodeGen(ObjectType.Payment, PrefixType.Payment),
                //                        Payments_UserName = item.UserName,
                //                        Payments_CreatDate = item.CreateDate,
                //                        Payments_Method = item.PayMethod,
                //                        Payments_Decription = item.Note,
                //                        Payments_TotalMoney = item.PaidMoney,
                //                        Payments_PersonType = (int)PersonType.Provider,
                //                        Payments_Person = item.ProviderCode,
                //                        Payments_Accounting = true,     //Default
                //                        Payments_BankCode = item.BankCode,
                //                        Payments_Active = item.Active,
                //                        InvoiceCode = invoice.Code,
                //                        Payments_BranchCode = item.BranchCode,
                //                        Domain = item.Domain,
                //                        RemainMonney = item.RemainMoney,
                //                        Payments_Type = false
                //                    };
                var invoice = new InvoiceOutport();
                var res = _importRepository.CreateInvoice(invoice);
                if (res > 0)
                {
                    result = true;
                }
                else
                {
                    result = false;
                    //                        break;
                }
                //}
                //if (result)
                //    scope.Complete();
                //                }
                return result;
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Insert invoice import error: " + ex.Message);
                return false;
            }
        }

        //        public PagingObject<PAYMENT> GetHistory(string invoiceCode, int pageIndex, int pageSize)
        //        {
        //            var query = db.From<PAYMENT>();
        //
        //            if (!string.IsNullOrEmpty(invoiceCode)) query.Where(x => x.InvoiceCode == invoiceCode);
        //            query.OrderByDescending(x => x.Payments_CreatDate);
        //
        //            return  _systemRepository.Paging(query, pageIndex, pageSize);
        //        }

        public Vw_InvoiceOutport GetInvoiceOutportByCode(string invoiceCode)
        {
            return _importRepository.GetInvoiceOutportByCode(invoiceCode);
        }

        public PagingObject<Vw_InvoiceOutport> Search(SearchInvoiceOutport search, int pageIndex, int pageSize)
        {
            var query = db.From<Vw_InvoiceOutport>();

            if (!string.IsNullOrEmpty(search.Code)) query.Where(x => x.Code == search.Code);
            query.Where(x => x.Type == search.Type);
            if (search.Status != null && search.Status != -1) query.Where(x => x.Active == search.Status);
            if (DateTime.MinValue != search.FromDate && DateTime.MinValue != search.ToDate)
            {
                query.Where(x => x.CreatedDate < search.ToDate && x.CreatedDate >= search.FromDate);
            }
            query.OrderByDescending(x => x.CreatedDate);
            return _systemRepository.Paging(query, pageIndex, pageSize);
        }

        public List<Vw_InvoiceOutport_Detail> GetInvoiceDetails(int invoiceId)
        {
            return _importRepository.GetInvoiceDetails(invoiceId);
        }
    }
}
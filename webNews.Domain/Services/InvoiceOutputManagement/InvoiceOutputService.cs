using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.InvoiceOutputManagement;
using webNews.Models;
using webNews.Models.Common;
using webNews.Models.InvoiceOutputManagement;

namespace webNews.Domain.Services.InvoiceOutputManagement
{
    public class InvoiceOutputService : Service<InvoiceOutput>, IInvoiceOutputService
    {
        private readonly ISystemRepository _systemRepository;
        private readonly IInvoiceOutputRepository _importRepository;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public InvoiceOutputService(IInvoiceOutputRepository importRepository, ISystemRepository systemRepository, IRepository<InvoiceOutput> repository) : base(repository)
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
                        ResponseMessage = "Hủy phiếu nhập thành công"
                    };
                }
                else
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Hủy phiếu nhập thất bại"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Cancel invoice error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Hủy phiếu nhập thất bại"
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
                        ResponseMessage = "Xóa phiếu nhập thành công"
                    };
                }
                else
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Xóa phiếu nhập thất bại"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Delete invoice error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Xóa phiếu nhập thất bại"
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
                        ResponseMessage = "Cập nhật phiếu nhập thành công"
                    };
                }
                else
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Cập nhật phiếu nhập thất bại"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Cancel invoice error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Cập nhật phiếu nhập thất bại"
                };
            }
        }

        public CoreMessageResponse UpdateInvoice(InvoiceOutputModel model)
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
                //Insert InvoiceOutput
                invoice.SupplierCode = model.SupplierCode;
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
                invoice.InvoiceOutputDetails = new List<InvoiceOutputDetail>();
                if (model.CategoryItems != null)
                {
                    foreach (var item in model.CategoryItems)
                    {
                        var invoiceDetail = new InvoiceOutputDetail()
                        {
                            CategoryCode = item.Code,
                            Quantity = item.Quantity,
                            Price = item.PriceInput,
                            TotalMoney = item.TotalMoney,
                            DateLimit = item.DateLimit
                        };
                        invoice.InvoiceOutputDetails.Add(invoiceDetail);
                    }
                }

                invoice.Payment = new Payment()
                {
                    PaymentCode = _systemRepository.CodeGen(ObjectType.PaymentVoucher, PrefixType.PaymentVoucher),
                    UserName = model.UserName,
                    CreatedDate = model.CreatedDate,
                    PaymentMethod = model.PayMethod,
                    Description = model.Note,
                    TotalMoney = model.PaidMoney,
                    PersonType = (int)PersonType.Provider,
                    Payments_Person = model.SupplierCode,
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
                        ResponseMessage = "Thêm phiếu nhập thành công!"
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

        public CoreMessageResponse CustomCreate(InvoiceOutputModel model)
        {
            try
            {
                var code = string.IsNullOrEmpty(model.Code) ? _systemRepository.CodeGen(ObjectType.InvoiceOutput, PrefixType.InvoiceOutput) : model.Code;
                //Insert InvoiceOutput
                var invoice = new InvoiceOutput
                {
                    Code = code,
                    SupplierCode = model.SupplierCode,
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
                    InvoiceOutputDetails = new List<InvoiceOutputDetail>()
                };
                invoice.Date = invoice.Date == DateTime.MinValue ? DateTime.Now : invoice.Date;
                if (model.CategoryItems != null)
                {
                    //Insert InvoiceOutputDetail
                    foreach (var item in model.CategoryItems)
                    {
                        var invoiceDetail = new InvoiceOutputDetail()
                        {
                            CategoryCode = item.Code,
                            Quantity = item.Quantity,
                            Price = item.PriceInput,
                            TotalMoney = item.TotalMoney,
                        };
                        invoice.InvoiceOutputDetails.Add(invoiceDetail);
                    }
                }

                invoice.Payment = new Payment()
                {
                    PaymentCode = _systemRepository.CodeGen(ObjectType.PaymentVoucher, PrefixType.PaymentVoucher),
                    UserName = model.UserName,
                    CreatedDate = DateTime.Now,
                    PaymentMethod = model.PayMethod,
                    Description = model.Note,
                    TotalMoney = model.PaidMoney,
                    PersonType = (int)PersonType.Provider,
                    Payments_Person = model.SupplierCode,
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
                    return new CoreMessageResponse
                    {
                        ResponseCode = "01",
                        ResponseMessage = "Thêm phiếu nhập thành công!"
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

        public bool Import(List<InvoiceOutputModel> model)
        {
            var result = false;
            try
            {
                //using (var scope = new TransactionScope(TransactionScopeOption.RequiresNew,
                //          new TransactionOptions { IsolationLevel = IsolationLevel.ReadUncommitted, Timeout = new TimeSpan(1, 0, 0) }))
                //{
                //                foreach (var item in model)
                //                {
                //                    var code = string.IsNullOrEmpty(item.Code) ? _systemRepository.CodeGen(ObjectType.InvoiceOutput, PrefixType.InvoiceOutput) : item.Code;
                //                    //Insert InvoiceOutput
                //                    var invoice = new InvoiceOutput
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
                //                        InvoiceOutputDetails = new List<InvoiceOutput_DETAIL>()
                //                    };
                //                    invoice.Date = invoice.Date == DateTime.MinValue ? DateTime.Now : invoice.Date;
                //                    if (item.ProductItems != null)
                //                    {
                //                        //Insert InvoiceOutputDetail
                //                        foreach (var it in item.ProductItems)
                //                        {
                //                            var invoiceDetail = new InvoiceOutput_DETAIL
                //                            {
                //                                ProductCode = it.ProductCode,
                //                                Quantity = it.Quantity,
                //                                Price = it.PriceInput,
                //                                TotalMonney = it.TotalMoney,
                //                                DateLimit = it.DateLimit,
                //                                Domain = item.Domain
                //                            };
                //
                //                            invoice.InvoiceOutputDetails.Add(invoiceDetail);
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
                var invoice = new InvoiceOutput();
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

        public Vw_InvoiceOutput GetInvoiceOutputByCode(string invoiceCode)
        {
            return _importRepository.GetInvoiceOutputByCode(invoiceCode);
        }

        public PagingObject<Vw_InvoiceOutput> Search(SearchInvoiceOutput search, int pageIndex, int pageSize)
        {
            var query = db.From<Vw_InvoiceOutput>();

            if (!string.IsNullOrEmpty(search.Code)) query.Where(x => x.Code == search.Code);
            if (search.Status != null && search.Status != -1) query.Where(x => x.Active == search.Status);
            if (DateTime.MinValue != search.FromDate && DateTime.MinValue != search.ToDate)
            {
                query.Where(x => x.CreatedDate < search.ToDate && x.CreatedDate >= search.FromDate);
            }
            query.OrderByDescending(x => x.CreatedDate);
            return _systemRepository.Paging(query, pageIndex, pageSize);
        }

        public List<Vw_InvoiceOutput_Detail> GetInvoiceDetails(int invoiceId)
        {
            return _importRepository.GetInvoiceDetails(invoiceId);
        }
    }
}
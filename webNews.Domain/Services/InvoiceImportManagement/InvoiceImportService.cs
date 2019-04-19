using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.InvoiceImportManagement;
using webNews.Models;
using webNews.Models.Common;
using webNews.Models.InvoiceImportManagement;

namespace webNews.Domain.Services.InvoiceImportManagement
{
    public class InvoiceImportService : Service<InvoiceImport>, IInvoiceImportService
    {
        private readonly ISystemRepository _systemRepository;
        private readonly IInvoiceImportRepository _importRepository;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public InvoiceImportService(IInvoiceImportRepository importRepository, ISystemRepository systemRepository, IRepository<InvoiceImport> repository) : base(repository)
        {
            _importRepository = importRepository;
            _systemRepository = systemRepository;
        }

        public CoreMessageResponse CancleInvoice(string invoiceCode)
        {
            try
            {
                var isCancle = _importRepository.UpdateStatusInvoice(invoiceCode, (int)InvoiceStatus.Cancled, null);
                if (isCancle == 1)
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
                _logger.Error(ex, "Cancle invoice error: " + ex.Message);
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
                var isCancle = _importRepository.UpdateStatusInvoice(invoiceCode, status ?? -1, createDate, note);
                if (isCancle == 1)
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
                _logger.Error(ex, "Cancle invoice error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Cập nhật phiếu nhập thất bại"
                };
            }
        }

        public CoreMessageResponse UpdateInvoice(InvoiceImportModel model)
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

                //Insert InvoiceImport

                invoice.ProviderCode = model.ProviderCode;
                invoice.TotalQuantity = model.TotalQuantity;
                //                invoice.TotalMonney = model.TotalMoney;
                invoice.DiscountType = model.DiscountType;
                invoice.Discount = model.Discount;
                invoice.VAT = model.VAT;
                //                invoice.SumMonney = model.SumMonney;
                //                invoice.PaidMonney = model.PaidMoney;
                //                invoice.RemainMonney = model.AddToProvider ? 0 : model.SumMonney - model.PaidMoney;
                invoice.PayMethod = model.PayMethod;
                //                invoice.BankCode = model.BankCode;
                invoice.UserName = model.UserName;
                //                invoice.CreateDate = DateTime.Now;
                invoice.Date = model.CreateDate;
                //Truong hợp trả NCC hết nợ hoặc đã add dư nợ NCC => phiếu đã hoàn thành
                //                invoice.IsComplete = model.SumMonney - model.PaidMoney <= 0 || (model.AddToProvider ? true : false);
                //                invoice.BranchCode = model.BranchCode;
                invoice.Active = model.Active;
                //                invoice.StoreId = model.StoreId;
                invoice.Note = model.Note;
                //                invoice.Domain = model.Domain;
                //                invoice.InvoiceImportDetails = new List<InvoiceImport_DETAIL>();

                if (model.ProductItems != null)
                {
                    //Insert InvoiceImportDetail
                    foreach (var item in model.ProductItems)
                    {
                        var invoiceDetail = new InvoiceImportDetail()
                        {
                            ProductCode = item.ProductCode,
                            Quantity = item.Quantity,
                            Price = item.PriceInput,
                            //                            TotalMonney = item.TotalMoney,
                            DateLimit = item.DateLimit,
                            //                            Domain = model.Domain
                        };

                        //                        invoice.InvoiceImportDetails.Add(invoiceDetail);
                    }
                }

                //                invoice.Payment = new PAYMENT
                //                {
                //                    Payments_Code = _systemRepository.CodeGen(ObjectType.Payment, PrefixType.Payment),
                //                    Payments_UserName = model.UserName,
                //                    Payments_CreatDate = model.CreateDate,
                //                    Payments_Method = model.PayMethod,
                //                    Payments_Decription = model.Note,
                //                    Payments_TotalMoney = model.PaidMoney,
                //                    Payments_PersonType = (int)PersonType.Provider,
                //                    Payments_Person = model.ProviderCode,
                //                    Payments_Accounting = true,     //Default
                //                    Payments_BankCode = model.BankCode,
                //                    Payments_Active = 3,
                //                    InvoiceCode = invoice.Code,
                //                    Payments_BranchCode = model.BranchCode,
                //                    Domain = model.Domain,
                //                    RemainMonney = model.RemainMoney
                //                };

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

        public CoreMessageResponse CustomCreate(InvoiceImportModel model)
        {
            try
            {
                //                var code = string.IsNullOrEmpty(model.Code) ? _systemRepository.CodeGen(ObjectType.InvoiceImport, PrefixType.InvoiceImport) : model.Code;
                //                //Insert InvoiceImport
                //                var invoice = new InvoiceImport
                //                {
                //                    Code = code,
                //                    ProviderCode = model.ProviderCode,
                //                    TotalQuantity = model.TotalQuantity,
                //                    TotalMonney = model.TotalMoney,
                //                    DiscountType = model.DiscountType,
                //                    Discount = model.Discount,
                //                    VAT = model.VAT,
                //                    SumMonney = model.SumMonney,
                //                    PaidMonney = model.PaidMoney,
                //                    RemainMonney = model.AddToProvider ? 0 : model.SumMonney - model.PaidMoney,
                //                    PayMethod = model.PayMethod,
                //                    BankCode = model.BankCode,
                //                    UserName = model.UserName,
                //                    CreateDate = DateTime.Now,
                //                    Date = model.CreateDate,
                //                    //Truong hợp trả NCC hết nợ hoặc đã add dư nợ NCC => phiếu đã hoàn thành
                //                    IsComplete = model.SumMonney - model.PaidMoney <= 0 || (model.AddToProvider ? true : false),
                //                    BranchCode = model.BranchCode,
                //                    Active = model.Active,
                //                    StoreId = model.StoreId,
                //                    Note = model.Note,
                //                    Domain = model.Domain,
                //                    Type = model.Type,
                //                    InvoiceImportDetails = new List<InvoiceImport_DETAIL>()
                //                };
                //                invoice.Date = invoice.Date == DateTime.MinValue ? DateTime.Now : invoice.Date;
                //                if (model.ProductItems != null)
                //                {
                //                    //Insert InvoiceImportDetail
                //                    foreach (var item in model.ProductItems)
                //                    {
                //                        var invoiceDetail = new InvoiceImport_DETAIL
                //                        {
                //                            ProductCode = item.ProductCode,
                //                            Quantity = item.Quantity,
                //                            Price = item.PriceInput,
                //                            TotalMonney = item.TotalMoney,
                //                            Domain = model.Domain
                //                        };
                //                        if (item.DateLimit != DateTime.MinValue)
                //                            invoiceDetail.DateLimit = item.DateLimit;
                //                        invoice.InvoiceImportDetails.Add(invoiceDetail);
                //                    }
                //                }
                //
                //                invoice.Payment = new PAYMENT
                //                {
                //                    Payments_Code = _systemRepository.CodeGen(ObjectType.Payment, PrefixType.Payment),
                //                    Payments_UserName = model.UserName,
                //                    Payments_CreatDate = model.CreateDate,
                //                    Payments_Method = model.PayMethod,
                //                    Payments_Decription = model.Note,
                //                    Payments_TotalMoney = model.PaidMoney,
                //                    Payments_PersonType = (int)PersonType.Provider,
                //                    Payments_Person = model.ProviderCode,
                //                    Payments_Accounting = true,     //Default
                //                    Payments_BankCode = model.BankCode,
                //                    Payments_Active = model.Active,
                //                    InvoiceCode = invoice.Code,
                //                    Payments_BranchCode = model.BranchCode,
                //                    Domain = model.Domain,
                //                    RemainMonney = model.RemainMoney,
                //                    Payments_Type = false
                //                };
                var invoice = new InvoiceImport();
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

        public bool Import(List<InvoiceImportModel> model)
        {
            var result = false;
            try
            {
                //using (var scope = new TransactionScope(TransactionScopeOption.RequiresNew,
                //          new TransactionOptions { IsolationLevel = IsolationLevel.ReadUncommitted, Timeout = new TimeSpan(1, 0, 0) }))
                //{
//                foreach (var item in model)
//                {
//                    var code = string.IsNullOrEmpty(item.Code) ? _systemRepository.CodeGen(ObjectType.InvoiceImport, PrefixType.InvoiceImport) : item.Code;
//                    //Insert InvoiceImport
//                    var invoice = new InvoiceImport
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
//                        InvoiceImportDetails = new List<InvoiceImport_DETAIL>()
//                    };
//                    invoice.Date = invoice.Date == DateTime.MinValue ? DateTime.Now : invoice.Date;
//                    if (item.ProductItems != null)
//                    {
//                        //Insert InvoiceImportDetail
//                        foreach (var it in item.ProductItems)
//                        {
//                            var invoiceDetail = new InvoiceImport_DETAIL
//                            {
//                                ProductCode = it.ProductCode,
//                                Quantity = it.Quantity,
//                                Price = it.PriceInput,
//                                TotalMonney = it.TotalMoney,
//                                DateLimit = it.DateLimit,
//                                Domain = item.Domain
//                            };
//
//                            invoice.InvoiceImportDetails.Add(invoiceDetail);
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
                    var invoice = new InvoiceImport();
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

        public InvoiceImport GetInvoiceImportByCode(string invoiceCode)
        {
            return _importRepository.GetInvoiceImportByCode(invoiceCode);
        }

        public PagingObject<Vw_InvoiceImport> Search(SearchInvoiceImport search, int pageIndex, int pageSize)
        {
            var query = db.From<Vw_InvoiceImport>();

            if (!string.IsNullOrEmpty(search.Code)) query.Where(x => x.Code == search.Code);
            //            if (!string.IsNullOrEmpty(search.ProviderCode) && search.ProviderCode != "-1") query.Where(x => x.ProviderCode == search.ProviderCode);
            if (search.Status != null && search.Status != -1) query.Where(x => x.Active == search.Status);
            //            if (DateTime.MinValue != search.FromDate && DateTime.MinValue != search.ToDate)
            //            {
            //                query.Where(x => x.CreateDate < search.ToDate && x.CreateDate >= search.FromDate);
            //            }
            //            query.OrderByDescending(x => x.CreateDate);

            return _systemRepository.Paging(query, pageIndex, pageSize);
        }
    }
}
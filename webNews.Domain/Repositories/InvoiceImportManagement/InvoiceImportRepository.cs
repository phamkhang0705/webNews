using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.Common;
using webNews.Models.InvoiceImportManagement;

namespace webNews.Domain.Repositories.InvoiceImportManagement
{
    public class InvoiceImportRepository : Repository<InvoiceImport>, IInvoiceImportRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly ISystemRepository _systemRepository;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public InvoiceImportRepository(IWebNewsDbConnectionFactory connectionFactory, ISystemRepository systemRepository) : base(connectionFactory)
        {
            _systemRepository = systemRepository;
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Vw_InvoiceImport> GetList(SearchInvoiceImport filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_InvoiceImport>();

                    if (!string.IsNullOrEmpty(filter.Code))
                    {
                        query.Where(_ => _.Code == filter.Code);
                    }

                    //More filter
                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<Vw_InvoiceImport>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<Vw_InvoiceImport>
                {
                    Total = 0,
                    DataList = new List<Vw_InvoiceImport>()
                };
            }
        }

        public List<InvoiceImport> GetInvoiceImport()
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<InvoiceImport>();
                    return db.Select(query);
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Get invoice error: " + ex.Message);
                return new List<InvoiceImport>();
            }
        }

        public Vw_InvoiceImport GetInvoiceImportByCode(string invoiceCode)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_InvoiceImport>();
                    if (!string.IsNullOrEmpty(invoiceCode))
                    {
                        query.Where(_ => _.Code == invoiceCode);
                        return db.Single(query);
                    }
                    return new Vw_InvoiceImport();
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Get invoice error: " + ex.Message);
                return new Vw_InvoiceImport();
            }
        }

        public InvoiceImport GetInvoiceByCode(string invoiceCode)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<InvoiceImport>();
                    query.Where(_ => _.Code == invoiceCode);

                    var invoice = db.Single(query);

                    return invoice;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Get invoice error: " + ex.Message);
                return null;
            }
        }

        public List<Vw_InvoiceImport_Detail> GetInvoiceDetails(int invoiceId)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_InvoiceImport_Detail>();
                    query.Where(_ => _.InvoiceImportId == invoiceId);

                    var invoice = db.Select(query);

                    return invoice;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Get invoice error: " + ex.Message);
                return new List<Vw_InvoiceImport_Detail>();
            }
        }

        public long DeleteInvoice(string invoiceCode)
        {
            using (var db = _connectionFactory.Open())
            {
                using (var trans = db.OpenTransaction())
                {
                    try
                    {
                        var model = db.Single<InvoiceImport>(_ => _.Code == invoiceCode);
                        if (model == null) return -1;
                        if (model.Active != (int)InvoiceStatus.Draff) return -1;
                        //Chỉ xóa phiếu tạm
                        model.InvoiceImportDetails =
                            db.Select<InvoiceImportDetail>(_ => _.InvoiceImportId == model.Id);
                        foreach (var item in model.InvoiceImportDetails)
                        {
                            db.Delete(item);
                        }
                        db.Delete(model);
                        trans.Commit();
                        return 1;
                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        _logger.Error(ex, "Delete invoice import error: " + ex.Message);
                        return -1;
                    }
                }
            }
        }

        /// <summary>
        /// Hàm chỉ 2 chức năng
        /// 1. Update ngày in và note
        /// 2. Hủy phiếu từ đang hoạt động về đã hủy
        /// </summary>
        /// <param name="invoiceCode"></param>
        /// <param name="status"></param>
        /// <param name="date"></param>
        /// <param name="note"></param>
        /// <returns></returns>
        public long UpdateStatusInvoice(string invoiceCode, int status, DateTime? date, string note = null)
        {
            using (var db = _connectionFactory.Open())
            {
                using (var trans = db.OpenTransaction())
                {
                    try
                    {
                        var model = db.Single<InvoiceImport>(_ => _.Code == invoiceCode);
                        if (model == null) return -1;
                        if (model.Active == (int)InvoiceStatus.Cancel) return -1;   //Trạng thái phiếu đã hủy - Không update
                        //Chỉ update ngày in với ghi chú - Không update trạng thái
                        if (status == -1)
                        {
                            if (date != null) model.Date = date;
                            model.Note = note;
                            //Update Invoice import
                            db.Update(model);
                        }
                        else if (model.Active == (int)InvoiceStatus.Active && status == (int)InvoiceStatus.Cancel)//Update trạng thái phiếu nhập
                        {
                            model.Active = (int)InvoiceStatus.Cancel;
                            //Update Invoice import
                            db.Update(model);

                            //                            model.InvoiceImportDetails =
                            //                                db.Select<InvoiceImport_DETAIL>(_ => _.InvoiceImportId == model.Id);

                            //Update product in store
                            //                            if (model.InvoiceImportDetails != null)
                            //                            {
                            //                                foreach (var detail in model.InvoiceImportDetails)
                            //                                {
                            //                                    var pro =  db.Single<PRODUCT>(_ => _.ProductCode == detail.ProductCode);
                            //                                    var proDetail =
                            //                                        
                            //                                            db.Single<PRODUCT_DETAIL>(
                            //                                                _ =>
                            //                                                    _.ProductCode == detail.ProductCode &&
                            //                                                    _.BranchCode == model.BranchCode && _.StoreId == model.StoreId);
                            //
                            //                                    if (pro != null)
                            //                                    {
                            //                                        pro.Quantity = pro.Quantity - detail.Quantity;  //Số lượng sản phẩm cũ = số lượng mới - số lượng hủy
                            //                                        //Giá TB cũ = (Giá mới * (Số lượng cũ + Số lượng hủy) - (Số lượng hủy * Giá TB Hủy)) / Số lượng tồn cũ
                            //                                        if (pro.Quantity == 0) proDetail.PriceInput = 0;
                            //                                        else
                            //                                            pro.PriceInput = (((double) pro.PriceInput * (pro.Quantity + detail.Quantity)) -
                            //                                                          (detail.Quantity*detail.Price))/pro.Quantity;
                            //
                            //                                        pro.PriceInput = Math.Round((pro.PriceInput ?? 0) * 100) / 100;
                            //                                         db.Update(pro);
                            //                                    }
                            //
                            //                                    if (proDetail != null)
                            //                                    {
                            //                                        proDetail.Quantity = proDetail.Quantity - detail.Quantity;
                            //                                        if (proDetail.Quantity == 0) proDetail.PriceInput = 0;
                            //                                        else
                            //                                        proDetail.PriceInput = (((double)proDetail.PriceInput * (proDetail.Quantity + detail.Quantity)) -
                            //                                                          (detail.Quantity * detail.Price)) / proDetail.Quantity;
                            //
                            //                                        proDetail.PriceInput = Math.Round((proDetail.PriceInput ?? 0) * 100) / 100;
                            //                                         db.Update(proDetail);
                            //
                            //                                    }
                            //                                }

                            //                                //Tạo phiếu thu
                            //                                db.Insert(new PAYMENT
                            //                                {
                            //                                    Payments_Code = _systemRepository.CodeGen(ObjectType.Receipt, PrefixType.Receipt),
                            //                                    InvoiceCode = model.Code,
                            //                                    Payments_UserName = model.UserName,
                            //                                    Payments_CreatDate = model.CreateDate.Value,
                            //                                    Payments_Method = 1,    //Mặc định là tiền mặt
                            //                                    Payments_Decription = $"Hủy phiếu nhập {model.Code} ngày {model.CreateDate:dd-MM-yyyy}",
                            //                                    Payments_TotalMoney = (double)model.SumMonney,
                            //                                    RemainMonney = 0,
                            //                                    Payments_PersonType = (int)PersonType.Provider,
                            //                                    Payments_Person = model.ProviderCode,
                            //                                    Payments_Accounting = true,     //Default
                            //                                    Payments_Active = 1,
                            //                                    Payments_Type = true,
                            //                                    Payments_BranchCode = model.BranchCode,
                            //                                    Domain = model.Domain
                            //                                });
                            //                            }
                        }

                        trans.Commit();
                        return 1;
                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        _logger.Error(ex, "Insert invoice import error: " + ex.Message);
                        return -1;
                    }
                }
            }
        }

        /// <summary>
        /// Hàm mở lại phiếu
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public long UpdateInvoice(InvoiceImport model)
        {
            using (var db = _connectionFactory.Open())
            {
                using (var trans = db.OpenTransaction())
                {
                    try
                    {
                        #region Tạo thông tin phiếu nhập

                        db.Update(model);

                        if (model.InvoiceImportDetails != null)
                        {
                            db.Delete<InvoiceImportDetail>(_ => _.InvoiceImportId == model.Id);

                            foreach (var item in model.InvoiceImportDetails)
                            {
                                if (item.DateLimit == DateTime.MinValue)
                                    item.DateLimit = null;
                                item.InvoiceImportId = model.Id;
                                db.Insert(item);
                            }
                        }
                        #endregion

                        #region Trạng thái phiếu là hoạt đông - Update thông tin sản phẩm trong kho.  Tạo phiếu chi

                        //Update product in store
                        if (model.Active != null && model.Active == (int)InvoiceStatus.Active && model.InvoiceImportDetails != null)
                        {
                            //Create payment invoice
                            db.Insert(model.Payment);

                            //Update product and product detail
                            foreach (var detail in model.InvoiceImportDetails)
                            {
                                if (model.Type == 1)
                                {
                                    for (var i = 0; i < detail.Quantity; i++)
                                    {
                                        var cate = db.Single<Category>(x => x.Code == detail.CategoryCode);
                                        var pro = new Product()
                                        {
                                            CategoryId = cate.Id,
                                            ProductCode = detail.CategoryCode,
                                            ProductName = cate.Name,
                                            Quantity = 1,
                                            Inventory = 1,
                                            PriceInput = detail.Price,
                                            Status = 1,
                                            Description = "",
                                            CreatedBy = model.CreatedBy,
                                            CreatedDate = DateTime.Now
                                        };
                                        db.Insert(pro);
                                    }
                                }
                                if (model.Type == 2)
                                {
                                    var cate = db.Single<Category>(x => x.Code == detail.CategoryCode);
                                    var cateDetail = db.Single<CategoryDetail>(_ => _.CategoryId == cate.Id);

                                    if (cateDetail != null)
                                    {
                                        cateDetail.PriceInput = detail.Price;
                                        cateDetail.Quantity = cateDetail.Quantity + detail.Quantity;
                                        cateDetail.UpdatedBy = model.CreatedBy;
                                        cateDetail.UpdatedDate = DateTime.Now;
                                        db.Update(cateDetail);
                                    }
                                    else
                                    {
                                        cateDetail = new CategoryDetail()
                                        {
                                            CategoryId = cate.Id,
                                            PriceInput = detail.Price,
                                            Quantity = detail.Quantity,
                                            CreatedBy = model.CreatedBy,
                                            CreatedDate = DateTime.Now,
                                            UpdatedBy = model.CreatedBy,
                                            UpdatedDate = DateTime.Now
                                        };
                                        db.Insert(cateDetail);
                                    }
                                }
                            }
                        }
                        #endregion

                        trans.Commit();
                        return 1;
                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        _logger.Error(ex, "Insert invoice import error: " + ex.Message);
                        return -1;
                    }
                }
            }
        }

        public long CreateInvoice(InvoiceImport model)
        {
            using (var db = _connectionFactory.Open())
            {
                using (var trans = db.OpenTransaction())
                {
                    try
                    {
                        #region Tạo thông tin phiếu nhập

                        var id = (int)db.Insert(model, true);

                        if (model.InvoiceImportDetails != null)
                        {
                            foreach (var item in model.InvoiceImportDetails)
                            {
                                item.InvoiceImportId = id;
                                db.Insert(item);
                            }
                        }

                        #endregion Tạo thông tin phiếu nhập

                        #region Trạng thái phiếu là hoàn thành - Update thông tin sản phẩm trong kho.  Tạo phiếu chi

                        if (model.Active != null && model.Active == (int)InvoiceStatus.Active && model.InvoiceImportDetails != null)
                        {
                            db.Insert(model.Payment);
                            foreach (var detail in model.InvoiceImportDetails)
                            {
                                if (model.Type == 1)
                                {
                                    for (var i = 0; i < detail.Quantity; i++)
                                    {
                                        var cate = db.Single<Category>(x => x.Code == detail.CategoryCode);
                                        var pro = new Product()
                                        {
                                            CategoryId = cate.Id,
                                            ProductCode = detail.CategoryCode + "00" + i,
                                            ProductName = cate.Name,
                                            Quantity = 1,
                                            Inventory = 1,
                                            PriceInput = detail.Price,
                                            Status = 1,
                                            Description = "",
                                            CreatedBy = model.CreatedBy,
                                            CreatedDate = DateTime.Now
                                        };
                                        db.Insert(pro);
                                    }
                                }
                                if (model.Type == 2)
                                {
                                    var cate = db.Single<Category>(x => x.Code == detail.CategoryCode);
                                    var cateDetail = db.Single<CategoryDetail>(_ => _.CategoryId == cate.Id);

                                    if (cateDetail != null)
                                    {
                                        cateDetail.PriceInput = detail.Price;
                                        cateDetail.Quantity = cateDetail.Quantity + detail.Quantity;
                                        cateDetail.UpdatedBy = model.CreatedBy;
                                        cateDetail.UpdatedDate = DateTime.Now;
                                        db.Update(cateDetail);
                                    }
                                    else
                                    {
                                        cateDetail = new CategoryDetail()
                                        {
                                            CategoryId = cate.Id,
                                            Quantity = detail.Quantity,
                                            PriceInput = detail.Price,
                                            CreatedBy = model.CreatedBy,
                                            UpdatedBy = model.CreatedBy,
                                            UpdatedDate = DateTime.Now,
                                            CreatedDate = DateTime.Now
                                        };
                                        db.Insert(cateDetail);
                                    }
                                }
                            }
                        }

                        #endregion Trạng thái phiếu là hoàn thành - Update thông tin sản phẩm trong kho.  Tạo phiếu chi

                        trans.Commit();
                        return 1;
                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        _logger.Error(ex, "Insert invoice import error: " + ex.Message);
                        return -1;
                    }
                }
            }
        }

        public long Import(InvoiceImport model)
        {
            using (var db = _connectionFactory.Open())
            {
                try
                {
                    //                        #region Tạo thông tin phiếu nhập
                    //                        var id =  db.Insert(model, true);
                    //
                    //                        if (model.InvoiceImportDetails != null)
                    //                        {
                    //                            foreach (var item in model.InvoiceImportDetails)
                    //                            {
                    //                                if (item.DateLimit == DateTime.MinValue)
                    //                                    item.DateLimit = null;
                    //                                item.InvoiceImportId = id;
                    //
                    //                                 db.Insert(item);
                    //                            }
                    //                        }
                    //                        #endregion
                    //
                    //                        #region Trạng thái phiếu là hoạt đông - Update thông tin sản phẩm trong kho.  Tạo phiếu chi
                    //
                    //                        //Update product in store
                    //                        if (model.Active != null && model.Active == (int)InvoiceStatus.Active && model.InvoiceImportDetails != null)
                    //                        {
                    //                            //Create payment invoice
                    //                             db.Insert(model.Payment);
                    //
                    //                            //Update product and product detail
                    //                            foreach (var detail in model.InvoiceImportDetails)
                    //                            {
                    //                                var pro =  db.Single<PRODUCT>(_ => _.ProductCode == detail.ProductCode);
                    //                                var pro_detail =  db.Single<PRODUCT_DETAIL>(_ => _.ProductCode == detail.ProductCode && _.BranchCode == model.BranchCode && _.StoreId == model.StoreId);
                    //
                    //                                if (pro != null)
                    //                                {
                    //                                    if (pro.Quantity + detail.Quantity == 0) pro.PriceInput = 0;
                    //                                    else
                    //                                    {
                    //                                        pro.PriceInput = (pro.Quantity * pro.PriceInput + detail.Quantity * detail.Price) / (pro.Quantity + detail.Quantity);
                    //                                        pro.PriceInput = Math.Round((pro.PriceInput ?? 0) * 100) / 100;
                    //                                    }
                    //                                    pro.Quantity = pro.Quantity + detail.Quantity;
                    //                                     db.Update(pro);
                    //                                }
                    //
                    //                                if (pro_detail != null)
                    //                                {
                    //                                    if (pro_detail.Quantity + detail.Quantity == 0) pro.PriceInput = 0;
                    //                                    else
                    //                                    {
                    //                                        pro_detail.PriceInput =
                    //                                        (pro_detail.Quantity * pro_detail.PriceInput +
                    //                                         detail.Quantity * detail.Price) / (pro_detail.Quantity + detail.Quantity);
                    //                                        pro_detail.PriceInput = Math.Round((pro_detail.PriceInput ?? 0) * 100) / 100;
                    //                                    }
                    //                                    pro_detail.Quantity = pro_detail.Quantity + detail.Quantity;
                    //                                     db.Update(pro_detail);
                    //
                    //                                }
                    //                                else
                    //                                {
                    //                                     db.Insert(new PRODUCT_DETAIL
                    //                                    {
                    //                                        ProductCode = pro.ProductCode,
                    //                                        PriceInput = detail.Price,
                    //                                        Quantity = detail.Quantity,
                    //                                        StoreId = model.StoreId,
                    //                                        Domain = model.Domain,
                    //                                        BranchCode = model.BranchCode
                    //                                    });
                    //                                }
                    //                            }
                    //
                    //                            //Update account provider
                    //                            var provider =  db.Single<PROVIDER>(_ => _.Code == model.ProviderCode);
                    //                            if (provider != null)
                    //                            {
                    //                                provider.MoneyIn += model.SumMonney;
                    //                                provider.MoneyOut += model.PaidMonney;
                    //                                provider.SumMoney += model.RemainMonney;    //Trên service đã check - Nếu không check vào "Cộng dư nợ" thì đã cho RemainMonney = 0
                    //                                provider.UpdateLastest = DateTime.Now;
                    //                                provider.Reason = $"Thanh toán hóa đơn {model.Code}:{DateTime.Now:dd-MM-yyyy}";
                    //
                    //                                 db.Update(provider);
                    //                            }
                    //
                    //                        }
                    //                        #endregion

                    return 1;
                }
                catch (Exception ex)
                {
                    _logger.Error(ex, "Insert invoice import error: " + ex.Message);
                    return -1;
                }
            }
        }

        public List<Vw_InvoiceImport> GetInvoiceImports(int status)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_InvoiceImport>();
                    query.Where(_ => _.Active == status);
                    query.Where(x => x.RemainMoney > 0);
                    var invoice = db.Select(query);
                    return invoice;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Get invoice error: " + ex.Message);
                return new List<Vw_InvoiceImport>();
            }
        }
    }
}
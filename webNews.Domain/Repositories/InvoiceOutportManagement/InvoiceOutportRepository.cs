using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using ServiceStack;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.Common;
using webNews.Models.InvoiceOutportManagement;

namespace webNews.Domain.Repositories.InvoiceOutportManagement
{
    public class InvoiceOutportRepository : Repository<InvoiceOutport>, IInvoiceOutportRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly ISystemRepository _systemRepository;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public InvoiceOutportRepository(IWebNewsDbConnectionFactory connectionFactory, ISystemRepository systemRepository) : base(connectionFactory)
        {
            _systemRepository = systemRepository;
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Vw_InvoiceOutport> GetList(SearchInvoiceOutport filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_InvoiceOutport>();

                    if (!string.IsNullOrEmpty(filter.Code))
                    {
                        query.Where(_ => _.Code == filter.Code);
                    }

                    //More filter
                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<Vw_InvoiceOutport>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<Vw_InvoiceOutport>
                {
                    Total = 0,
                    DataList = new List<Vw_InvoiceOutport>()
                };
            }
        }

        public List<InvoiceOutport> GetInvoiceOutport()
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<InvoiceOutport>();
                    return db.Select(query);
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Get invoice error: " + ex.Message);
                return new List<InvoiceOutport>();
            }
        }

        public Vw_InvoiceOutport GetInvoiceOutportByCode(string invoiceCode)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_InvoiceOutport>();
                    if (!string.IsNullOrEmpty(invoiceCode))
                    {
                        query.Where(_ => _.Code == invoiceCode);
                    }

                    var invoice = db.Single(query);

                    //                    invoice.InvoiceDetails = db.Select<InvoiceOutportDetail>(_ => _.Code == invoiceCode);

                    return invoice;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Get invoice error: " + ex.Message);
                return new Vw_InvoiceOutport();
            }
        }

        public InvoiceOutport GetInvoiceByCode(string invoiceCode)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<InvoiceOutport>();
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

        public List<Vw_InvoiceOutport_Detail> GetInvoiceDetails(int invoiceId)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_InvoiceOutport_Detail>();
                    query.Where(_ => _.InvoiceOutportId == invoiceId);

                    var invoice = db.Select(query);

                    return invoice;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Get invoice error: " + ex.Message);
                return new List<Vw_InvoiceOutport_Detail>();
            }
        }

        public List<Vw_InvoiceRental_Detail> GetInvoiceRentalDetails(int invoiceId)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_InvoiceRental_Detail>();
                    query.Where(_ => _.InvoiceOutportId == invoiceId);

                    var invoice = db.Select(query);

                    return invoice;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Get invoice error: " + ex.Message);
                return new List<Vw_InvoiceRental_Detail>();
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
                        var model = db.Single<InvoiceOutport>(_ => _.Code == invoiceCode);
                        if (model == null) return -1;
                        if (model.Active != (int)InvoiceOutportStatus.Draff) return -1;
                        //Chỉ xóa phiếu tạm
                        model.InvoiceOutportDetails =
                            db.Select<InvoiceOutportDetail>(_ => _.InvoiceOutportId == model.Id);
                        foreach (var item in model.InvoiceOutportDetails)
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
                        var model = db.Single<InvoiceOutport>(_ => _.Code == invoiceCode);
                        if (model == null) return -1;
                        if (model.Active == (int)InvoiceOutportStatus.Cancel) return -1;
                        if (status == -1)
                        {
                            if (date != null) model.Date = date;
                            model.Note = note;
                            //Update Invoice import
                            db.Update(model);
                        }
                        else if (model.Active == (int)InvoiceOutportStatus.Approved && status == (int)InvoiceOutportStatus.Cancel)
                        {
                            model.Active = (int)InvoiceOutportStatus.Cancel;
                            db.Update(model);
                        }
                        else if (model.Active == (int)InvoiceOutportStatus.Approved && status == (int)InvoiceOutportStatus.Draff)
                        {
                            model.Active = (int)InvoiceOutportStatus.Draff;
                            db.Update(model);
                        }
                        else if (model.Active == (int)InvoiceOutportStatus.Approved && status == (int)InvoiceOutportStatus.Collectioned)
                        {
                            model.Active = (int)InvoiceOutportStatus.Collectioned;
                            db.Update(model);
                        }
                        else if (model.Active == (int)InvoiceOutportStatus.Collectioned && status == (int)InvoiceOutportStatus.Completed)
                        {
                            model.Active = (int)InvoiceOutportStatus.Completed;

                            //trả đồ về kho-> hoàn thành đơn thuê
                            var rentalDetail = db.Select<InvoiceOutportDetail>(x => x.InvoiceOutportId == model.Id);
                            if (rentalDetail.Count > 0)
                            {
                                foreach (var item in rentalDetail)
                                {
                                    var product = db.Single<Product>(x => x.Id == item.ProductId);
                                    //update 
                                    product.Quantity = 1;
                                    product.Inventory = 1;
                                    db.Update(product);
                                }
                            }
                            db.Update(model);
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
        public long UpdateInvoice(InvoiceOutport model)
        {
            using (var db = _connectionFactory.Open())
            {
                using (var trans = db.OpenTransaction())
                {
                    try
                    {
                        #region Tạo thông tin phiếu nhập

                        db.Update(model);

                        if (model.InvoiceOutportDetails != null)
                        {
                            db.Delete<InvoiceOutportDetail>(_ => _.InvoiceOutportId == model.Id);

                            foreach (var item in model.InvoiceOutportDetails)
                            {
                                if (item.DateLimit == DateTime.MinValue)
                                    item.DateLimit = null;
                                item.InvoiceOutportId = model.Id;
                                db.Insert(item);
                            }
                        }
                        #endregion

                        #region Trạng thái phiếu là hoạt đông - Update thông tin sản phẩm trong kho.  Tạo phiếu chi

                        //Update product in store
                        if (model.Active != null && model.Active == (int)InvoiceStatus.Active && model.InvoiceOutportDetails != null)
                        {
                            //Create payment invoice
                            if (model.Type == 1)
                            {
                                db.Insert(model.Payment);
                            }
                            else if (model.Type == 2)
                            {
                                foreach (var item in model.ListPayments)
                                {
                                    db.Insert(item);
                                }
                            }

                            //Update product and product detail
                            foreach (var detail in model.InvoiceOutportDetails)
                            {
                                if (model.Type == 2) // thuê
                                {
                                    for (var i = 0; i < detail.Quantity; i++)
                                    {
                                        var pro = db.Single<Product>(x => x.ProductCode == detail.ProductCode);
                                        pro.Quantity = 0;
                                        pro.Inventory = 0;
                                        db.Update<Product>(pro);
                                    }
                                }
                                if (model.Type == 1) //bán
                                {
                                    var cate = db.Single<Category>(x => x.Code == detail.CategoryCode);
                                    var cateDetail = db.Single<CategoryDetail>(_ => _.CategoryId == cate.Id);

                                    if (cateDetail != null)
                                    {
                                        if (cateDetail.Quantity > detail.Quantity)
                                        {
                                            cateDetail.Quantity = cateDetail.Quantity - detail.Quantity;
                                            cateDetail.UpdatedBy = model.CreatedBy;
                                            cateDetail.UpdatedDate = DateTime.Now;
                                            db.Update(cateDetail);
                                        }
                                        else
                                        {
                                            // ko đủ số lượng
                                            return 3;
                                        }

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

        public long CreateInvoice(InvoiceOutport model)
        {
            using (var db = _connectionFactory.Open())
            {
                using (var trans = db.OpenTransaction())
                {
                    try
                    {
                        #region Tạo thông tin phiếu xuất

                        var id = (int)db.Insert(model, true);

                        if (model.InvoiceOutportDetails != null)
                        {
                            foreach (var item in model.InvoiceOutportDetails)
                            {
                                item.InvoiceOutportId = id;
                                db.Insert(item);
                            }
                        }

                        #endregion Tạo thông tin phiếu xuất

                        #region Trạng thái phiếu là hoàn thành - Update thông tin sản phẩm trong kho.  Tạo phiếu chi

                        if (model.Active != null && model.Active == (int)InvoiceStatus.Active && model.InvoiceOutportDetails != null)
                        {
                            if (model.Type == 1)
                            {
                                db.Insert(model.Payment);
                            }
                            else if (model.Type == 2)
                            {
                                foreach (var item in model.ListPayments)
                                {
                                    db.Insert(item);
                                }
                            }

                            foreach (var detail in model.InvoiceOutportDetails)
                            {
                                if (model.Type == 2) // thuê
                                {
                                    for (var i = 0; i < detail.Quantity; i++)
                                    {
                                        var pro = db.Single<Product>(x => x.ProductCode == detail.ProductCode);
                                        pro.Quantity = 0;
                                        pro.Inventory = 0;
                                        db.Update<Product>(pro);
                                    }
                                }
                                if (model.Type == 1) //bán
                                {
                                    var cate = db.Single<Category>(x => x.Code == detail.CategoryCode);
                                    var cateDetail = db.Single<CategoryDetail>(_ => _.CategoryId == cate.Id);

                                    if (cateDetail != null)
                                    {
                                        if (cateDetail.Quantity > detail.Quantity)
                                        {
                                            cateDetail.Quantity = cateDetail.Quantity - detail.Quantity;
                                            cateDetail.UpdatedBy = model.CreatedBy;
                                            cateDetail.UpdatedDate = DateTime.Now;
                                            db.Update(cateDetail);
                                        }
                                        else
                                        {
                                            // ko đủ số lượng
                                            return 3;
                                        }

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

        public long CreateInvoiceFE(InvoiceOutport model)
        {
            using (var db = _connectionFactory.Open())
            {
                using (var trans = db.OpenTransaction())
                {
                    try
                    {
                        var id = (int)db.Insert(model, true);

                        if (model.InvoiceOutportDetails != null)
                        {
                            foreach (var item in model.InvoiceOutportDetails)
                            {
                                item.InvoiceOutportId = id;
                                db.Insert(item);
                            }
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

        public long Import(InvoiceOutport model)
        {
            using (var db = _connectionFactory.Open())
            {
                try
                {
                    //                        #region Tạo thông tin phiếu nhập
                    //                        var id =  db.Insert(model, true);
                    //
                    //                        if (model.InvoiceOutportDetails != null)
                    //                        {
                    //                            foreach (var item in model.InvoiceOutportDetails)
                    //                            {
                    //                                if (item.DateLimit == DateTime.MinValue)
                    //                                    item.DateLimit = null;
                    //                                item.InvoiceOutportId = id;
                    //
                    //                                 db.Insert(item);
                    //                            }
                    //                        }
                    //                        #endregion
                    //
                    //                        #region Trạng thái phiếu là hoạt đông - Update thông tin sản phẩm trong kho.  Tạo phiếu chi
                    //
                    //                        //Update product in store
                    //                        if (model.Active != null && model.Active == (int)InvoiceStatus.Active && model.InvoiceOutportDetails != null)
                    //                        {
                    //                            //Create payment invoice
                    //                             db.Insert(model.Payment);
                    //
                    //                            //Update product and product detail
                    //                            foreach (var detail in model.InvoiceOutportDetails)
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

        public List<Vw_InvoiceOutport> GetInvoiceOutports(int status)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_InvoiceOutport>();
                    query.Where(_ => _.Active == status);
                    query.Where(x => x.RemainMoney > 0);
                    var invoice = db.Select(query);
                    return invoice;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Get invoice error: " + ex.Message);
                return new List<Vw_InvoiceOutport>();
            }
        }
    }
}
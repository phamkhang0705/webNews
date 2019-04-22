using NLog;
using System;
using System.Dynamic;
using System.Web.Mvc;
using webNews.Domain.Services.CustomerManagement;
using webNews.Domain.Services.InvoiceImportManagement;
using webNews.Domain.Services.ProductManagement;
using webNews.Models.Common;
using webNews.Models.InvoiceImportManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class InvoiceImportController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IInvoiceImportService _importService;
        private readonly IProductManagementService _productManagementService;
        private readonly ICustomerManagementService _customerManagementService;

        public InvoiceImportController(
            IInvoiceImportService importService,IProductManagementService productManagementService, ICustomerManagementService customerManagementService)
        {
            _importService = importService;
            _productManagementService = productManagementService;
            _customerManagementService  = customerManagementService;
        }

        // GET: Admin/InvoiceImport
        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");
            dynamic model = new ExpandoObject();
            return View(model);
        }

        public ActionResult Add()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");

            dynamic model = new ExpandoObject();

            return View("Add", model);
        }

        #region GetData

        [HttpPost]
        public ActionResult GetData(SearchInvoiceImport search, int pageIndex, int pageSize)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                if (pageIndex == 0 || pageIndex < pageSize)
                    pageIndex = 0;
                else
                    pageIndex = (pageSize / pageSize);

                var data = _importService.Search(search, pageIndex, pageSize);
                return Json(new
                {
                    data = data.DataList,
                    total = data.Total
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Get all product error : " + ex);
                return null;
            }
        }

        public ActionResult GetProductData(string productName)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                var lData = _productManagementService.GetByName(productName);
                return Json(lData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Get GetProductData error : " + ex);
                return null;
            }
        }

        public ActionResult GetSupplierData(string supplierName)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                var lData = _customerManagementService.GetByName(supplierName,(int)CustomerType.Supplier);
            return Json(lData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Get GetSupplierData error : " + ex);
                return null;
            }
        }

        //
        //        public ActionResult GetHistoryData(string code, int pageIndex, int pageSize)
        //        {
        //            var data = _importService.GetHistoryPayment(code, pageIndex, pageSize);
        //            return Json(new
        //            {
        //                data = data.DataList,
        //                total = data.Total
        //            }, JsonRequestBehavior.AllowGet);
        //        }
        //
        //        public ActionResult GetInvoiceDetail(string code)
        //        {
        //            try
        //            {
        //                var invoice = _importService.GetByCode(code);
        //
        //                var model = new Models.InvoiceImport.InvoiceImportModel
        //                {
        //                    Code = invoice.Code,
        //                    Date = invoice.Date,
        //                    ProviderCode = invoice.ProviderCode,
        //                    ProviderName = invoice.ProviderName,
        //                    Discount = invoice.Discount,
        //                    TotalMonney = invoice.TotalMonney,
        //                    BranchName = invoice.BranchName,
        //                    Status = invoice.Status,
        //                    UserName = invoice.UserName,
        //                    Note = invoice.Note,
        //                    VAT = invoice.VAT,
        //                    SumMonney = invoice.SumMonney,
        //                    PaidMonney = invoice.PaidMonney,
        //                    RemainMonney = invoice.RemainMonney,
        //
        //                    InvoiceDetails = invoice.InvoiceDetails
        //                };
        //
        //
        //                return PartialView("_ptvDetail", model);
        //            }
        //            catch (Exception ex)
        //            {
        //                _log.Error("Show modal is error: " + ex);
        //                return Json(new
        //                {
        //                    Status = "00",
        //                    Message = Resource.ServerError_Lang,
        //                    JsonRequestBehavior.AllowGet
        //                });
        //            }
        //        }
        //
        //        public ActionResult GetInvoice(string code)
        //        {
        //            try
        //            {
        //                var invoice = _importService.GetByCode(code);
        //
        //                var model = new Models.InvoiceImport.InvoiceImportModel
        //                {
        //                    Code = invoice.Code,
        //                    Date = invoice.Date,
        //                    ProviderCode = invoice.ProviderCode,
        //                    ProviderName = invoice.ProviderName,
        //                    Discount = invoice.Discount,
        //                    TotalMonney = invoice.TotalMonney,
        //                    BranchName = invoice.BranchName,
        //                    Status = invoice.Status,
        //                    UserName = invoice.UserName,
        //                    Note = invoice.Note,
        //                    VAT = invoice.VAT,
        //                    SumMonney = invoice.SumMonney,
        //                    PaidMonney = invoice.PaidMonney,
        //                    RemainMonney = invoice.RemainMonney,
        //                    TotalQuantity = invoice.TotalQuantity,
        //                    CreateDate = (DateTime) invoice.CreateDate,
        //                    PaymentMethod = (int) invoice.PayMethod,
        //                    DiscountType = invoice.DiscountType ? 1 : 0,
        //
        //                    InvoiceDetails = invoice.InvoiceDetails
        //                };
        //
        //                return System.Web.Helpers.Json(model, JsonRequestBehavior.AllowGet);
        //            }
        //            catch (Exception ex)
        //            {
        //                _log.Error("Show modal is error: " + ex);
        //                return Json(new
        //                {
        //                    Status = "00",
        //                    Message = Resource.ServerError_Lang,
        //                    JsonRequestBehavior.AllowGet
        //                });
        //            }
        //        }
        //

        #endregion GetData

        //
        //        #region [ShowData]
        //
        //        public async Task<ActionResult> LoadStoreToBranchCode(string branchCode)
        //        {
        //            try
        //            {
        //                var data = await _storeManageService.GetStoreToBranchCode(branchCode == null ? "EMP" : branchCode);
        //                return Json(data, JsonRequestBehavior.AllowGet);
        //            }
        //            catch (Exception ex)
        //            {
        //                return null;
        //            }
        //        }
        //
        //        public async Task<ActionResult> ShowModalUpload(long id, string action)
        //        {
        //            try
        //            {
        //                var model = new Models.InvoiceImport.InvoiceImportModel()
        //                {
        //                    Action = action,
        //                    ListBranch = (List<SelectListModel>) Session[Constant.SessionKey.ListBranch],
        //                    //_branchManageService.GetListBranch(1),
        //                    ListStore = await _storeManageService.GetStoreToBranchCode(BranchCode == null ? "EMP" : BranchCode)
        //                };
        //                return PartialView("_ImportExcel", model);
        //            }
        //            catch (Exception ex)
        //            {
        //                _log.Error("Show modal InvoiceImport is error: " + ex);
        //                return Json(new
        //                {
        //                    Status = "00",
        //                    Message = Resource.ServerError_Lang,
        //                    JsonRequestBehavior.AllowGet
        //                });
        //            }
        //        }
        //
        //        #endregion [ShowData]
        //
        //        #region Create
        //
        //        [HttpPost]
        //        public ActionResult Create(InvoiceImportModel model)
        //        {
        //            if (!CheckAuthorizer.Authorize(Permission.ADD))
        //                return RedirectToAction("Index", "Login");
        //            try
        //            {
        //                if (ModelState.IsValid)
        //                {
        //                    if (string.IsNullOrEmpty(BranchCode))
        //                    {
        //                        return Json(new
        //                        {
        //                            Status = "00",
        //                            Message = "Bạn chưa chọn chi nhánh"
        //                        }, JsonRequestBehavior.AllowGet);
        //                    }
        //                    if (StoreId == -1)
        //                    {
        //                        return Json(new
        //                        {
        //                            Status = "00",
        //                            Message = "Bạn chưa chọn kho hàng"
        //                        }, JsonRequestBehavior.AllowGet);
        //                    }
        //                    model.Domain = Domain;
        //                    model.BranchCode = BranchCode;
        //                    model.StoreId = StoreId;
        //                    model.UserId = Authentication.GetUserId();
        //                    model.UserName = Authentication.GetUserName();
        //                    model.Type = 0;
        //                    var rs = _importService.Create(model);
        //                    if (rs.ResponseCode == "01")
        //                    {
        //                        return Json(new
        //                        {
        //                            Status = "01",
        //                            Message = "Thêm mới phiếu nhập thành công!"
        //                        }, JsonRequestBehavior.AllowGet);
        //                    }
        //                    return Json(new
        //                    {
        //                        Status = "00",
        //                        Message = Resource.ServerError_Lang
        //                    }, JsonRequestBehavior.AllowGet);
        //                }
        //                var error = CheckValidate();
        //                return Json(new
        //                {
        //                    Status = "02",
        //                    Message = error[0]
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //            catch (Exception ex)
        //            {
        //                _log.Error("Create is error: " + ex);
        //                return Json(new
        //                {
        //                    Status = "00",
        //                    Message = Resource.ServerError_Lang
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //        }
        //
        //        [HttpPost]
        //        public async Task<ActionResult> Upload(HttpPostedFileBase file, string branchCode, int storeId)
        //        {
        //            if (!CheckAuthorizer.Authorize(Permission.ADD))
        //                return RedirectToAction("Permission", "Error");
        //            try
        //            {
        //                var path = "/Upload/InvoiceImport/";
        //                if (file != null)
        //                {
        //                    var fileName = DateTime.Now.ToString("dd_mm_yyyy_hh_MM_ss__") + file.FileName;
        //                    file.SaveAs(Server.MapPath("~" + path + fileName));
        //                    var lst = _importExcelFile.Excel_To_DataTable(Server.MapPath("~" + path + fileName), 0);
        //                    var lstModel = new List<InvoiceImportModel>();
        //                    InvoiceImportModel item;
        //                    List<ProductItem> lstDetail;
        //                    ProductItem product;
        //                    foreach (DataRow dr in lst.Rows)
        //                    {
        //                        item = new InvoiceImportModel();
        //                        item.Active = 1;
        //                        item.AddToProvider = string.IsNullOrEmpty(dr[9].ToString())
        //                            ? false
        //                            : (Convert.ToInt32(dr[9].ToString()) > 0 ? true : false);
        //                        item.Discount = string.IsNullOrEmpty(dr[5].ToString()) ? 0 : Convert.ToInt32(dr[5].ToString());
        //                        item.StoreId = storeId;
        //                        item.BranchCode = branchCode;
        //                        item.Domain = Domain;
        //                        item.CreateDate = DateTime.Now;
        //                        item.DiscountType = false;
        //                        item.Note = dr[11].ToString();
        //                        item.ProviderCode = dr[10].ToString();
        //                        item.PayMethod = 0;
        //                        item.RemainMoney = string.IsNullOrEmpty(dr[9].ToString())
        //                            ? 0
        //                            : Convert.ToInt32(dr[9].ToString());
        //                        item.TotalMoney = string.IsNullOrEmpty(dr[4].ToString()) ? 0 : Convert.ToInt32(dr[4].ToString());
        //                        item.SumMonney = string.IsNullOrEmpty(dr[7].ToString()) ? 0 : Convert.ToInt32(dr[7].ToString());
        //                        item.VAT = string.IsNullOrEmpty(dr[6].ToString()) ? 0 : Convert.ToInt32(dr[6].ToString());
        //                        item.PaidMoney = string.IsNullOrEmpty(dr[8].ToString()) ? 0 : Convert.ToInt32(dr[8].ToString());
        //                        item.TotalQuantity = string.IsNullOrEmpty(dr[2].ToString())
        //                            ? 0
        //                            : Convert.ToInt32(dr[2].ToString());
        //                        item.UserName = UserName;
        //                        item.Type = 0;
        //                        lstDetail = new List<ProductItem>();
        //                        product = new ProductItem();
        //                        product.ProductCode = dr[0].ToString();
        //                        product.PriceInput = string.IsNullOrEmpty(dr[3].ToString())
        //                            ? 0
        //                            : Convert.ToInt32(dr[3].ToString());
        //                        product.Quantity = string.IsNullOrEmpty(dr[2].ToString())
        //                            ? 0
        //                            : Convert.ToInt32(dr[2].ToString());
        //                        product.TotalMoney = string.IsNullOrEmpty(dr[4].ToString())
        //                            ? 0
        //                            : Convert.ToInt32(dr[4].ToString());
        //
        //                        lstDetail.Add(product);
        //                        item.ProductItems = lstDetail;
        //                        lstModel.Add(item);
        //                    }
        //                    System.IO.File.Delete(Server.MapPath("~" + path + fileName));
        //                    if (lstModel.Any())
        //                    {
        //                        var rs = _importService.Create(lstModel);
        //                        if (rs)
        //                            return Json(new
        //                            {
        //                                Status = "01",
        //                                Message = "Import danh sách học viên thành công!"
        //                            }, JsonRequestBehavior.AllowGet);
        //
        //                        return Json(new
        //                        {
        //                            Status = "00",
        //                            Message = "Import danh sách học viên lỗi!"
        //                        }, JsonRequestBehavior.AllowGet);
        //                    }
        //                }
        //
        //                return Json(new
        //                {
        //                    Status = "02",
        //                    Message = "Có lỗi trong quá trình thực thi"
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //            catch (Exception ex)
        //            {
        //                _log.Error("Create is error: " + ex);
        //                return Json(new
        //                {
        //                    Status = "00",
        //                    Message = Resource.ServerError_Lang
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //        }
        //
        //
        //        [HttpPost]
        //        public ActionResult Open(InvoiceImportModel model)
        //        {
        //            if (!CheckAuthorizer.Authorize(Permission.ADD))
        //                return RedirectToAction("Index", "Login");
        //            try
        //            {
        //                if (ModelState.IsValid)
        //                {
        //                    model.Domain = Domain;
        //                    model.BranchCode = BranchCode ?? "CN0000000005";
        //                    model.StoreId = StoreId == -1 ? 2 : StoreId;
        //                    model.UserId = Authentication.GetUserId();
        //                    model.UserName = Authentication.GetUserName();
        //                    var rs = _importService.Open(model);
        //                    if (rs.ResponseCode == "01")
        //                    {
        //                        return Json(new
        //                        {
        //                            Status = "01",
        //                            Message = "Thêm mới phiếu nhập thành công!"
        //                        }, JsonRequestBehavior.AllowGet);
        //                    }
        //                    return Json(new
        //                    {
        //                        Status = "00",
        //                        Message = Resource.ServerError_Lang
        //                    }, JsonRequestBehavior.AllowGet);
        //                }
        //                var error = CheckValidate();
        //                return Json(new
        //                {
        //                    Status = "02",
        //                    Message = error[0]
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //            catch (Exception ex)
        //            {
        //                _log.Error("Create is error: " + ex);
        //                return Json(new
        //                {
        //                    Status = "00",
        //                    Message = Resource.ServerError_Lang
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //        }
        //
        //        #endregion Create
        //
        //        #region [Update]
        //
        //        public ActionResult Update(string invoiceCode, int status, DateTime? date, string note)
        //        {
        //            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
        //            try
        //            {
        //                if (ModelState.IsValid)
        //                {
        //                    var rs = _importService.UpdateInvoice(invoiceCode, status, date, note);
        //                    if (rs.ResponseCode == "01")
        //                    {
        //                        return Json(new
        //                        {
        //                            Status = "01",
        //                            Message = "Cập nhật phiếu nhập thành công!"
        //                        }, JsonRequestBehavior.AllowGet);
        //                    }
        //                    return Json(new
        //                    {
        //                        Status = "00",
        //                        Message = rs.ResponseMessage
        //                    }, JsonRequestBehavior.AllowGet);
        //                }
        //
        //                var error = CheckValidate();
        //                return Json(new
        //                {
        //                    Status = "02",
        //                    Message = error[0]
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //            catch (Exception ex)
        //            {
        //                _log.Error("Update is error: " + ex);
        //                return Json(new
        //                {
        //                    Status = "0",
        //                    Message = Resource.InvalidInfomation_Lang
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //        }
        //
        //        public ActionResult CancleInvoice(string invoiceCode)
        //        {
        //            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
        //            try
        //            {
        //                if (ModelState.IsValid)
        //                {
        //                    var rs = _importService.CancleInvoice(invoiceCode);
        //                    if (rs.ResponseCode == "01")
        //                    {
        //                        return Json(new
        //                        {
        //                            Status = "01",
        //                            Message = rs.ResponseMessage
        //                        }, JsonRequestBehavior.AllowGet);
        //                    }
        //                    return Json(new
        //                    {
        //                        Status = "00",
        //                        Message = rs.ResponseMessage
        //                    }, JsonRequestBehavior.AllowGet);
        //                }
        //
        //                var error = CheckValidate();
        //                return Json(new
        //                {
        //                    Status = "02",
        //                    Message = error[0]
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //            catch (Exception ex)
        //            {
        //                _log.Error("Update is error: " + ex);
        //                return Json(new
        //                {
        //                    Status = "0",
        //                    Message = Resource.InvalidInfomation_Lang
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //        }
        //
        //        public ActionResult Delete(string invoiceCode)
        //        {
        //            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
        //            try
        //            {
        //                if (ModelState.IsValid)
        //                {
        //                    var rs = _importService.DeleteInvoice(invoiceCode);
        //                    if (rs.ResponseCode == "01")
        //                    {
        //                        return Json(new
        //                        {
        //                            Status = "01",
        //                            Message = rs.ResponseMessage
        //                        }, JsonRequestBehavior.AllowGet);
        //                    }
        //                    return Json(new
        //                    {
        //                        Status = "00",
        //                        Message = rs.ResponseMessage
        //                    }, JsonRequestBehavior.AllowGet);
        //                }
        //
        //                var error = CheckValidate();
        //                return Json(new
        //                {
        //                    Status = "02",
        //                    Message = error[0]
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //            catch (Exception ex)
        //            {
        //                _log.Error("Update is error: " + ex);
        //                return Json(new
        //                {
        //                    Status = "0",
        //                    Message = Resource.InvalidInfomation_Lang
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //        }
        //
        //        #endregion [Update]
    }
}
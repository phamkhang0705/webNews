using NLog;
using System;
using System.Dynamic;
using System.Web.Mvc;
using webNews.Domain.Services;
using webNews.Domain.Services.CategoryManagement;
using webNews.Domain.Services.CustomerManagement;
using webNews.Domain.Services.InvoiceOutportManagement;
using webNews.Language.Language;
using webNews.Models.Common;
using webNews.Models.InvoiceOutportManagement;
using webNews.Security;
using InvoiceOutportModel = webNews.Areas.Admin.Models.InvoiceOutport.InvoiceOutportModel;

namespace webNews.Areas.Admin.Controllers
{
    public class InvoiceOutportController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IInvoiceOutportService _importService;
        private readonly ICategoryManagementService _categoryManagementService;
        private readonly ICustomerManagementService _customerManagementService;
        private readonly ISystemService _systemService;

        public InvoiceOutportController(
            IInvoiceOutportService importService, ICategoryManagementService categoryManagementService, ICustomerManagementService customerManagementService, ISystemService systemService)
        {
            _importService = importService;
            _categoryManagementService = categoryManagementService;
            _customerManagementService = customerManagementService;
            _systemService = systemService;
        }

        // GET: Admin/InvoiceOutport
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
            model.ListBanks = _systemService.GetBanks(1);
            return View("Add", model);
        }

        #region GetData

        [HttpPost]
        public ActionResult GetData(SearchInvoiceOutport search, int pageIndex, int pageSize)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                if (pageIndex == 0 || pageIndex < pageSize)
                    pageIndex = 0;
                else
                    pageIndex = (pageSize / pageSize);
                search.Type = 1;
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

        public ActionResult GetCategoryData(string categoryName)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                var lData = _categoryManagementService.GetCategorySale(categoryName);
                return Json(lData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Get GetCategoryData error : " + ex);
                return null;
            }
        }

        public ActionResult GetCustomerData(string customerName)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                var lData = _customerManagementService.GetByName(customerName, (int)CustomerType.Customer);
                return Json(lData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Get GetCustomerData error : " + ex);
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
        public ActionResult GetInvoiceDetail(string code)
        {
            try
            {
                var invoice = _importService.GetInvoiceOutportByCode(code);

                var model = new InvoiceOutportModel
                {
                    Id = invoice.Id,
                    Code = invoice.Code,
                    CreatedDate = invoice.CreatedDate,
                    CustomerCode = invoice.CustomerCode,
                    CustomerName = invoice.CustomerName,
                    Discount = invoice.Discount,
                    DiscountType = invoice.DiscountType,
                    TotalMoney = invoice.TotalMoney,
                    Active = invoice.Active,
                    UserName = invoice.UserName,
                    Note = invoice.Note,
                    VAT = invoice.VAT,
                    SumMoney = invoice.SumMoney,
                    PaidMoney = invoice.PaidMoney,
                    RemainMoney = invoice.RemainMoney,
                    InvoiceOutportDetails = _importService.GetInvoiceDetails(invoice.Id),
                    Action = "Edit"
                };

                return PartialView("_ptvDetail", model);
            }
            catch (Exception ex)
            {
                _log.Error("Show modal is error: " + ex);
                return Json(new
                {
                    Status = "00",
                    Message = Resource.ServerError_Lang,
                    JsonRequestBehavior.AllowGet
                });
            }
        }

        public ActionResult GetInvoice(string code)
        {
            try
            {
                var invoice = _importService.GetInvoiceOutportByCode(code);

                var model = new Models.InvoiceOutport.InvoiceOutportModel
                {
                    Id = invoice.Id,
                    Code = invoice.Code,
                    CreatedDate = invoice.CreatedDate,
                    CustomerCode = invoice.CustomerCode,
                    CustomerName = invoice.CustomerName,
                    Discount = invoice.Discount,
                    TotalMoney = invoice.TotalMoney,
                    Active = invoice.Active,
                    UserName = invoice.UserName,
                    Note = invoice.Note,
                    VAT = invoice.VAT,
                    SumMoney = invoice.SumMoney,
                    PaidMoney = invoice.PaidMoney,
                    RemainMoney = invoice.RemainMoney,
                    InvoiceOutportDetails = _importService.GetInvoiceDetails(invoice.Id),

                    DiscountType = invoice.DiscountType,
                    TotalQuantity = invoice.TotalQuantity,
                };

                return Json(model, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Show modal is error: " + ex);
                return Json(new
                {
                    Status = "00",
                    Message = Resource.ServerError_Lang,
                    JsonRequestBehavior.AllowGet
                });
            }
        }

        #endregion GetData

        #region Create

        [HttpPost]
        public ActionResult Create(webNews.Models.InvoiceOutportManagement.InvoiceOutportModel model)
        {
            if (!CheckAuthorizer.Authorize(Permission.ADD))
                return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    model.UserId = Authentication.GetUserId();
                    model.CreatedBy = Authentication.GetUserId();
                    model.UserName = Authentication.GetUserName();
                    model.Type = 1;
                    var rs = _importService.CustomCreate(model);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Thêm mới phiếu nhập thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new
                    {
                        Status = "00",
                        Message = Resource.ServerError_Lang
                    }, JsonRequestBehavior.AllowGet);
                }
                var error = CheckValidate();
                return Json(new
                {
                    Status = "02",
                    Message = error[0]
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Create is error: " + ex);
                return Json(new
                {
                    Status = "00",
                    Message = Resource.ServerError_Lang
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Open(webNews.Models.InvoiceOutportManagement.InvoiceOutportModel model)
        {
            if (!CheckAuthorizer.Authorize(Permission.ADD))
                return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    model.UserId = Authentication.GetUserId();
                    model.UserName = Authentication.GetUserName();
                    var rs = _importService.UpdateInvoice(model);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Cập nhật phiếu nhập thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new
                    {
                        Status = "00",
                        Message = Resource.ServerError_Lang
                    }, JsonRequestBehavior.AllowGet);
                }
                var error = CheckValidate();
                return Json(new
                {
                    Status = "02",
                    Message = error[0]
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Create is error: " + ex);
                return Json(new
                {
                    Status = "00",
                    Message = Resource.ServerError_Lang
                }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion Create

        #region [Update]

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
        public ActionResult CancleInvoice(string invoiceCode)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _importService.CancelInvoice(invoiceCode);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = rs.ResponseMessage
                        }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new
                    {
                        Status = "00",
                        Message = rs.ResponseMessage
                    }, JsonRequestBehavior.AllowGet);
                }

                var error = CheckValidate();
                return Json(new
                {
                    Status = "02",
                    Message = error[0]
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Update is error: " + ex);
                return Json(new
                {
                    Status = "0",
                    Message = Resource.InvalidInfomation_Lang
                }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Delete(string invoiceCode)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _importService.DeleteInvoice(invoiceCode);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = rs.ResponseMessage
                        }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new
                    {
                        Status = "00",
                        Message = rs.ResponseMessage
                    }, JsonRequestBehavior.AllowGet);
                }

                var error = CheckValidate();
                return Json(new
                {
                    Status = "02",
                    Message = error[0]
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Update is error: " + ex);
                return Json(new
                {
                    Status = "0",
                    Message = Resource.InvalidInfomation_Lang
                }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion [Update]
    }
}
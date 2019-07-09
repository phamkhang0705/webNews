using NLog;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Web.Mvc;
using webNews.Areas.Admin.Models.Promotion;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Domain.Services;
using webNews.Domain.Services.PromotionManagement;
using webNews.Language.Language;
using webNews.Models.Common;
using webNews.Models.PromotionManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class PromotionManagementController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IPromotionManagementService _promotionManagementService;
        private readonly IConstantService _constantService;
        private readonly ISystemService _systemService;

        public PromotionManagementController(IPromotionManagementService promotionManagementService, ISystemService systemService)
        {
            _promotionManagementService = promotionManagementService;
            _constantService = new ConstantService();
            _systemService = systemService;
        }

        // GET: Admin/PromotionManagement
        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");
            dynamic model = new ExpandoObject();
            model.ListStatus = _constantService.ListStatus();
            return View(model);
        }

        #region GetData

        [HttpPost]
        public ActionResult GetData(SearchPromotionModel search, int pageIndex, int pageSize)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                var data = _promotionManagementService.GetList(search, pageIndex, pageSize);
                var total = data.Total;
                return Json(new
                {
                    data = data.DataList,
                    total
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetData PromotionManagement error : " + ex);
                return null;
            }
        }

        #endregion GetData

        #region [ShowData]

        public ActionResult ShowModal(int id, string action)
        {
            try
            {
                var model = new PromotionModel()
                {
                    Action = action,
                    ListStatus = _constantService.ListStatus(false)
                };
                if (id > 0)
                {
                    var cus = _promotionManagementService.GetPromotionById(id);
                    if (cus != null)
                    {
                        model.Id = cus.Id;
                        model.PromotionCode = cus.PromotionCode;
                        model.PromotionName = cus.PromotionName;
                        model.Description = cus.Description;
                        model.FromDate = cus.FromDate;
                        model.ToDate = cus.ToDate;
                    }
                }
                return PartialView("_PromotionDetail", model);
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


        #endregion [ShowData]

        #region Create

        [HttpPost]
        public ActionResult Create(Promotion promotion)
        {
            if (!CheckAuthorizer.Authorize(Permission.ADD)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    promotion.CreatedBy = Authentication.GetUserId();
                    promotion.CreatedDate = DateTime.Now;
                    var rs = _promotionManagementService.CreatePromotion(promotion);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Thêm mới khuyến mại thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "00",
                            Message = "Thêm mới khuyến mại không thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
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

        #endregion Create

        #region [Update]

        public ActionResult Update(Promotion promotion)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var pr = new Promotion()
                    {
                        UpdatedBy = Authentication.GetUserId(),
                        UpdatedDate = DateTime.Now,
                    };
                    var rs = _promotionManagementService.UpdatePromotion(promotion);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Cập nhật khuyến mại thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "00",
                            Message = "Cập nhật khuyến mại không thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
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
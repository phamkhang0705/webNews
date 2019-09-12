using NLog;
using System;
using System.Dynamic;
using System.Web.Mvc;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Domain.Services.NewsCategoryManagement;
using webNews.Language.Language;
using webNews.Models.ContentTypeManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class NewsCategoryManagementController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly INewsCategoryManagementService _contentTypeManagementService;
        private readonly IConstantService _constantService;

        public NewsCategoryManagementController(INewsCategoryManagementService contentTypeManagementService)
        {
            _contentTypeManagementService = contentTypeManagementService;
            _constantService = new ConstantService();
        }

        // GET: Admin/NewsCategoryManagement
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
        public ActionResult GetData(SearchContentModel search, int pageIndex, int pageSize)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                var data = _contentTypeManagementService.GetList(search, pageIndex, pageSize);
                var total = data.Total;
                return Json(new
                {
                    data = data.DataList,
                    total
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetData NewsCategoryManagement error : " + ex);
                return null;
            }
        }

        #endregion GetData

        #region [ShowData]

        public ActionResult ShowModal(int id, string action)
        {
            try
            {
                var model = new Models.NewsCategory.NewsCategoryModel()
                {
                    Action = action,
                    ListStatus = _constantService.ListStatus(false)
                };
                if (id > 0)
                {
                    var group = _contentTypeManagementService.GetById(id);
                    if (group != null)
                    {
                        model.Id = group.Id;
                        model.Title = group.Title;
                        model.Status = group.Status;
                    }
                }
                return PartialView("_contentTypeDetail", model);
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
        public ActionResult Create(NewsCategory model)
        {
            if (!CheckAuthorizer.Authorize(Permission.ADD))
                return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _contentTypeManagementService.CreateNewsCategory(model);
                    return Json(new
                    {
                        Status = "01",
                        Message = "Thêm mới nhóm nội dung thành công"
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

        public ActionResult Update(NewsCategory model)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _contentTypeManagementService.UpdateNewsCategory(model);

                    return Json(new
                    {
                        Status = rs.ResponseCode,
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
using NLog;
using System;
using System.Web.Mvc;
using webNews.Domain.Entities;
using webNews.Domain.Services.GroupManagement;
using webNews.Language.Language;
using webNews.Models.GroupManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class GroupManagementController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IGroupManagementService _groupManagementService;

        public GroupManagementController(IGroupManagementService groupManagementService)
        {
            _groupManagementService = groupManagementService;
        }

        // GET: Admin/GroupManagement
        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");
            return View();
        }

        #region GetData

        [HttpPost]
        public ActionResult GetData(SearchGroupModel search, int pageIndex, int pageSize)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                var data = _groupManagementService.GetList(search, pageIndex, pageSize);
                var total = data.Total;
                return Json(new
                {
                    data = data.DataList,
                    total
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetData GroupManagement error : " + ex);
                return null;
            }
        }

        #endregion GetData

        #region [ShowData]

        public ActionResult ShowModal(int id, string action)
        {
            try
            {
                var model = new webNews.Areas.Admin.Models.Group.GroupModel()
                {
                    Action = action
                };
                if (id > 0)
                {
                    var group = _groupManagementService.GetById(id);
                    if (group != null)
                    {
                        model.Id = group.Id;
                        model.Code = group.Code;
                        model.Name = group.Name;
                        model.Description = group.Description;
                    }
                }
                return PartialView("_groupDetail", model);
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
        public ActionResult Create(Group model)
        {
            if (!CheckAuthorizer.Authorize(Permission.ADD))
                return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _groupManagementService.CreateGroup(model);
                    return Json(new
                    {
                        Status = "01",
                        Message = "Them moi nhom san pham thanh cong"
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

        public ActionResult Update(Group model)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _groupManagementService.Update(model);
                    return Json(new
                    {
                        Status = "01",
                        Message = "Cap nhat nhom san pham thanh cong"
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
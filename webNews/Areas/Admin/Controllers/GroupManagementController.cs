using NLog;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Web.Mvc;
using webNews.Common;
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
        private readonly IConstantService _constantService;

        public GroupManagementController(IGroupManagementService groupManagementService)
        {
            _groupManagementService = groupManagementService;
            _constantService = new ConstantService();
        }

        // GET: Admin/GroupManagement
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
                    Action = action,
                    ListStatus = _constantService.ListStatus(false)
                };
                if (id > 0)
                {
                    var group = _groupManagementService.GetById(id);
                    if (group != null)
                    {
                        model.Id = group.Id;
                        model.Code = group.Code;
                        model.Name = group.Name;
                        model.ShortName = group.ShortName;
                        model.Description = group.Description;
                        model.Status = group.Status;
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
                    model.CreatedBy = Authentication.GetCurrentUser().Id;
                    var rs = _groupManagementService.CreateGroup(model);
                    return Json(new
                    {
                        Status = "01",
                        Message = "Thêm mới nhóm sản phẩm thành công"
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
                    model.UpdatedBy = Authentication.GetCurrentUser().Id;
                    var rs = _groupManagementService.UpdateGroup(model);

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
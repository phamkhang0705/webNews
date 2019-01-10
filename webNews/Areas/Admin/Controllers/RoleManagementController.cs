using webNews.Controllers;
using NLog;
using System;
using System.Web.Mvc;
using webNews.Language.Language;
using webNews.Models.RoleManagement;
using webNews.Domain.Services.RoleManagement;
using webNews.Security;
using webNews.Domain.Services.RoleManage;
using webNews.Domain.Entities;

namespace webNews.Areas.Admin.Controllers
{
    public class RoleManagementController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IRoleManagementService _roleManagementService;
        private readonly IRoleManageService _roleManageService;

        public RoleManagementController(IRoleManagementService roleManagementService, IRoleManageService roleManageService)
        {
            _roleManagementService = roleManagementService;
            _roleManageService = roleManageService;
        }

        // GET: Admin/RoleManagement
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
        public ActionResult GetData(SearchRoleModel search, int pageIndex, int pageSize)
        {
            if(!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                var data = _roleManagementService.Search(search, pageIndex, pageSize);
                var total = data.Total;
                return Json(new
                {
                    data = data.DataList,
                    total
                }, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                _log.Error("GetData RoleManagement error : " + ex);
                return null;
            }
        }

        #endregion GetData

        #region [ShowData]

        public ActionResult ShowModal(int id, string action)
        {
            try
            {
                var model = new Models.RoleManagement.RoleManagementModel()
                {
                    Action = action
                };

                if(id > 0)
                {
                    var role = _roleManageService.GetRole(id);
                    if(role != null)
                    {
                        model.Id = role.Id;
                        model.RoleName = role.RoleName;
                        model.Description = role.Description;
                    }
                }
                return PartialView("_roleDetail", model);
            }
            catch(Exception ex)
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
        public ActionResult Create(Security_Role model)
        {
            if(!CheckAuthorizer.Authorize(Permission.ADD))
                return RedirectToAction("Index", "Login");
            try
            {
                if(ModelState.IsValid)
                {
                    var rs = _roleManagementService.Create(model);
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
            catch(Exception ex)
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

        public ActionResult Update(Security_Role model)
        {
            if(!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if(ModelState.IsValid)
                {

                    var rs = _roleManagementService.Update(model);

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
            catch(Exception ex)
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
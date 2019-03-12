using NLog;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using webNews.Domain.Services.RoleManage;
using webNews.Domain.Services.UserManagement;
using webNews.Language.Language;
using webNews.Models;
using webNews.Models.UserManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class UserManagementController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IUserManagementService _userManagementService;
        private readonly IRoleManageService _roleManageService;

        public UserManagementController(IUserManagementService userManagementService, IRoleManageService roleManageService)
        {
            _userManagementService = userManagementService;
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
        public ActionResult GetData(SearchUserModel search, int pageIndex, int pageSize)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                var data = _userManagementService.GetList(search, pageIndex, pageSize);
                var total = data.Total;
                return Json(new
                {
                    data = data.DataList,
                    total
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetData UserManagementController error : " + ex);
                return null;
            }
        }

        #endregion GetData

        #region [ShowData]

        public ActionResult ShowModal(int id, string action)
        {
            try
            {
                var model = new UserModel()
                {
                    Action = action
                };
                model.ListRole = _roleManageService.GetListRole();
                model.ListStatus = new List<SelectListModel>
                {
                    new SelectListModel
                    {
                        Value = 1,
                        Text = "Hoạt động"
                    },
                    new SelectListModel
                    {
                        Value = 0,
                        Text = "Tài khoản khoá"
                    }
                };
                if (id > 0)
                {
                    var user = _userManagementService.GetUserById(id);
                    if (user != null)
                    {
                        model.FullName = user.UserName;
                        model.UserName = user.UserName;
                        model.FullName = user.FullName;
                        model.Email = user.Email;
                        model.Tel = user.Tel;
                        model.Status = user.Status;
                        model.UserId = user.UserId;
                        model.UserRole = user.UserRole.Value;
                    }
                }
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

        #endregion [ShowData]

        #region Create

        [HttpPost]
        public ActionResult Create(UserModel model)
        {
            if (!CheckAuthorizer.Authorize(Permission.ADD))
                return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    model.CreatedBy = UserName;
                    model.CreatedById = Int32.Parse(UserId);
                    model.UpdatedBy = UserName;
                    model.UpdatedById = Int32.Parse(UserId);
                    var rs = _userManagementService.Create(model);
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

        public ActionResult Update(UserModel model)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _userManagementService.Update(model);
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
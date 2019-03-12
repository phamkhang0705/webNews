using NLog;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using webNews.Areas.Admin.Models;
using webNews.Domain.Entities;
using webNews.Domain.Services.RoleManage;
using webNews.Language.Language;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class DecentralizateManagementController : BaseController
    {
        // GET: Admin/DecentralizateManagement

        #region khởi tạo

        private readonly Logger _log = LogManager.GetLogger("DecentralizateManagementController");
        private readonly IRoleManageService _roleManageService;

        public DecentralizateManagementController(IRoleManageService roleManageService)
        {
            _roleManageService = roleManageService;
        }

        #endregion khởi tạo

        #region trang index

        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");
            return View();
        }

        #endregion trang index

        #region tìm kiếm

        [HttpPost]
        public ActionResult Search(string name, int offset, int limit)
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            try
            {
                int pageIndex;

                if (offset == 0 || offset < limit)
                    pageIndex = 0;
                else
                    pageIndex = (offset / limit);

                var list = _roleManageService.GetListSecurity_Role(name, pageIndex, limit);
                var total = 0;
                if (list == null)
                {
                    total = 0;
                    return Json(new
                    {
                        total
                    }, JsonRequestBehavior.AllowGet);
                }
                var data = list.DataList;

                total = list.Total;
                return Json(new
                {
                    data,
                    total
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetData in RoleManageController error : " + ex);
                return null;
            }
        }

        #endregion tìm kiếm

        #region Bind popup Thêm - xác nhận

        [HttpPost]
        public ActionResult BindPupop(int code, string action)
        {
            var model = new RoleManagerCreateModel
            {
                Action = action,
                ListFunctions = _roleManageService.GetListFunctions(),
                ListPermissions = _roleManageService.GetListPermissions()
            };

            #region thông tin

            if (code > 0)
            {
                model.Role = _roleManageService.GetRole(code);
                model.ListMarked = _roleManageService.GetListRoleMark(code);
            }
            else
            {
                model.Role = new Security_Role();
                model.ListMarked = new List<Security_VwRoleService>();
            }

            #endregion thông tin

            #region return

            return PartialView("Add", model);

            #endregion return
        }

        #endregion Bind popup Thêm - xác nhận

        #region Thêm sửa xóa

        public ActionResult UpdateRole(int Id, string RoleName, string functionAndPermission)
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Id == 0 ? Permission.ADD : Permission.EDIT))
                return Json(new
                {
                    Status = "00",
                    Message = string.Format(Resource.PermissionContent_Lang)
                }, JsonRequestBehavior.AllowGet);

            var rs = _roleManageService.UpdateRole(new Security_Role() { Id = Id, RoleName = RoleName }, functionAndPermission);

            return Json(new
            {
                Status = rs,
                Message = rs ? "Phân quyền thành công" : "Phân quyền không thành công"
            }, JsonRequestBehavior.AllowGet);
        }

        #endregion Thêm sửa xóa
    }
}
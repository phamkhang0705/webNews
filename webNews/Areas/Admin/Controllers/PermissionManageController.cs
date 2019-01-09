using System;
using System.Web.Mvc;
using webNews.Language.Language;
using webNews.Security;
using NLog;
using webNews.Models.Common;
using webNews.Areas.Admin.Models;
using webNews.Domain.Entities;
using webNews.Domain.Services;

namespace webNews.Areas.Admin.Controllers
{
    public class PermissionManageController : Controller
    {
        #region khởi tạo

        private readonly ISystemService _systemService;
        private readonly Logger _log = LogManager.GetLogger("PermissionManageController");
        //UserService _user;


        public PermissionManageController(ISystemService systemService)
        {
            _systemService = systemService;
        }

        #endregion

        #region trang index
        /// <summary>
        /// trang index 
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");

            return View();
        }
        #endregion

        #region tìm kiếm 
        public ActionResult Search(BootstrapTableParams option, String name)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                //return Json(_smsAllRepository.GetListPermission(option, name));
                return Json(null);
            }
            catch (Exception ex)
            {
                _log.Error("GetData in PermissionManageController error : " + ex);
                return null;
            }
        }

        #endregion

        #region Show Modal
        public ActionResult ShowModal(int id, string action)
        {
            var model = new PermissionIndexModel { Action = action, Item = new PermissionCreateModel() };
            if (id > 0 && action != "Add")
            {
                //var item = _smsAllRepository.GetPermission(id);
                //model.Item.Id = item.Id;
                //model.Item.Description = item.Description;
                //model.Item.PermissionName = item.PermissionName;
            }
            return PartialView("Add", model);
        }
        #endregion
        #region Create
        [HttpPost]
        public ActionResult Create(PermissionIndexModel model)
        {
            if (!CheckAuthorizer.Authorize(Permission.ADD))
                return RedirectToAction("Index", "Login");
            if (ModelState.IsValid)
            {
                var per = new Security_Permission
                {
                    PermissionName = model.Item.PermissionName,
                    Description = model.Item.Description
                };
                var rs = _systemService.Security_Permission_Update(per);
                if (rs)
                {
                    return Json(new
                    {
                        Status = "01",
                        Message = "Tạo quyền thành công"
                    }, JsonRequestBehavior.AllowGet);
                }
                return Json(new
                {
                    Status = "00",
                    Message = Resource.Message_Error_Lang
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                Status = "00",
                Message = Resource.InvalidInfomation_Lang
            }, JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Update
        [HttpPost]
        public ActionResult Update(PermissionIndexModel model)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT))
                return RedirectToAction("Index", "Login");
            if (ModelState.IsValid)
            {
                var per = new Security_Permission
                {
                    Id = model.Item.Id,
                    PermissionName = model.Item.PermissionName,
                    Description = model.Item.Description
                };
                var rs = _systemService.Security_Permission_Update(per);
                if (rs)
                {
                    return Json(new
                    {
                        Status = "01",
                        Message = "Cập nhật quyền thành công"
                    }, JsonRequestBehavior.AllowGet);
                }
                return Json(new
                {
                    Status = "00",
                    Message = Resource.Message_Error_Lang
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                Status = "00",
                Message = Resource.InvalidInfomation_Lang
            }, JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Delete
        [HttpPost]
        public ActionResult Delete(PermissionIndexModel model)
        {
            if (!CheckAuthorizer.Authorize(Permission.DELETE))
                return RedirectToAction("Index", "Login");
            if (ModelState.IsValid)
            {
                var rs = _systemService.Security_Permission_Delete(model.Item.Id);
                if (rs > 0)
                {
                    return Json(new
                    {
                        Status = "01",
                        Message = "Xóa quyền thành công"
                    }, JsonRequestBehavior.AllowGet);
                }
                return Json(new
                {
                    Status = "00",
                    Message = Resource.Message_Error_Lang
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                Status = "00",
                Message = Resource.InvalidInfomation_Lang
            }, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}
using NLog;
using System;
using System.Dynamic;
using System.Web.Mvc;
using webNews.Areas.Admin.Models.BizAccountType;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Domain.Services.BizAccountGroupManagement;
using webNews.Domain.Services.BizAccountTypeManagement;
using webNews.Domain.Services.FileAttachManagement;
using webNews.Language.Language;
using webNews.Models.CategoryManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class BizAccountTypeController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IConstantService _constantService;
        private readonly IBizAccountGroupService _groupService;
        private readonly IBizAccountTypeService _typeService;
        private readonly IFileAttachManagementService _fileService;

        public BizAccountTypeController(IBizAccountGroupService groupService, IBizAccountTypeService typeService,
            IFileAttachManagementService fileService
            )
        {
            _groupService = groupService;
            _typeService = typeService;
            _constantService = new ConstantService();
            _fileService = fileService;
        }

        // GET: Admin/CategoryManagement
        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");
            dynamic model = new ExpandoObject();
            model.ListStatus = _constantService.ListStatus();
            model.ListGroups = _groupService.GetAllGroups();
            return View(model);
        }

        #region GetData

        [HttpPost]
        public ActionResult GetData(SearchCategoryModel search, int pageIndex, int pageSize)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                var data = _typeService.GetList(search, pageIndex, pageSize);
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
                var model = new BizAccountTypeModel()
                {
                    Action = action,
                    ListStatus = _constantService.ListStatus(false),
                    ListGroups = _groupService.GetAllGroups()
                };
                if (id > 0)
                {
                    var cate = _typeService.GetById(id);
                    if (cate != null)
                    {
                        model.Id = cate.Id;
                        model.Code = cate.Code;
                        model.Name = cate.Name;
                        model.Description = cate.Description;
                        model.Group = cate.Group;
                        model.Status = cate.Status;
                    }
                }
                return PartialView("_bizAccountTypeDetail", model);
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
        public ActionResult Create(BizAccountType model)
        {
            if (!CheckAuthorizer.Authorize(Permission.ADD))
                return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _typeService.Create(model);
                    if (rs > 0)
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Thêm mới loại tài khoản thành công"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Thêm mới loại tài khoản không thành công"
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

        public ActionResult Update(BizAccountType model)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _typeService.Update(model);
                    if (rs > 0)
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Cập nhật loại tài khoản thành công"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new
                    {
                        Status = "00",
                        Message = "Cập nhật loại tài khoản không thành công"
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
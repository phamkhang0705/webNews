﻿using NLog;
using System;
using System.Dynamic;
using System.Web.Mvc;
using webNews.Areas.Admin.Models.BizAccount;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Domain.Services.BizAccountManagement;
using webNews.Domain.Services.BizAccountTypeManagement;
using webNews.Domain.Services.FileAttachManagement;
using webNews.Language.Language;
using webNews.Models.CategoryManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class BizAccountController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IConstantService _constantService;
        private readonly IBizAccountService _service;
        private readonly IBizAccountTypeService _typeService;
        private readonly IFileAttachManagementService _fileService;

        public BizAccountController(IBizAccountService service, IBizAccountTypeService typeService,
            IFileAttachManagementService fileService
            )
        {
            _service = service;
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
            model.ListTypes = _service.GetAll();
            model.Types = _constantService.ListBizAccountType();
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
                var data = _service.GetList(search, pageIndex, pageSize);
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
                var model = new BizAccountModel()
                {
                    Action = action,
                    ListStatus = _constantService.ListStatus(false),
                    ListTypes = _typeService.GetAll(),
                    Types = _constantService.ListBizAccountType(false)
                };
                if (id > 0)
                {
                    var cate = _service.GetById(id);
                    if (cate != null)
                    {
                        model.Id = cate.Id;
                        model.Code = cate.Code;
                        model.Name = cate.Name;
                        model.CreditAccount = cate.CreditAccount;
                        model.DebtAccount = cate.DebtAccount;
                        model.Status = cate.Status;
                        model.Type = cate.Type;
                    }
                }
                return PartialView("_bizAccountDetail", model);
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
        public ActionResult Create(BizAccount model)
        {
            if (!CheckAuthorizer.Authorize(Permission.ADD))
                return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _service.Create(model);
                    if (rs > 0)
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Thêm mới tài khoản thành công"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Thêm mới tài khoản không thành công"
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

        public ActionResult Update(BizAccount model)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _service.Update(model);
                    if (rs > 0)
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Cập nhật tài khoản thành công"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new
                    {
                        Status = "00",
                        Message = "Cập nhật tài khoản không thành công"
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
﻿using NLog;
using System;
using System.Dynamic;
using System.IO;
using System.Web.Mvc;
using webNews.Areas.Admin.Models.Content;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Domain.Services.ContentManagement;
using webNews.Domain.Services.ContentTypeManagement;
using webNews.Language.Language;
using webNews.Models;
using webNews.Models.ContentTypeManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class ContentManagementController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IContentTypeManagementService _contentTypeManagement;
        private readonly IContentManagementService _contentManagement;
        private readonly IConstantService _constantService;

        public ContentManagementController(IContentTypeManagementService contentTypeManagement, IContentManagementService contentManagement
            )
        {
            _contentTypeManagement = contentTypeManagement;
            _contentManagement = contentManagement;
            _constantService = new ConstantService();
        }

        // GET: Admin/ContentManagement
        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");
            dynamic model = new ExpandoObject();
            model.ListStatus = _constantService.ListStatus();
            model.ListTypes = _contentTypeManagement.GetAllContentTypes();
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
                var data = _contentManagement.GetList(search, pageIndex, pageSize);
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
                var model = new ContentModel()
                {
                    Action = action,
                    ListStatus = _constantService.ListStatus(false),
                    ListTypes = _contentTypeManagement.GetAllContentTypes()
                };
                if (id > 0)
                {
                    var cate = _contentManagement.GetById(id);
                    if (cate != null)
                    {
                        model.Id = (int)cate.Id;
                        model.Title = cate.Title;
                        model.Url = cate.Url;
                        model.ContentType = cate.ContentType;
                        model.Type = cate.Type;
                        model.Link = cate.Link;
                        model.ContentUrl = cate.ContentUrl;
                        model.ContentText = cate.ContentText;
                        model.Description = cate.Description;
                        model.Status = cate.Status;
                        model.ContentCode = cate.ContentCode;
                    }
                }
                return PartialView("_contentDetail", model);
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
        [ValidateInput(false)]
        public ActionResult Create(Vw_Content model)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    string path = "";
                    var cate = new Content()
                    {
                        Title = model.Title,
                        Url = model.Url,
                        ContentType = model.ContentType,
                        Link = model.Link,
                        ContentUrl = model.ContentUrl,
                        ContentText = model.ContentText,
                        Description = model.Description,
                        Status = Convert.ToInt32(model.Status),
                        Type = Convert.ToInt32(model.Type),
                        CreatedDate = DateTime.Now,
                        CreatedBy = Authentication.GetCurrentUser().Id,
                    };

                    var rs = _contentManagement.CreateContent(cate);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Thêm mới nội dung thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "00",
                            Message = "Thêm mới nội dung không thành công!"
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
                _log.Error("Create is error: " + ex.Message);
                return Json(new
                {
                    Status = "0",
                    Message = Resource.InvalidInfomation_Lang
                }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion Create

        #region [Update]

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Update(Vw_Content model)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    string path = "";
                    var cate = new Content()
                    {
                        Id = Convert.ToInt32(model.Id),
                        Title = model.Title,
                        Url = model.Url,
                        ContentType = model.ContentType,
                        Link = model.Link,
                        ContentUrl = model.ContentUrl,
                        ContentText = model.ContentText,
                        Description = model.Description,
                        Status = Convert.ToInt32(model.Status),
                        CreatedDate = DateTime.Now,
                        CreatedBy = Authentication.GetCurrentUser().Id,
                        Type = Convert.ToInt32(model.Type),
                    };

                    var rs = _contentManagement.UpdateContent(cate);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Cập nhật nội dung thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "00",
                            Message = "Cập nhật nội dung không thành công!"
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
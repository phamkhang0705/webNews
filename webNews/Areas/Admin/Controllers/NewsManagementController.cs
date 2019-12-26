using NLog;
using System;
using System.Dynamic;
using System.IO;
using System.Web.Mvc;
using webNews.Areas.Admin.Models.Content;
using webNews.Areas.Admin.Models.News;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Domain.Services.ContentManagement;
using webNews.Domain.Services.ContentTypeManagement;
using webNews.Domain.Services.NewsCategoryManagement;
using webNews.Domain.Services.NewsManagement;
using webNews.Language.Language;
using webNews.Models;
using webNews.Models.ContentTypeManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class NewsManagementController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly INewsCategoryManagementService _contentTypeManagement;
        private readonly INewsManagementService _contentManagement;
        private readonly IConstantService _constantService;

        public NewsManagementController(INewsCategoryManagementService contentTypeManagement, INewsManagementService contentManagement
            )
        {
            _contentTypeManagement = contentTypeManagement;
            _contentManagement = contentManagement;
            _constantService = new ConstantService();
        }

        // GET: Admin/NewsManagement
        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");
            dynamic model = new ExpandoObject();
            model.ListStatus = _constantService.ListStatus();
            model.ListTypes = _contentTypeManagement.GetAllNewsCategories();
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
                _log.Error("GetData NewsManagement error : " + ex);
                return null;
            }
        }

        #endregion GetData

        #region [ShowData]

        public ActionResult ShowModal(int id, string action)
        {
            try
            {
                var model = new NewsModel()
                {
                    Action = action,
                    ListStatus = _constantService.ListStatus(false),
                    ListTypes = _contentTypeManagement.GetAllNewsCategories()
                };
                if (id > 0)
                {
                    var cate = _contentManagement.GetById(id);
                    if (cate != null)
                    {
                        model.Id = (int)cate.Id;
                        model.Title = cate.Title;
                        model.CategoryId = cate.CategoryId;
                        model.Status = cate.Status;
                        model.Content = cate.Content;
                        model.Image = cate.Image;
                        model.Description = cate.Description;
                    }
                }
                return PartialView("_newsDetail", model);
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
        public ActionResult Create(Vw_News news)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var cate = new News()
                    {
                        Title = news.Title,
                        Content = news.Content,
                        Description = news.Description,
                        Image = news.Image,
                        Status = Convert.ToInt32(news.Status),
                        CategoryId = Convert.ToInt32(news.CategoryId),
                        CreatedDate = DateTime.Now,
                        CreatedBy = Authentication.GetCurrentUser().UserName,
                        CreatedById = Authentication.GetCurrentUser().Id,
                    };

                    var type = _contentTypeManagement.GetById(Convert.ToInt32(cate.Type));

                    var rs = _contentManagement.CreateNews(cate);
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
        public ActionResult Update(Vw_News news)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var cate = new News()
                    {
                        Id = Convert.ToInt32(news.Id),
                        Title = news.Title,
                        Content = news.Content,
                        Description = news.Description,
                        Image = news.Image,
                        Status = Convert.ToInt32(news.Status),
                        CategoryId = Convert.ToInt32(news.CategoryId),
                        UpdatedDate = DateTime.Now,
                        UpdatedBy = Authentication.GetCurrentUser().UserName,
                        UpdatedById = Authentication.GetCurrentUser().Id,
                    };

                    var rs = _contentManagement.UpdateNews(cate);
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
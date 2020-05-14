﻿using System;
using System.Web.Mvc;
using webNews.Domain.Services.NewsManagement;
using webNews.Models.NewsManagement;
using System.Configuration;
using System.Linq;
using webNews.Domain.Services;
using webNews.Domain.Services.ContentManagement;
using webNews.Domain.Services.FileAttachManagement;

namespace webNews.Controllers
{
    public class NewsController : BaseController
    {
        private readonly INewsManagementService _newsManagement;
        private readonly IFileAttachManagementService _fileService;
        private readonly IContentManagementService _contentService;
        private readonly ISystemService _service;
        public NewsController(
            INewsManagementService newsManagement, IContentManagementService contentService,
            IFileAttachManagementService fileService,
            ISystemService service)
        {
            _newsManagement = newsManagement;
            _contentService = contentService;
            _fileService = fileService;
            _service = service;
        }
        // [OutputCache(Duration = 60 * 60 * 24, VaryByParam = "*")]
        // GET: News
        public ActionResult Index()
        {
            ViewBag.Title = "Gói sự kiện";
            ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
            ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
            ViewBag.Email = Convert.ToString(Session["FBEmail"]);
            ViewBag.avatar = Convert.ToString(Session["avatar"]);

            SearchNewsModelFE search = new SearchNewsModelFE();
            search.Page = 1;
            search.PageSize = Int32.Parse(ConfigurationManager.AppSettings["PageSize"]);
            search.group = "goi-su-kien";
            var content = _contentService.GetbyCode("NEWS");
            ViewBag.Content = content;
            var model = _newsManagement.GetNews(search);
            return View(model);
        }
        // [OutputCache(Duration = 60 * 60 * 24, VaryByParam = "*")]
        public ActionResult News()
        {
            ViewBag.Title = "Tin tức";
            ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
            ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
            ViewBag.Email = Convert.ToString(Session["FBEmail"]);
            ViewBag.avatar = Convert.ToString(Session["avatar"]);

            SearchNewsModelFE search = new SearchNewsModelFE();
            search.Page = 1;
            search.PageSize = Int32.Parse(ConfigurationManager.AppSettings["PageSize"]);
            search.group = "tin-tuc";
            var content = _contentService.GetbyCode("NEWS");
            ViewBag.Content = content;
            var model = _newsManagement.GetNews(search);
            return View(model);
        }
        // [OutputCache(Duration = 60 * 60 * 24, VaryByParam = "*")]
        public ActionResult Detail(string event_short_name)
        {
            var model = _newsManagement.GetNewsDetail(event_short_name);
            ViewBag.Title = "Chi tiết sự kiện";
            ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
            ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
            ViewBag.Email = Convert.ToString(Session["FBEmail"]);
            ViewBag.avatar = Convert.ToString(Session["avatar"]);
            return View(model);
        }
        // [OutputCache(Duration = 60 * 60 * 24, VaryByParam = "*")]
        public ActionResult NewsDetail(string news_short_name)
        {
            var model = _newsManagement.GetNewsDetail(news_short_name);
            ViewBag.Title = "Chi tiết tin tức";
            ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
            ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
            ViewBag.Email = Convert.ToString(Session["FBEmail"]);
            ViewBag.avatar = Convert.ToString(Session["avatar"]);
            SearchNewsModelFE search = new SearchNewsModelFE();
            search.Page = 1;
            search.PageSize = Int32.Parse(ConfigurationManager.AppSettings["PageSize"]);
            search.group = "tin-tuc";
            ViewBag.RelatedNews = _newsManagement.GetNews(search).Where(x => x.Id != model.Id).ToList();
            return View(model);
        }
    }
}
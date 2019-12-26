using System;
using System.Web.Mvc;
using webNews.Domain.Services.NewsManagement;
using webNews.Models.NewsManagement;
using System.Configuration;
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

        public ActionResult Detail(string news_short_name)
        {
            var model = _newsManagement.GetNewsDetail(news_short_name);
            ViewBag.Title = "Chi tiết sản phẩm";
            ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
            ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
            ViewBag.Email = Convert.ToString(Session["FBEmail"]);
            ViewBag.avatar = Convert.ToString(Session["avatar"]);
            return View(model);
        }
    }
}
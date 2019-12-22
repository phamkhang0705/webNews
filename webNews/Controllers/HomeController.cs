using NLog;
using System;
using System.Web.Mvc;
using webNews.Domain.Services;
using webNews.Domain.Services.CategoryManagement;
using webNews.Domain.Services.CustomerManagement;
using webNews.Domain.Services.FileAttachManagement;
using webNews.Models.CategoryManagement;
using webNews.Models.Common;

namespace webNews.Controllers
{
    //    [OutputCache(Duration = 60 * 60 * 24, VaryByParam = "*")]
    public class HomeController : Controller
    {
        private readonly ISystemService _service;
        private readonly ICustomerManagementService _customerManagementService;
        private readonly ICategoryManagementService _categoryService;
        private readonly Logger _log = LogManager.GetCurrentClassLogger();

        public HomeController(ISystemService service,
            ICustomerManagementService customerManagementService,
            ICategoryManagementService categoryService,
            IFileAttachManagementService fileService)
        {
            _service = service;
            _customerManagementService = customerManagementService;
            _categoryService = categoryService;
        }

        public ActionResult Index(SearchCategoryModelFE search)
        {
            try
            {
                ViewBag.Title = "Trang chủ - Thuedotot.vn";
                ViewBag.ListBestSeller = _categoryService.GetCategories(new SearchCategoryModelFE() { Page = 1, PageSize = 8 });
                ViewBag.ListSales = _categoryService.GetCategories(new SearchCategoryModelFE() { Page = 1, PageSize = 8 });
                ViewBag.ListTopRate = _categoryService.GetCategories(new SearchCategoryModelFE() { Page = 1, PageSize = 8 });
                ViewBag.ListSlides = _service.GetBanners(1);
                ViewBag.ListBanners = _service.GetBanners(2);
                ViewBag.Video = _service.GetBanner(3);
                ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
                ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
                ViewBag.Email = Convert.ToString(Session["FBEmail"]);
                ViewBag.avatar = Convert.ToString(Session["avatar"]);
                return View();
            }
            catch (Exception ex)
            {
                _log.Error("Index error : " + ex);
                return null;
            }
        }

        [OutputCache(Duration = 60 * 60 * 24, VaryByParam = "*")]
        public ActionResult About()
        {
            try
            {
                ViewBag.Title = "Giới thiệu";
                var about = _service.GetAbout();
                ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
                ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
                ViewBag.Email = Convert.ToString(Session["FBEmail"]);
                ViewBag.avatar = Convert.ToString(Session["avatar"]);
                return View(about);
            }
            catch (Exception ex)
            {
                _log.Error("About error : " + ex);
                return null;
            }
        }

        [OutputCache(Duration = 60 * 60 * 24, VaryByParam = "*")]
        public ActionResult ForCustomer()
        {
            try
            {
                ViewBag.Title = "Dành cho khách hàng";
                var about = _service.GetForCustomer();
                ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
                ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
                ViewBag.Email = Convert.ToString(Session["FBEmail"]);
                ViewBag.avatar = Convert.ToString(Session["avatar"]);
                return View(about);
            }
            catch (Exception ex)
            {
                _log.Error("ForCustomer error : " + ex);
                return null;
            }
        }

        [OutputCache(Duration = 60 * 60 * 24, VaryByParam = "*")]
        public ActionResult Contact()
        {
            try
            {
                var contact = _customerManagementService.GetCompanyInfo((int)CustomerType.Company);
                ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
                ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
                ViewBag.Email = Convert.ToString(Session["FBEmail"]);
                ViewBag.avatar = Convert.ToString(Session["avatar"]);
                return PartialView("~/Views/Shared/_FooterPartial.cshtml", contact);
            }
            catch (Exception ex)
            {
                _log.Error("Contact error : " + ex);
                return null;
            }
        }

        public ActionResult KeepResult()
        {
            return null;
        }

        [HttpPost]
        public JsonResult Login(string id, string name, string email, string picture)
        {
            Session["FBUserId"] = id;
            Session["FBUserName"] = name;
            Session["FBEmail"] = email;
            Session["avatar"] = picture;
            return Json(new { success = "True" });
        }

        [HttpPost]
        public JsonResult LogOut()
        {
            Session.Abandon();
            return Json(new { success = "True" });
        }
    }
}
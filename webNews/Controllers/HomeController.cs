using System;
using System.Linq;
using System.Web.Mvc;
using NLog;
using webNews.Domain.Services;
using webNews.Domain.Services.CategoryManagement;
using webNews.Domain.Services.CustomerManagement;
using webNews.Domain.Services.FileAttachManagement;
using webNews.Models.CategoryManagement;
using webNews.Models.Common;

namespace webNews.Controllers
{
    public class HomeController : Controller
    {
        private readonly ISystemService _service;
        private readonly ICustomerManagementService _customerManagementService;
        private readonly ICategoryManagementService _categoryService;
        private readonly IFileAttachManagementService _fileService;
        private readonly Logger _log = LogManager.GetCurrentClassLogger();

        public HomeController(ISystemService service, ICustomerManagementService customerManagementService, ICategoryManagementService categoryService, IFileAttachManagementService fileService)
        {
            _service = service;
            _customerManagementService = customerManagementService;
            _categoryService = categoryService;
            _fileService = fileService;
        }

        public ActionResult Index(SearchCategoryModelFE search)
        {
            try
            {
                ViewBag.Title = "Trang chủ - Thuedotot.vn";
                ViewBag.ListBestSeller = _categoryService.GetCategories(new SearchCategoryModelFE() {Page = 1,PageSize = 8});
                ViewBag.ListSales = _categoryService.GetCategories(new SearchCategoryModelFE() { Page = 1, PageSize = 8 });
                ViewBag.ListTopRate = _categoryService.GetCategories(new SearchCategoryModelFE() { Page = 1, PageSize = 8 });
                ViewBag.ListSlides = _service.GetBanners(1);
                ViewBag.Video = _service.GetBanner(3);
                return View();
            }
            catch (Exception ex)
            {
                _log.Error("Index error : " + ex);
                return null;
            }
        }

        public ActionResult About()
        {
            try
            {
                ViewBag.Title = "Giới thiệu";
                var about = _service.GetAbout();
                return View(about);
            }
            catch (Exception ex)
            {
                _log.Error("About error : " + ex);
                return null;
            }
        }

        public ActionResult ForCustomer()
        {
            try
            {
                ViewBag.Title = "Dành cho khách hàng";
                var about = _service.GetForCustomer();
                return View(about);
            }
            catch (Exception ex)
            {
                _log.Error("ForCustomer error : " + ex);
                return null;
            }
        }

        public ActionResult Contact()
        {
            try
            {
                var contact = _customerManagementService.GetCompanyInfo((int)CustomerType.Company);
                return PartialView("~/Views/Shared/_FooterPartial.cshtml", contact);
            }
            catch (Exception ex)
            {
                _log.Error("Contact error : " + ex);
                return null;
            }
        }
    }
}
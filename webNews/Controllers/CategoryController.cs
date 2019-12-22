using System;
using System.Web.Mvc;
using webNews.Domain.Services;
using webNews.Domain.Services.CategoryManagement;
using webNews.Domain.Services.ContentManagement;
using webNews.Domain.Services.FileAttachManagement;
using webNews.Domain.Services.GroupManagement;
using webNews.Models.CategoryManagement;

namespace webNews.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ICategoryManagementService _categoryService;
        private readonly IGroupManagementService _groupService;
        private readonly IFileAttachManagementService _fileService;
        private readonly IContentManagementService _contentService;
        private readonly ISystemService _service;

        public CategoryController(IGroupManagementService groupService,
            ICategoryManagementService categoryService,
            IContentManagementService contentService,
            IFileAttachManagementService fileService,
            ISystemService service)
        {
            _groupService = groupService;
            _categoryService = categoryService;
            _contentService = contentService;
            _fileService = fileService;
            _service = service;
        }

        // GET: Category
        public ActionResult Index()
        {
            SearchCategoryModelFE search = new SearchCategoryModelFE();
            search.Page = 1;
            search.PageSize = 9;
            search.IsRental = 1;
            search.categorytype = "all";
            search.group = "all";
            search.name = "";
            search.IsRental = 1;

            ViewBag.HeadingPage = _service.GetBanner(4);
            ViewBag.ListGroups = _groupService.GetAllGroups();
            ViewBag.Content = _contentService.GetbyCode("CATEGORY_RENTAL");
            ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
            ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
            ViewBag.Email = Convert.ToString(Session["FBEmail"]);
            ViewBag.avatar = Convert.ToString(Session["avatar"]);

            var model = _categoryService.GetCategories(search);
            return View(model);
        }

        public ActionResult Search(string group, string categorytype, string name, int page = 1)
        {
            SearchCategoryModelFE search = new SearchCategoryModelFE();
            search.Page = page;
            search.PageSize = 9;
            search.IsRental = 1;
            search.group = group;
            search.name = name;
            search.categorytype = categorytype;
            search.IsRental = 1;
            if (search.categorytype != "all")
            {
                if (search.categorytype == "0-12-thang")
                {
                    search.type = 1;
                    search.agetype = 1;
                }
                else if (search.categorytype == "1-3-tuoi")
                {
                    search.type = 2;
                    search.agetype = 1;
                }
                else
                {
                    search.type = 2;
                    search.agetype = 2;
                }
            }
            var model = _categoryService.GetCategories(search);
            ViewBag.CategoryType = search.categorytype;
            ViewBag.Content = _contentService.GetbyCode("CATEGORY_RENTAL");
            ViewBag.Group = search.group;
            ViewBag.Name = search.name;
            ViewBag.HeadingPage = _service.GetBanner(4);
            ViewBag.ListGroups = _groupService.GetAllGroups();
            ViewBag.Search = search;
            ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
            ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
            ViewBag.Email = Convert.ToString(Session["FBEmail"]);
            ViewBag.avatar = Convert.ToString(Session["avatar"]);
            return View("Index", model);
        }

        public ActionResult Detail(string shortname)
        {
            var model = _categoryService.GetCategoryDetail(shortname);
            ViewBag.ListFiles = _fileService.GetFileAttach(model.Id);
            ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
            ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
            ViewBag.Email = Convert.ToString(Session["FBEmail"]);
            ViewBag.avatar = Convert.ToString(Session["avatar"]);
            return View(model);
        }

        // GET: Sale
        public ActionResult Sale(SearchCategoryModelFE search, int page = 1, int pageSize = 9)
        {
            search.Page = page;
            search.PageSize = pageSize;
            search.IsSale = 1;
            if (search.categorytype != "all")
            {
                if (search.categorytype == "0-12-thang")
                {
                    search.type = 1;
                    search.agetype = 1;
                }
                else if (search.categorytype == "1-3-tuoi")
                {
                    search.type = 2;
                    search.agetype = 1;
                }
                else
                {
                    search.type = 2;
                    search.agetype = 2;
                }
            }
            var model = _categoryService.GetCategories(search);
            ViewBag.CategoryType = search.categorytype;
            ViewBag.Group = search.group;
            ViewBag.HeadingPage = _service.GetBanner(4);
            ViewBag.ListGroups = _groupService.GetAllGroups();
            ViewBag.FBUserId = Convert.ToString(Session["FBUserId"]);
            ViewBag.FBUserName = Convert.ToString(Session["FBUserName"]);
            ViewBag.Email = Convert.ToString(Session["FBEmail"]);
            ViewBag.avatar = Convert.ToString(Session["avatar"]);
            return View(model);
        }
    }
}
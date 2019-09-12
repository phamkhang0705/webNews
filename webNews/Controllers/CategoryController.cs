using PagedList;
using System.Web.Mvc;
using ServiceStack;
using webNews.Domain.Services;
using webNews.Domain.Services.CategoryManagement;
using webNews.Domain.Services.FileAttachManagement;
using webNews.Domain.Services.GroupManagement;
using webNews.Models.CategoryManagement;

namespace webNews.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ICategoryManagementService _categoryService;
        private readonly IFileAttachManagementService _fileService;
        private readonly IGroupManagementService _groupService;
        private readonly ISystemService _service;

        public CategoryController(IGroupManagementService groupService, ICategoryManagementService categoryService, IFileAttachManagementService fileService, ISystemService service)
        {
            _groupService = groupService;
            _categoryService = categoryService;
            _fileService = fileService;
            _service = service;
        }

        // GET: Category
        public ActionResult Index(SearchCategoryModelFE search, int page = 1, int pageSize = 9)
        {
            search.Page = page;
            search.PageSize = pageSize;
            search.IsRental = 1;
            if (search.CategoryType != -1 && search.CategoryType != 0)
            {
                if (search.CategoryType == 1)
                {
                    search.Type = 1;
                    search.AgeType = 1;
                }
                else if (search.CategoryType == 2)
                {
                    search.Type = 2;
                    search.AgeType = 1;
                }
                else
                {
                    search.Type = 2;
                    search.AgeType = 2;
                }
            }
            var model = _categoryService.GetCategories(search);
            ViewBag.CategoryType = search.CategoryType;
            ViewBag.Group = search.Group;
            ViewBag.HeadingPage = _service.GetBanner(4);
            ViewBag.ListGroups = _groupService.GetAllGroups();
            return View(model);
        }

        public ActionResult Detail(int id)
        {
            var model = _categoryService.GetCategoryDetail(id);
            ViewBag.ListFiles = _fileService.GetFileAttach(id);
            return View(model);
        }

        // GET: Sale
        public ActionResult Sale(SearchCategoryModelFE search, int page = 1, int pageSize = 9)
        {
            search.Page = page;
            search.PageSize = pageSize;
            search.IsSale = 1;
            if (search.CategoryType != -1)
            {
                if (search.CategoryType == 1)
                {
                    search.Type = 1;
                    search.AgeType = 1;
                }
                else if (search.CategoryType == 2)
                {
                    search.Type = 2;
                    search.AgeType = 1;
                }
                else
                {
                    search.Type = 2;
                    search.AgeType = 2;
                }
            }
            var model = _categoryService.GetCategories(search);
            ViewBag.CategoryType = search.CategoryType;
            ViewBag.Group = search.Group;
            ViewBag.HeadingPage = _service.GetBanner(4);
            ViewBag.ListGroups = _groupService.GetAllGroups();
            return View(model);
        }
    }
}
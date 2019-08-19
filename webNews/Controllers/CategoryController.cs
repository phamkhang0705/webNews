using PagedList;
using System.Web.Mvc;
using webNews.Domain.Services.CategoryManagement;
using webNews.Domain.Services.FileAttachManagement;
using webNews.Models.CategoryManagement;

namespace webNews.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ICategoryManagementService _categoryService;
        private readonly IFileAttachManagementService _fileService;

        public CategoryController(ICategoryManagementService categoryService, IFileAttachManagementService fileService)
        {
            _categoryService = categoryService;
            _fileService = fileService;
        }

        // GET: Category
        public ActionResult Index(SearchCategoryModelFE search, int page = 1, int pageSize = 9)
        {
            search.Page = page;
            search.PageSize = pageSize;

            var model = _categoryService.GetCategories(search);
            ViewBag.Type = search.Type;
            ViewBag.AgeType = search.AgeType;
            return View(model);
        }

        public ActionResult Detail(int id)
        {
            var model = _categoryService.GetCategoryDetail(id);
            ViewBag.ListFiles = _fileService.GetFileAttach(id);
            return View(model);
        }
    }
}
using PagedList;
using System.Web.Mvc;
using webNews.Domain.Services.ProductManagement;
using webNews.Models.ProductManagement;

namespace webNews.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductManagementService _productService;

        public ProductController(IProductManagementService productService)
        {
            _productService = productService;
        }

        // GET: Product
        public ActionResult Index(SearchProductModelFE search, int? page)
        {
            var model = _productService.GetProducts(search).ToPagedList(page ?? 1, 9);
            return View(model);
        }
    }
}
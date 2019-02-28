using System.Web.Mvc;

namespace webNews.Areas.Admin.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Admin/Dashboard

        public ActionResult Index()
        {
            //            ViewBag.breadcrumb = new List<Breadcrumb>{
            //                new Breadcrumb {Title = Resource.Homepage, Url = "", Active = false},
            //                new Breadcrumb {Title = "Dashboard", Url = "#", Active = true},
            //            };

            return View();
        }
    }
}
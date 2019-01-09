using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using webNews.Areas.Admin.Models;
using webNews.Language.Language;
using static webNews.FilterConfig;

namespace webNews.Areas.Admin.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Admin/Dashboard
        
        public ActionResult Index()
        {
            ViewBag.breadcrumb = new List<Breadcrumb>{
                new Breadcrumb {Title = Resource.Homepage, Url = "", Active = false},
                new Breadcrumb {Title = "Dashboard", Url = "#", Active = true},
            };

            return View();
        }
    }
}
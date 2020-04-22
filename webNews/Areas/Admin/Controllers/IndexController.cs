using NLog;
using System.Web.Mvc;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class IndexController : Controller
    {
        private readonly Logger _log;

        // GET: /Admin/Index/
        public IndexController()
        {
            _log = LogManager.GetLogger("IndexController");
        }

        public ActionResult Index()
        {
            //if (!CheckAuthorizer.IsAuthenticated())
            //    return RedirectToAction("Index", "Login");
            //if (!CheckAuthorizer.Authorize(Permission.VIEW))
            //    return RedirectToAction("Permission", "Error");
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult CheckAuthen()
        {
            return Json(new { IsAuthen = CheckAuthorizer.IsAuthenticated() }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Edit()
        {
            return View();
        }

        #region ChangeLang

        public ActionResult ChangeLanguage(string culture, string returnUrl)
        {
            if (!string.IsNullOrEmpty(culture))
            {
                var httpCookie = Request.Cookies["language"];
                if (httpCookie != null)
                {
                    var cookie = Response.Cookies["language"];
                    if (cookie != null) cookie.Value = culture;
                }
                Session["languagecode"] = culture;
                //new UserService().MarkMennu();
            }
            if (!string.IsNullOrEmpty(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Index");
        }

        #endregion ChangeLang
    }
}
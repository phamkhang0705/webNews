using System.Web.Mvc;
using webNews.Domain.Entities;
using webNews.Domain.Services;
using webNews.Domain.Services.ContentFavouriteManagement;

namespace webNews.Controllers
{
    public class ContentFavouriteController : BaseController
    {
        private readonly IContentFavouriteManagementService _contentService;
        private readonly ISystemService _service;

        public ContentFavouriteController(IContentFavouriteManagementService contentService,
            ISystemService service)
        {
            _contentService = contentService;
            _service = service;
        }

        // GET: ContentFavourite
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Favourite(ContentFavourite model)
        {
            var rs = _contentService.CreateContentFavourite(model);
            if (rs.ResponseCode == "01")
            {
                return Json(new
                {
                    Status = "01"
                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new
                {
                    Status = "01"
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
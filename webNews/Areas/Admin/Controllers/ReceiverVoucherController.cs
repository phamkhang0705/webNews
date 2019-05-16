using NLog;
using System;
using System.Dynamic;
using System.Web.Mvc;
using webNews.Domain.Services.PaymentVoucherManagement;
using webNews.Models.PaymentVoucherManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class ReceiverVoucherController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IPaymentVoucherService _paymetService;

        public ReceiverVoucherController(
            IPaymentVoucherService paymetService)
        {
            _paymetService = paymetService;
        }

        // GET: Admin/PaymentVoucher
        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");
            dynamic model = new ExpandoObject();
            return View(model);
        }

        #region GetData

        [HttpPost]
        public ActionResult GetData(SearchPaymentVoucher search, int pageIndex, int pageSize)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                if (pageIndex == 0 || pageIndex < pageSize)
                    pageIndex = 0;
                else
                    pageIndex = (pageSize / pageSize);
                search.PaymentType = true;
                var data = _paymetService.Search(search, pageIndex, pageSize);
                return Json(new
                {
                    data = data.DataList,
                    total = data.Total
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Get all product error : " + ex);
                return null;
            }
        }

        #endregion GetData
    }
}
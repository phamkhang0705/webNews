using NLog;
using System;
using System.Dynamic;
using System.Web.Mvc;
using webNews.Areas.Admin.Models.Payment;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Domain.Services;
using webNews.Domain.Services.BizAccountManagement;
using webNews.Domain.Services.InvoiceImportManagement;
using webNews.Domain.Services.PaymentVoucherManagement;
using webNews.Language.Language;
using webNews.Models.Common;
using webNews.Models.PaymentVoucherManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class PaymentVoucherController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IPaymentVoucherService _paymetService;
        private readonly IInvoiceImportService _invoiceImportService;
        private readonly ISystemService _systemService;
        private readonly IConstantService _constantService;
        private readonly IBizAccountService _bizAccountService;

        public PaymentVoucherController(
            IPaymentVoucherService paymetService,
            IInvoiceImportService invoiceImportService,
            ISystemService systemService,
            IBizAccountService bizAccountService)
        {
            _paymetService = paymetService;
            _invoiceImportService = invoiceImportService;
            _systemService = systemService;
            _bizAccountService = bizAccountService;
            _constantService = new ConstantService();
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
                search.PaymentType = false;
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

        public ActionResult ShowModal(string action, string code)
        {
            try
            {
                var payment = _paymetService.GetPaymentVoucher(null, code);

                var model = new PaymentModel()
                {
                    Action = action,
                    ListInvoiceImports = _invoiceImportService.GetInvoiceImports((int)InvoiceStatus.Active),
                    CreatedDate = DateTime.Now,
                    PaymentCode = _systemService.CodeGen(ObjectType.PaymentVoucher, PrefixType.PaymentVoucher),
                    ListBanks = _systemService.GetBanks(1),
                    ListBizAccounts = _bizAccountService.GetBizAccounts((int)webNews.Models.Common.BizAccountType.Payment)
                };
                if (action == "Edit")
                {
                    model.Id = payment.Id;
                    model.PaymentCode = payment.PaymentCode;
                    model.PaymentMethod = payment.PaymentMethod;
                    model.UserName = payment.UserName;
                    model.TotalMoney = payment.TotalMoney;
                    model.PaymentType = payment.PaymentType;
                    model.InvoiceCode = payment.InvoiceCode;
                    model.BankCode = payment.BankCode;
                    model.Description = payment.Description;
                    model.Status = payment.Status;
                    model.RemainMoney = payment.RemainMoney;
                    model.PaidMoney = payment.PaidMoney;
                    model.CreatedBy = payment.CreatedBy;
                    model.CreatedDate = payment.CreatedDate;
                    model.UpdateBy = payment.UpdateBy;
                    model.UpdatedDate = payment.UpdatedDate;
                    model.PersonType = payment.PersonType;
                    model.Payments_Person = payment.Payments_Person;
                    model.CustomerName = payment.CustomerName;
                    model.PaymentMoney = payment.PaymentMoney;
                    model.CreditAccount = payment.CreditAccount;
                    model.DebitAccount = payment.DebitAccount;
                };
                return PartialView("_ptvDetail", model);
            }
            catch (Exception ex)
            {
                _log.Error("Show modal is error: " + ex);
                return Json(new
                {
                    Status = "00",
                    Message = Resource.ServerError_Lang,
                    JsonRequestBehavior.AllowGet
                });
            }
        }

        public ActionResult Approve(string paymentCode)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _paymetService.Approve(paymentCode);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = rs.ResponseMessage
                        }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new
                    {
                        Status = "00",
                        Message = rs.ResponseMessage
                    }, JsonRequestBehavior.AllowGet);
                }

                var error = CheckValidate();
                return Json(new
                {
                    Status = "02",
                    Message = error[0]
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Update is error: " + ex);
                return Json(new
                {
                    Status = "0",
                    Message = Resource.InvalidInfomation_Lang
                }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Cancel(string paymentCode)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var rs = _paymetService.Cancel(paymentCode);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = rs.ResponseMessage
                        }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new
                    {
                        Status = "00",
                        Message = rs.ResponseMessage
                    }, JsonRequestBehavior.AllowGet);
                }

                var error = CheckValidate();
                return Json(new
                {
                    Status = "02",
                    Message = error[0]
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Update is error: " + ex);
                return Json(new
                {
                    Status = "0",
                    Message = Resource.InvalidInfomation_Lang
                }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetInvoiceImport(string code)
        {
            try
            {
                var invoice = _invoiceImportService.GetInvoiceImportByCode(code);
                return Json(invoice, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetInvoiceImportByCode is error: " + ex);
                return Json(new
                {
                    Status = "00",
                    Message = Resource.ServerError_Lang,
                    JsonRequestBehavior.AllowGet
                });
            }
        }

        public ActionResult Create(PaymentModel model)
        {
            if (!CheckAuthorizer.Authorize(Permission.ADD)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var payment = new Payment()
                    {
                        PaymentCode = model.PaymentCode,
                        UserName = Authentication.GetUserName(),
                        CreatedDate = DateTime.Now,
                        PaymentMethod = model.PaymentMethod,
                        Description = model.Description,
                        PersonType = (int)PersonType.Provider,
                        Payments_Person = model.Payments_Person,
                        BankCode = model.BankCode,
                        Status = (int)PaymentActive.Waiting,
                        InvoiceCode = model.InvoiceCode,
                        PaymentMoney = model.PaymentMoney,
                        PaymentType = false,
                        CreatedBy = Authentication.GetUserId(),
                        BizAccountType = model.BizAccountType,
                        CreditAccount = model.CreditAccount,
                        DebitAccount = model.DebitAccount,
                        TypePayment = (int)TypePayment.Other
                    };
                    var rs = _paymetService.CreatePayment(payment);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = rs.ResponseMessage
                        }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new
                    {
                        Status = "00",
                        Message = rs.ResponseMessage
                    }, JsonRequestBehavior.AllowGet);
                }

                var error = CheckValidate();
                return Json(new
                {
                    Status = "02",
                    Message = error[0]
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Update is error: " + ex);
                return Json(new
                {
                    Status = "0",
                    Message = Resource.InvalidInfomation_Lang
                }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Update(PaymentModel model)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    var payment = new Payment()
                    {
                        Id = model.Id,
                        PaymentCode = model.PaymentCode,
                        UserName = Authentication.GetUserName(),
                        CreatedDate = DateTime.Now,
                        PaymentMethod = model.PaymentMethod,
                        Description = model.Description,
                        PersonType = (int)PersonType.Provider,
                        Payments_Person = model.Payments_Person,
                        BankCode = model.BankCode,
                        Status = (int)PaymentActive.Waiting,
                        InvoiceCode = model.InvoiceCode,
                        PaymentMoney = model.PaymentMoney,
                        PaymentType = false,
                        CreatedBy = Authentication.GetUserId(),
                        CreditAccount = model.CreditAccount,
                        DebitAccount = model.DebitAccount,
                        BizAccountType = model.BizAccountType
                    };
                    var rs = _paymetService.UpdatePayment(payment);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = rs.ResponseMessage
                        }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new
                    {
                        Status = "00",
                        Message = rs.ResponseMessage
                    }, JsonRequestBehavior.AllowGet);
                }

                var error = CheckValidate();
                return Json(new
                {
                    Status = "02",
                    Message = error[0]
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Update is error: " + ex);
                return Json(new
                {
                    Status = "0",
                    Message = Resource.InvalidInfomation_Lang
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
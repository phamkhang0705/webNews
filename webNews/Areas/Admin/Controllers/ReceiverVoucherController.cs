using NLog;
using System;
using System.Dynamic;
using System.Web.Mvc;
using webNews.Areas.Admin.Models.Payment;
using webNews.Areas.Admin.Models.Receiver;
using webNews.Domain.Entities;
using webNews.Domain.Services;
using webNews.Domain.Services.BizAccountManagement;
using webNews.Domain.Services.InvoiceOutportManagement;
using webNews.Domain.Services.ReceiverVoucherManagement;
using webNews.Language.Language;
using webNews.Models.Common;
using webNews.Models.ReceiverVoucherManagement;
using webNews.Security;
using webNews.Common;

namespace webNews.Areas.Admin.Controllers
{
    public class ReceiverVoucherController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IReceiverVoucherService _paymetService;
        private readonly IInvoiceOutportService _outportService;
        private readonly ISystemService _systemService;
        private readonly IConstantService _constantService;
        private readonly IBizAccountService _bizAccountService;

        public ReceiverVoucherController(
            IReceiverVoucherService paymetService, IInvoiceOutportService outportService, ISystemService systemService, IBizAccountService bizAccountService)
        {
            _paymetService = paymetService;
            _outportService = outportService;
            _systemService = systemService;
            _constantService = new ConstantService();
            _bizAccountService = bizAccountService;
        }

        // GET: Admin/ReceiverVoucher
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
        public ActionResult GetData(SearchReceiverVoucher search, int pageIndex, int pageSize)
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

        public ActionResult ShowModal(string action, string code)
        {
            try
            {
                var payment = _paymetService.GetReceiverVoucher(null, code);

                var model = new ReceiverModel()
                {
                    Action = action,
                    ListInvoiceOutports = _outportService.GetInvoiceOutports((int)InvoiceStatus.Active),
                    CreatedDate = DateTime.Now,
                    PaymentCode = _systemService.CodeGen(ObjectType.ReceiverVoucher, PrefixType.ReceiverVoucher),
                    ListBanks = _systemService.GetBanks(1),
                    ListBizAccounts = _bizAccountService.GetBizAccounts((int)webNews.Models.Common.BizAccountType.Receive)
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
                    model.BizAccountType = payment.BizAccountType;
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

        public ActionResult GetInvoiceOutport(string code)
        {
            try
            {
                var invoice = _outportService.GetInvoiceOutportByCode(code);
                return Json(invoice, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetInvoiceOutport is error: " + ex);
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
                        PaymentType = true,
                        CreatedBy = Authentication.GetUserId(),
                        BizAccountType = model.BizAccountType,
                        CreditAccount = model.CreditAccount,
                        DebitAccount = model.DebitAccount,
                        ReceiverType = (int)ReceiverType.Other
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
                        UpdatedDate = DateTime.Now,
                        PaymentMethod = model.PaymentMethod,
                        Description = model.Description,
                        PersonType = (int)PersonType.Provider,
                        Payments_Person = model.Payments_Person,
                        BankCode = model.BankCode,
                        Status = (int)PaymentActive.Waiting,
                        InvoiceCode = model.InvoiceCode,
                        PaymentMoney = model.PaymentMoney,
                        PaymentType = true,
                        UpdateBy = Authentication.GetUserId(),
                        BizAccountType = model.BizAccountType,
                        CreditAccount = model.CreditAccount,
                        DebitAccount = model.DebitAccount
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
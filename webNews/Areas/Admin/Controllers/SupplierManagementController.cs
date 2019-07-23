using NLog;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Web.Mvc;
using webNews.Areas.Admin.Models.Customer;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Domain.Services;
using webNews.Domain.Services.CustomerManagement;
using webNews.Language.Language;
using webNews.Models.Common;
using webNews.Models.CustomerManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class SupplierManagementController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly ICustomerManagementService _customerManagementService;
        private readonly IConstantService _constantService;
        private readonly ISystemService _systemService;

        public SupplierManagementController(ICustomerManagementService customerManagementService, ISystemService systemService)
        {
            _customerManagementService = customerManagementService;
            _constantService = new ConstantService();
            _systemService = systemService;
        }

        // GET: Admin/CustomerManagement
        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");
            dynamic model = new ExpandoObject();
            model.ListStatus = _constantService.ListStatus();
            return View(model);
        }

        #region GetData

        [HttpPost]
        public ActionResult GetData(SearchCustomerModel search, int pageIndex, int pageSize)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                search.CustomerType = (int)CustomerType.Supplier;
                var data = _customerManagementService.GetList(search, pageIndex, pageSize);
                var total = data.Total;
                return Json(new
                {
                    data = data.DataList,
                    total
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetData CustomerManagement error : " + ex);
                return null;
            }
        }

        #endregion GetData

        #region [ShowData]

        public ActionResult ShowModal(int id, string action)
        {
            try
            {
                var model = new CustomerModel()
                {
                    Action = action,
                    ListStatus = _constantService.ListStatus(),
                    ListProvinces = _systemService.GetProvinces(),
                    ListDistricts = new List<District>(),
                    ListWards = new List<Ward>()
                };
                if (id > 0)
                {
                    var cus = _customerManagementService.GetCustomerById(id);
                    if (cus != null)
                    {
                        model.Id = cus.Id;
                        model.CustomerCode = cus.CustomerCode;
                        model.CustomerName = cus.CustomerName;
                        model.Description = cus.Description;
                        model.Status = cus.Status;
                        model.Phone = cus.Phone;
                        model.Email = cus.Email;
                        model.Facebook = cus.Facebook;
                        model.Address = cus.Address;
                        model.ProvinceId = cus.ProvinceId;
                        model.DistrictId = cus.DistrictId;
                        model.WardId = cus.WardId;
                    }
                }
                else
                {
                    model.CustomerCode = _systemService.CodeGen(ObjectType.Supplier);
                }
                return PartialView("_supplierDetail", model);
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

        public ActionResult GetDistrictByProvinceId(string provinceId)
        {
            try
            {
                var data = _systemService.GetDistricts(provinceId);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetDistrictByProvinceIds is error: " + ex);
                return Json(new
                {
                    Status = "00",
                    Message = Resource.ServerError_Lang,
                    JsonRequestBehavior.AllowGet
                });
            }
        }

        public ActionResult GetWardByDistrictId(string districtId)
        {
            try
            {
                var data = _systemService.GetWards(districtId);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetWardByDistrictId is error: " + ex);
                return Json(new
                {
                    Status = "00",
                    Message = Resource.ServerError_Lang,
                    JsonRequestBehavior.AllowGet
                });
            }
        }

        #endregion [ShowData]

        #region Create

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(Vw_Customer customer)
        {
            if (!CheckAuthorizer.Authorize(Permission.ADD)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    customer.CreatedBy = Authentication.GetUserId();
                    customer.CreatedDate = DateTime.Now;
                    customer.CustomerType = (int)CustomerType.Supplier;
                    var rs = _customerManagementService.CreateCustomer(customer);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Thêm mới khách hàng thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "00",
                            Message = "Thêm mới khách hàng không thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
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

        #endregion Create

        #region [Update]
        [ValidateInput(false)]
        public ActionResult Update(Vw_Customer customer)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    customer.UpdatedBy = Authentication.GetUserId();
                    customer.UpdatedDate = DateTime.Now;
                    var rs = _customerManagementService.UpdateCustomer(customer);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Cập nhật khách hàng thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "00",
                            Message = "Cập nhật khách hàng không thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
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

        #endregion [Update]
    }
}
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using webNews.Domain.Entities;
using webNews.Domain.Services;
using webNews.Domain.Services.CategoryManagement;
using webNews.Domain.Services.CustomerManagement;
using webNews.Domain.Services.InvoiceOutportManagement;
using webNews.Language.Language;
using webNews.Models.Common;
using webNews.Models.InvoiceOutportManagement;

namespace webNews.Controllers
{
    public class CartController : Controller
    {
        private const string CartSession = "CartSession";
        private const string QuantitySession = "QuantitySession";

        private readonly ICategoryManagementService _categoryService;
        private readonly ISystemService _systemService;
        private readonly ICustomerManagementService _customerService;
        private readonly IInvoiceOutportService _invoiceOutportService;

        public CartController(ICategoryManagementService categoryService
            , ISystemService systemService
            , ICustomerManagementService customerService
            , IInvoiceOutportService invoiceOutportService)
        {
            _categoryService = categoryService;
            _systemService = systemService;
            _customerService = customerService;
            _invoiceOutportService = invoiceOutportService;
        }
        // GET: Cart
        public ActionResult Index()
        {
            var cart = Session[CartSession];
            var list = new List<Common.Common.CartItem>();
            if (cart != null)
            {
                list = (List<Common.Common.CartItem>)cart;
            }
            return View(list);
        }

        public JsonResult DeleteAll()
        {
            Session[CartSession] = null;
            return Json(new
            {
                status = true
            });
        }

        public JsonResult Delete(long id)
        {
            var sessionCart = (List<Common.Common.CartItem>)Session[CartSession];
            sessionCart.RemoveAll(x => x.Category.Id == id);
            Session[CartSession] = sessionCart;
            Session[QuantitySession] = (int)sessionCart.Sum(x => x.Quantity);
            return Json(new
            {
                Status = true,
                TotalQuantity = Session[QuantitySession]
            });
        }

        public JsonResult Update(string cartModel)
        {
            var jsonCart = new JavaScriptSerializer().Deserialize<List<Common.Common.CartItem>>(cartModel);
            var sessionCart = (List<Common.Common.CartItem>)Session[CartSession];

            foreach (var item in sessionCart)
            {
                var jsonItem = jsonCart.SingleOrDefault(x => x.Category.Id == item.Category.Id);
                if (jsonItem != null)
                {
                    item.Quantity = jsonItem.Quantity;
                }
            }
            Session[CartSession] = sessionCart;
            Session[QuantitySession] = (int)sessionCart.Sum(x => x.Quantity);
            return Json(new
            {
                Status = true,
                TotalQuantity = Session[QuantitySession]
            });
        }

        public ActionResult AddItem(int productId, int quantity)
        {
            var category = _categoryService.GetCateById(productId);
            var cart = Session[CartSession];
            if (cart != null)
            {
                var list = (List<Common.Common.CartItem>)cart;

                if (list.Exists(x => x.Category.Id == productId))
                {
                    foreach (var item in list)
                    {
                        if (item.Category.Id == productId)
                        {
                            item.Quantity += quantity;
                        }
                    }
                }
                else
                {
                    //tạo mới đối tượng cart item
                    var item = new Common.Common.CartItem();
                    item.Category = category;
                    item.Quantity = quantity;
                    list.Add(item);
                }
                var totalQuantity = (int)list.Sum(x => x.Quantity);
                //Gán vào session
                Session[CartSession] = list;
                Session[QuantitySession] = totalQuantity;
            }
            else
            {
                //tạo mới đối tượng cart item
                var item = new Common.Common.CartItem();
                item.Category = category;
                item.Quantity = quantity;
                var list = new List<Common.Common.CartItem>();

                list.Add(item);
                var totalQuantity = (int)list.Sum(x => x.Quantity);
                //Gán vào session
                Session[CartSession] = list;
                Session[QuantitySession] = totalQuantity;
            }
            return Json(new
            {
                Status = true,
                Message = "Thêm mới giỏ hàng thành công!",
                Data = Session[CartSession],
                TotalQuantity = Session[QuantitySession]
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult CheckOut()
        {
            Common.Common.CheckOutModel model = new Common.Common.CheckOutModel();
            model.ListProvinces = _systemService.GetProvinces();
            model.ListDistricts = new List<District>();
            model.ListWards = new List<Ward>();
            return View(model);
        }

        [HttpPost]
        public ActionResult CheckOut(Common.Common.CheckOutModel model)
        {
            var cart = Session[CartSession];
            var listCartItem = (List<Common.Common.CartItem>)cart;
            var cus = new Vw_Customer();
            var check = _customerService.GetByPhone(model.Phone);
            if (check == null)
            {
                cus = new Vw_Customer()
                {
                    CustomerCode = _systemService.CodeGen(ObjectType.Customer),
                    CustomerName = model.CustomerName,
                    CustomerType = (int)CustomerType.Customer,
                    Status = 1,
                    CreatedDate = DateTime.Now,
                    Phone = model.Phone,
                    Facebook = "",
                    Address = model.Address,
                    Email = model.Email,
                    ProvinceId = model.ProvinceId,
                    DistrictId = model.DistrictId,
                    WardId = model.WardId
                };
            }
            else
            {
                cus = check;
            }

            InvoiceOutportModel outport = new InvoiceOutportModel();
            outport.CustomerCode = cus.CustomerCode;
            outport.CustomerName = cus.CustomerName;
            outport.CategoryItems = new List<CategoryItem>();
            outport.Active = (int)InvoiceStatus.Draff;
            outport.Type = 2;
            foreach (var item in listCartItem)
            {
                var cateItem = new CategoryItem();
                cateItem.Id = item.Category.Id;
                cateItem.Code = item.Category.Code;
                cateItem.Name = item.Category.Name;
                cateItem.Quantity = item.Quantity;
                outport.CategoryItems.Add(cateItem);
            }
            var rs = _invoiceOutportService.CustomCreate(outport);
            if (rs.ResponseCode == "01")
            {
                var sessionCart = (List<Common.Common.CartItem>)Session[CartSession];

                Session[CartSession] = new List<Common.Common.CartItem>();
                Session[QuantitySession] = 0;
            }
            return Json(new
            {
                Status = rs.ResponseCode,
                Message = rs.ResponseMessage,
                JsonRequestBehavior.AllowGet
            });

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
                return Json(new
                {
                    Status = "00",
                    Message = Resource.ServerError_Lang,
                    JsonRequestBehavior.AllowGet
                });
            }
        }
    }
}
using NLog;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Globalization;
using System.IO;
using System.Web.Mvc;
using webNews.Areas.Admin.Models.Product;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Domain.Services.CategoryManagement;
using webNews.Domain.Services.FileAttachManagement;
using webNews.Domain.Services.GroupManagement;
using webNews.Domain.Services.OrderTypeManagement;
using webNews.Domain.Services.PriceManagement;
using webNews.Domain.Services.ProductManagement;
using webNews.Language.Language;
using webNews.Models;
using webNews.Models.ProductManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class ProductManagementController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly IProductManagementService _productManagementService;
        private readonly IConstantService _constantService;
        private readonly IPriceManagementService _priceService;
        private readonly IOrderTypeManagementService _orderTypeManagementService;
        private readonly ICategoryManagementService _categoryManagementService;
        private readonly IFileAttachManagementService _fileService;

        public ProductManagementController(IProductManagementService productManagementService,
            IPriceManagementService priceService,
            IOrderTypeManagementService orderTypeManagementService,
            ICategoryManagementService categoryManagementService,
            IFileAttachManagementService fileService
            )
        {
            _productManagementService = productManagementService;
            _categoryManagementService = categoryManagementService;
            _constantService = new ConstantService();
            _fileService = fileService;
        }

        // GET: Admin/ProductManagement
        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");
            dynamic model = new ExpandoObject();
            model.ListStatus = _constantService.ListStatus();
            model.ListCategories = _categoryManagementService.GetAllCategories();
            return View(model);
        }

        #region GetData

        [HttpPost]
        public ActionResult GetData(SearchProductModel search, int pageIndex, int pageSize)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                var data = _productManagementService.GetList(search, pageIndex, pageSize);
                var total = data.Total;
                return Json(new
                {
                    data = data.DataList,
                    total
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetData ProductManagement error : " + ex);
                return null;
            }
        }

        #endregion GetData

        #region [ShowData]

        public ActionResult ShowModal(int id, string action)
        {
            try
            {
                var model = new ProductModel()
                {
                    Action = action,
                    ListStatus = _constantService.ListStatus(false),
                    ListCategories = _categoryManagementService.GetAllCategories(),
                    Status = 1
                };
                if (id > 0)
                {
                    var pro = _productManagementService.GetProductById(id);
                    if (pro != null)
                    {
                        model.Id = pro.Id;
                        model.ProductCode = pro.ProductCode;
                        model.ProductName = pro.ProductName;
                        //                        model.Inventory = pro.Inventory;
                        model.Quantity = pro.Quantity;
                        model.Description = pro.Description;
                        model.Solution = pro.Solution;
                        model.Status = pro.Status;
                        model.files = pro.files;
                        if (pro.files != null)
                        {
                            model.lstFiles = pro.files.Split(',');
                        }

                        model.ListFiles = _fileService.GetFileAttach(null, id, null);
                    }
                }
                return PartialView("_ProductDetail", model);
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

        #endregion [ShowData]

        #region Create

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(FormCollection fc)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    string path = "";
                    var cate = new Product()
                    {
                        CategoryId = Int32.Parse(fc["CategoryId"]),
                        ProductCode = fc["ProductCode"],
                        ProductName = fc["ProductName"],
                        Description = fc["Description"],
                        Solution = fc["Solution"],
                        Quantity = Int32.Parse(fc["Quantity"]),
                        //                        Inventory = Int32.Parse(fc["Inventory"]),
                        Status = Int32.Parse(fc["Status"]),
                        UpdatedDate = DateTime.Now,
                        UpdatedBy = Authentication.GetCurrentUser().Id,
                    };
                    var lstFiles = new List<string>();
                    foreach (string file in Request.Files)
                    {
                        var fileContent = Request.Files[file];
                        string outErr = "";

                        if (!ValidateFile(fileContent, ref outErr))
                        {
                            var err = new JsonRs() { Status = "00", Message = outErr };
                            return Json(err, JsonRequestBehavior.AllowGet);
                        }
                    }
                    var fileNameStr = "";
                    var pathStr = "";

                    if (Request.Files.Count > 0)
                    {
                        //Đọc file
                        foreach (string item in Request.Files)
                        {
                            var fileContent = Request.Files[item];
                            string extension = Path.GetExtension(fileContent.FileName).ToLower();
                            string fileName = Path.GetFileNameWithoutExtension(fileContent.FileName).ToUrlSegment(250).ToLower();
                            string fullFileName = string.Format("{0}{1}", fileName, extension);
                            if (extension != ".pdf"
                               && extension != ".png"
                               && extension != ".jpg"
                               && extension != ".gif"
                               && extension != ".tiff"
                               && extension != ".bmp")
                            {
                                var error1 = new JsonRs { Status = "00", Message = "Lỗi định dạng" };
                                return Json(error1, JsonRequestBehavior.AllowGet);
                            }
                            fileNameStr += !string.IsNullOrEmpty(fullFileName) ? fullFileName + "|" : "";
                            pathStr += !string.IsNullOrEmpty(fullFileName) ? "/" + fullFileName + "|" : "";
                            if (fileContent.ContentLength > 0 && !string.IsNullOrEmpty(fileContent.FileName))
                            {
                                bool folderExists = Directory.Exists(Server.MapPath(string.Format("{0}", "~/Content/Product/")));
                                if (!folderExists)
                                {
                                    path = Path.Combine(Server.MapPath(string.Format("{0}", "~/Content/Product/")), fullFileName);
                                    Directory.CreateDirectory(Server.MapPath(string.Format("{0}", "~/Content/Product/")));
                                    fileContent.SaveAs(path);
                                }
                                else
                                {
                                    path = Path.Combine(Server.MapPath(string.Format("{0}", "~/Content/Product/")), fullFileName);
                                    fileContent.SaveAs(path);
                                }
                                lstFiles.Add(path);
                            }
                        }
                    }
                    var rs = _productManagementService.CreateProduct(cate, lstFiles);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Thêm mới kho sản phẩm thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "00",
                            Message = "Thêm mới kho sản phẩm không thành công!"
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

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Update(FormCollection fc)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    string path = "";
                    var cate = new Product()
                    {
                        Id = Int32.Parse(fc["Id"]),
                        CategoryId = Int32.Parse(fc["CategoryId"]),
                        ProductCode = fc["ProductCode"],
                        ProductName = fc["ProductName"],
                        Description = fc["Description"],
                        Solution = fc["Solution"],
                        Quantity = Int32.Parse(fc["Quantity"]),
                        //                        Inventory = Int32.Parse(fc["Inventory"]),
                        Status = Int32.Parse(fc["Status"]),
                        UpdatedDate = DateTime.Now,
                        UpdatedBy = Authentication.GetCurrentUser().Id,
                    };

                    var files = fc["ListFiles"];
                    var listFiles = files.FromJson<List<FileAttach>>();

                    var lstFiles = new List<string>();
                    foreach (string file in Request.Files)
                    {
                        var fileContent = Request.Files[file];
                        string outErr = "";

                        if (!ValidateFile(fileContent, ref outErr))
                        {
                            var err = new JsonRs() { Status = "00", Message = outErr };
                            return Json(err, JsonRequestBehavior.AllowGet);
                        }
                    }

                    var fileNameStr = "";
                    var pathStr = "";

                    if (Request.Files.Count > 0)
                    {
                        //Đọc file
                        foreach (string item in Request.Files)
                        {
                            var fileContent = Request.Files[item];
                            string extension = Path.GetExtension(fileContent.FileName).ToLower();
                            string fileName = Path.GetFileNameWithoutExtension(fileContent.FileName).ToUrlSegment(250).ToLower();
                            string fullFileName = string.Format("{0}{1}", fileName, extension);
                            if (extension != ".pdf"
                               && extension != ".png"
                               && extension != ".jpg"
                               && extension != ".gif"
                               && extension != ".tiff"
                               && extension != ".bmp")
                            {
                                var error1 = new JsonRs { Status = "00", Message = "Lỗi định dạng" };
                                return Json(error1, JsonRequestBehavior.AllowGet);
                            }
                            fileNameStr += !string.IsNullOrEmpty(fullFileName) ? fullFileName + "|" : "";
                            pathStr += !string.IsNullOrEmpty(fullFileName) ? "/" + fullFileName + "|" : "";
                            if (fileContent.ContentLength > 0 && !string.IsNullOrEmpty(fileContent.FileName))
                            {
                                bool folderExists = Directory.Exists(Server.MapPath(string.Format("{0}", "~/Content/Product/")));
                                if (!folderExists)
                                {
                                    path = Path.Combine(Server.MapPath(string.Format("{0}", "~/Content/Product/")), fullFileName);
                                    Directory.CreateDirectory(Server.MapPath(string.Format("{0}", "~/Content/Product/")));
                                    fileContent.SaveAs(path);
                                }
                                else
                                {
                                    path = Path.Combine(Server.MapPath(string.Format("{0}", "~/Content/Product/")), fullFileName);
                                    fileContent.SaveAs(path);
                                }
                                lstFiles.Add(path);
                            }
                        }
                    }
                    var rs = _productManagementService.UpdateProduct(cate, lstFiles, listFiles);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Cập nhật kho sản phẩm thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "00",
                            Message = "Cập nhật kho sản phẩm không thành công!"
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
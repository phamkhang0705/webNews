using NLog;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Web.Mvc;
using webNews.Areas.Admin.Models.Category;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Domain.Services.CategoryManagement;
using webNews.Domain.Services.FileAttachManagement;
using webNews.Domain.Services.GroupManagement;
using webNews.Domain.Services.OrderTypeManagement;
using webNews.Domain.Services.PriceManagement;
using webNews.Language.Language;
using webNews.Models;
using webNews.Models.CategoryManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class CategoryManagementController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly ICategoryManagementService _categoryManagementService;
        private readonly IConstantService _constantService;
        private readonly IPriceManagementService _priceService;
        private readonly IOrderTypeManagementService _orderTypeManagementService;
        private readonly IGroupManagementService _groupManagementService;
        private readonly IFileAttachManagementService _fileService;

        public CategoryManagementController(ICategoryManagementService categoryManagementService,
            IPriceManagementService priceService,
            IOrderTypeManagementService orderTypeManagementService,
            IGroupManagementService groupManagementService,
            IFileAttachManagementService fileService
            )
        {
            _categoryManagementService = categoryManagementService;
            _priceService = priceService;
            _orderTypeManagementService = orderTypeManagementService;
            _groupManagementService = groupManagementService;
            _constantService = new ConstantService();
            _fileService = fileService;
        }

        // GET: Admin/CategoryManagement
        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");
            dynamic model = new ExpandoObject();
            model.ListStatus = _constantService.ListStatus();
            model.ListGroups = _groupManagementService.GetAllGroups();
            return View(model);
        }

        #region GetData

        [HttpPost]
        public ActionResult GetData(SearchCategoryModel search, int pageIndex, int pageSize)
        {
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Index", "Login");
            try
            {
                var data = _categoryManagementService.GetList(search, pageIndex, pageSize);
                var total = data.Total;
                return Json(new
                {
                    data = data.DataList,
                    total
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetData GroupManagement error : " + ex);
                return null;
            }
        }

        #endregion GetData

        #region [ShowData]

        public ActionResult ShowModal(int id, string action)
        {
            try
            {
                var model = new CategoryModel()
                {
                    Action = action,
                    ListStatus = _constantService.ListStatus(false),
                    ListOrderTypes = _orderTypeManagementService.GetAllOrderTypes(),
                    ListGroups = _groupManagementService.GetAllGroups(),
                    ListAgeType = _constantService.ListAgeType(false)
                };
                if (id > 0)
                {
                    var cate = _categoryManagementService.GetCateById(id);
                    if (cate != null)
                    {
                        model.Id = cate.Id;
                        model.Code = cate.Code;
                        model.Name = cate.Name;
                        model.AgeType = cate.AgeType;
                        model.FromAge = cate.FromAge;
                        model.ToAge = cate.ToAge;
                        model.Description = cate.Description;
                        model.MoreInformation = cate.MoreInformation;
                        model.Status = cate.Status;
                        model.groupids = cate.groupids;
                        model.groupnames = cate.groupnames;
                        model.prices = cate.prices;
                        model.files = cate.files;
                        model.lstFiles = cate.files != null ? cate.files.Split(',') : new string[1000];
                        model.ListCategoryPrices = _priceService.GetCategoryPrices(id);
                        model.ListGroupCategorys = _categoryManagementService.GetGroupCategories(id);
                        model.ListFiles = _fileService.GetFileAttach(id);
                    }
                }
                return PartialView("_categoryDetail", model);
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
                    var cate = new Category()
                    {
                        Code = fc["Code"],
                        Name = fc["Name"],
                        AgeType = Convert.ToInt32(fc["AgeType"]),
                        FromAge = Convert.ToInt32(fc["FromAge"]),
                        ToAge = Convert.ToInt32(fc["ToAge"]),
                        Description = fc["Description"],
                        MoreInformation = fc["MoreInformation"],
                        Status = Convert.ToInt32(fc["Status"]),
                        CreatedDate = DateTime.Now,
                        CreatedBy = Authentication.GetCurrentUser().Id,
                    };
                    var groupId = fc["GroupId"];
                    var lstGroup = groupId.Split(',');
                    var prices = fc["prices"];
                    var lstPrices = prices.FromJson<List<ProductPrice>>();
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
                            if (Path.GetExtension(fileContent.FileName).ToLower() != ".pdf"
                               && Path.GetExtension(fileContent.FileName).ToLower() != ".png"
                               && Path.GetExtension(fileContent.FileName).ToLower() != ".jpg"
                               && Path.GetExtension(fileContent.FileName).ToLower() != ".gif"
                               && Path.GetExtension(fileContent.FileName).ToLower() != ".tiff"
                               && Path.GetExtension(fileContent.FileName).ToLower() != ".bmp")
                            {
                                var error1 = new JsonRs { Status = "00", Message = "Loi dinh dang" };
                                return Json(error1, JsonRequestBehavior.AllowGet);
                            }
                            string fileName = Path.GetFileName(fileContent.FileName);
                            fileNameStr += !string.IsNullOrEmpty(fileName) ? fileName + "|" : "";
                            pathStr += !string.IsNullOrEmpty(fileName) ? "/" + fileName + "|" : "";
                            if (fileContent.ContentLength > 0 && !string.IsNullOrEmpty(fileContent.FileName))
                            {
                                bool folderExists = Directory.Exists(Server.MapPath(string.Format("{0}", "~/Content/Cate/")));
                                if (!folderExists)
                                {
                                    path = Path.Combine(Server.MapPath(string.Format("{0}", "~/Content/Cate/")), fileName);
                                    Directory.CreateDirectory(Server.MapPath(string.Format("{0}", "~/Content/Cate/")));
                                    fileContent.SaveAs(path);
                                }
                                else
                                {
                                    path = Path.Combine(Server.MapPath(string.Format("{0}", "~/Content/Cate/")), fileName);
                                    fileContent.SaveAs(path);
                                }
                                lstFiles.Add(path);
                            }
                        }
                    }
                    var rs = _categoryManagementService.CreateCategory(cate, lstGroup, lstPrices, lstFiles);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Thêm mới danh mục sản phẩm thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "00",
                            Message = "Thêm mới danh mục sản phẩm không thành công!"
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
                _log.Error("Create is error: " + ex.Message);
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
                    var cate = new Category()
                    {
                        Id = Convert.ToInt32(fc["Id"]),
                        Code = fc["Code"],
                        Name = fc["Name"],
                        AgeType = Convert.ToInt32(fc["AgeType"]),
                        FromAge = Convert.ToInt32(fc["FromAge"]),
                        ToAge = Convert.ToInt32(fc["ToAge"]),
                        Description = fc["Description"],
                        MoreInformation = fc["MoreInformation"],
                        Status = Convert.ToInt32(fc["Status"]),
                        UpdatedDate = DateTime.Now,
                        UpdatedBy = Authentication.GetCurrentUser().Id,
                    };
                    var groupId = fc["GroupId"];
                    var lstGroup = groupId.Split(',');
                    var prices = fc["prices"];
                    var lstPrices = prices.FromJson<List<ProductPrice>>();

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
                            if (Path.GetExtension(fileContent.FileName).ToLower() != ".pdf"
                               && Path.GetExtension(fileContent.FileName).ToLower() != ".png"
                               && Path.GetExtension(fileContent.FileName).ToLower() != ".jpg"
                               && Path.GetExtension(fileContent.FileName).ToLower() != ".gif"
                               && Path.GetExtension(fileContent.FileName).ToLower() != ".tiff"
                               && Path.GetExtension(fileContent.FileName).ToLower() != ".bmp")
                            {
                                var error1 = new JsonRs { Status = "00", Message = "Loi dinh dang" };
                                return Json(error1, JsonRequestBehavior.AllowGet);
                            }
                            string fileName = Path.GetFileName(fileContent.FileName);
                            fileNameStr += !string.IsNullOrEmpty(fileName) ? fileName + "|" : "";
                            pathStr += !string.IsNullOrEmpty(fileName) ? "/" + fileName + "|" : "";
                            if (fileContent.ContentLength > 0 && !string.IsNullOrEmpty(fileContent.FileName))
                            {
                                bool folderExists = Directory.Exists(Server.MapPath(string.Format("{0}", "~/Content/Cate/")));
                                if (!folderExists)
                                {
                                    path = Path.Combine(Server.MapPath(string.Format("{0}", "~/Content/Cate/")), fileName);
                                    Directory.CreateDirectory(Server.MapPath(string.Format("{0}", "~/Content/Cate/")));
                                    fileContent.SaveAs(path);
                                }
                                else
                                {
                                    path = Path.Combine(Server.MapPath(string.Format("{0}", "~/Content/Cate/")), fileName);
                                    fileContent.SaveAs(path);
                                }
                                lstFiles.Add(path);
                            }
                        }
                    }
                    var rs = _categoryManagementService.UpdateCategory(cate, lstGroup, lstPrices, lstFiles, listFiles);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Cập nhật danh mục sản phẩm thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "00",
                            Message = "Cập nhật danh mục sản phẩm không thành công!"
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
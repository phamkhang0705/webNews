using NLog;
using System;
using System.Dynamic;
using System.Web.Mvc;
using webNews.Areas.Admin.Models.Category;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Domain.Services.CategoryDetailManagement;
using webNews.Domain.Services.CategoryManagement;
using webNews.Language.Language;
using webNews.Models.CategoryManagement;
using webNews.Security;

namespace webNews.Areas.Admin.Controllers
{
    public class CategoryDetailManagementController : BaseController
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();
        private readonly ICategoryManagementService _categoryManagementService;
        private readonly ICategoryDetailManagementService _categoryDetailManagementService;
        private readonly IConstantService _constantService;

        public CategoryDetailManagementController(ICategoryManagementService categoryManagementService,
            ICategoryDetailManagementService categoryDetailManagementService
            )
        {
            _categoryManagementService = categoryManagementService;
            _categoryDetailManagementService = categoryDetailManagementService;
            _constantService = new ConstantService();
        }

        // GET: Admin/CategoryDetailManagement
        public ActionResult Index()
        {
            if (!CheckAuthorizer.IsAuthenticated())
                return RedirectToAction("Index", "Login");
            if (!CheckAuthorizer.Authorize(Permission.VIEW))
                return RedirectToAction("Permission", "Error");
            dynamic model = new ExpandoObject();
            model.ListStatus = _constantService.ListStatus();
            model.ListCategory = _categoryManagementService.GetAllCategories();
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
                var data = _categoryDetailManagementService.GetList(search, pageIndex, pageSize);
                var total = data.Total;
                return Json(new
                {
                    data = data.DataList,
                    total
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("GetData CategoryDetailManagement error : " + ex);
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
                    ListCategories = _categoryManagementService.GetAllCategories()
                };
                if (id > 0)
                {
                    var cate = _categoryDetailManagementService.GetCateById(id);
                    if (cate != null)
                    {
                        model.Id = cate.Id;
                        model.Code = cate.Code;
                        model.Name = cate.Name;
                        model.CategoryId = cate.CategoryId;
                        model.Quantity = cate.Quantity;
                        model.DescriptionDetail = cate.DescriptionDetail;
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
        public ActionResult Create(CategoryDetail cate)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    cate.CreatedBy = Authentication.GetUserId();
                    cate.CreatedDate = DateTime.Now;
                    var rs = _categoryDetailManagementService.CreateCategory(cate);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Thêm mới sản phẩm bán thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "00",
                            Message = "Thêm mới sản phẩm bán không thành công!"
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
        public ActionResult Update(CategoryDetail cate)
        {
            if (!CheckAuthorizer.Authorize(Permission.EDIT)) return RedirectToAction("Index", "Login");
            try
            {
                if (ModelState.IsValid)
                {
                    cate.UpdatedBy = Authentication.GetUserId();
                    cate.UpdatedDate = DateTime.Now;
                    cate.CreatedBy = Authentication.GetUserId();
                    cate.CreatedDate = DateTime.Now;
                    var rs = _categoryDetailManagementService.UpdateCategory(cate);
                    if (rs.ResponseCode == "01")
                    {
                        return Json(new
                        {
                            Status = "01",
                            Message = "Cập nhật sản phẩm bán thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            Status = "00",
                            Message = "Cập nhật sản phẩm bán không thành công!"
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
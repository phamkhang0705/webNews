using NLog;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.CategoryManagement;
using webNews.Models;
using webNews.Models.CategoryManagement;


namespace webNews.Domain.Services.CategoryManagement
{
    public class CategoryManagementService : Service<Category>, ICategoryManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly ICategoryManagementRepository _categoryRepository;

        public CategoryManagementService(ICategoryManagementRepository categoryRepository, IRepository<Category> repository) : base(repository)
        {
            _categoryRepository = categoryRepository;
        }

        public PagingObject<Vw_Category> GetList(SearchCategoryModel filter, int pageIndex, int pageSize)
        {
            return _categoryRepository.GetList(filter, pageIndex, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _categoryRepository.CheckExist(userName);
        }

        public CoreMessageResponse CreateCategory(Category category, string[] groupCategories, List<ProductPrice> productPrices, List<string> files)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var check = _categoryRepository.GetByCode(category.Code);

            if (check != null)
            {
                response.ResponseMessage = "Mã danh mục đã tồn tại!";
                return response;
            }

            var cate = new Category()
            {
                Name = category.Name,
                Code = category.Code,
                Status = category.Status,
                FromAge = category.FromAge,
                ToAge = category.ToAge,
                Description = category.Description,
                CreatedBy = category.CreatedBy,
                CreatedDate = DateTime.Now,
                UpdatedBy = category.UpdatedBy,
                UpdatedDate = DateTime.Now
            };

            var isInsert = _categoryRepository.CreateCategory(cate,groupCategories,productPrices,files);

            if (isInsert)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Thêm danh mục thành công";
            }
            else
            {
                response.ResponseMessage = "Thêm danh mục thất bại";
            }

            return response;
        }

        public CoreMessageResponse UpdateCategory(Category category, string[] groupCategories, List<ProductPrice> productPrices, List<string> files, List<FileAttach> listFiles)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var cate = _categoryRepository.GetById(category.Id);

            if (cate == null)
            {
                response.ResponseMessage = "Danh mục không tồn tại!";
                return response;
            }

            cate.UpdatedDate = DateTime.Now;
            cate.UpdatedBy = cate.UpdatedBy;
            
            var update = _categoryRepository.UpdateCategory(cate,groupCategories,productPrices,files, listFiles);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật danh mục thành công";
            }
            return response;
        }

        public bool Delete(int id)
        {
            return _categoryRepository.Delete(id);
        }

        public Vw_Category GetCateById(int id)
        {
            return _categoryRepository.GetCateById(id);
        }

        public Vw_Category GetByCode(string code)
        {
            return _categoryRepository.GetByCode(code);
        }

        public List<GroupCategory> GetGroupCategories(int cateId)
        {
            return _categoryRepository.GetGroupCategories(cateId);
        }

        public List<Category> GetAllCategories()
        {
            return _categoryRepository.GetAll();
        }
    }
}
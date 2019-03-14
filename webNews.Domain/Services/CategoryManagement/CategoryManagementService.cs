using NLog;
using System;
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
        private readonly ICategoryRepository _categoryRepository;

        public CategoryManagementService(ICategoryRepository categoryRepository, IRepository<Category> repository) : base(repository)
        {
            _categoryRepository = categoryRepository;
        }

        public PagingObject<Category> GetList(SearchCategoryModel filter, int pageIndex, int pageSize)
        {
            return _categoryRepository.GetList(filter, pageIndex, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _categoryRepository.CheckExist(userName);
        }

        public CoreMessageResponse CreateCategory(CategoryModel model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var check = _categoryRepository.GetByCode(model.Code);

            if (check != null)
            {
                response.ResponseMessage = "Mã danh mục đã tồn tại!";
                return response;
            }

            var user = new Category()
            {
                Name = model.Name,
                Code = model.Code,
                Status = model.Status,
                CreatedBy = model.CreatedBy,
                CreatedDate = DateTime.Now,
                UpdatedBy = model.UpdatedBy,
                UpdatedDate = DateTime.Now
            };
            var isInsert = _categoryRepository.Create(user);

            if (isInsert > 0)
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

        public CoreMessageResponse UpdateCategory(CategoryModel model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var Category = _categoryRepository.GetById(model.Id);

            if (Category == null)
            {
                response.ResponseMessage = "Danh mục không tồn tại!";
                return response;
            }

            Category.UpdatedDate = new DateTime();
            Category.UpdatedBy = model.UpdatedBy;
            Category.Name = model.Name;
            Category.Status = model.Status;

            var update = _categoryRepository.UpdateCategory(Category);

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

        public Category GetUserById(int id)
        {
            return _categoryRepository.GetById(id);
        }

        public Category GetByCode(string code)
        {
            return _categoryRepository.GetByCode(code);
        }
    }
}
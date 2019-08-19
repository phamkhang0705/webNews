using NLog;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.CategoryDetailManagement;
using webNews.Domain.Repositories.CategoryManagement;
using webNews.Models;
using webNews.Models.CategoryManagement;


namespace webNews.Domain.Services.CategoryDetailManagement
{
    public class CategoryDetailManagementService : Service<CategoryDetail>, ICategoryDetailManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly ICategoryDetailManagementRepository _categoryRepository;

        public CategoryDetailManagementService(ICategoryDetailManagementRepository categoryRepository, IRepository<CategoryDetail> repository) : base(repository)
        {
            _categoryRepository = categoryRepository;
        }

        public PagingObject<Vw_CategoryDetail> GetList(SearchCategoryModel filter, int pageIndex, int pageSize)
        {
            var offset = 0;
            if (pageIndex >= pageSize)
            {
                offset = (pageIndex / pageSize);
            }
            return _categoryRepository.GetList(filter, offset, pageSize);
        }


        public CoreMessageResponse CreateCategory(CategoryDetail category)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };


            var cate = new CategoryDetail()
            {
                CategoryId = category.CategoryId,
                Description = category.Description,
                CreatedBy = category.CreatedBy,
                CreatedDate = DateTime.Now
            };

            var isInsert = _categoryRepository.CreateCategory(cate);

            if (isInsert)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Thêm sản phẩm bán thành công";
            }
            else
            {
                response.ResponseMessage = "Thêm sản phẩm bán thất bại";
            }

            return response;
        }

        public CoreMessageResponse UpdateCategory(CategoryDetail category)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var cate = _categoryRepository.GetById(category.Id);
            var update = true;
            if (cate == null)
            {
                update = _categoryRepository.CreateCategory(category);
            }
            else
            {
                cate.UpdatedDate = category.UpdatedDate;
                cate.UpdatedBy = category.UpdatedBy;
                update = _categoryRepository.UpdateCategory(cate);
            }
            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật sản phẩm bán thành công";
            }
            return response;
        }



        public Vw_CategoryDetail GetCateById(int id)
        {
            return _categoryRepository.GetCateById(id);
        }

        public Vw_CategoryDetail GetByCode(string code)
        {
            return _categoryRepository.GetByCode(code);
        }

    }
}
using NLog;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.NewsCategoryManagement;
using webNews.Domain.Services.NewsCategoryManagement;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Services.ContentTypeManagement
{
    public class NewsCategoryManagementService : Service<NewsCategory>, INewsCategoryManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly INewsCategoryManagementRepository _newsCategoryRepository;

        public NewsCategoryManagementService(INewsCategoryManagementRepository newsCategoryRepository, IRepository<NewsCategory> repository) : base(repository)
        {
            _newsCategoryRepository = newsCategoryRepository;
        }

        public PagingObject<NewsCategory> GetList(SearchContentModel filter, int pageIndex, int pageSize)
        {
            var offset = 0;
            if (pageIndex >= pageSize)
            {
                offset = (pageIndex / pageSize);
            }
            return _newsCategoryRepository.GetList(filter, offset, pageSize);
        }


        public CoreMessageResponse CreateNewsCategory(NewsCategory model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };

            var user = new NewsCategory()
            {
                Title = model.Title,
                Status = model.Status
            };
            var isInsert = _newsCategoryRepository.CreateNewsCategory(user);

            if (isInsert)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Thêm nhóm thành công";
            }
            else
            {
                response.ResponseMessage = "Thêm nhóm thất bại";
            }

            return response;
        }

        public CoreMessageResponse UpdateNewsCategory(NewsCategory model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var newsCategory = _newsCategoryRepository.GetById(model.Id);

            if (newsCategory == null)
            {
                response.ResponseMessage = "Nhóm không tồn tại!";
                return response;
            }
            newsCategory.Title = model.Title;
            newsCategory.Status = model.Status;

            var update = _newsCategoryRepository.UpdateNewsCategory(newsCategory);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật nhóm thành công";
            }
            return response;
        }

        public bool Delete(int id)
        {
            return _newsCategoryRepository.Delete(id);
        }

        public NewsCategory GetById(int id)
        {
            return _newsCategoryRepository.GetById(id);
        }

        public List<NewsCategory> GetAllNewsCategories()
        {
            return _newsCategoryRepository.GetAllNewsCategories();
        }
    }
}
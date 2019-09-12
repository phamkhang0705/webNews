using NLog;
using System;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.ContentManagement;
using webNews.Domain.Repositories.NewsManagement;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Services.NewsManagement
{
    public class NewsManagementService : Service<Vw_News>, INewsManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly INewsManagementRepository _contentRepository;

        public NewsManagementService(INewsManagementRepository contentRepository, IRepository<Vw_News> repository) : base(repository)
        {
            _contentRepository = contentRepository;
        }

        public PagingObject<Vw_News> GetList(SearchContentModel filter, int pageIndex, int pageSize)
        {
            var offset = 0;
            if (pageIndex >= pageSize)
            {
                offset = (pageIndex / pageSize);
            }
            return _contentRepository.GetList(filter, offset, pageSize);
        }

        public CoreMessageResponse CreateNews(News content)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };

            var cate = new News()
            {
                Type = content.Type,
                Title = content.Title,
                Status = content.Status,
                Description = content.Description,
                CreatedBy = content.CreatedBy,
                CreatedDate = DateTime.Now,
                UpdatedBy = content.UpdatedBy,
                UpdatedDate = DateTime.Now
            };

            var isInsert = _contentRepository.CreateNews(cate);

            if (isInsert)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Thêm nội dung thành công";
            }
            else
            {
                response.ResponseMessage = "Thêm nội dung thất bại";
            }

            return response;
        }

        public CoreMessageResponse UpdateNews(News content)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };

            var update = _contentRepository.UpdateNews(content);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật nội dung thành công";
            }
            else
            {
                response.ResponseMessage = "Cập nhật nội dung thất bại";
            }
            return response;
        }
    }
}
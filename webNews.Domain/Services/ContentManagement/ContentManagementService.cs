using NLog;
using System;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.ContentManagement;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Services.ContentManagement
{
    public class ContentManagementService : Service<Vw_Content>, IContentManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IContentManagementRepository _contentRepository;

        public ContentManagementService(IContentManagementRepository contentRepository, IRepository<Vw_Content> repository) : base(repository)
        {
            _contentRepository = contentRepository;
        }

        public PagingObject<Vw_Content> GetList(SearchContentModel filter, int pageIndex, int pageSize)
        {
            var offset = 0;
            if (pageIndex >= pageSize)
            {
                offset = (pageIndex / pageSize);
            }
            return _contentRepository.GetList(filter, offset, pageSize);
        }

        public CoreMessageResponse CreateContent(Content content)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };

            var cate = new Content()
            {
                Type = content.Type,
                Title = content.Title,
                Url = content.Url,
                Link = content.Link,
                ContentUrl = content.ContentUrl,
                ContentText = content.ContentText,
                ContentType = content.ContentType,
                Status = content.Status,
                Description = content.Description,
                CreatedBy = content.CreatedBy,
                CreatedDate = DateTime.Now
            };

            var isInsert = _contentRepository.CreateContent(cate);

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

        public CoreMessageResponse UpdateContent(Content content)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };

            var update = _contentRepository.UpdateContent(content);

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

        public Vw_Content GetbyCode(string code)
        {
            return _contentRepository.GetByCode(code);
        }
    }
}
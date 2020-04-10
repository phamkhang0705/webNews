using System;
using NLog;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.ContentFavouriteManagement;
using webNews.Models;
using webNews.Models.ContentFavouriteManagement;

namespace webNews.Domain.Services.ContentFavouriteManagement
{
    public class ContentFavouriteManagementService : Service<ContentFavourite>, IContentFavouriteManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IContentFavouriteManagementRepository _contentRepository;

        public ContentFavouriteManagementService(IContentFavouriteManagementRepository contentRepository, IRepository<ContentFavourite> repository) : base(repository)
        {
            _contentRepository = contentRepository;
        }

        public PagingObject<ContentFavourite> GetList(SearchContentFavouriteModel filter, int pageIndex, int pageSize)
        {
            var offset = 0;
            if (pageIndex >= pageSize)
            {
                offset = (pageIndex / pageSize);
            }
            return _contentRepository.GetList(filter, offset, pageSize);
        }

        public CoreMessageResponse CreateContentFavourite(ContentFavourite content)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };

            var cate = new ContentFavourite()
            {
                ContentId = content.ContentId,
                ContentType = content.ContentType,
                Status = content.Status,
                UpdatedTime = DateTime.Now,
                UserId = content.UserId,
                FavouriteType = content.FavouriteType
            };

            var isInsert = _contentRepository.CreateContentFavourite(cate);

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

        public CoreMessageResponse UpdateContentFavourite(ContentFavourite content)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };

            var update = _contentRepository.UpdateContentFavourite(content);

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
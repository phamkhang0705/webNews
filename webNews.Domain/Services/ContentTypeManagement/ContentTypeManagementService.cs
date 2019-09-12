using NLog;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.ContentTypeManagement;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Services.ContentTypeManagement
{
    public class ContentTypeManagementService : Service<ContentType>, IContentTypeManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IContentTypeManagementRepository _ContentTypeRepository;

        public ContentTypeManagementService(IContentTypeManagementRepository ContentTypeRepository, IRepository<ContentType> repository) : base(repository)
        {
            _ContentTypeRepository = ContentTypeRepository;
        }

        public PagingObject<ContentType> GetList(SearchContentModel filter, int pageIndex, int pageSize)
        {
            var offset = 0;
            if (pageIndex >= pageSize)
            {
                offset = (pageIndex / pageSize);
            }
            return _ContentTypeRepository.GetList(filter, offset, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _ContentTypeRepository.CheckExist(userName);
        }

        public CoreMessageResponse CreateContentType(ContentType model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var check = _ContentTypeRepository.GetByCode(model.ContentCode);

            if (check != null)
            {
                response.ResponseMessage = "Mã nhóm đã tồn tại!";
                return response;
            }

            var user = new ContentType()
            {
                ContentName = model.ContentName,
                ContentCode = model.ContentCode,
                Status = model.Status
            };
            var isInsert = _ContentTypeRepository.Create(user);

            if (isInsert > 0)
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

        public CoreMessageResponse UpdateContentType(ContentType model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var ContentType = _ContentTypeRepository.GetById(model.Id);

            if (ContentType == null)
            {
                response.ResponseMessage = "Nhóm không tồn tại!";
                return response;
            }
            ContentType.ContentName = model.ContentName;
            ContentType.Status = model.Status;

            var update = _ContentTypeRepository.UpdateContentType(ContentType);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật nhóm thành công";
            }
            return response;
        }

        public bool Delete(int id)
        {
            return _ContentTypeRepository.Delete(id);
        }

        public ContentType GetUserById(int id)
        {
            return _ContentTypeRepository.GetById(id);
        }

        public ContentType GetByCode(string code)
        {
            return _ContentTypeRepository.GetByCode(code);
        }

        public List<ContentType> GetAllContentTypes()
        {
            return _ContentTypeRepository.GetAllContentTypes();
        }
    }
}
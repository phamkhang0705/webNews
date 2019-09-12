using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Services.ContentTypeManagement
{
    public interface IContentTypeManagementService : IService<ContentType>
    {
        PagingObject<ContentType> GetList(SearchContentModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);

        CoreMessageResponse CreateContentType(ContentType model);

        CoreMessageResponse UpdateContentType(ContentType model);

        bool Delete(int id);

        ContentType GetUserById(int id);

        ContentType GetByCode(string code);

        List<ContentType> GetAllContentTypes();
    }
}
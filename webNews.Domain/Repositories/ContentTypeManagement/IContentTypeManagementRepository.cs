using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Repositories.ContentTypeManagement
{
    public interface IContentTypeManagementRepository : IRepository<ContentType>
    {
        PagingObject<ContentType> GetList(SearchContentModel filter, int pageIndex, int pageSize);

        bool CheckExist(string code);

        bool CreateContentType(ContentType group);

        bool UpdateContentType(ContentType group);

        bool Delete(int id);

        ContentType GetById(int id);

        ContentType GetByCode(string code);

        List<ContentType> GetAllContentTypes();
    }
}
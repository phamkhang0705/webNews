using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Repositories.ContentManagement
{
    public interface IContentManagementRepository : IRepository<Vw_Content>
    {
        PagingObject<Vw_Content> GetList(SearchContentModel filter, int pageIndex, int pageSize);

        bool CreateContent(Content content);

        bool UpdateContent(Content content);

        Vw_Content GetByCode(string code);
    }
}
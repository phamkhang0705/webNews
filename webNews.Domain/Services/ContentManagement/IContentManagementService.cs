using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Services.ContentManagement
{
    public interface IContentManagementService : IService<Vw_Content>
    {
        PagingObject<Vw_Content> GetList(SearchContentModel filter, int pageIndex, int pageSize);

        CoreMessageResponse CreateContent(Content content);

        CoreMessageResponse UpdateContent(Content content);
    }
}
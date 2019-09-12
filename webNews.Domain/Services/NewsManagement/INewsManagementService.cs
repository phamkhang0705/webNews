using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Services.NewsManagement
{
    public interface INewsManagementService : IService<Vw_News>
    {
        PagingObject<Vw_News> GetList(SearchContentModel filter, int pageIndex, int pageSize);

        CoreMessageResponse CreateNews(News content);

        CoreMessageResponse UpdateNews(News content);
    }
}
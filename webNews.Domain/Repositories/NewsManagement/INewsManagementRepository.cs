using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Repositories.NewsManagement
{
    public interface INewsManagementRepository : IRepository<Vw_News>
    {
        PagingObject<Vw_News> GetList(SearchContentModel filter, int pageIndex, int pageSize);

        bool CreateNews(News content);

        bool UpdateNews(News content);
    }
}
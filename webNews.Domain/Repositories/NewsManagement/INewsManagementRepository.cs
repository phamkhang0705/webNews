using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentTypeManagement;
using webNews.Models.NewsManagement;

namespace webNews.Domain.Repositories.NewsManagement
{
    public interface INewsManagementRepository : IRepository<Vw_News>
    {
        PagingObject<Vw_News> GetList(SearchContentModel filter, int pageIndex, int pageSize);

        bool CreateNews(News content);

        bool UpdateNews(News content);

        IEnumerable<Vw_News> GetNews(SearchNewsModelFE search);

        Vw_News GetNewsDetail(int id);

        Vw_News GetNewsDetail(string shortName);
    }
}
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Repositories.NewsCategoryManagement
{
    public interface INewsCategoryManagementRepository : IRepository<NewsCategory>
    {
        PagingObject<NewsCategory> GetList(SearchContentModel filter, int pageIndex, int pageSize);

        bool CreateNewsCategory(NewsCategory group);

        bool UpdateNewsCategory(NewsCategory group);

        bool Delete(int id);

        NewsCategory GetById(int id);

        List<NewsCategory> GetAllNewsCategories();
    }
}
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Services.NewsCategoryManagement
{
    public interface INewsCategoryManagementService : IService<NewsCategory>
    {
        PagingObject<NewsCategory> GetList(SearchContentModel filter, int pageIndex, int pageSize);


        CoreMessageResponse CreateNewsCategory(NewsCategory model);

        CoreMessageResponse UpdateNewsCategory(NewsCategory model);

        bool Delete(int id);

        NewsCategory GetById(int id);

        List<NewsCategory> GetAllNewsCategories();
    }
}
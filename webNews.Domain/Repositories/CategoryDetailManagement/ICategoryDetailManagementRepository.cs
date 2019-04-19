using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Repositories.CategoryDetailManagement
{
    public interface ICategoryDetailManagementRepository : IRepository<CategoryDetail>
    {
        PagingObject<Vw_CategoryDetail> GetList(SearchCategoryModel filter, int pageIndex, int pageSize);

        bool CreateCategory(CategoryDetail category);

        bool UpdateCategory(CategoryDetail category);


        Vw_CategoryDetail GetCateById(int id);

        Vw_CategoryDetail GetByCode(string code);
    }
}
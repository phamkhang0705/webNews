using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Services.CategoryDetailManagement
{
    public interface ICategoryDetailManagementService : IService<CategoryDetail>
    {
        PagingObject<Vw_CategoryDetail> GetList(SearchCategoryModel filter, int pageIndex, int pageSize);
        

        CoreMessageResponse CreateCategory(CategoryDetail category);

        CoreMessageResponse UpdateCategory(CategoryDetail category);


        Vw_CategoryDetail GetCateById(int id);

        Vw_CategoryDetail GetByCode(string code);
    }
}
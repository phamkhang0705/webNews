using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Services.CategoryManagement
{
    public interface ICategoryManagementService : IService<Category>
    {
        PagingObject<Category> GetList(SearchCategoryModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);

        CoreMessageResponse CreateCategory(Category category, List<GroupCategory> groupCategories, List<ProductPrice> productPrices, List<FileAttach> files);

        CoreMessageResponse UpdateCategory(Category category, List<GroupCategory> groupCategories, List<ProductPrice> productPrices, List<FileAttach> files);

        bool Delete(int id);

        Category GetUserById(int id);

        Category GetByCode(string code);
    }
}
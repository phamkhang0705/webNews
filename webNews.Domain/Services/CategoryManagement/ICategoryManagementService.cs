using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Services.CategoryManagement
{
    public interface ICategoryManagementService : IService<Category>
    {
        PagingObject<Vw_Category> GetList(SearchCategoryModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);

        CoreMessageResponse CreateCategory(Category category, string[] groupCategories, List<ProductPrice> productPrices, List<string> files);

        CoreMessageResponse UpdateCategory(Category category, string[] groupCategories, List<ProductPrice> productPrices, List<string> files,List<FileAttach> listFiles);

        bool Delete(int id);

        Vw_Category GetCateById(int id);

        Vw_Category GetByCode(string code);
        List<GroupCategory> GetGroupCategories(int id);

        List<Category> GetAllCategories();
        List<Vw_Category> GetByName(string name);
    }
}
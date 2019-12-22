using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Repositories.CategoryManagement
{
    public interface ICategoryManagementRepository : IRepository<Category>
    {
        PagingObject<Vw_Category> GetList(SearchCategoryModel filter, int pageIndex, int pageSize);

        bool CheckExist(string code);

        bool CreateCategory(Category category, string[] groupCategories,List<ProductPrice> productPrices, List<string> files);

        bool UpdateCategory(Category category, string[] groupCategories, List<ProductPrice> productPrices, List<string> files,List<FileAttach> listFiles);

        bool Delete(int id);

        Vw_Category GetCateById(int id);

        Vw_Category GetByCode(string code);
        List<GroupCategory> GetGroupCategories(int cateId);

        List<Vw_Category> GetByName(string name);
        List<Vw_Category_Sale> GetCategorySale(string name);

        IEnumerable<Vw_Category> GetCategories(SearchCategoryModelFE search);

        Vw_Category GetCategoryDetail(int id);

        Vw_Category GetCategoryDetail(string shortName);
    }
}
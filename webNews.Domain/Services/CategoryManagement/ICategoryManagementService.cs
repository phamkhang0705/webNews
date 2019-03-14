using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Services.CategoryManagement
{
    public interface ICategoryManagementService : IService<Category>
    {
        PagingObject<Category> GetList(SearchCategoryModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);

        CoreMessageResponse CreateCategory(CategoryModel model);

        CoreMessageResponse UpdateCategory(CategoryModel model);

        bool Delete(int id);

        Category GetUserById(int id);

        Category GetByCode(string code);
    }
}
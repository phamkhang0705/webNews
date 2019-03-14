using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Repositories.CategoryManagement
{
    public interface ICategoryRepository : IRepository<Category>
    {
        PagingObject<Category> GetList(SearchCategoryModel filter, int pageIndex, int pageSize);

        bool CheckExist(string code);

        bool CreateCategory(Category category);

        bool UpdateCategory(Category category);

        bool Delete(int id);

        Category GetById(int id);

        Category GetByCode(string code);
    }
}
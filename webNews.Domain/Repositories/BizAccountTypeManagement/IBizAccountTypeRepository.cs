using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Repositories.BizAccountTypeManagement
{
    public interface IBizAccountTypeRepository : IRepository<BizAccountType>
    {
        PagingObject<Vw_BizAccountType> GetList(SearchCategoryModel filter, int pageIndex, int pageSize);

        bool CheckExist(string code);
    }
}
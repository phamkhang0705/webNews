using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Services.BizAccountManagement
{
    public interface IBizAccountService : IService<BizAccount>
    {
        PagingObject<Vw_BizAccount> GetList(SearchCategoryModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);
    }
}
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Repositories.BizAccountManagement
{
    public interface IBizAccountRepository : IRepository<BizAccount>
    {
        PagingObject<Vw_BizAccount> GetList(SearchCategoryModel filter, int pageIndex, int pageSize);

        bool CheckExist(string code);

        List<BizAccount> GetBizAccounts(int type);
    }
}
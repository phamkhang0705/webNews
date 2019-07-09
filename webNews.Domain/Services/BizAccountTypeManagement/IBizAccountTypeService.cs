using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Services.BizAccountTypeManagement
{
    public interface IBizAccountTypeService : IService<BizAccountType>
    {
        PagingObject<Vw_BizAccountType> GetList(SearchCategoryModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);
    }
}
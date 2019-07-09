using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.GroupManagement;

namespace webNews.Domain.Services.BizAccountGroupManagement
{
    public interface IBizAccountGroupService : IService<BizAccountGroup>
    {
        PagingObject<BizAccountGroup> GetList(SearchGroupModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);

        CoreMessageResponse CreateGroup(BizAccountGroup model);

        CoreMessageResponse UpdateGroup(BizAccountGroup model);

        bool Delete(int id);

        BizAccountGroup GetById(int id);

        BizAccountGroup GetByCode(string code);

        List<BizAccountGroup> GetAllGroups();
    }
}
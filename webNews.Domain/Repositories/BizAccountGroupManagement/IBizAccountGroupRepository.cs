using System.Collections.Generic;
using webNews.Models;
using webNews.Models.GroupManagement;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.BizAccountGroupManagement
{
    public interface IBizAccountGroupRepository : IRepository<BizAccountGroup>
    {
        PagingObject<BizAccountGroup> GetList(SearchGroupModel filter, int pageIndex, int pageSize);

        bool CheckExist(string code);

        bool CreateGroup(BizAccountGroup group);

        bool UpdateGroup(BizAccountGroup group);

        bool Delete(int id);

        BizAccountGroup GetById(int id);

        BizAccountGroup GetByCode(string code);
        List<BizAccountGroup> GetAllGroups();
    }
}
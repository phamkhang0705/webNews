using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.GroupManagement;

namespace webNews.Domain.Services.GroupManagement
{
    public interface IGroupManagementService : IService<Group>
    {
        PagingObject<Group> GetList(SearchGroupModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);

        CoreMessageResponse CreateGroup(Group model);

        CoreMessageResponse UpdateGroup(Group model);

        bool Delete(int id);

        Group GetUserById(int id);

        Group GetByCode(string code);

        List<Group> GetAllGroups();
    }
}
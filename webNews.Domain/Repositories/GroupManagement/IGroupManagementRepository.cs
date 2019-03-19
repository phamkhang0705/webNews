using webNews.Models;
using webNews.Models.GroupManagement;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.GroupManagement
{
    public interface IGroupManagementRepository : IRepository<Group>
    {
        PagingObject<Group> GetList(SearchGroupModel filter, int pageIndex, int pageSize);

        bool CheckExist(string code);

        bool CreateGroup(Group group);

        bool UpdateGroup(Group group);

        bool Delete(int id);

        Group GetById(int id);

        Group GetByCode(string code);
    }
}
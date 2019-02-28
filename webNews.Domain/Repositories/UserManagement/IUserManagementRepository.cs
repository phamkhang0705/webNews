using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.UserManagement;

namespace webNews.Domain.Repositories.UserManagement
{
    public interface IUserManagementRepository : IRepository<System_User>
    {
        PagingObject<Vw_Core_User> GetList(SearchUserModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);

        bool Create(System_User user);

        bool UpdateUser(System_User model);

        bool Delete(long id);

        Vw_Core_User GetById(int id);

        Vw_Core_User GetByName(string code);
    }
}
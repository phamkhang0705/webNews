using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.UserManagement;

namespace webNews.Domain.Services.UserManagement
{
    public interface IUserManagementService : IService<System_User>
    {
        PagingObject<Vw_Core_User> GetList(SearchUserModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);

        CoreMessageResponse Create(UserModel model);

        CoreMessageResponse Update(UserModel model);

        bool DeleteUser(int id);

        Vw_Core_User GetUserById(int id);

        Vw_Core_User GetByName(string code);
    }
}
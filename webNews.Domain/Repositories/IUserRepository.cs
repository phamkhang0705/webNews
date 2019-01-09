using webNews.Models.User;
using System.Collections.Generic;
using webNews.Models;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories
{
    public interface IUserRepository
    {
        Vw_Core_User GetUserByName(string userName);
        Vw_Core_User GetUserByUserId(int userId);
        bool DeleteUser(int userId);
        bool AddUser(Vw_Core_User user);
        bool UpdateUser(Vw_Core_User user);
        List<Vw_Core_User> SearchUser(UserSearchModel searchModel);
        bool VerifyUserAndEmail(string userName, string email);
        CoreMessageResponse Login(string username, string password);
    }
}
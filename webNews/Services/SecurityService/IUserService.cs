using System.Collections.Generic;
using webNews.Domain;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.User;

namespace webNews.Services.SecurityService
{
    public interface IUserService
    {
        JsonRs Authenticate(string pUsername, string pPassword,ref System_User userinfo);
        bool VerifyUserAndEmail(string userName, string email);
        Vw_Core_User GetUserByName(string username);
        Vw_Core_User GetUserByUserId(int userId);
        bool AddUser(Vw_Core_User user);
        bool DeleteUser(int userId);
        bool UpdateUser(Vw_Core_User user);
        List<Vw_Core_User> GetData(UserSearchModel searchModel);
        

    }
}
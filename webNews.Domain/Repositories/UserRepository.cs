using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Models;
using webNews.Models.User;
using NLog;
using ServiceStack;
using ServiceStack.OrmLite;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetLogger("UserRepository");

        public UserRepository(IWebNewsDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        /// <summary>
        /// Get user by user name
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public Vw_Core_User GetUserByName(string userName)
        {
            using(var db = _connectionFactory.OpenDbConnection())
            {
                return db.Select<Vw_Core_User>().FirstOrDefault(u => u.UserName == userName);
            }
        }

        /// <summary>
        /// Get user by user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public Vw_Core_User GetUserByUserId(int userId)
        {
            using(var db = _connectionFactory.Open())
            {
                return db.Select<Vw_Core_User>().SingleOrDefault(u => u.UserId == userId);
            }
        }

        public bool DeleteUser(int userId)
        {
            try
            {
                using(var db = _connectionFactory.OpenDbConnection())
                {
                    using(var trans = db.OpenTransaction())
                    {
                        try
                        {
                            db.Delete<System_User>(p => p.Id == userId);
                            trans.Commit();
                            return true;
                        }
                        catch(Exception ex)
                        {
                            _logger.Info("Delete user error: " + ex);
                            trans.Rollback();
                            return false;
                        }
                    }
                }
            }
            catch(Exception ex)
            {

                _logger.Info("Delete user error: " + ex);
                return false;
            }
        }

        public bool AddUser(Vw_Core_User vwCoreUser)
        {
            using(var db = _connectionFactory.Open())
            {
                using(var trans = db.OpenTransaction())
                {
                    try
                    {
                        var user = new System_User
                        {

                        };
                        db.Insert(user);
                        trans.Commit();
                        return true;
                    }
                    catch(Exception ex)
                    {
                        _logger.Error("Add user error: " + ex);
                        trans.Rollback();
                        return false;
                    }
                }
            }
        }

        public bool UpdateUser(Vw_Core_User vwCoreUser)
        {
            using(var db = _connectionFactory.Open())
            {
                using(var trans = db.OpenTransaction())
                {
                    try
                    {
                        var user = db.Select<System_User>().SingleOrDefault(u => u.Id == vwCoreUser.UserId);
                        db.Update(user);

                        trans.Commit();
                        return true;
                    }
                    catch(Exception ex)
                    {
                        _logger.Error("Update user error: " + ex);
                        trans.Rollback();
                        return false;
                    }
                }

            }
        }

        /// <summary>
        /// Get all User
        /// </summary>
        /// <returns></returns>
        public IList<Vw_Core_User> GetAllUser()
        {
            using(var db = _connectionFactory.Open())
            {
                return db.Select<Vw_Core_User>();
            }
        }

        /// <summary>
        /// Get user by filter
        /// </summary>
        /// <param name="searchModel"></param>
        /// <returns></returns>
        public List<Vw_Core_User> SearchUser(UserSearchModel searchModel)
        {
            using(var db = _connectionFactory.Open())
            {
                //Filter user by customer type
                return db.Select<Vw_Core_User>().Where(u => (searchModel.Status == -1 || u.Status == searchModel.Status)).ToList();
            }
        }

        public bool VerifyUserAndEmail(string userName, string email)
        {
            try
            {
                using(var db = _connectionFactory.Open())
                {

                    string normalizedUserName = userName.ToLowerInvariant();
                    string normalizedEmail = email.ToLowerInvariant();
                    var account = db.Select<System_User>()
                        .SingleOrDefault(user => user.UserName.ToLowerInvariant() == normalizedUserName && user.Email.ToLowerInvariant() == normalizedEmail);
                    return account != null;
                }
            }
            catch
            {
                return false;
            }
        }

        public CoreMessageResponse Login(string username, string password)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00",
            };
            using (var db = _connectionFactory.OpenDbConnection())
            {
                var user = db.Select<System_User>().FirstOrDefault(u => u.UserName == username);
                if (null != user)
                {
                    if (user.Status != 1)
                    {
                        response.ResponseCode = "03";
                        response.ResponseMessage = "Tài khoản chưa được kích hoạt!";
                        return response;
                    }
                    if (user.ComparePass(password))
                    {
                        var roleUsers = db.Select<Security_UserRole>(p => p.UserId == user.Id).Select(p => p.RoleId ?? 0);

                        var listRole2 = db.Select<Security_UserRole>(p => roleUsers.Contains(p.Id));
                        var userInfor = db.Select<Vw_UserInfo>().SingleOrDefault(_ => _.UserId == user.Id);

                        response.ResponseCode = "01";
                        response.ExtraInfos = user.ToJson();
                        response.ExtendInfor = userInfor.ToJson();
                        response.ResponseMessage = listRole2.ToJson();
                        return response;
                    }
                    else
                    {
                        response.ResponseCode = "04";
                        response.ResponseMessage = "Mật khẩu không đúng. Vui lòng thử lại!";
                        return response;
                    }
                }
                else
                {
                    _logger.Info(username + " has not exist");
                    response.ResponseMessage = "Bạn nhập sai tên đăng nhập/mật khẩu";

                }
            }
            _logger.Info("Login info " + response.ToJson());
            return response;
        }
    }
}
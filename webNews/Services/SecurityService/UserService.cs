using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using webNews.Domain.Repositories;
using webNews.Models;
using webNews.Models.User;
using Newtonsoft.Json;
using NLog;
using ServiceStack;
using static System.String;
using webNews.Language.Language;
using webNews.Shared;
using webNews.Domain.Entities;
using webNews.Security;

namespace webNews.Services.SecurityService
{
    public class UserService : IUserService
    {
        private readonly Logger _log;
        private readonly ISystemRepository _systemRepository;
        private readonly IUserRepository _userRepository;
        public UserService(ISystemRepository systemRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _systemRepository = systemRepository;
            _log = LogManager.GetLogger("UserService");
        }

        public JsonRs Authenticate(string pUsername, string pPassword,ref System_User userinfo)
        {
            try
            {
                var rs = _userRepository.Login(pUsername, pPassword);
                if(rs.ResponseCode != "01")
                {
                    return new JsonRs()
                    {
                        Status = rs.ResponseCode,
                        Message = (!IsNullOrEmpty(rs.ResponseMessage) ? rs.ResponseMessage : "Đăng nhập thất bại")
                    };
                }
                if(IsNullOrEmpty(rs.ExtraInfos))
                {
                    return new JsonRs()
                    {
                        Status = "00",
                        Message = "Đăng nhập thất bại"
                    };
                }
                if (IsNullOrEmpty(rs.ExtendInfor))
                {
                    _log.Info("Get userinfor invalid :  " + rs.ExtendInfor);
                }
                var user = JsonConvert.DeserializeObject<System_User>(rs.ExtraInfos);
                var userInfor = JsonConvert.DeserializeObject<Vw_UserInfo>(rs.ExtendInfor);
                _log.Info("Get user valid :  " + user.ToJson());

                //clear before create new
                Authentication.ClearAllSession();
                //save to session
                Authentication.MarkAuthenticate(user, userInfor);
                Authentication.MarkLanguage("vi");
                //---Get role
                var role = JsonConvert.DeserializeObject<List<Security_UserRole>>(rs.ResponseMessage);
                _log.Info("Get role valid :  " + role.ToJson());
                if(role.Count > 0)
                {
                    var permission = _systemRepository.GetMarkPermission(role);
                    Authentication.MarkPermission(permission);
                    Authentication.MarkRole(role);
                }
                var menus = _systemRepository.GetMenu();
                var menusUser = _systemRepository.GetMenuUser();
                Authentication.MarkMennu(menus);
               // var menu = Authentication.GetMenuUser();
                userinfo = user;
                _log.Info("MarkMennu valid");
                return new JsonRs()
                {
                    Status = "01",
                    Message = "Đăng nhập thành công"
                };
            }
            catch(Exception ex)
            {
                _log.Info("Login is error: StackTrace{0}; \n Message: {1}; \n InnerException: {2}", ex.StackTrace, ex.Message, ex.InnerException);
                return new JsonRs()
                {
                    Status = "00",
                    Message = Resource.ServerError_Lang
                };
            }
        }

        public bool VerifyUserAndEmail(string userName, string email)
        {
            return _userRepository.VerifyUserAndEmail(userName, email);
        }

        public String getUsername()
        {
            return Authentication.GetUserName();
        }
        public int getUserID()
        {
            return Authentication.GetUserId();
        }

        public Vw_Core_User GetUserByName(string username)
        {
            return _userRepository.GetUserByName(username);
        }

        public Vw_Core_User GetUserByUserId(int userId)
        {
            return _userRepository.GetUserByUserId(userId);
        }

        public bool AddUser(Vw_Core_User user)
        {
            return _userRepository.AddUser(user);
        }

        public bool DeleteUser(int userId)
        {
            return _userRepository.DeleteUser(userId);
        }

        public bool UpdateUser(Vw_Core_User user)
        {
            return _userRepository.UpdateUser(user);
        }

        public List<Vw_Core_User> GetData(UserSearchModel searchModel)
        {
            return _userRepository.SearchUser(searchModel);
        }


        public void SendMailUserInfo(string userName, string pass, string toEmail)
        {
            Task.Run(async () =>
            {
                var email = new EmailUtil();
                await email.SendMail("", "Gửi thông tin tài khoản trên hệ thống +++SYSTEM+++", toEmail,
                    new string[] { },
                    "Xin chào " + userName + " <br/><br/>" +
                        "Thông tin tài khoản trên hệ thống của bạn:<br/>" +
                        "Tên tài khoản:" + userName + "<br/>" +
                        "Mật khẩu đăng nhập:" + pass + "<br/>" +
                        "Để đảm bảo an toàn thông tin, bạn vui lòng đăng nhập và đổi mật khẩu để tiếp tục sử dụng dịch vụ. " + "<br /><br />" +
                        "URL: <a href='#'>http://#.vn</a>"
                        + "<br /><br />" +
                        "Trân trọng!");
            });
        }
    }
}
using System;
using NLog;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.UserManagement;
using webNews.Models;
using webNews.Models.Common;
using webNews.Models.UserManagement;
using webNews.Shared;

namespace webNews.Domain.Services.UserManagement
{
    public class UserManagementService : Service<System_User>, IUserManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IUserRepository _userRepository;
        private readonly ISystemRepository _systemRepository;
        private readonly IUserManagementRepository _userManageRepository;

        public UserManagementService(ISystemRepository systemRepository, IUserManagementRepository userManageRepository, IUserRepository userRepository, IRepository<System_User> repository) : base(repository)
        {
            _userManageRepository = userManageRepository;
            _systemRepository = systemRepository;
            _userRepository = userRepository;
        }

        public PagingObject<Vw_Core_User> GetList(SearchUserModel filter, int pageIndex, int pageSize)
        {
            return _userManageRepository.GetList(filter, pageIndex, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _userManageRepository.CheckExist(userName);
        }

        public CoreMessageResponse Create(UserModel model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var check = _userManageRepository.GetByName(model.UserName);

            if (check != null)
            {
                response.ResponseMessage = "Tên đăng nhập đã tồn tại!";
                return response;
            }

            var user = new System_User
            {
                UserName = model.UserName,
                FullName = model.FullName,
                UserRole = model.UserRole,
                Status = model.Status,
                Password = model.Password,
                Email = model.Email,
                Tel=model.Tel,
                CreatedBy = model.CreatedBy,
                CreatedDate = DateTime.Now,
                CreatedById = model.CreatedById,
                UpdatedBy = model.UpdatedBy,
                UpdatedById = model.UpdatedById,
                UserType = 1,
                Description = model.Description,
                UpdatedDate = DateTime.Now
                
            };
            user.Password = "123456";
            //user.Password = new Random().Next(0, 999999).ToString("000000");

            _logger.Info("Pass: " + user.Password);//ghi tạm xem password
            user.Salt = CryptUtils.RamdonStringForSalt();
            user.Password = user.ToHashValue(user.Password);
            
            var isInsert = _userManageRepository.Create(user);

            if (isInsert)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Thêm người dùng thành công";
            }
            else
            {
                response.ResponseMessage = "Thêm người dùng thất bại";
            }

            return response;
        }

        public CoreMessageResponse Update(UserModel model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var user = _userManageRepository.GetById(model.UserId);

            if (user == null)
            {
                response.ResponseMessage = "Người dùng không tồn tại!";
                return response;
            }
            user.CreatedDate = new DateTime();
            user.UpdatedDate= new DateTime();
            user.FullName = model.FullName;
            user.Status = model.Status;
            user.Email = model.Email;
            user.Tel = model.Tel;
            user.UserRole = model.UserRole;
            user.Description = model.Description;

            var update = _userManageRepository.UpdateUser(user);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật người dùng thành công";
            }
            return response;
        }

        public bool DeleteUser(int id)
        {
            return _userManageRepository.Delete(id);
        }

        public Vw_Core_User GetUserById(int id)
        {
            return _userManageRepository.GetById(id);
        }

        public Vw_Core_User GetByName(string code)
        {
            return _userManageRepository.GetByName(code);
        }
    }
}
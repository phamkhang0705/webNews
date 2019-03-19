using NLog;
using System;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.GroupManagement;
using webNews.Models;
using webNews.Models.GroupManagement;

namespace webNews.Domain.Services.GroupManagement
{
    public class GroupManagementService : Service<Group>, IGroupManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IGroupManagementRepository _groupRepository;

        public GroupManagementService(IGroupManagementRepository groupRepository, IRepository<Group> repository) : base(repository)
        {
            _groupRepository = groupRepository;
        }

        public PagingObject<Group> GetList(SearchGroupModel filter, int pageIndex, int pageSize)
        {
            return _groupRepository.GetList(filter, pageIndex, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _groupRepository.CheckExist(userName);
        }

        public CoreMessageResponse CreateGroup(Group model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var check = _groupRepository.GetByCode(model.Code);

            if (check != null)
            {
                response.ResponseMessage = "Mã nhóm đã tồn tại!";
                return response;
            }

            var user = new Group()
            {
                Name = model.Name,
                Code = model.Code,
                Status = model.Status,
                Description = model.Description,
                CreatedBy = model.CreatedBy,
                CreatedDate = DateTime.Now,
                UpdatedBy = model.UpdatedBy,
                UpdatedDate = DateTime.Now
            };
            var isInsert = _groupRepository.Create(user);

            if (isInsert > 0)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Thêm nhóm thành công";
            }
            else
            {
                response.ResponseMessage = "Thêm nhóm thất bại";
            }

            return response;
        }

        public CoreMessageResponse UpdateGroup(Group model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var group = _groupRepository.GetById(model.Id);

            if (group == null)
            {
                response.ResponseMessage = "Nhóm không tồn tại!";
                return response;
            }

            group.UpdatedDate = new DateTime();
            group.UpdatedBy = model.UpdatedBy;
            group.Name = model.Name;
            group.Status = model.Status;
            group.Description = model.Description;

            var update = _groupRepository.UpdateGroup(group);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật nhóm thành công";
            }
            return response;
        }

        public bool Delete(int id)
        {
            return _groupRepository.Delete(id);
        }

        public Group GetUserById(int id)
        {
            return _groupRepository.GetById(id);
        }

        public Group GetByCode(string code)
        {
            return _groupRepository.GetByCode(code);
        }
    }
}
using NLog;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.BizAccountGroupManagement;
using webNews.Domain.Repositories.GroupManagement;
using webNews.Models;
using webNews.Models.GroupManagement;

namespace webNews.Domain.Services.BizAccountGroupManagement
{
    public class BizAccountGroupService : Service<BizAccountGroup>, IBizAccountGroupService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IBizAccountGroupRepository _groupRepository;

        public BizAccountGroupService(IBizAccountGroupRepository groupRepository, IRepository<BizAccountGroup> repository) : base(repository)
        {
            _groupRepository = groupRepository;
        }

        public PagingObject<BizAccountGroup> GetList(SearchGroupModel filter, int pageIndex, int pageSize)
        {
            var offset = 0;
            if (pageIndex >= pageSize)
            {
                offset = (pageIndex / pageSize);
            }
            return _groupRepository.GetList(filter, offset, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _groupRepository.CheckExist(userName);
        }

        public CoreMessageResponse CreateGroup(BizAccountGroup model)
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

            var user = new BizAccountGroup()
            {
                Name = model.Name,
                Code = model.Code,
                Status = model.Status
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

        public CoreMessageResponse UpdateGroup(BizAccountGroup model)
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
            
            group.Name = model.Name;
            group.Status = model.Status;

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

        public BizAccountGroup GetById(int id)
        {
            return _groupRepository.GetById(id);
        }

        public BizAccountGroup GetByCode(string code)
        {
            return _groupRepository.GetByCode(code);
        }

        public List<BizAccountGroup> GetAllGroups()
        {
            return _groupRepository.GetAllGroups();
        }
    }
}
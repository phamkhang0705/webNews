using webNews.Domain.Repositories;
using webNews.Domain.Repositories.RoleManagement;
using webNews.Models;
using webNews.Models.RoleManagement;
using ServiceStack.OrmLite;
using System.Collections.Generic;
using System.Linq;
using webNews.Domain.Entities;

namespace webNews.Domain.Services.RoleManagement
{
    public class RoleManagementService : Service<Security_Role>, IRoleManagementService
    {
        private readonly IRoleManagementRepository _roleManagementRepository;
        private readonly ISystemRepository _systemRepository;

        public RoleManagementService(IRepository<Security_Role> repository, IRoleManagementRepository roleManagementRepository, ISystemRepository systemRepository) : base(repository)
        {
            _roleManagementRepository = roleManagementRepository;
            _systemRepository = systemRepository;
        }

        public PagingObject<Security_Role> Search(SearchRoleModel search, int pageIndex, int pageSize)
        {
            var query = db.From<Security_Role>();
            int limit = 0;
            if(pageIndex == 0 || pageIndex < pageSize)
            {
                limit = 0;
            }
            else
            {
                limit = (pageIndex / pageSize);
            }
            if(!string.IsNullOrEmpty(search.RoleName)) query.Where(x => x.RoleName.ToLower().Contains(search.RoleName.ToLower()));
            return _roleManagementRepository.Paging(query, limit, pageSize);
        }

        public CoreMessageResponse Create(Security_Role model)
        {
            var rs = _roleManagementRepository.Create(model);
            var response = new CoreMessageResponse();
            if(rs > 0)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Thêm mới nhóm quyền thành công";
            }
            else
            {
                response.ResponseCode = "00";
                response.ResponseMessage = "Thêm mới nhóm quyền thất bại";
            }
            return response;
        }

        public CoreMessageResponse Update(Security_Role model)
        {
            var rs = _roleManagementRepository.Update(model);
            var response = new CoreMessageResponse();
            if(rs > 0)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật nhóm quyền thành công";
            }
            else
            {
                response.ResponseCode = "00";
                response.ResponseMessage = "Cập nhật nhóm quyền thất bại";
            }
            return response;
        }

        public List<Security_Role> GetAllRole()
        {
            return _roleManagementRepository.GetAll();
        }

        public List<SelectListModel> GetAllPermission()
        {
            var data = _roleManagementRepository.GetAllPermission();

            List<SelectListModel> res;
            res = data.Select(x => new SelectListModel
            {
                Name = x.PermissionName,
                Text = x.Id.ToString()
            }).ToList();
            return res;
        }
    }
}
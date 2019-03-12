using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.RoleManage;
using webNews.Models;

namespace webNews.Domain.Services.RoleManage
{
    public class RoleManageService : Service<Security_Role>, IRoleManageService
    {
        private readonly IRoleManageRepository _roleManageRepository;

        public RoleManageService(IRepository<Security_Role> repository, IRoleManageRepository roleManageRepository) : base(repository)
        {
            _roleManageRepository = roleManageRepository;
        }

        public PagingObject<Security_Role> GetListSecurity_Role(string name, int pageIndex, int pageSize)
        {
            return _roleManageRepository.GetListSecurity_Role(name, pageIndex, pageSize);
        }

        public PagingObject<Security_Permission> GetListPermission(string name, int pageIndex, int pageSize)
        {
            return _roleManageRepository.GetListPermission(name, pageIndex, pageSize);
        }

        public List<Security_VwRoleService> GetListRoleMark(int roleId)
        {
            return _roleManageRepository.GetListRoleMark(roleId);
        }

        public List<Security_Function> GetListFunctions()
        {
            return _roleManageRepository.GetListFunctions();
        }

        public List<Security_Permission> GetListPermissions()
        {
            return _roleManageRepository.GetListPermissions();
        }

        public Security_Role GetRole(int id)
        {
            return _roleManageRepository.GetRole(id);
        }

        public bool UpdateRole(Security_Role role, string functionAndPermission)
        {
            return _roleManageRepository.UpdateRole(role, functionAndPermission);
        }

        public List<SelectListModel> GetListRole()
        {
            return _roleManageRepository.GetListRole();
        }
    }
}
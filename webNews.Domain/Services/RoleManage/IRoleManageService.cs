using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;

namespace webNews.Domain.Services.RoleManage
{
    public interface IRoleManageService : IService<Security_Role>
    {
        PagingObject<Security_Role> GetListSecurity_Role(string name, int pageIndex, int pageSize);
        PagingObject<Security_Permission> GetListPermission(string name, int pageIndex, int pageSize);
        List<Security_VwRoleService> GetListRoleMark(int roleId);
        List<Security_Function> GetListFunctions();
        List<Security_Permission> GetListPermissions();
        Security_Role GetRole(int id);
        bool UpdateRole(Security_Role role, string functionAndPermission);
        List<SelectListModel> GetSelectRole();
    }
}

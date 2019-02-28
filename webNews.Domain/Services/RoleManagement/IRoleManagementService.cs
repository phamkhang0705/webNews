using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.RoleManagement;

namespace webNews.Domain.Services.RoleManagement
{
    public interface IRoleManagementService : IService<Security_Role>
    {
        PagingObject<Security_Role> Search(SearchRoleModel search, int pageIndex, int pageSize);

        CoreMessageResponse Create(Security_Role model);

        CoreMessageResponse Update(Security_Role model);

        List<Security_Role> GetAllRole();

        List<SelectListModel> GetAllPermission();

        Security_Role GetRole(int id);
    }
}
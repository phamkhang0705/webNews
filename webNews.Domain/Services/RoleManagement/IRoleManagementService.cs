using webNews.Models;
using webNews.Models.Common;
using webNews.Models.RoleManagement;
using System.Collections.Generic;
using webNews.Domain.Entities;

namespace webNews.Domain.Services.RoleManagement
{
    public interface IRoleManagementService : IService<Security_Role>
    {
        PagingObject<Security_Role> Search(SearchRoleModel search, int pageIndex, int pageSize);

        CoreMessageResponse Create(Security_Role model);

        CoreMessageResponse Update(Security_Role model);

        List<Security_Role> GetAllRole();

        List<SelectListModel> GetAllPermission();
    }
}
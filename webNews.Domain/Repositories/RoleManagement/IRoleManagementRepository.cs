using System.Collections.Generic;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.RoleManagement
{
    public interface IRoleManagementRepository : IRepository<Security_Role>
    {
        List<Security_Permission> GetAllPermission();
    }
}

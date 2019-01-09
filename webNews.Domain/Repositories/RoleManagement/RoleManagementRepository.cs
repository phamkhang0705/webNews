using System.Collections.Generic;
using ServiceStack.OrmLite;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.RoleManagement
{
    public class RoleManagementRepository : Repository<Security_Role>, IRoleManagementRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        public RoleManagementRepository(IWebNewsDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public List<Security_Permission> GetAllPermission()
        {
            using(var db = _connectionFactory.Open())
            {
                return db.Select<Security_Permission>();
            }
        }
    }
}

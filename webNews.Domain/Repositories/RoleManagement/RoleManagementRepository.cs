using System;
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

        public Security_Role GetRole(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Security_Role>().Where(x => x.Id == id);
                    var list = db.Single(query);
                    return list;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}

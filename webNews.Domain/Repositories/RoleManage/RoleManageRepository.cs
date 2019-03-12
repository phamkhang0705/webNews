using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using webNews.Models;
using NLog;
using ServiceStack.OrmLite;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.RoleManage
{
    public class RoleManageRepository : Repository<Security_Role>, IRoleManageRepository
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IWebNewsDbConnectionFactory _connectionFactory;

        public RoleManageRepository(IWebNewsDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Security_Role> GetListSecurity_Role(string name, int pageIndex, int pageSize)
        {
            try
            {
                if (string.IsNullOrEmpty(name)) name = "";
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Security_Role>();
                    if (!string.IsNullOrEmpty(name))
                    {
                        query = query.Where(e => e.RoleName.Contains(name));
                    }
                    var total = db.Scalar<int>(query.ToCountStatement(), query.Params);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    var lst = db.Select(query);
                    var data = new PagingObject<Security_Role>()
                    {
                        Total = total,
                        DataList = lst
                    };
                    return data;
                }
            }
            catch (Exception ex)
            {
                _logger.Info("GetListSecurity_Role is error: " + ex);
                return null;
            }
        }

        public PagingObject<Security_Permission> GetListPermission(string name, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Security_Permission>();
                    if (!string.IsNullOrEmpty(name))
                    {
                        query = query.Where(e => e.PermissionName.Contains(name));
                    }
                    var total = db.Scalar<int>(query.ToCountStatement(), query.Params);

                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    var lst = db.Select(query);
                    var data = new PagingObject<Security_Permission>() {
                        Total = total,
                        DataList = lst
                    };
                    return data;
                }
            }
            catch (Exception ex)
            {
                _logger.Info("GetListPermission is error: " + ex);
                return null;
            }
        }

        public List<Security_VwRoleService> GetListRoleMark(int roleId)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Security_VwRoleService>();
                    query = query.Where(x => x.RoleID == roleId);
                    return db.Select(query);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("GetListRoleMark error: " + ex);
                return null;
            }
        }

        public List<Security_Function> GetListFunctions()
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Security_Function>();
                    return db.Select(query);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("Get list function error: " + ex);
                return null;
            }
        }

        public List<Security_Permission> GetListPermissions()
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Security_Permission>();
                    return db.Select(query);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("Get list permission error: " + ex);
                return null;
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
                _logger.Error("Get role error: " + ex);
                return null;
            }
        }

        public bool UpdateRole(Security_Role role, string functionAndPermission)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            if (role.Id == 0)
                            {
                                var oInDb = new Security_Role
                                {
                                    RoleName = role.RoleName,
                                    Description = role.Description
                                };
                                db.Save(oInDb);
                                UpdateFunctionAndPermission(oInDb, functionAndPermission, db);
                                trans.Commit();
                                return true;
                            }
                            db.Update(new Security_Role { RoleName = role.RoleName }, p => p.Id == role.Id);
                            UpdateFunctionAndPermission(role, functionAndPermission, db);
                            trans.Commit();
                            return true;
                        }
                        catch (Exception ex)
                        {
                            _logger.Info("Security_RoleUpdate error" + ex);
                            trans.Rollback();
                            return false;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.Info("Security_RoleUpdate error" + ex);
                return false;
            }
        }

        public List<SelectListModel> GetListRole()
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Security_Role>();
                    var list = db.Select(query).Select(_ => new SelectListModel
                    {
                        Value = (int)_.Id,
                        Text = _.RoleName
                    }).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                _logger.Error("Get role error: " + ex);
                return new List<SelectListModel>();
            }
        }

        public void UpdateFunctionAndPermission(Security_Role role, string functionAndPermission, IDbConnection db)
        {
            try
            {
                    db.Delete<Security_RoleFunctionPermision>(new { RoleId = role.Id });
                    //add to extra
                    string[] lstFuncAndPermission = functionAndPermission.Split('^');
                    var listInsert = new List<Security_RoleFunctionPermision>();
                    Security_RoleFunctionPermision roles;
                    //firs is clear all
                    // save new role
                for (int jx = 0; jx <= lstFuncAndPermission.Length - 1; jx++)
                    {
                        var funcAndPer = lstFuncAndPermission[jx];
                        var arrFuncAndPer = funcAndPer.Split('-');
                        if (arrFuncAndPer.Length != 2) continue;
                        var functionId = Convert.ToInt32(arrFuncAndPer[0]);
                        var permissionId = Convert.ToInt32(arrFuncAndPer[1]);
                        roles = new Security_RoleFunctionPermision
                        {
                            RoleId = (int)role.Id,
                            PermissionId = permissionId,
                            FunctionId = functionId
                        };
                         listInsert.Add(roles);
                    }
                if(listInsert.Any())
                    db.InsertAll(listInsert);
            }
            catch (Exception ex)
            {
                _logger.Info("Update quyền: {0} \n StackTrace{1}; \n Message: {2}; \n InnerException: {3}", "", ex.StackTrace, ex.Message, ex.InnerException);
            }
        }

    }
}

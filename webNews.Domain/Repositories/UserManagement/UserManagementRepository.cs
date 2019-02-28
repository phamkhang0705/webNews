using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.UserManagement;

namespace webNews.Domain.Repositories.UserManagement
{
    public class UserManagementRepository : Repository<System_User>, IUserManagementRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly ISystemRepository _systemRepository;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public UserManagementRepository(ISystemRepository systemRepository, IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
            _systemRepository = systemRepository;
        }

        public PagingObject<Vw_Core_User> GetList(SearchUserModel searchModel, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_Core_User>();
                    if (!string.IsNullOrEmpty(searchModel.UserName))
                    {
                        query.Where(_ => _.UserName.Contains(searchModel.UserName));
                    }

                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    //Filter user by customer type
                    return new PagingObject<Vw_Core_User>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception)
            {
                return new PagingObject<Vw_Core_User>
                {
                    Total = 0,
                    DataList = new List<Vw_Core_User>()
                };
            }
        }

        public bool CheckExist(string userName)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_Core_User>(_ => _.UserName == userName);
                    if (check != null) return true;
                    return false;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return false;
            }
        }

        public bool Create(System_User user)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            var userId = db.Insert(user, true);

                            db.Insert(new Security_UserRole()
                            {
                                UserId = (int)userId,
                                RoleId = 1
                            });

                            trans.Commit();

                            return true;
                        }
                        catch (Exception e)
                        {
                            trans.Rollback();
                            return false;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return false;
            }
        }

        public bool UpdateUser(System_User model)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            db.UpdateOnly(new Security_UserRole { RoleId = 1 },
                                p => new { p.RoleId },
                                _ => _.UserId == model.Id && _.RoleId == 1);

                            db.Update(model);

                            trans.Commit();

                            return true;
                        }
                        catch (Exception e)
                        {
                            trans.Rollback();
                            return false;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return false;
            }
        }

        public bool Delete(long id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Delete<System_User>(_ => _.Id == id);
                    if (check > 0) return true;
                    return false;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return false;
            }
        }

        public Vw_Core_User GetById(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_Core_User>(_ => _.UserId == id);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_Core_User();
            }
        }

        public Vw_Core_User GetByName(string userName)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_Core_User>(_ => _.UserName == userName);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_Core_User();
            }
        }
    }
}
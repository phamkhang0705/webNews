using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.GroupManagement;

namespace webNews.Domain.Repositories.GroupManagement
{
    public class GroupManagementRepository : Repository<Group>, IGroupManagementRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public GroupManagementRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Group> GetList(SearchGroupModel filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Group>();
                    if (!string.IsNullOrEmpty(filter.Name))
                    {
                        query.Where(_ => _.Name.Contains(filter.Name));
                    }
                    if (!string.IsNullOrEmpty(filter.Code))
                    {
                        query.Where(_ => _.Code == filter.Code);
                    }
                    if (filter.Status != -1)
                    {
                        query.Where(_ => _.Status == filter.Status);
                    }

                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<Group>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<Group>
                {
                    Total = 0,
                    DataList = new List<Group>()
                };
            }
        }

        public bool CheckExist(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Group>(_ => _.Code == code);
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

        public bool CreateGroup(Group group)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        db.Insert(group, true);
                        return true;
                    }
                    catch (Exception e)
                    {
                        return false;
                    }
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return false;
            }
        }

        public bool UpdateGroup(Group group)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        db.Update(group);
                        return true;
                    }
                    catch (Exception e)
                    {
                        return false;
                    }
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return false;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Delete<Group>(_ => _.Id == id);
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

        public Group GetById(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Group>(_ => _.Id == id);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Group();
            }
        }

        public Group GetByCode(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Group>(_ => _.Code == code);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Group();
            }
        }

        public List<Group> GetAllGroups()
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Select<Group>(_ => _.Status == 1);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new List<Group>();
            }
        }
    }
}
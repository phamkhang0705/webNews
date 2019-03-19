using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.GroupCategoryManagement
{
    public class GroupCategoryRepository : Repository<GroupCategory>, IGroupCategoryRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private Logger _logger = LogManager.GetCurrentClassLogger();

        public GroupCategoryRepository(IWebNewsDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public List<GroupCategory> GetListGroupCategory(int? categoryId = null, int? groupId = null)
        {
            try
            {
                using (var db = _connectionFactory.OpenDbConnection())
                {
                    var query = db.From<GroupCategory>();
                    if (categoryId != null)
                    {
                        query = query.Where(x => x.CategoryId == categoryId);
                    }
                    if (groupId != null)
                    {
                        query = query.Where(x => x.GroupId == groupId);
                    }
                    return db.Select(query);
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new List<GroupCategory>();
            }
        }

        public bool CreateGroupCategory(GroupCategory groupCategory)
        {
            try
            {
                using (var db = _connectionFactory.OpenDbConnection())
                {
                    try
                    {
                        db.Insert(groupCategory);
                        return true;
                    }
                    catch (Exception e)
                    {
                        _logger.Error("" + e);
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

        public bool CreateGroupCategory(List<GroupCategory> lstGroupCategories)
        {
            try
            {
                using (var db = _connectionFactory.OpenDbConnection())
                {
                    try
                    {
                        db.Insert(lstGroupCategories);
                        return true;
                    }
                    catch (Exception e)
                    {
                        _logger.Error("" + e);
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

        public bool UpdateGroupCategory(GroupCategory groupCategory)
        {
            try
            {
                using (var db = _connectionFactory.OpenDbConnection())
                {
                    try
                    {
                        db.Update(groupCategory);
                        return true;
                    }
                    catch (Exception e)
                    {
                        _logger.Error("" + e);
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

        public bool DeleteGroupCategory(int categoryId)
        {
            try
            {
                using (var db = _connectionFactory.OpenDbConnection())
                {
                    try
                    {
                        db.Delete<GroupCategory>(x => x.CategoryId == categoryId);
                        return true;
                    }
                    catch (Exception e)
                    {
                        _logger.Error("" + e);
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
    }
}
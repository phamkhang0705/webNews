using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Repositories.CategoryDetailManagement
{
    public class CategoryDetailManagementRepository : Repository<CategoryDetail>, ICategoryDetailManagementRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public CategoryDetailManagementRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Vw_CategoryDetail> GetList(SearchCategoryModel filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_CategoryDetail>();
                    if (!string.IsNullOrEmpty(filter.Name))
                    {
                        query.Where(_ => _.Code.Contains(filter.Name));
                    }
                    if (!string.IsNullOrEmpty(filter.Code))
                    {
                        query.Where(_ => _.Code == filter.Code);
                    }
                    if (filter.GroupId != null)
                    {
                        if (filter.GroupId.Count > 0)
                        {
                            query.Where(_ => _.groupids.Contains(filter.GroupId.ToString()));
                        }
                    }
                    //More filter
                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<Vw_CategoryDetail>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<Vw_CategoryDetail>
                {
                    Total = 0,
                    DataList = new List<Vw_CategoryDetail>()
                };
            }
        }

        public bool CheckExist(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Category>(_ => _.Code == code);
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

        public bool CreateCategory(CategoryDetail category)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        db.Insert(category);
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

        public bool UpdateCategory(CategoryDetail category)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        db.Update(category);
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

        public Vw_CategoryDetail GetCateById(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_CategoryDetail>(_ => _.Id == id);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_CategoryDetail();
            }
        }

        public Vw_CategoryDetail GetByCode(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_CategoryDetail>(_ => _.Code == code);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_CategoryDetail();
            }
        }
    }
}
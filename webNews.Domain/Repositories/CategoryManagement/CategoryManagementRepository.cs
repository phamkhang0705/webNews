using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Repositories.CategoryManagement
{
    public class CategoryManagementRepository : Repository<Category>, ICategoryManagementRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public CategoryManagementRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Vw_Category> GetList(SearchCategoryModel filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_Category>();
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
                            query.Where(_ => _.Code == filter.Code);
                        }
                    }
                    //More filter
                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<Vw_Category>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<Vw_Category>
                {
                    Total = 0,
                    DataList = new List<Vw_Category>()
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

        public bool CreateCategory(Category category, List<GroupCategory> groupCategories, List<ProductPrice> productPrices, List<FileAttach> files)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.BeginTransaction())
                    {
                        try
                        {
                            var cateId = (int)db.Insert(category, true);
                            if (groupCategories.Count > 0)
                            {
                                foreach (var groupCategory in groupCategories)
                                {
                                    groupCategory.CategoryId = cateId;
                                    db.Insert(groupCategory);
                                }
                                db.Insert(groupCategories);
                            }
                            if (productPrices.Count > 0)
                            {
                                foreach (var productPrice in productPrices)
                                {
                                    productPrice.CategoryId = cateId;
                                    db.Insert(productPrice);
                                }
                            }

                            if (files.Count > 0)
                            {
                                foreach (var file in files)
                                {
                                    file.CategoryId = cateId;
                                    db.Insert(file);
                                }
                            }

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

        public bool UpdateCategory(Category category, List<GroupCategory> groupCategories, List<ProductPrice> productPrices, List<FileAttach> files)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.BeginTransaction())
                    {
                        try
                        {
                            db.Update(category);
                            if (groupCategories.Count > 0)
                            {
                                db.Delete<GroupCategory>(x => x.CategoryId == category.Id);
                                db.Insert(groupCategories);
                            }
                            if (productPrices.Count > 0)
                            {
                                db.Delete<ProductPrice>(x => x.CategoryId == category.Id);
                                db.Insert(productPrices);
                            }
                            if (files.Count > 0)
                            {
                                db.Delete<FileAttach>(x => x.CategoryId == category.Id);
                                db.Insert(files);
                            }
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

        public bool Delete(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            db.Delete<GroupCategory>(x => x.CategoryId == id);
                            db.Delete<ProductPrice>(x => x.CategoryId == id);
                            db.Delete<FileAttach>(x => x.CategoryId == id);

                            db.Delete<Category>(_ => _.Id == id);
                            trans.Commit();
                            return true;
                        }
                        catch (Exception ex)
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

        public Vw_Category GetCateById(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_Category>(_ => _.Id == id);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_Category();
            }
        }

        public Vw_Category GetByCode(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_Category>(_ => _.Code == code);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_Category();
            }
        }

        public List<GroupCategory> GetGroupCategories(int cateId)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var data = db.Select<GroupCategory>(_ => _.CategoryId == cateId);
                    return data;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new List<GroupCategory>();
            }
        }
    }
}
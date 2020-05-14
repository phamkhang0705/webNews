using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using PagedList;
using webNews.Common;
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
                        query.Where(_ => _.Name.Contains(filter.Name));
                    }
                    if (!string.IsNullOrEmpty(filter.Code))
                    {
                        query.Where(_ => _.Code == filter.Code);
                    }
                    if (filter.GroupId != null)
                    {
                        if (filter.GroupId.Count > 0)
                        {
                            var result = string.Join(",", filter.GroupId.ToArray());
                            query.Where(_ => _.groupids.Contains(result.ToUpper()));
                        }
                    }
                    if (filter.Status != -1)
                    {
                        query.Where(x => x.Status == filter.Status);
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

        public bool CreateCategory(Category category, string[] groupCategories, List<ProductPrice> productPrices, List<string> files)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            var cateId = (int)db.Insert(category, true);
                            if (groupCategories.Length > 0)
                            {
                                foreach (var groupCategory in groupCategories)
                                {
                                    db.Insert(new GroupCategory()
                                    {
                                        CategoryId = cateId,
                                        GroupId = Int32.Parse(groupCategory)
                                    });
                                }
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
                                    db.Insert(new FileAttach()
                                    {
                                        CategoryId = cateId,
                                        Url = file
                                    });
                                }
                            }

                            trans.Commit();
                            return true;
                        }
                        catch (Exception e)
                        {
                            _logger.Error(e, "DB connection error" + e.Message);
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

        public bool UpdateCategory(Category category, string[] groupCategories, List<ProductPrice> productPrices, List<string> files, List<FileAttach> listFiles)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            var cate = db.Single<Category>(x => x.Id == category.Id);
                            cate.Code = category.Code;
                            cate.Name = category.Name;
                            cate.ShortName = (category.Name + '_' + category.Code).ToUrlSegment(250).ToLower();
                            cate.AgeType = category.AgeType;
                            cate.FromAge = category.FromAge;
                            cate.ToAge = category.ToAge;
                            cate.Description = category.Description;
                            cate.MoreInformation = category.MoreInformation;
                            cate.Status = category.Status;
                            cate.UpdatedBy = category.UpdatedBy;
                            cate.UpdatedDate = category.UpdatedDate;
                            db.Update(cate);
                            if (groupCategories.Length > 0)
                            {
                                db.Delete<GroupCategory>(x => x.CategoryId == category.Id);
                                foreach (var groupCategory in groupCategories)
                                {
                                    db.Insert(new GroupCategory()
                                    {
                                        CategoryId = category.Id,
                                        GroupId = Int32.Parse(groupCategory)
                                    });
                                }

                            }
                            if (productPrices.Count > 0)
                            {
                                db.Delete<ProductPrice>(x => x.CategoryId == category.Id);
                                foreach (var productPrice in productPrices)
                                {
                                    productPrice.CategoryId = category.Id;
                                    db.Insert(productPrice);
                                }
                            }

                            if (listFiles != null)
                            {
                                var listId = listFiles.Select(x => x.Id).ToList();

                                var listFile = db.Select<FileAttach>(x => x.CategoryId == category.Id);
                                foreach (var fileAttach in listFile)
                                {
                                    if (!listId.Contains(fileAttach.Id))
                                    {
                                        db.Delete<FileAttach>(x => x.Id == fileAttach.Id);
                                    }
                                }
                            }
                            else
                            {
                                db.Delete<FileAttach>(x => x.CategoryId == category.Id);
                            }
                            if (files.Count > 0)
                            {
                                foreach (var file in files)
                                {
                                    db.Insert(new FileAttach()
                                    {
                                        CategoryId = category.Id,
                                        Url = file
                                    });
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

        public List<Vw_Category> GetByName(string name)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var data = db.Select<Vw_Category>(_ => _.Name.ToLower().Contains(name.ToLower()));
                    return data;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new List<Vw_Category>();
            }
        }
        public List<Vw_Category_Sale> GetCategorySale(string name)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var data = db.Select<Vw_Category_Sale>(_ => _.Name.ToLower().Contains(name.ToLower()));
                    return data;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new List<Vw_Category_Sale>();
            }
        }

        public IEnumerable<Vw_Category> GetCategories(SearchCategoryModelFE filter)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_Category>().Where(x => x.Status == 1);
                    if (filter.IsRental == 1)
                    {
                        query.Where(x => x.DisplayRental == filter.IsRental);
                    }
                    if (filter.IsSale == 1)
                    {
                        query.Where(x => x.DisplaySale == filter.IsSale);
                    }
                    if (!string.IsNullOrEmpty(filter.name))
                    {
                        query.Where(_ => _.Name.Contains(filter.name));
                    }

                    if (!string.IsNullOrEmpty(filter.group) && filter.group != "all")
                    {
                        query.Where(_ => _.groupshortnames.Contains(filter.group));
                    }

                    if (filter.agetype == 1)
                    {
                        query.Where(_ => _.AgeType == filter.agetype);
                        if (filter.type == 1)
                        {
                            query.Where(_ => _.FromAge >= 0 && _.ToAge <= 12);
                        }
                    }
                    if (filter.agetype == 2)
                    {
                        query.Where(_ => _.AgeType == filter.agetype);
                        if (filter.type == 1)
                        {
                            query.Where(_ => _.FromAge >= 1 || _.ToAge <= 3);
                        }
                        if (filter.type == 2)
                        {
                            query.Where(_ => _.ToAge >= 3);
                        }
                    }
//                    if (filter.IsRental == 1)
//                    {
//                        query.Where(x => x.total_rental > 0);
//                    }
//                    if (filter.IsSale == 1)
//                    {
//                        query.Where(x => x.total_sale > 0);
//                    }

                    //More filter
                    //                    var total = (int)db.Count(query);
                    return db.Select(query).ToPagedList(Convert.ToInt32(filter.Page), Convert.ToInt32(filter.PageSize));
                }
            }
            catch (Exception e)
            {
                return new List<Vw_Category>();
            }
        }

        public Vw_Category GetCategoryDetail(int id)
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

        public Vw_Category GetCategoryDetail(string shortName)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_Category>(_ => _.ShortName == shortName);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_Category();
            }
        }
        
        public List<Vw_Category> GetListRelated(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var group = db.Select<GroupCategory>(x => x.CategoryId == id);
                    var listCate = new List<Vw_Category>();
                    foreach (var item in group)
                    {
                        var cate = db.Select<Vw_Category>().Where(x => x.groupids.Contains(item.GroupId.ToString()));
                        listCate.AddRange(cate);
                    }
                    return listCate;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new List<Vw_Category>();
            }
        }
    }
}
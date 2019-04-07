using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ProductManagement;

namespace webNews.Domain.Repositories.ProductManagement
{
    public class ProductManagementRepository : Repository<Product>, IProductManagementRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public ProductManagementRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Vw_Product> GetList(SearchProductModel filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_Product>();
                    if (!string.IsNullOrEmpty(filter.Name))
                    {
                        query.Where(_ => _.ProductName.Contains(filter.Name));
                    }
                    if (!string.IsNullOrEmpty(filter.Code))
                    {
                        query.Where(_ => _.ProductCode == filter.Code);
                    }
                    if (filter.CategoryId != null)
                    {
                        query.Where(_ => _.CategoryId == filter.CategoryId);
                    }
                    //More filter
                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<Vw_Product>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<Vw_Product>
                {
                    Total = 0,
                    DataList = new List<Vw_Product>()
                };
            }
        }

        public bool CheckExist(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Product>(_ => _.ProductCode == code);
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

        public bool CreateProduct(Product product, List<string> files)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            var productId = (int)db.Insert(product, true);

                            if (files.Count > 0)
                            {
                                foreach (var file in files)
                                {
                                    db.Insert(new FileAttach()
                                    {
                                        ProductId = productId,
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

        public bool UpdateProduct(Product product, List<string> files, List<FileAttach> listFiles)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            db.Update(product);

                            if (listFiles != null)
                            {
                                var listId = listFiles.Select(x => x.Id).ToList();

                                var listFile = db.Select<FileAttach>(x => x.ProductId == product.Id);
                                foreach (var fileAttach in listFile)
                                {
                                    if (!listId.Contains(fileAttach.Id))
                                    {
                                        db.Delete<FileAttach>(x => x.Id == fileAttach.Id);
                                    }
                                }
                            }
                            if (files.Count > 0)
                            {
                                foreach (var file in files)
                                {
                                    db.Insert(new FileAttach()
                                    {
                                        ProductId = product.Id,
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
                            db.Delete<FileAttach>(x => x.ProductId == id);

                            db.Delete<Product>(_ => _.Id == id);
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

        public Vw_Product GetProductById(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_Product>(_ => _.Id == id);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_Product();
            }
        }

        public Vw_Product GetByCode(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_Product>(_ => _.ProductCode == code);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_Product();
            }
        }
    }
}
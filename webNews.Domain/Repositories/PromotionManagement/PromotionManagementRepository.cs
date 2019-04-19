using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.PromotionManagement;

namespace webNews.Domain.Repositories.PromotionManagement
{
    public class PromotionManagementRepository : Repository<Promotion>, IPromotionManagementRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public PromotionManagementRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Promotion> GetList(SearchPromotionModel filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Promotion>();
                    if (!string.IsNullOrEmpty(filter.PromotionName))
                    {
                        query.Where(_ => _.PromotionName == filter.PromotionName);
                    }
                    if (!string.IsNullOrEmpty(filter.PromotionCode))
                    {
                        query.Where(_ => _.PromotionCode == filter.PromotionCode);
                    }
                    if (filter.Status != -1)
                    {
                        query.Where(_ => _.Status == filter.Status);
                    }
                    //More filter
                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<Promotion>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<Promotion>
                {
                    Total = 0,
                    DataList = new List<Promotion>()
                };
            }
        }

        public bool CheckExist(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Promotion>(_ => _.PromotionCode == code);
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

        public bool CreatePromotion(Promotion promotion)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            var id = (int)db.Insert(promotion, true);
                            trans.Commit();
                            return true;
                        }
                        catch (Exception e)
                        {
                            trans.Rollback();
                            _logger.Error(e, "Create Promotion error");
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

        public bool UpdatePromotion(Promotion promotion)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            db.Update(promotion);
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
                            db.Delete<Promotion>(_ => _.Id == id);
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

        public Promotion GetPromotionById(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Promotion>(_ => _.Id == id);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Promotion();
            }
        }

        public Promotion GetByCode(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Promotion>(_ => _.PromotionCode == code);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Promotion();
            }
        }
    }
}
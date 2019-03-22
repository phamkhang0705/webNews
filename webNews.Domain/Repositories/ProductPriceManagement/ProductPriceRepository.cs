using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.ProductPriceManagement
{
    public class ProductPriceRepository : Repository<ProductPrice>, IProductPriceRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public ProductPriceRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public bool CreatePrice(ProductPrice price)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        db.Insert(price, true);
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

        public bool UpdatePrice(ProductPrice price)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        db.Update(price);
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
                    var check = db.Delete<ProductPrice>(_ => _.Id == id);
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

        public List<Vw_CategoryPrice> GetCategoryPrices(int cateId)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    return db.Select<Vw_CategoryPrice>(_ => _.CategoryId == cateId);
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new List<Vw_CategoryPrice>();
            }
        }
    }
}
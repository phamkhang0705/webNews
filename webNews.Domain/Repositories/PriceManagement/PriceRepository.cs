using NLog;
using ServiceStack.OrmLite;
using System;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.PriceManagement
{
    public class PriceRepository : Repository<Price>, IPriceRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public PriceRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public bool CreatePrice(Price Price)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        db.Insert(Price, true);
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

        public bool UpdatePrice(Price Price)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        db.Update(Price);
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
                    var check = db.Delete<Price>(_ => _.Id == id);
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
    }
}
using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.OrderTypeManagement;

namespace webNews.Domain.Repositories.OrderTypeManagement
{
    public class OrderTypeRepository : Repository<OrderType>, IOrderTypeRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public OrderTypeRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public PagingObject<OrderType> GetList(SearchOrderTypeModel filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<OrderType>();
                    if (!string.IsNullOrEmpty(filter.Name))
                    {
                        query.Where(_ => _.Code.Contains(filter.Name));
                    }
                    if (!string.IsNullOrEmpty(filter.Code))
                    {
                        query.Where(_ => _.Code == filter.Code);
                    }

                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<OrderType>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<OrderType>
                {
                    Total = 0,
                    DataList = new List<OrderType>()
                };
            }
        }

        public bool CheckExist(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<OrderType>(_ => _.Code == code);
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

        public bool CreateOrderType(OrderType OrderType)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        db.Insert(OrderType, true);
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

        public bool UpdateOrderType(OrderType OrderType)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        db.Update(OrderType);
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
                    var check = db.Delete<OrderType>(_ => _.Id == id);
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

        public OrderType GetById(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<OrderType>(_ => _.Id == id);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new OrderType();
            }
        }

        public OrderType GetByCode(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<OrderType>(_ => _.Code == code);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new OrderType();
            }
        }
    }
}
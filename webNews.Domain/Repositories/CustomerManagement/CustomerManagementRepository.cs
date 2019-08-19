using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CustomerManagement;

namespace webNews.Domain.Repositories.CustomerManagement
{
    public class CustomerManagementRepository : Repository<Customer>, ICustomerManagementRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public CustomerManagementRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Vw_Customer> GetList(SearchCustomerModel filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_Customer>();
                    query = query.Where(x => x.CustomerType == filter.CustomerType);
                    if (!string.IsNullOrEmpty(filter.CustomerName))
                    {
                        query.Where(_ => _.CustomerName == filter.CustomerName);
                    }
                    if (!string.IsNullOrEmpty(filter.CustomerCode))
                    {
                        query.Where(_ => _.CustomerCode == filter.CustomerCode);
                    }
                    if (!string.IsNullOrEmpty(filter.Email))
                    {
                        query.Where(_ => _.Email == filter.Email);
                    }
                    if (!string.IsNullOrEmpty(filter.Phone))
                    {
                        query.Where(_ => _.Phone == filter.Phone);
                    }
                    if (!string.IsNullOrEmpty(filter.Phone))
                    {
                        query.Where(_ => _.Phone == filter.Phone);
                    }
                    if (filter.Status != -1)
                    {
                        query.Where(_ => _.Status == filter.Status);
                    }
                    //More filter
                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<Vw_Customer>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<Vw_Customer>
                {
                    Total = 0,
                    DataList = new List<Vw_Customer>()
                };
            }
        }

        public bool CheckExist(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Customer>(_ => _.CustomerCode == code);
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

        public bool CreateCustomer(Customer customer, CustomerDetail customerDetail)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            var id = (int)db.Insert(customer, true);
                            customerDetail.CustomerId = id;
                            db.Insert(customerDetail);
                            trans.Commit();
                            return true;
                        }
                        catch (Exception e)
                        {
                            trans.Rollback();
                            _logger.Error(e, "Create customer error");
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

        public bool UpdateCustomer(Customer customer, CustomerDetail customerDetail)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            db.Update(customer);
                            db.Update(customerDetail);
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
                            db.Delete<CustomerDetail>(_ => _.CustomerId == id);
                            db.Delete<Customer>(_ => _.Id == id);
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

        public Vw_Customer GetCustomerById(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_Customer>(_ => _.Id == id);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_Customer();
            }
        }

        public Vw_Customer GetByCode(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_Customer>(_ => _.CustomerCode == code);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_Customer();
            }
        }

        public List<Vw_Customer> GetByName(string name, int customerType = 1)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Select<Vw_Customer>(_ => _.CustomerName.ToLower().Contains(name.ToLower()) && _.CustomerType == customerType);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new List<Vw_Customer>();
            }
        }

        public CustomerDetail GetCustomerDetail(int customerId)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<CustomerDetail>(_ => _.CustomerId == customerId);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new CustomerDetail();
            }
        }

        public Vw_Customer GetCompanyInfo(int type = 3)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_Customer>(_ => _.CustomerType == type);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_Customer();
            }
        }


    }
}
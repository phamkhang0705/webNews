using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using webNews.Models;
using NLog;
using ServiceStack.OrmLite;

namespace webNews.Domain.Repositories
{
    public class Repository<T> : IRepository<T>
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetLogger(typeof(T).Name);

        public Repository(IWebNewsDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        #region Security_Function WORK ASYNC AWAIT WITH DATABASE

        public async Task<T> GetByIdAsync(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    return await db.SingleByIdAsync<T>(id);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return default(T);
            }
        }
        public T GetById(decimal id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    return db.SingleById<T>(id);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return default(T);
            }
        }
       
        public async Task<List<T>> GetAllAsync()
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    return await db.SelectAsync<T>();
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return null;
            }
        }

        public async Task<long> UpdateAsync(T model)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    return await db.UpdateAsync<T>(model);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return -1;
            }
        }

        public async Task<long> CreateAsync(T model)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    return await db.InsertAsync<T>(model,true);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return -1;
            }
        }
        public async Task<bool> CreateAsync(List<T> model)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                     await db.InsertAllAsync(model);
                    return true;
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return false;
            }
        }

        public async Task<int> DeleteAsync(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<T>();

                    return await db.DeleteByIdAsync<T>(id);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return 0;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="query">VD: db.From|Store| </param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<PagingObject<T>> PagingAsync(SqlExpression<T> query, int pageIndex = -1, int pageSize = -1)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    //Get total items
                    var total = (int) db.Count(query);
                    if (pageIndex != -1 && pageSize != -1)
                    {
                        query.Skip(pageIndex * pageSize).Take(pageSize);
                    }
                    var data = await db.SelectAsync<T>(query);
                    //Get items by current page
                    return new PagingObject<T>
                    {
                        DataList = data,
                        Total = total
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return null;
            }
        }

        #endregion Security_Function WORK ASYNC AWAIT WITH DATABASE

        #region WORK WITH DATABASE

        public T GetById(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    return db.SingleById<T>(id);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return default(T);
            }
        }

        public List<T> GetAll()
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    return db.Select<T>();
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return null;
            }
        }

        public long Update(T model)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    return db.Update<T>(model);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return -1;
            }
        }

        public long Create(T model)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    return db.Insert<T>(model,true);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return -1;
            }
        }
        public bool Create(List<T> model)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                     db.InsertAll(model);
                    return true;
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return false;
            }
        }

        public int Delete(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    return db.DeleteById<T>(id);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return -1;
            }
        }

        public PagingObject<T> Paging(SqlExpression<T> query, int pageIndex = -1, int pageSize = -1)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    //Get total items
                    var total = (int)db.Count(query);
                    if (pageIndex != -1 && pageSize != -1)
                    {
                        query.Skip(pageIndex * pageSize).Take(pageSize);
                    }
                    var data = db.Select<T>(query);
                    //Get items by current page
                    return new PagingObject<T>
                    {
                        DataList = data,
                        Total = total
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return null;
            }
        }


        #endregion
    }
}

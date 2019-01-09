using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using webNews.Domain.Repositories;
using webNews.Models;
using ServiceStack.OrmLite;

namespace webNews.Domain.Services
{
    public class Service<T> : IService<T>
    {
        public readonly IDbConnection db = null;
        private readonly IRepository<T> _repository;

        public Service(IRepository<T> repository)
        {
            _repository = repository;
        }

        #region WORK WITH DATABASE ASYNC AWAIT

        public async Task<T> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<long> UpdateAsync(T model)
        {
            return await _repository.UpdateAsync(model);
        }

        public async Task<long> CreateAsync(T model)
        {
            return await _repository.CreateAsync(model);
        }
        public async Task<bool> CreateAsync(List<T> model)
        {
            return await _repository.CreateAsync(model);
        }
        public async Task<int> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<PagingObject<T>> PagingAsync(SqlExpression<T> query, int pageIndex, int pageSize)
        {
            return await _repository.PagingAsync(query, pageIndex, pageSize);
        }

        #endregion

        #region WORK WITH DATABASE

        public T GetById(int id)
        {
            return _repository.GetById(id);
        }

        public List<T> GetAll()
        {
            return _repository.GetAll();
        }

        public long Update(T model)
        {
            return _repository.Update(model);
        }

        public long Create(T model)
        {
            return _repository.Create(model);
        }
        public bool Create(List<T> model)
        {
            return _repository.Create(model);
        }

        public int Delete(int id)
        {
            return _repository.Delete(id);
        }

        public PagingObject<T> Paging(SqlExpression<T> query, int pageIndex, int pageSize)
        {
            return _repository.Paging(query, pageIndex, pageSize);
        }

        #endregion
    }
}

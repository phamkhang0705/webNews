using System.Collections.Generic;
using System.Threading.Tasks;
using webNews.Models;
using ServiceStack.OrmLite;

namespace webNews.Domain.Services
{
    public interface IService<T>
    {
        Task<T> GetByIdAsync(int id);
        Task<List<T>> GetAllAsync();
        Task<long> UpdateAsync(T model);
        Task<long> CreateAsync(T model);
        Task<bool> CreateAsync(List<T> model);
        Task<int> DeleteAsync(int id);
        Task<PagingObject<T>> PagingAsync(SqlExpression<T> query, int pageIndex, int pageSize);

        T GetById(int id);
        List<T> GetAll();
        long Update(T model);
        long Create(T model);
        bool Create(List<T> model);
        int Delete(int id);
        PagingObject<T> Paging(SqlExpression<T> query, int pageIndex, int pageSize);
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using webNews.Models;
using ServiceStack.OrmLite;

namespace webNews.Domain.Repositories
{
    public interface IRepository<T>
    {
        Task<T> GetByIdAsync(int id);
        Task<List<T>> GetAllAsync();
        Task<long> UpdateAsync(T model);
        Task<long> CreateAsync(T model);
        Task<bool> CreateAsync(List<T> model);
        Task<int> DeleteAsync(int id);
        Task<PagingObject<T>> PagingAsync(SqlExpression<T> query, int pageIndex = -1, int pageSize = -1);

        T GetById(int id);
        T GetById(decimal id);
        List<T> GetAll();
        long Update(T model);
        long Create(T model);
        bool Create(List<T> model);
        int Delete(int id);
        PagingObject<T> Paging(SqlExpression<T> query, int pageIndex = -1, int pageSize = -1);
    }
}

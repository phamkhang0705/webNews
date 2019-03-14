using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.PriceManagement
{
    public interface IPriceRepository : IRepository<Price>
    {
        bool CreatePrice(Price Price);

        bool UpdatePrice(Price Price);

        bool Delete(int id);
    }
}
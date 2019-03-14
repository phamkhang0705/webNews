using webNews.Domain.Entities;
using webNews.Models;

namespace webNews.Domain.Services.PriceManagement
{
    public interface IPriceManagementService : IService<Price>
    {
        

        CoreMessageResponse CreatePrice(Price model);

        CoreMessageResponse UpdatePrice(Price model);

        bool Delete(int id);
    }
}
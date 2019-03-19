using webNews.Domain.Entities;
using webNews.Models;

namespace webNews.Domain.Services.PriceManagement
{
    public interface IPriceManagementService : IService<ProductPrice>
    {
        CoreMessageResponse CreatePrice(ProductPrice model);

        CoreMessageResponse UpdatePrice(ProductPrice model);

        bool Delete(int id);
    }
}
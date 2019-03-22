using System.Collections.Generic;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.ProductPriceManagement
{
    public interface IProductPriceRepository : IRepository<ProductPrice>
    {
        bool CreatePrice(ProductPrice Price);

        bool UpdatePrice(ProductPrice Price);

        bool Delete(int id);

        List<Vw_CategoryPrice> GetCategoryPrices(int cateId);
    }
}
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ProductManagement;

namespace webNews.Domain.Repositories.ProductManagement
{
    public interface IProductManagementRepository : IRepository<Product>
    {
        PagingObject<Vw_Product> GetList(SearchProductModel filter, int pageIndex, int pageSize);

        bool CheckExist(string code);

        bool CreateProduct(Product product, List<string> files);

        bool UpdateProduct(Product product, List<string> files, List<FileAttach> listFiles);

        bool Delete(int id);

        Vw_Product GetProductById(int id);
        List<Vw_Product> GetProductByCateId(int id);

        Vw_Product GetByCode(string code);

        List<Vw_Product> GetByName(string name);
        List<Vw_Product_Rental> GetProductRentals(string name, string type);

        IEnumerable<Vw_Product> GetProducts(SearchProductModelFE search);
    }
}
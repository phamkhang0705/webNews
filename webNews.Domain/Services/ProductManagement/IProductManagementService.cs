using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ProductManagement;

namespace webNews.Domain.Services.ProductManagement
{
    public interface IProductManagementService : IService<Product>
    {
        PagingObject<Vw_Product> GetList(SearchProductModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);

        CoreMessageResponse CreateProduct(Product product, List<string> files);

        CoreMessageResponse UpdateProduct(Product product, List<string> files,List<FileAttach> listFiles);

        bool Delete(int id);

        Vw_Product GetProductById(int id);

        Vw_Product GetByCode(string code);
    }
}
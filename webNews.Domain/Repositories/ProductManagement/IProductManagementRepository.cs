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

        Vw_Product GetByCode(string code);

        //        List<GroupProduct> GetGroupCategories(int cateId);
    }
}
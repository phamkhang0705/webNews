using NLog;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.ProductManagement;
using webNews.Models;
using webNews.Models.ProductManagement;


namespace webNews.Domain.Services.ProductManagement
{
    public class ProductManagementService : Service<Product>, IProductManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IProductManagementRepository _productRepository;

        public ProductManagementService(IProductManagementRepository productRepository, IRepository<Product> repository) : base(repository)
        {
            _productRepository = productRepository;
        }

        public PagingObject<Vw_Product> GetList(SearchProductModel filter, int pageIndex, int pageSize)
        {
            var offset = 0;
            if (pageIndex >= pageSize)
            {
                offset = (pageIndex / pageSize);
            }
            return _productRepository.GetList(filter, offset, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _productRepository.CheckExist(userName);
        }

        public CoreMessageResponse CreateProduct(Product product, List<string> files)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var check = _productRepository.GetByCode(product.ProductCode);

            if (check != null)
            {
                response.ResponseMessage = "Mã sản phẩm đã tồn tại!";
                return response;
            }

            var cate = new Product()
            {
                ProductName = product.ProductName,
                ProductCode = product.ProductCode,
                CategoryId = product.CategoryId,
                Solution = product.Solution,
                Quantity = product.Quantity,
                Status = product.Status,
                Description = product.Description,
                CreatedBy = product.CreatedBy,
                CreatedDate = DateTime.Now
            };

            var isInsert = _productRepository.CreateProduct(cate,files);

            if (isInsert)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Thêm sản phẩm thành công";
            }
            else
            {
                response.ResponseMessage = "Thêm sản phẩm thất bại";
            }

            return response;
        }

        public CoreMessageResponse UpdateProduct(Product product, List<string> files, List<FileAttach> listFiles)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var pro = _productRepository.GetById(product.Id);

            if (pro == null)
            {
                response.ResponseMessage = "sản phẩm không tồn tại!";
                return response;
            }

            pro.UpdatedDate = DateTime.Now;
            pro.UpdatedBy = pro.UpdatedBy;
            
            var update = _productRepository.UpdateProduct(pro, files, listFiles);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật sản phẩm thành công";
            }
            return response;
        }

        public bool Delete(int id)
        {
            return _productRepository.Delete(id);
        }

        public Vw_Product GetProductById(int id)
        {
            return _productRepository.GetProductById(id);
        }

        public Vw_Product GetByCode(string code)
        {
            return _productRepository.GetByCode(code);
        }

        public List<Vw_Product> GetByName(string name)
        {
            return _productRepository.GetByName(name);
        }

        public List<Vw_Product_Rental> GetProductRentals(string name, string type)
        {
            return _productRepository.GetProductRentals(name,type);
        }

        public IEnumerable<Vw_Product> GetProducts(SearchProductModelFE search)
        {
            return _productRepository.GetProducts(search);
        }
    }
}
using NLog;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.ProductPriceManagement;
using webNews.Models;

namespace webNews.Domain.Services.PriceManagement
{
    public class PriceManagementService : Service<ProductPrice>, IPriceManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IProductPriceRepository _priceRepository;

        public PriceManagementService(IProductPriceRepository priceRepository, IRepository<ProductPrice> repository) : base(repository)
        {
            _priceRepository = priceRepository;
        }

        public CoreMessageResponse CreatePrice(ProductPrice model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var isInsert = _priceRepository.Create(model);

            if (isInsert > 0)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Thêm giá thành công";
            }
            else
            {
                response.ResponseMessage = "Thêm giá thất bại";
            }

            return response;
        }

        public CoreMessageResponse UpdatePrice(ProductPrice model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var price = _priceRepository.GetById(model.Id);

            if (price == null)
            {
                response.ResponseMessage = "Giá không tồn tại!";
                return response;
            }

            price.Price = model.Price;

            var update = _priceRepository.UpdatePrice(price);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật giá thành công";
            }
            return response;
        }

        public bool Delete(int id)
        {
            return _priceRepository.Delete(id);
        }

        public ProductPrice GetProductById(int id)
        {
            return _priceRepository.GetById(id);
        }
    }
}
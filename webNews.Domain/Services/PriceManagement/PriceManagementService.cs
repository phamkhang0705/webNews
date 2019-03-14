using NLog;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.PriceManagement;
using webNews.Models;

namespace webNews.Domain.Services.PriceManagement
{
    public class PriceManagementService : Service<Price>, IPriceManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IUserRepository _userRepository;
        private readonly ISystemRepository _systemRepository;
        private readonly IPriceRepository _PriceRepository;

        public PriceManagementService(ISystemRepository systemRepository, IPriceRepository userManageRepository, IUserRepository userRepository, IRepository<Price> repository) : base(repository)
        {
            _PriceRepository = userManageRepository;
            _systemRepository = systemRepository;
            _userRepository = userRepository;
        }

        public CoreMessageResponse CreatePrice(Price model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var isInsert = _PriceRepository.Create(model);

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

        public CoreMessageResponse UpdatePrice(Price model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var price = _PriceRepository.GetById(model.Id);

            if (price == null)
            {
                response.ResponseMessage = "Giá không tồn tại!";
                return response;
            }

            price._Price = model._Price;

            var update = _PriceRepository.UpdatePrice(price);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật giá thành công";
            }
            return response;
        }

        public bool Delete(int id)
        {
            return _PriceRepository.Delete(id);
        }

        public Price GetUserById(int id)
        {
            return _PriceRepository.GetById(id);
        }
    }
}
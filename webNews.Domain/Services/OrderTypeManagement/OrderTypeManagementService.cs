using NLog;
using System;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.OrderTypeManagement;
using webNews.Models;
using webNews.Models.OrderTypeManagement;

namespace webNews.Domain.Services.OrderTypeManagement
{
    public class OrderTypeManagementService : Service<OrderType>, IOrderTypeManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IUserRepository _userRepository;
        private readonly ISystemRepository _systemRepository;
        private readonly IOrderTypeRepository _OrderTypeRepository;

        public OrderTypeManagementService(ISystemRepository systemRepository, IOrderTypeRepository userManageRepository, IUserRepository userRepository, IRepository<OrderType> repository) : base(repository)
        {
            _OrderTypeRepository = userManageRepository;
            _systemRepository = systemRepository;
            _userRepository = userRepository;
        }

        public PagingObject<OrderType> GetList(SearchOrderTypeModel filter, int pageIndex, int pageSize)
        {
            return _OrderTypeRepository.GetList(filter, pageIndex, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _OrderTypeRepository.CheckExist(userName);
        }

        public CoreMessageResponse CreateOrderType(OrderTypeModel model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var check = _OrderTypeRepository.GetByCode(model.Code);

            if (check != null)
            {
                response.ResponseMessage = "Mã loại đơn hàng đã tồn tại!";
                return response;
            }

            var user = new OrderType()
            {
                Name = model.Name,
                Code = model.Code,
                Status = model.Status
            };
            var isInsert = _OrderTypeRepository.Create(user);

            if (isInsert > 0)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Thêm loại đơn hàng thành công";
            }
            else
            {
                response.ResponseMessage = "Thêm loại đơn hàng thất bại";
            }

            return response;
        }

        public CoreMessageResponse UpdateOrderType(OrderTypeModel model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var OrderType = _OrderTypeRepository.GetById(model.Id);

            if (OrderType == null)
            {
                response.ResponseMessage = "Loại đơn hàng không tồn tại!";
                return response;
            }
            
            OrderType.Name = model.Name;
            OrderType.Status = model.Status;

            var update = _OrderTypeRepository.UpdateOrderType(OrderType);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật loại đơn hàng thành công";
            }
            return response;
        }

        public bool Delete(int id)
        {
            return _OrderTypeRepository.Delete(id);
        }

        public OrderType GetUserById(int id)
        {
            return _OrderTypeRepository.GetById(id);
        }

        public OrderType GetByCode(string code)
        {
            return _OrderTypeRepository.GetByCode(code);
        }
    }
}
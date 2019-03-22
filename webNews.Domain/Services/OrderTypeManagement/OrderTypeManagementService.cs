using NLog;
using System;
using System.Collections.Generic;
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
        private readonly IOrderTypeRepository _orderTypeRepository;

        public OrderTypeManagementService(ISystemRepository systemRepository, IOrderTypeRepository userManageRepository, IUserRepository userRepository, IRepository<OrderType> repository) : base(repository)
        {
            _orderTypeRepository = userManageRepository;
            _systemRepository = systemRepository;
            _userRepository = userRepository;
        }

        public PagingObject<OrderType> GetList(SearchOrderTypeModel filter, int pageIndex, int pageSize)
        {
            return _orderTypeRepository.GetList(filter, pageIndex, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _orderTypeRepository.CheckExist(userName);
        }

        public CoreMessageResponse CreateOrderType(OrderTypeModel model)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var check = _orderTypeRepository.GetByCode(model.Code);

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
            var isInsert = _orderTypeRepository.Create(user);

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
            var OrderType = _orderTypeRepository.GetById(model.Id);

            if (OrderType == null)
            {
                response.ResponseMessage = "Loại đơn hàng không tồn tại!";
                return response;
            }
            
            OrderType.Name = model.Name;
            OrderType.Status = model.Status;

            var update = _orderTypeRepository.UpdateOrderType(OrderType);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật loại đơn hàng thành công";
            }
            return response;
        }

        public bool Delete(int id)
        {
            return _orderTypeRepository.Delete(id);
        }

        public OrderType GetUserById(int id)
        {
            return _orderTypeRepository.GetById(id);
        }

        public OrderType GetByCode(string code)
        {
            return _orderTypeRepository.GetByCode(code);
        }

        public List<OrderType> GetAllOrderTypes()
        {
            return _orderTypeRepository.GetAllOrderTypes();
        }
    }
}
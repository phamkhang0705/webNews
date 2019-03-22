using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.OrderTypeManagement;

namespace webNews.Domain.Services.OrderTypeManagement
{
    public interface IOrderTypeManagementService : IService<OrderType>
    {
        PagingObject<OrderType> GetList(SearchOrderTypeModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);

        CoreMessageResponse CreateOrderType(OrderTypeModel model);

        CoreMessageResponse UpdateOrderType(OrderTypeModel model);

        bool Delete(int id);

        OrderType GetUserById(int id);

        OrderType GetByCode(string code);
        List<OrderType> GetAllOrderTypes();
    }
}
﻿using webNews.Models;
using webNews.Models.OrderTypeManagement;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.OrderTypeManagement
{
    public interface IOrderTypeRepository : IRepository<OrderType>
    {
        PagingObject<OrderType> GetList(SearchOrderTypeModel filter, int pageIndex, int pageSize);

        bool CheckExist(string code);

        bool CreateOrderType(OrderType orderType);

        bool UpdateOrderType(OrderType orderType);

        bool Delete(int id);

        OrderType GetById(int id);

        OrderType GetByCode(string code);
    }
}
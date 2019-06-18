using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CustomerManagement;

namespace webNews.Domain.Repositories.CustomerManagement
{
    public interface ICustomerManagementRepository : IRepository<Customer>
    {
        PagingObject<Vw_Customer> GetList(SearchCustomerModel filter, int pageIndex, int pageSize);

        bool CheckExist(string code);

        bool CreateCustomer(Customer customer, CustomerDetail customerDetail);

        bool UpdateCustomer(Customer customer, CustomerDetail customerDetail);

        bool Delete(int id);

        Vw_Customer GetCustomerById(int id);

        Vw_Customer GetByCode(string code);

        List<Vw_Customer> GetByName(string name, int customerType = 1);

        CustomerDetail GetCustomerDetail(int customerId);
    }
}
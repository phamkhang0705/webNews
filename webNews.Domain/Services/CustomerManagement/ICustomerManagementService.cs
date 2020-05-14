using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CustomerManagement;

namespace webNews.Domain.Services.CustomerManagement
{
    public interface ICustomerManagementService : IService<Customer>
    {
        PagingObject<Vw_Customer> GetList(SearchCustomerModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);

        CoreMessageResponse CreateCustomer(Vw_Customer customer);

        CoreMessageResponse UpdateCustomer(Vw_Customer customer);

        bool Delete(int id);

        Vw_Customer GetCustomerById(int id);

        Vw_Customer GetByCode(string code);
        Vw_Customer GetByEmail(string email);
        Vw_Customer GetByPhone(string phone);
        List<Vw_Customer> GetByName(string name, int customerType = 1);

        Vw_Customer GetCompanyInfo(int type = 3);
    }
}
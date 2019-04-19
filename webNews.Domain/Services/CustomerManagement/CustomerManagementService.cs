using NLog;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.CustomerManagement;
using webNews.Models;
using webNews.Models.Common;
using webNews.Models.CustomerManagement;


namespace webNews.Domain.Services.CustomerManagement
{
    public class CustomerManagementService : Service<Customer>, ICustomerManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly ICustomerManagementRepository _customerRepository;
        private readonly ISystemRepository _systemRepository;

        public CustomerManagementService(ICustomerManagementRepository customerRepository,ISystemRepository systemRepository, IRepository<Customer> repository) : base(repository)
        {
            _customerRepository = customerRepository;
            _systemRepository = systemRepository;
        }

        public PagingObject<Vw_Customer> GetList(SearchCustomerModel filter, int pageIndex, int pageSize)
        {
            return _customerRepository.GetList(filter, pageIndex, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _customerRepository.CheckExist(userName);
        }

        public CoreMessageResponse CreateCustomer(Vw_Customer customer)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var check = _customerRepository.GetByCode(customer.CustomerCode);

            if (check != null)
            {
                response.ResponseMessage = "Mã khách hàng đã tồn tại!";
                return response;
            }
            
            var cus = new Customer()
            {
                CustomerCode = customer.CustomerCode,
                CustomerName = customer.CustomerName,
                Status = customer.Status,
                CreatedBy = customer.CreatedBy,
                CreatedDate = DateTime.Now,
                CustomerType = (int)CustomerType.Customer
            };
            var cusDetail = new CustomerDetail()
            {
                Phone = customer.Phone,
                Facebook = customer.Facebook,
                Email = customer.Email,
                Description = customer.Description,
                ProvinceId = customer.ProvinceId,
                DistrictId = customer.DistrictId,
                WardId = customer.WardId,
                Address = customer.Address
            };
            var isInsert = _customerRepository.CreateCustomer(cus, cusDetail);

            if (isInsert)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Thêm khách hàng thành công";
            }
            else
            {
                response.ResponseMessage = "Thêm khách hàng thất bại";
            }

            return response;
        }

        public CoreMessageResponse UpdateCustomer(Vw_Customer customer)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var pro = _customerRepository.GetById(customer.Id);

            if (pro == null)
            {
                response.ResponseMessage = "Khách hàng không tồn tại!";
                return response;
            }
            var cus = new Customer()
            {
                CustomerName = customer.CustomerName,
                CustomerCode = customer.CustomerCode,
                Status = customer.Status,
                UpdatedDate = DateTime.Now,
                UpdatedBy = pro.UpdatedBy
            };
            var cusDetail = new CustomerDetail()
            {
                CustomerId = customer.Id,
                Phone = customer.Phone,
                Facebook = customer.Facebook,
                Email = customer.Email,
                Description = customer.Description,
                ProvinceId = customer.ProvinceId,
                DistrictId = customer.DistrictId,
                WardId = customer.WardId,
                Address = customer.Address
            };
            
            var update = _customerRepository.UpdateCustomer(cus,cusDetail);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật khách hàng thành công";
            }
            return response;
        }

        public bool Delete(int id)
        {
            return _customerRepository.Delete(id);
        }

        public Vw_Customer GetCustomerById(int id)
        {
            return _customerRepository.GetCustomerById(id);
        }

        public Vw_Customer GetByCode(string code)
        {
            return _customerRepository.GetByCode(code);
        }
    }
}
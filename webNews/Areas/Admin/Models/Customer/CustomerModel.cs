using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using webNews.Domain.Entities;

namespace webNews.Areas.Admin.Models.Customer
{
    public class CustomerModel
    {
        public int Id { get; set; }

        [Display(Name = "Mã Khách hàng")]
        [StringLength(20, ErrorMessage = "Mã Khách hàng tối đa 20 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập mã Khách hàng")]
        public string CustomerCode { get; set; }

        [Display(Name = "Tên Khách hàng")]
        [StringLength(200, ErrorMessage = "Tên Khách hàng tối đa 200 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập tên Khách hàng")]
        public string CustomerName { get; set; }

        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }

        [AllowHtml]
        [Display(Name = "Mô tả")]
        [StringLength(2000, ErrorMessage = "Mô tả tối đa 2000 ký tự")]
        public string Description { get; set; }

        [Display(Name = "Số điện thoại")]
        [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
        public string Phone { get; set; }

        [Display(Name = "Email")]
//        [Required(ErrorMessage = "Vui lòng nhập email")]
        public string Email { get; set; }

        [Display(Name = "Facebook")]
//        [Required(ErrorMessage = "Vui lòng nhập Facebook")]
        public string Facebook { get; set; }

        [Display(Name = "Tỉnh")]
        public string ProvinceId { get; set; }

        [Display(Name = "Quận/Huyện")]
        public string DistrictId { get; set; }

        [Display(Name = "Xã")]
        public string WardId { get; set; }

        [Display(Name = "Địa chỉ")]
        public string Address { get; set; }

        public DateTime? UpdatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public string Action { get; set; }

        public List<SelectListItem> ListStatus { get; set; }
        public List<Province> ListProvinces { get; set; }
        public List<District> ListDistricts { get; set; }
        public List<Ward> ListWards { get; set; }
    }
}
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using webNews.Domain.Entities;

namespace webNews.Model
{
    public class CheckOutModel
    {
        [Display(Name = "Tên")]
        [StringLength(200, ErrorMessage = "Tên tối đa 200 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập tên")]
        public string CustomerName { get; set; }

        [Display(Name = "Số điện thoại")]
        [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
        public string Phone { get; set; }

        [Display(Name = "Email")]
        [Required(ErrorMessage = "Vui lòng nhập email")]
        public string Email { get; set; }

        [Display(Name = "Tỉnh")]
        public string ProvinceId { get; set; }

        [Display(Name = "Quận/Huyện")]
        public string DistrictId { get; set; }

        [Display(Name = "Xã")]
        public string WardId { get; set; }

        [Display(Name = "Địa chỉ")]
        public string Address { get; set; }
        public List<Province> ListProvinces { get; set; }
        public List<District> ListDistricts { get; set; }
        public List<Ward> ListWards { get; set; }
    }
}
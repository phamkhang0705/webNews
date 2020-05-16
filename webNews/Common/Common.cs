using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using webNews.Domain.Entities;

namespace webNews.Common
{
    public class Common
    {
        public List<SelectListItem> ListStatus(bool showTitle = true)
        {
            if (showTitle)
            {
                return new List<SelectListItem>
                {
                    new SelectListItem()
                    {
                        Value = "-1",
                        Text = "Tất cả",
                        Selected = true
                    },
                    new SelectListItem()
                    {
                        Value = "1",
                        Text = "Hoạt động"
                    },
                    new SelectListItem()
                    {
                        Value = "0",
                        Text = "Ngừng hoạt động"
                    },
                };
            }
            return new List<SelectListItem>
            {
                new SelectListItem()
                {
                    Value = "1",
                    Text = "Hoạt động"
                },
                new SelectListItem()
                {
                    Value = "0",
                    Text = "Ngừng hoạt động"
                },
            };
        }

        public class CartItem
        {
            public Vw_Category Category { set; get; }
            public int Quantity { set; get; }
        }

        public class CheckOutModel
        {
            [Display(Name = "Họ tên")]
            [StringLength(200, ErrorMessage = "Họ tên tối đa 200 ký tự")]
            [Required(ErrorMessage = "Vui lòng nhập họ tên")]
            public string CustomerName { get; set; }

            [Display(Name = "Số điện thoại")]
            [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
            public string Phone { get; set; }

            [Display(Name = "Email")]
            // [Required(ErrorMessage = "Vui lòng nhập email")]
            public string Email { get; set; }

            [Display(Name = "Tỉnh")]
            public string ProvinceId { get; set; }

            [Display(Name = "Quận/Huyện")]
            public string DistrictId { get; set; }

            [Display(Name = "Xã")]
            public string WardId { get; set; }

            [Display(Name = "Địa chỉ")]
            [Required(ErrorMessage = "Vui lòng nhập địa chỉ")]
            public string Address { get; set; }
            public List<Province> ListProvinces { get; set; }
            public List<District> ListDistricts { get; set; }
            public List<Ward> ListWards { get; set; }
        }

        public static class CommonConstants
        {
            public static string USER_SESSION = "USER_SESSION";
            public static string SESSION_CREDENTIALS = "SESSION_CREDENTIALS";
            public static string CartSession = "CartSession";
            public static string QuantitySession = "QuantitySession";

            public static string CurrentCulture { set; get; }
        }
    }
}
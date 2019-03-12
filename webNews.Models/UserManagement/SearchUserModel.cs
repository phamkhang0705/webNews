using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace webNews.Models.UserManagement
{
    public class SearchUserModel
    {
        public int Role { get; set; }
        public string UserName { get; set; }
        public int Status { get; set; }
        public string Tel { get; set; }
        public string BranchCode { get; set; }
    }

    public class UserModel
    {
        public string Action { get; set; }
        public decimal UserId { get; set; }
        [Display(Name = "Tên tài khoản")]
        [Required(ErrorMessage = "Vui lòng nhập tên tài khoản")]
        [StringLength(50, ErrorMessage = "Tên tài khoản tối đa 50 ký tự")]
        public string UserName { get; set; }

        [Display(Name = "Mật khẩu")]
        [StringLength(50, ErrorMessage = "Mật khẩu tối đa 50 ký tự")]
        public string Password { get; set; }

        [Display(Name = "Loại tài khoản")]
        public short UserRole { get; set; }

        [Display(Name = "Họ tên")]
        [Required(ErrorMessage = "Vui lòng nhập họ tên")]
        [StringLength(50, ErrorMessage = "Họ tên tối đa 50 ký tự")]
        public string FullName { get; set; }

        [Display(Name = "Số điện thoại")]
        [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
        public string Tel { get; set; }

        [Display(Name = "Email")]
        [Required(ErrorMessage = "Email không được để trống")]
        public string Email { get; set; }
        public bool? IsSoftware { get; set; }
        public bool? IsWebsite { get; set; }
        public string Image { get; set; }

        [Display(Name = "Trạng thái")]
        public bool? Active { get; set; }
        public string BranchCode { get; set; }
        public string Domain { get; set; }
        public decimal? NationalId { get; set; }
        public string ProvinceCode { get; set; }
        public bool? Isfirst { get; set; }
        public string Title { get; set; }
        public string Salt { get; set; }
        public int? Status { get; set; }

        public string BranchName { get; set; }
        public string RoleName { get; set; }

        public List<SelectListModel> ListRole { get; set; }
        public List<SelectListModel> ListStatus { get; set; }

        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public int UpdatedById { get; set; }
    }
}

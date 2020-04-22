using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace webNews.Areas.Admin.Models.BizAccount
{
    public class BizAccountModel
    {
        public int Id { get; set; }

        [Display(Name = "Tài khoản có")]
        [Required(ErrorMessage = "Vui lòng chọn tài khoản có")]
        public string CreditAccount { get; set; }

        [Display(Name = "Tài khoản nợ")]
        [Required(ErrorMessage = "Vui lòng chọn tài khoản nợ")]
        public string DebtAccount { get; set; }

        [Display(Name = "Mã tài khoản")]
        [StringLength(10, ErrorMessage = "Mã tài khoản tối đa 10 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập mã tài khoản")]
        public string Code { get; set; }

        [Display(Name = "Tên tài khoản")]
        [StringLength(200, ErrorMessage = "Tên tài khoản tối đa 200 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập tên tài khoản")]
        public string Name { get; set; }

        [Display(Name = "Mô tả")]
        public string Description { get; set; }

        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }

        [Display(Name = "Tài khoản thu/chi")]
        public int? Type { get; set; }

        public string Action { get; set; }

        public List<SelectListItem> ListStatus { get; set; }
        public List<SelectListItem> Types { get; set; }
        public List<Domain.Entities.BizAccountType> ListTypes { get; set; }
    }
}
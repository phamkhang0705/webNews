using webNews.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace webNews.Areas.Admin.Models.RoleManagement
{
    public class RoleManagementModel
    {
        public decimal Id { get; set; }
        
        [Display(Name = "Tên nhóm quyền")]
        [Required(ErrorMessage = "Vui lòng nhập tên nhóm quyền")]
        [StringLength(50, ErrorMessage = "Tên nhóm tối đa 100 ký tự")]
        public string RoleName { get; set; } 
        public string Action { get; set; }

        public string Description { get; set; }
    }
}
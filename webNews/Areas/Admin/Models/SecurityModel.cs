using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using webNews.Domain;
using webNews.Domain.Entities;
using webNews.Language.Language;

namespace webNews.Areas.Admin.Models
{
    public class SecurityModel
    {
    }

    public class PermissionCreateModel
    {
        public int Id { get; set; }
        [DisplayName("Tên quyền")]
        [RegularExpression("[a-zA-Z0-9]*", ErrorMessageResourceType = typeof(Resource),
            ErrorMessageResourceName = "Validate_UserName_Invalid_Lang")]
        [Required(ErrorMessageResourceType = typeof(Resource), ErrorMessageResourceName = "Require_Message_Lang")]
        public string PermissionName { get; set; }
        [DisplayName("Mô tả")]
        public string Description { get; set; }
    }

    public class PermissionIndexModel
    {
        public PermissionCreateModel Item { get; set; }
        public string Action { get; set; }
    }

    public class RoleManagerCreateModel
    {
        public string Action { get; set; }
        public Security_Role Role { get; set; }
        public List<Security_Function> ListFunctions { get; set; }
        public List<Security_Permission> ListPermissions { get; set; }
        public List<Security_VwRoleService> ListMarked { get; set; }
    }
}
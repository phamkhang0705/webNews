using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webNews.Models.User
{
    public class UserSearchModel
    {
        public string CustomerCode { get; set; }
        public int CustomerType { get; set; }
        public int ParentCustomerId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int Status { get; set; }

        public int RoleID { get; set; }
    }
}

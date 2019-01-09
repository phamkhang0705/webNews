using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webNews.Domain.Entities
{
    public partial class MenuFE
    {
        [Reference]
        public List<MenuFE> MenuChilds { get; set; }
    }
}

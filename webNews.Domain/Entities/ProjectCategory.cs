using ServiceStack.DataAnnotations;
using System.Collections.Generic;

namespace webNews.Domain.Entities
{
    public partial class ProjectCategory
    {
        [Reference]
        public List<ProjectCategory> CategoryChilds { get; set; }
    }
}

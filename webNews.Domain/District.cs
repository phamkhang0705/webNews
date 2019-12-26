// <auto-generated />
// This file was generated by a T4 template.
// Don't change it directly as your change would get overwritten.  Instead, make changes
// to the .tt file (i.e. the T4 template) and save it to regenerate this file.

// Make sure the compiler doesn't complain about missing Xml comments
#pragma warning disable 1591

using System;

using ServiceStack.DataAnnotations;
using ServiceStack.Model;
using ServiceStack;

namespace webNews.Domain.Entities
{
	[Alias("District")]
    public partial class District : IHasId<string> 
    {
        [Alias("districtid")]
        [Required]
        public string Id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string type { get; set; }
        [Required]
        public string location { get; set; }
        [Required]
        public string provinceid { get; set; }
    }

}
#pragma warning restore 1591
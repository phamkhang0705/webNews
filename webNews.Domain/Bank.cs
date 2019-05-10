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
	[Alias("Bank")]
    public partial class Bank : IHasId<int> 
    {
        [Alias("Id")]
        [AutoIncrement]
        public int Id { get; set; }
        public string BankCode { get; set; }
        public string BankName { get; set; }
        public string BankAccount { get; set; }
        public string BankNote { get; set; }
        public int? Status { get; set; }
    }

}
#pragma warning restore 1591

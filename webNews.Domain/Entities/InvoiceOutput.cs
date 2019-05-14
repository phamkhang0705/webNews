using ServiceStack.DataAnnotations;
using System.Collections.Generic;

namespace webNews.Domain.Entities
{
    public partial class InvoiceOutput
    {
        [Reference]
        public List<InvoiceOutputDetail> InvoiceOutputDetails { get; set; }

        [Reference]
        public Payment Payment { get; set; }
    }
}
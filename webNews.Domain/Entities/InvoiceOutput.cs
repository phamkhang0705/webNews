using ServiceStack.DataAnnotations;
using System.Collections.Generic;

namespace webNews.Domain.Entities
{
    public partial class InvoiceOutport
    {
        [Reference]
        public List<InvoiceOutportDetail> InvoiceOutportDetails { get; set; }

        [Reference]
        public Payment Payment { get; set; }
    }
}
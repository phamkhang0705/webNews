using ServiceStack.DataAnnotations;
using System.Collections.Generic;

namespace webNews.Domain.Entities
{
    public partial class InvoiceImport
    {
        [Reference]
        public List<InvoiceImportDetail> InvoiceImportDetails { get; set; }

        [Reference]
        public Payment Payment { get; set; }
    }
}
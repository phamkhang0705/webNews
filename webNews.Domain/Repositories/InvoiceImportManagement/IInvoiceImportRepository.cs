using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.InvoiceImportManagement
{
    public interface IInvoiceImportRepository : IRepository<InvoiceImport>
    {
        long UpdateStatusInvoice(string invoiceCode, int status, DateTime? date, string note = null);

        List<InvoiceImport> GetInvoiceImport();

        InvoiceImport GetInvoiceByCode(string invoiceCode);

        //        Task<List<PAYMENT>> GetInvoiceImportsHistoryAsync(string invoiceCode, int? isCompleted = null);
        long UpdateInvoice(InvoiceImport model);

        long CreateInvoice(InvoiceImport model);

        long Import(InvoiceImport model);

        InvoiceImport GetInvoiceImportByCode(string invoiceCode);

        long DeleteInvoice(string invoiceCode);
    }
}
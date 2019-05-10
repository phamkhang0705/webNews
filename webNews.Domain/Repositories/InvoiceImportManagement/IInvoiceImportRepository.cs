using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;
using webNews.Models.InvoiceImportManagement;

namespace webNews.Domain.Repositories.InvoiceImportManagement
{
    public interface IInvoiceImportRepository : IRepository<InvoiceImport>
    {
        long UpdateStatusInvoice(string invoiceCode, int status, DateTime? date, string note = null);

        List<InvoiceImport> GetInvoiceImport();
        PagingObject<Vw_InvoiceImport> GetList(SearchInvoiceImport filter, int pageIndex, int pageSize);

        InvoiceImport GetInvoiceByCode(string invoiceCode);
        List<Vw_InvoiceImport_Detail> GetInvoiceDetails(int invoiceId);
        
        long UpdateInvoice(InvoiceImport model);

        long CreateInvoice(InvoiceImport model);

        long Import(InvoiceImport model);

        Vw_InvoiceImport GetInvoiceImportByCode(string invoiceCode);

        long DeleteInvoice(string invoiceCode);
    }
}
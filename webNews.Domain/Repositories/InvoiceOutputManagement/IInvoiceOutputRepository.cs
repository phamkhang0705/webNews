using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.InvoiceOutputManagement;

namespace webNews.Domain.Repositories.InvoiceOutputManagement
{
    public interface IInvoiceOutputRepository : IRepository<InvoiceOutput>
    {
        long UpdateStatusInvoice(string invoiceCode, int status, DateTime? date, string note = null);

        List<InvoiceOutput> GetInvoiceOutput();

        PagingObject<Vw_InvoiceOutput> GetList(SearchInvoiceOutput filter, int pageIndex, int pageSize);

        InvoiceOutput GetInvoiceByCode(string invoiceCode);

        List<Vw_InvoiceOutput_Detail> GetInvoiceDetails(int invoiceId);

        long UpdateInvoice(InvoiceOutput model);

        long CreateInvoice(InvoiceOutput model);

        long Import(InvoiceOutput model);

        Vw_InvoiceOutput GetInvoiceOutputByCode(string invoiceCode);

        long DeleteInvoice(string invoiceCode);
    }
}
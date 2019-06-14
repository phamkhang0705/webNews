using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.InvoiceOutportManagement;

namespace webNews.Domain.Repositories.InvoiceOutportManagement
{
    public interface IInvoiceOutportRepository : IRepository<InvoiceOutport>
    {
        long UpdateStatusInvoice(string invoiceCode, int status, DateTime? date, string note = null);

        List<InvoiceOutport> GetInvoiceOutport();

        PagingObject<Vw_InvoiceOutport> GetList(SearchInvoiceOutport filter, int pageIndex, int pageSize);

        InvoiceOutport GetInvoiceByCode(string invoiceCode);

        List<Vw_InvoiceOutport_Detail> GetInvoiceDetails(int invoiceId);

        List<Vw_InvoiceRental_Detail> GetInvoiceRentalDetails(int invoiceId);

        long UpdateInvoice(InvoiceOutport model);

        long CreateInvoice(InvoiceOutport model);

        long Import(InvoiceOutport model);

        Vw_InvoiceOutport GetInvoiceOutportByCode(string invoiceCode);

        long DeleteInvoice(string invoiceCode);

        List<Vw_InvoiceOutport> GetInvoiceOutports(int status);
    }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.InvoiceOutportManagement;

namespace webNews.Domain.Services.InvoiceOutportManagement
{
    public interface IInvoiceOutportService : IService<InvoiceOutport>
    {
        CoreMessageResponse CancelInvoice(string invoiceCode);

        CoreMessageResponse DeleteInvoice(string invoiceCode);

        CoreMessageResponse UpdateInvoice(string invoiceCode, int? status, DateTime? createDate, string note = null);

        CoreMessageResponse CustomCreate(InvoiceOutportModel model);

        bool Import(List<InvoiceOutportModel> model);

        CoreMessageResponse UpdateInvoice(InvoiceOutportModel model);

        Vw_InvoiceOutport GetInvoiceOutportByCode(string invoiceCode);

//        PagingObject<PAYMENT>> GetHistory(string invoiceCode, int pageIndex, int pageSize);

        PagingObject<Vw_InvoiceOutport> Search(SearchInvoiceOutport search, int pageIndex, int pageSize);
        List<Vw_InvoiceOutport_Detail> GetInvoiceDetails(int invoiceId);
        List<Vw_InvoiceRental_Detail> GetInvoiceRentalDetails(int invoiceId);

        List<Vw_InvoiceOutport> GetInvoiceOutports(int status);
    }
}
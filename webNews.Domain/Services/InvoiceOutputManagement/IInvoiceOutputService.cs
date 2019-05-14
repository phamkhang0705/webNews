using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.InvoiceOutputManagement;

namespace webNews.Domain.Services.InvoiceOutputManagement
{
    public interface IInvoiceOutputService : IService<InvoiceOutput>
    {
        CoreMessageResponse CancelInvoice(string invoiceCode);

        CoreMessageResponse DeleteInvoice(string invoiceCode);

        CoreMessageResponse UpdateInvoice(string invoiceCode, int? status, DateTime? createDate, string note = null);

        CoreMessageResponse CustomCreate(InvoiceOutputModel model);

        bool Import(List<InvoiceOutputModel> model);

        CoreMessageResponse UpdateInvoice(InvoiceOutputModel model);

        Vw_InvoiceOutput GetInvoiceOutputByCode(string invoiceCode);

//        PagingObject<PAYMENT>> GetHistory(string invoiceCode, int pageIndex, int pageSize);

        PagingObject<Vw_InvoiceOutput> Search(SearchInvoiceOutput search, int pageIndex, int pageSize);
        List<Vw_InvoiceOutput_Detail> GetInvoiceDetails(int invoiceId);
    }
}
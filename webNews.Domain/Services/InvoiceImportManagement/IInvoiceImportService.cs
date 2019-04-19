﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.InvoiceImportManagement;

namespace webNews.Domain.Services.InvoiceImportManagement
{
    public interface IInvoiceImportService : IService<InvoiceImport>
    {
        CoreMessageResponse CancleInvoice(string invoiceCode);

        CoreMessageResponse DeleteInvoice(string invoiceCode);

        CoreMessageResponse UpdateInvoice(string invoiceCode, int? status, DateTime? createDate, string note = null);

        CoreMessageResponse CustomCreate(InvoiceImportModel model);

        bool Import(List<InvoiceImportModel> model);

        CoreMessageResponse UpdateInvoice(InvoiceImportModel model);

        InvoiceImport GetInvoiceImportByCode(string invoiceCode);

//        PagingObject<PAYMENT>> GetHistory(string invoiceCode, int pageIndex, int pageSize);

        PagingObject<Vw_InvoiceImport> Search(SearchInvoiceImport search, int pageIndex, int pageSize);
    }
}
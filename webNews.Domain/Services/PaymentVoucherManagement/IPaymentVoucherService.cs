using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.InvoiceImportManagement;
using webNews.Models.PaymentVoucherManagement;

namespace webNews.Domain.Services.PaymentVoucherManagement
{
    public interface IPaymentVoucherService : IService<Payment>
    {
        PagingObject<Vw_PaymentVoucher> Search(SearchPaymentVoucher search, int pageIndex, int pageSize);
    }
}
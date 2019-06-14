using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.PaymentVoucherManagement;

namespace webNews.Domain.Services.PaymentVoucherManagement
{
    public interface IPaymentVoucherService : IService<Payment>
    {
        PagingObject<Vw_PaymentVoucher> Search(SearchPaymentVoucher search, int pageIndex, int pageSize);

        Vw_PaymentVoucher GetPaymentVoucher(int? id = null, string code = null);

        CoreMessageResponse Cancel(string paymentCode);

        CoreMessageResponse Approve(string paymentCode);

        CoreMessageResponse CreatePayment(Payment model);
        CoreMessageResponse UpdatePayment(Payment model);
    }
}
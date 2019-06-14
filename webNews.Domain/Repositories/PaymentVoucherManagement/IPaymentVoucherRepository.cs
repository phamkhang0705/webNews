using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.PaymentVoucherManagement;

namespace webNews.Domain.Repositories.PaymentVoucherManagement
{
    public interface IPaymentVoucherRepository : IRepository<Payment>
    {
        PagingObject<Vw_PaymentVoucher> GetList(SearchPaymentVoucher filter, int pageIndex, int pageSize);
        Vw_PaymentVoucher GetPaymentVoucher(int? id = null, string code = null);

        int Cancel(string paymentCode);

        int Approve(string paymentCode);
        int CreatePayment(Payment model);
        int UpdatePayment(Payment model);
    }
}
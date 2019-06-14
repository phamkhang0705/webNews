using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ReceiverVoucherManagement;

namespace webNews.Domain.Services.ReceiverVoucherManagement
{
    public interface IReceiverVoucherService : IService<Payment>
    {
        PagingObject<Vw_ReceiverVoucher> Search(SearchReceiverVoucher search, int pageIndex, int pageSize);

        Vw_ReceiverVoucher GetReceiverVoucher(int? id = null, string code = null);

        CoreMessageResponse Cancel(string paymentCode);

        CoreMessageResponse Approve(string paymentCode);

        CoreMessageResponse CreatePayment(Payment model);
        CoreMessageResponse UpdatePayment(Payment model);
    }
}
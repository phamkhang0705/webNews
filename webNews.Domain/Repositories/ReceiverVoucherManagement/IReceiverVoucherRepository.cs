using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ReceiverVoucherManagement;

namespace webNews.Domain.Repositories.ReceiverVoucherManagement
{
    public interface IReceiverVoucherRepository : IRepository<Payment>
    {
        PagingObject<Vw_ReceiverVoucher> GetList(SearchReceiverVoucher filter, int pageIndex, int pageSize);

        Vw_ReceiverVoucher GetReceiverVoucher(int? id = null, string code = null);

        int Cancel(string paymentCode);

        int Approve(string paymentCode);

        int CreatePayment(Payment model);

        int UpdatePayment(Payment model);
    }
}
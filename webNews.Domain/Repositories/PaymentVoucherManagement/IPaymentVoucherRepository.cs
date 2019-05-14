using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.PaymentVoucherManagement;

namespace webNews.Domain.Repositories.PaymentVoucherManagement
{
    public interface IPaymentVoucherRepository : IRepository<Payment>
    {
        PagingObject<Vw_PaymentVoucher> GetList(SearchPaymentVoucher filter, int pageIndex, int pageSize);
    }
}
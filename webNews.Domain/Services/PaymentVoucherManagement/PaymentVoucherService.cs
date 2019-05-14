using NLog;
using ServiceStack.OrmLite;
using System;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.PaymentVoucherManagement;
using webNews.Models;
using webNews.Models.PaymentVoucherManagement;

namespace webNews.Domain.Services.PaymentVoucherManagement
{
    public class PaymentVoucherService : Service<Payment>, IPaymentVoucherService
    {
        private readonly ISystemRepository _systemRepository;
        private readonly IPaymentVoucherRepository _importRepository;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public PaymentVoucherService(IPaymentVoucherRepository importRepository, ISystemRepository systemRepository, IRepository<Payment> repository) : base(repository)
        {
            _importRepository = importRepository;
            _systemRepository = systemRepository;
        }

        public PagingObject<Vw_PaymentVoucher> Search(SearchPaymentVoucher search, int pageIndex, int pageSize)
        {
            var query = db.From<Vw_PaymentVoucher>();

            if (!string.IsNullOrEmpty(search.Code)) query.Where(x => x.PaymentCode == search.Code);
            if (search.Status != null && search.Status != -1) query.Where(x => x.Status == search.Status);
            if (DateTime.MinValue != search.FromDate && DateTime.MinValue != search.ToDate)
            {
                query.Where(x => x.CreatedDate < search.ToDate && x.CreatedDate >= search.FromDate);
            }
            query.OrderByDescending(x => x.CreatedDate);
            return _systemRepository.Paging(query, pageIndex, pageSize);
        }
    }
}
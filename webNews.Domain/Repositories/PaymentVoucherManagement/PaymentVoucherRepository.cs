using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.PaymentVoucherManagement;

namespace webNews.Domain.Repositories.PaymentVoucherManagement
{
    public class PaymentVoucherRepository : Repository<Payment>, IPaymentVoucherRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly ISystemRepository _systemRepository;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public PaymentVoucherRepository(IWebNewsDbConnectionFactory connectionFactory, ISystemRepository systemRepository) : base(connectionFactory)
        {
            _systemRepository = systemRepository;
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Vw_PaymentVoucher> GetList(SearchPaymentVoucher filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_PaymentVoucher>();

                    if (!string.IsNullOrEmpty(filter.Code))
                    {
                        query.Where(_ => _.PaymentCode == filter.Code);
                    }

                    //More filter
                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<Vw_PaymentVoucher>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<Vw_PaymentVoucher>
                {
                    Total = 0,
                    DataList = new List<Vw_PaymentVoucher>()
                };
            }
        }
    }
}
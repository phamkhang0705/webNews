using NLog;
using ServiceStack.OrmLite;
using System;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.ReceiverVoucherManagement;
using webNews.Models;
using webNews.Models.ReceiverVoucherManagement;

namespace webNews.Domain.Services.ReceiverVoucherManagement
{
    public class ReceiverVoucherService : Service<Payment>, IReceiverVoucherService
    {
        private readonly ISystemRepository _systemRepository;
        private readonly IReceiverVoucherRepository _paymentRepository;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public ReceiverVoucherService(IReceiverVoucherRepository importRepository, ISystemRepository systemRepository, IRepository<Payment> repository) : base(repository)
        {
            _paymentRepository = importRepository;
            _systemRepository = systemRepository;
        }

        public PagingObject<Vw_ReceiverVoucher> Search(SearchReceiverVoucher search, int pageIndex, int pageSize)
        {
            var query = db.From<Vw_ReceiverVoucher>();

            if (!string.IsNullOrEmpty(search.Code)) query.Where(x => x.PaymentCode == search.Code);
            query.Where(x => x.PaymentType == search.PaymentType);
            if (search.Status != null && search.Status != -1) query.Where(x => x.Status == search.Status);
            if (DateTime.MinValue != search.FromDate && DateTime.MinValue != search.ToDate)
            {
                query.Where(x => x.CreatedDate < search.ToDate && x.CreatedDate >= search.FromDate);
            }
            query.OrderByDescending(x => x.CreatedDate);
            return _systemRepository.Paging(query, pageIndex, pageSize);
        }

        public Vw_ReceiverVoucher GetReceiverVoucher(int? id = null, string code = null)
        {
            return _paymentRepository.GetReceiverVoucher(id, code);
        }

        public CoreMessageResponse Cancel(string paymentCode)
        {
            try
            {
                var isCancel = _paymentRepository.Cancel(paymentCode);
                if (isCancel == 1)
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "01",
                        ResponseMessage = "Hủy phiếu chi thành công"
                    };
                }
                else
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Hủy phiếu chi thất bại"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Cancel invoice error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Cập nhật phiếu nhập thất bại"
                };
            }
        }

        public CoreMessageResponse Approve(string paymentCode)
        {
            try
            {
                var check = _paymentRepository.Approve(paymentCode);
                if (check == 1)
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "01",
                        ResponseMessage = "Duyệt phiếu chi thành công"
                    };
                }else if (check == 3)
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Phiếu nhập đã đc thanh toán đủ"
                    };
                }
                else
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Duyệt phiếu chi thất bại"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Cancel invoice error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Cập nhật phiếu nhập thất bại"
                };
            }
        }

        public CoreMessageResponse CreatePayment(Payment model)
        {
            try
            {
                var rs = _paymentRepository.CreatePayment(model);
                if (rs == 1)
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "01",
                        ResponseMessage = "Thêm mới phiếu chi thành công"
                    };
                }
                else
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Thêm mới phiếu chi thất bại"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Cancel invoice error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Thêm mới phiếu chi thất bại"
                };
            }
        }

        public CoreMessageResponse UpdatePayment(Payment model)
        {
            try
            {
                var rs = _paymentRepository.UpdatePayment(model);
                if (rs == 1)
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "01",
                        ResponseMessage = "Cập nhật phiếu chi thành công"
                    };
                }
                else
                {
                    return new CoreMessageResponse
                    {
                        ResponseCode = "00",
                        ResponseMessage = "Cập nhật phiếu chi thất bại"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Cancel invoice error: " + ex.Message);
                return new CoreMessageResponse
                {
                    ResponseCode = "00",
                    ResponseMessage = "Thêm mới phiếu chi thất bại"
                };
            }
        }
    }
}
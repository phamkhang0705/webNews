namespace webNews.Models.Common
{
    public class Constant
    {
        public static class SessionKey
        {
            public static string UserName = "UserName";
            public static string UserId = "UserId";
            public static string UserNameFullName = "UserNameFullName";
            public static string UserRole = "UserRole";
        }

        public static class LengthCode
        {
            public static int LengthCountChar = 5;
        }

        public static class LogoTemplate
        {
            public static string logo = "/Images/Logo/logo.png";
        }
    }

    public enum PaymentActive
    {
        Waiting = 0,
        Approve = 1,
        Cancel = 2
    }

    public enum ObjectType
    {
        Customer = 1,
        Supplier = 2,
        InvoiceImport = 3,
        InvoiceOutport = 4,
        InvoiceRental = 5,
        ReceiverVoucher = 6,
        PaymentVoucher = 7,
        Category = 8,
    }

    public enum PersonType
    {
        Provider = 2,
        Customer = 1,
    }

    public enum InvoiceStatus
    {
        Cancel = 2,
        Active = 1,
        Draff = 0,
        Paying = 3,
        Complete = 4
    }

    public enum InvoiceOutportStatus : int
    {
        Draff = 0,
        Approved = 1,// = WaitingDelivery
        Cancel = 2,
        Rentaling = 3,
        Collectioned = 4,
        Completed = 5
    }

    public class PrefixType
    {
        public const string Customer = "KH";
        public const string Supplier = "NCC";
        public const string InvoiceImport = "PN";
        public const string InvoiceOutport = "PX";
        public const string InvoiceRental = "PTHUE";
        public const string ReceiverVoucher = "PTHU";
        public const string PaymentVoucher = "PCHI";
        public const string Category = "CATE";
    }


    public enum CustomerType
    {
        Customer = 1,
        Supplier = 2,
        Company = 3,
        User = 4
    }

    public enum ReceiverType : int
    {
        ProductMoney = 1,//phiếu thu tiền hàng
        Deposit = 2,//phiếu thu tiền cọc
        Transport = 3,//phiếu tiền vận chuyển
        Other = 4//phiếu thu phát sinh khác
    }

    public enum TypePayment : int
    {
        Deposit = 1,//phiếu chi tiền cọc
        Other = 2//phiếu chi phát sinh khác
    }

    public enum BizAccountType : int
    {
        Receive = 1,//Phiếu thu
        Payment = 2//Phiếu chi
    }
}
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
        Reject = 0,
        Active = 1,
        Cancel = 2,
        Waiting = 3,
        ApproveLv1 = 4,
        ApproveLv2 = 5
    }

    public enum ObjectType
    {
        Customer = 1,
        Supplier = 2,
        InvoiceImport = 3,
        InvoiceOutport = 4,
        InvoiceRental = 5,
        ReceiveVoucher=6,
        PaymentVoucher=7
    }

    public enum PersonType
    {
        Provider=1
    }

    public enum InvoiceStatus
    {
        Canceld = 2,
        Active = 1,
        Draff = 0
    }

    public class PrefixType
    {
        public const string Customer = "KH";
        public const string Supplier = "NCC";
        public const string InvoiceImport = "PN";
        public const string InvoiceOuport = "PX";
        public const string InvoiceRental = "PTHUE";
        public const string ReceiveVoucher = "PTHU";
        public const string PaymentVoucher = "PCHI";
    }


    public enum CustomerType
    {
        Customer=1,
        Supplier=2,
        User=3
    }
}
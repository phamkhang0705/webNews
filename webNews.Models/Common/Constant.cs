using System.ComponentModel;

namespace webNews.Models.Common
{
    public class Constant
    {
        public static class SessionKey
        {
            public static string Domain = "Domain";
            public static string BranchCode = "BranchCode";
            public static string UserName = "UserName";
            public static string UserId = "UserId";
            public static string UserNameFullName = "UserNameFullName";
            public static string UserRole = "UserRole";
            public static string StoreId = "StoreId";
            public static string ListBranch = "ListBranch";
            public static string BranchDefault = "BranchDefault";
            public static string ListStore = "ListStore";
            public static string StoreDefault = "StoreDefault";
        }

        public static class LengthCode
        {
            public static int LengthCountChar = 10;
        }
        public static class LogoTemplate
        {
            public static string logo = "/Images/Logo/logo.png";
        }
    }

    /// <summary>
    /// Role ID
    /// </summary>
    public enum RolePermission
    {
        Admin = 1,
        AccountantLeader = 8,
        FinancialDirector = 9,
        Treasurer = 10,
        Accountant=2
    }

    public enum PaymentActive
    {
        Reject = 0,
        Active = 1,
        Cancle = 2,
        Waiting = 3,
        ApproveLv1 = 4,
        ApproveLv2 = 5
    }

    public enum BranchType
    {
        School = 0,
        Branch = 1,
        Department = 2
    }

    public enum ObjectType
    {
        Group=1,
        Category=2,
        User=3
    }

    public class PaymentType
    {
        public const string Receipt = "RECEIPT";
        public const string Payment = "PAYMENT";
    }

    public enum CategoryType
    {
        Food = 1,
        Part = 2,
        Orther = 3
    }

    public enum PersonType : int
    {
        Customer = 1,
        Provider = 2,
        Staff = 3,
        Other = 4
    }

    public enum InvoiceStatus
    {
        Cancled = 2,
        Active = 1,
        Draff = 0
    }

    public class PrefixType
    {
        public const string Group = "GROUP";
        public const string Category = "CATEGORY";
        public const string User = "USER";

    }

    public enum RemoveProductActive
    {
        //Lưu tạm
        TempSave = 2,

        //Đang hoạt động
        Active = 1,

        //Đã hủy
        Cancel = 3
    }

    public enum InvoiceOutPortActive
    {
        //Lưu tạm
        TempSave = 0,

        //Đang hoạt động
        Active = 1,

        //Đã hủy
        Cancel = 2
    }

    public enum TransferProductActive
    {
        //Lưu tạm
        TempSave = 2,

        //Đang hoạt động
        Active = 1,

        //Đã hủy
        Cancel = 3
    }

    public enum ReportEndOfDayType
    {
        Payment = 1,
        Product = 2,
        Sale = 3
    }

    public enum ReportSaleType
    {
        Time = 1,
        Profit = 2,
        Discount = 3,
        ReturnCustom = 4,
        Staff = 5,
        Branch = 6
    }

    public enum ReportProductType
    {
        Sale = 1,
        Profit = 2,
        Remove = 3,
        IOStock = 4,
        IOStock2 = 5,
        Custom = 6,
        Provider = 7,
    }

    public enum ReportCustomerType
    {
        Sale = 1,
        Product = 2,
        Debt = 3,
        Profit = 4
    }

    public enum ReportProviderType
    {
        Input = 1,
        Product = 2,
        Debt = 3,
    }

    public enum StutentType
    {
        Potential = 0,
        Studying = 1,
        Ended = 2,
        Pending = 3
    }

    public enum AdjustAssetType : int
    {
        Down = 0,
        Up = 1,
        ReAdjust = 2,
        Liquid = 3,
        Depreciation = 4
    }

    public enum AssetSuspendActive: int
    {
        //Lưu tạm
        TempSave = 2,

        //Lưu
        Active = 1,

        //Hủy
        Cancel = 3
    }
}
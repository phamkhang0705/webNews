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
        Staff = 0,
        Student = 1,
        Branch = 2,
        Store = 3,
        InvoiceImport = 4,
        Category = 5,
        Gift = 6,
        GiftPackage = 7,
        Product = 8,
        Payment = 9,
        Receipt = 10,
        RemoveProduct = 11,
        TransferProduct = 12,
        InvoiceOutport = 13,
        ReturnProvider = 14,
        StoreCheck = 15,
        TypePayment = 16,
        TypeReceipt = 17,
        OtherPerson = 18,
        Provider = 19,
        Class = 20,
        Subject = 21,
        Course = 22,
        National = 23,
        EducationProgram = 24,
        ContractForm = 25,
        AdjustAsset = 26,
        AssetSuspend= 27,
        TransferAsset = 28,
        Tuition = 29,
        Depreciation = 30,
        LevelForeign = 31
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
        public const string Branch = "CN";
        public const string Store = "KH";
        public const string Category = "DM";
        public const string Gift = "QT";
        public const string GiftPackage = "GQT";
        public const string Product = "SP";
        public const string Payment = "PC";
        public const string InvoiceImport = "PN";
        public const string InvoiceOutport = "HD";
        public const string Student = "HV";
        public const string Staff = "NV";
        public const string RemoveProduct = "XH";
        public const string Receipt = "PT";
        public const string TransferProduct = "TP";
        public const string ReturnProvider = "TH";  //Trả hàng nhà cung cấp
        public const string StoreCheck = "KK";
        public const string TypePayment = "TP";
        public const string TypeReceipt = "TR";
        public const string OtherPerson = "OP";
        public const string Provider = "NCC";
        public const string Class = "LH";
        public const string Subject = "MH";
        public const string Course = "KH";
        public const string National = "QG";
        public const string ContractForm = "HDNV";
        public const string EducationProgram = "CTDT";
        public const string AdjustAsset = "ADJUST";
        public const string AssetSuspend = "SUSPEND";
        public const string TransferAsset = "TA";
        public const string Tuition = "HP";
        public const string Depreciation = "DEPRE";
        public const string LevelForeign = "TDNN";

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
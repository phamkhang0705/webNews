using webNews.Shared;

namespace webNews.Domain.Entities
{
    public partial class System_User
    {
        public string ToHashValue(string password)
        {
            return CryptUtils.HashSHA256(UserName + Salt + password);
        }

        public bool ComparePass(string password)
        {
            return Password == ToHashValue(password);
        }
    }
}

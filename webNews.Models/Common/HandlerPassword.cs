using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Security.Cryptography;
using System.Text;

namespace webNews.Models.Common
{
    public class HandlerPassword
    {
        public static class PasswordGenerator
        {
            public static string Generate(int length,int numberOfChar)
            {
                var numPass = Generate(length - numberOfChar, PasswordCharacters.Numbers);
                var charPass = Generate(numberOfChar, PasswordCharacters.AllLetters);
                var pass =string.Concat(numPass,charPass);
                return pass;
            }
            public static string Generate(int length, PasswordCharacters allowedCharacters = PasswordCharacters.All,   IEnumerable<char> excludeCharacters = null)
            {
                if (length <= 0)
                    throw new ArgumentOutOfRangeException("length", "Password length must be greater than zero");

                var randomBytes = new byte[length];
                var randomNumberGenerator = new RNGCryptoServiceProvider();
                randomNumberGenerator.GetBytes(randomBytes);

                string allowedCharactersString = GenerateAllowedCharactersString(allowedCharacters, excludeCharacters);
                int allowedCharactersCount = allowedCharactersString.Length;

                var characters = new char[length];
                for (int i = 0; i < length; i++)
                    characters[i] = allowedCharactersString[randomBytes[i] % allowedCharactersCount];
                return new string(characters);
            }

            public static SecureString GenerateSecure(int length, PasswordCharacters allowedCharacters = PasswordCharacters.All,
                IEnumerable<char> excludedCharacters = null)
            {
                if (length <= 0)
                    throw new ArgumentOutOfRangeException("length", "Password length must be greater than zero");

                var randomBytes = new byte[length];
                var randomNumberGenerator = new RNGCryptoServiceProvider();
                randomNumberGenerator.GetBytes(randomBytes);

                string allowedCharactersString = GenerateAllowedCharactersString(allowedCharacters, excludedCharacters);
                int allowedCharactersCount = allowedCharactersString.Length;

                var password = new SecureString();
                for (int i = 0; i < length; i++)
                    password.AppendChar(allowedCharactersString[randomBytes[i] % allowedCharactersCount]);
                password.MakeReadOnly();
                return password;
            }

            private static string GenerateAllowedCharactersString(PasswordCharacters characters, IEnumerable<char> excludeCharacters)
            {
                var allowedCharactersString = new StringBuilder();
                foreach (KeyValuePair<PasswordCharacters, string> type in AllowedPasswordCharacters)
                {
                    if ((characters & type.Key) != type.Key)
                        continue;
                    if (excludeCharacters == null)
                        allowedCharactersString.Append(type.Value);
                    else
                        allowedCharactersString.Append(type.Value.Where(c => !excludeCharacters.Contains(c)).ToArray());
                }
                return allowedCharactersString.ToString();
            }

            private static readonly Dictionary<PasswordCharacters, string> AllowedPasswordCharacters =
                new Dictionary<PasswordCharacters, string>(4) {
                { PasswordCharacters.LowercaseLetters, "abcdefghijklmnopqrstuvwxyz" },
                { PasswordCharacters.UppercaseLetters, "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
                { PasswordCharacters.Numbers, "0123456789" },
                { PasswordCharacters.Punctuations, @"~`!@#$%^&*()_-+={[}]|\:;""'<,>.?/" },
                { PasswordCharacters.Space, " " },
                {PasswordCharacters.AlphaNumeric,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"}
            };
        }

        [Flags]
        public enum PasswordCharacters
        {
            LowercaseLetters = 0x01,
            UppercaseLetters = 0x02,
            Numbers = 0x04,
            Punctuations = 0x08,
            Space = 0x10,
            AllLetters = LowercaseLetters | UppercaseLetters,
            AlphaNumeric = AllLetters | Numbers,
            All = AllLetters | Numbers | Punctuations | Space,
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace webNews.Security
{
    public class EncryptionUtil
    {
        /// <summary>
        /// thực hiện mã hóa md5 cho 1 string
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
       public static String MD5(String msg) 
       {
           // byte array representation of that string
           byte[] encodedPassword = new UTF8Encoding().GetBytes(msg);

           // need MD5 to calculate the hash
           byte[] hash = ((HashAlgorithm)CryptoConfig.CreateFromName("MD5")).ComputeHash(encodedPassword);

           // string representation (similar to UNIX format)
           string encoded = BitConverter.ToString(hash)
               // without dashes
              .Replace("-", string.Empty)
               // make lowercase
              .ToLower();
           return encoded;
       }
       /// <summary>
       /// thực hiện mã hóa md5 cho 1 string
       /// </summary>
       /// <param name="msg"></param>
       /// <returns></returns>
       public static string GetMD5Hash(string input)
       {

           using (MD5 md5Hash = System.Security.Cryptography.MD5.Create())
           {
               string hash = GetMd5Hash(md5Hash, input);

               return hash;
           }
       }

       static string GetMd5Hash(MD5 md5Hash, string input)
       {

           // Convert the input string to a byte array and compute the hash.
           byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

           // Create a new Stringbuilder to collect the bytes
           // and create a string.
           StringBuilder sBuilder = new StringBuilder();

           // Loop through each byte of the hashed data 
           // and format each one as a hexadecimal string.
           for (int i = 0; i < data.Length; i++)
           {
               sBuilder.Append(data[i].ToString("x2"));
           }

           // Return the hexadecimal string.
           return sBuilder.ToString();
       }
    }
}

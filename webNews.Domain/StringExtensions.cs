using System;
using System.Text;
using System.Text.RegularExpressions;

namespace webNews.Common
{
    public static class StringExtensions
    {
        public static string FirstUpperCase(this string value)
        {
            if (!String.IsNullOrEmpty(value))
            {
                string result = value.Substring(0, 1);
                result = result.ToUpper();

                if (value.Length > 1)
                {
                    result += value.Substring(1);
                }
                return result;
            }
            return value;
        }

        /// <summary>
        /// Returns a string that can be used in a url segment
        /// </summary>
        public static string ToUrlSegment(this string value, int maxLength)
        {
            if (String.IsNullOrWhiteSpace(value))
            {
                return null;
            }

            string segment = value.NormalizeVNString();

            //value = value.Trim();
            //var segment = value;
            //if (value.ContainsAsciiChars())
            //{
            //    segment = segment.ToLower();

            //    //Step 1: Replace anything except a-z or -
            //    segment = Regex.Replace(segment, @"[^a-z0-9\- ]+", "");
            //    //Step 2: Replace spaces with -
            //    segment = Regex.Replace(segment, @" ", "-");
            //    //Step 3: Replace multiple - with just one (in case multiple unwanted chars where replaced in step 1 or step 2)
            //    segment = Regex.Replace(segment, @"-+", "-");
            //    //Step 4: Replace starting and ending - with nothing
            //    segment = Regex.Replace(segment, @"^-+|-+$", "");
            //}
            //else
            //{
            //    //will be url encoded by browser and encoded / decoded by webserver
            //}

            if (segment.Length > maxLength)
            {
                segment = segment.Substring(0, maxLength);
            }

            return segment;
        }




        /// <summary>
        /// Chuyen 1 chuoi tieng viet co dau thanh khong dau va co gach ngang.
        /// </summary>
        /// <param name="html"></param>
        /// <returns></returns>
        public static string NormalizeVNString(this string input)
        {


            StringBuilder sb = new StringBuilder();

            char[] ca = input.Trim().ToCharArray();


            for (int i = 0; i < ca.Length; ++i)
            {
                char x = ConvertedVNChar(ca[i]);
                if (x != '@')
                    sb.Append(x);
            }

            string res = Regex.Replace(sb.ToString(), @"-+", "-").Trim('-').ToLower();



            return res;

        }



        /// <summary>
        /// Chuyen 1 chuoi tieng viet co dau thanh khong.
        /// </summary>
        /// <param name="html"></param>
        /// <returns></returns>
        public static string NormalizeVNString2(this string input)
        {


            StringBuilder sb = new StringBuilder();

            char[] ca = input.Trim().ToCharArray();


            for (int i = 0; i < ca.Length; ++i)
            {
                char x = ConvertedVNChar(ca[i], false);
                if (x != '@')
                    sb.Append(x);
            }


            return sb.ToString();

        }

        private static char ConvertedVNChar(char x, bool dashed = true)
        {
            if ((x >= 'a' && x <= 'z') || (x >= '0' && x <= '9') || (x >= 'A' && x <= 'Z'))
            {
                return x;
            }
            String s = x.ToString();

            if ("àáạảãâầấậẩẫăắằặẳẵ".Contains(s)) return 'a';
            if ("èéẹẻẽêềếệểễ".Contains(s)) return 'e';
            if ("ìíịỉĩ".Contains(s)) return 'i';
            if ("đ".Contains(s)) return 'd';
            if ("òóọỏõôồốộổỗơờớợởỡ".Contains(s)) return 'o';
            if ("ùúụủũưừứựửữ".Contains(s)) return 'u';
            if ("ỳýỵỷỹ".Contains(s)) return 'y';
            if ("ÀÁẠẢÃÂẦẤẬẨẪĂẮẰẶẲẴ".Contains(s)) return 'A';
            if ("ÈÉẸẺẼÊỀẾỆỂỄ".Contains(s)) return 'E';
            if ("ÌÍỊỈĨ".Contains(s)) return 'I';
            if ("Đ".Contains(s)) return 'D';
            if ("ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ".Contains(s)) return 'O';
            if ("ÙÚỤỦŨƯỪỨỰỬỮ".Contains(s)) return 'U';
            if ("ỲÝỴỶỸ".Contains(s)) return 'Y';
            if (dashed)
            {
                if (x == '\t' || x == ' ') return '-';
                if (@"_&*?(){}[]\|/+:'"";,.-".Contains(s)) return '-';
                return '@';
            }

            return x;

        }

        /// <summary>
        /// Determines if contains the string contains any ASCII string
        /// </summary>
        public static bool ContainsAsciiChars(this string value)
        {
            return Regex.IsMatch(value, @"[\u0000-\u007F]");
        }

        /// <summary>
        /// Returns a string that can be used in a url segment
        /// </summary>
        public static string ToUrlSegment(this string value)
        {
            var maxLength = 2000; //url length on most browsers
            return value.ToUrlSegment(maxLength);
        }

        public static string ToTitleOnTable(this string value, int length)
        {
            string temp = "";
            if (value.Length > length)
            {
                temp = value.Substring(0, length) + "...";
            }
            else
            {
                temp = value;
            }
            return temp;
        }

        public static int? ToNullableInt(this string value)
        {
            if (String.IsNullOrEmpty(value))
            {
                return (int?)null;
            }
            else
            {
                return Convert.ToInt32(value);
            }
        }
    }
}
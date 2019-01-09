using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using webNews.Security;

namespace webNews.Areas.Admin.Models.Login
{
    public class LoginModel
    {
        public string GetCaptchaImage()
        {
            #region GetRandom
            const string chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789abcdefghijklmnpqrstuvwxyz";
            var random = new Random();
            var checkCode = new string(Enumerable.Repeat(chars, 5).Select(s => s[random.Next(s.Length)]).ToArray());
            Authentication.MarkCaptchar(checkCode);
            #endregion
            var image = new Bitmap(Convert.ToInt32(Math.Ceiling((decimal)(checkCode.Length * 23))), 40);
            Graphics g = Graphics.FromImage(image);
            try
            {
                g.Clear(Color.AliceBlue);
                var font = new Font("Comic Sans MS", 20, FontStyle.Bold);
                string str = "";

                //System.Drawing.Drawing2D.LinearGradientBrush brush = new System.Drawing.Drawing2D.LinearGradientBrush(new Rectangle(0, 0, image.Width, image.Height), Color.Blue, Color.DarkRed, 1.2f, true);
                for (var i = 0; i < checkCode.Length; i++)
                {
                    str = str + checkCode.Substring(i, 1);
                }
                //g.DrawString(str, font, new SolidBrush(Color.Blue), 0, 0);
                g.DrawString(str, font, new SolidBrush(Color.Blue), 0, 0);
                g.FillRectangle(new HatchBrush(HatchStyle.BackwardDiagonal, Color.DarkGray, Color.Transparent), g.ClipBounds);
                g.FillRectangle(new HatchBrush(HatchStyle.ForwardDiagonal, Color.DarkGray, Color.Transparent), g.ClipBounds);
                g.Flush();
                var ms = new MemoryStream();
                image.Save(ms, ImageFormat.Png);
                var byteImage = ms.ToArray();
                return Convert.ToBase64String(byteImage);
            }
            finally
            {
                g.Dispose();
                image.Dispose();
            }
        }
        public string GetCaptcha()
        {
            string[] fonts = { "Arial", "Verdana", "Times New Roman", "Tahoma" };
            const int length = 7;
            const string chars = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            using (var memoryStream = new MemoryStream())
            {

                using (Bitmap bmp = new Bitmap(220, 38))
                {

                    using (Graphics g = Graphics.FromImage(bmp))
                    {
                        // Tạo nền cho ảnh dạng sóng
                        var brush = new HatchBrush(HatchStyle.DashedDownwardDiagonal, Color.Wheat, Color.Silver);
                        g.FillRegion(brush, g.Clip);
                        var strCaptcha = new StringBuilder();
                        var rand = new Random();
                        float f = 0;
                        for (var i = 0; i < length; i++)
                        {
                            string str = chars[rand.Next(chars.Length)].ToString(CultureInfo.InvariantCulture);
                            strCaptcha.Append(str);
                            var font = new Font(fonts[rand.Next(fonts.Length)], 16, FontStyle.Italic | FontStyle.Bold);
                            // Lấy kích thước của kí tự
                            var size = g.MeasureString(str, font);
                            f = f + size.Width;
                            // Vẽ kí tự đó ra ảnh tại vị trí tăng dần theo i, vị trí top ngẫu nhiên                            
                            g.DrawString(str, font,
                            Brushes.Blue, f + i * 3, rand.Next(2, 10), StringFormat.GenericDefault);
                            font.Dispose();
                        }
                        // Lưu captcha vào session
                        //Authentication.MarkCaptchar(strCaptcha.ToString());                     
                        bmp.Save(memoryStream, ImageFormat.Gif);
                        bmp.Save(memoryStream, ImageFormat.Gif);
                        var byteImage = memoryStream.ToArray();
                        return Convert.ToBase64String(byteImage);
                    }
                }
            }
        }

        public ForgotPasswordModel ForgotPassword { get; set; }
        public CaptchModel CapchaModel { get; set; }
    }
    public class ForgotPasswordModel
    {
        public string Account { get; set; }
        public string Email { get; set; }
    }



    public class CaptchModel
    {
        public string CapImage { get; set; }
        public string CapImageText { get; set; }
        public string CaptchaCodeText { get; set; }
    }
}
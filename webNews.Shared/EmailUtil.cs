using System;
using System.ComponentModel;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using NLog;

namespace webNews.Shared
{
    public class EmailUtil
    {
        private bool _mailSent;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private bool _isSending = true;

        public async Task SendMail(string message, string subject, string email, string[] files, string body)
        {
            var sender = ConfigurationManager.AppSettings["MailServerUser"];
            var password = ConfigurationManager.AppSettings["MailServerPassword"];
            try
            {
                var client = new SmtpClient
                {
                    Host = ConfigurationManager.AppSettings["MailServerAddress"],
                    Port = 25,
                    EnableSsl = false,
                    UseDefaultCredentials = false,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential(sender, password),
                    Timeout = 10000
                };
                var from = new MailAddress(sender, "System");

                var mailList = email.Split(';');

                foreach (var em in mailList)
                {
                    var to = new MailAddress(em);

                    var mm = new MailMessage(from, to)
                    {
                        BodyEncoding = Encoding.UTF8,
                        Body = body,
                        SubjectEncoding = Encoding.UTF8,
                        Subject = subject
                    };

                    if (files != null && files.Length > 0)
                    {
                        foreach(var file in files)
                        {
                            mm.Attachments.Add(new Attachment(file));
                        }
                    }
                    mm.IsBodyHtml = true;
                    mm.BodyEncoding = Encoding.UTF8;
                    mm.SubjectEncoding = Encoding.UTF8;
                    //client.SendCompleted += SendCompletedCallback;
                    _isSending = true;
                    var userState = em;
                    //client.SendMailAsync(mm);
                    await client.SendMailAsync(mm);
                    //while (_isSending)
                    //    Thread.Sleep(TimeSpan.FromSeconds(1));
                    //string answer = Console.ReadLine();
                    mm.Dispose();
                }
                _logger.Info("Main sent to: " + email);
            }
            catch (Exception e)
            {
                _logger.Info($"Could not end email {email}\n\n" + e);
                _logger.Info("Error");
            }
        }

        private void SendCompletedCallback(object sender, AsyncCompletedEventArgs e)
        {
            _isSending = false;
            // Get the unique identifier for this asynchronous operation.
            var token = (string)e.UserState;

            if (e.Cancelled)
                _logger.Info("[{0}] Send canceled.", token);
            if (e.Error != null)
                _logger.Info("[{0}] {1}", token, e.Error);
            else
                _logger.Info(token + " message sent.");
            _mailSent = true;
        }
    }
}
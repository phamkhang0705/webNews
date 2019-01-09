using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webNews.Models
{
    public class MessageResult
    {
        public enum MsgType
        {
            Susscess,
            Error
        }
        public MsgType MessageType { get; set; }
        public string Value { get; set; }
        public object Data { get; set; }
    }
    public class JsonRs
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
    }
}

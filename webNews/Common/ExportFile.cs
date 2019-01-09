using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using iTextSharp.text;
using iTextSharp.text.html;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
using Font = iTextSharp.text.Font;

namespace webNews.Common
{
    public static class ExportFile
    {
        public enum TypeExport
        {
            Excel = 1,
            Pdf = 2
        }

        /// <summary>
        /// Hàm xuất excel
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="titleExport">Tiêu đề xuất excel</param>
        /// <param name="nameFile">Tên file excel</param>
        /// <param name="infoExport">Những thông tin cần bổ sung vào file Export</param>
        /// <param name="columnGridViews">Cấu hình cột của gridview</param>
        /// <param name="rowspanTotal">Có dòng hiển thị header</param>
        /// <param name="list">Danh sách cần hiển thị</param>
        /// <param name="fromDate">Xem báo cáo từ ngày</param>
        /// <param name="toDate">Xem báo cáo đên ngày</param>
        /// <param name="exportDate">Ngày xuất báo cáo</param>
        /// <param name="isShowFooter">Có hiển thị Footer của GridView</param>
        public static void ExportExcel<T>(string titleExport, string nameFile, string infoExport,
            List<ColumnGridView> columnGridViews,
            int rowspanTotal, List<T> list, string fromDate, string toDate, string exportDate, bool isShowFooter = true)
        {
            const string style = "<style> .myMoney { mso-number-format:\\##\\,\\##\\##0; } div{font-size: 13px; font-weight: normal; text-align:left;} </style> ";
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.AddHeader("content-disposition",
                "attachment;filename=" + nameFile + "_" + DateTime.Now.ToString("dd-MM-yyyy") + ".xls");
            HttpContext.Current.Response.Charset = "";
            HttpContext.Current.Response.ContentType = "application/vnd.ms-excel";
            var sw = new StringWriter();
            var hw = new HtmlTextWriter(sw);
            var gridView = SettingGridView(columnGridViews, rowspanTotal, TypeExport.Excel, list, isShowFooter);
            hw.Write(
                "<div style='font-size: 24px; font-weight: bold;'>" +
                "HỆ THỐNG ZOTOP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                titleExport.ToUpper() + "</div>");
            hw.Write("<div style='text-align:center;'>Giao dịch ngày:" + fromDate + "</div>");
            hw.Write("<div style='text-align:center;'>Ngày xuất:" + exportDate + "</div>");
            hw.Write(infoExport);
            hw.WriteBreak();
            gridView.RenderControl(hw);
            HttpContext.Current.Response.Write(style);
            HttpContext.Current.Response.Output.Write(sw.ToString());
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.End();
        }
        /// <summary>
        /// Hàm xuất excel
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="titleExport">Tiêu đề xuất excel</param>
        /// <param name="nameFile">Tên file excel</param>
        /// <param name="infoExport">Những thông tin cần bổ sung vào file Export</param>
        /// <param name="columnGridViews">Cấu hình cột của gridview</param>
        /// <param name="rowspanTotal">Có dòng hiển thị header</param>
        /// <param name="list">Danh sách cần hiển thị</param>
        /// <param name="fromDate">Xem báo cáo từ ngày</param>
        /// <param name="toDate">Xem báo cáo đên ngày</param>
        /// <param name="exportDate">Ngày xuất báo cáo</param>
        /// <param name="isShowFooter">Có hiển thị Footer của GridView</param>
        public static string ExportExcelFile<T>(string titleExport, string nameFile, string infoExport,
            List<ColumnGridView> columnGridViews,
            int rowspanTotal, List<T> list, string fromDate, string toDate, string exportDate, bool isShowFooter = true)
        {
            System.IO.StringWriter sw = new System.IO.StringWriter();
            System.Web.UI.HtmlTextWriter hw = new System.Web.UI.HtmlTextWriter(sw);
            var gridView = SettingGridView(columnGridViews, rowspanTotal, TypeExport.Excel, list, isShowFooter);
            hw.Write(
                "<div style='font-size: 24px; font-weight: bold;'>" +
                "HỆ THỐNG ZOTOP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                titleExport.ToUpper() + "</div>");
            hw.Write("<div style='text-align:center;'>Giao dịch ngày:" + fromDate + "</div>");
            hw.Write("<div style='text-align:center;'>Ngày xuất:" + exportDate + "</div>");
            hw.Write(infoExport);
            hw.WriteBreak();
            gridView.RenderControl(hw);
            string fileName = Path.Combine(HttpContext.Current.Server.MapPath("~/"), nameFile + "_" + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss-ii") + ".xls");
            File.WriteAllText(fileName, sw.ToString());
            return fileName;
        }
        /// <summary>
        /// Hàm xuất Pdf
        /// </summary>
        /// <param name="titleExport">Tiêu đề xuất excel</param>
        /// <param name="nameFile">Tên file excel</param>
        /// <param name="infoExport">Những thông tin cần bổ sung vào file Export</param>
        /// <param name="columnGridViews">Cấu hình cột của gridview</param>
        /// <param name="rowspanTotal">Có dòng hiển thị header</param>
        /// <param name="list">Danh sách cần hiển thị</param>
        /// <param name="fromDate">Xem báo cáo từ ngày</param>
        /// <param name="toDate">Xem báo cáo đên ngày</param>
        /// <param name="exportDate">Ngày xuất báo cáo</param>
        /// <param name="isShowFooter">Có hiển thị Footer của GridView</param>
        /// <param name="tableSecond">Có table thứ 2 trong file xuất</param>
        public static void ExportPdf<T>(string titleExport, string nameFile, string infoExport,
            List<ColumnGridView> columnGridViews,
            int rowspanTotal, List<T> list, string fromDate, string toDate, string exportDate, bool isShowFooter = true, PdfPTable tableSecond = null)
        {
            var gridView = SettingGridView(columnGridViews, rowspanTotal, TypeExport.Pdf, list, isShowFooter);
            var ARIALUNI_TFF = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Fonts), "ARIALUNI.TTF");
            FontFactory.Register(ARIALUNI_TFF);
            var baseFont = BaseFont.CreateFont(ARIALUNI_TFF, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            var table = SettingTablePdf(gridView, rowspanTotal, columnGridViews, baseFont, isShowFooter);
            HttpContext.Current.Response.ContentType = "application/pdf";
            HttpContext.Current.Response.AddHeader("content-disposition",
                "attachment;filename=" + nameFile + "_" + DateTime.Now.ToString("dd-MM-yyyy") + ".pdf");
            HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            var sw = new StringWriter();
            var hw = new HtmlTextWriter(sw);
            hw.Write("<div style='font-size: 16px; font-weight: bold;'>" +
                 "HỆ THỐNG AIRTIME MIX&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                     titleExport.ToUpper() + "</div>");
            hw.Write("<div style='text-align:center;'>Từ ngày:" + fromDate + " đến ngày: " + toDate + "</div>");
            hw.Write("<div style='text-align:center;'>Ngày xuất:" + exportDate + "</div>");
            hw.Write(infoExport);
            hw.WriteBreak();
            var pdfDoc = new Document(PageSize.A4.Rotate(), 15f, 15f, 15f, 10f);
            pdfDoc.SetMarginMirroring(false);
            var htmlparser = new HTMLWorker(pdfDoc);
            PdfWriter.GetInstance(pdfDoc, HttpContext.Current.Response.OutputStream);
            pdfDoc.Open();
            var styles = new StyleSheet();
            styles.LoadTagStyle("body", "encoding", BaseFont.IDENTITY_H);
            styles.LoadTagStyle("body", "font-family", "Arial Unicode MS");
            styles.LoadTagStyle("body", "font-size", "10px");
            htmlparser.SetStyleSheet(styles);
            htmlparser.Parse(new StringReader(sw.ToString()));
            if (tableSecond != null)
            {
                tableSecond.SpacingAfter = 10;
                pdfDoc.Add(tableSecond);
            }
            pdfDoc.Add(table);
            pdfDoc.Close();
            HttpContext.Current.Response.Write(pdfDoc);
            HttpContext.Current.Response.End();
        }

        /// <summary>
        /// Cấu hình Table để hiển thị Trong Pdf
        /// </summary>
        /// <param name="gridView">GridView</param>
        /// <param name="rowspanTotal">Tổng số dòng của HEader</param>
        /// <param name="columnGridViews">Những cột cần hiển thị</param>
        /// <param name="bf">BaseFont của itextsharp</param>
        /// <param name="isShowFooter">Có hiển thị FooterGridView</param>
        /// <returns></returns>
        public static PdfPTable SettingTablePdf(GridView gridView, int rowspanTotal, List<ColumnGridView> columnGridViews, BaseFont bf, bool isShowFooter = true)
        {
            /* PMNinh: Khởi tạo PdfPTable */
            var table = new PdfPTable(gridView.Columns.Count)
            {
                WidthPercentage = 100f
            };
            /* PMNinh: Dictionary chứa danh sách các cột cần hiển thị */
            var countColumn = new Dictionary<int, int>();
            /* PMNinh: Cấu hình Header */
            for (var i = 0; i < rowspanTotal; i++)
            {
                for (var j = 0; j < columnGridViews.Count; j++)
                {
                    /* PMNinh: Kiêm tra nếu cột hiện tại có rowspan khác với rowspan đang cấu hình thì bỏ qua */
                    if (columnGridViews[j].RowNumber != i) continue;
                    string textHeader;
                    if (columnGridViews[j].IsMergeHeader == false)
                    {
                        /* PMNInh: Kiểm tra nếu cột hiện tại ko phải là Merge thì insert vào mảng */
                        countColumn.Add(j, columnGridViews[j].WidthField);
                        textHeader = columnGridViews[j].HeaderText;
                    }
                    else
                    {
                        textHeader = columnGridViews[j].MergeHeaderText;
                    }
                    var cell = new PdfPCell(new Phrase(textHeader, new Font(bf, 8)))
                    {
                        Rowspan = columnGridViews[j].Rowspan ?? 1,
                        Colspan = (int)(columnGridViews[j].Colspan == null
                            ? 1
                            : (columnGridViews[j].IsMergeHeader ? columnGridViews[j].Colspan : 1)),
                        HorizontalAlignment = 1,
                        VerticalAlignment = Element.ALIGN_MIDDLE,
                        Padding = 5,
                        BackgroundColor = WebColors.GetRGBColor("#eee")
                    };
                    table.AddCell(cell);
                }
            }
            /* PMNinh: Khởi tạo và sắp xếp lại mảng chưa danh sách Width của cột */
            var keyValuePairs = countColumn.OrderBy(x => x.Key).ToList();
            var widths = new int[keyValuePairs.Count];
            for (var i = 0; i < keyValuePairs.Count; i++)
            {
                widths[i] = keyValuePairs[i].Value;
            }
            /* PMNinh: Xét Width cho cột của PdfTable */
            table.SetWidths(widths);
            /* PMNinh: Cấu hình các row của PdfTable */
            for (var i = 0; i < gridView.Rows.Count; i++)
            {
                for (var j = 0; j < gridView.Columns.Count; j++)
                {

                    var cellText = System.Net.WebUtility.HtmlDecode(gridView.Rows[i].Cells[j].Text);
                    var cell = new PdfPCell(new Phrase(cellText, new Font(bf, 8)));
                    switch (gridView.Columns[j].ItemStyle.HorizontalAlign)
                    {
                        case HorizontalAlign.Left:
                            cell.HorizontalAlignment = 0;
                            break;
                        case HorizontalAlign.Center:
                            cell.HorizontalAlignment = 1;
                            break;
                        case HorizontalAlign.Right:
                            cell.HorizontalAlignment = 2;
                            break;
                    }
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    table.AddCell(cell);
                }
            }
            if (isShowFooter)
            {
                /* PMNinh: Cấu hình Footer row của PdfTable */
                for (int i = 0; i < gridView.FooterRow.Cells.Count; i++)
                {
                    var cellText = System.Net.WebUtility.HtmlDecode(gridView.FooterRow.Cells[i].Text);
                    var cell = new PdfPCell(new Phrase(cellText, new Font(bf, 8)));
                    switch (gridView.Columns[i].ItemStyle.HorizontalAlign)
                    {
                        case HorizontalAlign.Left:
                            cell.HorizontalAlignment = 0;
                            break;
                        case HorizontalAlign.Center:
                            cell.HorizontalAlignment = 1;
                            break;
                        case HorizontalAlign.Right:
                            cell.HorizontalAlignment = 2;
                            break;
                    }
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    table.AddCell(cell);
                }
            }
            return table;
        }

        /// <summary>
        ///     Hàm thực hiện lấy ra danh sách GridView
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="columnGridViews">Cấu hình cột của GridView</param>
        /// <param name="rowspanTotal">Số dòng hiển thị của Header</param>
        /// <param name="typeExport">Kiểu xuất dữ liệu</param>
        /// <param name="list">Danh sách cần xuất dữ liệu</param>
        /// <param name="isShowFooter"></param>
        /// <returns></returns>
        /// <remarks>PMNinh</remarks>
        public static GridView SettingGridView<T>(List<ColumnGridView> columnGridViews,
            int rowspanTotal,
            TypeExport typeExport, List<T> list, bool isShowFooter = true)
        {
            /* PMNinh: Khởi tạo GridView */
            var gridView = new GridView();
            foreach (var columnGridView in columnGridViews)
            {
                /* PMNinh: Nếu cột hiện tại là Cột dùng để Merge thì bỏ qua */
                if (columnGridView.IsMergeHeader) continue;
                /* PMNinh: Cấu hình cột theo những dữ liệu đã truyền vào */
                var boundField = new BoundField
                {
                    DataField = columnGridView.DataField,
                    ConvertEmptyStringToNull = true,
                    ItemStyle =
                    {
                        Width = columnGridView.WidthField,
                        VerticalAlign = VerticalAlign.Middle,
                        Wrap = false
                    }
                };
                /* PMNinh: Cấu hình Type của cột */
                switch (columnGridView.TypeField)
                {
                    case TypeCode.DateTime:
                        boundField.ItemStyle.HorizontalAlign = HorizontalAlign.Center;
                        boundField.DataFormatString = "{0:dd/MM/yyyy HH:mm}";
                        boundField.NullDisplayText = string.Empty;
                        if (!string.IsNullOrEmpty(columnGridView.FooterText))
                        {
                            boundField.FooterText = columnGridView.FooterText;
                            boundField.FooterStyle.HorizontalAlign = HorizontalAlign.Center;
                            boundField.FooterStyle.Font.Bold = true;
                        }
                        break;
                    case TypeCode.Int16:
                    case TypeCode.UInt16:
                    case TypeCode.Int32:
                    case TypeCode.UInt32:
                    case TypeCode.Int64:
                    case TypeCode.UInt64:
                    case TypeCode.Double:
                    case TypeCode.Decimal:
                        boundField.NullDisplayText = "0";
                        boundField.ItemStyle.HorizontalAlign = HorizontalAlign.Right;
                        if (typeExport == TypeExport.Pdf)
                            boundField.DataFormatString = "{0:N0}";
                        else
                            boundField.ItemStyle.CssClass = "myMoney";
                        if (!string.IsNullOrEmpty(columnGridView.FooterText))
                        {
                            if (typeExport == TypeExport.Pdf)
                            {
                                boundField.FooterText = Convert.ToDecimal(columnGridView.FooterText).ToString("N0");
                                boundField.FooterStyle.Font.Bold = true;
                            }
                            else
                            {
                                boundField.FooterText = columnGridView.FooterText;
                                boundField.FooterStyle.CssClass = "myMoney";
                                boundField.FooterStyle.Font.Bold = true;
                            }
                            boundField.FooterStyle.HorizontalAlign = HorizontalAlign.Right;
                        }
                        break;
                    case TypeCode.Boolean:
                        boundField.NullDisplayText = string.Empty;
                        boundField.ItemStyle.HorizontalAlign = HorizontalAlign.Center;
                        break;
                    default:
                        boundField.NullDisplayText = string.Empty;
                        boundField.ItemStyle.HorizontalAlign = HorizontalAlign.Left;
                        break;
                }
                gridView.Columns.Add(boundField);
            }
            /* PMNinh: Ẩn cột tự động Gen ra */
            gridView.AutoGenerateColumns = false;
            /* PMNinh: Ẩn header */
            gridView.ShowHeader = false;
            /* PMNinh: Hiện Footer */
            gridView.ShowFooter = isShowFooter;
            gridView.DataSource = list;
            gridView.DataBind();
            /* PMNinh: Cấu hình Header cho cột */
            gridView = SettingHeader(rowspanTotal, columnGridViews, gridView);
            return gridView;
        }

        /// <summary>
        ///     Hàm cấu hình header cho gridview
        /// </summary>
        /// <param name="rowspanTotal">Số dòng hiển thị header</param>
        /// <param name="columnGridViews">Cáu hình những cột header cần hiển thị</param>
        /// <param name="gridView">GridView</param>
        /// <returns></returns>
        /// <remarks>PMNinh</remarks>
        private static GridView SettingHeader(int rowspanTotal,
            List<ColumnGridView> columnGridViews, GridView gridView)
        {
            for (var i = 0; i < rowspanTotal; i++)
            {
                var row = new GridViewRow(0, i, DataControlRowType.Header, DataControlRowState.Normal);
                foreach (var columnGridView in columnGridViews)
                {
                    /* PMNinh: Kiểm tra nếu thứ tự rowspan của cột hiện tại khác với rowspan đang vẽ thì bỏ qua */
                    if (columnGridView.RowNumber != i) continue;
                    /* PMNinh:Khởi tạo và cấu hình Header cho grid dựa vào các thuộc tính truyền vào */
                    var cell = new TableHeaderCell
                    {
                        Text = columnGridView.IsMergeHeader ? columnGridView.MergeHeaderText : columnGridView.HeaderText,
                        ColumnSpan =
                            (int)(columnGridView.Colspan == null
                                ? 1
                                : (columnGridView.IsMergeHeader ? columnGridView.Colspan : 1)),
                        RowSpan = columnGridView.Rowspan ?? 1,
                        HorizontalAlign = HorizontalAlign.Center,
                        BackColor = Color.Gainsboro
                    };
                    row.Controls.Add(cell);
                }
                gridView.Controls[0].Controls.AddAt(i, row);
            }
            return gridView;
        }

        public static void DownloadFile(string pathFile, string fileName)
        {
            HttpResponse response = HttpContext.Current.Response;
            response.ClearContent();
            response.Clear();
            response.Buffer = true;
            response.Charset = "";
            response.ContentType = "application/vnd.ms-excel";
            response.AddHeader("Content-Disposition",
                               "attachment; filename=" + fileName + ".xlsx");
            response.TransmitFile(pathFile);
            response.Flush();
            response.End();
        }

        public class ColumnGridView
        {
            /// <summary>
            ///     Trường dữ liệu cần hiển thị
            /// </summary>
            public string DataField { get; set; }

            /// <summary>
            ///     Kiểu dữ liệu của cột cần hiển thị
            /// </summary>
            public TypeCode TypeField { get; set; }

            /// <summary>
            ///     Độ dài của cột cần hiển thị
            /// </summary>
            public int WidthField { get; set; }

            /// <summary>
            ///     Dữ liệu hiển thị ở footer
            /// </summary>
            public string FooterText { get; set; }

            /// <summary>
            ///     Tiêu đề cột cần hiển thị
            /// </summary>
            public string HeaderText { get; set; }

            /// <summary>
            ///     Có merge cell header không
            /// </summary>
            public bool IsMergeHeader { get; set; }

            /// <summary>
            ///     Text hiển thị ở header được merge
            /// </summary>
            public string MergeHeaderText { get; set; }

            /// <summary>
            ///     Số cột sẽ merge header
            /// </summary>
            public int? Colspan { get; set; }

            /// <summary>
            ///     Số dòng của header
            /// </summary>
            public int? Rowspan { get; set; }

            /// <summary>
            ///     Số thứ tự của dòng hiển thị cột này
            /// </summary>
            public int RowNumber { get; set; }
        }
    }
}
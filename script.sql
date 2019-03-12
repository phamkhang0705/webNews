USE [master]
GO
/****** Object:  Database [ThueDoTot]    Script Date: 12/17/2018 9:49:01 PM ******/
CREATE DATABASE [ThueDoTot]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'test_abc', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\test_abc.mdf' , SIZE = 3264KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'test_abc_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\test_abc_log.ldf' , SIZE = 1088KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [ThueDoTot] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ThueDoTot].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ThueDoTot] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ThueDoTot] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ThueDoTot] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ThueDoTot] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ThueDoTot] SET ARITHABORT OFF 
GO
ALTER DATABASE [ThueDoTot] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ThueDoTot] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ThueDoTot] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ThueDoTot] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ThueDoTot] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ThueDoTot] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ThueDoTot] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ThueDoTot] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ThueDoTot] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ThueDoTot] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ThueDoTot] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ThueDoTot] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ThueDoTot] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ThueDoTot] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ThueDoTot] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ThueDoTot] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ThueDoTot] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ThueDoTot] SET RECOVERY FULL 
GO
ALTER DATABASE [ThueDoTot] SET  MULTI_USER 
GO
ALTER DATABASE [ThueDoTot] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ThueDoTot] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ThueDoTot] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ThueDoTot] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ThueDoTot] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ThueDoTot', N'ON'
GO
USE [ThueDoTot]
GO
/****** Object:  Table [dbo].[CauTaoSP]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CauTaoSP](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[MaDMSP] [int] NULL,
	[MaChiTiet] [int] NULL,
	[SoLuong] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ChiTietHDNhap]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ChiTietHDNhap](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MaSp] [varchar](20) NULL,
	[SL] [int] NULL,
	[IdHD] [int] NULL,
	[LoaiSP] [int] NULL,
	[GiaNhap] [int] NULL,
	[Barcode] [nvarchar](50) NULL,
 CONSTRAINT [PK_ChiTietHDNhap] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ChiTietHDXuat]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietHDXuat](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BarCode] [nvarchar](20) NULL,
	[SL] [int] NULL,
	[IdHD] [int] NULL,
	[Gia] [int] NULL,
 CONSTRAINT [PK_ChiTietHDXuat] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ChiTietSP]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietSP](
	[MaChiTiet] [int] IDENTITY(1,1) NOT NULL,
	[TenCT] [nvarchar](200) NULL,
	[MoTa] [nvarchar](max) NULL,
	[Gia] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaChiTiet] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DanhMucSanPham]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DanhMucSanPham](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[MaSP] [varchar](20) NULL,
	[TenSP] [nvarchar](max) NULL,
	[TuTuoi] [int] NULL,
	[DenTuoi] [int] NULL,
	[MoTa] [nvarchar](max) NULL,
	[ChiTiet] [nvarchar](max) NULL,
	[GiaThue2W] [int] NULL,
	[GiaThue1M] [int] NULL,
	[KemTheo] [nvarchar](max) NULL,
	[img1] [nvarchar](max) NULL,
	[img2] [nvarchar](max) NULL,
	[img3] [nvarchar](max) NULL,
	[video] [nvarchar](max) NULL,
	[ThueSK] [int] NULL,
	[BanMoi] [int] NULL,
	[BanThanhLy] [int] NULL,
	[NgayTao] [datetime] NULL,
	[NgayUpdate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DM_ChungTu]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DM_ChungTu](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[TenCT] [nvarchar](200) NULL,
	[SoHieu] [varchar](50) NULL,
	[LoaiCT] [int] NULL,
	[GhiChu] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[HDNhap]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HDNhap](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MaHD] [nvarchar](50) NULL,
	[NgayTao] [datetime] NULL,
	[SoTien] [int] NULL,
	[MaKho] [int] NULL,
	[NgaySua] [datetime] NULL,
	[UserId] [int] NULL,
	[MaNCC] [int] NULL,
 CONSTRAINT [PK_HdNhap] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HDXuat]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HDXuat](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MaHD] [nvarchar](50) NULL,
	[NgayTao] [datetime] NULL,
	[NgaySua] [datetime] NULL,
	[SoTien] [int] NULL,
	[MaKho] [int] NULL,
	[UserId] [int] NULL,
	[MaKhachHang] [int] NULL,
	[LoaiHD] [int] NULL,
	[TrangThai] [int] NULL,
 CONSTRAINT [PK_HDXuat] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[KhachHang]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[KhachHang](
	[MaKhachHang] [int] IDENTITY(1,1) NOT NULL,
	[TenKhachHang] [nvarchar](50) NULL,
	[SDT] [char](11) NULL,
	[Facebook] [nvarchar](200) NULL,
	[ThanhPho] [nvarchar](20) NULL,
	[Quan] [nvarchar](20) NULL,
	[Phuong] [nvarchar](20) NULL,
	[DCNha] [nvarchar](20) NULL,
	[Tuoi] [int] NULL,
	[MaBe] [int] NULL,
	[MaLoai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaKhachHang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Kho]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Kho](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TenKho] [nvarchar](150) NULL,
	[DiaChi] [nvarchar](500) NULL,
	[SDT] [nvarchar](50) NULL,
 CONSTRAINT [PK_Kho] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[LoaiChungTu]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoaiChungTu](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[TenLoai] [nvarchar](200) NULL,
	[GhiChu] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[LoạiTK]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[LoạiTK](
	[MaTK] [varchar](20) NOT NULL,
	[TenLoaiTK] [nvarchar](200) NULL,
	[Ghi_Chu] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaTK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MaPL_DMSP]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaPL_DMSP](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdMPL] [int] NULL,
	[IdDMSP] [int] NULL,
 CONSTRAINT [PK_MaPL_DMSP] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Navbar]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Navbar](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[nameOption] [nvarchar](100) NULL,
	[controller] [nvarchar](100) NULL,
	[action] [nvarchar](100) NULL,
	[imageClass] [nvarchar](100) NULL,
	[status] [bit] NULL,
	[isParent] [bit] NULL,
	[parentId] [int] NULL,
 CONSTRAINT [PK_Navbar] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[NCC]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NCC](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TenNCC] [nvarchar](100) NULL,
	[DiaChi] [nvarchar](200) NULL,
	[MoTa] [nvarchar](max) NULL,
 CONSTRAINT [PK_NCC] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PhanLoaiKH]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhanLoaiKH](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PhanLoai] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PhanLoaiSP]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhanLoaiSP](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PhanLoai] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SanPhamBan]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPhamBan](
	[SoLuong] [int] NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DMSPId] [int] NULL,
	[BarCode] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SanPhamThue]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPhamThue](
	[ThoiGianNhap] [datetime] NULL,
	[TinhTrang] [nvarchar](max) NULL,
	[GhiChu] [nvarchar](max) NULL,
	[BarCode] [nvarchar](50) NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TaiKhoan](
	[MaTK] [varchar](20) NOT NULL,
	[TenTK] [nvarchar](200) NULL,
	[MaLoai] [varchar](20) NULL,
	[Ghi_Chu] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaTK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ThongTinBe]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThongTinBe](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NamSinh] [int] NULL,
	[GioiTinh] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ThongTinDN]    Script Date: 12/17/2018 9:49:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ThongTinDN](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[TenCT] [nvarchar](max) NULL,
	[VietTat] [nvarchar](200) NULL,
	[HTSoHuuVon] [nvarchar](200) NULL,
	[DiaChi] [nvarchar](max) NULL,
	[MaSoThue] [varchar](20) NULL,
	[NgayCapMST] [datetime] NULL,
	[DienThoai] [varchar](20) NULL,
	[Fax] [varchar](20) NULL,
	[Email] [varchar](50) NULL,
	[SoTKNH] [varchar](50) NULL,
	[GiamDoc] [nvarchar](50) NULL,
	[NgLapBieu] [nvarchar](50) NULL,
	[VonDieuLe] [int] NULL,
	[Web] [varchar](50) NULL,
	[FanPage] [varchar](50) NULL,
 CONSTRAINT [PK_ThongTinDN] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[DanhMucSanPham] ON 

INSERT [dbo].[DanhMucSanPham] ([ID], [MaSP], [TenSP], [TuTuoi], [DenTuoi], [MoTa], [ChiTiet], [GiaThue2W], [GiaThue1M], [KemTheo], [img1], [img2], [img3], [video], [ThueSK], [BanMoi], [BanThanhLy], [NgayTao], [NgayUpdate]) VALUES (7, N'BB3CH', N'Bập bênh ba con cá heo', 1, 3, N'<p>Bập b&ecirc;nh 3 con c&aacute; heo</p>
', N'<p>mo tả n&egrave;</p>
', 80000, 100000, NULL, N'/Uploads/images/2.jpg', N'/Uploads/images/22812116_1583486848382167_8381565494880108544_n.jpg', N'/Uploads/images/1483583011_bap-benh-ba-cho-con-ca-heo.png', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[DanhMucSanPham] ([ID], [MaSP], [TenSP], [TuTuoi], [DenTuoi], [MoTa], [ChiTiet], [GiaThue2W], [GiaThue1M], [KemTheo], [img1], [img2], [img3], [video], [ThueSK], [BanMoi], [BanThanhLy], [NgayTao], [NgayUpdate]) VALUES (9, N'Z01', N'Xe chòi chân Tayo bus ZESTER Z01', 1, 3, N'<p>- Thương hiệu: ZESTER (h&agrave;n Quốc)&nbsp;<br />
- K&iacute;ch thước: 75* 51*94 cm&nbsp;<br />
- Tuổi: 1- 8tuổi&nbsp;<br />
- Nguy&ecirc;n liệu: Nhựa nguy&ecirc;n sinh cao cấp H&agrave;n Quốc, sản xuất theo ti&ecirc;u chuẩn xuất khẩu EU v&agrave; Mỹ , được chứng nhận TCCL của Tổng cục Đo lường chất lượng Việt Nam khi nhập khẩu v&agrave;o VN&nbsp;</p>
', N'<p>- Thương hiệu: ZESTER<strong>&nbsp;(H&agrave;n Quốc)-&nbsp;</strong>Thương hiệu xe ch&ograve;i ch&acirc;n b&aacute;n chạy nhất tại H&agrave;n Quốc v&agrave; thị trường Mỹ</p>

<p>- K&iacute;ch thước: 75* 51*94 cm</p>

<p>- Nguy&ecirc;n liệu: Nhựa nguy&ecirc;n sinh cao cấp H&agrave;n Quốc,&nbsp;&nbsp;sản xuất &nbsp;theo ti&ecirc;u chuẩn xuất khẩu EU v&agrave; Mỹ , được chứng nhận TCCL của Tổng cục Đo lường chất lượng Việt Nam khi nhập khẩu v&agrave;o VN</p>

<p>&nbsp;</p>

<p><img alt="Xe chòi chân Tayo bus ZESTER Z01" src="https://babycuatoi.vn/uploads/11072018/xe-choi-chan-tayo-bus-zester-z01.jpg" /></p>

<p>Lấy cảm hứng từ bộ phim hoạt h&igrave;nh Tayo BUS, bộ phim hoạt h&igrave;nh được y&ecirc;u th&iacute;ch số 1 tại H&agrave;n Quốc, đ&atilde; l&agrave;m n&ecirc;n 1 chiếc xe Tayo Bus ch&ograve;i ch&acirc;n cực y&ecirc;u th&iacute;ch của c&aacute;c b&eacute; thiếu nhi H&agrave;n Quốc.</p>

<p><a href="https://babycuatoi.vn/uploads/23122017/xe-choi-chan-han-quoc-z01-10.png" rel="slideshow-list" title="xe chòi chân hàn quốc z01-10"><img alt="xe chòi chân hàn quốc z01-10" src="https://babycuatoi.vn/uploads/23122017/xe-choi-chan-han-quoc-z01-10.png" /></a></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>Chiếc xe với k&iacute;ch thước khoang ngồi rộng, do vậy rất được y&ecirc;u th&iacute;ch ở thị trường c&aacute;c nước Ch&acirc;u &Acirc;u v&agrave; Mỹ, nơi m&agrave; diện t&iacute;ch kh&ocirc;ng bị b&oacute; hẹp trong những kh&ocirc;ng gian nhỏ, v&agrave; trẻ em cũng thường y&ecirc;u th&iacute;ch một chỗ ngồi rộng r&atilde;i hơn cho m&igrave;nh</p>

<p><a href="https://babycuatoi.vn/uploads/23122017/xe-choi-chan-z01-3.png" rel="slideshow-list" title="xe chòi chân Z01-3"><img alt="xe chòi chân Z01-3" src="https://babycuatoi.vn/uploads/23122017/xe-choi-chan-z01-3.png" /></a></p>

<p>&nbsp;</p>

<p>Xe ch&ograve;i ch&acirc;n Zester Z01 c&oacute; ưu điểm c&aacute;nh mở dễ d&agrave;n, gi&uacute;p b&eacute; l&ecirc;n xuống dễ d&agrave;ng hơn, c&aacute;c b&aacute;nh được l&agrave;m bằng cao su đặc mềm mại , kh&ocirc;ng s&oacute;c, b&aacute;nh xe quay 360 độ với v&ograve;ng bi ABEC gi&uacute;p b&eacute; tự đẩy đi cũng thật nhẹ nh&agrave;ng</p>

<p><a href="https://babycuatoi.vn/uploads/23122017/xe-choi-chan-z01-7.png" rel="slideshow-list" title="xe chòi chân Z01-7"><img alt="xe chòi chân Z01-7" src="https://babycuatoi.vn/uploads/23122017/xe-choi-chan-z01-7.png" /></a></p>

<p>Kh&ocirc;ng chỉ l&agrave; 1 chiếc xe ch&ograve;i ch&acirc;n th&ocirc;ng thường, chiếc xe ch&ograve;i ch&acirc;n Zester Z01 c&ograve;n l&agrave; xe chở đồ chơi cho c&aacute;c b&eacute; khi đi chơi, với khoang chứa đồ rộng r&atilde;i ph&iacute;a sau</p>

<p><a href="https://babycuatoi.vn/uploads/23122017/xe-choi-chan-z01-8.png" rel="slideshow-list" title="xe chòi chân Z01-8"><img alt="xe chòi chân Z01-8" src="https://babycuatoi.vn/uploads/23122017/xe-choi-chan-z01-8.png" /></a></p>

<p>Với 2 tay cầm chắc chắn ph&iacute;a sau, người lớn c&oacute; thể đẩy v&agrave; điều khiển 1 c&aacute;ch dễ d&agrave;ng v&agrave; thuận tiện, c&ugrave;ng chỗ chứa đồ vu&ocirc;ng vức ph&iacute;a tr&ecirc;n n&oacute;c xe c&oacute; thể để vừa giỏ đồ si&ecirc;u thị, hay đồ ăn uống m&agrave; kh&ocirc;ng lo s&oacute;c đổ tr&agrave;o ra ngo&agrave;i</p>

<p><a href="https://babycuatoi.vn/uploads/23122017/z01-1-1.png" rel="slideshow-list" title="Z01-1"><img alt="Z01-1" src="https://babycuatoi.vn/uploads/23122017/z01-1-1.png" /></a></p>

<p>Xe ch&ograve;i ch&acirc;n Zester Z01 c&oacute; nhạc v&agrave; đ&egrave;n ở tay l&aacute;i điều khiển xe, gi&uacute;p b&eacute; cảm thấy th&uacute; vị như l&aacute;i xe thật</p>

<p><a href="https://babycuatoi.vn/uploads/23122017/xe-choi-chan-z01-9.png" rel="slideshow-list" title="xe chòi chân Z01-9"><img alt="xe chòi chân Z01-9" src="https://babycuatoi.vn/uploads/23122017/xe-choi-chan-z01-9.png" /></a></p>

<p>Từ nay, c&aacute;c ba mẹ h&atilde;y y&ecirc;n t&acirc;m v&igrave; với chiếc xe ch&ograve;i ch&acirc;n n&agrave;y, b&eacute; sẽ kh&ocirc;ng c&ograve;n th&iacute;ch xem ti vi hay m&aacute;y t&iacute;nh nữa v&igrave; chiếc xe n&agrave;y qu&aacute; th&uacute; vị với b&eacute; rồi</p>

<p><a href="https://babycuatoi.vn/uploads/23122017/xe-choi-chan-z01-6.png" rel="slideshow-list" title="xe chòi chân Z01-6"><img alt="xe chòi chân Z01-6" src="https://babycuatoi.vn/uploads/23122017/xe-choi-chan-z01-6.png" /></a></p>

<p>&nbsp;</p>

<p><img alt="lo xe choi chan yaya 17-6" src="https://babycuatoi.vn/uploads/18062017/lo-xe-choi-chan-yaya-17-6.jpg" /></p>

<p>&nbsp;</p>
', 213, 213, NULL, N'/Uploads/images/xdhfzh.jpg', N'/Uploads/images/1(1).jpg', N'/Uploads/images/xe-choi-chan-tayo-bus-z01-1.png', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[DanhMucSanPham] ([ID], [MaSP], [TenSP], [TuTuoi], [DenTuoi], [MoTa], [ChiTiet], [GiaThue2W], [GiaThue1M], [KemTheo], [img1], [img2], [img3], [video], [ThueSK], [BanMoi], [BanThanhLy], [NgayTao], [NgayUpdate]) VALUES (10, N'CHD161', N'Cầu trượt xích đu gấu Hàn Quốc 4 trong 1', 1, 12, N'<p>✪ Xuất xứ: H&agrave;n Quốc. Bảo h&agrave;nh: 6 th&aacute;ng&nbsp;<br />
✪ Độ tuổi: d&agrave;nh cho b&eacute; từ 1.5 - 12 (tuổi)&nbsp;<br />
✪ K&iacute;ch thước: D&agrave;i * rộng * cao =161X163X126 (cm)&nbsp;<br />
✪ Đồ chơi cầu trượt chất lượng cao l&agrave;m từ nhựa nguy&ecirc;n sinh H&agrave;n Quốc, SX theo Ti&ecirc;u chuẩn Ch&acirc;u &Acirc;u,c&oacute; chứng nhận của Tổng cục TCĐL Chất lượng</p>
', N'<p>✪ Xuất xứ: H&agrave;n Quốc. Bảo h&agrave;nh: 6 th&aacute;ng</p>

<p>✪ Độ tuổi: d&agrave;nh cho b&eacute; từ 1.5 - 12 (tuổi)</p>

<p>✪ K&iacute;ch thước: D&agrave;i * rộng * cao = 161X163X126 (cm)&nbsp;&nbsp; . K&iacute;ch thước hộp : 137*37*64 cm, c&acirc;n nặng 18 kg</p>

<p>✪ Cầu trượt thiết kế h&igrave;nh ch&uacute; gấu Teddy n&acirc;u m&aacute;ng xanh tinh nghịch, th&acirc;n thiện, m&agrave;u sắc h&agrave;i h&ograve;a bắt mắt ph&ugrave; hợp với cả b&eacute; trai v&agrave; b&eacute; g&aacute;i, k&iacute;ch th&iacute;ch b&eacute; chơi nhiều hơn với chất liệu nhựa bền đẹp, kh&ocirc;ng phai m&agrave;u, kh&ocirc;ng g&acirc;y trầy xước da b&eacute;, thiết kế đẹp tỉ mỉ đến từng chi tiết. Cầu trượt thiết kế đa năng 4 trong 1 , b&eacute; vừa c&oacute; thể chơi cầu trượt, vừa c&oacute; thể chơi m&ocirc;n thể thao n&eacute;m b&oacute;ng rổ vui nhộn, vừa c&oacute; thể chơi x&iacute;ch đu tuổi thơ, vừa chơi tr&ograve; &uacute; &ograve;a, trốn t&igrave;m, leo tr&egrave;o th&iacute;ch hợp với gia đ&igrave;nh c&oacute; từ 1-3 b&eacute;, hoặc nh&agrave; trẻ, trường mầm non, ...</p>

<p>✪ Cầu trượt c&oacute; thể thay đổi được độ cao thấp dễ d&agrave;ng bằng c&aacute;ch điều chỉnh độ cao thấp của m&aacute;ng trượt. M&aacute;ng trượt uốn lượn gi&uacute;p b&eacute; trượt th&iacute;ch hơn m&agrave; vẫn đảm bảo độ an to&agrave;n tuyệt đối</p>

<p>✪ Đồ chơi cầu trượt chất lượng cao l&agrave;m từ nhựa nguy&ecirc;n sinh H&agrave;n Quốc, SX theo Ti&ecirc;u chuẩn Ch&acirc;u &Acirc;u,c&oacute; chứng nhận của Tổng cục TCĐL Chất lượng, NK v&agrave; PP bởi cty BBT Việt Nam, số 1 về đồ chơi trẻ em, đồ chơi cho b&eacute; an to&agrave;n, thiết bị gi&aacute;o dục v&agrave; thiết bị khu vui chơi giải tr&iacute;, website:babycuatoi.vn- thietbivuichoi.vn.</p>

<p>✪ KM: Tặng 01 tr&aacute;i b&oacute;ng rổ sịn</p>

<p><img alt="cau truot gau xich du han quoc 4 trong 1 CHD161" src="https://babycuatoi.vn/uploads/04052018/cau-truot-gau-xich-du-han-quoc-4-trong-1-chd161.jpg" /></p>

<p>Với chất liệu nhựa nguy&ecirc;n sinh H&agrave;n Quốc d&agrave;y dặn đảm bảo an to&agrave;n cho b&eacute;.</p>

<p><a href="https://babycuatoi.vn/uploads/02072018/cau-truot-xich-du-gau-han-quoc-4-trong-1-chd161.jpg" rel="slideshow-list" title="Cầu trượt xích đu gấu Hàn Quốc 4 trong 1 CHD161"><img alt="Cầu trượt xích đu gấu Hàn Quốc 4 trong 1 CHD161" src="https://babycuatoi.vn/uploads/02072018/cau-truot-xich-du-gau-han-quoc-4-trong-1-chd161.jpg" /></a></p>

<p>H&igrave;nh gấu đ&aacute;ng y&ecirc;u được nhiều b&eacute; y&ecirc;u th&iacute;ch, m&agrave;u sắc h&agrave;i h&ograve;a ph&ugrave; hợp với cả b&eacute; trai v&agrave; b&eacute; g&aacute;i</p>

<p><img alt="cau truot xich du han quoc cho be CHD161" src="https://babycuatoi.vn/uploads/03122017/cau-truot-xich-du-han-quoc-cho-be-chd161.jpg" /></p>

<p>H&igrave;nh ảnh feedback của kh&aacute;ch h&agrave;ng</p>

<p>✪<strong>&nbsp;LỢI &Iacute;CH CỦA ĐỒ CHƠI CẦU TRƯỢT X&Iacute;CH ĐU CHO B&Eacute;</strong></p>

<p>-&nbsp;Gi&uacute;p b&eacute; ph&aacute;t triển tăng cường khả năng vận động, r&egrave;n luyện c&aacute;c kỹ năng kh&eacute;o l&eacute;o giữa tay ch&acirc;n mắt, xử l&yacute; c&aacute;c t&igrave;nh huống nhanh nhẹn<br />
- Gi&uacute;p b&eacute; ti&ecirc;u thụ năng lượng v&agrave; ăn ngon miệng hơn mỗi ng&agrave;y, giảm b&eacute;o ph&igrave; v&agrave; t&iacute;nh tự kỷ<br />
-&nbsp;Gi&uacute;p mở rộng tr&iacute; tưởng tượng của trẻ, trở n&ecirc;n hoạt b&aacute;t h&ograve;a đồng khi chơi c&ugrave;ng ch&uacute;ng bạn<br />
-&nbsp;N&acirc;ng cao sự tự tin cho trẻ trong cuộc sống v&agrave; l&agrave;m cho cuộc sống của trẻ th&uacute; vị hơn.<br />
-&nbsp;Mang đến cho b&eacute; những niềm vui bổ &iacute;ch.&nbsp;Gieo v&agrave;o l&ograve;ng trẻ 1 th&aacute;i độ t&iacute;ch cực đối với việc luyện tập thể dục.</p>

<p><strong>CHỨNG NHẬN XUẤT XỨ H&Agrave;N QUỐC CỦA SẢN PHẨM</strong></p>

<p><img alt="CO form AK huangdo" src="https://babycuatoi.vn/uploads/16042017/co-form-ak-huangdo.png" /></p>
', 234, 234, NULL, N'/Uploads/images/cau-truot-han-quoc-co-kem-xich-du-chd161.jpg', N'/Uploads/images/cau-truot-xich-du-tre-em-gau-teddy-chd161-h1.jpg', N'/Uploads/images/yyes.jpg', NULL, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[DanhMucSanPham] OFF
SET IDENTITY_INSERT [dbo].[DM_ChungTu] ON 

INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (1, N'Bảng chấm công ', N'01a-LÐTL', 1, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (2, N'Bảng chấm công làm thêm giờ', N'01b-LÐTL', 1, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (3, N'Bảng thanh toán tiền lương', N'02-LÐTL', 1, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (4, N'Bảng thanh toán tiền thưởng', N'03-LÐTL', 1, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (5, N'Giấy đi đường', N'04-LÐTL', 1, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (6, N'Phiếu xác nhận sản phẩm hoặc công việc hoàn thành', N'05-LÐTL', 1, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (7, N'Bảng thanh toán tiền làm thêm giờ', N'06-LÐTL', 1, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (8, N'Bảng thanh toán tiền thuê ngoài', N'07-LÐTL', 1, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (9, N'Hợp đồng giao khoán', N'08-LÐTL', 1, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (10, N'Biên bản thanh lý (nghiệm thu) hợp đồng giao khoán', N'09-LÐTL', 1, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (11, N'Bảng kê trích nộp các khoản theo lương', N'10-LÐTL', 1, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (12, N'Bảng phân bổ tiền lương và bảo hiểm xã hội', N' 11-LÐTL', 1, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (13, N'Phiếu nhập kho', N'01-VT', 2, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (14, N'Phiếu xuất kho', N'02-VT', 2, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (15, N'Biên bản kiểm nghiệm vật tư, công cụ, sản phẩm, hàng hoá', N'03-VT', 2, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (16, N'Phiếu báo vật tư còn lại cuối kỳ', N'04-VT', 2, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (17, N'Biên bản kiểm kê vật tư, công cụ, sản phẩm, hàng hoá', N'05-VT', 2, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (18, N'Bảng kê mua hàng', N'06-VT', 2, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (19, N'Bảng phân bổ nguyên liệu, vật liệu, công cụ, dụng cụ', N'07-VT', 2, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (20, N'Bảng thanh toán hàng đại lý, ký gửi', N'01-BH', 3, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (21, N'Thẻ quầy hàng', N'02-BH', 3, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (22, N'Phiếu thu', N'01-TT', 4, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (23, N'Phiếu chi', N'02-TT', 4, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (24, N'Giấy đề nghị tạm ứng', N'03-TT', 4, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (25, N'Giấy thanh toán tiền tạm ứng', N'04-TT', 4, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (26, N'Giấy đề nghị thanh toán', N'05-TT', 4, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (27, N'Biên lai thu tiền', N'06-TT', 4, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (28, N'Bảng kê vàng, bạc, kim khí quý, đá quý', N'07-TT', 4, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (29, N'Bảng kiểm kê quỹ (dùng cho VND)', N'08a-TT', 4, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (30, N'Bảng kiểm kê quỹ (dùng cho ngoại tệ, vàng bạc, kim khí quý, đá quý)', N'08b-TT', 4, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (31, N'Bảng kê chi tiền ', N'09-TT', 4, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (32, N'Biên bản giao nhận TSCĐ', N'01-TSCÐ', 5, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (33, N'Biên bản thanh lý TSCĐ', N'02-TSCÐ', 5, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (34, N'Biên bản bàn giao TSCĐ sửa chữa lớn hoàn thành', N'03-TSCÐ', 5, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (35, N'Biên bản đánh giá lại TSCĐ', N'04-TSCÐ', 5, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (36, N'Biên bản kiểm kê TSCĐ', N'05-TSCÐ', 5, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (37, N'Bảng tính và phân bổ khấu hao TSCĐ', N'06-TSCÐ', 5, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (38, N'Giấy chứng nhận nghỉ ốm hưởng BHXH', N'', 6, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (39, N'Danh sách người nghỉ hưởng trợ cấp ốm đau, thai sản', N'', 6, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (40, N'Hoá đơn Giá trị gia tăng ', N'01GTKT-3LL', 6, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (41, N'Hoá đơn bán hàng thông thường ', N'02GTGT-3LL', 6, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (42, N'Phiếu xuất kho kiêm vận chuyển nội bộ', N'03 PXK-3LL', 6, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (43, N'Phiếu xuất kho hàng gửi đại lý', N'04 HDL-3LL', 6, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (44, N'Hoá đơn dịch vụ cho thuê tài chính', N'05 TTC-LL', 6, NULL)
INSERT [dbo].[DM_ChungTu] ([id], [TenCT], [SoHieu], [LoaiCT], [GhiChu]) VALUES (45, N'Bảng kê thu mua hàng hoá mua vào không có hoá đơn', N'04/GTGT', 6, NULL)
SET IDENTITY_INSERT [dbo].[DM_ChungTu] OFF
SET IDENTITY_INSERT [dbo].[KhachHang] ON 

INSERT [dbo].[KhachHang] ([MaKhachHang], [TenKhachHang], [SDT], [Facebook], [ThanhPho], [Quan], [Phuong], [DCNha], [Tuoi], [MaBe], [MaLoai]) VALUES (1, NULL, N'êr         ', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL)
SET IDENTITY_INSERT [dbo].[KhachHang] OFF
SET IDENTITY_INSERT [dbo].[Kho] ON 

INSERT [dbo].[Kho] ([Id], [TenKho], [DiaChi], [SDT]) VALUES (1, N'Kho Thuê Trần Cung', N'Nhà 35 - Ngõ 79 - Trần Cung - Nghĩa tân - Cầu Giấy - Hà Nội', NULL)
INSERT [dbo].[Kho] ([Id], [TenKho], [DiaChi], [SDT]) VALUES (2, N'Kho bán Trần Cung', N'Nhà 35 - Ngõ 79 - Trần Cung - Nghĩa tân - Cầu Giấy - Hà Nội', NULL)
SET IDENTITY_INSERT [dbo].[Kho] OFF
SET IDENTITY_INSERT [dbo].[LoaiChungTu] ON 

INSERT [dbo].[LoaiChungTu] ([id], [TenLoai], [GhiChu]) VALUES (1, N'Lao động tiền lương', NULL)
INSERT [dbo].[LoaiChungTu] ([id], [TenLoai], [GhiChu]) VALUES (2, N'Hàng tồn kho', NULL)
INSERT [dbo].[LoaiChungTu] ([id], [TenLoai], [GhiChu]) VALUES (3, N'Bán hàng', NULL)
INSERT [dbo].[LoaiChungTu] ([id], [TenLoai], [GhiChu]) VALUES (4, N'Tiền tệ', NULL)
INSERT [dbo].[LoaiChungTu] ([id], [TenLoai], [GhiChu]) VALUES (5, N'Tài sản cố định', NULL)
INSERT [dbo].[LoaiChungTu] ([id], [TenLoai], [GhiChu]) VALUES (6, N'CHỨNG TỪ BAN HÀNH THEO CÁC VĂN BẢN PHÁP LUẬT KHÁC', NULL)
SET IDENTITY_INSERT [dbo].[LoaiChungTu] OFF
INSERT [dbo].[LoạiTK] ([MaTK], [TenLoaiTK], [Ghi_Chu]) VALUES (N'CPK', N'TÀI KHOẢN CHI PHÍ KHÁC', NULL)
INSERT [dbo].[LoạiTK] ([MaTK], [TenLoaiTK], [Ghi_Chu]) VALUES (N'CPSXKD', N'TÀI KHOẢN CHI PHÍ SẢN XUẤT, KINH DOANH', NULL)
INSERT [dbo].[LoạiTK] ([MaTK], [TenLoaiTK], [Ghi_Chu]) VALUES (N'DT', N'TÀI KHOẢN DOANH THU', NULL)
INSERT [dbo].[LoạiTK] ([MaTK], [TenLoaiTK], [Ghi_Chu]) VALUES (N'KQKD', N'TÀI KHOẢN XÁC ĐỊNH KẾT QUẢ KINH DOANH', NULL)
INSERT [dbo].[LoạiTK] ([MaTK], [TenLoaiTK], [Ghi_Chu]) VALUES (N'NPT', N'TÀI KHOẢN NỢ PHẢI TRẢ', NULL)
INSERT [dbo].[LoạiTK] ([MaTK], [TenLoaiTK], [Ghi_Chu]) VALUES (N'TKTS', N'TÀI KHOẢN TÀI SẢN', NULL)
INSERT [dbo].[LoạiTK] ([MaTK], [TenLoaiTK], [Ghi_Chu]) VALUES (N'TNK', N'TÀI KHOẢN THU NHẬP KHÁC', NULL)
INSERT [dbo].[LoạiTK] ([MaTK], [TenLoaiTK], [Ghi_Chu]) VALUES (N'VCSH', N'TÀI KHOẢN VỐN CHỦ SỞ HỮU', NULL)
SET IDENTITY_INSERT [dbo].[MaPL_DMSP] ON 

INSERT [dbo].[MaPL_DMSP] ([Id], [IdMPL], [IdDMSP]) VALUES (1, 1, 1)
INSERT [dbo].[MaPL_DMSP] ([Id], [IdMPL], [IdDMSP]) VALUES (2, 2, 1)
INSERT [dbo].[MaPL_DMSP] ([Id], [IdMPL], [IdDMSP]) VALUES (3, 3, 1)
INSERT [dbo].[MaPL_DMSP] ([Id], [IdMPL], [IdDMSP]) VALUES (28, 7, 7)
INSERT [dbo].[MaPL_DMSP] ([Id], [IdMPL], [IdDMSP]) VALUES (29, 8, 9)
INSERT [dbo].[MaPL_DMSP] ([Id], [IdMPL], [IdDMSP]) VALUES (30, 1, 10)
INSERT [dbo].[MaPL_DMSP] ([Id], [IdMPL], [IdDMSP]) VALUES (31, 2, 10)
SET IDENTITY_INSERT [dbo].[MaPL_DMSP] OFF
SET IDENTITY_INSERT [dbo].[Navbar] ON 

INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (1, N'Dashboard', N'Home', N'Index', N'fa fa-dashboard fa-fw', 1, 0, 0)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (2, N'Sản phẩm', N'SanPhams', N'index', N'fab fa-product-hunt', 1, 0, 0)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (3, N'Flot Charts', N'Home', N'FlotCharts', NULL, 1, 0, 3)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (4, N'Morris.js Charts', N'Home', N'MorrisCharts', NULL, 1, 0, 3)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (5, N'Tables', N'Home', N'Tables', N'fa fa-table fa-fw', 1, 0, 0)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (6, N'Forms', N'Home', N'Forms', N'fa fa-edit fa-fw', 1, 0, 0)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (7, N'UI Elements', NULL, NULL, N'fa fa-wrench fa-fw', 1, 1, 0)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (8, N'Panels and Wells', N'Home', N'Panels', NULL, 1, 0, 7)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (9, N'Buttons', N'Home', N'Buttons', NULL, 1, 0, 7)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (10, N'Notifications', N'Home', N'Notifications', NULL, 1, 0, 7)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (11, N'Typography', N'Home', N'Typography', NULL, 1, 0, 7)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (12, N'Icons', N'Home', N'Icons', NULL, 1, 0, 7)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (13, N'Grid', N'Home', N'Grid', NULL, 1, 0, 7)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (14, N'Multi-Level Dropdown', NULL, NULL, N'fa fa-sitemap fa-fw', 1, 1, 0)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (15, N'Second Level Item', NULL, NULL, NULL, 1, 0, 14)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (16, N'Sample Pages', NULL, NULL, N'fa fa-files-o fa-fw', 1, 1, 0)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (17, N'Blank Page', N'Home', N'Blank', NULL, 1, 0, 16)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (18, N'Login Page', N'Home', N'Login', NULL, 1, 0, 16)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (19, N'Quản lý Danh Mục', NULL, NULL, NULL, 1, 1, 0)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (20, N'Danh mục kho', N'kho', N'index', NULL, 1, 0, 19)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (21, N'Danh mục sản phẩm', N'SanPhams', N'Index', NULL, 1, 0, 19)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (22, N'Danh sách khách hàng', NULL, NULL, NULL, 1, 0, 19)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (23, N'Quản lý kho', NULL, NULL, NULL, 1, 1, NULL)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (24, N'Kho thuê', NULL, NULL, NULL, 1, 0, 23)
INSERT [dbo].[Navbar] ([Id], [nameOption], [controller], [action], [imageClass], [status], [isParent], [parentId]) VALUES (25, N'Kho bán', NULL, NULL, NULL, 1, 0, 23)
SET IDENTITY_INSERT [dbo].[Navbar] OFF
SET IDENTITY_INSERT [dbo].[NCC] ON 

INSERT [dbo].[NCC] ([Id], [TenNCC], [DiaChi], [MoTa]) VALUES (1, N'NCC1', N'Hà Nội', N'NCC1')
INSERT [dbo].[NCC] ([Id], [TenNCC], [DiaChi], [MoTa]) VALUES (2, N'NCC2', N'Hà Nội', N'NCC2')
INSERT [dbo].[NCC] ([Id], [TenNCC], [DiaChi], [MoTa]) VALUES (3, N'NCC3', N'Hà Nội', N'NCC3')
SET IDENTITY_INSERT [dbo].[NCC] OFF
SET IDENTITY_INSERT [dbo].[PhanLoaiSP] ON 

INSERT [dbo].[PhanLoaiSP] ([Id], [PhanLoai]) VALUES (1, N'Cầu Trượt
')
INSERT [dbo].[PhanLoaiSP] ([Id], [PhanLoai]) VALUES (2, N'Xích Đu
')
INSERT [dbo].[PhanLoaiSP] ([Id], [PhanLoai]) VALUES (3, N'Bể Bóng
')
INSERT [dbo].[PhanLoaiSP] ([Id], [PhanLoai]) VALUES (4, N'Xe đạp
')
INSERT [dbo].[PhanLoaiSP] ([Id], [PhanLoai]) VALUES (5, N'Xe máy điện
')
INSERT [dbo].[PhanLoaiSP] ([Id], [PhanLoai]) VALUES (6, N'Ô tô điện
')
INSERT [dbo].[PhanLoaiSP] ([Id], [PhanLoai]) VALUES (7, N'Bập bênh
')
INSERT [dbo].[PhanLoaiSP] ([Id], [PhanLoai]) VALUES (8, N'Xe chòi chân
')
INSERT [dbo].[PhanLoaiSP] ([Id], [PhanLoai]) VALUES (9, N'Xe thăng bằng
')
INSERT [dbo].[PhanLoaiSP] ([Id], [PhanLoai]) VALUES (10, N'Xe bus
')
INSERT [dbo].[PhanLoaiSP] ([Id], [PhanLoai]) VALUES (11, N'Thảm trải nền')
SET IDENTITY_INSERT [dbo].[PhanLoaiSP] OFF
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N' 352', N' Dự phòng phải trả', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N' 811', N'Chi phí khác', N'CPK', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'111', N'Tiền mặt', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1111', N'Tiền Việt Nam', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1112', N'Ngoại tệ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1113', N'Vàng tiền tệ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'112', N'Tiền gửi Ngân hàng', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1121', N'Tiền Việt Nam', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1122', N'Ngoại tệ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1123', N'Vàng tiền tệ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'113', N'Tiền đang chuyển', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1131', N'Tiền Việt Nam', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1132', N'Ngoại tệ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'121', N'Chứng khoán kinh doanh', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1211', N'Cổ phiếu', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1212', N'Trái phiếu', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1218', N'Chứng khoán và công cụ tài chính khác', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'128', N'Đầu tư nắm giữ đến ngày đáo hạn', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1281', N'Tiền gửi có kỳ hạn', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1282', N'Trái phiếu', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1283', N'Cho vay', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1288', N'Các khoản đầu tư khác nắm giữ đến ngày đáo hạn', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'131', N'Phải thu của khách hàng', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'133', N'Thuế GTGT được khấu trừ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1331', N'Thuế GTGT được khấu trừ của hàng hóa, dịch vụ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1332', N'Thuế GTGT được khấu trừ của TSCĐ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'136', N'Phải thu nội bộ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1361', N'Vốn kinh doanh ở các đơn vị trực thuộc', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1362', N'Phải thu nội bộ về chênh lệch tỷ giá', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1363', N'Phải thu nội bộ về chi phí đi vay đủ điều kiện được vốn hoá', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1368', N'Phải thu nội bộ khác', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'138', N'Phải thu khác', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1381', N'Tài sản thiếu chờ xử lý', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1385', N'Phải thu về cổ phần hoá', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1388', N'Phải thu khác', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'141', N'Tạm ứng', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'151', N'Hàng mua đang đi đường', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'152', N'Nguyên liệu, vật liệu', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'153', N'Công cụ, dụng cụ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1531', N'Công cụ, dụng cụ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1532', N'Bao bì luân chuyển', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1533', N'Đồ dùng cho thuê', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1534', N'Thiết bị, phụ tùng thay thế', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'154', N'Chi phí sản xuất, kinh doanh dở dang', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'155', N'Thành phẩm', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1551', N'Thành phẩm nhập kho', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1557', N'Thành phẩm bất động sản', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'156', N'Hàng hóa', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1561', N'Giá mua hàng hóa', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1562', N'Chi phí thu mua hàng hóa', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1567', N'Hàng hóa bất động sản', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'157', N'Hàng gửi đi bán', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'158', N'Hàng hoá kho bảo thuế', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'161', N'Chi sự nghiệp', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1611', N'Chi sự nghiệp năm trước', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'1612', N'Chi sự nghiệp năm nay', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'171', N'Giao dịch mua bán lại trái phiếu chính phủ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'211', N'Tài sản cố định hữu hình', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2111', N'Nhà cửa, vật kiến trúc', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2112', N'Máy móc, thiết bị', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2113', N'Phương tiện vận tải, truyền dẫn', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2114', N'Thiết bị, dụng cụ quản lý', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2115', N'Cây lâu năm, súc vật làm việc và cho sản phẩm', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2118', N'TSCĐ khác', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'212', N'Tài sản cố định thuê tài chính', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2121', N'TSCĐ hữu hình thuê tài chính.', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2122', N'TSCĐ vô hình thuê tài chính.', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'213', N'Tài sản cố định vô hình', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2131', N'Quyền sử dụng đất', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2132', N'Quyền phát hành', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2133', N'Bản quyền, bằng sáng chế', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2134', N'Nhãn hiệu, tên thương mại', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2135', N'Chương trình phần mềm', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2136', N'Giấy phép và giấy phép nhượng quyền', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2138', N'TSCĐ vô hình khác', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'214', N'Hao mòn tài sản cố định', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2141', N'Hao mòn TSCĐ hữu hình', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2142', N'Hao mòn TSCĐ thuê tài chính', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2143', N'Hao mòn TSCĐ vô hình', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2147', N'Hao mòn bất động sản đầu tư', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'217', N'Bất động sản đầu tư', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'221', N'Đầu tư vào công ty con', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'222', N'Đầu tư vào công ty liên doanh, liên kết', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'228', N'Đầu tư khác', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2281', N'Đầu tư góp vốn vào đơn vị khác', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2288', N'Đầu tư khác', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'229', N'Dự phòng tổn thất tài sản', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2291', N'Dự phòng giảm giá chứng khoán kinh doanh', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2292', N'Dự phòng tổn thất đầu tư vào đơn vị khác', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2293', N'Dự phòng phải thu khó đòi', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2294', N'Dự phòng giảm giá hàng tồn kho', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'241', N'Xây dựng cơ bản dở dang', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2411', N'Mua sắm TSCĐ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2412', N'Xây dựng cơ bản', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'2413', N'Sửa chữa lớn TSCĐ', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'242', N'Chi phí trả trước', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'243', N'Tài sản thuế thu nhập hoãn lại', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'244', N'Cầm cố, thế chấp, ký quỹ, ký cược', N'TKTS', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'331', N'Phải trả cho người bán', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'333', N'Thuế và các khoản phải nộp Nhà nước', N'NPT', NULL)
GO
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3331', N'Thuế giá trị gia tăng phải nộp', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'33311', N'Thuế GTGT đầu ra', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'33312', N'Thuế GTGT hàng nhập khẩu', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3332', N'Thuế tiêu thụ đặc biệt', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3333', N'Thuế xuất, nhập khẩu', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3334', N'Thuế thu nhập doanh nghiệp', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3335', N'Thuế thu nhập cá nhân', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3336', N'Thuế tài nguyên', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3337', N'Thuế nhà đất, tiền thuê đất', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3338', N'Thuế bảo vệ môi trường và các loại thuế khác', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'33381', N'Thuế bảo vệ môi trường', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'33382', N'Các loại thuế khác', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3339', N'Phí, lệ phí và các khoản phải nộp khác', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'334', N'Phải trả người lao động', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3341', N'Phải trả công nhân viên', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3348', N'Phải trả người lao động khác', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'335', N'Chi phí phải trả', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'336', N'Phải trả nội bộ', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3361', N'Phải trả nội bộ về vốn kinh doanh', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3362', N'Phải trả nội bộ về chênh lệch tỷ giá', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3363', N'Phải trả nội bộ về chi phí đi vay đủ điều kiện được vốn hoá', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3368', N'Phải trả nội bộ khác', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'337', N'Thanh toán theo tiến độ kế hoạch hợp đồng xây dựng', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'338', N'Phải trả, phải nộp khác', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3381', N'Tài sản thừa chờ giải quyết', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3382', N'Kinh phí công đoàn', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3383', N'Bảo hiểm xã hội', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3384', N'Bảo hiểm y tế', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3385', N'Phải trả về cổ phần hoá', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3386', N'Bảo hiểm thất nghiệp', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3387', N'Doanh thu chưa thực hiện', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3388', N'Phải trả, phải nộp khác', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'341', N'Vay và nợ thuê tài chính', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3411', N'Các khoản đi vay', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3412', N'Nợ thuê tài chính', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'343', N'Trái phiếu phát hành', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3431', N'Trái phiếu thường', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'34311', N'Mệnh giá', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'34312', N'Chiết khấu trái phiếu', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'34313', N'Phụ trội trái phiếu', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3432', N'Trái phiếu chuyển đổi', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'344', N'Nhận ký quỹ, ký cược', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'347', N'Thuế thu nhập hoãn lại phải trả', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3521', N'Dự phòng bảo hành sản phẩm hàng hóa', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3522', N'Dự phòng bảo hành công trình xây dựng', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3523', N'Dự phòng tái cơ cấu doanh nghiệp', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3524', N'Dự phòng phải trả khác', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'353', N'Quỹ khen thưởng phúc lợi', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3531', N'Quỹ khen thưởng', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3532', N'Quỹ phúc lợi', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3533', N'Quỹ phúc lợi đã hình thành TSCĐ', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3534', N'Quỹ thưởng ban quản lý điều hành công ty', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'356', N'Quỹ phát triển khoa học và công nghệ', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3561', N'Quỹ phát triển khoa học và công nghệ', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'3562', N'Quỹ phát triển khoa học và công nghệ đã hình thành TSCĐ', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'357', N'Quỹ bình ổn giá', N'NPT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'411', N'Vốn đầu tư của chủ sở hữu', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'4111', N'Vốn góp của chủ sở hữu', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'41111', N'Cổ phiếu phổ thông có quyền biểu quyết', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'41112', N'Cổ phiếu ưu đãi', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'4112', N'Thặng dư vốn cổ phần', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'4113', N'Quyền chọn chuyển đổi trái phiếu', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'4118', N'Vốn khác', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'412', N'Chênh lệch đánh giá lại tài sản', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'413', N'Chênh lệch tỷ giá hối đoái', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'4131', N'Chênh lệch tỷ giá do đánh giá lại các khoản mục tiền tệ có gốc ngoại tệ', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'4132', N'Chênh lệch tỷ giá hối đoái trong giai đoạn trước hoạt động', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'414', N'Quỹ đầu tư phát triển', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'417', N'Quỹ hỗ trợ sắp xếp doanh nghiệp', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'418', N'Các quỹ khác thuộc vốn chủ sở hữu', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'419', N'Cổ phiếu quỹ', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'421', N'Lợi nhuận sau thuế chưa phân phối', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'4211', N'Lợi nhuận sau thuế chưa phân phối năm trước', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'4212', N'Lợi nhuận sau thuế chưa phân phối năm nay', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'441', N'Nguồn vốn đầu tư xây dựng cơ bản', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'461', N'Nguồn kinh phí sự nghiệp', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'4611', N'Nguồn kinh phí sự nghiệp năm trước', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'4612', N'Nguồn kinh phí sự nghiệp năm nay', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'466', N'Nguồn kinh phí đã hình thành TSCĐ', N'VCSH', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'511', N'Doanh thu bán hàng và cung cấp dịch vụ', N'DT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'5111', N'Doanh thu bán hàng hóa', N'DT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'5112', N'Doanh thu bán các thành phẩm', N'DT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'5113', N'Doanh thu cung cấp dịch vụ', N'DT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'5114', N'Doanh thu trợ cấp, trợ giá', N'DT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'5117', N'Doanh thu kinh doanh bất động sản đầu tư', N'DT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'5118', N'Doanh thu khác', N'DT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'515', N'Doanh thu hoạt động tài chính', N'DT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'521', N'Các khoản giảm trừ doanh thu', N'DT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'5211', N'Chiết khấu thương mại', N'DT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'5212', N'Hàng bán bị trả lại', N'DT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'5213', N'Giảm giá hàng bán', N'DT', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'611', N'Mua hàng', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6111', N'Mua nguyên liệu, vật liệu', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6112', N'Mua hàng hóa', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'621', N'Chi phí nguyên liệu, vật liệu trực tiếp', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'622', N'Chi phí nhân công trực tiếp', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'623', N'Chi phí sử dụng máy thi công', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6231', N'Chi phí nhân công', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6232', N'Chi phí nguyên, vật liệu', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6233', N'Chi phí dụng cụ sản xuất', N'CPSXKD', NULL)
GO
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6234', N'Chi phí khấu hao máy thi công', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6237', N'Chi phí dịch vụ mua ngoài', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6238', N'Chi phí bằng tiền khác', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'627', N'Chi phí sản xuất chung', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6271', N'Chi phí nhân viên phân xưởng', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6272', N'Chi phí nguyên, vật liệu', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6273', N'Chi phí dụng cụ sản xuất', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6274', N'Chi phí khấu hao TSCĐ', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6277', N'Chi phí dịch vụ mua ngoài', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6278', N'Chi phí bằng tiền khác', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'631', N'Giá thành sản xuất', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'632', N'Giá vốn hàng bán', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'635', N'Chi phí tài chính', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'641', N'Chi phí bán hàng', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6411', N'Chi phí nhân viên', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6412', N'Chi phí nguyên vật liệu, bao bì', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6413', N'Chi phí dụng cụ, đồ dùng', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6414', N'Chi phí khấu hao TSCĐ', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6415', N'Chi phí bảo hành', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6417', N'Chi phí dịch vụ mua ngoài', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6418', N'Chi phí bằng tiền khác', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'642', N'Chi phí quản lý doanh nghiệp', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6421', N'Chi phí nhân viên quản lý', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6422', N'Chi phí vật liệu quản lý', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6423', N'Chi phí đồ dùng văn phòng', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6424', N'Chi phí khấu hao TSCĐ', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6425', N'Thuế, phí và lệ phí', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6426', N'Chi phí dự phòng', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6427', N'Chi phí dịch vụ mua ngoài', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'6428', N'Chi phí bằng tiền khác', N'CPSXKD', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'711', N'Thu nhập khác', N'TNK', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'821', N'Chi phí thuế thu nhập doanh nghiệp', N'CPK', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'8211', N'Chi phí thuế TNDN hiện hành', N'CPK', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'8212', N'Chi phí thuế TNDN hoãn lại', N'CPK', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [TenTK], [MaLoai], [Ghi_Chu]) VALUES (N'911', N'Xác định kết quả kinh doanh', N'KQKD', NULL)
USE [master]
GO
ALTER DATABASE [ThueDoTot] SET  READ_WRITE 
GO

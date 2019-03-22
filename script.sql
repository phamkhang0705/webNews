USE [master]
GO
/****** Object:  Database [web_news]    Script Date: 21-03-2019 08:03:49 ******/
CREATE DATABASE [web_news]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'web_news', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\web_news.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'web_news_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\web_news_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [web_news] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [web_news].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [web_news] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [web_news] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [web_news] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [web_news] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [web_news] SET ARITHABORT OFF 
GO
ALTER DATABASE [web_news] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [web_news] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [web_news] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [web_news] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [web_news] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [web_news] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [web_news] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [web_news] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [web_news] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [web_news] SET  DISABLE_BROKER 
GO
ALTER DATABASE [web_news] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [web_news] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [web_news] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [web_news] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [web_news] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [web_news] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [web_news] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [web_news] SET RECOVERY FULL 
GO
ALTER DATABASE [web_news] SET  MULTI_USER 
GO
ALTER DATABASE [web_news] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [web_news] SET DB_CHAINING OFF 
GO
ALTER DATABASE [web_news] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [web_news] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [web_news] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'web_news', N'ON'
GO
USE [web_news]
GO
/****** Object:  Table [dbo].[Banner]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Banner](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Type] [int] NOT NULL,
	[Title] [nvarchar](1) NULL,
	[Url] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Category]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Category](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](10) NULL,
	[Name] [nvarchar](200) NULL,
	[FromAge] [int] NULL,
	[ToAge] [int] NULL,
	[Status] [int] NULL,
	[Description] [nvarchar](2000) NULL,
	[UpdatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
 CONSTRAINT [PK_DanhMucSanPham] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[FileAttach]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FileAttach](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NULL,
	[CategoryId] [int] NULL,
	[GroupId] [int] NULL,
	[Url] [nvarchar](200) NULL,
 CONSTRAINT [PK_File] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Group]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Group](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](10) NULL,
	[Name] [nvarchar](200) NULL,
	[Description] [nvarchar](2000) NULL,
	[Status] [int] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_NhomSanPham] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[GroupCategory]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GroupCategory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryId] [int] NULL,
	[GroupId] [int] NULL,
 CONSTRAINT [PK_DanhMuc_Nhom] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Language]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Language](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](max) NOT NULL,
	[Lang] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[LanguageCategory]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[LanguageCategory](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Code] [varchar](10) NOT NULL,
	[Image] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Media]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Media](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](500) NULL,
	[Type] [int] NOT NULL,
	[Source] [nvarchar](255) NULL,
	[ContentDetail] [nvarchar](500) NULL,
	[Content] [nvarchar](max) NULL,
	[Description] [nvarchar](500) NULL,
	[Order] [int] NULL,
	[Slug] [nvarchar](255) NULL,
	[Action] [varchar](255) NULL,
	[Tags] [nvarchar](500) NULL,
	[Image] [nvarchar](500) NULL,
	[ParentId] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedById] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedById] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MenuFE]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MenuFE](
	[Id] [int] NOT NULL,
	[ParentId] [int] NULL,
	[Name] [nvarchar](255) NULL,
	[Slug] [nvarchar](255) NULL,
	[Show] [bit] NULL,
	[MenuLevel] [int] NULL,
	[Order] [int] NULL,
 CONSTRAINT [PK_MenuFE] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Navbar]    Script Date: 21-03-2019 08:03:49 ******/
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
/****** Object:  Table [dbo].[News]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[News](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CategoryId] [int] NULL,
	[Type] [int] NULL,
	[Title] [nvarchar](500) NULL,
	[Author] [nvarchar](255) NULL,
	[Source] [nvarchar](255) NULL,
	[ContentDetail] [nvarchar](500) NULL,
	[Content] [nvarchar](max) NULL,
	[Description] [nvarchar](500) NULL,
	[Order] [int] NULL,
	[Slug] [nvarchar](255) NULL,
	[Action] [varchar](255) NULL,
	[Tags] [nvarchar](500) NULL,
	[Image] [nvarchar](500) NULL,
	[ParentId] [int] NULL,
	[Status] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedById] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedById] [int] NULL,
 CONSTRAINT [PK__News__3214EC079894B469] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[NewsCategory]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[NewsCategory](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
	[Order] [int] NULL,
	[Slug] [nvarchar](255) NULL,
	[Action] [varchar](255) NULL,
	[Tags] [nvarchar](500) NULL,
	[Image] [nvarchar](500) NULL,
	[Status] [int] NOT NULL,
	[ParentId] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedById] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedById] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[OrderType]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[OrderType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](10) NULL,
	[Name] [nvarchar](200) NULL,
	[Description] [nvarchar](2000) NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_LoaiDonHang] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Page]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Page](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](50) NULL,
	[Name] [nvarchar](255) NULL,
	[Title] [nvarchar](500) NULL,
	[Slug] [nvarchar](255) NULL,
	[Action] [varchar](255) NULL,
	[Content] [nvarchar](max) NULL,
	[ParentId] [int] NULL,
	[Status] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedById] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedById] [int] NULL,
 CONSTRAINT [PK__Page__3214EC0707766EC8] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ProductPrice]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductPrice](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryId] [int] NULL,
	[OrderTypeId] [int] NULL,
	[Price] [decimal](18, 0) NULL,
 CONSTRAINT [PK_Gia] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Project]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CategoryId] [int] NULL,
	[Name] [nvarchar](500) NULL,
	[Info] [nvarchar](500) NULL,
	[Description] [nvarchar](max) NULL,
	[Order] [int] NULL,
	[Tags] [nvarchar](500) NULL,
	[Image] [nvarchar](500) NULL,
	[Status] [int] NOT NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedById] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedById] [int] NULL,
 CONSTRAINT [PK__Project__3214EC073AED4BCB] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProjectCategory]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectCategory](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
	[Order] [int] NULL,
	[Image] [nvarchar](500) NULL,
	[Status] [int] NOT NULL,
	[ParentId] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedById] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedById] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Route]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Route](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ObjectType] [int] NOT NULL,
	[ObjectId] [int] NULL,
	[Slug] [nvarchar](500) NULL,
	[Action] [varchar](255) NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedById] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedById] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Security_Function]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Security_Function](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FunctionCode] [varchar](255) NULL,
	[FunctionName] [nvarchar](255) NULL,
	[IDINSYSTEM] [nvarchar](500) NULL,
 CONSTRAINT [PK_Security_Function] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Security_Permission]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Security_Permission](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PermissionName] [nvarchar](255) NULL,
	[Description] [nvarchar](255) NULL,
	[TargetId] [int] NULL,
 CONSTRAINT [PK_Security_Permission] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Security_Role]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Security_Role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](50) NULL,
	[Description] [nvarchar](255) NULL,
	[ParentRoleId] [int] NULL,
	[Builtin] [bit] NULL,
 CONSTRAINT [PK_Security_Role] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Security_RoleFunctionPermision]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Security_RoleFunctionPermision](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [int] NULL,
	[FunctionId] [int] NULL,
	[PermissionId] [int] NULL,
 CONSTRAINT [PK_Security_RoleFunctionPermision] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Security_UserPermission]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Security_UserPermission](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[PermissionId] [int] NULL,
	[ObjectId] [int] NULL,
 CONSTRAINT [PK_Security_UserPermission] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Security_UserRole]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Security_UserRole](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[RoleId] [int] NULL,
 CONSTRAINT [PK_Security_UserRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Service]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Service](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Slug] [nvarchar](500) NULL,
	[Action] [varchar](255) NULL,
	[Status] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedById] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedById] [int] NULL,
 CONSTRAINT [PK__Service__3214EC07C3C6E223] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[System_Menu]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[System_Menu](
	[MenuId] [int] IDENTITY(1,1) NOT NULL,
	[ParentId] [int] NULL,
	[Controller] [varchar](100) NULL,
	[AliasUrl] [varchar](200) NULL,
	[Permission] [int] NULL,
	[Text] [nvarchar](200) NULL,
	[MenuLevel] [int] NULL,
	[Action] [varchar](50) NULL,
	[MenuOrder] [int] NULL,
	[Description] [nvarchar](200) NULL,
	[ShowMenu] [bit] NULL,
	[Area] [varchar](50) NULL,
 CONSTRAINT [PK_System_Menu] PRIMARY KEY CLUSTERED 
(
	[MenuId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[System_User]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[System_User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](255) NOT NULL,
	[Password] [varchar](255) NOT NULL,
	[Email] [nvarchar](255) NULL,
	[Description] [nvarchar](500) NULL,
	[Status] [int] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[CreatedBy] [nvarchar](255) NOT NULL,
	[CreatedById] [int] NOT NULL,
	[UpdatedDate] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](255) NOT NULL,
	[UpdatedById] [int] NOT NULL,
	[Salt] [varchar](50) NOT NULL,
	[LoginFailedCount] [int] NULL,
	[FullName] [nvarchar](50) NOT NULL,
	[Tel] [varchar](50) NULL,
	[Image] [varchar](200) NULL,
	[UserType] [int] NULL,
	[UserRole] [smallint] NULL,
 CONSTRAINT [PK_System_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Temp_Code]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Temp_Code](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RowVersion] [timestamp] NOT NULL,
	[Group] [int] NOT NULL,
	[Category] [int] NOT NULL,
 CONSTRAINT [PK_Temp_Code] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Unit]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Unit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UnitCode] [varchar](10) NULL,
	[UnitName] [nvarchar](50) NULL,
	[Description] [nvarchar](50) NULL,
	[ConversionRate] [int] NULL,
 CONSTRAINT [PK_Unit] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  View [dbo].[Security_VwRoleService]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE  VIEW [dbo].[Security_VwRoleService]
AS
    SELECT  c.Id AS RoleID ,
            c.Description AS RoleName ,
            cr2.FunctionName ,
            cr2.[Id] AS FunctionID ,
            cr1.PermissionName ,
            cr2.IDInSystem ,
            cr1.Id AS PermissionID
    FROM    Security_Role c
            LEFT JOIN [Security_RoleFunctionPermision] cr ON cr.RoleID = c.Id
            LEFT JOIN Security_Function cr2 ON cr2.[ID] = cr.[FunctionId]
            LEFT JOIN Security_Permission cr1 ON cr.PermissionId = cr1.Id





GO
/****** Object:  View [dbo].[Vw_category]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[Vw_category]
AS

SELECT 
	c.*,
	prices = STUFF(CAST((
        SELECT [text()] = ', ' + CAST(p.Price AS VARCHAR(100))
        FROM dbo.ProductPrice p
        WHERE c.Id = p.CategoryId
        FOR XML PATH(''), TYPE) AS VARCHAR(100)), 1, 2, ''),
	groupids = STUFF(CAST((
        SELECT [text()] = ', ' + CAST(g.Id AS VARCHAR(100))
        FROM dbo.GroupCategory gc
		INNER JOIN dbo.[GROUP] g ON gc.GroupId=g.Id
        WHERE c.Id = gc.CategoryId
        FOR XML PATH(''), TYPE) AS VARCHAR(100)), 1, 2, ''),
	groupnames = STUFF(CAST((
        SELECT [text()] = ', ' + CAST(g.Name AS NVARCHAR(100))
        FROM dbo.GroupCategory gc
		INNER JOIN dbo.[GROUP] g ON gc.GroupId=g.Id
        WHERE c.Id = gc.CategoryId
        FOR XML PATH(''), TYPE) AS NVARCHAR(100)), 1, 2, ''),

	files = STUFF(CAST((
        SELECT [text()] = ', ' + CAST(f.Url AS NVARCHAR(100))
        FROM dbo.FileAttach f
        WHERE c.Id = f.CategoryId
        FOR XML PATH(''), TYPE) AS NVARCHAR(100)), 1, 2, '')

 FROM dbo.Category c



GO
/****** Object:  View [dbo].[Vw_Core_User]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[Vw_Core_User]
AS 
SELECT * FROM [web_news].[dbo].[System_User]


GO
/****** Object:  View [dbo].[Vw_UserInfo]    Script Date: 21-03-2019 08:03:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[Vw_UserInfo]
AS 
SELECT * FROM [web_news].[dbo].[System_User]


GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'"1: Banner, 2: Logo top, 3: Logo giới thiệu, 4: Logo footer, 5: Đối tác"' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Banner', @level2type=N'COLUMN',@level2name=N'Type'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'"Đường dẫn ảnh"' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Banner', @level2type=N'COLUMN',@level2name=N'Url'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1: tin tức, 2: sự kiện' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'News', @level2type=N'COLUMN',@level2name=N'Type'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1: Recruit, 2: Contact' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Page', @level2type=N'COLUMN',@level2name=N'Code'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'"1:News, 2:Page, 3:Project, .."' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Route', @level2type=N'COLUMN',@level2name=N'ObjectType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'"Tên dịch vụ công ty"' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Service', @level2type=N'COLUMN',@level2name=N'Name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'"Đường dẫn"' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Service', @level2type=N'COLUMN',@level2name=N'Slug'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Dịch vụ, lĩnh vực hoạt động' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Service'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Hoạt động, 0: Locked' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'System_User', @level2type=N'COLUMN',@level2name=N'Status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Quá 3 lần lock lại' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'System_User', @level2type=N'COLUMN',@level2name=N'LoginFailedCount'
GO
USE [master]
GO
ALTER DATABASE [web_news] SET  READ_WRITE 
GO

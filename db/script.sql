USE [web_news]
GO
/****** Object:  Table [dbo].[Banner]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Category]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[FileAttach]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Group]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[GroupCategory]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Language]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[LanguageCategory]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Media]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[MenuFE]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Navbar]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[News]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[NewsCategory]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[OrderType]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Page]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[ProductPrice]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Project]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[ProjectCategory]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Route]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Security_Function]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Security_Permission]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Security_Role]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Security_RoleFunctionPermision]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Security_UserPermission]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Security_UserRole]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Service]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[System_Menu]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[System_User]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Temp_Code]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  Table [dbo].[Unit]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  View [dbo].[Security_VwRoleService]    Script Date: 22-03-2019 08:09:59 ******/
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
/****** Object:  View [dbo].[Vw_Category]    Script Date: 22-03-2019 08:09:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[Vw_Category]
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
/****** Object:  View [dbo].[Vw_CategoryPrice]    Script Date: 22-03-2019 08:09:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[Vw_CategoryPrice]
AS
SELECT        
	dbo.OrderType.Code,
	dbo.OrderType.Name,
	dbo.ProductPrice.CategoryId, 
	dbo.ProductPrice.OrderTypeId, 
	dbo.ProductPrice.Price
FROM            dbo.OrderType LEFT JOIN
                         dbo.ProductPrice ON dbo.OrderType.Id = dbo.ProductPrice.Id
WHERE        (dbo.OrderType.Status = 1)


GO
/****** Object:  View [dbo].[Vw_Core_User]    Script Date: 22-03-2019 08:09:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[Vw_Core_User]
AS 
SELECT * FROM [web_news].[dbo].[System_User]


GO
/****** Object:  View [dbo].[Vw_UserInfo]    Script Date: 22-03-2019 08:09:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[Vw_UserInfo]
AS 
SELECT * FROM [web_news].[dbo].[System_User]


GO
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([Id], [Code], [Name], [FromAge], [ToAge], [Status], [Description], [UpdatedDate], [CreatedBy], [CreatedDate], [UpdatedBy]) VALUES (1, N'CHD801', N'Nhà chơi Cầu trượt cho bé CHD801', 1, 7, 1, N'Nhà chơi Cầu trượt cho bé CHD801', NULL, 1, CAST(N'2019-03-19 23:02:13.423' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[Group] ON 

INSERT [dbo].[Group] ([Id], [Code], [Name], [Description], [Status], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (1, N'CTXD', N'Cầu trượt xích đu', N'Cầu trượt xích đu', 1, 1, CAST(N'2019-03-19 23:02:13.423' AS DateTime), 1, CAST(N'2019-03-19 23:02:13.423' AS DateTime))
INSERT [dbo].[Group] ([Id], [Code], [Name], [Description], [Status], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (2, N'OTD', N'Ô tô điện', N'Ô tô điện', 1, 1, CAST(N'2019-03-19 23:02:13.423' AS DateTime), 1, CAST(N'2019-03-19 23:02:13.423' AS DateTime))
SET IDENTITY_INSERT [dbo].[Group] OFF
SET IDENTITY_INSERT [dbo].[GroupCategory] ON 

INSERT [dbo].[GroupCategory] ([Id], [CategoryId], [GroupId]) VALUES (1, 1, 1)
SET IDENTITY_INSERT [dbo].[GroupCategory] OFF
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
SET IDENTITY_INSERT [dbo].[OrderType] ON 

INSERT [dbo].[OrderType] ([Id], [Code], [Name], [Description], [Status]) VALUES (1, N'GIA_2W', N'Giá 2 tuần', N'Giá 2 tuần', 1)
INSERT [dbo].[OrderType] ([Id], [Code], [Name], [Description], [Status]) VALUES (2, N'GIA_1M', N'Giá 1 tháng', N'Giá 1 tháng', 1)
INSERT [dbo].[OrderType] ([Id], [Code], [Name], [Description], [Status]) VALUES (3, N'GIA_SK', N'Giá sự kiện', N'Giá sự kiện', 1)
INSERT [dbo].[OrderType] ([Id], [Code], [Name], [Description], [Status]) VALUES (4, N'GIA_DC', N'Đặt cọc', N'Đặt cọc', 1)
SET IDENTITY_INSERT [dbo].[OrderType] OFF
SET IDENTITY_INSERT [dbo].[ProductPrice] ON 

INSERT [dbo].[ProductPrice] ([Id], [CategoryId], [OrderTypeId], [Price]) VALUES (1, 1, 1, CAST(1000000 AS Decimal(18, 0)))
INSERT [dbo].[ProductPrice] ([Id], [CategoryId], [OrderTypeId], [Price]) VALUES (2, 1, 2, CAST(2000000 AS Decimal(18, 0)))
INSERT [dbo].[ProductPrice] ([Id], [CategoryId], [OrderTypeId], [Price]) VALUES (3, 1, 3, CAST(3000000 AS Decimal(18, 0)))
INSERT [dbo].[ProductPrice] ([Id], [CategoryId], [OrderTypeId], [Price]) VALUES (4, 1, 4, CAST(5000000 AS Decimal(18, 0)))
SET IDENTITY_INSERT [dbo].[ProductPrice] OFF
SET IDENTITY_INSERT [dbo].[Security_Function] ON 

INSERT [dbo].[Security_Function] ([Id], [FunctionCode], [FunctionName], [IDINSYSTEM]) VALUES (1, N'RoleManagement', N'Quản lý nhóm quyền', N'RoleManagement')
INSERT [dbo].[Security_Function] ([Id], [FunctionCode], [FunctionName], [IDINSYSTEM]) VALUES (2, N'DecentralizateManagement', N'Quản lý phân quyền', N'DecentralizateManagement')
INSERT [dbo].[Security_Function] ([Id], [FunctionCode], [FunctionName], [IDINSYSTEM]) VALUES (3, N'UserManagement', N'Quản lý người dùng', N'UserManagement')
INSERT [dbo].[Security_Function] ([Id], [FunctionCode], [FunctionName], [IDINSYSTEM]) VALUES (4, N'GroupManagement', N'Quản lý nhóm sản phẩm', N'GroupManagement')
INSERT [dbo].[Security_Function] ([Id], [FunctionCode], [FunctionName], [IDINSYSTEM]) VALUES (5, N'CategoryManagement', N'Quản lý danh mục sản phẩm', N'CategoryManagement')
SET IDENTITY_INSERT [dbo].[Security_Function] OFF
SET IDENTITY_INSERT [dbo].[Security_Permission] ON 

INSERT [dbo].[Security_Permission] ([Id], [PermissionName], [Description], [TargetId]) VALUES (1, N'VIEW', N'Xem', 1)
INSERT [dbo].[Security_Permission] ([Id], [PermissionName], [Description], [TargetId]) VALUES (2, N'ADD', N'Thêm mới', 1)
INSERT [dbo].[Security_Permission] ([Id], [PermissionName], [Description], [TargetId]) VALUES (3, N'EDIT', N'Sửa', 1)
INSERT [dbo].[Security_Permission] ([Id], [PermissionName], [Description], [TargetId]) VALUES (4, N'DELETE', N'Xóa', 1)
SET IDENTITY_INSERT [dbo].[Security_Permission] OFF
SET IDENTITY_INSERT [dbo].[Security_Role] ON 

INSERT [dbo].[Security_Role] ([Id], [RoleName], [Description], [ParentRoleId], [Builtin]) VALUES (1, N'Admin', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Security_Role] OFF
SET IDENTITY_INSERT [dbo].[Security_RoleFunctionPermision] ON 

INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (31, 1, 1, 1)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (32, 1, 1, 2)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (33, 1, 1, 3)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (34, 1, 1, 4)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (35, 1, 2, 1)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (36, 1, 2, 2)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (37, 1, 2, 3)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (38, 1, 2, 4)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (39, 1, 3, 1)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (40, 1, 3, 2)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (41, 1, 3, 3)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (42, 1, 3, 4)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (43, 1, 4, 1)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (44, 1, 4, 2)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (45, 1, 4, 3)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (46, 1, 4, 4)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (47, 1, 5, 1)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (48, 1, 5, 2)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (49, 1, 5, 3)
INSERT [dbo].[Security_RoleFunctionPermision] ([Id], [RoleId], [FunctionId], [PermissionId]) VALUES (50, 1, 5, 4)
SET IDENTITY_INSERT [dbo].[Security_RoleFunctionPermision] OFF
SET IDENTITY_INSERT [dbo].[Security_UserPermission] ON 

INSERT [dbo].[Security_UserPermission] ([Id], [UserId], [PermissionId], [ObjectId]) VALUES (1, 1, 1, 1)
INSERT [dbo].[Security_UserPermission] ([Id], [UserId], [PermissionId], [ObjectId]) VALUES (2, 1, 2, 1)
INSERT [dbo].[Security_UserPermission] ([Id], [UserId], [PermissionId], [ObjectId]) VALUES (3, 1, 3, 1)
SET IDENTITY_INSERT [dbo].[Security_UserPermission] OFF
SET IDENTITY_INSERT [dbo].[Security_UserRole] ON 

INSERT [dbo].[Security_UserRole] ([Id], [UserId], [RoleId]) VALUES (1, 1, 1)
INSERT [dbo].[Security_UserRole] ([Id], [UserId], [RoleId]) VALUES (2, 2, 1)
SET IDENTITY_INSERT [dbo].[Security_UserRole] OFF
SET IDENTITY_INSERT [dbo].[System_Menu] ON 

INSERT [dbo].[System_Menu] ([MenuId], [ParentId], [Controller], [AliasUrl], [Permission], [Text], [MenuLevel], [Action], [MenuOrder], [Description], [ShowMenu], [Area]) VALUES (1, NULL, N'Admin', N'quan-tri-he-thong', 1, N'Quản trị hệ thống ', 1, NULL, 1, N'Quản trị hệ thống', 1, N'Admin')
INSERT [dbo].[System_Menu] ([MenuId], [ParentId], [Controller], [AliasUrl], [Permission], [Text], [MenuLevel], [Action], [MenuOrder], [Description], [ShowMenu], [Area]) VALUES (2, 1, N'RoleManagement', N'quan-ly-nhom-quyen', 1, N'Quản lý nhóm quyền', 2, NULL, 1, N'Quản lý nhóm quyền', 1, N'Admin')
INSERT [dbo].[System_Menu] ([MenuId], [ParentId], [Controller], [AliasUrl], [Permission], [Text], [MenuLevel], [Action], [MenuOrder], [Description], [ShowMenu], [Area]) VALUES (3, 1, N'DecentralizateManagement', N'quan-ly-phan-quyen', 1, N'Quản lý phân quyền', 2, NULL, 2, N'Quản lý phân quyền', 1, N'Admin')
INSERT [dbo].[System_Menu] ([MenuId], [ParentId], [Controller], [AliasUrl], [Permission], [Text], [MenuLevel], [Action], [MenuOrder], [Description], [ShowMenu], [Area]) VALUES (4, 1, N'UserManagement', N'quan-ly-nguoi-dung', 1, N'Quản lý người dùng', 2, NULL, 3, N'Quản lý người dùng', 1, N'Admin')
INSERT [dbo].[System_Menu] ([MenuId], [ParentId], [Controller], [AliasUrl], [Permission], [Text], [MenuLevel], [Action], [MenuOrder], [Description], [ShowMenu], [Area]) VALUES (5, 1, N'GroupManagement', N'quan-ly-nhom-san-pham', 1, N'Quản lý nhóm sản phẩm', 2, NULL, 4, N'Quản lý nhóm sản phẩm', 1, N'Admin')
INSERT [dbo].[System_Menu] ([MenuId], [ParentId], [Controller], [AliasUrl], [Permission], [Text], [MenuLevel], [Action], [MenuOrder], [Description], [ShowMenu], [Area]) VALUES (6, 1, N'CategoryManagement', N'quan-ly-danh-muc-san-pham', 1, N'Quản lý danh mục sản phẩm', 2, NULL, 5, N'Quản lý danh mục sản phẩm', 1, N'Admin')
SET IDENTITY_INSERT [dbo].[System_Menu] OFF
SET IDENTITY_INSERT [dbo].[System_User] ON 

INSERT [dbo].[System_User] ([UserId], [UserName], [Password], [Email], [Description], [Status], [CreatedDate], [CreatedBy], [CreatedById], [UpdatedDate], [UpdatedBy], [UpdatedById], [Salt], [LoginFailedCount], [FullName], [Tel], [Image], [UserType], [UserRole]) VALUES (1, N'admin', N'f3f6a4b0308844a86fe7331e69dc2e2e6d242c36633318d1445c5e8e8cf1f428', N'admin@gmail.com', N'Admin system', 1, CAST(N'2017-02-21 09:43:25.470' AS DateTime), N'SYSTEM', 1, CAST(N'2017-02-21 09:43:25.470' AS DateTime), N'SYSTEM', 1, N'4LEEosBHHmycGO/pmE+lv8wbJA6l10lerLHvnkHTei8=', 1, N'Admin', N'0985398170', NULL, 1, 1)
INSERT [dbo].[System_User] ([UserId], [UserName], [Password], [Email], [Description], [Status], [CreatedDate], [CreatedBy], [CreatedById], [UpdatedDate], [UpdatedBy], [UpdatedById], [Salt], [LoginFailedCount], [FullName], [Tel], [Image], [UserType], [UserRole]) VALUES (2, N'KaangKun', N'9f6a824fe59c926a6f2ca5bc8bea3edf6b45fc692f267ffbed76c016bb4b2506', N'phamkhang0705@gmail.com', NULL, 1, CAST(N'2019-03-02 03:02:48.063' AS DateTime), N'admin', 1, CAST(N'2019-03-02 03:02:48.090' AS DateTime), N'admin', 1, N'8Nk2ctosRwFEQZr20QyTVuBWvfpqY9dzxmweboPAmZ8=', NULL, N'Phạm Văn Khang', N'0985398170', NULL, NULL, 1)
SET IDENTITY_INSERT [dbo].[System_User] OFF
SET IDENTITY_INSERT [dbo].[Temp_Code] ON 

INSERT [dbo].[Temp_Code] ([Id], [Group], [Category]) VALUES (1, 1, 1)
SET IDENTITY_INSERT [dbo].[Temp_Code] OFF
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
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[41] 4[21] 2[11] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "OrderType"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 1
         End
         Begin Table = "ProductPrice"
            Begin Extent = 
               Top = 6
               Left = 246
               Bottom = 136
               Right = 416
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'Vw_CategoryPrice'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'Vw_CategoryPrice'
GO

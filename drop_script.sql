USE [thu86467_thuedotot]
GO
/****** Object:  View [dbo].[Vw_UserInfo]    Script Date: 19-04-2019 01:36:45 ******/
DROP VIEW [dbo].[Vw_UserInfo]
GO
/****** Object:  View [dbo].[Vw_Promotion]    Script Date: 19-04-2019 01:36:45 ******/
DROP VIEW [dbo].[Vw_Promotion]
GO
/****** Object:  View [dbo].[Vw_Product]    Script Date: 19-04-2019 01:36:45 ******/
DROP VIEW [dbo].[Vw_Product]
GO
/****** Object:  View [dbo].[Vw_Customer]    Script Date: 19-04-2019 01:36:45 ******/
DROP VIEW [dbo].[Vw_Customer]
GO
/****** Object:  View [dbo].[Vw_Core_User]    Script Date: 19-04-2019 01:36:45 ******/
DROP VIEW [dbo].[Vw_Core_User]
GO
/****** Object:  View [dbo].[Vw_CategoryPrice]    Script Date: 19-04-2019 01:36:45 ******/
DROP VIEW [dbo].[Vw_CategoryPrice]
GO
/****** Object:  View [dbo].[Vw_Category]    Script Date: 19-04-2019 01:36:45 ******/
DROP VIEW [dbo].[Vw_Category]
GO
/****** Object:  View [dbo].[Security_VwRoleService]    Script Date: 19-04-2019 01:36:45 ******/
DROP VIEW [dbo].[Security_VwRoleService]
GO
/****** Object:  Table [dbo].[Ward]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Ward]
GO
/****** Object:  Table [dbo].[Unit]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Unit]
GO
/****** Object:  Table [dbo].[Temp_Code]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Temp_Code]
GO
/****** Object:  Table [dbo].[System_User]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[System_User]
GO
/****** Object:  Table [dbo].[System_Menu]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[System_Menu]
GO
/****** Object:  Table [dbo].[Service]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Service]
GO
/****** Object:  Table [dbo].[Security_UserRole]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Security_UserRole]
GO
/****** Object:  Table [dbo].[Security_UserPermission]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Security_UserPermission]
GO
/****** Object:  Table [dbo].[Security_RoleFunctionPermision]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Security_RoleFunctionPermision]
GO
/****** Object:  Table [dbo].[Security_Role]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Security_Role]
GO
/****** Object:  Table [dbo].[Security_Permission]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Security_Permission]
GO
/****** Object:  Table [dbo].[Security_Function]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Security_Function]
GO
/****** Object:  Table [dbo].[Route]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Route]
GO
/****** Object:  Table [dbo].[Province]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Province]
GO
/****** Object:  Table [dbo].[PromotionUsed]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[PromotionUsed]
GO
/****** Object:  Table [dbo].[Promotion]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Promotion]
GO
/****** Object:  Table [dbo].[ProjectCategory]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[ProjectCategory]
GO
/****** Object:  Table [dbo].[Project]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Project]
GO
/****** Object:  Table [dbo].[ProductPrice]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[ProductPrice]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Product]
GO
/****** Object:  Table [dbo].[Page]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Page]
GO
/****** Object:  Table [dbo].[OrderType]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[OrderType]
GO
/****** Object:  Table [dbo].[NewsCategory]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[NewsCategory]
GO
/****** Object:  Table [dbo].[News]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[News]
GO
/****** Object:  Table [dbo].[Navbar]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Navbar]
GO
/****** Object:  Table [dbo].[MenuFE]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[MenuFE]
GO
/****** Object:  Table [dbo].[Media]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Media]
GO
/****** Object:  Table [dbo].[LanguageCategory]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[LanguageCategory]
GO
/****** Object:  Table [dbo].[Language]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Language]
GO
/****** Object:  Table [dbo].[GroupCategory]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[GroupCategory]
GO
/****** Object:  Table [dbo].[Group]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Group]
GO
/****** Object:  Table [dbo].[FileAttach]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[FileAttach]
GO
/****** Object:  Table [dbo].[District]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[District]
GO
/****** Object:  Table [dbo].[CustomerLevel]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[CustomerLevel]
GO
/****** Object:  Table [dbo].[CustomerDetail]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[CustomerDetail]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Customer]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Category]
GO
/****** Object:  Table [dbo].[Banner]    Script Date: 19-04-2019 01:36:45 ******/
DROP TABLE [dbo].[Banner]
GO
/****** Object:  Schema [thu86467_admin]    Script Date: 19-04-2019 01:36:45 ******/
DROP SCHEMA [thu86467_admin]
GO
/****** Object:  User [thu86467_admin]    Script Date: 19-04-2019 01:36:45 ******/
DROP USER [thu86467_admin]
GO
USE [master]
GO

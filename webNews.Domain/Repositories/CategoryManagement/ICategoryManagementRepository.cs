﻿using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Repositories.CategoryManagement
{
    public interface ICategoryManagementRepository : IRepository<Category>
    {
        PagingObject<Vw_Category> GetList(SearchCategoryModel filter, int pageIndex, int pageSize);

        bool CheckExist(string code);

        bool CreateCategory(Category category,List<GroupCategory> groupCategories,List<ProductPrice> productPrices, List<FileAttach> files);

        bool UpdateCategory(Category category, List<GroupCategory> groupCategories, List<ProductPrice> productPrices, List<FileAttach> files);

        bool Delete(int id);

        Vw_Category GetCateById(int id);

        Vw_Category GetByCode(string code);
        List<GroupCategory> GetGroupCategories(int cateId);
    }
}
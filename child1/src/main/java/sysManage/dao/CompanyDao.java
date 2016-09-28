package sysManage.dao;

import sysManage.model.CompanyEntity;

/**
 * author: zf
 * Date: 2016/9/28  16:59
 * Description:
 */
public interface CompanyDao {
    CompanyEntity getCompany(Integer id);
}

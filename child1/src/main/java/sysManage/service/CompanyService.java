package sysManage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sysManage.dao.CompanyDao;
import sysManage.model.CompanyEntity;

/**
 * author: zf
 * Date: 2016/9/28  16:59
 * Description:
 */
@Service
public class CompanyService {
    @Autowired
    private CompanyDao companyDao;

    public CompanyEntity getCompany(Integer id){
        return companyDao.getCompany(id);
    }

}

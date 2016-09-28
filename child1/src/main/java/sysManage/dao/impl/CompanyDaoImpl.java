package sysManage.dao.impl;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;
import sysManage.dao.CompanyDao;
import sysManage.model.CompanyEntity;

/**
 * author: zf
 * Date: 2016/9/28  16:59
 * Description:
 */
@Repository("companyDaoImpl")
public class CompanyDaoImpl implements CompanyDao{
    @Autowired
    private HibernateTemplate hibernateTemplate;

    public void a(){
        hibernateTemplate.getSessionFactory();
    }

    @Override
    public CompanyEntity getCompany(Integer id) {
        Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
        CompanyEntity load = session.load(CompanyEntity.class, 1);
        return load;
    }
}

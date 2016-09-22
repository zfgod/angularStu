package sysManage.dao.impl;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;
import sysManage.dao.UserDao;
import sysManage.dto.SearchConditions;
import sysManage.model.User;

import java.io.Serializable;
import java.util.List;


/**
 * author: zf
 * Date: 2016/8/24  17:31
 * Description:
 */
@Repository("userDaoImpl")
public class UserDaoImpl implements UserDao{
    @Autowired
    private HibernateTemplate hibernateTemplate;

    @Override
    public User findLoginUser() {
        return null;
    }

    @Override
    public Serializable saveUser(User user) {
        return hibernateTemplate.save(user);
    }

    @Override
    public List<User> findUserList(SearchConditions conditions) {
        SessionFactory sessionFactory = hibernateTemplate.getSessionFactory();
        Session session = sessionFactory.getCurrentSession();
        SQLQuery sqlQuery = session.createSQLQuery("select * from busers");
        return sqlQuery.addEntity(User.class).list();
    }
}

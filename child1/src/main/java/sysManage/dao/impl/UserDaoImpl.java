package sysManage.dao.impl;

import org.hibernate.*;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;
import sysManage.dao.UserDao;
import sysManage.dto.SearchConditions;
import sysManage.model.UsersEntity;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
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
    public UsersEntity findLoginUser() {
        return null;
    }

    @Override
    public Serializable saveUser(UsersEntity user) {
        user.setCreateTime(new Date());
        return hibernateTemplate.save(user);
    }

    @Override
    public List<UsersEntity> findUserList(SearchConditions conditions) {
         SessionFactory sessionFactory = hibernateTemplate.getSessionFactory();
         Session session = sessionFactory.getCurrentSession();
         Query q = session.getNamedQuery("userList");
         q.setProperties(conditions);
         q.setResultTransformer(Transformers.aliasToBean(UsersEntity.class));
//         q.setParameter("recordStart",conditions.getRecordStart());
//         q.setParameter("pageSize",conditions.getPageSize());
         return q.list();
    }
    @Override
    public long findUserListCount(SearchConditions conditions) {
        SessionFactory sessionFactory = hibernateTemplate.getSessionFactory();
        Session session = sessionFactory.getCurrentSession();
        Query q = session.getNamedQuery("userListCount");
        BigInteger bigInteger = (BigInteger) q.uniqueResult();
        return bigInteger.longValue();
    }

    @Override
    public int updateUser(UsersEntity user) {
        SessionFactory sessionFactory = hibernateTemplate.getSessionFactory();
        Session currentSession = sessionFactory.getCurrentSession();
        Query q = currentSession.getNamedQuery("updateUser");
/**  setProperties 较一个个参数的set更为智能，且user中的参数如果在sql中没有，不会出现错误  */
        user.setUpdateTime(new Date());
        q.setProperties(user);
//        q.setParameter("id", user.getId());
//        q.setParameter("remark", user.getRemark());
//        q.setParameter("age", user.getAge());
//        q.setParameter("updateTime", new Date());
//        q.setParameter("state",user.getState());//此参数 sql里并没有,会.QueryParameterException: could not locate named parameter [state]
        return q.executeUpdate();

    }
    @Override
    public UsersEntity getOne(Integer id) {
        Session currentSession = hibernateTemplate.getSessionFactory().getCurrentSession();
        String sql = "select * from users where Id = "+id;
        SQLQuery sqlQuery = currentSession.createSQLQuery(sql);
        return (UsersEntity) sqlQuery.addEntity(UsersEntity.class).list().get(0);
    }


}

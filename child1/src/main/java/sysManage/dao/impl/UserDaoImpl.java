package sysManage.dao.impl;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;
import sysManage.dao.UserDao;
import sysManage.dto.SearchConditions;
import sysManage.model.UsersEntity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import org.springframework.beans.BeanUtils;


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
        StringBuffer baseSql = new StringBuffer("select * from users where 1=1");
        if(conditions.getSearchName()!=null){
            baseSql.append(" and logName like '%").append(conditions.getSearchName()).append("%'");
        }
        if(conditions.getRecordStart()!=null && conditions.getPageSize()!=null){
            baseSql.append(" limit ").append(conditions.getRecordStart()).append(",").append(conditions.getPageSize());
        }
        System.out.println(" sql:"+baseSql.toString());
        SQLQuery sqlQuery = session.createSQLQuery(baseSql.toString());
        return sqlQuery.addEntity(UsersEntity.class).list();
    }
    @Override
    public long findUserListCount(SearchConditions conditions) {
        SessionFactory sessionFactory = hibernateTemplate.getSessionFactory();
        Session session = sessionFactory.getCurrentSession();
        StringBuffer baseSql = new StringBuffer("select * from users where 1=1");
        if(conditions.getSearchName()!=null){
            baseSql.append(" and logName like '%").append(conditions.getSearchName()).append("%'");
        }
        SQLQuery sqlQuery = session.createSQLQuery(baseSql.toString());
        return sqlQuery.list().size();
    }

    @Override
    public void updateUser(UsersEntity user) {
        String[] ignoreProperties= new String[]{"logPwd","createTime"};
        UsersEntity forEdit = new UsersEntity();
        BeanUtils.copyProperties(user,forEdit,ignoreProperties);
        hibernateTemplate.saveOrUpdate(forEdit);
    }

    @Override
    public UsersEntity getOne(Integer id) {
        Session currentSession = hibernateTemplate.getSessionFactory().getCurrentSession();
        String sql = "select * from users where Id = "+id;
        SQLQuery sqlQuery = currentSession.createSQLQuery(sql);
        return (UsersEntity) sqlQuery.addEntity(UsersEntity.class).list().get(0);
    }


}

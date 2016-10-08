package sysManage.dao.impl;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;
import sysManage.dao.UserRoleDao;
import sysManage.model.RolesEntity;
import sysManage.model.UsersEntity;

import java.util.Set;

/**
 * author: zf
 * Date: 2016/9/29  14:04
 * Description:
 */
@Repository
public class UserRoleDaoImpl implements UserRoleDao{
    @Autowired
    private HibernateTemplate hibernateTemplate;
    @Override
    public UsersEntity getUserWithRoles(Integer userId) {
        Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
        UsersEntity usersEntity = session.load(UsersEntity.class, 1);
        System.out.println(usersEntity.toString());
//        Set<RolesEntity> roles = usersEntity.getRoles();
//        System.out.println(roles.toString());
        return usersEntity;
    }
}

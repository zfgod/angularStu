package sysManage.dao.impl;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import sysManage.dao.UserDao;
import sysManage.model.User;

import javax.annotation.Resource;

/**
 * author: zf
 * Date: 2016/8/24  17:31
 * Description:
 */
@Repository("userDao")
public class UserDaoImpl implements UserDao{
    @Resource
    protected SessionFactory sessionFactory;

    @Override
    public User findLoginUser() {
        return null ;
    }
}

package sysManage.dao;

import sysManage.model.User;

import java.io.Serializable;
import java.util.List;

/**
 * author: zf
 * Date: 2016/8/24  17:29
 * Description:
 */

public interface UserDao{
     public User findLoginUser();

     Serializable saveUser(User user);

     List<User>  findUserList();
}

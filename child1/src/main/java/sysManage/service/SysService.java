package sysManage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sysManage.dao.UserDao;
import sysManage.model.User;

import java.io.Serializable;
import java.util.List;

/**
 * author: zf
 * Date: 2016/8/24  14:22
 * Description:
 */
@Service
public class SysService {

    @Autowired
    private UserDao userDaoimpl;

    public boolean findLoginUser(){

        return true;
    }

    public int saveUser(User user){
        Serializable serializable = userDaoimpl.saveUser(user);
        System.out.println(serializable);
        return 1;
    }

    public List<User> findUserList(){
        return userDaoimpl.findUserList();
    }

}

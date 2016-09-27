package sysManage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sysManage.dao.UserDao;
import sysManage.dto.SearchConditions;
import sysManage.model.UsersEntity;

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

    public int saveUser(UsersEntity user){
        Serializable serializable = userDaoimpl.saveUser(user);
        System.out.println(serializable);
        if(serializable!=null){
            return 1;
        }
        return 0;
    }

    public List<UsersEntity> findUserList(SearchConditions conditions){
        return userDaoimpl.findUserList(conditions);
    }

    public UsersEntity getOne(Integer id) {
        return userDaoimpl.getOne(id);
    }

    public long findUserListCount(SearchConditions conditions) {
        return userDaoimpl.findUserListCount(conditions);
    }

    public void updateUser(UsersEntity user) {
         userDaoimpl.updateUser(user);
    }
}

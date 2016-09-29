package sysManage.service;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sysManage.dao.UserRoleDao;
import sysManage.model.UsersEntity;

/**
 * author: zf
 * Date: 2016/9/29  14:00
 * Description:
 */

@Service
public class UserRoleService {
    @Autowired
    private UserRoleDao userRoleDao;
    public UsersEntity getUserWithRoles(Integer userId){

        UsersEntity userWithRoles = userRoleDao.getUserWithRoles(userId);

        return userWithRoles;
    }
}

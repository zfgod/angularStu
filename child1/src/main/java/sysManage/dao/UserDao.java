package sysManage.dao;

import sysManage.dto.SearchConditions;
import sysManage.model.UsersEntity;

import java.io.Serializable;
import java.util.List;

/**
 * author: zf
 * Date: 2016/8/24  17:29
 * Description:
 */

public interface UserDao{
     public UsersEntity findLoginUser();

     Serializable saveUser(UsersEntity user);

     List<UsersEntity>  findUserList(SearchConditions conditions);

     UsersEntity getOne(Integer id);

     long findUserListCount(SearchConditions conditions);

     void updateUser(UsersEntity user);
}

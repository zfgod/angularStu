package sysManage.dao;

import sysManage.model.UsersEntity;

/**
 * author: zf
 * Date: 2016/9/29  14:04
 * Description:
 */
public interface UserRoleDao {
    UsersEntity getUserWithRoles(Integer userId);
}

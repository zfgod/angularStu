package sysManage.service;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import sysManage.model.RolesEntity;
import sysManage.model.UsersEntity;

import java.util.Set;

import static org.junit.Assert.*;

/**
 * author: zf
 * Date: 2016/9/29  14:10
 * Description:
 */
public class UserRoleServiceTest {
    private UserRoleService userRoleService;
    @Before
    public void setUp(){
        ApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");
        userRoleService = (UserRoleService) context.getBean("userRoleService");
    }
    @Test
    public void testGetUserWithRoles() throws Exception {
        UsersEntity userWithRoles = userRoleService.getUserWithRoles(1);
        Set<RolesEntity> roles = userWithRoles.getRoles();
        for (RolesEntity role : roles) {
            System.out.println(role.toString());
        }
        System.out.println(userWithRoles);
    }
}
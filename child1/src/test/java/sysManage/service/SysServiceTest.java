package sysManage.service;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import sysManage.dto.SearchConditions;
import sysManage.model.UsersEntity;

import java.util.List;

/**
 * author: zf
 * Date: 2016/9/21  17:40
 * Description:
 */
public class SysServiceTest {

    private SysService sysService;
    @Before
    public void setUp(){
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        sysService = (SysService) context.getBean("sysService");
    }

    @Test
    public void testFindLoginUser() throws Exception {
        UsersEntity one = sysService.getOne(1);
        System.out.println(one);
    }

    @Test
    public void testUpdateUser() throws Exception {
        UsersEntity u = new UsersEntity(2,"admin","aa",20,"测试备注2",1);
        int i = sysService.updateUser(u);
        System.out.println(i);
    }
    @Test
    public void testUserList(){
        SearchConditions conditions = new SearchConditions();
        conditions.setPageSize(3);
        List<UsersEntity> userList = sysService.findUserList(conditions);
//        long userListCount = sysService.findUserListCount(conditions);
        for (UsersEntity usersEntity : userList) {
            System.out.println(usersEntity);
        }
        System.out.println(userList.toString());
//        System.out.println(userListCount);
    }
}
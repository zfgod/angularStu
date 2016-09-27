package sysManage.service;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

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

    }



}
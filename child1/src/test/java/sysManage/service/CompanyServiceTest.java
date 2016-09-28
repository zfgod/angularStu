package sysManage.service;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import sysManage.model.CompanyEntity;

import java.util.Collections;

import static org.junit.Assert.*;

/**
 * author: zf
 * Date: 2016/9/28  18:11
 * Description:
 */
public class CompanyServiceTest {
    private CompanyService companyService;
    @Before
    public void setUp(){
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        companyService = (CompanyService) context.getBean("companyService");
    }
    @Test
    public void testGetCompany() throws Exception {
        CompanyEntity company = companyService.getCompany(1);
        System.out.println(company.toString());
    }
}
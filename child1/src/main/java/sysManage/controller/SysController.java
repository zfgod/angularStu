package sysManage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import sysManage.service.SysService;

/**
 * author: zf
 * Date: 2016/8/22  11:52
 * Description:
 */
@Controller
@RequestMapping("/sys")
public class SysController {
    @Autowired
    private SysService sysService;


    @RequestMapping(method = {RequestMethod.GET,RequestMethod.POST},value = "/login")
    public String login(ModelAndView model){
        System.out.println("进入登录。。。");
        model.addObject("code",200);
        return "manage/login";
    }
    @RequestMapping(method = {RequestMethod.GET,RequestMethod.POST},value = "/html")
    public ModelAndView loginOut(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("h5");
        System.out.println("进入登录。。。");
        mv.addObject("code",200);
        return mv;
    }

}

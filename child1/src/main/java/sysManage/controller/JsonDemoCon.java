package sysManage.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sysManage.dto.SearchConditions;
import sysManage.model.User;
import sysManage.service.SysService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * author: zf
 * Date: 2016/8/24  16:21
 * Description:　　h5+angular+json
 */
@Controller
@RequestMapping("/json")
public class JsonDemoCon  extends  BaseController{
    @Autowired
    private SysService sysService;

    @RequestMapping("/user")
    @ResponseBody
    public Object getData(){
        List<User> a = new ArrayList<>();
        a.add(new User("a","b","c"));
        JSONObject result = new JSONObject();
        result.put("users",a);
        result.put("count",3);
        return result;
    }

    @RequestMapping(value = "/addUser",method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public Object commitData(@RequestBody User user){
        JSONObject result = new JSONObject();
        System.out.println(user);
        int i = sysService.saveUser(user);
        if(i!=0){
            result.put("msg","添加成功！");
            result.put("code",1);
        }else {
            result.put("msg","添加失败！");
            result.put("code",-1);
        }
        return result;
    }
//  用户分页
    @RequestMapping(value = "/userList",method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public Object getList(SearchConditions conditions){
        Integer pageIndex = conditions.getPageIndex();
        Integer pageSize = conditions.getPageSize();
        System.out.println(conditions);
        JSONObject result = new JSONObject();
        System.out.println(conditions);
        List<User> userList = sysService.findUserList(conditions);
        result.put("conditions",conditions.toString());
        int size = userList.size();
        return returnPageResult(result,pageSize,pageIndex,size,userList);
    }

    @RequestMapping(value = "/oneDetail")
    @ResponseBody
    public Object getOne(@RequestParam("id")Integer id){
        System.out.println(id);
        JSONObject result = new JSONObject();
        User user = new User(id, "itsName", "itsPwd", "itsToken");
        user.setState(1);
        user.setAge(25);
        result.put("user",user);
        result.put("code",200);
        user.setCreateTime(new Date());
        return result;
    }
//  要求Json格式提交 ： @RequestBody, contentType:application/json
    @RequestMapping(value = "/editUser")
    @ResponseBody
    public Object editUser(@RequestBody User user){
        System.out.println(user.getCreateTimeString());
        System.out.println(user);
        JSONObject result = new JSONObject();
        result.put("msg","修改成功！");
        result.put("code",200);
        return result;
    }
//  表单提交:contentType:application/x-www-form-urlencoded
    @RequestMapping(value = "/editUserInForm")
    @ResponseBody
    public Object editUserInForm(User user){
        System.out.println(user);
        JSONObject result = new JSONObject();
        result.put("msg","修改成功！");
        result.put("code",200);
        return result;
    }
    public static void main(String[] args) {
        List<User> a = new ArrayList<>();
        a.add(new User("a","b","c"));
        JSONObject result = new JSONObject();
        result.put("users",a);
        result.put("count",3);
        System.out.println(result.toJSONString());
        System.out.println(result.toString());
    }

}

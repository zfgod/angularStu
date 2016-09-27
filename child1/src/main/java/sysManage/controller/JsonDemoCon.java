package sysManage.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sysManage.dto.SearchConditions;
import sysManage.model.UsersEntity;
import sysManage.service.SysService;

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
//        List<UserEntity> a = new ArrayList<>();
//        a.add(new UserEntity("a","b","c"));
        JSONObject result = new JSONObject();
//        result.put("users",a);
//        result.put("count",3);
        return result;
    }

    @RequestMapping(value = "/addUser",method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public Object commitData(@RequestBody UsersEntity user){
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
        List<UsersEntity> userList = sysService.findUserList(conditions);
        long  total = sysService.findUserListCount(conditions);
        result.put("conditions",conditions.toString());
        return returnPageResult(result,pageSize,pageIndex,total,userList);
    }

    @RequestMapping(value = "/oneDetail")
    @ResponseBody
    public Object getOne(@RequestParam("id")Integer id){
        System.out.println(id);
        JSONObject result = new JSONObject();
        UsersEntity user = sysService.getOne(id);
        result.put("user",user);
        result.put("code",200);

        return result;
    }
//  要求Json格式提交 ： @RequestBody, contentType:application/json
    @RequestMapping(value = "/editUser")
    @ResponseBody
    public Object editUser(@RequestBody UsersEntity user){
        JSONObject result = new JSONObject();
        sysService.updateUser(user);
        result.put("msg","修改成功！");
        result.put("code",200);
        return result;
    }
//  表单提交:contentType:application/x-www-form-urlencoded
    @RequestMapping(value = "/editUserInForm")
    @ResponseBody
    public Object editUserInForm(UsersEntity user){
        System.out.println(user);
        JSONObject result = new JSONObject();
        result.put("msg","修改成功！");
        result.put("code",200);
        return result;
    }
    public static void main(String[] args) {

    }

}

package sysManage.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ModelAttribute;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;


/**
 * Created by zf 2015/12/14.
 * controller 基础类
 * 注入request response session
 */
public class BaseController {
    protected HttpSession session;
    protected HttpServletRequest request;
    protected HttpServletResponse response;
    @ModelAttribute()
    public  void setHttpObjects(HttpSession session,
                                HttpServletRequest request,
                                HttpServletResponse response)
    {
        this.request = request;
        this.response = response;
        this.session = session;
    }

    /**
     * 对分页信息的封装
     * @Author zhangfan
     */
    public JSONObject returnPageResult(JSONObject result,int pageSize,int pageIndex,
                                       long total,List items){
        result.put("code",200);
        result.put("total_count",total);
        result.put("total_page",total%pageSize==0?total/pageSize:total/pageSize+1);
        result.put("page_size",pageSize);
        result.put("page",pageIndex);
        result.put("prev_page",pageIndex>=2?pageIndex-1:1);
        result.put("items",items);
        return result;
    }


    /**
     * bean校验信息封装
     */
    public String returnFieldErrors(BindingResult errorsResult){
            List<FieldError>  filedErrors= errorsResult.getFieldErrors();
            StringBuffer errorMsgs = new StringBuffer();
            for(FieldError error:filedErrors){
                errorMsgs.append(error.getDefaultMessage());
            }
            JSONObject result = new JSONObject();
//            result.put(ParameterUtils.RESP_CODE,ParameterUtils.HTTP_ERROR);
//            result.put(ParameterUtils.RESP_MSG,errorMsgs);
            return JSON.toJSONString(result);
    }







}

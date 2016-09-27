package hibernate;

import org.springframework.beans.BeanUtils;
import sysManage.model.UsersEntity;

/**
 * author: zf
 * Date: 2016/9/27  18:28
 * Description:
 */
public class BeanUtilsStu {
    public static void main(String[] args) {
        UsersEntity commit = new UsersEntity(1,"admin","21232f297a57a5a743894a0e4a801fc3",
                    25,"dd",1);
        UsersEntity forEdit = new UsersEntity();
        String[] ignoreProperties= new String[]{"logPwd"};
        BeanUtils.copyProperties(commit,forEdit,ignoreProperties);
        System.out.println(forEdit);
    }
}

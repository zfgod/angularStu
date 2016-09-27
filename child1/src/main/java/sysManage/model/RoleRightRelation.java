package sysManage.model;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: guoshubo
 * Date: 2015/12/9
 * Time: 14:40
 * Description：角色权限关系表
 */
@Entity
@Table(name="role_right_relation")
public class RoleRightRelation implements Serializable{
    private static final long serialVersionUID = 3892130113617008417L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;
    @Column(name="RoleId")
    private  Integer roleId;
    @Column(name="RightId")
    private Integer rightId;
    @Column(name="Remark")
    @Length(max=500)
    private  String remark;
    @Column(name="State")
    private  Integer state;
    @Column(name="Sort")
    private  Integer sort;
    @Column(name="CreateTime")
    private  Date  createTime;
    @Column(name="UpdateTime")
    private  Date updateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public Integer getRightId() {
        return rightId;
    }

    public void setRightId(Integer rightId) {
        this.rightId = rightId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        return "RoleRightRelation{" +
                ", id="+id+
                ", roleId="+roleId+
                ", remark="+remark+
                ", state="+state+
                ", sort="+sort+
                ", createTime="+createTime+
                ", updateTime="+updateTime+
                "}";
    }
}




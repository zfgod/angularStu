package sysManage.model;

import javax.persistence.*;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * author: zf
 * Date: 2016/8/24  16:35
 * Description:
 */

@Table(name="busers")
@Entity
public class User implements Serializable{

    private static final long serialVersionUID = -4106414873169200851L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    @Column(name = "LogName")
    private String logName;
    @Column(name = "LogPwd")
    private String logPwd;
// 没改数据库，暂用remark,sort
    @Column(name = "Remark")
    private String logToken;
    @Column(name = "Sort")
    private Integer age;
    @Column(name = "CreateTime")
    private Date createTime;
    @Column(name = "State")
    private Integer state;
    @Transient
    private String createTimeString;
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", logName='" + logName + '\'' +
                ", logPwd='" + logPwd + '\'' +
                ", logToken='" + logToken + '\'' +
                ", age=" + age +
                ", createTime=" + createTime +
                '}';
    }

    public String getCreateTimeString() {

        return createTimeString;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public void setCreateTimeString(String createTimeString) throws ParseException {
        this.createTimeString = createTimeString;
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = format.parse(createTimeString);
        this.createTime = date;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLogName() {
        return logName;
    }

    public void setLogName(String logName) {
        this.logName = logName;
    }

    public String getLogPwd() {
        return logPwd;
    }

    public void setLogPwd(String logPwd) {
        this.logPwd = logPwd;
    }

    public String getLogToken() {
        return logToken;
    }

    public void setLogToken(String logToken) {
        this.logToken = logToken;
    }

    public User() {
    }

    public User(String logName, String logPwd, String logToken) {
        this.logName = logName;
        this.logPwd = logPwd;
        this.logToken = logToken;
    }
    public User(Integer id,String logName, String logPwd, String logToken) {
        this.id = id;
        this.logName = logName;
        this.logPwd = logPwd;
        this.logToken = logToken;
    }

    public User(Integer id,String logName, String logPwd, String logToken, Integer age) {
        this.id = id;
        this.logName = logName;
        this.logPwd = logPwd;
        this.logToken = logToken;
        this.age = age;
    }

    public User(Integer id,String logName, String logPwd, String logToken, Integer age,Integer state) {
        this.id = id;
        this.logName = logName;
        this.logPwd = logPwd;
        this.logToken = logToken;
        this.age = age;
        this.state =state;
    }
}

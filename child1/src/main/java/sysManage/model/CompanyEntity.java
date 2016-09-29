package sysManage.model;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;

/**
 * author: zf
 * Date: 2016/9/27  16:46
 * Description:
 */
@Entity
@Table(name = "company", schema = "", catalog = "basesys")
public class CompanyEntity {
    private int id;
    private String agencyNumber;
    private Integer agencyLevel;
    private String companyName;
    private Integer companyType;
    private Integer companyAreaId;
    private String abbrName;
    private String companyUrl;
    private String manager;
    private String email;
    private String phone;
    private String telephone;
    private String remark;
    private Integer state;
    private Integer sort;
    private Date createTime;
    private Date updateTime;
    
    private Set<DepartmentEntity> departments;

    @Override
    public String toString() {
        return "CompanyEntity{" +
                "id=" + id +
                ", agencyNumber='" + agencyNumber + '\'' +
                ", agencyLevel=" + agencyLevel +
                ", companyName='" + companyName + '\'' +
                ", companyType=" + companyType +
                ", companyAreaId=" + companyAreaId +
                ", abbrName='" + abbrName + '\'' +
                ", companyUrl='" + companyUrl + '\'' +
                ", manager='" + manager + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", telephone='" + telephone + '\'' +
                ", remark='" + remark + '\'' +
                ", state=" + state +
                ", sort=" + sort +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", departments=" + departments +
                '}';
    }

    public Set<DepartmentEntity> getDepartments() {
        return departments;
    }

    public void setDepartments(Set<DepartmentEntity> departments) {
        this.departments = departments;
    }

    @Id
    @Column(name = "Id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "AgencyNumber")
    public String getAgencyNumber() {
        return agencyNumber;
    }

    public void setAgencyNumber(String agencyNumber) {
        this.agencyNumber = agencyNumber;
    }

    @Basic
    @Column(name = "AgencyLevel")
    public Integer getAgencyLevel() {
        return agencyLevel;
    }

    public void setAgencyLevel(Integer agencyLevel) {
        this.agencyLevel = agencyLevel;
    }

    @Basic
    @Column(name = "CompanyName")
    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    @Basic
    @Column(name = "CompanyType")
    public Integer getCompanyType() {
        return companyType;
    }

    public void setCompanyType(Integer companyType) {
        this.companyType = companyType;
    }

    @Basic
    @Column(name = "CompanyAreaId")
    public Integer getCompanyAreaId() {
        return companyAreaId;
    }

    public void setCompanyAreaId(Integer companyAreaId) {
        this.companyAreaId = companyAreaId;
    }

    @Basic
    @Column(name = "AbbrName")
    public String getAbbrName() {
        return abbrName;
    }

    public void setAbbrName(String abbrName) {
        this.abbrName = abbrName;
    }

    @Basic
    @Column(name = "CompanyUrl")
    public String getCompanyUrl() {
        return companyUrl;
    }

    public void setCompanyUrl(String companyUrl) {
        this.companyUrl = companyUrl;
    }

    @Basic
    @Column(name = "Manager")
    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    @Basic
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "Phone")
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "Telephone")
    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Basic
    @Column(name = "State")
    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    @Basic
    @Column(name = "Sort")
    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    @Basic
    @Column(name = "CreateTime")
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Basic
    @Column(name = "UpdateTime")
    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CompanyEntity that = (CompanyEntity) o;

        if (id != that.id) return false;
        if (agencyNumber != null ? !agencyNumber.equals(that.agencyNumber) : that.agencyNumber != null) return false;
        if (agencyLevel != null ? !agencyLevel.equals(that.agencyLevel) : that.agencyLevel != null) return false;
        if (companyName != null ? !companyName.equals(that.companyName) : that.companyName != null) return false;
        if (companyType != null ? !companyType.equals(that.companyType) : that.companyType != null) return false;
        if (companyAreaId != null ? !companyAreaId.equals(that.companyAreaId) : that.companyAreaId != null)
            return false;
        if (abbrName != null ? !abbrName.equals(that.abbrName) : that.abbrName != null) return false;
        if (companyUrl != null ? !companyUrl.equals(that.companyUrl) : that.companyUrl != null) return false;
        if (manager != null ? !manager.equals(that.manager) : that.manager != null) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (phone != null ? !phone.equals(that.phone) : that.phone != null) return false;
        if (telephone != null ? !telephone.equals(that.telephone) : that.telephone != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (state != null ? !state.equals(that.state) : that.state != null) return false;
        if (sort != null ? !sort.equals(that.sort) : that.sort != null) return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;
        if (updateTime != null ? !updateTime.equals(that.updateTime) : that.updateTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (agencyNumber != null ? agencyNumber.hashCode() : 0);
        result = 31 * result + (agencyLevel != null ? agencyLevel.hashCode() : 0);
        result = 31 * result + (companyName != null ? companyName.hashCode() : 0);
        result = 31 * result + (companyType != null ? companyType.hashCode() : 0);
        result = 31 * result + (companyAreaId != null ? companyAreaId.hashCode() : 0);
        result = 31 * result + (abbrName != null ? abbrName.hashCode() : 0);
        result = 31 * result + (companyUrl != null ? companyUrl.hashCode() : 0);
        result = 31 * result + (manager != null ? manager.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (phone != null ? phone.hashCode() : 0);
        result = 31 * result + (telephone != null ? telephone.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        result = 31 * result + (state != null ? state.hashCode() : 0);
        result = 31 * result + (sort != null ? sort.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (updateTime != null ? updateTime.hashCode() : 0);
        return result;
    }

}

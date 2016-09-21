app.controller("affcheAddCtrl", ["$scope", "SysNoticeFty", function (e, a) {
    e.title = "", e.content = "", e.state = !0, e.postEdit = function () {
        ycui.loading.show(), a.addNotice({
            title: e.title,
            content: e.content,
            state: e.state ? 0 : -1
        }).success(function (e) {
            ycui.loading.hide(), e && 200 == e.code && ycui.alert({
                content: e.msg, okclick: function () {
                    location.replace("afficheManage.html")
                }
            })
        })
    }, $(".affcheIncreaseForm").validate({
        rules: {myTitle: "required", myContent: "required"},
        messages: {myTitle: "请输入公告名称", myContent: "请输入公告内容"},
        errorClass: "error-span",
        errorElement: "span",
        submitHandler: function (a) {
            e.postEdit()
        }
    })
}]), app.controller("affcheEditCtrl", ["$scope", "$http", "SysNoticeFty", function (e, a, t) {
    var r = getSearch("id");
    ycui.loading.show(), t.edit({id: r}).success(function (a) {
        ycui.loading.hide(), a && (e.title = a.title, e.content = a.content, e.isEmail = a.isEmail, e.companyId = a.companyId, e.departmentId = a.departmentId, e.important = a.important, e.showDate = a.showDate, e.publishUser = a.publishUser, e.state = 0 == a.state, e.sort = a.sort, e.createTime = a.createTime, e.updateTime = a.updateTime)
    }), e.postEdit = function () {
        t.updateNotice({
            id: r,
            title: e.title,
            content: e.content,
            state: e.state ? 0 : -1,
            isEmail: e.isEmail,
            companyId: e.companyId,
            departmentId: e.departmentId,
            important: e.important,
            publishUser: e.publishUser
        }).success(function (e) {
            e && 200 == e.code && ycui.alert({
                content: e.msg, okclick: function () {
                    location.replace("afficheManage.html")
                }, timeout: -1
            })
        })
    }, $(".affcheCompileForm").validate({
        rules: {userName: "required", myContent: "required"},
        messages: {userName: "请输入公告名称", myContent: "请输入公告内容"},
        errorClass: "error-span",
        errorElement: "span",
        submitHandler: function (a) {
            e.postEdit()
        }
    })
}]), app.controller("afficheManageCtrl", ["$scope", "$http", "SysNoticeFty", function (e, a, t) {
    ycui.loading.show();
    var r = 10;
    modView = function (a) {
        ycui.loading.hide(), a && (e.page_size = a.page_size, e.prev_page = a.prev_page, e.total_page = a.total_page, e.items = a.items, e.page = a.page, e.total_count = a.total_count)
    };
    var n = new Date;
    e.endTime = n.dateFormat(), e.startTime = n.calendar(1, -7).dateFormat(), t.noticeList({
        pageSize: r,
        startTime: e.startTime + " 00:00:00",
        endTime: e.endTime + " 23:59:59"
    }).success(modView), e.ruleId = getSearch("ruleId"), e.search = "", e.go = "", e.redirect = function (a, n) {
        n && (e.search = n);
        var o = {pageSize: r, pageIndex: a || 1};
        e.search && (o.searchConext = e.search), e.startTime && (o.startTime = e.startTime + " 00:00:00"), e.endTime && (o.endTime = e.endTime + " 23:59:59"), t.noticeList(o).success(modView)
    }, e["delete"] = function (e) {
        ycui.confirm({
            content: "您确定要删除么", okclick: function () {
                t.removeNotice({id: e}).success(function (e) {
                    e && ycui.alert({
                        content: e.msg, okclick: function () {
                            location.replace("afficheManage.html")
                        }
                    })
                })
            }
        })
    };
    new pickerDateRange("dateRangeAff", {
        defaultText: " 至 ",
        isSingleDay: !1,
        stopToday: !1,
        calendars: 2,
        startDate: e.startTime,
        endDate: e.endTime,
        inputTrigger: "dateRange",
        success: function (a) {
            e.startTime = a.startDate, e.endTime = a.endDate;
            var n = {pageSize: r, pageIndex: 1};
            e.search && (n.searchConext = e.search), e.startTime && (n.startTime = e.startTime + " 00:00:00"), e.endTime && (n.endTime = e.endTime + " 23:59:59"), t.noticeList(n).success(modView)
        }
    })
}]), app.controller("companyAddCtrl", ["$scope", "$http", "SysCompanyFty", "DictionaryFty", function (e, a, t, r) {
    e.companyName = "", e.companyUrl = "http://", e.manager = "", e.phone = "", e.remark = "", e.abbrName = "", e.companyTypeList = [{
        name: "总公司",
        id: 1
    }, {name: "分公司", id: 2}], e.companyType = 0, e.email = "", e.updateCompanyType = function (a) {
        e.companyType = a, 1 == a ? e.companyAreaId = 0 : e.companyAreaId = -1
    }, r.provinceListForCompany().success(function (a) {
        e.areaList = a
    }), e.getAreaId = function (a) {
        e.companyAreaId = a, $(".selectArea").parent().find(".error-message").remove()
    }, e.postEdit = function () {
        var a, r = !0;
        0 == e.companyType && (a = $(".select-companyType").parent(), a.find(".error-message").size() <= 0 && a.append('<span class="error-message">请选择公司类型</span>'), r = !1), -1 == e.companyAreaId && (a = $(".selectArea").parent(), a.find(".error-message").size() <= 0 && a.append('<span class="error-message">请选择所属地域</span>'), r = !1), $(".companyIncreasedForm").valid() || (r = !1), r && (ycui.loading.show(), t.companyAdd({
            companyName: e.companyName,
            companyUrl: e.companyUrl,
            manager: e.manager,
            phone: e.phone,
            remark: e.remark,
            abbrName: e.abbrName,
            companyType: e.companyType,
            companyAreaId: e.companyAreaId,
            email: e.email
        }).success(function (e) {
            ycui.loading.hide(), e.code && 200 == e.code && ycui.alert({
                content: e.msg, okclick: function () {
                    location.replace("companyManage.html")
                }, timeout: -1
            })
        }))
    }, ycui.select(".yc-select"), $(".companyIncreasedForm").validate({
        rules: {
            userName: "required",
            companyName: {required: !0},
            myUrl: {required: !0, url: !0},
            companyPerson: "required",
            myPhone: {required: !0, phone: !0},
            myEmail: {required: !0, email: !0}
        },
        messages: {
            userName: "请输入公司名称",
            companyName: {required: "请输入公司简称"},
            myUrl: {required: "请输入网址"},
            companyPerson: "请输入公司负责人",
            myPhone: {required: "请输入联系电话"},
            myEmail: {required: "请输入邮箱"}
        },
        errorClass: "error-span",
        errorElement: "span"
    })
}]), app.controller("companyEditCtrl", ["$scope", "$http", "SysCompanyFty", "DictionaryFty", function (e, a, t, r) {
    id = getSearch("id"), e.companyType = "", e.companyTypeList = [{name: "总公司", id: 1}, {
        name: "分公司",
        id: 2
    }], ycui.loading.show(), t.companyEditInfo({id: id}).success(function (a) {
        ycui.loading.hide(), a && (e.companyName = a.companyName, e.abbrName = a.abbrName, e.companyUrl = a.companyUrl, e.manager = a.manager, e.phone = a.phone, e.companyType = a.companyType, e.email = a.email, e.companyAreaId = a.companyAreaId, setTimeout(function () {
            $("input[type=radio]").each(function (a, t) {
                e.companyAreaId == a + 1 && $(this).prop("checked", "checked")
            })
        }, 200))
    }), e.updateCompanyType = function (a) {
        e.companyType = a, 1 == a ? e.companyAreaId = 0 : e.companyAreaId = -1
    }, r.provinceListForCompany().success(function (a) {
        e.areaList = a
    }), e.getAreaId = function (a) {
        e.companyAreaId = a, $(".selectArea").parent().find(".error-message").remove()
    }, e.postEdit = function () {
        var a, r = !0;
        "" == e.companyType && (a = $(".select-companyType").parent(), a.find(".error-message").size() <= 0 && a.append("<span class='error-message'>请选择客户类型</span>"), r = !1), -1 == e.companyAreaId && (a = $(".selectArea").parent(), a.find(".error-message").size() <= 0 && a.append('<span class="error-message">请选择所属地域</span>'), r = !1), $(".companyCompileForm").valid() || (r = !1), r && t.companyEdit({
            id: id,
            companyName: e.companyName,
            abbrName: e.abbrName,
            companyUrl: e.companyUrl,
            manager: e.manager,
            phone: e.phone,
            companyType: e.companyType,
            companyAreaId: e.companyAreaId,
            email: e.email
        }).success(function (e) {
            200 == e.code && ycui.alert({
                content: e.msg, okclick: function () {
                    location.replace("companyManage.html")
                }
            })
        })
    }, $(".companyCompileForm").validate({
        rules: {
            userName: "required",
            companyName: {required: !0},
            myUrl: {required: !0, url: !0},
            companyPerson: "required",
            myPhone: {required: !0, phone: !0},
            myEmail: {required: !0, email: !0}
        },
        messages: {
            userName: "请输入公司名称",
            companyName: {required: "请输入公司简称"},
            myUrl: {required: "请输入网址"},
            companyPerson: "请输入公司负责人",
            myPhone: {required: "请输入联系电话"},
            myEmail: {required: "请输入邮箱"}
        },
        errorClass: "error-span",
        errorElement: "span"
    }), ycui.select(".yc-select")
}]), app.controller("companyManageCtrl", ["$scope", "$http", "SysCompanyFty", function (e, a, t) {
    ycui.loading.show();
    var r = 10, n = function (a) {
        ycui.loading.hide(), a && (e.page_size = a.page_size, e.prev_page = a.prev_page, e.total_page = a.total_page, e.items = a.items, e.page = a.page, e.total_count = a.total_count)
    };
    t.companyPageList({pageSize: r}).success(n), e.search = "", e.go = "", e.redirect = function (a, o) {
        if (a) {
            o && (e.search = o);
            var i = {pageSize: r, pageIndex: a};
            e.search && (i.companyNameOrAbbr = e.search), t.companyPageList(i).success(n)
        }
    }
}]), app.controller("contractTolerantAddCtrl", ["$scope", "$http", "SysContractTolerantFty", function (e, a, t) {
    t.contractTolerantCurrent().success(function (a) {
        a ? (e._cache = angular.copy(a), e.tolerantRule = a.tolerantRule, e.tolerant = 100 * a.tolerant, e.tolerantMoney = a.tolerantMoney) : e.tolerantRule = 1
    }), e.updateSelect = function (a, t) {
        e[a] = t
    }, e.postEdit = function () {
        return e.tolerant == 100 * e._cache.tolerant && e.tolerantMoney == e._cache.tolerantMoney && e.tolerantRule == e._cache.tolerantRule ? void ycui.alert({content: "数据没有修改，请修改后提交！"}) : (ycui.loading.show(), void t.contractTolerantAdd({
            tolerant: .01 * e.tolerant,
            tolerantMoney: e.tolerantMoney,
            tolerantRule: e.tolerantRule
        }).success(function (e) {
            ycui.loading.hide(), e && 200 == e.code && ycui.alert({
                content: e.msg, timeout: -1, okclick: function () {
                    location.replace("contractTolerantManage.html")
                }
            })
        }))
    }, ycui.select(".yc-select"), $(".contractTolerantIncreasedForm").validate({
        rules: {
            tolerant: "required",
            tolerantMoney: "required"
        }, messages: {tolerant: "请输入比率", tolerantMoney: "请输入绝对值"}, errorClass: "error-span", errorElement: "span"
    })
}]), app.controller("contractTolerantCtrl", ["$scope", "$http", "SysContractTolerantFty", function (e, a, t) {
    ycui.loading.show(), t.contractTolerantCurrent().success(function (a) {
        a && (e.tolerantRule = a.tolerantRule, e.currentTolerant = a.tolerant, e.currentTolerantMoney = a.tolerantMoney)
    });
    var r = 10, n = function (a) {
        ycui.loading.hide(), e.page_size = a.page_size, e.prev_page = a.prev_page, e.total_page = a.total_page, e.items = a.items, e.page = a.page, e.total_count = a.total_count
    };
    t.contractTolerantList({pageSize: r}).success(n), e.redirect = function (e) {
        var a = {pageSize: r, pageIndex: e || 1};
        t.contractTolerantList(a).success(n)
    }
}]), app.filter("tolerantRuleFtr", function () {
    return function (e) {
        switch (e) {
            case 1:
                return "就低原则";
            case 2:
                return "就高原则"
        }
    }
}), app.controller("departmentAddCtrl", ["$scope", "$http", "SysDepartmentFty", "$q", function (e, a, t, r) {
    e.deListId = -1;
    var n = t.departmentListForDep().success(function (a) {
        e.deList = a.companyList
    });
    r.all([n]).then(function () {
        var a = e.deList;
        e.fitterSelectC = function (t) {
            var r = [];
            e.fitterC ? (a.forEach(function (a) {
                -1 != a[t].indexOf(e.fitterC) && r.push(a)
            }), e.deList = r) : e.deList = a
        }
    }), e.updateDe = function (a) {
        e.deListId = a, $(".select-deType").parent().find(".error-message").remove()
    }, e.postEdit = function () {
        var a, r = $(".departmentIncreasedForm").valid();
        -1 == e.deListId && (a = $(".select-deType").parent(), a.find(".error-message").size() <= 0 && a.append('<span class="error-message">请选择公司</span>'), r = !1), r && (ycui.loading.show(), t.departmentAdd({
            departmentName: e.departmentNames,
            companyId: e.deListId
        }).success(function (e) {
            ycui.loading.hide(), e && 200 == e.code && ycui.alert({
                content: e.msg, okclick: function () {
                    location.replace("departmentManage.html")
                }
            })
        }))
    }, ycui.select(".yc-select"), $(".departmentIncreasedForm").validate({
        rules: {myText: "required"},
        messages: {myText: "请输入公告名称"},
        errorClass: "error-span",
        errorElement: "span"
    })
}]), app.controller("departmentEditCtrl", ["$scope", "$http", "SysDepartmentFty", "$q", function (e, a, t, r) {
    var n = getSearch("id");
    ycui.loading.show(), t.departmentEditInfo({id: n}).success(function (a) {
        ycui.loading.hide(), a && (e.deListId = a.companyId, e.companyName = a.companyName, e.departmentName = a.departmentName)
    });
    var o = t.departmentListForDep().success(function (a) {
        a && (e.deList = a.companyList)
    });
    r.all([o]).then(function () {
        var a = e.deList;
        e.fitterSelectC = function (t) {
            var r = [];
            e.fitterC ? (a.forEach(function (a) {
                -1 != a[t].indexOf(e.fitterC) && r.push(a)
            }), e.deList = r) : e.deList = a
        }
    }), e.updateDe = function (a) {
        e.deListId = a, $(".select-deType").parent().find(".error-message").remove()
    }, e.postEdit = function () {
        $(".departmentCompileForm").valid() && t.departmentEdit({
            Id: n,
            departmentName: e.departmentName,
            companyId: e.deListId
        }).success(function (e) {
            e && 200 == e.code && ycui.alert({
                content: e.msg, okclick: function () {
                    location.replace("departmentManage.html")
                }
            })
        })
    }, $(".departmentCompileForm").validate({
        rules: {myText: "required"},
        messages: {myText: "部门名称不得为空"},
        errorClass: "error-span",
        errorElement: "span",
        submitHandler: function (a) {
            e.postEdit()
        }
    }), ycui.select(".yc-select")
}]), app.controller("departmentManageCtrl", ["$scope", "$http", "SysDepartmentFty", "$q", function (e, a, t, r) {
    ycui.loading.show();
    var n = 10, o = function (a) {
        ycui.loading.hide(), a && (e.page_size = a.page_size, e.prev_page = a.prev_page, e.total_page = a.total_page, e.items = a.items, e.page = a.page, e.total_count = a.total_count)
    }, i = t.getCompany().success(function (a) {
        a && 200 == a.code && (e.companyList = a.companyList)
    });
    t.departmentPageList({pageSize: n}).success(o), e.search = "", e.go = "", e.redirect = function (a, r) {
        if (a) {
            r && (e.search = r);
            var i = {pageSize: n, pageIndex: a};
            e.companyId && (i.companyId = e.companyId), e.search && (i.departmentName = e.search), t.departmentPageList(i).success(o)
        }
    }, ycui.select(".yc-select", function (a) {
        var r = a.attr("data-value").split(":"), i = (a.html(), r[0]), s = r[1];
        switch (i) {
            case"cn":
                e.companyId = -1 == s ? "" : s
        }
        var c = {pageSize: n, pageIndex: 1};
        e.search && (c.departmentName = e.search), e.companyId && (c.companyId = e.companyId), t.departmentPageList(c).success(o)
    }), r.all([i]).then(function () {
        var a = e.companyList;
        e.fitterSelectC = function (t) {
            var r = [];
            e.fitterC ? (a.forEach(function (a) {
                -1 != a[t].indexOf(e.fitterC) && r.push(a)
            }), e.companyList = r) : e.companyList = a
        }
    })
}]), app.controller("contractSyncCtrl", ["$scope", "DataSyncFty", function (e, a) {
    e.contractSync = function () {
        ycui.loading.show(), a.getContract().success(function (e) {
            ycui.loading.hide(), e && 200 == e.code && ycui.alert({title: "合同同步", content: "同步成功", timeout: -1})
        })
    }, ycui.loading.show();
    var t = function (a) {
        ycui.loading.hide(), a && (e.page_size = a.page_size, e.prev_page = a.prev_page, e.total_page = a.total_page, e.items = a.items, e.page = a.page, e.total_count = a.total_count)
    };
    e.query = {
        pageSize: 10,
        startTime: getDateFormat(),
        endDate: getDateFormat(),
        pageIndex: 1,
        paramInt1: 0
    }, a.listSynLogs(e.query).success(t), new pickerDateRange("calendar-contract", {
        defaultText: " 至 ",
        isSingleDay: !1,
        stopToday: !1,
        calendars: 2,
        startDate: getDateFormat(),
        endDate: getDateFormat(),
        success: function (r) {
            e.query.pageIndex = 1, e.query.startTime = r.startDate, e.query.endDate = r.endDate, a.listSynLogs(e.query).success(t)
        }
    })
}]), app.controller("incomePushCtrl", ["$scope", "DataSyncFty", function (e, a) {
    e.incomePush = function () {
        ycui.loading.show(), a.pushContractMoney().success(function (e) {
            e && 200 == e.code && ycui.alert({title: "推送金额", content: "推送成功", timeout: -1})
        })
    }, ycui.loading.show();
    var t = function (a) {
        ycui.loading.hide(), a && (e.page_size = a.page_size, e.prev_page = a.prev_page, e.total_page = a.total_page, e.items = a.items, e.page = a.page, e.total_count = a.total_count)
    };
    e.query = {
        pageSize: 10,
        startTime: getDateFormat(),
        endDate: getDateFormat(),
        pageIndex: 1,
        paramInt1: 1
    }, a.listSynLogs(e.query).success(t), new pickerDateRange("calendar-income", {
        defaultText: " 至 ",
        isSingleDay: !1,
        stopToday: !1,
        calendars: 2,
        startDate: getDateFormat(),
        endDate: getDateFormat(),
        success: function (r) {
            e.query.pageIndex = 1, e.query.startTime = r.startDate, e.query.endDate = r.endDate, a.listSynLogs(e.query).success(t)
        }
    })
}]), app.controller("errorLogCtrl", ["$scope", "$http", "SysLogFty", function (e, a, t) {
    function r(e, a) {
        var t = new Date;
        return t.setDate(e.getDate() + a), t.dateFormat()
    }

    ycui.loading.show();
    var n = 10, o = function (a) {
        a && (e.page_size = a.page_size, e.prev_page = a.prev_page, e.total_page = a.total_page, e.errorLogs = a.items, e.page = a.page, e.total_count = a.total_count, ycui.loading.hide())
    };
    e.search = "", e.go = "", e.redirect = function (a, r) {
        if (a) {
            r && (e.search = r);
            var i = {pageSize: n, pageIndex: a};
            e.startTime && (i.startTime = e.startTime), e.endTime && (i.endTime = e.endTime), t.errorLogList(i).success(o)
        }
    };
    var i = new pickerDateRange("dateRangeError", {
        defaultText: " 至 ",
        isSingleDay: !1,
        stopToday: !1,
        calendars: 2,
        startDate: r(new Date, -6),
        endDate: getDateFormat(),
        inputTrigger: "dateRange",
        success: function (a) {
            $("#dateRange").val(a.startDate), e.startTime = a.startDate, e.endTime = a.endDate, e.redirect(1)
        }
    });
    e.startTime = i.mOpts.startDate, e.endTime = i.mOpts.endDate, e.redirect(1)
}]), app.controller("operationLogCtrl", ["$scope", "$http", "SysLogFty", function (e, a, t) {
    function r(e, a) {
        var t = new Date;
        return t.setDate(e.getDate() + a), t.dateFormat()
    }

    ycui.loading.show();
    var n = 10, o = function (a) {
        a && (e.page_size = a.page_size, e.prev_page = a.prev_page, e.total_page = a.total_page, e.operationLogs = a.items, e.page = a.page, e.total_count = a.total_count, ycui.loading.hide())
    };
    e.search = "", e.go = "", e.optype = "", e.redirect = function (a, r) {
        if (a) {
            r && (e.search = r);
            var i = {pageSize: n, pageIndex: a};
            e.search && (i.param1 = e.search), e.optype && (i.paramInt1 = e.optype), e.startTime && (i.startTime = e.startTime), e.endTime && (i.endTime = e.endTime), t.operationLogList(i).success(o)
        }
    }, e.typeShow = function (e) {
        var a = ["无", "新增", "修改", "删除", "审核", "禁用", "其他", "登陆"];
        return a[e]
    }, ycui.select(".yc-select", function (a) {
        e.optype = 1 * a.attr("data-value"), e.redirect(1)
    });
    var i = new pickerDateRange("dateRangeOperate", {
        defaultText: " 至 ",
        isSingleDay: !1,
        stopToday: !1,
        calendars: 2,
        startDate: r(new Date, -6),
        endDate: getDateFormat(),
        inputTrigger: "dateRange",
        success: function (a) {
            $("#dateRange").val(a.startDate), e.startTime = a.startDate, e.endTime = a.endDate, e.redirect(1)
        }
    });
    e.startTime = i.mOpts.startDate, e.endTime = i.mOpts.endDate, e.redirect(1)
}]), app.controller("MarkManageCtrl", ["$scope", "SysMarkFty", function (e, a) {
    ycui.loading.show(), e.query = {pageSize: 10, pageIndex: 1};
    var t = function (a) {
        ycui.loading.hide(), a && (e.page_size = a.page_size, e.prev_page = a.prev_page, e.total_page = a.total_page, e.items = a.items, e.page = a.page, e.total_count = a.total_count)
    };
    a.adMarkList(e.query).success(t), e.redirect = function (r, n) {
        e.query.pageIndex = r || 1, n && (e.query.param1 = n), a.adMarkList(e.query).success(t)
    }, e["delete"] = function (r) {
        ycui.confirm({
            title: "角标删除", content: "确定要删除此角标?", okclick: function () {
                a.deleteAdMark({id: r}).success(function (r) {
                    r && 200 == r.code && ycui.alert({
                        content: r.msg, timeout: -1, okclick: function () {
                            a.adMarkList(e.query).success(t)
                        }
                    })
                })
            }
        })
    }, e.enable = function (r, n) {
        ycui.confirm({
            title: "角标启用/禁用", content: "确定要" + (~n ? "禁用" : "启用") + "此角标?", okclick: function () {
                a.enableAdMark({id: r, state: ~n}).success(function (r) {
                    r && 200 == r.code && ycui.alert({
                        content: r.msg, timeout: -1, okclick: function () {
                            a.adMarkList(e.query).success(t)
                        }
                    })
                })
            }
        })
    }
}]), app.controller("MarkAddCtrl", ["$scope", "UploadKeyFty", "SysMarkFty", function (e, a, t) {
    e.mark = {state: 0};
    var r = function (t) {
        var r = {
            swf: baseUrl + "/static/lib/Uploader.swf",
            server: fileUrl + "/contract/uploadADMark.htm",
            pick: {id: "#" + t, multiple: !1},
            fileVal: "uploadFile",
            accept: {title: "Images", extensions: "png", mimeTypes: "image/*"}
        }, n = WebUploader.create(r);
        n.on("error", function (e) {
            ycui.alert({content: "错误的文件类型", timeout: -1}), ycui.loading.hide(), n.reset()
        }), n.on("uploadComplete", function () {
            ycui.loading.hide(), n.reset()
        });
        var o = "";
        return n.on("beforeFileQueued", function (e) {
            ycui.loading.show(), n.stop(e), a.uploadKey().success(function (a) {
                o = a.items, n.upload(e)
            })
        }), n.on("uploadBeforeSend", function (a, t) {
            t.uploadKey = o, t.fileSize = e.fileSize
        }), n
    };
    r("markUpload").on("uploadSuccess", function (a, t) {
        if (t) {
            e.imgList = [];
            var r = proportionPhoto(t.width, t.height, 30, 30), n = {
                width: r[0],
                height: r[1],
                uploadFile: t.uploadFile
            };
            e.$apply(function () {
                e.mark.adMarkUrl = t.uploadFile, e.imgList.push(n)
            })
        }
    });
    e.postEdit = function () {
        e.validShow = !0, e.mark.adMarkUrl && $("form[name=addMark]").valid && t.addAdMark(e.mark).success(function (e) {
            e && 200 == e.code && ycui.alert({
                content: e.msg, okclick: function () {
                    location.replace("markManage.html")
                }, timeout: -1
            })
        })
    }, $("form[name=addMark]").validate({
        rules: {adMarkName: "required", adMarkUrlShow: {url: !0, required: !0}},
        messages: {adMarkName: "请输入角标名称", adMarkUrlShow: {required: "请输入角标打开地址", url: "请输入有效的url"}},
        errorClass: "error-span",
        errorElement: "span"
    })
}]), app.controller("MarkCompileCtrl", ["$scope", "SysMarkFty", "UploadKeyFty", function (e, a, t) {
    var r = getSearch("id");
    e.mark = {}, a.getAdMark({id: r}).success(function (a) {
        if (a) {
            e.mark = a, e.imgList = [];
            var t = {width: 30, height: 30, uploadFile: a.adMarkUrl};
            e.imgList.push(t)
        }
    });
    var n = function (a) {
        var r = {
            swf: baseUrl + "/static/lib/Uploader.swf",
            server: fileUrl + "/contract/uploadADMark.htm",
            pick: {id: "#" + a, multiple: !1},
            fileVal: "uploadFile",
            accept: {title: "Images", extensions: "png", mimeTypes: "image/*"}
        }, n = WebUploader.create(r);
        n.on("error", function (e) {
            ycui.alert({content: "错误的文件类型", timeout: -1}), ycui.loading.hide(), n.reset()
        }), n.on("uploadComplete", function () {
            ycui.loading.hide(), n.reset()
        });
        var o = "";
        return n.on("beforeFileQueued", function (e) {
            ycui.loading.show(), n.stop(e), t.uploadKey().success(function (a) {
                o = a.items, n.upload(e)
            })
        }), n.on("uploadBeforeSend", function (a, t) {
            t.uploadKey = o, t.fileSize = e.fileSize
        }), n
    };
    n("markUpload").on("uploadSuccess", function (a, t) {
        if (t) {
            e.imgList = [];
            var r = proportionPhoto(t.width, t.height, 30, 30), n = {
                width: r[0],
                height: r[1],
                uploadFile: t.uploadFile
            };
            e.$apply(function () {
                e.mark.adMarkUrl = t.uploadFile, e.imgList.push(n)
            })
        }
    });
    e.postEdit = function () {
        if (e.validShow = !0, e.mark.adMarkUrl && $("form[name=addMark]").valid) {
            var t = {
                id: e.mark.id,
                adMarkName: e.mark.adMarkName,
                state: e.mark.state,
                adMarkUrlShow: e.mark.adMarkUrlShow,
                adMarkUrl: e.mark.adMarkUrl
            };
            a.updateAdMark(t).success(function (e) {
                e && 200 == e.code && ycui.alert({
                    content: e.msg, okclick: function () {
                        location.replace("markManage.html")
                    }, timeout: -1
                })
            })
        }
    }, $("form[name=addMark]").validate({
        rules: {adMarkName: "required", aDMarkUrlShow: {url: !0, required: !0}},
        messages: {adMarkName: "请输入角标名称", aDMarkUrlShow: {required: "请输入角标打开地址", url: "请输入有效的url"}},
        errorClass: "error-span",
        errorElement: "span"
    })
}]), app.controller("roleAddCtrl", ["$scope", "$http", "SysRuleUserFty", "SysRoleFty", function (e, a, t, r) {
    function n(e) {
        var a = [];
        for (var t in e) {
            var r = e[t], n = [];
            switch (r.forEach(function (e) {
                var a = [];
                e.childRight instanceof Array && e.childRight.forEach(function (e) {
                    a.push({childId: e.id, childName: e.rightName, verify: e.verify})
                }), n.push({parentId: e.id, parentName: e.rightName, verify: e.verify, childList: a})
            }), t) {
                case"AdOrder":
                    a.push({areaName: "广告订单", areaId: 1, parentList: n});
                    break;
                case"ResourceManage":
                    a.push({areaName: "资源管理", areaId: 2, parentList: n});
                    break;
                case"CustomerManage":
                    a.push({areaName: "客户管理", areaId: 3, parentList: n});
                    break;
                case"DataReport":
                    a.push({areaName: "数据报表", areaId: 4, parentList: n});
                    break;
                case"SystemSet":
                    a.push({areaName: "系统设置", areaId: 5, parentList: n})
            }
        }
        return a
    }

    e.role = {type: 1}, e.postEdit = function () {
        var a = e.getAreaids();
        if (0 == a.length)ycui.alert({content: "角色权限必须勾选"}); else {
            ycui.loading.show();
            var t = e.role;
            t.roleCluster = a.join(","), r.addRole(t).success(function (e) {
                ycui.loading.hide(), e && 200 == e.code && ycui.alert({
                    content: e.msg, okclick: function () {
                        location.replace("roleManage.html")
                    }, timeout: 100
                })
            })
        }
    }, t.levelsRights().success(function (a) {
        if (a) {
            var t = n(a);
            e.getAreaids = ycui.createAreas(t, [], "#areasList", 1)
        }
    }), $(".roleIncreaseForm").validate({
        rules: {myRole: "required"},
        messages: {myRole: "请输入角色名称"},
        errorClass: "error-span",
        errorElement: "span"
    })
}]), app.controller("roleCheckCtrl", ["$scope", "$http", "SysRuleUserFty", "SysRoleFty", function (e, a, t, r) {
    function n(e) {
        var a = [];
        for (var t in e) {
            var r = e[t], n = [];
            switch (r.forEach(function (e) {
                var a = [];
                e.childRight instanceof Array && e.childRight.forEach(function (e) {
                    a.push({childId: e.id, childName: e.rightName, verify: e.verify})
                }), n.push({parentId: e.id, parentName: e.rightName, verify: e.verify, childList: a})
            }), t) {
                case"AdOrder":
                    a.push({areaName: "广告订单", areaId: 1, parentList: n});
                    break;
                case"ResourceManage":
                    a.push({areaName: "资源管理", areaId: 2, parentList: n});
                    break;
                case"CustomerManage":
                    a.push({areaName: "客户管理", areaId: 3, parentList: n});
                    break;
                case"DataReport":
                    a.push({areaName: "数据报表", areaId: 4, parentList: n});
                    break;
                case"SystemSet":
                    a.push({areaName: "系统设置", areaId: 5, parentList: n})
            }
        }
        return a
    }

    setTimeout(function () {
        $("input").attr("disabled", "disabled")
    }, 200), e.role = {};
    var o = getSearch("id");
    ycui.loading.show(), r.getRole({id: o}).success(function (a) {
        ycui.loading.hide(), a && (e.role = a, t.levelsRights().success(function (a) {
            if (a) {
                var t = n(a);
                e.getAreaids = ycui.createAreas(t, e.role.roleCluster, "#areasList", 1)
            }
        }))
    }), e.backToRole = function () {
        location.replace("roleManage.html")
    }
}]), app.controller("roleEditCtrl", ["$scope", "$http", "SysRuleUserFty", "SysRoleFty", function (e, a, t, r) {
    function n(e) {
        var a = [];
        for (var t in e) {
            var r = e[t], n = [];
            switch (r.forEach(function (e) {
                var a = [];
                e.childRight instanceof Array && e.childRight.forEach(function (e) {
                    a.push({childId: e.id, childName: e.rightName, verify: e.verify})
                }), n.push({parentId: e.id, parentName: e.rightName, verify: e.verify, childList: a})
            }), t) {
                case"AdOrder":
                    a.push({areaName: "广告订单", areaId: 1, parentList: n});
                    break;
                case"ResourceManage":
                    a.push({areaName: "资源管理", areaId: 2, parentList: n});
                    break;
                case"CustomerManage":
                    a.push({areaName: "客户管理", areaId: 3, parentList: n});
                    break;
                case"DataReport":
                    a.push({areaName: "数据报表", areaId: 4, parentList: n});
                    break;
                case"SystemSet":
                    a.push({areaName: "系统设置", areaId: 5, parentList: n})
            }
        }
        return a
    }

    e.role = {};
    var o = getSearch("id");
    ycui.loading.show(), r.getRole({id: o}).success(function (a) {
        ycui.loading.hide(), a && (e.role = a, t.levelsRights().success(function (a) {
            if (a) {
                var t = n(a);
                e.getAreaids = ycui.createAreas(t, e.role.roleCluster, "#areasList", 1)
            }
        }))
    }), e.postEdit = function () {
        var a = e.getAreaids();
        if (0 == a.length)ycui.alert({content: "角色权限必须勾选"}); else {
            ycui.loading.show();
            var t = {id: e.role.roleId, type: e.role.type, roleName: e.role.roleName, roleCluster: a.join(",")};
            r.updateRole(t).success(function (e) {
                ycui.loading.hide(), e && 200 == e.code && ycui.alert({
                    content: e.msg, okclick: function () {
                        location.replace("roleManage.html")
                    }, timeout: -1
                })
            })
        }
    }, $(".roleCompileForm").validate({
        rules: {myRole: "required"},
        messages: {myRole: "请输入角色名称"},
        errorClass: "error-span",
        errorElement: "span"
    })
}]), app.controller("roleManageCtrl", ["$scope", "$http", "SysRuleUserFty", function (e, a, t) {
    ycui.loading.show();
    var r = 10, n = function (a) {
        ycui.loading.hide(), a && (e.page_size = a.page_size, e.prev_page = a.prev_page, e.total_page = a.total_page, e.items = a.items, e.page = a.page, e.total_count = a.total_count)
    };
    t.listRole({pageSize: r}).success(n), e.search = "", e.go = "", e.redirect = function (a, o) {
        o && (e.search = o);
        var i = {pageSize: r, pageIndex: a || 1};
        e.search && (i.param1 = e.search), t.listRole(i).success(n)
    }, ycui.select(".yc-select")
}]), app.controller("limitCtrl", ["$scope", "$http", "$location", "SysRuleUserFty", "SysLoginUserFty", "$q", function (e, a, t, r, n, o) {
    var i = n.loginUserInfo().success(function (a) {
        a && 200 == a.code && (e.user = a)
    });
    r.getUserRightsByParentId({rightsParentId: 5}).success(function (a) {
        function t(e, a, t) {
            var r;
            if (2 == e.length && (r = a[0], r && -1 != e.indexOf(r.verify))) {
                var n = e.indexOf(r.verify);
                return {name: t, url: r.url[0], urlAll: r.url, verify: a[n].verify}
            }
            for (var o = 0, i = a.length; i > o; o++)if (r = a[o], -1 != e.indexOf(r.verify))return {
                name: t,
                url: r.url[0],
                urlAll: r.url,
                verify: r.verify
            }
        }

        if (a && a.items.length > 0) {
            var r = {}, n = [];
            a.items.forEach(function (e) {
                var a = e.verify;
                ruleContrast[a] && (e.url = ruleContrast[a]), n.push(e)
            });
            var s = {};
            n.forEach(function (e) {
                var a = e.verify, t = menuContrast.SystemSet;
                for (var n in t) {
                    var o = t[n];
                    -1 != o.indexOf(a) && (r[n] || (r[n] = []), r[n].push(e))
                }
                s[e.verify] = e
            }), e.systemManageRule = s;
            var c = [];
            for (var l in r) {
                var p = r[l];
                switch (l) {
                    case"1":
                        c.push(t(["ViewCompany", "ManageCompany"], p, "公司"));
                        break;
                    case"2":
                        c.push(t(["ViewDepartment", "ManageDepartment"], p, "部门"));
                        break;
                    case"3":
                        c.push(t(["ViewRole", "ManageRole"], p, "角色"));
                        break;
                    case"4":
                        c.push(t(["ViewUser", "ManageUser"], p, "用户"));
                        break;
                    case"5":
                        c.push(t(["ViewNotice", "ManageNotice"], p, "公告"));
                        break;
                    case"6":
                        c.push(t(["ViewOperationLog", "ViewErrorLog"], p, "日志"));
                        break;
                    case"7":
                        c.push(t(["ViewTolerantRate", "ManageTolerantRate"], p, "容错率"));
                        break;
                    case"8":
                        c.push(t(["ViewADMark", "ManageADMark"], p, "角标"));
                        break;
                    case"9":
                        c.push(t(["ViewSpecialEffects", "ManageSpecialEffects"], p, "特效"))
                }
            }
            e.isLocation = function (e) {
                for (var a = 0; a < e.length; a++) {
                    var t = e[a];
                    if (-1 != location.href.indexOf(t))return !0
                }
                return !1
            };
            var d = [];
            c.forEach(function (e, a) {
                var t = !0;
                0 != e.verify.indexOf("View") && 0 != e.verify.indexOf("Query") || (t = !1), t && d.push(a)
            }), d.forEach(function (e) {
                c.splice(e, 1)
            }), e.ruleListTab = c, o.all([i]).then(function () {
                "admin" == e.user.logName && e.ruleListTab.push({
                    name: "同步接口",
                    url: "SystemManage/interfaceSync.html",
                    urlAll: ["SystemManage/interfaceSync.html"],
                    verify: "admin"
                })
            }), console.log(s)
        }
    })
}]), app.filter("typeApp", function () {
    return function (e) {
        return 1 == e ? "Web" : 2 == e ? "Wap" : "APP"
    }
}), app.filter("isNull", function () {
    return function (e) {
        return e ? e : "请选择"
    }
}), app.filter("companyTypeFtr", function () {
    return function (e) {
        switch (e) {
            case 1:
                return "总公司";
            case 2:
                return "分公司";
            default:
                return "--"
        }
    }
}), app.controller("SpecialManageCtrl", ["$scope", "SysSpecialFty", function (e, a) {
    ycui.loading.show(), e.query = {pageSize: 10, pageIndex: 1};
    var t = function (a) {
        ycui.loading.hide(), a && (e.page_size = a.page_size, e.prev_page = a.prev_page, e.total_page = a.total_page, e.items = a.items, e.page = a.page, e.total_count = a.total_count)
    };
    a.specialList(e.query).success(t), e.redirect = function (r, n) {
        e.query.pageIndex = r || 1, n && (e.query.param1 = n), a.specialList(e.query).success(t)
    }, e["delete"] = function (r) {
        ycui.confirm({
            content: "是否删除此特效", timeout: -1, okclick: function () {
                a.specialDelete({id: r}).success(function (r) {
                    r && 200 == r.code && ycui.alert({
                        content: r.msg, timeout: -1, okclick: function () {
                            a.specialList(e.query).success(t)
                        }
                    })
                })
            }
        })
    }
}]), app.controller("SpecialAddCtrl", ["$scope", "SysSpecialFty", function (e, a) {
    e.special = {}, e.postEdit = function () {
        e.validShow = !0, $("form[name=addSpecial]").valid && a.specialAdd(e.special).success(function (e) {
            e && 200 == e.code && ycui.alert({
                content: e.msg, okclick: function () {
                    location.replace("specialManage.html")
                }, timeout: -1
            })
        })
    }, $("form[name=addSpecial]").validate({
        rules: {
            specialEffectsName: "required",
            specialEffectsUrl: {url: !0, required: !0}
        },
        messages: {specialEffectsName: "请输入特效名称", specialEffectsUrl: {required: "请输入特效打开地址", url: "请输入有效的url"}},
        errorClass: "error-span",
        errorElement: "span"
    })
}]), app.controller("SpecialCompileCtrl", ["$scope", "SysSpecialFty", function (e, a) {
    var t = getSearch("id");
    e.special = {}, a.getSpecial({id: t}).success(function (a) {
        a && 200 == a.code && (e.special = a.items)
    }), e.postEdit = function () {
        if (e.validShow = !0, $("form[name=editSpecial]").valid) {
            var t = {
                id: e.special.id,
                specialEffectsName: e.special.specialEffectsName,
                specialEffectsUrl: e.special.specialEffectsUrl,
                remark: e.special.remark
            };
            a.specialUpdate(t).success(function (e) {
                e && 200 == e.code && ycui.alert({
                    content: e.msg, okclick: function () {
                        location.replace("specialManage.html")
                    }, timeout: -1
                })
            })
        }
    }, $("form[name=editSpecial]").validate({
        rules: {
            specialEffectsName: "required",
            specialEffectsUrl: {url: !0, required: !0}
        },
        messages: {specialEffectsName: "请输入特效名称", specialEffectsUrl: {required: "请输入特效打开地址", url: "请输入有效的url"}},
        errorClass: "error-span",
        errorElement: "span"
    })
}]), app.controller("userAddCtrl", ["$scope", "$http", "SysUserFty", function (e, a, t) {
    t.paramList().success(function (a) {
        a && 200 == a.code && (e.companyList = a.companyList)
    }), e.userMode = {}, e.userMode.state = 0, e.postEdit = function () {
        if (e.userMode.logPwd != e.userMode.logPwd2)return void ycui.alert({content: "两次输入的密码不一样，请重新填写"});
        if (e.userMode.roleId || (e.roleIdBo = !0, e.$watch("userMode.roleId", function (a) {
                a && (e.roleIdBo = !1)
            })), !e.userMode.companyId)return void(e.validShow = !0);
        if (!e.userMode.agencyNumber)return void(e.validShow = !0);
        if ($(".userIncreaseForm").valid()) {
            var a = angular.copy(e.userMode);
            delete a.logPwd2, a.logPwd = md5(a.logPwd), ycui.loading.show(), t.userAdd(a).success(function (e) {
                ycui.loading.hide(), e && 200 == e.code && ycui.alert({
                    content: e.msg, okclick: function () {
                        location.replace("userManage.html")
                    }, timeout: -1
                })
            })
        }
    }, $(".userIncreaseForm").validate({
        rules: {
            loginName: "required",
            passWord: {required: !0},
            isPassWord: {required: !0},
            userName: "required",
            myPhone: {phone: !0},
            telephone: {phone: !0},
            myEmail: {email: !0}
        },
        messages: {
            loginName: "请输入用户名",
            passWord: {required: "请输入6位及以上字符，区分大小写"},
            isPassWord: {required: "请再次输入密码"},
            userName: "请输入姓名",
            myPhone: {},
            telephone: {}
        },
        errorClass: "error-span",
        errorElement: "span"
    });
    var r = e.companyList;
    e.fitterSelect = function (a) {
        var t = [];
        e.fitterM ? (r.forEach(function (r) {
            -1 != r[a].indexOf(e.fitterM) && t.push(r)
        }), e.companyList = t) : e.companyList = r
    }, e.fitterSelect2 = function (a) {
        function t(e, a) {
            if (a || (a = []), e instanceof Array)for (var r = 0, n = e.length; n > r; r++)e[r].nextDepts instanceof Array && e[r].nextDepts.length > 0 && t(e[r].nextDepts, a), delete e[r].nextDepts, a.push(e[r]);
            return a
        }

        var r = t(angular.copy(e.departmentListFitter)), n = [];
        e.fitterM2 ? (r.forEach(function (t) {
            -1 != t[a].indexOf(e.fitterM2) && n.push(t)
        }), e.departmentList = n) : e.departmentList = e.departmentListFitter
    }, ycui.select(".yc-select", function (a) {
        var r = a.attr("data-value").split(":"), n = a.attr("data-name"), o = r[0], i = r[1];
        switch (o) {
            case"co":
                e.$apply(function () {
                    e.userMode.companyId = i, delete e.userMode.leaderId, delete e._trueName, delete e.userMode.agencyNumber, delete e.userMode.agencyNames
                }), t.roleListByCom({id: i}).success(function (a) {
                    a && 200 == a.code && (e.roleList = array1Change2(a.roleList, 5))
                }), t.depAndUserList({companyId: i}).success(function (a) {
                    a.departmentList && a.departmentList.forEach(function (e) {
                        e.departmentNames = e.departmentName;
                        var a = e.departmentName, t = e.nextDepts;
                        t instanceof Array && t.length > 0 && t.forEach(function (e) {
                            var t = e.departmentName;
                            e.departmentNames = a + "-" + t;
                            var r = e.nextDepts;
                            r instanceof Array && r.length > 0 && r.forEach(function (e) {
                                var r = e.departmentName;
                                e.departmentNames = a + "-" + t + "-" + r
                            })
                        })
                    }), e.departmentList = a.departmentList, e.userList = a.userList, e.departmentListFitter = angular.copy(e.departmentList), delete e.userMode.agencyNumber, delete e.userMode.leaderId
                });
                break;
            case"de":
                e.$apply(function () {
                    e.userMode.agencyNumber = i, e.userMode.agencyNames = n
                });
                break;
            case"le":
                e.$apply(function () {
                    e.userMode.leaderId = i, e._trueName = n
                })
        }
    })
}]), app.controller("userEditCtrl", ["$scope", "$http", "SysUserFty", "$q", function (e, a, t, r) {
    var n = parseInt(getSearch("id"));
    e.userMode = {}, ycui.loading.show();
    var o = t.getEditUserInfo({id: n}).success(function (a) {
        ycui.loading.hide(), e.userMode = a, t.depAndUserList({companyId: e.userMode.companyId}).success(function (a) {
            a.departmentList && a.departmentList.forEach(function (e) {
                e.departmentNames = e.departmentName;
                var a = e.departmentName, t = e.nextDepts;
                t instanceof Array && t.length > 0 && t.forEach(function (e) {
                    var t = e.departmentName;
                    e.departmentNames = a + "-" + t;
                    var r = e.nextDepts;
                    r instanceof Array && r.length > 0 && r.forEach(function (e) {
                        var r = e.departmentName;
                        e.departmentNames = a + "-" + t + "-" + r
                    })
                })
            }), e.departmentList = a.departmentList, e.userList = a.userList, i = angular.copy(a.departmentList)
        })
    });
    r.all([o]).then(function () {
        t.roleListByCom({id: e.userMode.companyId}).success(function (a) {
            a && 200 == a.code && (e.roleList = array1Change2(a.roleList, 5))
        })
    }), e.initialize = function () {
        ycui.confirm({
            title: "密码初始化", content: "请确认是否初始化密码，初始化后当前密码将会失效", timeout: -1, okclick: function () {
                t.initPwd({id: e.userMode.id, logName: e.userMode.logName}).success(function (e) {
                    e && 200 == e.code && ycui.alert({content: e.msg, timeout: -1})
                })
            }
        })
    }, e.postEdit = function () {
        if (!e.userMode.companyId)return void(e.validShow = !0);
        if (!e.userMode.agencyNumber)return void(e.validShow = !0);
        if ($(".userCompileForm").valid()) {
            var a = {
                id: e.userMode.id,
                logName: e.userMode.logName,
                trueName: e.userMode.trueName,
                email: e.userMode.email,
                companyId: e.userMode.companyId,
                agencyNumber: e.userMode.agencyNumber,
                phone: e.userMode.phone,
                telephone: e.userMode.telephone,
                remark: e.userMode.remark,
                roleId: e.userMode.roleId,
                state: e.userMode.state,
                leaderId: e.userMode.leaderId,
                agencyNames: e.userMode.agencyNames
            };
            t.userEdit(a).success(function (e) {
                e && 200 == e.code && ycui.alert({
                    content: e.msg, okclick: function () {
                        location.replace("userManage.html")
                    }
                })
            })
        }
    }, $(".userCompileForm").validate({
        rules: {
            loginName: "required",
            passWord: {required: !0},
            userName: "required",
            myPhone: {phone: !0},
            telephone: {phone: !0},
            myEmail: {email: !0}
        },
        messages: {loginName: "请输入名字", passWord: {required: "请输入所属公司"}, userName: "请输入名字"},
        errorClass: "error-span",
        errorElement: "span"
    });
    var i = [];
    e.fitterSelect2 = function (a) {
        function t(e, a) {
            if (a || (a = []), e instanceof Array)for (var r = 0, n = e.length; n > r; r++)e[r].nextDepts instanceof Array && e[r].nextDepts.length > 0 && t(e[r].nextDepts, a), delete e[r].nextDepts, a.push(e[r]);
            return a
        }

        var r = t(angular.copy(i)), n = [];
        e.fitterM2 ? (r.forEach(function (t) {
            -1 != t[a].indexOf(e.fitterM2) && n.push(t)
        }), e.departmentList = n) : e.departmentList = i
    }, ycui.select(".yc-select", function (a) {
        var t = a.attr("data-value").split(":"), r = a.attr("data-name"), n = t[0], o = t[1];
        switch (n) {
            case"de":
                e.$apply(function () {
                    e.userMode.agencyNumber = o, e.userMode.agencyNames = r
                });
                break;
            case"le":
                e.$apply(function () {
                    e.userMode.leaderId = o, e.userMode.leaderName = r
                })
        }
    }), e.oldPass = "";
    var s = $(".dialog-con-pass input").eq(2).val(), c = $(".dialog-con-pass input").eq(3).val(), l = $(".dialog-con-pass input").eq(1).val();
    $(".dialog-con-pass input[name=oldPass]").blur(function () {
        l = $(".dialog-con-pass input").eq(1).val(), t.validPwd({id: n, logPwd: md5(l)}).success(function (e) {
            500 == e.code ? $(".passShow").css("display", "block") : $(".passShow").css("display", "none")
        })
    }), $(".dialog-con-pass input[name=newPass]").blur(function () {
        s = $(".dialog-con-pass input").eq(2).val(), s.length < 6 ? $(".passShow6").css("display", "block") : $(".passShow6").css("display", "none")
    }), $(".dialog-con-pass input[name=newPassAgin]").blur(function () {
        c = $(".dialog-con-pass input").eq(3).val(), s != c ? $(".passShow2").css("display", "block") : $(".passShow2").css("display", "none")
    }), $(".ok").click(function () {
        var e = $(".dialog-con-pass input").eq(2).val(), a = ($(".dialog-con-pass input").eq(3).val(), $(".dialog-con-pass input").eq(1).val());
        return s != c ? void $(".passShow2").css("display", "block") : void(e.length < 6 ? $(".passShow6").css("display", "block") : t.updatePwd({
            id: n,
            logPwd: md5(a),
            newLogPwd: md5(s),
            mark: 1
        }).success(function (e) {
            200 == e.code && ycui.alert({
                content: e.msg, okclick: function () {
                    location.replace("userManage.html")
                }
            })
        }))
    }), e.highBox = function () {
        $(".dialog-con-pass input[type=text]").val(e.userMode.logName), $(".dialog-bg-pass").fadeIn(), $(".dialog-close-pass").click(function () {
            $(".dialog-bg-pass").fadeOut()
        }), $(".no").click(function () {
            $(".dialog-bg-pass").fadeOut()
        }), $(".passShow").css("display", "none"), $(".passShow2").css("display", "none"), $(".passShow6").css("display", "none"), $(".dialog-con-pass input").eq(2).val(""), $(".dialog-con-pass input").eq(3).val(""), $(".dialog-con-pass input").eq(1).val("")
    }
}]), app.controller("userManageCtrl", ["$scope", "$http", "SysUserFty", "$q", function (e, a, t, r) {
    var n = 10, o = t.paramListForSearch().success(function (a) {
        a && 200 == a.code && (e.companyList = a.companyList, e.roleList = a.roleList)
    });
    ycui.loading.show();
    var i = function (a) {
        ycui.loading.hide(), a && (e.page_size = a.page_size, e.prev_page = a.prev_page, e.total_page = a.total_page, e.items = a.items, e.page = a.page, e.total_count = a.total_count)
    };
    t.userList({pageSize: n}).success(i), e.ruleId = getSearch("ruleId"), e.search = "", e.go = "",
        e.redirect = function (a, r) {
        r && (e.search = r);
        var o = {pageSize: n, pageIndex: a || 1};
        e.search && (o.logNameOrTrueName = e.search), e.roleId && (o.searchRole = e.roleId), e.departmentId && (o.searchDepartment = e.departmentId), e.companyId && (o.searchCompany = e.companyId), t.userList(o).success(i)
    }, ycui.select(".yc-select", function (a) {
        var r = a.attr("data-value").split(":"), o = r[0], s = r[1];
        switch (o) {
            case"ro":
                e.roleId = -1 == s ? "" : s;
                break;
            case"de":
                e.departmentId = -1 == s ? "" : s;
                break;
            case"cn":
                e.companyId = -1 == s ? 0 : s, t.depAndUserList({companyId: s}).success(function (a) {
                    e.departmentList = a.departmentList, e.departmentListFitter = angular.copy(a.departmentList)
                })
        }
        var c = {pageSize: n, pageIndex: 1};
        e.search && (c.logNameOrTrueName = e.search), e.roleId && (c.searchRole = e.roleId), e.departmentId && (c.searchDepartment = e.departmentId), e.companyId && (c.searchCompany = e.companyId), t.userList(c).success(i)
    }), r.all([o]).then(function () {
        var a = e.roleList;
        e.fitterSelectR = function (t) {
            var r = [];
            e.fitterR ? (a.forEach(function (a) {
                -1 != a[t].indexOf(e.fitterR) && r.push(a)
            }), e.roleList = r) : e.roleList = a
        };
        var t = e.companyList;
        e.fitterSelectM = function (a) {
            var r = [];
            e.fitterM ? (t.forEach(function (t) {
                -1 != t[a].indexOf(e.fitterM) && r.push(t)
            }), e.companyList = r) : e.companyList = t
        }, e.fitterSelect2 = function (a) {
            function t(e, a) {
                if (a || (a = []), e instanceof Array)for (var r = 0, n = e.length; n > r; r++)e[r].nextDepts instanceof Array && e[r].nextDepts.length > 0 && t(e[r].nextDepts, a), delete e[r].nextDepts, a.push(e[r]);
                return a
            }

            var r = t(angular.copy(e.departmentListFitter)), n = [];
            e.fitterM2 ? (r.forEach(function (t) {
                -1 != t[a].indexOf(e.fitterM2) && n.push(t)
            }), e.departmentList = n) : e.departmentList = e.departmentListFitter
        }
    })
}]);
/*!!!!! 最后修改于： 2016-9-8 18:1:42 !!!!!*/
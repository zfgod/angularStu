/**
 * Created by Administrator on 2016/9/1.
 */
var userDetailApp = angular.module("UserDetailApp",[]);

userDetailApp.filter('dateYMD', function () {
    return function (input) {
        return new Date(input).toLocaleDateString()
    };
});
userDetailApp.controller("UserDetailCtrl",['$http','$scope',
    function($http,$scope){
        //获取传递参数
        var id = parseInt(getSearch("id"));
        var name = getSearch("name");
        //var id = getSearch("id");
        if(id && judgeInt(id) && name){
            alert("查询用户"+name+"中。。。");
            //加载user信息
            //springMvc：@RequestParam("id")Integer id
            $http.get('http://localhost:8081/json/oneDetail.do?id='+id)
                .success(function (res) {
                    if(res.code && res.code == 200){
                        alert("正在为您显示内容。。");
                        $scope.userModel = res.user;
                    }else if(res.code && res.code == 404){
                        alert("没有找到！");
                    }else{
                        alert("程序出错！");
                    }
            }).error(function () {
                console.log('error....')
            });
        };
        $scope.editUser = function(query){
            query.createTime = "";
            console.info(query);//Object {id: 2, logName: "itsName", logPwd: "itsPwd", logToken: "itsTokedad"}
            console.info(JSON.stringify(query));//{"id":2,"logName":"itsName","logPwd":"itsPwd","logToken":"itsTokedad"}
            $http.post('http://localhost:8081/json/editUser.do', query, configJson)
                .success(function (data) {
                    if(data.code == 200){
                        alert(data.msg);
                        //两个位置都放了这个页面,两张切换页面方式
                        window.location.href = "userList.html";
                        //window.location.href = "views/userList.html";
                        //location.replace("userList.html");
                        //location.replace("views/userList.html");
                    }else if(data.code == 500){
                        console.info(data.msg)
                    }
                }).error(function () {
                    console.log('error....')
                })
        };
        $scope.editUserInForm = function(query){
            console.info(query);//Object {id: 2, logName: "itsName", logPwd: "itsPwd", logToken: "itsTokedad"}
            console.info(toBodyString(query));//{"id":2,"logName":"itsName","logPwd":"itsPwd","logToken":"itsTokedad"}
            $http.post('http://localhost:8081/json/editUserInForm.do', query, configForm)
                .success(function (data) {
                    if(data.code == 200){
                        alert("表单提交修改成功！");
                        location.replace("userList.html");
                    }else if(data.code == 500){
                        console.info(data.msg)
                    }
                }).error(function () {
                    console.log('error....')
                })
        };
    }]
);
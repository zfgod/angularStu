/**
 * Created by Administrator on 2016/9/1.
 */
var userDetailApp = angular.module("UserDetailApp",[]);

userDetailApp.controller("UserDetailCtrl",['$http','$scope',
    function($http,$scope){
        //获取传递参数
        var id = parseInt(getSearch("id"));
        //var id = getSearch("id");
        if(id!=null && judgeInt(id)){
            alert(true);
            //加载user信息
            $http.get('http://localhost:8081/json/oneDetail.do?id='+id).success(function (data) {
                console.log("get user...success");
                console.log(data);
                $scope.userModel = data;
                console.log($scope.userModel.logName)

            }).error(function () {
                console.log('error....')
            });
        };
        $scope.editUser = function(query){
            alert(query.createTime);
            query.createTimeString = $scope.userModel.createTime;
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
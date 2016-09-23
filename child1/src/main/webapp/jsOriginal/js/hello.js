/**
 * Created by Administrator on 2016/9/23.
 */
function setParamToWinow(){
    //赋值内容给为声明的变量，自动声明为全局变量
    paramAll = document.getElementById("content").value;
}
function getParamToWinow(){
   // 获取全局变量值，替换内容
   document.getElementById("forReplace").innerHTML = paramAll;
}
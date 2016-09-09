/**
 * Created by Administrator on 2016/9/1.
 */
function judgeInt(num){
    var regex =/^[0-9]*[1-9][0-9]*$/;
    if(regex.test(num)){
        return true;
    }
    return false;
// ”^\\d+$”　　//非负整数（正整数   +   0）
//“^[0-9]*[1-9][0-9]*$”　　//正整数
//“^((-\\d+)|(0+))$”　　//非正整数（负整数   +   0）
//“^-[0-9]*[1-9][0-9]*$”　　//负整数
//“^-?\\d+$”　　　　//整数
//“^\\d+(\\.\\d+)?$”　　//非负浮点数（正浮点数   +   0）
//“^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$”　　//正浮点数
//“^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$”　　//非正浮点数（负浮点数   +   0）
//“^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$”　　//负浮点数
//“^(-?\\d+)(\\.\\d+)?$”　　//浮点数
}

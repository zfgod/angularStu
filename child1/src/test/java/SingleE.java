/**
 * author: zf
 * Date: 2016/8/18  19:31
 * Description:
 */


public class SingleE {//懒汉式单例
    private SingleE(){}
    static SingleE a = null;
    public static SingleE getA(){
        if(null ==  a ){
            a = new SingleE();
        }
        return a;
    }
    public String show(){
        System.out.println("get..");
        return "ok";
    }
}
class a{
    public static void main(String[] args) {
        SingleE a = SingleE.getA();
        String show = a.show();
        System.out.println(show);
    }
}
package Collection;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

/**
 * author: zf
 * Date: 2016/9/26  11:34
 * Description:
 */
public class HashSetStu {
    // 类A的equals()方法的返回true,但没有重写其hashCode()方法
    static class A {
        public boolean equals(Object obj) {
            return true;
        }

        public A() {
        }
    }

    // 类B的hanshCode()方法总是返回1，但是没有重写equals()方法
    static class B {
        public int hashCode() {
            return 1;
        }
        public B() {
        }
    }

    // 类C的hashCode()方法返回2，且重写了equals()方法
    static class C {
        public int hashCode() {
            return 2;
        }

        public boolean equals(Object obj) {
            return true;
        }
        public C() {
        }
    }

    public static void main(String[] args) {
/*        HashSet books = new HashSet();
        // 分别想books集合中添加两个A对象，两个B对象，两个C对象
        books.add(new A());
        books.add(new A());
        books.add(new B());
        books.add(new B());
        books.add(new C());
        books.add(new C());
        System.out.println(books);*/
        /**
         * *[   Collection.HashSetStu$B@1, Collection.HashSetStu$B@1,
           *   Collection.HashSetStu$C@2, Collection.HashSetStu$A@1c90a278,
           *  Collection.HashSetStu$A@60891a0]
        */

        HashSet steps = new HashSet();
        steps.add(1);
        steps.add(9);
        steps.add(9);
        steps.add(6);
        steps.add(6);
        steps.add(7);
        steps.add(7);
        System.out.println(steps);//[1, 6, 7, 9]
        Iterator iterator = steps.iterator();
        List<Integer> stepsDown = new ArrayList<>();
        while (iterator.hasNext()){
               stepsDown.add((Integer) iterator.next());
        }
        Utils.bubbleDownSortList(stepsDown);
        System.out.println(stepsDown);
    }
}


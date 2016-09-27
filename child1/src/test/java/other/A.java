package other;

import java.util.concurrent.locks.ReentrantLock;

/**
 * author: zf
 * Date: 2016/9/21  11:00
 * Description:
 */
public class A {
    public static void main(String[] args) {
            ReentrantLock lock = new ReentrantLock();
            lock.tryLock();
    }


}

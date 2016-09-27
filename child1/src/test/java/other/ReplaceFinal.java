package other;

import java.util.*;

/**
 * author: zf
 * Date: 2016/9/27  8:57
 * Description:
 */
public class ReplaceFinal {
    public static void main(String[] args) {
        List<Integer> oldList = Arrays.asList(1, 4, 3, 5, 2,5);

        Set<Integer> set = new HashSet<>();
        set.addAll(oldList);

        List<Integer> sortlist1 = new ArrayList<>(set);
        Collections.sort(sortlist1);// 1,2,3,4,5
        List<Integer> sortlist2 = new ArrayList<>(sortlist1);
        Collections.reverse(sortlist2);// 5,4,3,2,1
        Map<Integer, Integer> m = new HashMap<>();
        for (int i = 0; i < sortlist1.size(); i++) {
            m.put(sortlist1.get(i), sortlist2.get(i));
        }
        List<Integer> finalList = new ArrayList<>();
        for (Integer i : oldList) {
            finalList.add(m.get(i));
        }
        System.out.println(oldList.toString());
        System.out.println(set.toString());
        System.out.println(m.toString());
        System.out.println(sortlist1.toString());
        System.out.println(sortlist2.toString());
        System.out.println(finalList.toString());
    }
}

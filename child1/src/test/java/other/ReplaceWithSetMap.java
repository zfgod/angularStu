package other;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * author: zf
 * Date: 2016/9/26  11:27
 * Description:
 */
public class ReplaceWithSetMap {
    public static void main(String[] args) {
        List<Integer> baseList = new ArrayList<>();
        baseList.add(1);
        baseList.add(1);
        baseList.add(5);
        baseList.add(2);
        baseList.add(3);
        baseList.add(4);
        List<Integer> listWithSort = new ArrayList<>();
        int size = baseList.size();
//      去重存储
        for(int i=0;i<baseList.size();i++){
            if(!listWithSort.contains(baseList.get(i))){
                listWithSort.add(baseList.get(i));
            }
        }
//      排序
        bubbleUpSortList(listWithSort);//升序集合
        System.out.println("原始集合："+baseList);
        System.out.println("排序后的集合："+listWithSort);
//使用map 存储对应替换的key-value
        int sizeSort = listWithSort.size();
        HashMap replaceTemp = new HashMap();
        for(int i =0;i<sizeSort;i++){
            replaceTemp.put(listWithSort.get(i),listWithSort.get(sizeSort-i-1));
        }
        for(int i =0;i<size;i++){
            Integer integer = baseList.get(i);
            baseList.set(i, (Integer) replaceTemp.get(integer));
        }
        System.out.println("替换后的集合："+baseList);
    }
    //    集合

    /*冒泡升序-集合*/
    public static void bubbleUpSortList(List<Integer> baseList){
        Integer temp;
        for(int i=0;i<baseList.size()-1;i++){
            for(int j = 0; j<baseList.size()-1-i;j++){
                if(baseList.get(j)>baseList.get(j+1)){
                    temp = baseList.get(j);
                    baseList.set(j,baseList.get(j+1));
                    baseList.set(j+1,temp);
                }
            }
        }
    }
}

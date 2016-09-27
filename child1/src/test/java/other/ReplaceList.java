package other;

import java.util.ArrayList;
import java.util.*;

/**
 * author: zf
 * Date: 2016/9/23  15:20
 * Description:
 */
public class ReplaceList {
//    集合大小排序后替换对应位置元素，最大最小替换，依次替换
    public static void main(String[] args) {
        List<Integer> baseList = new ArrayList<>();
        baseList.add(1);
        baseList.add(4);
        baseList.add(2);
        baseList.add(5);
        baseList.add(1);//1,4,2,5,1 >> 5,1,2,1,4
        baseList.add(8);//1,4,2,5,1 >> 5,1,2,1,4
        List<Integer> listWithSort = new ArrayList<>();
        int size = baseList.size();
        for(int i=0;i<baseList.size();i++){
            listWithSort.add(baseList.get(i));
        }
        bubbleUpSortList(listWithSort);//升序集合
        System.out.println("原始集合："+baseList);
        System.out.println("排序后的集合："+listWithSort);
        Integer max;
        Integer min;

        int middle = size/2;
        boolean getMin;
        boolean getMax;
        int tempMinIndex = 0;
        int tempMaxIndex = 0;
        List<Integer> replacedIndex = new ArrayList<>();//存储已经替换过的索引值
        if(size>=2){
            for(int i= 0;i<middle;i++){
                //获取将要替换的值
                min = listWithSort.get(i);
                max = listWithSort.get(size-1-i);
                getMax = false;
                getMin = false;
               for(int j=0;j<=size-1;j++){
                   if(!replacedIndex.contains(j) && !getMin
                           && baseList.get(j).equals(min)){
                       getMin = true;
                       tempMinIndex = j;
                   }
                   if(!replacedIndex.contains(j)&& !getMax
                           && baseList.get(j).equals(max)){
                       getMax = true;
                       tempMaxIndex = j;
                   }
               }//获取当前要替换的最大值和最小值 在
               baseList.set(tempMinIndex,max);
               baseList.set(tempMaxIndex,min);
               replacedIndex.add(tempMaxIndex);
               replacedIndex.add(tempMinIndex);
            }
        }
//    输出替换后的集合
/*       原始集合：[1, 4, 2, 5, 1, 8]
        排序后的集合：[1, 1, 2, 4, 5, 8]
        替换后的集合：[8, 2, 4, 1, 5, 1]
        ? [5, 2, 4, 1, 8, 1] 这个看起来也满足
*/
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

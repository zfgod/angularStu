package other;


import java.util.ArrayList;
import java.util.List;

/**
 * author: zf
 * Date: 2016/9/23  16:16
 * Description:
 */
public class ReplaceWho {
    public static void main(String[] args) {
        List<Integer> baseList = new ArrayList<>();
        baseList.add(1);
        baseList.add(1);
        baseList.add(5);
        baseList.add(2);
        baseList.add(2);
        baseList.add(3);
        List<Integer> listWithSort = new ArrayList<>();
        int size = baseList.size();
        for(int i=0;i<baseList.size();i++){
            if(!listWithSort.contains(baseList.get(i))){
                listWithSort.add(baseList.get(i));
            }
        }
        bubbleUpSortList(listWithSort);//升序集合
        System.out.println("原始集合："+baseList);
        System.out.println("排序后的集合："+listWithSort);
        Integer max;
        Integer min;
        int sizeSort = listWithSort.size();
        int middle = sizeSort/2;
        List<Integer> tempMinIndex = new ArrayList<>();
        List<Integer> tempMaxIndex = new ArrayList<>();
        List<Integer> replacedIndex = new ArrayList<>();//存储已经替换过的索引值
        if(middle>=1){
            for(int i= 0;i<middle;i++){
                //获取将要替换的值
                min = listWithSort.get(i);
                max = listWithSort.get(sizeSort-1-i);
                tempMaxIndex.clear();
                tempMinIndex.clear();
                for(int j=0;j<=size-1;j++){
                    if(!replacedIndex.contains(j) && baseList.get(j).equals(min)){
                        tempMinIndex.add(j);
                    }
                    if(!replacedIndex.contains(j) && baseList.get(j).equals(max)){
                        tempMaxIndex.add(j);
                    }
                }
                //替换
                if(tempMaxIndex.size()>0&&tempMinIndex.size()>0){
                    for (Integer integer : tempMaxIndex) {
                        baseList.set(integer,min);
                        replacedIndex.add(integer);
                    }
                    for (Integer integer : tempMinIndex) {
                        baseList.set(integer,max);
                        replacedIndex.add(integer);
                    }
                }
            }
        }
//    输出替换后的集合
/*       原始集合：[1, 1, 5, 2, 3]
         排序后的集合：[1, 2, 3, 5]
         替换后的集合：[5, 5, 1, 3, 2]
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

package Collection;

import java.util.List;

/**
 * author: zf
 * Date: 2016/9/26  11:46
 * Description:
 */
public class Utils {
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
    public static void bubbleDownSortList(List<Integer> baseList){
        Integer temp;
        for(int i=0;i<baseList.size()-1;i++){
            for(int j = 0; j<baseList.size()-1-i;j++){
                if(baseList.get(j)<baseList.get(j+1)){
                    temp = baseList.get(j);
                    baseList.set(j,baseList.get(j+1));
                    baseList.set(j+1,temp);
                }
            }
        }
    }
}

package NIO;
/**
 * author: zf
 * Date: 2016/8/25  11:06
 * Description:
 */
import javax.script.ScriptEngine;

import javax.script.ScriptEngineManager;

import javax.script.ScriptException;

public final class Calculator {

    private final static ScriptEngine jse = new ScriptEngineManager().getEngineByName("JavaScript");

    public static Object cal(String expression) throws ScriptException{

        return jse.eval(expression);

    }

}

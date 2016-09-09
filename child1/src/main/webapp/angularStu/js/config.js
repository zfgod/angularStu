/**
 * Created by Administrator on 2016/9/1.
 */
function toQueryPair(e, a) {
    return "undefined" == typeof a ? e : e + "=" + encodeURIComponent(null === a ? "" : String(a))
}
function toBodyString(e) {
    var a = [];
    for (var t in e) {
        var n = e[t];
        if (n && n.constructor == Array) {
            for (var r, i = [], o = 0, l = n.length; l > o; o++)r = n[o], i.push(toQueryPair(t, r));
            a = a.concat(i)
        } else a.push(toQueryPair(t, n))
    }
    return a.join("&")
}
var configForm = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    transformRequest: function (data) {
        if (!data) return undefined;
        return toBodyString(data);
    }
};
var configJson = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    transformRequest: function (data) {
        if (!data) return undefined;
        return JSON.stringify(data);
    }
};
var getSearch = function (e) {
    var a = new RegExp("(?:^|&)" + e + "=([^&]*)(?:&|$)", "i");
    return ((location.search.split("?")[1] || "").match(a) || [])[1] || ""
};

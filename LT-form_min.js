// 使用须知：需要在表单元素内，每一个需要用到验证的元素都定义好name属性，这是用于最后返回验证结果的重要属性


// 构建对象函数用来做封装
function formCheck() { }

// 用来记录通过验证的元素名称
var passList = []

// 用于记录验证失败的元素名称
var failList = []

/* 用户名验证：
    接收参数：DOM元素
    返回：布尔类型，true表示验证通过，false表示验证失败
    */
formCheck.prototype.userCheck = function (dom) {
    var value = dom.value;
    var attr = dom.getAttribute("name");
    if (check.isUsername(value)) {
        listOperate.addToPass(attr);
        listOperate.removeToFail(attr);
        return true
    } else {
        listOperate.addToFail(attr)
        return false
    }
}

/* 密码合法性验证：
    接收参数：DOM元素
    返回：string类型/布尔类型，fasle表示危险级别,"normal"表示验证失败,"safe"表示安全级别
    */
formCheck.prototype.pwdCheck = function (dom) {
    var value = dom.value;
    var attr = dom.getAttribute("name");
    if (check.isPwd(value)) {
        listOperate.addToPass(attr);
        listOperate.removeToFail(attr);
        if (check.isPwd(value) == 1) {
            return "normal"
        } else if (check.isPwd(value) == 2) {
            return "safe"
        }
    } else {
        listOperate.addToFail(attr)
        return false
    }
}

/* 姓名验证：
    接收参数：DOM元素
    返回：布尔类型，true表示验证通过，false表示验证失败
    */
formCheck.prototype.nameCheck = function (dom) {
    var value = dom.value;
    var attr = dom.getAttribute("name");
    if (check.isName(value)) {
        listOperate.addToPass(attr);
        listOperate.removeToFail(attr);
        return true
    } else {
        listOperate.addToFail(attr)
        return false
    }
}

/* 身份证号码验证：
    接收参数：DOM元素
    返回：布尔类型，true表示验证通过，false表示验证失败
    */
formCheck.prototype.identityCheck = function (dom) {
    var value = dom.value;
    var attr = dom.getAttribute("name");
    if (check.isName(value)) {
        listOperate.addToPass(attr);
        listOperate.removeToFail(attr);
        return true
    } else {
        listOperate.addToFail(attr)
        return false
    }
}

/* 邮箱验证：
    接收参数：DOM元素
    返回：布尔类型，true表示验证通过，false表示验证失败
    */
formCheck.prototype.emailCheck = function (dom) {
    var value = dom.value;
    var attr = dom.getAttribute("name");
    if (check.isName(value)) {
        listOperate.addToPass(attr);
        listOperate.removeToFail(attr);
        return true
    } else {
        listOperate.addToFail(attr)
        return false
    }
}

/* 手机号码验证：
    接收参数：DOM元素
    返回：布尔类型，true表示验证通过，false表示验证失败
    */
formCheck.prototype.mobileCheck = function (dom) {
    var value = dom.value;
    var attr = dom.getAttribute("name");
    if (check.isName(value)) {
        listOperate.addToPass(attr);
        listOperate.removeToFail(attr);
        return true
    } else {
        listOperate.addToFail(attr)
        return false
    }
}

// 用于返回验证通过的列表
formCheck.prototype.passList = function () {
    return passList
}

// 用于返回验证未通过的字段列表
formCheck.prototype.failList = function () {
    return failList
}

/*列表的增删操作
逻辑思路：
1、加入元素前，先判断该元素是否已在列表中。不存在则加入，否则不做任何操作；
2、删除元素前，先判断该元素是否在列表中，不存在则不做任何操作；
3、核心逻辑：始终保持一个元素只能在存在于其中一个列表，不是passList就是failList。
*/
var listOperate = {
    addToPass: function (name) {
        if (passList.indexOf(name) == -1) {
            passList.push(name)
        }
    },
    removeToPass: function (name) {
        if (passList.indexOf(name)) {
            var atttIndex = passList.indexOf(name);
            passList.splice(atttIndex, 1)
        } else {
            return
        }
    },
    addToFail: function (name) {
        if (failList.indexOf(name) == -1) {
            failList.push(name)
        }
    },
    removeToFail: function (name) {
        if (failList.indexOf(name)) {
            var atttIndex = failList.indexOf(name);
            failList.splice(atttIndex, 1)
        } else {
            return
        }
    }
}

// 验证规则：正则表达式验证
var check = {
    // 密码合法性规则：
    // 区分大小写
    // 大小写字母、数字、6-20位
    isPwd: function (value) {
        var pattern = /\S{6,20}/
        var normal_pattern = /[a-zA-Z][0-9]*/;
        var safe_pattern = /\W[a-zA-Z]*/;
        if (pattern.test(value)) {
            if (normal_pattern.test(value)) {
                if (safe_pattern.test(value)) {
                    return 2
                }
            } else { return 1 }
        }
        else { return false }
    },

    // 用户名规则:
    // 5-30位之间，大小写字母、数字和”_"符号。必须以字母开头
    isUsername: function (value) {
        var pattern = /^[a-z]\w{5,30}/;
        if (pattern.test(value)) {
            return true
        } else { return false }
    },

    // 姓名规则：
    // 2-15位汉字或3-30位大小写字母
    isName: function (value) {
        var pattern = /[a-zA-Z]{3,30}|[\u4e00-\u9fa5]{2,15}/;
        if (pattern.test(value)) {
            return true
        } else { return false }
    },

    // 身份证规则：
    // 18位或15位身份证、以数字或X、x结尾
    isIdCard: function (value) {
        var pattern = /^\d{15}|\d{18}$|x$/;
        if (pattern.test(value)) {
            return true
        } else { return false }
    },

    // 邮箱规则：
    // 这个就写死了，没什么好说的了。。。。
    isEmail: function (value) {
        var pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (pattern.test(value)) {
            return true
        } else { return false }
    },

    // 手机号码规则：
    // 目前支持13、14、14、16、17、18、19开头的手机号码，不支持非1字开头的手机
    isMobile: function (value) {
        var pattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (pattern.test(value)) {
            return true
        } else { return false }
    }
}




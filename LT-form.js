// 使用须知：需要在表单元素内，每一个需要用到验证的元素都定义好name属性，这是用于最后返回验证结果的重要属性


// 构建对象函数用来做封装
function formCheck() { }

// 用来记录通过验证的元素名称
var passList = []

// 用于记录验证失败的元素名称
var failList = []

/* 用户名验证：
    接收参数：
        参数1：验证字段的dom对象
        参数2：字段提示的dom对象
    */
formCheck.prototype.userCheck = function (dom, tips) {
    dom.addEventListener("blur", function () {
        var value = dom.value;
        var msg = tips
        var attr = dom.getAttribute("name")
        if (check.isUsername(value)) {
            msg.innerHTML = "用户名输入正确";
            msg.style.color = "green";
            listOperate.addToPass(attr);
            listOperate.removeToFail(attr);
        } else {
            if (value == "") {
                msg.innerHTML = "用户名不能为空";
                msg.style.color = "red";
            }
            msg.innerHTML = "请输入6-20位字母、数字或“_”,以字母开头";
            msg.style.color = "red"
            listOperate.addToFail(attr)
        }
    })
}

/* 密码合法性验证：
    接收参数：
        参数1：密码字段的dom对象；
        参数2-参数4：密码级别块状dom元素：危险、一般、安全
    */
formCheck.prototype.pwdCheck = function (dom, danger, normal, safe) {
    dom.addEventListener("blur", function () {
        var value = dom.value;
        var attr = dom.getAttribute("name")
        var normal_item = normal;
        var safe_item = safe;
        var danger_item = danger
        if (check.isPwd(value) != false) {
            listOperate.addToPass(attr);
            listOperate.removeToFail(attr)
            if (check.isPwd(value) == 1) {
                normal_item.style.backgroundColor = "orange"
                safe_item.style.backgroundColor = "gray"
            } else if (check.isPwd(value) == 2) {
                normal_item.style.backgroundColor = "orange"
                safe_item.style.backgroundColor = "green"
            }
        } else {
            safe_item.style.backgroundColor = "gray"
            normal_item.style.backgroundColor = "gray"
            listOperate.addToFail(attr)
        }

    })
}

/*
密码一致性验证：
    接收参数：
        参数1：确认密码字段的dom对象；
        参数2：注册密码的dom对象；
        参数3：该字段提示的dom对象
*/ 
formCheck.prototype.pwdConfirm = function (confirm, pwd, tips) {
    confirm.addEventListener("blur", function () {
        var value = confirm.value;
        var msg = tips;
        var attr = confirm.getAttribute("name");
        var password = pwd;
        if (check.isConfirm(value,password)) {
            msg.innerHTML = "两次输入一致";
            msg.style.color = "green"
            listOperate.addToPass(attr);
            listOperate.removeToFail(attr);
            console.log(passList)
        } else {
            if (value == "") {
                msg.innerHTML = "不能为空";
                msg.style.color = "red"
            } else {
                msg.innerHTML = "两次密码输入不一致";
                msg.style.color = "red"
            }
            listOperate.addToFail(attr);
            listOperate.removeToPass(attr);
        }
    })
}

/* 姓名验证：
    接收参数：
        参数1：姓名字段的dom对象；
        参数2：姓名提示的dom对象
    */
formCheck.prototype.nameCheck = function (dom, tips) {
    dom.addEventListener("blur", function () {
        var value = dom.value;
        var attr = dom.getAttribute("name");
        var msg = tips;
        if (check.isName(value)) {
            listOperate.addToPass(attr);
            listOperate.removeToFail(attr);
            msg.innerHTML = "姓名输入正确";
            msg.style.color = "green";
        } else {
            msg.innerHTML = "姓名只能包含中文或者英文,且字符在3-30个之间";
            msg.style.color = "red";
            listOperate.addToFail(attr);
            listOperate.removeToPass(attr)
        }
    })
}

/* 身份证号码验证：
    接收参数：
        参数1：身份字段的dom对象；
        参数2：身份证号提示的dom对象
    返回：布尔类型，true表示验证通过，false表示验证失败
    */
formCheck.prototype.identityCheck = function (dom,tips) {
   dom.addEventListener("blur",function(){
        var value = dom.value;
        var msg = tips;
        var attr = dom.getAttribute("name")
        if(check.isIdCard(value)){
            listOperate.addToPass(attr);
            listOperate.removeToFail(attr);
            msg.innerHTML = "号码输入正确";
            msg.style.color = "green";
        }else{
            msg.innerHTML = "请输入18位身份证号码";
            msg.style.color = "red";
            listOperate.addToFail(attr);
            listOperate.removeToPass(attr)
        }
    })
}

/* 邮箱验证：
    接收参数：
        参数1：身份字段的dom对象；
        参数2：身份证号提示的dom对象
    返回：布尔类型，true表示验证通过，false表示验证失败
    */
formCheck.prototype.emailCheck = function (dom,tips) {
    dom.addEventListener("blur",function(){
        var value = email.value;
        var msg = tips;
        var attr = email.getAttribute("name")
        if(check.isEmail(value)){
            listOperate.addToPass(attr);
            listOperate.removeToFail(attr);
            msg.innerHTML = "邮箱格式正确";
            msg.style.color = "green";
        }else{
            msg.innerHTML = "请输入正确的邮箱";
            msg.style.color = "red";
            listOperate.addToFail(attr);
            listOperate.removeToPass(attr);
        }
    })
}

/* 手机号码验证：
    接收参数：
        参数1：身份字段的dom对象；
        参数2：身份证号提示的dom对象
    返回：布尔类型，true表示验证通过，false表示验证失败
    */
formCheck.prototype.mobileCheck = function (dom,tips) {
    dom.addEventListener("blur",function(){
        var value = mobile.value;
        var msg = tips;
        var attr = mobile.getAttribute("name")
        if(check.isMobile(value)){
            listOperate.addToPass(attr);
            listOperate.removeToFail(attr);
            msg.innerHTML = "手机格式正确";
            msg.style.color = "green"
        }else{
            msg.innerHTML = "输入的手机号码不是有效的格式！";
            msg.style.color = "red";
            listOperate.addToFail(attr);
            listOperate.removeToPass(attr);
        }
    })
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
                } else { return 1 }
            }
        }
        else { return false }
    },

    // 验证两次密码是否一致
    isConfirm: function (value,pwd) {
        var password = pwd.value;
        if (value == password && password != "") {
            return true
        } else {
            return false
        }
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


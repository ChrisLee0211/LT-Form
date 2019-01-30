# LT-Form
个人做的表单验证组件，主要封装了一些常用的正则表达式和表单注册常见逻辑

## 效果预览：
![IMAGE](https://github.com/ChrisLee0211/LT-Form/blob/master/example01.gif)

## 技术栈：
> - jQuery3.3.1(已完成了剥离)
> - less
> - javascript

## v1.0(2019.01.26)：
- 提供了高度封装版本和简洁验证版本
- 提供了常见的字段验证方法
- 内部实时创建了一个包含已完成验证字段的列表和未完成字段的列表，开发者可随时跟踪验证情况；

## 组件说明：
这个组件个人制作了两个版本，高度封装版：[LT-form.js](https://github.com/ChrisLee0211/LT-Form/blob/master/LT-form.js)和简洁验证版[LT-form_min.js](https://github.com/ChrisLee0211/LT-Form/blob/master/LT-form_min.js)
- _LT-Form.js_：包含了验证提示信息的修改，输入框元素的实践注册，使用简单，只需要引入文件后创建实例，按需调用方法即可；
- _LT-form_min.js_：只包含了简单的字段验证方法，返回布尔值供使用者判断，适用于需要自己添加字段提示信息的项目，定制化程度高。

## 字段规则：
|字段名称       | 验证规则         |
|:------------- |:-------------|
| 用户名（userCheck）|5-30位之间，大小写字母、数字和”_"符号。必须以字母开头| 
| 密码（pwdCheck）|大小写字母、数字、6-20位| 
| 密码确认（isConfirm）|验证两次密码是否输入一致| 
| 姓名（nameCheck）|2-15位汉字或3-30位大小写字母| 
| 身份证号码（identityCheck）|18位或15位身份证、以数字或X、x结尾| 
| 邮箱（emailCheck）|符合一般邮箱格式即可| 
| 手机号码（mobileCheck）|目前支持13、14、14、16、17、18、19开头的手机号码，不支持非1字开头的手机| 

## 使用说明：
### **LT-form.js**：
#### （一）加载js文件：
把js文件夹中的`LT-form.js`文件放到你的项目中并且引用：
```html
<script src="你的js文件地址"></script>
```

#### （二）设置元素属性：
在你的html标签中，需要进行判断的字段元素，需要加入name属性，比如用户名输入框：
```html
<input type="text" name="username" id="username" placeholder="用户名设置成功后不可修改">
```
#### （三）调用方法：
在你的项目中，创建一个`formCheck`实例，并根据自己需求，获取到需要验证的字段dom元素以及它的提示信息dom元素，并调用方法，自动执行验证，以用户名字段验证为例：
```javascript
var username = document.getElementById("username");
var user_tips = document.querySelector(".username")

var formCheck = new formCheck()
formCheck.userCheck(username, user_tips)
```
只需以上代码，即完成了用户名字段的验证事件。
更多字段验证方法，请参考如下：

|验证方法       | 传入参数          | 事件说明  |
|:------------- |:-------------|:-----|
| userCheck(dom,tips) |**参数1**：验证字段的dom对象；**参数2**：字段提示的dom对象 | 验证用户名是否合法 |
| pwdCheck(a,b,c,d) |**参数1**：密码字段的dom对象；**参数2-4**：密码级别块状dom元素：危险、一般、安全 | 验证密码是否合法 |
| pwdConfirm(a,b,c) |**参数1**：确认密码字段的dom对象；**参数2**：注册密码的dom对象；**参数3**：字段提示的dom对象 | 验证用户名是否合法 |
| nameCheck(named, named_tips) |**参数1**：验证字段的dom对象；**参数2**：字段提示的dom对象 | 验证姓名是否合法 |      
| identityCheck(identity, identity_tips) |**参数1**：验证字段的dom对象；**参数2**：字段提示的dom对象 | 验证身份证号是否合法 |      
| emailCheck(email, email_tips) |**参数1**：验证字段的dom对象；**参数2**：字段提示的dom对象 | 验证邮箱是否合法 |      
| mobileCheck(mobile, mobile_tips) |**参数1**：验证字段的dom对象；**参数2**：字段提示的dom对象 | 验证手机号码是否合法 |  
|passList() |无 | 返回一个记录着已通过验证的字段名name属性值的列表 |
| failList) |无| 返回一个记录着未通过验证的字段名name属性值的列表 |

#### 注意：本组件的密码字段的提示信息是有三个级别的，分别用不同颜色的标识块显示，因此在方法调用上需要传入多个参数，示例如下：
```javascript
<div class="input">
  <input type="password" id="pwd" name="pwd" placeholder="6-20位字母、数字或符号">
</div>
<div class="tips">
  <div id="danger" class="danger"></div>
  <div id="normal" class="normal"></div>
  <div id="safe" class="safe"></div>
</div>

<script>
var pwd = document.getElementById("pwd");
var pwd_danger = document.getElementById("danger");
var pwd_normal = document.getElementById("normal");
var pwd_safe = document.getElementById("safe");

var formCheck = new formCheck();
formCheck.pwdCheck(pwd, pwd_danger, pwd_normal, pwd_safe)
</script>
```
显示效果可以参照[效果预览](#效果预览)
#### （四）注册提交：
本组件提供了两个列表来帮助使用者定制提交事件。当你需要提交表单时，可以调用`formCheck.passList()`方法，获取到一个记录着已经通过验证的元素`name属性值`的列表，通过判断该列表的长度是否满足了表单提交的要求来定制`click事件`，如：
```javascript
var btn = document.getElementById("btn");
btn.addEventListener("click", function () {
            var passList = formCheck.passList()
            if (passList.length == 7) {//当你需要验证的字段是7个时（也就是本组件目前支持的字段数量）,那么可以通过判断passList中的个数是否满足7个来判断是否完成提交事件
                    alert("验证成功")
            } else {
                alert("请填写正确的信息")
            }
        })
```

### **LT-form_min.js**：

#### （一）使用说明：
前两个步骤基本和上面中的（一）、（二）相同，该版本主要区别是不再提供自动修改字段提示信息，只提供一个验证字段的处理逻辑，返回布尔值，因此只需要获取到各字段的DOM对象，调用方法即可，示例：
```javascript
var username = document.getElementById("username");
var formCheck = new formCheck();
username.onblur = function(){
  if(userCheck(username){ //这里只需要传入该字段的dom对象，便会返回一个布尔值，true表示通过，false表示未通过
    pass //后续需要做什么操作，开发者可自定义
  }else{
    pass
  }
}
```
#### （二）注意事项：
该版本的`pwdCheck()`方法返回的是str类型值和布尔值，分别是`"safe"`（安全）、`"normal"`（一般）、和`false`（危险\不通过）,不建议开发者使用，建议自己自定义关于密码的验证方法；


## 最后：建议使用前参考demo中的用法

## Todo：
- 增加更多不同类型的字段验证；
- 考虑增加字段验证规则自定义功能（如多少位数，是否支持区分大小写等）；
- 进一步减少去怼dom，提高性能

---
title: 聊聊Vue.js的事件修饰符
tags: Vue
abbrlink: 9ca26edd
keywords: vue,事件,修饰符
date: 2017-05-25 19:33:33
---
## 事件修饰符
说到vue的事件修饰符,相对angularJs来说,实在是太爽了,大大增加了可读性.

在日常开发中,经常要调用event.preventDefault 或者event.stopPropagation等方法.

没有事件修饰符的话,我们会这样写:
```javascript
//Angularjs
$scope.fn=function(message,event){
    if (event) event.preventDefault()
    alert(message)
  }
}
```

```javascript
//vue 也可以这样
methods: {
  fn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
```

在vue中提供了更加方便的写法:

``` html
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

## 修饰键
在键盘的事件里,Vue也提供了很方便的处理.

```html
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
```

还有更爽的按键别名:

```html
<!-- 同上 -->
<input v-on:keyup.enter="submit">
<!-- 缩写语法 -->
<input @keyup.enter="submit">
```

Vue的按键别名:

* .enter
* .tab
* .delete (捕获 “删除” 和 “退格” 键)
* .esc
* .space
* .up
* .down
* .left
* .right
* .ctrl
* .alt
* .shift
* .meta


## 组合键

```html
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```


有了这些修饰符,避免了魔鬼数字,大大的提高了可读性.
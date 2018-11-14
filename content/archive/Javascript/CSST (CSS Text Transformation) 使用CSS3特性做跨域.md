---
title: '跨域还可以这样玩,使用CSS3特性做跨域'
tags: Javascript
abbrlink: b0bb249b
keywords: 跨域,Javascript,css,技巧,浏览器
date: 2017-06-20 16:14:25
---
## CSST (CSS Text Transformation)


通过CSS3的content获取内容。

1. 利用js动态创建一个link插入到文档中, 请求css文件.

2. 利用 `computedStyle = window.getComputedStyle` 获取指定元素的style 对象

3. 利用 `computedStyle .content` 获取内容



服务端可以返回的 css 文件内容：

```css
  @keyframes anima {
    from {}
    to {
      opacity: 0;
    }
  }
  @-webkit-keyframes anima {
    from {}
    to {
      opacity: 0;
    }
  }
  #CSST {
    content: "${text}";
    animation: anima 2s;
    -webkit-animation: anima 2s;
  }
  ```
${text}就是我们要填充的数据

监听函数 animationstart/webkitAnimationStart 来判断css是否加载完成

给#CSST元素设置动画

js逻辑：

```javascript
function handle () {

  var computedStyle = getComputedStyle(span, false);

  var content = computedStyle.content;

  console.log('content: %s', content);

  var match = content.match(/[\w+=\/]+/);

  // base64解码
  if (match) {
      try {
          content = decodeURIComponent(escape(atob(match[0])));
      } catch (ex) {
          fn(ex);
          return;
      }
  }

  return content
}


var CSST = document.getElementById('CSST');

//监听事件
CSST.addEventListener('animationstart', handler, false);

CSST.addEventListener('webkitAnimationStart', handler, false);
```
元素动画启动,就可以获取到 content 里的内容了


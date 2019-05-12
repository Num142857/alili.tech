---
title: '关于input的一些问题解决方法分享' 
date: 2018-11-30 2:30:12
hidden: true
slug: g7l3jw1ro36
categories: [reprint]
---

{{< raw >}}

                    
<h2>前言</h2>
<p>input是我们接受来自用户的数据常用标签，在前端开发中，相信每个人都会用到这个标签，所以在开发过程中也时候也会遇到一些问题，本文的内容是我在跟input相爱相杀过程中产生的，在此记录分享一下。如果喜欢的话可以点波赞/关注，支持一下，希望大家看完本文可以有所收获。</p>
<blockquote>个人博客了解一下：<a href="http://obkoro1.com/" rel="nofollow noreferrer">obkoro1.com</a>
</blockquote>
<hr>
<h2>本文内容包括：</h2>
<ol>
<li>移动端底部input被弹出的键盘遮挡。</li>
<li>控制input显/隐密码。</li>
<li>在input中输入emoji表情导致请求失败。</li>
<li>input多行输入显示换行。</li>
<li>输入框首尾清除空格-trim()</li>
<li>在input中监听键盘事件</li>
</ol>
<hr>
<h3>移动端底部input被弹出的键盘遮挡</h3>
<p>input输入框是通过<code>position:fixed</code>一直放在页面底部，当点击input进行输入的时候，就会出现如下图片情况（有的机型会遮挡一些）。</p>
<p>当时这个问题是去年在ios中遇到的，在最新版的ios系统中，貌似解决了这个bug，但是为了向下兼容以及防止其他其他机型也出现这个问题，大家可以稍微记一下这个解决方法。</p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/005Y4rCogy1fr8jf4on3cj30ga0suwfi.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/005Y4rCogy1fr8jf4on3cj30ga0suwfi.jpg" alt="" title=""></span></p>
<p>在解决这个问题的时候，有试过下面这种方法:</p>
<p><del>在input的focus事件中，开启一个定时器，然后每隔300毫秒进行一次document.body.scrollTop=document.body.scrollHeight的调整，运行3次即可。</del></p>
<p>当时还以为解决了，但是当你底部评论区还有很多内容，你每次点击input，想要输入的时候，整个页面通过<code>scrollTop</code>就会不断的向下滚动，这个体验不用说自己也知道是相当失败的，然后就再去找解决方法，结果就有了下面这个。</p>
<h4>Element.scrollIntoView()</h4>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView" rel="nofollow noreferrer">Element.scrollIntoView()</a>:方法<strong>让当前的元素滚动到浏览器窗口的可视区域内</strong>。</p>
<pre><code>    document.querySelector('#inputId').scrollIntoView();
    //只要在input的点击事件，或者获取焦点的事件中，加入这个api就好了
</code></pre>
<p>这个api还可以设置对齐方法，选择将input放在屏幕的上方/下方，类似的api还有:<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoViewIfNeeded" rel="nofollow noreferrer">Element.scrollIntoViewIfNeeded()</a>，这两个是解决同一个问题的，选择一个用就可以了。</p>
<hr>
<h3>控制input显/隐密码</h3>
<p>这个就很简单了，只需更改input的type属性值就可以了。可以看一下codepen的<a href="https://codepen.io/OBKoro1/pen/VxxgyG" rel="nofollow noreferrer">demo</a></p>
<pre><code>    //点击函数，获取dom，判断更改属性。
    show(){
        let input=document.getElementById("inputId");  
        if(input.type=="password"){ 
          input.type='text';
        }else{
          input.type='password';
        } 
    }
</code></pre>
<hr>
<h3>在input中输入emoji表情导致请求失败</h3>
<p>现在用户输入emoji简直已经成为了习惯，如果前后端没有对emoji表情进行处理，那么用户在上传的时候，就会请求失败。</p>
<p><strong>通常这个问题是后端那边处理比较合适的</strong>，前端是做不了这件事的，或者说很难做这件事。</p>
<p>之前看过一篇<a href="https://www.bbsmax.com/A/nAJvkxjY5r/" rel="nofollow noreferrer">文章</a>，这个文章里面讲了怎么在上传和拿数据下来的时候不会报错，但是不能在显示的时候转换为表情。</p>
<p>ps:之前拿微信用户名的时候，有些人可能在微信昵称上面就会包含表情，<strong>如果后端没对表情处理转换，那么普通请求也会出错</strong>。</p>
<p>之所以说这个，当表单请求错误的时候各位如果实在找不到问题可以往这方面考虑一下，我真的被坑过的o(╥﹏╥)o。</p>
<hr>
<h3>textarea多行回车换行，显示的时候换行设置：</h3>
<p>在使用<code>textarea </code>标签输入多行文本的时候，如果没有对多行文本显示处理，会导致没有换行的情况,就比如下面这种情况，用户在<code>textarea</code>是有换行的。</p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/005Y4rCogy1fr8nibgks0j30bo0ertc3.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/005Y4rCogy1fr8nibgks0j30bo0ertc3.jpg" alt="" title=""></span></p>
<h4>Css属性:<a href="http://www.w3school.com.cn/cssref/pr_text_white-space.asp" rel="nofollow noreferrer">white-space</a>
</h4>
<p>white-space 属性用于设置如何处理元素内的空白，其中包括空白符和换行符。</p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/005Y4rCogy1fr8ntg3it2j30h106o3yu.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/005Y4rCogy1fr8ntg3it2j30h106o3yu.jpg" alt="" title=""></span></p>
<p>只要在<strong>显示内容的地方将该属性设置为<code>white-space: pre-line</code>或者<code>white-space:pre-wrap</code>，多行文本就可以换行了</strong>。</p>
<h4>设置之后，显示效果：</h4>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/005Y4rCogy1frbajugivgj30bj0e1q5g.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/005Y4rCogy1frbajugivgj30bj0e1q5g.jpg" alt="" title=""></span></p>
<hr>
<h3>输入框首尾清除空格-trim()</h3>
<p>输入框清除首尾空格是input较为常见的需求，通常在上传的时候将首尾空格去除掉。一般使用:字符串的原生方法<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Trim" rel="nofollow noreferrer">trim()</a> 从一个字符串的两端删除空白字符。</p>
<p>trim() 方法并不影响原字符串本身，它返回的是一个新的字符串。</p>
<h4>原生清除方法:</h4>
<pre><code>    //原生方法获取值，清除首尾空格上传str2 
    var str2 = document.getElementById("inputId").trim();
</code></pre>
<h4>Vue清除方法：</h4>
<p>Vue提供了<a href="https://cn.vuejs.org/v2/guide/forms.html#trim" rel="nofollow noreferrer">修饰符</a>删除首尾空格， 加了修饰符<code>.trim</code>会自动过滤用户输入的首尾空白字符</p>
<pre><code>    &lt;input v-model.trim="msg"&gt;
</code></pre>
<p>貌似angular也提供了类似过滤的方法，感兴趣的可以自己去查一下。</p>
<hr>
<h3>在input中监听键盘事件</h3>
<p>在用户登录或者搜索框的时候，一般都会监听键盘事件绑定回车按键，来执行登录/搜索 等操作。</p>
<h4>原生绑定:</h4>
<pre><code> &lt;input onkeydown="keydownMsg(event)" type="text" /&gt;
 function keydownMsg(key) {
        keyCode = key.keyCode; //获取按键代码
        if (keyCode == 13) {  //判断按下的是否为回车键
            // 在input上监听到回车 do something
        }
    }
</code></pre>
<h4>Vue按键修饰符</h4>
<p>Vue为监听键盘事件，提供了<a href="https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6" rel="nofollow noreferrer">按键修饰符</a>，并且为常用的按键提供了别名，使用方法如下:当回车按键在input中被按下的时候，会触发里面的函数。</p>
<pre><code>    &lt;input @keyup.enter="enterActive"&gt;
</code></pre>
<hr>
<h2>结语</h2>
<p>上述内容就是我遇到的一些input问题的解决方式以及跟input相关的一些东西，如果有什么错误，欢迎指正！希望大家看完可以有所收获，喜欢的话，赶紧点波<del>订阅</del>关注/喜欢，方便以后<del>查找</del>复制粘贴，233。</p>
<h3>希望看完的朋友可以点个喜欢/关注，您的支持是对我最大的鼓励。</h3>
<p><strong><a href="http://obkoro1.com/" rel="nofollow noreferrer">个人blog</a></strong> and <strong><a href="https://juejin.im/user/58714f0eb123db4a2eb95372" rel="nofollow noreferrer">掘金个人主页</a></strong>，如需转载，请放上原文链接并署名。码字不易，<strong>感谢</strong>支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。</p>
<p>如果喜欢本文的话，可以关注一下我刚开的订阅号，漫漫技术路，期待未来共同学习成长。</p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/005Y4rCogy1fr8oubn0d3j309k09k3yg.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/005Y4rCogy1fr8oubn0d3j309k09k3yg.jpg" alt="" title=""></span></p>
<p>以上2018.5.12</p>
<h3>参考资料：</h3>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView" rel="nofollow noreferrer">Element.scrollIntoView()</a></p>
<p><a href="https://www.bbsmax.com/A/nAJvkxjY5r/" rel="nofollow noreferrer">移动前端手机输入法自带emoji表情字符处理</a></p>
<p><a href="http://www.w3school.com.cn/cssref/pr_text_white-space.asp" rel="nofollow noreferrer">white-space</a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Trim" rel="nofollow noreferrer">String.prototype.trim()</a></p>
<p><a href="https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6" rel="nofollow noreferrer">Vue按键修饰符</a></p>
<p><a href="http://www.jb51.net/article/21587.htm" rel="nofollow noreferrer">keyCode键码值表</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于input的一些问题解决方法分享

## 原文链接
[https://segmentfault.com/a/1190000014843602](https://segmentfault.com/a/1190000014843602)


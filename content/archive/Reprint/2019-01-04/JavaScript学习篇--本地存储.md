---
title: 'JavaScript学习篇--本地存储' 
date: 2019-01-04 2:30:10
hidden: true
slug: dmvc83jl1zn
categories: [reprint]
---

{{< raw >}}

                    
<p>在客户端运行的js是不能操作用户电脑磁盘中的文件的（这是为了保护客户端运行的安全）。</p>
<p><strong>1、js中的本地存储：</strong></p>
<p>使用js向浏览器的某一个位置中存储一些内容，浏览器即使关闭了，存储的信息也不会销毁，当在重新打开浏览器的时候我们依然可以获取到上一次存储的信息。</p>
<p><strong>本地存储的方案：</strong></p>
<p>传统：</p>
<p>cookie：把信息存储到客户端的浏览器中（但是项目服务器端也是可以获取cookie的）</p>
<p>session：把信息存储到服务器上的（服务器存储）</p>
<p>HTML5：webstorage</p>
<p>localstorage：永久存储在客服端的本地。</p>
<p>sessionstorage：信息的会话存储，会话窗口存在信息也存在，会话窗口关闭信息也就消失了。</p>
<p><strong>2、cookie localstorage sessionstorage</strong></p>
<p>-&gt;webStorage</p>
<p>setltem([key],[value]):像客服端的本地存储一条记录，存储的[value]需要是字符串格式的，如果编写的不是字符串，浏览器会默认的转化为字符串然后在进行存储；同源下存储的[key]是不会重复的，如果之前有的话，是把存储的信息值进行修改。如果存储的value是一个对象，需要先使用JSON.stringify()进行转化。</p>
<p>getltem([key]):获取之前存储的值；</p>
<p>removeltem([key]):移除KEY对应的存储记录</p>
<p>clear():把当前源下的所有的存储记录都移除掉</p>
<p>localStorage.length:获取存储的记录条数</p>
<p>localStorage.key(0):获取索引为0这一项的KEY是什么。</p>
<p>localStorage.setltem('age',7);</p>
<p>localStorage.getltem('age');</p>
<p>localStorage.removeltem('age');</p>
<p>localStorage.clear();</p>
<p><strong>localStorage和sessionStorage的区别</strong></p>
<p>localStorage属于永久存储在本地，不管是刷新页面还是关掉页面或者关闭浏览器，存储的内容都不会消失，只有我们自己手动的去删除才会消失（不管是杀毒软件还是浏览器自带的清除历史记录功能都不能把localStorage存储的内容清除掉）</p>
<p>sessionStorage属于临时的会话存储，只要当前的页面不关闭，信息就可以存储下来，但是页面一旦关闭，存储的信息就会自动清除（F5刷新页面只是把当前的DOM结构等进行重新的渲染，会话并没有关闭）</p>
<p>cookie</p>
<p>document.cookie = 'age = 7'</p>
<p><strong>cookie和localStorage的区别</strong></p>
<p>1）、cookie</p>
<p>cookie存储内容的大小是有限制的，一般同源下只能存储4kb的内容；localStorage存储的内容也有大小限制，一般同源下只能存储5MB</p>
<p>cookie存储的内容是有过期时间的，而localStorage是永久存储到本地，使用杀毒软件或者浏览器自带的清除垃圾的功能都有可能把存储的cookie给删除掉</p>
<p>用户可能处于安全的角度禁用cookie（无痕浏览器），但是不能禁止localStorage</p>
<p><strong>真实的项目中的本地存储都使用哪些东西？</strong></p>
<p>记住用户名密码或者自动登录；用户的部分信息，当用户登录成功后我们会把用户的一些信息记录到本地的cookie中，这样在项目中的任何页面都可以知道当前登录的用户是哪一个了；购物车..（存储少量信息或者是需要浏览器兼容的都需要使用cookie来进行存储）</p>
<p>2）、localStorage</p>
<p>在pc端我们可以用其存储某一个js或者css中的源代码；还可以把一些不需要经常更新的数据存储到本地，存储的时候可以设置一个存储的事件，以后重新刷新页面，看一下时间有没有超过预定的时间，如果已经过时了，我们从新获取最新数据，没超过我们还是继续使用本地数据。</p>
<p><strong>本地存储都是明文存储</strong></p>
<p>对于重要的信息我们一般不要存储到本地，如果非要存储的话我们需要把存储的信息进行加密</p>
<p>可逆转加密：加密完成还可以解密回来</p>
<p>不可逆转加密：MD5</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript学习篇--本地存储

## 原文链接
[https://segmentfault.com/a/1190000010720848](https://segmentfault.com/a/1190000010720848)


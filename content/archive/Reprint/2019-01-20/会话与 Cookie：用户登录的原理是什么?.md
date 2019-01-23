---
title: '会话与 Cookie：用户登录的原理是什么?' 
date: 2019-01-20 2:30:11
hidden: true
slug: kjnrhxzuvbl
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#会话与-cookie用户登录的原理是什么"></a>会话与 Cookie：用户登录的原理是什么?</h1>
<p>Facebook、 Gmail、 Twitter 是我们每天都会用的网站（LCTT 译注：才不是呢）。它们的共同点在于都需要你登录进去后才能做进一步的操作。只有你通过认证并登录后才能在 twitter 发推，在 Facebook 上评论，以及在 Gmail上处理电子邮件。</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/10/Untitled-design-1.jpg"><img src="https://p0.ssl.qhimg.com/t010a9934d5fbc9b4b9.jpg" alt="gmail, facebook login page"></a></p>
<p>那么登录的原理是什么？网站是如何认证的？它怎么知道是哪个用户从哪儿登录进来的？下面我们来对这些问题进行一一解答。</p>
<h3><a href="#用户登录的原理是什么"></a>用户登录的原理是什么?</h3>
<p>每次你在网站的登录页面中输入用户名和密码时，这些信息都会发送到服务器。服务器随后会将你的密码与服务器中的密码进行验证。如果两者不匹配，则你会得到一个错误密码的提示。如果两者匹配，则成功登录。</p>
<h3><a href="#登录时发生了什么"></a>登录时发生了什么?</h3>
<p>登录后，web 服务器会初始化一个会话session并在你的浏览器中设置一个 cookie 变量。该 cookie 变量用于作为新建会话的一个引用。搞晕了？让我们说的再简单一点。</p>
<h3><a href="#会话的原理是什么"></a>会话的原理是什么?</h3>
<p>服务器在用户名和密码都正确的情况下会初始化一个会话。会话的定义很复杂，你可以把它理解为“关系的开始”。</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/10/pasted-image-0-9.png"><img src="https://p0.ssl.qhimg.com/t01943f2a74b22754ff.png" alt="session beginning of a relationship or partnership"></a></p>
<p>认证通过后，服务器就开始跟你展开一段关系了。由于服务器不能象我们人类一样看东西，它会在我们的浏览器中设置一个 cookie 来将我们的关系从其他人与服务器的关系标识出来。</p>
<h3><a href="#什么是-cookie"></a>什么是 Cookie?</h3>
<p>cookie 是网站在你的浏览器中存储的一小段数据。你应该已经见过他们了。</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/10/pasted-image-0-1-4.png"><img src="https://p0.ssl.qhimg.com/t01dc1b885618c23ca6.png" alt="theitstuff official facebook page cookies"></a></p>
<p>当你登录后，服务器为你创建一段关系或者说一个会话，然后将唯一标识这个会话的会话 id 以 cookie 的形式存储在你的浏览器中。</p>
<h3><a href="#什么意思"></a>什么意思?</h3>
<p>所有这些东西存在的原因在于识别出你来，这样当你写评论或者发推时，服务器能知道是谁在发评论，是谁在发推。</p>
<p>当你登录后，会产生一个包含会话 id 的 cookie。这样，这个会话 id 就被赋予了那个输入正确用户名和密码的人了。</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/10/pasted-image-0-2-3-e1508926255472.png"><img src="https://p0.ssl.qhimg.com/t010fd14f405a78a0e5.png" alt="facebook cookies in web browser"></a></p>
<p>也就是说，会话 id 被赋予给了拥有这个账户的人了。之后，所有在网站上产生的行为，服务器都能通过他们的会话 id 来判断是由谁发起的。</p>
<h3><a href="#如何让我保持登录状态"></a>如何让我保持登录状态?</h3>
<p>会话有一定的时间限制。这一点与现实生活中不一样，现实生活中的关系可以在不见面的情况下持续很长一段时间，而会话具有时间限制。你必须要不断地通过一些动作来告诉服务器你还在线。否则的话，服务器会关掉这个会话，而你会被登出。</p>
<p><a href="http://www.theitstuff.com/wp-content/uploads/2017/10/pasted-image-0-3-3-e1508926314117.png"><img src="https://p0.ssl.qhimg.com/t01cee5a26b7b3203c4.png" alt="websites keep me logged in option"></a></p>
<p>不过在某些网站上可以启用“保持登录”功能，这样服务器会将另一个唯一变量以 cookie 的形式保存到我们的浏览器中。这个唯一变量会通过与服务器上的变量进行对比来实现自动登录。若有人盗取了这个唯一标识（我们称之为 cookie stealing），他们就能访问你的账户了。</p>
<h3><a href="#结论"></a>结论</h3>
<p>我们讨论了登录系统的工作原理以及网站是如何进行认证的。我们还学到了什么是会话和 cookies，以及它们在登录机制中的作用。</p>
<p>我们希望你们以及理解了用户登录的工作原理，如有疑问，欢迎提问。</p>
<hr>
<p>via: <a href="http://www.theitstuff.com/sessions-cookies-user-login-work">http://www.theitstuff.com/sessions-cookies-user-login-work</a></p>
<p>作者：<a href="http://www.theitstuff.com/author/reevkandari">Rishabh Kandari</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
会话与 Cookie：用户登录的原理是什么?

## 原文链接
[https://www.zcfy.cc/article/sessions-and-cookies-how-does-user-login-work](https://www.zcfy.cc/article/sessions-and-cookies-how-does-user-login-work)


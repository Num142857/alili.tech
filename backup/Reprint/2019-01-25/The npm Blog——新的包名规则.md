---
title: 'The npm Blog——新的包名规则' 
date: 2019-01-25 2:30:23
hidden: true
slug: osv1izrn6e
categories: [reprint]
---

{{< raw >}}

            <h2><a href="http://blog.npmjs.org/post/168978377570/new-package-moniker-rules">新的包名规则</a></h2>
<p>最近我们对于包的命名方式进行了一些修改，为的是更好的防御「误植」攻击，同时帮助包开发者们挑选出更加合适的包名。</p>
<p>可能你已经阅读过我们之前发布的文章 <a href="http://blog.npmjs.org/post/163723642530/crossenv-malware-on-the-npm-registry">npm注册表上的误植攻击</a>。我们对这一事件的回应是对于那些与已有包名类似的包采用内部工具进行识别。我们一直在亲自回顾着这些并且将在一些案例上采取措施。在这些包当中我们所注意到的一些趋势正引导我们去相信，我们可以鼓励人们更好地为包命名，从而能够满足注册用户以及包开发者的需求。具体一点来说，与现有包名仅在标点上不同的包就不可以再发布了。</p>
<p>包名可以包括标点符号、破折号和下划线 (<code>.</code>, <code>-</code>, <code>_</code>)等。 这些标点可以使包名变得简单易懂！比如<code>react-native</code> 就比 <code>reactnative</code> 更加的一目了然。 但是，许多存在「误植」攻击的名字故意通过标点符号来进行监听。比如, 在这种事情发生之前，你可以将<code>react-native</code>的包命名为<code>reactnative</code>来发布，但是在我们新的命名规则之下，是不允许的。</p>
<p>下面就来详细的讲一下这种变化。</p>
<h2>新的规则</h2>
<p>如果你要发布一个新的包——也就是这个包在注册表中从来没有被发布过——我们把包名中的标点符号去掉并与现有的包进行比较。如果包名中不存在标点符号，我们是不允许创建这个包的。相反，我们建议在自己的作用域之下以此名字来发布包。当然，你还可以找到一个与现有包名完全不同的新名称，但是用自己的作用域是更快的一种方式。</p>
<p>这里有一些实例来说明差异。</p>
<p>由于<code>react-native</code>已经存在，这样的就不可以再发布了：</p>
<ul>
<li><p><code>reactnative</code></p>
</li>
<li><p><code>react_native</code></p>
</li>
<li><p><code>react.native</code></p>
</li>
</ul>
<p>类似的，由于<code>jsonstream</code>已经存在了，这样的就不能再发布了：</p>
<ul>
<li><p><code>json-stream</code></p>
</li>
<li><p><code>json.stream</code></p>
</li>
<li><p><code>json_stream</code></p>
</li>
<li><p><code>json-stream</code></p>
</li>
</ul>
<h2>使用作用域！</h2>
<p>如果因为你起的包名与现有的包名太相近而被阻止发布这个包，那么找到一个独一无二包名最简单方法就是使用你的作用域。你可以使用<code>@</code>+你的npm用户名加在包名前面将包划到你的npm账户作用域下。比如，我的npm用户名是<code>ceejbot</code>，所以我的作用域是<code>@ceejbot</code>。</p>
<p>在你自己的作用域下发布一个包是免费的！你可以这样去做：</p>
<p>我已经知道<code>json-stream</code>与现有包名太接近了，所以我需要找到一个新的名字。首先，我需要编辑我的<code>package.json</code>文件，添加我的npm账户名来划分一个作用域，所以：</p>
<pre><code class="hljs json">{
    <span class="hljs-attr">"name"</span>: <span class="hljs-string">"json-stream"</span>
}

</code></pre><p>修改为：</p>
<pre><code class="hljs json">{
    <span class="hljs-attr">"name"</span>: <span class="hljs-string">"@ceejbot/json-stream"</span>
}


</code></pre><p>然后我要发布这个包。被划了作用域的包默认是私有的，所以要通过--access=public  让它变为公有的包：</p>
<pre><code class="hljs kotlin">&gt; npm publish --access=<span class="hljs-keyword">public</span>
+ <span class="hljs-meta">@ceejbot</span>/json-<span class="hljs-symbol">stream@</span><span class="hljs-number">1.0</span><span class="hljs-number">.0</span>

</code></pre><p>每个人都可以向npm注册表中发布公共的作用域包，但是你想发布_私有_的包就要<a href="http://t.umblr.com/redirect?z=https%3A%2F%2Fwww.npmjs.com%2Ffeatures&amp;t=ZmQwODk1MjFlZjhjYTFhNDI5MTAzNTFmMDU5MWIyZTUyNzM5NmFkOCx4ekptdExmcQ%3D%3D&amp;b=t%3AnXsLs1P4AptPf1fBr_nFxw&amp;p=http%3A%2F%2Fblog.npmjs.org%2Fpost%2F168978377570%2Fnew-package-moniker-rules&amp;m=1">付费订阅</a>了。要了解更多关于作用域包的信息，请查看我们的<a href="http://t.umblr.com/redirect?z=https%3A%2F%2Fdocs.npmjs.com%2Fgetting-started%2Fscoped-packages&amp;t=N2NiMGMwNDY4MWUxYzUzOTBmOTc0M2ZiNjM5NWEyMTZjMzdkYTRiMCx4ekptdExmcQ%3D%3D&amp;b=t%3AnXsLs1P4AptPf1fBr_nFxw&amp;p=http%3A%2F%2Fblog.npmjs.org%2Fpost%2F168978377570%2Fnew-package-moniker-rules&amp;m=1">文档</a>。</p>
<h2>关于包命名的历史</h2>
<p>在npm注册表上，包名的历史是一个很小心的地添加条件限制的过程。在最早的时候，npm允许在包名上添加url安全字符，包括大写和小写字母。但是现在创建的包名中不能再有大写字母了，但是在npm注册表中那些包名中有大写字母的包依然存在也依然在使用，包名仅仅在大小写上的差异让我们第一次遇到了误植事件！</p>
<p>可能大多数人遇到的例子是<code>jsonstream</code>。<a href="http://t.umblr.com/redirect?z=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2FJSONStream&amp;t=YTE1YTNmMWI5MTIzNzk2ZjBhOGU5NWMwMDUzOGUxZmVhNTVmMGNjMix4ekptdExmcQ%3D%3D&amp;b=t%3AnXsLs1P4AptPf1fBr_nFxw&amp;p=http%3A%2F%2Fblog.npmjs.org%2Fpost%2F168978377570%2Fnew-package-moniker-rules&amp;m=1">JSONStream</a> 和 <a href="http://t.umblr.com/redirect?z=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fjsonstream&amp;t=NzJhODdhMjZmZjEzOGFiM2M2ODFjZmUwOWNlMThjODVhY2Q5MDE4Yix4ekptdExmcQ%3D%3D&amp;b=t%3AnXsLs1P4AptPf1fBr_nFxw&amp;p=http%3A%2F%2Fblog.npmjs.org%2Fpost%2F168978377570%2Fnew-package-moniker-rules&amp;m=1">jsonstream</a> 是不同的包但是很难区分。如果你在一些大小写不敏感的系统中安装这些包就可能有问题，比如在大多数的OSX电脑文件系统中。</p>
<p>并不是所有的url安全字符都是合法的，你可以使用 <a href="http://t.umblr.com/redirect?z=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fvalidate-npm-package-name&amp;t=YmVjNmUzYWU0ZDkwZjAxMjlhMjljNzA0MWY0YzI1ZDZmNzI4NmU0Yyx4ekptdExmcQ%3D%3D&amp;b=t%3AnXsLs1P4AptPf1fBr_nFxw&amp;p=http%3A%2F%2Fblog.npmjs.org%2Fpost%2F168978377570%2Fnew-package-moniker-rules&amp;m=1">validate-npm-package-name</a> 包来检测包名中的字符是不是都是合法的。但是，你需要对注册表进行<a href="http://t.umblr.com/redirect?z=https%3A%2F%2Fwww.npmjs.com%2Fsearch&amp;t=OWFlNzNiMzNhNmE2NTQ5ZWYzYzdkOGU4Mjg3ZTc1OWNmYzJhYzc0OCx4ekptdExmcQ%3D%3D&amp;b=t%3AnXsLs1P4AptPf1fBr_nFxw&amp;p=http%3A%2F%2Fblog.npmjs.org%2Fpost%2F168978377570%2Fnew-package-moniker-rules&amp;m=1">搜索</a>来确定您想要的名称是否已经在使用。</p>
<h2>好的包名可以帮助到所有人</h2>
<p>我们希望新的包名规则可以帮助包开发者们挑选出合适的名字，并且能够帮助用户去避免意外获取到错误的包，如果你有任何的问题/想法/困惑，可以在<a href="mailto:support@npmjs.com">support@npmjs.com</a>发消息给我们，或者发twitter到<a href="https://twitter.com/npm_support?lang=en">@npm_support</a>。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
The npm Blog——新的包名规则

## 原文链接
[https://www.zcfy.cc/article/the-npm-blog-new-package-moniker-rules](https://www.zcfy.cc/article/the-npm-blog-new-package-moniker-rules)


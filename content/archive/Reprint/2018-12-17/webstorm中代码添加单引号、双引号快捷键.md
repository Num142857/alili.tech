---
title: 'webstorm中代码添加单引号、双引号快捷键' 
date: 2018-12-17 2:30:06
hidden: true
slug: 3adn5cth4i8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>在开发时，为某个编码单元，比如一个单词，添加单引号和双引号，将其变成字符串是常见的情形，比如下面这个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let users = [{
                name: &quot;zhangsan&quot;,
                age:25,
            },{
                name: &quot;lisi&quot;,
                age:26,
            },{
                name: &quot;wangwu&quot;,
                age:27,
            }]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>let users = [{
<span class="hljs-symbol">                name:</span> <span class="hljs-string">"zhangsan"</span>,
<span class="hljs-symbol">                age:</span><span class="hljs-number">25</span>,
            },{
<span class="hljs-symbol">                name:</span> <span class="hljs-string">"lisi"</span>,
<span class="hljs-symbol">                age:</span><span class="hljs-number">26</span>,
            },{
<span class="hljs-symbol">                name:</span> <span class="hljs-string">"wangwu"</span>,
<span class="hljs-symbol">                age:</span><span class="hljs-number">27</span>,
            }]
</code></pre>
<p>有个需求是你现在得把它转成json，而这里面name,age键是不符合JSON中<strong>键必须是字符串</strong>规范的，于是乎，你得给name,age加上双引号才行。</p>
<h2 id="articleHeader1">解决方案</h2>
<p>简单查阅了一下，并没有找到，基本都是webstorm快捷键大全之类的文章。<br>然后我就Ctrl + Alt + S 打开了webstorm设置框。</p>
<p>在keymap的Editor Actions里面，并没有找到有相关的快捷键。</p>
<p>好了，不卖关子了，到底在哪里才能搞成这件小事呢？</p>
<p>答案是：<br><strong>Editer --&gt; General --&gt; Smart Keys</strong><br>这里面有一个复选项是<strong>Surfound selection on typing quote or brace</strong>,将其勾选就可以了（<strong>webstorm默认不勾选</strong>，所以默认情况下大家是无法完成加引号操作滴）。</p>
<p>截图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012911501?w=749&amp;h=469" src="https://static.alili.tech/img/remote/1460000012911501?w=749&amp;h=469" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">用法</h2>
<p>设定好了这个选项以后，选中某个你想添加双引号、单引号、中括号、大括号、小括号的编程单元（单词或短语），按对应的键盘上的按键就可以了。</p>
<p><strong>比如，添加双引号，就是选中某单词，按shift+引号键</strong>。</p>
<h2 id="articleHeader3">结语</h2>
<p>这么看起来，本文标题起的并不太恰当，因为这是通过<strong>设置了一个选项</strong>来完成的，按键还是默认的按键。</p>
<p>不过，不管它了。</p>
<p>设置了这个以后，我们不仅可以加单、双引号，<strong>还能加大、中、小括号，这倒算是一个意外收获。</strong></p>
<p>加括号的场景也是有的，比如你写了一个较长的表达式，为了分清优先级，就加小括号，如果你以前是在表达式左边加左括号、右边加右括号的话，这次就可以直接选中表达式，按住shift+9了。</p>
<p>最后，<strong>编程贵在实践，现在就打开webstorm，设置这个选项吧</strong>。</p>
<p>为每日的进步干杯，cheers。</p>
<h2 id="articleHeader4">关于作者</h2>
<p><a href="https://cunzaizhuyi.github.io" rel="nofollow noreferrer" target="_blank">技术博客</a>  </p>
<p><a href="https://github.com/cunzaizhuyi" rel="nofollow noreferrer" target="_blank">GitHub</a>  </p>
<p><a href="https://juejin.im/user/5934c9f5fe88c20061cc7058/posts" rel="nofollow noreferrer" target="_blank">掘金主页</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webstorm中代码添加单引号、双引号快捷键

## 原文链接
[https://segmentfault.com/a/1190000012911496](https://segmentfault.com/a/1190000012911496)


---
title: 'vue从创建到完整的饿了么（19）阻止事件冒泡' 
date: 2018-12-29 2:30:10
hidden: true
slug: be1t84kbnjf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">说明</h2>
<p>1.上一章--<a href="https://segmentfault.com/a/1190000011397399">购物车详细信息的展示与删除</a><br>2.苍渡大神源码--<a href="https://github.com/bailicangdu/vue2-elm" rel="nofollow noreferrer" target="_blank">项目源码地址</a><br>3.数据接口--<a href="https://github.com/bailicangdu/node-elm/blob/master/API.md" rel="nofollow noreferrer" target="_blank">API接口地址</a><br>4.UI框架--<a href="https://mint-ui.github.io/#!/zh-cn" rel="nofollow noreferrer" target="_blank">Mint UI</a></p>
<h2 id="articleHeader1">开始</h2>
<p>1.目前的购物车效果<br><span class="img-wrap"><img data-src="/img/bVWp54?w=581&amp;h=778" src="https://static.alili.tech/img/bVWp54?w=581&amp;h=778" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2.可以看到，点击背景，购物车并不会消失，现在咱们来写点击事件。<br>因为购物车的显示与否是data中的<code>carinfo</code>控制的，所以咱们的点击事件直接让<code>carinfo</code>为false即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name=&quot;opacity&quot;>
          <div @click=&quot;carinfo=false&quot; v-if=&quot;carinfo&amp;&amp;mycar.length>=1&quot; class=&quot;car&quot;>
                          <div class=&quot;carmain flex2&quot;>
                              <div class=&quot;cartop padlr10 ih50&quot;>
                                    <span>购物车</span>
                                    <span @click=&quot;mycar=[]&quot; class=&quot;right&quot;><icon class=&quot;w15 mgr5 y2&quot; name=&quot;delete&quot;></icon>清空</span>
                              </div>
                              <div class=&quot;carmainbox flex1&quot;>
                                  <div v-for=&quot;item in mycar&quot; class=&quot;carbox after padlr10 bgfff ih50&quot;>
                                        <span class=&quot;bold col666&quot;>"{{"item.shop.specfoods[0].name"}}"</span>
                                        <span class=&quot;right&quot;>
                                            <span class=&quot;colred mgr5&quot;>￥"{{"item.shop.specfoods[0].price*item.num"}}"</span>
                                            <span @click=&quot;item.num=item.num-1&quot;><icon class=&quot;addicon y4&quot; name=&quot;offline&quot;></icon></span>
                                            <span class=&quot;ih20 inblock&quot;>"{{"item.num"}}"</span>
                                            <span @click=&quot;item.num=item.num+1&quot; class=&quot;&quot;><icon name=&quot;add&quot; class=&quot;addicon y4&quot;></icon></span>
                                        </span>
                                  </div>
                              </div>
                          </div>
          </div>
    </transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"opacity"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"carinfo=false"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"carinfo&amp;&amp;mycar.length&gt;=1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"car"</span>&gt;</span>
                          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carmain flex2"</span>&gt;</span>
                              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cartop padlr10 ih50"</span>&gt;</span>
                                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>购物车<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"mycar=[]"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"w15 mgr5 y2"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"delete"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span>清空<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carmainbox flex1"</span>&gt;</span>
                                  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in mycar"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carbox after padlr10 bgfff ih50"</span>&gt;</span>
                                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bold col666"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.shop.specfoods[0].name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
                                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colred mgr5"</span>&gt;</span>￥</span><span class="hljs-template-variable">"{{"item.shop.specfoods[0].price*item.num"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"item.num=item.num-1"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addicon y4"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"offline"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih20 inblock"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.num"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"item.num=item.num+1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"add"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addicon y4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></span></code></pre>
<p>结果如下<br><span class="img-wrap"><img data-src="/img/bVWqAC?w=581&amp;h=778" src="https://static.alili.tech/img/bVWqAC?w=581&amp;h=778" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>？？？可以看到点击商品的加减号，购物车居然也隐藏了！！！这明显并不是咱们想要的。<br>这是因为购物车内部的点击事件也出触发了父元素的点击事件，所以我们阻止事件冒泡即可</p>
<p>这里有两种方法，一种是购物车内部的点击事件传入<code>$event</code>参数，这是dom对象，使用js原生的方法阻止。</p>
<p>但咱们用vue封装的方法，非常简单，在购物车内部的点击事件<code>@click</code>改为<code>@click.stop</code>即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name=&quot;opacity&quot;>
          <div @click=&quot;carinfo=false&quot; v-if=&quot;carinfo&amp;&amp;mycar.length>=1&quot; class=&quot;car&quot;>
                          <div class=&quot;carmain flex2&quot;>
                              <div class=&quot;cartop padlr10 ih50&quot;>
                                    <span>购物车</span>
                                    <span @click=&quot;mycar=[]&quot; class=&quot;right&quot;><icon class=&quot;w15 mgr5 y2&quot; name=&quot;delete&quot;></icon>清空</span>
                              </div>
                              <div class=&quot;carmainbox flex1&quot;>
                                  <div v-for=&quot;item in mycar&quot; class=&quot;carbox after padlr10 bgfff ih50&quot;>
                                        <span class=&quot;bold col666&quot;>"{{"item.shop.specfoods[0].name"}}"</span>
                                        <span class=&quot;right&quot;>
                                            <span class=&quot;colred mgr5&quot;>￥"{{"item.shop.specfoods[0].price*item.num"}}"</span>
                                            <span @click.stop=&quot;item.num=item.num-1&quot;><icon class=&quot;addicon y4&quot; name=&quot;offline&quot;></icon></span>
                                            <span class=&quot;ih20 inblock&quot;>"{{"item.num"}}"</span>
                                            <span @click.stop=&quot;item.num=item.num+1&quot; class=&quot;&quot;><icon name=&quot;add&quot; class=&quot;addicon y4&quot;></icon></span>
                                        </span>
                                  </div>
                              </div>
                          </div>
          </div>
    </transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"opacity"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"carinfo=false"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"carinfo&amp;&amp;mycar.length&gt;=1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"car"</span>&gt;</span>
                          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carmain flex2"</span>&gt;</span>
                              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cartop padlr10 ih50"</span>&gt;</span>
                                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>购物车<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"mycar=[]"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"w15 mgr5 y2"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"delete"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span>清空<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carmainbox flex1"</span>&gt;</span>
                                  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in mycar"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"carbox after padlr10 bgfff ih50"</span>&gt;</span>
                                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bold col666"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.shop.specfoods[0].name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
                                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colred mgr5"</span>&gt;</span>￥</span><span class="hljs-template-variable">"{{"item.shop.specfoods[0].price*item.num"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"item.num=item.num-1"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addicon y4"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"offline"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih20 inblock"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.num"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"item.num=item.num+1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"add"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addicon y4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                                  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></span></code></pre>
<p>结果如下<br><span class="img-wrap"><img data-src="/img/bVWqCQ?w=581&amp;h=778" src="https://static.alili.tech/img/bVWqCQ?w=581&amp;h=778" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>解决！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue从创建到完整的饿了么（19）阻止事件冒泡

## 原文链接
[https://segmentfault.com/a/1190000011503045](https://segmentfault.com/a/1190000011503045)


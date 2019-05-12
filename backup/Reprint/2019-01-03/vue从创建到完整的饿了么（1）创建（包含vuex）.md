---
title: 'vue从创建到完整的饿了么（1）创建（包含vuex）' 
date: 2019-01-03 2:30:11
hidden: true
slug: qs7ryxiwxl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">说明</h2>
<p><strong>1.</strong>项目准备用苍渡大神的elm项目，<a href="https://github.com/bailicangdu/vue2-elm" rel="nofollow noreferrer" target="_blank">Github地址</a><br><strong>2.</strong>node版本 6.10.3，用的windows，工具用的sublime<br><strong>3.</strong>下一章--<a href="https://segmentfault.com/a/1190000010809989">vue从创建到完整的饿了么（2）路由</a></p>
<hr>
<h2 id="articleHeader1">开始</h2>
<ol>
<li>cmd 进入想要创建的目录。</li>
<li>
<code>vue init webpack elm</code>  elm是项目名称（确保安装了node，vue-cli）。</li>
<li>cmd 输入<code>cd elm</code> 进入vue文件。</li>
<li>
<code>npm install</code>（下载配置文件）。</li>
<li>
<code>npm install vue-router vue-resource --save</code>（安装 vue 路由模块 vue-router 和网络请求模块 vue-resource）。</li>
<li>项目目录如图</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVTiiX?w=251&amp;h=338" src="https://static.alili.tech/img/bVTiiX?w=251&amp;h=338" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>打开config目录中的index文件，将<code>port：3000</code>改为<code>port：1999</code>（修改项目端口，以免与其它文件冲突）。</li>
<li>cmd输入<code>npm run dev</code> 浏览器弹出新页面显示一个VUE的大logo表示创建成功，不弹出页面输入localhost:1999也可以访问。</li>
<li>发现这个项目还用了一个vuex，没用过，先安上再说cmd输入<code>npm install --save vuex</code>（cmd先把vue服务关掉ctrl+c）。</li>
<li>
<p>看了看vuex文档，觉得如果把一个个vue组件当成一个个独立闭包函数，那vuex就相当于一个全局的json，里面有几个key：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   State：用来存放变量，
   Mutations：用来存放函数（同步），
   Getters：State的计算属性，也是存放函数，但是当state属性改变时，Getters的返回值也会随之改变，
   Action：函数（异步）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>   State：用来存放变量，
   Mutations：用来存放函数（同步），
   Getters：State的计算属性，也是存放函数，但是当<span class="hljs-keyword">state</span>属性改变时，Getters的返回值也会随之改变，
   Action：函数（异步）</code></pre>
</li>
</ol>
<p>在任意一个组件中都可以调用vuex（这是我目前对vuex的认识）。</p>
<ol><li>发现项目是把vuex放到src文件夹的store文件夹里，咱们也来。在src中新建文件夹store，在store文件夹中新建文件index.js并输入几行代码，结果如图。</li></ol>
<p><span class="img-wrap"><img data-src="/img/bVTkpf?w=1027&amp;h=813" src="https://static.alili.tech/img/bVTkpf?w=1027&amp;h=813" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>vuex一个属性一个文件，再把所有属性汇聚的index里，挂到Store下输出</li>
<li>新建getters.js,actions.js,mutations.js文件,代码全都一样如图 <span class="img-wrap"><img data-src="/img/bVTkBz?w=1027&amp;h=813" src="https://static.alili.tech/img/bVTkBz?w=1027&amp;h=813" alt="" title="" style="cursor: pointer; display: inline;"></span>
</li>
<li>现在vuex可以输出了，但是在哪里引用呢？打开main.js,修改后如图<span class="img-wrap"><img data-src="/img/bVTkCT?w=1027&amp;h=813" src="https://static.alili.tech/img/bVTkCT?w=1027&amp;h=813" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>cmd输入<code>npm run dev</code>后显示下图则表示正常<span class="img-wrap"><img data-src="/img/bVTkDd?w=997&amp;h=583" src="https://static.alili.tech/img/bVTkDd?w=997&amp;h=583" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>准备工作先做这么多，下面准备写页面</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue从创建到完整的饿了么（1）创建（包含vuex）

## 原文链接
[https://segmentfault.com/a/1190000010765095](https://segmentfault.com/a/1190000010765095)


---
title: 'vue+element+echarts 响应式后台管理系统，了解一下？' 
date: 2018-12-13 2:30:07
hidden: true
slug: z11z5dga6
categories: [reprint]
---

{{< raw >}}

                    
<p>寒假结束了，趁着寒假，自己玩了一下element和echarts去实现了一个简单的后台管理系统。<br>项目比较简单，十分适合入门，涉及到了轮播图，表格，表单，echarts柱形图和折线图，以及网页的响应式等。</p>
<h4>先来看看效果：</h4>
<h4>pc端</h4>
<p><span class="img-wrap"><img data-src="/img/bV4clm?w=1371&amp;h=759" src="https://static.alili.tech/img/bV4clm?w=1371&amp;h=759" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV4cmw?w=1371&amp;h=759" src="https://static.alili.tech/img/bV4cmw?w=1371&amp;h=759" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV4cp5?w=1274&amp;h=866" src="https://static.alili.tech/img/bV4cp5?w=1274&amp;h=866" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>移动端：</h4>
<p><span class="img-wrap"><img data-src="/img/bV4cse?w=370&amp;h=667" src="https://static.alili.tech/img/bV4cse?w=370&amp;h=667" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV4csA?w=370&amp;h=667" src="https://static.alili.tech/img/bV4csA?w=370&amp;h=667" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV4csC?w=370&amp;h=667" src="https://static.alili.tech/img/bV4csC?w=370&amp;h=667" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>项目结构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src
  |---common                     // 公用的文件
        |---css
             |---base.scss      // 公用的css样式
        |---components          // 组件      
             |---Carousel.vue   // 轮播图组件
             |---Form.vue       // 表单组件
             |---Tables.vue     // 表格组件
             |---TheHeader.vue  // header组件
             |---TheNav.vue     // 左侧导航栏组件
             |---TwoEcharts.vue // 柱形图和折线图组件
        |---images
             |---portrait.png   // 头像
        |---router
             |---index.js       // 路由
        |---views
             |---CarouseTable.vue // 轮播图和表格页面
             |---Echarts.vue      // echarts图表页面
             |---FormView.vue     // 表单页面
  |---App.vue                     // 总app入口
  |---main.js                     // app实例" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>src
  <span class="hljs-string">|---common                     // 公用的文件</span>
        <span class="hljs-string">|---css</span>
             <span class="hljs-string">|---base.scss      // 公用的css样式</span>
        <span class="hljs-string">|---components          // 组件      </span>
             <span class="hljs-string">|---Carousel.vue   // 轮播图组件</span>
             <span class="hljs-string">|---Form.vue       // 表单组件</span>
             <span class="hljs-string">|---Tables.vue     // 表格组件</span>
             <span class="hljs-string">|---TheHeader.vue  // header组件</span>
             <span class="hljs-string">|---TheNav.vue     // 左侧导航栏组件</span>
             <span class="hljs-string">|---TwoEcharts.vue // 柱形图和折线图组件</span>
        <span class="hljs-string">|---images</span>
             <span class="hljs-string">|---portrait.png   // 头像</span>
        <span class="hljs-string">|---router</span>
             <span class="hljs-string">|---index.js       // 路由</span>
        <span class="hljs-string">|---views</span>
             <span class="hljs-string">|---CarouseTable.vue // 轮播图和表格页面</span>
             <span class="hljs-string">|---Echarts.vue      // echarts图表页面</span>
             <span class="hljs-string">|---FormView.vue     // 表单页面</span>
  <span class="hljs-string">|---App.vue                     // 总app入口</span>
  <span class="hljs-string">|---main.js                     // app实例</span></code></pre>
<h4>技术栈</h4>
<ul>
<li>vue ^2.5.2、 vue-router</li>
<li>scss 中文网站： <a href="https://www.sass.hk/" rel="nofollow noreferrer" target="_blank">scss中文</a>
</li>
<li>Element (表格，表单，布局等) 官网：<a href="http://element-cn.eleme.io/#/zh-CN" rel="nofollow noreferrer" target="_blank">Element</a>
</li>
<li>Echarts (柱形图和折线图) 官网： <a href="http://echarts.baidu.com/" rel="nofollow noreferrer" target="_blank">Echarst</a>
</li>
</ul>
<p>本文代码地址：<a href="https://github.com/HolyZheng/Backstage-management-system" rel="nofollow noreferrer" target="_blank">后台管理系统源码</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span>
<span class="hljs-comment"># build for production with minification</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>
<span class="hljs-comment"># build for production and view the bundle analyzer report</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build --report</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+element+echarts 响应式后台管理系统，了解一下？

## 原文链接
[https://segmentfault.com/a/1190000013355705](https://segmentfault.com/a/1190000013355705)


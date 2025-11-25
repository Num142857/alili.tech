---
title: 'vue-event-calendar 事件日历插件' 
date: 2019-01-29 2:30:10
hidden: true
slug: zypchl3cqj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-event-calendar</h1>
<blockquote><p>vue-event-calendar是一款简单小巧的事件日历组件，针对Vue2开发。样式美观，且响应式。<br><a href="http://geoffzhu.cn/vue-event-calendar/" rel="nofollow noreferrer" target="_blank">在线例子</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007898860?w=591&amp;h=415" src="https://static.alili.tech/img/remote/1460000007898860?w=591&amp;h=415" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://www.npmjs.com/package/vue-event-calendar" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000007898861" src="https://static.alili.tech/img/remote/1460000007898861" alt="npm version" title="npm version" style="cursor: pointer; display: inline;"></span></a></p>
<h2 id="articleHeader1">依赖</h2>
<ul><li>vue: ^2.0.0</li></ul>
<h2 id="articleHeader2">使用方法</h2>
<h4>安装</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm install vue-event-calendar --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="sh" style="word-break: break-word; white-space: initial;"> npm <span class="hljs-keyword">install</span> vue-<span class="hljs-keyword">event</span>-calendar <span class="hljs-comment">--save</span></code></pre>
<h4>入口 Main.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'en'}) //可以设置语言，支持中文和英文" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">'vue-event-calendar/dist/style.css'</span> <span class="hljs-comment">//1.1.10之后的版本，css被放在了单独的文件中，方便替换</span>
<span class="hljs-keyword">import</span> vueEventCalendar <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-event-calendar'</span>
Vue.use(vueEventCalendar, {<span class="hljs-attr">locale</span>: <span class="hljs-string">'en'</span>}) <span class="hljs-comment">//可以设置语言，支持中文和英文</span></code></pre>
<h4>用法示例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <vue-event-calendar :events=&quot;demoEvents&quot; @monthChanged=&quot;&quot; @dayChanged=&quot;&quot;></vue-event-calendar>
</template>

<script>
export default {
  data () {
    return {
      demoEvents: [{
        date: '2016/12/15',
        title: 'eat',
        desc: 'longlonglong description'
      },{
        date: '2016/11/12',
        title: 'this is a title'
      }]
    }
  },
  methods: {
    monthChange (month) {
      console.log(month)
    },
    dayChange (day) {
      console.log(day)
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">vue-event-calendar</span> <span class="hljs-attr">:events</span>=<span class="hljs-string">"demoEvents"</span> @<span class="hljs-attr">monthChanged</span>=<span class="hljs-string">""</span> @<span class="hljs-attr">dayChanged</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">vue-event-calendar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">demoEvents</span>: [{
        <span class="hljs-attr">date</span>: <span class="hljs-string">'2016/12/15'</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">'eat'</span>,
        <span class="hljs-attr">desc</span>: <span class="hljs-string">'longlonglong description'</span>
      },{
        <span class="hljs-attr">date</span>: <span class="hljs-string">'2016/11/12'</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">'this is a title'</span>
      }]
    }
  },
  <span class="hljs-attr">methods</span>: {
    monthChange (month) {
      <span class="hljs-built_in">console</span>.log(month)
    },
    dayChange (day) {
      <span class="hljs-built_in">console</span>.log(day)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader3">自定义事件模版（可以允许你展示更多信息）</h2>
<p>vue-event-calendar允许自定义事件模版，但是这个功能需要Vue 2.1.0版本以上才可以使用。原因是我试用了2.1.0以上才有的新功能作用域插槽(Scoped Slots)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <vue-event-calendar :events=&quot;demoEvents&quot;>
      <template scope=&quot;props&quot;>
        <div v-for=&quot;(event, index) in props.showEvents&quot; class=&quot;event-item&quot;>
          <!-- 这里拿到的是传入的单个event所有数据 -->
          "{{"event"}}"
        </div>
      </template>
    </vue-event-calendar>
</template>

<script>
export default {
  data () {
    return {
      demoEvents: [{
        date: '2016/12/15',
        title: 'eat',
        desc: 'longlonglong description'
      },{
        date: '2016/11/12',
        title: 'this is a title'
      }]
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">vue-event-calendar</span> <span class="hljs-attr">:events</span>=<span class="hljs-string">"demoEvents"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"props"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(event, index) in props.showEvents"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"event-item"</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- 这里拿到的是传入的单个event所有数据 --&gt;</span>
          </span><span class="hljs-template-variable">"{{"event"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">vue-event-calendar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">demoEvents</span>: [{
        <span class="hljs-attr">date</span>: <span class="hljs-string">'2016/12/15'</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">'eat'</span>,
        <span class="hljs-attr">desc</span>: <span class="hljs-string">'longlonglong description'</span>
      },{
        <span class="hljs-attr">date</span>: <span class="hljs-string">'2016/11/12'</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">'this is a title'</span>
      }]
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader4">组件事件</h2>
<p>可以监听的事件有两个，选择了哪天和当月是哪月，当发生改变时，会触发监听函数。函数中的回调参数为改变后的日期。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <vue-event-calendar
    :events=&quot;demoEvents&quot;
    @day-changed=&quot;handleDayChanged&quot;
    @month-changed=&quot;handleMonthChanged&quot;>
  </vue-event-calendar>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">vue-event-calendar</span>
    <span class="hljs-attr">:events</span>=<span class="hljs-string">"demoEvents"</span>
    @<span class="hljs-attr">day-changed</span>=<span class="hljs-string">"handleDayChanged"</span>
    @<span class="hljs-attr">month-changed</span>=<span class="hljs-string">"handleMonthChanged"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">vue-event-calendar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h2 id="articleHeader5">Options</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 当 Vue.use时, 可以设置的参数
  {
    locale: 'en',
    color: 'black', //Set main color
    className: 'Custom className for current clicked date', // (default: 'selected-day')
    weekStartOn: 'week Start on which day'  // Can be: 1, 2, 3, 4, 5, 6, 0 (default: 0)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-comment">// 当 Vue.use时, 可以设置的参数</span>
  {
    <span class="hljs-attribute">locale</span>: <span class="hljs-string">'en'</span>,
    <span class="hljs-attribute">color</span>: <span class="hljs-string">'black'</span>, <span class="hljs-comment">//Set main color</span>
    <span class="hljs-attribute">className</span>: <span class="hljs-string">'Custom className for current clicked date'</span>, <span class="hljs-comment">// (default: 'selected-day')</span>
    <span class="hljs-attribute">weekStartOn</span>: <span class="hljs-string">'week Start on which day'</span>  <span class="hljs-comment">// Can be: 1, 2, 3, 4, 5, 6, 0 (default: 0)</span>
  }</code></pre>
<h2 id="articleHeader6">API</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 下个月
this.$EventCalendar.nextMonth()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 下个月</span>
<span class="hljs-keyword">this</span>.$EventCalendar.nextMonth()</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 上个月
this.$EventCalendar.preMonth()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 上个月</span>
<span class="hljs-keyword">this</span>.$EventCalendar.preMonth()</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//到指定日期
this.$EventCalendar.toDate('2016/11/12')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//到指定日期</span>
<span class="hljs-keyword">this</span>.$EventCalendar.toDate(<span class="hljs-string">'2016/11/12'</span>)</code></pre>
<p>可以看我写的<a href="https://github.com/GeoffZhu/vue-event-calendar/tree/master/demo" rel="nofollow noreferrer" target="_blank">Demo</a></p>
<h2 id="articleHeader7">开发</h2>
<p>可以在github直接clone我的项目然后执行如下命令继续二次开发或发版，欢迎star&amp;&amp;issue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev  //develop
npm run build //production" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev  //develop
</span>npm <span class="hljs-keyword">run</span><span class="bash"> build //production</span></code></pre>
<h2 id="articleHeader8">Change log</h2>
<h5>1.3.6 -&gt; 1.4.0</h5>
<ul>
<li>去除了当天的背景，改用一个在日期下面的小圆点替代</li>
<li>增加选中日期样式</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-event-calendar 事件日历插件

## 原文链接
[https://segmentfault.com/a/1190000007898857](https://segmentfault.com/a/1190000007898857)


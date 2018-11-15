---
title: 手摸手，带你用vue撸后台 系列三(实战篇)
hidden: true
categories: reprint
slug: b82f32d7
date: 2018-10-23 00:00:00
---

{{< raw >}}

                    
<p>完整项目地址：<a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a>  <br>系类文章一：<a href="https://segmentfault.com/a/1190000009275424">手摸手，带你用vue撸后台 系列一(基础篇)</a><br>系类文章二：<a href="https://segmentfault.com/a/1190000009506097" target="_blank">手摸手，带你用vue撸后台 系列二(登录权限篇)</a><br>系类文章三：<a href="https://segmentfault.com/a/1190000009762198">手摸手，带你用vue撸后台 系列三(实战篇）</a><br>系类文章四：<a href="https://segmentfault.com/a/1190000010043013" target="_blank">手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)</a><br>系类文章：<a href="https://segmentfault.com/a/1190000012213278">手摸手，带你优雅的使用 icon</a><br>系类文章：<a href="https://segmentfault.com/a/1190000009090836" target="_blank">手摸手，带你封装一个vue component</a></p>
<h2 id="articleHeader0">前言</h2>
<p>在前面两篇文章中已经把基础工作环境构建完成，也已经把后台核心的登录和权限问题完成了，现在手摸手，一起进入实操。</p>
<h2 id="articleHeader1">Element</h2>
<p>去年十月份开始用 vue 做管理后台的时候毫不犹豫的就选择了 <a href="https://github.com/ElemeFE/element" rel="nofollow noreferrer" target="_blank">element-ui</a>，那时候 vue2.0 刚发布也没多久，市面上也没有很多其它的 vue2.0 的 ui 框架可供选择。虽然 <code>element-ui</code> 也有很多的不足，前期的bug也不少，但我还是选择了它，简单说一下我选择<code>element-ui</code>的原因吧：</p>
<ul>
<li>有大厂背书 : 虽然核心开发只有两三个人，但至少不用担心哪天就不维护，带着小姨子跑路了</li>
<li>持续迭代 : <code>element-ui</code>发版至今release了四十多个版本，之前平均都是一周一个小版本更新(是不是不小心暴露了它bug多的问题/(ㄒoㄒ)/~~)(ps: 至2017.12.4 已经迭代了74个版本，还保持着较高更新频率)。</li>
<li>生态圈优异，社区活跃 ：其 contributors已经有250多人(前期我有饶有兴致的贡献过几个pr，参与过七八十个issue)，社区里也有很多基于<code>element-ui</code> 的拓展组件，也有很多相关的 qq 讨论群或者 <a href="https://gitter.im/ElemeFE/element" rel="nofollow noreferrer" target="_blank">gitter</a>。</li>
<li>社区的认可:目前Element已经是vue相关最多star的开源项目了，体现出了社区对其的认可。</li>
</ul>
<p>说了这么多优点，作为一个资深<code>element-ui</code>用户还是有些要抱怨的~和react老大哥 <strong><a href="https://ant.design/" rel="nofollow noreferrer" target="_blank">Ant Design</a></strong> 相比还是有一定的差距的，不管是组件的丰富性，参数的可配性还是文档的完整性，亦或是UI的交互和美观度。不过 ant 也是经过了近9k次commit的不断打磨，才有了今天。我也相信 <code>element-ui</code>也会越来越好的。</p>
<p>这里还有一些其它的框架(只讨论pc端的框架)大家可以自行选择：</p>
<ul>
<li>
<strong><a href="https://github.com/iview/iview" rel="nofollow noreferrer" target="_blank">ivew</a></strong> 一国人个人写的框架，美观度和交互性都不错，有种介于Element和Ant之间的感觉，之前和element团队小小的撕了一下，有兴趣的自己去<a href="https://www.zhihu.com/question/57118065" rel="nofollow noreferrer" target="_blank">围观</a>吧，框架还是很不做的，一个人能做出这样，也是很不容易的。<a href="https://zhuanlan.zhihu.com/p/25893972" rel="nofollow noreferrer" target="_blank">作者公开信件</a>
</li>
<li>
<strong><a href="https://github.com/vue-bulma/vue-admin" rel="nofollow noreferrer" target="_blank">vue-admin</a></strong> 也是一个不错的选择，代码写的和不错，官方也出了一个admin的架子，也很值得借鉴</li>
<li>
<strong><a href="https://github.com/vuematerial/vue-material" rel="nofollow noreferrer" target="_blank">vue-material</a></strong> 一个material design vue框架库</li>
<li>
<strong><a href="https://github.com/vuetifyjs/vuetify" rel="nofollow noreferrer" target="_blank">vuetify</a></strong> 又是一个material design vue框架库</li>
<li>
<strong><a href="https://github.com/JosephusPaye/Keen-UI" rel="nofollow noreferrer" target="_blank">Keen-UI</a></strong> 又又是一个material design vue框架库</li>
<li>
<strong><a href="https://github.com/mrholek/CoreUI-Free-Bootstrap-Admin-Template" rel="nofollow noreferrer" target="_blank">CoreUI-Free-Bootstrap-Admin-Template</a></strong> 和以前的Bootstrap一样，搭好了一个完整的架子，大家可以进行二次拓展，它有vue,react,angular多个版本</li>
<li>
<strong><a href="https://github.com/framework7io/Framework7-Vue" rel="nofollow noreferrer" target="_blank">Framework7-Vue</a></strong> 个人感觉这是本人体验到现在移动端体验最好的框架。不过<code>Framework7-Vue</code>感觉还不是很完善，还需要观望一段时间。而且它有自己的路由规则，所以不能使用 <code>vue-router</code>，这点还是很不方便的。</li>
</ul>
<p>简单列举了一些主流的框架，不得不感慨现在vue的生态圈真是太繁荣了，上述框架楼主并没有深入使用过，不好发表太多建议，大家自行甄别适合自己业务的框架吧。</p>
<hr>
<p><strong>这里开始我们会开始介绍一些结合Element的开发经验。</strong></p>
<h2 id="articleHeader2">基于Element的动态换肤</h2>
<p>有些产品就是这么残忍，能完成需求就不错了，还要让我们做动态换肤。Element官网上也提供了自定义主题的<a href="http://element.eleme.io/#/zh-CN/component/custom-theme" rel="nofollow noreferrer" target="_blank">方案</a><br>同时也提供了一个在线自定义主题的<a href="https://elementui.github.io/theme-preview/#/zh-CN" rel="nofollow noreferrer" target="_blank">demo</a></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009762203?w=1195&amp;h=431" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>是不是很酷，作者也说明了实现的方案 <a href="https://github.com/ElemeFE/element/issues/3054" rel="nofollow noreferrer" target="_blank">地址</a>,大概思路:</p>
<ol>
<li>先把默认主题文件中涉及到颜色的 CSS 值替换成关键词</li>
<li>根据用户选择的主题色生成一系列对应的颜色值</li>
<li>把关键词再换回刚刚生成的相应的颜色值</li>
<li>直接在页面上加 style 标签，把生成的样式填进去</li>
</ol>
<p>我看完觉得真的还是有点复杂的。有没有简单的方案呢？<br>让我们思考一下，让我们自己写动态换肤该怎么写呢？最常见的方法就是写两套主题，一套叫<code>day theme</code> ，一套叫<code>night theme</code>，<code>night theme</code>主题 都在一个<code>.night-theme</code>的命名空间下，我们动态的在<code>body</code>上<code>add .night-theme</code> ， <code>remove .night-theme</code>。这就是最简单的动态换肤。所以我们也能不能顺着这个思路，基于 element-ui 实现动态换肤呢？</p>
<p>首先我们下载官方通过的 <a href="https://github.com/ElementUI/element-theme" rel="nofollow noreferrer" target="_blank">Theme generator</a> ,一个专门用来生成Element主题的工具。按照文档，我们生成了需要的主题。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009762204?w=716&amp;h=342" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span><br>之后就是我们要做的事情了，将这个主题的每个元素外面包裹一个class 来做命名空间。<br>我们这里用到了<code>gulp-css-wrap</code>这个神器，轻轻松松就完成了我们想要的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css');
var cssWrap = require('gulp-css-wrap');

var customThemeName='.custom-theme'

gulp.task('css-wrap', function() {
  return gulp.src( path.resolve('./theme/index.css'))
    .pipe(cssWrap({selector:customThemeName}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
});

gulp.task('move-font', function() {
  return gulp.src(['./theme/fonts/**']).pipe(gulp.dest('dist/fonts'));
});

gulp.task('default',['css-wrap','move-font']);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>)
<span class="hljs-keyword">var</span> cleanCSS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-clean-css'</span>);
<span class="hljs-keyword">var</span> cssWrap = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-css-wrap'</span>);

<span class="hljs-keyword">var</span> customThemeName=<span class="hljs-string">'.custom-theme'</span>

gulp.task(<span class="hljs-string">'css-wrap'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src( path.resolve(<span class="hljs-string">'./theme/index.css'</span>))
    .pipe(cssWrap({<span class="hljs-attr">selector</span>:customThemeName}))
    .pipe(cleanCSS())
    .pipe(gulp.dest(<span class="hljs-string">'dist'</span>));
});

gulp.task(<span class="hljs-string">'move-font'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src([<span class="hljs-string">'./theme/fonts/**'</span>]).pipe(gulp.dest(<span class="hljs-string">'dist/fonts'</span>));
});

gulp.task(<span class="hljs-string">'default'</span>,[<span class="hljs-string">'css-wrap'</span>,<span class="hljs-string">'move-font'</span>]);</code></pre>
<p>这样就得到了一个以.custom-theme为命名空间的自定义主题了，之后我们在项目中引入主题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
import 'assets/custom-theme/index.css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-comment">//main.js</span>
<span class="hljs-keyword">import</span> 'assets/custom-<span class="hljs-built_in">theme</span>/index.css'</code></pre>
<p>我们在换肤的地方<code>toggleClass(document.body, 'custom-theme')</code>一直toggle body 的 class就可以了。我们就简单实现了动态换肤效果。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009762205?w=1216&amp;h=562" src="https://static.alili.tech/img/remote/1460000009762205?w=1216&amp;h=562" alt="" title="" style="cursor: pointer; display: inline;"></span><br>不过这种模式实现换肤也是有一个弊端的，它等于把这两个主题都打包在了项目里，如果你的项目主题需要七八种，这种模式就不适合了。我们就需要动态的加载css，下面就是最简单的动态添加css的例子，当然你可以封装一下，增加成功或者失败回调，判断是否加载过改资源等等就不展开了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var head = document.getElementsByTagName('HEAD').item(0);
var style = document.createElement('link');
style.href = 'style.css';
style.rel = 'stylesheet';
style.type = 'text/css';
head.appendChild(style);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> head = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'HEAD'</span>).item(<span class="hljs-number">0</span>);
<span class="hljs-keyword">var</span> style = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'link'</span>);
style.href = <span class="hljs-string">'style.css'</span>;
style.rel = <span class="hljs-string">'stylesheet'</span>;
style.type = <span class="hljs-string">'text/css'</span>;
head.appendChild(style);</code></pre>
<p><strong>更新(2017.12)</strong></p>
<p><code>element-ui</code> 官方更新了2.0版本，同时也提供了一个新的换肤思路。<br><a href="https://panjiachen.github.io/vue-element-admin-site/#/theme" rel="nofollow noreferrer" target="_blank">文档</a></p>
<hr>
<h2 id="articleHeader3">侧边栏</h2>
<p>这里又有谈一下导航栏的问题，本项目里的侧边栏是根据 router.js 配置的路由并且根据权限动态生成的，这样就省去了写一遍路由还要手动再写一次侧边栏这种麻烦事，但也遇到了一个问题，路由可能会有多层嵌套，很多人反馈自己的侧边栏会有三级，甚至还有五级的。所以重构了一下侧边栏，使用了递归组件，这样不管你多少级，都能愉快的显示了。<a href="https://github.com/PanJiaChen/vue-element-admin/tree/master/src/views/layout/components/Sidebar" rel="nofollow noreferrer" target="_blank">代码</a></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009762206?w=173&amp;h=373" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span><strong>侧边栏高亮问题:</strong> 很多人在群里问为什么自己的侧边栏不能跟着自己的路由高亮，其实很简单，element-ui官方已经给了default-active所以我们只要</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":default-active=&quot;$route.path&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">:default-active=<span class="hljs-string">"$route.path"</span></span></code></pre>
<p>将<code>default-active</code>一直指向当前路由就可以了，就是这么简单。</p>
<p><strong>点击侧边栏 刷新当前路由</strong></p>
<p>在用 spa(单页面开发) 这种开发模式之前，大部分都是多页面后台，用户每次点击侧边栏都会重新请求这个页面，用户渐渐养成了点击侧边栏当前路由来刷新页面的习惯。但现在 spa 就不一样了，用户点击当前高亮的路由并不会刷新view，因为<code>vue-router</code>会拦截你的路由，它判断你<code>的url</code>并没有任何变化，所以它不会触发任何钩子或者是<code>view</code>的变化。<a href="https://github.com/vuejs/vue-router/issues/296" rel="nofollow noreferrer" target="_blank">issue地址</a>，社区也对该问题展开了激烈讨论。<br><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009762207?w=795&amp;h=329" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span><br>尤大本来也说要增加一个方法来强刷view，但后来他又改变了心意/(ㄒoㄒ)/~~。但需要就摆在这里，我们该怎么办呢？他说了不改变<code>current URL</code> 就不会触发任何东西，那我可不可以强行触发东西你？上有政策， 下有对策我们变着花来hack。方法也很简单，通过不断改变<code>url</code>的<code>query</code>来触发view的变化。我们监听侧边栏每个link 的 click事件，每次点击都给router push 一个不一样的query 来确保会重新刷新view。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="clickLink(path) {
  this.$router.push({
    path,
    query: {
      t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
    }
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">clickLink</span><span class="hljs-params">(path)</span></span> {
  this.<span class="hljs-variable">$router</span>.push({
    path,
    query: {
      t: +new Date() <span class="hljs-comment">//保证每次点击路由的query项都是不一样的，确保会重新刷新view</span>
    }
  })
}
</code></pre>
<p>但这也有一个弊端就是 url 后面有一个很难看的 query 后缀如 <code>xxx.com/article/list?t=1496832345025</code>，但我司用户们表示能接受。。。只能暂时这样hack了，不知道大家有没有更好的方法，学习学习。</p>
<hr>
<h2 id="articleHeader4">Table</h2>
<p>经过好几个版本的迭代，element-ui 的table组件已经能满足大部分业务需求了。不过rowSpan colSpan表格行/列合并现在并不是支持(element-ui2.0版本之后开始支持)。官方对此功能的更新情况可以关注这个<a href="https://github.com/ElemeFE/element/issues/670" rel="nofollow noreferrer" target="_blank">issue</a>。</p>
<p>这里我着重讲一下table表格几个常用的业务形态。</p>
<h3 id="articleHeader5">Table 拖拽排序</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009762208?w=1067&amp;h=530" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span><br>这里主要是基于<a href="https://github.com/RubaXa/Sortable" rel="nofollow noreferrer" target="_blank">Sortable</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Sortable from 'sortablejs'
let el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
let sortable = Sortable.create(el)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Sortable <span class="hljs-keyword">from</span> <span class="hljs-string">'sortablejs'</span>
<span class="hljs-keyword">let</span> el = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.el-table__body-wrapper &gt; table &gt; tbody'</span>)[<span class="hljs-number">0</span>]
<span class="hljs-keyword">let</span> sortable = Sortable.create(el)</code></pre>
<p>在table mounted之后申明<code>Sortable.create(el)</code> table的每行tr就可以随意拖拽了，麻烦的目前我们的排序都是基于dom的，我们的数据层list并没有随之改变。所以我们就要手动的来管理我们的列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.sortable = Sortable.create(el, {
  onEnd: evt => { //监听end事件 手动维护列表
    const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
    this.newList.splice(evt.newIndex, 0, tempIndex);
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-built_in">this</span>.sortable = Sortable.create(el, {
  onEnd: <span class="hljs-type">evt </span>=&gt; { <span class="hljs-comment">//监听end事件 手动维护列表</span>
    const tempIndex = <span class="hljs-built_in">this</span>.<span class="hljs-keyword">new</span><span class="hljs-type">List</span>.splice(evt.oldIndex, <span class="hljs-number">1</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-built_in">this</span>.<span class="hljs-keyword">new</span><span class="hljs-type">List</span>.splice(evt.<span class="hljs-keyword">new</span><span class="hljs-type">Index</span>, <span class="hljs-number">0</span>, tempIndex);
  }
});</code></pre>
<p>这样我们就简单的完成了 table 拖拽排序。这里如果不是基于 dom 的排序推荐使用<a href="https://github.com/SortableJS/Vue.Draggable" rel="nofollow noreferrer" target="_blank">Vue.Draggable</a>。<a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/example/table/dragTable.vue" rel="nofollow noreferrer" target="_blank">完整代码</a></p>
<hr>
<h3 id="articleHeader6">Table 内联编辑</h3>
<p>table内联编辑也是一个常见的需求。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009762209?w=1055&amp;h=193" src="https://static.alili.tech/img/remote/1460000009762209?w=1055&amp;h=193" alt="" title="" style="cursor: pointer; display: inline;"></span><br>其实也很简单，当我们拿到 list 数据之后先洗一下数据，每一条数据里面插入一个edit[ true or false ]判断符，来表示当前行是否处于编辑状态。之后就是通过v-show动态切换不同的相应view就可以了。<a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/example/table/inlineEditTable.vue" rel="nofollow noreferrer" target="_blank">完整代码</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-table-column min-width=&quot;300px&quot; label=&quot;标题&quot;>
  <template scope=&quot;scope&quot;>
    <el-input v-show=&quot;scope.row.edit&quot; size=&quot;small&quot; v-model=&quot;scope.row.title&quot;></el-input>
    <span v-show=&quot;!scope.row.edit&quot;>"{{" scope.row.title "}}"</span>
  </template>
</el-table-column>
<el-table-column align=&quot;center&quot; label=&quot;编辑&quot; width=&quot;120&quot;>
  <template scope=&quot;scope&quot;>
    <el-button v-show='!scope.row.edit' type=&quot;primary&quot; @click='scope.row.edit=true' size=&quot;small&quot; icon=&quot;edit&quot;>编辑</el-button>
    <el-button v-show='scope.row.edit' type=&quot;success&quot; @click='scope.row.edit=false' size=&quot;small&quot; icon=&quot;check&quot;>完成</el-button>
  </template>
</el-table-column>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">min-width</span>=<span class="hljs-string">"300px"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"标题"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"scope.row.edit"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"scope.row.title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"!scope.row.edit"</span>&gt;</span></span><span class="hljs-template-variable">"{{" scope.row.title "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">align</span>=<span class="hljs-string">"center"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"编辑"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"120"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">'!scope.row.edit'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'scope.row.edit=true'</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"edit"</span>&gt;</span>编辑<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">'scope.row.edit'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"success"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'scope.row.edit=false'</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"check"</span>&gt;</span>完成<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
</span></code></pre>
<hr>
<h3 id="articleHeader7">Table 常见坑</h3>
<p>通过dialog来编辑，新建，删除table的元素这种业务场景相对于前面说的两种更加的常见。而且也有不少的小坑。<br>首先我们要明确一个点 vue 是一个MVVM框架，我们传统写代码是命令式编程，拿到table这个dom之后就是命令式对dom增删改。而我们现在用声明式编程，只用关注data的变化就好了，所以我们这里的增删改都是基于list这个数组来的。这里我们还要明确一点<a href="https://cn.vuejs.org/v2/guide/list.html#" rel="nofollow noreferrer" target="_blank">vue 列表渲染注意事项</a></p>
<blockquote>由于 JavaScript 的限制， Vue 不能检测以下变动的数组：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* 当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>* 当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = <span class="hljs-keyword">new</span><span class="hljs-type">Value</span>
</code></pre>
<p>所以我们想改变table中第一条数据的值，通过<code>this.list[0]=newValue</code>这样是不会生效的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="解决方案：
// Array.prototype.splice`
example1.items.splice(indexOfItem, 1, newValue)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>解决方案：
<span class="hljs-comment">// Array.prototype.splice`</span>
example1<span class="hljs-selector-class">.items</span><span class="hljs-selector-class">.splice</span>(indexOfItem, <span class="hljs-number">1</span>, newValue)</code></pre>
<p>所以我们可以通过</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//添加数据
this.list.unshift(this.temp);

//删除数据 
const index = this.list.indexOf(row); //找到要删除数据在list中的位置
this.list.splice(index, 1); //通过splice 删除数据

//修改数据
const index = this.list.indexOf(row); //找到修改的数据在list中的位置
this.list.splice(index, 1,this.updatedData); //通过splice 替换数据 触发视图更新" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-comment">//添加数据</span>
<span class="hljs-keyword">this</span>.<span class="hljs-built_in">list</span>.unshift(<span class="hljs-keyword">this</span>.temp);

<span class="hljs-comment">//删除数据 </span>
<span class="hljs-keyword">const</span> index = <span class="hljs-keyword">this</span>.<span class="hljs-built_in">list</span>.indexOf(row); <span class="hljs-comment">//找到要删除数据在list中的位置</span>
<span class="hljs-keyword">this</span>.<span class="hljs-built_in">list</span>.splice(index, <span class="hljs-number">1</span>); <span class="hljs-comment">//通过splice 删除数据</span>

<span class="hljs-comment">//修改数据</span>
<span class="hljs-keyword">const</span> index = <span class="hljs-keyword">this</span>.<span class="hljs-built_in">list</span>.indexOf(row); <span class="hljs-comment">//找到修改的数据在list中的位置</span>
<span class="hljs-keyword">this</span>.<span class="hljs-built_in">list</span>.splice(index, <span class="hljs-number">1</span>,<span class="hljs-keyword">this</span>.updatedData); <span class="hljs-comment">//通过splice 替换数据 触发视图更新</span></code></pre>
<p>这样我们就完成了对table的增删改操作，列表view也自动响应发生了变化。这里在修改数据的时候还有一个小坑<strong>需要主要</strong>。<br> 当我们拿到需要修改行的数据时候不能直接将它直接赋值给dialog，不然会发生下面的问题。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009762210?w=1120&amp;h=516" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span><br>如上图所示，我们在dialog里面改变状态的时候，遮罩下面的table里面该行的状态也在那里跟着一只变化着。原因想必大家都猜到了。赋值的数据是一个objec引用类型共享一个内存区域的。所以我们就不能直接连等复制，需要重新指向一个新的引用，方案如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//赋值对象是一个obj
this.objData=Object.assign({}, row) //这样就不会共用同一个对象

//数组我们也有一个巧妙的防范
newArray = oldArray.slice(); //slice会clone返回一个新数组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//赋值对象是一个obj</span>
<span class="hljs-built_in">this</span>.objData=Object.assign({}, row) <span class="hljs-comment">//这样就不会共用同一个对象</span>

<span class="hljs-comment">//数组我们也有一个巧妙的防范</span>
<span class="hljs-keyword">new</span><span class="hljs-type">Array</span> = oldArray.slice(); <span class="hljs-comment">//slice会clone返回一个新数组</span></code></pre>
<hr>
<h3 id="articleHeader8">Tabs</h3>
<p>tab在后台项目中也比较常用的。假设我们有四个tab选项，每个tab都会向后端请求数据，但我们希望一开始只会请求当前的tab数据，而且tab来回切换的时候不会重复请求，只会实例化一次。首先我们想到的就是用<code>v-if</code> 这样的确能做到一开始不会挂载后面的tab，但有一个问题，每次点击这个tab组件都会重新挂载一次，这是我们不想看到的，这时候我们就可以用到<code>&lt;keep-alive&gt;</code>了。</p>
<blockquote>keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。 它是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。</blockquote>
<p>所以我们就可以这样写tabs了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-tabs v-model=&quot;activeTab&quot;>
  <el-tab-pane label=&quot;简介及公告&quot; name=&quot;announcement&quot;>
    <announcement />
  </el-tab-pane>
  <el-tab-pane label=&quot;资讯&quot; name=&quot;information&quot;>
    <keep-alive>
      <information v-if=&quot;activeTab=='information'&quot; />
    </keep-alive>
  </el-tab-pane>
  <el-tab-pane label=&quot;直播流配置&quot; name=&quot;stream&quot;>
    <keep-alive>
      <stream v-if=&quot;activeTab=='stream'&quot; />
    </keep-alive>
  </el-tab-pane>
</el-tabs>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>&lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">tabs</span> v-model=<span class="hljs-string">"activeTab"</span>&gt;
  &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">tab</span>-pane label=<span class="hljs-string">"简介及公告"</span> name=<span class="hljs-string">"announcement"</span>&gt;
    &lt;announcement /&gt;
  &lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">tab</span>-pane&gt;
  &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">tab</span>-pane label=<span class="hljs-string">"资讯"</span> name=<span class="hljs-string">"information"</span>&gt;
    <span class="hljs-symbol">&lt;keep-alive&gt;</span>
      &lt;information v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"activeTab=='information'"</span> /&gt;
    &lt;/keep-alive&gt;
  &lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">tab</span>-pane&gt;
  &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">tab</span>-pane label=<span class="hljs-string">"直播流配置"</span> name=<span class="hljs-string">"stream"</span>&gt;
    <span class="hljs-symbol">&lt;keep-alive&gt;</span>
      &lt;stream v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"activeTab=='stream'"</span> /&gt;
    &lt;/keep-alive&gt;
  &lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">tab</span>-pane&gt;
&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">tabs</span>&gt;</code></pre>
<hr>
<h2 id="articleHeader9">Select 选择器</h2>
<p>Select 选择器直接使用没有什么太多问题，但很多时候我们需要通过Select来回显一些数据，当我们<code>&lt;el-select v-model="objValue"&gt;</code> select 绑定一个obj value回显就会很蛋疼了，它要求必须保持同一个引用<a href="https://github.com/ElemeFE/element/issues/1780" rel="nofollow noreferrer" target="_blank">issue</a>。这就意味着，我们回显数据的时候想先要找到该数据在arr中的位置，再回塞：<a href="https://github.com/ElemeFE/element/issues/2479/" rel="nofollow noreferrer" target="_blank">demo</a>。这还不是在远程搜索的情况下，如果是远程搜索的情况还要当疼。<br>这里推荐一下<a href="https://github.com/monterail/vue-multiselect" rel="nofollow noreferrer" target="_blank">vue-multiselect</a> 它能完美的解决前面Element select的问题。目前也是vue component 中比较好用的一个，ui也非常的好看，建议大家可以尝试性用一下，真的非常的不错。</p>
<hr>
<h2 id="articleHeader10">Upload 上传</h2>
<p>Upload本身没什么好说的，文档写的蛮清楚了。这里主要说一下怎么将Upload组件和七牛直传结合在一起。</p>
<p>这里我们选择api直传的方式，就是我们首先要通过后端(go,node,php都可以)<a href="https://developer.qiniu.com/sdk#official-sdk" rel="nofollow noreferrer" target="_blank">文档</a>生成七牛上传必要的token(上传凭证)和key(资源的最终名称)。<br>所以现在只要想办法讲token和key塞进post请求里面就可以了，好在官方也提供了这个方法。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009762211?w=836&amp;h=38" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span><br>。但怎么才能先异步的拿到token再将它塞入请求里呢？</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009762212?w=855&amp;h=77" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span><br>这时候我们又发现了before-upload    这个钩子还支持promise简直合我们的心意。<br>但我们写着写着怎样才能动态的改变之前的dataObj呢？通过看源码发现我们可以_self._data这样子拿到我们想要的数据。<a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/qiniu/upload.vue" rel="nofollow noreferrer" target="_blank">线上代码</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <el-upload
      action=&quot;https://upload.qbox.me&quot;
      :data=&quot;dataObj&quot;
      drag
      :multiple=&quot;true&quot;
      :before-upload=&quot;beforeUpload&quot;>
    <i class=&quot;el-icon-upload&quot;></i>
    <div class=&quot;el-upload__text&quot;>将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>
<script>
    import { getToken } from 'api/qiniu'; // 获取七牛token 后端通过Access Key,Secret Key,bucket等生成token
    // 七牛官方sdk https://developer.qiniu.com/sdk#official-sdk
    export default{
      data() {
        return {
          dataObj: { token: '', key: '' },
          image_uri: [],
          fileList: []
        }
      },
      methods: {
        beforeUpload() {
          const _self = this;
          return new Promise((resolve, reject) => {
            getToken().then(response => {
              const key = response.data.qiniu_key;
              const token = response.data.qiniu_token;
              _self._data.dataObj.token = token;
              _self._data.dataObj.key = key;
              resolve(true);
            }).catch(err => {
              console.log(err)
              reject(false)
            });
          });
        }
      }
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-upload</span>
      <span class="hljs-attr">action</span>=<span class="hljs-string">"https://upload.qbox.me"</span>
      <span class="hljs-attr">:data</span>=<span class="hljs-string">"dataObj"</span>
      <span class="hljs-attr">drag</span>
      <span class="hljs-attr">:multiple</span>=<span class="hljs-string">"true"</span>
      <span class="hljs-attr">:before-upload</span>=<span class="hljs-string">"beforeUpload"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-upload"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-upload__text"</span>&gt;</span>将文件拖到此处，或<span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span>点击上传<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-upload</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> { getToken } <span class="hljs-keyword">from</span> <span class="hljs-string">'api/qiniu'</span>; <span class="hljs-comment">// 获取七牛token 后端通过Access Key,Secret Key,bucket等生成token</span>
    <span class="hljs-comment">// 七牛官方sdk https://developer.qiniu.com/sdk#official-sdk</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
      data() {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">dataObj</span>: { <span class="hljs-attr">token</span>: <span class="hljs-string">''</span>, <span class="hljs-attr">key</span>: <span class="hljs-string">''</span> },
          <span class="hljs-attr">image_uri</span>: [],
          <span class="hljs-attr">fileList</span>: []
        }
      },
      <span class="hljs-attr">methods</span>: {
        beforeUpload() {
          <span class="hljs-keyword">const</span> _self = <span class="hljs-keyword">this</span>;
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            getToken().then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
              <span class="hljs-keyword">const</span> key = response.data.qiniu_key;
              <span class="hljs-keyword">const</span> token = response.data.qiniu_token;
              _self._data.dataObj.token = token;
              _self._data.dataObj.key = key;
              resolve(<span class="hljs-literal">true</span>);
            }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
              <span class="hljs-built_in">console</span>.log(err)
              reject(<span class="hljs-literal">false</span>)
            });
          });
        }
      }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<hr>
<h3 id="articleHeader11">jsx</h3>
<p>在使用Element的时候，官方提供了很多可以自己写render function的地方，但由于Element内部都是用jsx 写render function的，所以demo也都是jsx，但很多人自己项目中其实是没有安装的，导致报错。但说真的用createElement裸写render 函数还是有些蛋疼。我们要用jsx，首先要安装 <a href="https://github.com/vuejs/babel-plugin-transform-vue-jsx" rel="nofollow noreferrer" target="_blank">babel-plugin-transform-vue-jsx</a> 安装方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install\
  babel-plugin-syntax-jsx\
  babel-plugin-transform-vue-jsx\
  babel-helper-vue-jsx-merge-props\
  babel-preset-es2015\
  --save-dev
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-built_in">npm</span> install<span class="hljs-string">\</span>
  babel-plugin-syntax-jsx<span class="hljs-string">\</span>
  babel-plugin-transform-vue-jsx<span class="hljs-string">\</span>
  babel-helper-vue-jsx-merge-props<span class="hljs-string">\</span>
  babel-preset-es2015<span class="hljs-string">\</span>
  --save-dev
  </code></pre>
<p>.babelrc:文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;],
  &quot;plugins&quot;: [&quot;transform-vue-jsx&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>],
  <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-vue-jsx"</span>]
}</code></pre>
<p>这样我们就可以愉快的使用 jsx 写render function了。</p>
<hr>
<h2 id="articleHeader12">element 常见问题</h2>
<p><strong>click事件不触发问题：</strong>一直有人在群里问<code>&lt;el-input @click="handlenClick"&gt;Click Me&lt;/el-input&gt;</code>怎么不触发click事件，虽然element文档还有完善的空间但这种问题大家还真要自己好好认真看一下官方的<a href="https://github.com/ElemeFE/element/blob/dev/FAQ.md" rel="nofollow noreferrer" target="_blank">FAQ</a>了。</p>
<blockquote>官方说明了所有的原生事件必须添加 .native 修饰符。</blockquote>
<p><strong>修改element样式问题：</strong> 用ui组件总免不了需要对它做一些个性化定制的需求，所以我们就要覆盖element的一些样式。<br>首先我们要了解一下vue scoped是什么，很多人非常喜欢用scoped，妈妈再也不用担心样式冲突问题了，其实scoped也没有很神秘的，它就是基于PostCss的，加了一个作用局的概念。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//编译前
.example {
  color: red;
}
//编译后
.example[_v-f3f3eg9] {
  color: red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//编译前</span>
<span class="hljs-selector-class">.example</span> {
  <span class="hljs-attribute">color</span>: red;
}
<span class="hljs-comment">//编译后</span>
<span class="hljs-selector-class">.example</span>[_v-f3f3eg9] {
  <span class="hljs-attribute">color</span>: red;
}</code></pre>
<p>它和我们传统的命名空间的方法避免css冲突没有什么本质性的区别。<br>现在我们来说说怎么覆盖element-ui样式。由于element-ui的样式我们是在全局引入的，所以你想在某个view里面覆盖它的样式就不能加scoped，但你又想只覆盖这个页面的element样式，你就可在它的父级加一个class，以用命名空间来解决问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".aritle-page{ //你的命名空间
    .el-tag { //element-ui 元素
      margin-right: 0px;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.aritle-page{ <span class="hljs-comment">//你的命名空间</span>
    <span class="hljs-selector-class">.el-tag</span> { <span class="hljs-comment">//element-ui 元素</span>
      <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">0px</span>;
    }
}</code></pre>
<p>建议向楼主一样专门建一个scss文件里专门自定义element-ui的各种样式。<a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/src/styles/element-ui.scss" rel="nofollow noreferrer" target="_blank">线上代码</a></p>
<p>其它关于element相关的东西真的没有什么好说的了，人家文档和源码就放在那里，有问题就去看文档，再去issue里找找，再去看看源码，大部分问题都能解决了。给一个诀窍其实大部分诡异的问题都可以通过加一个key或者<br>Vue.nextTick来解决。。</p>
<hr>
<h2 id="articleHeader13">富文本</h2>
<p>管理后台富文本也是一个非常重要的功能，楼主在这里也踩了不少的坑。楼主在项目里最终选择了 <a href="https://github.com/tinymce/tinymce" rel="nofollow noreferrer" target="_blank">tinymce</a></p>
<p>这里在简述一下推荐使用tinymce的原因：tinymce 是一家老牌做富文本的公司(这里也推荐 ckeditor，也是一家一直做富文本的公司，新版本很不错)，它的产品经受了市场的认可，不管是文档还是配置的自由度都很好。在使用富文本的时候有一点也很关键就是复制格式化，之前在用一款韩国人做的富文本summernote被它的格式化坑的死去活来，但 tinymce 的去格式化相当的好，它还有一个增值项目就是powerpaste,那是无比的强大，支持从word里面复制各种东西，都不会有问题。富文本还有一点也很关键，就是拓展性。楼主用tinymce写了好几个插件，学习成本和容易度都不错，很方便拓展。最后一点就是文档很完善，基本你想得到的配置项，它都有。tinymce也支持按需加载，你可以通过它官方的build页定制自己需要的plugins。<br>我再来分析一下市面上其它的一些富文本：</p>
<ul>
<li>
<strong><a href="https://github.com/summernote/summernote" rel="nofollow noreferrer" target="_blank">summernote</a></strong> 先来说一个我绝对不推荐的富文本。这是一个韩国人开源的富文本(当然不推荐的理由不是因为这个)，它对很多富文本业界公认的默认行为理解是反起到而行的，而且只为用了一个dialog的功能，引入了boostrap，一堆人抗议就是不改。格式化也是差劲。。反正不要用！不要用！不要用！</li>
<li>
<strong><a href="https://github.com/galetahub/ckeditor" rel="nofollow noreferrer" target="_blank">ckeditor</a></strong> ckeditor也是一家老牌做富文本的公司，楼主旧版后台用的就是这个，今年也出了5.0版本，ui也变美观了不少，相当的不错，而且它号称是插件最丰富的富文本了。推荐大家也可以试用一下。</li>
<li>
<strong><a href="https://github.com/quilljs/quill" rel="nofollow noreferrer" target="_blank">quill</a></strong> 也是一个非常火的富文本，长相很不错。基于它写插件也很简单，api设计也很简单。楼主不选择它的原因是它对图片的各种操作不友善，而且很难改。如果对图片没什么操作的用户，推荐使用。</li>
<li>
<strong><a href="https://github.com/yabwe/medium-editor" rel="nofollow noreferrer" target="_blank">medium-<em>editor</em></a></strong> 大名鼎鼎的medium的富文本(非官方出品)，但完成度还是不很不错，拓展性也不错。不过我觉得大部分用户还是会不习惯medium这种写作方式的。</li>
<li>
<strong><a href="https://github.com/neilj/Squire" rel="nofollow noreferrer" target="_blank">Squire</a></strong> 一个比较轻量的富文本，压缩完才11.5kb，相对于其它的富文本来说是非常的小了，推荐功能不复杂的建议使用。</li>
<li>
<strong><a href="https://github.com/wangfupeng1988/wangEditor" rel="nofollow noreferrer" target="_blank">wangEditor</a></strong> 一个国人写的富文本，用过感觉还是不错的。不过毕竟是个人的，不像专门公司做富文本的，配置型和丰富性不足。前端几大禁忌就有富文本 <a href="https://www.zhihu.com/question/38699645" rel="nofollow noreferrer" target="_blank">为什么都说富文本编辑器是天坑?</a>，不过个人能做成这样子很不容易了。</li>
<li>
<strong><a href="http://ueditor.baidu.com/website/index.html" rel="nofollow noreferrer" target="_blank">百度UEditor</a></strong> 没有深入使用过，只在一个angular1X的项目简单用过，不过说着的ui真的不好看，不符合当今审美了，官方也已经很久没跟新过了。</li>
</ul>
<p>楼主列举了很多富文本但并没有列举任何 vue 相关的富文本，主要是因为富文本真的比想象中复杂，在前面的文章里也说过了，其实用 vue 封装组件很方便的，没必要去用人家封装的东西什么vue-quill vue-editor这种都只是简单包了一层，没什么难度的。还不如自己来封装，灵活性可控性更强一点。还有一点基于 vue 真没什么好的富文本，不像 react 有 facebook 出的 <a href="https://github.com/facebook/draft-js" rel="nofollow noreferrer" target="_blank">draft-js</a>，ory 出的 <a href="https://github.com/ory/editor" rel="nofollow noreferrer" target="_blank">editor</a>，这种大厂出的产品。</p>
<p>当然你也可以选择一些付费的富文本编辑器，作者自己公司里面有一个项目就使用了 <a href="https://www.froala.com/wysiwyg-editor" rel="nofollow noreferrer" target="_blank">froala-editor</a> 这款编辑器。不管是美观和易用性都是不错的，公司买的是专业版，一年也就 <code>$349</code> ，价格也是很合理的，但其实省去的程序员开发陈本可能远不止这个价钱。</p>
<h2 id="articleHeader14">Tinymce</h2>
<p>这里来简单讲一下在自己项目中使用 <code>Tinymce</code> 的方法。</p>
<blockquote>由于目前使用 npm 安装 <code>Tinymce</code> 方法比较负责复杂而且还有一些问题(日后可能会采用该模式)。<img src="https://static.alili.tech/v-5bbf1b3b/global/img/emojis/space_invader.png" class="emoji" alt="space_invader" title="space_invader">
</blockquote>
<p>目前采用全局引用的方式。代码地址：<code>static/tinymce</code> static目录下的文件不会被打包, 在 index.html 中引入。</p>
<p><strong>使用</strong><br>由于富文本不适合双向数据流，所以只会 watch 传入富文本的内容一次变化，只会就不会再监听了，如果之后还有改变富文本内容的需求。<br>可以通过 <code>this.refs.xxx.setContent()</code> 来设置</p>
<p>源码也很简单，有任何别的需求都可以在 <code>@/components/Tinymce/index.vue</code> 中自行修改。</p>
<hr>
<h2 id="articleHeader15">Markdown</h2>
<p>markdown 我们这里选用了 <a href="https://github.com/sparksuite/simplemde-markdown-editor" rel="nofollow noreferrer" target="_blank">simplemde-markdown-editor</a> ，简单的用vue封装了一下<a href="https://github.com/F-loat/vue-simplemde/blob/master/markdown-editor.vue" rel="nofollow noreferrer" target="_blank">地址</a>,如果需求方能接受 markdown 就一定要用 markdown，坑真心会比富文本少很多。这里我们用markdown做了编辑器，还需要一个能解析的的东西。可以你传给后端让后端帮你转化，也可以前端自己来，这里推荐一个转化库<a href="https://github.com/showdownjs/showdown" rel="nofollow noreferrer" target="_blank">showdown</a>。使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import('showdown').then(showdown => { //用了 Dynamic import
  const converter = new showdown.Converter();//初始化
  this.html = converter.makeHtml(this.content)//转化
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span>(<span class="hljs-string">'showdown'</span>).then(<span class="hljs-function"><span class="hljs-params">showdown</span> =&gt;</span> { <span class="hljs-comment">//用了 Dynamic import</span>
  <span class="hljs-keyword">const</span> converter = <span class="hljs-keyword">new</span> showdown.Converter();<span class="hljs-comment">//初始化</span>
  <span class="hljs-keyword">this</span>.html = converter.makeHtml(<span class="hljs-keyword">this</span>.content)<span class="hljs-comment">//转化</span>
})</code></pre>
<p>用法也很简单两行代码就完成了markdown to html，当然它还有很多个性画的配置，大家有需求自行研究吧。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009762213?w=1040&amp;h=585" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader16">导出excel</h2>
<p>这里先明确一点，如果你的业务需求对导出文件的格式没有什么要求，不建议导出成xlsx格式的，直接导出成csv的就好了，真的会简单很多。创建一个a标签，写上<code>data:text/csv;charset=utf-8</code>头，再把数据塞进去，<code>encodeURI(csvContent)</code>一下就好了，详情就不展开了，大家可以借鉴这个<a href="https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side" rel="nofollow noreferrer" target="_blank">stackoverflow回答</a>。<br>我们重点说一下转xlsx，我们这里用到了<a href="https://github.com/SheetJS/js-xlsx" rel="nofollow noreferrer" target="_blank">js-xlsx</a>，一个功能很强大excel处理库，只是下载各种格式excel，还支持读取excel，但上手难度也非常大，相当的复杂，其中涉及不少二进制相关的东西。不过好在官方给了我们一个<a href="http://sheetjs.com/demos/writexlsx.html" rel="nofollow noreferrer" target="_blank">demo例子</a>,我们写不来还抄不来么，于是我们就借鉴官方的例子来改造了一下，具体原理就不详细说了，真的很复杂。。。<br>重点是我们怎么使用！首先我们封装一个<a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/src/vendor/Export2Excel.js" rel="nofollow noreferrer" target="_blank">Export2Excel.js</a>，<br>它又依赖三个库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('script-loader!file-saver'); //保存文件用
require('script-loader!vendor/Blob'); //转二进制用
require('script-loader!xlsx/dist/xlsx.core.min'); //xlsx核心

由于这几个文件不支持import引入，所以我们需要`script-loader`来将他们挂载到全局环境下。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">'script-loader!file-saver'</span>); <span class="hljs-comment">//保存文件用</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'script-loader!vendor/Blob'</span>); <span class="hljs-comment">//转二进制用</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'script-loader!xlsx/dist/xlsx.core.min'</span>); <span class="hljs-comment">//xlsx核心</span>

由于这几个文件不支持<span class="hljs-keyword">import</span>引入，所以我们需要<span class="hljs-string">`script-loader`</span>来将他们挂载到全局环境下。</code></pre>
<p>它暴露了两个接口<code>export_table_to_excel</code>和<code>export_json_to_excel</code>,我们常用<code>export_json_to_excel</code>因为更加的可控一点，我们可以自由的洗数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleDownload() {
  require.ensure([], () => { // 用 webpack Code Splitting xlsl还是很大的
    const { export_json_to_excel } = require('vendor/Export2Excel');
    const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间']; // excel 表格头
    const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time'];
    const list = this.list;
    const data = this.formatJson(filterVal, list); // 自行洗数据 按序排序的一个array数组
    export_json_to_excel(tHeader, data, '列表excel');
  })
}，
formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>handleDownload() {
  <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">// 用 webpack Code Splitting xlsl还是很大的</span>
    <span class="hljs-keyword">const</span> { export_json_to_excel } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vendor/Export2Excel'</span>);
    <span class="hljs-keyword">const</span> tHeader = [<span class="hljs-string">'序号'</span>, <span class="hljs-string">'文章标题'</span>, <span class="hljs-string">'作者'</span>, <span class="hljs-string">'阅读数'</span>, <span class="hljs-string">'发布时间'</span>]; <span class="hljs-comment">// excel 表格头</span>
    <span class="hljs-keyword">const</span> filterVal = [<span class="hljs-string">'id'</span>, <span class="hljs-string">'title'</span>, <span class="hljs-string">'author'</span>, <span class="hljs-string">'pageviews'</span>, <span class="hljs-string">'display_time'</span>];
    <span class="hljs-keyword">const</span> list = <span class="hljs-keyword">this</span>.list;
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">this</span>.formatJson(filterVal, list); <span class="hljs-comment">// 自行洗数据 按序排序的一个array数组</span>
    export_json_to_excel(tHeader, data, <span class="hljs-string">'列表excel'</span>);
  })
}，
formatJson(filterVal, jsonData) {
  <span class="hljs-keyword">return</span> jsonData.map(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> filterVal.map(<span class="hljs-function"><span class="hljs-params">j</span> =&gt;</span> v[j]))
}
</code></pre>
<p><a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/excel/index.vue" rel="nofollow noreferrer" target="_blank">完整显示线上代码</a></p>
<hr>
<h2 id="articleHeader17">ECharts</h2>
<p>管理后台图表也是常见得需求。这里图表就只推荐ECharts，功能齐全，社区demo也丰富<a href="http://gallery.echartsjs.com/explore.html" rel="nofollow noreferrer" target="_blank">gallery</a>。我还是那个观点，大部分插件建议大家还是自己用vue来包装就好了，真的很简单。ECharts支持webpack引入，图省事可以将ECharts整个引入<code>var echarts = require('echarts');</code>不过ECharts还是不小的，我们大部分情况只是用到很少一部分功能，我平时习惯于按需引入的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>/<span class="hljs-regexp">/ 引入 ECharts 主模块
var echarts = require('echarts/lib</span><span class="hljs-regexp">/echarts');
/</span><span class="hljs-regexp">/ 引入柱状图
require('echarts/lib</span><span class="hljs-regexp">/chart/bar</span><span class="hljs-string">');
// 引入提示框和标题组件
require('</span>echarts/<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">component</span>/<span class="hljs-title">tooltip</span>');</span>
<span class="hljs-keyword">require</span>(<span class="hljs-string">'echarts/lib/component/title'</span>);</code></pre>
<p><a href="http://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts" rel="nofollow noreferrer" target="_blank">webpack中使用ECharts文档</a><br><a href="https://github.com/ecomfe/echarts/blob/master/index.js" rel="nofollow noreferrer" target="_blank">ECharts按需引入模块文档</a><br>接下来我们就要在vue中声明初始化ECharts了。因为ECharts初始化必须绑定dom，所以我们只能在vue的mounted生命周期里初始化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted() {
  this.initCharts();
},
methods: {
  this.initCharts() {
    this.chart = echarts.init(this.$el);
    this.setOptions();
  },
  setOptions() {
    this.chart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: [&quot;衬衫&quot;, &quot;羊毛衫&quot;, &quot;雪纺衫&quot;, &quot;裤子&quot;, &quot;高跟鞋&quot;, &quot;袜子&quot;]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>mounted() {
  <span class="hljs-keyword">this</span>.initCharts();
},
methods: {
  <span class="hljs-keyword">this</span>.initCharts() {
    <span class="hljs-keyword">this</span>.chart = echarts.init(<span class="hljs-keyword">this</span>.$el);
    <span class="hljs-keyword">this</span>.setOptions();
  },
  setOptions() {
    <span class="hljs-keyword">this</span>.chart.setOption({
      title: {
        text: <span class="hljs-string">'ECharts 入门示例'</span>
      },
      tooltip: {},
      xAxis: {
        <span class="hljs-keyword">data</span>: [<span class="hljs-string">"衬衫"</span>, <span class="hljs-string">"羊毛衫"</span>, <span class="hljs-string">"雪纺衫"</span>, <span class="hljs-string">"裤子"</span>, <span class="hljs-string">"高跟鞋"</span>, <span class="hljs-string">"袜子"</span>]
      },
      yAxis: {},
      series: [{
        name: <span class="hljs-string">'销量'</span>,
        type: <span class="hljs-string">'bar'</span>,
        <span class="hljs-keyword">data</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">20</span>, <span class="hljs-number">36</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">20</span>]
      }]
    })
  }
}
</code></pre>
<p>就这样简单，ECharts就配置完成了，这时候你想说我的data是远程获取的，或者说我动态改变ECharts的配置该怎么办呢？我们可以通过watch来触发setOptions方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//第一种 watch options变化 利用vue的深度 watcher，options一有变化就重新setOption
watch: {
  options: {
    handler(options) {
      this.chart.setOption(this.options)
    },
    deep: true
  },
}
//第二种 只watch 数据的变化 只有数据变化时触发ECharts
watch: {
  seriesData(val) {
    this.setOptions({series:val})
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//第一种 watch options变化 利用vue的深度 watcher，options一有变化就重新setOption</span>
watch: {
  options: {
    handler(options) {
      <span class="hljs-keyword">this</span>.chart.setOption(<span class="hljs-keyword">this</span>.options)
    },
    deep: <span class="hljs-literal">true</span>
  },
}
<span class="hljs-comment">//第二种 只watch 数据的变化 只有数据变化时触发ECharts</span>
watch: {
  seriesData(<span class="hljs-keyword">val</span>) {
    <span class="hljs-keyword">this</span>.setOptions({series:<span class="hljs-keyword">val</span>})
  }
}
</code></pre>
<p>其实都差不多，还是要结合自己业务来封装。后面就和平时使用ECharts没有什么区别了。题外话ECharts的可配置项真心多，大家使用的时候可能要花一点时间了解它的api的。知乎有个问题：百度还有什么比较良心的产品？答案：ECharts，可见ECharts的强大与好用。</p>
<hr>
<h2 id="articleHeader18">相同component 不同参数</h2>
<p><strong>创建与编辑</strong><br>其实后台创建与编辑功能是最常见的了，它区别去前台项目多了改的需求，但大部分创建页面与编辑页面字段和ui几乎是一样的，所以我们准备公用一个component来对应不同的页面。有两种常见的方法，来区别创建与编辑。</p>
<ol><li>通过路由path的方式</li></ol>
<p>这种方式最简单暴力，我自己的项目中使用这种方式，通过约定路径中出现'edit'就判断为编辑模式。比较省力和方便，不过这是要在大家写路径的时候都按照规范来写的前提下。</p>
<ol><li>通过meta来区分</li></ol>
<p>比较推荐这种方式来区分。<br><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009762214?w=1192&amp;h=86" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
  isEdit() {
    return this.$route.meta.isEdit // 根据meta判断
    // return this.$route.path.indexOf('edit') !== -1 // 根据路由判断
  }
}，
created() {
  if (this.isEdit) { 
    this.fetchData();
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>computed: {
  isEdit() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$route.meta.isEdit <span class="hljs-comment">// 根据meta判断</span>
    <span class="hljs-comment">// return this.$route.path.indexOf('edit') !== -1 // 根据路由判断</span>
  }
}，
created() {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isEdit) { 
    <span class="hljs-keyword">this</span>.fetchData();
  }
},</code></pre>
<p>就这样简单的实现了多路由复用了一个component，其实不只是创建和编辑可以这样用，如两个列表的一模一样，只是一个是内部文章另一个是调取外部文章都能复用组件，通过meta的方式来判断调取不同的接口。</p>
<hr>
<h2 id="articleHeader19">占坑</h2>
<p>常规占坑，这里是手摸手，带你用vue撸后台系列。   <br>完整项目地址：<a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a>  <br>系类文章一：<a href="https://segmentfault.com/a/1190000009275424">手摸手，带你用vue撸后台 系列一(基础篇)</a><br>系类文章二：<a href="https://segmentfault.com/a/1190000009506097" target="_blank">手摸手，带你用vue撸后台 系列二(登录权限篇)</a><br>系类文章三：<a href="https://segmentfault.com/a/1190000009762198">手摸手，带你用vue撸后台 系列三(实战篇）</a><br>系类文章四：<a href="https://segmentfault.com/a/1190000010043013" target="_blank">手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)</a><br>系类文章：<a href="https://segmentfault.com/a/1190000012213278">手摸手，带你优雅的使用 icon</a><br>系类文章：<a href="https://segmentfault.com/a/1190000009090836" target="_blank">手摸手，带你封装一个vue component</a>  <br>楼主个人免费<a href="https://jianshiapp.com/circles/1209" rel="nofollow noreferrer" target="_blank">圈子</a></p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000009762198](https://segmentfault.com/a/1190000009762198)

## 原文标题
手摸手，带你用vue撸后台 系列三(实战篇)

---
title: 'vue封装第三方插件并发布到npm' 
date: 2018-12-30 2:30:10
hidden: true
slug: f5e5pieo9hl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>写此文前特意google了一下，因为有较详细的开发教程我再写意义不大，有把插件封装成组件的教程，有把自己的组件封住成插件的教程，本文主要说明如何把第三方的插件封装成vue插件，简化配置，一键安装，主要提供思路，封装方法大同小异·，文章略长要有耐心。</p>
<h2 id="articleHeader1">gitment</h2>
<p>gitment是一个基于github issues封装的评论插件，以这个插件作为演示，把它封装成vue插件。<a href="https://github.com/vuetop/top-gitment" rel="nofollow noreferrer" target="_blank">vue-gitment</a>，该插件已发布到npm,并在自己的开源项目<a href="https://github.com/wmui/vueblog" rel="nofollow noreferrer" target="_blank">vueblog</a>中安装使用</p>
<h2 id="articleHeader2">项目初始化</h2>
<p>封装vue的插件用webpack-simple很合适，<code>vue init webpack-simple vue-gitment</code>此命令创建我们的项目的目录，创建文件夹和文件，最后结构是这样的  <br><span class="img-wrap"><img data-src="/img/remote/1460000011335919" src="https://static.alili.tech/img/remote/1460000011335919" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>lib目录是我们的插件目录，其他的默认就好</p>
<h2 id="articleHeader3">修改配置项</h2>
<h3 id="articleHeader4">首先是修改package.json</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;vue-gitment&quot;,
  &quot;version&quot;: &quot;0.1.1&quot;,
  &quot;description&quot;: &quot;A comment plugin by gitment&quot;,
  &quot;main&quot;: &quot;dist/vue-gitment.js&quot;,
  &quot;directories&quot;: {
    &quot;dist&quot;: &quot;dist&quot;
  },
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;cross-env NODE_ENV=development webpack-dev-server --open --hot&quot;,
    &quot;build&quot;: &quot;cross-env NODE_ENV=production webpack --progress --hide-modules&quot;
  },
  &quot;repository&quot;: {
    &quot;type&quot;: &quot;git&quot;,
    &quot;url&quot;: &quot;git+https://github.com/vue-blog/vue-gitment.git&quot;
  },
  &quot;dependencies&quot;: {
    &quot;gitment&quot;: &quot;^0.0.3&quot;,
    &quot;vue&quot;: &quot;^2.3.3&quot;
  },
  &quot;devDependencies&quot;: {
  },
  &quot;author&quot;: &quot;wmui&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;bugs&quot;: {
    &quot;url&quot;: &quot;https://github.com/vue-blog/vue-gitment/issues&quot;
  },
  &quot;homepage&quot;: &quot;https://github.com/vue-blog/vue-gitment#readme&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"vue-gitment"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.1.1"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"A comment plugin by gitment"</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"dist/vue-gitment.js"</span>,
  <span class="hljs-attr">"directories"</span>: {
    <span class="hljs-attr">"dist"</span>: <span class="hljs-string">"dist"</span>
  },
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"cross-env NODE_ENV=development webpack-dev-server --open --hot"</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"cross-env NODE_ENV=production webpack --progress --hide-modules"</span>
  },
  <span class="hljs-attr">"repository"</span>: {
    <span class="hljs-attr">"type"</span>: <span class="hljs-string">"git"</span>,
    <span class="hljs-attr">"url"</span>: <span class="hljs-string">"git+https://github.com/vue-blog/vue-gitment.git"</span>
  },
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"gitment"</span>: <span class="hljs-string">"^0.0.3"</span>,
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^2.3.3"</span>
  },
  <span class="hljs-attr">"devDependencies"</span>: {
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"wmui"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"MIT"</span>,
  <span class="hljs-attr">"bugs"</span>: {
    <span class="hljs-attr">"url"</span>: <span class="hljs-string">"https://github.com/vue-blog/vue-gitment/issues"</span>
  },
  <span class="hljs-attr">"homepage"</span>: <span class="hljs-string">"https://github.com/vue-blog/vue-gitment#readme"</span>
}</code></pre>
<p>把依赖性gitment添加到dependencies，main是我们打包后的文件入口，你可以用npm init命令生成一个package.json</p>
<h3 id="articleHeader5">修改webpack.config.js</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011335920" src="https://static.alili.tech/img/remote/1460000011335920" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>我们只需配置入口和出口，不要删除默认的配置，因为后面开发好插件，我们需要查看工作效果</p>
<h3 id="articleHeader6">修改index.html</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011335921" src="https://static.alili.tech/img/remote/1460000011335921" alt="" title="" style="cursor: pointer; display: inline;"></span><br>因为我们修改了webpack配置，自然要把script的src修改一下</p>
<h3 id="articleHeader7">封装插件</h3>
<h3 id="articleHeader8">VueComment.vue内容如下</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div v-comment=&quot;options&quot;></div>
</template>
<script>
// 引入依赖项
import Gitment from 'gitment'
export default {
  name: 'vue-comment',
  props: ['options'],
  directives: {
    // 自定义指令
    comment: {
      bind: function (el, binding) {
        const gitment = new Gitment({
          id: binding.value.id + '',
          owner: binding.value.owner,
          repo: binding.value.repo,
          oauth: {
            client_id: binding.value.oauth.client_id,
            client_secret: binding.value.oauth.client_secret
          }
        })
        gitment.render(el)
      }
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;template&gt;
  &lt;<span class="hljs-selector-tag">div</span> v-comment=<span class="hljs-string">"options"</span>&gt;&lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
<span class="hljs-comment">// 引入依赖项</span>
import Gitment from <span class="hljs-string">'gitment'</span>
export default {
  name: <span class="hljs-string">'vue-comment'</span>,
  props: [<span class="hljs-string">'options'</span>],
  directives: {
    <span class="hljs-comment">// 自定义指令</span>
    comment: {
      bind: function (el, binding) {
        const gitment = new Gitment({
          id: binding<span class="hljs-selector-class">.value</span><span class="hljs-selector-class">.id</span> + <span class="hljs-string">''</span>,
          owner: binding<span class="hljs-selector-class">.value</span><span class="hljs-selector-class">.owner</span>,
          repo: binding<span class="hljs-selector-class">.value</span><span class="hljs-selector-class">.repo</span>,
          oauth: {
            client_id: binding<span class="hljs-selector-class">.value</span><span class="hljs-selector-class">.oauth</span><span class="hljs-selector-class">.client_id</span>,
            client_secret: binding<span class="hljs-selector-class">.value</span><span class="hljs-selector-class">.oauth</span><span class="hljs-selector-class">.client_secret</span>
          }
        })
        gitment.render(el)
      }
    }
  }
}
&lt;/script&gt;</code></pre>
<p>相信熟悉vue的一眼都看懂了，render函数是gitment对象的方法，不用关心，和我们开发组件是一样一样的  <br>index.js封装组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueComment from './VueComment.vue'
const comment = {
  install: function(Vue) {
    Vue.component(VueComment.name, VueComment)
  }
}
// 这里的判断很重要
if (typeof window !== 'undefined' &amp;&amp; window.Vue) { 
    window.Vue.use(comment) 
}
export default comment" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> VueComment <span class="hljs-keyword">from</span> <span class="hljs-string">'./VueComment.vue'</span>
<span class="hljs-keyword">const</span> comment = {
  <span class="hljs-attr">install</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>) </span>{
    Vue.component(VueComment.name, VueComment)
  }
}
<span class="hljs-comment">// 这里的判断很重要</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) { 
    <span class="hljs-built_in">window</span>.Vue.use(comment) 
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> comment</code></pre>
<p>我们在webpack配置的入口文件就是他，install是挂载组件的方法，有了它我们就可以在外部use一个插件了，简单吧</p>
<h3 id="articleHeader9">测试插件</h3>
<p>首先测试build是否成功  <br><code>npm run build</code>dist目录会生成如下文件  <br><span class="img-wrap"><img data-src="/img/remote/1460000011335922" src="https://static.alili.tech/img/remote/1460000011335922" alt="" title="" style="cursor: pointer; display: inline;"></span><br>可喜可贺，接下来测试插件是否正常工作  <br>我们需要把package和webpack的修改一下，这就是为什么我前面说不要删除而是注释掉 ，把package.json的main修改为dist/build.js，wepack的entry和filename换成默认配置，index.html的src也换成默认的  <br>在main.js中引入我们的组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueComment from './lib/index.js'
Vue.use(VueComment)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> VueComment <span class="hljs-keyword">from</span> <span class="hljs-string">'./lib/index.js'</span>
Vue.use(VueComment)</code></pre>
<p>App.vue中使用我们的插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <vue-comment :options=&quot;options&quot; v-if=&quot;options&quot;></vue-comment>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      options: {
        id: 'article id',
        owner: 'Your GitHub ID',
        repo: 'The repo to store comments',
        oauth: {
          client_id: 'Your client ID', 
          client_secret: 'Your client secret',
        } 
      }
    }
  }
}
</script>
<style>
    @import '~gitment/style/default.css';
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">vue-comment</span> <span class="hljs-attr">:options</span>=<span class="hljs-string">"options"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"options"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">vue-comment</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'App'</span>,
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">id</span>: <span class="hljs-string">'article id'</span>,
        <span class="hljs-attr">owner</span>: <span class="hljs-string">'Your GitHub ID'</span>,
        <span class="hljs-attr">repo</span>: <span class="hljs-string">'The repo to store comments'</span>,
        <span class="hljs-attr">oauth</span>: {
          <span class="hljs-attr">client_id</span>: <span class="hljs-string">'Your client ID'</span>, 
          <span class="hljs-attr">client_secret</span>: <span class="hljs-string">'Your client secret'</span>,
        } 
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    @<span class="hljs-keyword">import</span> <span class="hljs-string">'~gitment/style/default.css'</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>执行<code>npm run dev</code>  <br><span class="img-wrap"><img data-src="/img/remote/1460000011335923" src="https://static.alili.tech/img/remote/1460000011335923" alt="" title="" style="cursor: pointer; display: inline;"></span><br>哈哈，它正常工作了，<code>Error: Not Found</code>是因为我没配置client_id。</p>
<h2 id="articleHeader10">发布插件</h2>
<p>完成测试工作后我们就可以发布到npm了，这个就比较见到了，注册个<a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">npm</a>账号，在你要发布的项目目录执行<code>npm login</code>，输入账号密码和邮箱，然后<code>npm publish</code>就发布成功了，<code>npm install vue-gitment</code>查看效果，建议直接看源代码，因为真的很简单。</p>
<h2 id="articleHeader11">结语</h2>
<p>自己动手丰衣足食</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue封装第三方插件并发布到npm

## 原文链接
[https://segmentfault.com/a/1190000011335914](https://segmentfault.com/a/1190000011335914)


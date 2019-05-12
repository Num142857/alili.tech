---
title: '使用Vue CLI 3将基于element-ui二次封装的组件发布到npm' 
date: 2019-03-02 2:30:07
hidden: true
slug: 6x8i1yz9vfj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>前言：之前在网上找的好多都是基于vue-cli 2.x的，而使用vue-cli 3的文章比较少，所以我在自己尝试的时候把几篇文章结合了一下，调出来了我想要的模式，也就是Vue CLI 3 + element-ui + 多个二次封装的组件。最终想要的是 element-ui 这种感觉的，很多组件可以在不同项目中复用。</blockquote>
<h2 id="articleHeader0">安装依赖</h2>
<p>首先用<a href="https://cli.vuejs.org/zh/" rel="nofollow noreferrer" target="_blank">Vue CLI 3</a>来初始化项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn global add @vue/cli
vue create qiyun-el-ui
vue ui" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>yarn global <span class="hljs-keyword">add</span><span class="bash"> @vue/cli
</span>vue create qiyun-el-ui
vue ui</code></pre>
<h3 id="articleHeader1">安装element-ui</h3>
<p>这里使用官方提供的的插件安装：<br><a href="http://element.eleme.io/#/zh-CN/component/quickstart#shi-yong-vue-cli-at-3" rel="nofollow noreferrer" target="_blank">http://element.eleme.io/#/zh-...</a></p>
<p><a href="https://github.com/ElementUI/vue-cli-plugin-element" rel="nofollow noreferrer" target="_blank">https://github.com/ElementUI/...</a></p>
<p>在插件列表搜索element<br><span class="img-wrap"><img data-src="/img/remote/1460000016927698?w=2878&amp;h=1398" src="https://static.alili.tech/img/remote/1460000016927698?w=2878&amp;h=1398" alt="image" title="image" style="cursor: pointer; display: inline;"></span><br>在这里我选的手动导入，图中是全部导入<br><span class="img-wrap"><img data-src="/img/remote/1460000016927699" src="https://static.alili.tech/img/remote/1460000016927699" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>这样在项目中，就会新建一个plugins文件夹，里面有个element.js 文件，如果想手动引入，就在这里添加要依赖的组件，这里是为了调试组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import { 
  Button, 
  Dialog 
} from 'element-ui'

Vue.use(Button)
Vue.use(Dialog)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> { 
  Button, 
  Dialog 
} <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>

Vue.use(Button)
Vue.use(Dialog)</code></pre>
<p>由于我们是基于<code>element-ui</code>的部分组件做的二次封装，所以最好还是按需引入所依赖的组件比较好。</p>
<h2 id="articleHeader2">编写组件</h2>
<p>在 <code>src</code> 的同级下面新建 <code>packages</code> 目录，在这里添加自己封装的要发布的组件。<br>例如，新建 <code>qe-modal</code> 文件夹，再接着新建 <code>src</code> 文件夹，里面新建 <code>qe-modal.vue</code>，在这里写组件的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <el-dialog
    :title=&quot;title&quot;
    :visible=&quot;dialogVisible&quot;
    @close=&quot;$emit('update:dialogVisible', false)&quot;
    :width=&quot;width&quot;>
    <slot name=&quot;modal-body&quot;></slot>

    <div slot=&quot;footer&quot; class=&quot;dialog-footer&quot;>
      <slot name=&quot;modal-footer&quot;>
        <el-button @click=&quot;$emit('update:dialogVisible', false)&quot; size=&quot;small&quot;>取 消</el-button>
        <el-button type=&quot;primary&quot; @click=&quot;$emit('confirm')&quot; size=&quot;small&quot; :disabled=&quot;confirmDisable || beforeSendDisable&quot;>"{{" beforeSendDisable? &quot;处理中...&quot; : &quot;确 定&quot; "}}"</el-button>
      </slot>
    </div>

  </el-dialog>
</template>

<script>
export default {
  name: 'qeModal',
  props: {
    dialogVisible: Boolean,
    title: String,
    width: {
      type: String,
      default: '580px'
    },
    beforeSendDisable: {
      type: Boolean,
      default: false
    },
    confirmDisable: {
      type: Boolean,
      default: false
    }
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-dialog</span>
    <span class="hljs-attr">:title</span>=<span class="hljs-string">"title"</span>
    <span class="hljs-attr">:visible</span>=<span class="hljs-string">"dialogVisible"</span>
    @<span class="hljs-attr">close</span>=<span class="hljs-string">"$emit('update:dialogVisible', false)"</span>
    <span class="hljs-attr">:width</span>=<span class="hljs-string">"width"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"modal-body"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"footer"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog-footer"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"modal-footer"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"$emit('update:dialogVisible', false)"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span>&gt;</span>取 消<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"$emit('confirm')"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span> <span class="hljs-attr">:disabled</span>=<span class="hljs-string">"confirmDisable || beforeSendDisable"</span>&gt;</span></span><span class="hljs-template-variable">"{{" beforeSendDisable? "处理中..." : "确 定" "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">el-dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'qeModal'</span>,
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">dialogVisible</span>: <span class="hljs-built_in">Boolean</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-built_in">String</span>,
    <span class="hljs-attr">width</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-string">'580px'</span>
    },
    <span class="hljs-attr">beforeSendDisable</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>
    },
    <span class="hljs-attr">confirmDisable</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>在 <code>qe-modal</code> 根目录下新建 <code>index.js</code> ，里面注册单独的该组件，方便使用时可以单独引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import qeModal from './src/qe-modal'

qeModal.install = function(Vue) {
  Vue.component(qeModal.name, qeModal)
}

export default qeModal" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> qeModal <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/qe-modal'</span>

qeModal.install = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>) </span>{
  Vue.component(qeModal.name, qeModal)
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> qeModal</code></pre>
<p>这样一个组件就添加完成了，然后需要在 <code>packages</code> 的根目录下添加一个总的 <code>index.js</code>，这里是全局注册的地方，使用时可以全局引入，其实就跟 <code>element-ui</code> 的两种方式一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import qeModal from './qe-modal'

const components = [
  qeModal
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

if (typeof window !== 'undefined' &amp;&amp; window.Vue) {
  install(window.Vue);
}

export default {
  install,
  qeModal
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> qeModal <span class="hljs-keyword">from</span> <span class="hljs-string">'./qe-modal'</span>

<span class="hljs-keyword">const</span> components = [
  qeModal
]

<span class="hljs-keyword">const</span> install = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>) </span>{
  components.forEach(<span class="hljs-function"><span class="hljs-params">component</span> =&gt;</span> {
    Vue.component(component.name, component);
  });
}

<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) {
  install(<span class="hljs-built_in">window</span>.Vue);
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  install,
  qeModal
}</code></pre>
<p>后面再添加组件，在这里也要再注册一下，而<code>element-ui</code> 源码中是动态引入的，我们的项目组件还没那么多，可以先一个个手动引入，如果后面数量多了，不好维护，可以参考 <code>element-ui</code>  的源码实现，我在<a href="https://athena0304.github.io/element-analysis/build/bin/build-entry.js.html" rel="nofollow noreferrer" target="_blank">这里</a>做了一些简单的解释。</p>
<h2 id="articleHeader3">配置 npm</h2>
<p>在 package.json 里面的 script 里面加一个 lib选项，方便每次构建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    // ...,
    &quot;lib&quot;: &quot;vue-cli-service build --target lib --name qiyun-el-ui --dest lib ./packages/index.js&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-comment">// ...,</span>
    <span class="hljs-string">"lib"</span>: <span class="hljs-string">"vue-cli-service build --target lib --name qiyun-el-ui --dest lib ./packages/index.js"</span>
  },</code></pre>
<p>其中 <code>--name</code> 后面是你最后想要生成文件的名字，并用 <code>--dest lib</code> 修改了构建的目录。<br>然后在 <code>package.json</code> 里面添加一些npm包发布的相关信息，比如作者、版本等：<br>其中最重要的是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;main&quot;: &quot;lib/qiyun-el-ui.common.js&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"main"</span>: <span class="hljs-string">"lib/qiyun-el-ui.common.js"</span>,</code></pre>
<p>这里的路径要和上面构建出来的目录和文件名对应上。</p>
<p>里面的配置项，在网上找了个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;maucash&quot;,
  &quot;description&quot;: &quot;maucash中常用组件抽取&quot;,
  &quot;version&quot;: &quot;1.0.2&quot;,
  &quot;author&quot;: &quot;kuangshp <kuangshp@126.com>&quot;,
  // 开源协议
  &quot;license&quot;: &quot;MIT&quot;,
  // 因为组件包是公用的，所以private为false
  &quot;private&quot;: false,
  // 配置main结点，如果不配置，我们在其他项目中就不用import XX from '包名'来引用了，只能以包名作为起点来指定相对的路径
  &quot;main&quot;: &quot;dist/maucash.js&quot;,
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;cross-env NODE_ENV=development webpack-dev-server --open --hot&quot;,
    &quot;build&quot;: &quot;cross-env NODE_ENV=production webpack --progress --hide-modules&quot;
  },
  &quot;dependencies&quot;: {
    &quot;axios&quot;: &quot;^0.18.0&quot;,
    &quot;iview&quot;: &quot;^2.14.1&quot;,
    &quot;style-loader&quot;: &quot;^0.23.1&quot;,
    &quot;url-loader&quot;: &quot;^1.1.2&quot;,
    &quot;vue&quot;: &quot;^2.5.11&quot;
  },
  // 指定代码所在的仓库地址
  &quot;repository&quot;: {
    &quot;type&quot;: &quot;git&quot;,
    &quot;url&quot;: &quot;git+git@git.wolaidai.com:maucash/maucash.git&quot;
  },
  // 指定打包后,包中存在的文件夹
  &quot;files&quot;: [
    &quot;dist&quot;,
    &quot;src&quot;
  ],
  // 指定关键词
  &quot;keywords&quot;: [
    &quot;vue&quot;,
    &quot;maucash&quot;,
    &quot;code&quot;,
    &quot;maucash code&quot;
  ],
  // 项目官网的地址
  &quot;homepage&quot;: &quot;https://github.com/kuangshp/maucash&quot;,
  &quot;browserslist&quot;: [
    &quot;> 1%&quot;,
    &quot;last 2 versions&quot;,
    &quot;not ie <= 8&quot;
  ],
  &quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.26.0&quot;,
    &quot;babel-loader&quot;: &quot;^7.1.2&quot;,
    &quot;babel-plugin-transform-runtime&quot;: &quot;^6.23.0&quot;,
    &quot;babel-preset-env&quot;: &quot;^1.6.0&quot;,
    &quot;babel-preset-stage-3&quot;: &quot;^6.24.1&quot;,
    &quot;cross-env&quot;: &quot;^5.0.5&quot;,
    &quot;css-loader&quot;: &quot;^0.28.7&quot;,
    &quot;file-loader&quot;: &quot;^1.1.4&quot;,
    &quot;node-sass&quot;: &quot;^4.5.3&quot;,
    &quot;sass-loader&quot;: &quot;^6.0.6&quot;,
    &quot;vue-loader&quot;: &quot;^13.0.5&quot;,
    &quot;vue-template-compiler&quot;: &quot;^2.4.4&quot;,
    &quot;webpack&quot;: &quot;^3.6.0&quot;,
    &quot;webpack-dev-server&quot;: &quot;^2.9.1&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"maucash"</span>,
  <span class="hljs-string">"description"</span>: <span class="hljs-string">"maucash中常用组件抽取"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.2"</span>,
  <span class="hljs-string">"author"</span>: <span class="hljs-string">"kuangshp &lt;kuangshp@126.com&gt;"</span>,
  <span class="hljs-comment">// 开源协议</span>
  <span class="hljs-string">"license"</span>: <span class="hljs-string">"MIT"</span>,
  <span class="hljs-comment">// 因为组件包是公用的，所以private为false</span>
  <span class="hljs-string">"private"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-comment">// 配置main结点，如果不配置，我们在其他项目中就不用import XX from '包名'来引用了，只能以包名作为起点来指定相对的路径</span>
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"dist/maucash.js"</span>,
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"cross-env NODE_ENV=development webpack-dev-server --open --hot"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"cross-env NODE_ENV=production webpack --progress --hide-modules"</span>
  },
  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"axios"</span>: <span class="hljs-string">"^0.18.0"</span>,
    <span class="hljs-string">"iview"</span>: <span class="hljs-string">"^2.14.1"</span>,
    <span class="hljs-string">"style-loader"</span>: <span class="hljs-string">"^0.23.1"</span>,
    <span class="hljs-string">"url-loader"</span>: <span class="hljs-string">"^1.1.2"</span>,
    <span class="hljs-string">"vue"</span>: <span class="hljs-string">"^2.5.11"</span>
  },
  <span class="hljs-comment">// 指定代码所在的仓库地址</span>
  <span class="hljs-string">"repository"</span>: {
    <span class="hljs-string">"type"</span>: <span class="hljs-string">"git"</span>,
    <span class="hljs-string">"url"</span>: <span class="hljs-string">"git+git@git.wolaidai.com:maucash/maucash.git"</span>
  },
  <span class="hljs-comment">// 指定打包后,包中存在的文件夹</span>
  <span class="hljs-string">"files"</span>: [
    <span class="hljs-string">"dist"</span>,
    <span class="hljs-string">"src"</span>
  ],
  <span class="hljs-comment">// 指定关键词</span>
  <span class="hljs-string">"keywords"</span>: [
    <span class="hljs-string">"vue"</span>,
    <span class="hljs-string">"maucash"</span>,
    <span class="hljs-string">"code"</span>,
    <span class="hljs-string">"maucash code"</span>
  ],
  <span class="hljs-comment">// 项目官网的地址</span>
  <span class="hljs-string">"homepage"</span>: <span class="hljs-string">"https://github.com/kuangshp/maucash"</span>,
  <span class="hljs-string">"browserslist"</span>: [
    <span class="hljs-string">"&gt; 1%"</span>,
    <span class="hljs-string">"last 2 versions"</span>,
    <span class="hljs-string">"not ie &lt;= 8"</span>
  ],
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"babel-core"</span>: <span class="hljs-string">"^6.26.0"</span>,
    <span class="hljs-string">"babel-loader"</span>: <span class="hljs-string">"^7.1.2"</span>,
    <span class="hljs-string">"babel-plugin-transform-runtime"</span>: <span class="hljs-string">"^6.23.0"</span>,
    <span class="hljs-string">"babel-preset-env"</span>: <span class="hljs-string">"^1.6.0"</span>,
    <span class="hljs-string">"babel-preset-stage-3"</span>: <span class="hljs-string">"^6.24.1"</span>,
    <span class="hljs-string">"cross-env"</span>: <span class="hljs-string">"^5.0.5"</span>,
    <span class="hljs-string">"css-loader"</span>: <span class="hljs-string">"^0.28.7"</span>,
    <span class="hljs-string">"file-loader"</span>: <span class="hljs-string">"^1.1.4"</span>,
    <span class="hljs-string">"node-sass"</span>: <span class="hljs-string">"^4.5.3"</span>,
    <span class="hljs-string">"sass-loader"</span>: <span class="hljs-string">"^6.0.6"</span>,
    <span class="hljs-string">"vue-loader"</span>: <span class="hljs-string">"^13.0.5"</span>,
    <span class="hljs-string">"vue-template-compiler"</span>: <span class="hljs-string">"^2.4.4"</span>,
    <span class="hljs-string">"webpack"</span>: <span class="hljs-string">"^3.6.0"</span>,
    <span class="hljs-string">"webpack-dev-server"</span>: <span class="hljs-string">"^2.9.1"</span>
  }
}
</code></pre>
<h2 id="articleHeader4">发布到npm</h2>
<p>到这块后面的网上有很多更细致的教程，我就不在这里赘述了。下面给出两个文章的链接，供参考。</p>
<p>1、到<a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">npm</a>上注册一个账号</p>
<p>2、登录<br><code>npm login</code></p>
<p>3、添加用户信息<br><code>npm adduser</code></p>
<p>4、发布到远程仓库(npm)上<br><code>npm publish</code></p>
<p>5、删除远程仓库的包<br><code>npx force-unpublish package-name '原因描述'</code></p>
<p>参考：<br><a href="https://juejin.im/post/5bc44175f265da0a906f9869" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5bc441...</a><br><a href="https://www.jb51.net/article/148692.htm" rel="nofollow noreferrer" target="_blank">Vue cli3 库模式搭建组件库并发布到 npm的流程_vue.js_脚本之家</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Vue CLI 3将基于element-ui二次封装的组件发布到npm

## 原文链接
[https://segmentfault.com/a/1190000016927695](https://segmentfault.com/a/1190000016927695)


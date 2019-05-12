---
title: '手把手教你撸个vue2.0弹窗组件' 
date: 2019-01-05 2:30:10
hidden: true
slug: n4u4sitw68q
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">手把手教你撸个vue2.0弹窗组件</h1>
<h3 id="articleHeader1">在开始之前需要了解一下开发vue插件的前置知识，推荐先看一下<a href="https://cn.vuejs.org/v2/guide/plugins.html" rel="nofollow noreferrer" target="_blank">vue官网的插件介绍</a>
</h3>
<p>预览地址 <a href="http://haogewudi.me/kiko/index.html" rel="nofollow noreferrer" target="_blank">http://haogewudi.me/kiko/inde...</a></p>
<p>源码地址 <a href="https://github.com/rascalHao/kiko" rel="nofollow noreferrer" target="_blank">https://github.com/rascalHao/...</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010559716" src="https://static.alili.tech/img/remote/1460000010559716" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">搭建项目</h2>
<ol>
<li>vue-cli将你的vue项目初始化建好 vue init webpack my-project</li>
<li>
<p>平常我们引入插件的流程是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i <package> -S

import Vue from 'vue'
import xxx from 'xxx'
Vue.use(xxx)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> i &lt;package&gt; -S

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> xxx <span class="hljs-keyword">from</span> <span class="hljs-string">'xxx'</span>
Vue.use(xxx)
</code></pre>
</li>
</ol>
<p>所以可以在node_modules下面新建一个你的开发目录，我这里命名为kiko,<br>  所以现在大概引入我们的开发插件的步骤为(项目最终构建完会采取发布npm包的形式)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import Vue from 'vue'
  import Kiko from '../node_modules/kiko/index.js'
  Vue.use(Kiko)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
  <span class="hljs-keyword">import</span> Kiko <span class="hljs-keyword">from</span> <span class="hljs-string">'../node_modules/kiko/index.js'</span>
  Vue.use(Kiko)</code></pre>
<ol>
<li>在你的项目目录下通过npm init指令来初始化一个package.json文件，默认指定你的入口文件index.js,并在你的项目根目录下新建一个index.js入口文件</li>
<li>这里会构建4中类型的弹窗组件（message、toolTip、confirm、loading）,基本的结构如图所示</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010559717" src="https://static.alili.tech/img/remote/1460000010559717" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">入口文件（可以先略过）</h2>
<blockquote><p>Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象;通过全局方法 Vue.use() 使用插件;可以再次看下<a href="https://cn.vuejs.org/v2/guide/plugins.html" rel="nofollow noreferrer" target="_blank">vue官网的插件介绍</a></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import KikoMessage from './packages/message/index.js'
    import KikoToolTip from './packages/tips/index.js'
    import KikoConfirm from './packages/confirm/index.js'
    import KikoLoading from './packages/loading/index.js'

    const install = function(Vue) {
      Vue.component(KikoMessage.name, KikoMessage)
      Vue.component(KikoToolTip.name, KikoToolTip)
      Vue.component(KikoConfirm.name, KikoConfirm)
      Vue.component(KikoLoading.name, KikoLoading)

      Vue.prototype.$kiko_tooltip = KikoToolTip.installToolTip
      Vue.prototype.$kiko_message = KikoMessage.installMessage
    }
    export default install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    import KikoMessage from <span class="hljs-string">'./packages/message/index.js'</span>
    import KikoToolTip from <span class="hljs-string">'./packages/tips/index.js'</span>
    import KikoConfirm from <span class="hljs-string">'./packages/confirm/index.js'</span>
    import KikoLoading from <span class="hljs-string">'./packages/loading/index.js'</span>

    const install = function(Vue) {
      Vue.component(KikoMessage<span class="hljs-selector-class">.name</span>, KikoMessage)
      Vue.component(KikoToolTip<span class="hljs-selector-class">.name</span>, KikoToolTip)
      Vue.component(KikoConfirm<span class="hljs-selector-class">.name</span>, KikoConfirm)
      Vue.component(KikoLoading<span class="hljs-selector-class">.name</span>, KikoLoading)

      Vue<span class="hljs-selector-class">.prototype</span>.<span class="hljs-variable">$kiko_tooltip</span> = KikoToolTip<span class="hljs-selector-class">.installToolTip</span>
      Vue<span class="hljs-selector-class">.prototype</span>.<span class="hljs-variable">$kiko_message</span> = KikoMessage<span class="hljs-selector-class">.installMessage</span>
    }
    export default install</code></pre>
<h2 id="articleHeader4">message</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010559718" src="https://static.alili.tech/img/remote/1460000010559718" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote><p>在项目的根目录创建message组件，通过</p></blockquote>
<p>Vue.prototype.$kiko_message = function (methodOptions) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 逻辑..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">// 逻辑...</span></code></pre>
<p>}<br>来添加实例方法全局以调用this.$kiko_message()的方式来调用message</p>
<ul><li>message组件结构</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010559719" src="https://static.alili.tech/img/remote/1460000010559719" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>main.vue</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <template>
      <transition name=&quot;fade&quot;>
        <div class=&quot;kiko-message&quot; v-if=&quot;isShow&quot;>
          "{{"message"}}"
        </div>
      </transition>
    </template>

    <script type=&quot;text/javascript&quot;>
      export default {
        name: 'kiko-message',
        data () {
          return {
            message: '',
            time: 3000,
            isShow: true
          }
        },
        mounted () {
          this.close()
        },
        methods: {
          close () {
            var that = this
            window.setTimeout(function() {
              that.isShow = false
            }, this.time);
          }
        }
      }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">    <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"fade"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"kiko-message"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isShow"</span>&gt;</span>
          </span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
      <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'kiko-message'</span>,
        data () {
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">message</span>: <span class="hljs-string">''</span>,
            <span class="hljs-attr">time</span>: <span class="hljs-number">3000</span>,
            <span class="hljs-attr">isShow</span>: <span class="hljs-literal">true</span>
          }
        },
        mounted () {
          <span class="hljs-keyword">this</span>.close()
        },
        <span class="hljs-attr">methods</span>: {
          close () {
            <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>
            <span class="hljs-built_in">window</span>.setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
              that.isShow = <span class="hljs-literal">false</span>
            }, <span class="hljs-keyword">this</span>.time);
          }
        }
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<ul><li>index.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import Vue from 'vue'
    import Message from './src/main.vue'

    Message.installMessage = function(options) {
      if (options === undefined || options === null) {
        options = {
          message: ''
        }
      } else if (typeof options === 'string' || typeof options === 'number') {
        options = {
          message: options
        }
      }
      var message = Vue.extend(Message)

      var component = new message({
        data: options
      }).$mount()
      document.querySelector('body').appendChild(component.$el)
    }

    export default Message
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
    <span class="hljs-keyword">import</span> Message <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/main.vue'</span>

    Message.installMessage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
      <span class="hljs-keyword">if</span> (options === <span class="hljs-literal">undefined</span> || options === <span class="hljs-literal">null</span>) {
        options = {
          <span class="hljs-attr">message</span>: <span class="hljs-string">''</span>
        }
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> options === <span class="hljs-string">'string'</span> || <span class="hljs-keyword">typeof</span> options === <span class="hljs-string">'number'</span>) {
        options = {
          <span class="hljs-attr">message</span>: options
        }
      }
      <span class="hljs-keyword">var</span> message = Vue.extend(Message)

      <span class="hljs-keyword">var</span> component = <span class="hljs-keyword">new</span> message({
        <span class="hljs-attr">data</span>: options
      }).$mount()
      <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'body'</span>).appendChild(component.$el)
    }

    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Message
</code></pre>
<blockquote><p>到这里的时候可以看下前面的入口文件介绍，你需要通过<a href="https://cn.vuejs.org/v2/api/#Vue-component-id-definition" rel="nofollow noreferrer" target="_blank">Vue.component</a>注册为组件，并把Message.installMessage方法绑定到Vue.prototype.$kiko_message上。</p></blockquote>
<h2 id="articleHeader5">toolTip</h2>
<blockquote><p>没有选择通过固化在页面中的方式来引入toolTip,因为考虑到可能在页面中的任何地方引入toolTip,如果固化了，将会大大限制toolTip的使用场景。所以采用了一个绑定到Vue.prototype的this.$kiko_tooltip全局方法来触发，这样就可以自定义触发方式，只需要通过传入$event就可以自动地定位任何有需要的元素了。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010559720" src="https://static.alili.tech/img/remote/1460000010559720" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>toolTip组件结构</li></ul>
<p>同message组件结构</p>
<ul><li>main.vue</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <template>
    <div v-if=&quot;isShow&quot; id=&quot;kiko_tool_tip&quot; class=&quot;kiko-tool-tip&quot; :class=&quot;{'left': direction === 'left', 'right': direction === 'right', 'top': direction === 'top', 'bottom': direction === 'bottom'}&quot; :style=&quot;{'background-color': background, 'color': color, 'top': top, 'left': left}&quot;>
      "{{"content"}}"
      <div class=&quot;arrow&quot; :style=&quot;arrowStyleObject&quot;></div>
    </div>
  </template>

  <script type=&quot;text/javascript&quot;>
    export default {
      name: 'kikoToolTip',
      data () {
        return {
          isShow: true,
          time: 3000,
          content: '',
          direction: 'right',
          background: 'red',
          color: '#fff',
          arrowStyleObject: ''
        }
      },
      beforeMount () {
        let node = document.querySelector('#kiko_tool_tip')
        if (node &amp;&amp; node.parentNode) {
          node.parentNode.removeChild(node)
        }
      },
      computed: {
        top () {
          switch (this.direction) {
            case 'top':
              return (this.rect.top - 12) + 'px'
            case 'bottom':
              return (this.rect.top + 12) + 'px'
            case 'left':
              return (this.rect.top + this.rect.height / 2) + 'px'
            case 'right':
              return (this.rect.top + this.rect.height / 2) + 'px'
          }
        },
        left () {
          switch (this.direction) {
            case 'top':
              return (this.rect.left + this.rect.width / 2) + 'px'
            case 'bottom':
              return (this.rect.left + this.rect.width / 2) + 'px'
            case 'left':
              return (this.rect.left - 12) + 'px'
            case 'right':
              return (this.rect.left + this.rect.width + 12) + 'px'
          }
        }
      },
      mounted () {
        this.initColor()
        this.hidden()
      },
      methods: {
        initColor () {
          switch (this.direction.toLowerCase()) {
            case 'left':
              this.arrowStyleObject = {
                borderLeftColor: this.background
              }
              break;
            case 'right':
              this.arrowStyleObject = {
                borderRightColor: this.background
              }
              break;
            case 'top':
              this.arrowStyleObject = {
                borderTopColor: this.background
              }
              break;
            case 'bottom':
              this.arrowStyleObject = {
                borderBottomColor: this.background
              }
              break;
          }

        },
        hidden () {
          let that = this
          window.setTimeout(function(){
            that.isShow = false
          }, this.time)
        }
      }
    }
  </script>

  <style type=&quot;text/css&quot;>
    .kiko-tool-tip {
      display: block;
      position: absolute;
      position: fixed;
      background-color: #3695CC;
      padding: 10px 10px;
      border-radius: 5px;
      color: #fff;
      white-space: nowrap;
      z-index: 99999999
    }
    .kiko-tool-tip.left {
      transform: translate(-100%, -50%);
    }
    .kiko-tool-tip.right {
      transform: translate(0, -50%);
    }
    .kiko-tool-tip.top {
      transform: translate(-50%, -100%);
    }
    .kiko-tool-tip.bottom {
      transform: translate(-50%, 100%);
    }
    .kiko-tool-tip.right .arrow {
      display: inline-block;
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      top: 50%;
      left: -10px;
      border-top: 10px solid transparent;
      border-right: 15px solid #3695CC;
      border-bottom: 10px solid transparent;
      transform: translate(0, -50%);
    }
    .kiko-tool-tip.left .arrow {
      display: inline-block;
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      top: 50%;
      right: -10px;
      border-top: 10px solid transparent;
      border-left: 15px solid #3695CC;
      border-bottom: 10px solid transparent;
      transform: translate(0, -50%);
    }
    .kiko-tool-tip.top .arrow {
      display: inline-block;
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      left: 50%;
      bottom: -10px;
      border-top: 15px solid #3695CC;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      transform: translate(-50%, 0);
    }
    .kiko-tool-tip.bottom .arrow {
      display: inline-block;
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      left: 50%;
      top: -10px;
      border-bottom: 15px solid #3695CC;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      transform: translate(-50%, 0);
    }
  </style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">  <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isShow"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"kiko_tool_tip"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"kiko-tool-tip"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'left': direction === 'left', 'right': direction === 'right', 'top': direction === 'top', 'bottom': direction === 'bottom'}"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'background-color': background, 'color': color, 'top': top, 'left': left}"</span>&gt;</span>
      </span><span class="hljs-template-variable">"{{"content"}}"</span><span class="xml">
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"arrow"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"arrowStyleObject"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'kikoToolTip'</span>,
      data () {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">isShow</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">time</span>: <span class="hljs-number">3000</span>,
          <span class="hljs-attr">content</span>: <span class="hljs-string">''</span>,
          <span class="hljs-attr">direction</span>: <span class="hljs-string">'right'</span>,
          <span class="hljs-attr">background</span>: <span class="hljs-string">'red'</span>,
          <span class="hljs-attr">color</span>: <span class="hljs-string">'#fff'</span>,
          <span class="hljs-attr">arrowStyleObject</span>: <span class="hljs-string">''</span>
        }
      },
      beforeMount () {
        <span class="hljs-keyword">let</span> node = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#kiko_tool_tip'</span>)
        <span class="hljs-keyword">if</span> (node &amp;&amp; node.parentNode) {
          node.parentNode.removeChild(node)
        }
      },
      <span class="hljs-attr">computed</span>: {
        top () {
          <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">this</span>.direction) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">'top'</span>:
              <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.rect.top - <span class="hljs-number">12</span>) + <span class="hljs-string">'px'</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">'bottom'</span>:
              <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.rect.top + <span class="hljs-number">12</span>) + <span class="hljs-string">'px'</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">'left'</span>:
              <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.rect.top + <span class="hljs-keyword">this</span>.rect.height / <span class="hljs-number">2</span>) + <span class="hljs-string">'px'</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">'right'</span>:
              <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.rect.top + <span class="hljs-keyword">this</span>.rect.height / <span class="hljs-number">2</span>) + <span class="hljs-string">'px'</span>
          }
        },
        left () {
          <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">this</span>.direction) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">'top'</span>:
              <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.rect.left + <span class="hljs-keyword">this</span>.rect.width / <span class="hljs-number">2</span>) + <span class="hljs-string">'px'</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">'bottom'</span>:
              <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.rect.left + <span class="hljs-keyword">this</span>.rect.width / <span class="hljs-number">2</span>) + <span class="hljs-string">'px'</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">'left'</span>:
              <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.rect.left - <span class="hljs-number">12</span>) + <span class="hljs-string">'px'</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">'right'</span>:
              <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.rect.left + <span class="hljs-keyword">this</span>.rect.width + <span class="hljs-number">12</span>) + <span class="hljs-string">'px'</span>
          }
        }
      },
      mounted () {
        <span class="hljs-keyword">this</span>.initColor()
        <span class="hljs-keyword">this</span>.hidden()
      },
      <span class="hljs-attr">methods</span>: {
        initColor () {
          <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">this</span>.direction.toLowerCase()) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">'left'</span>:
              <span class="hljs-keyword">this</span>.arrowStyleObject = {
                <span class="hljs-attr">borderLeftColor</span>: <span class="hljs-keyword">this</span>.background
              }
              <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'right'</span>:
              <span class="hljs-keyword">this</span>.arrowStyleObject = {
                <span class="hljs-attr">borderRightColor</span>: <span class="hljs-keyword">this</span>.background
              }
              <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'top'</span>:
              <span class="hljs-keyword">this</span>.arrowStyleObject = {
                <span class="hljs-attr">borderTopColor</span>: <span class="hljs-keyword">this</span>.background
              }
              <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'bottom'</span>:
              <span class="hljs-keyword">this</span>.arrowStyleObject = {
                <span class="hljs-attr">borderBottomColor</span>: <span class="hljs-keyword">this</span>.background
              }
              <span class="hljs-keyword">break</span>;
          }

        },
        hidden () {
          <span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span>
          <span class="hljs-built_in">window</span>.setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            that.isShow = <span class="hljs-literal">false</span>
          }, <span class="hljs-keyword">this</span>.time)
        }
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.kiko-tool-tip</span> {
      <span class="hljs-attribute">display</span>: block;
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">position</span>: fixed;
      <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#3695CC</span>;
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">10px</span>;
      <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
      <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
      <span class="hljs-attribute">white-space</span>: nowrap;
      <span class="hljs-attribute">z-index</span>: <span class="hljs-number">99999999</span>
    }
    <span class="hljs-selector-class">.kiko-tool-tip</span><span class="hljs-selector-class">.left</span> {
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-100%, -50%);
    }
    <span class="hljs-selector-class">.kiko-tool-tip</span><span class="hljs-selector-class">.right</span> {
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0, -50%);
    }
    <span class="hljs-selector-class">.kiko-tool-tip</span><span class="hljs-selector-class">.top</span> {
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -100%);
    }
    <span class="hljs-selector-class">.kiko-tool-tip</span><span class="hljs-selector-class">.bottom</span> {
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, 100%);
    }
    <span class="hljs-selector-class">.kiko-tool-tip</span><span class="hljs-selector-class">.right</span> <span class="hljs-selector-class">.arrow</span> {
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
      <span class="hljs-attribute">left</span>: -<span class="hljs-number">10px</span>;
      <span class="hljs-attribute">border-top</span>: <span class="hljs-number">10px</span> solid transparent;
      <span class="hljs-attribute">border-right</span>: <span class="hljs-number">15px</span> solid <span class="hljs-number">#3695CC</span>;
      <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">10px</span> solid transparent;
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0, -50%);
    }
    <span class="hljs-selector-class">.kiko-tool-tip</span><span class="hljs-selector-class">.left</span> <span class="hljs-selector-class">.arrow</span> {
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
      <span class="hljs-attribute">right</span>: -<span class="hljs-number">10px</span>;
      <span class="hljs-attribute">border-top</span>: <span class="hljs-number">10px</span> solid transparent;
      <span class="hljs-attribute">border-left</span>: <span class="hljs-number">15px</span> solid <span class="hljs-number">#3695CC</span>;
      <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">10px</span> solid transparent;
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0, -50%);
    }
    <span class="hljs-selector-class">.kiko-tool-tip</span><span class="hljs-selector-class">.top</span> <span class="hljs-selector-class">.arrow</span> {
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
      <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">10px</span>;
      <span class="hljs-attribute">border-top</span>: <span class="hljs-number">15px</span> solid <span class="hljs-number">#3695CC</span>;
      <span class="hljs-attribute">border-left</span>: <span class="hljs-number">10px</span> solid transparent;
      <span class="hljs-attribute">border-right</span>: <span class="hljs-number">10px</span> solid transparent;
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, 0);
    }
    <span class="hljs-selector-class">.kiko-tool-tip</span><span class="hljs-selector-class">.bottom</span> <span class="hljs-selector-class">.arrow</span> {
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
      <span class="hljs-attribute">top</span>: -<span class="hljs-number">10px</span>;
      <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">15px</span> solid <span class="hljs-number">#3695CC</span>;
      <span class="hljs-attribute">border-left</span>: <span class="hljs-number">10px</span> solid transparent;
      <span class="hljs-attribute">border-right</span>: <span class="hljs-number">10px</span> solid transparent;
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, 0);
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<ul><li>index.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import Vue from 'vue'
  import ToolTip from './src/main.vue'

  ToolTip.installToolTip = function(event, opt) {

    var options = opt

    var rect = {};
    ['top', 'left'].forEach(function(property) {
      var scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
      rect[property] = event.target.getBoundingClientRect()[property] +
        document.body[scroll] +
        document.documentElement[scroll]
    });
    ['height', 'width'].forEach(function(property) {
      rect[property] = event.target.getBoundingClientRect()[property]
    });
    options.rect = rect
    var toolTip = Vue.extend(ToolTip)

    var component = new toolTip({
      data: options
    }).$mount()
    event.target.appendChild(component.$el)
  }

  export default ToolTip" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>  <span class="hljs-keyword">import</span> Vue from <span class="hljs-string">'vue'</span>
  <span class="hljs-keyword">import</span> ToolTip from <span class="hljs-string">'./src/main.vue'</span>

  ToolTip.installToolTip = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event, opt</span>) </span>{

    <span class="hljs-built_in">var</span> options = opt

    <span class="hljs-built_in">var</span> <span class="hljs-built_in">rect</span> = {};
    [<span class="hljs-string">'top'</span>, <span class="hljs-string">'left'</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">property</span>) </span>{
      <span class="hljs-built_in">var</span> scroll = <span class="hljs-keyword">property</span><span class="hljs-string"> </span>=== <span class="hljs-string">'top'</span> ? <span class="hljs-string">'scrollTop'</span> : <span class="hljs-string">'scrollLeft'</span>
      <span class="hljs-built_in">rect</span>[<span class="hljs-keyword">property</span><span class="hljs-string">] </span>= event.target.getBoundingClientRect()[<span class="hljs-keyword">property</span><span class="hljs-string">] +</span>
        <span class="hljs-built_in">document</span>.body[scroll] +
        <span class="hljs-built_in">document</span>.documentElement[scroll]
    });
    [<span class="hljs-string">'height'</span>, <span class="hljs-string">'width'</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">property</span>) </span>{
      <span class="hljs-built_in">rect</span>[<span class="hljs-keyword">property</span><span class="hljs-string">] </span>= event.target.getBoundingClientRect()[<span class="hljs-keyword">property</span><span class="hljs-string">]</span>
    });
    options.rect = <span class="hljs-built_in">rect</span>
    <span class="hljs-built_in">var</span> toolTip = Vue.extend(ToolTip)

    <span class="hljs-built_in">var</span> component = <span class="hljs-keyword">new</span> toolTip({
      <span class="hljs-attribute">data</span>: options
    }).$mount()
    event.target.appendChild(component.$el)
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ToolTip</code></pre>
<blockquote><p>通过<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect" rel="nofollow noreferrer" target="_blank">Element.getBoundingClientRect()</a>方法获取元素的大小及其相对于视口的位置，之后对提示信息进行fixed定位。</p></blockquote>
<h2 id="articleHeader6">confirm</h2>
<blockquote><p>confirm在保留页面的情况下会弹出一个对话框，适合一些场景更大的情况。可以用来进行一些复杂带校验的弹窗信息展示，也可以只用于简单信息的展示。可以通过title属性来显示任意标题，通过width属性来修改显示区域的宽度。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010559721" src="https://static.alili.tech/img/remote/1460000010559721" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>confirm组件结构</li></ul>
<p>同message组件</p>
<ul><li>main.vue</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <template>
    <transition name=&quot;bounce&quot;>
      <div class=&quot;kiko-confirm&quot; v-if=&quot;visible&quot;>
        <div class=&quot;bg&quot;></div>
        <div class=&quot;kiko-container&quot; :style=&quot;{width: width}&quot;>
          <div class=&quot;header&quot;>
            "{{"title"}}"
            <i @click=&quot;close&quot; class=&quot;icon-remove icon-large kiko-close-btn&quot; v-if=&quot;closeVisible&quot;></i>
          </div>
          <div class=&quot;content&quot;>
            <slot></slot>
          </div>
          <slot name=&quot;footer&quot;>
            <!-- <div class=&quot;kiko-footer&quot; slot=&quot;footer&quot;>
              <a href=&quot;javscript:void(0)&quot; class=&quot;kiko-btn make-sure&quot;>确定</a>
              <a href=&quot;javscript:void(0)&quot; class=&quot;kiko-btn cancel&quot;>取消</a>
            </div> -->
          </slot>
        </div>
      </div>
    </transition>
  </template>

  <script type=&quot;text/javascript&quot;>
    import '../../../lib/icon/css/font-awesome.css'
    export default {
      name: 'kiko-confirm',
      props: {
        width: {
          type: String,
          default: '260px'
        },
        title: {
          type: String,
          default: '信息'
        },
        visible: {
          type: Boolean,
          default: false
        },
        closeVisible: {
          type: Boolean,
          default: true
        }
      },
      data () {
        return {
        }
      },
      methods: {
        close () {
          this.$emit('update:visible', false)
        }
      }
    }
  </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">  <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"bounce"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"kiko-confirm"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"visible"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"kiko-container"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{width: width}"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml">
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"close"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon-remove icon-large kiko-close-btn"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"closeVisible"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"footer"</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- &lt;div class="kiko-footer" slot="footer"&gt;
              &lt;a href="javscript:void(0)" class="kiko-btn make-sure"&gt;确定&lt;/a&gt;
              &lt;a href="javscript:void(0)" class="kiko-btn cancel"&gt;取消&lt;/a&gt;
            &lt;/div&gt; --&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> <span class="hljs-string">'../../../lib/icon/css/font-awesome.css'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'kiko-confirm'</span>,
      <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">width</span>: {
          <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
          <span class="hljs-attr">default</span>: <span class="hljs-string">'260px'</span>
        },
        <span class="hljs-attr">title</span>: {
          <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
          <span class="hljs-attr">default</span>: <span class="hljs-string">'信息'</span>
        },
        <span class="hljs-attr">visible</span>: {
          <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
          <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>
        },
        <span class="hljs-attr">closeVisible</span>: {
          <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
          <span class="hljs-attr">default</span>: <span class="hljs-literal">true</span>
        }
      },
      data () {
        <span class="hljs-keyword">return</span> {
        }
      },
      <span class="hljs-attr">methods</span>: {
        close () {
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'update:visible'</span>, <span class="hljs-literal">false</span>)
        }
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<ul><li>index.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import Vue from 'vue'
  import Confirm from './src/main.vue'

  export default Confirm" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
  <span class="hljs-keyword">import</span> Confirm <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/main.vue'</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Confirm</code></pre>
<blockquote><p>这里通过组件的方式进行引入，可以只是简单地信息提示，也可以自己进行一些复杂的校验。对组件的显示与隐藏这里引用了<a href="https://cn.vuejs.org/v2/guide/components.html#sync-" rel="nofollow noreferrer" target="_blank">.sync修饰符</a>,也可以通过v-if指令。运用<a href="https://cn.vuejs.org/v2/guide/components.html#" rel="nofollow noreferrer" target="_blank">slot</a>来分发内容。</p></blockquote>
<h2 id="articleHeader7">loading</h2>
<blockquote><p>考虑到可能不需要整屏渲染,只需要局部加载loading,在指定的位置可以按需通过<a href="https://cn.vuejs.org/v2/guide/custom-directive.html" rel="nofollow noreferrer" target="_blank">自定义指令</a>来实现，通过<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect" rel="nofollow noreferrer" target="_blank">Element.getBoundingClientRect()</a>方法根据需要的元素位置、区域大小自动定位；若想整屏渲染，则需要加个.fullscreen修饰符。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010559722" src="https://static.alili.tech/img/remote/1460000010559722" alt="" title="" style="cursor: pointer;"></span></p>
<ul>
<li>loading组件结构<br>  同message组件</li>
<li>main.vue</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <template>
    <div class=&quot;kiko-loading&quot; :style=&quot;{'top': top, 'left': left, 'width': width, 'height': height}&quot;>
      <div class=&quot;bg&quot;></div>
      <div class=&quot;kiko-container&quot;>
        <i class=&quot;icon-spinner icon-spin icon-4x&quot;></i>
      </div>
    </div>
  </template>

  <script type=&quot;text/javascript&quot;>
    export default {
      name: 'kiko-loading',
      data () {
        return {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }
      }
    }
  </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"kiko-loading"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'top': top, 'left': left, 'width': width, 'height': height}"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"kiko-container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon-spinner icon-spin icon-4x"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'kiko-loading'</span>,
      data () {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>,
          <span class="hljs-attr">left</span>: <span class="hljs-number">0</span>,
          <span class="hljs-attr">width</span>: <span class="hljs-string">'100%'</span>,
          <span class="hljs-attr">height</span>: <span class="hljs-string">'100%'</span>
        }
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li>index.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import Vue from 'vue'
  import Loading from './src/main.vue'

  const loadingConstructor = Vue.extend(Loading)

  Vue.directive('kiko-loading', {
    update: function(el, binding) {
      if (binding.oldValue != binding.value) {
        const options = {}
        options.fullScreen = binding.modifiers.fullscreen ? true : false;
        if (options.fullScreen) {
          options.top = 0
          options.left = 0
          options.width = '100%'
          options.height = '100%'
        } else {
          ['top', 'left'].forEach(function(property) {
            var scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
            options[property] = el.getBoundingClientRect()[property] +
              document.body[scroll] +
              document.documentElement[scroll] +
              'px'
          });
          ['height', 'width'].forEach(function(property) {
            options[property] = el.getBoundingClientRect()[property] + 'px'
          });
        }
        var component = new loadingConstructor({
          data: options
        }).$mount()
        var node = document.querySelector('.kiko-loading')
        if (node &amp;&amp; node.parentNode) {
          node.parentNode.removeChild(node)
        }
        if (binding.value === true) {
          document.querySelector('body').appendChild(component.$el)
        } else {
          var node = document.querySelector('.kiko-loading')
          if (node &amp;&amp; node.parentNode) {
            node.parentNode.removeChild(node)
          }
        }
      }
    }
  })

  export default Loading" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>  <span class="hljs-keyword">import</span> Vue from <span class="hljs-string">'vue'</span>
  <span class="hljs-keyword">import</span> Loading from <span class="hljs-string">'./src/main.vue'</span>

  <span class="hljs-keyword">const</span> loadingConstructor = Vue.extend(Loading)

  Vue.directive(<span class="hljs-string">'kiko-loading'</span>, {
    <span class="hljs-attribute">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el, binding</span>) </span>{
      <span class="hljs-keyword">if</span> (binding.oldValue != binding.value) {
        <span class="hljs-keyword">const</span> options = {}
        options.fullScreen = binding.modifiers.fullscreen ? <span class="hljs-attribute">true</span> : <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">if</span> (options.fullScreen) {
          options.top = <span class="hljs-number">0</span>
          options.left = <span class="hljs-number">0</span>
          options.width = <span class="hljs-string">'100%'</span>
          options.height = <span class="hljs-string">'100%'</span>
        } <span class="hljs-title">else</span> {
          [<span class="hljs-string">'top'</span>, <span class="hljs-string">'left'</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">property</span>) </span>{
            <span class="hljs-built_in">var</span> scroll = <span class="hljs-keyword">property</span><span class="hljs-string"> </span>=== <span class="hljs-string">'top'</span> ? <span class="hljs-string">'scrollTop'</span> : <span class="hljs-string">'scrollLeft'</span>
            options[<span class="hljs-keyword">property</span><span class="hljs-string">] </span>= el.getBoundingClientRect()[<span class="hljs-keyword">property</span><span class="hljs-string">] +</span>
              <span class="hljs-built_in">document</span>.body[scroll] +
              <span class="hljs-built_in">document</span>.documentElement[scroll] +
              <span class="hljs-string">'px'</span>
          });
          [<span class="hljs-string">'height'</span>, <span class="hljs-string">'width'</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">property</span>) </span>{
            options[<span class="hljs-keyword">property</span><span class="hljs-string">] </span>= el.getBoundingClientRect()[<span class="hljs-keyword">property</span><span class="hljs-string">] + 'px'</span>
          });
        }
        <span class="hljs-built_in">var</span> component = <span class="hljs-keyword">new</span> loadingConstructor({
          <span class="hljs-attribute">data</span>: options
        }).$mount()
        <span class="hljs-built_in">var</span> node = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.kiko-loading'</span>)
        <span class="hljs-keyword">if</span> (node &amp;&amp; node.parentNode) {
          node.parentNode.removeChild(node)
        }
        <span class="hljs-keyword">if</span> (binding.value === <span class="hljs-literal">true</span>) {
          <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'body'</span>).appendChild(component.$el)
        } <span class="hljs-title">else</span> {
          <span class="hljs-built_in">var</span> node = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.kiko-loading'</span>)
          <span class="hljs-keyword">if</span> (node &amp;&amp; node.parentNode) {
            node.parentNode.removeChild(node)
          }
        }
      }
    }
  })

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Loading</code></pre>
<h2 id="articleHeader8">npm 发包</h2>
<ol>
<li>确保你的项目的根目录的package.json文件已经建好</li>
<li>登录<a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">npm官网</a>注册</li>
<li>在你的项目目录下登录npm login（之后按提示填写信息）</li>
<li>发包npm publish</li>
</ol>
<blockquote>
<p>如果执行npm publish出现错误，可能是你的包名已经被注册过，在npm 官网上搜索一下是否已被注册了。若发包成功，你就可以在npm官网上搜索到自己的包。</p>
<p>发包成功后，就可以通过</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`
import Vue from 'vue'
// 我的npm包是kiko-rascalhao
import Kiko from 'kiko-rascalhao'
Vue.use(Kiko)
`
引入你的插件啦 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>`
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-comment">// 我的npm包是kiko-rascalhao</span>
<span class="hljs-keyword">import</span> Kiko <span class="hljs-keyword">from</span> <span class="hljs-string">'kiko-rascalhao'</span>
Vue.use(Kiko)
`
引入你的插件啦 
</code></pre>
</blockquote>
<blockquote><p>由于本人学识有限，有很多需要提升的地方，望大家多多指教。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你撸个vue2.0弹窗组件

## 原文链接
[https://segmentfault.com/a/1190000010559711](https://segmentfault.com/a/1190000010559711)


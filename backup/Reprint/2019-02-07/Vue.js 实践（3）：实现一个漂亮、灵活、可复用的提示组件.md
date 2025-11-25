---
title: 'Vue.js 实践（3）：实现一个漂亮、灵活、可复用的提示组件' 
date: 2019-02-07 2:30:15
hidden: true
slug: lvkqmr889el
categories: [reprint]
---

{{< raw >}}

                    
<p>这次的教程里，我们要把组件化进行到底！最近半年的几个项目中，都遇到了需要使用Toast或者Notification组件的情况。在目前已有的一些基于Vue.js开发的组件库，都没有找到太合适的，所以自己重头实现了一个。历经几个项目的磨练，这个提示组件的功能已经越来越完善，这次就分享一下组件以及其实现思路吧。</p>
<blockquote><p>GitHub 仓库：<a href="https://github.com/Yuyz0112/vue-notie" rel="nofollow noreferrer" target="_blank">https://github.com/Yuyz0112/vue-notie</a><br>Demo 地址：<a href="http://lab.myriptide.com/vue-notie/" rel="nofollow noreferrer" target="_blank">http://lab.myriptide.com/vue-notie/</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVy20N" src="https://static.alili.tech/img/bVy20N" alt="yummy-notie-m.gif" title="yummy-notie-m.gif" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">深入组件化，组件的拆分、整合与复用</h2>
<p>Vue.js的组件化可以说是其招牌特性之一，而在实际应用时，并非一味地追求组件颗粒越小越好，而是需要根据项目的实际需求，来分析自己需要什么级别的组件。</p>
<p>例如在一个SPA中，我可能有主页、文章列表页、文章页、个人中心页4个主要的视图，于是我将其分别对应的写成4个组件。</p>
<p>但是在实际编写的过程中，发现他们共用了同一套侧边栏，而侧边栏对应的代码也在4个组件中重复书写了4次。所以可以将侧边栏单独写成一个组件进行复用。</p>
<p>之后，我们可能发现可以复用的还有一些表单、按钮之类的内容我们都可以复用成组件。但实际上，我们也会发现过度的组件化会导致代码量上升、开发时间增加以及额外的数据传递等等。所以如果不打算制作一个完整的组件库，那么在实际项目中做到按需拆分、整合即可，不用过分的追求每个可复用的部分都写成单个组件。</p>
<h2 id="articleHeader1">为什么需要一个提示组件</h2>
<p>因为alert大部分时间不能满足我们的需求啊。往往项目里需要一个类似于alert的东西，用美观、可定制的方式提示用户一些信息，因此这样一个提示组件很有必要。</p>
<p>同时，我们也不希望同一时间出现多个提示混淆用户，因此在设计上，我们将提示组件设定为具有<strong>唯一性</strong>，整个应用中各个视图调用的都是同一个提示组件。</p>
<h2 id="articleHeader2">Show me the code</h2>
<p>接下来，由简入繁依次实现提示组件的各个功能。</p>
<h3 id="articleHeader3">基本功能</h3>
<p>最基本的功能当然是触发后显示，并且能够以某种方式关闭。唯一需要自定义的部分，就是具体显示的内容。所以最开始组件长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;notification fixed&quot;
  v-if=&quot;show&quot;
  transition=&quot;slide&quot;>
    <div class=&quot;delete&quot;
    @click=&quot;close()&quot;></div>
    <div class=&quot;content&quot;>
      "{{" options.content "}}"
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.show = false
      this.options = {}
    }
  }
}
</script>

<style scoped lang=&quot;sass&quot;>
  .slide-transition
    transition: all .3s ease
    transform: translate3d(0, 0, 0)
  .slide-enter,
  .slide-leave
    transform: translate3d(0, -100%, 0)
  .delete
    -moz-appearance: none
    -webkit-appearance: none
    background: rgba(51,51,51,0.2)
    cursor: pointer
    display: inline-block
    height: 24px
    position: relative
    vertical-align: top
    width: 24px
    float: right
    &amp;:before,
    &amp;:after
      background: #fff
      content: &quot;&quot;
      display: block
      height: 2px
      left: 50%
      margin-left: -25%
      margin-top: -1px
      position: absolute
      top: 50%
      width: 50%
    &amp;:before
      transform: rotate(45deg)
    &amp;:after
      transform: rotate(-45deg)
    &amp;:hover
      background: rgba(51,51,51,0.5)
  .notification
    width: 100%
    line-height: 2
    z-index: 3
    position: fixed
    top: 0
    left: 0
    .content
      padding: .75rem 2rem
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"notification fixed"</span>
  <span class="hljs-attr">v-if</span>=<span class="hljs-string">"show"</span>
  <span class="hljs-attr">transition</span>=<span class="hljs-string">"slide"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"delete"</span>
    @<span class="hljs-attr">click</span>=<span class="hljs-string">"close()"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
      </span><span class="hljs-template-variable">"{{" options.content "}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">options</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> {}
      }
    },
    <span class="hljs-attr">show</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    close () {
      <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">this</span>.options = {}
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"sass"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.slide-transition</span>
    <span class="hljs-selector-tag">transition</span>: <span class="hljs-selector-tag">all</span> <span class="hljs-selector-class">.3s</span> <span class="hljs-selector-tag">ease</span>
    <span class="hljs-selector-tag">transform</span>: <span class="hljs-selector-tag">translate3d</span>(0, 0, 0)
  <span class="hljs-selector-class">.slide-enter</span>,
  <span class="hljs-selector-class">.slide-leave</span>
    <span class="hljs-selector-tag">transform</span>: <span class="hljs-selector-tag">translate3d</span>(0, <span class="hljs-selector-tag">-100</span>%, 0)
  <span class="hljs-selector-class">.delete</span>
    <span class="hljs-selector-tag">-moz-appearance</span>: <span class="hljs-selector-tag">none</span>
    <span class="hljs-selector-tag">-webkit-appearance</span>: <span class="hljs-selector-tag">none</span>
    <span class="hljs-selector-tag">background</span>: <span class="hljs-selector-tag">rgba</span>(51,51,51,0<span class="hljs-selector-class">.2</span>)
    <span class="hljs-selector-tag">cursor</span>: <span class="hljs-selector-tag">pointer</span>
    <span class="hljs-selector-tag">display</span>: <span class="hljs-selector-tag">inline-block</span>
    <span class="hljs-selector-tag">height</span>: 24<span class="hljs-selector-tag">px</span>
    <span class="hljs-selector-tag">position</span>: <span class="hljs-selector-tag">relative</span>
    <span class="hljs-selector-tag">vertical-align</span>: <span class="hljs-selector-tag">top</span>
    <span class="hljs-selector-tag">width</span>: 24<span class="hljs-selector-tag">px</span>
    <span class="hljs-selector-tag">float</span>: <span class="hljs-selector-tag">right</span>
    &amp;<span class="hljs-selector-pseudo">:before</span>,
    &amp;<span class="hljs-selector-pseudo">:after</span>
      <span class="hljs-selector-tag">background</span>: <span class="hljs-selector-id">#fff</span>
      <span class="hljs-selector-tag">content</span>: ""
      <span class="hljs-selector-tag">display</span>: <span class="hljs-selector-tag">block</span>
      <span class="hljs-selector-tag">height</span>: 2<span class="hljs-selector-tag">px</span>
      <span class="hljs-selector-tag">left</span>: 50%
      <span class="hljs-selector-tag">margin-left</span>: <span class="hljs-selector-tag">-25</span>%
      <span class="hljs-selector-tag">margin-top</span>: <span class="hljs-selector-tag">-1px</span>
      <span class="hljs-selector-tag">position</span>: <span class="hljs-selector-tag">absolute</span>
      <span class="hljs-selector-tag">top</span>: 50%
      <span class="hljs-selector-tag">width</span>: 50%
    &amp;<span class="hljs-selector-pseudo">:before</span>
      <span class="hljs-selector-tag">transform</span>: <span class="hljs-selector-tag">rotate</span>(45<span class="hljs-selector-tag">deg</span>)
    &amp;<span class="hljs-selector-pseudo">:after</span>
      <span class="hljs-selector-tag">transform</span>: <span class="hljs-selector-tag">rotate</span>(<span class="hljs-selector-tag">-45deg</span>)
    &amp;<span class="hljs-selector-pseudo">:hover</span>
      <span class="hljs-selector-tag">background</span>: <span class="hljs-selector-tag">rgba</span>(51,51,51,0<span class="hljs-selector-class">.5</span>)
  <span class="hljs-selector-class">.notification</span>
    <span class="hljs-selector-tag">width</span>: 100%
    <span class="hljs-selector-tag">line-height</span>: 2
    <span class="hljs-selector-tag">z-index</span>: 3
    <span class="hljs-selector-tag">position</span>: <span class="hljs-selector-tag">fixed</span>
    <span class="hljs-selector-tag">top</span>: 0
    <span class="hljs-selector-tag">left</span>: 0
    <span class="hljs-selector-class">.content</span>
      <span class="hljs-selector-tag">padding</span>: <span class="hljs-selector-class">.75rem</span> 2<span class="hljs-selector-tag">rem</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>思路很简单，props传递两个数据，show用于控制显示，options传入包括内容在内的自定义内容。为了让提示的显示更加自然，添加了一个滑动进入和离开的transition。</p>
<p>注意：这里的关闭按钮是通过css实现的，如果在你的项目中有对应的icon，可以将其替换掉。</p>
<p>在此处，也可以使用slot来进行内容的传递，但考虑到之后还有别的参数需要传递至组件内，一次用一个统一的对象options进行传递。</p>
<h3 id="articleHeader4">自定义样式</h3>
<p>通常提示的内容种类很多，有的是成功提示，有的是警告，有的则是报错。因此我们需要定义不同的样式以表达不同的内容。<br>方法很简单，在options中传入背景色和文字颜色两个参数，如果组件中检测到了传入的样式参数，就用其替换默认样式。</p>
<p>Vue.js在处理动态样式时非常灵活，为了让代码更清晰，我没有选择将动态样式内联，而是单独使用一个计算属性setStyle进行设定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
  setStyle () {
    return {
      color: this.options.textColor || '#fff',
      background: this.options.backgroundColor || '#21e7b6'
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>computed: {
  setStyle () {
    <span class="hljs-keyword">return</span> {
      color: <span class="hljs-keyword">this</span>.options.textColor || <span class="hljs-string">'#fff'</span>,
      background: <span class="hljs-keyword">this</span>.options.backgroundColor || <span class="hljs-string">'#21e7b6'</span>
    }
  }
}</code></pre>
<p>这样一来，只要在options中一并传入textColor和backgroundColor两个属性，就可以轻松自定义提示样式了。</p>
<h3 id="articleHeader5">自动关闭</h3>
<p>很多时候，我们希望提示在一定时间之后可以自动关闭，因此组件也需要扩展出一个自动关闭的模式。同样的，在“数据驱动”的思想下，我们应该提供一个数据，用来表明这个提示是否自动关闭。</p>
<p>options中的autoClose属性就是这个作用。同样的，自动关闭的延迟时间显然也要能够自定义，因此还一同添加了showTime这一属性。</p>
<p>自动关闭本身不太复杂，我们只需要使用setTimeout，定义一个计时器即可。</p>
<p>首先是监听提示组件的显示。</p>
<p>在这里，我通过watch监听options的变化来处罚计时器。由于我们已经定义了一个close方法用于关闭计时器，并且在关闭时重置了show和options的值，所以在options变化时，只需要判断options中的autoClose是否为true，就能知道是否需要启动计时器了。这里单独使用一个countdown方法来处理定时器相关的操作。</p>
<p>新增代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
  return {
    timers: []
  } 
},
methods: {
  countdown () {
    if (this.options.autoClose) {
      const t = setTimeout(() => {
        this.close()
      }, this.options.showTime || 3000)
      this.timers.push(t)
    }
  }
},
watch: {
  options () {
    this.timers.forEach((timer) => {
      window.clearTimeout(timer)
    })
    this.timers = []
    this.countdown()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span> () {
  <span class="hljs-keyword">return</span> {
    timers: []
  } 
},
methods: {
  countdown () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.options.autoClose) {
      const t = setTimeout(() =&gt; {
        <span class="hljs-keyword">this</span>.close()
      }, <span class="hljs-keyword">this</span>.options.showTime || <span class="hljs-number">3000</span>)
      <span class="hljs-keyword">this</span>.timers.push(t)
    }
  }
},
watch: {
  options () {
    <span class="hljs-keyword">this</span>.timers.forEach((timer) =&gt; {
      window.clearTimeout(timer)
    })
    <span class="hljs-keyword">this</span>.timers = []
    <span class="hljs-keyword">this</span>.countdown()
  }
}</code></pre>
<p>细心地你肯定会发现，这段代码中，有一些奇怪的处理。我们定义了一个空数组timers，并且每次开始一个计时器的时候，就把计时器存入数组中，而每次options变化时，我们也从timers中遍历所有计时器并取消，之后清空timers。</p>
<p><strong>这个做法，主要是为了避免一个计时器还没有结束时，又开始一个新的提示所引发的提示被提前关闭的清空。</strong>举个例子，如果没有这样的处理，那么先发出一个自动关闭的提示，在其没自动关闭之前，就再发出一个新的提示。那么第一个提示的定时器依然会错误的关闭新提示。</p>
<p>这样的问题主要是由于我们所有的计时器都是在同一个组件中，本质上都是同一个提示，因此需要清除计时器，避免冲突。许多组件库中类似的功能组件，是采用每一条提示就新生成一个提示组件的方式来实现的。但是那样在多个提示连续出现时，就会出现堆叠在一起，又各自离开的情况。</p>
<p>之前的版本中，我的提示组件也采用了类似的设计方式，但是在最近的一个项目中，需要实现半透明的提示组件，就出现了堆叠后看不清提示文字的现象，才使用了现在新的模式。</p>
<h3 id="articleHeader6">进一步扩展</h3>
<p>紧接着，我拓展了一个自动关闭模式下的倒计时条功能。思路上没有使用Vue.js的transition系统，而是采用了Css3本身的动画系统。在一个自动关闭的提示被初始化时，为计时条添加一个样式，效果是向X轴负方向移动100%，transition时间则通过计算属性对应设定。具体实现可以参考源代码，这里不多做赘述。</p>
<h3 id="articleHeader7">增强灵活性</h3>
<p>最后则是让提示组件更灵活。有的时候，我们想展示的可能是可以自定义样式的文本、亦或是一个超链接甚至更多。而Vue.js实现起来不要太简单。我们只需要将组件中用于渲染的<code>"{{" options.content "}}"</code>变为<code>"{{"{ options.content "}}"}</code>即可，对于3重花括号的模板，Vue.js会将其中的HTML标签按照正常内容渲染。</p>
<p>如此一来，我们就可以将任何HTML内容放入提示中了。<strong>当然一定要注意避免将用户输入的内容渲染到3重花括号的模板中，避免XSS攻击。</strong></p>
<h2 id="articleHeader8">结合vuex</h2>
<p>很多时候，我们会把提示组件引入到App.vue这个根组件中，但是发出提示的可能是组件树中的任何一个组件。如果不想代码中遍布各种dispatch和broadcast，那么引入vuex来进行管理是个很好的方案。</p>
<p>大致的思路如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// store.js
const state = {
  show: false,
  options: {
    autoClose: false,
    content: 'notice content'
  }
}

const mutations = {
  NEW_NOTICE (state, options) {
    state.show = true
    state.options = options
  },
  CLOSE_NOTICE (state) {
    state.show = false
    state.options = {}
  }
}

// actions.js

export const newNotice = ({dispatch}, options) => {
  dispatch('NEW_NOTICE', options)
}
export const closeNotice = ({dispatch}) => {
  dispatch('CLOSE_NOTICE')
}

// Notification.vue

vuex: {
  getters: {
    show: state => state.show
    options: state => state.options
  },
  actions: {
    close: closeNotice
  }
}

// 任意调用notice的组件

vuex: {
  actions: {
    notice: newNotice
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// store.js
const <span class="hljs-keyword">state</span> = {
  show: false,
  options: {
    autoClose: false,
    content: 'notice content'
  }
}

const mutations = {
  NEW_NOTICE (<span class="hljs-keyword">state</span>, options) {
    <span class="hljs-keyword">state</span>.show = true
    <span class="hljs-keyword">state</span>.options = options
  },
  CLOSE_NOTICE (<span class="hljs-keyword">state</span>) {
    <span class="hljs-keyword">state</span>.show = false
    <span class="hljs-keyword">state</span>.options = {}
  }
}

// actions.js

export const newNotice = ({dispatch}, options) =&gt; {
  dispatch('NEW_NOTICE', options)
}
export const closeNotice = ({dispatch}) =&gt; {
  dispatch('CLOSE_NOTICE')
}

// Notification.vue

vuex: {
  getters: {
    show: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.show
    options: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.options
  },
  actions: {
    close: closeNotice
  }
}

// 任意调用notice的组件

vuex: {
  actions: {
    notice: newNotice
  }
}</code></pre>
<p>引入vuex后，按上述代码进行配置，就可以在任意一处组件中，使用<code>this.notice({options})</code>传递数据。不过由于vuex的单项数据流动特性，所有对state数据的操作都必须经过actions调用mutations实现，包括提示组件中的close方法也要替换成actions中的closeNotice方法。</p>
<h2 id="articleHeader9">综述</h2>
<p>通过这个提示组件，我们更熟练的掌握了Vue.js的组件系统、数据传递、计算属性、transition动画等特性。另外此组件已经可以直接用于生产环境中，欢迎star、fork、pr。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js 实践（3）：实现一个漂亮、灵活、可复用的提示组件

## 原文链接
[https://segmentfault.com/a/1190000005932457](https://segmentfault.com/a/1190000005932457)


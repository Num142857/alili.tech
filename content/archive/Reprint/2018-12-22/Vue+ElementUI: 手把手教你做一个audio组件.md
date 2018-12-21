---
title: 'Vue+ElementUI: 手把手教你做一个audio组件' 
date: 2018-12-22 2:30:10
hidden: true
slug: vpdnw2lqoa
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000016177005?w=619&amp;h=343" src="https://static.alili.tech/img/remote/1460000016177005?w=619&amp;h=343" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">目的</h1>
<ul>
<li>本项目的目的是教你如何实现一个简单的音乐播放器（这并不难）</li>
<li>本项目并不是一个可以用于生产环境的element播放器，所以并没有考虑太多的兼容性问题</li>
<li>本项目不是ElementUI的一个音频插件，只是一个教程，不过你可以自行扩展实现</li>
<li>本项目只是为了学习audio相关事件以及API</li>
</ul>
<p>本项目的音频文件是位于<code>static/falling-star.mp3</code>，歌曲名为：星球坠落Live 艾热、李佳隆</p>
<ul>
<li>
<code>查看在线demo</code>: <a href="https://wangduanduan.github.io/element-audio/" rel="nofollow noreferrer" target="_blank">https://wangduanduan.github.i...</a>
</li>
<li>
<code>项目地址</code>: <a href="https://github.com/wangduanduan/element-audio" rel="nofollow noreferrer" target="_blank">https://github.com/wangduandu...</a>
</li>
</ul>
<h1 id="articleHeader1">运行</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd element-aduio &amp;&amp; yarn &amp;&amp; yarn run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">cd element-aduio &amp;&amp; yarn &amp;&amp; yarn <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<h1 id="articleHeader2">文档</h1>
<h1 id="articleHeader3">1. 简介</h1>
<h2 id="articleHeader4">1.1 相关技术</h2>
<ul>
<li><a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue</a></li>
<li><a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">Vue-cli</a></li>
<li><a href="http://element-cn.eleme.io/#/zh-CN" rel="nofollow noreferrer" target="_blank">ElementUI</a></li>
<li>
<a href="https://yarnpkg.com/lang/zh-hans/" rel="nofollow noreferrer" target="_blank">yarn</a> (之前我用npm, 并使用cnpm的源，但是用了yarn之后，我发现它比cnpm的速度还快，功能更好，我就毫不犹豫选择yarn了)</li>
<li><a href="https://segmentfault.com/a/1190000009769804">Audio相关API和事件</a></li>
</ul>
<h2 id="articleHeader5">1.2 从本教程你会学到什么？</h2>
<ul>
<li><code>Vue单文件组件开发知识</code></li>
<li><code>Element UI基本用法</code></li>
<li><code>Audio原生API及Audio相关事件</code></li>
<li><code>音频播放器的基本原理</code></li>
<li><code>音频的播放暂停控制</code></li>
<li><code>音频显示时间</code></li>
<li><code>音频进度条控制与跳转</code></li>
<li><code>音频音量控制</code></li>
<li><code>音频播放速度控制</code></li>
<li><code>音频静音控制</code></li>
<li><code>音频下载控制</code></li>
<li><code>个性化配置与排他性播放</code></li>
<li><code>一点点ES6语法</code></li>
</ul>
<h1 id="articleHeader6">1.3 学前准备</h1>
<p>基本上不需要什么准备，但是如果你能先看一下Aduio相关API和事件将会更好</p>
<ul>
<li><a href="https://segmentfault.com/a/1190000009769804" target="_blank">Audio: 如果你愿意一层一层剥开我的心</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Using_HTML5_audio_and_video" rel="nofollow noreferrer" target="_blank">使用 HTML5 音频和视频</a></li>
</ul>
<h1 id="articleHeader7">1.4 在线demo</h1>
<p><code>没有在线demo的教程都是耍流氓</code></p>
<ul>
<li><a href="https://wangduanduan.github.io/element-audio/" rel="nofollow noreferrer" target="_blank">查看在线demon</a></li>
<li><a href="https://github.com/wangduanduan/element-audio" rel="nofollow noreferrer" target="_blank">项目地址</a></li>
</ul>
<h1 id="articleHeader8">2 开始编码</h1>
<h1 id="articleHeader9">2.1 项目初始化</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  test vue init webpack element-audio

  A newer version of vue-cli is available.

  latest:    2.9.2
  installed: 2.9.1

? Project name element-audio
? Project description A Vue.js project
? Author wangdd <wangdd@xxxxxx.com>
? Vue build standalone
? Install vue-router? No
? Use ESLint to lint your code? No
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) npm

➜  test cd element-audio 
➜  element-audio npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>➜  <span class="hljs-keyword">test</span> vue init webpack element-audio

  A newer <span class="hljs-keyword">version</span> of vue-<span class="hljs-keyword">cli</span> is available.

  latest:    2.9.2
  installed: 2.9.1

? Project name element-audio
? Project description A Vue.js project
? Author wangdd &lt;wangdd@xxxxxx.com&gt;
? Vue build standalone
? Install vue-router? <span class="hljs-keyword">No</span>
? <span class="hljs-keyword">Use</span> ESLint to lint your code? <span class="hljs-keyword">No</span>
? <span class="hljs-keyword">Set</span> up unit tests <span class="hljs-keyword">No</span>
? Setup e2e tests with Nightwatch? <span class="hljs-keyword">No</span>
? Should we <span class="hljs-keyword">run</span> `npm install` <span class="hljs-keyword">for</span> you after the project has been created? (recommended) npm

➜  <span class="hljs-keyword">test</span> <span class="hljs-keyword">cd</span> element-audio 
➜  element-audio npm <span class="hljs-keyword">run</span> dev</code></pre>
<p>浏览器打开 <code>http://localhost:8080/</code>, 看到如下界面，说明项目初始化成功</p>
<p><code>图片1</code></p>
<h2 id="articleHeader10">2.2 安装ElementUI并插入audio标签</h2>
<h3 id="articleHeader11">2.2.1 <code>安装ElementUI</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add element-ui // or npm i element-ui -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-built_in">add</span> <span class="hljs-keyword">element</span>-ui<span class="hljs-comment"> // or npm i element-ui -S</span></code></pre>
<h3 id="articleHeader12">2.2.2 在<code>src/main.js</code>中引入Element UI</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// filename: src/main.js
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// filename: src/main.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-chalk/index.css'</span>

Vue.config.productionTip = <span class="hljs-keyword">false</span>

Vue.use(ElementUI)

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})
</code></pre>
<h3 id="articleHeader13">2.2.3 创建<code>src/components/VueAudio.vue</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// filename: src/components/VueAudio.vue
<template>
  <div>
    <audio src=&quot;http://devtest.qiniudn.com/secret base~.mp3&quot; controls=&quot;controls&quot;></audio>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>

</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// filename: src/components/VueAudio.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">audio</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://devtest.qiniudn.com/secret base~.mp3"</span> <span class="hljs-attr">controls</span>=<span class="hljs-string">"controls"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">audio</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {}
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h3 id="articleHeader14">2.2.4 修改<code>src/App.vue</code>, 并引入<code>VueAudio.vue</code>组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// filename: src/App.vue
<template>
  <div id=&quot;app&quot;>
    <VueAudio />
  </div>
</template>

<script>
import VueAudio from './components/VueAudio'

export default {
  name: 'app',
  components: {
    VueAudio
  },
  data () {
    return {}
  }
}
</script>

<style>

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// filename: src/App.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">VueAudio</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> VueAudio <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/VueAudio'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>: {
    VueAudio
  },
  data () {
    <span class="hljs-keyword">return</span> {}
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>打开：<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080/，你应该能看到如下效果，说明引入成功，你可以点击播放按钮看看，音频是否能够播放<br><code>图2</code></p>
<h2 id="articleHeader15">2.3 音频的播放暂停控制</h2>
<p>我们需要用一个按钮去控制音频的播放与暂停，这里调用了audio的两个api,以及两个事件</p>
<ul>
<li>audio.play()</li>
<li>audio.pause()</li>
<li>play事件</li>
<li>pause事件</li>
</ul>
<p>修改<code>src/components/VueAudio.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// filename: src/components/VueAudio.vue
<template>
  <div>
    <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
    <audio ref=&quot;audio&quot; 
    @pause=&quot;onPause&quot;
    @play=&quot;onPlay&quot;
    src=&quot;http://devtest.qiniudn.com/secret base~.mp3&quot; controls=&quot;controls&quot;></audio>

    <!-- 音频播放控件 -->
    <div>
      <el-button type=&quot;text&quot; @click=&quot;startPlayOrPause&quot;>"{{"audio.playing | transPlayPause"}}"</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false
      }
    }
  },
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause () {
      return this.audio.playing ? this.pause() : this.play()
    },
    // 播放音频
    play () {
      this.$refs.audio.play()
    },
    // 暂停音频
    pause () {
      this.$refs.audio.pause()
    },
    // 当音频播放
    onPlay () {
      this.audio.playing = true
    },
    // 当音频暂停
    onPause () {
      this.audio.playing = false
    }
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? '暂停' : '播放'
    }
  }
}
</script>

<style>

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">// filename: src/components/VueAudio.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">audio</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"audio"</span> 
    @<span class="hljs-attr">pause</span>=<span class="hljs-string">"onPause"</span>
    @<span class="hljs-attr">play</span>=<span class="hljs-string">"onPlay"</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">"http://devtest.qiniudn.com/secret base~.mp3"</span> <span class="hljs-attr">controls</span>=<span class="hljs-string">"controls"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">audio</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- 音频播放控件 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"startPlayOrPause"</span>&gt;</span></span><span class="hljs-template-variable">"{{"audio.playing | transPlayPause"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">audio</span>: {
        <span class="hljs-comment">// 该字段是音频是否处于播放状态的属性</span>
        playing: <span class="hljs-literal">false</span>
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">// 控制音频的播放与暂停</span>
    startPlayOrPause () {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.audio.playing ? <span class="hljs-keyword">this</span>.pause() : <span class="hljs-keyword">this</span>.play()
    },
    <span class="hljs-comment">// 播放音频</span>
    play () {
      <span class="hljs-keyword">this</span>.$refs.audio.play()
    },
    <span class="hljs-comment">// 暂停音频</span>
    pause () {
      <span class="hljs-keyword">this</span>.$refs.audio.pause()
    },
    <span class="hljs-comment">// 当音频播放</span>
    onPlay () {
      <span class="hljs-keyword">this</span>.audio.playing = <span class="hljs-literal">true</span>
    },
    <span class="hljs-comment">// 当音频暂停</span>
    onPause () {
      <span class="hljs-keyword">this</span>.audio.playing = <span class="hljs-literal">false</span>
    }
  },
  <span class="hljs-attr">filters</span>: {
    <span class="hljs-comment">// 使用组件过滤器来动态改变按钮的显示</span>
    transPlayPause(value) {
      <span class="hljs-keyword">return</span> value ? <span class="hljs-string">'暂停'</span> : <span class="hljs-string">'播放'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p><code>图3 音频播放与暂停</code></p>
<h2 id="articleHeader16">2.4 音频显示时间</h2>
<p>音频的时间显示主要有两部分，音频的总时长和当前播放时间。可以从两个事件中获取</p>
<ul>
<li>
<code>loadedmetadata</code>:代表音频的元数据已经被加载完成，可以从中获取音频总时长</li>
<li>
<code>timeupdate</code>: 当前播放位置作为正常播放的一部分而改变，或者以特别有趣的方式，例如不连续地改变，可以从该事件中获取音频的当前播放时间，<code>该事件在播放过程中会不断被触发</code>
</li>
</ul>
<p><code>要点代码</code>：整数格式化成时:分:秒</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function realFormatSecond(second) {
  var secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '0:00:00'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>function realFormatSecond(<span class="hljs-built_in">second</span>) {
  var secondType = typeof <span class="hljs-built_in">second</span>

  <span class="hljs-keyword">if</span> (secondType === <span class="hljs-string">'number'</span> || secondType === <span class="hljs-string">'string'</span>) {
    <span class="hljs-built_in">second</span> = parseInt(<span class="hljs-built_in">second</span>)

    var hours = Math.<span class="hljs-built_in">floor</span>(<span class="hljs-built_in">second</span> / <span class="hljs-number">3600</span>)
    <span class="hljs-built_in">second</span> = <span class="hljs-built_in">second</span> - hours * <span class="hljs-number">3600</span>
    var mimute = Math.<span class="hljs-built_in">floor</span>(<span class="hljs-built_in">second</span> / <span class="hljs-number">60</span>)
    <span class="hljs-built_in">second</span> = <span class="hljs-built_in">second</span> - mimute * <span class="hljs-number">60</span>

    <span class="hljs-keyword">return</span> hours + <span class="hljs-string">':'</span> + (<span class="hljs-string">'0'</span> + mimute).slice(<span class="hljs-number">-2</span>) + <span class="hljs-string">':'</span> + (<span class="hljs-string">'0'</span> + <span class="hljs-built_in">second</span>).slice(<span class="hljs-number">-2</span>)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'0:00:00'</span>
  }
}</code></pre>
<p><code>要点代码</code>： 两个事件的处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
onTimeupdate(res) {
      console.log('timeupdate')
      console.log(res)
      this.audio.currentTime = res.target.currentTime
    },
// 当加载语音流元数据完成后，会触发该事件的回调函数
// 语音元数据主要是语音的长度之类的数据
onLoadedmetadata(res) {
  console.log('loadedmetadata')
  console.log(res)
  this.audio.maxTime = parseInt(res.target.duration)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间</span>
<span class="hljs-function"><span class="hljs-title">onTimeupdate</span><span class="hljs-params">(res)</span></span> {
      console.log(<span class="hljs-string">'timeupdate'</span>)
      console.log(res)
      this<span class="hljs-selector-class">.audio</span><span class="hljs-selector-class">.currentTime</span> = res<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.currentTime</span>
    },
<span class="hljs-comment">// 当加载语音流元数据完成后，会触发该事件的回调函数</span>
<span class="hljs-comment">// 语音元数据主要是语音的长度之类的数据</span>
<span class="hljs-function"><span class="hljs-title">onLoadedmetadata</span><span class="hljs-params">(res)</span></span> {
  console.log(<span class="hljs-string">'loadedmetadata'</span>)
  console.log(res)
  this<span class="hljs-selector-class">.audio</span><span class="hljs-selector-class">.maxTime</span> = parseInt(res<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.duration</span>)
}</code></pre>
<p><code>完整代码</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
    <audio ref=&quot;audio&quot; 
    @pause=&quot;onPause&quot;
    @play=&quot;onPlay&quot;
    @timeupdate=&quot;onTimeupdate&quot; 
    @loadedmetadata=&quot;onLoadedmetadata&quot;
    src=&quot;http://devtest.qiniudn.com/secret base~.mp3&quot; controls=&quot;controls&quot;></audio>

    <!-- 音频播放控件 -->
    <div>
      <el-button type=&quot;text&quot; @click=&quot;startPlayOrPause&quot;>"{{"audio.playing | transPlayPause"}}"</el-button>

      <el-tag type=&quot;info&quot;>"{{" audio.currentTime | formatSecond"}}"</el-tag>

      <el-tag type=&quot;info&quot;>"{{" audio.maxTime | formatSecond"}}"</el-tag>
    </div>
  </div>
</template>

<script>

// 将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  var secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '0:00:00'
  }
}

export default {
  data () {
    return {
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0
      }
    }
  },
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause () {
      return this.audio.playing ? this.pause() : this.play()
    },
    // 播放音频
    play () {
      this.$refs.audio.play()
    },
    // 暂停音频
    pause () {
      this.$refs.audio.pause()
    },
    // 当音频播放
    onPlay () {
      this.audio.playing = true
    },
    // 当音频暂停
    onPause () {
      this.audio.playing = false
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      console.log('timeupdate')
      console.log(res)
      this.audio.currentTime = res.target.currentTime
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      console.log('loadedmetadata')
      console.log(res)
      this.audio.maxTime = parseInt(res.target.duration)
    }
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? '暂停' : '播放'
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second)
    }
  }
}
</script>

<style>

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">audio</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"audio"</span> 
    @<span class="hljs-attr">pause</span>=<span class="hljs-string">"onPause"</span>
    @<span class="hljs-attr">play</span>=<span class="hljs-string">"onPlay"</span>
    @<span class="hljs-attr">timeupdate</span>=<span class="hljs-string">"onTimeupdate"</span> 
    @<span class="hljs-attr">loadedmetadata</span>=<span class="hljs-string">"onLoadedmetadata"</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">"http://devtest.qiniudn.com/secret base~.mp3"</span> <span class="hljs-attr">controls</span>=<span class="hljs-string">"controls"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">audio</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- 音频播放控件 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"startPlayOrPause"</span>&gt;</span></span><span class="hljs-template-variable">"{{"audio.playing | transPlayPause"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">el-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span>&gt;</span></span><span class="hljs-template-variable">"{{" audio.currentTime | formatSecond"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">el-tag</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">el-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span>&gt;</span></span><span class="hljs-template-variable">"{{" audio.maxTime | formatSecond"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">el-tag</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-comment">// 将整数转换成 时：分：秒的格式</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">realFormatSecond</span>(<span class="hljs-params">second</span>) </span>{
  <span class="hljs-keyword">var</span> secondType = <span class="hljs-keyword">typeof</span> second

  <span class="hljs-keyword">if</span> (secondType === <span class="hljs-string">'number'</span> || secondType === <span class="hljs-string">'string'</span>) {
    second = <span class="hljs-built_in">parseInt</span>(second)

    <span class="hljs-keyword">var</span> hours = <span class="hljs-built_in">Math</span>.floor(second / <span class="hljs-number">3600</span>)
    second = second - hours * <span class="hljs-number">3600</span>
    <span class="hljs-keyword">var</span> mimute = <span class="hljs-built_in">Math</span>.floor(second / <span class="hljs-number">60</span>)
    second = second - mimute * <span class="hljs-number">60</span>

    <span class="hljs-keyword">return</span> hours + <span class="hljs-string">':'</span> + (<span class="hljs-string">'0'</span> + mimute).slice(<span class="hljs-number">-2</span>) + <span class="hljs-string">':'</span> + (<span class="hljs-string">'0'</span> + second).slice(<span class="hljs-number">-2</span>)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'0:00:00'</span>
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">audio</span>: {
        <span class="hljs-comment">// 该字段是音频是否处于播放状态的属性</span>
        playing: <span class="hljs-literal">false</span>,
        <span class="hljs-comment">// 音频当前播放时长</span>
        currentTime: <span class="hljs-number">0</span>,
        <span class="hljs-comment">// 音频最大播放时长</span>
        maxTime: <span class="hljs-number">0</span>
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">// 控制音频的播放与暂停</span>
    startPlayOrPause () {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.audio.playing ? <span class="hljs-keyword">this</span>.pause() : <span class="hljs-keyword">this</span>.play()
    },
    <span class="hljs-comment">// 播放音频</span>
    play () {
      <span class="hljs-keyword">this</span>.$refs.audio.play()
    },
    <span class="hljs-comment">// 暂停音频</span>
    pause () {
      <span class="hljs-keyword">this</span>.$refs.audio.pause()
    },
    <span class="hljs-comment">// 当音频播放</span>
    onPlay () {
      <span class="hljs-keyword">this</span>.audio.playing = <span class="hljs-literal">true</span>
    },
    <span class="hljs-comment">// 当音频暂停</span>
    onPause () {
      <span class="hljs-keyword">this</span>.audio.playing = <span class="hljs-literal">false</span>
    },
    <span class="hljs-comment">// 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间</span>
    onTimeupdate(res) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timeupdate'</span>)
      <span class="hljs-built_in">console</span>.log(res)
      <span class="hljs-keyword">this</span>.audio.currentTime = res.target.currentTime
    },
    <span class="hljs-comment">// 当加载语音流元数据完成后，会触发该事件的回调函数</span>
    <span class="hljs-comment">// 语音元数据主要是语音的长度之类的数据</span>
    onLoadedmetadata(res) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'loadedmetadata'</span>)
      <span class="hljs-built_in">console</span>.log(res)
      <span class="hljs-keyword">this</span>.audio.maxTime = <span class="hljs-built_in">parseInt</span>(res.target.duration)
    }
  },
  <span class="hljs-attr">filters</span>: {
    <span class="hljs-comment">// 使用组件过滤器来动态改变按钮的显示</span>
    transPlayPause(value) {
      <span class="hljs-keyword">return</span> value ? <span class="hljs-string">'暂停'</span> : <span class="hljs-string">'播放'</span>
    },
    <span class="hljs-comment">// 将整数转化成时分秒</span>
    formatSecond(second = <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">return</span> realFormatSecond(second)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>打开浏览器可以看到，当音频播放时，当前时间也在改变。<br><code>图4</code></p>
<h2 id="articleHeader17">2.5 音频进度条控制</h2>
<p>进度条主要有两个控制，改变进度的原理是：改变<code>audio.currentTime</code>属性值</p>
<ul>
<li>音频播放后，当前时间改变，进度条就要随之改变</li>
<li>拖动进度条，可以改变音频的当前时间</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 进度条ui
<el-slider v-model=&quot;sliderTime&quot; :format-tooltip=&quot;formatProcessToolTip&quot; @change=&quot;changeCurrentTime&quot; class=&quot;slider&quot;></el-slider>

// 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
changeCurrentTime(index) {
  this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
},
// 当音频当前时间改变后，进度条也要改变
onTimeupdate(res) {
  console.log('timeupdate')
  console.log(res)
  this.audio.currentTime = res.target.currentTime
  this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
},

// 进度条格式化toolTip
formatProcessToolTip(index = 0) {
  index = parseInt(this.audio.maxTime / 100 * index)
  return '进度条: ' + realFormatSecond(index)
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 进度条ui</span>
&lt;el-slider v-model=<span class="hljs-string">"sliderTime"</span> :format-tooltip=<span class="hljs-string">"formatProcessToolTip"</span> <span class="hljs-meta">@change</span>=<span class="hljs-string">"changeCurrentTime"</span> <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">slider</span>"&gt;&lt;<span class="hljs-type">/el-slider</span>&gt;</span>

<span class="hljs-comment">// 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间</span>
changeCurrentTime(index) {
  <span class="hljs-keyword">this</span>.$refs.audio.currentTime = parseInt(index / <span class="hljs-number">100</span> * <span class="hljs-keyword">this</span>.audio.maxTime)
},
<span class="hljs-comment">// 当音频当前时间改变后，进度条也要改变</span>
onTimeupdate(res) {
  console.log(<span class="hljs-string">'timeupdate'</span>)
  console.log(res)
  <span class="hljs-keyword">this</span>.audio.currentTime = res.target.currentTime
  <span class="hljs-keyword">this</span>.sliderTime = parseInt(<span class="hljs-keyword">this</span>.audio.currentTime / <span class="hljs-keyword">this</span>.audio.maxTime * <span class="hljs-number">100</span>)
},

<span class="hljs-comment">// 进度条格式化toolTip</span>
formatProcessToolTip(index = <span class="hljs-number">0</span>) {
  index = parseInt(<span class="hljs-keyword">this</span>.audio.maxTime / <span class="hljs-number">100</span> * index)
  <span class="hljs-keyword">return</span> <span class="hljs-string">'进度条: '</span> + realFormatSecond(index)
},</code></pre>
<h2 id="articleHeader18">2.6 音频音量控制</h2>
<p>音频的音量控制和进度控制差不多，也是通过拖动滑动条，去修改<code>aduio.volume</code>属性值，此处不再啰嗦</p>
<h2 id="articleHeader19">2.7 音频播放速度控制</h2>
<p>音频的音量控制和进度控制差不多，也是点击按钮，去修改<code>aduio.playbackRate</code>属性值，该属性代表音量的大小，取值范围是0 - 1，用滑动条的时候，也是需要换算一下值，此处不再啰嗦</p>
<h2 id="articleHeader20">2.8 音频静音控制</h2>
<p>静音的控制是点击按钮，去修改<code>aduio.muted</code>属性，该属性有两个值: true(静音)，false(不静音)。 注意，静音的时候，音频的进度条还是会继续往前走的。</p>
<h2 id="articleHeader21">2.9 音频下载控制</h2>
<p>音频下载是一个a链接，记得加上<code>download</code>属性，不然浏览器会在新标签打开音频，而不是下载音频</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a :href=&quot;url&quot; v-show=&quot;!controlList.noDownload&quot; target=&quot;_blank&quot; class=&quot;download&quot; download>下载</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"url"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"!controlList.noDownload"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"download"</span> <span class="hljs-attr">download</span>&gt;</span>下载<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<h2 id="articleHeader22">2.10 个性化配置</h2>
<p>音频的个性化配置有很多，大家可以自己扩展，通过父组件传递响应的值，可以做到个性化设置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" controlList: {
  // 不显示下载
  noDownload: false,
  // 不显示静音
  noMuted: false,
  // 不显示音量条
  noVolume: false,
  // 不显示进度条
  noProcess: false,
  // 只能播放一个
  onlyOnePlaying: false,
  // 不要快进按钮
  noSpeed: false
}

setControlList () {
    let controlList = this.theControlList.split(' ')
    controlList.forEach((item) => {
      if(this.controlList[item] !== undefined){
        this.controlList[item] = true
      }
    })
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> controlList: {
  <span class="hljs-comment">// 不显示下载</span>
  noDownload: <span class="hljs-literal">false</span>,
  <span class="hljs-comment">// 不显示静音</span>
  noMuted: <span class="hljs-literal">false</span>,
  <span class="hljs-comment">// 不显示音量条</span>
  noVolume: <span class="hljs-literal">false</span>,
  <span class="hljs-comment">// 不显示进度条</span>
  noProcess: <span class="hljs-literal">false</span>,
  <span class="hljs-comment">// 只能播放一个</span>
  onlyOnePlaying: <span class="hljs-literal">false</span>,
  <span class="hljs-comment">// 不要快进按钮</span>
  noSpeed: <span class="hljs-literal">false</span>
}

setControlList () {
    <span class="hljs-keyword">let</span> controlList = <span class="hljs-keyword">this</span>.theControlList.split(<span class="hljs-string">' '</span>)
    controlList.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.controlList[item] !== <span class="hljs-literal">undefined</span>){
        <span class="hljs-keyword">this</span>.controlList[item] = <span class="hljs-literal">true</span>
      }
    })
},</code></pre>
<p>例如父组件这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <div v-for=&quot;item in audios&quot; :key=&quot;item.url&quot;>
      <VueAudio :theUrl=&quot;item.url&quot; :theControlList=&quot;item.controlList&quot;/>
    </div>
  </div>
</template>

<script>
import VueAudio from './components/VueAudio'

export default {
  name: 'app',
  components: {
    VueAudio
  },
  data () {
    return {
      audios: [
        {
          url: 'http://devtest.qiniudn.com/secret base~.mp3',
          controlList: 'onlyOnePlaying'
        },
        {
          url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
          controlList: 'noDownload noMuted onlyOnePlaying'
        },{
          url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
          controlList: 'noDownload noVolume noMuted onlyOnePlaying'
        },{
          url: 'http://devtest.qiniudn.com/Preparation.mp3',
          controlList: 'noDownload noSpeed onlyOnePlaying'
        }
      ]
    }
  }
}
</script>

<style>

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in audios"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.url"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">VueAudio</span> <span class="hljs-attr">:theUrl</span>=<span class="hljs-string">"item.url"</span> <span class="hljs-attr">:theControlList</span>=<span class="hljs-string">"item.controlList"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> VueAudio <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/VueAudio'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>: {
    VueAudio
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">audios</span>: [
        {
          <span class="hljs-attr">url</span>: <span class="hljs-string">'http://devtest.qiniudn.com/secret base~.mp3'</span>,
          <span class="hljs-attr">controlList</span>: <span class="hljs-string">'onlyOnePlaying'</span>
        },
        {
          <span class="hljs-attr">url</span>: <span class="hljs-string">'http://devtest.qiniudn.com/回レ！雪月花.mp3'</span>,
          <span class="hljs-attr">controlList</span>: <span class="hljs-string">'noDownload noMuted onlyOnePlaying'</span>
        },{
          <span class="hljs-attr">url</span>: <span class="hljs-string">'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3'</span>,
          <span class="hljs-attr">controlList</span>: <span class="hljs-string">'noDownload noVolume noMuted onlyOnePlaying'</span>
        },{
          <span class="hljs-attr">url</span>: <span class="hljs-string">'http://devtest.qiniudn.com/Preparation.mp3'</span>,
          <span class="hljs-attr">controlList</span>: <span class="hljs-string">'noDownload noSpeed onlyOnePlaying'</span>
        }
      ]
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h2 id="articleHeader23">2.11 一点点ES6语法</h2>
<p>大多数时候，我们希望页面上播放一个音频时，其他音频可以暂停。<br><code>[...audios]</code>可以把一个类数组转化成数组，这个是我常用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onPlay (res) {
    console.log(res)
    this.audio.playing = true
    this.audio.loading = false
    
    if(!this.controlList.onlyOnePlaying){
      return 
    }
    
    let target = res.target
    
    let audios = document.getElementsByTagName('audio');
    // 如果设置了排他性，当前音频播放是，其他音频都要暂停
    [...audios].forEach((item) => {
      if(item !== target){
        item.pause()
      }
    })
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>onPlay (res) {
    <span class="hljs-built_in">console</span>.log(res)
    <span class="hljs-keyword">this</span>.audio.playing = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">this</span>.audio.loading = <span class="hljs-literal">false</span>
    
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.controlList.onlyOnePlaying){
      <span class="hljs-keyword">return</span> 
    }
    
    <span class="hljs-keyword">let</span> target = res.target
    
    <span class="hljs-keyword">let</span> audios = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'audio'</span>);
    <span class="hljs-comment">// 如果设置了排他性，当前音频播放是，其他音频都要暂停</span>
    [...audios].forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span>(item !== target){
        item.pause()
      }
    })
},</code></pre>
<h1 id="articleHeader24">感谢</h1>
<ul><li>如果你需要一个小型的vue音乐播放器，你可以试试<a href="https://github.com/SevenOutman/vue-aplayer" rel="nofollow noreferrer" target="_blank">vue-aplayer</a>, 该播放器不仅仅支持vue组件，非Vue的也支持，你可以看看他们的<a href="https://sevenoutman.github.io/vue-aplayer/demo" rel="nofollow noreferrer" target="_blank">demo</a>
</li></ul>
<h2 id="articleHeader25">参考文档</h2>
<ul>
<li><a href="http://www.ahonn.me/2016/05/14/use-javascript-to-achieve-simple-drag-and-drop/" rel="nofollow noreferrer" target="_blank">使用 JavaScript 实现简单的拖拽</a></li>
<li><a href="https://segmentfault.com/a/1190000009769804">audio 相关API 以及事件</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Using_HTML5_audio_and_video" rel="nofollow noreferrer" target="_blank">使用 HTML5 音频和视频</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue+ElementUI: 手把手教你做一个audio组件

## 原文链接
[https://segmentfault.com/a/1190000012453975](https://segmentfault.com/a/1190000012453975)


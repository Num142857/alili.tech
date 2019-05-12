---
title: '美团小程序框架mpvue蹲坑指南' 
date: 2018-12-07 2:30:09
hidden: true
slug: f6gf6jwv1n7
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">美团小程序框架mpvue(花名：没朋友)蹲坑指南</h3>
<blockquote>第一次接触小程序大概是17年初,当时小程序刚刚内侧,当时就被各种限制折腾的死去活来的,单向绑定,<br>没有promise,请求数限制,包大小限制,各种反人类,...反正我是感受到了满满的恶意.<br>最近接到一个工程类的小程序项目,做技术选型的时候,又把以前的东西捡起来看了看,重新熟悉了一下,<br>感觉小程序还是有在努力的,支持大部分es6语法了,还出了一个类Vue的mvvm框架wepy,还支持redux状态管理,<br>就大致建了个demo,跑了起来,赶紧虽然没有vue那么酸爽,但是还是挺ok的,至少比原生的小程序语法亲民很多.</blockquote>
<p>然后就开始用wepy搭项目,写静态页面(由于公司的开发模式是先写静态页面,<br>等待后端的同学接口出来了再绑定数据),虽然wepy用起来比原生的顺手,<br>但是还是有很多坑的,这里就不列举了.....</p>
<p>就在我们静态页面快写完的时候,某天晚上论坛的时候看到一条消息, 美团出了个小程序框架mpVue<br>（不知道为什么，每次看到这个名字，我只想到3个字，没朋友,哈哈）,<br>大致看了一下<a href="http://mpvue.com/" rel="nofollow noreferrer" target="_blank">官方的介绍</a>,主要有一下亮点:</p>
<ol>
<li><strong>跟vue一样的开发体验,包括vuex</strong></li>
<li><strong>H5代码转换编译成小程序目标代码的能力</strong></li>
</ol>
<p>也就是说,不但可以用我们熟悉的vue语法开发,还有可能直接把你的h5页面编译成小程序.<br>该项目到目前位置，开源不到20天，已经收到将近7000个star,可见天下苦秦已久。</p>
<p>建了个demo,跑了一下,感觉简直就是开发界的良心之作啊.顺便把之前写的wepy的静态页面代码复制过来看了一下,<br>发现只要改动一点点,就可以顺利从wepy切换到mpvue上来(整个项目的切换时间在半天左右).<br>说做就做,当天就切到mpvue.一直到现在项目接近尾声了,整个开发过程,真是令人愉悦.</p>
<p>Bug....我今天好像不是来给mpvue做广告的,我是来找茬的..</p>
<p>下面就盘点一下我最近用mpvue开发,遇到的一些需要需要注意的细节.(或者说跟vue不同的地方)</p>
<p><strong>一,</strong> 这个个人感觉是最大的坑,除了缺少文件会报错外,其他的代码语法错误等,<br>控制台大部分时间都是安静的(偶尔也会报一个xxx is undefined)<br>比较经常碰到的是这样 this.xxx =5 有些情况下会报错,而有些情况下则没有任何反应,<br>具体什么情况下会,什么情况下不会,我现在还没摸出规律来..</p>
<p>有一次我把</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.dataObject.map(() => { ...这里省略... })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">this</span>.dataObject.map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { ...这里省略... })
</code></pre>
<p>结果map前面的 <strong>.</strong> 不小心给露掉了,实际代码变成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.dataObjectmap(() => { ...这里省略... })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">this</span>.dataObjectmap(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { ...这里省略... })
</code></pre>
<p>结果找了半天没找到问题的原因  </p>
<p><strong>二,</strong> 这个也是比较难受的地方,就是模板的数据绑定里面,没办法在模板语法里面调用methods方法<br>(或者说没办法调用computed以外的函数),有人也许会说,那可以用computed属性,那如果我想给函数传参怎么办?<br>看下面代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <view v-for=&quot;item in costList&quot; >
    "{{"formatCost(item)"}}"
  </view>
</template>

<script>
export default {
  data(){
    return{
      costList:[]
    }
  },
  methods: {
    formatCost(item){
    return item.toFixed(2)
    },
    getData(){
    let arr = [3.255,4.1,5,15]
    this.costList = arr
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in costList"</span> &gt;</span>
    </span><span class="hljs-template-variable">"{{"formatCost(item)"}}"</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data(){
    <span class="hljs-keyword">return</span>{
      <span class="hljs-attr">costList</span>:[]
    }
  },
  <span class="hljs-attr">methods</span>: {
    formatCost(item){
    <span class="hljs-keyword">return</span> item.toFixed(<span class="hljs-number">2</span>)
    },
    getData(){
    <span class="hljs-keyword">let</span> arr = [<span class="hljs-number">3.255</span>,<span class="hljs-number">4.1</span>,<span class="hljs-number">5</span>,<span class="hljs-number">15</span>]
    <span class="hljs-keyword">this</span>.costList = arr
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>这个时候 <code>"{{"formatCost(item)"}}"</code>里面的内容,会渲染成空字符串,理由就是因为不支持函数,而且这中情况,<br>也无法使用computed属性,除非你想为每个数组元素写一个computed</p>
<p>这种情况,我的解决方案是在在获取到数据的时候,就先把数据改了.如上面的例子,我们可以在 getData方法里面这样写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [3.255,4.1,5,15]
// 遍历数组里面的元素,然后格式化一下,添加到 costList里去
arr.map(item => {
    this.costList.push = this.formatCost(item)
})


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">3.255</span>,<span class="hljs-number">4.1</span>,<span class="hljs-number">5</span>,<span class="hljs-number">15</span>]
<span class="hljs-comment">// 遍历数组里面的元素,然后格式化一下,添加到 costList里去</span>
arr.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.costList.push = <span class="hljs-keyword">this</span>.formatCost(item)
})


</code></pre>
<p><strong>三,</strong> 所有页面里面的created生命周期函数  都会在小程序加载的时候，<br>一次性执行，而不是每进入一个页面执行一次，如，我有3个页面</p>
<p>pageA</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...省略一些代码...
creatted(){
    console.log('pageA 的 created函数执行')
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-params">...</span>省略一些代码<span class="hljs-params">...</span>
creatted(){
    console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'pageA 的 created函数执行'</span>)
}
</code></pre>
<p>pageB</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...省略一些代码...
creatted(){
    console.log('pageB 的 created函数执行')
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-params">...</span>省略一些代码<span class="hljs-params">...</span>
creatted(){
    console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'pageB 的 created函数执行'</span>)
}
</code></pre>
<p>pageC</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...省略一些代码...
creatted(){
    console.log('pageC 的 created函数执行')
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-params">...</span>省略一些代码<span class="hljs-params">...</span>
creatted(){
    console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'pageC 的 created函数执行'</span>)
}
</code></pre>
<p>然后，启动小程序，不进入这3个页面，假设我现在有一个index页面，我们打开这个页面，会有一下输出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pageA 的 created函数执行
pageB 的 created函数执行
pageC 的 created函数执行
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">pageA</span> 的 created函数执行
pageB 的 created函数执行
pageC 的 created函数执行
</code></pre>
<p>这个其实很好解决，用mounted或者onLoad或者onReady代替，说到这几个函数，那就顺便提一下,<br>这里的created和mounted是vue(mpvue)的生命周期，而onLoad、onReady是小程序的生命周期，mpvue官方给的说明是：</p>
<blockquote>除了 Vue 本身的生命周期外，mpvue 还兼容了小程序生命周期，这部分生命周期钩子的来源于微信小程序的<br> Page， <strong>除特殊情况外，不建议使用小程序的生命周期钩子。</strong>
</blockquote>
<p>但是官方给的生命周期图示里面，也表明了，小程序的onLoad、onReady比created、mounted执行的早，<br>也就是说如果我们在和onLoad onReady里面去请求数据的话，会相对的减少白屏时间（这里说的白屏是指数据未渲染的界面），<br>而且官方没说明为什么不建议使用小程序的生命周期，我们也尝试了，用小程序的生命周期，没发现生命问题，<br>所以我们还是比较倾向优先使用小程序的生命周期，毕竟用户体验才是王道。</p>
<p>四、挂载在Vue.prototype上的属性，在模板语法里面是undefined，必须经过computed计算过一下才能用。<br>在用vue的时候，我喜欢把图片的服务器路径存到vue的原型里面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import config from './config'
Vue.prototype.$serverPath = config.serverPath
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>import config from <span class="hljs-string">'./config'</span>
Vue<span class="hljs-selector-class">.prototype</span>.<span class="hljs-variable">$serverPath</span> = config<span class="hljs-selector-class">.serverPath</span>
</code></pre>
<p>然后 我们在页面里面这样用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img :src=&quot;$serverPath + 'logo.png'&quot; />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">img</span> :src=<span class="hljs-string">"$serverPath + 'logo.png'"</span> /&gt;
</code></pre>
<p>这样 就可以避免在每个页面导入config文件，后期如果我们发布正式版的时候，只要在这边修改一下config配置文件就可以了<br>然额，这样写在mpvue里面，实际渲染出来的会是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<image src=&quot;undefinedlogo.png&quot; ></image>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;<span class="hljs-built_in">image</span> src=<span class="hljs-string">"undefinedlogo.png"</span> &gt;&lt;/<span class="hljs-built_in">image</span>&gt;
</code></pre>
<p>要想在每个页面里面使用，只能乖乖在每个页面里面导入，或者在computed里面返回this.$serverPath</p>
<p>五、用 v-for循环的时候，如果要给当前项指定一个索引，在vue下，为了省事，我通常喜欢这样做</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-for=&quot;item,index in list&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">v-for</span>=<span class="hljs-string">"item,index in list"</span>
</code></pre>
<p>因为多打一对括号真的是很烦人。但是在mpvue下面却不行，你必须老老实实这样写，否则会报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-for=&quot;(item,index) in list&quot;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in list"</span>

</code></pre>
<p>六、单独为每个页面的设置页面头部信息，有提供这个功能，不过文档不是很详细，几经尝试，才试出来。</p>
<p>我们的入口文件main.js（延续vue的叫法，暂且这么称呼吧，其实我觉得应该叫配置文件）里面可以这样配置，<br>官方文档大概也是这么说的</p>
<blockquote>这部分内容来源于 app 和 page 的 entry 文件，通常习惯是 main.js，你需要在你的入口文件中<br>export default { config: {} }，这才能被我们的 loader 识别为这是一个配置，需要写成 json 文件。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import App from './app';

const vueApp = new Vue(App);
vueApp.$mount();

// 这个是我们约定的额外的配置
export default {
    // 这个字段下的数据会被填充到 app.json ／ page.json
    config: {
        pages: ['static/calendar/calendar', '^pages/list/list'], // Will be filled in webpack
        window: {  // 顶部栏的统一配置
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#455A73',
            navigationBarTitleText: '美团汽车票',
            navigationBarTextStyle: '#fff'
        }
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>;

<span class="hljs-keyword">const</span> vueApp = <span class="hljs-keyword">new</span> Vue(App);
vueApp.$mount();

<span class="hljs-comment">// 这个是我们约定的额外的配置</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// 这个字段下的数据会被填充到 app.json ／ page.json</span>
    config: {
        <span class="hljs-attr">pages</span>: [<span class="hljs-string">'static/calendar/calendar'</span>, <span class="hljs-string">'^pages/list/list'</span>], <span class="hljs-comment">// Will be filled in webpack</span>
        <span class="hljs-built_in">window</span>: {  <span class="hljs-comment">// 顶部栏的统一配置</span>
            backgroundTextStyle: <span class="hljs-string">'light'</span>,
            <span class="hljs-attr">navigationBarBackgroundColor</span>: <span class="hljs-string">'#455A73'</span>,
            <span class="hljs-attr">navigationBarTitleText</span>: <span class="hljs-string">'美团汽车票'</span>,
            <span class="hljs-attr">navigationBarTextStyle</span>: <span class="hljs-string">'#fff'</span>
        }
    }
};
</code></pre>
<blockquote>同时，这个时候，我们会根据 entry 的页面数据，自动填充到 app.json 中的 pages 字段。<br>pages 字段也是可以自定义的，约定带有 ^ 符号开头的页面，会放到数组的最前面。</blockquote>
<p>我们看到，可以在config.window下面配置全局的顶部栏样式，但是如果我们想为每个页面指定一个样式呢？事实上，<br>以上方法只适合配置app.json里面的内容，如果你想要为你的每个页面都添加一种样式，那么应该这样做：<br>在页面所属的入口文件（main.js）里面添加以下内容，比如我想为 userCenter/index页面设置一个标题，<br>应该在userCenter/main.js里面加入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  config: {
    navigationBarTitleText: '个人中心',
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
  <span class="hljs-attribute">config</span>: {
    navigationBarTitleText: <span class="hljs-string">'个人中心'</span>,
  }
}
</code></pre>
<p><strong>注意</strong> 这里跟上面那个全局配置不同的是，配置内容navigationBarTitleText是config的属性，<br>而全局配置里，则是config.window的属性</p>
<p>七、组件的命名问题，有一次，我写了一个局部的组件，为什么叫局部的组件呢，因为我只在某个页面里面使用，<br>所以为了简单化，我给这个组件取了个名字叫<code>list.vue</code>,然后在父组件引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<!-- 省略其他代码 -->
    <list />
</template>
<script>
  import list from './components/list'
  export default {
    components: {list},
    // 省略其他代码
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 省略其他代码 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">list</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> list <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/list'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
    components: {list}</span><span class="xml"><span class="actionscript">,
    <span class="hljs-comment">// 省略其他代码</span>
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>组件能正常显示，样式也没问题，一切看上去都是那么的正常，然而组件里面的逻辑就是不会执行。<br>加上本文第一点提到的，不会报错，让我一顿好找啊...<br>经过排查发现，跟组件的引入名称有关，应该是跟微信的关键字同名了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<!-- 省略其他代码 -->
    <listA />
</template>
<script>
  import listA from './components/list'
  export default {
    components: {listA},
    // 省略其他代码
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 省略其他代码 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">listA</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> listA <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/list'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
    components: {listA}</span><span class="xml"><span class="actionscript">,
    <span class="hljs-comment">// 省略其他代码</span>
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>这样就能正常运行，出了list,我目前踩到的还有tabbar,搞得我现在命名的时候，看到一些疑似关键的字眼，心理都有点阴影。。<br>这个应该是微信的问题吧，总之遇到了，就一块写出来。</p>
<p>八、组件第一次加载的时候不能执行onShow里面的内容，只有在隐藏又显示后，才会显示，而页面却每次进入都会显示<br>例如我们在一个组件里有一下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onLoad () {
  console.log('onLoad')
},
onShow () {
  console.log('onShow')
},
mounted () {
  console.log('mounted')
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">onLoad</span> () {
  <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'onLoad'</span>)
},
<span class="hljs-selector-tag">onShow</span> () {
  <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'onShow'</span>)
},
<span class="hljs-selector-tag">mounted</span> () {
  <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'mounted'</span>)
},
</code></pre>
<p>页面加载的时候，我们期望打印出来的是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onLoad
onShow
mounted
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">onLoad</span>
<span class="hljs-literal">on</span>Show
mounted
</code></pre>
<p>然后实际上，只打印出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onLoad
mounted
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">onLoad
mounted</span>
</code></pre>
<p>这个问题，我已给官方提<a href="https://github.com/Meituan-Dianping/mpvue/issues/179" rel="nofollow noreferrer" target="_blank">Issue</a>,不过目前还没得到回应</p>
<p>说到这里，我们顺便看看小程序的页面跳转方式，小程序在一个页面跳转（调用wx.navigateTo）到另一个页面的时候，<br>并不会销毁原来的页面，而是转到后台去，并且执行原页面里面的onHide里的代码，<br>这也是为什么小程序的页面路径最多只能十层，因为你访问过的页面，正常都会保存在内存里，相当于vue里的keep-alive，<br>如果允许跳转非常多页面的话，很容易导致内存使用过高。</p>
<p>当然，我们也可以使用wx.navigateBack wx.redirectTo wx.reLaunch 来销毁页面，这3个方法，会调用页面的onUnload函数</p>
<p>九、canvas放在scroll-view不会随着页面滚动，看起来好像是fixed固定在某个位置的，但是在普通的view里面却可以正常滚动。 <br>这个问题其实是微信的问题，官方文档里面是有说明这点，不过我遇见问题的时候，没想到会是微信官方出的问题，各种百度谷歌，<br>都没找到这跟这个问题有关的，甚至我很怀疑是我自己代码的问题，于是新建了一个项目，然后直接考官方的示例代码，也是一样的效果。<br>后面就准备放弃，想其他解决方案了，没想到今天在官方文档 -<code>scroll-view组件</code>的介绍的最底部的 <strong>小字</strong> 里看到了</p>
<blockquote>tip: 请勿在 scroll-view 中使用 textarea、map、canvas、video 组件</blockquote>
<p>进一步查看了<code>canvas组件</code>的文档，发现也有类似的提示</p>
<blockquote>tip: 请勿在 scroll-view、swiper、picker-view、movable-view 中使用 canvas 组件。</blockquote>
<p>之所以把这一点也算进来，一是为这个问题坑了我好几天，我都在想其他方案了，二是这几天各种百度谷歌，<br>是有搜到几个类似的问题，但是都没人回答，我就在这边记录一下，希望后面踩到这个坑的童鞋能搜到。</p>
<p>十、同一个子组件,在2个不同的地方引用,会导致2个地方的样式都加载不了,而如果只在一个地方引用却没问题，<br>为什么把这个问题放到最后？ 因为这只是前几个版本的脚手架有这个问题，后面的应该就没有这个问题了。<br>这个问题我也给官方提过Issue,官方给的回答是用新版本的脚手架重新生成项目，但是项目都快做完了，<br>这个时候重新生成，然后拷贝代码，感觉心太累了，所以抱着不折腾不罢休的态度，终于找到原因，是因为早期版本的脚手架，<br>缺少了 webpack-mpvue-asset-plugin 这个插件,新版的cli里面会自动添加这个插件。具体看<a href="https://github.com/Meituan-Dianping/mpvue/issues/180" rel="nofollow noreferrer" target="_blank">Issue #180</a></p>
<p>还有一些官方明确指出的问题，这里就不一一列举了，有兴趣的童鞋可以直接查看<a href="http://mpvue.com/mpvue/" rel="nofollow noreferrer" target="_blank">mpvue官方文档</a></p>
<p>另外，最近正在做一个mpvue的基础教程，有兴趣的童鞋请前往我的<br><a href="https://github.com/noahlam" rel="nofollow noreferrer" target="_blank">github</a> <a href="https://github.com/noahlam/mpvue-tutorials" rel="nofollow noreferrer" target="_blank">mpvue-tutorials</a>,<br>您的一个Star,就是我最大的动力了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
美团小程序框架mpvue蹲坑指南

## 原文链接
[https://segmentfault.com/a/1190000014200668](https://segmentfault.com/a/1190000014200668)


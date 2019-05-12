---
title: '简单的例子实现vue插件' 
date: 2018-12-24 2:30:07
hidden: true
slug: byenedllmc
categories: [reprint]
---

{{< raw >}}

                    
<p>一直都觉得vue的插件生涩难懂，但是又很好奇，在看了几篇文章，试着写了写之后觉得也没那么难，这篇文就是总结一下这个过程，加深记忆，也可以帮助后来的人。</p>
<h2 id="articleHeader0">why</h2>
<p>在学习之前，先问问自己，为什么要编写vue的插件。</p>
<p>在一个项目中，尤其是大型项目，有很多部分需要复用，比如加载的loading动画，弹出框。如果一个一个的引用也稍显麻烦，而且在一个vue文件中引用的组件多了，会显得代码臃肿，所以才有了封装vue插件的需求。</p>
<p>说完需求，就来看看具体实现。目前我尝试了两种不一样的插件编写的方法，逐个介绍。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012224643?w=704&amp;h=530" src="https://static.alili.tech/img/remote/1460000012224643?w=704&amp;h=530" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这是我的项目目录，大致的结构解释这样，尽量简单，容易理解。</p>
<p>一个是loading插件，一个是toast插件，不同的地方在于：loading插件是作为组件引入使用，而toast插件是直接添加在挂载点里，通过方法改变状态调用的。</p>
<p>目前使用起来是酱紫的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012224644?w=672&amp;h=720" src="https://static.alili.tech/img/remote/1460000012224644?w=672&amp;h=720" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">toast插件</h2>
<p>toast文件下有两个文件，后缀为vue的文件就是这个插件的骨架，js文件一个是将这个骨架放入Vue全局中，并写明操作逻辑。</p>
<p>可以看一下toast.vue的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <transition name=&quot;fade&quot;>
        <div class=&quot;toast&quot; v-show=&quot;show&quot;>
            "{{"message"}}"
        </div>

    </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: &quot;&quot;
    };
  }
};
</script>

<style lang=&quot;scss&quot; scoped>
.toast {
  position: fixed;
  top: 40%;
  left: 50%;
  margin-left: -15vw;
  padding: 2vw;
  width: 30vw;
  font-size: 4vw;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5vw;
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease-out;
}
.fade-enter {
  opacity: 0;
  transform: scale(1.2);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"fade"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toast"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"show"</span>&gt;</span>
            "{{"message"}}"
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      show: false,
      message: ""
    };
  }
};
&lt;/</span>script&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.toast</span> {
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">40%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">15vw</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">2vw</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">30vw</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">4vw</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.8);
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5vw</span>;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">999</span>;
}

<span class="hljs-selector-class">.fade-enter-active</span>,
<span class="hljs-selector-class">.fade-leave-active</span> {
  <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.3s</span> ease-out;
}
<span class="hljs-selector-class">.fade-enter</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.2);
}
<span class="hljs-selector-class">.fade-leave-to</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0.8);
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>这里面主要的内容只有两个，决定是否显示的<code>show</code>和显示什么内容的<code>message</code>。</p>
<p>粗看这里，有没有发现什么问题？</p>
<p>这个文件中并没有<code>props</code>属性，也就是无论是show也好，message也好，就没有办法通过父子组件通信的方式进行修改，那他们是怎么正确处理的呢。别急，来看他的配置文件。</p>
<p>index.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ToastComponent from './toast.vue'

const Toast = {};

// 注册Toast
Toast.install = function (Vue) {
    // 生成一个Vue的子类
    // 同时这个子类也就是组件
    const ToastConstructor = Vue.extend(ToastComponent)
    // 生成一个该子类的实例
    const instance = new ToastConstructor();

    // 将这个实例挂载在我创建的div上
    // 并将此div加入全局挂载点内部
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    
    // 通过Vue的原型注册一个方法
    // 让所有实例共享这个方法 
    Vue.prototype.$toast = (msg, duration = 2000) => {
        instance.message = msg;
        instance.show = true;

        setTimeout(() => {
            
            instance.show = false;
        }, duration);
    }
}

export default Toast" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> ToastComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./toast.vue'</span>

<span class="hljs-keyword">const</span> Toast = {};

<span class="hljs-comment">// 注册Toast</span>
Toast.install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue</span>) </span>{
    <span class="hljs-comment">// 生成一个Vue的子类</span>
    <span class="hljs-comment">// 同时这个子类也就是组件</span>
    <span class="hljs-keyword">const</span> ToastConstructor = Vue.extend(ToastComponent)
    <span class="hljs-comment">// 生成一个该子类的实例</span>
    <span class="hljs-keyword">const</span> instance = <span class="hljs-keyword">new</span> ToastConstructor();

    <span class="hljs-comment">// 将这个实例挂载在我创建的div上</span>
    <span class="hljs-comment">// 并将此div加入全局挂载点内部</span>
    instance.$mount(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>))
    <span class="hljs-built_in">document</span>.body.appendChild(instance.$el)
    
    <span class="hljs-comment">// 通过Vue的原型注册一个方法</span>
    <span class="hljs-comment">// 让所有实例共享这个方法 </span>
    Vue.prototype.$toast = <span class="hljs-function">(<span class="hljs-params">msg, duration = <span class="hljs-number">2000</span></span>) =&gt;</span> {
        instance.message = msg;
        instance.show = <span class="hljs-literal">true</span>;

        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            
            instance.show = <span class="hljs-literal">false</span>;
        }, duration);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Toast</code></pre>
<p>这里的逻辑大致可以分成这么几步：</p>
<ol>
<li>创建一个空对象，这个对象就是日后要使用到的插件的名字。此外，这个对象中要有一个install的函数。</li>
<li>使用vue的extend方法创建一个插件的构造函数（可以看做创建了一个vue的子类），实例化该子类，之后的所有操作都可以通过这个子类完成。</li>
<li>之后再Vue的原型上添加一个共用的方法。</li>
</ol>
<p>这里需要着重提的是<code>Vue.extend()</code>。举个例子，我们日常使用vue编写组件是这个样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('MyComponent',{
    template:'<div>这是组件</div>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'MyComponent'</span>,{
    <span class="hljs-attr">template</span>:<span class="hljs-string">'&lt;div&gt;这是组件&lt;/div&gt;'</span>
})</code></pre>
<p>这是全局组件的注册方法，但其实这是一个语法糖，真正的运行过程是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let component = Vue.extend({
    template:'<div>这是组件</div>'
})

Vue.component('MyComponent',component)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> component = Vue.extend({
    <span class="hljs-attr">template</span>:<span class="hljs-string">'&lt;div&gt;这是组件&lt;/div&gt;'</span>
})

Vue.component(<span class="hljs-string">'MyComponent'</span>,component)</code></pre>
<p>Vue.extend会返回一个对象，按照大多数资料上提及的，也可以说是返回一个Vue的子类，既然是子类，就没有办法直接通过他使用Vue原型上的方法，所以需要new一个实例出来使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在代码里console.log(instance)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>在代码里console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">instance</span>)
</code></pre>
<p>得出的是这样的结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012224645?w=1134&amp;h=1202" src="https://static.alili.tech/img/remote/1460000012224645?w=1134&amp;h=1202" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以看到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
$el:div.toast
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
<span class="hljs-variable">$el</span>:<span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.toast</span>
</code></pre>
<p>也就是toast组件模板的根节点。</p>
<p>疑惑的是，我不知道为什么要创建一个空的div节点，并把这个实例挂载在上面。我尝试注释这段代码，但是运行会报错。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012224646?w=852&amp;h=370" src="https://static.alili.tech/img/remote/1460000012224646?w=852&amp;h=370" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>查找这个错误的原因，貌似是因为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" document.body.appendChild(instance.$el)
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.appendChild</span>(instance.<span class="hljs-variable">$el</span>)
 </code></pre>
<p>这里面的<code>instance.$el</code>的问题，那好，我们console下这个看看。WTF！！！！结果居然是<code>undefined</code>。</p>
<p>那接着</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(instance)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">instance</span>)
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012224647?w=1096&amp;h=978" src="https://static.alili.tech/img/remote/1460000012224647?w=1096&amp;h=978" alt="" title="" style="cursor: pointer;"></span></p>
<p>和上一张图片比对一下，发现了什么？对，$el消失了，换句话说在我注释了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="instance.$mount(document.createElement('div'))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-keyword">instance</span>.$mount(document.createElement(<span class="hljs-string">'div'</span>))
</code></pre>
<p>这句话之后，挂载点也不存在了。接着我试着改了一下这句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="instance.$mount(instance.$el)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-keyword">instance</span>.$mount(<span class="hljs-keyword">instance</span>.$el)
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012224648" src="https://static.alili.tech/img/remote/1460000012224648" alt="" title="" style="cursor: pointer;"></span></p>
<p>$el又神奇的回来了………………</p>
<p>暂时没有发现这种改动有什么问题，可以和上面一样运行。但无论如何，这也就是说instance实例必须挂载在一个节点上才能进行后续操作。</p>
<p>之后的代码就简单了，无非是在Vue的原型上添加一个改变插件状态的方法。之后导出这个对象。</p>
<p>接下来就是怎么使用的问题了。来看看main.js是怎么写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
// import router from './router'
import Toast from './components/taost'
Vue.use(Toast)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({

  // router,
  render: h => h(App)
}).$mount('#app')

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-comment">// import router from './router'</span>
<span class="hljs-keyword">import</span> Toast <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/taost'</span>
Vue.use(Toast)

Vue.config.productionTip = <span class="hljs-literal">false</span>

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({

  <span class="hljs-comment">// router,</span>
  render: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
}).$mount(<span class="hljs-string">'#app'</span>)

</code></pre>
<p>这样就可以在其他vue文件中直接使用了，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.vue
<template>
  <div id=&quot;app&quot;>
    <loading duration='2s' :isshow='show'></loading>
    <!-- <button @click=&quot;show = !show&quot;>显示/隐藏loading</button> -->
    <button @click=&quot;toast&quot;>显示taost弹出框</button>
  </div>
</template>

<script>
export default {
  name: &quot;app&quot;,
  data() {
    return {
      show: false
    };
  },
  methods: {
    toast() {
      this.$toast(&quot;你好&quot;);
    }
  }
};
</script>

<style>
#app {
  font-family: &quot;Avenir&quot;, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app.vue</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">loading</span> <span class="hljs-attr">duration</span>=<span class="hljs-string">'2s'</span> <span class="hljs-attr">:isshow</span>=<span class="hljs-string">'show'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">loading</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;button @click="show = !show"&gt;显示/隐藏loading&lt;/button&gt; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toast"</span>&gt;</span>显示taost弹出框<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
export default {
  name: "app",
  data() {
    return {
      show: false
    };
  },
  methods: {
    toast() {
      this.$toast("你好");
    }
  }
};
&lt;/</span>script&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"Avenir"</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>通过在methods中增加一个方法控制写在Vue原型上的$toast对toast组件进行操作。</p>
<p>这样toast组件的编写过程就结束了，可以看到一开始gif图里的效果。</p>
<h2 id="articleHeader2">loading插件</h2>
<p>经过上一个插件的讲解，这一部分就不会那么细致了，毕竟大多数都没有什么不同，我只指出不一样的地方。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class='wrapper' v-if=&quot;isshow&quot;>
        <div class='loading'>
            <img src=&quot;./loading.gif&quot; alt=&quot;&quot; width=&quot;40&quot; height=&quot;40&quot;>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: String,
      default: &quot;1s&quot; //默认1s
    },
    isshow: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {};
  }
};
</script>

<style lang=&quot;scss&quot; scoped>

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'wrapper'</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isshow"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'loading'</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./loading.gif"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"40"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"40"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

&lt;script&gt;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">duration</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-string">"1s"</span> <span class="hljs-comment">//默认1s</span>
    },
    <span class="hljs-attr">isshow</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>
    }
  },
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {};
  }
};
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;style lang=<span class="hljs-string">"scss"</span> scoped&gt;

<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>这个就只是一个模板，传入两个父组件的数据控制显示效果。</p>
<p>那再来看一下该插件的配置文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import LoadingComponent from './loading.vue'

let Loading = {};

Loading.install = (Vue) => {
    Vue.component('loading', LoadingComponent)
}

export default Loading;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> LoadingComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./loading.vue'</span>

<span class="hljs-keyword">let</span> Loading = {};

Loading.install = <span class="hljs-function">(<span class="hljs-params">Vue</span>) =&gt;</span> {
    Vue.component(<span class="hljs-string">'loading'</span>, LoadingComponent)
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Loading;</code></pre>
<p>这个和taoat的插件相比，简单了很多，依然是一个空对象，里面有一个install方法，然后在全局注册了一个组件。</p>
<h2 id="articleHeader3">比较</h2>
<p>那介绍了这两种不同的插件编写方法，貌似没有什么不一样啊，真的是这样么？</p>
<p>来看一下完整的main.js和app.vue这两个文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import Vue from 'vue'
import App from './App'
// import router from './router'
import Toast from './components/taost'
import Loading from './components/loading'

Vue.use(Toast)

Vue.use(Loading)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({

  // router,
  render: h => h(App)
}).$mount('#app')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-comment">// import router from './router'</span>
<span class="hljs-keyword">import</span> Toast <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/taost'</span>
<span class="hljs-keyword">import</span> Loading <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/loading'</span>

Vue.use(Toast)

Vue.use(Loading)

Vue.config.productionTip = <span class="hljs-literal">false</span>

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({

  <span class="hljs-comment">// router,</span>
  render: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
}).$mount(<span class="hljs-string">'#app'</span>)
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.vue
<template>
  <div id=&quot;app&quot;>
    <loading duration='2s' :isshow='show'></loading>
    <!-- <button @click=&quot;show = !show&quot;>显示/隐藏loading</button> -->
    <button @click=&quot;toast&quot;>显示taost弹出框</button>
  </div>
</template>

<script>
export default {
  name: &quot;app&quot;,
  data() {
    return {
      show: false
    };
  },
  methods: {
    toast() {
      this.$toast(&quot;你好&quot;);
    }
  }
};
</script>

<style>
#app {
  font-family: &quot;Avenir&quot;, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app.vue</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">loading</span> <span class="hljs-attr">duration</span>=<span class="hljs-string">'2s'</span> <span class="hljs-attr">:isshow</span>=<span class="hljs-string">'show'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">loading</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;button @click="show = !show"&gt;显示/隐藏loading&lt;/button&gt; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toast"</span>&gt;</span>显示taost弹出框<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
export default {
  name: "app",
  data() {
    return {
      show: false
    };
  },
  methods: {
    toast() {
      this.$toast("你好");
    }
  }
};
&lt;/</span>script&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"Avenir"</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>可以看出来，loading是显示的写在app.vue模板里的，而toast并没有作为一个组件写入，仅仅是通过一个方法控制显示。</p>
<p>来看一下html结构和vue工具给出的结构：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012224649?w=906&amp;h=406" src="https://static.alili.tech/img/remote/1460000012224649?w=906&amp;h=406" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012224650?w=414&amp;h=154" src="https://static.alili.tech/img/remote/1460000012224650?w=414&amp;h=154" alt="" title="" style="cursor: pointer;"></span></p>
<p>看出来了么，toast插件没有在挂载点里面，而是独立存在的，也就是说当执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue.use(toast)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>vue.<span class="hljs-keyword">use</span>(toast)
</code></pre>
<p>之后，该插件就是生成好的了，之后的所有操作无非就是显示或者隐藏的问题了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单的例子实现vue插件

## 原文链接
[https://segmentfault.com/a/1190000012224638](https://segmentfault.com/a/1190000012224638)


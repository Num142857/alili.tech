---
title: '手把手教你写 Vue UI 组件库@vue2.0' 
date: 2019-01-13 2:30:11
hidden: true
slug: yqxhk7uyws
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">手把手教你写 Vue UI 组件库</h1>
<p>最近在研究 <code>muse-ui</code> 的实现，发现网上很少有关于 vue 插件具体实现的文章，官方的文档也只是一笔带过，对于新手来说并不算友好。</p>
<p>笔者结合官方文档，与自己的摸索总结，以最简单的 <code>FlexBox</code> 组件为例子，带大家入门 <code>vue</code> 的插件编写，如果您是大牛，不喜勿喷～</p>

<p><strong>项目结构</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="| src
| ---| plugin
| ---| ---| flexbox                # 组件文件夹
| ---| ---| ---| flexbox.vue       # flex 布局的父组件
| ---| ---| ---| flexboxItem.vue   # flex 布局的子组件
| ---| ---| ---| flexbox.scss      # 样式文件，我使用的是 sass
| ---| ---| ---| index.js          # 组件的出口
| ---| ---| styles                 # 公用的 css 样式文件
| ---| ---| index.js               # 插件的出口
| ---| App.vue
| ---| main.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">| src
| ---| plugin
| ---| ---| flexbox                <span class="hljs-comment"># 组件文件夹</span>
| ---| ---| ---| flexbox.vue       <span class="hljs-comment"># flex 布局的父组件</span>
| ---| ---| ---| flexboxItem.vue   <span class="hljs-comment"># flex 布局的子组件</span>
| ---| ---| ---| flexbox.scss      <span class="hljs-comment"># 样式文件，我使用的是 sass</span>
| ---| ---| ---| index.js          <span class="hljs-comment"># 组件的出口</span>
| ---| ---| styles                 <span class="hljs-comment"># 公用的 css 样式文件</span>
| ---| ---| index.js               <span class="hljs-comment"># 插件的出口</span>
| ---| App.vue
| ---| main.js</code></pre>

<h2 id="articleHeader1">&lt;一&gt; 让项目装载插件</h2>
<p>首先，我们不去理会组件的具体实现，先让我们的项目能够正常装载一个我们<code>自定义的插件</code>。</p>
<p>现在，我们的目标，是让项目能够正常显示这两个组件，能显示文本 <code>flexbox demo</code> 就可以啦！</p>
<p><em>./src/plugin/flexbox/<code>flexbox.vue</code></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>flexbox demo</div>
</template>

<script>
export default {
    // 这是该组件的自定义名称，
    // 之后引用组件时就会用到这个名称。
    name: 'my-flexbox'
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>flexbox demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// 这是该组件的自定义名称，</span>
    <span class="hljs-comment">// 之后引用组件时就会用到这个名称。</span>
    name: <span class="hljs-string">'my-flexbox'</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>

<p><em>./src/plugin/flexbox/<code>flexboxItem.vue</code></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>flexboxItem demo</div>
</template>

<script>
export default {
    name: 'my-flexbox-item'
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>flexboxItem demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'my-flexbox-item'</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>

<p><em>./src/plugin/flexbox/<code>index.js</code></em></p>
<p>这是整个 <code>flexbox</code> 组件的出口文件。\<br>因为这个组件有两个子组件，所以我们将引入的 <code>default</code> 改名为该组件的名称。<code>{ default as flexbox }</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引用 scss 文件
import './flexbox.scss'  

// 引用组件
export { default as flexbox } from './flexbox.vue'
export { default as flexboxItem } from './flexboxItem.vue'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 引用 scss 文件</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./flexbox.scss'</span>  

<span class="hljs-comment">// 引用组件</span>
<span class="hljs-keyword">export</span> { <span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> flexbox } <span class="hljs-keyword">from</span> <span class="hljs-string">'./flexbox.vue'</span>
<span class="hljs-keyword">export</span> { <span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> flexboxItem } <span class="hljs-keyword">from</span> <span class="hljs-string">'./flexboxItem.vue'</span></code></pre>

<p><em>./src/plugin/<code>index.js</code></em></p>
<p>现在，我们来到插件的出口文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ----- 1
import * as flexbox from './flexbox'

// ----- 2
const components = {
    ...flexbox
}

// ----- 3
const install = function (Vue, Option) {
    // ----- 4
     Object.keys(components).forEach((key) => {
        Vue.component(components[key].name, components[key])
    })
}

// ----- 5
export default {
    install
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ----- 1</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> flexbox <span class="hljs-keyword">from</span> <span class="hljs-string">'./flexbox'</span>

<span class="hljs-comment">// ----- 2</span>
<span class="hljs-keyword">const</span> components = {
    ...flexbox
}

<span class="hljs-comment">// ----- 3</span>
<span class="hljs-keyword">const</span> install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue, Option</span>) </span>{
    <span class="hljs-comment">// ----- 4</span>
     <span class="hljs-built_in">Object</span>.keys(components).forEach(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> {
        Vue.component(components[key].name, components[key])
    })
}

<span class="hljs-comment">// ----- 5</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    install
}</code></pre>
<ol>
<li><p>引入组件</p></li>
<li><p>定义 <code>components</code> 变量</p></li>
<li><p><strong>这里是重点</strong>，vue 为编写插件提供了一个 <code>install(Vue, Option)</code> 方法，该方法为 vue 添加全局功能；<br><br>该方法有两个参数，第一个是 <code>Vue</code>构造器，第二个是可选的参数；</p></li>
<li><p>使用 vue 的全局方法 <code>Vue.component(Name, Object)</code> 定义组件，第一个参数是组件名，第二参数是组件对象；</p></li>
<li><p>最后将组件默认导出。</p></li>
</ol>
<p><em>./src/<code>main.js</code></em></p>
<p>我们来到 <code>main.js</code>，在这里，我们将进行插件的最后配置啦。</p>
<p>使用 vue 的全局方法 <code>Vue.use(PluginName, Options)</code>，第一个参数是插件的名字，第二个是可选的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import plugin from './plugin'
Vue.use(plugin)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> plugin <span class="hljs-keyword">from</span> <span class="hljs-string">'./plugin'</span>
Vue.use(plugin)</code></pre>

<p><em>./src/<code>App.vue</code></em></p>
<p>终于，我们可以在项目中引用我们定义的组件啦！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <my-flexbox></my-flexbox>
    <my-flexbox-item></my-flexbox-item>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-flexbox</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-flexbox</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-flexbox-item</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-flexbox-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>

<h2 id="articleHeader2">&lt;二&gt; <code>Flexbox</code> 组件的实现</h2>
<p>组件的具体实现，就和平时自己写组件的方法是一样的了。</p>
<p>这里先贴出代码，我会将具体原理写在代码注释里面。</p>
<p><em>./src/plugin/flexbox/<code>flexbox.vue</code></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <!-- 为组件绑定一个类，这个类的值通过计算属性来得出 -->
    <div class=&quot;my-flexbox&quot;
         :class=&quot;classObj&quot;>
        <!-- slot 用来装载子组件，my-flexbox-item -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'my-flexbox',
    props: {
        // 子组件 my-flexbox-item 之间是否存在间隙，
        // 默认，8px 的间隙。
        gutter: {
            type: Number,
            default: 8
        },
        // 子组件的排列方式，水平，或垂直排列。
        orient: {
            type: String,
            default: 'horizontal'
        },
        justify: {
            type: String
        },
        align: {
            type: String
        },
        wrap: {
            type: String,
            default: 'nowrap'
        }
    },
    computed: {
        // 我们通过父级传递过来的参数，
        // 来判断该组件需要应用哪些样式
        // 如：<my-flexbox orient=&quot;vertical&quot; justify=&quot;flex-start&quot;></my-flexbox>
        classObj () {
            let classObj = {};

            // orient
            if (this.orient === 'vertical') classObj['flex-vertical'] = true;

            // wrap
            if (this.wrap === 'wrap') {
                classObj['flex-wrap'] = true
            } else {
                classObj['flex-nowrap'] = true
            }

            // justify
            switch (this.justify) {
                case 'flex-start':
                    classObj['justify-start'] = true;
                    break;
                case 'flex-end':
                    classObj['justify-end'] = true;
                    break;
                case 'center':
                    classObj['justify-center'] = true;
                    break;
                case 'space-between':
                    classObj['justify-space-between'] = true;
                    break;
                case 'space-around':
                    classObj['justify-space-around'] = true;
                    break
            };

            // align
            switch (this.align) {
                case 'flex-start':
                    classObj['align-start'] = true;
                    break;
                case 'flex-end':
                    classObj['align-end'] = true;
                    break;
                case 'center':
                    classObj['align-center'] = true;
                    break;
                case 'baseline':
                    classObj['align-baseline'] = true;
                    break;
                case 'stretch':
                    classObj['align-stretch'] = true;
                    break;
            };

            return classObj;
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 为组件绑定一个类，这个类的值通过计算属性来得出 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"my-flexbox"</span>
         <span class="hljs-attr">:class</span>=<span class="hljs-string">"classObj"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- slot 用来装载子组件，my-flexbox-item --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'my-flexbox'</span>,
    <span class="hljs-attr">props</span>: {
        <span class="hljs-comment">// 子组件 my-flexbox-item 之间是否存在间隙，</span>
        <span class="hljs-comment">// 默认，8px 的间隙。</span>
        gutter: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
            <span class="hljs-attr">default</span>: <span class="hljs-number">8</span>
        },
        <span class="hljs-comment">// 子组件的排列方式，水平，或垂直排列。</span>
        orient: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
            <span class="hljs-attr">default</span>: <span class="hljs-string">'horizontal'</span>
        },
        <span class="hljs-attr">justify</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
        },
        <span class="hljs-attr">align</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
        },
        <span class="hljs-attr">wrap</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
            <span class="hljs-attr">default</span>: <span class="hljs-string">'nowrap'</span>
        }
    },
    <span class="hljs-attr">computed</span>: {
        <span class="hljs-comment">// 我们通过父级传递过来的参数，</span>
        <span class="hljs-comment">// 来判断该组件需要应用哪些样式</span>
        <span class="hljs-comment">// 如：&lt;my-flexbox orient="vertical" justify="flex-start"&gt;&lt;/my-flexbox&gt;</span>
        classObj () {
            <span class="hljs-keyword">let</span> classObj = {};

            <span class="hljs-comment">// orient</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.orient === <span class="hljs-string">'vertical'</span>) classObj[<span class="hljs-string">'flex-vertical'</span>] = <span class="hljs-literal">true</span>;

            <span class="hljs-comment">// wrap</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.wrap === <span class="hljs-string">'wrap'</span>) {
                classObj[<span class="hljs-string">'flex-wrap'</span>] = <span class="hljs-literal">true</span>
            } <span class="hljs-keyword">else</span> {
                classObj[<span class="hljs-string">'flex-nowrap'</span>] = <span class="hljs-literal">true</span>
            }

            <span class="hljs-comment">// justify</span>
            <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">this</span>.justify) {
                <span class="hljs-keyword">case</span> <span class="hljs-string">'flex-start'</span>:
                    classObj[<span class="hljs-string">'justify-start'</span>] = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'flex-end'</span>:
                    classObj[<span class="hljs-string">'justify-end'</span>] = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'center'</span>:
                    classObj[<span class="hljs-string">'justify-center'</span>] = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'space-between'</span>:
                    classObj[<span class="hljs-string">'justify-space-between'</span>] = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'space-around'</span>:
                    classObj[<span class="hljs-string">'justify-space-around'</span>] = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">break</span>
            };

            <span class="hljs-comment">// align</span>
            <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">this</span>.align) {
                <span class="hljs-keyword">case</span> <span class="hljs-string">'flex-start'</span>:
                    classObj[<span class="hljs-string">'align-start'</span>] = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'flex-end'</span>:
                    classObj[<span class="hljs-string">'align-end'</span>] = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'center'</span>:
                    classObj[<span class="hljs-string">'align-center'</span>] = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'baseline'</span>:
                    classObj[<span class="hljs-string">'align-baseline'</span>] = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'stretch'</span>:
                    classObj[<span class="hljs-string">'align-stretch'</span>] = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">break</span>;
            };

            <span class="hljs-keyword">return</span> classObj;
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>

<p><em>./src/plugin/flexbox/<code>flexbox.scss</code></em></p>
<p><code>scss</code> 中定义需要使用到的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".my-flexbox {
    width: 100%;
    display: flex;
}
.flex-vertical {
    flex-direction: column;
}
.flex-wrap {
    flex-wrap: wrap;
}
.flex-nowrap {
    flex-wrap: nowrap;
}

/* justify */
.justify-start {
    justify-content: flex-start
}
.justify-end {
    justify-content: flex-end
}
.justify-center {
    justify-content: center
}
.justify-space-between {
    justify-content: space-between
}
.justify-space-around {
    justify-content: space-around
}

/* align */
.align-start {
    align-items: flex-start
}
.align-end {
    align-items: flex-end
}
.align-center {
    align-items: center
}
.align-baseline {
    align-items: baseline
}
.align-stretch {
    align-items: stretch
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.my-flexbox</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.flex-vertical</span> {
    <span class="hljs-attribute">flex-direction</span>: column;
}
<span class="hljs-selector-class">.flex-wrap</span> {
    <span class="hljs-attribute">flex-wrap</span>: wrap;
}
<span class="hljs-selector-class">.flex-nowrap</span> {
    <span class="hljs-attribute">flex-wrap</span>: nowrap;
}

<span class="hljs-comment">/* justify */</span>
<span class="hljs-selector-class">.justify-start</span> {
    <span class="hljs-attribute">justify-content</span>: flex-start
}
<span class="hljs-selector-class">.justify-end</span> {
    <span class="hljs-attribute">justify-content</span>: flex-end
}
<span class="hljs-selector-class">.justify-center</span> {
    <span class="hljs-attribute">justify-content</span>: center
}
<span class="hljs-selector-class">.justify-space-between</span> {
    <span class="hljs-attribute">justify-content</span>: space-between
}
<span class="hljs-selector-class">.justify-space-around</span> {
    <span class="hljs-attribute">justify-content</span>: space-around
}

<span class="hljs-comment">/* align */</span>
<span class="hljs-selector-class">.align-start</span> {
    <span class="hljs-attribute">align-items</span>: flex-start
}
<span class="hljs-selector-class">.align-end</span> {
    <span class="hljs-attribute">align-items</span>: flex-end
}
<span class="hljs-selector-class">.align-center</span> {
    <span class="hljs-attribute">align-items</span>: center
}
<span class="hljs-selector-class">.align-baseline</span> {
    <span class="hljs-attribute">align-items</span>: baseline
}
<span class="hljs-selector-class">.align-stretch</span> {
    <span class="hljs-attribute">align-items</span>: stretch
}</code></pre>

<p><em>./src/<code>App.vue</code></em></p>
<p>好了！我们可以在项目中用到这个组件了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div id=&quot;app&quot;>
        <my-flexbox>
            <p>demo</p>
            <p>demo</p>
        </my-flexbox>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-flexbox</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>demo<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>demo<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">my-flexbox</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>你也可以让他们垂直排列！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div id=&quot;app&quot;>
        <my-flexbox orient=&quot;vertical&quot;>
            <p>demo</p>
            <p>demo</p>
        </my-flexbox>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-flexbox</span> <span class="hljs-attr">orient</span>=<span class="hljs-string">"vertical"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>demo<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>demo<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">my-flexbox</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>

<h2 id="articleHeader3">&lt;三&gt; <code>FlexboxItem</code> 组件的实现</h2>
<p><code>flexbox-item</code> 组件和 <code>flexbox</code> 组件实现原理大同小异，直接贴代码了！</p>
<p><em>./src/plugin/flexbox/<code>flexbox.vue</code></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;my-flexbox-item&quot;
         :style=&quot;styleObj&quot;>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'my-flexbox-item',
    props: {
        grow: {
            type: [String, Number],
            default: 0
        },
        shrink: {
            type: [String, Number],
            default: 1
        },
        basis: {
            type: [String, Number],
            default: 'auto'
        },
        order: {
            type: [String, Number],
            default: 0
        }
    },
    computed: {
        styleObj () {
            let styleObj = {};

            // gutter
            let gutter = this.$parent.gutter,
                orient = this.$parent.orient;
            
            let marginName = orient === 'horizontal'?'marginLeft':'marginTop';
            styleObj[marginName] = gutter + 'px';

            // grow
            styleObj['flex-grow'] = this.grow;

            // shrink
            styleObj['flex-shrink'] = this.shrink;

            // basis
            styleObj['flex-basis'] = this.basis;

            // order
            styleObj['order'] = this.order;

            return styleObj;
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"my-flexbox-item"</span>
         <span class="hljs-attr">:style</span>=<span class="hljs-string">"styleObj"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'my-flexbox-item'</span>,
    <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">grow</span>: {
            <span class="hljs-attr">type</span>: [<span class="hljs-built_in">String</span>, <span class="hljs-built_in">Number</span>],
            <span class="hljs-attr">default</span>: <span class="hljs-number">0</span>
        },
        <span class="hljs-attr">shrink</span>: {
            <span class="hljs-attr">type</span>: [<span class="hljs-built_in">String</span>, <span class="hljs-built_in">Number</span>],
            <span class="hljs-attr">default</span>: <span class="hljs-number">1</span>
        },
        <span class="hljs-attr">basis</span>: {
            <span class="hljs-attr">type</span>: [<span class="hljs-built_in">String</span>, <span class="hljs-built_in">Number</span>],
            <span class="hljs-attr">default</span>: <span class="hljs-string">'auto'</span>
        },
        <span class="hljs-attr">order</span>: {
            <span class="hljs-attr">type</span>: [<span class="hljs-built_in">String</span>, <span class="hljs-built_in">Number</span>],
            <span class="hljs-attr">default</span>: <span class="hljs-number">0</span>
        }
    },
    <span class="hljs-attr">computed</span>: {
        styleObj () {
            <span class="hljs-keyword">let</span> styleObj = {};

            <span class="hljs-comment">// gutter</span>
            <span class="hljs-keyword">let</span> gutter = <span class="hljs-keyword">this</span>.$parent.gutter,
                orient = <span class="hljs-keyword">this</span>.$parent.orient;
            
            <span class="hljs-keyword">let</span> marginName = orient === <span class="hljs-string">'horizontal'</span>?<span class="hljs-string">'marginLeft'</span>:<span class="hljs-string">'marginTop'</span>;
            styleObj[marginName] = gutter + <span class="hljs-string">'px'</span>;

            <span class="hljs-comment">// grow</span>
            styleObj[<span class="hljs-string">'flex-grow'</span>] = <span class="hljs-keyword">this</span>.grow;

            <span class="hljs-comment">// shrink</span>
            styleObj[<span class="hljs-string">'flex-shrink'</span>] = <span class="hljs-keyword">this</span>.shrink;

            <span class="hljs-comment">// basis</span>
            styleObj[<span class="hljs-string">'flex-basis'</span>] = <span class="hljs-keyword">this</span>.basis;

            <span class="hljs-comment">// order</span>
            styleObj[<span class="hljs-string">'order'</span>] = <span class="hljs-keyword">this</span>.order;

            <span class="hljs-keyword">return</span> styleObj;
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>

<p><em>./src/<code>App.vue</code></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div id=&quot;app&quot;>
        <my-flexbox>
            <my-flexbox-item grow=&quot;1&quot;>
                demo
            </my-flexbox-item>
            <my-flexbox-item>
                demo
            </my-flexbox-item>
        </my-flexbox>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-flexbox</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">my-flexbox-item</span> <span class="hljs-attr">grow</span>=<span class="hljs-string">"1"</span>&gt;</span>
                demo
            <span class="hljs-tag">&lt;/<span class="hljs-name">my-flexbox-item</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">my-flexbox-item</span>&gt;</span>
                demo
            <span class="hljs-tag">&lt;/<span class="hljs-name">my-flexbox-item</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">my-flexbox</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>

<h2 id="articleHeader4">总结</h2>
<p>这只是 vue 中编写插件的其中一个方法，还有更多的，例如：</p>
<ol>
<li><p>使用 <code>Vue.directive(Name, [Define])</code>，自定义指令，添加全局资源，如 <code>vue-touch</code>。<a href="https://github.com/Musiky/Article/blob/master/Vue/Vue-advanced/customize.md" rel="nofollow noreferrer" target="_blank">可以看我总结的这篇文章</a></p></li>
<li><p>添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。</p></li>
<li><p>添加全局方法或者属性，如: <code>vue-element</code>。</p></li>
<li><p>一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 <code>vue-router</code>。</p></li>
</ol>
<p>本文的案例，只讲解了最简单的如何配置插件，意在帮助大家尽快上手。</p>
<p><em>觉得有帮助，就打赏打赏吧。</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009662612?w=700&amp;h=950" src="https://static.alili.tech/img/remote/1460000009662612?w=700&amp;h=950" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你写 Vue UI 组件库@vue2.0

## 原文链接
[https://segmentfault.com/a/1190000009662609](https://segmentfault.com/a/1190000009662609)


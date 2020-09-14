---
title: 'vue组件之间的通信' 
date: 2019-01-05 2:30:11
hidden: true
slug: rblwqfh0owf
categories: [reprint]
---

{{< raw >}}

                    
<h4>前言</h4>
<p>作为一个vue初学者不得不了解的就是组件间的数据通信(暂且不谈vuex)。通信方式根据组件之间的关系有不同之处。组件关系有下面三种：<strong>父--&gt;子</strong>、<strong>子--&gt;父</strong>、<strong>非父子</strong></p>
<h4>父--&gt;子</h4>
<blockquote>父向子传递数据通过props</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**父组件代码**
<template>
    <header-box :title-txt=&quot;showTitleTxt&quot;></header-box>
</template>
<script>
    import Header from './header'
    export default {
        name: 'index',
        components: {
            'header-box': Header
        },
        data () {
            return {
                showTitleTxt: '首页'
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">**父组件代码**
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header-box</span> <span class="hljs-attr">:title-txt</span>=<span class="hljs-string">"showTitleTxt"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">header-box</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'./header'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>,
        <span class="hljs-attr">components</span>: {
            <span class="hljs-string">'header-box'</span>: Header
        },
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">showTitleTxt</span>: <span class="hljs-string">'首页'</span>
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**子组件代码**
<template>
    <header>
        "{{"thisTitleTxt"}}"
    </header>
</template>
<script>
    export default {
        name: 'header-box',
        props: {
            titleTxt: String
        },
        data () {
            return {
                thisTitleTxt: this.titleTxt
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">**子组件代码**
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
        "{{"thisTitleTxt"}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
&lt;script&gt;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'header-box'</span>,
        <span class="hljs-attr">props</span>: {
            <span class="hljs-attr">titleTxt</span>: <span class="hljs-built_in">String</span>
        },
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">thisTitleTxt</span>: <span class="hljs-keyword">this</span>.titleTxt
            }
        }
    }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<h4>子--&gt;父</h4>
<blockquote>子组件向父组件传递分为两种类型。<br>1、子组件改变父组件传递的props（你会发现通过props中的Object类型参数传输数据，可以通过子组件改变数据内容。这种方式是可行的，但是不推荐使用，因为官方定义prop是单向绑定）<br>2、通过$on和$emit</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*通过props实现传递*
**父组件代码**
<template>
    <header-box :title-txt=&quot;showTitleTxt&quot;></header-box>
</template>
<script>
    import Header from './header'
    export default {
        name: 'index',
        components: {
            'header-box': Header
        },
        data () {
            return {
                showTitleTxt: {
                    name: '首页'
                }
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">*通过props实现传递*
**父组件代码**
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header-box</span> <span class="hljs-attr">:title-txt</span>=<span class="hljs-string">"showTitleTxt"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">header-box</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'./header'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>,
        <span class="hljs-attr">components</span>: {
            <span class="hljs-string">'header-box'</span>: Header
        },
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">showTitleTxt</span>: {
                    <span class="hljs-attr">name</span>: <span class="hljs-string">'首页'</span>
                }
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**子组件代码**
<template>
    <header @click=&quot;changeTitleTxt&quot;>
        "{{"thisTitleTxt.name"}}"
    </header>
</template>
<script>
    export default {
        name: 'header-box',
        props: {
            titleTxt: Object
        },
        data () {
            return {
                thisTitleTxt: this.titleTxt.name
            }
        },
        metheds: {
            changeTitleTxt () {
                this.titleTxt.name = '切换'
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">**子组件代码**
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeTitleTxt"</span>&gt;</span>
        "{{"thisTitleTxt.name"}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
&lt;script&gt;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'header-box'</span>,
        <span class="hljs-attr">props</span>: {
            <span class="hljs-attr">titleTxt</span>: <span class="hljs-built_in">Object</span>
        },
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">thisTitleTxt</span>: <span class="hljs-keyword">this</span>.titleTxt.name
            }
        },
        <span class="hljs-attr">metheds</span>: {
            changeTitleTxt () {
                <span class="hljs-keyword">this</span>.titleTxt.name = <span class="hljs-string">'切换'</span>
            }
        }
    }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*通过$on,$emit*
**父组件代码**
<template>
    <div id=&quot;counter-event-example&quot;>
      <p>"{{" total "}}"</p>
      <button-counter v-on:increment=&quot;incrementTotal&quot;></button-counter>
</div>
</template>
<script>
    import ButtonCounter from './buttonCounter'
    export default {
        name: 'index',
        components: {
            'button-conuter': ButtonCounter
        },
        data () {
            return {
                total: 0
            }
        },
        methods: {
            incrementTotal () {
                this.total++
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">*通过$on,$emit*
**父组件代码**
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"counter-event-example"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{" total "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button-counter</span> <span class="hljs-attr">v-on:increment</span>=<span class="hljs-string">"incrementTotal"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button-counter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> ButtonCounter <span class="hljs-keyword">from</span> <span class="hljs-string">'./buttonCounter'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>,
        <span class="hljs-attr">components</span>: {
            <span class="hljs-string">'button-conuter'</span>: ButtonCounter
        },
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>
            }
        },
        <span class="hljs-attr">methods</span>: {
            incrementTotal () {
                <span class="hljs-keyword">this</span>.total++
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**子组件代码**
<template>
    <button @click=&quot;incrementCounter&quot;>"{{"counter"}}"</button>
</template>
<script>
    export default {
        name: 'button-counter',
        data () {
            return {
                counter: 0
            }
        },
        metheds: {
            incrementCounter () {
                this.$emit('increment')
                this.counter++
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">**子组件代码**
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"incrementCounter"</span>&gt;</span>"{{"counter"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
&lt;script&gt;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'button-counter'</span>,
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>
            }
        },
        <span class="hljs-attr">metheds</span>: {
            incrementCounter () {
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'increment'</span>)
                <span class="hljs-keyword">this</span>.counter++
            }
        }
    }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<h4>非父子</h4>
<blockquote>简单情况下我们可以通过使用一个空的Vue实例作为中央事件总线，（这里也可以使用app实例，而不需要新建一个空Vue实例）</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**main.js**
let bus = new Vue()
Vue.prototype.bus = bus" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">**main.js**
<span class="hljs-keyword">let</span> bus = <span class="hljs-keyword">new</span> Vue()
Vue.prototype.bus = bus</code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**main.js**
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    Vue.prototype.bus = this
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>**main.js**
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App },
  beforeCreate () {
    Vue.prototype.bus = <span class="hljs-keyword">this</span>
  }
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**header组件**
<template>
    <header @click=&quot;changeTitle&quot;>"{{"title"}}"</header>
</template>
<script>
export default {
    name: 'header',
    data () {
        return {
            title: '头部'
        }
    },
    methods: {
        changeTitle () {
            this.bus.$emit('toChangeTitle','首页')
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">**header组件**
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeTitle"</span>&gt;</span>"{{"title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
&lt;script&gt;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'header'</span>,
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">title</span>: <span class="hljs-string">'头部'</span>
        }
    },
    <span class="hljs-attr">methods</span>: {
        changeTitle () {
            <span class="hljs-keyword">this</span>.bus.$emit(<span class="hljs-string">'toChangeTitle'</span>,<span class="hljs-string">'首页'</span>)
        }
    }
}
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**footer组件**
<template>
    <footer>"{{"txt"}}"</footer>
</template>
<script>
export default {
    name: 'footer',
    mounted () {
        this.bus.$on('toChangeTitle', function (title) {
            console.log(title)
        })
    },
    data () {
        return {
            txt: '尾部'
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">**footer组件**
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>"{{"txt"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
&lt;script&gt;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'footer'</span>,
    mounted () {
        <span class="hljs-keyword">this</span>.bus.$on(<span class="hljs-string">'toChangeTitle'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">title</span>) </span>{
            <span class="hljs-built_in">console</span>.log(title)
        })
    },
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">txt</span>: <span class="hljs-string">'尾部'</span>
        }
    }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue组件之间的通信

## 原文链接
[https://segmentfault.com/a/1190000010530600](https://segmentfault.com/a/1190000010530600)


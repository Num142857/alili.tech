---
title: 'Vue组件实现tips的总结' 
date: 2018-12-27 2:30:12
hidden: true
slug: sxsisj29h7s
categories: [reprint]
---

{{< raw >}}

                    
<p>文章内容由蚊子的前端博客进行发布，或许你想看看他其他的文章呢： <a href="http://www.xiabingbao.com" rel="nofollow noreferrer" target="_blank">http://www.xiabingbao.com</a></p>
<p>原文地址： <code>https://www.xiabingbao.com/vue/2017/09/14/vue-component-tips.html</code></p>
<p>官网上已经有的内容，我就不再赘述了，直接在官网上查看即可，这里蚊子想换个角度来讲解下vue的组件。  </p>
<p>组件，顾名思义，就是把一个相对独立，而且会多次使用的功能抽象出来，成为一个组件！如果我们要把某个功能抽象为一个组件时，要做到这个组件对其他人来说是个黑盒子，他们不用关心里面是怎么实现的，只需要根据约定的接口调用即可！ </p>
<p>我用一张图稍微总结了下Vue中组件的构成：  </p>
<p><span class="img-wrap"><img data-src="/img/bVXE3c?w=884&amp;h=554" src="https://static.alili.tech/img/bVXE3c?w=884&amp;h=554" alt="Vue组件实现tips的总结" title="Vue组件实现tips的总结" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到组件中包含的东西还是蛮多的，而且，还有很多的点没有列出来，这里面的每一个知识点能都展开讲很多。不过我们这里不讲原理，只讲使用。  </p>
<p>我们以一个tips弹窗为例，来综合运用下组件的知识点。<strong>tips弹窗</strong>，几乎所有的框架或者类库，都会有弹窗这个组件，因为弹窗这个功能平时非常普遍，而且模块解耦度高！  </p>
<p>我们先来看下demo： 【 <a href="https://www.xiabingbao.com/demo/vue-component/vue-tips.html" rel="nofollow noreferrer" target="_blank">https://www.xiabingbao.com/demo/vue-component/vue-tips.html</a> 】。</p>
<h3 id="articleHeader0">1. 接口约定</h3>
<p>我们这里实现的弹窗，能用到的知识点有：props, event, slot, ref等。这里我们也能看到各个知识点是怎么运用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * modal 模态接口参数
 * @param {string} modal.title 模态框标题
 * @param {string} modal.text 模态框内容
 * @param {boolean} modal.showbtn 是否显示按钮
 * @param {string} modal.btnText 按钮文字
 */

 Vue.component('tips', {
    props : ['tipsOptions'],
    template : '#tips',

    data(){
        return{
            show : false
        }
    },

    computed:{
        tips : {
            get() {
                let tips = this.tipsOptions || {};
                tips = {
                    title: tips.title || '提示',
                    text: tips.text || '',
                    showbtn : tips.showbtn || true,
                    btnText : tips.btnText || '确定'
                };
                // console.log(tips);
                return tips;
            }
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * modal 模态接口参数
 * @param {string} modal.title 模态框标题
 * @param {string} modal.text 模态框内容
 * @param {boolean} modal.showbtn 是否显示按钮
 * @param {string} modal.btnText 按钮文字
 */</span>

 Vue.component(<span class="hljs-string">'tips'</span>, {
    <span class="hljs-attr">props</span> : [<span class="hljs-string">'tipsOptions'</span>],
    <span class="hljs-attr">template</span> : <span class="hljs-string">'#tips'</span>,

    data(){
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">show</span> : <span class="hljs-literal">false</span>
        }
    },

    <span class="hljs-attr">computed</span>:{
        <span class="hljs-attr">tips</span> : {
            get() {
                <span class="hljs-keyword">let</span> tips = <span class="hljs-keyword">this</span>.tipsOptions || {};
                tips = {
                    <span class="hljs-attr">title</span>: tips.title || <span class="hljs-string">'提示'</span>,
                    <span class="hljs-attr">text</span>: tips.text || <span class="hljs-string">''</span>,
                    <span class="hljs-attr">showbtn</span> : tips.showbtn || <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">btnText</span> : tips.btnText || <span class="hljs-string">'确定'</span>
                };
                <span class="hljs-comment">// console.log(tips);</span>
                <span class="hljs-keyword">return</span> tips;
            }
        }
    }
})</code></pre>
<h3 id="articleHeader1">2. modal组件的实现</h3>
<p>tips组件相对来说实现的比较简单，仅用作提示用户的简单弹层。  </p>
<p>模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;tips&quot; v-show=&quot;show&quot; transition=&quot;fade&quot;>
    <div class=&quot;tips-close&quot; @click=&quot;closeTips&quot;>x</div>
    <div class=&quot;tips-header&quot;>
        <slot name=&quot;header&quot;>
            <p class=&quot;title&quot;>"{{"tips.title"}}"</p>
        </slot>
    </div>
    <div class=&quot;tips-body&quot;>
        <slot name=&quot;body&quot;>
            <p class=&quot;notice&quot;>"{{"tips.text"}}"</p>
        </slot>
    </div>
    <div class=&quot;tips-footer&quot;>
        <a href=&quot;javascript:;&quot; v-if=&quot;tips.showbtn&quot; @click=&quot;yes&quot; >"{{"tips.btnText"}}"</a>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tips"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"show"</span> <span class="hljs-attr">transition</span>=<span class="hljs-string">"fade"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tips-close"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"closeTips"</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tips-header"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"header"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>"{{"tips.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tips-body"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"body"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"notice"</span>&gt;</span>"{{"tips.text"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tips-footer"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"tips.showbtn"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"yes"</span> &gt;</span>"{{"tips.btnText"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>模板中将结构分成了三部分，标题、内容和操作区域。这里既可以使用props传递字符串，也可以使用slot进行定制。  </p>
<p>tips样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".tips {
    position: fixed;
    left: 10px;
    bottom: 10px;
    z-index: 1001;
    -webkit-overflow-scrolling: touch;
    max-width: 690px;
    width: 260px;
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 10px #888;
    border-radius: 4px;
}
.tips-close{
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
}
.tips-header{
    text-align: center;
    font-size: 25px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.tips</span> {
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1001</span>;
    <span class="hljs-attribute">-webkit-overflow-scrolling</span>: touch;
    <span class="hljs-attribute">max-width</span>: <span class="hljs-number">690px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">260px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">#888</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
}
<span class="hljs-selector-class">.tips-close</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.tips-header</span>{
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">25px</span>;
}</code></pre>
<p>组件内的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
    closeTips(){
        this.show = false;
    },

    yes : function(){
        this.show = false;
        this.$emit('yes', {name:'wenzi', age:36}); // 触发yes事件
    },

    showTips(){
        var self = this;
        self.show = true;

        setTimeout(function(){
            // self.show = false;
        }, 2000)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">methods:{
    closeTips(){
        <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>;
    },

    <span class="hljs-attr">yes</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'yes'</span>, {<span class="hljs-attr">name</span>:<span class="hljs-string">'wenzi'</span>, <span class="hljs-attr">age</span>:<span class="hljs-number">36</span>}); <span class="hljs-comment">// 触发yes事件</span>
    },

    showTips(){
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        self.show = <span class="hljs-literal">true</span>;

        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-comment">// self.show = false;</span>
        }, <span class="hljs-number">2000</span>)
    }
}</code></pre>
<h3 id="articleHeader2">3. 调用tips组件</h3>
<p>首先我们开始渲染组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;app&quot;>
    <a href=&quot;javascript:;&quot; @click=&quot;showtips&quot;>显示</a>
    <tips :tips-options=&quot;tipsOptions&quot; ref=&quot;dialog&quot; @yes=&quot;yes&quot; v-cloak >
        <h3 slot=&quot;header&quot;>提示标题</h3>
        <div slot=&quot;body&quot;>
            <p>hello world</p>
            <p>wenzi</p>
        </div>
    </tips>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"showtips"</span>&gt;</span>显示<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tips</span> <span class="hljs-attr">:tips-options</span>=<span class="hljs-string">"tipsOptions"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"dialog"</span> @<span class="hljs-attr">yes</span>=<span class="hljs-string">"yes"</span> <span class="hljs-attr">v-cloak</span> &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"header"</span>&gt;</span>提示标题<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"body"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>wenzi<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tips</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>点击显示按钮后展示tips：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el : '.app',

    data : {
        tipsOptions : {
            title : 'tip'
        }
    }

    methods:{
        // 监听从组件内传递出来的事件
        yes(args){
            // console.log( args );
            alert( JSON.stringify(args) );
        },

        // 显示tips
        showtips(){
            // console.log( this.$refs );
            this.$refs.dialog.showTips();
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span> : <span class="hljs-string">'.app'</span>,

    <span class="hljs-attr">data</span> : {
        <span class="hljs-attr">tipsOptions</span> : {
            <span class="hljs-attr">title</span> : <span class="hljs-string">'tip'</span>
        }
    }

    methods:{
        <span class="hljs-comment">// 监听从组件内传递出来的事件</span>
        yes(args){
            <span class="hljs-comment">// console.log( args );</span>
            alert( <span class="hljs-built_in">JSON</span>.stringify(args) );
        },

        <span class="hljs-comment">// 显示tips</span>
        showtips(){
            <span class="hljs-comment">// console.log( this.$refs );</span>
            <span class="hljs-keyword">this</span>.$refs.dialog.showTips();
        }
    }
})</code></pre>
<h3 id="articleHeader3">4. 总结</h3>
<p>在这个简单的tips组件里，我们实现了用props传递参数，用$emit向外传递参数，用slot插槽来定制内容。</p>
<p>需要注意的是：组件props是单向绑定，即父组件的属性发生变化时，子组件能接收到相应的数据变化，但是反过来就会出错。即不能在子组件中修改props传过来的数据，来达到修改父组件属性的目的。这是为了防止子组件无意修改了父组件的状态。  </p>
<p>另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop。如果你这么做了，Vue 会在控制台给出警告。如果真的需要在子组件里进行修改，可以用这两种方法应对：  </p>
<p>定义一个局部变量，并用 prop 的值初始化它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">props: [<span class="hljs-string">'initialCounter'</span>],
<span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">counter</span>: <span class="hljs-keyword">this</span>.initialCounter }
}</code></pre>
<p>定义一个计算属性，处理 prop 的值并返回。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">props: [<span class="hljs-string">'size'</span>],
<span class="hljs-attr">computed</span>: {
  <span class="hljs-attr">normalizedSize</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.size.trim().toLowerCase()
  }
}</code></pre>
<p>当然，这只是单页面中组件的实现，更复杂的组件后续我们也会实现。</p>
<p>文章内容由蚊子的前端博客进行发布，或许你想看看他其他的文章呢： <a href="http://www.xiabingbao.com" rel="nofollow noreferrer" target="_blank">http://www.xiabingbao.com</a></p>
<p>原文地址： <a href="https://www.xiabingbao.com/vue/2017/09/14/vue-component-tips.html" rel="nofollow noreferrer" target="_blank">https://www.xiabingbao.com/vu...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue组件实现tips的总结

## 原文链接
[https://segmentfault.com/a/1190000011796898](https://segmentfault.com/a/1190000011796898)


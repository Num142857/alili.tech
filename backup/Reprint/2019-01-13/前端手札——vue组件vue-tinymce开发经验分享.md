---
title: '前端手札——vue组件vue-tinymce开发经验分享' 
date: 2019-01-13 2:30:11
hidden: true
slug: f23jce2vi1
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">唠叨</h1>
<p>最近公司在开发一个社交管理后台，看一遍线框图后发现需要富文本编辑器我便找会上两年开发的<a href="https://github.com/lpreterite/vue-tinymce" rel="nofollow noreferrer" target="_blank">vue-tinymce</a>组件，可惜的是组件支持还是vue1，所以这个组件需要升级支持vue2。然后有朋友问我为何不用现有的？因为看一圈回来发觉比较不靠谱的啊，全部都需要赋予id值（明明可以内部处理的为何要外部传入？），实在看不下去结果还是完善自己写的这个没多少收藏的库吧:)</p>
<h1 id="articleHeader1">关于 vue-tinymce</h1>
<p><a href="https://github.com/lpreterite/vue-tinymce" rel="nofollow noreferrer" target="_blank">vue-tinymce</a> 只是基于tinymce封装的vue组件，让用vue的同学能快速使用tinymce富文本编辑器。</p>
<h2 id="articleHeader2">过程</h2>
<h3 id="articleHeader3">从tinymce开始</h3>
<p>接下来分享一些开发过程中的一些问题，首先要学会<strong>初次化</strong>，我们先来看看tinymce的官方例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <script src=&quot;https://cloud.tinymce.com/stable/tinymce.min.js&quot;></script>
</head>
<body>
  <textarea>Next, get a free TinyMCE Cloud API key!</textarea>
  <script>
    tinymce.init({
        selector:'textarea'
        //or
        // target: document.querySelector('textarea')
    });
  </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cloud.tinymce.com/stable/tinymce.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>&gt;</span>Next, get a free TinyMCE Cloud API key!<span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    tinymce.init({
        selector:<span class="hljs-string">'textarea'</span>
        <span class="hljs-comment">//or</span>
        <span class="hljs-comment">// target: document.querySelector('textarea')</span>
    });
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>能看出tinymce需要引入全局才能使用，就没其他方式了？于是我找了一下<a href="https://www.npmjs.com/search?q=tinymce" rel="nofollow noreferrer" target="_blank">npmjs.org</a>有的有的，可以用import引入。</p>
<p>于是不用想立马写个例子试试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# index.html
<!DOCTYPE html>
<html>
<body>
  <textarea>Next, get a free TinyMCE Cloud API key!</textarea>
  <script src=&quot;dist/main.js&quot;></script>
</body>
</html>

# main.js
import tinymce form 'tinymce';
tinymce.init({
    selector:'textarea'
    //or
    // target: document.querySelector('textarea')
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"># index.html
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>&gt;</span>Next, get a free TinyMCE Cloud API key!<span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

# main.js
import tinymce form 'tinymce';
tinymce.init(</span><span class="hljs-template-variable">{
    selector:'textarea'
    //or
    // target: document.querySelector('textarea')
}</span><span class="xml">);</span></code></pre>
<p>结果发现tinymce是加载出来了，但是样式和图标那些没了...好吧不折腾还是直接引入吧目前来说问题不大。（看看其他库都是直接引入，我不折腾算是对了）</p>
<p>好了，第一步完成了，接下来第二步是<strong>获得/设定富文本内容</strong>，来看看以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# main.js
tinymce.init({
    selector: 'textarea',
    // 获得editor，当有多个textarea实例时会多次调用setup
    setup: (editor)=> {
        // 初次化编辑器
        editor.on('init', ()=>{
            // 设置默认值
            editor.setContent('<p>Default Value!</p>');
            // 注册事件
            editor.on('input change undo redo', ()=>{
                // 获得编辑结果
                console.log(editor.getContent());
            });
        });
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-comment"># main.js</span>
tinymce.init({
    selector: <span class="hljs-string">'textarea'</span>,
    <span class="hljs-regexp">//</span> 获得editor，当有多个textarea实例时会多次调用setup
    setup: <span class="hljs-function"><span class="hljs-params">(editor)</span>=&gt;</span> {
        <span class="hljs-regexp">//</span> 初次化编辑器
        editor.<span class="hljs-literal">on</span>(<span class="hljs-string">'init'</span>, <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-regexp">//</span> 设置默认值
            editor.setContent(<span class="hljs-string">'&lt;p&gt;Default Value!&lt;/p&gt;'</span>);
            <span class="hljs-regexp">//</span> 注册事件
            editor.<span class="hljs-literal">on</span>(<span class="hljs-string">'input change undo redo'</span>, <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                <span class="hljs-regexp">//</span> 获得编辑结果
                <span class="hljs-built_in">console</span>.log(editor.getContent());
            });
        });
    }
})</code></pre>
<p>上面这段是已总结怎样获得或设置富文本内容，tinymce知道怎样用就能开始写vue组件。</p>
<h3 id="articleHeader4">需要怎样的vue组件</h3>
<p>作为组件配置当然可以自己设定的固需要<code>setting</code>的传入，可能也需要在初次化动手再自定义一些功能所以加上<code>setup</code>，再来是获得<code>editor</code>进行处理一些富文本数据。起步代码是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <textarea :id=&quot;id&quot;></textarea>
</template>
<script>
export default {
    props: ['setting','setup', 'value'],
    data(){ return {id:'tinymce', editor:null}; }
    mounted(){
        const setting = {
            ...this.setting,
            {
                selector: `#${this.id}`,
                setup: (editor)=> {
                    this.setup(editor);
                    this.editor = editor;
                    editor.on('init', ()=>{
                        editor.setContent(this.value);
                        editor.on('input change undo redo', ()=>{
                            this.value = editor.getContent();
                        });
                    });
                }
            }
        };
        tinymce.init(setting);
    },
    beforeDestroy: function(){
        tinymce.remove(this.id);
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">:id</span>=<span class="hljs-string">"id"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'setting'</span>,<span class="hljs-string">'setup'</span>, <span class="hljs-string">'value'</span>],
    data(){ <span class="hljs-keyword">return</span> {<span class="hljs-attr">id</span>:<span class="hljs-string">'tinymce'</span>, <span class="hljs-attr">editor</span>:<span class="hljs-literal">null</span>}; }
    mounted(){
        <span class="hljs-keyword">const</span> setting = {
            ...this.setting,
            {
                <span class="hljs-attr">selector</span>: <span class="hljs-string">`#<span class="hljs-subst">${<span class="hljs-keyword">this</span>.id}</span>`</span>,
                <span class="hljs-attr">setup</span>: <span class="hljs-function">(<span class="hljs-params">editor</span>)=&gt;</span> {
                    <span class="hljs-keyword">this</span>.setup(editor);
                    <span class="hljs-keyword">this</span>.editor = editor;
                    editor.on(<span class="hljs-string">'init'</span>, ()=&gt;{
                        editor.setContent(<span class="hljs-keyword">this</span>.value);
                        editor.on(<span class="hljs-string">'input change undo redo'</span>, ()=&gt;{
                            <span class="hljs-keyword">this</span>.value = editor.getContent();
                        });
                    });
                }
            }
        };
        tinymce.init(setting);
    },
    <span class="hljs-attr">beforeDestroy</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        tinymce.remove(<span class="hljs-keyword">this</span>.id);
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>自管理id</h4>
<p>对比其他vue-tinymce组件都要传入id我感到很不解，因为根本没这个必要，所以接下来先解决id自管理问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    ...
    // 这里我用render写在template绑定:id一样可以
    render(createElement){
        return createElement('textarea', {
            attrs: {
                id: this.id
            }
        });
    },
    data(){
        return {
            //生成id
            id: 'vue-tinymce-'+Date.now(),
        }
    }
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>export <span class="hljs-keyword">default</span> {
    ...
    <span class="hljs-comment">// 这里我用render写在template绑定:id一样可以</span>
    render(createElement){
        <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'textarea'</span>, {
            attrs: {
                id: <span class="hljs-keyword">this</span>.id
            }
        });
    },
    <span class="hljs-keyword">data</span>(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-comment">//生成id</span>
            id: <span class="hljs-string">'vue-tinymce-'</span>+Date.now(),
        }
    }
    ...
}</code></pre>
<h4>支持v-model双向绑定</h4>
<p>这个简单，只要传入字段(<code>props</code>)包含<code>value</code>，使用<code>v-model</code>就能从<code>value</code>获得绑定数据，然后当富文本编辑器数据跟新时使用<code>$emit('input', value)</code>方法便能通知变化跟新value。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    ...
    watch:{
        value(val){
            // 当传入值变化时跟新富文本内容
            tinymce.get(this.id).setContent(val);
        }
    },
    mounted(){
        const setting = {
            ...this.setting,
            {
                selector: `#${this.id}`,
                setup: (editor)=> {
                    this.setup(editor);
                    this.editor = editor;
                    editor.on('init', ()=>{
                        editor.setContent(this.value);
                        editor.on('input change undo redo', ()=>{
                            this.$emit('input', editor.getContent());
                        });
                    });
                }
            }
        };
        tinymce.init(setting);
    }
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    ...
    watch:{
        value(val){
            <span class="hljs-regexp">//</span> 当传入值变化时跟新富文本内容
            tinymce.get(<span class="hljs-keyword">this</span>.id).setContent(val);
        }
    },
    mounted(){
        const setting = {
            ...<span class="hljs-keyword">this</span>.setting,
            {
                selector: `<span class="javascript">#${<span class="hljs-keyword">this</span>.id}</span>`,
                setup: <span class="hljs-function"><span class="hljs-params">(editor)</span>=&gt;</span> {
                    <span class="hljs-keyword">this</span>.setup(editor);
                    <span class="hljs-keyword">this</span>.editor = editor;
                    editor.<span class="hljs-literal">on</span>(<span class="hljs-string">'init'</span>, <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                        editor.setContent(<span class="hljs-keyword">this</span>.value);
                        editor.<span class="hljs-literal">on</span>(<span class="hljs-string">'input change undo redo'</span>, <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, editor.getContent());
                        });
                    });
                }
            }
        };
        tinymce.init(setting);
    }
    ...
}</code></pre>
<p>到这里将近完成了，可惜这次问题静静地出现了：输入一个字光标就刷到最前面。接下来得解决这问题，思路我猜应该是editor的input事件触发<code>$emit('input')</code>然后进入watch调用了<code>editor.setContent()</code>方法后导致光标更新，这里解决办法是当前编辑不让触发<code>editor.seContent()</code>就不会导致光标更新（当然还有其他方法，比如记录光标位置）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const INIT = 0;
const INPUT = 1;
const CHANGED = 2;

export default {
    ...
    watch:{
        value(val){
            // 只在外部引起变化时才跟新编辑器
            if(this.status === CHANGED || this.status === INIT) return this.status = INPUT;
            tinymce.get(this.id).setContent(val);
        }
    },
    mounted(){
        const setting = {
            ...this.setting,
            {
                selector: `#${this.id}`,
                setup: (editor)=> {
                    this.setup(editor);
                    this.editor = editor;
                    editor.on('init', ()=>{
                        editor.setContent(this.value);
                        editor.on('input change undo redo', ()=>{
                            // 只在用户输入导致事件相应时才更新value数据
                            if(this.status === INPUT || this.status === INIT) return this.status = CHANGED;
                            this.$emit('input', editor.getContent());
                        });
                    });
                }
            }
        };
        tinymce.init(setting);
    }
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>const INIT = <span class="hljs-number">0</span>;
const INPUT = <span class="hljs-number">1</span>;
const CHANGED = <span class="hljs-number">2</span>;

export <span class="hljs-keyword">default</span> {
    ...
    watch:{
        value(<span class="hljs-keyword">val</span>){
            <span class="hljs-comment">// 只在外部引起变化时才跟新编辑器</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status === CHANGED || <span class="hljs-keyword">this</span>.status === INIT) <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.status = INPUT;
            tinymce.<span class="hljs-keyword">get</span>(<span class="hljs-keyword">this</span>.id).setContent(<span class="hljs-keyword">val</span>);
        }
    },
    mounted(){
        const setting = {
            ...<span class="hljs-keyword">this</span>.setting,
            {
                selector: `#${<span class="hljs-keyword">this</span>.id}`,
                setup: (editor)=&gt; {
                    <span class="hljs-keyword">this</span>.setup(editor);
                    <span class="hljs-keyword">this</span>.editor = editor;
                    editor.on(<span class="hljs-string">'init'</span>, ()=&gt;{
                        editor.setContent(<span class="hljs-keyword">this</span>.value);
                        editor.on(<span class="hljs-string">'input change undo redo'</span>, ()=&gt;{
                            <span class="hljs-comment">// 只在用户输入导致事件相应时才更新value数据</span>
                            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status === INPUT || <span class="hljs-keyword">this</span>.status === INIT) <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.status = CHANGED;
                            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, editor.getContent());
                        });
                    });
                }
            }
        };
        tinymce.init(setting);
    }
    ...
}</code></pre>
<p>当value从外部更新时才更新编辑器内容，编辑器触发的内容更新并不需要绕一圈回来再更新编辑器，这样便能解决光标问题。</p>
<h2 id="articleHeader5">结果</h2>
<p>就在这<a href="https://github.com/lpreterite/vue-tinymce" rel="nofollow noreferrer" target="_blank">vue-tinymce</a>，一些细节不补充，建议看源码。以下是使用方法：</p>
<h3 id="articleHeader6">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i -D lpreterite/vue-tinymce" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-selector-tag">i</span> -D lpreterite/vue-tinymce</code></pre>
<h3 id="articleHeader7">使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# index.html
<div id=&quot;app&quot;>
  <vue-tinymce
    ref=&quot;tinymce&quot;
    v-model=&quot;content&quot;
    :setting=&quot;setting&quot;>
  </vue-tinymce>
</div>
<!-- in last -->
<script src=&quot;node_modules/tinymce/tinymce.min.js&quot;></script>

# main.js
import Vue from 'vue';
import VueTinymce from 'vue-tinymce.vue';

new Vue({
    el: '#app',
    data: function(){
        return {
            content: '<p>html content</p>',
            setting: {
                height: 200,
                language_url: &quot;langs/zh_CN.js&quot;,
                block_formats: &quot;Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;&quot;
            }
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code># index.html
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">vue-tinymce</span>
    <span class="hljs-attr">ref</span>=<span class="hljs-string">"tinymce"</span>
    <span class="hljs-attr">v-model</span>=<span class="hljs-string">"content"</span>
    <span class="hljs-attr">:setting</span>=<span class="hljs-string">"setting"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">vue-tinymce</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- in last --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"node_modules/tinymce/tinymce.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

# main.js
import Vue from 'vue';
import VueTinymce from 'vue-tinymce.vue';

new Vue({
    el: '#app',
    data: function(){
        return {
            content: '<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>html content<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>',
            setting: {
                height: 200,
                language_url: "langs/zh_CN.js",
                block_formats: "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;"
            }
        }
    }
})</code></pre>
<p>目录结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dist/
- index.html
- main.js
- lang/
    -zh_CN.js
node_modules/
- tinymce/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>dist/
-<span class="ruby"> index.html
</span>-<span class="ruby"> main.js
</span>-<span class="ruby"> lang/
</span>    -<span class="ruby">zh_CN.js
</span>node_modules/
-<span class="ruby"> tinymce/</span></code></pre>
<h1 id="articleHeader8">遇到的问题</h1>
<p>刚开始想写vue2组件我跑了一圈github也没发现比较好的例子，构建工具及配置直接能用的并没有，参考的倒是找到一些。webpack配置算是个麻烦事，想尽量简化工作就得动动脑子。</p>
<p><a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a>是个好东西，能帮你快速创建项目，如想创建vue的单页项目可以这样使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ vue init webpack-simple my-product" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">$ vue init webpack-simple <span class="hljs-keyword">my</span>-product</code></pre>
<p>可是没见到有快速创建vue组件的项目，所以这里我写了一个<a href="https://github.com/lpreterite/vue-component-project" rel="nofollow noreferrer" target="_blank">lpreterite/vue-component-project</a>提供给大家使用。</p>
<p>使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ vue init lpreterite/vue-component-project my-vue-component
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code>$ vue init lpreterite/vue-<span class="hljs-keyword">component</span>-project my-vue-<span class="hljs-keyword">component</span>
</code></pre>
<p>一路回车之后会提示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   vue-cli · Generated &quot;my-vue-component&quot;.

   To get started:
   
     cd my-vue-component
     npm install
     npm run dev 
     npm run hot." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>   vue-cli · Generated <span class="hljs-string">"my-vue-component"</span>.

   To get started:
   
     cd my-vue-component
     npm install
     npm <span class="hljs-keyword">run</span><span class="bash"> dev 
</span>     npm <span class="hljs-keyword">run</span><span class="bash"> hot.</span></code></pre>
<p>项目就这样创建好来?，剩下交给你们发挥。</p>
<p>这遍文章算是把手上这个大项目的副产品吧 :) 。希望日后有点时间继续分享其他在经验及一些大项目下的组件，欢迎评论和PR！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端手札——vue组件vue-tinymce开发经验分享

## 原文链接
[https://segmentfault.com/a/1190000009621081](https://segmentfault.com/a/1190000009621081)


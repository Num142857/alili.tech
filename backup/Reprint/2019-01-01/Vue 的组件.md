---
title: 'Vue 的组件' 
date: 2019-01-01 2:30:07
hidden: true
slug: 18trd6u4vd6
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">组件</h1>
<blockquote><p>上一篇：Vue的表单输入绑定：<a href="https://segmentfault.com/a/1190000011008313">https://segmentfault.com/a/11...</a></p></blockquote>
<h2 id="articleHeader1">使用组件</h2>
<h3 id="articleHeader2">注册组件</h3>
<p>首先我们要创建一个实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el:'.exp',
    // ......
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">'.exp'</span>,
    <span class="hljs-comment">// ......</span>
})</code></pre>
<p>要注册一个全局组件，你可以使用 Vue.component(tagName, options)。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-component', {
  // 选项
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'my-component'</span>, {
  <span class="hljs-comment">// 选项</span>
})</code></pre>
<p>组件在注册之后，便可以在父实例的模块中以自定义元素 &lt; my-component &gt;&lt; /my-component &gt; 的形式使用。要确保在初始化根实例之前注册了组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;exp&quot;>
    <my-component></my-componetn>
</div>
<script>
    Vue.component('my-component',{
        template:'<div>这是一个组件</div>'
    })
    new Vue({
        el:'.exp',
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"exp"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-componetn</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'my-component'</span>,{
        template:<span class="hljs-string">'&lt;div&gt;这是一个组件&lt;/div&gt;'</span>
    })
    <span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">'.exp'</span>,
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>渲染结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;exp&quot;>
    <div>这是一个组件</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"exp"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>这是一个组件<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<blockquote><p>对于自定义标签名，Vue.js 不强制要求遵循 W3C 规则 (小写，并且包含一个短杠)，尽管遵循这个规则比较好。</p></blockquote>
<p>我们知道，在创建的实例里面是有data数据的，其实在组件里也可以写数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-component'{
    templent:'<div><input type=&quot;button&quot;></div>',
    data:function(){
        return{
            msg:'hello'
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'my-component'</span>{
    <span class="hljs-attr">templent</span>:<span class="hljs-string">'&lt;div&gt;&lt;input type="button"&gt;&lt;/div&gt;'</span>,
    <span class="hljs-attr">data</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">msg</span>:<span class="hljs-string">'hello'</span>
        }
    }
})</code></pre>
<p>注意！组件里的data必须是一个函数，并将属性返回</p>
<h3 id="articleHeader3">局部注册</h3>
<p>不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;exp&quot;>
    <my-component></my-component>
</div>
<script>
    var child={
        template:'<div>这是一个局部组件</div>'
    }
    new Vue({
        el:'.exp',
        components:{
            'my-component':child
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"exp"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> child={
        template:<span class="hljs-string">'&lt;div&gt;这是一个局部组件&lt;/div&gt;'</span>
    }
    <span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">'.exp'</span>,
        components:{
            <span class="hljs-string">'my-component'</span>:child
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>渲染结果和上一个例子是一样的。</p>
<p>我们来看看全局注册和局部注册的区别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;exp&quot;>
    <my-component></my-component>
</div>
<div class=&quot;exp1&quot;>
    <first></first>
</div>
<script>
    //全局注册
    Vue.component('my-component',{
        template:'<div>这是一个全局组件</div>'
    });
    new Vue({
        el:'.exp',
    });

    // 局部注册
    var child={
        template:'<div>这是一个局部组件</div>'
    };
    new Vue({
        el:'.exp1',
        components:{
            'first':child
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"exp"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"exp1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">first</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">first</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-comment">//全局注册</span>
    Vue.component(<span class="hljs-string">'my-component'</span>,{
        template:<span class="hljs-string">'&lt;div&gt;这是一个全局组件&lt;/div&gt;'</span>
    });
    <span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">'.exp'</span>,
    });

    <span class="hljs-comment">// 局部注册</span>
    <span class="hljs-keyword">var</span> child={
        template:<span class="hljs-string">'&lt;div&gt;这是一个局部组件&lt;/div&gt;'</span>
    };
    <span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">'.exp1'</span>,
        components:{
            <span class="hljs-string">'first'</span>:child
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>局部注册的组件，只能在 .exp1 内使用，拿给 .exp 是不可以的，当然我们把全局注册的组件给 .exp1 ，是可以生效的。</p>
<h3 id="articleHeader4">DOM 模板解析说明</h3>
<p>当使用 DOM 作为模板时 (例如，将 el 选项挂载到一个已存在的元素上), 你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模板内容。尤其像这些元素 &lt; ul &gt;，&lt; ol &gt;，&lt; table &gt;，&lt; select &gt; 限制了能被它包裹的元素，而一些像 &lt; option &gt; 这样的元素只能出现在某些其它元素内部。</p>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;exp&quot;>
    <table>
        <my-component></my-component>
    </table>
    
</div>

<script>
    Vue.component('my-component',{
        template:'<tr><td>1</td><td>2</td></tr>'
    });
    new Vue({
        el:'.exp',
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"exp"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
    Vue.component('my-component',{
        template:'<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>'
    });
    new Vue({
        el:'.exp',
    });
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>如上，这样的写法在DOM里渲染时会反正错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tr>...</tr>
<table></table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p>为了解决，就需要使用 is 属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
    <tr is=&quot;my-component&quot;></tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"my-component"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<h3 id="articleHeader5">模板字符串</h3>
<p>有时候我们可能要在组件里写很多的标签，如果统统像上面那样写的话，看起来很费劲，这时候就可以使用模板字符串：</p>
<blockquote><p>&lt; script type="text/x-template" &gt;&lt; /script &gt;</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;exp&quot;>
    <table>
        <tr is=&quot;my-component&quot;></tr>
    </table>
    
</div>
<!-- 模板字符串 -->
<script type=&quot;text/x-templent&quot; id=&quot;tmp&quot;>
    <tr>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>3</td>
    </tr>
</script>
<script>
    Vue.component('my-component',{
        template:'#tmp'//调用模板字符串的 id 
    });
    new Vue({
        el:'.exp',
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"exp"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"my-component"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 模板字符串 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/x-templent"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tmp"</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'my-component'</span>,{
        template:<span class="hljs-string">'#tmp'</span><span class="hljs-comment">//调用模板字符串的 id </span>
    });
    <span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">'.exp'</span>,
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这样写的话就比较直观了。</p>
<h2 id="articleHeader6">Prop</h2>
<h3 id="articleHeader7">使用 prop 传递数据</h3>
<p>组件实例的作用域是孤立的。这意味着不能 (也不应该) 在子组件的模板内直接引用父组件的数据。要让子组件使用父组件的数据，我们需要通过子组件的 props 选项。</p>
<p>子组件要显式地用 props 选项声明它期待获得的数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;exp&quot;>
    <tk msg=&quot;hello&quot;></tk>
</div>
<script type=&quot;text/x-templent&quot; id=&quot;tmp&quot;>
    <div>
        <input type=&quot;button&quot; v-on:click=&quot;alertMsg&quot; value=&quot;弹框&quot;>
    </div>
</script>
<script>
    var tkTmp={
        template:&quot;#tmp&quot;,
        //声明props
        props:['msg'],
        methods:{
            alertMsg:function(){
                alert(this.msg)
            }
        }
    };
    new Vue({
        el:'.exp',
        components:{
            'tk':tkTmp
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"exp"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tk</span> <span class="hljs-attr">msg</span>=<span class="hljs-string">"hello"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tk</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/x-templent"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tmp"</span>&gt;</span><span class="javascript">
    &lt;div&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"alertMsg"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"弹框"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> tkTmp={
        template:<span class="hljs-string">"#tmp"</span>,
        <span class="hljs-comment">//声明props</span>
        props:[<span class="hljs-string">'msg'</span>],
        methods:{
            alertMsg:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                alert(<span class="hljs-keyword">this</span>.msg)
            }
        }
    };
    <span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">'.exp'</span>,
        components:{
            <span class="hljs-string">'tk'</span>:tkTmp
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在上面的例子中，我们要在子组件 tk 里传一个参数，就需要使用 prop 属性.</p>
<p>这种方式是静态绑定的方法，还有就是利用 v-bind 指令进行动态绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tk v-bind:msg=&quot;msg&quot;></tk>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">tk</span> <span class="hljs-attr">v-bind:msg</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tk</span>&gt;</span></code></pre>
<h3 id="articleHeader8">驼峰式命名和短横线隔开式命名</h3>
<p>HTML 特性是不区分大小写的。所以，当使用的不是字符串模板，camelCased (驼峰式) 命名的 prop 需要转换为相对应的 kebab-case (短横线隔开式) 命名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  template: '<span>"{{" myMessage "}}"</span>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ue.component(<span class="hljs-string">'child'</span>, {
  <span class="hljs-comment">// camelCase in JavaScript</span>
  props: [<span class="hljs-string">'myMessage'</span>],
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;span&gt;"{{" myMessage "}}"&lt;/span&gt;'</span>
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- kebab-case in HTML -->
<child my-message=&quot;hello!&quot;></child>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- kebab-case in HTML --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">my-message</span>=<span class="hljs-string">"hello!"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span></code></pre>
<h2 id="articleHeader9">自定义事件</h2>
<h3 id="articleHeader10">使用 v-on 绑定自定义事件</h3>
<p>每个 Vue 实例都实现了事件接口 (Events interface)，即：</p>
<ul>
<li><p>$on(enentName) 监听事件</p></li>
<li><p>$emit(eventName) 触发事件</p></li>
</ul>
<p>我们可以使用 $emit 来用子组件触发父组件的事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;exp&quot;>
    <tk v-bind:msg=&quot;msg&quot;></tk>
    <tk msg=&quot;HELLO WORDL&quot; v-on:jieshou=&quot;jieshoufn&quot;></tk>
</div>
<script type=&quot;text/x-templent&quot; id=&quot;tmp&quot;>
    <div>
        <input type=&quot;button&quot; v-on:click=&quot;alertMsg&quot; value=&quot;弹框&quot;>
    </div>
</script>
<script>
    var tkTmp={
        template:&quot;#tmp&quot;,
        props:['msg'],
        methods:{
            alertMsg:function(){
                alert(this.msg),
                this.$emit(&quot;jieshou&quot;,&quot;abc&quot;,&quot;def&quot;)
            }
        }
    };

    new Vue({
        el:'.exp',
        data:{
            msg:'hello'
        },
        components:{
            'tk':tkTmp
        },
        methods:{
            jieshoufn:function(){
                alert(2);
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"exp"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tk</span> <span class="hljs-attr">v-bind:msg</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tk</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tk</span> <span class="hljs-attr">msg</span>=<span class="hljs-string">"HELLO WORDL"</span> <span class="hljs-attr">v-on:jieshou</span>=<span class="hljs-string">"jieshoufn"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tk</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/x-templent"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tmp"</span>&gt;</span><span class="javascript">
    &lt;div&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"alertMsg"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"弹框"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> tkTmp={
        template:<span class="hljs-string">"#tmp"</span>,
        props:[<span class="hljs-string">'msg'</span>],
        methods:{
            alertMsg:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                alert(<span class="hljs-keyword">this</span>.msg),
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">"jieshou"</span>,<span class="hljs-string">"abc"</span>,<span class="hljs-string">"def"</span>)
            }
        }
    };

    <span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">'.exp'</span>,
        data:{
            msg:<span class="hljs-string">'hello'</span>
        },
        components:{
            <span class="hljs-string">'tk'</span>:tkTmp
        },
        methods:{
            jieshoufn:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                alert(<span class="hljs-number">2</span>);
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当我们点击第二个按钮时，就会触发父组件内的 alert 事件。</p>
<p>其实我们也可以传递参数，由父组件接收：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" this.$emit(&quot;jieshou&quot;,&quot;abc&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">"jieshou"</span>,<span class="hljs-string">"abc"</span>)</code></pre>
<h3 id="articleHeader11">非父子组件通讯</h3>
<p>有时候两个组件也需要通信 (非父子关系)。在简单的场景下，可以使用一个空的 Vue 实例作为中央事件总线：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;exp&quot;>
    <tk></tk>
    <pop></pop>
</div>
<script type=&quot;text/x-templent&quot; id=&quot;tmp&quot;>
    <div>
        <input type=&quot;button&quot; v-on:click=&quot;alertMsg&quot; value=&quot;弹框&quot;>
    </div>
</script>
<script>
    var bus=new Vue();//空的 vue 实例

    var tkTmp={
        template:&quot;#tmp&quot;,
        methods:{
            alertMsg:function(){
                bus.$emit(&quot;pass&quot;,1,2)//触发事件
            }
        }
    };
    var pop={
        template:'<div>2333</div>',
        mounted:function(){
            bus.$on(&quot;pass&quot;,function(arg1,arg2){//监听事件
                console.log(arg1)
                console.log(arg2)
            })
        }
    }
    new Vue({
        el:'.exp',
        components:{
            'tk':tkTmp,
            'pop':pop
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"exp"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tk</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tk</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">pop</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pop</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/x-templent"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tmp"</span>&gt;</span><span class="javascript">
    &lt;div&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"alertMsg"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"弹框"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> bus=<span class="hljs-keyword">new</span> Vue();<span class="hljs-comment">//空的 vue 实例</span>

    <span class="hljs-keyword">var</span> tkTmp={
        <span class="hljs-attr">template</span>:<span class="hljs-string">"#tmp"</span>,
        <span class="hljs-attr">methods</span>:{
            <span class="hljs-attr">alertMsg</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                bus.$emit(<span class="hljs-string">"pass"</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>)<span class="hljs-comment">//触发事件</span>
            }
        }
    };
    <span class="hljs-keyword">var</span> pop={
        <span class="hljs-attr">template</span>:<span class="hljs-string">'&lt;div&gt;2333&lt;/div&gt;'</span>,
        <span class="hljs-attr">mounted</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            bus.$on(<span class="hljs-string">"pass"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg1,arg2</span>)</span>{<span class="hljs-comment">//监听事件</span>
                <span class="hljs-built_in">console</span>.log(arg1)
                <span class="hljs-built_in">console</span>.log(arg2)
            })
        }
    }
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>:<span class="hljs-string">'.exp'</span>,
        <span class="hljs-attr">components</span>:{
            <span class="hljs-string">'tk'</span>:tkTmp,
            <span class="hljs-string">'pop'</span>:pop
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader12">使用 Slot 分发内容</h2>
<p>这部分官方文档说的有点啰嗦，我这边就合到一块说吧。直接上个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style>
        .box{
            margin: 10px;
            width: 150px;
            border: 1px solid #ccc;
        }
        .box-header, .box-footer{
            height: 30px;
            background: sandybrown;
        }
        .box-body{
            min-height: 100px;
        }
    </style>
<body>
    <div class=&quot;exp&quot;>
        <box>
            <h2 slot=&quot;title&quot;>Slot内容分发<h2>
            <p>为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为 内容分发 (或 “transclusion” 如果你熟悉 Angular)。Vue.js 实现了一个内容分发 API，参照了当前 Web 组件规范草案，使用特殊的 <slot> 元素作为原始内容的插槽。</p>
            <p slot=&quot;foot&quot;>分发完成</p>
        </box>
    </div>

    <script type=&quot;text/x-template&quot; id=&quot;tmp&quot;>
        <div class=&quot;box&quot;>
            <div class=&quot;box-header&quot;><slot name=&quot;title&quot;></slot></div>
            <div class=&quot;box-body&quot;>
                <slot></slot>
            </div>
            <div class=&quot;box-footer&quot;><slot name=&quot;foot&quot;></slot>
            </div>
        </div>
    </script>
    <script>
        var box={
            template:&quot;#tmp&quot;,
        }

        new Vue({
            el:'.exp',
            components:{
                &quot;bilibili&quot;:box
            }
        })
    </script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.box</span>{
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
        }
        <span class="hljs-selector-class">.box-header</span>, <span class="hljs-selector-class">.box-footer</span>{
            <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
            <span class="hljs-attribute">background</span>: sandybrown;
        }
        <span class="hljs-selector-class">.box-body</span>{
            <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100px</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"exp"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">box</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>Slot内容分发<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为 内容分发 (或 “transclusion” 如果你熟悉 Angular)。Vue.js 实现了一个内容分发 API，参照了当前 Web 组件规范草案，使用特殊的 <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span> 元素作为原始内容的插槽。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"foot"</span>&gt;</span>分发完成<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">box</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/x-template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tmp"</span>&gt;</span><span class="handlebars"><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box-header"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box-body"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box-footer"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"foot"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">var</span> box={
            template:<span class="hljs-string">"#tmp"</span>,
        }

        <span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">'.exp'</span>,
            components:{
                <span class="hljs-string">"bilibili"</span>:box
            }
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>&lt; slot &gt;被成为插口，在组件中，我们需要使用 slot 插口预留一个位置，以方便分发内容。如上，在放置正文内容的地方，我们直接插入一对 slot 标签标记出正文内容的位置。对于页面标题和页脚等特殊的位置，我们就需要"具名Slot"，用一个特殊的属性 name 来配置如何分发内容。多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 slot 特性的元素。</p>
<h1 id="articleHeader13">To be continue......</h1>
<blockquote><p>上一篇：Vue的表单输入绑定：<a href="https://segmentfault.com/a/1190000011008313" target="_blank">https://segmentfault.com/a/11...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 的组件

## 原文链接
[https://segmentfault.com/a/1190000011010991](https://segmentfault.com/a/1190000011010991)


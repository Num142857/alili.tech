---
title: 你或许不知道Vue的这些小技巧
reprint: true
categories: reprint
abbrlink: d4881399
date: 2018-10-23 00:00:00
---

{{% raw %}}

                    
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015157249?w=950&amp;h=633" src="https://static.alili.tech/img/remote/1460000015157249?w=950&amp;h=633" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前言</h2>
<p>前天发过这篇，但是在segmentfault不知道为什么，帖子被隐藏了，没有在我的专栏里面，我在发一遍在自己的专栏里面，看过的小伙伴可以跳过~</p>
<p>用Vue开发一个网页并不难，但是也经常会遇到一些问题，其实大部分的问题都在文档中有所提及，再不然我们通过谷歌也能成功搜索到问题的答案，为了帮助小伙伴们提前踩坑，在遇到问题的时候，心里大概有个谱知道该如何去解决问题。这篇文章是将自己知道的一些小技巧，结合查阅资料整理成的一篇文章，如果喜欢的话可以点波赞/关注，支持一下，希望大家看完本文可以有所收获。</p>
<blockquote>个人博客了解一下：<a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">obkoro1.com</a>
</blockquote>
<hr>
<h2 id="articleHeader1">文章内容总结:</h2>
<ol>
<li>组件style的scoped</li>
<li>Vue 数组/对象更新 视图不更新</li>
<li>vue filters 过滤器的使用</li>
<li>列表渲染相关</li>
<li>深度watch与watch立即触发回调</li>
<li>这些情况下不要使用箭头函数</li>
<li>路由懒加载写法</li>
<li>路由的项目启动页和404页面</li>
<li>Vue调试神器:vue-devtools</li>
</ol>
<hr>
<h3 id="articleHeader2">组件style的scoped:</h3>
<p>问题：在组件中用js动态创建的dom，添加样式不生效。</p>
<p><strong>场景</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <template>
         <div class=&quot;test&quot;></div>
    </template>
    <script>
        let a=document.querySelector('.test');
        let newDom=document.createElement(&quot;div&quot;); // 创建dom
        newDom.setAttribute(&quot;class&quot;,&quot;testAdd&quot; ); // 添加样式
        a.appendChild(newDom); // 插入dom
    </script>
    <style scoped>
    .test{
       background:blue;
        height:100px;
        width:100px;
    }
    .testAdd{
        background:red;
        height:100px;
        width:100px;
    }
    </style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">let</span> a=<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.test'</span>);
        <span class="hljs-keyword">let</span> newDom=<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>); <span class="hljs-comment">// 创建dom</span>
        newDom.setAttribute(<span class="hljs-string">"class"</span>,<span class="hljs-string">"testAdd"</span> ); <span class="hljs-comment">// 添加样式</span>
        a.appendChild(newDom); <span class="hljs-comment">// 插入dom</span>
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.test</span>{
       <span class="hljs-attribute">background</span>:blue;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    }
    <span class="hljs-selector-class">.testAdd</span>{
        <span class="hljs-attribute">background</span>:red;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p><strong>结果</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// test生效   testAdd 不生效
<div data-v-1b971ada class=&quot;test&quot;><div class=&quot;testAdd&quot;></div></div>
.test[data-v-1b971ada]{ // 注意data-v-1b971ada
    background:blue;
    height:100px;
    width:100px;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// test生效   testAdd 不生效</span>
&lt;<span class="hljs-selector-tag">div</span> data-v-<span class="hljs-number">1</span>b971ada class=<span class="hljs-string">"test"</span>&gt;&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"testAdd"</span>&gt;&lt;/div&gt;&lt;/div&gt;
<span class="hljs-selector-class">.test</span>[data-v-<span class="hljs-number">1</span>b971ada]{ <span class="hljs-comment">// 注意data-v-1b971ada</span>
    <span class="hljs-attribute">background</span>:blue;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
}
</code></pre>
<p><strong>原因</strong>:</p>
<p>当 <code>&lt;style&gt;</code> 标签有 <a href="https://vue-loader-v14.vuejs.org/zh-cn/features/scoped-css.html" rel="nofollow noreferrer" target="_blank">scoped</a> 属性时，它的 CSS 只作用于当前组件中的元素。</p>
<p>它会<strong>为组件中所有的标签和class样式添加一个<code>scoped</code>标识</strong>，就像上面结果中的<code>data-v-1b971ada</code>。</p>
<p>所以原因就很清楚了：因为动态添加的dom没有<code>scoped</code>添加的标识，<strong>没有跟<code>testAdd</code>的样式匹配起来</strong>，导致样式失效。</p>
<p><strong>解决方式</strong></p>
<ul><li>推荐：去掉该组件的scoped</li></ul>
<p>每个组件的css并不会很多，当设计到动态添加dom，并为dom添加样式的时候，就可以去掉scoped，会比下面的方法方便很多。</p>
<ul><li>可以动态添加style<p>// 上面的栗子可以这样添加样式<br>newDom.style.height='100px';<br>newDom.style.width='100px';<br>newDom.style.background='red';</p>
</li></ul>
<hr>
<h3 id="articleHeader3">Vue 数组/对象更新 视图不更新</h3>
<p>很多时候，我们习惯于这样操作数组和对象:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     data() { // data数据
        return {
          arr: [1,2,3],
          obj:{
              a: 1,
              b: 2
          }
        };
      },
   // 数据更新 数组视图不更新
    this.arr[0] = 'OBKoro1';
    this.arr.length = 1;
    console.log(arr);// ['OBKoro1'];
    // 数据更新 对象视图不更新
    this.obj.c = 'OBKoro1';
    delete this.obj.a;
    console.log(obj);  // {b:2,c:'OBKoro1'}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>     <span class="hljs-keyword">data</span>() { <span class="hljs-comment">// data数据</span>
        <span class="hljs-keyword">return</span> {
          arr: [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],
          obj:{
              a: <span class="hljs-number">1</span>,
              b: <span class="hljs-number">2</span>
          }
        };
      },
   <span class="hljs-comment">// 数据更新 数组视图不更新</span>
    <span class="hljs-keyword">this</span>.arr[<span class="hljs-number">0</span>] = <span class="hljs-string">'OBKoro1'</span>;
    <span class="hljs-keyword">this</span>.arr.length = <span class="hljs-number">1</span>;
    console.log(arr);<span class="hljs-comment">// ['OBKoro1'];</span>
    <span class="hljs-comment">// 数据更新 对象视图不更新</span>
    <span class="hljs-keyword">this</span>.obj.c = <span class="hljs-string">'OBKoro1'</span>;
    delete <span class="hljs-keyword">this</span>.obj.a;
    console.log(obj);  <span class="hljs-comment">// {b:2,c:'OBKoro1'}</span>
</code></pre>
<p>由于js的限制，Vue 不能检测以上数组的变动，以及对象的添加/删除，很多人会因为像上面这样操作，出现视图没有更新的问题。</p>
<p><strong>解决方式:</strong></p>
<ol><li>
<strong>this.$set(你要改变的数组/对象，你要改变的位置/key，你要改成什么value)</strong><p>this.$set(this.arr, 0, "OBKoro1"); // 改变数组<br>this.$set(this.obj, "c", "OBKoro1"); // 改变对象</p>
</li></ol>
<p>如果还是不懂的话，可以看看这个codepen<a href="https://codepen.io/OBKoro1/pen/oyjdbZ" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="OBKoro1/pen/oyjdbZ" data-typeid="3">点击预览</button>。</p>
<ol><li>
<strong>数组原生方法触发视图更新</strong>:</li></ol>
<p>Vue可以监测到数组变化的，<strong>数组原生方法</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    splice()、 push()、pop()、shift()、unshift()、sort()、reverse()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-selector-tag">splice</span>()、 <span class="hljs-selector-tag">push</span>()、<span class="hljs-selector-tag">pop</span>()、<span class="hljs-selector-tag">shift</span>()、<span class="hljs-selector-tag">unshift</span>()、<span class="hljs-selector-tag">sort</span>()、<span class="hljs-selector-tag">reverse</span>()
</code></pre>
<p>意思是<strong>使用这些方法不用我们再进行额外的操作，视图自动进行更新</strong>。</p>
<p>推荐使用<code>splice</code>方法会比较好自定义,因为slice可以在数组的任何位置进行删除/添加操作，这部分可以看看我前几天写的一篇文章:<a href="https://juejin.im/post/5b0903b26fb9a07a9d70c7e0?utm_source=gold_browser_extension#heading-7" rel="nofollow noreferrer" target="_blank">【干货】js 数组详细操作方法及解析合集</a></p>
<ol><li><strong>替换数组/对象</strong></li></ol>
<p>比方说:你想遍历这个数组/对象，对每个元素进行处理，然后触发视图更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   // 文档中的栗子: filter遍历数组，返回一个新数组，用新数组替换旧数组
    example1.items = example1.items.filter(function (item) {
      return item.message.match(/Foo/)
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>   <span class="hljs-comment">// 文档中的栗子: filter遍历数组，返回一个新数组，用新数组替换旧数组</span>
    example1<span class="hljs-selector-class">.items</span> = example1<span class="hljs-selector-class">.items</span><span class="hljs-selector-class">.filter</span>(function (item) {
      return item<span class="hljs-selector-class">.message</span><span class="hljs-selector-class">.match</span>(/Foo/)
    })
</code></pre>
<p><strong>举一反三</strong>：可以先把这个数组/对象保存在一个变量中，然后对这个变量进行遍历，等遍历结束后再用<strong>变量替换对象/数组</strong>。</p>
<p><strong>并不会重新渲染整个列表</strong>:</p>
<p>Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。</p>
<p>如果你还是很困惑，可以看看<a href="https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B" rel="nofollow noreferrer" target="_blank">Vue文档</a>中关于这部分的解释。</p>
<hr>
<h3 id="articleHeader4">vue filters 过滤器的使用:</h3>
<p>过滤器，通常用于后台管理系统，或者一些约定类型，过滤。Vue过滤器用法是很简单，但是很多朋友可能都没有用过，这里稍微讲解一下。</p>
<p><strong>在html模板中的两种用法</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <!-- 在双花括号中 -->
    {{ message | filterTest }}
    <!-- 在 `v-bind` 中 -->
    <div :id=&quot;message | filterTest&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">    <span class="hljs-comment">&lt;!-- 在双花括号中 --&gt;</span>
    </span><span class="hljs-template-variable">{{ message | filterTest }}</span><span class="xml">
    <span class="hljs-comment">&lt;!-- 在 `v-bind` 中 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:id</span>=<span class="hljs-string">"message | filterTest"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre>
<p><strong>在组件<code>script</code>中的用法</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {    
     data() {
        return {
         message:1   
        }
     },
    filters: {  
        filterTest(value) {
            // value在这里是message的值
            if(value===1){
                return '最后输出这个值';
            }
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>export <span class="hljs-keyword">default</span> {    
     <span class="hljs-keyword">data</span>() {
        <span class="hljs-keyword">return</span> {
         message:<span class="hljs-number">1</span>   
        }
     },
    filters: {  
        filterTest(value) {
            <span class="hljs-comment">// value在这里是message的值</span>
            <span class="hljs-keyword">if</span>(value===<span class="hljs-number">1</span>){
                <span class="hljs-keyword">return</span> <span class="hljs-string">'最后输出这个值'</span>;
            }
        }
    }
}
</code></pre>
<p>用法就是上面讲的这样，可以自己在组件中试一试就知道了，很简单很好用的。</p>
<p>如果不想自己试，可以点这个<a href="https://codepen.io/OBKoro1/pen/rKxBMw" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="OBKoro1/pen/rKxBMw" data-typeid="3">点击预览</button>里面修改代码就可以了，demo中包括<strong>过滤器串联</strong>、<strong>过滤器传参</strong>。</p>
<p>推荐看Vue<a href="https://cn.vuejs.org/v2/guide/filters.html" rel="nofollow noreferrer" target="_blank">过滤器</a>文档，你会更了解它的。</p>
<hr>
<h3 id="articleHeader5">列表渲染相关</h3>
<p><strong>v-for循环绑定model:</strong></p>
<p>input在v-for中可以像如下这么进行绑定，我敢打赌很多人不知道。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 数据    
      data() {
          return{
           obj: {
              ob: &quot;OB&quot;,
              koro1: &quot;Koro1&quot;
            },
            model: {
              ob: &quot;默认ob&quot;,
              koro1: &quot;默认koro1&quot;
            }   
          }
      },
    // html模板
    <div v-for=&quot;(value,key) in obj&quot;>
       <input type=&quot;text&quot; v-model=&quot;model[key]&quot;>
    </div>
      // input就跟数据绑定在一起了，那两个默认数据也会在input中显示
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>    // 数据    
      data() {
          <span class="hljs-keyword">return</span>{
           obj: {
              <span class="hljs-keyword">o</span><span class="hljs-variable">b:</span> <span class="hljs-string">"OB"</span>,
              koro1: <span class="hljs-string">"Koro1"</span>
            },
            <span class="hljs-keyword">mode</span><span class="hljs-variable">l:</span> {
              <span class="hljs-keyword">o</span><span class="hljs-variable">b:</span> <span class="hljs-string">"默认ob"</span>,
              koro1: <span class="hljs-string">"默认koro1"</span>
            }   
          }
      },
    // html模板
    &lt;div v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(value,key) in obj"</span>&gt;
       &lt;<span class="hljs-built_in">input</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"text"</span> v-model=<span class="hljs-string">"model[key]"</span>&gt;
    &lt;/div&gt;
      // <span class="hljs-built_in">input</span>就跟数据绑定在一起了，那两个默认数据也会在<span class="hljs-built_in">input</span>中显示
</code></pre>
<p>为此，我做了个<a href="https://codepen.io/OBKoro1/pen/gKPOgw" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="OBKoro1/pen/gKPOgw" data-typeid="3">点击预览</button>,你可以点进去试试。</p>
<p><strong>一段取值的v-for</strong></p>
<p>如果我们有一段重复的html模板要渲染，又没有数据关联，我们可以:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div v-for=&quot;n in 5&quot;>
        <span>这里会被渲染5次，渲染模板{{n}}</span>
     </div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"n in 5"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>这里会被渲染5次，渲染模板</span><span class="hljs-template-variable">{{n}}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre>
<p><strong>v-if尽量不要与v-for在同一节点使用</strong>:</p>
<p>v-for 的优先级比 v-if 更高,如果它们处于同一节点的话，那么每一个循环都会运行一遍v-if。</p>
<p>如果你想根据循环中的<strong>每一项的数据来判断是否渲染，那么你这样做是对的</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <li v-for=&quot;todo in todos&quot; v-if=&quot;todo.type===1&quot;>
      {{ todo }}
    </li>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    &lt;<span class="hljs-built_in">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"todo in todos"</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"todo.type===1"</span>&gt;
      {{ todo }}
    &lt;/<span class="hljs-built_in">li</span>&gt;
</code></pre>
<p>如果你想要根据<strong>某些条件跳过循环，而又跟将要渲染的每一项数据没有关系的话，你可以将v-if放在v-for的父节点</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 根据elseData是否为true 来判断是否渲染，跟每个元素没有关系    
     <ul v-if=&quot;elseData&quot;>
      <li v-for=&quot;todo in todos&quot;>
        {{ todo }}
      </li>
    </ul>
    // 数组是否有数据 跟每个元素没有关系
    <ul v-if=&quot;todos.length&quot;>
      <li v-for=&quot;todo in todos&quot;>
        {{ todo }}
      </li>
    </ul>
    <p v-else>No todos left!</p>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    <span class="hljs-comment">// 根据elseData是否为true 来判断是否渲染，跟每个元素没有关系    </span>
     &lt;<span class="hljs-selector-tag">ul</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"elseData"</span>&gt;
      &lt;<span class="hljs-selector-tag">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"todo in todos"</span>&gt;
        {{ todo }}
      &lt;/li&gt;
    &lt;/ul&gt;
    <span class="hljs-comment">// 数组是否有数据 跟每个元素没有关系</span>
    &lt;<span class="hljs-selector-tag">ul</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"todos.length"</span>&gt;
      &lt;<span class="hljs-selector-tag">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"todo in todos"</span>&gt;
        {{ todo }}
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;<span class="hljs-selector-tag">p</span> v-<span class="hljs-keyword">else</span>&gt;No todos <span class="hljs-attribute">left</span>!&lt;/p&gt;
</code></pre>
<p>如上，正确使用v-for与v-if优先级的关系，可以为你节省大量的性能。</p>
<hr>
<h3 id="articleHeader6">深度watch与watch立即触发回调</h3>
<p>watch很多人都在用，但是这watch中的这两个选项<code>deep</code>、<code>immediate</code>，或许不是很多人都知道，我猜。</p>
<p><strong>选项：deep</strong></p>
<p>在选项参数中指定 <code>deep: true</code>，可以监听对象中属性的变化。</p>
<p><strong>选项：immediate</strong></p>
<p>在选项参数中指定 immediate: true, 将立即以表达式的当前值触发回调，也就是默认触发一次。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    watch: {
        obj: {
          handler(val, oldVal) {
            console.log('属性发生变化触发这个回调',val, oldVal);
          },
          deep: true // 监听这个对象中的每一个属性变化
        },
        step: { // 属性
          //watch
          handler(val, oldVal) {
            console.log(&quot;默认触发一次&quot;, val, oldVal);
          },
          immediate: true // 默认触发一次
        },
      },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    watch: {
        obj: {
          handler(<span class="hljs-keyword">val</span>, oldVal) {
            console.log(<span class="hljs-string">'属性发生变化触发这个回调'</span>,<span class="hljs-keyword">val</span>, oldVal);
          },
          deep: <span class="hljs-literal">true</span> <span class="hljs-comment">// 监听这个对象中的每一个属性变化</span>
        },
        step: { <span class="hljs-comment">// 属性</span>
          <span class="hljs-comment">//watch</span>
          handler(<span class="hljs-keyword">val</span>, oldVal) {
            console.log(<span class="hljs-string">"默认触发一次"</span>, <span class="hljs-keyword">val</span>, oldVal);
          },
          immediate: <span class="hljs-literal">true</span> <span class="hljs-comment">// 默认触发一次</span>
        },
      },
</code></pre>
<p>这两个选项可以同时使用，另外：是的，又有一个<a href="https://codepen.io/OBKoro1/pen/QxyWMa" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="OBKoro1/pen/QxyWMa" data-typeid="3">点击预览</button>。</p>
<p>还有下面这一点需要注意。</p>
<hr>
<h3 id="articleHeader7">这些情况下不要使用箭头函数:</h3>
<ul>
<li>不应该使用箭头函数来定义一个生命周期方法</li>
<li>不应该使用箭头函数来定义 method 函数</li>
<li>不应该使用箭头函数来定义计算属性函数</li>
<li>不应该对 data 属性使用箭头函数</li>
<li>不应该使用箭头函数来定义 watcher 函数</li>
</ul>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 上面watch的栗子：
    handler:(val, oldVal)=> { // 可以执行
     console.log(&quot;默认触发一次&quot;, val, oldVal);
   },
   // method：
     methods: {
        plus: () => { // 可以执行
          // do something
        }
      }
   // 生命周期:
     created:()=>{ // 可以执行
       console.log('lala',this.obj) 
      },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-comment">// 上面watch的栗子：</span>
    handler:<span class="hljs-function">(<span class="hljs-params">val, oldVal</span>)=&gt;</span> { <span class="hljs-comment">// 可以执行</span>
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"默认触发一次"</span>, val, oldVal);
   },
   <span class="hljs-comment">// method：</span>
     methods: {
        <span class="hljs-attr">plus</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">// 可以执行</span>
          <span class="hljs-comment">// do something</span>
        }
      }
   <span class="hljs-comment">// 生命周期:</span>
     created:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{ <span class="hljs-comment">// 可以执行</span>
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'lala'</span>,<span class="hljs-keyword">this</span>.obj) 
      },
</code></pre>
<p>是的，没错，这些都能执行。</p>
<p><strong>but</strong>:</p>
<p>箭头函数绑定了父级作用域的上下文，<strong>this 将不会按照期望指向 Vue 实例</strong>。</p>
<p>也就是说，你<strong>不能使用this来访问你组件中的data数据以及method方法了</strong>。</p>
<p>this将会指向undefined。</p>
<hr>
<h3 id="articleHeader8">路由懒加载写法:</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 我所采用的方法，个人感觉比较简洁一些，少了一步引入赋值。
    const router = new VueRouter({
      routes: [
        path: '/app',
        component: () => import('./app'),  // 引入组件
      ]
    })
    // Vue路由文档的写法:
    const app = () => import('./app.vue') // 引入组件
    const router = new VueRouter({
      routes: [
        { path: '/app', component: app }
      ]
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-comment">// 我所采用的方法，个人感觉比较简洁一些，少了一步引入赋值。</span>
    <span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
      <span class="hljs-attr">routes</span>: [
        path: <span class="hljs-string">'/app'</span>,
        <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./app'</span>),  <span class="hljs-comment">// 引入组件</span>
      ]
    })
    <span class="hljs-comment">// Vue路由文档的写法:</span>
    <span class="hljs-keyword">const</span> app = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./app.vue'</span>) <span class="hljs-comment">// 引入组件</span>
    <span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
      <span class="hljs-attr">routes</span>: [
        { <span class="hljs-attr">path</span>: <span class="hljs-string">'/app'</span>, <span class="hljs-attr">component</span>: app }
      ]
    })
</code></pre>
<p>文档的写法在于问题在于：如果我们的路由比较多的话，是不是要在路由上方引入赋值十几行组件？</p>
<p>第一种跟第二种方法相比就是把引入赋值的一步，直接写在<code>component</code>上面，本质上是一样的。两种方式都可以的，大家自由选择哈。</p>
<hr>
<h3 id="articleHeader9">路由的项目启动页和404页面</h3>
<p>实际上这也就是一个设置而已:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    export default new Router({
      routes: [
        {
          path: '/', // 项目启动页
          redirect:'/login'  // 重定向到下方声明的路由 
        },
        {
          path: '*', // 404 页面 
          component: () => import('./notFind') // 或者使用component也可以的
        },
      ]
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
      <span class="hljs-attribute">routes</span>: [
        {
          path: <span class="hljs-string">'/'</span>, // 项目启动页
          redirect:<span class="hljs-string">'/login'</span>  // 重定向到下方声明的路由 
        },
        {
          <span class="hljs-attribute">path</span>: <span class="hljs-string">'*'</span>, // <span class="hljs-number">404</span> 页面 
          component: () =&gt; <span class="hljs-built_in">import</span>(<span class="hljs-string">'./notFind'</span>) // 或者使用component也可以的
        },
      ]
    })
</code></pre>
<p>比如你的域名为:<code>www.baidu.com</code></p>
<p>项目启动页指的是: 当你进入<code>www.baidu.com</code>，会自动跳转到login登录页。</p>
<p>404页面指的是: 当进入一个没有 声明/没有匹配 的路由页面时就会跳转到404页面。</p>
<p>比如进入<code>www.baidu.com/testRouter</code>,就会自动跳转到<code>notFind</code>页面。</p>
<p>当你没有声明一个404页面，进入<code>www.baidu.com/testRouter</code>，显示的页面是一片空白。</p>
<hr>
<h3 id="articleHeader10">Vue调试神器:vue-devtools</h3>
<p>每次调试的时候，写一堆<code>console</code>是否很烦？想要<strong>更快知道组件/Vuex内数据的变化</strong>？</p>
<p>那么这款<strong>尤大开发</strong>的调试神器:vue-devtools，你真的要了解一下了。</p>
<p>这波稳赚不赔，真的能提高开发效率。</p>
<p><strong>安装方法</strong>：</p>
<ul>
<li>谷歌商店+科学上网,搜索vue-devtools即可安装。</li>
<li>不会科学上网？<a href="https://segmentfault.com/a/1190000009682735">手动安装</a>
</li>
</ul>
<p><strong>安装之后</strong>：</p>
<p>在chrome开发者工具中会看一个vue的一栏，如下对我们网页应用内数据变化，组件层级等信息能够有更准确快速的了解。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015157250?w=1917&amp;h=324" src="https://static.alili.tech/img/remote/1460000015157250?w=1917&amp;h=324" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h3 id="articleHeader11">前几个月也写过一篇类似的:</h3>
<p><a href="https://juejin.im/post/5a587b46f265da3e3b7a7677" rel="nofollow noreferrer" target="_blank">Vue 实践过程中的几个问题</a></p>
<hr>
<h2 id="articleHeader12">结语</h2>
<p>本文的内容很多都在Vue文档里面有过说明，推荐大家可以多看看Vue文档，不止看教程篇，还有文档的Api什么的，也都可以看。然后其实还有两三点想写的，因为预计篇幅都会比较长一点，所以准备留到以后的文章里面吧~</p>
<p>文章如有不正确的地方欢迎各位路过的大佬鞭策！希望大家看完可以有所收获，喜欢的话，赶紧点波<del>订阅</del>关注/喜欢。</p>
<h3 id="articleHeader13">看完的朋友可以点个喜欢/关注，您的支持是对我最大的鼓励。</h3>
<p><strong><a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">个人blog</a></strong> and <strong><a href="https://juejin.im/user/58714f0eb123db4a2eb95372" rel="nofollow noreferrer" target="_blank">掘金个人主页</a></strong>，如需转载，请放上原文链接并署名。码字不易，<strong>感谢</strong>支持！</p>
<p>如果喜欢本文的话，欢迎关注我的订阅号，漫漫技术路，期待未来共同学习成长。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014694068?w=344&amp;h=344" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>以上2018.6.3</p>
<h3 id="articleHeader14">参考资料：</h3>
<p><a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">Vue文档</a></p>
<p><a href="https://cn.vuejs.org/v2/api/" rel="nofollow noreferrer" target="_blank">Vue Api文档</a></p>

                
{{% /raw %}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000015195766](https://segmentfault.com/a/1190000015195766)

## 原文标题
你或许不知道Vue的这些小技巧

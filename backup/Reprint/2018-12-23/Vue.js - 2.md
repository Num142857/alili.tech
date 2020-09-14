---
title: 'Vue.js - 2' 
date: 2018-12-23 2:30:07
hidden: true
slug: 0izi6deql6lq
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://sfau.lt/b5ZAqW" rel="nofollow noreferrer" target="_blank">Vue.js - 1</a><br><a href="http://sfau.lt/b5ZCKB" rel="nofollow noreferrer" target="_blank">Vue.js - 2</a></p>
<h1 id="articleHeader0">1.过滤器</h1>
<ul>
<li>过滤器的格式,由'管道'符进行分割,'管道'符|的前边是原数据,后边是过滤器名.</li>
<li>过滤器的作用：根据原本的数据过滤成一个新数据.</li>
<li>过滤器的定义有两种方式,第一种是全局定义,第二种是局部定义.</li>
</ul>
<h2 id="articleHeader1">全局定义过滤器</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例：
    <div id=&quot;app&quot;>
          <!-- 原数据输出 i am tom -->
        <p>"{{"msg"}}"</p>
          <!-- msg是原数据 | upper是过滤器名 -->
          <!-- 原数据过滤后输出 I am tom -->
          <p>"{{"msg | upper"}}"</p>
    </div>
    <script>
          // 全局过滤器的结构,利用.filter关键字,第一个参数是自定义的过滤器名,
        // 第二个参数是一个回调函数,回调函数的第一个参数是原数据.
        Vue.filter('upper', function (value) {
        // 截取原数据的第一个字符并转换为大写字母 + 从第一个字符之后截取的字符串.
            return value.slice(0, 1).toUpperCase() + value.slice(1)
        });
      new Vue({
            el: &quot;#app&quot;,
            data: {
                msg: &quot;i am tom&quot;
            },
        })
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">例：
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- 原数据输出 i am tom --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- msg是原数据 | upper是过滤器名 --&gt;</span>
          <span class="hljs-comment">&lt;!-- 原数据过滤后输出 I am tom --&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg | upper"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
          <span class="hljs-comment">// 全局过滤器的结构,利用.filter关键字,第一个参数是自定义的过滤器名,</span>
        <span class="hljs-comment">// 第二个参数是一个回调函数,回调函数的第一个参数是原数据.</span>
        Vue.filter(<span class="hljs-string">'upper'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value)</span> </span>{
        <span class="hljs-comment">// 截取原数据的第一个字符并转换为大写字母 + 从第一个字符之后截取的字符串.</span>
            <span class="hljs-keyword">return</span> value.slice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>).toUpperCase() + value.slice(<span class="hljs-number">1</span>)
        });
      <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">"#app"</span>,
            data: {
                msg: <span class="hljs-string">"i am tom"</span>
            },
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 带参数的过滤器 -->
例：
    <div id=&quot;app&quot;>
          <!-- 这里过滤器传进来的参数是upper -->
        <!-- 根据js中写的逻辑那么就输出 I am jerry -->
          <p>"{{"msg | selectCase('upper')"}}"</p>
    </div>
    <script>
      // 'selectCase'是自定义过滤器名,第二个参数是一个回调函数,
      // 回调函数的第一个参数是原数据,第二个参数这里做条件判断用.
      Vue.filter('selectCase', function (value, select) {
      //如果回调函数中第二个参数 == upper 就将原数据中的第一个字符转换为大写字母,
      //反之如果回调函数中第二个参数 == lower 就将原数据中的第一个字符转换为小写字母
          if (select == 'upper') {
              return value.slice(0, 1).toUpperCase() + value.slice(1)
          } else if (select == 'lower') {
              return value.slice(0, 1).toLowerCase() + value.slice(1)
          }
      });
      new Vue({
            el: &quot;#app&quot;,
            data: {
                msg: &quot;i am jerry&quot;
            },
        })
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- 带参数的过滤器 --&gt;</span>
例：
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- 这里过滤器传进来的参数是upper --&gt;</span>
        <span class="hljs-comment">&lt;!-- 根据js中写的逻辑那么就输出 I am jerry --&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg | selectCase('upper')"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
      <span class="hljs-comment">// 'selectCase'是自定义过滤器名,第二个参数是一个回调函数,</span>
      <span class="hljs-comment">// 回调函数的第一个参数是原数据,第二个参数这里做条件判断用.</span>
      Vue.filter(<span class="hljs-string">'selectCase'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value, select)</span> </span>{
      <span class="hljs-comment">//如果回调函数中第二个参数 == upper 就将原数据中的第一个字符转换为大写字母,</span>
      <span class="hljs-comment">//反之如果回调函数中第二个参数 == lower 就将原数据中的第一个字符转换为小写字母</span>
          <span class="hljs-keyword">if</span> (select == <span class="hljs-string">'upper'</span>) {
              <span class="hljs-keyword">return</span> value.slice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>).toUpperCase() + value.slice(<span class="hljs-number">1</span>)
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (select == <span class="hljs-string">'lower'</span>) {
              <span class="hljs-keyword">return</span> value.slice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>).toLowerCase() + value.slice(<span class="hljs-number">1</span>)
          }
      });
      <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">"#app"</span>,
            data: {
                msg: <span class="hljs-string">"i am jerry"</span>
            },
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 多个过滤器可以连用 -->
例：
    <div id=&quot;app&quot;>
              <!--多个过滤器可以连用-->
              <!-- 
                第一次过滤：原数据 -> I am jerry
                第一次过滤：基于上次过滤结果 -> i am jerry
                最后一次过滤后输出 i am jerry-How are you 
            -->
        "{{"msg | upper | selectCase('lower') | str"}}"
    </div>
    <script>
        // 过滤器1
        Vue.filter('upper', function (value) {
            return value.slice(0, 1).toUpperCase() + value.slice(1)
        });
        // 过滤器2
        Vue.filter('selectCase', function (value, select) {
            if (select == 'upper') {
                return value.slice(0, 1).toUpperCase() + value.slice(1)
            } else if (select == 'lower') {
                return value.slice(0, 1).toLowerCase() + value.slice(1)
            }
        });
        // 过滤器3
       Vue.filter('str', function (value) {
           return value + &quot;-How are you&quot;
       });
        new Vue({
              el: &quot;#app&quot;,
              data: {
                  msg: &quot;i am jerry&quot;
              },
          })
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- 多个过滤器可以连用 --&gt;</span>
例：
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
              <span class="hljs-comment">&lt;!--多个过滤器可以连用--&gt;</span>
              <span class="hljs-comment">&lt;!-- 
                第一次过滤：原数据 -&gt; I am jerry
                第一次过滤：基于上次过滤结果 -&gt; i am jerry
                最后一次过滤后输出 i am jerry-How are you 
            --&gt;</span>
        </span><span class="hljs-template-variable">"{{"msg | upper | selectCase('lower') | str"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-comment">// 过滤器1</span>
        Vue.filter(<span class="hljs-string">'upper'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value)</span> </span>{
            <span class="hljs-keyword">return</span> value.slice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>).toUpperCase() + value.slice(<span class="hljs-number">1</span>)
        });
        <span class="hljs-comment">// 过滤器2</span>
        Vue.filter(<span class="hljs-string">'selectCase'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value, select)</span> </span>{
            <span class="hljs-keyword">if</span> (select == <span class="hljs-string">'upper'</span>) {
                <span class="hljs-keyword">return</span> value.slice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>).toUpperCase() + value.slice(<span class="hljs-number">1</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (select == <span class="hljs-string">'lower'</span>) {
                <span class="hljs-keyword">return</span> value.slice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>).toLowerCase() + value.slice(<span class="hljs-number">1</span>)
            }
        });
        <span class="hljs-comment">// 过滤器3</span>
       Vue.filter(<span class="hljs-string">'str'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value)</span> </span>{
           <span class="hljs-keyword">return</span> value + <span class="hljs-string">"-How are you"</span>
       });
        <span class="hljs-keyword">new</span> Vue({
              el: <span class="hljs-string">"#app"</span>,
              data: {
                  msg: <span class="hljs-string">"i am jerry"</span>
              },
          })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader2">局部定义过滤器</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例：
    <div id=&quot;app&quot;>
          <!-- msg原数据 lower过滤器 输出 i am tom -->
          <p>"{{"msg | lower"}}"</p>
    </div>
    <script>
      new Vue({
            el: &quot;#app&quot;,
            data: {
                msg: &quot;I am tom&quot;
            },
        // 局部定义过滤器
        // 跟 el data平级 定义一个filters
            filters: {
                  // lower是自定义过滤器名,后面跟上一个函数,value同样是原数据.
                'lower': function (value) {
                    return value.slice(0, 1).toLowerCase() + value.slice(1)
                }
            }
        })
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">例：
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- msg原数据 lower过滤器 输出 i am tom --&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg | lower"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
      <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">"#app"</span>,
            data: {
                msg: <span class="hljs-string">"I am tom"</span>
            },
        <span class="hljs-comment">// 局部定义过滤器</span>
        <span class="hljs-comment">// 跟 el data平级 定义一个filters</span>
            filters: {
                  <span class="hljs-comment">// lower是自定义过滤器名,后面跟上一个函数,value同样是原数据.</span>
                <span class="hljs-string">'lower'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value)</span> </span>{
                    <span class="hljs-keyword">return</span> value.slice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>).toLowerCase() + value.slice(<span class="hljs-number">1</span>)
                }
            }
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h1 id="articleHeader3">2.自定义指令</h1>
<ul>
<li>除了使用系统提供的预定义指令,我们还可以使用自定义指令.</li>
<li>自定义指令的方式也是两种,全局定义和局部定义.</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 全局定义自定义指令 -->
<div id=&quot;app&quot;>
      <!-- 加载页面input框自动获取焦点 -->
    <input type=&quot;text&quot; v-focus>
</div>
<script>
  // 自定义指令的关键字是.directive;
  // 第一个参数是自定义指令名,要取消v-,在标签上把v-加上;
  // 第二个参数是一个对象,对象的内部是自定义指令运行的阶段,阶段key对应一个函数;
  // 函数的第一个参数是元素节点,第二个参数是一些必要的属性参数,在函数内部来进行自定义指令的逻辑.
      Vue.directive('focus',{
        inserted:function (el, binding) {
            el.focus();
        }
    });
    new Vue({
        el: &quot;#app&quot;,
        data: {}
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 全局定义自定义指令 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- 加载页面input框自动获取焦点 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-focus</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-comment">// 自定义指令的关键字是.directive;</span>
  <span class="hljs-comment">// 第一个参数是自定义指令名,要取消v-,在标签上把v-加上;</span>
  <span class="hljs-comment">// 第二个参数是一个对象,对象的内部是自定义指令运行的阶段,阶段key对应一个函数;</span>
  <span class="hljs-comment">// 函数的第一个参数是元素节点,第二个参数是一些必要的属性参数,在函数内部来进行自定义指令的逻辑.</span>
      Vue.directive(<span class="hljs-string">'focus'</span>,{
        inserted:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el, binding)</span> </span>{
            el.focus();
        }
    });
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">"#app"</span>,
        data: {}
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 全局定义自定义指令 -->
<div id=&quot;app&quot;>
      <!-- 黄色 -->
      <div v-color>猜我的颜色</div>
      <!-- 红色 -->
    <div v-color=&quot;color&quot;>猜我的颜色</div>
</div>
<script>
  // bind和inserted是我们自定义指令的两个常用的阶段.
  // bind执行在inserted之前,是在指令绑定到元素时执行,或者叫编译这个指令时执行.
  // 他们的运行类似于事件的机制,就是当指令绑定到dom时,执行bind后边的函数.
  // 当将原dom对象用Vue编译好以后(例如v-if,v-for都需要用Vue编译才能在正常浏览器中显示).
  // vue将编译后的对象,替换掉原节点,替换好之后,触发inserted后边的函数,
  
  // vue的运行过程,是先熏染页面,然后再获取页面的结构进行编译.
  // 编译成的对象叫做虚拟dom.
  // 编译完成真实的dom对象后,替换掉页面的dom结构.
  
  /* 总结：bind阶段：指令初次绑定到dom元素时,调用bind后面的函数(只调用一次)
             inserted阶段：Vue将原dom对象编译好,再替换掉原dom元素,再调用inserted后面的函数. */
    Vue.directive('color',{
      //inserted执行在bind之后
      inserted(el,binding){
          alert(&quot;inserted&quot;);
          el.style.backgroundColor=&quot;yellow&quot;;
          el.style.backgroundColor=binding.value;
          console.log(binding.value); // red
      },
      // bind执行在inserted之前
      bind:function (el, binding) {
          alert(&quot;bind&quot;);
          el.style.backgroundColor=&quot;yellow&quot;;
      }

    });
    new Vue({
        el: &quot;#app&quot;,
        data: {
            color:&quot;red&quot;
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 全局定义自定义指令 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- 黄色 --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-color</span>&gt;</span>猜我的颜色<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- 红色 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-color</span>=<span class="hljs-string">"color"</span>&gt;</span>猜我的颜色<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-comment">// bind和inserted是我们自定义指令的两个常用的阶段.</span>
  <span class="hljs-comment">// bind执行在inserted之前,是在指令绑定到元素时执行,或者叫编译这个指令时执行.</span>
  <span class="hljs-comment">// 他们的运行类似于事件的机制,就是当指令绑定到dom时,执行bind后边的函数.</span>
  <span class="hljs-comment">// 当将原dom对象用Vue编译好以后(例如v-if,v-for都需要用Vue编译才能在正常浏览器中显示).</span>
  <span class="hljs-comment">// vue将编译后的对象,替换掉原节点,替换好之后,触发inserted后边的函数,</span>
  
  <span class="hljs-comment">// vue的运行过程,是先熏染页面,然后再获取页面的结构进行编译.</span>
  <span class="hljs-comment">// 编译成的对象叫做虚拟dom.</span>
  <span class="hljs-comment">// 编译完成真实的dom对象后,替换掉页面的dom结构.</span>
  
  <span class="hljs-comment">/* 总结：bind阶段：指令初次绑定到dom元素时,调用bind后面的函数(只调用一次)
             inserted阶段：Vue将原dom对象编译好,再替换掉原dom元素,再调用inserted后面的函数. */</span>
    Vue.directive(<span class="hljs-string">'color'</span>,{
      <span class="hljs-comment">//inserted执行在bind之后</span>
      inserted(el,binding){
          alert(<span class="hljs-string">"inserted"</span>);
          el.style.backgroundColor=<span class="hljs-string">"yellow"</span>;
          el.style.backgroundColor=binding.value;
          <span class="hljs-built_in">console</span>.log(binding.value); <span class="hljs-comment">// red</span>
      },
      <span class="hljs-comment">// bind执行在inserted之前</span>
      bind:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, binding</span>) </span>{
          alert(<span class="hljs-string">"bind"</span>);
          el.style.backgroundColor=<span class="hljs-string">"yellow"</span>;
      }

    });
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">"#app"</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">color</span>:<span class="hljs-string">"red"</span>
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <!--局部定义自定义指令-->
    <input type=&quot;text&quot; v-fo>
</div>
<script>    
    new Vue({
            el: &quot;#app&quot;,
            data: {},
        //    局部定义自定义指令
            directives:{
              'fo':{
                     inserted:function (el, binding) {
                         el.focus();
                     }
                }
             }
        })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--局部定义自定义指令--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-fo</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">    
    <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">"#app"</span>,
            data: {},
        <span class="hljs-comment">//    局部定义自定义指令</span>
            directives:{
              <span class="hljs-string">'fo'</span>:{
                     inserted:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el, binding)</span> </span>{
                         el.focus();
                     }
                }
             }
        })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h1 id="articleHeader4">3.computed (计算属性关键字)</h1>
<ul>
<li>可以使用computed属性,替换掉"{{" "}}"中的复杂方法.</li>
<li>computed对应一个对象,<br>对象的内部是很多个计算属性,<br>计算属性的格式是键值对结构,值是一个函数,函数内部返回一个值,<br>这个值,就是键值对结构的key(msg),<br>计算属性虽然是一个函数,但不用执行,用法跟data属性中的用法一致.</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 简单的例子开始 -->
例1：
    <div id=&quot;app&quot;>
          <!-- "{{""}}"中的复杂方法 输出 dlrow olleh -->
        <p>"{{" message.split('').reverse().join('') "}}"</p>
          <!-- 使用computed属性替换掉的 输出 dlrow olleh -->
        <p>"{{" myMsg "}}"</p>
    </div>
    <script>
        new Vue({
            el: &quot;#app&quot;,
            data: {
                message: &quot;hello world&quot;
            },
        // 使用computed属性,替换掉"{{""}}"中的复杂方法
            computed: {
                myMsg: function () {
                  //以空字符串截取成一个数组再反转过来以空字符串转换成字符串
                    return this.message.split('').reverse().join('')
                },
            },
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- 简单的例子开始 --&gt;</span>
例1：
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- </span></span><span class="hljs-template-variable">"{{""}}"</span><span class="xml"><span class="hljs-comment">中的复杂方法 输出 dlrow olleh --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" message.split('').reverse().join('') "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- 使用computed属性替换掉的 输出 dlrow olleh --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" myMsg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">"#app"</span>,
            data: {
                message: <span class="hljs-string">"hello world"</span>
            },
        <span class="hljs-comment">// 使用computed属性,替换掉</span></span></span><span class="hljs-template-variable">"{{""}}"</span><span class="xml"><span class="actionscript">中的复杂方法
            computed: {
                myMsg: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                  <span class="hljs-comment">//以空字符串截取成一个数组再反转过来以空字符串转换成字符串</span>
                    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.message.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>)
                },
            },
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--加法运算的功能,p标签时两个input框的计算结果,并且input框改变时,同时改变p标签结果-->
例2：
    <div id=&quot;app&quot;>
          <!-- 因为输入的是字符串所以要转换为number类型再进行运算 -->
        <input type=&quot;text&quot; v-model.number=&quot;input1&quot;> +
        <input type=&quot;text&quot; v-model.number=&quot;input2&quot;> =
          <!--equal是使用computed属性计算出来的 -->
        <span>"{{" equal "}}"</span>
        ---
         <!--equal2是通过methods函数内部逻辑计算出来的,运算结果同上-->
        <span>"{{" equal2() "}}"</span>
    </div>
    <script>
        new Vue({
            el: &quot;#app&quot;,
            data: {
              input1: 0,
              input2: 0
            },
        // 使用computed属性,替换掉"{{""}}"中的复杂方法
            computed: {
                equal: function () {
                    return this.input1 + this.input2
                },
            },
         // 在函数里也可以进行逻辑运算
            methods: {
                equal2:function () {
                    return this.input1 + this.input2
                },
            }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!--加法运算的功能,p标签时两个input框的计算结果,并且input框改变时,同时改变p标签结果--&gt;</span>
例2：
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- 因为输入的是字符串所以要转换为number类型再进行运算 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model.number</span>=<span class="hljs-string">"input1"</span>&gt;</span> +
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model.number</span>=<span class="hljs-string">"input2"</span>&gt;</span> =
          <span class="hljs-comment">&lt;!--equal是使用computed属性计算出来的 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{" equal "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        ---
         <span class="hljs-comment">&lt;!--equal2是通过methods函数内部逻辑计算出来的,运算结果同上--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{" equal2() "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">"#app"</span>,
            data: {
              input1: <span class="hljs-number">0</span>,
              input2: <span class="hljs-number">0</span>
            },
        <span class="hljs-comment">// 使用computed属性,替换掉</span></span></span><span class="hljs-template-variable">"{{""}}"</span><span class="xml"><span class="actionscript">中的复杂方法
            computed: {
                equal: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.input1 + <span class="hljs-keyword">this</span>.input2
                },
            },
         <span class="hljs-comment">// 在函数里也可以进行逻辑运算</span>
            methods: {
                equal2:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.input1 + <span class="hljs-keyword">this</span>.input2
                },
            }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--需求:我们希望把数据大于0的项显示出来,把小于0的项过滤掉-->
例3：
    <div id=&quot;app&quot;>
        <ul>
            <li v-for=&quot;item in changedArr&quot;>"{{"item"}}"</li>
        </ul>
    </div>
    <script>
        new Vue({
            el: &quot;#app&quot;,
            data: {
                arr: [1, 2, 3, 4, 5, -1, -2, -3]
            },
        // 使用computed属性,替换掉"{{""}}"中的复杂方法
            computed: {
        // 过滤后的数组
            changedArr: function () {
                return this.arr.filter(function (item, index) {
                  //该函数返回结果是true的项组成的新数组
                    return item > 0
                })
            }
            },
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!--需求:我们希望把数据大于0的项显示出来,把小于0的项过滤掉--&gt;</span>
例3：
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in changedArr"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">"#app"</span>,
            data: {
                arr: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">-1</span>, <span class="hljs-number">-2</span>, <span class="hljs-number">-3</span>]
            },
        <span class="hljs-comment">// 使用computed属性,替换掉</span></span></span><span class="hljs-template-variable">"{{""}}"</span><span class="xml"><span class="actionscript">中的复杂方法
            computed: {
        <span class="hljs-comment">// 过滤后的数组</span>
            changedArr: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(item, index)</span> </span>{
                  <span class="hljs-comment">//该函数返回结果是true的项组成的新数组</span>
                    <span class="hljs-keyword">return</span> item &gt; <span class="hljs-number">0</span>
                })
            }
            },
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader5">总结</h2>
<ul><li>计算属性跟filter属性的区别 :</li></ul>
<ol>
<li>过滤属性一般用于将一个值转化为另一个值在同一个位置上输出,<br>computed是执行某一些计算,计算结果可以在任何位置数据.</li>
<li>有一些指令如v-for不可以使用filter过滤器,可以用computed属性代替.</li>
</ol>
<ul><li>computed和methods属性的区别 :</li></ul>
<ol>
<li>computed性能高,computed只计算一次,然后将值缓存下来.</li>
<li>而methods函数,在页面上输出多个的话,每一次都要进行内部函数的逻辑.</li>
</ol>
<ul><li>vue的作者强烈建议多使用computed</li></ul>
<h1 id="articleHeader6">4.Vue组件</h1>
<p>Component 组件</p>
<h2 id="articleHeader7">组件的定义和注册</h2>
<ul><li>组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。</li></ul>
<p><strong>1. 写法一：使用Vue.extend方法定义组件，使用 Vue.component方法注册组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
        <!-- 这里的标签必须与全局注册的标签一致 -->
        <tmp1></tmp1>
    </div>
    <script type=&quot;text/javascript&quot;>
        // 1. 写法一：使用Vue.extend方法定义组件，使用 Vue.component方法注册组件
        //定义组件
        var tmp1 = Vue.extend({
            template:&quot;<div><a href='#'>注册</a></div>&quot;
        });
        //全局注册组件
        Vue.component('tmp1',tmp1);
         new Vue({
            el:&quot;#app&quot;,
            data:{}
         });
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 这里的标签必须与全局注册的标签一致 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tmp1</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tmp1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
        <span class="hljs-comment">// 1. 写法一：使用Vue.extend方法定义组件，使用 Vue.component方法注册组件</span>
        <span class="hljs-comment">//定义组件</span>
        <span class="hljs-keyword">var</span> tmp1 = Vue.extend({
            template:<span class="hljs-string">"&lt;div&gt;&lt;a href='#'&gt;注册&lt;/a&gt;&lt;/div&gt;"</span>
        });
        <span class="hljs-comment">//全局注册组件</span>
        Vue.component(<span class="hljs-string">'tmp1'</span>,tmp1);
         <span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">"#app"</span>,
            data:{}
         });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>2.写法二:  使用 Vue.component方法定义注册组件一步到位</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
        <!-- 这里的标签必须与全局注册的标签一致 -->
        <tmp2></tmp2>
    </div>
    <script type=&quot;text/javascript&quot;>
        //定义和注册组件一步到位
        Vue.component('tmp2',{
            template:&quot;<div><a href='#'>tmp2</a></div>&quot;
        })
         new Vue({
            el:&quot;#app&quot;,
            data:{}
         });
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 这里的标签必须与全局注册的标签一致 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tmp2</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tmp2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
        <span class="hljs-comment">//定义和注册组件一步到位</span>
        Vue.component(<span class="hljs-string">'tmp2'</span>,{
            template:<span class="hljs-string">"&lt;div&gt;&lt;a href='#'&gt;tmp2&lt;/a&gt;&lt;/div&gt;"</span>
        })
         <span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">"#app"</span>,
            data:{}
         });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>3.写法三：将组件内容定义到template模板中</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--将组件内容定义到template模板中 -->    
    <template id=&quot;tmp3&quot;>
        <div><a href='#'>tmp3</a></div>
    </template>
    <div id=&quot;app&quot;>
        <tmp3></tmp3>
    </div>
    <script type=&quot;text/javascript&quot;>
        Vue.component('tmp3',{
            template:&quot;#tmp3&quot;
        })
         new Vue({
            el:&quot;#app&quot;,
            data:{}
         });
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--将组件内容定义到template模板中 --&gt;</span>    
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tmp3"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'#'</span>&gt;</span>tmp3<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tmp3</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tmp3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
        Vue.component(<span class="hljs-string">'tmp3'</span>,{
            template:<span class="hljs-string">"#tmp3"</span>
        })
         <span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">"#app"</span>,
            data:{}
         });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>4.写法四：将组件内容定义到类型为 x-template的script模板中</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 将组件内容定义到类型为 x-template的script模板中 -->
<script type=&quot;x-template&quot; id=&quot;tmp4&quot;>
    <div><a href='#'>tmp4</a></div>
</script>
<div id=&quot;app&quot;>
    <tmp4></tmp4>
      <login-To></login-To>
</div>
<script type=&quot;text/javascript&quot;>
    Vue.component('tmp4',{
        template:&quot;#tmp4&quot;
    })
    // 命名时的注意点:使用驼峰形式命名时,需要把view层的标签改成中划线连接的形式
    Vue.component('loginTo',{
      template:&quot;#tmp4&quot;
    })
     new Vue({
        el:&quot;#app&quot;,
        data:{}
     });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 将组件内容定义到类型为 x-template的script模板中 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"x-template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tmp4"</span>&gt;</span><span class="javascript">
    &lt;div&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'#'</span>&gt;</span>tmp4<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tmp4</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tmp4</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">login-To</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">login-To</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'tmp4'</span>,{
        template:<span class="hljs-string">"#tmp4"</span>
    })
    <span class="hljs-comment">// 命名时的注意点:使用驼峰形式命名时,需要把view层的标签改成中划线连接的形式</span>
    Vue.component(<span class="hljs-string">'loginTo'</span>,{
      template:<span class="hljs-string">"#tmp4"</span>
    })
     <span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">"#app"</span>,
        data:{}
     });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader8">组件中注册子组件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 定义组件id为tmp的组件模板 -->
    <template id=&quot;tmp&quot;>
        <div>
            Hello World
            <!-- login组件必须放在内部设置一个根节点 -->
            <!-- template不算根节点 -->
            <login></login>
        </div>
        <!-- 在account组建中使用login子组件 -->
    </template>

    <div id=&quot;app&quot;>
        <account></account>
    </div>

<script type=&quot;text/javascript&quot;>
    //定义和注册account组件
    Vue.component(&quot;account&quot;,{
        template:&quot;#tmp&quot;,
      //在account组件中定义和注册一个login子组件
      //这里面的组件是局部组件
        components:{
            'login':{
                template:&quot;<p>登录</p>&quot;
            }
        }
    })
    new Vue({
        el:&quot;#app&quot;,
        data:{}
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 定义组件id为tmp的组件模板 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tmp"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            Hello World
            <span class="hljs-comment">&lt;!-- login组件必须放在内部设置一个根节点 --&gt;</span>
            <span class="hljs-comment">&lt;!-- template不算根节点 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">login</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">login</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 在account组建中使用login子组件 --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">account</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">account</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    <span class="hljs-comment">//定义和注册account组件</span>
    Vue.component(<span class="hljs-string">"account"</span>,{
        template:<span class="hljs-string">"#tmp"</span>,
      <span class="hljs-comment">//在account组件中定义和注册一个login子组件</span>
      <span class="hljs-comment">//这里面的组件是局部组件</span>
        components:{
            <span class="hljs-string">'login'</span>:{
                template:<span class="hljs-string">"&lt;p&gt;登录&lt;/p&gt;"</span>
            }
        }
    })
    <span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">"#app"</span>,
        data:{}
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader9">组件的独立作用域</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 组件模板 -->
    <template id=&quot;temp&quot;>
        <div @click = &quot;login()&quot;>
            Hello World
            <!-- 定义的子组件只能在父组件中使用,否则不管用,子组件的事件不会冒泡到父元素身上 -->
            <login @click = &quot;login()&quot;></login>
            <!-- .stop禁止事件冒泡到父元素身上 -->
            <button @click.stop = &quot;login()&quot;>点我</button>
        </div>
    </template>

    <div id=&quot;app&quot;>
        <!-- 使用组件 -->
        <account></account>
    </div>

    <!--子组件只能在父组件的模板中使用,
        组件跟组件的作用域是相互独立的
        组件跟组件所有的属性都是独立的,包括methods,filters,directives,data
        这也是局部定义属性的意义.
    -->

<script type=&quot;text/javascript&quot;>
    //定义和注册组件
    Vue.component(&quot;account&quot;,{
        template:&quot;#temp&quot;,
        components:{
            'login':{
                template:&quot;<button>登录</button>&quot;
            }
        },
        // 注意：原来在new Vue()中定义的data是一个对象
        // 但是在组件中定义的data是一个方法,并且在这个方法中一定要return一个对象
        data:function(){
            return {
                msg: &quot;我是account组件中的msg!&quot;
            };
        },
        //定义一个方法
        methods:{
            login:function(){
                alert(this.msg);
            }
        }
    });
    new Vue({
        el:&quot;#app&quot;,
        data:{}
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 组件模板 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"temp"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span> = <span class="hljs-string">"login()"</span>&gt;</span>
            Hello World
            <span class="hljs-comment">&lt;!-- 定义的子组件只能在父组件中使用,否则不管用,子组件的事件不会冒泡到父元素身上 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">login</span> @<span class="hljs-attr">click</span> = <span class="hljs-string">"login()"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">login</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- .stop禁止事件冒泡到父元素身上 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click.stop</span> = <span class="hljs-string">"login()"</span>&gt;</span>点我<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 使用组件 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">account</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">account</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-comment">&lt;!--子组件只能在父组件的模板中使用,
        组件跟组件的作用域是相互独立的
        组件跟组件所有的属性都是独立的,包括methods,filters,directives,data
        这也是局部定义属性的意义.
    --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    <span class="hljs-comment">//定义和注册组件</span>
    Vue.component(<span class="hljs-string">"account"</span>,{
        template:<span class="hljs-string">"#temp"</span>,
        components:{
            <span class="hljs-string">'login'</span>:{
                template:<span class="hljs-string">"&lt;button&gt;登录&lt;/button&gt;"</span>
            }
        },
        <span class="hljs-comment">// 注意：原来在new Vue()中定义的data是一个对象</span>
        <span class="hljs-comment">// 但是在组件中定义的data是一个方法,并且在这个方法中一定要return一个对象</span>
        data:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">return</span> {
                msg: <span class="hljs-string">"我是account组件中的msg!"</span>
            };
        },
        <span class="hljs-comment">//定义一个方法</span>
        methods:{
            login:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                alert(<span class="hljs-keyword">this</span>.msg);
            }
        }
    });
    <span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">"#app"</span>,
        data:{}
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h1 id="articleHeader10">5.Vue.js中的AJAX请求</h1>
<ol><li>http协议<p>Vue可以借助于vue-resource或者axios来实现AJAX请求(axios不支持jsonp)，<br>  同源策略：A网页设置的 Cookie，B网页不能打开，除非这两个网页"同源"。所谓"同源"指的是"三个    相同"。<br>  协议相同<br>  域名相同<br>  端口相同<br>  例：<a href="http://xxx.com" rel="nofollow noreferrer" target="_blank">http://xxx.com</a>:80/login.html<br>  协议：http<br>  域名：xxx.com<br>  端口：80</p>
</li></ol>
<ul>
<li>
<p>http请求报文</p>
<p>浏览器与服务器数据交互是遵循http协议的，当浏览器要访问服务器的时候，浏览器需要将相关请求数据提交给服务器（例如：浏览器信息，url地址，参数等），通常是通过请求报文来提交的</p>
<p>请求报文的格式分为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、请求报文行
2、请求报文头
3、请求报文体
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、请求报文行
<span class="hljs-number">2</span>、请求报文头
<span class="hljs-number">3</span>、请求报文体
</code></pre>
</li>
<li>
<p>http响应报文</p>
<p>当浏览器请求服务器的时候，服务器需要将数据返回给浏览器，这种数据是通过响应报文响应回浏览器的</p>
<p>响应报文的格式分为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、响应报文行
2、响应报文头
3、响应报文体

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、响应报文行
<span class="hljs-number">2</span>、响应报文头
<span class="hljs-number">3</span>、响应报文体

</code></pre>
</li>
<li>jsonp跨域原理</li>
</ul>
<p>就是利用&lt;script&gt;标签没有跨域限制的“漏洞”（历史遗迹啊）来达到与第三方通讯的目的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    function test(data) {
        console.log(data);
    }
</script>
<script src=&quot;http://vue.studyit.io/api/jsonp?callback=test&quot;>

</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://vue.studyit.io/api/jsonp?callback=test"</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<ul><li>cors<p>CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。<br>整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。<br>因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。</p>
</li></ul>
<ol><li>vue-resource<p>Vue与后台Api进行交互通常是利用vue-resource(其中的一种方法)来实现的，本质上vue-resource是通过http来完成AJAX请求响应的<br>   get请求地址：<a href="http://vue.studyit.io/api/getprodlist" rel="nofollow noreferrer" target="_blank">http://vue.studyit.io/api/get...</a><br>   post请求地址：<a href="http://vue.studyit.io/api/addproduct" rel="nofollow noreferrer" target="_blank">http://vue.studyit.io/api/add...</a> 参数：name:'奔驰'<br>   jsonp请求地址：<a href="http://vue.studyit.io/api/jsonp" rel="nofollow noreferrer" target="_blank">http://vue.studyit.io/api/jsonp</a></p>
</li></ol>
<ul>
<li>vue-resource GitHub 地址：<a href="https://github.com/pagekit/vue-resource" rel="nofollow noreferrer" target="_blank">https://github.com/pagekit/vu...</a>
</li>
<li>vue-resource Http请求api参考（主要看这个）：<a href="https://github.com/pagekit/vue-resource/blob/master/docs/http.md" rel="nofollow noreferrer" target="_blank">https://github.com/pagekit/vu...</a>
</li>
<li>axios npm文档:<a href="https://www.npmjs.com/package/axios" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a>
</li>
<li>
<p>vue结合vue-resource写法步骤</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、通过 https://cdn.jsdelivr.net/vue.resource/1.2.1/vue-resource.min.js 下载到vue-resource文件

2、在html页面中通过script标签导入vue-resource.min.js 文件后，就会自动的在Vue对象实例上初始化 $http

3、使用
// 全局Vue对象写法
    Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
    Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);

// 在Vue对象中的写法
    this.$http.get('/someUrl', [options]).then(successCallback, errorCallback);
    this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-number">1</span>、通过 https:<span class="hljs-comment">//cdn.jsdelivr.net/vue.resource/1.2.1/vue-resource.min.js 下载到vue-resource文件</span>

<span class="hljs-number">2</span>、在html页面中通过script标签导入vue-resource.min.js 文件后，就会自动的在Vue对象实例上初始化 $http

<span class="hljs-number">3</span>、使用
<span class="hljs-comment">// 全局Vue对象写法</span>
    Vue.http.get(<span class="hljs-string">'/someUrl'</span>, [<span class="hljs-keyword">options</span>]).then(successCallback, errorCallback);
    Vue.http.post(<span class="hljs-string">'/someUrl'</span>, [body], [<span class="hljs-keyword">options</span>]).then(successCallback, errorCallback);

<span class="hljs-comment">// 在Vue对象中的写法</span>
    <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'/someUrl'</span>, [<span class="hljs-keyword">options</span>]).then(successCallback, errorCallback);
    <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">'/someUrl'</span>, [body], [<span class="hljs-keyword">options</span>]).then(successCallback, errorCallback);
</code></pre>
</li>
<li>
<p>vue-resource get请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="写法格式：
 this.$http.get('请求的url', [可选参数对象，使用{}传参]).then(成功回调函数, 失败回调函数);
 
成功回调函数参数对象主要属性说明：
1、url ： 请求的原始url
2、body： 响应报文体中的数据（我们通常用这个属性获取服务器返回的数据）
3、其他属性请看文档

举例：
 this.$http.get('http://vuecms.ittun.com/api/getlunbo?id=1').then(function(res){console.log(res.body)}, function(err){//err是异常数据});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>写法格式：
 <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'请求的url'</span>, [可选参数对象，使用{}传参]).then(成功回调函数, 失败回调函数);
 
成功回调函数参数对象主要属性说明：
<span class="hljs-number">1</span>、<span class="hljs-built_in">url</span> ： 请求的原始<span class="hljs-built_in">url</span>
<span class="hljs-number">2</span>、body： 响应报文体中的数据（我们通常用这个属性获取服务器返回的数据）
<span class="hljs-number">3</span>、其他属性请看文档

举例：
 <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://vuecms.ittun.com/api/getlunbo?id=1'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{<span class="hljs-built_in">console</span>.log(res.body)}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{<span class="hljs-comment">//err是异常数据});</span>
</code></pre>
</li>
<li>
<p>vue-resource post请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="写法格式：
 this.$http.post('请求的url',[可选参数请求报文体对象body,使用{}传参], [可选参数对象，使用{}传参]).then(成功回调函数, 失败回调函数);
 
成功回调函数参数对象主要属性说明：
1、url ： 请求的原始url
2、body： 响应报文体中的数据（我们通常用这个属性获取服务器返回的数据）
3、其他属性请看文档

注意点：
$http.post()方法中的第二个参数固定写成：{emulateJSON:true},否则可能造成服务器无法接收到请求报文体中的参数值

举例：
 this.$http.post('http://vuecms.ittun.com/api/adddata?id=1'  //请求的url
 ,{content:'hello'}  //请求报文体中传入的参数对象，多个使用逗号分隔
 ,{emulateJSON:true}  //固定写法，保证服务器可以获取到请求报文体参数值
 ).then(function(res){console.log(res.body)}, function(err){//err是异常数据});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>写法格式：
 <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">'请求的url'</span>,[可选参数请求报文体对象body,使用{}传参], [可选参数对象，使用{}传参]).then(成功回调函数, 失败回调函数);
 
成功回调函数参数对象主要属性说明：
<span class="hljs-number">1</span>、url ： 请求的原始url
<span class="hljs-number">2</span>、body： 响应报文体中的数据（我们通常用这个属性获取服务器返回的数据）
<span class="hljs-number">3</span>、其他属性请看文档

注意点：
$http.post()方法中的第二个参数固定写成：{<span class="hljs-attr">emulateJSON</span>:<span class="hljs-literal">true</span>},否则可能造成服务器无法接收到请求报文体中的参数值

举例：
 <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">'http://vuecms.ittun.com/api/adddata?id=1'</span>  <span class="hljs-comment">//请求的url</span>
 ,{<span class="hljs-attr">content</span>:<span class="hljs-string">'hello'</span>}  <span class="hljs-comment">//请求报文体中传入的参数对象，多个使用逗号分隔</span>
 ,{<span class="hljs-attr">emulateJSON</span>:<span class="hljs-literal">true</span>}  <span class="hljs-comment">//固定写法，保证服务器可以获取到请求报文体参数值</span>
 ).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{<span class="hljs-built_in">console</span>.log(res.body)}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{<span class="hljs-comment">//err是异常数据});</span>
</code></pre>
</li>
<li>
<p>vue-resource jsonp请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jsonp请求主要用来解决ajax跨域请求问题，使用jsonp实现跨域首先要保证服务器api支持jsonp请求的格式


写法格式：
 this.$http.jsonp('请求的url', [可选参数对象，使用{}传参]).then(成功回调函数, 失败回调函数);
 
成功回调函数参数对象主要属性说明：
1、url ： 请求的原始url
2、body： 响应报文体中的数据（我们通常用这个属性获取服务器返回的数据）
3、其他属性请看文档

举例：
 this.$http.jsonp('http://vuecms.ittun.com/api/getlunbo?id=1').then(function(res){console.log(res.body)}, function(err){//err是异常数据});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>jsonp请求主要用来解决ajax跨域请求问题，使用jsonp实现跨域首先要保证服务器api支持jsonp请求的格式


写法格式：
 <span class="hljs-keyword">this</span>.$http.jsonp(<span class="hljs-string">'请求的url'</span>, [可选参数对象，使用{}传参]).then(成功回调函数, 失败回调函数);
 
成功回调函数参数对象主要属性说明：
<span class="hljs-number">1</span>、<span class="hljs-built_in">url</span> ： 请求的原始<span class="hljs-built_in">url</span>
<span class="hljs-number">2</span>、body： 响应报文体中的数据（我们通常用这个属性获取服务器返回的数据）
<span class="hljs-number">3</span>、其他属性请看文档

举例：
 <span class="hljs-keyword">this</span>.$http.jsonp(<span class="hljs-string">'http://vuecms.ittun.com/api/getlunbo?id=1'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{<span class="hljs-built_in">console</span>.log(res.body)}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{<span class="hljs-comment">//err是异常数据});</span>
</code></pre>
</li>
</ul>
<h1 id="articleHeader11">6.产品案例 (完善-利用vue-resource完成AJAX版本)</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
    <style>
    * {
        margin: 0;
        padding: 0;
        text-decoration: none;
    }
    .title {
        margin: 0 auto;
        width: 100px;
        height: 100px;
    }
    h2 {
        text-align: center;
        margin: 50px;
        font-family: &quot;宋体&quot;;
        color: #333;
        font-size: 26px;
    }
    a {
        color: #d8505c;
    }
    table {
        border: 1px solid #999;
        border-collapse: collapse;
        width: 800px;
        margin: 20px auto;
        text-align: center;
    }
    table th {
        background: skyblue;
        border: 1px solid #999;
        padding: 5px;
    }
    table td {
        border: 1px solid #999;
        padding: 5px;
    }
    .add {
        width: 800px;
        margin: 20px auto 0 auto;
        text-align: center;
        font-size: 0;
    }
    .add input {
        outline: none;
        border: none;
        width: 200px;
        height: 30px;
        border: 1px solid #ccc;
        padding-left: 10px;
    }
    .add .addInp {
        border-right: transparent;
    }
    .add .search {
        margin-top: 10px;
    }
    .add button {
        border: none;
        width: 50px;
        height: 32px;
        background: skyblue;
        color: #FFF;
        vertical-align: top;
    }
</style>
<!-- 引入Vue.js文件 -->
<script src=&quot;./js/vue.js&quot;></script>
<!-- https://cdn.jsdelivr.net/vue.resource/1.2.1/vue-resource.min.js 下载到vue-resource文件 -->
<script src=&quot;./js/vue-resource.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        <div class=&quot;add&quot;>
            <h2>产品管理</h2>
            <!-- v-focus 挂载上自定义指令 -->
            <input type=&quot;text&quot; class=&quot;addInp&quot; 
                    v-model.trim = &quot;value&quot; 
                    placeholder=&quot;请输入产品名称&quot; 
                    @keyup.enter = &quot;add()&quot; 
                    v-focus
              >
            <!-- 点击添加按钮调用add函数添加数据 -->
            <button @click = &quot;add()&quot;>添加</button><br>
            <!-- 筛选数据列表 -->
            <input type=&quot;text&quot; class=&quot;search&quot; 
                       placeholder=&quot;请输入筛选内容&quot; 
                       v-model = &quot;filterValue&quot;
              >
        </div>
        <table>
            <thead>
                <th>编号</th>
                <th>名称</th>
                <th>创建时间</th>
                <th>操作</th>
            </thead>
            <tbody>
                <!-- 用v-for遍历arr数组中的每一个对象,并把相应数据渲染到页面上展示 -->
                <tr v-for = &quot;(item,index) in changeArr&quot;>
                    <td>"{{"index + 1"}}"</td>
                    <td>"{{"item.name"}}"</td>
                    <td>"{{"item.ctime | timefmt"}}"</td>
                    <!-- 点击删除调用del函数删除加数据 注意：需要传入参数index -->
                    <td><a href=&quot;javascript:;&quot; @click = &quot;del(item.id)&quot;>删除</a></td>
                </tr>
            </tbody>
        </table>
    </div>
    <script type=&quot;text/javascript&quot;>

        Vue.filter('timefmt',function(value) {
            value = new Date(value);
            var year = value.getFullYear();
            var month = value.getMonth() + 1;
            var day = value.getDate();
            var hour = value.getHours();
            var minute = value.getMinutes();
            var second = value.getSeconds();
        //二次处理
        day = day<10?&quot;0&quot;+day:day;
        hour = hour<10?&quot;0&quot;+hour:hour;
        minute = minute<10?&quot;0&quot;+minute:minute;
        second = second<10?&quot;0&quot;+second:second;
        return year+&quot;-&quot;+month+&quot;-&quot;+day+&quot; &quot;+hour+&quot;:&quot;+minute+&quot;:&quot;+second;
    });

        new Vue({

        //规定作用域
        el:&quot;#app&quot;,

        //放置所有数据
        data:{
            arr:[
                // {name: '宝马',ctime: new Date},
                // {name: '奔驰',ctime: new Date},
                // {name: '奥迪',ctime: new Date}
                ],
            //用于获取input中的数据
            value:&quot;&quot;,
            filterValue:&quot;&quot;
        },

        created:function(){
            this.getData();
        },

        methods:{

            //渲染数据到页面上
            getData:function(){
                //确定url
                var url = &quot;http://vue.studyit.io/api/getprodlist&quot;;
                this.$http.get(url).then(function(res){
                    //提取数据
                    var data = res.body;
                    //判断获取到的数据是否正确
                    if(data.status != 0){
                        alert(&quot;获取数据失败&quot;);
                        return;
                    }
                    //将获取到的数据放入到data中
                    this.arr = data.message;
                },function(err){
                    console.log(err);
                });

            },
            
            //添加数据
            add:function(){

                //非空判断
                if(this.value == &quot;&quot;){
                    alert(&quot;输入内容不能为空！&quot;);
                    return;
                }

                // this指的是Vue实例对象
                // 查重复数据
                for(var i=0;i<this.arr.length;i++){
                    //如果数据中的每一项的名称跟输入的名称一样的时候提醒已添加过,
                    //并及时return掉不在执行后续代码
                    if(this.arr[i].name == this.value){
                        alert('此条数据你已经添加过了！')
                        return;
                    }
                }
                // 确定url
                var url = &quot;http://vue.studyit.io/api/addproduct&quot;;
                //post请求
                this.$http.post(url,{name:this.value},{emulateJSON:true}).then(function(res){
                    //先提取数据
                    var data = res.body;
                    if(data.status == 0){
                        alert(data.message);
                        // 重新调用获取数据方法用于刷新数据
                        this.getData();
                    }else {
                        alert(&quot;数据添加失败&quot;);
                    }
                },function(err){    
                    console.log(err);
                });
                this.value = &quot;&quot;;
            },

            // 删除数据
            del:function(id){
                //点击删除按钮,从当前索引开始删除一个(相当于删除本身)
                if(confirm('确定要删除这条数据吗？')){
                    //确定url
                    var url = &quot;http://vue.studyit.io/api/delproduct/&quot;+id
                    //获取数据
                    this.$http.get(url).then(function(res){
                        //提取数据
                        var data = res.body;
                        if(data.status == 0){
                            alert(data.message);
                            this.getData();
                        }else {
                            alert(&quot;数据删除失败&quot;);
                        }
                    })
                }
            },

        },

        //局部 自定义指令
        directives:{
            &quot;focus&quot;:{
                inserted:function(el){
                    el.focus();
                }
            }
        },

        //利用computed属性来进行逻辑计算
        computed:{
            //changeArr就是改变后的新数据数组
            'changeArr':function(){    
                //内部获取不到this
                var that = this;
                //返回过滤出来的新数组
                return this.arr.filter(function(ele,index){
                    //根据输入的字符查找对应索引的内容 !=-1就是可以查找到
                    return ele.name.indexOf(that.filterValue) != -1;

                })
            }
        }
    });
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">text-decoration</span>: none;
    }
    <span class="hljs-selector-class">.title</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    }
    <span class="hljs-selector-tag">h2</span> {
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"宋体"</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">26px</span>;
    }
    <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#d8505c</span>;
    }
    <span class="hljs-selector-tag">table</span> {
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#999</span>;
        <span class="hljs-attribute">border-collapse</span>: collapse;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-tag">table</span> <span class="hljs-selector-tag">th</span> {
        <span class="hljs-attribute">background</span>: skyblue;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#999</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span>;
    }
    <span class="hljs-selector-tag">table</span> <span class="hljs-selector-tag">td</span> {
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#999</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span>;
    }
    <span class="hljs-selector-class">.add</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.add</span> <span class="hljs-selector-tag">input</span> {
        <span class="hljs-attribute">outline</span>: none;
        <span class="hljs-attribute">border</span>: none;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;
    }
    <span class="hljs-selector-class">.add</span> <span class="hljs-selector-class">.addInp</span> {
        <span class="hljs-attribute">border-right</span>: transparent;
    }
    <span class="hljs-selector-class">.add</span> <span class="hljs-selector-class">.search</span> {
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
    }
    <span class="hljs-selector-class">.add</span> <span class="hljs-selector-tag">button</span> {
        <span class="hljs-attribute">border</span>: none;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>;
        <span class="hljs-attribute">background</span>: skyblue;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFF</span>;
        <span class="hljs-attribute">vertical-align</span>: top;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 引入Vue.js文件 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- https://cdn.jsdelivr.net/vue.resource/1.2.1/vue-resource.min.js 下载到vue-resource文件 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/vue-resource.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"add"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>产品管理<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- v-focus 挂载上自定义指令 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addInp"</span> 
                    <span class="hljs-attr">v-model.trim</span> = <span class="hljs-string">"value"</span> 
                    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入产品名称"</span> 
                    @<span class="hljs-attr">keyup.enter</span> = <span class="hljs-string">"add()"</span> 
                    <span class="hljs-attr">v-focus</span>
              &gt;</span>
            <span class="hljs-comment">&lt;!-- 点击添加按钮调用add函数添加数据 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span> = <span class="hljs-string">"add()"</span>&gt;</span>添加<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 筛选数据列表 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search"</span> 
                       <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入筛选内容"</span> 
                       <span class="hljs-attr">v-model</span> = <span class="hljs-string">"filterValue"</span>
              &gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>编号<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>名称<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>创建时间<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>操作<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
                <span class="hljs-comment">&lt;!-- 用v-for遍历arr数组中的每一个对象,并把相应数据渲染到页面上展示 --&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">v-for</span> = <span class="hljs-string">"(item,index) in changeArr"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"index + 1"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.ctime | timefmt"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-comment">&lt;!-- 点击删除调用del函数删除加数据 注意：需要传入参数index --&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span> = <span class="hljs-string">"del(item.id)"</span>&gt;</span>删除<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">

        Vue.filter(<span class="hljs-string">'timefmt'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
            value = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(value);
            <span class="hljs-keyword">var</span> year = value.getFullYear();
            <span class="hljs-keyword">var</span> month = value.getMonth() + <span class="hljs-number">1</span>;
            <span class="hljs-keyword">var</span> day = value.getDate();
            <span class="hljs-keyword">var</span> hour = value.getHours();
            <span class="hljs-keyword">var</span> minute = value.getMinutes();
            <span class="hljs-keyword">var</span> second = value.getSeconds();
        <span class="hljs-comment">//二次处理</span>
        day = day&lt;<span class="hljs-number">10</span>?<span class="hljs-string">"0"</span>+day:day;
        hour = hour&lt;<span class="hljs-number">10</span>?<span class="hljs-string">"0"</span>+hour:hour;
        minute = minute&lt;<span class="hljs-number">10</span>?<span class="hljs-string">"0"</span>+minute:minute;
        second = second&lt;<span class="hljs-number">10</span>?<span class="hljs-string">"0"</span>+second:second;
        <span class="hljs-keyword">return</span> year+<span class="hljs-string">"-"</span>+month+<span class="hljs-string">"-"</span>+day+<span class="hljs-string">" "</span>+hour+<span class="hljs-string">":"</span>+minute+<span class="hljs-string">":"</span>+second;
    });

        <span class="hljs-keyword">new</span> Vue({

        <span class="hljs-comment">//规定作用域</span>
        el:<span class="hljs-string">"#app"</span>,

        <span class="hljs-comment">//放置所有数据</span>
        data:{
            <span class="hljs-attr">arr</span>:[
                <span class="hljs-comment">// {name: '宝马',ctime: new Date},</span>
                <span class="hljs-comment">// {name: '奔驰',ctime: new Date},</span>
                <span class="hljs-comment">// {name: '奥迪',ctime: new Date}</span>
                ],
            <span class="hljs-comment">//用于获取input中的数据</span>
            value:<span class="hljs-string">""</span>,
            <span class="hljs-attr">filterValue</span>:<span class="hljs-string">""</span>
        },

        <span class="hljs-attr">created</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">this</span>.getData();
        },

        <span class="hljs-attr">methods</span>:{

            <span class="hljs-comment">//渲染数据到页面上</span>
            getData:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-comment">//确定url</span>
                <span class="hljs-keyword">var</span> url = <span class="hljs-string">"http://vue.studyit.io/api/getprodlist"</span>;
                <span class="hljs-keyword">this</span>.$http.get(url).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
                    <span class="hljs-comment">//提取数据</span>
                    <span class="hljs-keyword">var</span> data = res.body;
                    <span class="hljs-comment">//判断获取到的数据是否正确</span>
                    <span class="hljs-keyword">if</span>(data.status != <span class="hljs-number">0</span>){
                        alert(<span class="hljs-string">"获取数据失败"</span>);
                        <span class="hljs-keyword">return</span>;
                    }
                    <span class="hljs-comment">//将获取到的数据放入到data中</span>
                    <span class="hljs-keyword">this</span>.arr = data.message;
                },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
                    <span class="hljs-built_in">console</span>.log(err);
                });

            },
            
            <span class="hljs-comment">//添加数据</span>
            add:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

                <span class="hljs-comment">//非空判断</span>
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.value == <span class="hljs-string">""</span>){
                    alert(<span class="hljs-string">"输入内容不能为空！"</span>);
                    <span class="hljs-keyword">return</span>;
                }

                <span class="hljs-comment">// this指的是Vue实例对象</span>
                <span class="hljs-comment">// 查重复数据</span>
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">this</span>.arr.length;i++){
                    <span class="hljs-comment">//如果数据中的每一项的名称跟输入的名称一样的时候提醒已添加过,</span>
                    <span class="hljs-comment">//并及时return掉不在执行后续代码</span>
                    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.arr[i].name == <span class="hljs-keyword">this</span>.value){
                        alert(<span class="hljs-string">'此条数据你已经添加过了！'</span>)
                        <span class="hljs-keyword">return</span>;
                    }
                }
                <span class="hljs-comment">// 确定url</span>
                <span class="hljs-keyword">var</span> url = <span class="hljs-string">"http://vue.studyit.io/api/addproduct"</span>;
                <span class="hljs-comment">//post请求</span>
                <span class="hljs-keyword">this</span>.$http.post(url,{<span class="hljs-attr">name</span>:<span class="hljs-keyword">this</span>.value},{<span class="hljs-attr">emulateJSON</span>:<span class="hljs-literal">true</span>}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
                    <span class="hljs-comment">//先提取数据</span>
                    <span class="hljs-keyword">var</span> data = res.body;
                    <span class="hljs-keyword">if</span>(data.status == <span class="hljs-number">0</span>){
                        alert(data.message);
                        <span class="hljs-comment">// 重新调用获取数据方法用于刷新数据</span>
                        <span class="hljs-keyword">this</span>.getData();
                    }<span class="hljs-keyword">else</span> {
                        alert(<span class="hljs-string">"数据添加失败"</span>);
                    }
                },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{    
                    <span class="hljs-built_in">console</span>.log(err);
                });
                <span class="hljs-keyword">this</span>.value = <span class="hljs-string">""</span>;
            },

            <span class="hljs-comment">// 删除数据</span>
            del:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>)</span>{
                <span class="hljs-comment">//点击删除按钮,从当前索引开始删除一个(相当于删除本身)</span>
                <span class="hljs-keyword">if</span>(confirm(<span class="hljs-string">'确定要删除这条数据吗？'</span>)){
                    <span class="hljs-comment">//确定url</span>
                    <span class="hljs-keyword">var</span> url = <span class="hljs-string">"http://vue.studyit.io/api/delproduct/"</span>+id
                    <span class="hljs-comment">//获取数据</span>
                    <span class="hljs-keyword">this</span>.$http.get(url).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
                        <span class="hljs-comment">//提取数据</span>
                        <span class="hljs-keyword">var</span> data = res.body;
                        <span class="hljs-keyword">if</span>(data.status == <span class="hljs-number">0</span>){
                            alert(data.message);
                            <span class="hljs-keyword">this</span>.getData();
                        }<span class="hljs-keyword">else</span> {
                            alert(<span class="hljs-string">"数据删除失败"</span>);
                        }
                    })
                }
            },

        },

        <span class="hljs-comment">//局部 自定义指令</span>
        directives:{
            <span class="hljs-string">"focus"</span>:{
                <span class="hljs-attr">inserted</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{
                    el.focus();
                }
            }
        },

        <span class="hljs-comment">//利用computed属性来进行逻辑计算</span>
        computed:{
            <span class="hljs-comment">//changeArr就是改变后的新数据数组</span>
            <span class="hljs-string">'changeArr'</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{    
                <span class="hljs-comment">//内部获取不到this</span>
                <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
                <span class="hljs-comment">//返回过滤出来的新数组</span>
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ele,index</span>)</span>{
                    <span class="hljs-comment">//根据输入的字符查找对应索引的内容 !=-1就是可以查找到</span>
                    <span class="hljs-keyword">return</span> ele.name.indexOf(that.filterValue) != <span class="hljs-number">-1</span>;

                })
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js - 2

## 原文链接
[https://segmentfault.com/a/1190000012264619](https://segmentfault.com/a/1190000012264619)


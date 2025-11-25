---
title: 'Vue的computed和watch的细节全面分析' 
date: 2018-12-16 2:30:10
hidden: true
slug: o1ne1i8g6cc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">定义</h2>
<p>1.computed是一个计算属性,类似于过滤器,对绑定到view的数据进行处理,并监听变化,如下对应的computedDataRes就是接受返回值,并监听变化,变化可以执行方法computedMethod,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  <span class="hljs-selector-tag">data</span>: {
    <span class="hljs-attribute">firstName</span>: <span class="hljs-string">'Foo'</span>,
    lastName: <span class="hljs-string">'Bar'</span>
  },
  <span class="hljs-selector-tag">computed</span>: {
    <span class="hljs-attribute">fullName</span>: function () {
      return this.firstName + <span class="hljs-string">' '</span> + this.lastName
    }
  }</code></pre>
<p>fullName不可在data里面定义,如果定义会报错,因为对应的computed作为计算属性定义fullName并返回对应的结果给这个变量,变量不可被重复定义和赋值</p>
<p><span class="img-wrap"><img data-src="/img/bV2euP?w=659&amp;h=110" src="https://static.alili.tech/img/bV2euP?w=659&amp;h=110" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2.watch是一个观察的动作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
     firstName: function (val) {
     this.fullName = val + ' ' + this.lastName
  },
  lastName: function (val) {
     this.fullName = this.firstName + ' ' + val
   }
   }
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  <span class="hljs-keyword">data</span>: {
    firstName: <span class="hljs-string">'Foo'</span>,
    lastName: <span class="hljs-string">'Bar'</span>,
    fullName: <span class="hljs-string">'Foo Bar'</span>
  },
  watch: {
     firstName: function (<span class="hljs-keyword">val</span>) {
     <span class="hljs-keyword">this</span>.fullName = <span class="hljs-keyword">val</span> + <span class="hljs-string">' '</span> + <span class="hljs-keyword">this</span>.lastName
  },
  lastName: function (<span class="hljs-keyword">val</span>) {
     <span class="hljs-keyword">this</span>.fullName = <span class="hljs-keyword">this</span>.firstName + <span class="hljs-string">' '</span> + <span class="hljs-keyword">val</span>
   }
   }
   </code></pre>
<h2 id="articleHeader1">watch的使用</h2>
<h3 id="articleHeader2">watch监听简单数据类型</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
      return{
        'first':2
      }
    },
    watch:{
      first(){
        console.log(this.first)
      }
    },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span>(){
      <span class="hljs-keyword">return</span>{
        <span class="hljs-string">'first'</span>:<span class="hljs-number">2</span>
      }
    },
    watch:{
      first(){
        console.log(<span class="hljs-keyword">this</span>.first)
      }
    },
</code></pre>
<h3 id="articleHeader3">watch监听复杂数据类型</h3>
<p>1.watch监听复杂数据类型需用深度监听</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
      return{
        'first':{
          second:0
        }
      }
    },
    watch:{
      secondChange:{
        handler(oldVal,newVal){
          console.log(oldVal)
          console.log(newVal)
        },
        deep:true
      }
    },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">data(){</span>
      <span class="hljs-string">return{</span>
<span class="hljs-attr">        'first':</span><span class="hljs-string">{</span>
<span class="hljs-attr">          second:</span><span class="hljs-number">0</span>
        <span class="hljs-string">}</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    watch:</span><span class="hljs-string">{</span>
<span class="hljs-attr">      secondChange:</span><span class="hljs-string">{</span>
        <span class="hljs-string">handler(oldVal,newVal){</span>
          <span class="hljs-string">console.log(oldVal)</span>
          <span class="hljs-string">console.log(newVal)</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        deep:</span><span class="hljs-literal">true</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">},</span>
</code></pre>
<p>2.console.log打印的结果,发现oldVal和newVal值是一样的,所以深度监听虽然可以监听到对象的变化,但是无法监听到具体对象里面那个属性的变化</p>
<p>3.oldVal和newVal值一样的原因是它们索引同一个对象/数组。Vue 不会保留修改之前值的副本<br><a href="https://cn.vuejs.org/v2/api/#vm-watch" rel="nofollow noreferrer" target="_blank">vm.$watch的深度监听</a></p>
<p><span class="img-wrap"><img data-src="/img/bV2epe?w=393&amp;h=238" src="https://static.alili.tech/img/bV2epe?w=393&amp;h=238" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>3.深度监听对应的函数名必须为handler,否则无效果,因为watcher里面对应的是对handler的调用</p>
<h3 id="articleHeader4">watch监听对象单个属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="方法一：可以直接对用对象.属性的方法拿到属性
data(){
          return{
            'first':{
              second:0
            }
          }
        },
        watch:{
          first.second:function(newVal,oldVal){
            console.log(newVal,oldVal);
          }
        },
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>方法一：可以直接对用对象.属性的方法拿到属性
data(){
<span class="hljs-built_in">          return</span>{
            '<span class="hljs-keyword">first</span>':{
              <span class="hljs-keyword">second</span>:<span class="hljs-number">0</span>
            }
          }
        },
        watch:{
          <span class="hljs-keyword">first</span>.<span class="hljs-keyword">second</span>:function(newVal,oldVal){
            console.<span class="hljs-built_in">log</span>(newVal,oldVal);
          }
        },
    </code></pre>
<p>方法二：watch如果想要监听对象的单个属性的变化,必须用computed作为中间件转化,因为computed可以取到对应的属性值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
      return{
        'first':{
          second:0
        }
      }
    },
    computed:{
      secondChange(){
        return this.first.second
      }
    },
    watch:{
      secondChange(){
        console.log('second属性值变化了')
      }
    },
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span>(){
      <span class="hljs-keyword">return</span>{
        <span class="hljs-string">'first'</span>:{
          second:<span class="hljs-number">0</span>
        }
      }
    },
    computed:{
      secondChange(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.first.second
      }
    },
    watch:{
      secondChange(){
        console.log(<span class="hljs-string">'second属性值变化了'</span>)
      }
    },
    </code></pre>
<h2 id="articleHeader5">应用一(本组件计算和监听)</h2>
<h2 id="articleHeader6">应用二(修改或监听其他组件传入的值)</h2>
<h3 id="articleHeader7">props传入的值</h3>
<p>1.情况一:作为局部变量来使用<br>A.传入的值想作为局部变量来使用,直接使用会</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props:['listShop'],
    data(){
      return{}
    },
    created(){
      this.listShop=30
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>props:[<span class="hljs-string">'listShop'</span>],
    <span class="hljs-keyword">data</span>(){
      <span class="hljs-keyword">return</span>{}
    },
    created(){
      <span class="hljs-keyword">this</span>.listShop=<span class="hljs-number">30</span>
}
</code></pre>
<p>报错</p>
<p><span class="img-wrap"><img data-src="/img/bV2eG5?w=1268&amp;h=136" src="https://static.alili.tech/img/bV2eG5?w=1268&amp;h=136" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个错误是说的避免直接修改父组件传入的值,因为会改变父组件的值,贴上<a href="https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8-Prop-%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE" rel="nofollow noreferrer" target="_blank">官网介绍</a></p>
<p>B.简单数据类型解决方案:<br>所以可以在data中重新定义一个变量,改变指向,但是也只是针对简单数据类型,因为复杂数据类型栈存贮的是指针,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props:['listShop'],
    data(){
      return{
        listShopChild:this.listShop
      }
    },
    created(){
      this.listShopChild=30
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>props:[<span class="hljs-string">'listShop'</span>],
    <span class="hljs-keyword">data</span>(){
      <span class="hljs-keyword">return</span>{
        listShopChild:<span class="hljs-keyword">this</span>.listShop
      }
    },
    created(){
      <span class="hljs-keyword">this</span>.listShopChild=<span class="hljs-number">30</span>
    }
    </code></pre>
<p>这样就可以愉快的更改传入的简单数据类型的数据啦!不会有任何报错,也不会影响父组件!</p>
<p>C.复杂数据类型解决方案:<br>复杂数据类型在栈中存贮的是指针,所以赋值给新的变量也会改变原始的变量值.那么应该咋整呢?<br>&lt;1.&gt;可以手动深度克隆一个复杂的数据出来,循环或者递归都行</p>
<p>数组深度克隆:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = [1,2,3];
var y = [];
for (var i = 0; i < x.length; i++) {
    y[i]=x[i];
}
console.log(y);  //[1,2,3]
y.push(4);
console.log(y);  //[1,2,3,4]
console.log(x);  //[1,2,3]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> y = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; x.length; i++) {
    y[i]=x[i];
}
<span class="hljs-built_in">console</span>.log(y);  <span class="hljs-comment">//[1,2,3]</span>
y.push(<span class="hljs-number">4</span>);
<span class="hljs-built_in">console</span>.log(y);  <span class="hljs-comment">//[1,2,3,4]</span>
<span class="hljs-built_in">console</span>.log(x);  <span class="hljs-comment">//[1,2,3]</span>
</code></pre>
<p>对象深度克隆:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = {a:1,b:2};
var y = {};
for(var i in x){
    y[i] = x[i];
}
console.log(y);  //Object {a: 1, b: 2}
y.c = 3;
console.log(y);  //Object {a: 1, b: 2, c: 3}
console.log(x);  //Object {a: 1, b: 2}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>};
<span class="hljs-keyword">var</span> y = {};
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> x){
    y[i] = x[i];
}
<span class="hljs-built_in">console</span>.log(y);  <span class="hljs-comment">//Object {a: 1, b: 2}</span>
y.c = <span class="hljs-number">3</span>;
<span class="hljs-built_in">console</span>.log(y);  <span class="hljs-comment">//Object {a: 1, b: 2, c: 3}</span>
<span class="hljs-built_in">console</span>.log(x);  <span class="hljs-comment">//Object {a: 1, b: 2}</span>
</code></pre>
<p>函数深度克隆</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = function(){console.log(1);};
var y = x;
y = function(){console.log(2);};
x();  //1
y();  //2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);};
<span class="hljs-keyword">var</span> y = x;
y = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);};
x();  <span class="hljs-comment">//1</span>
y();  <span class="hljs-comment">//2</span></code></pre>
<p>为什么函数可以直接赋值克隆?<br>由于函数对象克隆之后的对象会单独复制一次并存储实际数据，因此并不会影响克隆之前的对象。所以采用简单的复制“=”即可完成克隆。</p>
<p>&lt;2.&gt;Object.assign<br>只会对只是一级属性复制，比浅拷贝多深拷贝了一层而已,所以还是无法达到深度克隆的目的.<br><a href="http://blog.csdn.net/waiterwaiter/article/details/50267787" rel="nofollow noreferrer" target="_blank">详请请戳</a></p>
<p>&lt;3.&gt;强大的JSON.stringify和JSON.parse</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj1 = JSON.parse(JSON.stringify(obj));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> obj1 = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(obj));
</code></pre>
<p>这是ES5新出来的API,先将对象转化为字符串,就是简单数据类型赋值,再用JSON.parse转化</p>
<p>2.情况二:处理后再使用<br>可以先用局部变量接收,再修改</p>
<h3 id="articleHeader8">检测子传父的值</h3>
<p>分为简单数据类型和复杂数据类型检测,检测方法如上watch的使用</p>
<h2 id="articleHeader9">应用三(监听vuex的state值变化)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed:{
    stateDemo(){
        return this.$store.state.demoState;
    }
}
watch:{
    stateDemo(){
        console.log('vuex变化啦')
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>computed:{
    <span class="hljs-keyword">state</span>Demo(){
        return this.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>.demoState;
    }
}
watch:{
    <span class="hljs-keyword">state</span>Demo(){
        console.<span class="hljs-keyword">log</span>('vuex变化啦')
    }
}
</code></pre>
<h2 id="articleHeader10">computed和watch的原理分析</h2>
<p>很开心小伙伴们能看到这里,接下来给大家简单罗列下他们的原理!</p>
<h3 id="articleHeader11">computed的原理</h3>
<p>参照下面这个URL:<a href="https://segmentfault.com/a/1190000010408657">https://segmentfault.com/a/11...</a></p>
<h3 id="articleHeader12">watch的原理</h3>
<p>分为三个过程:实例化Vue、调用$watch方法、属性变化，触发回调<br>参照这两个URL:<a href="https://www.cnblogs.com/Clarence2J/p/6860329.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/Clare...</a><br><a href="https://segmentfault.com/a/1190000010014281#articleHeader2">https://segmentfault.com/a/11...</a></p>
<p>大家如果发现有什么错误,欢迎指正,共同交流。如果觉得篇文章真的对你有点作用。<br>谢谢亲们能看完！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue的computed和watch的细节全面分析

## 原文链接
[https://segmentfault.com/a/1190000012948175](https://segmentfault.com/a/1190000012948175)


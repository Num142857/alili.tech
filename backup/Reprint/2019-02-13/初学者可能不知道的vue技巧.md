---
title: '初学者可能不知道的vue技巧' 
date: 2019-02-13 2:31:22
hidden: true
slug: yygh6a6kw2
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbinVz?w=900&amp;h=396" src="https://static.alili.tech/img/bVbinVz?w=900&amp;h=396" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前言</h2>
<p>　　大家好，这里是<a href="https://honeybadger8.github.io/blog/" rel="nofollow noreferrer" target="_blank">@IT·平头哥联盟</a>，我是<code>首席甩锅官</code>——<a href="https://github.com/hejinze789" rel="nofollow noreferrer" target="_blank">老金</a>，今天给大家分享的，一些日常中神秘而又简单的vue的实用小技巧，以及我在我司项目中实用vue的总结和坑，跟大家一起分享，希望能给其他攻城狮带来些许便利，如有理解错误，请纠正。</p>
<h2 id="articleHeader1">技巧/坑点</h2>
<h3 id="articleHeader2">1.setTimeout/ setInterval</h3>
<ul><li>
<strong>场景一</strong> ：this指向改变无法用this访问vue实例</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  mounted(){
    setTimeout( function () {
    //setInterval同理
    console.log(this); //此时this指向Window对象
    }，1000) ;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  mounted(){
    setTimeout( <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//setInterval同理</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">//此时this指向Window对象</span>
    }，<span class="hljs-number">1000</span>) ;
  }</code></pre>
<ul><li>
<strong>解决方法</strong> :使用箭头函数或者缓存this</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //箭头函数访问this实例因为箭头函数本身没有绑定this
  setTimeout(() => {
    console. log(this);},  500) ;
    //使用变量访问this实例let self=this;
  },1000);
  setTimeout (function () {
    console. log(self);//使用self变量访问this实例
  }, 1000) ;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">//箭头函数访问this实例因为箭头函数本身没有绑定this</span>
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>. log(<span class="hljs-keyword">this</span>);},  <span class="hljs-number">500</span>) ;
    <span class="hljs-comment">//使用变量访问this实例let self=this;</span>
  },<span class="hljs-number">1000</span>);
  setTimeout (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>. log(self);<span class="hljs-comment">//使用self变量访问this实例</span>
  }, <span class="hljs-number">1000</span>) ;
</code></pre>
<h5>setInterval路由跳转继续运行并没有销毁</h5>
<ul><li>
<p><strong>场景一</strong> :比如一些弹幕，走马灯文字，这类需要定时调用的，路由跳转之后，因为组件已经销毁了，但是setlnterval还没有销毁，还在继续后台调用，控制台会不断报错，如果运算量大的话，无法及时清除，会导致严重的页面卡顿。</p>
<ul><li>
<strong>解决方法</strong> :在组件生命周期beforeDestroy停止setInterval</li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
  created() {
       this.intervalid = setInterval(() => {
          this.layerError = &quot;&quot;;
          this.Timer = null;
      }, 100000);
   }
  beforeDestroy( ){
    //我通常是把setInterval( )定时器赋值给this实例，然后就可以像下面这么暂停。
    clearInterval(this.intervalid);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> 
  created() {
       <span class="hljs-keyword">this</span>.intervalid = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.layerError = <span class="hljs-string">""</span>;
          <span class="hljs-keyword">this</span>.Timer = <span class="hljs-literal">null</span>;
      }, <span class="hljs-number">100000</span>);
   }
  beforeDestroy( ){
    <span class="hljs-comment">//我通常是把setInterval( )定时器赋值给this实例，然后就可以像下面这么暂停。</span>
    clearInterval(<span class="hljs-keyword">this</span>.intervalid);
  }</code></pre>
<h4>2.Vue路由拦截浏览器后退实现草稿保存类似需求</h4>
<ul>
<li>
<strong>场景一</strong> :为了防止用户突然离开，没有保存已输入的信息。</li>
<li>
<strong>解决方法</strong> :</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //在路由组件中:mounted(){}，
  beforeRouteLeave (to, from, next) {
      if(用户已经输入信息){
        //出现弹窗提醒保存草稿，或者自动后台为其保存
      }else{
        next(true);//用户离开
      }
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">//在路由组件中:mounted(){}，</span>
  beforeRouteLeave (to, <span class="hljs-keyword">from</span>, next) {
      <span class="hljs-keyword">if</span>(用户已经输入信息){
        <span class="hljs-comment">//出现弹窗提醒保存草稿，或者自动后台为其保存</span>
      }<span class="hljs-keyword">else</span>{
        next(<span class="hljs-literal">true</span>);<span class="hljs-comment">//用户离开</span>
      }
  }
</code></pre>
<h4>3.自定义组件添加click等事件不生效</h4>
<ul><li>
<strong>场景一</strong> :一些自定义组件，需要额外添加一些事件来实现一些特定需求</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <template>
    <el-progress type=&quot;circle&quot; :percentage=“0&quot; @click=“stopProgress”></elprogress>
  </template>
  <script>
    export default {
       methods:{
            stopProgress() { 
            console.log('停止')
            }
        }
    }
  </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-progress</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"circle"</span> <span class="hljs-attr">:percentage</span>=<span class="hljs-string">“0</span>" @<span class="hljs-attr">click</span>=<span class="hljs-string">“stopProgress”</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">elprogress</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
       <span class="hljs-attr">methods</span>:{
            stopProgress() { 
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'停止'</span>)
            }
        }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li>
<strong>解决方法</strong>:使用.native修饰符</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <template>
    <el-progress type=&quot;circle&quot; :percentage=“0&quot; @click.native=“stopProgress”></el-progress>
  </template>
  <script>
    export default {
        methods:{
            stopProgress() { 
            console.log('停止')
            }
        }
    }
  </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-progress</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"circle"</span> <span class="hljs-attr">:percentage</span>=<span class="hljs-string">“0</span>" @<span class="hljs-attr">click.native</span>=<span class="hljs-string">“stopProgress”</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-progress</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">methods</span>:{
            stopProgress() { 
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'停止'</span>)
            }
        }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>4.手动操控自定义组件</h4>
<ul><li>
<p><strong>场景一</strong> :一些自定义组件，需要去获取组件对象进行一些其他的Dom操作</p>
<ul><li>
<strong>解决方法</strong> :使用ref属性暴露组件获取句柄</li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <template>
    <el-progress type=&quot;circle&quot; :percentage=&quot;O&quot; ref=&quot;progress&quot;></el-progress></template>
  <script>
    this.$refs.progress //组件对象实例， 可以手动调用组件的内置方法和属性
    this.$refs.progress.$el //组件 对象的最外层dom元素
  </script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-progress</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"circle"</span> <span class="hljs-attr">:percentage</span>=<span class="hljs-string">"O"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"progress"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-progress</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">this</span>.$refs.progress <span class="hljs-comment">//组件对象实例， 可以手动调用组件的内置方法和属性</span>
    <span class="hljs-keyword">this</span>.$refs.progress.$el <span class="hljs-comment">//组件 对象的最外层dom元素</span>
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h4>5.深度作用选择器</h4>
<ul><li>
<strong>场景一</strong> : scoped的样式，希望影响到子组件的默认样式</li></ul>
<p>在样式中设置完scoped在浏览器解析为如下图这样，a是个div，a div里面包含一个组件里面解析完了div的样式名字为b，想在父组件影响到子组件的默认样式。<br><span class="img-wrap"><img data-src="/img/bVbinVL?w=473&amp;h=53" src="https://static.alili.tech/img/bVbinVL?w=473&amp;h=53" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>解决方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <style scoped>
    .a >>> .b { /* ... */ }
  </style>
    //有些像Sass之类的预处理器无法正确解析>>>。这种情况下你可以使用/deep/操作符取而代之- - - -这是一个>>>的别名，同样可以正常工作。
  <style scoped lang=“scss”>
    .a /deep/ .b { /* ... */ }
  </style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.a</span> &gt;&gt;&gt; <span class="hljs-selector-class">.b</span> { <span class="hljs-comment">/* ... */</span> }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    //有些像Sass之类的预处理器无法正确解析&gt;&gt;&gt;。这种情况下你可以使用/deep/操作符取而代之- - - -这是一个&gt;&gt;&gt;的别名，同样可以正常工作。
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">“scss”</span>&gt;</span><span class="undefined">
    .a /deep/ .b { /* ... */ }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h4>6.Vue数组/对象更新视图不更新</h4>
<ul><li>
<strong>场景一</strong> :很多时候我们习惯于这样操作数组和对象</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  data() { 
    return {
        arr: [1,2,3],
        obj:{
          a: 1,
          b: 2 
        }
    }; 
  },

  // 数组更新视图不更新
  this.arr[0] = 'OBKoro1';
  this.arr.length = 1;
  console.log(arr);// ['OBKoro1']; 
  // 数据更新，对象视图不更新     
  this.obj.c = 'OBKoro1';
  delete this.obj.a;
  console.log(obj);  // {b:2,c:'OBKoro1'}
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  data() { 
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">arr</span>: [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],
        <span class="hljs-attr">obj</span>:{
          <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
          <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> 
        }
    }; 
  },

  <span class="hljs-comment">// 数组更新视图不更新</span>
  <span class="hljs-keyword">this</span>.arr[<span class="hljs-number">0</span>] = <span class="hljs-string">'OBKoro1'</span>;
  <span class="hljs-keyword">this</span>.arr.length = <span class="hljs-number">1</span>;
  <span class="hljs-built_in">console</span>.log(arr);<span class="hljs-comment">// ['OBKoro1']; </span>
  <span class="hljs-comment">// 数据更新，对象视图不更新     </span>
  <span class="hljs-keyword">this</span>.obj.c = <span class="hljs-string">'OBKoro1'</span>;
  <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>.obj.a;
  <span class="hljs-built_in">console</span>.log(obj);  <span class="hljs-comment">// {b:2,c:'OBKoro1'}</span>
 </code></pre>
<ul><li>
<p><strong>解决方法</strong> ：</p>
<ul>
<li>this. $set(你要改变的数组/对象，你要改变的位置/key,你要改成什么value)</li>
<li>数组原生方法触发视图更新（ <a href="https://cn.vuejs.org/v2/guide/list.html#%E5%8F%98%E5%BC%82%E6%96%B9%E6%B3%95" rel="nofollow noreferrer" target="_blank">vue官网可查</a>）:</li>
<li>整体替换数组/对象</li>
</ul>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/bVbinVH?w=1444&amp;h=574" src="https://static.alili.tech/img/bVbinVH?w=1444&amp;h=574" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>7.Vue Filters过滤器的使用</h4>
<ul><li>
<strong>场景一</strong> :常见的数据文本的格式化</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <!-- 在双花括号中 -->
  <div>"{{" message | DateFormat "}}"</div>    //展示正确时间
  <!-- 在'v-bind'中 -->
  <div v-bind:id=&quot;rawId | formatId&quot;></div>

  Demo:一个日期过滤器返回yyyy- MM-ddhh:mm:ss的样式
  引入一个提前写好日期格式化的js
  import dayjs from ‘dayjs';
  export default {
     data() {
        return {
                //时间毫秒
                message:18324798324789 
            }
    },
    filters: {
          //传入进行日期格式化
      DateFormat(value) {
        return dayjs(value).format(“YYYY-MM-DD HH:mm:ss&quot;)
          } 
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  &lt;!-- 在双花括号中 --&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{" message | DateFormat "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>    <span class="hljs-comment">//展示正确时间</span>
  &lt;!-- 在<span class="hljs-string">'v-bind'</span>中 --&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-bind:id</span>=<span class="hljs-string">"rawId | formatId"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

  Demo:一个日期过滤器返回yyyy- MM-ddhh:mm:ss的样式
  引入一个提前写好日期格式化的js
  <span class="hljs-keyword">import</span> dayjs <span class="hljs-keyword">from</span> ‘dayjs<span class="hljs-string">';
  export default {
     data() {
        return {
                //时间毫秒
                message:18324798324789 
            }
    },
    filters: {
          //传入进行日期格式化
      DateFormat(value) {
        return dayjs(value).format(“YYYY-MM-DD HH:mm:ss")
          } 
    }
  }</span></code></pre>
<h4>8.Vue深度watch与watch立即触发回调</h4>
<ul><li>
<p><strong>场景一</strong> :在watch里面监测对象里面对应的值是监测不到的，可以用如下方法。</p>
<ul>
<li>选项: deep</li>
<li>在选项参数中指定deep:true,可以监听对象中子属性的变化。</li>
<li>选项: immediate</li>
<li>在选项参数中指定immediate:true,将立即以表达式的当前值触发回调，也就是默认触发一次。</li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  watch: {
    obj: {
        handler(val, oldVal) {
          console.log('属性变化触发这个回调',val, oldVal); 
        },
        deep: true // 监测这个对象中每一个属性的变化
    },
    step: { // 属性 //watch
       handler(val, oldVal) {
        console.log(&quot;默认触发一次&quot;, val, oldVal); 
       },
       immediate: true // 默认触发一次
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  watch: {
    <span class="hljs-attr">obj</span>: {
        handler(val, oldVal) {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'属性变化触发这个回调'</span>,val, oldVal); 
        },
        <span class="hljs-attr">deep</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// 监测这个对象中每一个属性的变化</span>
    },
    <span class="hljs-attr">step</span>: { <span class="hljs-comment">// 属性 //watch</span>
       handler(val, oldVal) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"默认触发一次"</span>, val, oldVal); 
       },
       <span class="hljs-attr">immediate</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// 默认触发一次</span>
    }
  }</code></pre>
<p>欢迎大家一起探讨 ～～</p>
<blockquote>作者：老金 - <a href="https://github.com/hejinze789" rel="nofollow noreferrer" target="_blank">首席甩锅官</a><p>来源：<a href="https://honeybadger8.github.io/blog/" rel="nofollow noreferrer" target="_blank">@IT·平头哥联盟</a></p>
<p>链接：<a href="https://honeybadger8.github.io/blog/" rel="nofollow noreferrer" target="_blank">https://honeybadger8.github.i...</a></p>
<p>交流群：912594095[<code>资源获取/交流群</code>]、386485473(前端) 、260282062(测试)</p>
<p>本文原创，著作权归作者所有。商业转载请联系<code>@IT·平头哥联盟</code>获得授权，非商业转载请注明链接及出处。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初学者可能不知道的vue技巧

## 原文链接
[https://segmentfault.com/a/1190000016735899](https://segmentfault.com/a/1190000016735899)


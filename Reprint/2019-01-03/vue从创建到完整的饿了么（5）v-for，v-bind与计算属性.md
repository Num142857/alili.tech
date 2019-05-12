---
title: 'vue从创建到完整的饿了么（5）v-for，v-bind与计算属性' 
date: 2019-01-03 2:30:10
hidden: true
slug: 7il6g4lj1yc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">说明</h2>
<p>1.上一章--<a href="https://segmentfault.com/a/1190000010871856">Home.vue及vue-resource使用</a><br>2.cangdu大神的项目源码地址--<a href="https://github.com/bailicangdu/vue2-elm" rel="nofollow noreferrer" target="_blank">Github地址</a><br>3.接口地址--<a href="https://github.com/bailicangdu/node-elm/blob/master/API.md" rel="nofollow noreferrer" target="_blank">Github地址</a><br>4.UI框架用的是--<a href="https://mint-ui.github.io/#!/zh-cn" rel="nofollow noreferrer" target="_blank">Mint UI</a><br>5.下一章--<a href="https://segmentfault.com/a/1190000010889455">登录注册页面及密码的暗明文转换</a></p>
<h2 id="articleHeader1">开始</h2>
<p>1.先看看Home.vue代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    
        <mt-header fixed>
            <span slot=&quot;left&quot;>elm</span>
            <mt-button slot=&quot;right&quot;>登录|</mt-button>
            <mt-button slot=&quot;right&quot;>注册</mt-button>
        </mt-header>
    

    <div class=&quot;padtop40&quot;>
      <div class=&quot;after ih50 padlr10 box bgfff&quot;>
        <span  class=&quot;&quot;>当前选择城市</span>
        <span  class=&quot;right fs0-8 col9f&quot;>定位不准时，请在城市列表选择</span>
      </div>
      <mt-cell  title=&quot;天津&quot; class=&quot;col after&quot; to=&quot;&quot;  is-link  value=&quot;&quot;></mt-cell>

      <div class=&quot;mgtop10 bgfff&quot;>
        <mt-cell class=&quot;after&quot; title=&quot;热门城市&quot;></mt-cell>
        <div class=&quot;itembox ovhid col&quot;>
          <div>天津</div><div>天津</div><div>天津</div><div>天津</div>
          <div>天津</div><div>天津</div><div>天津</div><div>天津</div>
          <div>天津</div><div>天津</div><div>天津</div><div>天津</div>
        </div>        
      </div>         

      <div class=&quot;mgtop10 bgfff&quot;>
        <mt-cell class=&quot;after&quot; title=&quot;A&quot;></mt-cell>
        <div class=&quot;itembox ovhid&quot;>
          <div>天津</div><div>天津</div><div>天津</div><div>天津</div>
          <div>天津</div><div>天津</div><div>天津</div><div>天津</div>
          <div>天津</div><div>天津</div>
        </div>        
      </div>    

    </div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
     
    }
  },
  component:{
  //注册组件

  },
  mounted:function(){
  //生命周期
      this.$http.get('http://cangdu.org:8001/v1/cities?type=group').then(response => {
        console.log(response);
      }, response => {
        console.log(response);
        
      });
  },
  computed:{
  //计算属性

  },
  methods:{
  //函数

  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
.itembox>div{
  width:25%;
  float:left;
  text-align:center;
  height:40px;
  line-height:40px;
  box-sizing: border-box;
  border-right:1px solid #e4e4e4;
  border-bottom:1px solid #e4e4e4;
}
.itembox>div:nth-child(4n){
  border-right:0px;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-header</span> <span class="hljs-attr">fixed</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"left"</span>&gt;</span>elm<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span>&gt;</span>登录|<span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span>&gt;</span>注册<span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mt-header</span>&gt;</span>
    

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"padtop40"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"after ih50 padlr10 box bgfff"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">""</span>&gt;</span>当前选择城市<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">"right fs0-8 col9f"</span>&gt;</span>定位不准时，请在城市列表选择<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mt-cell</span>  <span class="hljs-attr">title</span>=<span class="hljs-string">"天津"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col after"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">""</span>  <span class="hljs-attr">is-link</span>  <span class="hljs-attr">value</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-cell</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgtop10 bgfff"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-cell</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"after"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"热门城市"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-cell</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"itembox ovhid col"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>         

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgtop10 bgfff"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-cell</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"after"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"A"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-cell</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"itembox ovhid"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
     
    }
  },
  <span class="hljs-attr">component</span>:{
  <span class="hljs-comment">//注册组件</span>

  },
  <span class="hljs-attr">mounted</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">//生命周期</span>
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/v1/cities?type=group'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
      }, response =&gt; {
        <span class="hljs-built_in">console</span>.log(response);
        
      });
  },
  <span class="hljs-attr">computed</span>:{
  <span class="hljs-comment">//计算属性</span>

  },
  <span class="hljs-attr">methods</span>:{
  <span class="hljs-comment">//函数</span>

  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.itembox</span>&gt;<span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">25%</span>;
  <span class="hljs-attribute">float</span>:left;
  <span class="hljs-attribute">text-align</span>:center;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>;
  <span class="hljs-attribute">line-height</span>:<span class="hljs-number">40px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">border-right</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#e4e4e4</span>;
  <span class="hljs-attribute">border-bottom</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#e4e4e4</span>;
}
<span class="hljs-selector-class">.itembox</span>&gt;<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(4n)</span>{
  <span class="hljs-attribute">border-right</span>:<span class="hljs-number">0px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>效果如下<span class="img-wrap"><img data-src="/img/bVTMsh?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVTMsh?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2.赋值</p>
<p>首先我们要把城市列表的信息先赋值给一个变量，这样我们就可以调用了嘛。<span class="img-wrap"><img data-src="/img/bVTMvq?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVTMvq?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>3.v-for<br>城市列表我们有了，但是我们怎么把它显示到页面呢？难道要用<code>for</code>循环拼接字符串插到页里么？NONONO，那还是操作DOM节点，而VUE的好处之一就是操作数据来控制DOM。循环VUE用的是<a href="https://cn.vuejs.org/v2/guide/list.html#v-for" rel="nofollow noreferrer" target="_blank">v-for</a>，<code>home.vue</code>的html部分代码修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    
        <mt-header fixed>
            <span slot=&quot;left&quot;>elm</span>
            <mt-button slot=&quot;right&quot;>登录|</mt-button>
            <mt-button slot=&quot;right&quot;>注册</mt-button>
        </mt-header>
    

    <div class=&quot;padtop40&quot;>
      <div class=&quot;after ih50 padlr10 box bgfff&quot;>
        <span  class=&quot;&quot;>当前选择城市</span>
        <span  class=&quot;right fs0-8 col9f&quot;>定位不准时，请在城市列表选择</span>
      </div>
      <mt-cell  title=&quot;天津&quot; class=&quot;col after&quot; to=&quot;&quot;  is-link  value=&quot;&quot;></mt-cell>

      <div class=&quot;mgtop10 bgfff&quot;>
        <mt-cell class=&quot;after&quot; title=&quot;热门城市&quot;></mt-cell>
        <div class=&quot;itembox ovhid col&quot;>
          <div>天津</div><div>天津</div><div>天津</div><div>天津</div>
          <div>天津</div><div>天津</div><div>天津</div><div>天津</div>
          <div>天津</div><div>天津</div><div>天津</div><div>天津</div>
        </div>        
      </div>         

       <div v-for=&quot;(items,index) in citylist&quot; class=&quot;mgtop10 bgfff&quot;>
        <mt-cell class=&quot;after&quot; :title=&quot;index&quot;></mt-cell>
        <div class=&quot;itembox ovhid&quot;>
          <div v-for=&quot;item in items&quot;>"{{"item.name"}}"</div>
        </div>        
      </div>  

    </div>
    
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-header</span> <span class="hljs-attr">fixed</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"left"</span>&gt;</span>elm<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span>&gt;</span>登录|<span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span>&gt;</span>注册<span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mt-header</span>&gt;</span>
    

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"padtop40"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"after ih50 padlr10 box bgfff"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">""</span>&gt;</span>当前选择城市<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">"right fs0-8 col9f"</span>&gt;</span>定位不准时，请在城市列表选择<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mt-cell</span>  <span class="hljs-attr">title</span>=<span class="hljs-string">"天津"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col after"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">""</span>  <span class="hljs-attr">is-link</span>  <span class="hljs-attr">value</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-cell</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgtop10 bgfff"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-cell</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"after"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"热门城市"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-cell</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"itembox ovhid col"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>         

       <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(items,index) in citylist"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgtop10 bgfff"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-cell</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"after"</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"index"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-cell</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"itembox ovhid"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>其实只是把全部城市列表的代码修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div v-for=&quot;(items,index) in citylist&quot; class=&quot;mgtop10 bgfff&quot;>
        <mt-cell class=&quot;after&quot; :title=&quot;index&quot;></mt-cell>
        <div class=&quot;itembox ovhid&quot;>
          <div v-for=&quot;item in items&quot;>"{{"item.name"}}"</div>
        </div>        
 </div>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code> &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(items,index) in citylist"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"mgtop10 bgfff"</span>&gt;
        &lt;mt-cell <span class="hljs-built_in">class</span>=<span class="hljs-string">"after"</span> :title=<span class="hljs-string">"index"</span>&gt;&lt;/mt-cell&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"itembox ovhid"</span>&gt;
          &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in items"</span>&gt;"{{"<span class="hljs-built_in">item</span>.<span class="hljs-built_in">name</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;        
 &lt;/<span class="hljs-keyword">div</span>&gt;  </code></pre>
<p>修改第一段代码<code>v-for="(items,index) in citylist"</code><br><code>citylist</code>是一个<code>object</code>对象（也可以是数组），<code>items</code>是<code>citylist</code>的每一项键值，<code>index</code>是<code>items</code>的键名（若为数组则是1，2,3...递增）。<code>citylist</code>有多少项，就会循环多少次，就会产生多少个元素（该元素为 v-for 写在的那个元素，其内的子元素也会自动生成）。然后就可以用<code>item</code>在元素中当做键值来使用。</p>
<p>修改第二段代码<code>:title="index"</code><br>因为咱们获取的数据的键名就是A,B,C,D...所以咱们的城市列表直接用<code>index</code>来排序。而<code>:title="index"</code>是<code> v-bind:title="index"</code>的缩写。vue的命令都用<code>v-</code>来开头。<a href="https://cn.vuejs.org/v2/api/#v-bind" rel="nofollow noreferrer" target="_blank">v-bind</a>用来绑定DOM属性。</p>
<p>修改第三段代码<code>&lt;div v-for="item in items"&gt;"{{"item.name"}}"&lt;/div&gt;</code><br>老铁们要注意，若<code>items</code>是A开头的城市数组集合，而<code>item</code>是<code>items</code>的 每一项，即一个具体的城市（这只是举一个例子）</p>
<p>ok，代码咱们先写这么多，来看看页面变化。<span class="img-wrap"><img data-src="/img/bVTMFa?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVTMFa?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>全部出现！！老铁们可以看到，咱们只需要写一个模板，vue会帮我们自动生成所有的数据。但是还有几个问题需要处理一下<br>1.数据的顺序并不是从A挨个排到Z；<br>2.有的城市名字太长出现重叠。</p>
<p>4.排序<br>思路：重新创建一个object，键名是从A到Z，键值就是获取的数据的键值。<br>计算函数：js写在哪？一种方法是写在生命周期<code>mounted</code>的数据请求里，直接返回一个处理好的<code>citylist</code>，但咱们用另一种方法--<a href="https://cn.vuejs.org/v2/guide/computed.html#%E5%9F%BA%E7%A1%80%E4%BE%8B%E5%AD%90" rel="nofollow noreferrer" target="_blank">计算属性computed</a>。<code>home.vue</code>部分是代码修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed:{
  //计算属性
      getlist:function(){
        var mycitylist={};
          for(var i=65;i<=90;i++){
            var num= String.fromCharCode(i);
            mycitylist[num]=this.citylist[num];
          }
          return mycitylist
      }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>computed:{
  <span class="hljs-comment">//计算属性</span>
      getlist:function(){
        <span class="hljs-keyword">var</span> mycitylist={};
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">65</span>;i&lt;=<span class="hljs-number">90</span>;i++){
            <span class="hljs-keyword">var</span> <span class="hljs-built_in">num</span>= <span class="hljs-built_in">String</span>.fromCharCode(i);
            mycitylist[<span class="hljs-built_in">num</span>]=<span class="hljs-keyword">this</span>.citylist[<span class="hljs-built_in">num</span>];
          }
          <span class="hljs-keyword">return</span> mycitylist
      }
  },</code></pre>
<p><code>fromCharCode()</code>是把ascii码转成字符，所以<code>num</code>就是A,B,C,D...当我们调用getlist函数时，得到的是<code>mycitylist</code>（当<code>citylist</code>改变时，无需重新调用，<code>mycitylist</code>会随之改变）<br>函数写好了在哪调用呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div v-for=&quot;(items,index) in getlist&quot; class=&quot;mgtop10 bgfff&quot;>
        <mt-cell class=&quot;after&quot; :title=&quot;index&quot;></mt-cell>
        <div class=&quot;itembox ovhid&quot;>
          <div v-for=&quot;item in items&quot;>"{{"item.name"}}"</div>
        </div>        
      </div>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(items,index) in getlist"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"mgtop10 bgfff"</span>&gt;
        &lt;mt-cell <span class="hljs-built_in">class</span>=<span class="hljs-string">"after"</span> :title=<span class="hljs-string">"index"</span>&gt;&lt;/mt-cell&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"itembox ovhid"</span>&gt;
          &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in items"</span>&gt;"{{"<span class="hljs-built_in">item</span>.<span class="hljs-built_in">name</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;        
      &lt;/<span class="hljs-keyword">div</span>&gt;  </code></pre>
<p>只是把<code>&lt;template&gt;&lt;/template&gt;</code>中的<code>citylist</code>替换成<code>getlist</code>即可。<br>看看页面结果<span class="img-wrap"><img data-src="/img/bVTMUw?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVTMUw?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>解决！城市已经按照A-Z排列，只剩下名字长度问题了，设置为单行不换行超出省略号即可，在src下的style下的<code>mycss.css</code>添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".nowarp{
    white-space:nowrap;          /* 不换行 */
    overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;   /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.nowarp</span>{
    <span class="hljs-attribute">white-space</span>:nowrap;          <span class="hljs-comment">/* 不换行 */</span>
    <span class="hljs-attribute">overflow</span>:hidden;               <span class="hljs-comment">/* 内容超出宽度时隐藏超出部分的内容 */</span>
    <span class="hljs-attribute">text-overflow</span>:ellipsis;   <span class="hljs-comment">/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/</span>
}</code></pre>
<p>把<code>nowarp</code>这个class加到城市名字的<code>div</code>上即可<br><span class="img-wrap"><img data-src="/img/bVTMVb?w=379&amp;h=670" src="https://static.alili.tech/img/bVTMVb?w=379&amp;h=670" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>解决。这么看城市列表是没有问题了，那咱们接下来请求热门城市和当前城市。<code>home.vue</code>修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    
        <mt-header fixed>
            <span slot=&quot;left&quot;>elm</span>
            <mt-button slot=&quot;right&quot;>登录|</mt-button>
            <mt-button slot=&quot;right&quot;>注册</mt-button>
        </mt-header>
    

    <div class=&quot;padtop40&quot;>
      <div class=&quot;after ih50 padlr10 box bgfff&quot;>
        <span  class=&quot;&quot;>当前选择城市</span>
        <span  class=&quot;right fs0-8 col9f&quot;>定位不准时，请在城市列表选择</span>
      </div>
      <mt-cell  :title=&quot;nowcity.name&quot; class=&quot;col after&quot; to=&quot;&quot;  is-link  value=&quot;&quot;></mt-cell>

      <div class=&quot;mgtop10 bgfff&quot;>
        <mt-cell class=&quot;after&quot; title=&quot;热门城市&quot;></mt-cell>
        <div class=&quot;itembox ovhid col&quot;>
          <div v-for=&quot;item in hotcity&quot;>"{{"item.name"}}"</div>
        </div>        
      </div>         

      <div v-for=&quot;(items,index) in getlist&quot; class=&quot;mgtop10 bgfff&quot;>
        <mt-cell class=&quot;after&quot; :title=&quot;index&quot;></mt-cell>
        <div class=&quot;itembox ovhid&quot;>
          <div class=&quot;nowarp&quot; v-for=&quot;item in items&quot;>"{{"item.name"}}"</div>
        </div>        
      </div>  

    </div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
      citylist:&quot;&quot;,
      hotcity:&quot;&quot;,
      nowcity:&quot;&quot;
    }
  },
  component:{
  //注册组件

  },
  mounted:function(){
  //生命周期
      //城市列表
      this.$http.get('http://cangdu.org:8001/v1/cities?type=group').then(response => {
        console.log(response);
        this.citylist=response.body;
      }, response => {
        console.log(response);
        
      });
      //热门城市
      this.$http.get('http://cangdu.org:8001/v1/cities?type=hot').then(response => {
        console.log(response);
        this.hotcity=response.body;
      }, response => {
        console.log(response);
        
      });
      //定位城市
      this.$http.get('http://cangdu.org:8001/v1/cities?type=guess').then(response => {
        console.log(response);
        this.nowcity=response.body;
      }, response => {
        console.log(response);
        
      });

  },
  computed:{
  //计算属性
      getlist:function(){
        var mycitylist={};
          for(var i=65;i<=90;i++){
            var num= String.fromCharCode(i);
            mycitylist[num]=this.citylist[num];
          }
          return mycitylist
      }
  },
  methods:{
  //函数

  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
.itembox>div{
  width:25%;
  float:left;
  text-align:center;
  height:40px;
  line-height:40px;
  box-sizing: border-box;
  border-right:1px solid #e4e4e4;
  border-bottom:1px solid #e4e4e4;
}
.itembox>div:nth-child(4n){
  border-right:0px;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-header</span> <span class="hljs-attr">fixed</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"left"</span>&gt;</span>elm<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span>&gt;</span>登录|<span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span>&gt;</span>注册<span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mt-header</span>&gt;</span>
    

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"padtop40"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"after ih50 padlr10 box bgfff"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">""</span>&gt;</span>当前选择城市<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">"right fs0-8 col9f"</span>&gt;</span>定位不准时，请在城市列表选择<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mt-cell</span>  <span class="hljs-attr">:title</span>=<span class="hljs-string">"nowcity.name"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col after"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">""</span>  <span class="hljs-attr">is-link</span>  <span class="hljs-attr">value</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-cell</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgtop10 bgfff"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-cell</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"after"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"热门城市"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-cell</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"itembox ovhid col"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in hotcity"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>         

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(items,index) in getlist"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgtop10 bgfff"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-cell</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"after"</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"index"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-cell</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"itembox ovhid"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nowarp"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">citylist</span>:<span class="hljs-string">""</span>,
      <span class="hljs-attr">hotcity</span>:<span class="hljs-string">""</span>,
      <span class="hljs-attr">nowcity</span>:<span class="hljs-string">""</span>
    }
  },
  <span class="hljs-attr">component</span>:{
  <span class="hljs-comment">//注册组件</span>

  },
  <span class="hljs-attr">mounted</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">//生命周期</span>
      <span class="hljs-comment">//城市列表</span>
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/v1/cities?type=group'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
        <span class="hljs-keyword">this</span>.citylist=response.body;
      }, response =&gt; {
        <span class="hljs-built_in">console</span>.log(response);
        
      });
      <span class="hljs-comment">//热门城市</span>
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/v1/cities?type=hot'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
        <span class="hljs-keyword">this</span>.hotcity=response.body;
      }, response =&gt; {
        <span class="hljs-built_in">console</span>.log(response);
        
      });
      <span class="hljs-comment">//定位城市</span>
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/v1/cities?type=guess'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
        <span class="hljs-keyword">this</span>.nowcity=response.body;
      }, response =&gt; {
        <span class="hljs-built_in">console</span>.log(response);
        
      });

  },
  <span class="hljs-attr">computed</span>:{
  <span class="hljs-comment">//计算属性</span>
      getlist:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> mycitylist={};
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">65</span>;i&lt;=<span class="hljs-number">90</span>;i++){
            <span class="hljs-keyword">var</span> num= <span class="hljs-built_in">String</span>.fromCharCode(i);
            mycitylist[num]=<span class="hljs-keyword">this</span>.citylist[num];
          }
          <span class="hljs-keyword">return</span> mycitylist
      }
  },
  <span class="hljs-attr">methods</span>:{
  <span class="hljs-comment">//函数</span>

  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.itembox</span>&gt;<span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">25%</span>;
  <span class="hljs-attribute">float</span>:left;
  <span class="hljs-attribute">text-align</span>:center;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>;
  <span class="hljs-attribute">line-height</span>:<span class="hljs-number">40px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">border-right</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#e4e4e4</span>;
  <span class="hljs-attribute">border-bottom</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#e4e4e4</span>;
}
<span class="hljs-selector-class">.itembox</span>&gt;<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(4n)</span>{
  <span class="hljs-attribute">border-right</span>:<span class="hljs-number">0px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>页面结果如下<span class="img-wrap"><img data-src="/img/bVTMWs?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVTMWs?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>搞定！<code>home.vue</code>大致写完了，剩下就是交互了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue从创建到完整的饿了么（5）v-for，v-bind与计算属性

## 原文链接
[https://segmentfault.com/a/1190000010873858](https://segmentfault.com/a/1190000010873858)


---
title: 'vue从创建到完整的饿了么（10）city.vue的完善（v-if 的简单使用及本地缓存的存储与读取）' 
date: 2019-01-02 2:30:09
hidden: true
slug: gthzkoicp35
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">说明</h2>
<p>1.上一章--<a href="https://segmentfault.com/a/1190000010943136">页面图标ico的设置</a><br>2.苍渡大神的项目源码--<a href="https://github.com/bailicangdu/vue2-elm" rel="nofollow noreferrer" target="_blank">项目地址</a><br>3.UI框架--<a href="https://mint-ui.github.io/#!/zh-cn" rel="nofollow noreferrer" target="_blank">Mint ui</a><br>4.数据接口地址--<a href="https://github.com/bailicangdu/node-elm/blob/master/API.md" rel="nofollow noreferrer" target="_blank">接口地址</a><br>5.下一章--<a href="https://segmentfault.com/a/1190000010996077">组件的使用（svg及watch的简单使用）</a></p>
<h2 id="articleHeader1">开始</h2>
<p>1.先看看咱们目前的city样式<br><span class="img-wrap"><img data-src="/img/bVT43e?w=384&amp;h=676" src="https://static.alili.tech/img/bVT43e?w=384&amp;h=676" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2.再来看看咱们需要实现的样式<br><span class="img-wrap"><img data-src="/img/bVT43H?w=380&amp;h=674" src="https://static.alili.tech/img/bVT43H?w=380&amp;h=674" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVT43U?w=383&amp;h=683" src="https://static.alili.tech/img/bVT43U?w=383&amp;h=683" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>3.样式<br>city.vue样式修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <mt-header :title=&quot;$store.state.nowcity.name&quot; class='fs1-2' fixed>
        <mt-button slot=&quot;left&quot;><mt-button icon=&quot;back&quot;></mt-button></mt-button>
        <mt-button slot=&quot;right&quot; class='fs0-8'>切换城市</mt-button>
    </mt-header>

    <div class=&quot;mgtop50 padlr10 bgfff padbot10&quot;>
      <input class=&quot;cityinput&quot; placeholder=&quot;输入商务楼，学校，地址&quot;></input>
      <div class=&quot;submit bgcol ih40&quot;>提交</div>
    </div>

    <div class=&quot;main&quot;>

      <div class=&quot;his after&quot;>
        <div class='maintop fs0-8 padlr10'>搜索历史</div>
        <div class=&quot;mainbody bgfff &quot;>
          <div class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>南开区公园</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>天津市南开区金马路112号</div>
          </div>
          <div class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>南开区公园</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>天津市南开区金马路112号</div>
          </div>
          <div class=&quot;clearall ih30 pad10 col9f&quot;>
              清空所有
          </div>
        </div>
      </div>

      <div class='search bgfff'> 
          <div class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>南开区公园</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>天津市南开区金马路112号</div>
          </div>
          <div class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>南开区公园</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>天津市南开区金马路112号</div>
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
.cityinput{
  width:100%;
  height:40px;
  margin:10px 0px;
  outline:0px;
  padding:0px 5px;
  box-sizing:border-box;
}
.submit{
  text-align:center;
  color:white;
  border-radius:3px;
}
.fs0-8{
  font-size:0.8rem !important;
}

.main{
  border-top:2px solid #E4E4E4;
}
.maintop{ 
  border-bottom:2px solid #E4E4E4;
}
.clearall{
  text-align:center;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mt-header</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"$store.state.nowcity.name"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'fs1-2'</span> <span class="hljs-attr">fixed</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"back"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'fs0-8'</span>&gt;</span>切换城市<span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">mt-header</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgtop50 padlr10 bgfff padbot10"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cityinput"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"输入商务楼，学校，地址"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"submit bgcol ih40"</span>&gt;</span>提交<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"his after"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'maintop fs0-8 padlr10'</span>&gt;</span>搜索历史<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mainbody bgfff "</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30"</span>&gt;</span>南开区公园<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;</span>天津市南开区金马路112号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30"</span>&gt;</span>南开区公园<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;</span>天津市南开区金马路112号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clearall ih30 pad10 col9f"</span>&gt;</span>
              清空所有
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'search bgfff'</span>&gt;</span> 
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30"</span>&gt;</span>南开区公园<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;</span>天津市南开区金马路112号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30"</span>&gt;</span>南开区公园<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;</span>天津市南开区金马路112号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
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
<span class="hljs-selector-class">.cityinput</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>;
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">10px</span> <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">outline</span>:<span class="hljs-number">0px</span>;
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">0px</span> <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">box-sizing</span>:border-box;
}
<span class="hljs-selector-class">.submit</span>{
  <span class="hljs-attribute">text-align</span>:center;
  <span class="hljs-attribute">color</span>:white;
  <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">3px</span>;
}
<span class="hljs-selector-class">.fs0-8</span>{
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">0.8rem</span> <span class="hljs-meta">!important</span>;
}

<span class="hljs-selector-class">.main</span>{
  <span class="hljs-attribute">border-top</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#E4E4E4</span>;
}
<span class="hljs-selector-class">.maintop</span>{ 
  <span class="hljs-attribute">border-bottom</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#E4E4E4</span>;
}
<span class="hljs-selector-class">.clearall</span>{
  <span class="hljs-attribute">text-align</span>:center;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>页面显示为<br><span class="img-wrap"><img data-src="/img/bVT5s7?w=509&amp;h=856" src="https://static.alili.tech/img/bVT5s7?w=509&amp;h=856" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们先把所有的样式都写出来，然后再来控制显示哪个div</p>
<p>4.点击搜索<br>4.1当我们在搜索框输入地址后，点击提交，应该弹出所有搜索的地址。所以我们应该设置一个变量<code>inputval</code>来存放输入框的值，一个变量<code>list</code>来存放搜索到的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" data () {
    return {
      inputval:&quot;&quot;,
      list:&quot;&quot;
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code> data () {
    <span class="hljs-class">return </span>{
<span class="hljs-symbol">      inputval:</span><span class="hljs-string">""</span>,
<span class="hljs-symbol">      list:</span><span class="hljs-string">""</span>
    }
  }</code></pre>
<p>4.2点击事件。先看数据接口api<br><span class="img-wrap"><img data-src="/img/bVT5zb?w=979&amp;h=566" src="https://static.alili.tech/img/bVT5zb?w=979&amp;h=566" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>先写发送请求函数<code>searchcity</code>（这里我把参数拼接到url上就没错，在url后加个{}来传参数就报 参数错误 ，哪位老铁知道玄机么？）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
  //函数
    searchcity:function(){
      this.$http.get('http://cangdu.org:8001/v1/pois?city_id='+this.$store.state.nowcity.id+'&amp;keyword='+this.inputval+'&amp;type=search').then(response => {
        console.log(response);
        this.list=response.body;
      }, response => {
        console.log(response);
        
      });
    }

  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>methods:{
  <span class="hljs-comment">//函数</span>
    searchcity:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/v1/pois?city_id='</span>+<span class="hljs-keyword">this</span>.$store.state.nowcity.id+<span class="hljs-string">'&amp;keyword='</span>+<span class="hljs-keyword">this</span>.inputval+<span class="hljs-string">'&amp;type=search'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
        <span class="hljs-keyword">this</span>.list=response.body;
      }, <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
        
      });
    }

  }</code></pre>
<p><code>this.$store.state.nowcity.id</code>是从vuex里获取当前城市的id，在<a href="https://segmentfault.com/a/1190000010932176" target="_blank">第八章</a>存入；<code>this.inputval</code>是咱们输入框的值。<br>然后把点击函数<code>searchcity</code>绑定到元素上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div @click=&quot;searchcity&quot; class=&quot;submit bgcol ih40&quot;>提交</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;"> &lt;<span class="hljs-keyword">div</span> @click=<span class="hljs-string">"searchcity"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"submit bgcol ih40"</span>&gt;提交&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>运行试试，结果如下<br><span class="img-wrap"><img data-src="/img/bVT5MZ?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVT5MZ?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>解决，可以看到数据已经请求回来了。</p>
<p>4.3显示<br>现在我们来控制<code>class='his'</code>（搜索历史的div）和class='search'（搜索结果的div）的显示与隐藏。当我们点击提交时，请求数据，将请求的数据加到<code>list</code>上去。那我们就判断，<code>list</code>为空时，说明没点提交，就显示搜索历史的div，<code>list</code>不为空时，显示搜索结果的div。<br>那我们怎么控制div的显示隐藏呢？vue封装了一个方法<a href="https://cn.vuejs.org/v2/api/#v-if" rel="nofollow noreferrer" target="_blank">v-if</a>。在使用元素上加上<code>v-if=""</code>即可，只要<code>""</code>中间返回的值是<code>true</code>，元素就会显示，反之则隐藏。<code>main</code>div修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;main&quot;>

      <div v-if=&quot;list==''&quot; class=&quot;his after&quot;>
        <div class='maintop fs0-8 padlr10'>搜索历史</div>
        <div class=&quot;mainbody bgfff &quot;>
          <div class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>南开区公园</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>天津市南开区金马路112号</div>
          </div>
          <div class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>南开区公园</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>天津市南开区金马路112号</div>
          </div>
          <div class=&quot;clearall ih30 pad10 col9f&quot;>
              清空所有
          </div>
        </div>
      </div>

      <div v-if=&quot;list!=''&quot; class='search bgfff'> 
          <div class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>南开区公园</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>天津市南开区金马路112号</div>
          </div>
          
      </div>

    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main"</span>&gt;

      &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"list==''"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"his after"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>='maintop fs0<span class="hljs-number">-8</span> padlr10'&gt;搜索历史&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"mainbody bgfff "</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30"</span>&gt;南开区公园&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;天津市南开区金马路<span class="hljs-number">112</span>号&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30"</span>&gt;南开区公园&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;天津市南开区金马路<span class="hljs-number">112</span>号&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"clearall ih30 pad10 col9f"</span>&gt;
              清空所有
          &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;/<span class="hljs-keyword">div</span>&gt;

      &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"list!=''"</span> <span class="hljs-built_in">class</span>='search bgfff'&gt; 
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30"</span>&gt;南开区公园&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;天津市南开区金马路<span class="hljs-number">112</span>号&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
          
      &lt;/<span class="hljs-keyword">div</span>&gt;

    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>div显示隐藏写好了，下面用显示数据。数据循环显示依旧用<code>v-for</code>，咱们在<a href="https://segmentfault.com/a/1190000010873858">第五章</a>已经讲过了。<code>main</code>div修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;main&quot;>

      <div v-if=&quot;list==''&quot; class=&quot;his after&quot;>
        <div class='maintop fs0-8 padlr10'>搜索历史</div>
        <div class=&quot;mainbody bgfff &quot;>
          <div class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>南开区公园</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>天津市南开区金马路112号</div>
          </div>
          <div class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>南开区公园</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>天津市南开区金马路112号</div>
          </div>
          <div class=&quot;clearall ih30 pad10 col9f&quot;>
              清空所有
          </div>
        </div>
      </div>

      <div v-if=&quot;list!=''&quot; class='search bgfff'> 
          <div v-for=&quot;item in list&quot; class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>"{{"item.name"}}"</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>"{{"item.address"}}"</div>
          </div>
      </div>

    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main"</span>&gt;

      &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"list==''"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"his after"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>='maintop fs0<span class="hljs-number">-8</span> padlr10'&gt;搜索历史&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"mainbody bgfff "</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30"</span>&gt;南开区公园&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;天津市南开区金马路<span class="hljs-number">112</span>号&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30"</span>&gt;南开区公园&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;天津市南开区金马路<span class="hljs-number">112</span>号&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"clearall ih30 pad10 col9f"</span>&gt;
              清空所有
          &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;/<span class="hljs-keyword">div</span>&gt;

      &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"list!=''"</span> <span class="hljs-built_in">class</span>='search bgfff'&gt; 
          &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in list"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30"</span>&gt;"{{"<span class="hljs-built_in">item</span>.<span class="hljs-built_in">name</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;"{{"<span class="hljs-built_in">item</span>.address"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;/<span class="hljs-keyword">div</span>&gt;

    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>看看结果<br><span class="img-wrap"><img data-src="/img/bVT6KI?w=392&amp;h=685" src="https://static.alili.tech/img/bVT6KI?w=392&amp;h=685" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVT6MB?w=388&amp;h=680" src="https://static.alili.tech/img/bVT6MB?w=388&amp;h=680" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>完美！数据显示成功。</p>
<p>5.存储搜索历史</p>
<p>首先我们要设置一个变量<code>his</code>来存放搜索历史，这样我们显示的时候直接<code>v-for</code>循环就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
    return {
      inputval:&quot;&quot;,
      list:&quot;&quot;,
      his:&quot;&quot;
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>data () {
    <span class="hljs-keyword">return</span> {
      inputva<span class="hljs-variable">l:</span><span class="hljs-string">""</span>,
      lis<span class="hljs-variable">t:</span><span class="hljs-string">""</span>,
      <span class="hljs-keyword">hi</span><span class="hljs-variable">s:</span><span class="hljs-string">""</span>
    }
  },</code></pre>
<p>现在要点击搜索结果列表，会有两个反应。一个是页面跳转到商家列表页，咱们先不做，另一个是把点击的地点存到搜索历史里。那我们把搜索历史存到哪里？想了想后觉得存到<code>localstorage</code>里（哪位老铁另有妙计？），既然要存，咱们自然不能犯前面的错误（只存名字），所以我们要把经度，纬度，经纬度合计，名字，地址都存进去。<br>先写点击事件<code>goaddress</code>在methods里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="goaddress:function(e){
      var arr=[];
      if(localStorage.getItem(&quot;his&quot;)){
          arr=JSON.parse(localStorage.getItem(&quot;his&quot;));
          arr.push(e);
      }else{
          arr.push(e);
      }
      localStorage.setItem(&quot;his&quot;,JSON.stringify(arr));
      this.his=JSON.parse(localStorage.getItem(&quot;his&quot;));
      this.list='';
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>goaddress:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
      <span class="hljs-keyword">var</span> arr=[];
      <span class="hljs-keyword">if</span>(localStorage.getItem(<span class="hljs-string">"his"</span>)){
          arr=<span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">"his"</span>));
          arr.push(e);
      }<span class="hljs-keyword">else</span>{
          arr.push(e);
      }
      localStorage.setItem(<span class="hljs-string">"his"</span>,<span class="hljs-built_in">JSON</span>.stringify(arr));
      <span class="hljs-keyword">this</span>.his=<span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">"his"</span>));
      <span class="hljs-keyword">this</span>.list=<span class="hljs-string">''</span>;
    },</code></pre>
<p>其中<code>his</code>使我们要存到<code>localStorage</code>里的键值名称，先判断有没有，有说明有历史记录，我们就把当前新加的地址放到<code>his</code>里，没有我们就新建一个<code>his</code>，然后再存到<code>localStorage</code>里。添加结束后我们要把<code>his</code>赋值给<code>city.vue</code>的his里，这样我们就可以循环his在页面里显示了（其实应该不用显示，直接页面就跳转了，但我们为了效果先不做跳转，先做历史记录的存储与读取，<code>this.list=''</code>是为了让搜索结果的div隐藏）。</p>
<p>函数写完后我们绑定到要点击的元素上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-if=&quot;list!=''&quot; class='search bgfff'> 
          <div v-for=&quot;item in list&quot; @click=&quot;goaddress({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash})&quot; class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>"{{"item.name"}}"</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>"{{"item.address"}}"</div>
          </div>
      </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"list!=''"</span> <span class="hljs-built_in">class</span>='search bgfff'&gt; 
          &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in list"</span> @click=<span class="hljs-string">"goaddress({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash})"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30"</span>&gt;"{{"<span class="hljs-built_in">item</span>.<span class="hljs-built_in">name</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;"{{"<span class="hljs-built_in">item</span>.address"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>咱们直接把要存储的对象当做参数传给点击事件goaddress，参数为{name:名字,latitude:经度,longitude:维度,address:地址,,geohash:经纬度合计}</p>
<p>现在我们先点击试试<br><span class="img-wrap"><img data-src="/img/bVUaFz?w=412&amp;h=697" src="https://static.alili.tech/img/bVUaFz?w=412&amp;h=697" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVUaFB?w=1557&amp;h=1039" src="https://static.alili.tech/img/bVUaFB?w=1557&amp;h=1039" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>成功！我们可以在右侧的控制台（F12）的Application下的localStorage里看到我们已经存进去了一条数据</p>
<p>6.显示搜索历史<br>现在我们的变量<code>his</code>已经有数据了，我们只需要把它显示出来就可以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div class=&quot;main&quot;>

      <div v-if=&quot;list==''&quot; class=&quot;his after&quot;>
        <div class='maintop fs0-8 padlr10'>搜索历史</div>
        <div v-if=&quot;his!=''&quot; class=&quot;mainbody bgfff &quot;>
          <div v-for=&quot;item in his&quot; class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>"{{"item.name"}}"</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>"{{"item.address"}}"</div>
          </div>
          <div class=&quot;clearall ih30 pad10 col9f&quot;>
              清空所有
          </div>
        </div>
      </div>

      <div v-if=&quot;list!=''&quot; class='search bgfff'> 
          <div v-for=&quot;item in list&quot; @click=&quot;goaddress({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash})&quot; class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>"{{"item.name"}}"</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>"{{"item.address"}}"</div>
          </div>
      </div>

    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code> &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main"</span>&gt;

      &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"list==''"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"his after"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>='maintop fs0<span class="hljs-number">-8</span> padlr10'&gt;搜索历史&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"his!=''"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"mainbody bgfff "</span>&gt;
          &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in his"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30"</span>&gt;"{{"<span class="hljs-built_in">item</span>.<span class="hljs-built_in">name</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;"{{"<span class="hljs-built_in">item</span>.address"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"clearall ih30 pad10 col9f"</span>&gt;
              清空所有
          &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;/<span class="hljs-keyword">div</span>&gt;

      &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"list!=''"</span> <span class="hljs-built_in">class</span>='search bgfff'&gt; 
          &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in list"</span> @click=<span class="hljs-string">"goaddress({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash})"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30"</span>&gt;"{{"<span class="hljs-built_in">item</span>.<span class="hljs-built_in">name</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;"{{"<span class="hljs-built_in">item</span>.address"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;/<span class="hljs-keyword">div</span>&gt;

    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>这时候发现 <code>清空所有</code> 按钮 并没有功能，所以我们再写一个清空搜索历史的函数<code>removeall</code>（并不会把搜索历史<code>his</code>与<code>localStorage</code>绑定起来，每次都要手动管理<code>his</code>，哪位老铁可有妙计？）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="removeall:function(){
      localStorage.clear();
      this.his=&quot;&quot;;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>removeall:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
      localStorage.clear();
      <span class="hljs-keyword">this</span>.his=<span class="hljs-string">""</span>;
    }</code></pre>
<p>然后绑定到<code>清空所有</code>的div上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div @click='removeall' class=&quot;clearall ih30 pad10 col9f&quot;>
              清空所有
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;div <span class="hljs-meta">@click</span>=<span class="hljs-symbol">'removeal</span>l' <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"clearall ih30 pad10 col9f"</span>&gt;
              清空所有
&lt;/div&gt;</code></pre>
<p>ok，运行试试</p>
<p><span class="img-wrap"><img data-src="/img/bVUaJ7?w=391&amp;h=681" src="https://static.alili.tech/img/bVUaJ7?w=391&amp;h=681" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVUaKc?w=391&amp;h=681" src="https://static.alili.tech/img/bVUaKc?w=391&amp;h=681" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVUaKi?w=400&amp;h=691" src="https://static.alili.tech/img/bVUaKi?w=400&amp;h=691" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVUaKw?w=409&amp;h=686" src="https://static.alili.tech/img/bVUaKw?w=409&amp;h=686" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVUaKC?w=396&amp;h=679" src="https://static.alili.tech/img/bVUaKC?w=396&amp;h=679" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVUaKL?w=1920&amp;h=1047" src="https://static.alili.tech/img/bVUaKL?w=1920&amp;h=1047" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>看着没问题了，但是可能有老铁已经注意到了--历史记录应该页面一进来就显示出来，所以我们应该在vue的生命周期<code>mounted</code>函数里写操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted:function(){
  //生命周期
    if(localStorage.getItem(&quot;his&quot;)){
     this.his=localStorage.getItem(&quot;his&quot;);
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>mounted:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
  <span class="hljs-comment">//生命周期</span>
    <span class="hljs-keyword">if</span>(localStorage.getItem(<span class="hljs-string">"his"</span>)){
     <span class="hljs-keyword">this</span>.his=localStorage.getItem(<span class="hljs-string">"his"</span>);
    }
  },</code></pre>
<p>判断本地缓存是否有<code>his</code>，有就加到city.vue里的<code>his</code>里。city.vue完整代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <mt-header :title=&quot;$store.state.nowcity.name&quot; class='fs1-2' fixed>
        <mt-button slot=&quot;left&quot;><mt-button icon=&quot;back&quot;></mt-button></mt-button>
        <mt-button slot=&quot;right&quot; class='fs0-8'>切换城市</mt-button>
    </mt-header>

    <div class=&quot;mgtop50 padlr10 bgfff padbot10&quot;>
      <input v-model=&quot;inputval&quot; class=&quot;cityinput&quot; placeholder=&quot;输入商务楼，学校，地址&quot;></input>
      <div @click=&quot;searchcity&quot; class=&quot;submit bgcol ih40&quot;>提交</div>
    </div>

    <div class=&quot;main&quot;>

      <div v-if=&quot;list==''&quot; class=&quot;his after&quot;>
        <div class='maintop fs0-8 padlr10'>搜索历史</div>
        <div v-if=&quot;his!=''&quot; class=&quot;mainbody bgfff &quot;>
          <div v-for=&quot;item in his&quot; class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>"{{"item.name"}}"</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>"{{"item.address"}}"</div>
          </div>
          <div @click='removeall' class=&quot;clearall ih30 pad10 col9f&quot;>
              清空所有
          </div>
        </div>
      </div>

      <div v-if=&quot;list!=''&quot; class='search bgfff'> 
          <div v-for=&quot;item in list&quot; @click=&quot;goaddress({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash})&quot; class=&quot;pad10 after&quot;>
              <div class=&quot;ih30&quot;>"{{"item.name"}}"</div>
              <div class=&quot;ih30 fs0-8 col9f&quot;>"{{"item.address"}}"</div>
          </div>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      inputval:&quot;&quot;,
      list:&quot;&quot;,
      his:&quot;&quot;
    }
  },
  component:{
  //注册组件

  },
  mounted:function(){
  //生命周期
    if(localStorage.getItem(&quot;his&quot;)){
     this.his=JSON.parse(localStorage.getItem(&quot;his&quot;));
    }
  },
  computed:{
  //计算属性
      
  },
  methods:{
  //函数
    searchcity:function(){
      this.$http.get('http://cangdu.org:8001/v1/pois?city_id='+this.$store.state.nowcity.id+'&amp;keyword='+this.inputval+'&amp;type=search').then(response => {
        console.log(response);
        this.list=response.body;
      }, response => {
        console.log(response);
        
      });
    },
    goaddress:function(e){
      var arr=[];
      if(localStorage.getItem(&quot;his&quot;)){
          arr=JSON.parse(localStorage.getItem(&quot;his&quot;));
          arr.push(e);
      }else{
          arr.push(e);
      }
      localStorage.setItem(&quot;his&quot;,JSON.stringify(arr));
      this.his=JSON.parse(localStorage.getItem(&quot;his&quot;));
      this.list='';
    },
    removeall:function(){
      localStorage.clear();
      this.his=&quot;&quot;;
    }

  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
.cityinput{
  width:100%;
  height:40px;
  margin:10px 0px;
  outline:0px;
  padding:0px 5px;
  box-sizing:border-box;
}
.submit{
  text-align:center;
  color:white;
  border-radius:3px;
}
.fs0-8{
  font-size:0.8rem !important;
}

.main{
  border-top:2px solid #E4E4E4;
}
.maintop{ 
  border-bottom:2px solid #E4E4E4;
}
.clearall{
  text-align:center;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mt-header</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"$store.state.nowcity.name"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'fs1-2'</span> <span class="hljs-attr">fixed</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"back"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'fs0-8'</span>&gt;</span>切换城市<span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">mt-header</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mgtop50 padlr10 bgfff padbot10"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"inputval"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cityinput"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"输入商务楼，学校，地址"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"searchcity"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"submit bgcol ih40"</span>&gt;</span>提交<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"list==''"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"his after"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'maintop fs0-8 padlr10'</span>&gt;</span>搜索历史<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"his!=''"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mainbody bgfff "</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in his"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.address"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'removeall'</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clearall ih30 pad10 col9f"</span>&gt;</span>
              清空所有
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"list!=''"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'search bgfff'</span>&gt;</span> 
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"goaddress({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash})"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30 fs0-8 col9f"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.address"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">inputval</span>:<span class="hljs-string">""</span>,
      <span class="hljs-attr">list</span>:<span class="hljs-string">""</span>,
      <span class="hljs-attr">his</span>:<span class="hljs-string">""</span>
    }
  },
  <span class="hljs-attr">component</span>:{
  <span class="hljs-comment">//注册组件</span>

  },
  <span class="hljs-attr">mounted</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">//生命周期</span>
    <span class="hljs-keyword">if</span>(localStorage.getItem(<span class="hljs-string">"his"</span>)){
     <span class="hljs-keyword">this</span>.his=<span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">"his"</span>));
    }
  },
  <span class="hljs-attr">computed</span>:{
  <span class="hljs-comment">//计算属性</span>
      
  },
  <span class="hljs-attr">methods</span>:{
  <span class="hljs-comment">//函数</span>
    searchcity:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/v1/pois?city_id='</span>+<span class="hljs-keyword">this</span>.$store.state.nowcity.id+<span class="hljs-string">'&amp;keyword='</span>+<span class="hljs-keyword">this</span>.inputval+<span class="hljs-string">'&amp;type=search'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
        <span class="hljs-keyword">this</span>.list=response.body;
      }, response =&gt; {
        <span class="hljs-built_in">console</span>.log(response);
        
      });
    },
    <span class="hljs-attr">goaddress</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
      <span class="hljs-keyword">var</span> arr=[];
      <span class="hljs-keyword">if</span>(localStorage.getItem(<span class="hljs-string">"his"</span>)){
          arr=<span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">"his"</span>));
          arr.push(e);
      }<span class="hljs-keyword">else</span>{
          arr.push(e);
      }
      localStorage.setItem(<span class="hljs-string">"his"</span>,<span class="hljs-built_in">JSON</span>.stringify(arr));
      <span class="hljs-keyword">this</span>.his=<span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">"his"</span>));
      <span class="hljs-keyword">this</span>.list=<span class="hljs-string">''</span>;
    },
    <span class="hljs-attr">removeall</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      localStorage.clear();
      <span class="hljs-keyword">this</span>.his=<span class="hljs-string">""</span>;
    }

  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.cityinput</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>;
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">10px</span> <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">outline</span>:<span class="hljs-number">0px</span>;
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">0px</span> <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">box-sizing</span>:border-box;
}
<span class="hljs-selector-class">.submit</span>{
  <span class="hljs-attribute">text-align</span>:center;
  <span class="hljs-attribute">color</span>:white;
  <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">3px</span>;
}
<span class="hljs-selector-class">.fs0-8</span>{
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">0.8rem</span> <span class="hljs-meta">!important</span>;
}

<span class="hljs-selector-class">.main</span>{
  <span class="hljs-attribute">border-top</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#E4E4E4</span>;
}
<span class="hljs-selector-class">.maintop</span>{ 
  <span class="hljs-attribute">border-bottom</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#E4E4E4</span>;
}
<span class="hljs-selector-class">.clearall</span>{
  <span class="hljs-attribute">text-align</span>:center;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>运行试试--<br><span class="img-wrap"><img data-src="/img/bVUaOC?w=1920&amp;h=1047" src="https://static.alili.tech/img/bVUaOC?w=1920&amp;h=1047" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVUaOH?w=1920&amp;h=1047" src="https://static.alili.tech/img/bVUaOH?w=1920&amp;h=1047" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVUaOI?w=386&amp;h=692" src="https://static.alili.tech/img/bVUaOI?w=386&amp;h=692" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>ok！到这里<code>city.vue</code>的搜索历史的存储与<br>读取基本写完了</p>
<h2 id="articleHeader2">修改</h2>
<p>页面目前还有几个小bug</p>
<p>1.输入框数据为空时不能点击提交，把输入框放到form表单里，增加一个<code>required</code>属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;mgtop50 padlr10 bgfff padbot10&quot;>
      <form v-on:submit.prevent>
        <input v-model=&quot;inputval&quot; class=&quot;cityinput&quot; required placeholder=&quot;输入商务楼，学校，地址&quot;></input>
        <input type='submit' name='submit' value='提交' @click=&quot;searchcity&quot; class=&quot;submit bgcol ih40&quot;></input>
      </form>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"mgtop50 padlr10 bgfff padbot10"</span>&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">v-on:submit.prevent</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"inputval"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cityinput"</span> <span class="hljs-attr">required</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"输入商务楼，学校，地址"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'submit'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'submit'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'提交'</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"searchcity"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"submit bgcol ih40"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
    &lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>再在函数<code>searchcity</code>里判断搜索地址数据是否为空，不为空再发送请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="searchcity:function(){
      if(this.inputval){
        this.$http.get('http://cangdu.org:8001/v1/pois?city_id='+this.$store.state.nowcity.id+'&amp;keyword='+this.inputval+'&amp;type=search').then(response => {
          console.log(response);
          this.list=response.body;
        }, response => {
          console.log(response);
          
        });
      }     
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>searchcity:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.inputval){
        <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/v1/pois?city_id='</span>+<span class="hljs-keyword">this</span>.$store.state.nowcity.id+<span class="hljs-string">'&amp;keyword='</span>+<span class="hljs-keyword">this</span>.inputval+<span class="hljs-string">'&amp;type=search'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
          <span class="hljs-built_in">console</span>.log(response);
          <span class="hljs-keyword">this</span>.list=response.body;
        }, <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
          <span class="hljs-built_in">console</span>.log(response);
          
        });
      }     
    },</code></pre>
<p>2.页面内容明明就没有填满，却出现滚动条，这是因为咱们的第一个<code>div</code>即form的父元素（固定定位的头部不算）有一个magtop50导致的（遇见过很多次，原因是啥不知道），咱们去掉这个class再在form的父元素外层加一个div加上padtop50</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class='padtop50'>
      <div class=&quot;padlr10 bgfff padbot10&quot;>
        <form v-on:submit.prevent>
          <input v-model=&quot;inputval&quot; class=&quot;cityinput&quot; required placeholder=&quot;输入商务楼，学校，地址&quot;></input>
          <input type='submit' name='submit' value='提交' @click=&quot;searchcity&quot; class=&quot;submit bgcol ih40&quot;></input>
        </form>
      </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">'padtop50'</span>&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"padlr10 bgfff padbot10"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">v-on:submit.prevent</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"inputval"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cityinput"</span> <span class="hljs-attr">required</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"输入商务楼，学校，地址"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'submit'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'submit'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'提交'</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"searchcity"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"submit bgcol ih40"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>3.搜索的结果返回数据为空怎么办？地址输入 隐隐 点击提交<br><span class="img-wrap"><img data-src="/img/bVUbBn?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVUbBn?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>可以看到，返回数据的body为空。那咱们就给他弹出个消息框提示数据为空。<br>消息提示框可以用 Mint UI 的 <a href="https://mint-ui.github.io/docs/#/zh-cn2/toast" rel="nofollow noreferrer" target="_blank">Toast</a>组件，例子写的很清楚，咱们用最简单的就行<br><span class="img-wrap"><img data-src="/img/bVUbE5?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVUbE5?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>在city.vue的<code>&lt;script&gt;</code>里第一行写入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Toast } from 'mint-ui';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { Toast } <span class="hljs-keyword">from</span> <span class="hljs-string">'mint-ui'</span>;</code></pre>
<p>先引入，引入后就可以使用。在提交的点击事件<code>searchcity</code>里判断返回数据是否为空</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="searchcity:function(){
      if(this.inputval){
        this.$http.get('http://cangdu.org:8001/v1/pois?city_id='+this.$store.state.nowcity.id+'&amp;keyword='+this.inputval+'&amp;type=search').then(response => {
          console.log(response);
          this.list=response.body;
          if(response.body==&quot;&quot;){
            Toast('抱歉，空空如也');
          }
        }, response => {
          console.log(response);
          
        });
      }     
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>searchcity:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.inputval){
        <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/v1/pois?city_id='</span>+<span class="hljs-keyword">this</span>.$store.state.nowcity.id+<span class="hljs-string">'&amp;keyword='</span>+<span class="hljs-keyword">this</span>.inputval+<span class="hljs-string">'&amp;type=search'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
          <span class="hljs-built_in">console</span>.log(response);
          <span class="hljs-keyword">this</span>.list=response.body;
          <span class="hljs-keyword">if</span>(response.body==<span class="hljs-string">""</span>){
            Toast(<span class="hljs-string">'抱歉，空空如也'</span>);
          }
        }, <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
          <span class="hljs-built_in">console</span>.log(response);
          
        });
      }     
    },</code></pre>
<p>运行试试<br><span class="img-wrap"><img data-src="/img/bVUbHC?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVUbHC?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>解决！弹出返回数据为空时消息提示框！</p>
<p>4.判断是否重复<br>当点击搜索结果与搜索历史有相同时，就不添加到历史记录。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="goaddress:function(e){
      var arr=[];
      if(localStorage.getItem(&quot;his&quot;)){
          arr=JSON.parse(localStorage.getItem(&quot;his&quot;));
          for(var i=0;i<arr.length;i++){
            if(arr[i].geohash==e.geohash){
               var isok=true;
            }
          }
          if(!isok){
            arr.unshift(e);
          }
      }else{
          arr.unshift(e);
      }
      localStorage.setItem(&quot;his&quot;,JSON.stringify(arr));
      this.his=JSON.parse(localStorage.getItem(&quot;his&quot;));
      this.list='';
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>goaddress:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
      <span class="hljs-keyword">var</span> arr=[];
      <span class="hljs-keyword">if</span>(localStorage.getItem(<span class="hljs-string">"his"</span>)){
          arr=<span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">"his"</span>));
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){
            <span class="hljs-keyword">if</span>(arr[i].geohash==e.geohash){
               <span class="hljs-keyword">var</span> isok=<span class="hljs-literal">true</span>;
            }
          }
          <span class="hljs-keyword">if</span>(!isok){
            arr.unshift(e);
          }
      }<span class="hljs-keyword">else</span>{
          arr.unshift(e);
      }
      localStorage.setItem(<span class="hljs-string">"his"</span>,<span class="hljs-built_in">JSON</span>.stringify(arr));
      <span class="hljs-keyword">this</span>.his=<span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">"his"</span>));
      <span class="hljs-keyword">this</span>.list=<span class="hljs-string">''</span>;
},</code></pre>
<p>这里要注意</p>
<ol>
<li>通过经纬度的集合<code>geohash</code>来判断是否相等</li>
<li>因为最近点击的搜索地址要在搜索历史的最上面，所以要用<code>unshift</code>添加而不是<code>push</code>
</li>
<li>最重要一点，可能有老铁会问，在判断是否有相同的地址后，为什么要通过<code>isok</code>这个中间变量来改变是否添加新地址，而不是把 <code>arr.unshift(e)</code>直接写在if判断里。。。嘿嘿，如果你用<code>unshift</code>在if判断直接添加新元素，会出现死循环，因为当你把元素加到数组第一位后，数组所有的元素都会往后退一位，这样你下次循环进来，取到的元素仍是上一次循环的元素...（我也没想明白，而我的学长强哥Topqiang一眼就看出来了，各位老铁如果有其他的好方法可以分享一下）</li>
</ol>
<p>city.vue修改后的完整代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <mt-header :title=&quot;$store.state.nowcity.name&quot; class='fs1-2' fixed>
        <mt-button slot=&quot;left&quot;><mt-button icon=&quot;back&quot;></mt-button></mt-button>
        <mt-button slot=&quot;right&quot; class='fs0-8'>切换城市</mt-button>
    </mt-header>

    <div class='padtop50'>
      <div class=&quot;padlr10 bgfff padbot10&quot;>
        <form v-on:submit.prevent>
          <input v-model=&quot;inputval&quot; class=&quot;cityinput&quot; required placeholder=&quot;输入商务楼，学校，地址&quot;></input>
          <input type='submit' name='submit' value='提交' @click=&quot;searchcity&quot; class=&quot;submit bgcol ih40&quot;></input>
        </form>
      </div>
    </div>

    <div class=&quot;main&quot;>

      <div v-if=&quot;list==''&quot; class=&quot;his after&quot;>
        <div class='maintop fs0-8 padlr10'>搜索历史</div>
        <div v-if=&quot;his!=''&quot; class=&quot;mainbody bgfff &quot;>
          <div v-for=&quot;item in his&quot; class=&quot;pad10 after&quot;>
              <div class=&quot;ih30 nowarp&quot;>"{{"item.name"}}"</div>
              <div class=&quot;nowarp ih30 fs0-8 col9f&quot;>"{{"item.address"}}"</div>
          </div>
          <div @click='removeall' class=&quot;clearall ih30 pad10 col9f&quot;>
              清空所有
          </div>
        </div>
      </div>

      <div v-if=&quot;list!=''&quot; class='search bgfff'> 
          <div v-for=&quot;item in list&quot; @click=&quot;goaddress({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash})&quot; class=&quot;pad10 after&quot;>
              <div class=&quot;ih30 nowarp&quot;>"{{"item.name"}}"</div>
              <div class=&quot;nowarp ih30 fs0-8 col9f&quot;>"{{"item.address"}}"</div>
          </div>
      </div>

    </div>

  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  data () {
    return {
      inputval:&quot;&quot;,
      list:&quot;&quot;,
      his:&quot;&quot;
    }
  },
  component:{
  //注册组件

  },
  mounted:function(){
  //生命周期
    if(localStorage.getItem(&quot;his&quot;)){
     this.his=JSON.parse(localStorage.getItem(&quot;his&quot;));
    }
  },
  computed:{
  //计算属性
      
  },
  methods:{
  //函数
    searchcity:function(){
      if(this.inputval){
        this.$http.get('http://cangdu.org:8001/v1/pois?city_id='+this.$store.state.nowcity.id+'&amp;keyword='+this.inputval+'&amp;type=search').then(response => {
          console.log(response);
          this.list=response.body;
          if(response.body==&quot;&quot;){
            Toast('抱歉，空空如也');
          }
        }, response => {
          console.log(response);
          
        });
      }     
    },
    goaddress:function(e){
      var arr=[];
      if(localStorage.getItem(&quot;his&quot;)){
          arr=JSON.parse(localStorage.getItem(&quot;his&quot;));
          for(var i=0;i<arr.length;i++){
            if(arr[i].geohash==e.geohash){
               var isok=true;
            }
          }
          if(!isok){
            arr.unshift(e);
          }
      }else{
          arr.unshift(e);
      }
      localStorage.setItem(&quot;his&quot;,JSON.stringify(arr));
      this.his=JSON.parse(localStorage.getItem(&quot;his&quot;));
      this.list='';
    },
    removeall:function(){
      localStorage.clear();
      this.his=&quot;&quot;;
    }

  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
.cityinput{
  width:100%;
  height:40px;
  margin:10px 0px;
  outline:0px;
  padding:0px 5px;
  box-sizing:border-box;
}
.submit{
  text-align:center;
  color:white;
  border-radius:3px;
  width:100%;
  border:0px;
  outline:0px;
}
.fs0-8{
  font-size:0.8rem !important;
}

.main{
  border-top:2px solid #E4E4E4;
}
.maintop{ 
  border-bottom:2px solid #E4E4E4;
}
.clearall{
  text-align:center;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mt-header</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"$store.state.nowcity.name"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'fs1-2'</span> <span class="hljs-attr">fixed</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"back"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mt-button</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'fs0-8'</span>&gt;</span>切换城市<span class="hljs-tag">&lt;/<span class="hljs-name">mt-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">mt-header</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'padtop50'</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"padlr10 bgfff padbot10"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">v-on:submit.prevent</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"inputval"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cityinput"</span> <span class="hljs-attr">required</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"输入商务楼，学校，地址"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'submit'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'submit'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'提交'</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"searchcity"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"submit bgcol ih40"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"list==''"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"his after"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'maintop fs0-8 padlr10'</span>&gt;</span>搜索历史<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"his!=''"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mainbody bgfff "</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in his"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30 nowarp"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nowarp ih30 fs0-8 col9f"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.address"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'removeall'</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clearall ih30 pad10 col9f"</span>&gt;</span>
              清空所有
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"list!=''"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'search bgfff'</span>&gt;</span> 
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"goaddress({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash})"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pad10 after"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih30 nowarp"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nowarp ih30 fs0-8 col9f"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.address"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { Toast } <span class="hljs-keyword">from</span> <span class="hljs-string">'mint-ui'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">inputval</span>:<span class="hljs-string">""</span>,
      <span class="hljs-attr">list</span>:<span class="hljs-string">""</span>,
      <span class="hljs-attr">his</span>:<span class="hljs-string">""</span>
    }
  },
  <span class="hljs-attr">component</span>:{
  <span class="hljs-comment">//注册组件</span>

  },
  <span class="hljs-attr">mounted</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">//生命周期</span>
    <span class="hljs-keyword">if</span>(localStorage.getItem(<span class="hljs-string">"his"</span>)){
     <span class="hljs-keyword">this</span>.his=<span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">"his"</span>));
    }
  },
  <span class="hljs-attr">computed</span>:{
  <span class="hljs-comment">//计算属性</span>
      
  },
  <span class="hljs-attr">methods</span>:{
  <span class="hljs-comment">//函数</span>
    searchcity:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.inputval){
        <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/v1/pois?city_id='</span>+<span class="hljs-keyword">this</span>.$store.state.nowcity.id+<span class="hljs-string">'&amp;keyword='</span>+<span class="hljs-keyword">this</span>.inputval+<span class="hljs-string">'&amp;type=search'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
          <span class="hljs-built_in">console</span>.log(response);
          <span class="hljs-keyword">this</span>.list=response.body;
          <span class="hljs-keyword">if</span>(response.body==<span class="hljs-string">""</span>){
            Toast(<span class="hljs-string">'抱歉，空空如也'</span>);
          }
        }, response =&gt; {
          <span class="hljs-built_in">console</span>.log(response);
          
        });
      }     
    },
    <span class="hljs-attr">goaddress</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
      <span class="hljs-keyword">var</span> arr=[];
      <span class="hljs-keyword">if</span>(localStorage.getItem(<span class="hljs-string">"his"</span>)){
          arr=<span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">"his"</span>));
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){
            <span class="hljs-keyword">if</span>(arr[i].geohash==e.geohash){
               <span class="hljs-keyword">var</span> isok=<span class="hljs-literal">true</span>;
            }
          }
          <span class="hljs-keyword">if</span>(!isok){
            arr.unshift(e);
          }
      }<span class="hljs-keyword">else</span>{
          arr.unshift(e);
      }
      localStorage.setItem(<span class="hljs-string">"his"</span>,<span class="hljs-built_in">JSON</span>.stringify(arr));
      <span class="hljs-keyword">this</span>.his=<span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">"his"</span>));
      <span class="hljs-keyword">this</span>.list=<span class="hljs-string">''</span>;
    },
    <span class="hljs-attr">removeall</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      localStorage.clear();
      <span class="hljs-keyword">this</span>.his=<span class="hljs-string">""</span>;
    }

  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.cityinput</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>;
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">10px</span> <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">outline</span>:<span class="hljs-number">0px</span>;
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">0px</span> <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">box-sizing</span>:border-box;
}
<span class="hljs-selector-class">.submit</span>{
  <span class="hljs-attribute">text-align</span>:center;
  <span class="hljs-attribute">color</span>:white;
  <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">3px</span>;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
  <span class="hljs-attribute">border</span>:<span class="hljs-number">0px</span>;
  <span class="hljs-attribute">outline</span>:<span class="hljs-number">0px</span>;
}
<span class="hljs-selector-class">.fs0-8</span>{
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">0.8rem</span> <span class="hljs-meta">!important</span>;
}

<span class="hljs-selector-class">.main</span>{
  <span class="hljs-attribute">border-top</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#E4E4E4</span>;
}
<span class="hljs-selector-class">.maintop</span>{ 
  <span class="hljs-attribute">border-bottom</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#E4E4E4</span>;
}
<span class="hljs-selector-class">.clearall</span>{
  <span class="hljs-attribute">text-align</span>:center;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>运行试试<br><span class="img-wrap"><img data-src="/img/bVUcnn?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVUcnn?w=1920&amp;h=1048" alt="" title="" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVUcnu?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVUcnu?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVUcnv?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVUcnv?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVUcnD?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVUcnD?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVUcnF?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVUcnF?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>解决！</p>
<p>下面，咱们写点击搜索结果的另一个反应--页面跳转</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue从创建到完整的饿了么（10）city.vue的完善（v-if 的简单使用及本地缓存的存储与读取）

## 原文链接
[https://segmentfault.com/a/1190000010969030](https://segmentfault.com/a/1190000010969030)


---
title: 'vue实现消息的无缝滚动效果（完善版）' 
date: 2018-12-23 2:30:07
hidden: true
slug: tnlrpuiz56o
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>在昨天发布完文章之后又整理一下，发现有几处需要改进的地方，今天就及时更新一下，也算是激励自己要保持这种积极的好习惯</strong></p>
<blockquote><p>项目环境vue-cli ，请自行配置好相应的，环境及路由，这里主要介绍实现的方法</p></blockquote>
<blockquote><p>第一步在模板中 使用v-for方法循环出消息列表</p></blockquote>
<p>&lt;script&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" export default {
data() {
  return {
      animate:false,
      items:[
          {name:&quot;马云&quot;},
          {name:&quot;雷军&quot;},
          {name:&quot;王勤&quot;}
      ]
  }
},
created(){
    setInterval(this.scroll,1000)
},
methods: {
    scroll(){
       this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
       setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
               this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
               this.items.shift();               //删除数组的第一个元素
               this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
       },500)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> export <span class="hljs-keyword">default</span> {
<span class="hljs-keyword">data</span>() {
  <span class="hljs-keyword">return</span> {
      animate:<span class="hljs-literal">false</span>,
      items:[
          {name:<span class="hljs-string">"马云"</span>},
          {name:<span class="hljs-string">"雷军"</span>},
          {name:<span class="hljs-string">"王勤"</span>}
      ]
  }
},
created(){
    setInterval(<span class="hljs-keyword">this</span>.scroll,<span class="hljs-number">1000</span>)
},
methods: {
    scroll(){
       <span class="hljs-keyword">this</span>.animate=<span class="hljs-literal">true</span>;    <span class="hljs-comment">// 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true</span>
       setTimeout(()=&gt;{      <span class="hljs-comment">//  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多</span>
               <span class="hljs-keyword">this</span>.items.push(<span class="hljs-keyword">this</span>.items[<span class="hljs-number">0</span>]);  <span class="hljs-comment">// 将数组的第一个元素添加到数组的</span>
               <span class="hljs-keyword">this</span>.items.shift();               <span class="hljs-comment">//删除数组的第一个元素</span>
               <span class="hljs-keyword">this</span>.animate=<span class="hljs-literal">false</span>;  <span class="hljs-comment">// margin-top 为0 的时候取消过渡动画，实现无缝滚动</span>
       },<span class="hljs-number">500</span>)
    }
}</code></pre>
<p>}<br>&lt;/script&gt;</p>
<blockquote><p>样式设置</p></blockquote>
<p>&lt;style&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{
    margin: 0 ;
    padding: 0;
}
#box{
    width: 300px;
    height: 32px;
    overflow: hidden;
    padding-left: 30px;
    border: 1px solid black;
}
.anim{
    transition: all 0.5s;
    margin-top: -30px;
}
#con1 li{
    list-style: none;
    line-height: 30px;
    height: 30px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>*{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> ;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-id">#box</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid black;
}
<span class="hljs-selector-class">.anim</span>{
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.5s</span>;
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">30px</span>;
}
<span class="hljs-selector-id">#con1</span> <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">list-style</span>: none;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
}</code></pre>
<p>&lt;/style&gt;</p>
<blockquote><p>以上就是这篇文章的全部内容，希望对大家有帮助，也请多多指教，谢谢！</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue实现消息的无缝滚动效果（完善版）

## 原文链接
[https://segmentfault.com/a/1190000012272194](https://segmentfault.com/a/1190000012272194)


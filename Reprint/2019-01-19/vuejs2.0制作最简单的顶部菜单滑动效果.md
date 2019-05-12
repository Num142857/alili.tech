---
title: 'vuejs2.0制作最简单的顶部菜单滑动效果' 
date: 2019-01-19 2:30:10
hidden: true
slug: a9cce93een8
categories: [reprint]
---

{{< raw >}}

                    
<p>此方法可适用于普通html页面，也可以是其他，使用相关css样式即可。<br>下面效果是横向滚动，也可以使用overflow-y: scroll; 修改为垂直滚动。</p>
<p>主要代码部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;allSort&quot;>
       <div class=&quot;sortMenu clearfix&quot;>
        <ul class=&quot;sortMenu-ul&quot; >
          <li class=&quot;cell&quot; v-for=&quot;item in sortMenu&quot;>
            <a href=&quot;&quot;>"{{"item.sortname"}}"</a>
          </li>
        </ul>
        <div class=&quot;all&quot; v-on:click=&quot;subitemsExpanded=!subitemsExpanded&quot;>
          <img src=&quot;../../assets/pull-down.png&quot; alt=&quot;&quot;>
        </div>
        <div v-show=&quot;subitemsExpanded&quot; class=&quot;pull-down&quot;>
          <ul class=&quot;pull-down-sort&quot;>
            <li class=&quot;&quot; v-for=&quot;pulldow in sortName&quot;>
              <a href=&quot;&quot;>"{{"pulldow.sortname"}}"</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"allSort"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sortMenu clearfix"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sortMenu-ul"</span> &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cell"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in sortMenu"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.sortname"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"all"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"subitemsExpanded=!subitemsExpanded"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../assets/pull-down.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"subitemsExpanded"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pull-down"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pull-down-sort"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"pulldow in sortName"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span></span><span class="hljs-template-variable">"{{"pulldow.sortname"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>script部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script> 
export default {
  name: 'allSort',
  data () {
    return {
      sortMenu: [
        { sortname: '全部' },
        { sortname: '家用电器' },
        { sortname: '大家电' },
        { sortname: '生活用品' },
        { sortname: '食品' },
        { sortname: '美妆' },
        { sortname: '书籍' },
        { sortname: '洗护用品' },
        { sortname: '母婴用品' },
        { sortname: '家居' }
      ],
      sortName: [
        { sortname: '家用电器' },
        { sortname: '母婴' },
        { sortname: '百货' },
        { sortname: '珠宝配饰' },
        { sortname: '运动户外' },
        { sortname: '食品' },
        { sortname: '美妆' },
        { sortname: '家装' },
        { sortname: '家居家纺' },
        { sortname: '鲜花宠物' },
        { sortname: '图书乐器' },
        { sortname: '生活服务' },
        { sortname: '游戏动漫' }
      ],
      subitemsExpanded: false
    }
  }
}
</script>  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>&lt;script&gt; 
export <span class="hljs-keyword">default</span> {
  name: <span class="hljs-string">'allSort'</span>,
  data () {
    return {
      sortMenu: [
        { sortname: <span class="hljs-string">'全部'</span> },
        { sortname: <span class="hljs-string">'家用电器'</span> },
        { sortname: <span class="hljs-string">'大家电'</span> },
        { sortname: <span class="hljs-string">'生活用品'</span> },
        { sortname: <span class="hljs-string">'食品'</span> },
        { sortname: <span class="hljs-string">'美妆'</span> },
        { sortname: <span class="hljs-string">'书籍'</span> },
        { sortname: <span class="hljs-string">'洗护用品'</span> },
        { sortname: <span class="hljs-string">'母婴用品'</span> },
        { sortname: <span class="hljs-string">'家居'</span> }
      ],
      sortName: [
        { sortname: <span class="hljs-string">'家用电器'</span> },
        { sortname: <span class="hljs-string">'母婴'</span> },
        { sortname: <span class="hljs-string">'百货'</span> },
        { sortname: <span class="hljs-string">'珠宝配饰'</span> },
        { sortname: <span class="hljs-string">'运动户外'</span> },
        { sortname: <span class="hljs-string">'食品'</span> },
        { sortname: <span class="hljs-string">'美妆'</span> },
        { sortname: <span class="hljs-string">'家装'</span> },
        { sortname: <span class="hljs-string">'家居家纺'</span> },
        { sortname: <span class="hljs-string">'鲜花宠物'</span> },
        { sortname: <span class="hljs-string">'图书乐器'</span> },
        { sortname: <span class="hljs-string">'生活服务'</span> },
        { sortname: <span class="hljs-string">'游戏动漫'</span> }
      ],
      subitemsExpanded: false
    }
  }
}
&lt;/script&gt;  
</code></pre>
<p>css样式部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
/* 分类菜单*/
.sortMenu{
  width: 100%; 
  background-color:#fff; 
  overflow-x: scroll; 
  -webkit-overflow-x: scroll;
}
.sortMenu::-webkit-scrollbar{ 
  width: 0; 
  height: 0;   
  background-color: #fff;  
}
.sortMenu-ul { 
  min-width:500px; 
  display: flex;
  justify-content: flex-start;
}
.sortMenu .cell{ 
  display: inline-block; 
  font-size: 12px;
  margin: 0px 1em;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: relative;
      text-overflow: ellipsis;
    word-break: keep-all;
}
.sortMenu .cell.special a{
  color: #ff474c;
}
.sortMenu .cell.special:before {
  content: '';
  height: 2px;
  width: 100%;
  background: #ff474c;
  position: absolute;
  bottom: 0px;
}
.sortMenu .all{
  right: 0;
  top: 0;
  height: 35px;
  width: 35px;
  position: absolute;
  background: #fff;
  z-index: 10;
  display: flex;
  justify-content:center;
  align-items:center;
}
.sortMenu .all:before{
  content: '';
  height: 25px;
  width: 1px;
  position: absolute;
  box-shadow: 1px 0px 1px #e0e0e0;
  left: 0px;
}
.sortMenu .all img{
  display: block;
  width: 16px;
}
.sortMenu .pull-down{
  position: absolute;
  top: 40px;
  height:auto;
  width: 100%;
  background: #fff;
  z-index: 1;
  border-top: 1px solid #f2f2f2;

}
.pull-down-sort{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: space-around;
  flex-wrap: wrap;
  flex-direction: row
}
.pull-down-sort li{
  float: left;
  padding: .1rem
}
.pull-down-sort li a:hover{
  color: #ff474c;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-comment">/* 分类菜单*/</span>
<span class="hljs-selector-class">.sortMenu</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>; 
  <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#fff</span>; 
  <span class="hljs-attribute">overflow-x</span>: scroll; 
  <span class="hljs-attribute">-webkit-overflow-x</span>: scroll;
}
<span class="hljs-selector-class">.sortMenu</span><span class="hljs-selector-pseudo">::-webkit-scrollbar</span>{ 
  <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>; 
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;   
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;  
}
<span class="hljs-selector-class">.sortMenu-ul</span> { 
  <span class="hljs-attribute">min-width</span>:<span class="hljs-number">500px</span>; 
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: flex-start;
}
<span class="hljs-selector-class">.sortMenu</span> <span class="hljs-selector-class">.cell</span>{ 
  <span class="hljs-attribute">display</span>: inline-block; 
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span> <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">position</span>: relative;
      <span class="hljs-attribute">text-overflow</span>: ellipsis;
    <span class="hljs-attribute">word-break</span>: keep-all;
}
<span class="hljs-selector-class">.sortMenu</span> <span class="hljs-selector-class">.cell</span><span class="hljs-selector-class">.special</span> <span class="hljs-selector-tag">a</span>{
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#ff474c</span>;
}
<span class="hljs-selector-class">.sortMenu</span> <span class="hljs-selector-class">.cell</span><span class="hljs-selector-class">.special</span><span class="hljs-selector-pseudo">:before</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">2px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#ff474c</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0px</span>;
}
<span class="hljs-selector-class">.sortMenu</span> <span class="hljs-selector-class">.all</span>{
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">10</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>:center;
  <span class="hljs-attribute">align-items</span>:center;
}
<span class="hljs-selector-class">.sortMenu</span> <span class="hljs-selector-class">.all</span><span class="hljs-selector-pseudo">:before</span>{
  <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">25px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">1px</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">1px</span> <span class="hljs-number">0px</span> <span class="hljs-number">1px</span> <span class="hljs-number">#e0e0e0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
}
<span class="hljs-selector-class">.sortMenu</span> <span class="hljs-selector-class">.all</span> <span class="hljs-selector-tag">img</span>{
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>;
}
<span class="hljs-selector-class">.sortMenu</span> <span class="hljs-selector-class">.pull-down</span>{
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">height</span>:auto;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#f2f2f2</span>;

}
<span class="hljs-selector-class">.pull-down-sort</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: flex-start;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">align-content</span>: space-around;
  <span class="hljs-attribute">flex-wrap</span>: wrap;
  <span class="hljs-attribute">flex-direction</span>: row
}
<span class="hljs-selector-class">.pull-down-sort</span> <span class="hljs-selector-tag">li</span>{
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">padding</span>: .<span class="hljs-number">1rem</span>
}
<span class="hljs-selector-class">.pull-down-sort</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span>{
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#ff474c</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>显示样式： 可在手机模式预览</p>
<p><span class="img-wrap"><img data-src="/img/bVKdR2?w=415&amp;h=228" src="https://static.alili.tech/img/bVKdR2?w=415&amp;h=228" alt="向左即可滑动" title="向左即可滑动" style="cursor: pointer; display: inline;"></span></p>
<p>选择下拉即可显示全部</p>
<p><span class="img-wrap"><img data-src="/img/bVKdTP?w=414&amp;h=227" src="https://static.alili.tech/img/bVKdTP?w=414&amp;h=227" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuejs2.0制作最简单的顶部菜单滑动效果

## 原文链接
[https://segmentfault.com/a/1190000008594281](https://segmentfault.com/a/1190000008594281)


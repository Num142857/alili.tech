---
title: ' ectron仿制qq(3) 主界面制作(2)' 
date: 2019-02-14 2:30:37
hidden: true
slug: y7jpk2x286
categories: [reprint]
---

{{< raw >}}

                    
<p>接着上一个的制作!</p>
<p>今天少写点代码吧!<br>首页增加如下代码 给main 增加自适应高度</p>
<h2 id="articleHeader0">首页</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
mainHeight: parseInt(document.documentElement.clientHeight) - 140 - 40,
}

mounted() {
      window.onresize = () => {
       this.mainHeight = parseInt(document.documentElement.clientHeight) - 140 - 40;
     }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>data(){
<span class="hljs-attr">mainHeight</span>: <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">document</span>.documentElement.clientHeight) - <span class="hljs-number">140</span> - <span class="hljs-number">40</span>,
}

mounted() {
      <span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
       <span class="hljs-keyword">this</span>.mainHeight = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">document</span>.documentElement.clientHeight) - <span class="hljs-number">140</span> - <span class="hljs-number">40</span>;
     }
},</code></pre>
<p>这里解释下 -顶部header的高度(140) 底部的高度(40) 写法很多 不过达到效果就行了  在窗口拉伸的时候可以自适应高度</p>
<h3 id="articleHeader1">模板代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <main :style=&quot;{'height':mainHeight+'px'}&quot;>
              
</main>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'height':mainHeight+'px'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
              
<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span></code></pre>
<h3 id="articleHeader2">样式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    main
            position: fixed
            overflow-y: hidden
    width: 100%" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>    main
            <span class="hljs-built_in">position</span>: fixed
            <span class="hljs-built_in">overflow</span>-y: hidden
    <span class="hljs-built_in">width</span>: <span class="hljs-number">100</span>%</code></pre>
<h2 id="articleHeader3">会话列表界面</h2>
<h3 id="articleHeader4">模板代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <main :class=&quot;{showScroll:isShowScroll}&quot; @mouseenter=&quot;showScrolls&quot;
              @mouseleave=&quot;hideScroll&quot; :style=&quot;{'height':mainHeight+'px'}&quot;>
            <ul>
                <li v-for=&quot;n in 10&quot;>
                    <div class=&quot;face&quot;><img src=&quot;@/assets/img/face.jpg&quot; alt=&quot;&quot;></div>
                    <div class=&quot;info&quot;>
                        <p class=&quot;nickname&quot;>Hello 老李</p>
                        <p class=&quot;msg&quot;>最近好吗</p>
                    </div>
                </li>
            </ul>
        </main>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{showScroll:isShowScroll}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> @<span class="hljs-attr">mouseenter</span>=<span class="hljs-string">"showScrolls"</span>
              @<span class="hljs-attr">mouseleave</span>=<span class="hljs-string">"hideScroll"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'height':mainHeight+'px'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"n in 10"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"face"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/img/face.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"info"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nickname"</span>&gt;</span>Hello 老李<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"msg"</span>&gt;</span>最近好吗<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span></code></pre>
<h3 id="articleHeader5">样式代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        main
            position: fixed
            overflow-y: hidden
            width: 100%
            li
                height: 60px
                border-bottom: 1px solid #CCC
                display: flex
                cursor: pointer
                &amp;:hover
                    background-color: #B8CBD5
                .face
                    width: 40px
                    padding-top: 10px
                    height: 40px
                    padding-left: 10px
                    img
                        border-radius: 50%
                        width: 100%
                        height: 100%
                .info
                    padding-top: 8px
                    padding-left: 10px
                    p.nickname
                        color: #FF0000
                        font-size: 15px
                    .msg
                        font-size: 12px
                        padding-top: 3px" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>        main
            <span class="hljs-attribute">position</span>: fixed
            <span class="hljs-attribute">overflow-y</span>: hidden
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
            <span class="hljs-selector-tag">li</span>
                <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>
                <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#CCC</span>
                <span class="hljs-attribute">display</span>: flex
                <span class="hljs-attribute">cursor</span>: pointer
                &amp;:hover
                    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#B8CBD5</span>
                <span class="hljs-selector-class">.face</span>
                    <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>
                    <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">10px</span>
                    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>
                    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>
                    <span class="hljs-selector-tag">img</span>
                        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>
                        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
                        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>
                <span class="hljs-selector-class">.info</span>
                    <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">8px</span>
                    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>
                    <span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.nickname</span>
                        <span class="hljs-attribute">color</span>: <span class="hljs-number">#FF0000</span>
                        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">15px</span>
                    <span class="hljs-selector-class">.msg</span>
                        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>
                        <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">3px</span></code></pre>
<h3 id="articleHeader6">滚动条美化</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="::-webkit-scrollbar { /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(228, 57, 60, 0.2);
    background: rgba(20, 20, 50, 0.6);
}

::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(228, 57, 60, 0.2);
    border-radius: 10px;
    background: #EDEDED;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-pseudo">::-webkit-scrollbar</span> { <span class="hljs-comment">/*滚动条整体样式*/</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5px</span>; <span class="hljs-comment">/*高宽分别对应横竖滚动条的尺寸*/</span>
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>;
}

<span class="hljs-selector-pseudo">::-webkit-scrollbar-thumb</span> { <span class="hljs-comment">/*滚动条里面小方块*/</span>
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">-webkit-box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-built_in">rgba</span>(228, 57, 60, 0.2);
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(20, 20, 50, 0.6);
}

<span class="hljs-selector-pseudo">::-webkit-scrollbar-track</span> { <span class="hljs-comment">/*滚动条里面轨道*/</span>
    <span class="hljs-attribute">-webkit-box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-built_in">rgba</span>(228, 57, 60, 0.2);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#EDEDED</span>;
}
</code></pre>
<h3 id="articleHeader7">滚动条显示隐藏</h3>
<p>以上模板代码中有一个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" :class=&quot;{showScroll:isShowScroll}&quot; @mouseenter=&quot;showScrolls&quot;
              @mouseleave=&quot;hideScroll&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code> :<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"{showScroll:isShowScroll}"</span> <span class="hljs-meta">@mouseenter</span>=<span class="hljs-string">"showScrolls"</span>
              <span class="hljs-meta">@mouseleave</span>=<span class="hljs-string">"hideScroll"</span></code></pre>
<p>我们只需要在data 中定义一个 <code>isShowScroll:fase</code></p>
<p>之后再创建一个showScroll 类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".showScroll {
    overflow-y: scroll !important
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.showScroll</span> {
    <span class="hljs-attribute">overflow-y</span>: scroll <span class="hljs-meta">!important</span>
}</code></pre>
<h4>创建方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hideScroll() {
    this.isShowScroll = false
 },
showScroll() {
   this.isShowScroll = true
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">hideScroll</span><span class="hljs-params">()</span></span> {
    this<span class="hljs-selector-class">.isShowScroll</span> = false
 },
<span class="hljs-function"><span class="hljs-title">showScroll</span><span class="hljs-params">()</span></span> {
   this<span class="hljs-selector-class">.isShowScroll</span> = true
},</code></pre>
<p>这样就解决了滚动条显示隐藏</p>
<h2 id="articleHeader8">右键菜单</h2>
<h3 id="articleHeader9">模板代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;menu&quot; v-if=&quot;show&quot; :style=&quot;{top:position.y + 'px',left:position.x + 'px'}&quot;>
        <ul>
            <li><i class=&quot;iconfont icon-qqkongjian&quot;></i><span>发送及时消息</span></li>
            <li class=&quot;line&quot;>发送电子邮件</li>
            <li>查看资料</li>
            <li>分享他的名片</li>
            <li class=&quot;line&quot;>消息记录</li>
            <li>会话置顶</li>
            <li>从会话列表移除</li>
            <li class=&quot;line&quot;>设置权限</li>
            <li>修改备注姓名</li>
            <li>移动分组至</li>
            <li>删除好友</li>
            <li class=&quot;line&quot;>举报此用户</li>
            <li>好友管理</li>
            <li>进入好友空间</li>
        </ul>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"show"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{top:position.y + 'px',left:position.x + 'px'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-qqkongjian"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>发送及时消息<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line"</span>&gt;</span>发送电子邮件<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>查看资料<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>分享他的名片<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line"</span>&gt;</span>消息记录<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>会话置顶<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>从会话列表移除<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line"</span>&gt;</span>设置权限<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>修改备注姓名<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>移动分组至<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>删除好友<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line"</span>&gt;</span>举报此用户<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>好友管理<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>进入好友空间<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<h3 id="articleHeader10">css代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".menu
  width: 180px
  background-color: rgba(255,255,255,0.8)
  border-radius: 4px
  box-shadow: #FFFFFF 0 0 10px
  position: absolute
  top: 150px
  left: 100px
  font-family: &quot;微软雅黑&quot;
  font-size: 14px
  padding: 10px 0
  li
    list-style: none
    height: 30px
    line-height: 30px
    cursor: pointer
    padding-left: 30px
    position: relative
    &amp;:hover
      background-color: #E9EBEC
    i
      position: absolute
      margin-right: 10px
      left: 10px
    &amp;.line
      border-bottom: 1px solid #E8EAEB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.menu</span>
  <span class="hljs-attribute">width</span>: <span class="hljs-number">180px</span>
  <span class="hljs-attribute">background-color</span>: rgba(<span class="hljs-number">255</span>,<span class="hljs-number">255</span>,<span class="hljs-number">255</span>,<span class="hljs-number">0.8</span>)
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">#FFFFFF</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span>
  <span class="hljs-attribute">position</span>: absolute
  <span class="hljs-attribute">top</span>: <span class="hljs-number">150px</span>
  <span class="hljs-attribute">left</span>: <span class="hljs-number">100px</span>
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"微软雅黑"</span>
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span>
  <span class="hljs-selector-tag">li</span>
    <span class="hljs-attribute">list-style</span>: none
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>
    <span class="hljs-attribute">cursor</span>: pointer
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">30px</span>
    <span class="hljs-attribute">position</span>: relative
    &amp;:hover
      <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#E9EBEC</span>
    <span class="hljs-selector-tag">i</span>
      <span class="hljs-attribute">position</span>: absolute
      <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>
      <span class="hljs-attribute">left</span>: <span class="hljs-number">10px</span>
    &amp;<span class="hljs-selector-class">.line</span>
      <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#E8EAEB</span></code></pre>
<h3 id="articleHeader11">右键菜单显示隐藏</h3>
<p>在main 中增加  contextmenu 将点击的坐标传到menu组件中 之后显示就行了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            position:{
                type: Object
            }
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        props: {
            show: {
                <span class="hljs-class"><span class="hljs-keyword">type</span>: <span class="hljs-type">Boolean</span>,</span>
                <span class="hljs-keyword">default</span>: false
            },
            position:{
                <span class="hljs-class"><span class="hljs-keyword">type</span>: <span class="hljs-type">Object</span></span>
            }
        }
    }</code></pre>
<p>对于坐标的计算目前有一定的小问题 之后再解决 天色很晚了</p>
<h2 id="articleHeader12">效果演示</h2>
<p><span class="img-wrap"><img data-src="/img/bVbiLmR?w=371&amp;h=664" src="https://static.alili.tech/img/bVbiLmR?w=371&amp;h=664" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVbiLmS?w=280&amp;h=691" src="https://static.alili.tech/img/bVbiLmS?w=280&amp;h=691" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
 ectron仿制qq(3) 主界面制作(2)

## 原文链接
[https://segmentfault.com/a/1190000016825977](https://segmentfault.com/a/1190000016825977)


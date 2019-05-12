---
title: '2-vuejs2.0实战：仿豆瓣app项目，创建组件header,tabbar路由跳转' 
date: 2019-01-26 2:30:18
hidden: true
slug: zsxxn0n7jj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>上一章有童鞋提到为什么不通过路由的方式来跳转？其实我想说的是，这个分享才刚刚开始，大家不要着急！这一章节我们将带大家完成，创建header组件，以及tabbar的路由跳转。</p></blockquote>
<p>vue专题目录：<br><a href="https://segmentfault.com/a/1190000008473744">1-vuejs2.0实战：仿豆瓣app项目，创建自定义组件tabbar</a></p>
<h3 id="articleHeader0">创建header组件</h3>
<p>我们先来分析一下豆瓣app:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008491058" src="https://static.alili.tech/img/remote/1460000008491058" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008491059" src="https://static.alili.tech/img/remote/1460000008491059" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008491060" src="https://static.alili.tech/img/remote/1460000008491060" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008491061" src="https://static.alili.tech/img/remote/1460000008491061" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>首页的header背景是绿色的，并且有一个搜索框，其他页面都是灰色的背景，在header的左侧，是一个返回按钮，右侧，有分享或者评论等图标，中间就是header的标题。我们先不做有搜索框的header。</p>
<p>我们先在components文件中创建一个header.vue文件，并且在less文件里新建一个颜色变量var.less（统一管理app的颜色，保持统一），我们先将有其他元素的组件的大致框架，以及样式先写出来。然后在index.vue里面引入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//var.less

//APP默认颜色
@defaultColor:#42bd56;
//header
@headerBg:@defaultColor;
@headerDefaultColor:rgb(73,73,73);

//tabbar
@tabbarActiveColor: @defaultColor;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//var.less</span>

<span class="hljs-comment">//APP默认颜色</span>
<span class="hljs-variable">@defaultColor:</span><span class="hljs-number">#42bd56</span>;
<span class="hljs-comment">//header</span>
<span class="hljs-variable">@headerBg:</span><span class="hljs-variable">@defaultColor</span>;
<span class="hljs-variable">@headerDefaultColor:</span>rgb(<span class="hljs-number">73</span>,<span class="hljs-number">73</span>,<span class="hljs-number">73</span>);

<span class="hljs-comment">//tabbar</span>
<span class="hljs-variable">@tabbarActiveColor:</span> <span class="hljs-variable">@defaultColor</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//header.vue
<template>
    <header class=&quot;m-header is-bg is-fixed&quot; >
          <div class=&quot;m-header-button is-left&quot;>
              <a href=&quot;javascript:;&quot;>
< img class=&quot;m-icon-img&quot; src=&quot;../../assets/images/ic_bar_back_white.png&quot;/>返回</a>
          </div>
          
          <h1 class=&quot;m-header-title&quot;>豆瓣app</h1>
          
          <div class=&quot;m-header-button is-right&quot;>
              <a href=&quot;javascript:;&quot;>分享</a>
          </div>
          
          
      </header>
</template>
<script>
  
</script>
<style lang=&quot;less&quot;>
/*导入颜色变量*/
@import &quot;../assets/less/var.less&quot;;
.m-header{
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 10px;
    background: #fff;
    color: @headerDefaultColor;
    border-bottom:1px solid #eee;
    a{
        color: @headerDefaultColor;
    }
    .m-header-button{
        width: 70px;
        align-items:stretch;
        &amp;.is-left{
            text-align: left;
        }
        &amp;.is-right{
            text-align: right;
        }
        .m-icon-img{
            width: 20px;
            height: 20px;
        }
        .margin-right-10{
            margin-right: 10px;
        }
    }
    .m-header-title{
        flex: 1;
        text-align: center;
        font-size: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    &amp;.is-bg{
        background:@headerBg;
        color: #fff;
        a{color: #fff;}
        .m-header-title{
            color: #fff;
        }
    }
    &amp;.is-fixed{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">//header.vue</span>
<span class="hljs-params">&lt;template&gt;</span>
    <span class="hljs-params">&lt;header class="m-header is-bg is-fixed" &gt;</span>
          <span class="hljs-params">&lt;div class="m-header-button is-left"&gt;</span>
              <span class="hljs-params">&lt;a href="javascript:;"&gt;</span>
<span class="hljs-params">&lt; img class="m-icon-img" src="../../assets/images/ic_bar_back_white.png"/&gt;</span>返回<span class="hljs-params">&lt;/a&gt;</span>
          <span class="hljs-params">&lt;/div&gt;</span>
          
          <span class="hljs-params">&lt;h1 class="m-header-title"&gt;</span>豆瓣app<span class="hljs-params">&lt;/h1&gt;</span>
          
          <span class="hljs-params">&lt;div class="m-header-button is-right"&gt;</span>
              <span class="hljs-params">&lt;a href="javascript:;"&gt;</span>分享<span class="hljs-params">&lt;/a&gt;</span>
          <span class="hljs-params">&lt;/div&gt;</span>
          
          
      <span class="hljs-params">&lt;/header&gt;</span>
<span class="hljs-params">&lt;/template&gt;</span>
<span class="hljs-params">&lt;script&gt;</span>
  
<span class="hljs-params">&lt;/script&gt;</span>
<span class="hljs-params">&lt;style lang="less"&gt;</span>
<span class="hljs-comment">/*导入颜色变量*/</span>
@import <span class="hljs-string">"../assets/less/var.less"</span>;
.m-header{
<span class="hljs-symbol">    display:</span> flex;
    align-items: center;
<span class="hljs-symbol">    height:</span> <span class="hljs-number">44</span>px;
<span class="hljs-symbol">    padding:</span> <span class="hljs-number">0</span> <span class="hljs-number">10</span>px;
<span class="hljs-symbol">    background:</span> <span class="hljs-meta">#fff;</span>
<span class="hljs-symbol">    color:</span> @headerDefaultColor;
    border-bottom:<span class="hljs-number">1</span>px solid <span class="hljs-meta">#eee;</span>
    a{
<span class="hljs-symbol">        color:</span> @headerDefaultColor;
    }
    .m-header-button{
<span class="hljs-symbol">        width:</span> <span class="hljs-number">70</span>px;
        align-items:stretch;
        &amp;.is-left{
            text-align: left;
        }
        &amp;.is-right{
            text-align: right;
        }
        .m-icon-img{
<span class="hljs-symbol">            width:</span> <span class="hljs-number">20</span>px;
<span class="hljs-symbol">            height:</span> <span class="hljs-number">20</span>px;
        }
        .margin-right<span class="hljs-number">-10</span>{
            margin-right: <span class="hljs-number">10</span>px;
        }
    }
    .m-header-title{
<span class="hljs-symbol">        flex:</span> <span class="hljs-number">1</span>;
        text-align: center;
        font-size: <span class="hljs-number">16</span>px;
        text-overflow: ellipsis;
        white-space: nowrap;
<span class="hljs-symbol">        overflow:</span> hidden;
    }
    &amp;.is-bg{
<span class="hljs-symbol">        background:</span>@headerBg;
<span class="hljs-symbol">        color:</span> <span class="hljs-meta">#fff;</span>
        a{color: <span class="hljs-meta">#fff;}</span>
        .m-header-title{
<span class="hljs-symbol">            color:</span> <span class="hljs-meta">#fff;</span>
        }
    }
    &amp;.is-fixed{
<span class="hljs-symbol">        position:</span> fixed;
<span class="hljs-symbol">        left:</span> <span class="hljs-number">0</span>;
<span class="hljs-symbol">        right:</span> <span class="hljs-number">0</span>;
<span class="hljs-symbol">        top:</span> <span class="hljs-number">0</span>;
        z-index: <span class="hljs-number">9</span>;
    }
}
<span class="hljs-params">&lt;/style&gt;</span></code></pre>
<p>下图就是我们完成后的截图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008491062" src="https://static.alili.tech/img/remote/1460000008491062" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>is-bg:是否显示背景色，默认是绿色<br>is-fixed:是否显示在顶部</p>
<p>去掉is-bg,显示白色背景的header组件</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008491063" src="https://static.alili.tech/img/remote/1460000008491063" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>由于上一章tarbar组件没有用到var.less，那么在这里也统一改一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//tabbar.vue

<style lang=&quot;less&quot;>
@import &quot;../assets/less/var.less&quot;;
.m-tabbar-item{
    flex: 1;
    text-align: center;
    .m-tabbar-item-icon{
        display: block;
        padding-top: 2px;
        img{
            width: 28px;
            height: 28px;
        }

    }
    .m-tabbar-item-text{
        display: block;
        font-size: 10px;
        color:#949494;
    }
    &amp;.is-active{
        .m-tabbar-item-text{
            color: @tabbarActiveColor;
        }
    }
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-comment">//tabbar.vue</span>

&lt;style lang=<span class="hljs-string">"less"</span>&gt;
@<span class="hljs-keyword">import</span> <span class="hljs-string">"../assets/less/var.less"</span>;
.m-tabbar-item{
    flex: <span class="hljs-number">1</span>;
    <span class="hljs-keyword">text</span>-align: center;
    .m-tabbar-item-icon{
        display: <span class="hljs-keyword">block</span>;
        padding-top: <span class="hljs-number">2</span>px;
        img{
            width: <span class="hljs-number">28</span>px;
            height: <span class="hljs-number">28</span>px;
        }

    }
    .m-tabbar-item-<span class="hljs-keyword">text</span>{
        display: <span class="hljs-keyword">block</span>;
        font-size: <span class="hljs-number">10</span>px;
        <span class="hljs-built_in">color</span>:#<span class="hljs-number">949494</span>;
    }
    &amp;.<span class="hljs-keyword">is</span>-active{
        .m-tabbar-item-<span class="hljs-keyword">text</span>{
            <span class="hljs-built_in">color</span>: @tabbarActiveColor;
        }
    }
}
&lt;/style&gt;</code></pre>
<p>如果我们需要更换整个app的颜色，只需要在var.less更改相应的变量就可以了。例如：</p>
<p>改成黄色</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//var.less

//APP默认颜色
@defaultColor:#f6c210;
//header
@headerBg:@defaultColor;
@headerDefaultColor:rgb(73,73,73);

//tabbar
@tabbarActiveColor: @defaultColor;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//var.less</span>

<span class="hljs-comment">//APP默认颜色</span>
<span class="hljs-variable">@defaultColor:</span><span class="hljs-number">#f6c210</span>;
<span class="hljs-comment">//header</span>
<span class="hljs-variable">@headerBg:</span><span class="hljs-variable">@defaultColor</span>;
<span class="hljs-variable">@headerDefaultColor:</span>rgb(<span class="hljs-number">73</span>,<span class="hljs-number">73</span>,<span class="hljs-number">73</span>);

<span class="hljs-comment">//tabbar</span>
<span class="hljs-variable">@tabbarActiveColor:</span> <span class="hljs-variable">@defaultColor</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008491064" src="https://static.alili.tech/img/remote/1460000008491064" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>改成红色</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//var.less

//APP默认颜色
@defaultColor:#ff0000;
//header
@headerBg:@defaultColor;
@headerDefaultColor:rgb(73,73,73);

//tabbar
@tabbarActiveColor: @defaultColor;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//var.less</span>

<span class="hljs-comment">//APP默认颜色</span>
<span class="hljs-variable">@defaultColor:</span><span class="hljs-number">#ff0000</span>;
<span class="hljs-comment">//header</span>
<span class="hljs-variable">@headerBg:</span><span class="hljs-variable">@defaultColor</span>;
<span class="hljs-variable">@headerDefaultColor:</span>rgb(<span class="hljs-number">73</span>,<span class="hljs-number">73</span>,<span class="hljs-number">73</span>);

<span class="hljs-comment">//tabbar</span>
<span class="hljs-variable">@tabbarActiveColor:</span> <span class="hljs-variable">@defaultColor</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008491065" src="https://static.alili.tech/img/remote/1460000008491065" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>是不是非常的方便！！！</p>
<p>接下来我们就来把header改造成可以配置属性的组件，可以传递props(title,fixed,bg),</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <header class=&quot;m-header&quot; :class=&quot;{'is-bg':bg,'is-fixed':fixed}&quot;>
          <div class=&quot;m-header-button is-left&quot;>
              <slot name=&quot;left&quot;></slot>
          </div>
          
          <h1 class=&quot;m-header-title&quot; v-text=&quot;title&quot;></h1>
          
          <div class=&quot;m-header-button is-right&quot;>
              <slot name=&quot;right&quot;></slot>
          </div>
          
          
      </header>
</template>
<script>
   export default{
       props:{
           title:{
               type:String,
               default:''
           },
           bg:{
               type:Boolean,
               default:false
           },
           fixed:{
               type:Boolean,
               default:false
           }
       }
   }
</script>
<style lang=&quot;less&quot;>
/*导入颜色变量*/
@import &quot;../assets/less/var.less&quot;;
.m-header{
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 10px;
    background: #fff;
    color: @headerDefaultColor;
    border-bottom:1px solid #eee;
    a{
        color: @headerDefaultColor;
    }
    .m-header-button{
        width: 70px;
        align-items:stretch;
        &amp;.is-left{
            text-align: left;
        }
        &amp;.is-right{
            text-align: right;
        }
        .m-icon-img{
            width: 20px;
            height: 20px;
        }
        .margin-right-10{
            margin-right: 10px;
        }
    }
    .m-header-title{
        flex: 1;
        text-align: center;
        font-size: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    &amp;.is-bg{
        background:@headerBg;
        color: #fff;
        a{color: #fff;}
        .m-header-title{
            color: #fff;
        }
    }
    &amp;.is-fixed{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">&lt;template&gt;</span>
    <span class="hljs-string">&lt;header</span> <span class="hljs-string">class="m-header"</span> <span class="hljs-string">:class="{'is-bg':bg,'is-fixed':fixed}"&gt;</span>
          <span class="hljs-string">&lt;div</span> <span class="hljs-string">class="m-header-button</span> <span class="hljs-string">is-left"&gt;</span>
              <span class="hljs-string">&lt;slot</span> <span class="hljs-string">name="left"&gt;&lt;/slot&gt;</span>
          <span class="hljs-string">&lt;/div&gt;</span>
          
          <span class="hljs-string">&lt;h1</span> <span class="hljs-string">class="m-header-title"</span> <span class="hljs-string">v-text="title"&gt;&lt;/h1&gt;</span>
          
          <span class="hljs-string">&lt;div</span> <span class="hljs-string">class="m-header-button</span> <span class="hljs-string">is-right"&gt;</span>
              <span class="hljs-string">&lt;slot</span> <span class="hljs-string">name="right"&gt;&lt;/slot&gt;</span>
          <span class="hljs-string">&lt;/div&gt;</span>
          
          
      <span class="hljs-string">&lt;/header&gt;</span>
<span class="hljs-string">&lt;/template&gt;</span>
<span class="hljs-string">&lt;script&gt;</span>
   <span class="hljs-string">export</span> <span class="hljs-string">default{</span>
<span class="hljs-attr">       props:</span><span class="hljs-string">{</span>
<span class="hljs-attr">           title:</span><span class="hljs-string">{</span>
<span class="hljs-attr">               type:</span><span class="hljs-string">String,</span>
<span class="hljs-attr">               default:</span><span class="hljs-string">''</span>
           <span class="hljs-string">},</span>
<span class="hljs-attr">           bg:</span><span class="hljs-string">{</span>
<span class="hljs-attr">               type:</span><span class="hljs-string">Boolean,</span>
<span class="hljs-attr">               default:</span><span class="hljs-literal">false</span>
           <span class="hljs-string">},</span>
<span class="hljs-attr">           fixed:</span><span class="hljs-string">{</span>
<span class="hljs-attr">               type:</span><span class="hljs-string">Boolean,</span>
<span class="hljs-attr">               default:</span><span class="hljs-literal">false</span>
           <span class="hljs-string">}</span>
       <span class="hljs-string">}</span>
   <span class="hljs-string">}</span>
<span class="hljs-string">&lt;/script&gt;</span>
<span class="hljs-string">&lt;style</span> <span class="hljs-string">lang="less"&gt;</span>
<span class="hljs-string">/*导入颜色变量*/</span>
<span class="hljs-string">@import</span> <span class="hljs-string">"../assets/less/var.less"</span><span class="hljs-string">;</span>
<span class="hljs-string">.m-header{</span>
<span class="hljs-attr">    display:</span> <span class="hljs-string">flex;</span>
<span class="hljs-attr">    align-items:</span> <span class="hljs-string">center;</span>
<span class="hljs-attr">    height:</span> <span class="hljs-number">44</span><span class="hljs-string">px;</span>
<span class="hljs-attr">    padding:</span> <span class="hljs-number">0</span> <span class="hljs-number">10</span><span class="hljs-string">px;</span>
<span class="hljs-attr">    background:</span> <span class="hljs-comment">#fff;</span>
<span class="hljs-attr">    color:</span> <span class="hljs-string">@headerDefaultColor;</span>
<span class="hljs-attr">    border-bottom:</span><span class="hljs-number">1</span><span class="hljs-string">px</span> <span class="hljs-string">solid</span> <span class="hljs-comment">#eee;</span>
    <span class="hljs-string">a{</span>
<span class="hljs-attr">        color:</span> <span class="hljs-string">@headerDefaultColor;</span>
    <span class="hljs-string">}</span>
    <span class="hljs-string">.m-header-button{</span>
<span class="hljs-attr">        width:</span> <span class="hljs-number">70</span><span class="hljs-string">px;</span>
<span class="hljs-attr">        align-items:</span><span class="hljs-string">stretch;</span>
        <span class="hljs-string">&amp;.is-left{</span>
<span class="hljs-attr">            text-align:</span> <span class="hljs-string">left;</span>
        <span class="hljs-string">}</span>
        <span class="hljs-string">&amp;.is-right{</span>
<span class="hljs-attr">            text-align:</span> <span class="hljs-string">right;</span>
        <span class="hljs-string">}</span>
        <span class="hljs-string">.m-icon-img{</span>
<span class="hljs-attr">            width:</span> <span class="hljs-number">20</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            height:</span> <span class="hljs-number">20</span><span class="hljs-string">px;</span>
        <span class="hljs-string">}</span>
        <span class="hljs-string">.margin-right-10{</span>
<span class="hljs-attr">            margin-right:</span> <span class="hljs-number">10</span><span class="hljs-string">px;</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
    <span class="hljs-string">.m-header-title{</span>
<span class="hljs-attr">        flex:</span> <span class="hljs-number">1</span><span class="hljs-string">;</span>
<span class="hljs-attr">        text-align:</span> <span class="hljs-string">center;</span>
<span class="hljs-attr">        font-size:</span> <span class="hljs-number">16</span><span class="hljs-string">px;</span>
<span class="hljs-attr">        text-overflow:</span> <span class="hljs-string">ellipsis;</span>
<span class="hljs-attr">        white-space:</span> <span class="hljs-string">nowrap;</span>
<span class="hljs-attr">        overflow:</span> <span class="hljs-string">hidden;</span>
    <span class="hljs-string">}</span>
    <span class="hljs-string">&amp;.is-bg{</span>
<span class="hljs-attr">        background:</span><span class="hljs-string">@headerBg;</span>
<span class="hljs-attr">        color:</span> <span class="hljs-comment">#fff;</span>
        <span class="hljs-string">a{color:</span> <span class="hljs-comment">#fff;}</span>
        <span class="hljs-string">.m-header-title{</span>
<span class="hljs-attr">            color:</span> <span class="hljs-comment">#fff;</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
    <span class="hljs-string">&amp;.is-fixed{</span>
<span class="hljs-attr">        position:</span> <span class="hljs-string">fixed;</span>
<span class="hljs-attr">        left:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">        right:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">        top:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">        z-index:</span> <span class="hljs-number">9</span><span class="hljs-string">;</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">}</span>
<span class="hljs-string">&lt;/style&gt;</span></code></pre>
<p>大功告成！我们就来调用吧！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<m-header title=&quot;豆瓣app&quot; :bg=&quot;true&quot;>
              <a href=&quot;javascript:;&quot; slot=&quot;left&quot;>< img class=&quot;m-icon-img&quot; src=&quot;../../assets/images/ic_bar_back_white.png&quot;/>返回</a>
              <a href=&quot;javascript:;&quot; slot=&quot;right&quot;>分享</a>
      </m-header>
      <m-header title=&quot;豆瓣app&quot; :bg=&quot;true&quot;>
          <a href=&quot;javascript:;&quot; slot=&quot;left&quot;>< img class=&quot;m-icon-img&quot; src=&quot;../../assets/images/ic_bar_back_white.png&quot;/>返回</a>
              <a href=&quot;javascript:;&quot; slot=&quot;right&quot;>分享</a>
      </m-header>
      <m-header title=&quot;豆瓣app&quot; fixed>
              <a href=&quot;javascript:;&quot; slot=&quot;left&quot;>< img class=&quot;m-icon-img&quot; src=&quot;../../assets/images/ic_bar_back_green.png&quot;/>返回</a>
              <a href=&quot;javascript:;&quot; slot=&quot;right&quot;>< img class=&quot;m-icon-img margin-right-10&quot; src=&quot;../../assets/images/ic_actionbar_search_icon.png&quot;/></a>
              <a href=&quot;javascript:;&quot; slot=&quot;right&quot;>< img class=&quot;m-icon-img&quot; src=&quot;../../assets/images/ic_chat_green.png&quot;/></a>
      </m-header>
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;m-<span class="hljs-selector-tag">header</span> title=<span class="hljs-string">"豆瓣app"</span> :bg=<span class="hljs-string">"true"</span>&gt;
              &lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"javascript:;"</span> slot=<span class="hljs-string">"left"</span>&gt;&lt; <span class="hljs-selector-tag">img</span> class=<span class="hljs-string">"m-icon-img"</span> src=<span class="hljs-string">"../../assets/images/ic_bar_back_white.png"</span>/&gt;返回&lt;/a&gt;
              &lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"javascript:;"</span> slot=<span class="hljs-string">"right"</span>&gt;分享&lt;/a&gt;
      &lt;/m-header&gt;
      &lt;m-<span class="hljs-selector-tag">header</span> title=<span class="hljs-string">"豆瓣app"</span> :bg=<span class="hljs-string">"true"</span>&gt;
          &lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"javascript:;"</span> slot=<span class="hljs-string">"left"</span>&gt;&lt; <span class="hljs-selector-tag">img</span> class=<span class="hljs-string">"m-icon-img"</span> src=<span class="hljs-string">"../../assets/images/ic_bar_back_white.png"</span>/&gt;返回&lt;/a&gt;
              &lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"javascript:;"</span> slot=<span class="hljs-string">"right"</span>&gt;分享&lt;/a&gt;
      &lt;/m-header&gt;
      &lt;m-<span class="hljs-selector-tag">header</span> title=<span class="hljs-string">"豆瓣app"</span> fixed&gt;
              &lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"javascript:;"</span> slot=<span class="hljs-string">"left"</span>&gt;&lt; <span class="hljs-selector-tag">img</span> class=<span class="hljs-string">"m-icon-img"</span> src=<span class="hljs-string">"../../assets/images/ic_bar_back_green.png"</span>/&gt;返回&lt;/a&gt;
              &lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"javascript:;"</span> slot=<span class="hljs-string">"right"</span>&gt;&lt; <span class="hljs-selector-tag">img</span> class=<span class="hljs-string">"m-icon-img margin-right-10"</span> src=<span class="hljs-string">"../../assets/images/ic_actionbar_search_icon.png"</span>/&gt;&lt;/a&gt;
              &lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"javascript:;"</span> slot=<span class="hljs-string">"right"</span>&gt;&lt; <span class="hljs-selector-tag">img</span> class=<span class="hljs-string">"m-icon-img"</span> src=<span class="hljs-string">"../../assets/images/ic_chat_green.png"</span>/&gt;&lt;/a&gt;
      &lt;/m-header&gt;
   </code></pre>
<h3 id="articleHeader1">改造tabbar,完成路由跳转</h3>
<p>上一章我们只完成了tabbar点击改变颜色，那么如何通过路由来进行跳转页面呢？</p>
<p>我们先新建底部tabbar的路由页面，豆瓣app这个项目说大不大说小也不小，为了规划好结构，我们将每一个路由都新建一个文件夹，然后在文件夹里面，新建这个页面。在每个页面都添加不同的header组件，如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008491066" src="https://static.alili.tech/img/remote/1460000008491066" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<p>然后在每一个路由页面里面，我们都添加上header组件。<br>拥有header组件的示例：</p>
<h4>Mine.vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
          <m-header title=&quot;我的&quot; fixed>
              <a href=&quot;javascript:;&quot; slot=&quot;right&quot;>< img class=&quot;m-icon-img margin-right-10&quot; src=&quot;../../assets/images/ic_actionbar_search_icon.png&quot;/></a>
              <a href=&quot;javascript:;&quot; slot=&quot;right&quot;>< img class=&quot;m-icon-img&quot; src=&quot;../../assets/images/ic_chat_green.png&quot;/></a>
      </m-header>
  </div>
</template>

<script>
  import mHeader from '../../components/header'
  
  export default {
    name: 'mine',
    components: {
      mHeader
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">m-header</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"我的"</span> <span class="hljs-attr">fixed</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-icon-img margin-right-10"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../assets/images/ic_actionbar_search_icon.png"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-icon-img"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../assets/images/ic_chat_green.png"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-header</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> mHeader <span class="hljs-keyword">from</span> <span class="hljs-string">'../../components/header'</span>
  
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'mine'</span>,
    <span class="hljs-attr">components</span>: {
      mHeader
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>路由的页面完成后我们就需要在router文件夹下面的index.js里面，来配置页面路由。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index/Index'
import Broadcast from '../pages/Broadcast/Broadcast'
import AudioBook from '../pages/AudioBook/AudioBook'
import Group from '../pages/Group/Group'
import Mine from '../pages/Mine/Mine'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/broadcast',
      name: 'Broadcast',
      component: Broadcast
    },
    {
      path: '/audioBook',
      name: 'AudioBook',
      component: AudioBook
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/Index',
      redirect: '/'
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-keyword">import</span> Vue from 'vue'
<span class="hljs-keyword">import</span> Router from 'vue-router'
<span class="hljs-keyword">import</span> Index from '../pages/Index/Index'
<span class="hljs-keyword">import</span> Broadcast from '../pages/Broadcast/Broadcast'
<span class="hljs-keyword">import</span> AudioBook from '../pages/AudioBook/AudioBook'
<span class="hljs-keyword">import</span> Group from '../pages/Group/Group'
<span class="hljs-keyword">import</span> Mine from '../pages/Mine/Mine'
Vue.use(Router)

export default new Router({
  routes: [
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'Index'</span>,
      component: Index
    },
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/broadcast'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'Broadcast'</span>,
      component: Broadcast
    },
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/audioBook'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'AudioBook'</span>,
      component: AudioBook
    },
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/group'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'Group'</span>,
      component: Group
    },
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/mine'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'Mine'</span>,
      component: Mine
    },
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/Index'</span>,
      redirect: <span class="hljs-string">'/'</span>
    },
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'*'</span>,
      redirect: <span class="hljs-string">'/'</span>
    },
  ]
})
</code></pre>
<p>我们可以在浏览器输入配置的这个路由地址来访问这个页面是否存在。如果不存在详细检查路径是否正确。</p>
<p>接下来我们就来改造tabbar实现路由跳转。我们先将index.vue里的tabbar组件移入到app.vue里面，并且将每一个id改成对应的路由，添加一个isRouter属性，来判断当前item是否是路由跳转。然后在tabbar-item.vue里我们在props添加isRouter，click点击跳转的方法放到methods里面，并且根据传递的isRouter判断当前是否通过路由跳转</p>
<h4>App.vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <router-view></router-view>
    <m-tabbar v-model=&quot;select&quot;>
     <m-tabbar-item id='Index' isRouter>
        < img src=&quot;./assets/images/ic_tab_home_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        < img src=&quot;./assets/images/ic_tab_home_active.png&quot; alt=&quot;&quot; slot=&quot;icon-active&quot;> 
        首页
      </m-tabbar-item>
      <m-tabbar-item id='AudioBook' isRouter>
        < img src=&quot;./assets/images/ic_tab_subject_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        < img src=&quot;./assets/images/ic_tab_subject_active.png&quot; alt=&quot;&quot; slot=&quot;icon-active&quot;> 
        书影音
      </m-tabbar-item>
      <m-tabbar-item id='Broadcast' isRouter>
        < img src=&quot;./assets/images/ic_tab_status_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        < img src=&quot;./assets/images/ic_tab_status_active.png&quot; alt=&quot;&quot; slot=&quot;icon-active&quot;> 
        广播
      </m-tabbar-item>
      <m-tabbar-item id='Group' isRouter>
        < img src=&quot;./assets/images/ic_tab_group_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        < img src=&quot;./assets/images/ic_tab_group_active.png&quot; alt=&quot;&quot; slot=&quot;icon-active&quot;> 
        小组
      </m-tabbar-item>
       <m-tabbar-item id='Mine' isRouter>
        < img src=&quot;./assets/images/ic_tab_profile_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        < img src=&quot;./assets/images/ic_tab_profile_active.png&quot; alt=&quot;&quot; slot=&quot;icon-active&quot;> 
        我的
      </m-tabbar-item>
    </m-tabbar>
  </div>
</template>

<script>
import mTabbar from './components/tabbar'
import mTabbarItem from './components/tabbar-item'
export default {
  name: 'app',
  components:{
      mTabbar,
    mTabbarItem
  },
  data() {
      return {
        select:&quot;Index&quot;
      }
    }
}
</script>

<style>

</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"select"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'Index'</span> <span class="hljs-attr">isRouter</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/images/ic_tab_home_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/images/ic_tab_home_active.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-active"</span>&gt;</span> 
        首页
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'AudioBook'</span> <span class="hljs-attr">isRouter</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/images/ic_tab_subject_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/images/ic_tab_subject_active.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-active"</span>&gt;</span> 
        书影音
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'Broadcast'</span> <span class="hljs-attr">isRouter</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/images/ic_tab_status_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/images/ic_tab_status_active.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-active"</span>&gt;</span> 
        广播
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'Group'</span> <span class="hljs-attr">isRouter</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/images/ic_tab_group_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/images/ic_tab_group_active.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-active"</span>&gt;</span> 
        小组
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'Mine'</span> <span class="hljs-attr">isRouter</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/images/ic_tab_profile_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/images/ic_tab_profile_active.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-active"</span>&gt;</span> 
        我的
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> mTabbar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/tabbar'</span>
<span class="hljs-keyword">import</span> mTabbarItem <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/tabbar-item'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>:{
      mTabbar,
    mTabbarItem
  },
  data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">select</span>:<span class="hljs-string">"Index"</span>
      }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h4>tabbar-item.vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

<template>
    <a class=&quot;m-tabbar-item&quot; :class=&quot;{'is-active':isActive}&quot; @click=&quot;goToRouter&quot;>
        <span class=&quot;m-tabbar-item-icon&quot; v-show=&quot;!isActive&quot;><slot name=&quot;icon-normal&quot;></slot></span>
        <span class=&quot;m-tabbar-item-icon&quot; v-show=&quot;isActive&quot;><slot name=&quot;icon-active&quot;></slot></span>
        <span class=&quot;m-tabbar-item-text&quot;><slot></slot></span>
    </a>
</template>
<script>
    export default{
        props: {
            id:{
                type:String
            },
            isRouter:{
                type:Boolean,
                default:false
            }
        },
        computed: {
           isActive(){
               if(this.$parent.value===this.id){
                   return true;
               }
           }
        },
        methods:{
            goToRouter(){
                this.$parent.$emit('input',this.id)
                        //判断是否为路由跳转
                if(this.isRouter){
                                //根据id跳转到对应的路由页面
                    this.$router.push(this.id)
                }
            }
        }
    }
</script>
<style lang=&quot;less&quot;>
@import &quot;../assets/less/var.less&quot;;
.m-tabbar-item{
    flex: 1;
    text-align: center;
    .m-tabbar-item-icon{
        display: block;
        padding-top: 2px;
        img{
            width: 28px;
            height: 28px;
        }

    }
    .m-tabbar-item-text{
        display: block;
        font-size: 10px;
        color:#949494;
    }
    &amp;.is-active{
        .m-tabbar-item-text{
            color: @tabbarActiveColor;
        }
    }
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-tabbar-item"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'is-active':isActive}"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"goToRouter"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-tabbar-item-icon"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"!isActive"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-tabbar-item-icon"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isActive"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"icon-active"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-tabbar-item-text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        <span class="hljs-attr">props</span>: {
            <span class="hljs-attr">id</span>:{
                <span class="hljs-attr">type</span>:<span class="hljs-built_in">String</span>
            },
            <span class="hljs-attr">isRouter</span>:{
                <span class="hljs-attr">type</span>:<span class="hljs-built_in">Boolean</span>,
                <span class="hljs-attr">default</span>:<span class="hljs-literal">false</span>
            }
        },
        <span class="hljs-attr">computed</span>: {
           isActive(){
               <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$parent.value===<span class="hljs-keyword">this</span>.id){
                   <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
               }
           }
        },
        <span class="hljs-attr">methods</span>:{
            goToRouter(){
                <span class="hljs-keyword">this</span>.$parent.$emit(<span class="hljs-string">'input'</span>,<span class="hljs-keyword">this</span>.id)
                        <span class="hljs-comment">//判断是否为路由跳转</span>
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.isRouter){
                                <span class="hljs-comment">//根据id跳转到对应的路由页面</span>
                    <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-keyword">this</span>.id)
                }
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="undefined">
@import "../assets/less/var.less";
.m-tabbar-item{
    flex: 1;
    text-align: center;
    .m-tabbar-item-icon{
        display: block;
        padding-top: 2px;
        img{
            width: 28px;
            height: 28px;
        }

    }
    .m-tabbar-item-text{
        display: block;
        font-size: 10px;
        color:#949494;
    }
    &amp;.is-active{
        .m-tabbar-item-text{
            color: @tabbarActiveColor;
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>路由跳转就完成了，如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008491067?w=598&amp;h=566" src="https://static.alili.tech/img/remote/1460000008491067?w=598&amp;h=566" alt="录像1_转.gif" title="录像1_转.gif" style="cursor: pointer;"></span></p>
<p>git地址：<br><a href="https://github.com/MrMoveon/doubanApp" rel="nofollow noreferrer" target="_blank">https://github.com/MrMoveon/d...</a></p>
<p>第二章源码<br>链接: <a href="http://pan.baidu.com/s/1kUElWX5" rel="nofollow noreferrer" target="_blank">http://pan.baidu.com/s/1kUElWX5</a> 密码: sp4i</p>
<p>vue专题目录：<br><a href="https://segmentfault.com/a/1190000008473744">1-vuejs2.0实战：仿豆瓣app项目，创建自定义组件tabbar</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
2-vuejs2.0实战：仿豆瓣app项目，创建组件header,tabbar路由跳转

## 原文链接
[https://segmentfault.com/a/1190000008491055](https://segmentfault.com/a/1190000008491055)


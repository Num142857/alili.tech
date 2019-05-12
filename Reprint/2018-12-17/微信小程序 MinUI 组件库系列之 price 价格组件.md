---
title: '微信小程序 MinUI 组件库系列之 price 价格组件' 
date: 2018-12-17 2:30:07
hidden: true
slug: x2liltnm5p
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/meili/minui" rel="nofollow noreferrer" target="_blank">MinUI</a> 是基于微信小程序自定义组件特性开发而成的一套简洁、易用、高效的组件库，适用场景广，覆盖小程序原生框架、小程序组件化框架等，并且提供了高效的命令行工具。MinUI 组件库包含了很多基础的组件，其中价格 price 组件是一个很常用的基础元件， MinUI 中 price 组件的效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012872777?w=217&amp;h=70" src="https://static.alili.tech/img/remote/1460000012872777?w=217&amp;h=70" alt="price" title="price" style="cursor: pointer; display: inline;"></span></p>
<p>是不是看起来很方便很快捷的样子(^_^)。可以打开微信扫一扫下面的小程序二维码先一睹为快：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012872778?w=220&amp;h=330" src="https://static.alili.tech/img/remote/1460000012872778?w=220&amp;h=330" alt="price" title="price" style="cursor: pointer; display: inline;"></span></p>
<p>下面介绍 price 组件的使用方式。</p>
<p><strong>1、使用下列命令安装 <a href="https://github.com/meili/min-cli" rel="nofollow noreferrer" target="_blank">Min-Cli</a>，如已安装，请进入到下一步。Min-Cli 的文档请猛戳这里：<a href="https://meili.github.io/min/docs/install/index.html" rel="nofollow noreferrer" target="_blank">Min-Cli使用手册</a></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g @mindev/min-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install -g @mindev/min-cli</code></pre>
<p><strong>2、初始化一个小程序项目。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="min init my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">min init my-project</code></pre>
<p>选择 <strong>新建小程序</strong> 选项，即可初始化一个小程序项目。创建项目后，在编辑器中打开项目，src 目录为源码目录，dist 目录为编译后用于在微信开发者工具中指定的目录。新建的项目中已有一个 <code>home</code> 页面。详细文档：<a href="https://meili.github.io/min/docs/min-cli/app-project/init/index.html" rel="nofollow noreferrer" target="_blank">Min 初始化小程序项目</a></p>
<p><strong>3、安装 price 组件。</strong></p>
<p>进入刚才新建的小程序项目的目录中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">cd <span class="hljs-keyword">my</span>-project</code></pre>
<p>安装组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="min install @minui/wxc-price" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">min install @minui/wxc-price</code></pre>
<p><strong>4、开启dev。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="min dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">min dev</code></pre>
<p>开启之后，修改源码后都会重新编译。</p>
<p><strong>5、在页面中引入组件。</strong></p>
<p>在编辑器中打开 <code>src/pages</code> 目录下的 <code>home/index.wxp</code> 文件，在 <code>script</code> 中添加 <code>config</code> 字段，配置小程序自定义组件字段，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    config: {
        &quot;usingComponents&quot;: {
            'wxc-price': &quot;@minui/wxc-price&quot;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">config</span>: {
        <span class="hljs-string">"usingComponents"</span>: {
            <span class="hljs-string">'wxc-price'</span>: <span class="hljs-string">"@minui/wxc-price"</span>
        }
    }
}</code></pre>
<p><code>wxc-price</code> 即为价格组件的标签名，可以在 wxml 中使用。</p>
<p><strong>6、在 wxml 中使用 <code>wxc-price</code>标签。</strong></p>
<p>在 <code>home/index.wxp</code> 文件的 <code>template</code> 中添加 <code>wxc-price</code> 标签，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<view class=&quot;container&quot;>
  <wxc-price value=&quot;70&quot; decimal=&quot;2&quot;></wxc-price>
</view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">wxc-price</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"70"</span> <span class="hljs-attr">decimal</span>=<span class="hljs-string">"2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">wxc-price</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></code></pre>
<p><strong>7、打开微信开发者工具，指定 <code>dist</code> 目录，预览项目。</strong></p>
<p><code>home/index.wxp</code> 文件的代码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- home/index.wxp -->
<template>
  <view class=&quot;container&quot;>
    <wxc-price value=&quot;70&quot; decimal=&quot;2&quot;></wxc-price>
  </view>
</template>
<script>
export default {
    config: {
        &quot;usingComponents&quot;: {
            'wxc-price': &quot;@minui/wxc-price&quot;
        }
    }
}
</script>
<style>
  .container {
    padding: 20rpx;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- home/index.wxp --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">wxc-price</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"70"</span> <span class="hljs-attr">decimal</span>=<span class="hljs-string">"2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">wxc-price</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">config</span>: {
        <span class="hljs-string">"usingComponents"</span>: {
            <span class="hljs-string">'wxc-price'</span>: <span class="hljs-string">"@minui/wxc-price"</span>
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20</span>rpx;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>至此，minui 组件库的 price 价格组件在 Min 工具生成的小程序项目中的方法已介绍完毕，其他场景如在已有小程序项目中的使用方式请移步至如下链接：</p>
<p><a href="https://meili.github.io/min/docs/min-cli/third-project/index.html" rel="nofollow noreferrer" target="_blank">在已有小程序项目中使用 MinUI 组件</a></p>
<p>了解组件的使用方式后，下面开始介绍价格 price 组件的 API 。</p>
<p><strong>Price【props】</strong></p>
<table>
<thead><tr>
<th>属性</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>value</td>
<td>[可选] 价格数值，优先级高于标签内嵌套值</td>
</tr>
<tr>
<td>symbol</td>
<td>[可选] 货币符号。默认为 <code>￥</code>
</td>
</tr>
<tr>
<td>status</td>
<td>[可选] 显示状态，若设置为 del 显示为删除态</td>
</tr>
<tr>
<td>icon</td>
<td>[可选] 人民币符号显示规则 &lt;br/&gt;&lt;br/&gt; - 如不设置，人民币符号的字号同价格数字一致 &lt;br/&gt; - 设为 sup，人民币符号字号缩小，位于价格左上方 &lt;br/&gt; - 设为 sub，人民币符号字号缩小，位于价格左下方</td>
</tr>
<tr>
<td>decimal</td>
<td>[可选] 小数部分显示规则 &lt;br/&gt;&lt;br/&gt; - 如不设置，显示 2 位小数，字号同整数部分一致 &lt;br/&gt; - 设置为 1，显示 1 位小数，小数部分向下取整 &lt;br/&gt; - 设为 none，不显示小数部分，只显示整数价格 &lt;br/&gt; - 设为 small，小数部分字号缩小</td>
</tr>
<tr>
<td>del-color</td>
<td>[可选] del 状态下文字颜色，只在del状态下有效，正常状态下文字颜色可继承父元素 &lt;br/&gt;&lt;br/&gt; - 默认 #999</td>
</tr>
</tbody>
</table>
<p><strong>更多demo</strong></p>
<p><strong>1、设置货币符号为美元</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <wxc-price symbol=&quot;$&quot;>70.00</wxc-price>
</template>

<script>
    export default {
        config: {
            usingComponents: {
                'wxc-price': '@minui/wxc-price'
            }
        }
    }
</script>

<style></style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">wxc-price</span> <span class="hljs-attr">symbol</span>=<span class="hljs-string">"$"</span>&gt;</span>70.00<span class="hljs-tag">&lt;/<span class="hljs-name">wxc-price</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">config</span>: {
            <span class="hljs-attr">usingComponents</span>: {
                <span class="hljs-string">'wxc-price'</span>: <span class="hljs-string">'@minui/wxc-price'</span>
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>图示：<br><span class="img-wrap"><img data-src="/img/remote/1460000012872779?w=400&amp;h=300" src="https://static.alili.tech/img/remote/1460000012872779?w=400&amp;h=300" alt="小程序 price 价格组件-设置货币符号为美元" title="小程序 price 价格组件-设置货币符号为美元" style="cursor: pointer;"></span></p>
<p><strong>2、常用的删除状态的原价</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <wxc-price status=&quot;del&quot; del-color=&quot;#666&quot;>140.00</wxc-price>
</template>

<script>
export default {
  config: {
    usingComponents: {
      'wxc-price': '@minui/wxc-price'
    }
  }
}
</script>

<style></style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">wxc-price</span> <span class="hljs-attr">status</span>=<span class="hljs-string">"del"</span> <span class="hljs-attr">del-color</span>=<span class="hljs-string">"#666"</span>&gt;</span>140.00<span class="hljs-tag">&lt;/<span class="hljs-name">wxc-price</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">config</span>: {
    <span class="hljs-attr">usingComponents</span>: {
      <span class="hljs-string">'wxc-price'</span>: <span class="hljs-string">'@minui/wxc-price'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>图示：<br><span class="img-wrap"><img data-src="/img/remote/1460000012872780?w=400&amp;h=300" src="https://static.alili.tech/img/remote/1460000012872780?w=400&amp;h=300" alt="小程序 price 价格组件-常用的删除状态的原价" title="小程序 price 价格组件-常用的删除状态的原价" style="cursor: pointer; display: inline;"></span></p>
<p><strong>3、小数部分字号缩小</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <wxc-price class=&quot;price-demo&quot; value=&quot;39.00&quot; decimal=&quot;small&quot;></wxc-price>
</template>

<script>
export default {
  config: {
    usingComponents: {
      'wxc-price': '@minui/wxc-price'
    }
  }
}
</script>

<style>
  .price-demo {
    font-size: 36rpx;
    font-weight: bold;
    color: #ff4422;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">wxc-price</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"price-demo"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"39.00"</span> <span class="hljs-attr">decimal</span>=<span class="hljs-string">"small"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">wxc-price</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">config</span>: {
    <span class="hljs-attr">usingComponents</span>: {
      <span class="hljs-string">'wxc-price'</span>: <span class="hljs-string">'@minui/wxc-price'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.price-demo</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">36</span>rpx;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#ff4422</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012872781?w=400&amp;h=300" src="https://static.alili.tech/img/remote/1460000012872781?w=400&amp;h=300" alt="小程序 price 价格组件-小数部分字号缩小" title="小程序 price 价格组件-小数部分字号缩小" style="cursor: pointer;"></span></p>
<p><strong>4、价格符号居下</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <wxc-price class=&quot;price-demo&quot; icon=&quot;sub&quot;>100.02</wxc-price>
</template>

<script>
export default {
  config: {
    usingComponents: {
      'wxc-price': '@minui/wxc-price'
    }
  }
}
</script>

<style>
  .price-demo {
    font-size: 36rpx;
    font-weight: bold;
    color: #ff4422;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">wxc-price</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"price-demo"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"sub"</span>&gt;</span>100.02<span class="hljs-tag">&lt;/<span class="hljs-name">wxc-price</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">config</span>: {
    <span class="hljs-attr">usingComponents</span>: {
      <span class="hljs-string">'wxc-price'</span>: <span class="hljs-string">'@minui/wxc-price'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.price-demo</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">36</span>rpx;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#ff4422</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012872782?w=400&amp;h=300" src="https://static.alili.tech/img/remote/1460000012872782?w=400&amp;h=300" alt="小程序 price 价格组件-价格符号居下" title="小程序 price 价格组件-价格符号居下" style="cursor: pointer; display: inline;"></span></p>
<p><strong>5、保留一位小数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <wxc-price value=&quot;70.68&quot; decimal=&quot;1&quot;></wxc-price>
</template>

<script>
export default {
  config: {
    usingComponents: {
      'wxc-price': '@minui/wxc-price'
    }
  }
}
</script>

<style></style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">wxc-price</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"70.68"</span> <span class="hljs-attr">decimal</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">wxc-price</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">config</span>: {
    <span class="hljs-attr">usingComponents</span>: {
      <span class="hljs-string">'wxc-price'</span>: <span class="hljs-string">'@minui/wxc-price'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012872783?w=400&amp;h=300" src="https://static.alili.tech/img/remote/1460000012872783?w=400&amp;h=300" alt="小程序 price 价格组件-保留一位小数" title="小程序 price 价格组件-保留一位小数" style="cursor: pointer;"></span></p>
<p>更多组件更新同步请关注<code>MinUI</code>小程序组件库示例查看，或请移步到实时同步更新的 <a href="https://meili.github.io/min/docs/minui/index.html#price" rel="nofollow noreferrer" target="_blank">微信小程序 price 价格组件使用文档</a></p>
<p><strong>沟通反馈</strong></p>
<p>请添加群助手 wUf18018252882 好友或者扫码加好友，并与群助手对话发送验证码 <code>10088</code> 按照指引进群。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012872784?w=320&amp;h=320" src="https://static.alili.tech/img/remote/1460000012872784?w=320&amp;h=320" alt="群二维码" title="群二维码" style="cursor: pointer;"></span></p>
<p><strong>相关链接</strong></p>
<ul>
<li><a href="https://github.com/meili/min-cli" rel="nofollow noreferrer" target="_blank"> Min-Cli 官方仓库 </a></li>
<li><a href="https://github.com/meili/minui" rel="nofollow noreferrer" target="_blank"> MinUI 官方仓库 </a></li>
<li><a href="https://meili.github.io/min/index.html" rel="nofollow noreferrer" target="_blank"> Min 官方文档 </a></li>
</ul>
<p><strong>开源组件</strong></p>
<ul>
<li>
<p><strong>布局元素</strong></p>
<ul>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-flex" rel="nofollow noreferrer" target="_blank"> flex 布局 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-cc" rel="nofollow noreferrer" target="_blank"> cc 水平垂直居中 </a></li>
</ul>
</li>
<li>
<p><strong>基础元件</strong></p>
<ul>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-avatar" rel="nofollow noreferrer" target="_blank"> avatar 头像 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-badge" rel="nofollow noreferrer" target="_blank"> badge 徽章 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-elip" rel="nofollow noreferrer" target="_blank"> elip 文本截断 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-icon" rel="nofollow noreferrer" target="_blank"> icon 图标 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-label" rel="nofollow noreferrer" target="_blank"> label 标签 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-loadmore" rel="nofollow noreferrer" target="_blank"> loadmore 页底提示 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-price" rel="nofollow noreferrer" target="_blank"> price 价格 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-progress" rel="nofollow noreferrer" target="_blank"> progress 进度条 </a></li>
</ul>
</li>
<li>
<p><strong>功能组件</strong></p>
<ul>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-abnor" rel="nofollow noreferrer" target="_blank"> abnor 异常流展示 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-countdown" rel="nofollow noreferrer" target="_blank"> countdown 倒计时 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-counter" rel="nofollow noreferrer" target="_blank"> counter 数字框 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-loading" rel="nofollow noreferrer" target="_blank"> loading 加载提示 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-mask" rel="nofollow noreferrer" target="_blank"> mask 遮罩层 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-steps" rel="nofollow noreferrer" target="_blank"> steps 步骤条 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-tab" rel="nofollow noreferrer" target="_blank"> tab 选项卡 </a></li>
</ul>
</li>
<li>
<p><strong>提示反馈</strong></p>
<ul>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-dialog" rel="nofollow noreferrer" target="_blank"> dialog 对话框 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-popup" rel="nofollow noreferrer" target="_blank"> popup 弹出层 </a></li>
<li><a href="https://github.com/meili/minui/tree/master/packages/wxc-toast" rel="nofollow noreferrer" target="_blank"> toast 提示框 </a></li>
</ul>
</li>
<li>
<p><strong>表单组件</strong></p>
<ul><li>Coming soon ...</li></ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                                            蘑菇街前端团队，2018.01.17 于杭州

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>                                            蘑菇街前端团队，2018<span class="hljs-selector-class">.01</span><span class="hljs-selector-class">.17</span> 于杭州

</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序 MinUI 组件库系列之 price 价格组件

## 原文链接
[https://segmentfault.com/a/1190000012874480](https://segmentfault.com/a/1190000012874480)


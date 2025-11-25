---
title: '移动端常用alert、confirm、toast等弹窗插件，兼容 jQuery/Zepto' 
date: 2018-12-26 2:30:14
hidden: true
slug: rooyvr4gtl
categories: [reprint]
---

{{< raw >}}

                    
<p>移动端弹窗插件第二版，包括常见的 alert、confirm、toast、notice 四种类型弹窗，支持 jQuery 和 Zepto 库。</p>
<h3 id="articleHeader0">特性</h3>
<ul>
<li><p>支持常见的 alert、confirm、toast、notice 四种类型弹窗</p></li>
<li><p>可选择使用 IOS 或者 Material Design 风格的弹窗</p></li>
<li><p>可自定义按钮的文字、样式、回调函数，支持多个按钮</p></li>
<li><p>多个弹窗状态改变回调函数</p></li>
<li><p>同时支持 jQuery 和 Zepto 库</p></li>
<li><p>可扩展性强</p></li>
</ul>
<h3 id="articleHeader1">新增</h3>
<ul>
<li><p>弹窗可选 IOS 或者 Material Design 风格</p></li>
<li><p>可自定义多个按钮</p></li>
<li><p>按钮排版样式，并排或者堆叠</p></li>
<li><p>notice 弹窗的位置，居中或者底部</p></li>
</ul>
<h3 id="articleHeader2">截图</h3>
<p><span class="img-wrap"><img data-src="/img/bVYqyu?w=316&amp;h=476" src="https://static.alili.tech/img/bVYqyu?w=316&amp;h=476" alt="a100af61384ffb7dbbb6f26c46c973e5?w=316&amp;h=476&amp;f=gif&amp;s=113683" title="a100af61384ffb7dbbb6f26c46c973e5?w=316&amp;h=476&amp;f=gif&amp;s=113683" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVYqyF?w=316&amp;h=476" src="https://static.alili.tech/img/bVYqyF?w=316&amp;h=476" alt="1ea87417fa70e984e6aeef148e634c8e" title="1ea87417fa70e984e6aeef148e634c8e" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVYqyL?w=316&amp;h=476" src="https://static.alili.tech/img/bVYqyL?w=316&amp;h=476" alt="08545fc3a24202dc6c50e53b7b620c29" title="08545fc3a24202dc6c50e53b7b620c29" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">示例</h2>
<p>查看效果，扫二维码或者移步→：<a href="http://sufangyu.github.io/project/dialog2/dist/demos/" rel="nofollow noreferrer" target="_blank">demo示例</a><br><span class="img-wrap"><img data-src="/img/bVYqyP?w=280&amp;h=280" src="https://static.alili.tech/img/bVYqyP?w=280&amp;h=280" alt="2aba4c07e304360d98ec39108d7228c4" title="2aba4c07e304360d98ec39108d7228c4" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">使用说明</h2>
<p><strong>1、引入 CSS 文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;../css/dialog.css&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">link</span> <span class="hljs-selector-tag">rel</span>="<span class="hljs-selector-tag">stylesheet</span>" <span class="hljs-selector-tag">href</span>="../<span class="hljs-selector-tag">css</span>/<span class="hljs-selector-tag">dialog</span><span class="hljs-selector-class">.css</span>" /&gt;</code></pre>
<p><strong>2、引入 JS 文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;../lib/zepto.min.js&quot;></script>
<script src=&quot;../js/dialog.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script src=<span class="hljs-string">"../lib/zepto.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script src=<span class="hljs-string">"../js/dialog.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p><strong>3、HTML 结构</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;btn-01&quot;>显示弹窗</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn-01"</span>&gt;</span>显示弹窗<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p><strong>4、实例化</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).on('click', '#btn-01', function() {
    var dialog1 = $(document).dialog({
        content: 'Dialog 移动端弹窗插件的自定义提示内容',
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-built_in">document</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-string">'#btn-01'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> dialog1 = $(<span class="hljs-built_in">document</span>).dialog({
        <span class="hljs-attr">content</span>: <span class="hljs-string">'Dialog 移动端弹窗插件的自定义提示内容'</span>,
    });
});</code></pre>
<h2 id="articleHeader5">参数</h2>
<table>
<thead><tr>
<th>参数</th>
            <th>默认值</th>
            <th>说明</th>
        </tr></thead>
<tbody>
<tr>
<td>type</td>
            <td>'alert'</td>
            <td>弹窗的类型。alert: 确定; confirm: 确定/取消; toast: 状态提示; notice: 提示信息</td>
        </tr>
<tr>
<td>style</td>
            <td>'default'</td>
            <td>alert 与 confirm 弹窗的风格。<br>default: 根据访问设备平台; ios: ios 风格; android: MD design 风格</td>
        </tr>
<tr>
<td>titleShow</td>
            <td>true</td>
            <td>是否显示标题</td>
        </tr>
<tr>
<td>titleText</td>
            <td>'提示'</td>
            <td>标题文字</td>
        </tr>
<tr>
<td>closeBtnShow</td>
            <td>false</td>
            <td>是否显示关闭按钮</td>
        </tr>
<tr>
<td>content</td>
            <td>''</td>
            <td>弹窗提示内容, 值可以是 HTML 内容</td>
        </tr>
<tr>
<td>contentScroll</td>
            <td>true</td>
            <td>alert 与 confirm 弹窗提示内容是否限制最大高度, 使其可以滚动</td>
        </tr>
<tr>
<td>dialogClass</td>
            <td>''</td>
            <td>弹窗自定义 class</td>
        </tr>
<tr>
<td>autoClose</td>
            <td>0</td>
            <td>弹窗自动关闭的延迟时间(毫秒)。<br>0: 不自动关闭; 大于0: 自动关闭弹窗的延迟时间</td>
        </tr>
<tr>
<td>overlayShow</td>
            <td>true</td>
            <td>是否显示遮罩层</td>
        </tr>
<tr>
<td>overlayClose</td>
            <td>false</td>
            <td>是否可以点击遮罩层关闭弹窗</td>
        </tr>
<tr>
<td>buttonStyle</td>
            <td>'side'</td>
            <td>按钮排版样式。side: 并排; stacked: 堆叠</td>
        </tr>
<tr>
<td>buttonTextConfirm</td>
            <td>'确定'</td>
            <td>确定按钮文字</td>
        </tr>
<tr>
<td>buttonTextCancel</td>
            <td>'取消'</td>
            <td>取消按钮文字</td>
        </tr>
<tr>
<td>buttonClassConfirm</td>
            <td>''</td>
            <td>确定按钮自定义 class</td>
        </tr>
<tr>
<td>buttonClassCancel</td>
            <td>''</td>
            <td>取消按钮自定义 class</td>
        </tr>
<tr>
<td>buttons</td>
            <td>[]</td>
            <td>confirm 弹窗自定义按钮组, 会覆盖"确定"与"取消"按钮; <br>单个 button 对象可设置 name [ 名称 ]、class [ 自定义class ]、callback [ 点击执行的函数 ]</td>
        </tr>
<tr>
<td>infoIcon</td>
            <td>''</td>
            <td>toast 与 notice 弹窗的提示图标, 值为图标的路径。不设置=不显示</td>
        </tr>
<tr>
<td>infoText</td>
            <td>''</td>
            <td>toast 与 notice 弹窗的提示文字, 会覆盖 content 的设置</td>
        </tr>
<tr>
<td>position</td>
            <td>'center'</td>
            <td>notice 弹窗的位置, center: 居中; bottom: 底部</td>
        </tr>
</tbody>
</table>
<h2 id="articleHeader6">回调函数</h2>
<table>
<thead><tr>
<th>函数</th>
            <th>默认值</th>
            <th>说明</th>
        </tr></thead>
<tbody>
<tr>
<td>onClickConfirmBtn</td>
            <td>function(){}</td>
            <td>点击“确定”按钮的回调函数</td>
        </tr>
<tr>
<td>onClickCancelBtn</td>
            <td>function(){}</td>
            <td>点击“取消”按钮的回调函数</td>
        </tr>
<tr>
<td>onClickCloseBtn</td>
            <td>function(){}</td>
            <td>点击“关闭”按钮的回调函数</td>
        </tr>
<tr>
<td>onBeforeShow</td>
            <td>function(){}</td>
            <td>弹窗显示前的回调函数</td>
        </tr>
<tr>
<td>onShow</td>
            <td>function(){}</td>
            <td>弹窗显示后的回调函数</td>
        </tr>
<tr>
<td>onBeforeClosed</td>
            <td>function(){}</td>
            <td>弹窗关闭前的回调函数</td>
        </tr>
<tr>
<td>onClosed</td>
            <td>function(){}</td>
            <td>弹窗关闭后的回调函数</td>
        </tr>
</tbody>
</table>
<h2 id="articleHeader7">方法</h2>
<table>
<thead><tr>
<th align="left">方法</th>
<th align="left">说明</th>
</tr></thead>
<tbody>
<tr>
<td align="left">obj.close</td>
<td align="left">关闭对话框。<br>用法：dialogObj.close()</td>
</tr>
<tr>
<td align="left">obj.update</td>
<td align="left">更改 toast 和 notice 类型弹窗内容 ( 图标以及提示文字 )<br>可传入参数：<br>content: 弹窗内容, 可以是HTML <br>                infoIcon: 弹窗提示图标<br>infoText: 弹窗提示文字<br>autoClose: 自动关闭的延迟时间<br>onBeforeClosed: 关闭前回调函数<br>onClosed: 关闭后回调函数</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader8">目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├─dist &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  # 项目发布资源目录, Grunt 生成
│  ├─css              # 项目 CSS 文件
│  ├─demos            # 项目示例页面
│  ├─images           # 项目 image 文件
│  ├─js               # 项目 JS 文件
│  │  ├─dialog.js     # 弹窗 JS
│  │  ├─dialog.min.js # 弹窗最小版本 JS
│  │  └─example.js    # 示例 JS
│  └─lib              # 公共 JS 文件
│
├─src                 # 实际进行开发的目录
│  ├─css              # 项目 CSS 文件, 由 Grunt 生成
│  ├─demos            # 项目示例页面
│  ├─images           # 项目 image 文件
│  ├─js               # 项目 JS 文件
│  │  ├─dialog.js     # 弹窗主要 JS
│  │  ├─example.js    # 示例 JS
│  │  ├─ripple.js     # 点击水波纹效果 JS
│  │  └─tapEvent.js   # 点击事件 JS
│  ├─lib              # 公共 JS 文件
│  ├─scss             # 项目相关 SCSS 文件
│  └─templates        # 初始静态 DMEO 资源目录
│
├─Gruntfile.js        # Grunt任务配置
├─_config.json        # Grunt配置所需信息
└─package.json        # 项目信息以及依赖" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>.
├─dist &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment"># 项目发布资源目录, Grunt 生成</span>
│  ├─css              <span class="hljs-comment"># 项目 CSS 文件</span>
│  ├─demos            <span class="hljs-comment"># 项目示例页面</span>
│  ├─images           <span class="hljs-comment"># 项目 image 文件</span>
│  ├─js               <span class="hljs-comment"># 项目 JS 文件</span>
│  │  ├─dialog.js     <span class="hljs-comment"># 弹窗 JS</span>
│  │  ├─dialog.min.js <span class="hljs-comment"># 弹窗最小版本 JS</span>
│  │  └─example.js    <span class="hljs-comment"># 示例 JS</span>
│  └─<span class="hljs-class"><span class="hljs-keyword">lib</span>              <span class="hljs-comment"># 公共 JS 文件</span></span>
│
├─src                 <span class="hljs-comment"># 实际进行开发的目录</span>
│  ├─css              <span class="hljs-comment"># 项目 CSS 文件, 由 Grunt 生成</span>
│  ├─demos            <span class="hljs-comment"># 项目示例页面</span>
│  ├─images           <span class="hljs-comment"># 项目 image 文件</span>
│  ├─js               <span class="hljs-comment"># 项目 JS 文件</span>
│  │  ├─dialog.js     <span class="hljs-comment"># 弹窗主要 JS</span>
│  │  ├─example.js    <span class="hljs-comment"># 示例 JS</span>
│  │  ├─ripple.js     <span class="hljs-comment"># 点击水波纹效果 JS</span>
│  │  └─tapEvent.js   <span class="hljs-comment"># 点击事件 JS</span>
│  ├─<span class="hljs-class"><span class="hljs-keyword">lib</span>              <span class="hljs-comment"># 公共 JS 文件</span></span>
│  ├─scss             <span class="hljs-comment"># 项目相关 SCSS 文件</span>
│  └─templates        <span class="hljs-comment"># 初始静态 DMEO 资源目录</span>
│
├─Gruntfile.js        <span class="hljs-comment"># Grunt任务配置</span>
├─_config.json        <span class="hljs-comment"># Grunt配置所需信息</span>
└─package.json        <span class="hljs-comment"># 项目信息以及依赖</span></code></pre>
<h2 id="articleHeader9">Grunt 使用方法</h2>
<p><strong>1、安装 Grunt</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span></code></pre>
<p><strong>2、在本地运行项目</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grunt serve" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">grunt serve</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端常用alert、confirm、toast等弹窗插件，兼容 jQuery/Zepto

## 原文链接
[https://segmentfault.com/a/1190000011979469](https://segmentfault.com/a/1190000011979469)


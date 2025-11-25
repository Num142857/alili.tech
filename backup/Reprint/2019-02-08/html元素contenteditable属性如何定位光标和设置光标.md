---
title: 'html元素contenteditable属性如何定位光标和设置光标' 
date: 2019-02-08 2:30:40
hidden: true
slug: xedwmtk09r
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在山寨一款网页微信的产品，对于div用contenteditable属性做的编辑框有不少心得，希望可以帮到入坑的同学。</p>
<p>废话不多说了，我们先来理解一下HTML的光标对象是如何工作的，后面我会贴完整的DEMO代码，不用急，先去理解，才能做出更加好的输入体验。</p>
<p>在HTML里面，光标是一个对象，光标对象是只有当你选中某个元素的时候才会出现的。</p>
<p>当我们去点击一个输入框的时候，实际上它会产生一个选中对象-selection（就是我们可以看到的文字变成蓝色的那个区域），selection在火狐浏览器可以直接用 window.getSelection()获取，在HTML里面，selection只有一个的，并且selection是一个区域，你可以想象成一个长方形，它是有开始和结束的</p>
<p>当你点击一个输入框，或者你切换到别的输入框，selection是会跟着变化的。光标就是在selection里面，光标叫做range，是一个片段区域，和selection一样，有开始点，和结束点，当我们对文字按下左键向右拉的时候，就看到了文字变成蓝色，那个就是光标的开始和结束，当我们直接点一下的时候，光标在闪，其实只是开始和结束点重叠了。</p>
<p>OK，现在我们来实际操作光标了。直接看完整的代码，然后看效果吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title></title>
    <style>#edit{height:500px;width:500px;border:1px solid red;}</style>
</head>
<body>
    <div id=&quot;edit&quot; contenteditable></div>
    <input type=&quot;text&quot; id=&quot;emojiInput&quot;>
    <button id=&quot;sendEmoji&quot;>发送表情</button>

    <script>
        var sendEmoji = document.getElementById('sendEmoji')

        // 定义最后光标对象
        var lastEditRange;

        // 编辑框点击事件
        document.getElementById('edit').onclick = function() {
            // 获取选定对象
            var selection = getSelection()
            // 设置最后光标对象
            lastEditRange = selection.getRangeAt(0)
        }

        // 编辑框按键弹起事件
        document.getElementById('edit').onkeyup = function() {
            // 获取选定对象
            var selection = getSelection()
            // 设置最后光标对象
            lastEditRange = selection.getRangeAt(0)
        }

        // 表情点击事件
        document.getElementById('sendEmoji').onclick = function() {
            // 获取编辑框对象
            var edit = document.getElementById('edit')
            // 获取输入框对象
            var emojiInput = document.getElementById('emojiInput')
            // 编辑框设置焦点
            edit.focus()
            // 获取选定对象
            var selection = getSelection()
            // 判断是否有最后光标对象存在
            if (lastEditRange) {
                // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
                selection.removeAllRanges()
                selection.addRange(lastEditRange)
            }
            // 判断选定对象范围是编辑框还是文本节点
            if (selection.anchorNode.nodeName != '#text') {
                // 如果是编辑框范围。则创建表情文本节点进行插入
                var emojiText = document.createTextNode(emojiInput.value)
                
                if (edit.childNodes.length > 0) {
                    // 如果文本框的子元素大于0，则表示有其他元素，则按照位置插入表情节点
                    for (var i = 0; i < edit.childNodes.length; i++) {
                        if (i == selection.anchorOffset) {
                            edit.insertBefore(emojiText, edit.childNodes[i])
                        }
                    }
                } else {
                    // 否则直接插入一个表情元素
                    edit.appendChild(emojiText)
                }
                // 创建新的光标对象
                var range = document.createRange()
                // 光标对象的范围界定为新建的表情节点
                range.selectNodeContents(emojiText)
                // 光标位置定位在表情节点的最大长度
                range.setStart(emojiText, emojiText.length)
                // 使光标开始和光标结束重叠
                range.collapse(true)
                // 清除选定对象的所有光标对象
                selection.removeAllRanges()
                // 插入新的光标对象
                selection.addRange(range)
            } else {
                // 如果是文本节点则先获取光标对象
                var range = selection.getRangeAt(0)
                // 获取光标对象的范围界定对象，一般就是textNode对象
                var textNode = range.startContainer;
                // 获取光标位置
                var rangeStartOffset = range.startOffset;
                // 文本节点在光标位置处插入新的表情内容
                textNode.insertData(rangeStartOffset, emojiInput.value)
                // 光标移动到到原来的位置加上新内容的长度
                range.setStart(textNode, rangeStartOffset + emojiInput.value.length)
                // 光标开始和光标结束重叠
                range.collapse(true)
                // 清除选定对象的所有光标对象
                selection.removeAllRanges()
                // 插入新的光标对象
                selection.addRange(range)
            }
            // 无论如何都要记录最后光标对象
            lastEditRange = selection.getRangeAt(0)
        }
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css"><span class="hljs-selector-id">#edit</span>{<span class="hljs-attribute">height</span>:<span class="hljs-number">500px</span>;<span class="hljs-attribute">width</span>:<span class="hljs-number">500px</span>;<span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid red;}</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"edit"</span> <span class="hljs-attr">contenteditable</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"emojiInput"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sendEmoji"</span>&gt;</span>发送表情<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> sendEmoji = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'sendEmoji'</span>)

        <span class="hljs-comment">// 定义最后光标对象</span>
        <span class="hljs-keyword">var</span> lastEditRange;

        <span class="hljs-comment">// 编辑框点击事件</span>
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'edit'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取选定对象</span>
            <span class="hljs-keyword">var</span> selection = getSelection()
            <span class="hljs-comment">// 设置最后光标对象</span>
            lastEditRange = selection.getRangeAt(<span class="hljs-number">0</span>)
        }

        <span class="hljs-comment">// 编辑框按键弹起事件</span>
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'edit'</span>).onkeyup = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取选定对象</span>
            <span class="hljs-keyword">var</span> selection = getSelection()
            <span class="hljs-comment">// 设置最后光标对象</span>
            lastEditRange = selection.getRangeAt(<span class="hljs-number">0</span>)
        }

        <span class="hljs-comment">// 表情点击事件</span>
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'sendEmoji'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取编辑框对象</span>
            <span class="hljs-keyword">var</span> edit = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'edit'</span>)
            <span class="hljs-comment">// 获取输入框对象</span>
            <span class="hljs-keyword">var</span> emojiInput = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'emojiInput'</span>)
            <span class="hljs-comment">// 编辑框设置焦点</span>
            edit.focus()
            <span class="hljs-comment">// 获取选定对象</span>
            <span class="hljs-keyword">var</span> selection = getSelection()
            <span class="hljs-comment">// 判断是否有最后光标对象存在</span>
            <span class="hljs-keyword">if</span> (lastEditRange) {
                <span class="hljs-comment">// 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态</span>
                selection.removeAllRanges()
                selection.addRange(lastEditRange)
            }
            <span class="hljs-comment">// 判断选定对象范围是编辑框还是文本节点</span>
            <span class="hljs-keyword">if</span> (selection.anchorNode.nodeName != <span class="hljs-string">'#text'</span>) {
                <span class="hljs-comment">// 如果是编辑框范围。则创建表情文本节点进行插入</span>
                <span class="hljs-keyword">var</span> emojiText = <span class="hljs-built_in">document</span>.createTextNode(emojiInput.value)
                
                <span class="hljs-keyword">if</span> (edit.childNodes.length &gt; <span class="hljs-number">0</span>) {
                    <span class="hljs-comment">// 如果文本框的子元素大于0，则表示有其他元素，则按照位置插入表情节点</span>
                    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; edit.childNodes.length; i++) {
                        <span class="hljs-keyword">if</span> (i == selection.anchorOffset) {
                            edit.insertBefore(emojiText, edit.childNodes[i])
                        }
                    }
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">// 否则直接插入一个表情元素</span>
                    edit.appendChild(emojiText)
                }
                <span class="hljs-comment">// 创建新的光标对象</span>
                <span class="hljs-keyword">var</span> range = <span class="hljs-built_in">document</span>.createRange()
                <span class="hljs-comment">// 光标对象的范围界定为新建的表情节点</span>
                range.selectNodeContents(emojiText)
                <span class="hljs-comment">// 光标位置定位在表情节点的最大长度</span>
                range.setStart(emojiText, emojiText.length)
                <span class="hljs-comment">// 使光标开始和光标结束重叠</span>
                range.collapse(<span class="hljs-literal">true</span>)
                <span class="hljs-comment">// 清除选定对象的所有光标对象</span>
                selection.removeAllRanges()
                <span class="hljs-comment">// 插入新的光标对象</span>
                selection.addRange(range)
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 如果是文本节点则先获取光标对象</span>
                <span class="hljs-keyword">var</span> range = selection.getRangeAt(<span class="hljs-number">0</span>)
                <span class="hljs-comment">// 获取光标对象的范围界定对象，一般就是textNode对象</span>
                <span class="hljs-keyword">var</span> textNode = range.startContainer;
                <span class="hljs-comment">// 获取光标位置</span>
                <span class="hljs-keyword">var</span> rangeStartOffset = range.startOffset;
                <span class="hljs-comment">// 文本节点在光标位置处插入新的表情内容</span>
                textNode.insertData(rangeStartOffset, emojiInput.value)
                <span class="hljs-comment">// 光标移动到到原来的位置加上新内容的长度</span>
                range.setStart(textNode, rangeStartOffset + emojiInput.value.length)
                <span class="hljs-comment">// 光标开始和光标结束重叠</span>
                range.collapse(<span class="hljs-literal">true</span>)
                <span class="hljs-comment">// 清除选定对象的所有光标对象</span>
                selection.removeAllRanges()
                <span class="hljs-comment">// 插入新的光标对象</span>
                selection.addRange(range)
            }
            <span class="hljs-comment">// 无论如何都要记录最后光标对象</span>
            lastEditRange = selection.getRangeAt(<span class="hljs-number">0</span>)
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
html元素contenteditable属性如何定位光标和设置光标

## 原文链接
[https://segmentfault.com/a/1190000005869372](https://segmentfault.com/a/1190000005869372)


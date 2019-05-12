---
title: 'web 前端 @ 功能 JS 实现分析及其原理' 
date: 2019-01-29 2:30:10
hidden: true
slug: 3xw5ad0tvku
categories: [reprint]
---

{{< raw >}}

                    
<p>最近为实现一个新功能弄的焦头烂额 <code>@xxx</code> 的实现，在实现后写下些心得，供以后会跳入这坑的同志们参考。</p>
<p>首先，当让是考虑使用范围，由于项目仅仅需要考虑在 <code>WEBKIT</code> 环境下使用，所以可以不用考虑 <code>IE</code> 这也使得代码少了很多的 <code>if(){}else{}</code> 判断。在<a href="https://developer.mozilla.org/zh-CN/" rel="nofollow noreferrer" target="_blank">Mozilla 开发者网络</a>上发现 <code>selection</code> 和 <code>range</code> 这两个关于选区对象和光标对象，结合 <a href="http://ichord.github.com/Caret.js/" rel="nofollow noreferrer" target="_blank">Caret</a>（一个用于判断当前光标位置的JS插件）后，一个大致的雏形就浮现出来。</p>
<p>大概就长这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007846798?w=227&amp;h=304" src="https://static.alili.tech/img/remote/1460000007846798?w=227&amp;h=304" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>先整理思路，捋一捋实现步骤。</p>
<p>大致思路如下：</p>
<ol>
<li>键入 <code>@</code> 后将选择框显示出来</li>
<li>将焦点定位在弹出框中的搜索框中</li>
<li>点击选择框中的选项时，返回输入框</li>
<li>输入框中显示 <code>@xxx</code>
</li>
<li>将光标定位在 <code>@xxx</code> 之后</li>
<li>删除 <code>@xxx</code> 时需要整个 <code>@xxx</code> 一起删除</li>
</ol>
<p>由于项目使用了 <code>angular</code> 来构建，所以给的 <code>demo</code> 也是用 <code>angular</code> 来搭建的，但是不论用什么框架，想法有了，那么一切就好办了。</p>
<p><code>selection</code> 和 <code>range</code> 对象的具体使用请参考 <code>MDN</code> 上的相关文章：</p>
<ol>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Selection" rel="nofollow noreferrer" target="_blank">selection</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Range/Range" rel="nofollow noreferrer" target="_blank">range</a></li>
<li><a href="http://acohome.cn/demo/@DEMO.html" rel="nofollow noreferrer" target="_blank">DEMO页</a></li>
</ol>
<p>主要涉及的几个方法：</p>
<ol>
<li>getSelection(window.getSelectio)：获取光标所在的区域（一个div或是一个textarea）；</li>
<li>selection.getRangeAt：获取光标所在区域中光标选区的信息；</li>
<li>range.setStart：设置光标选区的起始位置；</li>
<li>range.setEnd：设置光标选区的结束位置；</li>
<li>range.deleteContents：将光标选区选中的内容删除；</li>
<li>range.insertNode：在光标选区中添加内容；</li>
<li>selection.extend：将选区的焦点移动到一个特定的位置；</li>
<li>selection.collapseToEnd：将当前的选区折叠到最末尾的一个点。</li>
</ol>
<h2 id="articleHeader0">html 结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;demo-wrap&quot; ng-controller=&quot;Controller&quot;>

    <!-- 文本输入框 -->
    <div class=&quot;demo&quot; id=&quot;demo&quot; contenteditable=&quot;true&quot; ng-keydown=&quot;keyIn($event)&quot;></div>
    
    <!-- 带有输入框的选人框 -->
    <div class=&quot;select-person&quot; id=&quot;selectPerson&quot; ng-show=&quot;showSelect&quot; ng-style=&quot;sPersonPosi&quot;>
        <input type=&quot;text&quot; id=&quot;searchPersonInput&quot; ng-model=&quot;personSearchText&quot; ng-blur=&quot;missFocus()&quot;>
        <ul class=&quot;person-wrap&quot;>
            <li class=&quot;row&quot; ng-click=&quot;sPersonDone({fullName:'所有人'})&quot;>
                <div class=&quot;col-1&quot;>
                    <div class=&quot;img-wrap&quot;>
                        <portrait src=&quot;&quot; text=&quot;'所有'&quot;></portrait>
                    </div>
                </div>
                <div class=&quot;col-2&quot;>所有人</div>
            </li>
            <li class=&quot;row&quot; ng-click=&quot;sPersonDone(item)&quot; ng-repeat=&quot;item in atList | filter :{fullName: personSearchText}&quot;>
                <div class=&quot;col-1&quot;>
                    <div class=&quot;img-wrap&quot;>
                        <portrait src=&quot;item.img&quot; text=&quot;item.fullName.slice(-2)&quot;></portrait>
                    </div>
                </div>
                <div class=&quot;col-2&quot; ng-bind=&quot;item.fullName&quot;></div>
            </li>
        </ul>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demo-wrap"</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"Controller"</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- 文本输入框 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demo"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo"</span> <span class="hljs-attr">contenteditable</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">ng-keydown</span>=<span class="hljs-string">"keyIn($event)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
    <span class="hljs-comment">&lt;!-- 带有输入框的选人框 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"select-person"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"selectPerson"</span> <span class="hljs-attr">ng-show</span>=<span class="hljs-string">"showSelect"</span> <span class="hljs-attr">ng-style</span>=<span class="hljs-string">"sPersonPosi"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"searchPersonInput"</span> <span class="hljs-attr">ng-model</span>=<span class="hljs-string">"personSearchText"</span> <span class="hljs-attr">ng-blur</span>=<span class="hljs-string">"missFocus()"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"person-wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">ng-click</span>=<span class="hljs-string">"sPersonDone(</span></span></span><span class="hljs-template-variable">{fullName:'所有人'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">)"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-1"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-wrap"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">portrait</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"'所有'"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">portrait</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-2"</span>&gt;</span>所有人<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">ng-click</span>=<span class="hljs-string">"sPersonDone(item)"</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">"item in atList | filter :</span></span></span><span class="hljs-template-variable">{fullName: personSearchText}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-1"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-wrap"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">portrait</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"item.img"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"item.fullName.slice(-2)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">portrait</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-2"</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"item.fullName"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>样式相关的<code>CSS</code>代码就不放上来了，简要分析下页面结构，一个 <code>contenteditable="true"</code> 的输入框和一个 <code>id="selectPerson"</code> 的选人框。</p>
<ul>
<li>输入框使用 <code>contenteditable="true"</code> 主要是因为想在输入框中插入标签，将 <code>@xxx</code> 内容显示出不同的颜色（这就需要将 <code>@xxx</code> 放在一个标签中），绑定 <code>keyIn</code> 的键盘输入事件，用于检索用户输入 <code>@</code> 和 <code>backspace</code> ，并做出相应的动作；</li>
<li>选人框使用 <code>showSelect</code>  来控制是否显示，遍历显示需要显示的选人，以及使用 <code>input</code> 中的内容来过滤选人。</li>
</ul>
<h2 id="articleHeader1">实现 @ 选择</h2>
<p>相关代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$scope.keyIn = function(e) {
    var selection = getSelection();
    var ele = $('#demo');
    if (e.code == 'Digit2' &amp;&amp; e.shiftKey) {
        $scope.showSelect = true;
        var offset = ele.caret('offset');
        $scope.sPersonPosi = {
            left: offset.left - 10 + 'px',
            top: offset.top + 20 + 'px'
        };
        // 让选人框中的搜索框获取焦点
        $timeout(function(){
            $('#searchPersonInput')[0].focus();
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>$scope.keyIn = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
    <span class="hljs-keyword">var</span> selection = getSelection();
    <span class="hljs-keyword">var</span> ele = $(<span class="hljs-string">'#demo'</span>);
    <span class="hljs-keyword">if</span> (e.code == <span class="hljs-string">'Digit2'</span> &amp;&amp; e.shiftKey) {
        $scope.showSelect = <span class="hljs-keyword">true</span>;
        <span class="hljs-keyword">var</span> offset = ele.caret(<span class="hljs-string">'offset'</span>);
        $scope.sPersonPosi = {
            left: offset.left - <span class="hljs-number">10</span> + <span class="hljs-string">'px'</span>,
            top: offset.top + <span class="hljs-number">20</span> + <span class="hljs-string">'px'</span>
        };
        <span class="hljs-comment">// 让选人框中的搜索框获取焦点</span>
        $timeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            $(<span class="hljs-string">'#searchPersonInput'</span>)[<span class="hljs-number">0</span>].focus();
        })
    }
}</code></pre>
<p>实现起来挺简单，代码也不复杂，利用 <code>caret</code> 插件获取到光标位置，将选人框在 <code>@</code> 符号的下方显示出来，并同时实现了步骤中的第二步：将焦点放在搜索框中。</p>
<h2 id="articleHeader2">选人实现</h2>
<p>主要涉及步骤为：<code>3、4、5</code>。</p>
<p>当鼠标点击备选项时需要按顺序进行 <code>3、4、5</code> 步骤，所以需将 <code>3、4、5</code> 这 <code>3</code> 个步骤放在一起。<br>相关代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$scope.sPersonDone = function(person) {

    // 成功选人后，关闭选择框，让输入框获取焦点。
    $scope.showSelect = false;
    var ele = $('#demo')[0];
    ele.focus();

    // 获取之前保留先来的信息。
    // 需要修改 keyIn 的代码，保存选区以及光标信息，用于获取在光标焦点离开前，光标的位置
    var selection = lastSelection.selection;
    var range = lastSelection.range;
    var textNode = range.startContainer;

    // 删除 @ 符号。
    range.setStart(textNode, range.endOffset);
    range.setEnd(textNode, range.endOffset + 1);
    range.deleteContents();

    // 生成需要显示的内容，包括一个 span 和一个空格。
    var spanNode1 = document.createElement('span');
    var spanNode2 = document.createElement('span');
    spanNode1.className = 'at-text';
    spanNode1.innerHTML = '@' + person.fullName;
    spanNode2.innerHTML = '&amp;nbsp;';

    // 将生成内容打包放在 Fragment 中，并获取生成内容的最后一个节点，也就是空格。
    var frag = document.createDocumentFragment(),
        node, lastNode;
    frag.appendChild(spanNode1);
    while ((node = spanNode2.firstChild)) {
        lastNode = frag.appendChild(node);
    }

    // 将 Fragment 中的内容放入 range 中，并将光标放在空格之后。
    range.insertNode(frag);
    selection.extend(lastNode, 1);
    selection.collapseToEnd();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code>$scope.sPersonDone = function(person) {

    <span class="hljs-comment">// 成功选人后，关闭选择框，让输入框获取焦点。</span>
    $scope.showSelect = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">var</span> ele = $(<span class="hljs-string">'#demo'</span>)[<span class="hljs-number">0</span>];
    ele.focus();

    <span class="hljs-comment">// 获取之前保留先来的信息。</span>
    <span class="hljs-comment">// 需要修改 keyIn 的代码，保存选区以及光标信息，用于获取在光标焦点离开前，光标的位置</span>
    <span class="hljs-keyword">var</span> selection = lastSelection.selection;
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">range</span> = lastSelection.<span class="hljs-keyword">range</span>;
    <span class="hljs-keyword">var</span> textNode = <span class="hljs-keyword">range</span>.startContainer;

    <span class="hljs-comment">// 删除 @ 符号。</span>
    <span class="hljs-keyword">range</span>.setStart(textNode, <span class="hljs-keyword">range</span>.endOffset);
    <span class="hljs-keyword">range</span>.setEnd(textNode, <span class="hljs-keyword">range</span>.endOffset + <span class="hljs-number">1</span>);
    <span class="hljs-keyword">range</span>.deleteContents();

    <span class="hljs-comment">// 生成需要显示的内容，包括一个 span 和一个空格。</span>
    <span class="hljs-keyword">var</span> spanNode1 = document.createElement(<span class="hljs-string">'span'</span>);
    <span class="hljs-keyword">var</span> spanNode2 = document.createElement(<span class="hljs-string">'span'</span>);
    spanNode1.className = <span class="hljs-string">'at-text'</span>;
    spanNode1.innerHTML = <span class="hljs-string">'@'</span> + person.fullName;
    spanNode2.innerHTML = <span class="hljs-string">'&amp;nbsp;'</span>;

    <span class="hljs-comment">// 将生成内容打包放在 Fragment 中，并获取生成内容的最后一个节点，也就是空格。</span>
    <span class="hljs-keyword">var</span> frag = document.createDocumentFragment(),
        node, lastNode;
    frag.appendChild(spanNode1);
    while ((node = spanNode2.firstChild)) {
        lastNode = frag.appendChild(node);
    }

    <span class="hljs-comment">// 将 Fragment 中的内容放入 range 中，并将光标放在空格之后。</span>
    <span class="hljs-keyword">range</span>.insertNode(frag);
    selection.extend(lastNode, <span class="hljs-number">1</span>);
    selection.collapseToEnd();
};</code></pre>
<p>我们需要的效果是在 <code>@</code> 选人后，将整理好的 <code>@xxx</code> 包装成一个标签，放在原先 <code>@</code> 的位置，所以我们需要对原先的 <code>$scope.keyIn</code> 方法进行改造，保留原先的光标信息，方便在上面的方法中使用。</p>
<p>改造后的 <code>$scope.keyIn</code> 方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$scope.keyIn = function(e) {
    var selection = getSelection();
    var ele = $('#demo');
    if (e.code == 'Digit2' &amp;&amp; e.shiftKey) {
        $scope.showSelect = true;
        
        // 保存光标信息
        lastSelection = {
            range: selection.getRangeAt(0),
            offset: selection.focusOffset,
            selection: selection
        };
        $scope.showSelect = true;

        // 设置弹出框位置
        var offset = ele.caret('offset');
        $scope.sPersonPosi = {
            left: offset.left - 10 + 'px',
            top: offset.top + 20 + 'px'
        };
        $timeout(function(){
            $('#searchPersonInput')[0].focus();
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>$scope.keyIn = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
    <span class="hljs-keyword">var</span> selection = getSelection();
    <span class="hljs-keyword">var</span> ele = $(<span class="hljs-string">'#demo'</span>);
    <span class="hljs-keyword">if</span> (e.code == <span class="hljs-string">'Digit2'</span> &amp;&amp; e.shiftKey) {
        $scope.showSelect = <span class="hljs-keyword">true</span>;
        
        <span class="hljs-comment">// 保存光标信息</span>
        lastSelection = {
            range: selection.getRangeAt(<span class="hljs-number">0</span>),
            offset: selection.focusOffset,
            selection: selection
        };
        $scope.showSelect = <span class="hljs-keyword">true</span>;

        <span class="hljs-comment">// 设置弹出框位置</span>
        <span class="hljs-keyword">var</span> offset = ele.caret(<span class="hljs-string">'offset'</span>);
        $scope.sPersonPosi = {
            left: offset.left - <span class="hljs-number">10</span> + <span class="hljs-string">'px'</span>,
            top: offset.top + <span class="hljs-number">20</span> + <span class="hljs-string">'px'</span>
        };
        $timeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            $(<span class="hljs-string">'#searchPersonInput'</span>)[<span class="hljs-number">0</span>].focus();
        })
    }
}</code></pre>
<p>这里估计挺多人会有疑问，为啥要在生成的标签后面加一个空格，而且这个空格要通过  <code>&amp;nbsp;</code>  这样的方式实现。</p>
<p>首先，先解释第一个问题：为啥要在标签后加一个空格？</p>
<p>如果不加空格的话，之后在输入文字会添加在我们生成的标签中，也就是说如果不加空格来隔断我们生成的标签，我们在文本框里所做的操作就是在我们生成的标签中进行。而加了个空格就为了避免该问题的发生，使得文本编辑在正确的编辑框中进行。</p>
<p>第二个问题：为啥不能直接加空格 <code>' '</code> ，而是通过  <code>&amp;nbsp;</code> ，不得不说这是个过个悲伤的事实，还是碰到了兼容性的问题，在 <code>chrome</code> 下运行好好的代码，在 <code>node-webkit</code> 中就会各种报错。原因在不断的 <code>defug</code> 后发现了： <code>node-webkit</code> 中，将一个 <code>' '</code> 添加到 <code>contenteditable="true"</code> 的 <code>div</code> 中会没有啊，坑爹啊有木有！！！呈上之前的代码来祭奠下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var spanNode1 = document.createElement('span');
var node = document.createTextNode(' ');
spanNode1.className = 'at-text';
spanNode1.innerHTML = '@' + person.fullName;
var frag = document.createDocumentFragment();
frag.appendChild(spanNode1);
frag.appendChild(node);
range.insertNode(frag);
selection.extend(node, 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>var spanNode1 = document.createElement('span');
var <span class="hljs-keyword">node</span> <span class="hljs-title">= document</span>.createTextNode(' ');
spanNode1.className = 'at-text';
spanNode1.innerHTML = '@' + person.fullName;
var frag = document.createDocumentFragment();
frag.appendChild(spanNode1);
frag.appendChild(<span class="hljs-keyword">node</span><span class="hljs-title">);
range</span>.insertNode(frag);
selection.extend(<span class="hljs-keyword">node</span><span class="hljs-title">, 1</span>);</code></pre>
<p>结果一上 <code>node-webkit</code> 环境各种报错。真是坑了个大爹。原因是光标定位不准，指定位置超出实际位置，但是 <code>node-webkit</code> 环境确实是可以输入空格的，一看原来是 <code>&amp;nbsp;</code> 而 <code>&amp;nbsp;</code> 不能通过 <code>createTextNode</code> 来创建，所以就有了之前的哪个曲线救国的策略了。</p>
<h2 id="articleHeader3">删除实现</h2>
<p>终于捋到最后一个步骤了，删除时，需要将一整个标签一起删除。由于需要监听键盘的输入，所以就可与之前 <code>keyIn</code> 的代码写在一起。</p>
<p>最终的 <code>keyIn</code> 代码为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$scope.keyIn = function(e) {
    var selection = getSelection();
    var ele = document.getElementById('demo');
    if (e.code == 'Digit2' &amp;&amp; e.shiftKey) {

        // 保存光标信息
        lastSelection = {
            range: selection.getRangeAt(0),
            offset: selection.focusOffset,
            selection: selection
        };
        $scope.showSelect = true;

        // 设置弹出框位置
        var offset = $(ele).caret('offset');
        $scope.sPersonPosi = {
            left: offset.left + 'px',
            top: offset.top + 30 + 'px'
        };
        $timeout(function(){
            $('#searchPersonInput')[0].focus();
        })

    } else if (e.code == 'Backspace') {

        // 删除逻辑 
        // 1 ：由于在创建时默认会在 @xxx 后添加一个空格，
        // 所以当得知光标位于 @xxx 之后的一个第一个字符后并按下删除按钮时，
        // 应该将光标前的 @xxx 给删除
        // 2 ：当光标位于 @xxx 中间时，按下删除按钮时应该将整个 @xxx 给删除。

        var range = selection.getRangeAt(0);
        var removeNode = null;
        if (range.startOffset <= 1 &amp;&amp; range.startContainer.parentElement.className != &quot;at-text&quot;)
            removeNode = range.startContainer.previousElementSibling;
        if (range.startContainer.parentElement.className == &quot;at-text&quot;)
            removeNode = range.startContainer.parentElement;
        if (removeNode)
            ele.removeChild(removeNode);

    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>$scope.keyIn = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
    <span class="hljs-keyword">var</span> selection = getSelection();
    <span class="hljs-keyword">var</span> ele = document.getElementById(<span class="hljs-string">'demo'</span>);
    <span class="hljs-keyword">if</span> (e.code == <span class="hljs-string">'Digit2'</span> &amp;&amp; e.shiftKey) {

        <span class="hljs-comment">// 保存光标信息</span>
        lastSelection = {
            range: selection.getRangeAt(<span class="hljs-number">0</span>),
            offset: selection.focusOffset,
            selection: selection
        };
        $scope.showSelect = <span class="hljs-keyword">true</span>;

        <span class="hljs-comment">// 设置弹出框位置</span>
        <span class="hljs-keyword">var</span> offset = $(ele).caret(<span class="hljs-string">'offset'</span>);
        $scope.sPersonPosi = {
            left: offset.left + <span class="hljs-string">'px'</span>,
            top: offset.top + <span class="hljs-number">30</span> + <span class="hljs-string">'px'</span>
        };
        $timeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            $(<span class="hljs-string">'#searchPersonInput'</span>)[<span class="hljs-number">0</span>].focus();
        })

    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (e.code == <span class="hljs-string">'Backspace'</span>) {

        <span class="hljs-comment">// 删除逻辑 </span>
        <span class="hljs-comment">// 1 ：由于在创建时默认会在 @xxx 后添加一个空格，</span>
        <span class="hljs-comment">// 所以当得知光标位于 @xxx 之后的一个第一个字符后并按下删除按钮时，</span>
        <span class="hljs-comment">// 应该将光标前的 @xxx 给删除</span>
        <span class="hljs-comment">// 2 ：当光标位于 @xxx 中间时，按下删除按钮时应该将整个 @xxx 给删除。</span>

        <span class="hljs-keyword">var</span> range = selection.getRangeAt(<span class="hljs-number">0</span>);
        <span class="hljs-keyword">var</span> removeNode = <span class="hljs-keyword">null</span>;
        <span class="hljs-keyword">if</span> (range.startOffset &lt;= <span class="hljs-number">1</span> &amp;&amp; range.startContainer.parentElement.className != <span class="hljs-string">"at-text"</span>)
            removeNode = range.startContainer.previousElementSibling;
        <span class="hljs-keyword">if</span> (range.startContainer.parentElement.className == <span class="hljs-string">"at-text"</span>)
            removeNode = range.startContainer.parentElement;
        <span class="hljs-keyword">if</span> (removeNode)
            ele.removeChild(removeNode);

    }
};</code></pre>
<p>代码的逻辑都写在注释里了，这里就不多说了。</p>
<p>这样就完成 <code>@</code> 这一功能了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
web 前端 @ 功能 JS 实现分析及其原理

## 原文链接
[https://segmentfault.com/a/1190000007846897](https://segmentfault.com/a/1190000007846897)


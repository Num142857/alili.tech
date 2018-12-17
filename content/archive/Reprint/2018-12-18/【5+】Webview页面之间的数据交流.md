---
title: '【5+】Webview页面之间的数据交流' 
date: 2018-12-18 2:30:11
hidden: true
slug: armn7o75afa
categories: [reprint]
---

{{< raw >}}

                    
<p>一个App，其中大部分是要对页面之间的数据进行交互。<br><span class="img-wrap"><img data-src="/img/bVZA6P?w=54&amp;h=51" src="https://static.alili.tech/img/bVZA6P?w=54&amp;h=51" alt="1DBFB83E6BDA9816D35E4796DE55BB0B" title="1DBFB83E6BDA9816D35E4796DE55BB0B" style="cursor: pointer; display: inline;"></span></p>
<p>碧如：A打开B页面，B页面执行一些代码，再通知回A页面。</p>
<p>这可能是h5+er们遇到最常见的一个场景了。</p>
<p>ok，我们将问题实例化：</p>
<p>A页面有个选择地区的按钮，需要打开B页面选择一个地区，然后获取到选取结果返回给A页面并展示。</p>
<p>我们看看用mui.fire怎么来实现这个功能</p>
<p><span class="img-wrap"><img data-src="/img/bV1H0X?w=105&amp;h=110" src="https://static.alili.tech/img/bV1H0X?w=105&amp;h=110" alt="e9fbd9d5a31f5e16" title="e9fbd9d5a31f5e16" style="cursor: pointer; display: inline;"></span></p>
<p>A页面</p>
<p><span class="img-wrap"><img data-src="/img/bV1HYx?w=348&amp;h=245" src="https://static.alili.tech/img/bV1HYx?w=348&amp;h=245" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        <header class=&quot;mui-bar mui-bar-nav&quot;>
            <h1 class=&quot;mui-title&quot;>A</h1>
        </header>
        <div class=&quot;mui-content&quot;>
            <input type=&quot;text&quot; readonly placeholder=&quot;未选择&quot;>
            <button type=&quot;button&quot; class=&quot;mui-btn mui-btn-blue&quot;>选取地区</button>
        </div>
        
        <script src=&quot;js/mui.min.js&quot;></script>
        <script type=&quot;text/javascript&quot;>
            mui.init();
            // 自定义监听select事件
            document.addEventListener('select', function(e){
                var text = e.detail.text;
                document.querySelector(&quot;input&quot;).value = text;
            });
            // 按钮点击事件
            document.querySelector(&quot;.mui-btn-blue&quot;).addEventListener('tap', function(){
                // 打开B页面，选取一个结果
                mui.openWindow('B.html');
            });
        </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>        <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-bar mui-bar-nav"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-title"</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">readonly</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"未选择"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-btn mui-btn-blue"</span>&gt;</span>选取地区<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/mui.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
            mui.init();
            <span class="hljs-comment">// 自定义监听select事件</span>
            <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'select'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
                <span class="hljs-keyword">var</span> text = e.detail.text;
                <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"input"</span>).value = text;
            });
            <span class="hljs-comment">// 按钮点击事件</span>
            <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".mui-btn-blue"</span>).addEventListener(<span class="hljs-string">'tap'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-comment">// 打开B页面，选取一个结果</span>
                mui.openWindow(<span class="hljs-string">'B.html'</span>);
            });
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>B页面</p>
<p><span class="img-wrap"><img data-src="/img/bV1HYM?w=346&amp;h=229" src="https://static.alili.tech/img/bV1HYM?w=346&amp;h=229" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        <header class=&quot;mui-bar mui-bar-nav&quot;>
            <a class=&quot;mui-action-back mui-icon mui-icon-left-nav mui-pull-left&quot;></a>
            <h1 class=&quot;mui-title&quot;>B</h1>
        </header>
        <div class=&quot;mui-content&quot;>
            <ul class=&quot;mui-table-view&quot;>
                <li class=&quot;mui-table-view-cell&quot;>
                    <a class=&quot;mui-navigate-right&quot;>
                        上海
                    </a>
                </li>
                <li class=&quot;mui-table-view-cell&quot;>
                    <a class=&quot;mui-navigate-right&quot;>
                        深圳
                    </a>
                </li>
                <li class=&quot;mui-table-view-cell&quot;>
                    <a class=&quot;mui-navigate-right&quot;>
                        北京
                    </a>
                </li>
            </ul>
        </div>

        <script src=&quot;js/mui.min.js&quot;></script>
        <script type=&quot;text/javascript&quot;>
            mui.init();
            mui('ul').on('tap', 'li', function() {
                // 获取当前选择的内容
                var text = this.innerText;
                // 通知上个页面
                var w = plus.webview.currentWebview();
                var opener = w.opener();
                mui.fire(opener, &quot;select&quot;,{
                    text: text
                });
                // 关闭本页面
                w.close();
            });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>        <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-bar mui-bar-nav"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-action-back mui-icon mui-icon-left-nav mui-pull-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-title"</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-table-view"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-table-view-cell"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-navigate-right"</span>&gt;</span>
                        上海
                    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-table-view-cell"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-navigate-right"</span>&gt;</span>
                        深圳
                    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-table-view-cell"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-navigate-right"</span>&gt;</span>
                        北京
                    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/mui.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
            mui.init();
            mui(<span class="hljs-string">'ul'</span>).on(<span class="hljs-string">'tap'</span>, <span class="hljs-string">'li'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
                <span class="hljs-comment">// 获取当前选择的内容</span>
                <span class="hljs-keyword">var</span> text = <span class="hljs-keyword">this</span>.innerText;
                <span class="hljs-comment">// 通知上个页面</span>
                <span class="hljs-keyword">var</span> w = plus.webview.currentWebview();
                <span class="hljs-keyword">var</span> opener = w.opener();
                mui.fire(opener, <span class="hljs-string">"select"</span>,{
                    text: text
                });
                <span class="hljs-comment">// 关闭本页面</span>
                w.close();
            });</span></code></pre>
<p>真机调试一下，o98k。</p>
<p><span class="img-wrap"><img data-src="/img/bV1H17?w=527&amp;h=468" src="https://static.alili.tech/img/bV1H17?w=527&amp;h=468" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>但是！我个人还是建议脱离mui.js来实现这个功能</p>
<p><span class="img-wrap"><img data-src="/img/bV1H3L?w=109&amp;h=108" src="https://static.alili.tech/img/bV1H3L?w=109&amp;h=108" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可以借用咱们之前文章里面的讲过的，利用webview对象的evalJS方法</p>
<p><a href="https://segmentfault.com/a/1190000008844889">【5+】跨webview多页面 触发事件（一）</a><br>【5+】跨webview多页面 触发事件（一）</p>
<p>感觉用Broadcast.js有点小题大做</p>
<p><span class="img-wrap"><img data-src="/img/bV1If1?w=109&amp;h=72" src="https://static.alili.tech/img/bV1If1?w=109&amp;h=72" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>那咱们就写一个类似Android中的onActivityResult和setResult方法</p>
<p>新建一个app.js，作为一个自己的插件，里面实现两个方法 onActivityResult 和 setResult</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
(function(app){
    
    /**
     * 打开一个页面
     * @param {String} url 页面路径
     * @param {String} id 页面id
     * @param {Object} ex 参数
     * @param {Function} callback 
     */
    app.onActivityResult = function(url, id, ex, callback){
        
    };
    
    /**
     * 返回创建者页面数据
     * @param {Object} data 需要返回的数据
     * @return {Webview} w 当前webview
     */
    app.setResult = function(data){
        
    };
    
    
}(window.app || (window.app = {})));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>
(<span class="hljs-name">function</span>(<span class="hljs-name">app</span>){
    
    /**
     * 打开一个页面
     * @param {String} url 页面路径
     * @param {String} id 页面id
     * @param {Object} ex 参数
     * @param {Function} callback 
     */
    app.onActivityResult = function(<span class="hljs-name">url</span>, id, ex, callback){
        
    }<span class="hljs-comment">;</span>
    
    /**
     * 返回创建者页面数据
     * @param {Object} data 需要返回的数据
     * @return {Webview} w 当前webview
     */
    app.setResult = function(<span class="hljs-name">data</span>){
        
    }<span class="hljs-comment">;</span>
    
    
}(<span class="hljs-name">window.app</span> || (<span class="hljs-name">window.app</span> = {})))<span class="hljs-comment">;</span>
</code></pre>
<p>我们一步步来，先看看setResult如何触发上个页面的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    /**
     * 返回创建者页面数据
     * @param {Object} data 需要返回的数据
     * @return {Webview} w 当前webview
     */
    app.setResult = function(data){
        // 获取当前webview
        var indexW = plus.webview.currentWebview();
        // 获取创建者的webview
        var opener = indexW.opener();
        // 执行js字符串
        opener.evalJS();// ??????
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>    <span class="hljs-comment">/**
     * 返回创建者页面数据
     * <span class="hljs-doctag">@param</span> {Object} data 需要返回的数据
     * <span class="hljs-doctag">@return</span> {Webview} w 当前webview
     */</span>
    app.setResult = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
        <span class="hljs-comment">// 获取当前webview</span>
        <span class="hljs-keyword">var</span> indexW = plus.webview.currentWebview();
        <span class="hljs-comment">// 获取创建者的webview</span>
        <span class="hljs-keyword">var</span> opener = indexW.opener();
        <span class="hljs-comment">// 执行js字符串</span>
        opener.evalJS();<span class="hljs-comment">// ??????</span>
    };</code></pre>
<p>卧槽，那么，问题来了，evalJS该执行什么呢？ </p>
<p>如果我在A页面的window对象下定一个函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.test = function(data){
    alert(JSON.stringify(data));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.test = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    alert(<span class="hljs-built_in">JSON</span>.stringify(data));
}</code></pre>
<p>那么，我们在evalJS里面就该这么写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        // 执行js字符串
        var jsstr = &quot;window.test &amp;&amp; window.test(&quot; + JSON.stringify(data) + &quot;)&quot;;
        opener.evalJS(jsstr); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-comment">// 执行js字符串</span>
        <span class="hljs-keyword">var</span> jsstr = <span class="hljs-string">"window.test &amp;&amp; window.test("</span> + <span class="hljs-built_in">JSON</span>.stringify(data) + <span class="hljs-string">")"</span>;
        opener.evalJS(jsstr); </code></pre>
<p>好吧，考虑到一个页面可能通过这个方式打开多个页面，那么我们这个test函数就得改一个不重复唯一的名称，并且定义放到onActivityResult方法里面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var _id = 0,
        _tempName = '',
        ow,cw;

        /**
         * 打开一个页面
         * @param {String} url 页面路径
         * @param {String} id 页面id
         * @param {Object} ex 参数
         * @param {Function} callback 
         */
        app.onActivityResult = function(url, id, ex, callback) {
            
            // 生成唯一回调函数名称
            _tempName = 'APP_RESULT_FUN_' + _id++;
            // 定义函数
            window[_tempName] = function(data){
                // 执行自定义回调
                callback(data);
            };
            // 传递函数名称到目标页面
            ex.callbackName = _tempName;
            
            // 显示菊花
            cw = plus.nativeUI.showWaiting();
            
            // 创建目标页面 
            ow = plus.webview.create(url, id, {
                render: &quot;always&quot;
            }, ex);
            // title更新时显示 页面
            ow.addEventListener('titleUpdate', function(){
                // 关闭菊花
                cw &amp;&amp; (cw.close(),cw = null);
                // 显示页面
                ow.show('pop-in');
            });
            // 页面关闭时，注销window下此次事件
            ow.addEventListener('close', function(){
                  setTimeout(function(){
                      window[_tempName] = null;
                  });
            });
            
        };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>    <span class="hljs-keyword">var</span> _id = <span class="hljs-number">0</span>,
        _tempName = <span class="hljs-string">''</span>,
        ow,cw;

        <span class="hljs-comment">/**
         * 打开一个页面
         * <span class="hljs-doctag">@param</span> {String} url 页面路径
         * <span class="hljs-doctag">@param</span> {String} id 页面id
         * <span class="hljs-doctag">@param</span> {Object} ex 参数
         * <span class="hljs-doctag">@param</span> {Function} callback 
         */</span>
        app.onActivityResult = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(url, id, ex, callback)</span> </span>{
            
            <span class="hljs-comment">// 生成唯一回调函数名称</span>
            _tempName = <span class="hljs-string">'APP_RESULT_FUN_'</span> + _id++;
            <span class="hljs-comment">// 定义函数</span>
            window[_tempName] = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
                <span class="hljs-comment">// 执行自定义回调</span>
                callback(data);
            };
            <span class="hljs-comment">// 传递函数名称到目标页面</span>
            ex.callbackName = _tempName;
            
            <span class="hljs-comment">// 显示菊花</span>
            cw = plus.nativeUI.showWaiting();
            
            <span class="hljs-comment">// 创建目标页面 </span>
            ow = plus.webview.create(url, id, {
                render: <span class="hljs-string">"always"</span>
            }, ex);
            <span class="hljs-comment">// title更新时显示 页面</span>
            ow.addEventListener(<span class="hljs-string">'titleUpdate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-comment">// 关闭菊花</span>
                cw &amp;&amp; (cw.close(),cw = <span class="hljs-keyword">null</span>);
                <span class="hljs-comment">// 显示页面</span>
                ow.show(<span class="hljs-string">'pop-in'</span>);
            });
            <span class="hljs-comment">// 页面关闭时，注销window下此次事件</span>
            ow.addEventListener(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                      window[_tempName] = <span class="hljs-keyword">null</span>;
                  });
            });
            
        };</code></pre>
<p>生成特殊一个函数，并把函数名通过extras的方式传参到目标页面，<br>相应的，setResult方法也需要少许更改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    /**
     * 返回创建者页面数据
     * @param {Object} data 需要返回的数据
     * @return {Webview} w 当前webview
     */
    app.setResult = function(data) {
        // 获取当前webview
        var indexW = plus.webview.currentWebview();
        // js字符串
        var jsstr = &quot;&quot;;
        // 如果存在自定义回调函数名
        if(indexW.callbackName){
            // 拼接js字符串
            jsstr = &quot;window.&quot; + indexW.callbackName;
            jsstr = jsstr + &quot;&amp;&amp;&quot; + jsstr + &quot;(&quot; + JSON.stringify(data) + &quot;)&quot;;
            // 执行
            indexW.opener().evalJS(jsstr);
        }
        // 返回当前页面
        return indexW;
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>    <span class="hljs-comment">/**
     * 返回创建者页面数据
     * <span class="hljs-doctag">@param</span> {Object} data 需要返回的数据
     * <span class="hljs-doctag">@return</span> {Webview} w 当前webview
     */</span>
    app.setResult = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span> </span>{
        <span class="hljs-comment">// 获取当前webview</span>
        <span class="hljs-keyword">var</span> indexW = plus.webview.currentWebview();
        <span class="hljs-comment">// js字符串</span>
        <span class="hljs-keyword">var</span> jsstr = <span class="hljs-string">""</span>;
        <span class="hljs-comment">// 如果存在自定义回调函数名</span>
        <span class="hljs-keyword">if</span>(indexW.callbackName){
            <span class="hljs-comment">// 拼接js字符串</span>
            jsstr = <span class="hljs-string">"window."</span> + indexW.callbackName;
            jsstr = jsstr + <span class="hljs-string">"&amp;&amp;"</span> + jsstr + <span class="hljs-string">"("</span> + JSON.stringify(data) + <span class="hljs-string">")"</span>;
            <span class="hljs-comment">// 执行</span>
            indexW.opener().evalJS(jsstr);
        }
        <span class="hljs-comment">// 返回当前页面</span>
        <span class="hljs-keyword">return</span> indexW;
    };</code></pre>
<p>试试引用后在AB页面测试一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            // A页面 按钮点击事件
            document.querySelector(&quot;.mui-btn-blue&quot;).addEventListener('tap', function(){
                // 打开B页面，选取一个结果
                app.onActivityResult('B.html', 'B', {}, function(data){
                    // 修改内容
                    document.querySelector(&quot;input&quot;).value = data.text;
                });
            });
            
            // B页面 选项点击事件
            mui('ul').on('tap', 'li', function() {
                // 获取当前选择的内容
                var text = this.innerText;
                // 通知上个页面 并关闭本页面
                app.setResult({
                    text: text
                }).close();
            });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>            <span class="hljs-comment">// A页面 按钮点击事件</span>
            <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".mui-btn-blue"</span>).addEventListener(<span class="hljs-string">'tap'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-comment">// 打开B页面，选取一个结果</span>
                app.onActivityResult(<span class="hljs-string">'B.html'</span>, <span class="hljs-string">'B'</span>, {}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                    <span class="hljs-comment">// 修改内容</span>
                    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"input"</span>).value = data.text;
                });
            });
            
            <span class="hljs-comment">// B页面 选项点击事件</span>
            mui(<span class="hljs-string">'ul'</span>).on(<span class="hljs-string">'tap'</span>, <span class="hljs-string">'li'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// 获取当前选择的内容</span>
                <span class="hljs-keyword">var</span> text = <span class="hljs-keyword">this</span>.innerText;
                <span class="hljs-comment">// 通知上个页面 并关闭本页面</span>
                app.setResult({
                    <span class="hljs-attr">text</span>: text
                }).close();
            });</code></pre>
<p>卧槽666。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Man{
    constructor(){
        this.name = 'newsning'
    }
    say(){
        console.log('天行健, 君子以自强不息. ')
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Man</span></span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'newsning'</span>
    }
    say(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'天行健, 君子以自强不息. '</span>)
    }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【5+】Webview页面之间的数据交流

## 原文链接
[https://segmentfault.com/a/1190000012762453](https://segmentfault.com/a/1190000012762453)


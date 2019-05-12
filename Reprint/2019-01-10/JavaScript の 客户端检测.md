---
title: 'JavaScript の 客户端检测' 
date: 2019-01-10 2:30:08
hidden: true
slug: qbpitlpckcj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">[博文]模块增强模式进行客户端检测</h1>
<p>标签： 博文</p>
<p>常用的检测方式为:</p>
<ul>
<li>[ ]  1 . 能力检测</li>
<li>[ ]  2 . 用户代理检测</li>
</ul>
<p>这里有 2 用户代理检测</p>
<blockquote><p>检测插件 P211</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="非IE浏览器: 
navigator.plugins是一个包含浏览器插件的数组, 这个数组的每一项都包含:
    name : 插件的名字.
    description: 插件的描述
    filename: 插件的文件名
    length: 插件所处理的MIME类型数量

        // 检测插件(在IE中无效):
        function hasPlugin(name){
            name = name.toLowerCase(); //toLowerCase() 方法用于把字符串转换为小写
            for(var i=0;i<navigator.plugins.length; i++){
                if(navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){ // >-1表示找到
                    return true
                }
            }
            return false;
        };
            
        // 检测Flash
        alert(hasPlugin(&quot;Flash&quot;));
        
        // 检测QuickTime
        alert(hasPlugin(&quot;QuickTime&quot;));
            

IE浏览器
        // 检测IE的插件
        //  ========== 
        //  = IE以COM对象的方式实现插件,而COM对象使用唯一标示符来标识,因此要检测插件必须知道其 = 
        //  = COM标识符,例如,Flash的标识符是ShockwaveFlash.ShockwaveFlash = 
        //  ========== 
        function hasIEPlugin(name){
            try{
                new ActiveXOBject(name);
                return true;
            }catch(e){
                return false;
                //TODO handle the exception
            }
        };
        
        // IE中检测Flash
        alert(hasIEPlugin(&quot;ShockwaveFlash.ShockwaveFlash&quot;));


在所有浏览器中检测
        // 结合之前的2个检测函数,检测所有的浏览器中的FLash
        function hasFLash(){
            var result = hasPlugin(&quot;Flash&quot;);
            if(!result){
                result.hasIEPlugin(&quot;ShockwaveFlash.ShockwaveFlash&quot;);
            }
            return result; // true or false
        };
        
        function hasQuickTime(){
            var result = hasPlugin(&quot;QuickTime&quot;);
            if (!result) {
                result = hasIEPlugin(&quot;QuickTime.Quicktime&quot;);
            } 
            return result;
        };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>非IE浏览器: 
navigator.plugins是一个包含浏览器插件的数组, 这个数组的每一项都包含:
    name : 插件的名字.
    description: 插件的描述
    filename: 插件的文件名
    length: 插件所处理的MIME类型数量

        <span class="hljs-comment">// 检测插件(在IE中无效):</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasPlugin</span><span class="hljs-params">(name)</span></span>{
            name = name.toLowerCase(); <span class="hljs-comment">//toLowerCase() 方法用于把字符串转换为小写</span>
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;navigator.plugins.length; i++){
                <span class="hljs-keyword">if</span>(navigator.plugins[i].name.toLowerCase().indexOf(name)&gt;<span class="hljs-number">-1</span>){ <span class="hljs-comment">// &gt;-1表示找到</span>
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
                }
            }
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        };
            
        <span class="hljs-comment">// 检测Flash</span>
        alert(hasPlugin(<span class="hljs-string">"Flash"</span>));
        
        <span class="hljs-comment">// 检测QuickTime</span>
        alert(hasPlugin(<span class="hljs-string">"QuickTime"</span>));
            

IE浏览器
        <span class="hljs-comment">// 检测IE的插件</span>
        <span class="hljs-comment">//  ========== </span>
        <span class="hljs-comment">//  = IE以COM对象的方式实现插件,而COM对象使用唯一标示符来标识,因此要检测插件必须知道其 = </span>
        <span class="hljs-comment">//  = COM标识符,例如,Flash的标识符是ShockwaveFlash.ShockwaveFlash = </span>
        <span class="hljs-comment">//  ========== </span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasIEPlugin</span><span class="hljs-params">(name)</span></span>{
            <span class="hljs-keyword">try</span>{
                <span class="hljs-keyword">new</span> ActiveXOBject(name);
                <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
            }<span class="hljs-keyword">catch</span>(e){
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                <span class="hljs-comment">//TODO handle the exception</span>
            }
        };
        
        <span class="hljs-comment">// IE中检测Flash</span>
        alert(hasIEPlugin(<span class="hljs-string">"ShockwaveFlash.ShockwaveFlash"</span>));


在所有浏览器中检测
        <span class="hljs-comment">// 结合之前的2个检测函数,检测所有的浏览器中的FLash</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasFLash</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">var</span> result = hasPlugin(<span class="hljs-string">"Flash"</span>);
            <span class="hljs-keyword">if</span>(!result){
                result.hasIEPlugin(<span class="hljs-string">"ShockwaveFlash.ShockwaveFlash"</span>);
            }
            <span class="hljs-keyword">return</span> result; <span class="hljs-comment">// true or false</span>
        };
        
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasQuickTime</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">var</span> result = hasPlugin(<span class="hljs-string">"QuickTime"</span>);
            <span class="hljs-keyword">if</span> (!result) {
                result = hasIEPlugin(<span class="hljs-string">"QuickTime.Quicktime"</span>);
            } 
            <span class="hljs-keyword">return</span> result;
        };
</code></pre>
<blockquote><p>检测浏览器引擎 :</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
            var client = function (){
                var engine = {
                    // 呈现引擎
                    ie:0, // IE浏览器内核
                    gecko:0, // Firefox浏览器内核    
                    webkit:0, // google->chrome和apple->safari内核
                    khtml:0, // Konqueror(linux平台中的一个浏览器)的内核->KHTML
                    opera:0, // Opera
                    
                    // 具体的版本号
                    ver : null
                };
                
                // 检测呈现引擎, 平台, 设备
                return {
                    engine : engine
                };
            }();
            
            
            //  ====================== 
            //  = 检测客户端=>识别呈现引擎 = 
            //  ======================
            var ua = navigator.userAgent;
            console.log(ua);
            //  = 第一步先检测Opera = 
            if(window.opera){ // 如果是Opera浏览器, 则获得浏览器版本
                client.ver = window.opera.version(); // window.opera在Opera 5.0及更高版本中存在,在Opera 7.6及更高版本中,调用version()方法可以放回一个表示浏览器版本的字符串
                client.opera = parseFloat(client.ver);
            }else if(/AppleWebKit\/(\S+)/.test(ua)){
                //  = 第二步检测Webkit = 
                // webkit的用户代理字符串中的&quot;AppleWebkit&quot;是独一无二的, 所以检测这个字符串
                // \S : 表示非空格的特殊字符
                client.ver = RegExp[&quot;$1&quot;];
                client.webkit = parseFloat(client.ver);
            }else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
                //  = 第三步检测KHTML = 
                // 在Konqueror 3.1及更早版本中不包括KHTML的版本, 故而使用Konqueror的版本来代替
                client.ver = RegExp[&quot;$1&quot;];
                client.khtml = parseFloat(client.ver)                
            }else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
                //  = 第四步检测Gecko = 
                // &quot;Gecko&quot; 会出现在字符串&quot;rv:&quot;之后 ;字符串&quot;rv:&quot;在前面;
                client.ver = RegExp[&quot;$1&quot;];
                client.khtml = parseFloat(client.ver)
            }else if(/MSIE ([^;]+)/.test(ua)){
                //  = 第五步检测IE = 
                client.ver = RegExp[&quot;$1&quot;];
                client.ie = parseFloat(client.ver)
            }
            
            
            // 执行代码
            if(client.ie){ // 如果是IE呈现引擎, client.ie应该大于0
                // 针对IE的代码
                alert(&quot;我是IE ie引擎&quot;);
            }else if (client.gecko > 1.5){ // 如果是gecko呈现引擎(firefox)
                if(client.ver == &quot;1.8.1&quot;){
                    // 针对这版本进行操作                    
                }
                alert(&quot;我是firefox gecko引擎&quot;);
            }else if(client.webkit){
                alert(&quot;我是chrome webkie引擎&quot;);
            }else if(client.khtml){
                alert(&quot;我是KHTML 引擎&quot;);
            }else if(client.opera){
                alert(&quot;我是opera引擎&quot;);
            }


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
            <span class="hljs-keyword">var</span> client = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">var</span> engine = {
                    <span class="hljs-comment">// 呈现引擎</span>
                    ie:<span class="hljs-number">0</span>, <span class="hljs-comment">// IE浏览器内核</span>
                    gecko:<span class="hljs-number">0</span>, <span class="hljs-comment">// Firefox浏览器内核    </span>
                    webkit:<span class="hljs-number">0</span>, <span class="hljs-comment">// google-&gt;chrome和apple-&gt;safari内核</span>
                    khtml:<span class="hljs-number">0</span>, <span class="hljs-comment">// Konqueror(linux平台中的一个浏览器)的内核-&gt;KHTML</span>
                    opera:<span class="hljs-number">0</span>, <span class="hljs-comment">// Opera</span>
                    
                    <span class="hljs-comment">// 具体的版本号</span>
                    ver : <span class="hljs-literal">null</span>
                };
                
                <span class="hljs-comment">// 检测呈现引擎, 平台, 设备</span>
                <span class="hljs-keyword">return</span> {
                    <span class="hljs-attr">engine</span> : engine
                };
            }();
            
            
            <span class="hljs-comment">//  ====================== </span>
            <span class="hljs-comment">//  = 检测客户端=&gt;识别呈现引擎 = </span>
            <span class="hljs-comment">//  ======================</span>
            <span class="hljs-keyword">var</span> ua = navigator.userAgent;
            <span class="hljs-built_in">console</span>.log(ua);
            <span class="hljs-comment">//  = 第一步先检测Opera = </span>
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.opera){ <span class="hljs-comment">// 如果是Opera浏览器, 则获得浏览器版本</span>
                client.ver = <span class="hljs-built_in">window</span>.opera.version(); <span class="hljs-comment">// window.opera在Opera 5.0及更高版本中存在,在Opera 7.6及更高版本中,调用version()方法可以放回一个表示浏览器版本的字符串</span>
                client.opera = <span class="hljs-built_in">parseFloat</span>(client.ver);
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/AppleWebKit\/(\S+)/</span>.test(ua)){
                <span class="hljs-comment">//  = 第二步检测Webkit = </span>
                <span class="hljs-comment">// webkit的用户代理字符串中的"AppleWebkit"是独一无二的, 所以检测这个字符串</span>
                <span class="hljs-comment">// \S : 表示非空格的特殊字符</span>
                client.ver = <span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>];
                client.webkit = <span class="hljs-built_in">parseFloat</span>(client.ver);
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/KHTML\/(\S+)/</span>.test(ua) || <span class="hljs-regexp">/Konqueror\/([^;]+)/</span>.test(ua)){
                <span class="hljs-comment">//  = 第三步检测KHTML = </span>
                <span class="hljs-comment">// 在Konqueror 3.1及更早版本中不包括KHTML的版本, 故而使用Konqueror的版本来代替</span>
                client.ver = <span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>];
                client.khtml = <span class="hljs-built_in">parseFloat</span>(client.ver)                
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/rv:([^\)]+)\) Gecko\/\d{8}/</span>.test(ua)){
                <span class="hljs-comment">//  = 第四步检测Gecko = </span>
                <span class="hljs-comment">// "Gecko" 会出现在字符串"rv:"之后 ;字符串"rv:"在前面;</span>
                client.ver = <span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>];
                client.khtml = <span class="hljs-built_in">parseFloat</span>(client.ver)
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/MSIE ([^;]+)/</span>.test(ua)){
                <span class="hljs-comment">//  = 第五步检测IE = </span>
                client.ver = <span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>];
                client.ie = <span class="hljs-built_in">parseFloat</span>(client.ver)
            }
            
            
            <span class="hljs-comment">// 执行代码</span>
            <span class="hljs-keyword">if</span>(client.ie){ <span class="hljs-comment">// 如果是IE呈现引擎, client.ie应该大于0</span>
                <span class="hljs-comment">// 针对IE的代码</span>
                alert(<span class="hljs-string">"我是IE ie引擎"</span>);
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (client.gecko &gt; <span class="hljs-number">1.5</span>){ <span class="hljs-comment">// 如果是gecko呈现引擎(firefox)</span>
                <span class="hljs-keyword">if</span>(client.ver == <span class="hljs-string">"1.8.1"</span>){
                    <span class="hljs-comment">// 针对这版本进行操作                    </span>
                }
                alert(<span class="hljs-string">"我是firefox gecko引擎"</span>);
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(client.webkit){
                alert(<span class="hljs-string">"我是chrome webkie引擎"</span>);
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(client.khtml){
                alert(<span class="hljs-string">"我是KHTML 引擎"</span>);
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(client.opera){
                alert(<span class="hljs-string">"我是opera引擎"</span>);
            }


</code></pre>
<blockquote><p>检测浏览器品牌　:</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            var client = function (){
                var engine = {
                    // 呈现引擎
                    ie:0, // IE浏览器内核
                    gecko:0, // Firefox浏览器内核    
                    webkit:0, // google->chrome和apple->safari内核
                    khtml:0, // Konqueror(linux平台中的一个浏览器)的内核->KHTML
                    opera:0, // Opera
                    
                    // 具体的版本号
                    ver : null
                };
                
                var browser = {
                    //浏览器
                    ie : 0,
                    firefox:0,
                    safari:0,
                    honq:0,
                    opera:0, 
                    chrome:0,
                    
                    // 具体的版本号
                    ver : null
                };
                
                
                // 检测呈现引擎, 平台, 设备
                return {
                    engine : engine,
                    browser : browser
                };
            }();
            
            
            //  ====================== 
            //  = 检测客户端=>识别呈现引擎 = 
            //  = 检测客户端=>识别浏览器 =  
            //  ====================== 
            var ua = navigator.userAgent; 
            //  = 第一步先检测Opera =  
            var o = window.opera || window.opr
            console.log(ua);
            if(o){ // 如果是Opera浏览器, 则获得浏览器版本
                client.engine.ver = client.browser.ver = (/OPR\/(.*)/.exec(ua))[1]; // window.opera在Opera 5.0及更高版本中存在,在Opera 7.6及更高版本中,调用version()方法可以放回一个表示浏览器版本的字符串
                client.engine.opera = client.browser.opera = parseFloat(client.engine.ver);
            }else if(/AppleWebKit\/(\S+)/.test(ua)){
                //  = 第二步检测Webkit = 
                // webkit的用户代理字符串中的&quot;AppleWebkit&quot;是独一无二的, 所以检测这个字符串
                // \S : 表示非空格的字符
                client.engine.ver = RegExp[&quot;$1&quot;];
                client.engine.webkit = parseFloat(client.engine.ver);

                //确定是Chrome 还是 Safari
                if(/Chrome\/(\S+)/.test(ua)){
                    client.browser.ver  = RegExp[&quot;$1&quot;];
                    client.browser.chrome = parseFloat(client.browser.ver);
                }else if(/Version\/(\S+)/.test(ua)){
                    client.browser.ver  = RegExp[&quot;$1&quot;];
                    client.browser.safari = parseFloat(client.browser.ver);
                }else{
                    //近似的确定版本号
                    var safariVersion = 1;
                    if(client.webkit < 100){
                        safariVersion = 1;
                    }else if(client.webkit < 312){
                        safariVersion = 1.2;
                    }else if(client.webkit < 412){
                        safariVersion = 1.3;
                    }else{
                        safariVersion = 2;
                    }
                    client.browser.safari = client.browser.ver = safariVersion;
                }
            }else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
                //  = 第三步检测KHTML = 
                // 在Konqueror 3.1及更早版本中不包括KHTML的版本, 故而使用Konqueror的版本来代替
                client.engine.ver = client.browser.ver = RegExp[&quot;$1&quot;];
                client.engine.khtml = client.browser.konq = parseFloat(client.engine.ver)
            }else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
                //  = 第四步检测Gecko = 
                // &quot;Gecko&quot; 会出现在字符串&quot;rv:&quot;之后 ;字符串&quot;rv:&quot;在前面;
                client.engine.ver = RegExp[&quot;$1&quot;];
                client.engine.gecko = parseFloat(client.engine.ver);
                
                //确定是不是firefox
                if(/Firefox\/(\S+)/.test(ua)){
                    client.browser.ver = RegExp[&quot;$1&quot;];
                    client.browser.firefox = parseFloat(client.browser.ver);
                }
            }else if(/MSIE ([^;]+)/.test(ua)){
                //  = 第五步检测IE = 
                client.engine.ver = client.browser.ver = RegExp[&quot;$1&quot;];
                client.engine.ie = client.browser.ie = parseFloat(client.engine.ver)
            }
            
            
            // 检测引擎逻辑代码
            if(client.engine.ie){ // 如果是IE呈现引擎, client.engine.ie应该大于0
                // 针对IE的代码
                alert(&quot;我是IE ie引擎&quot;);
            }else if (client.engine.gecko > 1.5){ // 如果是gecko呈现引擎(firefox)
                if(client.engine.ver == &quot;1.8.1&quot;){
                    // 针对这版本进行操作                    
                }
                alert(&quot;我是firefox gecko引擎&quot;);
            }else if(client.engine.webkit){
                alert(&quot;我是webkie引擎&quot;);
            }else if(client.engine.khtml){
                alert(&quot;我是KHTML 引擎&quot;);
            }else if(client.engine.opera){
                alert(&quot;我是opera引擎&quot;);
            }
            
            // 检测浏览器逻辑代码
            if(client.engine.webkit){ // 如果为webkit引擎
                if(client.browser.chrome){
                    alert(&quot;我是google chrome&quot;)
                }else if(client.browser.safari){
                    alert(&quot;我是Safari&quot;)
                }
            }else if(client.engine.gecko){
                if(client.browser.firefox){
                    alert(&quot;我是火狐&quot;)
                }else{
                    alert(&quot;gecko.....&quot;)
                }
            }else if(client.browser.ie){
                alert(&quot;我是IE&quot;)
            }else if(client.browser.opera){
                alert(&quot;我是Opera&quot;)
            }
            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>            var <span class="hljs-keyword">client</span> = function (){
                var engine = {
                    <span class="hljs-comment">// 呈现引擎</span>
                    ie:<span class="hljs-number">0</span>, <span class="hljs-comment">// IE浏览器内核</span>
                    gecko:<span class="hljs-number">0</span>, <span class="hljs-comment">// Firefox浏览器内核    </span>
                    webkit:<span class="hljs-number">0</span>, <span class="hljs-comment">// google-&gt;chrome和apple-&gt;safari内核</span>
                    khtml:<span class="hljs-number">0</span>, <span class="hljs-comment">// Konqueror(linux平台中的一个浏览器)的内核-&gt;KHTML</span>
                    opera:<span class="hljs-number">0</span>, <span class="hljs-comment">// Opera</span>
                    
                    <span class="hljs-comment">// 具体的版本号</span>
                    ver : <span class="hljs-keyword">null</span>
                };
                
                var browser = {
                    <span class="hljs-comment">//浏览器</span>
                    ie : <span class="hljs-number">0</span>,
                    firefox:<span class="hljs-number">0</span>,
                    safari:<span class="hljs-number">0</span>,
                    honq:<span class="hljs-number">0</span>,
                    opera:<span class="hljs-number">0</span>, 
                    chrome:<span class="hljs-number">0</span>,
                    
                    <span class="hljs-comment">// 具体的版本号</span>
                    ver : <span class="hljs-keyword">null</span>
                };
                
                
                <span class="hljs-comment">// 检测呈现引擎, 平台, 设备</span>
                <span class="hljs-keyword">return</span> {
                    engine : engine,
                    browser : browser
                };
            }();
            
            
            <span class="hljs-comment">//  ====================== </span>
            <span class="hljs-comment">//  = 检测客户端=&gt;识别呈现引擎 = </span>
            <span class="hljs-comment">//  = 检测客户端=&gt;识别浏览器 =  </span>
            <span class="hljs-comment">//  ====================== </span>
            var ua = navigator.userAgent; 
            <span class="hljs-comment">//  = 第一步先检测Opera =  </span>
            var o = window.opera || window.opr
            console.log(ua);
            <span class="hljs-keyword">if</span>(o){ <span class="hljs-comment">// 如果是Opera浏览器, 则获得浏览器版本</span>
                <span class="hljs-keyword">client</span>.engine.ver = <span class="hljs-keyword">client</span>.browser.ver = (/OPR\/(.*)/.exec(ua))[<span class="hljs-number">1</span>]; <span class="hljs-comment">// window.opera在Opera 5.0及更高版本中存在,在Opera 7.6及更高版本中,调用version()方法可以放回一个表示浏览器版本的字符串</span>
                <span class="hljs-keyword">client</span>.engine.opera = <span class="hljs-keyword">client</span>.browser.opera = parseFloat(<span class="hljs-keyword">client</span>.engine.ver);
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(/AppleWebKit\/(\S+)/.test(ua)){
                <span class="hljs-comment">//  = 第二步检测Webkit = </span>
                <span class="hljs-comment">// webkit的用户代理字符串中的"AppleWebkit"是独一无二的, 所以检测这个字符串</span>
                <span class="hljs-comment">// \S : 表示非空格的字符</span>
                <span class="hljs-keyword">client</span>.engine.ver = RegExp[<span class="hljs-string">"$1"</span>];
                <span class="hljs-keyword">client</span>.engine.webkit = parseFloat(<span class="hljs-keyword">client</span>.engine.ver);

                <span class="hljs-comment">//确定是Chrome 还是 Safari</span>
                <span class="hljs-keyword">if</span>(/Chrome\/(\S+)/.test(ua)){
                    <span class="hljs-keyword">client</span>.browser.ver  = RegExp[<span class="hljs-string">"$1"</span>];
                    <span class="hljs-keyword">client</span>.browser.chrome = parseFloat(<span class="hljs-keyword">client</span>.browser.ver);
                }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(/Version\/(\S+)/.test(ua)){
                    <span class="hljs-keyword">client</span>.browser.ver  = RegExp[<span class="hljs-string">"$1"</span>];
                    <span class="hljs-keyword">client</span>.browser.safari = parseFloat(<span class="hljs-keyword">client</span>.browser.ver);
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-comment">//近似的确定版本号</span>
                    var safariVersion = <span class="hljs-number">1</span>;
                    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.webkit &lt; <span class="hljs-number">100</span>){
                        safariVersion = <span class="hljs-number">1</span>;
                    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.webkit &lt; <span class="hljs-number">312</span>){
                        safariVersion = <span class="hljs-number">1.2</span>;
                    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.webkit &lt; <span class="hljs-number">412</span>){
                        safariVersion = <span class="hljs-number">1.3</span>;
                    }<span class="hljs-keyword">else</span>{
                        safariVersion = <span class="hljs-number">2</span>;
                    }
                    <span class="hljs-keyword">client</span>.browser.safari = <span class="hljs-keyword">client</span>.browser.ver = safariVersion;
                }
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
                <span class="hljs-comment">//  = 第三步检测KHTML = </span>
                <span class="hljs-comment">// 在Konqueror 3.1及更早版本中不包括KHTML的版本, 故而使用Konqueror的版本来代替</span>
                <span class="hljs-keyword">client</span>.engine.ver = <span class="hljs-keyword">client</span>.browser.ver = RegExp[<span class="hljs-string">"$1"</span>];
                <span class="hljs-keyword">client</span>.engine.khtml = <span class="hljs-keyword">client</span>.browser.konq = parseFloat(<span class="hljs-keyword">client</span>.engine.ver)
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(/rv:([^\)]+)\) Gecko\/\d{<span class="hljs-number">8</span>}/.test(ua)){
                <span class="hljs-comment">//  = 第四步检测Gecko = </span>
                <span class="hljs-comment">// "Gecko" 会出现在字符串"rv:"之后 ;字符串"rv:"在前面;</span>
                <span class="hljs-keyword">client</span>.engine.ver = RegExp[<span class="hljs-string">"$1"</span>];
                <span class="hljs-keyword">client</span>.engine.gecko = parseFloat(<span class="hljs-keyword">client</span>.engine.ver);
                
                <span class="hljs-comment">//确定是不是firefox</span>
                <span class="hljs-keyword">if</span>(/Firefox\/(\S+)/.test(ua)){
                    <span class="hljs-keyword">client</span>.browser.ver = RegExp[<span class="hljs-string">"$1"</span>];
                    <span class="hljs-keyword">client</span>.browser.firefox = parseFloat(<span class="hljs-keyword">client</span>.browser.ver);
                }
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(/MSIE ([^;]+)/.test(ua)){
                <span class="hljs-comment">//  = 第五步检测IE = </span>
                <span class="hljs-keyword">client</span>.engine.ver = <span class="hljs-keyword">client</span>.browser.ver = RegExp[<span class="hljs-string">"$1"</span>];
                <span class="hljs-keyword">client</span>.engine.ie = <span class="hljs-keyword">client</span>.browser.ie = parseFloat(<span class="hljs-keyword">client</span>.engine.ver)
            }
            
            
            <span class="hljs-comment">// 检测引擎逻辑代码</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.ie){ <span class="hljs-comment">// 如果是IE呈现引擎, client.engine.ie应该大于0</span>
                <span class="hljs-comment">// 针对IE的代码</span>
                alert(<span class="hljs-string">"我是IE ie引擎"</span>);
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">client</span>.engine.gecko &gt; <span class="hljs-number">1.5</span>){ <span class="hljs-comment">// 如果是gecko呈现引擎(firefox)</span>
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.ver == <span class="hljs-string">"1.8.1"</span>){
                    <span class="hljs-comment">// 针对这版本进行操作                    </span>
                }
                alert(<span class="hljs-string">"我是firefox gecko引擎"</span>);
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.webkit){
                alert(<span class="hljs-string">"我是webkie引擎"</span>);
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.khtml){
                alert(<span class="hljs-string">"我是KHTML 引擎"</span>);
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.opera){
                alert(<span class="hljs-string">"我是opera引擎"</span>);
            }
            
            <span class="hljs-comment">// 检测浏览器逻辑代码</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.webkit){ <span class="hljs-comment">// 如果为webkit引擎</span>
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.browser.chrome){
                    alert(<span class="hljs-string">"我是google chrome"</span>)
                }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.browser.safari){
                    alert(<span class="hljs-string">"我是Safari"</span>)
                }
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.gecko){
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.browser.firefox){
                    alert(<span class="hljs-string">"我是火狐"</span>)
                }<span class="hljs-keyword">else</span>{
                    alert(<span class="hljs-string">"gecko....."</span>)
                }
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.browser.ie){
                alert(<span class="hljs-string">"我是IE"</span>)
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.browser.opera){
                alert(<span class="hljs-string">"我是Opera"</span>)
            }
            </code></pre>
<h2 id="articleHeader1">用户代理检测 总结(上面的代码并入)</h2>
<ul><li>这种方法对用户代理字符串有很大的依赖性, 不推荐</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            // 模块增强模式进行客户端检测
            var client = function() {
                var engine = {
                    // 呈现引擎
                    ie: 0, // IE浏览器内核
                    gecko: 0, // Firefox浏览器内核    
                    webkit: 0, // google->chrome和apple->safari内核
                    khtml: 0, // Konqueror(linux平台中的一个浏览器)的内核->KHTML
                    opera: 0, // Opera

                    // 具体的版本号
                    ver: null
                };

                var browser = {
                    // 浏览器
                    ie: 0,
                    firefox: 0,
                    safari: 0,
                    konq: 0,
                    opera: 0,
                    chrome: 0,

                    // 具体的版本号
                    ver: null
                };

                var system = {
                    // 平台, 设备和操作系统
                    win: false,
                    mac: false,
                    x11: false, // 数字1

                    // 移动设备
                    iphone: false,
                    ipod: false,
                    ipad: false,
                    ios: false,
                    android: false,
                    nokiaN: false, // 诺基亚N系列
                    winMobile: false, // window phone系列

                    // 游戏系统
                    wii: false, // 任天堂
                    ps: false
                }

                // 检测呈现引擎和浏览器
                var ua = navigator.userAgent;
                //  = 第一步先检测Opera =  
                var o = window.opera || window.opr;
                if(o) { // 如果是Opera浏览器, 则获得浏览器版本
                    engine.ver = browser.ver = (/OPR\/(.*)/.exec(ua))[1]; // window.opera在Opera 5.0及更高版本中存在,在Opera 7.6及更高版本中,调用version()方法可以放回一个表示浏览器版本的字符串
                    engine.opera = browser.opera = parseFloat(engine.ver);
                } else if(/AppleWebKit\/(\S+)/.test(ua)) {
                    //  = 第二步检测Webkit = 
                    // webkit的用户代理字符串中的&quot;AppleWebkit&quot;是独一无二的, 所以检测这个字符串
                    // \S : 表示非空格的字符
                    engine.ver = RegExp[&quot;$1&quot;];
                    engine.webkit = parseFloat(engine.ver);

                    //确定是Chrome 还是 Safari
                    if(/Chrome\/(\S+)/.test(ua)) {
                        browser.ver = RegExp[&quot;$1&quot;];
                        browser.chrome = parseFloat(browser.ver);
                    } else if(/Version\/(\S+)/.test(ua)) {
                        browser.ver = RegExp[&quot;$1&quot;];
                        browser.safari = parseFloat(browser.ver);
                    } else {
                        //近似的确定版本号
                        var safariVersion = 1;
                        if(engine.webkit < 100) {
                            safariVersion = 1;
                        } else if(engine.webkit < 312) {
                            safariVersion = 1.2;
                        } else if(engine.webkit < 412) {
                            safariVersion = 1.3;
                        } else {
                            safariVersion = 2;
                        }
                        browser.safari = browser.ver = safariVersion;
                    }
                } else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
                    //  = 第三步检测KHTML = 
                    // 在Konqueror 3.1及更早版本中不包括KHTML的版本, 故而使用Konqueror的版本来代替
                    engine.ver = browser.ver = RegExp[&quot;$1&quot;];
                    engine.khtml = browser.konq = parseFloat(engine.ver)
                } else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
                    //  = 第四步检测Gecko = 
                    // &quot;Gecko&quot; 会出现在字符串&quot;rv:&quot;之后 ;字符串&quot;rv:&quot;在前面;
                    engine.ver = RegExp[&quot;$1&quot;];
                    engine.gecko = parseFloat(engine.ver);

                    //确定是不是firefox
                    if(/Firefox\/(\S+)/.test(ua)) {
                        browser.ver = RegExp[&quot;$1&quot;];
                        browser.firefox = parseFloat(browser.ver);
                    }
                } else if(/MSIE ([^;]+)/.test(ua)) {
                    //  = 第五步检测IE = 
                    engine.ver = browser.ver = RegExp[&quot;$1&quot;];
                    engine.ie = browser.ie = parseFloat(engine.ver)
                }

                // 检测平台
                var p = navigator.platform; // 可能出现的值:Win32, Win64, MacPPC, MacIntel, X11, Linux i686;
                // 检测前缀, 向前兼容
                system.win = p.indexOf(&quot;Win&quot;) == 0;
                system.mac = p.indexOf(&quot;Mac&quot;) == 0;
                system.x11 = (p.indexOf(&quot;X11&quot;) == 0) || (p.indexOf(&quot;Linux&quot;) == 0);

                // 检测Windows 操作系统
                if(system.win) {
                    if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
                        if(RegExp[&quot;$1&quot;] == &quot;NT&quot;) {
                            switch(RegExp[&quot;$2&quot;]) {
                                case &quot;5.0&quot;:
                                    system.win = &quot;2000&quot;;
                                    break;
                                case &quot;5.1&quot;:
                                    system.win = &quot;Xp&quot;;
                                    break;
                                case &quot;6.0&quot;:
                                    system.win = &quot;Vista&quot;;
                                    break;
                                case &quot;6.1&quot;:
                                    system.win = &quot;7&quot;;
                                    break;
                                default:
                                    system.win = &quot;NT&quot;;
                                    break;
                            }
                        } else if(RegExp[&quot;$1&quot;] == &quot;9x&quot;) {
                            system.win = &quot;ME&quot;;
                        } else {
                            system.win = RegExp[&quot;$1&quot;];
                        }
                    }
                }
                
                // 检测移动设备
                system.iphone = ua.indexOf(&quot;iPone&quot;) > -1;
                system.ipod = ua.indexOf(&quot;iPod&quot;) > -1;
                system.ipad = ua.indexOf(&quot;iPad&quot;) > -1;
                system.nokiaN = ua.indexOf(&quot;NokiaN&quot;) > -1;
                // windows mobile设备, 又称windows CE
                if(system.win == &quot;CE&quot;){ // 老版本的windows Mobile
                    system.winMobile = system.win;
                }else if(system.win == &quot;Ph&quot;){
                    if(/Window Phone OS (\d+.\d+)/.test(ua)){ // windows phone7或更新
                        system.win = &quot;Phone&quot;;
                        system.winMobile = parseFloat(RegExp[&quot;$1&quot;]);
                    }
                }
                // 检测IOS版本
                if(system.mac &amp;&amp; ua.indexOf(&quot;Mobile&quot;) > -1){
                    if(/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
                        system.ios = parseFloat(RegExp.$1.replace(&quot;_&quot;, &quot;.&quot;));
                    }else{
                        system.ios = 2; // 无法检测, 推测为低版本
                    }
                }
                // 检测Android 版本
                if(/Android (\d+\.\d+)/.test(ua)){
                    system.android = parseFloat(RegExp.$1);                    
                }
                
                // 检测游戏系统
                system.wii = ua.indexOf(&quot;Wii&quot;) > -1;
                system.ps = /playstation/i.test(ua);

                // 返回呈现引擎, 平台, 设备
                return {
                    engine: engine,
                    browser: browser,
                    system: system
                };
            }();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>            <span class="hljs-comment">// 模块增强模式进行客户端检测</span>
            <span class="hljs-keyword">var</span> client = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> engine = {
                    <span class="hljs-comment">// 呈现引擎</span>
                    ie: <span class="hljs-number">0</span>, <span class="hljs-comment">// IE浏览器内核</span>
                    gecko: <span class="hljs-number">0</span>, <span class="hljs-comment">// Firefox浏览器内核    </span>
                    webkit: <span class="hljs-number">0</span>, <span class="hljs-comment">// google-&gt;chrome和apple-&gt;safari内核</span>
                    khtml: <span class="hljs-number">0</span>, <span class="hljs-comment">// Konqueror(linux平台中的一个浏览器)的内核-&gt;KHTML</span>
                    opera: <span class="hljs-number">0</span>, <span class="hljs-comment">// Opera</span>

                    <span class="hljs-comment">// 具体的版本号</span>
                    ver: <span class="hljs-literal">null</span>
                };

                <span class="hljs-keyword">var</span> browser = {
                    <span class="hljs-comment">// 浏览器</span>
                    ie: <span class="hljs-number">0</span>,
                    <span class="hljs-attr">firefox</span>: <span class="hljs-number">0</span>,
                    <span class="hljs-attr">safari</span>: <span class="hljs-number">0</span>,
                    <span class="hljs-attr">konq</span>: <span class="hljs-number">0</span>,
                    <span class="hljs-attr">opera</span>: <span class="hljs-number">0</span>,
                    <span class="hljs-attr">chrome</span>: <span class="hljs-number">0</span>,

                    <span class="hljs-comment">// 具体的版本号</span>
                    ver: <span class="hljs-literal">null</span>
                };

                <span class="hljs-keyword">var</span> system = {
                    <span class="hljs-comment">// 平台, 设备和操作系统</span>
                    win: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">mac</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">x11</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 数字1</span>

                    <span class="hljs-comment">// 移动设备</span>
                    iphone: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">ipod</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">ipad</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">ios</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">android</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">nokiaN</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 诺基亚N系列</span>
                    winMobile: <span class="hljs-literal">false</span>, <span class="hljs-comment">// window phone系列</span>

                    <span class="hljs-comment">// 游戏系统</span>
                    wii: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 任天堂</span>
                    ps: <span class="hljs-literal">false</span>
                }

                <span class="hljs-comment">// 检测呈现引擎和浏览器</span>
                <span class="hljs-keyword">var</span> ua = navigator.userAgent;
                <span class="hljs-comment">//  = 第一步先检测Opera =  </span>
                <span class="hljs-keyword">var</span> o = <span class="hljs-built_in">window</span>.opera || <span class="hljs-built_in">window</span>.opr;
                <span class="hljs-keyword">if</span>(o) { <span class="hljs-comment">// 如果是Opera浏览器, 则获得浏览器版本</span>
                    engine.ver = browser.ver = (<span class="hljs-regexp">/OPR\/(.*)/</span>.exec(ua))[<span class="hljs-number">1</span>]; <span class="hljs-comment">// window.opera在Opera 5.0及更高版本中存在,在Opera 7.6及更高版本中,调用version()方法可以放回一个表示浏览器版本的字符串</span>
                    engine.opera = browser.opera = <span class="hljs-built_in">parseFloat</span>(engine.ver);
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/AppleWebKit\/(\S+)/</span>.test(ua)) {
                    <span class="hljs-comment">//  = 第二步检测Webkit = </span>
                    <span class="hljs-comment">// webkit的用户代理字符串中的"AppleWebkit"是独一无二的, 所以检测这个字符串</span>
                    <span class="hljs-comment">// \S : 表示非空格的字符</span>
                    engine.ver = <span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>];
                    engine.webkit = <span class="hljs-built_in">parseFloat</span>(engine.ver);

                    <span class="hljs-comment">//确定是Chrome 还是 Safari</span>
                    <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/Chrome\/(\S+)/</span>.test(ua)) {
                        browser.ver = <span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>];
                        browser.chrome = <span class="hljs-built_in">parseFloat</span>(browser.ver);
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/Version\/(\S+)/</span>.test(ua)) {
                        browser.ver = <span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>];
                        browser.safari = <span class="hljs-built_in">parseFloat</span>(browser.ver);
                    } <span class="hljs-keyword">else</span> {
                        <span class="hljs-comment">//近似的确定版本号</span>
                        <span class="hljs-keyword">var</span> safariVersion = <span class="hljs-number">1</span>;
                        <span class="hljs-keyword">if</span>(engine.webkit &lt; <span class="hljs-number">100</span>) {
                            safariVersion = <span class="hljs-number">1</span>;
                        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(engine.webkit &lt; <span class="hljs-number">312</span>) {
                            safariVersion = <span class="hljs-number">1.2</span>;
                        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(engine.webkit &lt; <span class="hljs-number">412</span>) {
                            safariVersion = <span class="hljs-number">1.3</span>;
                        } <span class="hljs-keyword">else</span> {
                            safariVersion = <span class="hljs-number">2</span>;
                        }
                        browser.safari = browser.ver = safariVersion;
                    }
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/KHTML\/(\S+)/</span>.test(ua) || <span class="hljs-regexp">/Konqueror\/([^;]+)/</span>.test(ua)) {
                    <span class="hljs-comment">//  = 第三步检测KHTML = </span>
                    <span class="hljs-comment">// 在Konqueror 3.1及更早版本中不包括KHTML的版本, 故而使用Konqueror的版本来代替</span>
                    engine.ver = browser.ver = <span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>];
                    engine.khtml = browser.konq = <span class="hljs-built_in">parseFloat</span>(engine.ver)
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/rv:([^\)]+)\) Gecko\/\d{8}/</span>.test(ua)) {
                    <span class="hljs-comment">//  = 第四步检测Gecko = </span>
                    <span class="hljs-comment">// "Gecko" 会出现在字符串"rv:"之后 ;字符串"rv:"在前面;</span>
                    engine.ver = <span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>];
                    engine.gecko = <span class="hljs-built_in">parseFloat</span>(engine.ver);

                    <span class="hljs-comment">//确定是不是firefox</span>
                    <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/Firefox\/(\S+)/</span>.test(ua)) {
                        browser.ver = <span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>];
                        browser.firefox = <span class="hljs-built_in">parseFloat</span>(browser.ver);
                    }
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/MSIE ([^;]+)/</span>.test(ua)) {
                    <span class="hljs-comment">//  = 第五步检测IE = </span>
                    engine.ver = browser.ver = <span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>];
                    engine.ie = browser.ie = <span class="hljs-built_in">parseFloat</span>(engine.ver)
                }

                <span class="hljs-comment">// 检测平台</span>
                <span class="hljs-keyword">var</span> p = navigator.platform; <span class="hljs-comment">// 可能出现的值:Win32, Win64, MacPPC, MacIntel, X11, Linux i686;</span>
                <span class="hljs-comment">// 检测前缀, 向前兼容</span>
                system.win = p.indexOf(<span class="hljs-string">"Win"</span>) == <span class="hljs-number">0</span>;
                system.mac = p.indexOf(<span class="hljs-string">"Mac"</span>) == <span class="hljs-number">0</span>;
                system.x11 = (p.indexOf(<span class="hljs-string">"X11"</span>) == <span class="hljs-number">0</span>) || (p.indexOf(<span class="hljs-string">"Linux"</span>) == <span class="hljs-number">0</span>);

                <span class="hljs-comment">// 检测Windows 操作系统</span>
                <span class="hljs-keyword">if</span>(system.win) {
                    <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/</span>.test(ua)) {
                        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>] == <span class="hljs-string">"NT"</span>) {
                            <span class="hljs-keyword">switch</span>(<span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$2"</span>]) {
                                <span class="hljs-keyword">case</span> <span class="hljs-string">"5.0"</span>:
                                    system.win = <span class="hljs-string">"2000"</span>;
                                    <span class="hljs-keyword">break</span>;
                                <span class="hljs-keyword">case</span> <span class="hljs-string">"5.1"</span>:
                                    system.win = <span class="hljs-string">"Xp"</span>;
                                    <span class="hljs-keyword">break</span>;
                                <span class="hljs-keyword">case</span> <span class="hljs-string">"6.0"</span>:
                                    system.win = <span class="hljs-string">"Vista"</span>;
                                    <span class="hljs-keyword">break</span>;
                                <span class="hljs-keyword">case</span> <span class="hljs-string">"6.1"</span>:
                                    system.win = <span class="hljs-string">"7"</span>;
                                    <span class="hljs-keyword">break</span>;
                                <span class="hljs-keyword">default</span>:
                                    system.win = <span class="hljs-string">"NT"</span>;
                                    <span class="hljs-keyword">break</span>;
                            }
                        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>] == <span class="hljs-string">"9x"</span>) {
                            system.win = <span class="hljs-string">"ME"</span>;
                        } <span class="hljs-keyword">else</span> {
                            system.win = <span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>];
                        }
                    }
                }
                
                <span class="hljs-comment">// 检测移动设备</span>
                system.iphone = ua.indexOf(<span class="hljs-string">"iPone"</span>) &gt; <span class="hljs-number">-1</span>;
                system.ipod = ua.indexOf(<span class="hljs-string">"iPod"</span>) &gt; <span class="hljs-number">-1</span>;
                system.ipad = ua.indexOf(<span class="hljs-string">"iPad"</span>) &gt; <span class="hljs-number">-1</span>;
                system.nokiaN = ua.indexOf(<span class="hljs-string">"NokiaN"</span>) &gt; <span class="hljs-number">-1</span>;
                <span class="hljs-comment">// windows mobile设备, 又称windows CE</span>
                <span class="hljs-keyword">if</span>(system.win == <span class="hljs-string">"CE"</span>){ <span class="hljs-comment">// 老版本的windows Mobile</span>
                    system.winMobile = system.win;
                }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(system.win == <span class="hljs-string">"Ph"</span>){
                    <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/Window Phone OS (\d+.\d+)/</span>.test(ua)){ <span class="hljs-comment">// windows phone7或更新</span>
                        system.win = <span class="hljs-string">"Phone"</span>;
                        system.winMobile = <span class="hljs-built_in">parseFloat</span>(<span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>]);
                    }
                }
                <span class="hljs-comment">// 检测IOS版本</span>
                <span class="hljs-keyword">if</span>(system.mac &amp;&amp; ua.indexOf(<span class="hljs-string">"Mobile"</span>) &gt; <span class="hljs-number">-1</span>){
                    <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/CPU (?:iPhone )?OS (\d+_\d+)/</span>.test(ua)){
                        system.ios = <span class="hljs-built_in">parseFloat</span>(<span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1.</span>replace(<span class="hljs-string">"_"</span>, <span class="hljs-string">"."</span>));
                    }<span class="hljs-keyword">else</span>{
                        system.ios = <span class="hljs-number">2</span>; <span class="hljs-comment">// 无法检测, 推测为低版本</span>
                    }
                }
                <span class="hljs-comment">// 检测Android 版本</span>
                <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/Android (\d+\.\d+)/</span>.test(ua)){
                    system.android = <span class="hljs-built_in">parseFloat</span>(<span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1</span>);                    
                }
                
                <span class="hljs-comment">// 检测游戏系统</span>
                system.wii = ua.indexOf(<span class="hljs-string">"Wii"</span>) &gt; <span class="hljs-number">-1</span>;
                system.ps = <span class="hljs-regexp">/playstation/i</span>.test(ua);

                <span class="hljs-comment">// 返回呈现引擎, 平台, 设备</span>
                <span class="hljs-keyword">return</span> {
                    <span class="hljs-attr">engine</span>: engine,
                    <span class="hljs-attr">browser</span>: browser,
                    <span class="hljs-attr">system</span>: system
                };
            }();
</code></pre>
<ul><li>[ ] 接上步操作 ↑ 检测:</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
            // 检测引擎逻辑代码
            if(client.engine.ie) { // 如果是IE呈现引擎, engine.ie应该大于0
                // 针对IE的代码
                alert(&quot;我是IE ie引擎&quot;);
            } else if(client.engine.gecko > 1.5) { // 如果是gecko呈现引擎(firefox)
                if(client.engine.ver == &quot;1.8.1&quot;) {
                    // 针对这版本进行操作                    
                }
                alert(&quot;我是firefox gecko引擎&quot;);
            } else if(client.engine.webkit) {
                alert(&quot;我是webkie引擎&quot;);
            } else if(client.engine.khtml) {
                alert(&quot;我是KHTML 引擎&quot;);
            } else if(client.engine.opera) {
                alert(&quot;我是opera引擎&quot;);
            }

            // 检测浏览器品牌逻辑代码
            if(client.engine.webkit) { // 如果为webkit引擎
                if(client.browser.chrome) {
                    alert(&quot;我是google chrome&quot;)
                } else if(client.browser.safari) {
                    alert(&quot;我是Safari&quot;)
                }
            } else if(client.engine.gecko) {
                if(client.browser.firefox) {
                    alert(&quot;我是火狐&quot;)
                } else {
                    alert(&quot;gecko.....&quot;)
                }
            } else if(client.browser.ie) {
                alert(&quot;我是IE&quot;)
            } else if(client.browser.opera) {
                alert(&quot;我是Opera&quot;)
            }

            // 检测平台逻辑代码
            if(client.system.win) {
                alert(&quot;window 平台&quot;)
            } else if(client.system.mac) {
                alert(&quot;Mac 平台&quot;)
            } else if(client.system.x11) {
                alert(&quot;Unix(Linux) 平台&quot;)
            }
            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>
            <span class="hljs-comment">// 检测引擎逻辑代码</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.ie) { <span class="hljs-comment">// 如果是IE呈现引擎, engine.ie应该大于0</span>
                <span class="hljs-comment">// 针对IE的代码</span>
                alert(<span class="hljs-string">"我是IE ie引擎"</span>);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.gecko &gt; <span class="hljs-number">1.5</span>) { <span class="hljs-comment">// 如果是gecko呈现引擎(firefox)</span>
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.ver == <span class="hljs-string">"1.8.1"</span>) {
                    <span class="hljs-comment">// 针对这版本进行操作                    </span>
                }
                alert(<span class="hljs-string">"我是firefox gecko引擎"</span>);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.webkit) {
                alert(<span class="hljs-string">"我是webkie引擎"</span>);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.khtml) {
                alert(<span class="hljs-string">"我是KHTML 引擎"</span>);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.opera) {
                alert(<span class="hljs-string">"我是opera引擎"</span>);
            }

            <span class="hljs-comment">// 检测浏览器品牌逻辑代码</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.webkit) { <span class="hljs-comment">// 如果为webkit引擎</span>
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.browser.chrome) {
                    alert(<span class="hljs-string">"我是google chrome"</span>)
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.browser.safari) {
                    alert(<span class="hljs-string">"我是Safari"</span>)
                }
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.engine.gecko) {
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.browser.firefox) {
                    alert(<span class="hljs-string">"我是火狐"</span>)
                } <span class="hljs-keyword">else</span> {
                    alert(<span class="hljs-string">"gecko....."</span>)
                }
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.browser.ie) {
                alert(<span class="hljs-string">"我是IE"</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.browser.opera) {
                alert(<span class="hljs-string">"我是Opera"</span>)
            }

            <span class="hljs-comment">// 检测平台逻辑代码</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.system.win) {
                alert(<span class="hljs-string">"window 平台"</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.system.mac) {
                alert(<span class="hljs-string">"Mac 平台"</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">client</span>.system.x11) {
                alert(<span class="hljs-string">"Unix(Linux) 平台"</span>)
            }
            </code></pre>
<h2 id="articleHeader2">网上检测方法:</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var browser = {
    v: (function() {
        var u = navigator.userAgent,
            app = navigator.appVersion,
            p = navigator.platform;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 &amp;&amp; u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            UCB: u.match(/UCBrowser/i) == &quot;UCBrowser&quot;,
            QQB: u.match(/MQQBrowser/i) == &quot;MQQBrowser&quot;,
            win: p.indexOf('Win') > -1, //判断是否是WIN操作系统
            mac: p.indexOf('Mac') > -1 //判断是否是Mac操作系统
        };
    })()
}
        
if(&quot;\v&quot;==&quot;v&quot;){//true为IE浏览器，感兴趣的同学可以去搜下，据说是现有最流行的判断浏览器的方法
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> browser = {
    <span class="hljs-attr">v</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> u = navigator.userAgent,
            app = navigator.appVersion,
            p = navigator.platform;
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">trident</span>: u.indexOf(<span class="hljs-string">'Trident'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//IE内核</span>
            presto: u.indexOf(<span class="hljs-string">'Presto'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//opera内核</span>
            webKit: u.indexOf(<span class="hljs-string">'AppleWebKit'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//苹果、谷歌内核</span>
            gecko: u.indexOf(<span class="hljs-string">'Gecko'</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; u.indexOf(<span class="hljs-string">'KHTML'</span>) == <span class="hljs-number">-1</span>, <span class="hljs-comment">//火狐内核</span>
            mobile: !!u.match(<span class="hljs-regexp">/AppleWebKit.*Mobile.*/</span>), <span class="hljs-comment">//是否为移动终端</span>
            ios: !!u.match(<span class="hljs-regexp">/i[^;]+;( U;)? CPU.+Mac OS X/</span>), <span class="hljs-comment">//ios终端</span>
            android: u.indexOf(<span class="hljs-string">'Android'</span>) &gt; <span class="hljs-number">-1</span> || u.indexOf(<span class="hljs-string">'Linux'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//android终端或uc浏览器</span>
            iPhone: u.indexOf(<span class="hljs-string">'iPhone'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否为iPhone或者QQHD浏览器</span>
            iPad: u.indexOf(<span class="hljs-string">'iPad'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否iPad</span>
            weixin: u.indexOf(<span class="hljs-string">'MicroMessenger'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否微信</span>
            webApp: u.indexOf(<span class="hljs-string">'Safari'</span>) == <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否web应该程序，没有头部与底部</span>
            UCB: u.match(<span class="hljs-regexp">/UCBrowser/i</span>) == <span class="hljs-string">"UCBrowser"</span>,
            <span class="hljs-attr">QQB</span>: u.match(<span class="hljs-regexp">/MQQBrowser/i</span>) == <span class="hljs-string">"MQQBrowser"</span>,
            <span class="hljs-attr">win</span>: p.indexOf(<span class="hljs-string">'Win'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//判断是否是WIN操作系统</span>
            mac: p.indexOf(<span class="hljs-string">'Mac'</span>) &gt; <span class="hljs-number">-1</span> <span class="hljs-comment">//判断是否是Mac操作系统</span>
        };
    })()
}
        
<span class="hljs-keyword">if</span>(<span class="hljs-string">"\v"</span>==<span class="hljs-string">"v"</span>){<span class="hljs-comment">//true为IE浏览器，感兴趣的同学可以去搜下，据说是现有最流行的判断浏览器的方法</span>
    <span class="hljs-comment">// ...</span>
}</code></pre>
<ul><li><p>原文地址: <a href="https://segmentfault.com/a/1190000009998602">https://segmentfault.com/a/11...</a></p></li></ul>
<hr>
<p>如果喜欢， 应该:　<strong>点赞</strong>  $underline{或者}$ ...</p>
<p>如果有 <strong>新的想法</strong> 可以直接在下方评论或者 <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=773561801&amp;site=qq&amp;menu=yes" rel="nofollow noreferrer" target="_blank">联系我</a> 。</p>
<p>作者 [@Qing]</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript の 客户端检测

## 原文链接
[https://segmentfault.com/a/1190000010047071](https://segmentfault.com/a/1190000010047071)


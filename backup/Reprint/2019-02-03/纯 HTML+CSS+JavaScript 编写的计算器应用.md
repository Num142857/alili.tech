---
title: '纯 HTML+CSS+JavaScript 编写的计算器应用' 
date: 2019-02-03 2:30:39
hidden: true
slug: ce5g8qy34sf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一道笔试题</h2>
<p>之前偶然看到一个公司的笔试题，题目如下：</p>
<p>用HTML5、CSS3、JavaScript，做一个网页，实现如下图形式计算器</p>
<p><span class="img-wrap"><img data-src="/img/bVDrd0?w=464&amp;h=640" src="https://static.alili.tech/img/bVDrd0?w=464&amp;h=640" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>具体要求：</p>
<ol>
<li><p>有且只有一个文件：index.html。不允许再有其他文件，不允许再有单独的CSS、JS、PNG、JPG文件。</p></li>
<li><p>运行环境为 Google Chrome。</p></li>
<li><p>必须支持标准的四则运算。例如：1+2*3=7。</p></li>
<li><p>请在收到邮件的48小时内独立完成本测试，并回复本邮件。</p></li>
</ol>
<h2 id="articleHeader1">一道笔试题引发的一个练手项目</h2>
<p>花了一点时间写好的第一版，符合了笔试题的要求。后来左看右看觉得还可以改进做的更好，于是给它不断的改进，加新功能等，这样下来没完没了，利用业余时间一点一点的写，从刚开始的网页版，到后来做响应式的移动版，再到现在的移动App，短短续续大概写了3个月吧。</p>
<h3 id="articleHeader2">项目地址</h3>
<p>最终版的计算器，项目地址和预览图片在 GitHub：<a href="https://github.com/dunizb/sCalc" rel="nofollow noreferrer" target="_blank">https://github.com/dunizb/sCalc</a>。</p>
<h3 id="articleHeader3">功能说明</h3>
<p>最终版的功能如下：</p>
<ol>
<li><p>界面布局采用CSS3 的 Flex box布局</p></li>
<li><p>内置两套主题可切换</p></li>
<li><p>计算历史记录显示</p></li>
<li><p>左滑右滑可以切换单手模式(App)</p></li>
<li><p>当输入手机号码后长按等于号可以拨打手机号码(App)</p></li>
<li><p>版本更新检查(App)</p></li>
</ol>
<p><strong>界面布局</strong></p>
<p>由于这个项目只是练手,所以采用了HTML5个CSS3技术，也不打算兼容IE等低版本浏览器，所以直接使用CSS3提供的Flexbox布局方式。并且使用rem单位来进行自动计算尺寸。</p>
<p>计算计算历史记录显示功能，使用HTML5提供的本地存储功能之Local Storage，为了方便使用Local Storage，对它进行了简单的封装（见<code>js/common.js</code>文件）使之key值按一定规律生产，方便管理。</p>
<p><span class="img-wrap"><img data-src="/img/bVDreb?w=1086&amp;h=316" src="https://static.alili.tech/img/bVDreb?w=1086&amp;h=316" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>key由appName+id组成，id是自动增长不重复的，可以按id和appName删除一条记录，输入<code>*</code>则全部删除。</p>
<p><strong>打包APP</strong></p>
<p>移动Web版计算器写完后，又想把他做成APP在手机上运行，由于本人没用过混合APP诸如ionic之类的框架，所以参考了一下，选择了Hbuild来进行开发和APP的打包，非常方便。（<a href="http://www.dcloud.io/index.html" rel="nofollow noreferrer" target="_blank">HBuild</a>）.</p>
<p><strong>单手模式</strong></p>
<p>左滑右滑可以切换单手模式，这就需要移动端的touch事件了，使用如下代码判断是左滑还是又滑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 单手模式 */
function singleModel(){
    var calc = document.getElementById(&quot;calc&quot;);
    var startX = 0,moveX = 0,distanceX = 0;
    var distance = 100;  
    var width = calc.offsetWidth;
    //滑动事件
    calc.addEventListener(&quot;touchstart&quot;,function(e){
        startX = e.touches[0].clientX;
    });
    calc.addEventListener(&quot;touchmove&quot;,function(e){
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    });
    window.addEventListener(&quot;touchend&quot;,function(e){
        if(Math.abs(distanceX) > width/3 &amp;&amp; isMove){
            if( distanceX > 0 ){
                positionFun(&quot;right&quot;);        //右滑
            }else{
                positionFun(&quot;left&quot;);          //作滑
            }
        }
        startY = moveY = 0;
        isMove = false;
    });   
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/** 单手模式 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">singleModel</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> calc = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"calc"</span>);
    <span class="hljs-keyword">var</span> startX = <span class="hljs-number">0</span>,moveX = <span class="hljs-number">0</span>,distanceX = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> distance = <span class="hljs-number">100</span>;  
    <span class="hljs-keyword">var</span> width = calc.offsetWidth;
    <span class="hljs-comment">//滑动事件</span>
    calc.addEventListener(<span class="hljs-string">"touchstart"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        startX = e.touches[<span class="hljs-number">0</span>].clientX;
    });
    calc.addEventListener(<span class="hljs-string">"touchmove"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        moveX = e.touches[<span class="hljs-number">0</span>].clientX;
        distanceX = moveX - startX;
        isMove = <span class="hljs-literal">true</span>;
    });
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"touchend"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Math</span>.abs(distanceX) &gt; width/<span class="hljs-number">3</span> &amp;&amp; isMove){
            <span class="hljs-keyword">if</span>( distanceX &gt; <span class="hljs-number">0</span> ){
                positionFun(<span class="hljs-string">"right"</span>);        <span class="hljs-comment">//右滑</span>
            }<span class="hljs-keyword">else</span>{
                positionFun(<span class="hljs-string">"left"</span>);          <span class="hljs-comment">//作滑</span>
            }
        }
        startY = moveY = <span class="hljs-number">0</span>;
        isMove = <span class="hljs-literal">false</span>;
    });   
}</code></pre>
<p>如果是坐滑，就<code>position:absolut;left:0,bottom:0</code>，再把最外层DIV缩小到80%，这样就实现了左滑计算器缩小移动到左下角。右滑道理一样。</p>
<p><strong>电话拨打功能</strong></p>
<p>当输入手机号码后长按等于号可以拨打手机号码。这个功能没什么神奇，在移动Web上会对那些看起来像是电话号码的数字处理为电话链接，比如：</p>
<ul>
<li><p>7位数字，形如：1234567</p></li>
<li><p>带括号及加号的数字，形如：(+86)123456789</p></li>
<li><p>双连接线的数字，形如：00-00-00111</p></li>
<li><p>11位数字，形如：13800138000</p></li>
</ul>
<p>可能还有其他类型的数字也会被识别。我们可以通过如下的meta来开启电话号码的自动识别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;format-detection&quot; content=&quot;telephone=yes&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;meta <span class="hljs-built_in">name</span>=<span class="hljs-string">"format-detection"</span> content=<span class="hljs-string">"telephone=yes"</span> /&gt;</code></pre>
<p>开启电话功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;tel:123456&quot;>123456</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"tel:123456"</span>&gt;</span>123456<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>开启短信功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;sms:123456&quot;>123456</a> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"sms:123456"</span>&gt;</span>123456<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span> </code></pre>
<p>但是，在Android系统上，只能调用系统的拨号界面，在iOS上则能调过这一步直接把电话拨打出去。</p>
<p><strong>版本更新检查</strong></p>
<p>在关于页面，有一个版本更新检查按钮，就能检查是否有新版本，这个功能的原理是发送一个JSOPN请求去检查服务器上的JSON文件，比对版本号，如果服务器上的版本比APP的版本高则会提示有新版本可以下载。\</p>
<p>客户端JavaScript代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateApp(){
    //检查新版本
    var updateApp = document.getElementById(&quot;updateApp&quot;);
    updateApp.onclick = function(){
        var _this = this;
        $.ajax({
            type:'get',
            url:'http://duni.sinaapp.com/demo/app.php?jsoncallback=?',
            dataType:'jsonp',
            beforeSend : function(){
                _this.innerHTML = &quot;<i class='iconfont updateAppIcon updateAppIconRotate'></i> 正在检查新版本...&quot;;
            },
            success:function(data){
                var newVer = data[0].version;
                if(newVer > appConfig.version){
                    var log = data[0].log;
                    var downloadUrl = data[0].downloadUrl;
                    if(confirm(&quot;检查到新版本【&quot;+newVer+&quot;】，是否立即下载？\n 更新日志：\n &quot; + log)){
                        var a = document.getElementById(&quot;telPhone&quot;);
                        a.href = downloadUrl;
                        a.target = &quot;_blank&quot;;
                        a.click();
                    }
                }else{
                    alert(&quot;你很潮哦，当前已经是最新版本！&quot;);
                }
                _this.innerHTML = &quot;<i class='iconfont updateAppIcon'></i> 检查新版本&quot;;
            },
            error:function(msg){
                _this.innerHTML = &quot;<i class='iconfont updateAppIcon'></i> 检查新版本&quot;;
                alert(&quot;检查失败：&quot;+msg.message);
            }
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateApp</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//检查新版本</span>
    <span class="hljs-keyword">var</span> updateApp = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"updateApp"</span>);
    updateApp.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
        $.ajax({
            <span class="hljs-attr">type</span>:<span class="hljs-string">'get'</span>,
            <span class="hljs-attr">url</span>:<span class="hljs-string">'http://duni.sinaapp.com/demo/app.php?jsoncallback=?'</span>,
            <span class="hljs-attr">dataType</span>:<span class="hljs-string">'jsonp'</span>,
            <span class="hljs-attr">beforeSend</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                _this.innerHTML = <span class="hljs-string">"&lt;i class='iconfont updateAppIcon updateAppIconRotate'&gt;&lt;/i&gt; 正在检查新版本..."</span>;
            },
            <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                <span class="hljs-keyword">var</span> newVer = data[<span class="hljs-number">0</span>].version;
                <span class="hljs-keyword">if</span>(newVer &gt; appConfig.version){
                    <span class="hljs-keyword">var</span> log = data[<span class="hljs-number">0</span>].log;
                    <span class="hljs-keyword">var</span> downloadUrl = data[<span class="hljs-number">0</span>].downloadUrl;
                    <span class="hljs-keyword">if</span>(confirm(<span class="hljs-string">"检查到新版本【"</span>+newVer+<span class="hljs-string">"】，是否立即下载？\n 更新日志：\n "</span> + log)){
                        <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"telPhone"</span>);
                        a.href = downloadUrl;
                        a.target = <span class="hljs-string">"_blank"</span>;
                        a.click();
                    }
                }<span class="hljs-keyword">else</span>{
                    alert(<span class="hljs-string">"你很潮哦，当前已经是最新版本！"</span>);
                }
                _this.innerHTML = <span class="hljs-string">"&lt;i class='iconfont updateAppIcon'&gt;&lt;/i&gt; 检查新版本"</span>;
            },
            <span class="hljs-attr">error</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
                _this.innerHTML = <span class="hljs-string">"&lt;i class='iconfont updateAppIcon'&gt;&lt;/i&gt; 检查新版本"</span>;
                alert(<span class="hljs-string">"检查失败："</span>+msg.message);
            }
        });
    }
}</code></pre>
<p>服务端JSON：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {
        &quot;version&quot;:&quot;3.1.0&quot;,
        &quot;downloadUrl&quot;:&quot;http://dunizb.b0.upaiyun.com/demo/app/myCalc-3.1.0.apk&quot;,
        &quot;hashCode&quot;:&quot;20160812224616&quot;,
        &quot;log&quot;:&quot;1.新增切换主题功能 \n 2.新增单手切换模式功能 \n 3.调整UI &quot;
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
    {
        <span class="hljs-attr">"version"</span>:<span class="hljs-string">"3.1.0"</span>,
        <span class="hljs-attr">"downloadUrl"</span>:<span class="hljs-string">"http://dunizb.b0.upaiyun.com/demo/app/myCalc-3.1.0.apk"</span>,
        <span class="hljs-attr">"hashCode"</span>:<span class="hljs-string">"20160812224616"</span>,
        <span class="hljs-attr">"log"</span>:<span class="hljs-string">"1.新增切换主题功能 \n 2.新增单手切换模式功能 \n 3.调整UI "</span>
    }
]</code></pre>
<h2 id="articleHeader4">下个版本计划</h2>
<p>当前3.1.0版本还存在一些问题：</p>
<ol>
<li><p>由于JS本身存在计算浮点数精度丢失问题，所以这个问题在项目中同意存在，需要自己去处理这个问题</p></li>
<li><p>由于使用了第三方的天气接口，用了jquery.Ajax方法，所以违背了使用纯原生写的初衷。</p></li>
</ol>
<p>所以下个版本的开发计划为：</p>
<ol>
<li><p>解决浮点数计算精度问题</p></li>
<li><p>把获取天气信息的jquery.Ajax方法替换为原生JavaScript代码，自己封装JSONP请求函数</p></li>
<li><p>使用面向对象方式重构APP</p></li>
</ol>
<p>欢迎大家到github上来看看，如果喜欢可以star、watch一下，或提issue。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
纯 HTML+CSS+JavaScript 编写的计算器应用

## 原文链接
[https://segmentfault.com/a/1190000006977116](https://segmentfault.com/a/1190000006977116)


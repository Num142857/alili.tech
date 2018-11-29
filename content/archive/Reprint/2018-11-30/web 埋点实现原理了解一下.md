---
title: 'web 埋点实现原理了解一下' 
date: 2018-11-30 2:30:11
hidden: true
slug: 3daonkv4btl
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>埋点，是网站分析的一种常用的数据采集方法。我们主要用来采集用户行为数据（例如页面访问路径，点击了什么元素）进行数据分析，从而让运营同学更加合理的安排运营计划。现在市面上有很多第三方埋点服务商，百度统计，友盟，growingIO 等大家应该都不太陌生，大多情况下大家都只是使用，最近我研究了下 web 埋点，你要不要了解下。</p>
<h3 id="articleHeader1">现有埋点三大类型</h3>
<blockquote>用户行为分析是一个大系统，一个典型的数据平台。由用户数据采集，用户行为建模分析，可视化报表展示几个模块构成。现有的埋点采集方案可以大致被分为三种，手动埋点，可视化埋点，无埋点</blockquote>
<ol>
<li>手动埋点<br>手动代码埋点比较常见，需要调用埋点的业务方在需要采集数据的地方调用埋点的方法。优点是流量可控，业务方可以根据需要在任意地点任意场景进行数据采集，采集信息也完全由业务方来控制。这样的有点也带来了一些弊端，需要业务方来写死方法，如果采集方案变了，业务方也需要重新修改代码，重新发布。</li>
<li>可视化埋点<br>可是化埋点是近今年的埋点趋势，很多大厂自己的数据埋点部门也都开始做这块。优点是业务方工作量少，缺点则是技术上推广和实现起来有点难（业务方前端代码规范是个大前提）。阿里的活动页很多都是运营通过可视化的界面拖拽配置实现，这些活动控件元素都带有唯一标识。通过埋点配置后台，将元素与要采集事件关联起来，可以自动生成埋点代码嵌入到页面中。</li>
<li>无埋点<br>无埋点则是前端自动采集全部事件，上报埋点数据，由后端来过滤和计算出有用的数据，优点是前端只要加载埋点脚本。缺点是流量和采集的数据过于庞大，服务器性能压力山大，主流的 GrowingIO 就是这种实现方案。</li>
</ol>
<p>我们暂时放弃可视化埋点的实现，在 <code>手动埋点</code> 和 <code>无埋点</code> 上进行了尝试，为了便于描述，下文我会称采集脚本为 SDK。</p>
<h3 id="articleHeader2">思考几个问题</h3>
<blockquote>埋点开发需要考虑很多内容，贯穿着不轻易动手写代码的原则，我们在开发前先思考下面这几个问题</blockquote>
<ol>
<li>我们要采集什么内容，进行哪些采集接口的约定</li>
<li>业务方通过什么方式来调用我们的采集脚本</li>
<li>手动埋点：SDK 需要封装一个方法给业务方进行调用，传参方式业务方可控</li>
<li>无埋点：考虑到数据量对于服务器的压力，我们需要对无埋点进行开关配置，可以配置进行哪些元素进行无埋点采集</li>
<li>用户标识：游客用户和登录用户的采集数据怎么进行区分关联</li>
<li>设备Id：用户通过浏览器来访问 web 页面，设备Id需要存储在浏览器上，同一个用户访问不同的业务方网站，设备Id要保持一样，怎么实现</li>
<li>单页面应用：现在流行的单页面应用和普通 web 页面的数据采集是否有差异</li>
<li>混合应用：app 与 h5 的混合应用我们要怎么进行通讯</li>
</ol>
<h4>我们要采集什么内容，进行哪些采集接口的约定</h4>
<p>第一期我们先实现对 PV（即页面浏览量或点击量） 、UV（一天内同个访客多次访问） 、点击量、用户的访问路径的基础指标的采集。精细化分析的流量转化需要和业务相关，需要和数据分析方做约定，我们预留扩展。所以我们的采集接口需要进行以下的约定</p>

<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;header&quot;:{ // HTTP 头部
        &quot;X-Device-Id&quot;:&quot; 550e8400-e29b-41d4-a716-446655440000&quot;, //设备ID，用来区分用户设备
        &quot;X-Source-Url&quot;:&quot;https://www.baidu.com/&quot;, //源地址，关联用户的整个操作流程，用于用户行为路径分析，例如登录，到首页，进入商品详情，退出这一整个完整的路径
        &quot;X-Current-Url&quot;:&quot;&quot;, //当前地址，用户行为发生的页面
        &quot;X-User-Id&quot;:&quot;&quot;,//用户ID，统计登录用户行为
    },
    &quot;body&quot;:[{ // HTTP Body体
        &quot;PageSessionID&quot;:&quot;&quot;, //页面标识ID，用来区分页面事件，例如加载和离开我们会发两个事件，这个标识可以让我们知道这个事件是发生在一个页面上
        &quot;Event&quot;:&quot;loaded&quot;, //事件类型，区分用户行为事件
        &quot;PageTitle&quot;:  &quot;埋点测试页&quot;,  //页面标题，直观看到用户访问页面
        &quot;CurrentTime&quot;:  “1517798922201”,  //事件发生的时间
        &quot;ExtraInfo&quot;:  {
         }    //扩展字段，对具体业务分析的传参
    }]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>{
    <span class="hljs-string">"header"</span>:{ <span class="hljs-comment">// HTTP 头部</span>
        <span class="hljs-string">"X-Device-Id"</span>:<span class="hljs-string">" 550e8400-e29b-41d4-a716-446655440000"</span>, <span class="hljs-comment">//设备ID，用来区分用户设备</span>
        <span class="hljs-string">"X-Source-Url"</span>:<span class="hljs-string">"https://www.baidu.com/"</span>, <span class="hljs-comment">//源地址，关联用户的整个操作流程，用于用户行为路径分析，例如登录，到首页，进入商品详情，退出这一整个完整的路径</span>
        <span class="hljs-string">"X-Current-Url"</span>:<span class="hljs-string">""</span>, <span class="hljs-comment">//当前地址，用户行为发生的页面</span>
        <span class="hljs-string">"X-User-Id"</span>:<span class="hljs-string">""</span>,<span class="hljs-comment">//用户ID，统计登录用户行为</span>
    },
    <span class="hljs-string">"body"</span>:[{ <span class="hljs-comment">// HTTP Body体</span>
        <span class="hljs-string">"PageSessionID"</span>:<span class="hljs-string">""</span>, <span class="hljs-comment">//页面标识ID，用来区分页面事件，例如加载和离开我们会发两个事件，这个标识可以让我们知道这个事件是发生在一个页面上</span>
        <span class="hljs-string">"Event"</span>:<span class="hljs-string">"loaded"</span>, <span class="hljs-comment">//事件类型，区分用户行为事件</span>
        <span class="hljs-string">"PageTitle"</span>:  <span class="hljs-string">"埋点测试页"</span>,  <span class="hljs-comment">//页面标题，直观看到用户访问页面</span>
        <span class="hljs-string">"CurrentTime"</span>:  “<span class="hljs-number">1517798922201</span>”,  <span class="hljs-comment">//事件发生的时间</span>
        <span class="hljs-string">"ExtraInfo"</span>:  {
         }    <span class="hljs-comment">//扩展字段，对具体业务分析的传参</span>
    }]
}
</code></pre>

<p>以上就是我们现在约定好了的通用的事件采集的接口，所传的参数基本上会根据采集事件的不同而发生变化。但是在用户的整一个访问行为中，用户的设备是不会变化的，如果你想采集设备信息可以重新约定一个接口，在整个采集开始之前发送设备信息，这样可以避免在事件采集接口上重复采集固定数据。</p>

<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;header&quot;:{ // HTTP 头部
          &quot;X-Device-Id&quot;  ：&quot;550e8400-e29b-41d4-a716-446655440000&quot;  ,      //  设备id
    },
    &quot;body&quot;:{ // HTTP Body体
              &quot;DeviceType&quot;:  &quot;web&quot; ,   //设备类型
             &quot;ScreenWide&quot;  :  768 , //  屏幕宽
             &quot;ScreenHigh&quot;:  1366 , //  屏幕高
             &quot;Language&quot;:    &quot;zh-cn&quot;  //语言
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>{
    <span class="hljs-string">"header"</span>:{ <span class="hljs-comment">// HTTP 头部</span>
          <span class="hljs-string">"X-Device-Id"</span>  ：<span class="hljs-string">"550e8400-e29b-41d4-a716-446655440000"</span>  ,      <span class="hljs-comment">//  设备id</span>
    },
    <span class="hljs-string">"body"</span>:{ <span class="hljs-comment">// HTTP Body体</span>
              <span class="hljs-string">"DeviceType"</span>:  <span class="hljs-string">"web"</span> ,   <span class="hljs-comment">//设备类型</span>
             <span class="hljs-string">"ScreenWide"</span>  :  <span class="hljs-number">768</span> , <span class="hljs-comment">//  屏幕宽</span>
             <span class="hljs-string">"ScreenHigh"</span>:  <span class="hljs-number">1366</span> , <span class="hljs-comment">//  屏幕高</span>
             <span class="hljs-string">"Language"</span>:    <span class="hljs-string">"zh-cn"</span>  <span class="hljs-comment">//语言</span>
    }
}
</code></pre>

<h4>业务方通过什么方式来调用我们的采集脚本</h4>
<p>埋点应该让调用的业务方，尽可能少有工作量，最好是什么都不用做，😁，但是实现起来有点难额。我们采用的方案是让业务方在代码里通过 script 脚本来引用我们的 SDK ，业务方只要配置一些需要的参数进行埋点定制（👆我们讲到过的无埋点的流量控制），然后什么都不做就可以进行基础数据的采集。</p>

<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
            var collect = document.createElement('script');
            collect.type = 'text/javascript';
            collect.async = true;
            collect.src =  'http://collect.trc.com/index.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(collect, s);
    })();


//用户自定义要进行无埋点采集的元素，如果不进行无埋点采集，可以不配置
 var _XT = [];
  _XT.push(['Target','div']);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> collect = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
            collect.type = <span class="hljs-string">'text/javascript'</span>;
            collect.async = <span class="hljs-literal">true</span>;
            collect.src =  <span class="hljs-string">'http://collect.trc.com/index.js'</span>;
            <span class="hljs-keyword">var</span> s = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'script'</span>)[<span class="hljs-number">0</span>];
            s.parentNode.insertBefore(collect, s);
    })();


<span class="hljs-comment">//用户自定义要进行无埋点采集的元素，如果不进行无埋点采集，可以不配置</span>
 <span class="hljs-keyword">var</span> _XT = [];
  _XT.push([<span class="hljs-string">'Target'</span>,<span class="hljs-string">'div'</span>]);
</code></pre>

<h4>手动埋点：SDK</h4>
<p>如果业务方需要采集更多业务定制的数据，可以调用我们暴露出的方法进行采集<br><code></code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//自定义事件
  sdk.dispatch('customEvent',{extraInfo:'自定义事件的额外信息'})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//自定义事件</span>
  sdk.dispatch(<span class="hljs-string">'customEvent'</span>,{<span class="hljs-string">extraInfo:</span><span class="hljs-string">'自定义事件的额外信息'</span>})
</code></pre>

<h4>游客与用户关联</h4>
<p>我们使用 userId 来做用户标识，同一个设备的用户，从游客用户切换到登录用户，如果我们要把他们关联起来，需要有一个设备Id 做关联</p>
<h4>web 设备Id</h4>
<p>用户通过浏览器来访问 web 页面，设备Id需要存储在浏览器上，同一个用户访问不同的业务方网站，设备Id要保持一样。web 变量存储，我们第一时间想到的就是 cookie，sessionStorage，localStorage，但是这3种存储方式都和访问资源的域名相关。我们总不能每次访问一个网站就新建一个设备指纹吧，所以我们需要通过一个方法来跨域共享设备指纹</p>
<p>我们想到的方案是，通过嵌套 iframe 加载一个静态页面，在 iframe 上加载的域名上存储设备id，通过跨域共享变量获取设备id，共享变量的原理是采用了iframe 的 contentWindow通讯，通过 postMessage 获取事件状态，调用封装好的回调函数进行数据处理具体的实现方式</p>

<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//web 应用，通过嵌入 iframe 进行跨域 cookie 通讯，设置设备id,
    collect.setIframe = function () {
        var that = this
        var iframe = document.createElement('iframe')
        iframe.id = &quot;frame&quot;,
        iframe.src = 'http://collectiframe.trc.com' // 配置域名代理，目的是让开发测试生产环境代码一致
        iframe.style.display='none' //iframe 设置的目的是用来生成固定的设备id，不展示
        document.body.appendChild(iframe)

        iframe.onload = function () {
                iframe.contentWindow.postMessage('loaded','*');
        }

        //监听message事件，iframe 加载完成，获取设备id ，进行相关的数据采集
        helper.on(window,&quot;message&quot;,function(event){
            that.deviceId = event.data.deviceId

            if(event.data &amp;&amp; event.data.type == 'loaded'){
                that.sendDevice(that.getDevice(), that.deviceUrl);
                setTimeout(function () {
                    that.send(that.beforeload)
                    that.send(that.loaded)
                },1000)
            }
        })
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//web 应用，通过嵌入 iframe 进行跨域 cookie 通讯，设置设备id,</span>
    collect.setIframe = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>
        <span class="hljs-keyword">var</span> iframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>)
        iframe.id = <span class="hljs-string">"frame"</span>,
        iframe.src = <span class="hljs-string">'http://collectiframe.trc.com'</span> <span class="hljs-comment">// 配置域名代理，目的是让开发测试生产环境代码一致</span>
        iframe.style.display=<span class="hljs-string">'none'</span> <span class="hljs-comment">//iframe 设置的目的是用来生成固定的设备id，不展示</span>
        <span class="hljs-built_in">document</span>.body.appendChild(iframe)

        iframe.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                iframe.contentWindow.postMessage(<span class="hljs-string">'loaded'</span>,<span class="hljs-string">'*'</span>);
        }

        <span class="hljs-comment">//监听message事件，iframe 加载完成，获取设备id ，进行相关的数据采集</span>
        helper.on(<span class="hljs-built_in">window</span>,<span class="hljs-string">"message"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            that.deviceId = event.data.deviceId

            <span class="hljs-keyword">if</span>(event.data &amp;&amp; event.data.type == <span class="hljs-string">'loaded'</span>){
                that.sendDevice(that.getDevice(), that.deviceUrl);
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    that.send(that.beforeload)
                    that.send(that.loaded)
                },<span class="hljs-number">1000</span>)
            }
        })
    }
</code></pre>

<p>iframe 与 SDK 通讯</p>

<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function receiveMessageFromIndex ( event ) {
    getDeviceInfo() // 获取设备信息
    var data =  {
            deviceId: _deviceId,
            type:event.data
    }

    event.source.postMessage(data, '*'); // 将设备信息发送给 SDK
}

//监听message事件
if(window.addEventListener){
        window.addEventListener(&quot;message&quot;, receiveMessageFromIndex, false);
}else{
        window.attachEvent(&quot;onmessage&quot;, receiveMessageFromIndex, false)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">receiveMessageFromIndex</span> (<span class="hljs-params"> event </span>) </span>{
    getDeviceInfo() <span class="hljs-comment">// 获取设备信息</span>
    <span class="hljs-keyword">var</span> data =  {
            <span class="hljs-attr">deviceId</span>: _deviceId,
            <span class="hljs-attr">type</span>:event.data
    }

    event.source.postMessage(data, <span class="hljs-string">'*'</span>); <span class="hljs-comment">// 将设备信息发送给 SDK</span>
}

<span class="hljs-comment">//监听message事件</span>
<span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.addEventListener){
        <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"message"</span>, receiveMessageFromIndex, <span class="hljs-literal">false</span>);
}<span class="hljs-keyword">else</span>{
        <span class="hljs-built_in">window</span>.attachEvent(<span class="hljs-string">"onmessage"</span>, receiveMessageFromIndex, <span class="hljs-literal">false</span>)
</code></pre>

<p>如果你想知道可以看我的另一篇博客 <a href="https://bailinlin.github.io/2018/03/05/cookie-share/" rel="nofollow noreferrer" target="_blank">web 浏览器指纹跨域共享</a></p>
<h4>单页面应用：现在流行的单页面应用和普通 web 页面的数据采集是否有差异</h4>
<blockquote>我们知道单页面应用都是无刷新的页面加载，所以我们在页面<code>跳转</code>的处理和我们的普通的页面会有所不同。单页面应用的路由插件运用了 window 自带的无刷新修改用户浏览记录的方法，pushState 和 replaceState。</blockquote>
<p>window 的 history 对象 提供了两个方法，能够无刷新的修改用户的浏览记录，pushSate，和 replaceState，区别的 pushState 在用户访问页面后面添加一个访问记录， replaceState 则是直接替换了当前访问记录，所以我们只要改写 history 的方法，在方法执行前执行我们的采集方法就能实现对单页面应用的页面跳转事件的采集了</p>

<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // 改写思路：拷贝 window 默认的 replaceState 函数，重写 history.replaceState 在方法里插入我们的采集行为，在重写的 replaceState 方法最后调用，window 默认的 replaceState 方法

    collect = {}
    collect.onPushStateCallback : function(){}  // 自定义的采集方法

    (function(history){
        var replaceState = history.replaceState;   // 存储原生 replaceState
        history.replaceState = function(state, param) {     // 改写 replaceState
           var url = arguments[2];
           if (typeof collect.onPushStateCallback == &quot;function&quot;) {
                 collect.onPushStateCallback({state: state, param: param, url: url});   //自定义的采集行为方法
           }
           return replaceState.apply(history, arguments);    // 调用原生的 replaceState
        };
     })(window.history);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code> <span class="hljs-comment">// 改写思路：拷贝 window 默认的 replaceState 函数，重写 history.replaceState 在方法里插入我们的采集行为，在重写的 replaceState 方法最后调用，window 默认的 replaceState 方法</span>

    collect = {}
    <span class="hljs-attribute">collect.onPushStateCallback</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}  <span class="hljs-comment">// 自定义的采集方法</span>

    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">history</span>)</span>{
        <span class="hljs-built_in">var</span> replaceState = history.replaceState;   <span class="hljs-comment">// 存储原生 replaceState</span>
        history.replaceState = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">state, param</span>) </span>{     <span class="hljs-comment">// 改写 replaceState</span>
           <span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>];
           <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> collect.onPushStateCallback == <span class="hljs-string">"function"</span>) {
                 collect.onPushStateCallback({<span class="hljs-attribute">state</span>: state, <span class="hljs-attribute">param</span>: param, <span class="hljs-attribute">url</span>: <span class="hljs-built_in">url</span>});   <span class="hljs-comment">//自定义的采集行为方法</span>
           }
           <span class="hljs-keyword">return</span> replaceState.apply(history, <span class="hljs-built_in">arguments</span>);    <span class="hljs-comment">// 调用原生的 replaceState</span>
        };
     })(<span class="hljs-built_in">window</span>.history);
</code></pre>

<p>这块介绍起来也比较的复杂，如果你想了解更多，可以看我的另一篇博客<a href="https://bailinlin.github.io/2018/04/28/history/" rel="nofollow noreferrer" target="_blank">你需要知道的单页面路由实现原理</a></p>
<h4>混合应用：app 与 h5 的混合应用我们要怎么进行通讯</h4>
<blockquote>现在大部分的应用都不是纯原生的应用， app 与 h5 的混合的应用是现在的一种主流。</blockquote>
<p>纯 web 数据采集我们考虑到前端存储数据容易丢失，我们在每一次事件触发的时候都用采集接口传输采集到的数据。考虑到现在很多用户的手机会有流量管家的软件监控，如果在 App 中 h5 还是采集到数据就传输给服务端，很有可能会让流量管家检测到，给用户报警，从而使得用户不再信任你的 App , 所以我们在用户操作的时候将数据传给 app 端，存储到 app。用户切换应用到后台的时候，通过 app 端的 SDK 打包传输到服务器，我们给 app 提供的方法封装了一个适配器</p>

<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app 与 h5 混合应用，直接将数信息发给 app
collect.saveEvent = function (jsonString) {

    collect.dcpDeviceType &amp;&amp; setTimeout(function () {
        if(collect.dcpDeviceType=='android'){
            android.saveEvent(jsonString)
        } else {
            window.webkit &amp;&amp; window.webkit.messageHandlers ? window.webkit.messageHandlers.nativeBridge.postMessage(jsonString) : window.postBridgeMessage(jsonString)
        }

    },1000)
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// app 与 h5 混合应用，直接将数信息发给 app</span>
collect.saveEvent = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">jsonString</span>) </span>{

    collect.dcpDeviceType &amp;&amp; setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span>(collect.dcpDeviceType==<span class="hljs-string">'android'</span>){
            android.saveEvent(jsonString)
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">window</span>.webkit &amp;&amp; <span class="hljs-built_in">window</span>.webkit.messageHandlers ? <span class="hljs-built_in">window</span>.webkit.messageHandlers.nativeBridge.postMessage(jsonString) : <span class="hljs-built_in">window</span>.postBridgeMessage(jsonString)
        }

    },<span class="hljs-number">1000</span>)
    }
</code></pre>

<h3 id="articleHeader3">实现思路</h3>
<blockquote>通过上面几个问题的思考，我们对埋点的实现大致已经有了一些想法，我们使用思维导图来还原下我们即将要做的事情，图片记得放大看哦，太小了可能看不清。</blockquote>
<p>我们需要暴露给业务方调用的方法</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014922673?w=822&amp;h=397" src="https://static.alili.tech/img/remote/1460000014922673?w=822&amp;h=397" alt="暴露方法" title="暴露方法" style="cursor: pointer; display: inline;"></span><br> 我们需要处理的事件类型<br><span class="img-wrap"><img data-src="/img/remote/1460000014922674?w=1292&amp;h=580" src="https://static.alili.tech/img/remote/1460000014922674?w=1292&amp;h=580" alt="监听事件" title="监听事件" style="cursor: pointer; display: inline;"></span><br>SDK 的基本实现思路<br><span class="img-wrap"><img data-src="/img/remote/1460000014922675?w=1623&amp;h=721" src="https://static.alili.tech/img/remote/1460000014922675?w=1623&amp;h=721" alt="实现逻辑" title="实现逻辑" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">我们来看下几个核心代码的实现</h3>
<h4>工具方法</h4>
<p>我们定义了几个工具方法，提高开发的幸福指数 😝</p>

<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var helper = {};

    // 生成一个唯一的标识，pageSessionId （用这个变量来关联开始加载、加载完成、离开页面的事件，计算出页面加菜时间，停留时间）
    helper.uuid = function(){}

    // 元素绑定事件监听，兼容浏览器到IE8
    helper.on = function(){}

    //元素移除事件监听的适配器函数，兼容浏览器到IE8
    helper.remove = function(){}

    //将json转为字符串,事件传输的参数类型转化
    helper.changeJSON2Query = function(){}

    //将相对路径解析成文档全路径
    helper.normalize = function(){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-keyword">var</span> helper = {};

    <span class="hljs-comment">// 生成一个唯一的标识，pageSessionId （用这个变量来关联开始加载、加载完成、离开页面的事件，计算出页面加菜时间，停留时间）</span>
    helper.uuid = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">// 元素绑定事件监听，兼容浏览器到IE8</span>
    helper.on = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//元素移除事件监听的适配器函数，兼容浏览器到IE8</span>
    helper.remove = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//将json转为字符串,事件传输的参数类型转化</span>
    helper.changeJSON2Query = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//将相对路径解析成文档全路径</span>
    helper.normalize = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}</code></pre>

<h4>采集逻辑</h4>

<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var collect = {
        deviceUrl:'http://collect.trc.com/rest/collect/device/h5/v1',
        eventUrl:'http://collect.trc.com/rest/collect/event/h5/v1',
        isuploadUrl:'http://collect.trc.com/rest/collect/isupload/app/v1',
        parmas:{ ExtraInfo:{} },
        device:{}
    };

    //获取埋点配置
    collect.setParames = function(){}

    //更新访问路径及页面信息
    collect.updatePageInfo = function(){}

    //获取事件参数
    collect.getParames = function(){}

    //获取设备信息
    collect.getDevice = function(){}

    //事件采集
    collect.send = function(){}

    //设备采集
    collect.sendDevice = function(){}

    //判断才否采集，埋点采集的开关
    collect.isupload = function(){

        1. 判断是否采集，不采集就注销事件监听（项目中区分游客身份和用户身份的采集情况，这个方法会被判断两次）
        2. 采集则判断是否已经采集过
            a.已经采集过不做任何操作
            b.没有采集过添加事件监听
        3. 判断是 混合应用还是纯 web 应用
            a.如果是web 应用，调用 collect.setIframe 设置 iframe
            b.如果是混合应用 将开始加载和加载完成事件传输给 app
    }

    //点击事件处理函数
    collect.clickHandler = function(){}

    //离开页面的事件处理函数
    collect.beforeUnloadHandler = function(){}

    //页面回退事件处理函数
    collect.onPopStateHandler = function(){}

    //系统事件初始化，注册离开事件，浏览器后退事件
    collect.event = function(){}

    //获取记录开始加载数据信息
    collect.getBeforeload = function(){}

    //存储加载完成，获取设备类型，记录加载完成信息
    collect.onload = function(){

        1. 判断cookie是否有存设备类型信息，有表示混合应用
        2. 采集加载完成时间等信息
        3. 调用 collect.isupload 判断是否进行采集
    }

    //web 应用，通过嵌入 iframe 进行跨域 cookie 通讯，设置设备id
    collect.setIframe = function(){}

    //app 与 h5 混合应用，直接将数信息发给 app,判断设备类型做原生方法适配器
    collect.saveEvent = function(){}

    //采集自定义事件类型
    collect.dispatch = function(){}

    //将参数 userId 存入sessionStorage
    collect.storeUserId = function(){}

    //采集H5信息,如果是混合应用，将采集到的信息发送给 app 端
    collect.saveEventInfo = function(){}

    //页面初始化调用方法
    collect.init = function(){

        1. 获取开始加载的采集信息
        2. 获取 SDK 配置信息，设备信息
        3. 改写 history 两个方法，单页面应用页面跳转前调用我们自己的方法
        4. 页面加载完成，调用 collect.onload 方法

    }


    collect.init(); // 初始化

    //暴露给业务方调用的方法
    return {
        dispatch:collect.dispatch,
        storeUserId:collect.storeUserId,
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-keyword">var</span> collect = {
        deviceUrl:<span class="hljs-string">'http://collect.trc.com/rest/collect/device/h5/v1'</span>,
        eventUrl:<span class="hljs-string">'http://collect.trc.com/rest/collect/event/h5/v1'</span>,
        isuploadUrl:<span class="hljs-string">'http://collect.trc.com/rest/collect/isupload/app/v1'</span>,
        parmas:{ ExtraInfo:{} },
        device:{}
    };

    <span class="hljs-comment">//获取埋点配置</span>
    collect.setParames = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//更新访问路径及页面信息</span>
    collect.updatePageInfo = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//获取事件参数</span>
    collect.getParames = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//获取设备信息</span>
    collect.getDevice = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//事件采集</span>
    collect.send = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//设备采集</span>
    collect.sendDevice = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//判断才否采集，埋点采集的开关</span>
    collect.isupload = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{

        <span class="hljs-number">1.</span> 判断是否采集，不采集就注销事件监听（项目中区分游客身份和用户身份的采集情况，这个方法会被判断两次）
        <span class="hljs-number">2.</span> 采集则判断是否已经采集过
            a.已经采集过不做任何操作
            b.没有采集过添加事件监听
        <span class="hljs-number">3.</span> 判断是 混合应用还是纯 web 应用
            a.如果是web 应用，调用 collect.setIframe 设置 iframe
            b.如果是混合应用 将开始加载和加载完成事件传输给 app
    }

    <span class="hljs-comment">//点击事件处理函数</span>
    collect.clickHandler = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//离开页面的事件处理函数</span>
    collect.beforeUnloadHandler = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//页面回退事件处理函数</span>
    collect.onPopStateHandler = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//系统事件初始化，注册离开事件，浏览器后退事件</span>
    collect.event = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//获取记录开始加载数据信息</span>
    collect.getBeforeload = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//存储加载完成，获取设备类型，记录加载完成信息</span>
    collect.onload = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{

        <span class="hljs-number">1.</span> 判断cookie是否有存设备类型信息，有表示混合应用
        <span class="hljs-number">2.</span> 采集加载完成时间等信息
        <span class="hljs-number">3.</span> 调用 collect.isupload 判断是否进行采集
    }

    <span class="hljs-comment">//web 应用，通过嵌入 iframe 进行跨域 cookie 通讯，设置设备id</span>
    collect.setIframe = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//app 与 h5 混合应用，直接将数信息发给 app,判断设备类型做原生方法适配器</span>
    collect.saveEvent = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//采集自定义事件类型</span>
    collect.dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//将参数 userId 存入sessionStorage</span>
    collect.storeUserId = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//采集H5信息,如果是混合应用，将采集到的信息发送给 app 端</span>
    collect.saveEventInfo = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{}

    <span class="hljs-comment">//页面初始化调用方法</span>
    collect.init = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{

        <span class="hljs-number">1.</span> 获取开始加载的采集信息
        <span class="hljs-number">2.</span> 获取 SDK 配置信息，设备信息
        <span class="hljs-number">3.</span> 改写 history 两个方法，单页面应用页面跳转前调用我们自己的方法
        <span class="hljs-number">4.</span> 页面加载完成，调用 collect.onload 方法

    }


    collect.init(); <span class="hljs-comment">// 初始化</span>

    <span class="hljs-comment">//暴露给业务方调用的方法</span>
    <span class="hljs-keyword">return</span> {
        dispatch:collect.dispatch,
        storeUserId:collect.storeUserId,
    }</code></pre>

<h3 id="articleHeader5">扩展</h3>
<blockquote>👆就是我这段时间研究的成果了，代码的篇幅比较长，就不放在博客里了，感兴趣的同学可以加我微信进行交流，或则在文章下面留言，也欢迎大家给我提意见，帮忙优化 😝。</blockquote>
<p><a href="https://bailinlin.github.io/2018/03/05/cookie-share/" rel="nofollow noreferrer" target="_blank">web 浏览器指纹跨域共享</a></p>
<p><a href="https://bailinlin.github.io/2018/04/28/history/" rel="nofollow noreferrer" target="_blank">你需要知道的单页面路由实现原理</a></p>
<p><a href="https://www.zhihu.com/question/36411025" rel="nofollow noreferrer" target="_blank">数据埋点是什么？设置埋点的意义是什么？</a></p>
<p><a href="https://sensorsdata.cn/blog/shu-ju-jie-ru-yu-mai-dian/" rel="nofollow noreferrer" target="_blank">数据采集与埋点</a></p>
<p><a href="https://tech.meituan.com/mt-mobile-analytics-practice.html" rel="nofollow noreferrer" target="_blank">美团点评前端无痕埋点实践</a></p>
<p><a href="https://www.zhihu.com/question/20448467" rel="nofollow noreferrer" target="_blank">如何清楚易懂的解释“UV和PV＂的定义</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
web 埋点实现原理了解一下

## 原文链接
[https://segmentfault.com/a/1190000014922668](https://segmentfault.com/a/1190000014922668)


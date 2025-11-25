---
title: '原生App与javascript交互之JSBridge接口原理、设计与实现' 
date: 2019-01-28 2:30:09
hidden: true
slug: 5fkvaxjlg1u
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>前期调研</strong></h2>
<p>调研对象：<br>支付宝，微信，云之家</p>
<p>调研文档：<br><a href="http://blog.csdn.net/namepeng/article/details/52778194" rel="nofollow noreferrer" target="_blank">Android中JS与Java的极简交互库 SimpleJavaJsBridge</a></p>
<h2 id="articleHeader1"><strong>设计需求</strong></h2>
<ol>
<li><p>阅读类型的业务功能页面需要由前端H5实现，需要做到服务端可控；</p></li>
<li><p>页面界面更改减少重新发布新版本的频率；</p></li>
<li><p>功能页面部分原型需求无法实现，需要原生功能支持；</p></li>
<li><p>对未来业务功能的拓展，方便迭代；</p></li>
</ol>
<h2 id="articleHeader2"><strong>作用和意义</strong></h2>
<ol>
<li><p>定制化JSBridge实际上是拓展NativeApp的hybrid程度, 参照微信和支付宝，可打造APP强力的生态圈；</p></li>
<li><p>jsBridge在支付，钱包，媒体拓展，图片处理，活动页面，用户地理位置网络状态都能得到原生强有力支持；</p></li>
<li><p>对于阅读性页面有更多拓展；</p></li>
</ol>
<h2 id="articleHeader3"><strong>优秀的通信设计方案</strong></h2>
<blockquote><ol>
<li><p>前端和Native对对方的细节知道的越少越好，减少耦合度，暴露的接口尽量控制在5个以内;</p></li>
<li><p>js与Native之间的通信，最好定义一套通信协议或者规则，减少js代码为兼容不同系统而过多if;</p></li>
<li><p>主动发送消息给对方时，对方尽量对该消息进行反馈，即使无需求对某些功能做反馈，减少if判断的兼容代码;</p></li>
</ol></blockquote>
<h2 id="articleHeader4"><strong>实现方式(交互形式)</strong></h2>
<h3 id="articleHeader5"><strong>Native 调用 JS </strong></h3>
<p>使用前端暴露在window下的一个方法或者一个对象的方法;<br><code>_handlerFromApp(message)</code><br><code>JSBridge._handlerFromApp(message)</code></p>
<p>方法名: <code>handlerFromApp</code><br>参数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="message: {
  cbId  : &quot;cb_(:id)_(:timeStamp)&quot;,      //回调函数的id
  status: 0,                            //状态数据 (0:失败, 1:成功)
  msg   : &quot;ok&quot;,                         //反馈的消息
  data  : {
    //...                               //一些处理后的数据
  } 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">message: {
  <span class="hljs-attr">cbId</span>  : <span class="hljs-string">"cb_(:id)_(:timeStamp)"</span>,      <span class="hljs-comment">//回调函数的id</span>
  status: <span class="hljs-number">0</span>,                            <span class="hljs-comment">//状态数据 (0:失败, 1:成功)</span>
  msg   : <span class="hljs-string">"ok"</span>,                         <span class="hljs-comment">//反馈的消息</span>
  data  : {
    <span class="hljs-comment">//...                               //一些处理后的数据</span>
  } 
}</code></pre>
<p>以下提供的部分参考方法<br>未对其进行真实测试，因为我使用的是iframe的方法，但原理几乎相同<br>建议封装后提供给Native开发工程师放入对应的APP包中，在webView读取页面的时候用对应的Native语言注入页面，避免页面在前端导入被抓取;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var doc = JSBridge || window;
var uniqueId = 1;
var invokeCBMap = {};
var listenCBMap = {};

//
function _send(type, funcName, data, cb) {
  var _id = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
  data.cbId = _id;
  if (type == 'invoke') 
    invokeCBMap[_id] = cb;
  else if (type == 'listen')
    listenCBMap[_id] = cb;
  doc[type](funcName, data);
}
doc._handlerFromApp = function(msg) {
  var _id = msg.cbId,
      callback;
  if (_id) {
    callback = invokeCBMap[_id] || listenCBMap[_id];
    if (callback) {
      delete msg.cbId;
      callback(msg.data);
      delete invokeCBMap[_id];
    } else {
      console.error('不存在该回调方法');
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> doc = JSBridge || <span class="hljs-built_in">window</span>;
<span class="hljs-keyword">var</span> uniqueId = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> invokeCBMap = {};
<span class="hljs-keyword">var</span> listenCBMap = {};

<span class="hljs-comment">//</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_send</span>(<span class="hljs-params">type, funcName, data, cb</span>) </span>{
  <span class="hljs-keyword">var</span> _id = <span class="hljs-string">'cb_'</span> + (uniqueId++) + <span class="hljs-string">'_'</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
  data.cbId = _id;
  <span class="hljs-keyword">if</span> (type == <span class="hljs-string">'invoke'</span>) 
    invokeCBMap[_id] = cb;
  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (type == <span class="hljs-string">'listen'</span>)
    listenCBMap[_id] = cb;
  doc[type](funcName, data);
}
doc._handlerFromApp = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
  <span class="hljs-keyword">var</span> _id = msg.cbId,
      callback;
  <span class="hljs-keyword">if</span> (_id) {
    callback = invokeCBMap[_id] || listenCBMap[_id];
    <span class="hljs-keyword">if</span> (callback) {
      <span class="hljs-keyword">delete</span> msg.cbId;
      callback(msg.data);
      <span class="hljs-keyword">delete</span> invokeCBMap[_id];
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'不存在该回调方法'</span>);
    }
  }
}</code></pre>
<h3 id="articleHeader6"><strong>JS调用Native</strong></h3>
<p>以下只介绍前两个方法，第三个和第二个比较类似</p>
<ul>
<li><p>A. Native暴露一个含有通信方法的类给web调用</p></li>
<li><p>B. Native拦截iframe请求</p></li>
<li><p>C. Native拦截prompt弹出框</p></li>
</ul>
<h4>A 一个包含调用方法的类</h4>
<p>iOS    : 可使用javascriptCore      <br>Android: 直接使用WebView的addJavascriptInterface方法</p>
<p><strong>将一个js对象绑定到一个Native类，在类中实现相应的函数，当js需要调用Native的方法时，只需要直接在js中通过绑定的对象调用相应的函数</strong></p>
<p>确定对象名称: <code>(:AppName)JSBridge</code></p>
<p>Native提供的对象含有的方法:</p>
<ul>
<li><p><code>invoke(funcName, data)</code></p></li>
<li><p><code>listen(funcName, data)</code></p></li>
</ul>
<p><code>invoke</code>:用于web页面调用Native私有方法的通用方法<br><strong>参数</strong>: <code>funcName</code>， <code>data</code><br><code>funcName</code>：对应为Native内部私有方法的方法名或映射<br><code>data</code>    ：web传递给Native的必要数据<br><code>data</code>数据结构如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  cbId : &quot;cb_(:id)_(:timeStamp)&quot;,  //回调函数的id
  msg  : {}                        //提供给使用方法执行的一些参数
}
/** 
  //1.拿wx参考为例
  wx.previewImg({
    current: 'http://xxx_1.png',
    urls   : [
      'http: //xxx_0.png',
      'http: //xxx_1.png',
      'http: //xxx_2.png',
      'http: //xxx_3.png',
    ]
  });
  //2.因为wx对jsbridge进行了一次封装,jssdk, 而我们在未封装时应该如下使用
  JSBridge.invoke('imagePreview', {
    cbId : &quot;cb_(:id)_(:timeStamp)&quot;,
    msg : {
      current: 'http://xxx_1.png',
      urls   : [
        'http: //xxx_0.png',
        'http: //xxx_1.png',
        'http: //xxx_2.png',
        'http: //xxx_3.png',
      ]
    }
  });
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">cbId</span> : <span class="hljs-string">"cb_(:id)_(:timeStamp)"</span>,  <span class="hljs-comment">//回调函数的id</span>
  msg  : {}                        <span class="hljs-comment">//提供给使用方法执行的一些参数</span>
}
<span class="hljs-comment">/** 
  //1.拿wx参考为例
  wx.previewImg({
    current: 'http://xxx_1.png',
    urls   : [
      'http: //xxx_0.png',
      'http: //xxx_1.png',
      'http: //xxx_2.png',
      'http: //xxx_3.png',
    ]
  });
  //2.因为wx对jsbridge进行了一次封装,jssdk, 而我们在未封装时应该如下使用
  JSBridge.invoke('imagePreview', {
    cbId : "cb_(:id)_(:timeStamp)",
    msg : {
      current: 'http://xxx_1.png',
      urls   : [
        'http: //xxx_0.png',
        'http: //xxx_1.png',
        'http: //xxx_2.png',
        'http: //xxx_3.png',
      ]
    }
  });
*/</span></code></pre>
<p>那么当调用之后，Native执行完成对应的私有方法后，执行一次我们提供的回调接口，以下是javascript的语法，请Native开发工程师对应修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSBridge.handlerFromApp({
  cbId  : &quot;cb_(:id)_(:timeStamp)&quot;, //web传给Native的cbId
  status: 1,                       //状态数据 (0:失败, 1:成功)
  msg   : &quot;预览成功&quot;, 
  data  : {} 
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">JSBridge.handlerFromApp({
  <span class="hljs-attr">cbId</span>  : <span class="hljs-string">"cb_(:id)_(:timeStamp)"</span>, <span class="hljs-comment">//web传给Native的cbId</span>
  status: <span class="hljs-number">1</span>,                       <span class="hljs-comment">//状态数据 (0:失败, 1:成功)</span>
  msg   : <span class="hljs-string">"预览成功"</span>, 
  <span class="hljs-attr">data</span>  : {} 
});</code></pre>
<p><code>listen</code>是一个用于web页面监听Native方法实现的通用方法<br><strong>使用环境</strong>: 不属于web页面上的操作。当用户直接操作Native上的功能来影响或发送数据给web，或者操作的功能需要用到web页面上的数据，我们需要告知Native我们希望能收到回调;<br>例子：<br><strong>微信监听分享操作</strong></p>
<ol>
<li><p>分享的内容是web上的内容（标题，描述，图片）;</p></li>
<li><p>获取分享操作是否完成和分享操作的数据收集;</p></li>
<li><p>分享按钮是原生APP提供；</p></li>
</ol>
<p>数据结构和操作与<code>invoke</code>相似，对应Native开发哥们接收到listen操作后需要存储一个映射，在被监听的操作实现上判断是不是需要执行web端提供的回调接口；</p>
<p><strong><code>注意:</code></strong>有关<code>java</code> <code>addJavascriptInterface</code>的使用有漏洞，详情见参考第二条链接，未验证，仅供读者自行权衡;</p>
<h4>B iframe的魔法</h4>
<p>由于Native App可以监听webview的请求，所以web端通过创建一个隐藏的iframe，请求商定后的统一协议来发送数据给Native App;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createIframeCall(url) {
  setTimeout(function() {
    var iframe = document.createElement('iframe');
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);
    setTimeout(function() {
        document.body.removeChild(iframe);
    }, 100);
  }, 0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createIframeCall</span>(<span class="hljs-params">url</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> iframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>);
    iframe.style.width = <span class="hljs-string">'1px'</span>;
    iframe.style.height = <span class="hljs-string">'1px'</span>;
    iframe.style.display = <span class="hljs-string">'none'</span>;
    iframe.src = url;
    <span class="hljs-built_in">document</span>.body.appendChild(iframe);
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">document</span>.body.removeChild(iframe);
    }, <span class="hljs-number">100</span>);
  }, <span class="hljs-number">0</span>);
}</code></pre>
<p><code>url</code>格式:<br>(:scheme)://register_type?func=(:funcName)&amp;cbId=(:cbId)&amp;data={...}&amp;verifyTimeStamp=(:new Date().getTime())</p>
<p><code>scheme</code>:协议，可用appName，两端商定，例如weixin,alipayjsbridge</p>
<p><code>register_type</code>: 注册形式，即<code>invoke</code>还是<code>listen</code></p>
<p><code>funcName</code>: Native内的方法名或映射</p>
<p><code>cbId</code>:见上文</p>
<p><code>data</code>:详细数据</p>
<p><code>verifyTimeStamp</code>:验证的时间参数，不必须</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(function() {
    if (window.ZaihuJSBridge) return;
    var CUSTOM_PROTOCOL_SCHEME = 'zaihu';
    var REGISTER_INVOKE = 'invoke';
    var REGISTER_LISTEN = 'listen';
    var uniqueId = 1;
    var invokeCbMap = {};
    var listenCbMap = {};
    function dataHandler(type, funcName, data, cb) {
      var register_type = '';
      switch (type) {
        case 'invoke': 
          register_type = REGISTER_INVOKE;break;
        case 'listen': 
          register_type = REGISTER_LISTEN;break;
        default: break;
      }
      var cbId = '';
      if (cb) {
        cbId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
        invokeCBMap[cbId] = cb;
      }
      var dataStr = '';
      if (data) dataStr = encodeURIComponent(JSON.stringify(data));
      var paramStr = CUSTOM_PROTOCOL_SCHEME + '://' + register_type + '?func=' + funcName + (cbId ? ('&amp;cbId=' + cbId): '') + (data ? ('&amp;data=' + dataStr): '');
      createIframeCall(paramStr);
        }
    function _invoke(nativeFuncName, data, cb) {
      dataHandler('invoke', nativeFuncName, data, cb);
    }
    
    function _listen(h5FuncName, data, cb) {
      dataHandler('listen', h5FuncName, data, cb);
    }
    function _handlerFromZaihu(msg) {
      var data = JSON.parse(msg);
      var cbId = data.cbId;
      var cb = invokeCBMap[cbId] || listenCBMap[cbId];
      if (cb) {
        delete data.cbId &amp;&amp; cb(data) &amp;&amp; delete invokeCBMap[cbId];
      }
    }
      var app;
    
      app = {
        version: '0.1',
        invoke: _invoke,
        on: _listen,
        log: _log,
        author: '伊吾鱼O(∩_V)O',
        // private
        _handlerFromApp: _handlerFromApp
      };
      window.JSBridge = app;
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.ZaihuJSBridge) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> CUSTOM_PROTOCOL_SCHEME = <span class="hljs-string">'zaihu'</span>;
    <span class="hljs-keyword">var</span> REGISTER_INVOKE = <span class="hljs-string">'invoke'</span>;
    <span class="hljs-keyword">var</span> REGISTER_LISTEN = <span class="hljs-string">'listen'</span>;
    <span class="hljs-keyword">var</span> uniqueId = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> invokeCbMap = {};
    <span class="hljs-keyword">var</span> listenCbMap = {};
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dataHandler</span>(<span class="hljs-params">type, funcName, data, cb</span>) </span>{
      <span class="hljs-keyword">var</span> register_type = <span class="hljs-string">''</span>;
      <span class="hljs-keyword">switch</span> (type) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'invoke'</span>: 
          register_type = REGISTER_INVOKE;<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'listen'</span>: 
          register_type = REGISTER_LISTEN;<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">default</span>: <span class="hljs-keyword">break</span>;
      }
      <span class="hljs-keyword">var</span> cbId = <span class="hljs-string">''</span>;
      <span class="hljs-keyword">if</span> (cb) {
        cbId = <span class="hljs-string">'cb_'</span> + (uniqueId++) + <span class="hljs-string">'_'</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        invokeCBMap[cbId] = cb;
      }
      <span class="hljs-keyword">var</span> dataStr = <span class="hljs-string">''</span>;
      <span class="hljs-keyword">if</span> (data) dataStr = <span class="hljs-built_in">encodeURIComponent</span>(<span class="hljs-built_in">JSON</span>.stringify(data));
      <span class="hljs-keyword">var</span> paramStr = CUSTOM_PROTOCOL_SCHEME + <span class="hljs-string">'://'</span> + register_type + <span class="hljs-string">'?func='</span> + funcName + (cbId ? (<span class="hljs-string">'&amp;cbId='</span> + cbId): <span class="hljs-string">''</span>) + (data ? (<span class="hljs-string">'&amp;data='</span> + dataStr): <span class="hljs-string">''</span>);
      createIframeCall(paramStr);
        }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_invoke</span>(<span class="hljs-params">nativeFuncName, data, cb</span>) </span>{
      dataHandler(<span class="hljs-string">'invoke'</span>, nativeFuncName, data, cb);
    }
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_listen</span>(<span class="hljs-params">h5FuncName, data, cb</span>) </span>{
      dataHandler(<span class="hljs-string">'listen'</span>, h5FuncName, data, cb);
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_handlerFromZaihu</span>(<span class="hljs-params">msg</span>) </span>{
      <span class="hljs-keyword">var</span> data = <span class="hljs-built_in">JSON</span>.parse(msg);
      <span class="hljs-keyword">var</span> cbId = data.cbId;
      <span class="hljs-keyword">var</span> cb = invokeCBMap[cbId] || listenCBMap[cbId];
      <span class="hljs-keyword">if</span> (cb) {
        <span class="hljs-keyword">delete</span> data.cbId &amp;&amp; cb(data) &amp;&amp; <span class="hljs-keyword">delete</span> invokeCBMap[cbId];
      }
    }
      <span class="hljs-keyword">var</span> app;
    
      app = {
        <span class="hljs-attr">version</span>: <span class="hljs-string">'0.1'</span>,
        <span class="hljs-attr">invoke</span>: _invoke,
        <span class="hljs-attr">on</span>: _listen,
        <span class="hljs-attr">log</span>: _log,
        <span class="hljs-attr">author</span>: <span class="hljs-string">'伊吾鱼O(∩_V)O'</span>,
        <span class="hljs-comment">// private</span>
        _handlerFromApp: _handlerFromApp
      };
      <span class="hljs-built_in">window</span>.JSBridge = app;
})()</code></pre>
<h4><strong>协作</strong></h4>
<ul>
<li><p>需要Native开发兄弟在webview开启时候为页面注入jsbridge.js代码并执行（防止被前端浏览器直接查看源代码了解app的代码逻辑）</p></li>
<li><p>获取参数执行对应的功能后，执行回调</p></li>
</ul>
<h2 id="articleHeader7"><strong>页面前期准备</strong></h2>
<p>1.app打开webview<br>2.loadUrl(页面url)<br>3.监听webview开始，并执行一段js代码将包内的jsbridge.js文件引入页面中;</p>
<h2 id="articleHeader8"><strong>功能业务逻辑</strong></h2>
<ol>
<li><p>web页面调用请求接口    <br>jsbridge.invoke(funcName, data);(A方法：Native提供，B&amp;C方法: 前端实现);</p></li>
<li><p>接口调用原生功能</p></li>
<li><p>原生功能完成后执行回调</p></li>
</ol>
<h2 id="articleHeader9"><strong>比较</strong></h2>
<p>A：android曝<a href="http://blog.csdn.net/zhaoxy_thu/article/details/22794201?utm_source=tuicool&amp;utm_medium=referral" rel="nofollow noreferrer" target="_blank">安全漏洞</a>，但相对来说实现简单，调用方式容易，且传递参数，无需前端搭建jsbridge,只需要封装易用的sdk，App不需要读取本地静态js文件;</p>
<p>B: iframe规定协议，规范统一，需要前端实现jsbridge和封装sdk, iframe通过url的方式，数据统一为字符串格式，数据量受限制，两端要转义字符；</p>
<p>C: prompt在一些安卓设备受系统劫持，监听prompt兼容性需要测试，也是字符串形式，数据量不受限，需要转义字符;</p>
<p>还有很多参考页面未注明，以及文中有问题的地方欢迎提出。</p>
<blockquote><p>相关参考<br><a href="http://blog.csdn.net/zhaoxy_thu/article/details/22794201?utm_source=tuicool&amp;utm_medium=referral" rel="nofollow noreferrer" target="_blank"> iOS中Objective-C与JavaScript之间相互调用的实现（实现了与Android相同的机制）</a><br><a href="http://blog.csdn.net/coder_nice/article/details/53116446" rel="nofollow noreferrer" target="_blank">Android WebView的Js对象注入漏洞解决方案（JSBridge存在的意义）</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生App与javascript交互之JSBridge接口原理、设计与实现

## 原文链接
[https://segmentfault.com/a/1190000008012111](https://segmentfault.com/a/1190000008012111)


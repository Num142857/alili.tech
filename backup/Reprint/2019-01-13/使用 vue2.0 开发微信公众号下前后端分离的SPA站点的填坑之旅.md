---
title: '使用 vue2.0 开发微信公众号下前后端分离的SPA站点的填坑之旅' 
date: 2019-01-13 2:30:11
hidden: true
slug: k2ui4c4di19
categories: [reprint]
---

{{< raw >}}

                    
<p>目前正在写一个微信公众号的小项目，记录一下遇到的问题和解决方法（主要是前端）。内容持续更新中~</p>
<h2 id="articleHeader0">主要实现</h2>
<p>前后端分离<br>前端为 SPA 单页面<br>使用微信的JSSDK<br>微信支付</p>
<h2 id="articleHeader1">技术方案</h2>
<p>后端使用 php 搭建接口<br>vux ui框架<br>vu2.0e全家桶（vue、vue-router、vue-resource、vuex）</p>
<h2 id="articleHeader2">问题列表</h2>
<h4>跨域问题</h4>
<p><del>因为生产环境下是同域名，不存在跨域问题。</del>生产环境配置反向代理解决了跨域。这里遇到的问题主要是开发环境下，后端和前端分别在两个 http 服务器上。因为前端项目直接用 vue-cli 生成，所以用到了 webpack，正好 webpack 的 dev-server 可以设置反向代理。在<code>config/index.js</code>里找到 <code>dev</code> 下的 <code>proxyTable</code> 配置项，并加入配置即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    proxyTable: {
      '/api': {
        target: 'http://127.0.0.1:8888',
        changeOrigin:true,
        pathRewrite:{
            //'^/api':''
        }
      }        
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">    proxyTable: {
      '/api': {
        target: 'http://<span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">8888</span>',
        changeOrigin:<span class="hljs-literal">true</span>,
        pathRewrite:{
            //'^/api':''
        }
      }        
    }</code></pre>
<h4>授权回调处理</h4>
<p>主要是获取用户的 openid。因为每个用户的 openid 固定不变，所以在首次加载时会检测 store 中是否有openid，如果没有就跳转到授权页面获取openid再跳转回来，并写入 localstorage，并更新 store。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //检测url中是否有openid
    if(this.$route.query.openid){
      this.$store.commit('updateOpenid',this.$route.query.openid);
    }
    //跳转授权
    if(!this.$store.state.openid){
      //授权完成后需要携带openid参数再跳回来
      window.location.href=&quot;/access&quot;;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">//检测url中是否有openid</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$route.query.openid){
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'updateOpenid'</span>,<span class="hljs-keyword">this</span>.$route.query.openid);
    }
    <span class="hljs-comment">//跳转授权</span>
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.$store.state.openid){
      <span class="hljs-comment">//授权完成后需要携带openid参数再跳回来</span>
      <span class="hljs-built_in">window</span>.location.href=<span class="hljs-string">"/access"</span>;
    }</code></pre>
<p>但是实际应用中这样并不安全，因为直接将 openid 传回页面，容易被客户端篡改。所以更加安全的做法是授权之后生成一个 token 和对应的 openid 存入数据库，并设置 token 失效时间，不把 openid 直接暴露给前端。前端提交时使用 token，在后端再取出对应的 openid</p>
<h4>微信支付</h4>
<p>看了下文档，以前是需要用 jssdk 唤起支付，而现在则是把微信 jssdk 内置到了微信的浏览器中。可以直接使用 WeixinJSBridge 来唤起支付。当然签名生成和订单需要在后端做。而且支付流程似乎也做了更改，以前是把订单信息和加密字符串同时传递到微信服务器，而现在是先在后端把订单信息传递给微信服务器，返回 prepay_id。前端只需要接收 prepay_id 并传递就可以了，这样的话更安全一些。</p>
<p>在前端组件中的代码更加简单化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    pay(){
        let _this=this;
        let jsApiParameters={};
        let onBridgeReady=function(){
            WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    jsApiParameters,
                    (res)=>{
                        if (res.err_msg == &quot;get_brand_wcpay_request:ok&quot;) {
                            _this.alert('支付成功');
                            window.location.reload();
                        }
                        if (res.err_msg == &quot;get_brand_wcpay_request:cancel&quot;) {
                            _this.alert('取消支付');
                            window.location.reload();
                        }
                    }
            );
        }
        let callpay=function(){
            if (typeof WeixinJSBridge == &quot;undefined&quot;) {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            } else {
                onBridgeReady();
            }            
        }
        //请求支付数据
        this.$http.get('wechat/wxpay?openid='+this.$store.state.openid+'&amp;id='+this.$route.params.id)
                .then((response)=>{
                    if(response.body.status==1){
                        jsApiParameters=response.body.data;
                        callpay();
                    }else{
                        _this.alert(response.body.msg);                        
                    }
        });
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    pay(){
        <span class="hljs-keyword">let</span> _this=<span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">let</span> jsApiParameters={};
        <span class="hljs-keyword">let</span> onBridgeReady=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            WeixinJSBridge.invoke(
                    <span class="hljs-string">'getBrandWCPayRequest'</span>,
                    jsApiParameters,
                    (res)=&gt;{
                        <span class="hljs-keyword">if</span> (res.err_msg == <span class="hljs-string">"get_brand_wcpay_request:ok"</span>) {
                            _this.alert(<span class="hljs-string">'支付成功'</span>);
                            <span class="hljs-built_in">window</span>.location.reload();
                        }
                        <span class="hljs-keyword">if</span> (res.err_msg == <span class="hljs-string">"get_brand_wcpay_request:cancel"</span>) {
                            _this.alert(<span class="hljs-string">'取消支付'</span>);
                            <span class="hljs-built_in">window</span>.location.reload();
                        }
                    }
            );
        }
        <span class="hljs-keyword">let</span> callpay=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> WeixinJSBridge == <span class="hljs-string">"undefined"</span>) {
                <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.addEventListener) {
                    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'WeixinJSBridgeReady'</span>, onBridgeReady, <span class="hljs-literal">false</span>);
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.attachEvent) {
                    <span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">'WeixinJSBridgeReady'</span>, onBridgeReady);
                    <span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">'onWeixinJSBridgeReady'</span>, onBridgeReady);
                }
            } <span class="hljs-keyword">else</span> {
                onBridgeReady();
            }            
        }
        <span class="hljs-comment">//请求支付数据</span>
        <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'wechat/wxpay?openid='</span>+<span class="hljs-keyword">this</span>.$store.state.openid+<span class="hljs-string">'&amp;id='</span>+<span class="hljs-keyword">this</span>.$route.params.id)
                .then(<span class="hljs-function">(<span class="hljs-params">response</span>)=&gt;</span>{
                    <span class="hljs-keyword">if</span>(response.body.status==<span class="hljs-number">1</span>){
                        jsApiParameters=response.body.data;
                        callpay();
                    }<span class="hljs-keyword">else</span>{
                        _this.alert(response.body.msg);                        
                    }
        });
    }</code></pre>
<h4>支付授权目录问题</h4>
<p>因为微信的支付授权目录要精确到子目录级别，而 spa 的 url的形式大概为 /wechat/#/show/1、/wechat/#/list/type 这样，就会产生发生支付的页面报支付目录未定义的问题。针对这个问题可以在根目录后加加上 ? 符号链接，后面的地址就会被当成参数解析，而不会当成目录。/wechat/?#/show/1、/wechat?#/list/type，这样解析出来的目录都是在 /wechat/ 根目录下面</p>
<h4>安卓下无法使用 html5 input 无法唤起摄像头</h4>
<p>上传图片部分使用的是html5直接选择图片上传</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input id=&quot;uploaderInput&quot; @change=&quot;change&quot; class=&quot;weui-uploader__input&quot; type=&quot;file&quot; accept=&quot;image/*&quot;  multiple />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"uploaderInput"</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"change"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-uploader__input"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/*"</span>  <span class="hljs-attr">multiple</span> /&gt;</span></code></pre>
<p>在 ios 设备下没有问题，会弹出选择拍照、图库等选项。但是朋友说在安卓下只能选择图库，而且无法多选。上网查了一下，确实在部分安卓平台下有这个问题。加上 capture=camera" 可以直接使用拍照，但是选择图库又没了。。。</p>
<p>解决方案有两个<br>1.使用微信的 jssdk 来选择图片，但是这样上传部分要修改。<br>2.在安卓下使用 vux 提供的 Actionsheet 组件来代替系统默认的选择，分别加上选择图库、直接打开拍照。<br>好气啊，手头又没有安卓设备，索性先放下不管了。</p>
<p>博客链接：<a href="https://lscho.com/tech/vue-wechat.html" rel="nofollow noreferrer" target="_blank"></a><a href="https://lscho.com/tech/vue-wechat.html" rel="nofollow noreferrer" target="_blank">https://lscho.com/tech/vue-we...</a>，后续在博客更新</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 vue2.0 开发微信公众号下前后端分离的SPA站点的填坑之旅

## 原文链接
[https://segmentfault.com/a/1190000009558392](https://segmentfault.com/a/1190000009558392)


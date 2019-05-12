---
title: 'vue 微信公众号中如何调取微信JSSDK 和微信支付' 
date: 2018-11-30 2:30:11
hidden: true
slug: cgqavg8jd0a
categories: [reprint]
---

{{< raw >}}

                    
<p>闲来无事，抽个疯来写写博客大笑   。 </p>
<p>宝剑尚未配好，出门已是江湖。对于撸VUE 我是认真的~  从啥也不懂到项目完成，也是花了不少时间啦。</p>
<p>说说我用到的技术栈吧</p>
<ul>
<li>vue-cli 官方脚手架模板。</li>
<li>vue-router 前端路由 （采取的是hash模式）。</li>
<li>vuex 状态管理工具。</li>
<li>axios 数据交互工具（官方封装ajax，在node中也可以使用）。</li>
<li>mint-ui UI组件工具（饿了么VUE组件库）。</li>
<li>less css预处理语言</li>
<li>ES5,ES6 （JS标准）。</li>
<li>webpack 编译工具。</li>
<li>rem布局，解决大部分屏幕适配问题<br> 当然还有用到微信的一些API了，毕竟是开发公众号。</li>
</ul>
<p>总的来说就是碰到调微信API的问题 </p>
<p>因为是前后端分离，所以我的授权也是改了模式</p>
<p>1、定义一个vue中间件，所有的微信授权后的回跳都走这个中间件，然后再根据入口的不同跳转到相应的路由（这样就显得很傻逼了，授权的时候会闪一个页面，让人感觉很不舒服），请求的数据用localStroge缓存，这也带来了很多麻烦，不推荐使用。</p>
<p>2、微信授权的回跳地址填后端的，然后再由后端重定向到前端程序，携带参数请求用户信息，然后再用sesionStroge缓存在本地，方便后续调用，目前看还算是最优的方案了。贴段代码~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" getquerystring(name){
    let reg = new RegExp(&quot;(^|&amp;)&quot;+ name +&quot;=([^&amp;]*)(&amp;|$)&quot;);
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  },
  getnewsdata(code,state) {
    const url=this.HOST+'/api/user/detail';
    Indicator.open({spinnerType: 'triple-bounce'});
    Axios.get(url, {params: {code: code,state:state"}}").then((response) => {
      Indicator.close();
      if(response.data) {
        const anduserInfo={
          uid: this.outjsencrpt(response.data.data.content.uid),
          openid: this.outjsencrpt(response.data.data.content.openid),
          nickname: response.data.data.content.nickname,
          headimgurl: response.data.data.content.headimgurl
        };
        const token = this.outjsencrpt(response.data.data.content.token);
        window.sessionStorage.setItem(this.DISCOVE,JSON.stringify(anduserInfo));
        window.sessionStorage.setItem(&quot;token&quot;,token);
        this.wxuserinfo = anduserInfo;
      }
    }).catch((response) => {
      console.log(response.data)
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> getquerystring(name){
    let reg = new RegExp(<span class="hljs-string">"(^|&amp;)"</span>+ name +<span class="hljs-string">"=([^&amp;]*)(&amp;|$)"</span>);
    let r = window.location.search.substr(<span class="hljs-number">1</span>).match(reg);
    <span class="hljs-keyword">if</span>(r!=<span class="hljs-literal">null</span>)<span class="hljs-keyword">return</span>  unescape(r[<span class="hljs-number">2</span>]); <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  },
  getnewsdata(code,state) {
    const url=<span class="hljs-keyword">this</span>.HOST+<span class="hljs-string">'/api/user/detail'</span>;
    Indicator.<span class="hljs-keyword">open</span>({spinnerType: <span class="hljs-string">'triple-bounce'</span>});
    Axios.<span class="hljs-keyword">get</span>(url, {params: {code: code,state:state"}}").then((response) =&gt; {
      Indicator.close();
      <span class="hljs-keyword">if</span>(response.<span class="hljs-keyword">data</span>) {
        const anduserInfo={
          uid: <span class="hljs-keyword">this</span>.outjsencrpt(response.<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.content.uid),
          openid: <span class="hljs-keyword">this</span>.outjsencrpt(response.<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.content.openid),
          nickname: response.<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.content.nickname,
          headimgurl: response.<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.content.headimgurl
        };
        const token = <span class="hljs-keyword">this</span>.outjsencrpt(response.<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.content.token);
        window.sessionStorage.setItem(<span class="hljs-keyword">this</span>.DISCOVE,JSON.stringify(anduserInfo));
        window.sessionStorage.setItem(<span class="hljs-string">"token"</span>,token);
        <span class="hljs-keyword">this</span>.wxuserinfo = anduserInfo;
      }
    }).<span class="hljs-keyword">catch</span>((response) =&gt; {
      console.log(response.<span class="hljs-keyword">data</span>)
    })
</code></pre>
<p>后面我们看看微信支付：</p>
<p>大家知道微信支付是要到微信商户平台去配授权目录的，那这个目录应该怎么配呢，</p>
<p>下面看看截图<br><span class="img-wrap"><img data-src="/img/bVbaK1O?w=988&amp;h=851" src="https://static.alili.tech/img/bVbaK1O?w=988&amp;h=851" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>所以我配的支付目录是： <a href="http://xxxxx.com/#/medicaservice/" rel="nofollow noreferrer" target="_blank">http://xxxxx.com/#/medicaserv...</a></p>
<p>配玩后就笑嘻嘻的去手机端调试了奋斗  </p>
<p>能想象到的~ BUG出来了</p>
<p>在安卓手机测微信支付没有问题，但是在IOS手机上测就会报“url未注册” </p>
<p>然后只能各种百度了  查资料了</p>
<p>都说是什么current URL   和 this URL 的问题 ，反正我也没看懂，就自己试着找问题，</p>
<p>发现了一个严重的问题，安卓机子测试 ，走到那个页面，路由也是跟着变化的，然而IOS测试，页面的渲染变化了，科室路由却没有跟着变。  当时严重怀疑vue-route的兼容性，但是没办法啊，项目写到这里了，总不能换框架吧。</p>
<p>只能硬着头皮写，还是一样网上找资料，慢慢摸索。</p>
<p>终于找到解决办法了：</p>
<p>在路由的#前面加个？号，微信浏览器就会把后面的路由当成参数过滤掉了。</p>
<p>后面只需在商户平台配成这样: </p>
<p><a href="http://xxxxx.com/" rel="nofollow noreferrer" target="_blank">http://xxxxx.com/</a></p>
<p><a href="http://xxxxx.com/#/medicaservice/" rel="nofollow noreferrer" target="_blank">http://xxxxx.com/#/medicaserv...</a></p>
<p>一定要配两个，不然安卓机是调不起来的。</p>
<p>配好后就差不多完事了</p>
<p>每次调到需要支付的路由时，判断他是什么系统，如果是IOS 就在#前面加个?号，这样就OK啦。</p>
<p>办法比较土，也可以用路由钩子函数来改变URL</p>
<p>weixinPay:function(parmse){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var vm = this;
    if (typeof WeixinJSBridge == &quot;undefined&quot;){//微信浏览器内置对象。参考微信官方文档
      alert(&quot;微信浏览器&quot;);
      if( document.addEventListener ){
        alert(&quot;浏览器监听&quot;);
        document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(parmse), false);
      }else if (document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(parmse));
        document.attachEvent('onWeixinJSBridgeReady',vm.onBridgeReady(parmse));
      }
    }else{
      //  alert(&quot;直接回调&quot;);
      vm.onBridgeReady(parmse);
    }
  },
  /**
   * @method 支付费用方法
   * @param data:后台返回的支付对象,(详情微信公众号支付API中H5提交支付);
   */
  onBridgeReady:function(params){
    var  vm = this;
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',params,
      function(res){
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        if(res.err_msg == &quot;get_brand_wcpay_request：ok&quot; ){
          vm.$router.replace({path: '/medicalservice/orderdetail',query:{order_id:vm.order_id"}}");
        }else{
          vm.$router.replace({path: '/medicalservice/orderdetail',query:{order_id:vm.order_id"}}");
        }
      }
    );
  },

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> WeixinJSBridge == <span class="hljs-string">"undefined"</span>){<span class="hljs-comment">//微信浏览器内置对象。参考微信官方文档</span>
      alert(<span class="hljs-string">"微信浏览器"</span>);
      <span class="hljs-keyword">if</span>( <span class="hljs-built_in">document</span>.addEventListener ){
        alert(<span class="hljs-string">"浏览器监听"</span>);
        <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'WeixinJSBridgeReady'</span>, vm.onBridgeReady(parmse), <span class="hljs-literal">false</span>);
      }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.attachEvent){
        <span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">'WeixinJSBridgeReady'</span>, vm.onBridgeReady(parmse));
        <span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">'onWeixinJSBridgeReady'</span>,vm.onBridgeReady(parmse));
      }
    }<span class="hljs-keyword">else</span>{
      <span class="hljs-comment">//  alert("直接回调");</span>
      vm.onBridgeReady(parmse);
    }
  },
  <span class="hljs-comment">/**
   * @method 支付费用方法
   * @param data:后台返回的支付对象,(详情微信公众号支付API中H5提交支付);
   */</span>
  onBridgeReady:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">params</span>)</span>{
    <span class="hljs-keyword">var</span>  vm = <span class="hljs-keyword">this</span>;
    WeixinJSBridge.invoke(
      <span class="hljs-string">'getBrandWCPayRequest'</span>,params,
      <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
        <span class="hljs-comment">// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。</span>
        <span class="hljs-keyword">if</span>(res.err_msg == <span class="hljs-string">"get_brand_wcpay_request：ok"</span> ){
          vm.$router.replace({<span class="hljs-attr">path</span>: <span class="hljs-string">'/medicalservice/orderdetail'</span>,<span class="hljs-attr">query</span>:{<span class="hljs-attr">order_id</span>:vm.order_id"}}");
        }<span class="hljs-keyword">else</span>{
          vm.$router.replace({<span class="hljs-attr">path</span>: <span class="hljs-string">'/medicalservice/orderdetail'</span>,<span class="hljs-attr">query</span>:{<span class="hljs-attr">order_id</span>:vm.order_id"}}");
        }
      }
    );
  },

</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 微信公众号中如何调取微信JSSDK 和微信支付

## 原文链接
[https://segmentfault.com/a/1190000014918059](https://segmentfault.com/a/1190000014918059)


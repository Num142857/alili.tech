---
title: 'axios 使用post方式传递参数，后端接受不到' 
date: 2018-12-20 2:30:10
hidden: true
slug: eliqzwebit5
categories: [reprint]
---

{{< raw >}}

                    
<p>最近做vue项目，做图片上传的功能，使用get给后台发送数据，后台能收到，使用post给后台发送图片信息的时候，<br><a href="https://segmentfault.com/q/1010000012611121">vue axios post请求发送图片base64编码给后台报错HTTP 错误 414</a><br>请求一直报错，显示 <strong><em>request URI too large</em></strong><br>后台显示一直没有收到数据 参数为null。网上查看了很多资料，才知道axios post传参的问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" this.$axios({
    method: 'post',
    url:url,
    params: {
        is_iso:1,
        goods_id:goods_id
    }
}).then((res)=>{

})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code> <span class="hljs-keyword">this</span>.$axios({
    method: <span class="hljs-string">'post'</span>,
    url:url,
    params: {
        is_iso:<span class="hljs-number">1</span>,
        goods_id:goods_id
    }
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(res)</span>=&gt;</span>{

})</code></pre>
<p>一开始我是这么写的 ，post里面的数据放在params里面，这样是有问题的，在使用axios时，要注意到配置选项中包含params和data两者，以为他们是相同的，实则不然。 <br>因为params是添加到url的请求字符串中的，用于get请求。<br>而data是添加到请求体（body）中的， 用于post请求。</p>
<p>然后我把params改为了data，后台还是接收不到，查阅了很多资料，需要把Content-Type为application/x-www-form-urlencoded，<br>jquery在执行post请求时，会设置Content-Type为application/x-www-form-urlencoded，所以服务器能够正确解析，而使用原生ajax、axios请求时，如果不显示的设置Content-Type，那么默认是text/plain，这时服务器就不知道怎么解析数据了，所以才只能通过获取原始数据流的方式来进行解析请求数据。</p>
<p><strong>解决办法：</strong></p>
<h2 id="articleHeader0">一、URLSearchParams</h2>
<p><strong><em>1、在main.js里 设置配置，修改Content-Type</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
axios.defaults.headers.post[<span class="hljs-string">'Content-Type'</span>] = <span class="hljs-string">'application/x-www-form-urlencoded'</span>;
Vue.prototype.$axios = axios;</code></pre>
<p><strong><em>2、在组件vue里</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const url ='http://****你的接口****';
var params = new URLSearchParams();
params.append('key1', 'value1');       //你要传给后台的参数值 key/value
params.append('key2', 'value2');
params.append('key3', 'value3');
this.$axios({
    method: 'post',
    url:url,
    data:params
}).then((res)=>{
    
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">const</span> url =<span class="hljs-string">'http://****你的接口****'</span>;
<span class="hljs-keyword">var</span> <span class="hljs-keyword">params</span> = <span class="hljs-keyword">new</span> URLSearchParams();
<span class="hljs-keyword">params</span>.append(<span class="hljs-string">'key1'</span>, <span class="hljs-string">'value1'</span>);       <span class="hljs-comment">//你要传给后台的参数值 key/value</span>
<span class="hljs-keyword">params</span>.append(<span class="hljs-string">'key2'</span>, <span class="hljs-string">'value2'</span>);
<span class="hljs-keyword">params</span>.append(<span class="hljs-string">'key3'</span>, <span class="hljs-string">'value3'</span>);
<span class="hljs-keyword">this</span>.$axios({
    method: <span class="hljs-string">'post'</span>,
    url:url,
    data:<span class="hljs-keyword">params</span>
}).then((res)=&gt;{
    
});</code></pre>
<p>这样后台就收到数据了 请求成功;不过这个方法兼容性非常不好，ie浏览器完全不兼容。<br><span class="img-wrap"><img data-src="/img/bV7bWO?w=1183&amp;h=679" src="https://static.alili.tech/img/bV7bWO?w=1183&amp;h=679" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">二、使用qs</h2>
<p>安装qs,在 main.js里引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios';
import qs from 'qs';
Vue.prototype.$qs = qs;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>;
Vue.prototype.$qs = qs;</code></pre>
<p>在vue组件里面请求方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let postData = this.$qs.stringify({
    key1:value1,
    key2:value2,
    key3:value3,
});
this.$axios({
    method: 'post',
    url:'url',
    data:postData
}).then((res)=>{
    
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> postData = this.$qs.stringify({
    key1:value1,
    key2:value2,
    key3:value3,
});
this.$axios({
    method: <span class="hljs-string">'post'</span>,
    url:<span class="hljs-string">'url'</span>,
    data:postData
}).<span class="hljs-keyword">then</span>((res)=&gt;{
    
});</code></pre>
<p>这样就ok了</p>
<p><strong>参考资料：</strong><br><a href="https://www.jianshu.com/p/042632dec9fb" rel="nofollow noreferrer" target="_blank">axios发送post请求，springMVC接收不到数据问题</a></p>
<p><a href="http://blog.csdn.net/wild46cat/article/details/78447467" rel="nofollow noreferrer" target="_blank">vue 添加axios组件，解决post传参数为null问题</a></p>
<p><a href="https://www.npmjs.com/package/axios" rel="nofollow noreferrer" target="_blank">axios</a></p>
<p><a href="https://www.jianshu.com/p/4489934af4fb" rel="nofollow noreferrer" target="_blank">vue axios 传参</a></p>
<p><a href="http://blog.csdn.net/mhmyqn/article/details/25561535" rel="nofollow noreferrer" target="_blank">AJAX POST请求中参数以form data和request payload形式在servlet中的获取方式</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
axios 使用post方式传递参数，后端接受不到

## 原文链接
[https://segmentfault.com/a/1190000012635783](https://segmentfault.com/a/1190000012635783)


---
title: '「大前端」weex里native主动发送事件到JS的方案实现' 
date: 2018-12-27 2:30:12
hidden: true
slug: n7uut1b01qc
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>本文来自尚妆Android团队<a href="https://github.com/or0fun" rel="nofollow noreferrer" target="_blank">路飞</a><br>发表于<a href="https://github.com/ShowJoy-com/showjoy-blog/issues/35" rel="nofollow noreferrer" target="_blank">尚妆github博客</a>，欢迎订阅！</p>
<p>接入weex已有几个月，各方面都已慢慢完善。最近遇到一个点，先记录一下。后续会花时间整理一系列weex相关的文章。希望早点完成。</p>
</blockquote>
<h2 id="articleHeader0">需求</h2>
<p>现在有很多页面需要在返回的时候刷新，比如从购物车跳转到详情页加购，再到购物车，这时候应该刷新页面；如果从订单列表页点击付款跳转后进行支付后，返回的时候刷新数据。</p>
<h2 id="articleHeader1">viewappear 和 viewdisappear事件</h2>
<p>首先想到的是weex已经提供的绑定到根元素的viewappear 和 viewdisappear事件。使用方法是绑定到根元素上，<code>自定义过component的同学在这里应该不难猜到它是基于fireEvent实现的</code>。</p>
<ul><li>1、在Android里，是在onresume里发送viewappear事件，在onpause里发送viewappear。 <br>接入的时候只要在对应的地方调用对应weexInstance的resume和pause即可：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public void onResume() {
  if (wxInstance != null) {
    wxInstance.onActivityResume();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onResume</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">if</span> (wxInstance != <span class="hljs-keyword">null</span>) {
    wxInstance.onActivityResume();
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public void onPause() {
   if (wxInstance != null) {
      wxInstance.onActivityPause();
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onPause</span><span class="hljs-params">()</span> </span>{
   <span class="hljs-keyword">if</span> (wxInstance != <span class="hljs-keyword">null</span>) {
      wxInstance.onActivityPause();
   }
}</code></pre>
<ul><li>2、在iOS里，在viewDidAppear里发送viewappear事件，在viewDidDisappear里发送事件。这里可以参考官方demo的WXDemoViewController实现：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- (void)updateInstanceState:(WXState)state {
    if (_instance &amp;&amp; _instance.state != state) {
        _instance.state = state;
        
        if (state == WeexInstanceAppear) {
            [[WXSDKManager bridgeMgr] fireEvent:_instance.instanceId ref:WX_SDK_ROOT_REF type:@&quot;viewappear&quot; params:nil domChanges:nil];
        }
        else if (state == WeexInstanceDisappear) {
            [[WXSDKManager bridgeMgr] fireEvent:_instance.instanceId ref:WX_SDK_ROOT_REF type:@&quot;viewdisappear&quot; params:nil domChanges:nil];
        }
    }
}
-(void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    [self updateInstanceState:WeexInstanceAppear];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    [self updateInstanceState:WeexInstanceDisappear];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>- (void)updateInstanceState:(WXState)<span class="hljs-keyword">state</span> {
    if (_instance &amp;&amp; _instance.<span class="hljs-keyword">state</span> != <span class="hljs-keyword">state</span>) {
        _instance.<span class="hljs-keyword">state</span> = <span class="hljs-keyword">state</span>;
        
        if (<span class="hljs-keyword">state</span> == WeexInstanceAppear) {
            [[WXSDKManager bridgeMgr] fireEvent:_instance.instanceId ref:WX_SDK_ROOT_REF type:@<span class="hljs-string">"viewappear"</span> params:nil domChanges:nil];
        }
        else if (<span class="hljs-keyword">state</span> == WeexInstanceDisappear) {
            [[WXSDKManager bridgeMgr] fireEvent:_instance.instanceId ref:WX_SDK_ROOT_REF type:@<span class="hljs-string">"viewdisappear"</span> params:nil domChanges:nil];
        }
    }
}
-(void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    [<span class="hljs-literal">self</span> updateInstanceState:WeexInstanceAppear];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    [<span class="hljs-literal">self</span> updateInstanceState:WeexInstanceDisappear];
}</code></pre>
<p>到此，viewappear 和 viewdisappear事件是可以满足以上返回刷新的需求的，只要在vue 里判断：<code>当触发viewappear事件时，如果不是第一次触发，就当做是返回，根据需求，做刷新请求就可以了。</code></p>
<h2 id="articleHeader2">还没结束</h2>
<p>由此想到，如果不仅需要这样的事件，还想给当前页面，从native发其他事件到js，也不基于界面元素，那么该如何办呢？</p>
<p>首先想到的是weex提供的globalEvent，三端都可以发送事件，接收的时候只要注册一下就好了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var globalEvent = weex.requireModule('globalEvent');
globalEvent.addEventListener(&quot;geolocation&quot;, function (e) {
  console.log(&quot;get geolocation&quot;)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> globalEvent = weex.requireModule(<span class="hljs-string">'globalEvent'</span>);
globalEvent.addEventListener(<span class="hljs-string">"geolocation"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"get geolocation"</span>)
});</code></pre>
<p>不过，经过实验会发现，它是全局的，意思是，一个activity/viewcontroller包含多个weex时，只要注册了这个事件，那么就都会收到这个事件。那么一旦我们发送的事件名称出现一样时，就埋了坑，可能出现事件错乱。</p>
<blockquote><p>这里的解决方案可能会想到规范event name来达到杜绝名称一样的情况，不过这更多是一种治标不治本的办法。</p></blockquote>
<h2 id="articleHeader3">于是乎</h2>
<p>于是就有了本文要介绍的方案，让页面传的事件只有自己页面的js处理。</p>
<blockquote><p>讲道理，这个功能，要是在weex sdk里实现再好不过了。</p></blockquote>
<h3 id="articleHeader4">原理</h3>
<p>说来简单，该方案基于globalEvent，携带instanceId，weex里通过比对instanceId，只有一致的情况下才进行处理。</p>
<h3 id="articleHeader5">Android：</h3>
<p>在渲染weex的fragment/activity的onresume里调用：</p>
<blockquote><p>resumed：成员变量，默认false</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (resumed) {
  Map<String,Object> params = new HashMap<>();
  params.put(&quot;id&quot;, wxInstance.getInstanceId());
  wxInstance.fireGlobalEventCallback(&quot;resume&quot;, params);
}
resumed = true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-keyword">if</span> (resumed) {
  <span class="hljs-built_in">Map</span>&lt;<span class="hljs-built_in">String</span>,Object&gt; <span class="hljs-keyword">params</span> = <span class="hljs-literal">new</span> HashMap&lt;&gt;();
  <span class="hljs-keyword">params</span>.put(<span class="hljs-string">"id"</span>, wxInstance.getInstanceId());
  wxInstance.fireGlobalEventCallback(<span class="hljs-string">"resume"</span>, <span class="hljs-keyword">params</span>);
}
resumed = <span class="hljs-literal">true</span>;</code></pre>
<p>在自定义module里增加接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@JSMethod(uiThread = true)
public void getInstanceId(final JSCallback callback) {
  if (null != callback) {
     JSONObject jsonObject = new JSONObject();
     jsonObject.put(&quot;id&quot;, mWXSDKInstance.getInstanceId());
     callback.invoke(jsonObject);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-meta">@JSMethod</span>(uiThread = <span class="hljs-keyword">true</span>)
<span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">getInstanceId</span><span class="hljs-params">(<span class="hljs-keyword">final</span> JSCallback callback)</span> </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">null</span> != callback) {
     JSONObject jsonObject = <span class="hljs-keyword">new</span> JSONObject();
     jsonObject.put(<span class="hljs-string">"id"</span>, mWXSDKInstance.getInstanceId());
     callback.invoke(jsonObject);
  }
}</code></pre>
<h3 id="articleHeader6">iOS:</h3>
<p>在渲染weex的viewController里调用：</p>
<blockquote><p>resumed：成员变量，默认false</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-(void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    if (self.resumed) {
        [_instance fireGlobalEvent:@&quot;resume&quot; params:@{@&quot;id&quot;: _instance.instanceId}];
    }
    self.resumed = true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>-(<span class="hljs-keyword">void</span>)<span class="hljs-string">viewDidAppear:</span>(BOOL)animated{
    [<span class="hljs-keyword">super</span> <span class="hljs-string">viewDidAppear:</span>animated];
    <span class="hljs-keyword">if</span> (self.resumed) {
        [_instance <span class="hljs-string">fireGlobalEvent:</span>@<span class="hljs-string">"resume"</span> <span class="hljs-string">params:</span>@{@<span class="hljs-string">"id"</span>: _instance.instanceId}];
    }
    self.resumed = <span class="hljs-literal">true</span>;
}</code></pre>
<p>在自定义module里增加接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-(void)getInstanceId:(WXModuleCallback)callback{
    callback(@{@&quot;id&quot;: weexInstance.instanceId});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code>-<span class="hljs-params">(void)</span>getInstanceId:<span class="hljs-params">(WXModuleCallback)</span>callback{
    callback<span class="hljs-params">(@{@<span class="hljs-string">"id"</span>: weexInstance.instanceId})</span>;
}</code></pre>
<h3 id="articleHeader7">weex 处理：</h3>
<p>weex工程里，封装一个函数，其中<code>shopBase</code>是自定义的module</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const shopBase = weex.requireModule('shopBase');

export default {
  methods: {
    /**
     * config:
     * {
     *  event, name of event 
     *  callback
     * }
     */
    addEventListener(event, callback) {
      if(weex.config.env.platform.toLowerCase() !== 'web') {
        shopBase.getInstanceId((data) => {
            const globalEvent = weex.requireModule('globalEvent');
            const id = data.id;
            globalEvent.addEventListener(event, function (e) {
                if(e.id === id) {
                    callback(e);
                }
            });
        })
      }
    },
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> shopBase = weex.requireModule(<span class="hljs-string">'shopBase'</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">/**
     * config:
     * {
     *  event, name of event 
     *  callback
     * }
     */</span>
    addEventListener(event, callback) {
      <span class="hljs-keyword">if</span>(weex.config.env.platform.toLowerCase() !== <span class="hljs-string">'web'</span>) {
        shopBase.getInstanceId(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
            <span class="hljs-keyword">const</span> globalEvent = weex.requireModule(<span class="hljs-string">'globalEvent'</span>);
            <span class="hljs-keyword">const</span> id = data.id;
            globalEvent.addEventListener(event, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                <span class="hljs-keyword">if</span>(e.id === id) {
                    callback(e);
                }
            });
        })
      }
    },
  },
};</code></pre>
<p>在需要的页面调用即可，用法同globalEvent：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addEventListener('resume', function (e) {
   shopModal.toast({ message: e.id });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>addEventListener('resume', function (<span class="hljs-name">e</span>) {
   shopModal.toast({ message: e.id })<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「大前端」weex里native主动发送事件到JS的方案实现

## 原文链接
[https://segmentfault.com/a/1190000011778708](https://segmentfault.com/a/1190000011778708)


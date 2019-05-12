---
title: '「Android」 详细全面的基于vue2.0Weex接入过程（Android视角）' 
date: 2019-01-19 2:30:09
hidden: true
slug: 13mm6u7dsvn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文来自尚妆Android团队<a href="https://github.com/or0fun" rel="nofollow noreferrer" target="_blank">路飞</a><br>发表于<a href="https://github.com/ShowJoy-com/showjoy-blog/issues/25" rel="nofollow noreferrer" target="_blank">尚妆github博客</a>，欢迎订阅！</p></blockquote>
<h1 id="articleHeader0">一、说在前面的话</h1>
<p>目前weex已在尚妆旗下的达人店app上线了一个常用的订单管理页面，截止目前Android上未发现问题，渲染时间在100-300ms之间。</p>
<p>作为Android开发，此文首先会从Android的角度为主来记录接入的过程，希望给未接入的同学更方便省时地接入weex提供一点帮助。其中会涉及到<code>预加载</code>，<code>降级</code>，<code>热更新</code>，<code>埋点</code>以及在app不更新的情况下<code>动态配置新页面</code>等问题，这些Android和iOS都是统一的逻辑，希望和大家一起交流。前端方面可以参考我同事写的<a href="https://github.com/ShowJoy-com/showjoy-blog/issues/8" rel="nofollow noreferrer" target="_blank">《weex入门实践（前端视角）》</a>，iOS可以参考我同事写的<a href="https://juejin.im/entry/586c6a768d6d810058aba6c5/detail" rel="nofollow noreferrer" target="_blank">weex 实践（iOS 视角）</a></p>
<h1 id="articleHeader1">二、Android接入过程</h1>
<p>其实对于module、component的定义，以及IWXImgLoaderAdapter、IWXHttpAdapter等adapter的重写，在playgroud和weexteam里都已经有很好的例子了。</p>
<h3 id="articleHeader2">1、gradle依赖</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compile 'com.taobao.android:weex_sdk:0.10.0’

compile 'com.android.support:support-v4:24.0.0'
compile 'com.android.support:appcompat-v7:24.0.0'
compile 'com.android.support:recyclerview-v7:24.0.0'

compile 'com.squareup.okhttp:okhttp:2.3.0'
compile 'com.squareup.okhttp:okhttp-ws:2.3.0'

compile 'com.alibaba:fastjson:1.2.8'

//（可选）支持调试的依赖，参考https://github.com/weexteam/weex-devtools-android/blob/master/README-zh.md  
compile 'com.taobao.android:weex_inspector:0.0.8.5'
compile 'com.google.code.findbugs:jsr305:2.0.1'
compile 'com.taobao.android:weex_inspector:0.0.8.5'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="gradle hljs"><code class="gradle"><span class="hljs-keyword">compile</span> <span class="hljs-string">'com.taobao.android:weex_sdk:0.10.0’

compile '</span>com.android.support:support-v4:<span class="hljs-number">24.0</span>.<span class="hljs-number">0</span><span class="hljs-string">'
compile '</span>com.android.support:appcompat-v7:<span class="hljs-number">24.0</span>.<span class="hljs-number">0</span><span class="hljs-string">'
compile '</span>com.android.support:recyclerview-v7:<span class="hljs-number">24.0</span>.<span class="hljs-number">0</span><span class="hljs-string">'

compile '</span>com.squareup.okhttp:okhttp:<span class="hljs-number">2.3</span>.<span class="hljs-number">0</span><span class="hljs-string">'
compile '</span>com.squareup.okhttp:okhttp-ws:<span class="hljs-number">2.3</span>.<span class="hljs-number">0</span><span class="hljs-string">'

compile '</span>com.alibaba:fastjson:<span class="hljs-number">1.2</span>.<span class="hljs-number">8</span><span class="hljs-string">'

//（可选）支持调试的依赖，参考https://github.com/weexteam/weex-devtools-android/blob/master/README-zh.md  
compile '</span>com.taobao.android:weex_inspector:<span class="hljs-number">0.0</span>.<span class="hljs-number">8.5</span><span class="hljs-string">'
compile '</span>com.google.code.findbugs:jsr305:<span class="hljs-number">2.0</span>.<span class="hljs-number">1</span><span class="hljs-string">'
compile '</span>com.taobao.android:weex_inspector:<span class="hljs-number">0.0</span>.<span class="hljs-number">8.5</span><span class="hljs-string">'</span></code></pre>
<h3 id="articleHeader3">2、新建weex module</h3>
<p>在原来的project上，新建单独的 weex module。代码结构如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000008641801?w=445&amp;h=590" src="https://static.alili.tech/img/remote/1460000008641801?w=445&amp;h=590" alt="Alt text" title="Alt text" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">3、初始化weex</h3>
<p>通过类WeexManager来统一管理weex相关的配置，以下是WeexManager里的init函数的主要内容，在application的onCreate里调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public void init(Application application, IWeexService weexService) {

        //通过在线参数控制是否使用weex,ConfigManager是尚妆的在线参数模块，以后有机会再简单介绍一下
        if (!ConfigManager.getBoolean(CONFIG_WEEX_ENABLE, true)) {
            return;
        }

        context = application.getApplicationContext();
        weexDir = context.getDir(WEEX_MODULE, Context.MODE_PRIVATE);

        //根据需要注册图片、网络、存储等adapter
        WXSDKEngine.initialize(application,
                new InitConfig.Builder()
                        .setImgAdapter(new FrescoImageAdapter())
                        .setUtAdapter(new UserTrackAdapter())
                        .setStorageAdapter(new StorageAdapter())
                        .setHttpAdapter(new OkHttpAdapter())
                        .setURIAdapter(new CustomURIAdapter())
                        .build());

        this.weexService = weexService;

        //获取本地缓存的weex js配置
        configList = WXJsonUtils.getList(SHStorageManager.get(WEEX_MODULE, WEEX_CONFIG, &quot;&quot;), WeexConfig.class);
        update();

        try {
            //页面通用的一些接口
            WXSDKEngine.registerModule(&quot;shopBase&quot;, ShopModule.class);
            //主要是a标签的跳转
            WXSDKEngine.registerModule(&quot;event&quot;, WXEventModule.class);
            //模态对话框
            WXSDKEngine.registerModule(&quot;shopModal&quot;, ModalModule.class);
            //用fresco重写图片组件
            WXSDKEngine.registerComponent(&quot;image&quot;, FrescoImageComponent.class);
        } catch (WXException e) {
            LogUtils.e(e);
        }

        SHEventBus.register(ModuleName.WEEX, &quot;weexDebugHost&quot;, new ISHEventBusCallback<String>() {
            @Override
            public void handle(String debugHost, String s) {
                if (!TextUtils.isEmpty(s)) {
                    LogUtils.e(s);
                    return;
                }
                if (TextUtils.isEmpty(debugHost)) {
                    WXEnvironment.sRemoteDebugMode = false;
                } else {
                    WXEnvironment.sRemoteDebugMode = true;
                    WXEnvironment.sRemoteDebugProxyUrl = &quot;ws://&quot; + debugHost + &quot;/debugProxy/native&quot;;
                }
                WXSDKEngine.reload();
            }
        });

        SHEventBus.register(ModuleName.WEEX, &quot;netChanged&quot;, new ISHEventBusCallback<Boolean>() {
            @Override
            public void handle(Boolean result, String s) {
                if (!TextUtils.isEmpty(s)) {
                    LogUtils.e(s);
                } else {
                    if (result.booleanValue()) {
                        update();
                    }
                }
            }
        });

        //获取weex配置，更新js文件
        weexConfigRequest.setCallBack(new IRequestCallBack<SHResponse<List<WeexConfig>>>() {
            @Override
            public void onResponseSuccess(SHResponse<List<WeexConfig>> response) {
                if (response.isSuccess &amp;&amp; null != response.data) {
                    SHStorageManager.putToDisk(WEEX_MODULE, WEEX_CONFIG, JsonUtils.toJson(response.data));
                    configList = response.data;
                    update();
                }
            }

            @Override
            public void onResponseError(int i) {

            }
        });
        weexConfigRequest.start();

    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">init</span><span class="hljs-params">(Application application, IWeexService weexService)</span> </span>{

        <span class="hljs-comment">//通过在线参数控制是否使用weex,ConfigManager是尚妆的在线参数模块，以后有机会再简单介绍一下</span>
        <span class="hljs-keyword">if</span> (!ConfigManager.getBoolean(CONFIG_WEEX_ENABLE, <span class="hljs-keyword">true</span>)) {
            <span class="hljs-keyword">return</span>;
        }

        context = application.getApplicationContext();
        weexDir = context.getDir(WEEX_MODULE, Context.MODE_PRIVATE);

        <span class="hljs-comment">//根据需要注册图片、网络、存储等adapter</span>
        WXSDKEngine.initialize(application,
                <span class="hljs-keyword">new</span> InitConfig.Builder()
                        .setImgAdapter(<span class="hljs-keyword">new</span> FrescoImageAdapter())
                        .setUtAdapter(<span class="hljs-keyword">new</span> UserTrackAdapter())
                        .setStorageAdapter(<span class="hljs-keyword">new</span> StorageAdapter())
                        .setHttpAdapter(<span class="hljs-keyword">new</span> OkHttpAdapter())
                        .setURIAdapter(<span class="hljs-keyword">new</span> CustomURIAdapter())
                        .build());

        <span class="hljs-keyword">this</span>.weexService = weexService;

        <span class="hljs-comment">//获取本地缓存的weex js配置</span>
        configList = WXJsonUtils.getList(SHStorageManager.get(WEEX_MODULE, WEEX_CONFIG, <span class="hljs-string">""</span>), WeexConfig.class);
        update();

        <span class="hljs-keyword">try</span> {
            <span class="hljs-comment">//页面通用的一些接口</span>
            WXSDKEngine.registerModule(<span class="hljs-string">"shopBase"</span>, ShopModule.class);
            <span class="hljs-comment">//主要是a标签的跳转</span>
            WXSDKEngine.registerModule(<span class="hljs-string">"event"</span>, WXEventModule.class);
            <span class="hljs-comment">//模态对话框</span>
            WXSDKEngine.registerModule(<span class="hljs-string">"shopModal"</span>, ModalModule.class);
            <span class="hljs-comment">//用fresco重写图片组件</span>
            WXSDKEngine.registerComponent(<span class="hljs-string">"image"</span>, FrescoImageComponent.class);
        } <span class="hljs-keyword">catch</span> (WXException e) {
            LogUtils.e(e);
        }

        SHEventBus.register(ModuleName.WEEX, <span class="hljs-string">"weexDebugHost"</span>, <span class="hljs-keyword">new</span> ISHEventBusCallback&lt;String&gt;() {
            <span class="hljs-meta">@Override</span>
            <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">handle</span><span class="hljs-params">(String debugHost, String s)</span> </span>{
                <span class="hljs-keyword">if</span> (!TextUtils.isEmpty(s)) {
                    LogUtils.e(s);
                    <span class="hljs-keyword">return</span>;
                }
                <span class="hljs-keyword">if</span> (TextUtils.isEmpty(debugHost)) {
                    WXEnvironment.sRemoteDebugMode = <span class="hljs-keyword">false</span>;
                } <span class="hljs-keyword">else</span> {
                    WXEnvironment.sRemoteDebugMode = <span class="hljs-keyword">true</span>;
                    WXEnvironment.sRemoteDebugProxyUrl = <span class="hljs-string">"ws://"</span> + debugHost + <span class="hljs-string">"/debugProxy/native"</span>;
                }
                WXSDKEngine.reload();
            }
        });

        SHEventBus.register(ModuleName.WEEX, <span class="hljs-string">"netChanged"</span>, <span class="hljs-keyword">new</span> ISHEventBusCallback&lt;Boolean&gt;() {
            <span class="hljs-meta">@Override</span>
            <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">handle</span><span class="hljs-params">(Boolean result, String s)</span> </span>{
                <span class="hljs-keyword">if</span> (!TextUtils.isEmpty(s)) {
                    LogUtils.e(s);
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">if</span> (result.booleanValue()) {
                        update();
                    }
                }
            }
        });

        <span class="hljs-comment">//获取weex配置，更新js文件</span>
        weexConfigRequest.setCallBack(<span class="hljs-keyword">new</span> IRequestCallBack&lt;SHResponse&lt;List&lt;WeexConfig&gt;&gt;&gt;() {
            <span class="hljs-meta">@Override</span>
            <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">onResponseSuccess</span><span class="hljs-params">(SHResponse&lt;List&lt;WeexConfig&gt;&gt; response)</span> </span>{
                <span class="hljs-keyword">if</span> (response.isSuccess &amp;&amp; <span class="hljs-keyword">null</span> != response.data) {
                    SHStorageManager.putToDisk(WEEX_MODULE, WEEX_CONFIG, JsonUtils.toJson(response.data));
                    configList = response.data;
                    update();
                }
            }

            <span class="hljs-meta">@Override</span>
            <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">onResponseError</span><span class="hljs-params">(<span class="hljs-keyword">int</span> i)</span> </span>{

            }
        });
        weexConfigRequest.start();

    }</code></pre>
<p>1）考虑到第一次接入weex，有点担心兼容问题，万一引起崩溃等不确定因素，所以这里做了一个开关。其实每接入一个新的sdk都最好有个<code>控制开关</code>，以避免因为不确定因素导致不稳定。</p>
<p>2）weexDir是js的下载存储路径，为了加快页面打开时间，会对js进行<code>预加载到本地</code></p>
<p>3） sdk对a标签的处理只调用了"event"的openURL接口，但是却没有注册<code>"event"</code>。所以需要自己实现WXEventModule，并注册。</p>
<p>4）模态对话框<code>ModalModule</code>的实现参考sdk里的WXModalUIModule</p>
<p>5）<code>FrescoImageAdapter</code>和<code>FrescoImageComponent</code>的实现依赖我们开源的<a href="https://github.com/ShowJoy-com/SHImageView" rel="nofollow noreferrer" target="_blank">SHImageView</a>支持webp，支持压缩，支持没有协议的链接（忽略协议可以让浏览器根据页面时http或者https自动选择使用的协议，从而避免了网站改为https的情况下仍然访问http资源而无法访问的问题。）</p>
<p>6）OkHttpAdapter的实现参考github上zjutkz同学的实现 OkHttpAdapter，感谢，经过改写，支持没有协议的链接，支持cookie</p>
<p>7）ShopModule是自定义的Module，定义通用的一些接口，比如设置title bar是否显示，以及title bar的title；关闭当前页面，分享，错误日志收集等。</p>
<p>8）UserTrackAdapter用于埋点，另外可以在ShopModule里自定义接口收集埋点、错误信息等。</p>
<p>9）CustomURIAdapter用于支持相对地址，具体实现参见以下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class CustomURIAdapter implements URIAdapter {
    @NonNull
    @Override
    public Uri rewrite(WXSDKInstance instance, String type, Uri uri) {
        if (null == uri) {
            return null;
        }
        String url = uri.toString();
        if (url.startsWith(&quot;http&quot;)) {
            return uri;
        }else if (url.startsWith(&quot;//&quot;)) {
            if (SHStorageManager.get(&quot;APP&quot;, &quot;https&quot;, true)) {
                url = &quot;https:&quot; + url;
            }else {
                url = &quot;http:&quot; + url;
            }
        }else {
            url = SHHost.getMobileHost() + url;
        }
        return Uri.parse(url);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomURIAdapter</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">URIAdapter</span> </span>{
    <span class="hljs-meta">@NonNull</span>
    <span class="hljs-meta">@Override</span>
    public <span class="hljs-built_in">Uri</span> rewrite(WXSDKInstance instance, <span class="hljs-built_in">String</span> type, <span class="hljs-built_in">Uri</span> uri) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">null</span> == uri) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">null</span>;
        }
        <span class="hljs-built_in">String</span> url = uri.toString();
        <span class="hljs-keyword">if</span> (url.startsWith(<span class="hljs-string">"http"</span>)) {
            <span class="hljs-keyword">return</span> uri;
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (url.startsWith(<span class="hljs-string">"//"</span>)) {
            <span class="hljs-keyword">if</span> (SHStorageManager.<span class="hljs-keyword">get</span>(<span class="hljs-string">"APP"</span>, <span class="hljs-string">"https"</span>, <span class="hljs-keyword">true</span>)) {
                url = <span class="hljs-string">"https:"</span> + url;
            }<span class="hljs-keyword">else</span> {
                url = <span class="hljs-string">"http:"</span> + url;
            }
        }<span class="hljs-keyword">else</span> {
            url = SHHost.getMobileHost() + url;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Uri</span>.parse(url);
    }
}</code></pre>
<h3 id="articleHeader5">4、新建统一的weex页面</h3>
<p>这边考虑到以后页面有可能嵌入到其他activity，所以把weex的渲染放入新建的<code>WeexFragment</code>。然后新建WeexActivity来引用该WeexFragment 。所有的单独页面的weex渲染都使用这个<code>WeexActivity</code>，非单独页面的使用<code>weexFragment</code>，这样新加页面时，无需重新注册activity。weex处理逻辑统一，方便管理，方便动态配置。<code>通过统一跳转协议跳转到WeexActivity，通过intent传入两个参数url和h5</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="showjoyshop://page.sh/weex
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">showjoyshop:</span><span class="hljs-comment">//page.sh/weex</span>
</code></pre>
<p>intent参数：<br><code>url</code>：js链接，可以是本地的存储地址/sdcard/com.showjoy.shop/weex/order.js，也可以是线上链接 <a href="https://xxxxx/0.4.3/order.js" rel="nofollow noreferrer" target="_blank">https://xxxxx/0.4.3/order.js</a></p>
<p><code>h5</code>：用来降级的h5页面链接，当渲染失败时，会跳转到该h5页面</p>
<h3 id="articleHeader6">5、开始渲染js，失败后降级到h5</h3>
<p>首先实例化WXSDKInstance</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wxInstance = new WXSDKInstance(activity);
wxInstance.registerRenderListener(this);
wxInstance.onActivityCreate();
registerBroadcastReceiver();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code><span class="hljs-attribute">wxInstance</span> = new WXSDKInstance(activity)<span class="hljs-comment">;</span>
wxInstance.registerRenderListener(this)<span class="hljs-comment">;</span>
wxInstance.onActivityCreate()<span class="hljs-comment">;</span>
registerBroadcastReceiver()<span class="hljs-comment">;</span></code></pre>
<p>1）当前类实现接口IWXRenderListener，可以参考weexteam里的AbsWeexActivity实现</p>
<p>2）注册的广播是DefaultBroadcastReceiver，可以可以参考weexteam里的AbsWeexActivity实现</p>
<p>然后讲一下渲染，支持本地js以及线上js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (url.startsWith(&quot;http&quot;)) {
    wxInstance.renderByUrl(
            getPageName(),
            url,
            options,
            jsonInitData,
            CommonUtils.getDisplayWidth(activity),
            CommonUtils.getDisplayHeight(activity),
            WXRenderStrategy.APPEND_ASYNC);

}else {
    new Thread(new Runnable() {
        @Override
        public void run() {
            String file = WeexUtils.readFile(url);
            handler.sendMessage(handler.obtainMessage(LOAD_LOCAL_FILE, file));
        }
    }).start();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">if</span> (url.startsWith(<span class="hljs-string">"http"</span>)) {
    wxInstance.renderByUrl(
            getPageName(),
            url,
            options,
            jsonInitData,
            CommonUtils.getDisplayWidth(activity),
            CommonUtils.getDisplayHeight(activity),
            WXRenderStrategy.APPEND_ASYNC);

}<span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">new</span> Thread(<span class="hljs-keyword">new</span> Runnable() {
        <span class="hljs-meta">@Override</span>
        <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">run</span><span class="hljs-params">()</span> </span>{
            String file = WeexUtils.readFile(url);
            <span class="hljs-keyword">handler</span>.sendMessage(<span class="hljs-keyword">handler</span>.obtainMessage(LOAD_LOCAL_FILE, file));
        }
    }).start();
}</code></pre>
<p>其中，getPageName()自定义即可，getDisplayWidth和getDisplayHeight获取屏幕宽高。</p>
<p>传入本地的存储地址时，先读取文件，然后同个Handler在UI线程渲染，如下：</p>
<p>接收LOAD_LOCAL_FILE后handler里的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="case LOAD_LOCAL_FILE:
                    if (activity.getLifeState() != LifeState.DESTORY ) {
                        if (wxInstance != null) {
                            String content = (String) msg.obj;
                            if (TextUtils.isEmpty(content)) {
                                SHJump.openUrl(activity, h5Url);
                                finishActivity();
                            }else {
                                wxInstance.render((String) msg.obj, null, null);
                            }
                        }
                    }
                    break;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-keyword">case</span> LOAD_LOCAL_FILE:
                    <span class="hljs-keyword">if</span> (activity.getLifeState() != LifeState.DESTORY ) {
                        <span class="hljs-keyword">if</span> (wxInstance != <span class="hljs-literal">null</span>) {
                            <span class="hljs-built_in">String</span> content = (<span class="hljs-built_in">String</span>) msg.obj<span class="hljs-comment">;</span>
                            <span class="hljs-keyword">if</span> (TextUtils.isEmpty(content)) {
                                SHJump.openUrl(activity, h5Url)<span class="hljs-comment">;</span>
                                finishActivity()<span class="hljs-comment">;</span>
                            }<span class="hljs-keyword">else</span> {
                                wxInstance.render((<span class="hljs-built_in">String</span>) msg.obj, <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>)<span class="hljs-comment">;</span>
                            }
                        }
                    }
                    <span class="hljs-built_in">break</span><span class="hljs-comment">;</span></code></pre>
<p>这里getLifeState()是我们自己BaseActivity的实现，可以自行判断。SHJump和finishActivity都是自己的实现，大家自己实现即可。</p>
<p>渲染回调的实现，按需要处理即可，渲染成功后隐藏loading，view创建后添加view。<code>渲染异常时降级跳转到h5</code>。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Override
public void onViewCreated(WXSDKInstance instance, View view) {
    //viewMap.put(weexJsUrl, view);
    addWeexView(view);
}
@Override
public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
    toHideLoading();
}
@Override
public void onRefreshSuccess(WXSDKInstance instance, int width, int height) {
    toHideLoading();
}
@Override
public void onException(WXSDKInstance instance, String errCode, String msg) {
    LogUtils.e(&quot;weex exception:&quot;, errCode, msg);
    SHJump.openUrlForce(activity, h5Url);
    finishActivity();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>Override
<span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onViewCreated</span><span class="hljs-params">(WXSDKInstance instance, View view)</span> </span>{
    <span class="hljs-comment">//viewMap.put(weexJsUrl, view);</span>
    addWeexView(view);
}
<span class="hljs-meta">@Override</span>
<span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onRenderSuccess</span><span class="hljs-params">(WXSDKInstance instance, <span class="hljs-keyword">int</span> width, <span class="hljs-keyword">int</span> height)</span> </span>{
    toHideLoading();
}
<span class="hljs-meta">@Override</span>
<span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onRefreshSuccess</span><span class="hljs-params">(WXSDKInstance instance, <span class="hljs-keyword">int</span> width, <span class="hljs-keyword">int</span> height)</span> </span>{
    toHideLoading();
}
<span class="hljs-meta">@Override</span>
<span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onException</span><span class="hljs-params">(WXSDKInstance instance, String errCode, String msg)</span> </span>{
    LogUtils.e(<span class="hljs-string">"weex exception:"</span>, errCode, msg);
    SHJump.openUrlForce(activity, h5Url);
    finishActivity();
}</code></pre>
<h3 id="articleHeader7">6、多个js在同个页面渲染</h3>
<p>为了实现如图的tab，一开始在.vue文件里使用tabbar组件，后来发现在Android机型适配上不够好。于是后来就将两个tab做成两个页面，生成两个js文件。首先渲染“我的订单.js”，生成如下的界面。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008641802?w=359&amp;h=637" src="https://static.alili.tech/img/remote/1460000008641802?w=359&amp;h=637" alt="Alt text" title="Alt text" style="cursor: pointer;"></span></p>
<p>然后点击“本店订单”时，调用自定义module里的接口<code>loadPage</code>，参数为h5的链接。<code>三端实现接口loadPage，h5直接跳转，而iOS和Android通过h5链接从weex跳转配置里找到对应的js，重新渲染显示</code>。下面具体做几点说明：</p>
<p>1）定义Map&lt;String, WXSDKInstance&gt; wxsdkInstanceMap;来存储不同js的WXSDKInstance，定义Map&lt;String, View&gt; viewMap来存储不同js渲染后的View。之所以要存储多个WXSDKInstance，是因为WXSDKInstance不能重复渲染，而且当WXSDKInstance destory后，之前渲染的view里的内容也会被清空。注意在在页面destory时，记得把所有WXSDKInstance都destory就好了。</p>
<p>2）viewMap里的key对应页面的js。点击tab切换页面时，如对应的js已渲染，则直接取出view来显示。</p>
<p>3）上文提到的<code>weex跳转配置</code>，在以下的跳转规则里一同介绍。</p>
<h1 id="articleHeader8">二、App的跳转规则的weex支持方案设计</h1>
<p>跳转规则如下图，如果看不清，可以到新页面放大查看。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008641803?w=940&amp;h=767" src="https://static.alili.tech/img/remote/1460000008641803?w=940&amp;h=767" alt="App跳转框架" title="App跳转框架" style="cursor: pointer; display: inline;"></span></p>
<p>主要介绍一下两个配置参数：</p>
<ul><li><p>在参数weexPages配置所有的weex页面。<br>示例如下：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
   {
       &quot;page&quot;:&quot;order&quot;,
       &quot;url&quot;:&quot;https://dshdjshjbx.js&quot;,
       &quot;md5&quot;:&quot;323827382huwhdjshdjs&quot;,
       &quot;h5&quot;:&quot;http://dsds.html&quot;
       &quot;v&quot;:&quot;1.5.0&quot;
    },
    {
       &quot;page&quot;:&quot;detail&quot;,
       &quot;url&quot;:&quot;https://dsdsds.js&quot;,
       &quot;md5&quot;:&quot;323827382huwhdjshdjs&quot;,
       &quot;h5&quot;:&quot;http://dsds.html&quot;
       &quot;v&quot;:&quot;1.5.0&quot;
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
   {
       <span class="hljs-attr">"page"</span>:<span class="hljs-string">"order"</span>,
       <span class="hljs-attr">"url"</span>:<span class="hljs-string">"https://dshdjshjbx.js"</span>,
       <span class="hljs-attr">"md5"</span>:<span class="hljs-string">"323827382huwhdjshdjs"</span>,
       <span class="hljs-attr">"h5"</span>:<span class="hljs-string">"http://dsds.html"</span>
       <span class="hljs-string">"v"</span>:<span class="hljs-string">"1.5.0"</span>
    },
    {
       <span class="hljs-attr">"page"</span>:<span class="hljs-string">"detail"</span>,
       <span class="hljs-attr">"url"</span>:<span class="hljs-string">"https://dsdsds.js"</span>,
       <span class="hljs-attr">"md5"</span>:<span class="hljs-string">"323827382huwhdjshdjs"</span>,
       <span class="hljs-attr">"h5"</span>:<span class="hljs-string">"http://dsds.html"</span>
       <span class="hljs-string">"v"</span>:<span class="hljs-string">"1.5.0"</span>
    }
]</code></pre>
<p><code>page</code>: 对应统一跳转的 path</p>
<p><code>url</code>: 需要渲染的js，</p>
<p><code>md5</code>: js文件的md5值用于校验，</p>
<p><code>h5</code>: 渲染失败后的降级方案,</p>
<p><code>v</code>: 最低支持的版本号</p>
<p>在页面访问h5页面时，拿url跟weexPages里的url进行对比，如果一致就采用weex打开。这里的对比，目前还比较简单粗暴，后续会进行优化，最终目标是<code>只对比</code>?<code>之前的一部分，后面的参数通过intent传入到weex页面，参与weex的渲染。</code></p>
<p>这样就达到了动态拦截，动态上线weex的目的。</p>
<h1 id="articleHeader9">三、js预加载方案</h1>
<p>前面讲到为了加快weex打开时间，会预加载js，这里就介绍一下js预加载的实现。</p>
<ul>
<li><p>1）每次更新完配置文件，遍历，查看是否存在md5一致的page_xxx.js文件，如果不存在则更新.</p></li>
<li>
<p>2）下载完成后，保存格式为xxx.js，校验md5</p>
<ul>
<li><p>相同的话，记录文件的最后修改时间；</p></li>
<li><p>不同的话，删除已下载文件，重新下载，重复校验流程。</p></li>
</ul>
</li>
<li><p>3）支持统一跳转协议，page对应目前app端的统一跳转协议里的page，有必要的时候可以替换原来的native页面，解决native页面错误不能及时修复的问题。加载失败的话，打开h5页面。</p></li>
<li>
<p>4）每次打开指定页面的时候，先检查本地是否有对应page文件，再检验最后修改时间是否跟记录的一致</p>
<ul>
<li><p>一致就加载</p></li>
<li><p>不一致就用线上url。</p></li>
</ul>
</li>
</ul>
<h1 id="articleHeader10">四、遇到的问题以及解决方法</h1>
<p><strong>问题一：上线后，发现在一些机型渲染失败，public void onException(WXSDKInstance instance, String errCode, String msg)回调里，errCode返回wx_create_instance_error，msg返回createInstance fail!</strong></p>
<p><strong>解决办法</strong>：将apk解压出来后，发现编译出了支持5种abi的包。然而libweexv8.so只在armeabi和x86里有，缺少对其它三种abi的支持，那么如果应用运行于arm64-v8a，x86_64，armeabi-v7a为首选abi的设备上时，就会加载失败了。其实arm64-v8a,armeabi-v7a，x86_64这三个abi，应用并不是必须要做支持，手机一般都会提供自动兼容。所以我们只要把对x86, arm64-v8a,x86_64的支持去掉就可以。如下在主模块的build.gradle的android里的defaultConfig内添加如下内容:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="defaultConfig {  
    ndk {  
        abiFilters &quot;armeabi&quot;, &quot;x86&quot;  
    }  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">defaultConfig</span> {  
    <span class="hljs-section">ndk</span> {  
        <span class="hljs-attribute">abiFilters</span> <span class="hljs-string">"armeabi"</span>, <span class="hljs-string">"x86"</span>  
    }  
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008641804?w=1360&amp;h=458" src="https://static.alili.tech/img/remote/1460000008641804?w=1360&amp;h=458" alt="enter image description here" title="enter image description here" style="cursor: pointer;"></span></p>
<p><strong>问题二：OkHttpAdapter里调用onHttpFinish出现解析异常</strong>，日志如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="com.alibaba.fastjson.JSONException: syntax error, pos 2
    at com.alibaba.fastjson.parser.DefaultJSONParser.parse(DefaultJSONParser.java:1300)
    at com.alibaba.fastjson.parser.DefaultJSONParser.parse(DefaultJSONParser.java:1210)
    at com.alibaba.fastjson.JSON.parse(JSON.java:109)
    at com.alibaba.fastjson.JSON.parse(JSON.java:100)
    at com.taobao.weex.http.WXStreamModule.parseJson(WXStreamModule.java:378)
    at com.taobao.weex.http.WXStreamModule$2.onResponse(WXStreamModule.java:365)
    at com.taobao.weex.http.WXStreamModule$StreamHttpListener.onHttpFinish(WXStreamModule.java:523)
    at com.showjoy.weex.commons.adapter.OkHttpAdapter$6.onResponse(OkHttpAdapter.java:161)
    at okhttp3.RealCall$AsyncCall.execute(RealCall.java:133)
    at okhttp3.internal.NamedRunnable.run(NamedRunnable.java:32)
    at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1113)
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:588)
    at java.lang.Thread.run(Thread.java:818) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>com<span class="hljs-selector-class">.alibaba</span><span class="hljs-selector-class">.fastjson</span><span class="hljs-selector-class">.JSONException</span>: syntax error, pos <span class="hljs-number">2</span>
    at com<span class="hljs-selector-class">.alibaba</span><span class="hljs-selector-class">.fastjson</span><span class="hljs-selector-class">.parser</span><span class="hljs-selector-class">.DefaultJSONParser</span><span class="hljs-selector-class">.parse</span>(DefaultJSONParser<span class="hljs-selector-class">.java</span>:<span class="hljs-number">1300</span>)
    at com<span class="hljs-selector-class">.alibaba</span><span class="hljs-selector-class">.fastjson</span><span class="hljs-selector-class">.parser</span><span class="hljs-selector-class">.DefaultJSONParser</span><span class="hljs-selector-class">.parse</span>(DefaultJSONParser<span class="hljs-selector-class">.java</span>:<span class="hljs-number">1210</span>)
    at com<span class="hljs-selector-class">.alibaba</span><span class="hljs-selector-class">.fastjson</span><span class="hljs-selector-class">.JSON</span><span class="hljs-selector-class">.parse</span>(JSON<span class="hljs-selector-class">.java</span>:<span class="hljs-number">109</span>)
    at com<span class="hljs-selector-class">.alibaba</span><span class="hljs-selector-class">.fastjson</span><span class="hljs-selector-class">.JSON</span><span class="hljs-selector-class">.parse</span>(JSON<span class="hljs-selector-class">.java</span>:<span class="hljs-number">100</span>)
    at com<span class="hljs-selector-class">.taobao</span><span class="hljs-selector-class">.weex</span><span class="hljs-selector-class">.http</span><span class="hljs-selector-class">.WXStreamModule</span><span class="hljs-selector-class">.parseJson</span>(WXStreamModule<span class="hljs-selector-class">.java</span>:<span class="hljs-number">378</span>)
    at com<span class="hljs-selector-class">.taobao</span><span class="hljs-selector-class">.weex</span><span class="hljs-selector-class">.http</span><span class="hljs-selector-class">.WXStreamModule</span>$<span class="hljs-number">2</span>.onResponse(WXStreamModule<span class="hljs-selector-class">.java</span>:<span class="hljs-number">365</span>)
    at com<span class="hljs-selector-class">.taobao</span><span class="hljs-selector-class">.weex</span><span class="hljs-selector-class">.http</span><span class="hljs-selector-class">.WXStreamModule</span><span class="hljs-variable">$StreamHttpListener</span>.onHttpFinish(WXStreamModule<span class="hljs-selector-class">.java</span>:<span class="hljs-number">523</span>)
    at com<span class="hljs-selector-class">.showjoy</span><span class="hljs-selector-class">.weex</span><span class="hljs-selector-class">.commons</span><span class="hljs-selector-class">.adapter</span><span class="hljs-selector-class">.OkHttpAdapter</span>$<span class="hljs-number">6</span>.onResponse(OkHttpAdapter<span class="hljs-selector-class">.java</span>:<span class="hljs-number">161</span>)
    at okhttp3.RealCall<span class="hljs-variable">$AsyncCall</span>.execute(RealCall<span class="hljs-selector-class">.java</span>:<span class="hljs-number">133</span>)
    at okhttp3<span class="hljs-selector-class">.internal</span><span class="hljs-selector-class">.NamedRunnable</span><span class="hljs-selector-class">.run</span>(NamedRunnable<span class="hljs-selector-class">.java</span>:<span class="hljs-number">32</span>)
    at java<span class="hljs-selector-class">.util</span><span class="hljs-selector-class">.concurrent</span><span class="hljs-selector-class">.ThreadPoolExecutor</span><span class="hljs-selector-class">.runWorker</span>(ThreadPoolExecutor<span class="hljs-selector-class">.java</span>:<span class="hljs-number">1113</span>)
    at java<span class="hljs-selector-class">.util</span><span class="hljs-selector-class">.concurrent</span><span class="hljs-selector-class">.ThreadPoolExecutor</span><span class="hljs-variable">$Worker</span>.run(ThreadPoolExecutor<span class="hljs-selector-class">.java</span>:<span class="hljs-number">588</span>)
    at java<span class="hljs-selector-class">.lang</span><span class="hljs-selector-class">.Thread</span><span class="hljs-selector-class">.run</span>(Thread<span class="hljs-selector-class">.java</span>:<span class="hljs-number">818</span>) </code></pre>
<p><strong>解决方法</strong>：catch异常</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
    if (null != listener) {
        listener.onHttpFinish(wxResponse);
    }
} catch (Exception e) {
    LogUtils.e(e);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">null</span> != listener) {
        listener.onHttpFinish(wxResponse);
    }
} <span class="hljs-keyword">catch</span> (<span class="hljs-keyword">Exception</span> e) {
    LogUtils.e(e);
}</code></pre>
<p><strong>问题三：相对地址以及线上线下环境切换问题。</strong></p>
<p><strong>解决方法</strong>：在最新版本已支持相对地址，在.vue文件里链接以及请求地址使用相对地址，h5页面自动选择该页面使用的域名，而在iOS和Android都做拦截处理，根据当前环境添加相应的域名。</p>
<ul>
<li><p>Android 实现URIAdapter 注入</p></li>
<li><p>iOS 实现WXURLRewriteProtocol 注入</p></li>
</ul>
<blockquote><p>参考链接：<br><a href="https://github.com/weexteam/" rel="nofollow noreferrer" target="_blank">https://github.com/weexteam/</a><br><a href="http://weex-project.io/doc/" rel="nofollow noreferrer" target="_blank">http://weex-project.io/doc/</a><br><a href="https://github.com/alibaba/weex/" rel="nofollow noreferrer" target="_blank">https://github.com/alibaba/weex/</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「Android」 详细全面的基于vue2.0Weex接入过程（Android视角）

## 原文链接
[https://segmentfault.com/a/1190000008641798](https://segmentfault.com/a/1190000008641798)


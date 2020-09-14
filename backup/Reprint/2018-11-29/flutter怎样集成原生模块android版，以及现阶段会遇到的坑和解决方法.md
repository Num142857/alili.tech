---
title: 'flutter怎样集成原生模块android版，以及现阶段会遇到的坑和解决方法' 
date: 2018-11-29 9:27:38
hidden: true
slug: wq1wumifstr
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">&#x524D;&#x8A00;</h1>
<p>&#x5728;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#x4E0A;&#x7EBF;&#x7684;app&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5355;&#x7EAF;&#x7684;&#x4F9D;&#x8D56;&#x67D0;&#x4E00;&#x79CD;&#x6846;&#x67B6;&#x5728;&#x5F53;&#x524D;&#x57FA;&#x672C;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x4E0D;&#x53EF;&#x907F;&#x514D;&#x7684;&#x9700;&#x8981;&#x591A;&#x79CD;&#x6280;&#x672F;&#x53C2;&#x4E0E;&#x3002;</p>
<p>&#x672C;&#x6587;&#x4EE5;&#x96C6;&#x6210;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x4E3A;&#x4F8B;&#xFF0C;&#x8BE6;&#x7EC6;&#x8BB2;&#x8FF0;&#x5982;&#x4F55;&#x5728;flutter&#x4E2D;&#x96C6;&#x6210;android&#x539F;&#x751F;&#x6A21;&#x5757;&#xFF0C;flutter&#x600E;&#x4E48;&#x8C03;&#x7528;java&#xFF0C;&#x4EE5;&#x53CA;java&#x5982;&#x4F55;&#x901A;&#x77E5;flutter&#x3002;</p>
<p>&#x4E3A;&#x4EC0;&#x4E48;&#x4EE5;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x4E3A;&#x4F8B;&#x5462;&#xFF0C;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x542B;jar&#x548C;so&#xFF0C;&#x6BD4;&#x8F83;&#x5168;&#x9762;&#xFF0C;&#x53C8;&#x662F;&#x4E00;&#x4E2A;&#x89C6;&#x56FE;&#x578B;&#x7684;&#x6846;&#x67B6;&#xFF0C;&#x6BD4;&#x8F83;&#x5BB9;&#x6613;&#x770B;&#x5230;&#x7ED3;&#x679C;&#x3002;</p>
<h1 id="articleHeader1">&#x521B;&#x5EFA;&#x4E00;&#x4E2A;plugin</h1>
<p>&#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x8FD0;&#x884C;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flutter create --template=plugin futter_baidu_map " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">flutter <span class="hljs-built_in">create</span> <span class="hljs-comment">--template=plugin futter_baidu_map </span></code></pre>
<p>&#x5728;android-studio&#x6253;&#x5F00;&#x9879;&#x76EE;</p>
<h1 id="articleHeader2">&#x6309;&#x7167;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x96C6;&#x6210;android&#x7248;&#x672C;</h1>
<p>&#x6587;&#x6863;&#x5730;&#x5740;:</p>
<p><a href="http://lbsyun.baidu.com/index.php?title=androidsdk/guide/create-project/ak" rel="nofollow noreferrer" target="_blank">http://lbsyun.baidu.com/index...</a></p>
<p>&#x8FD9;&#x91CC;&#x9009;&#x62E9;&#x60F3;&#x8981;&#x7684;&#x6A21;&#x5757;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbXJQ?w=532&amp;h=808" src="https://static.alili.tech/img/bVbbXJQ?w=532&amp;h=808" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&#x4E0B;&#x8F7D;&#x4E4B;&#x540E;&#x662F;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x7ED3;&#x6784;:</p>
<p><span class="img-wrap"><img data-src="/img/bVbbXHX?w=508&amp;h=384" src="https://static.alili.tech/img/bVbbXHX?w=508&amp;h=384" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>&#x5168;&#x90E8;&#x653E;&#x5230;&#x521A;&#x624D;&#x521B;&#x5EFA;&#x9879;&#x76EE;&#x7684;android&#x9879;&#x76EE;&#x7684;libs&#x76EE;&#x5F55;&#x4E2D;&#xFF0C;&#x8FD9;&#x4E2A;&#x76EE;&#x5F55;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E0B;&#xFF0C;&#x6700;&#x540E;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbXJZ?w=706&amp;h=890" src="https://static.alili.tech/img/bVbbXJZ?w=706&amp;h=890" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>&#x4FEE;&#x6539;&#x4E00;&#x4E0B;build.gradle&#xFF0C;&#x589E;&#x52A0;&#x4F9D;&#x8D56;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbXIY?w=1224&amp;h=862" src="https://static.alili.tech/img/bVbbXIY?w=1224&amp;h=862" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>&#x6253;&#x5F00;FlutterBaiduMapPlugin&#x7F16;&#x8F91;&#xFF0C;&#x521D;&#x6B21;&#x6253;&#x5F00;&#x4F1A;&#x51FA;&#x73B0;&#x8FD9;&#x4E2A;&#x63D0;&#x793A;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbXI7?w=2092&amp;h=854" src="https://static.alili.tech/img/bVbbXI7?w=2092&amp;h=854" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>&#x70B9;&#x51FB;&#x4E00;&#x4E0B;&#x53F3;&#x4E0A;&#x89D2;&#x7684; &quot;Setup SDK&quot;,</p>
<p><span class="img-wrap"><img data-src="/img/bVbbXJi?w=818&amp;h=470" src="https://static.alili.tech/img/bVbbXJi?w=818&amp;h=470" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>&#x8FD9;&#x91CC;&#x6309;&#x9700;&#x9009;&#x62E9;&#x914D;&#x7F6E;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x9009;&#x62E9;&#x4E86;Anroid API 27 Platform.</p>
<p>&#x4E0B;&#x9762;&#x7F16;&#x8F91;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5751;&#x6765;&#x4E86;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbXSt?w=1484&amp;h=1082" src="https://static.alili.tech/img/bVbbXSt?w=1484&amp;h=1082" alt="" title="" style="cursor: pointer;"></span></p>
<p>&#x8FD9;&#x91CC;&#x867D;&#x7136;&#x5BFC;&#x5165;&#x4E86;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x7684;&#x5E93;&#xFF0C;&#x4F9D;&#x8D56;&#x4E5F;&#x52A0;&#x4E86;&#xFF0C;&#x4F46;&#x662F;android studio&#x5C45;&#x7136;&#x8BC6;&#x522B;&#x4E0D;&#x51FA;&#x6765;&#xFF01;&#xFF01;&#xFF01;&#xFF01;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x56F0;&#x6270;&#x4E86;&#x6211;n&#x4E45;&#xFF0C;&#x751A;&#x81F3;&#x8FD8;&#x641E;&#x4E86;&#x4E00;&#x5957;flutter&#x7684;fake&#x4EE3;&#x7801;&#x653E;&#x5728;&#x5176;&#x4ED6;&#x9879;&#x76EE;&#x4E2D;&#x3002;</p>
<p>&#x8F6C;&#x6298;&#x6765;&#x4E86;......&#x4ECA;&#x5929;&#x5FFD;&#x7136;&#x53D1;&#x73B0;&#x8FD9;&#x91CC;&#x6709;&#x4E2A;&#x83DC;&#x5355;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbXXm?w=1744&amp;h=858" src="https://static.alili.tech/img/bVbbXXm?w=1744&amp;h=858" alt="" title="" style="cursor: pointer;"></span></p>
<p>&#x70B9;&#x51FB;&#x4E00;&#x4E0B;&#xFF0C;android-studio&#x4F1A;&#x65B0;&#x5F00;&#x4E00;&#x4E2A;&#x9879;&#x76EE;:</p>
<p><span class="img-wrap"><img data-src="/img/bVbbXXr?w=2170&amp;h=1166" src="https://static.alili.tech/img/bVbbXXr?w=2170&amp;h=1166" alt="" title="" style="cursor: pointer;"></span></p>
<p>&#x795E;&#x5947;&#x7684;&#x53D1;&#x73B0;&#xFF0C;&#x90A3;&#x4E9B;&#x7EA2;&#x8272;&#x7684;&#x4E0D;&#x80FD;&#x8BC6;&#x522B;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x6D88;&#x5931;&#x4E86;&#xFF01;&#xFF01;!</p>
<p><span class="img-wrap"><img data-src="/img/bVbbXX2?w=192&amp;h=198" src="https://static.alili.tech/img/bVbbXX2?w=192&amp;h=198" alt="" title="" style="cursor: pointer;"></span></p>
<p>&#x7EE7;&#x7EED;&#x5F80;&#x4E0B;&#x641E;&#xFF1A;</p>
<h1 id="articleHeader3">&#x96C6;&#x6210;&#x5B9A;&#x4F4D;&#x529F;&#x80FD;</h1>
<p>&#x6309;&#x7167;&#x8FD9;&#x91CC;&#x7684;&#x6307;&#x793A;&#x589E;&#x52A0;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#xFF0C;&#x7533;&#x8BF7;&#x4E00;&#x4E2A;key&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x7EC6;&#x8BF4;&#x4E86;<br><a href="http://lbsyun.baidu.com/index.php?title=androidsdk/guide/create-project/hellomap" rel="nofollow noreferrer" target="_blank">http://lbsyun.baidu.com/index...</a></p>
<h2 id="articleHeader4">&#x521D;&#x59CB;&#x5316;&#x5730;&#x56FE;SDK(flutter&#x8C03;&#x7528;java)_</h2>
<p>&#x4FEE;&#x6539;java&#x6587;&#x4EF6;&#xFF1A;com.example.flutterbaidumap.FlutterBaiduMapPlugin</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class FlutterBaiduMapPlugin implements MethodCallHandler {

  private Activity activity;
  private LocationManager mSysLocManager;


  public FlutterBaiduMapPlugin(Activity activity) {
    this.activity = activity;
  }

  /**
   * Plugin registration.
   */
  public static void registerWith(Registrar registrar) {
    final MethodChannel channel = new MethodChannel(registrar.messenger(), &quot;flutter_baidu_map&quot;);
    channel.setMethodCallHandler(new FlutterBaiduMapPlugin( registrar.activity() ));
  }

  @Override
  public void onMethodCall(MethodCall call, Result result) {
    if (call.method.equals(&quot;init&quot;)) {
      SDKInitializer.initialize(activity.getApplicationContext());
      try {
        if (mSysLocManager == null) {
          /** &#x83B7;&#x53D6;&#x7CFB;&#x7EDF;&#x7684;&#x5B9A;&#x4F4D;&#x670D;&#x52A1;&#x7BA1;&#x7406;&#x7C7B;*/
          mSysLocManager = (LocationManager) JNIInitializer.getCachedContext()
                  .getSystemService(Context.LOCATION_SERVICE);
        }
        //&#x6210;&#x529F;&#x8FD4;&#x56DE;true
        result.success(true);

      } catch (Exception e) {
        // &#x5931;&#x8D25;&#x8FD4;&#x56DE;false
        result.success(false );
      }

    } else {
      result.notImplemented();
    }
  }
}

" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FlutterBaiduMapPlugin</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">MethodCallHandler</span> </span>{

  <span class="hljs-keyword">private</span> Activity activity;
  <span class="hljs-keyword">private</span> LocationManager mSysLocManager;


  <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">FlutterBaiduMapPlugin</span><span class="hljs-params">(Activity activity)</span> </span>{
    <span class="hljs-keyword">this</span>.activity = activity;
  }

  <span class="hljs-comment">/**
   * Plugin registration.
   */</span>
  <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">registerWith</span><span class="hljs-params">(Registrar registrar)</span> </span>{
    <span class="hljs-keyword">final</span> MethodChannel channel = <span class="hljs-keyword">new</span> MethodChannel(registrar.messenger(), <span class="hljs-string">&quot;flutter_baidu_map&quot;</span>);
    channel.setMethodCallHandler(<span class="hljs-keyword">new</span> FlutterBaiduMapPlugin( registrar.activity() ));
  }

  <span class="hljs-meta">@Override</span>
  <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">onMethodCall</span><span class="hljs-params">(MethodCall call, Result result)</span> </span>{
    <span class="hljs-keyword">if</span> (call.method.equals(<span class="hljs-string">&quot;init&quot;</span>)) {
      SDKInitializer.initialize(activity.getApplicationContext());
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">if</span> (mSysLocManager == <span class="hljs-keyword">null</span>) {
          <span class="hljs-comment">/** &#x83B7;&#x53D6;&#x7CFB;&#x7EDF;&#x7684;&#x5B9A;&#x4F4D;&#x670D;&#x52A1;&#x7BA1;&#x7406;&#x7C7B;*/</span>
          mSysLocManager = (LocationManager) JNIInitializer.getCachedContext()
                  .getSystemService(Context.LOCATION_SERVICE);
        }
        <span class="hljs-comment">//&#x6210;&#x529F;&#x8FD4;&#x56DE;true</span>
        result.success(<span class="hljs-keyword">true</span>);

      } <span class="hljs-keyword">catch</span> (Exception e) {
        <span class="hljs-comment">// &#x5931;&#x8D25;&#x8FD4;&#x56DE;false</span>
        result.success(<span class="hljs-keyword">false</span> );
      }

    } <span class="hljs-keyword">else</span> {
      result.notImplemented();
    }
  }
}

</code></pre>
<p>&#x5728;dart&#x4E2D;&#x8C03;&#x7528;&#xFF1A;&#x4FEE;&#x6539;flutter_baidu_map.dart</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &apos;dart:async&apos;;

import &apos;package:flutter/services.dart&apos;;

class FlutterBaiduMap {
  static const MethodChannel _channel =
      const MethodChannel(&apos;flutter_baidu_map&apos;);

  static Future&lt;bool&gt; init() async {
    return await _channel.invokeMethod(&apos;init&apos;);
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs cs"><code>import <span class="hljs-string">&apos;dart:async&apos;</span>;

import <span class="hljs-string">&apos;package:flutter/services.dart&apos;</span>;

<span class="hljs-keyword">class</span> <span class="hljs-title">FlutterBaiduMap</span> {
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> MethodChannel _channel =
      <span class="hljs-function"><span class="hljs-keyword">const</span> <span class="hljs-title">MethodChannel</span>(<span class="hljs-params"><span class="hljs-string">&apos;flutter_baidu_map&apos;</span></span>)</span>;

  <span class="hljs-function"><span class="hljs-keyword">static</span> Future&lt;<span class="hljs-keyword">bool</span>&gt; <span class="hljs-title">init</span>(<span class="hljs-params"></span>) <span class="hljs-keyword">async</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> _channel.invokeMethod(<span class="hljs-string">&apos;init&apos;</span>);
  }
}
</code></pre>
<p>&#x5728;example&#x7684;main.dart&#x4E2D;&#x8FD9;&#x4E48;&#x8C03;&#x7528;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" @override
  initState() {

    initBaidu();

    super.initState();
  }

  void initBaidu() async{
    bool result = await FlutterBaiduMap.init();
    if(result){
      print(&quot;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x52A0;&#x8F7D;&#x6210;&#x529F;...&quot;);
    }else{
      print(&quot;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x52A0;&#x8F7D;&#x5931;&#x8D25;...&quot;);
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dart"><code> <span class="hljs-meta">@override</span>
  initState() {

    initBaidu();

    <span class="hljs-keyword">super</span>.initState();
  }

  <span class="hljs-keyword">void</span> initBaidu() <span class="hljs-keyword">async</span>{
    <span class="hljs-built_in">bool</span> result = <span class="hljs-keyword">await</span> FlutterBaiduMap.init();
    <span class="hljs-keyword">if</span>(result){
      <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x52A0;&#x8F7D;&#x6210;&#x529F;...&quot;</span>);
    }<span class="hljs-keyword">else</span>{
      <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x52A0;&#x8F7D;&#x5931;&#x8D25;...&quot;</span>);
    }
  }</code></pre>
<p>&#x8FD0;&#x884C;&#x8F93;&#x51FA;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbX5d?w=650&amp;h=146" src="https://static.alili.tech/img/bVbbX5d?w=650&amp;h=146" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">&#x76D1;&#x542C;&#x5730;&#x7406;&#x4F4D;&#x7F6E;(java&#x901A;&#x77E5;flutter)</h2>
<p>java&#x6587;&#x4EF6;&#x589E;&#x52A0;&#x5224;&#x65AD;&#xFF0C;&#x5E76;&#x589E;&#x52A0;&#x4E00;&#x4E2A;MethodChannel&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x5411;flutter&#x53D1;&#x9001;&#x6D88;&#x606F;&#x5168;&#x9760;&#x4ED6;&#x4E86;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package com.example.flutterbaidumap;

import android.app.Activity;
import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;

import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugin.common.MethodChannel.MethodCallHandler;
import io.flutter.plugin.common.MethodChannel.Result;
import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.PluginRegistry.Registrar;

import com.baidu.mapapi.JNIInitializer;

import com.baidu.mapapi.SDKInitializer;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;


/**
 * FlutterBaiduMapPlugin
 */
public class FlutterBaiduMapPlugin implements MethodCallHandler {

    private Activity activity;
    private LocationManager mSysLocManager;
    private MethodChannel channel;

    public FlutterBaiduMapPlugin(Activity activity,MethodChannel channel) {
        this.activity = activity;
        this.channel = channel;
    }

    /**
     * Plugin registration.
     */
    public static void registerWith(Registrar registrar) {
        final MethodChannel channel = new MethodChannel(registrar.messenger(), &quot;flutter_baidu_map&quot;);

        channel.setMethodCallHandler(new FlutterBaiduMapPlugin(registrar.activity(),channel));
    }

    @Override
    public void onMethodCall(final MethodCall call, final Result result) {
        if (call.method.equals(&quot;init&quot;)) {
            SDKInitializer.initialize(activity.getApplicationContext());
            try {
                if (mSysLocManager == null) {
                    /** &#x83B7;&#x53D6;&#x7CFB;&#x7EDF;&#x7684;&#x5B9A;&#x4F4D;&#x670D;&#x52A1;&#x7BA1;&#x7406;&#x7C7B;*/
                    mSysLocManager = (LocationManager) JNIInitializer.getCachedContext()
                            .getSystemService(Context.LOCATION_SERVICE);
                }
                //&#x6210;&#x529F;&#x8FD4;&#x56DE;true
                result.success(true);

            } catch (Exception e) {
                // &#x5931;&#x8D25;&#x8FD4;&#x56DE;false
                result.success(false);
            }

        } else if (call.method.equals(&quot;startLocation&quot;)) {

            mSysLocManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, listener);
            result.success(true);


        } else {
            result.notImplemented();
        }
    }


    private LocationListener listener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {
            Map&lt;String,Object&gt; data = new HashMap&lt;String,Object&gt;();
            data.put(&quot;latitude&quot;,location.getLatitude());
            data.put(&quot;longitude&quot;,location.getLongitude());
            data.put(&quot;result&quot;, &quot;onLocationChanged&quot;);
            channel.invokeMethod(&quot;onLocation&quot; ,data );
        }

        @Override
        public void onStatusChanged(String s, int i, Bundle bundle) {
            Map&lt;String,Object&gt; data = new HashMap&lt;String,Object&gt;();
            data.put(&quot;result&quot;, &quot;status&quot;);
            channel.invokeMethod(&quot;onLocation&quot; ,data );

        }

        @Override
        public void onProviderEnabled(String s) {
            Map&lt;String,Object&gt; data = new HashMap&lt;String,Object&gt;();
            data.put(&quot;result&quot;, &quot;onProviderEnabled&quot;);
            channel.invokeMethod(&quot;onLocation&quot; ,data );

        }

        @Override
        public void onProviderDisabled(String s) {
            Map&lt;String,Object&gt; data = new HashMap&lt;String,Object&gt;();
            data.put(&quot;result&quot;, &quot;onProviderDisabled&quot;);
            channel.invokeMethod(&quot;onLocation&quot; ,data );
        }
    };

}

" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">package</span> com.example.flutterbaidumap;

<span class="hljs-keyword">import</span> android.app.Activity;
<span class="hljs-keyword">import</span> android.content.Context;
<span class="hljs-keyword">import</span> android.location.Location;
<span class="hljs-keyword">import</span> android.location.LocationListener;
<span class="hljs-keyword">import</span> android.location.LocationManager;
<span class="hljs-keyword">import</span> android.os.Build;
<span class="hljs-keyword">import</span> android.os.Bundle;

<span class="hljs-keyword">import</span> io.flutter.plugin.common.MethodChannel;
<span class="hljs-keyword">import</span> io.flutter.plugin.common.MethodChannel.MethodCallHandler;
<span class="hljs-keyword">import</span> io.flutter.plugin.common.MethodChannel.Result;
<span class="hljs-keyword">import</span> io.flutter.plugin.common.MethodCall;
<span class="hljs-keyword">import</span> io.flutter.plugin.common.PluginRegistry.Registrar;

<span class="hljs-keyword">import</span> com.baidu.mapapi.JNIInitializer;

<span class="hljs-keyword">import</span> com.baidu.mapapi.SDKInitializer;

<span class="hljs-keyword">import</span> java.lang.reflect.Method;
<span class="hljs-keyword">import</span> java.util.<span class="hljs-keyword">HashMap</span>;
<span class="hljs-keyword">import</span> java.util.Map;


<span class="hljs-comment">/**
 * FlutterBaiduMapPlugin
 */</span>
<span class="hljs-keyword">public</span> class FlutterBaiduMapPlugin implements MethodCallHandler {

    <span class="hljs-keyword">private</span> Activity activity;
    <span class="hljs-keyword">private</span> LocationManager mSysLocManager;
    <span class="hljs-keyword">private</span> MethodChannel channel;

    <span class="hljs-keyword">public</span> FlutterBaiduMapPlugin(Activity activity,MethodChannel channel) {
        <span class="hljs-keyword">this</span>.activity = activity;
        <span class="hljs-keyword">this</span>.channel = channel;
    }

    <span class="hljs-comment">/**
     * Plugin registration.
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> registerWith(Registrar registrar) {
        <span class="hljs-keyword">final</span> MethodChannel channel = <span class="hljs-keyword">new</span> MethodChannel(registrar.messenger(), <span class="hljs-string">&quot;flutter_baidu_map&quot;</span>);

        channel.setMethodCallHandler(<span class="hljs-keyword">new</span> FlutterBaiduMapPlugin(registrar.activity(),channel));
    }

    @Override
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> onMethodCall(<span class="hljs-keyword">final</span> MethodCall call, <span class="hljs-keyword">final</span> Result result) {
        <span class="hljs-keyword">if</span> (call.method.equals(<span class="hljs-string">&quot;init&quot;</span>)) {
            SDKInitializer.initialize(activity.getApplicationContext());
            <span class="hljs-keyword">try</span> {
                <span class="hljs-keyword">if</span> (mSysLocManager == <span class="hljs-keyword">null</span>) {
                    <span class="hljs-comment">/** &#x83B7;&#x53D6;&#x7CFB;&#x7EDF;&#x7684;&#x5B9A;&#x4F4D;&#x670D;&#x52A1;&#x7BA1;&#x7406;&#x7C7B;*/</span>
                    mSysLocManager = (LocationManager) JNIInitializer.getCachedContext()
                            .getSystemService(Context.LOCATION_SERVICE);
                }
                <span class="hljs-comment">//&#x6210;&#x529F;&#x8FD4;&#x56DE;true</span>
                result.success(<span class="hljs-keyword">true</span>);

            } <span class="hljs-keyword">catch</span> (Exception e) {
                <span class="hljs-comment">// &#x5931;&#x8D25;&#x8FD4;&#x56DE;false</span>
                result.success(<span class="hljs-keyword">false</span>);
            }

        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (call.method.equals(<span class="hljs-string">&quot;startLocation&quot;</span>)) {

            mSysLocManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, listener);
            result.success(<span class="hljs-keyword">true</span>);


        } <span class="hljs-keyword">else</span> {
            result.notImplemented();
        }
    }


    <span class="hljs-keyword">private</span> LocationListener listener = <span class="hljs-keyword">new</span> LocationListener() {
        @Override
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> onLocationChanged(Location location) {
            Map&lt;<span class="hljs-keyword">String</span>,<span class="hljs-keyword">Object</span>&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-keyword">HashMap</span>&lt;<span class="hljs-keyword">String</span>,<span class="hljs-keyword">Object</span>&gt;();
            data.put(<span class="hljs-string">&quot;latitude&quot;</span>,location.getLatitude());
            data.put(<span class="hljs-string">&quot;longitude&quot;</span>,location.getLongitude());
            data.put(<span class="hljs-string">&quot;result&quot;</span>, <span class="hljs-string">&quot;onLocationChanged&quot;</span>);
            channel.invokeMethod(<span class="hljs-string">&quot;onLocation&quot;</span> ,data );
        }

        @Override
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> onStatusChanged(<span class="hljs-keyword">String</span> s, <span class="hljs-built_in">int</span> i, Bundle bundle) {
            Map&lt;<span class="hljs-keyword">String</span>,<span class="hljs-keyword">Object</span>&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-keyword">HashMap</span>&lt;<span class="hljs-keyword">String</span>,<span class="hljs-keyword">Object</span>&gt;();
            data.put(<span class="hljs-string">&quot;result&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>);
            channel.invokeMethod(<span class="hljs-string">&quot;onLocation&quot;</span> ,data );

        }

        @Override
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> onProviderEnabled(<span class="hljs-keyword">String</span> s) {
            Map&lt;<span class="hljs-keyword">String</span>,<span class="hljs-keyword">Object</span>&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-keyword">HashMap</span>&lt;<span class="hljs-keyword">String</span>,<span class="hljs-keyword">Object</span>&gt;();
            data.put(<span class="hljs-string">&quot;result&quot;</span>, <span class="hljs-string">&quot;onProviderEnabled&quot;</span>);
            channel.invokeMethod(<span class="hljs-string">&quot;onLocation&quot;</span> ,data );

        }

        @Override
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> onProviderDisabled(<span class="hljs-keyword">String</span> s) {
            Map&lt;<span class="hljs-keyword">String</span>,<span class="hljs-keyword">Object</span>&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-keyword">HashMap</span>&lt;<span class="hljs-keyword">String</span>,<span class="hljs-keyword">Object</span>&gt;();
            data.put(<span class="hljs-string">&quot;result&quot;</span>, <span class="hljs-string">&quot;onProviderDisabled&quot;</span>);
            channel.invokeMethod(<span class="hljs-string">&quot;onLocation&quot;</span> ,data );
        }
    };

}

</code></pre>
<p>&#x589E;&#x52A0;&#x8C03;&#x7528;,&#x4FEE;&#x6539;flutter_baidu_map.dart,&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x4F7F;&#x7528;StreamController&#x7684;add&#x65B9;&#x6CD5;&#x589E;&#x52A0;&#x4E8B;&#x4EF6;&#xFF0C;&#x5E76;&#x4F7F;&#x7528;StreamController&#x7684;stream&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x76D1;&#x542C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  static Future&lt;bool&gt; init() async {
    _channel.setMethodCallHandler(handler); //&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x4E00;&#x4E0B;&#x76D1;&#x542C;&#x51FD;&#x6570;
    return await _channel.invokeMethod(&apos;init&apos;);
  }
  static StreamController&lt;Map&gt; _locationUpdateStreamController = new StreamController.broadcast();
  static Stream&lt;Map&gt; get locationUpdate=&gt;_locationUpdateStreamController.stream;

  static Future&lt;dynamic&gt; handler(MethodCall call) {
    String method = call.method;

    switch (method) {
      case &quot;onLocation&quot;:
        {
          _locationUpdateStreamController.add( call.arguments );
        }
        break;
    }
    return new Future.value(&quot;&quot;);
  }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs cs"><code>
  <span class="hljs-function"><span class="hljs-keyword">static</span> Future&lt;<span class="hljs-keyword">bool</span>&gt; <span class="hljs-title">init</span>(<span class="hljs-params"></span>) <span class="hljs-keyword">async</span> </span>{
    _channel.setMethodCallHandler(handler); <span class="hljs-comment">//&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x4E00;&#x4E0B;&#x76D1;&#x542C;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> _channel.invokeMethod(<span class="hljs-string">&apos;init&apos;</span>);
  }
  <span class="hljs-keyword">static</span> StreamController&lt;Map&gt; _locationUpdateStreamController = <span class="hljs-keyword">new</span> StreamController.broadcast();
  <span class="hljs-keyword">static</span> Stream&lt;Map&gt; <span class="hljs-keyword">get</span> locationUpdate=&gt;_locationUpdateStreamController.stream;

  <span class="hljs-function"><span class="hljs-keyword">static</span> Future&lt;<span class="hljs-keyword">dynamic</span>&gt; <span class="hljs-title">handler</span>(<span class="hljs-params">MethodCall call</span>) </span>{
    String method = call.method;

    <span class="hljs-keyword">switch</span> (method) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;onLocation&quot;</span>:
        {
          _locationUpdateStreamController.<span class="hljs-keyword">add</span>( call.arguments );
        }
        <span class="hljs-keyword">break</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Future.<span class="hljs-keyword">value</span>(<span class="hljs-string">&quot;&quot;</span>);
  }</code></pre>
<p>&#x4FEE;&#x6539;main.dart</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void initBaidu() async{
    bool result = await FlutterBaiduMap.init();
    if(result){
      print(&quot;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x52A0;&#x8F7D;&#x6210;&#x529F;...&quot;);

     await FlutterBaiduMap.startLocation();
      print(&quot;&#x6B63;&#x5728;&#x76D1;&#x542C;...&quot;);

        //&#x8FD9;&#x91CC;&#x76D1;&#x542C;&#x4F4D;&#x7F6E;&#x6539;&#x53D8;
      FlutterBaiduMap.locationUpdate.listen(  (Map data){
        print(&quot;&#x83B7;&#x53D6;&#x5230;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x5B9A;&#x4F4D;:$data&quot;);
      });

    }else{
      print(&quot;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x52A0;&#x8F7D;&#x5931;&#x8D25;...&quot;);
    }
  }
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">void</span> initBaidu() <span class="hljs-keyword">async</span>{
    <span class="hljs-built_in">bool</span> result = <span class="hljs-keyword">await</span> FlutterBaiduMap.init();
    <span class="hljs-keyword">if</span>(result){
      <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x52A0;&#x8F7D;&#x6210;&#x529F;...&quot;</span>);

     <span class="hljs-keyword">await</span> FlutterBaiduMap.startLocation();
      <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;&#x6B63;&#x5728;&#x76D1;&#x542C;...&quot;</span>);

        <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x76D1;&#x542C;&#x4F4D;&#x7F6E;&#x6539;&#x53D8;</span>
      FlutterBaiduMap.locationUpdate.listen(  (<span class="hljs-built_in">Map</span> data){
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;&#x83B7;&#x53D6;&#x5230;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x5B9A;&#x4F4D;:$data&quot;</span>);
      });

    }<span class="hljs-keyword">else</span>{
      <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x52A0;&#x8F7D;&#x5931;&#x8D25;...&quot;</span>);
    }
  }
</code></pre>
<p>&#x8F93;&#x51FA;:</p>
<p><span class="img-wrap"><img data-src="/img/bVbbYgA?w=1044&amp;h=162" src="https://static.alili.tech/img/bVbbYgA?w=1044&amp;h=162" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">&#x5176;&#x4ED6;&#x9879;&#x76EE;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#xFF1A;</h2>
<p>&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#x662F;&#x53D1;&#x5E03;&#x5230;<a href="https://pub.dartlang.org" rel="nofollow noreferrer" target="_blank">https://pub.dartlang.org</a> &#x4E0A;&#x53BB;&#xFF0C;&#x53C2;&#x8003;&#x5B98;&#x7F51;&#x6307;&#x5F15;&#xFF1A;<a href="https://flutter.io/developing-packages/#publish" rel="nofollow noreferrer" target="_blank">https://flutter.io/developing...</a></p>
<p>&#x53E6;&#x4E00;&#x79CD;&#x662F;&#x8FD9;&#x8FB9;&#x8981;&#x8BB2;&#x7684;&#xFF1A;&#x672C;&#x5730;&#x4F9D;&#x8D56;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbYho?w=480&amp;h=268" src="https://static.alili.tech/img/bVbbYho?w=480&amp;h=268" alt="" title="" style="cursor: pointer;"></span></p>
<p>&#x628A;&#x4F7F;&#x7528;flutter_baidu_map&#x6A21;&#x5757;&#x7684;&#x9879;&#x76EE;&#x653E;&#x5728;&#x540C;&#x4E00;&#x5C42;&#x76EE;&#x5F55;&#x4E2D;&#xFF08;&#x5B9E;&#x9645;&#x4E0A;&#x8FD9;&#x4E2A;&#x4E5F;&#x6CA1;&#x6709;&#x5FC5;&#x8981;&#xFF09;&#xFF0C;&#x7F16;&#x8F91;&#x8C03;&#x7528;&#x65B9;&#x7684;pubspec.yaml&#xFF0C;&#x589E;&#x52A0;&#x4F9D;&#x8D56;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbYh6?w=864&amp;h=528" src="https://static.alili.tech/img/bVbbYh6?w=864&amp;h=528" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&#x6CA1;&#x9519;&#xFF0C;&#x5C31;&#x8FD9;&#x4E48;&#x7B80;&#x5355;,&#x7136;&#x540E;&#x5728;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x4E2D;&#x8FD0;&#x884C;&#x4E00;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flutter package get " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">flutter <span class="hljs-keyword">package</span> <span class="hljs-title">get </span></code></pre>
<p>&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x6109;&#x5FEB;&#x7684;&#x4F7F;&#x7528;&#x4E86;&#x3002;</p>
<h1 id="articleHeader7">&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#xFF1A;</h1>
<p>1&#x3001;flutter&#x8C03;&#x7528;java:</p>
<p>&#x521B;&#x5EFA;plugin&#xFF0C;&#x5E76;&#x5728;java&#x7684;Plugin&#x5B9E;&#x73B0;&#x7C7B;&#x4E2D;&#x5B9E;&#x73B0;onMethodCall&#x65B9;&#x6CD5;</p>
<p>2&#x3001;java&#x8C03;&#x7528;flutter&#xFF1A;</p>
<p>&#x5728;java&#x4E2D;&#x4F7F;&#x7528;MethodChannel&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x5728;dart&#x4E2D;&#x4F7F;&#x7528;StreamController&#x7ED3;&#x5408;StreamController.stream&#x5B9E;&#x73B0;&#x76D1;&#x542C;&#x3002;</p>
<p>3&#x3001;&#x5176;&#x4ED6;&#x9879;&#x76EE;&#x4F7F;&#x7528;plugin<br>&#x7F16;&#x8F91;pubspec.yaml,&#x589E;&#x52A0;&#x672C;&#x5730;&#x4F9D;&#x8D56;&#xFF0C;&#x6216;&#x8005;&#x53D1;&#x5E03;&#x5230;pub.dartlang.org</p>
<h2 id="articleHeader8">&#x4EE3;&#x7801;:</h2>
<p><a href="https://github.com/jzoom/flutter-example/tree/master/flutter_baidu_map" rel="nofollow noreferrer" target="_blank">https://github.com/jzoom/flut...</a></p>
<p>&#x5982;&#x6709;&#x7591;&#x95EE;&#xFF0C;&#x8BF7;&#x52A0;qq&#x7FA4;854192563&#x8BA8;&#x8BBA;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flutter怎样集成原生模块android版，以及现阶段会遇到的坑和解决方法

## 原文链接
[https://segmentfault.com/a/1190000015207414](https://segmentfault.com/a/1190000015207414)


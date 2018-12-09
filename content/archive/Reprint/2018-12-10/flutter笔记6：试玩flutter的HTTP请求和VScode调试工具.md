---
title: 'flutter笔记6：试玩flutter的HTTP请求和VScode调试工具' 
date: 2018-12-10 2:30:07
hidden: true
slug: d71wyjhfqy
categories: [reprint]
---

{{< raw >}}

                    
<p>Flutter集成了使用起来极其简洁的HTTP请求对象，参考<a href="https://flutter.io/networking/" rel="nofollow noreferrer" target="_blank">官方资料</a>，今天就找个调试工具来试试HTTP请求，如果想了解更丰富的信息，请参考<a href="https://docs.flutter.io/flutter/dart-io/dart-io-library.html" rel="nofollow noreferrer" target="_blank">官方API dart:io</a>，API列表在页面的右边。</p>
<h2 id="articleHeader0">第一步</h2>
<p>到免费开放http请求API的网站，如<a href="https://www.juhe.cn/docs/api/id/39" rel="nofollow noreferrer" target="_blank">聚合数据查询天气</a>，注册一个账号，然后申请这个免费的接口，当然你也可以申请别的免费API，比如我就申请了俩免费接口：<br><span class="img-wrap"><img data-src="/img/remote/1460000013712173" src="https://static.alili.tech/img/remote/1460000013712173" alt="免费HTTP接口" title="免费HTTP接口" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">第二步</h2>
<p>打开VScode，到终端找一个存放项目代码的目录，输入命令：</p>
<blockquote>flutter create myhttptest</blockquote>
<p>项目文件夹初始化完毕后，用VScode打开项目文件夹-&gt;打开main.dart，然后用以下代码覆盖初始化的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'dart:convert';    //集成了支持json、utf-8等数据格式的编码和解码器
import 'dart:io';        //集成了File, socket, HTTP等服务应用的IO库

import 'package:flutter/material.dart';

void main() {
  runApp(new MyApp()); 
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      home: new MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key}) : super(key: key);

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  var _ipAddress = 'Unknown';  //为啥要定义这个变量呢？为了后面只需要写一次setState()

  //异步执行用到async关键字
  _getIPAddress() async { 
    /*接口url地址，包含了请求地址http://op.juhe.cn/onebox/weather/query和两个参数cityname、AppKey*/
    var url = 'http://op.juhe.cn/onebox/weather/query?cityname=上海&amp;key=[替换成你的AppKey]';  
    var httpClient = new HttpClient();

    String result;
    //如同JAVA一样的语法：
    try {
      var request = await httpClient.postUrl(Uri.parse(url));  /*也可以使用httpClient.getUrl，注意根据接口要求改变两种请求方式的参数格式*/
      var response = await request.close();
      if (response.statusCode == HttpStatus.OK) {
        var json = await response.transform(UTF8.decoder).join();
        var data = JSON.decode(json);
        result = data['result']['data']['realtime'].toString();    //多维数组，请根据自己请求接口的结果对json数据结构进行拆解
      } else {
        result =
            'Error get:\nHttp status ${response.statusCode}';    //连接错误提示
      }
    } catch (exception) {
      result = 'Failed getting data';  //代码执行异常，抛出错误信息
    }
    //如果当前控件已经被注销掉，则当前控件内置状态为mounted。
    /*由于是前面的HTTP异步请求，如果网络卡住，而当前控件因为其他原因注销掉了，
      此时不必调让代码走到后面的setState()方法，否则会报错，所以这里直接return，避免报错。*/
    if (!mounted) return;

    setState(() {
      _ipAddress = result;    //显示请求结果
    });
  }

  @override
  Widget build(BuildContext context) {
    var spacer = new SizedBox(height: 32.0);

    return new Scaffold(
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new RaisedButton(
              onPressed: _getIPAddress,
              child: new Text('获取天气预报'),
            ),
            new Text('$_ipAddress.'),
            spacer,
          ],
        ),
      ),
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-symbol">'dart</span>:convert';    <span class="hljs-comment">//集成了支持json、utf-8等数据格式的编码和解码器</span>
<span class="hljs-keyword">import</span> <span class="hljs-symbol">'dart</span>:io';        <span class="hljs-comment">//集成了File, socket, HTTP等服务应用的IO库</span>

<span class="hljs-keyword">import</span> <span class="hljs-symbol">'package</span>:flutter/material.dart';

void main() {
  runApp(<span class="hljs-keyword">new</span> <span class="hljs-type">MyApp</span>()); 
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyApp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatelessWidget</span> </span>{
  <span class="hljs-meta">@override</span>
  <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">MaterialApp</span>(
      home: <span class="hljs-keyword">new</span> <span class="hljs-type">MyHomePage</span>(),
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyHomePage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatefulWidget</span> </span>{
  <span class="hljs-type">MyHomePage</span>({<span class="hljs-type">Key</span> key}) : <span class="hljs-keyword">super</span>(key: key);

  <span class="hljs-meta">@override</span>
  _MyHomePageState createState() =&gt; <span class="hljs-keyword">new</span> _MyHomePageState();
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">_MyHomePageState</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State&lt;MyHomePage&gt;</span> </span>{
  <span class="hljs-keyword">var</span> _ipAddress = <span class="hljs-symbol">'Unknow</span>n';  <span class="hljs-comment">//为啥要定义这个变量呢？为了后面只需要写一次setState()</span>

  <span class="hljs-comment">//异步执行用到async关键字</span>
  _getIPAddress() async { 
    <span class="hljs-comment">/*接口url地址，包含了请求地址http://op.juhe.cn/onebox/weather/query和两个参数cityname、AppKey*/</span>
    <span class="hljs-keyword">var</span> url = <span class="hljs-symbol">'http</span>:<span class="hljs-comment">//op.juhe.cn/onebox/weather/query?cityname=上海&amp;key=[替换成你的AppKey]';  </span>
    <span class="hljs-keyword">var</span> httpClient = <span class="hljs-keyword">new</span> <span class="hljs-type">HttpClient</span>();

    <span class="hljs-type">String</span> result;
    <span class="hljs-comment">//如同JAVA一样的语法：</span>
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">var</span> request = await httpClient.postUrl(<span class="hljs-type">Uri</span>.parse(url));  <span class="hljs-comment">/*也可以使用httpClient.getUrl，注意根据接口要求改变两种请求方式的参数格式*/</span>
      <span class="hljs-keyword">var</span> response = await request.close();
      <span class="hljs-keyword">if</span> (response.statusCode == <span class="hljs-type">HttpStatus</span>.<span class="hljs-type">OK</span>) {
        <span class="hljs-keyword">var</span> json = await response.transform(<span class="hljs-type">UTF8</span>.decoder).join();
        <span class="hljs-keyword">var</span> data = <span class="hljs-type">JSON</span>.decode(json);
        result = data[<span class="hljs-symbol">'resul</span>t'][<span class="hljs-symbol">'dat</span>a'][<span class="hljs-symbol">'realtim</span>e'].toString();    <span class="hljs-comment">//多维数组，请根据自己请求接口的结果对json数据结构进行拆解</span>
      } <span class="hljs-keyword">else</span> {
        result =
            <span class="hljs-symbol">'Error</span> get:\nHttp status ${response.statusCode}';    <span class="hljs-comment">//连接错误提示</span>
      }
    } <span class="hljs-keyword">catch</span> (exception) {
      result = <span class="hljs-symbol">'Failed</span> getting data';  <span class="hljs-comment">//代码执行异常，抛出错误信息</span>
    }
    <span class="hljs-comment">//如果当前控件已经被注销掉，则当前控件内置状态为mounted。</span>
    <span class="hljs-comment">/*由于是前面的HTTP异步请求，如果网络卡住，而当前控件因为其他原因注销掉了，
      此时不必调让代码走到后面的setState()方法，否则会报错，所以这里直接return，避免报错。*/</span>
    <span class="hljs-keyword">if</span> (!mounted) <span class="hljs-keyword">return</span>;

    setState(() {
      _ipAddress = result;    <span class="hljs-comment">//显示请求结果</span>
    });
  }

  <span class="hljs-meta">@override</span>
  <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
    <span class="hljs-keyword">var</span> spacer = <span class="hljs-keyword">new</span> <span class="hljs-type">SizedBox</span>(height: <span class="hljs-number">32.0</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Scaffold</span>(
      body: <span class="hljs-keyword">new</span> <span class="hljs-type">Center</span>(
        child: <span class="hljs-keyword">new</span> <span class="hljs-type">Column</span>(
          mainAxisAlignment: <span class="hljs-type">MainAxisAlignment</span>.center,
          children: &lt;<span class="hljs-type">Widget</span>&gt;[
            <span class="hljs-keyword">new</span> <span class="hljs-type">RaisedButton</span>(
              onPressed: _getIPAddress,
              child: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>('获取天气预报'),
            ),
            <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>('$_ipAddress.'),
            spacer,
          ],
        ),
      ),
    );
  }
}
</code></pre>
<p>注意看上面代码中的注释，用到了mounted，参考<a href="https://docs.flutter.io/flutter/widgets/State/mounted.html" rel="nofollow noreferrer" target="_blank">API</a>，意思是如果<strong>state</strong>对象实例创建后在执行<code>initState</code>动作前，会关联上<strong>BuildContext</strong>对象（对本篇内容好像没什么用），此时内置状态<strong>mounted</strong>标记为true，如果<strong>state</strong>对象实例执行了<code>dispose</code>动作，此时mounted=false，意味着此<strong>state</strong>对象实例已消亡，代码走到<code>setState()</code>方法时就会报错。</p>
<h2 id="articleHeader2">第三步</h2>
<p>手机连接好电脑后，记得打开WIFI或移动网络。</p>
<p>启用VScode的Debug工具，调试代码，如图所示：<br><span class="img-wrap"><img data-src="/img/remote/1460000013712174" src="https://static.alili.tech/img/remote/1460000013712174" alt="调试APP图解" title="调试APP图解" style="cursor: pointer; display: inline;"></span></p>
<p>相信有过开发经验的小伙伴理解上图应该没有什么难度，请尽情把玩吧，APP测试效果：<br><span class="img-wrap"><img data-src="/img/remote/1460000013712175" src="https://static.alili.tech/img/remote/1460000013712175" alt="运行效果" title="运行效果" style="cursor: pointer; display: inline;"></span></p>
<p>关闭WIFI后，请求失败的响应非常快，不会像浏览器卡一下才弹出出错页面，猜测应该是flutter能够从硬件层探测WIFI或移动网络是否启用吧。</p>
<p>可以看到Dart2语法下的HTTP请求代码非常简洁，比起ES5的回调函数用起来方便多了，其外还支持<strong>promise</strong>，对熟悉ES6语法的同学有福啦，参考<a href="https://docs.flutter.io/flutter/dart-io/HttpClient-class.html" rel="nofollow noreferrer" target="_blank">官方API</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HttpClient client = new HttpClient();
client.getUrl(Uri.parse(&quot;http://www.example.com/&quot;))
    .then((HttpClientRequest request) {
      // Optionally set up headers...
      // Optionally write to the request object...
      // Then call close.
      ...
      return request.close();
    })
    .then((HttpClientResponse response) {
      // Process the response.
      ...
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">HttpClient</span> client = <span class="hljs-keyword">new</span> <span class="hljs-built_in">HttpClient</span>();
client.getUrl(Uri.parse(<span class="hljs-string">"http://www.example.com/"</span>))
    .then((HttpClientRequest request) {
      <span class="hljs-comment">// Optionally set up headers...</span>
      <span class="hljs-comment">// Optionally write to the request object...</span>
      <span class="hljs-comment">// Then call close.</span>
      ...
      <span class="hljs-built_in">return</span> request.<span class="hljs-built_in">close</span>();
    })
    .then((HttpClientResponse response) {
      <span class="hljs-comment">// Process the response.</span>
      ...
    });
</code></pre>
<p>好啦，今天就介绍到这里，本篇比较简单，嫌太少的同学可以去文中引用的官方网站练练英语，偷个懒，哈哈哈，感谢大家捧场~<br><strong>flutter 中文社区（官方QQ群：338252156）</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flutter笔记6：试玩flutter的HTTP请求和VScode调试工具

## 原文链接
[https://segmentfault.com/a/1190000013712168](https://segmentfault.com/a/1190000013712168)


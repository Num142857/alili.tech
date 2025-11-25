---
title: 'Swoole完美支持ThinkPHP5' 
date: 2018-11-29 9:34:56
hidden: true
slug: v30rpdt2n
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Swoole完美支持ThinkPHP5</h1>
<h3 id="articleHeader1">1、首先要开启http的server</h3>
<ol><li>可以在thinkphp的目录下创建一个server目录，里面创建一个HTTPServer的php</li></ol>
<h3 id="articleHeader2">2、需要在WorkerStart回调事件做两件事</h3>
<ol>
<li>定义应用目录：<code>define('APP_PATH', __DIR__ . '/../application/');</code>
</li>
<li>加载基础文件：<code>require __DIR__ . '/../thinkphp/base.php';</code>
</li>
</ol>
<h3 id="articleHeader3">3、因为swoole接收get、post参数等和thinkphp中接收不一样，所以需要转换为thinkphp可识别，转换get参数示例如下：</h3>
<blockquote>
<strong>注意点：</strong> swoole对于超全局数组：<code>$_SERVER</code>、<code>$_GET</code>、<code>$_POST</code>、<code>define定义的常量</code>等不会释放，所以需要先清空一次</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 先清空
$_GET = [];
if (isset($request->get)) {
    foreach ($request->get as $key => $value) {
        $_GET[$key] = $value;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-comment">// 先清空</span>
$_GET = [];
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">isset</span>($request-&gt;get)) {
    <span class="hljs-keyword">foreach</span> ($request-&gt;get <span class="hljs-keyword">as</span> $key =&gt; $value) {
        $_GET[$key] = $value;
    }
}</code></pre>
<h3 id="articleHeader4">4、thinkphp会把模块、控制器、方法放到一个变量里去，所以通过pathinfo模式访问会存在只能访问第一次的pathinfo这个问题，worker进程里是不会注销变量的</h3>
<blockquote>
<strong>解决办法：</strong><br><code>thinkphp/library/think/Request.php</code><br><code>function path</code> 中的<code>if (is_null($this-&gt;path)) {}</code>注释或删除<br><code>function pathinfo</code>中的<code>if (is_null($this-&gt;pathinfo)) {}</code>注释或删除<br><strong>注意</strong>：只删除条件，不删除条件中的内容</blockquote>
<h3 id="articleHeader5">5、swoole支持thinkphp的http_server示例：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 面向过程写法

$http = new swoole_http_server('0.0.0.0', 9501);

$http->set([
    // 开启静态资源请求
    'enable_static_handler' => true,
    'document_root' => '/opt/app/live/public/static',
    'worker_num' => 5,
]);

/**
 * WorkerStart事件在Worker进程/Task进程启动时发生。这里创建的对象可以在进程生命周期内使用
 * 目的：加载thinkphp框架中的内容
 */
$http->on('WorkerStart', function (swoole_server $server, $worker_id) {
    // 定义应用目录
    define('APP_PATH', __DIR__ . '/../application/');
    // 加载基础文件
    require __DIR__ . '/../thinkphp/base.php';
});

$http->on('request', function ($request, $response) {

    // 把swoole接收的信息转换为thinkphp可识别的
    $_SERVER = [];
    if (isset($request->server)) {
        foreach ($request->server as $key => $value) {
            $_SERVER[strtoupper($key)] = $value;
        }
    }

    if (isset($request->header)) {
        foreach ($request->header as $key => $value) {
            $_SERVER[strtoupper($key)] = $value;
        }
    }

    // swoole对于超全局数组：$_SERVER、$_GET、$_POST、define不会释放
    $_GET = [];
    if (isset($request->get)) {
        foreach ($request->get as $key => $value) {
            $_GET[$key] = $value;
        }
    }

    $_POST = [];
    if (isset($request->post)) {
        foreach ($request->post as $key => $value) {
            $_POST[$key] = $value;
        }
    }

    // ob函数输出打印
    ob_start();
    try {
        think\Container::get('app', [APP_PATH]) ->run() ->send();
        $res = ob_get_contents();
        ob_end_clean();
    } catch (\Exception $e) {
        // todo
    }

    $response->end($res);
});

$http->start();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-comment">// 面向过程写法</span>

$http = <span class="hljs-keyword">new</span> swoole_http_server(<span class="hljs-string">'0.0.0.0'</span>, <span class="hljs-number">9501</span>);

$http-&gt;set([
    <span class="hljs-comment">// 开启静态资源请求</span>
    <span class="hljs-string">'enable_static_handler'</span> =&gt; <span class="hljs-keyword">true</span>,
    <span class="hljs-string">'document_root'</span> =&gt; <span class="hljs-string">'/opt/app/live/public/static'</span>,
    <span class="hljs-string">'worker_num'</span> =&gt; <span class="hljs-number">5</span>,
]);

<span class="hljs-comment">/**
 * WorkerStart事件在Worker进程/Task进程启动时发生。这里创建的对象可以在进程生命周期内使用
 * 目的：加载thinkphp框架中的内容
 */</span>
$http-&gt;on(<span class="hljs-string">'WorkerStart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(swoole_server $server, $worker_id)</span> </span>{
    <span class="hljs-comment">// 定义应用目录</span>
    define(<span class="hljs-string">'APP_PATH'</span>, <span class="hljs-keyword">__DIR__</span> . <span class="hljs-string">'/../application/'</span>);
    <span class="hljs-comment">// 加载基础文件</span>
    <span class="hljs-keyword">require</span> <span class="hljs-keyword">__DIR__</span> . <span class="hljs-string">'/../thinkphp/base.php'</span>;
});

$http-&gt;on(<span class="hljs-string">'request'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">($request, $response)</span> </span>{

    <span class="hljs-comment">// 把swoole接收的信息转换为thinkphp可识别的</span>
    $_SERVER = [];
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">isset</span>($request-&gt;server)) {
        <span class="hljs-keyword">foreach</span> ($request-&gt;server <span class="hljs-keyword">as</span> $key =&gt; $value) {
            $_SERVER[strtoupper($key)] = $value;
        }
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">isset</span>($request-&gt;header)) {
        <span class="hljs-keyword">foreach</span> ($request-&gt;header <span class="hljs-keyword">as</span> $key =&gt; $value) {
            $_SERVER[strtoupper($key)] = $value;
        }
    }

    <span class="hljs-comment">// swoole对于超全局数组：$_SERVER、$_GET、$_POST、define不会释放</span>
    $_GET = [];
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">isset</span>($request-&gt;get)) {
        <span class="hljs-keyword">foreach</span> ($request-&gt;get <span class="hljs-keyword">as</span> $key =&gt; $value) {
            $_GET[$key] = $value;
        }
    }

    $_POST = [];
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">isset</span>($request-&gt;post)) {
        <span class="hljs-keyword">foreach</span> ($request-&gt;post <span class="hljs-keyword">as</span> $key =&gt; $value) {
            $_POST[$key] = $value;
        }
    }

    <span class="hljs-comment">// ob函数输出打印</span>
    ob_start();
    <span class="hljs-keyword">try</span> {
        think\Container::get(<span class="hljs-string">'app'</span>, [APP_PATH]) -&gt;run() -&gt;send();
        $res = ob_get_contents();
        ob_end_clean();
    } <span class="hljs-keyword">catch</span> (\<span class="hljs-keyword">Exception</span> $e) {
        <span class="hljs-comment">// todo</span>
    }

    $response-&gt;end($res);
});

$http-&gt;start();</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Swoole完美支持ThinkPHP5

## 原文链接
[https://segmentfault.com/a/1190000015001872](https://segmentfault.com/a/1190000015001872)


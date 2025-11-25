---
title: '【日常填坑】之ajax请求laravel的api接口' 
date: 2019-01-26 2:30:18
hidden: true
slug: 8q7i5jlm1tl
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">关于作者</h3>
<blockquote>
<p>程序开发人员，不拘泥于语言与技术，目前主要从事PHP和前端开发，使用Laravel和VueJs，App端使用Apicloud混合式开发。合适和够用是最完美的追求。</p>
<p>个人网站：<a href="http://www.linganmin.cn" rel="nofollow noreferrer" target="_blank">http://www.linganmin.cn</a></p>
<p>最近刚写了一个手机在线播放的H5电影站：<a href="http://www.ifilm.ltd" rel="nofollow noreferrer" target="_blank">http://www.ifilm.ltd</a></p>
</blockquote>
<h2 id="articleHeader1">日常填坑手记</h2>
<h3 id="articleHeader2">关于Larave扩展<code>laravel-cors</code>使用的</h3>
<p><code>laravel-cors</code>的作用是用于解决浏览器跨域的问题</p>
<ol><li><p>安装</p></li></ol>
<p>在终端执行安装命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="composer require barryvdh/laravel-cors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">composer require barryvdh/laravel-cors</code></pre>
<ol><li><p>添加服务提供商</p></li></ol>
<p>在Laravel配置文件<code>app.php</code>的<code>providers</code>数组中添加如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Barryvdh\Cors\ServiceProvider::class," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json" style="word-break: break-word; white-space: initial;">Barryvdh\Cors\ServiceProvider::class,</code></pre>
<ol><li><p>发布配置文件</p></li></ol>
<p>执行在终端执行发布配置文件命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="php artisan vendor:publish --provider=&quot;Barryvdh\Cors\ServiceProvider&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">php artisan <span class="hljs-string">vendor:</span>publish --provider=<span class="hljs-string">"Barryvdh\Cors\ServiceProvider"</span></code></pre>
<p>执行后会在laravel目录下的config目录中新增<code>cors.php</code>配置文件，如下图</p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/6aedb651ly1fcz9pr2tn2j208s0cu0sx" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/6aedb651ly1fcz9pr2tn2j208s0cu0sx" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>至此<code>laravel-Cors</code>安装完成。</p>
<h4>备注</h4>
<ul><li><p>什么是跨域</p></li></ul>
<p>跨域是指从一个域名的网页去请求另一个域名的资源。比如从www.baidu.com 页面去请求 www.google.com 的资源。跨域的严格一点的定义是：只要 协议，域名，端口有任何一个的不同，就被当作是跨域</p>
<ul><li><p>为什么浏览器要限制跨域访问</p></li></ul>
<p>原因就是安全问题：如果一个网页可以随意地访问另外一个网站的资源，那么就有可能在客户完全不知情的情况下出现安全问题。</p>
<ul><li><p>为什么要跨域</p></li></ul>
<p>既然有安全问题，那为什么又要跨域呢？ 有时公司内部有多个不同的子域，比如一个是b.a.com ,而应用是放在c.a.com , 这时想从b.a.com去访问 location.company.com 的资源就属于跨域。</p>
<ul><li><p>如何解决跨域问题</p></li></ul>
<p>跨域访问需要用到两样东东，一个是JSON，一种基于文本的传输协议；一种是JSONP，一群码农想出来的跨域解决方案。</p>
<ul><li><p>服务端需要做的</p></li></ul>
<p>服务端要检查访问的请求参数，如果没有callback，则可以按照之前的流程走；如果带着callback参数，则需要将返回的结果包装在callback里面。</p>
<ul><li><p>客户端（浏览器）需要做的</p></li></ul>
<p>客户端可以多种方式可以实现JSONP的调用</p>
<ul><li><p>larave-cors做了什么</p></li></ul>
<p>CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。<br>它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。<br><code>laravel-cors</code>官方介绍入下：</p>
<blockquote><p>The <code>laravel-cors</code> package allows you to send Cross-Origin Resource Sharing headers with ACL-style per-url configuration.</p></blockquote>
<p>也就是说，<code>laravel-cors</code>是在服务端允许了所有带有跨域资源请求的header，并当成正常请求处理，从服务端解决了跨域资源共享的问题。</p>
<p>关于更多的<code>laravel-cors</code>使用配置，请移步 <a href="https://github.com/barryvdh/laravel-cors" rel="nofollow noreferrer" target="_blank">larave-cors官方GitHub仓库</a></p>
<h3 id="articleHeader3">填坑</h3>
<h4>入坑之前想说的话</h4>
<p>要说遇到的坑，首先要介绍一下laravel处理的路由模式，官方文档这样说：</p>
<blockquote><p>所有的 Laravel 路由都在 routes 目录中的路由文件中定义，这些文件都由框架自动加载。 routes/web.php 文件中定义你的 web 页面路由。这些路由都会应用 web 中间件组，其提供了诸如 Session 和 CSRF 保护等特性。定义在 routes/api.php 中的路由都是无状态的，并且会应用 api 中间件组。</p></blockquote>
<p>可以得到的信息如下：</p>
<ol>
<li><p>laravel中有两个默认路由配置，一个是routes目录下的<code>web.php</code>，一个是routes目录下的<code>api.php</code>；</p></li>
<li><p><code>web.php</code>中定义的路由默认使用了Session 和 CSRF 保护等特性，所以可以直接使用会话技术，也就是正常的页面请求处理是默认走的<code>web.php</code>中定义的路由或路由组</p></li>
<li><p><code>api.php</code>的所有路由都是无状态的，并且没有使用Session 和 CSRF 保护的特性保护，所以里面定义的路由更适合为app提供接口，laravel默认当用户的请求路由前缀为<code>api</code>时，laravel自动去调用<code>api.php</code>中所定义的路由或路由组。这是因为，在laravel的<code>路由服务提供者</code>中配置了路由前缀为<code>api</code>，下图为<code>路由服务提供者</code>所在目录路径<br><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/6aedb651ly1fcze890g10j208506x3yi" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/6aedb651ly1fcze890g10j208506x3yi" alt="" title="" style="cursor: pointer; display: inline;"></span></p></li>
</ol>
<p>下图为无状态路由组<code>api.php</code>的配置：<br><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/6aedb651ly1fczebo8xp1j20ge08lwes" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/6aedb651ly1fczebo8xp1j20ge08lwes" alt="" title="" style="cursor: pointer; display: inline;"></span><br>所以当url以类似<code>www.xxx.com/api/route</code>的请求时会自动调用<code>api.php</code>路由组所定义的路由</p>
<h4>进坑</h4>
<p>上面说到<code>api.php</code>中定义的路由为无状态的，而且<code>api.php</code>中更适合提供api接口，所以为了解决跨域我们安装了<code>laravel-cors</code>，而仅仅安装还是不够的，我们需要在会产生跨域的路由组中使用<code>laravel-cors</code>为我们提供的中间件，所以我们可以这样使用<code>laravel-cors</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 给需要跨域的路由增加cors中间件
Route::group(['middleware' => 'cors'], function(Router $router){
    $router->get('api', 'ApiController@index');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-comment">// 给需要跨域的路由增加cors中间件</span>
Route::group([<span class="hljs-string">'middleware'</span> =&gt; <span class="hljs-string">'cors'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(Router $router)</span></span>{
    $router-&gt;get(<span class="hljs-string">'api'</span>, <span class="hljs-string">'ApiController@index'</span>);
});</code></pre>
<p>当我们整个<code>api.php</code>路由组全部需要跨域时，我们还可以在laravel框架的appHttpKernel.php文件中配置<code>api.php</code>路由组中增加<code>cors</code>中间件，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            'throttle:60,1',
            'bindings',
            'cors'// install laravel-cros 增加cors中间件，解决跨域问题
        ],
    ];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-comment">/**
     * The application's route middleware groups.
     *
     * <span class="hljs-doctag">@var</span> array
     */</span>
    <span class="hljs-keyword">protected</span> $middlewareGroups = [
        <span class="hljs-string">'web'</span> =&gt; [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        <span class="hljs-string">'api'</span> =&gt; [
            <span class="hljs-string">'throttle:60,1'</span>,
            <span class="hljs-string">'bindings'</span>,
            <span class="hljs-string">'cors'</span><span class="hljs-comment">// install laravel-cros 增加cors中间件，解决跨域问题</span>
        ],
    ];</code></pre>
<blockquote><p>注意，如果安装<code>laravel-cors</code>之后还是出现跨域问题，一定一定不要忘记检查一下是否增加了<code>cors</code>中间件</p></blockquote>
<h3 id="articleHeader4">说说laravel的表单验证</h3>
<p>具体的表单验证请查看官方给出的文档（laravel的中文文档像laravel框架一样优雅），附上 <a href="https://laravel-china.org/docs/5.3/validation" rel="nofollow noreferrer" target="_blank">laravel表单验证中文文档地址</a></p>
<p>下面很重要</p>
<hr>
<p>想说的是当ajax请求时，如果表单验证失败，则会产生一次重定向，然后传回一个 HTTP 响应，其中包含了 422 状态码和验证错误的 JSON 数据，但是我们在客户端看到的却有可能是一个关于ajax跨域的错误，这是因为我们在使用jquery或者其他JavaScript包的ajax请求方法请求时，没有指定返回的数据类型为json，而laravel的错误处理默认解析为普通web请求，laravel表单验证规则上面也说到了，当验证失败，会产生一次重定向，而我们会看到的却是一个关于跨域的报错，下面是一个例子：</p>
<ul><li><p>在<code>api.php</code>路由组中定义了登录路由如下</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 登录路由，使用依赖注入请求验证
    Route::post('login', function (\App\Http\Requests\LoginRequest $request) {  
        // 获取到通过请求的两个字段
        $checkInfo = \Illuminate\Support\Facades\Input::only('mobile', 'password');
        try {
            // 为该用户验证，验证通过则生成token，失败返回错误提示
            if (!$token = JWTAuth::attempt($checkInfo)) {
                return Response::json(['error' => '账号或密码错误'], 401);
            }
            return [
                'user'=>JWTAuth::toUser($token),
                'token'=>$token
            ];
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            // 返回捕获的异常
            return Response::json($e->getMessage(), 500);
        }
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php">    <span class="hljs-comment">// 登录路由，使用依赖注入请求验证</span>
    Route::post(<span class="hljs-string">'login'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(\App\Http\Requests\LoginRequest $request)</span> </span>{  
        <span class="hljs-comment">// 获取到通过请求的两个字段</span>
        $checkInfo = \Illuminate\Support\Facades\Input::only(<span class="hljs-string">'mobile'</span>, <span class="hljs-string">'password'</span>);
        <span class="hljs-keyword">try</span> {
            <span class="hljs-comment">// 为该用户验证，验证通过则生成token，失败返回错误提示</span>
            <span class="hljs-keyword">if</span> (!$token = JWTAuth::attempt($checkInfo)) {
                <span class="hljs-keyword">return</span> Response::json([<span class="hljs-string">'error'</span> =&gt; <span class="hljs-string">'账号或密码错误'</span>], <span class="hljs-number">401</span>);
            }
            <span class="hljs-keyword">return</span> [
                <span class="hljs-string">'user'</span>=&gt;JWTAuth::toUser($token),
                <span class="hljs-string">'token'</span>=&gt;$token
            ];
        } <span class="hljs-keyword">catch</span> (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            <span class="hljs-comment">// 返回捕获的异常</span>
            <span class="hljs-keyword">return</span> Response::json($e-&gt;getMessage(), <span class="hljs-number">500</span>);
        }
    });
</code></pre>
<ul><li><p>在<code>api.php</code>路由组中使用的表单验证类<code>\App\Http\Requests\LoginRequest</code>定义如下</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php

namespace App\Http\Requests;

use App\User;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // 调用了模型静态属性定义好的验证规则
        return User::$rules;
    }
    public function messages()
    {
        // 调用了模型静态属性定义好的验证规则提示
        return User::$messages;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span>

<span class="hljs-keyword">namespace</span> <span class="hljs-title">App</span>\<span class="hljs-title">Http</span>\<span class="hljs-title">Requests</span>;

<span class="hljs-keyword">use</span> <span class="hljs-title">App</span>\<span class="hljs-title">User</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">Illuminate</span>\<span class="hljs-title">Foundation</span>\<span class="hljs-title">Http</span>\<span class="hljs-title">FormRequest</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoginRequest</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">FormRequest</span>
</span>{
    <span class="hljs-comment">/**
     * Determine if the user is authorized to make this request.
     *
     * <span class="hljs-doctag">@return</span> bool
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">authorize</span><span class="hljs-params">()</span>
    </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
    }

    <span class="hljs-comment">/**
     * Get the validation rules that apply to the request.
     *
     * <span class="hljs-doctag">@return</span> array
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rules</span><span class="hljs-params">()</span>
    </span>{
        <span class="hljs-comment">// 调用了模型静态属性定义好的验证规则</span>
        <span class="hljs-keyword">return</span> User::$rules;
    }
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">messages</span><span class="hljs-params">()</span>
    </span>{
        <span class="hljs-comment">// 调用了模型静态属性定义好的验证规则提示</span>
        <span class="hljs-keyword">return</span> User::$messages;
    }
}
</code></pre>
<ul><li><p>在用户模型中定义的验证规则和验证提示如下</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    public static $rules = [
        'mobile'=>'required',
        'password'=>'required'
    ];

    public static $messages = [
        'mobile.required'=>'手机号不能为空',
        'password.required'=>'密码不能为空'
    ];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php">    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> $rules = [
        <span class="hljs-string">'mobile'</span>=&gt;<span class="hljs-string">'required'</span>,
        <span class="hljs-string">'password'</span>=&gt;<span class="hljs-string">'required'</span>
    ];

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> $messages = [
        <span class="hljs-string">'mobile.required'</span>=&gt;<span class="hljs-string">'手机号不能为空'</span>,
        <span class="hljs-string">'password.required'</span>=&gt;<span class="hljs-string">'密码不能为空'</span>
    ];</code></pre>
<ul><li><p>使用jquery的post请求发送ajax请求</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.post('http://192.168.1.6:9999/api/login',{},function(data){
    console.log(data)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.post(<span class="hljs-string">'http://192.168.1.6:9999/api/login'</span>,{},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(data)
});</code></pre>
<p>因为该post请求并未传递任何参数，所以验证可能是未通过，但我们看到的确实一个关于跨域失败的报错，如下图<br><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/6aedb651ly1fd04636bmcj20me0583ys" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/6aedb651ly1fd04636bmcj20me0583ys" alt="" title="" style="cursor: pointer;"></span><br>产生这个报错是因为我们在发送post请求时没有指定期望返回的数据类型，而laravel框架就将其判断为一个普通的web请求，并返回302跳转到发送请求的页面，在这个过程中产生了跨域，如下图</p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/6aedb651ly1fd093e0tv0j20ct0f2gmw" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/6aedb651ly1fd093e0tv0j20ct0f2gmw" alt="" title="" style="cursor: pointer;"></span></p>
<p>所以当我们在发送ajax请求时，指定期望的返回类型时，就可以看到laravel为我们返回的422的验证失败的报错了，代码和效果如下图：</p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/6aedb651ly1fd09e8yqovj20o804vjrk" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/6aedb651ly1fd09e8yqovj20o804vjrk" alt="" title="" style="cursor: pointer;"></span></p>
<p>对应报错返回的json数据如下图:<br><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/6aedb651ly1fd09gk1xxhj20ld012wea" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/6aedb651ly1fd09gk1xxhj20ld012wea" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/6aedb651ly1fd09h3gkv5j20jk03ajrg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/6aedb651ly1fd09h3gkv5j20jk03ajrg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>所以，在请求laravel的接口时一定要指定期望的返回数据类型</p></blockquote>
<hr>
<p><a href="http://www.linganmin.cn/" rel="nofollow noreferrer" target="_blank">安小下同学</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【日常填坑】之ajax请求laravel的api接口

## 原文链接
[https://segmentfault.com/a/1190000008445102](https://segmentfault.com/a/1190000008445102)


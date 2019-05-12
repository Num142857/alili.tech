---
title: 'vuejs开发H5页面总结' 
date: 2019-01-10 2:30:08
hidden: true
slug: p5kbcqgrtz
categories: [reprint]
---

{{< raw >}}

                    
<p>最近参与了APP内嵌H5页面的开发，这次使用vuejs替代了jQuery，仅仅把vuejs当做一个库来使用，效率提高之外代码可读性更强，在此分享一下自己的一些开发中总结的经验。</p>
<h1 id="articleHeader0">关于布局方案</h1>
<p>当拿到设计师给的UI设计图，前端的首要任务就是布局和样式，相信这对于大部分前端工程师来说已经不是什么难题了。移动端的布局相对PC较为简单，关键在于<strong>对不同设备的适配</strong>。之前介绍了一篇关于移动端<a href="http://www.huzerui.com/blog/2016/06/16/mobile-rem/" rel="nofollow noreferrer" target="_blank">rem布局方案</a>，这大致是网易H5的适配方案。不过实践中发现淘宝开源的<a href="https://github.com/amfe/lib-flexible" rel="nofollow noreferrer" target="_blank">可伸缩布局方案</a>效果更好且更容易使用。</p>
<p>网易云的方案总结为：根据<strong>屏幕大小 / 750 = 所求字体 / 基准字体大小</strong>比值相等，动态调节html的font-size大小。</p>
<p>淘宝的方案总结为：根据设备设备像素比设置scale的值，保持视口device-width始终等于设备物理像素，接着根据屏幕大小动态计算根字体大小，具体是将屏幕划分为10等分，每份为a，1rem就等于10a。</p>
<p>通常我们会拿到750宽的设计稿，这是基于iPhone6的物理分辨率。有的设计师也许会偷懒，设计图上面没有任何的标注，如果我们边开发边量尺寸，无疑效率是比较低的。要么让设计师标注上，要么自食其力。如果设计师实在没有时间，推荐使用<a href="http://www.getmarkman.com/" rel="nofollow noreferrer" target="_blank">markman</a>进行标注，免费版阉割了一些功能（比如无法保存本地）不过基本满足了我们的需求了。</p>
<p>标注完成后开始写我们的样式，使用了淘宝的lib-flexible库之后，我们的根字体基准值就为750/100*10 = 75px。此时我们从图中若某个标注为100px，那么css中就应该设置为100/75 = 1.333333rem。所以为了提高开发效率，可以使用px转化为rem的插件。如果你使用sublimeText，可以用 <a href="https://packagecontrol.io/packages/rem-unit" rel="nofollow noreferrer" target="_blank">rem-unit</a><br><span class="img-wrap"><img data-src="/img/remote/1460000010030853" src="https://static.alili.tech/img/remote/1460000010030853" alt="rem-unit" title="rem-unit" style="cursor: pointer;"></span><br>如果你用vscode编辑器，推荐 <a href="https://marketplace.visualstudio.com/items?itemName=cipchk.cssrem" rel="nofollow noreferrer" target="_blank">cssrem</a><br><span class="img-wrap"><img data-src="/img/remote/1460000010030854" src="https://static.alili.tech/img/remote/1460000010030854" alt="pxtorem" title="pxtorem" style="cursor: pointer;"></span></p>
<p>使用rem单位注意以下几点：</p>
<ol>
<li><p>在所有的单位中，font-size推荐使用px，然后结合媒体查询进行重要节点的控制，这样可以满足突出或者弱化某些字体的需求，而非整体调整。</p></li>
<li><p>众向的单位可以全部使用px，横向的使用rem，因为移动设备宽度有限，而高度可以无限向下滑动。但这也有特例，比如对于一些活动注册页面，需要在一屏幕内完全显示，没有下拉，这时候所有众向或者横向都应该使用rem作为单位。如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000010030855" src="https://static.alili.tech/img/remote/1460000010030855" alt="rem-desc" title="rem-desc" style="cursor: pointer; display: inline;"></span></p></li>
</ol>
<p>左图的表单高度单位由于下边空距较大，使用px在不同屏幕显示更加；而右边的活动注册页由于不能出现滚动条，所有的众向高度、margin、padding都应该使用rem。</p>
<ol><li><p>border、box-shadow、border-radius等一些效果应该使用px作为单位。</p></li></ol>
<h1 id="articleHeader1">基于接口返回数据的属性注入</h1>
<p>可能大家不明白什么叫"基于接口返回数据的属性注入"，在此之前，先说一下表单数据的绑定方式，一个重要的点是<strong>有几份表单就分开几个表单对象进行数据绑定</strong>。</p>
<p>已上图公积金查询为例，由于不同城市会有不同的查询要素，可能登陆方式只有一种，也可能有几种。比如上图有三种登陆方式，在使用vue布局时，有两种方案。一是只建立一个表单用于数据绑定，点击按钮触发判断；而是有几种登陆方式建立几个表单，用一个字段标识当前显示的表单。由于使用第三方的接口，一开始也没有先进行接口返回数据结构的查看，采用了第一种错误的方式，错误一是每种登陆方式下面的登陆要素的数量也不同，错误二是数据绑定在同一个表单data下，当用户在用户名登陆方式输入用户名密码后，切换到客户号登陆方式，就会出现数据错乱的情况。</p>
<p>解决完布局问题后，我们需要根据设计图定义一些状态，比如当前登陆方式的切换、同意授权状态的切换、按钮是否可以点击的状态、是否处于请求中的状态。当然还有一些app穿过来的数据，这里就忽略了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" data: {
     tags: {
         arr: [''],
         activeIndex: 0
     },
     isAgreeProxy: true,
     isLoading: false
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> data: {
     <span class="hljs-attr">tags</span>: {
         <span class="hljs-attr">arr</span>: [<span class="hljs-string">''</span>],
         <span class="hljs-attr">activeIndex</span>: <span class="hljs-number">0</span>
     },
     <span class="hljs-attr">isAgreeProxy</span>: <span class="hljs-literal">true</span>,
     <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>
 }</code></pre>
<p>接着审查一下接口返回的数据，推荐使用chrome插件postman，比如呼和浩特的登陆要素如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;code&quot;: 2005,
    &quot;data&quot;: [
        {
            &quot;name&quot;: &quot;login_type&quot;,
            &quot;label&quot;: &quot;身份证号&quot;,
            &quot;fields&quot;: [
                {
                    &quot;name&quot;: &quot;user_name&quot;,
                    &quot;label&quot;: &quot;身份证号&quot;,
                    &quot;type&quot;: &quot;text&quot;
                },
                {
                    &quot;name&quot;: &quot;user_pass&quot;,
                    &quot;label&quot;: &quot;密码&quot;,
                    &quot;type&quot;: &quot;password&quot;
                }
            ],
            &quot;value&quot;: &quot;1&quot;
        },
        {
            &quot;name&quot;: &quot; login_type&quot;,
            &quot;label&quot;: &quot;公积金账号&quot;,
            &quot;fields&quot;: [
                {
                    &quot;name&quot;: &quot;user_name&quot;,
                    &quot;label&quot;: &quot;公积金账号&quot;,
                    &quot;type&quot;: &quot;text&quot;
                },
                {
                    &quot;name&quot;: &quot;user_pass&quot;,
                    &quot;label&quot;: &quot;密码&quot;,
                    &quot;type&quot;: &quot;password&quot;
                }
            ],
            &quot;value&quot;: &quot;0&quot;
        }
    ],
    &quot;message&quot;: &quot;登录要素请求成功&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-string">"code"</span>: <span class="hljs-number">2005</span>,
    <span class="hljs-string">"data"</span>: [
        {
            <span class="hljs-string">"name"</span>: <span class="hljs-string">"login_type"</span>,
            <span class="hljs-string">"label"</span>: <span class="hljs-string">"身份证号"</span>,
            <span class="hljs-string">"fields"</span>: [
                {
                    <span class="hljs-string">"name"</span>: <span class="hljs-string">"user_name"</span>,
                    <span class="hljs-string">"label"</span>: <span class="hljs-string">"身份证号"</span>,
                    <span class="hljs-string">"type"</span>: <span class="hljs-string">"text"</span>
                },
                {
                    <span class="hljs-string">"name"</span>: <span class="hljs-string">"user_pass"</span>,
                    <span class="hljs-string">"label"</span>: <span class="hljs-string">"密码"</span>,
                    <span class="hljs-string">"type"</span>: <span class="hljs-string">"password"</span>
                }
            ],
            <span class="hljs-string">"value"</span>: <span class="hljs-string">"1"</span>
        },
        {
            <span class="hljs-string">"name"</span>: <span class="hljs-string">" login_type"</span>,
            <span class="hljs-string">"label"</span>: <span class="hljs-string">"公积金账号"</span>,
            <span class="hljs-string">"fields"</span>: [
                {
                    <span class="hljs-string">"name"</span>: <span class="hljs-string">"user_name"</span>,
                    <span class="hljs-string">"label"</span>: <span class="hljs-string">"公积金账号"</span>,
                    <span class="hljs-string">"type"</span>: <span class="hljs-string">"text"</span>
                },
                {
                    <span class="hljs-string">"name"</span>: <span class="hljs-string">"user_pass"</span>,
                    <span class="hljs-string">"label"</span>: <span class="hljs-string">"密码"</span>,
                    <span class="hljs-string">"type"</span>: <span class="hljs-string">"password"</span>
                }
            ],
            <span class="hljs-string">"value"</span>: <span class="hljs-string">"0"</span>
        }
    ],
    <span class="hljs-string">"message"</span>: <span class="hljs-string">"登录要素请求成功"</span>
}</code></pre>
<p>可以看到呼和浩特有两种授权登陆方式，我们在data中定义了一个loginWays，初始为空数组，接着methods中定义一个请求接口的函数，里面就是基于返回数据的基础上为上面fields对象注入一个input字段用于绑定，这就是所谓的基于接口返回数据的属性注入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    queryloginWays: function(channel_type, channel_code) {
        var params = new URLSearchParams();
        params.append('channel_type', channel_type);
        params.append('channel_code', channel_code);
        axios.post(this.loginParamsProxy, params)
            .then(function(res) {
                console.log(res);
                var code = res.code || res.data.code;
                var msg = res.message || res.data.message;
                var loginWays = res.data.data ? res.data.data : res.data;
                // 查询失败
                if (code != 2005) {
                    alert(msg);
                    return;
                }
                // 添加input字段用于v-model绑定
                loginWays.forEach(function(loginWay) {
                    loginWay.fields.forEach(function(field) {
                        field.input = '';
                    })
                })
                this.loginWays = loginWays;
                this.tags.arr = loginWays.map(function(loginWay) {
                    return loginWay.label;
                })
            }.bind(this))
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">methods: {
    <span class="hljs-attr">queryloginWays</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">channel_type, channel_code</span>) </span>{
        <span class="hljs-keyword">var</span> params = <span class="hljs-keyword">new</span> URLSearchParams();
        params.append(<span class="hljs-string">'channel_type'</span>, channel_type);
        params.append(<span class="hljs-string">'channel_code'</span>, channel_code);
        axios.post(<span class="hljs-keyword">this</span>.loginParamsProxy, params)
            .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                <span class="hljs-built_in">console</span>.log(res);
                <span class="hljs-keyword">var</span> code = res.code || res.data.code;
                <span class="hljs-keyword">var</span> msg = res.message || res.data.message;
                <span class="hljs-keyword">var</span> loginWays = res.data.data ? res.data.data : res.data;
                <span class="hljs-comment">// 查询失败</span>
                <span class="hljs-keyword">if</span> (code != <span class="hljs-number">2005</span>) {
                    alert(msg);
                    <span class="hljs-keyword">return</span>;
                }
                <span class="hljs-comment">// 添加input字段用于v-model绑定</span>
                loginWays.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">loginWay</span>) </span>{
                    loginWay.fields.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">field</span>) </span>{
                        field.input = <span class="hljs-string">''</span>;
                    })
                })
                <span class="hljs-keyword">this</span>.loginWays = loginWays;
                <span class="hljs-keyword">this</span>.tags.arr = loginWays.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">loginWay</span>) </span>{
                    <span class="hljs-keyword">return</span> loginWay.label;
                })
            }.bind(<span class="hljs-keyword">this</span>))
    }
}</code></pre>
<p>即使返回的数据有我们不需要的数据也没有关系，这样保证我们不会遗失进行下一步登陆所需要的数据。</p>
<p>这样多个表单绑定数据问题解决了，那么怎么进行页面间数据传递？如果是app传过来，那么通常使用URL拼接的方式，使用window.location.search获得queryString后再进行截取；如果通过页面套入javaWeb中，那么直接使用"${字段名}"就能获取，注意要js中获取java字段需要加双引号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
        // 真实姓名
        realName: function() {
            return this.getQueryVariable('name') || ''
        },
        // 身份证
        identity: function() {
            return parseInt(this.getQueryVariable('identity')) || ''
        },
        /*If javaWeb
        realName: function() {
            return this.getQueryVariable('name') || ''
        },
        identity: function() {
            return parseInt(this.getQueryVariable('identity')) || ''
        }*/
    },
    methods: {
        getQueryVariable: function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&amp;');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) == variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
            console.log('Query variable %s not found', variable);
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">computed: {
        <span class="hljs-comment">// 真实姓名</span>
        realName: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getQueryVariable(<span class="hljs-string">'name'</span>) || <span class="hljs-string">''</span>
        },
        <span class="hljs-comment">// 身份证</span>
        identity: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.getQueryVariable(<span class="hljs-string">'identity'</span>)) || <span class="hljs-string">''</span>
        },
        <span class="hljs-comment">/*If javaWeb
        realName: function() {
            return this.getQueryVariable('name') || ''
        },
        identity: function() {
            return parseInt(this.getQueryVariable('identity')) || ''
        }*/</span>
    },
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">getQueryVariable</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">variable</span>) </span>{
            <span class="hljs-keyword">var</span> query = <span class="hljs-built_in">window</span>.location.search.substring(<span class="hljs-number">1</span>);
            <span class="hljs-keyword">var</span> vars = query.split(<span class="hljs-string">'&amp;'</span>);
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; vars.length; i++) {
                <span class="hljs-keyword">var</span> pair = vars[i].split(<span class="hljs-string">'='</span>);
                <span class="hljs-keyword">if</span> (<span class="hljs-built_in">decodeURIComponent</span>(pair[<span class="hljs-number">0</span>]) == variable) {
                    <span class="hljs-keyword">return</span> <span class="hljs-built_in">decodeURIComponent</span>(pair[<span class="hljs-number">1</span>]);
                }
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Query variable %s not found'</span>, variable);
        }
    }</code></pre>
<h1 id="articleHeader2">关于前端跨域调试</h1>
<p>在进行接口请求时，我们的页面通常是在sublime的本地服务器或者vscode本地服务器预览，所以请求接口会遇到跨域的问题。<br>在项目构建的时候通常我们源代码会放在src文件夹下，然后使用gulp进行代码的压缩、合并、图片的优化（根据需要）等等，我们会使用gulp。这里解决跨域的问题可以用<a href="https://www.npmjs.com/package/gulp-connect" rel="nofollow noreferrer" target="_blank">gulp-connect</a>结合<a href="https://www.npmjs.com/package/http-proxy-middleware" rel="nofollow noreferrer" target="_blank">http-proxy-middleware</a>，此时我们在gulp-connect中的本地服务器进行预览调试。<br>gulpfile.js如下： 开发过程使用gulp server命令，监听文件改动并使用livereload刷新；使用gulp命令进行打包。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var connect = require('gulp-connect');
var proxyMiddleware = require('http-proxy-middleware');

// 定义环境变量，若为 dev，则代理src目录； 若为prod，则代理dist目录
var env = 'prod'

// 跨域代理  将localhost:8088/api 映射到 https://api.shujumohe.com/
gulp.task('server', ['listen'], function() {
    var middleware = proxyMiddleware(['/api'], {
        target: 'https://api.shujumohe.com/',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/'
        }
    });
    connect.server({
        root: env == 'dev' ? './src' : './dist',
        port: 8088,
        livereload: true,
        middleware: function(connect, opt) {
            return [middleware]
        }

    });
});
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});
gulp.task('css', function() {
    gulp.src('src/css/main.css')
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css/'));

    gulp.src('src/css/share.css')
        .pipe(concat('share.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css/'));

    gulp.src('src/vendors/css/*.css')
        .pipe(concat('vendors.min.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/vendors/css'));
    return gulp
});
gulp.task('js', function() {
    return gulp.src('src/vendors/js/*.js')
        .pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/vendors/js'));
});
gulp.task('img', function() {
    gulp.src('src/imgs/*')
        .pipe(gulp.dest('dist/imgs'));
});
gulp.task('listen', function() {
    gulp.watch('./src/css/*.css', function() {
        gulp.src(['./src/css/*.css'])
            .pipe(connect.reload());
    });
    gulp.watch('./src/js/*.js', function() {
        gulp.src(['./src/js/*.js'])
            .pipe(connect.reload());
    });
    gulp.watch('./src/*.html', function() {
        gulp.src(['./src/*.html'])
            .pipe(connect.reload());
    });
});
gulp.task('default', ['html', 'css', 'js', 'img']);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);
<span class="hljs-keyword">var</span> concat = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-concat'</span>);
<span class="hljs-keyword">var</span> uglify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-uglify'</span>);
<span class="hljs-keyword">var</span> autoprefixer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-autoprefixer'</span>);
<span class="hljs-keyword">var</span> useref = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-useref'</span>);
<span class="hljs-keyword">var</span> connect = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-connect'</span>);
<span class="hljs-keyword">var</span> proxyMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>);

<span class="hljs-comment">// 定义环境变量，若为 dev，则代理src目录； 若为prod，则代理dist目录</span>
<span class="hljs-keyword">var</span> env = <span class="hljs-string">'prod'</span>

<span class="hljs-comment">// 跨域代理  将localhost:8088/api 映射到 https://api.shujumohe.com/</span>
gulp.task(<span class="hljs-string">'server'</span>, [<span class="hljs-string">'listen'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> middleware = proxyMiddleware([<span class="hljs-string">'/api'</span>], {
        <span class="hljs-attr">target</span>: <span class="hljs-string">'https://api.shujumohe.com/'</span>,
        <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">pathRewrite</span>: {
            <span class="hljs-string">'^/api'</span>: <span class="hljs-string">'/'</span>
        }
    });
    connect.server({
        <span class="hljs-attr">root</span>: env == <span class="hljs-string">'dev'</span> ? <span class="hljs-string">'./src'</span> : <span class="hljs-string">'./dist'</span>,
        <span class="hljs-attr">port</span>: <span class="hljs-number">8088</span>,
        <span class="hljs-attr">livereload</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">middleware</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">connect, opt</span>) </span>{
            <span class="hljs-keyword">return</span> [middleware]
        }

    });
});
gulp.task(<span class="hljs-string">'html'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    gulp.src(<span class="hljs-string">'src/*.html'</span>)
        .pipe(useref())
        .pipe(gulp.dest(<span class="hljs-string">'dist'</span>));
});
gulp.task(<span class="hljs-string">'css'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    gulp.src(<span class="hljs-string">'src/css/main.css'</span>)
        .pipe(concat(<span class="hljs-string">'main.css'</span>))
        .pipe(autoprefixer({
            <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'last 2 versions'</span>],
            <span class="hljs-attr">cascade</span>: <span class="hljs-literal">false</span>
        }))
        .pipe(gulp.dest(<span class="hljs-string">'dist/css/'</span>));

    gulp.src(<span class="hljs-string">'src/css/share.css'</span>)
        .pipe(concat(<span class="hljs-string">'share.css'</span>))
        .pipe(autoprefixer({
            <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'last 2 versions'</span>],
            <span class="hljs-attr">cascade</span>: <span class="hljs-literal">false</span>
        }))
        .pipe(gulp.dest(<span class="hljs-string">'dist/css/'</span>));

    gulp.src(<span class="hljs-string">'src/vendors/css/*.css'</span>)
        .pipe(concat(<span class="hljs-string">'vendors.min.css'</span>))
        .pipe(autoprefixer({
            <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'last 2 versions'</span>],
            <span class="hljs-attr">cascade</span>: <span class="hljs-literal">false</span>
        }))
        .pipe(gulp.dest(<span class="hljs-string">'dist/vendors/css'</span>));
    <span class="hljs-keyword">return</span> gulp
});
gulp.task(<span class="hljs-string">'js'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'src/vendors/js/*.js'</span>)
        .pipe(concat(<span class="hljs-string">'vendors.min.js'</span>))
        .pipe(uglify())
        .pipe(gulp.dest(<span class="hljs-string">'dist/vendors/js'</span>));
});
gulp.task(<span class="hljs-string">'img'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    gulp.src(<span class="hljs-string">'src/imgs/*'</span>)
        .pipe(gulp.dest(<span class="hljs-string">'dist/imgs'</span>));
});
gulp.task(<span class="hljs-string">'listen'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    gulp.watch(<span class="hljs-string">'./src/css/*.css'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        gulp.src([<span class="hljs-string">'./src/css/*.css'</span>])
            .pipe(connect.reload());
    });
    gulp.watch(<span class="hljs-string">'./src/js/*.js'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        gulp.src([<span class="hljs-string">'./src/js/*.js'</span>])
            .pipe(connect.reload());
    });
    gulp.watch(<span class="hljs-string">'./src/*.html'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        gulp.src([<span class="hljs-string">'./src/*.html'</span>])
            .pipe(connect.reload());
    });
});
gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'html'</span>, <span class="hljs-string">'css'</span>, <span class="hljs-string">'js'</span>, <span class="hljs-string">'img'</span>]);</code></pre>
<blockquote><p>原文链接： <a href="http://www.huzerui.com/blog/2017/07/03/vuejs-develop-h5-experience/" rel="nofollow noreferrer" target="_blank">http://www.huzerui.com/blog/2...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuejs开发H5页面总结

## 原文链接
[https://segmentfault.com/a/1190000010030848](https://segmentfault.com/a/1190000010030848)


---
title: 'Vue_VueResource' 
date: 2019-02-02 2:30:11
hidden: true
slug: d962ve6qizb
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue可以构建一个完全不依赖后端服务的应用，同时也可以与服务端进行数据交互来同步界面的动态更新。</p>
<p>Vue通过插件的形式实现了基于AJAX，JSPNP等技术的服务端通信。</p>
<p><code>vue-resource</code>是一个通过<code>XMLHttpRequrest</code>或<code>JSONP</code>技术实现异步加载服务端数据的Vue插件</p>
<p>提供了一般的 HTTP请求接口和RESTful架构请求接口，并且提供了全局方法和VUe组件实例方法。</p>
<p>使用的版本是：<code>vue-resource 0.7.2</code></p>
<p><span class="img-wrap"><img data-src="/img/bVDTZr?w=876&amp;h=786" src="https://static.alili.tech/img/bVDTZr?w=876&amp;h=786" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">配置</h1>
<h2 id="articleHeader1">参数配置</h2>
<p>分为：</p>
<ul>
<li><p>全局配置</p></li>
<li><p>组件实例配置</p></li>
<li><p>调用配置</p></li>
</ul>
<p>这三部分的优先级依次增高，游戏机高的配置会覆盖优先级低的配置。</p>
<p><strong>全局配置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http.options.root = '/root';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>Vue.http.<span class="hljs-keyword">options</span>.root = <span class="hljs-string">'/root'</span>;
</code></pre>
<p>全局配置option属性</p>
<p><span class="img-wrap"><img data-src="/img/bVDT0h?w=643&amp;h=439" src="https://static.alili.tech/img/bVDT0h?w=643&amp;h=439" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>组件实例配置</strong></p>
<p>在实例化组件时可以传入<code>http</code>选项来进行配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    http: {
        root: '/root',
        headers: {
            Authorization: ''
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
    <span class="hljs-attribute">http</span>: {
        <span class="hljs-attribute">root</span>: <span class="hljs-string">'/root'</span>,
        <span class="hljs-attribute">headers</span>: {
            <span class="hljs-attribute">Authorization</span>: <span class="hljs-string">''</span>
        }
    }
})</code></pre>
<p><strong>方法调用时配置</strong></p>
<p>在调用<code>vue-resource</code>请求方法是传入选项对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    ready: function() {
        // get 请求
        this.$http.get({url: '', headers: { Authorization: '' } })
            .then(() => {
                // 请求成功回调

            }, () => {
                // 请求失败回调

            });
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">new</span> Vue({
    ready: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// get 请求</span>
        <span class="hljs-keyword">this</span>.$http.get({url: <span class="hljs-string">''</span>, headers: { Authorization: <span class="hljs-string">''</span> } })
            .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-comment">// 请求成功回调</span>

            }, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-comment">// 请求失败回调</span>

            });
    }
});</code></pre>
<h2 id="articleHeader2">headers配置</h2>
<p>通过<code>headers</code>属性来配置请求头。<br>除了参数配置<code>headers</code>属性可以设置请求头外，在<code>vue-resource</code>中也提供了全局默认的<code>headers</code>配置</p>
<p><span class="img-wrap"><img data-src="/img/bVDT3j?w=756&amp;h=468" src="https://static.alili.tech/img/bVDT3j?w=756&amp;h=468" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>Vue.http.headers</code>键值可以是HTTP方法名，common，custom，三种类型。这三种类型的配置会进行合并，优先级从低到高依次是common,custom,HTTP方法名。</p>
<p>其中common对应的请求头会在所有请求中设置，custom对应的请求头在非跨域时设置，HTTP方法名对应的请求头只有在请求的method匹配方法名时才会被设置。</p>
<h1 id="articleHeader3">基本HTTP调用</h1>
<p>基本HTTP调用即普通的GET，POST等基本的HTTP操作实际上执行增，删，改，查是前后端开发人员共同约定的并非通过HTTP的请求方法如GET表示获取数据，PUT代表写入数据，POST表示更新数据。<br>底层方法和便捷方法执行后返回一个Promise对象，可以使用Promise语法来注册成功，失败回调。</p>
<h2 id="articleHeader4">底层方法</h2>
<p>全局的<code>Vue.http</code>方法和Vue组件的实例方法<code>this.$http</code>都属于底层方法，他们根据所传入option惨啊书的method属性来判断请求方式是GET还是POST，亦或是其它的HTTP的合法方法。</p>
<p><strong>全局调用</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http(option);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">Vue.http(option)<span class="hljs-comment">;</span></code></pre>
<p><strong>组件实例调用</strong></p>
<p><code>this.$http(option)</code></p>
<p>全局调用和组件实例调用都是接收相同的option参数。都返回Promise对象。不同的是，全局方式回调this指向window，而组建实例调用方式回调指向组件实例。</p>
<p>组件实例方式发送POST请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    ready: function () {
        // POST请求
        this.$http({
            url: '',
            method: 'POST',
            // 请求体重发送的数据
            data: {
                cat: 1
            },
            // 设置请求头
            headers: {
                'Content-Type': 'x-www-from-urlencoded'
            }
        }).then(function () {
            // 请求成功回调
        }, function () {
            // 请求失败回调
        });
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">new</span> Vue({
    ready: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">// POST请求</span>
        <span class="hljs-keyword">this</span>.$http({
            url: <span class="hljs-string">''</span>,
            method: <span class="hljs-string">'POST'</span>,
            <span class="hljs-comment">// 请求体重发送的数据</span>
            data: {
                cat: <span class="hljs-number">1</span>
            },
            <span class="hljs-comment">// 设置请求头</span>
            headers: {
                <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'x-www-from-urlencoded'</span>
            }
        }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-comment">// 请求成功回调</span>
        }, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-comment">// 请求失败回调</span>
        });
    }
});
</code></pre>
<h2 id="articleHeader5">便捷方法</h2>
<p>不同于底层方法，便捷方法是对底层方法的封装，在调用时可以省去配置选项option中的method属性。</p>
<p>vue-resource 提供的便捷方法：</p>
<ul>
<li><p>get(url, [data], [options]);</p></li>
<li><p>post(url, [data], [options]);</p></li>
<li><p>put(url, [data], [options]);</p></li>
<li><p>patch(url, [data], [options]);</p></li>
<li><p>delete(url, [data], [options]);</p></li>
<li><p>jsonp(url, [data], [options]);</p></li>
</ul>
<p>都是接受三个参数：</p>
<ul>
<li><p>url（字符串），请求地址。可被options对象中url属性覆盖。</p></li>
<li><p>data（可选，字符串或对象），要发送的数据，可被options对象中的data属性覆盖。</p></li>
<li><p>options</p></li>
</ul>
<p>便捷方法的POST请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$http.post(
    'http://example.com', 
    // 请求体重发送数据给服务端
    {
        cat: 1,
        name: 'newBook'
    },{
        'headers': {
            'Content-Type': 'x-www-form-urlencoded'
        }
    }).then(function () {
        // 成功回调
    }, function () {
        // 失败回调
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.$http.post(
    <span class="hljs-string">'http://example.com'</span>, 
    <span class="hljs-comment">// 请求体重发送数据给服务端</span>
    {
        cat: <span class="hljs-number">1</span>,
        name: <span class="hljs-string">'newBook'</span>
    },{
        <span class="hljs-string">'headers'</span>: {
            <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'x-www-form-urlencoded'</span>
        }
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">// 成功回调</span>
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">// 失败回调</span>
    });</code></pre>
<h2 id="articleHeader6">请求选项对象</h2>
<p>option对象的各属性及含义</p>
<table>
<thead><tr>
<th align="left">参数</th>
<th>类型</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="left">url</td>
<td>string</td>
<td align="left">请求的URL</td>
</tr>
<tr>
<td align="left">method</td>
<td>string</td>
<td align="left">请求的HTTP方法，例如：'GET', 'POST'或其他HTTP方法</td>
</tr>
<tr>
<td align="left">body</td>
<td>Object,FormDatastring</td>
<td align="left">request body</td>
</tr>
<tr>
<td align="left">params</td>
<td>Object</td>
<td align="left">请求的URL参数对象</td>
</tr>
<tr>
<td align="left">headers</td>
<td>Object</td>
<td align="left">request header</td>
</tr>
<tr>
<td align="left">timeout</td>
<td>number</td>
<td align="left">单位为毫秒的请求超时时间 (0 表示无超时时间)</td>
</tr>
<tr>
<td align="left">before</td>
<td>function(request)</td>
<td align="left">请求发送前的处理函数，类似于jQuery的beforeSend函数</td>
</tr>
<tr>
<td align="left">progress</td>
<td>function(event)</td>
<td align="left">ProgressEvent回调处理函数</td>
</tr>
<tr>
<td align="left">credientials</td>
<td>boolean</td>
<td align="left">表示跨域请求时是否需要使用凭证</td>
</tr>
<tr>
<td align="left">emulateHTTP</td>
<td>boolean</td>
<td align="left">发送PUT, PATCH, DELETE请求时以HTTP</td>
</tr>
<tr>
<td align="left">emulateJSON</td>
<td>boolean</td>
<td align="left">将request body以application/x-www-form-urlencoded content type发送</td>
</tr>
</tbody>
</table>
<p><strong>url</strong></p>
<p>url（字符串）<br>请求的URL地址</p>
<p><strong>method</strong></p>
<p>method(字符串)<br>默认值为GET，请求的HTTP方法(GET,POST等)</p>
<p><strong>data</strong></p>
<p>data(对象或字符串)<br>默认值为:<code>''</code>,需要发送给服务端的数据。<br>data属性的值对method为POST，PUT，DElETE等请求会作为请求体来传送，对于GET，JSONP等方式的请求将会拼接在URL查询参数中。</p>
<p><strong>params</strong></p>
<p>params(对象)<br>默认值为：<code>{}</code>用来替换url中的模板变量，模板变量中为匹配到的属性添加在URL地址后边作为查询参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http({
    url: 'http://example.com/{book}',
    params: {
        book: 'vue',
        cat: 1
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.http</span>({
    <span class="hljs-attribute">url</span>: <span class="hljs-string">'http://example.com/{book}'</span>,
    <span class="hljs-attribute">params</span>: {
        <span class="hljs-attribute">book</span>: <span class="hljs-string">'vue'</span>,
        <span class="hljs-attribute">cat</span>: <span class="hljs-number">1</span>
    }
});</code></pre>
<p>最终url为： <code>http//example.com/vue?cat=1</code></p>
<p><strong>headers</strong></p>
<p>headers(对象)<br>默认值为:<code>{}</code>,设置HTTP请求头</p>
<p><strong>xhr</strong></p>
<p>xhr（对象）<br>默认值为null，该对象中属性都会应用到原生的xhr实例对象上。</p>
<p><strong>upload</strong></p>
<p>upload(对象)<br>默认值为null，该对象的属性都会应用到原生的xhr实例对象的upload属性上。</p>
<p><strong>jsonp</strong></p>
<p>jsonp(字符串)<br>默认值为:<code>callback</code>，JSONP请求中回调函数的名字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http({
    url: 'http://example.com/book',
    method: 'JSONP',
    jsonp: 'cb'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.http</span>({
    <span class="hljs-attribute">url</span>: <span class="hljs-string">'http://example.com/book'</span>,
    method: <span class="hljs-string">'JSONP'</span>,
    jsonp: <span class="hljs-string">'cb'</span>
});</code></pre>
<p>最终的URL地址为<code>http://example.com/book?cb=xxx</code><br><code>xxx</code> 为 vue-resource 生成的随机串。</p>
<p><strong>tiemout</strong></p>
<p>timeout(数值)<br>默认为：0，单位为 ms。表示请求超时时间。0表示没有超时限制。超市后，将会取消当前请求。<br>vue-resrouce内部通过拦截器注入超时取消逻辑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ( request.timeout ) {
    timeout = setTimeout(function () {
        reqest.cancel();
    }, request.timeout);
}
// 超时后，Promise会被 reject，错误回调会被执行。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">if</span> ( request.timeout ) {
    timeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        reqest.cancel();
    }, request.timeout);
}
<span class="hljs-comment">// 超时后，Promise会被 reject，错误回调会被执行。</span></code></pre>
<p><strong>beforeSend</strong></p>
<p>beforeSend（函数）<br>默认值为:null，该函数接受请求选项对象作为参数。该函数在发送请求之前执行，vue-resource内部在拦截器最前端调用该方法。</p>
<p><strong>emulateHTTP</strong></p>
<p>emulateHTTP（布尔值）<br>默认值为:<code>false</code>,当值为true是，用HTTP的POST方式PUT，PATCH，DELETE等请求，并设置请求头字段<code>HTTP_Method_Override</code>为原始请求方法。</p>
<p>如果Web服务器无法处理PUT, PATCH和DELETE这种REST风格的请求，你可以启用enulateHTTP现象。启用该选项后，请求会以普通的POST方法发出，并且HTTP头信息的X-HTTP-Method-Override属性会设置为实际的HTTP方法。</p>
<p>如果服务器无法处理PUT，PATCH和DELETE的请求。可以启用enulateHTTP。<br>启用之后，请求会以普通的POST方法发出，并且HTTP头信息的<code>X-HTTP-Method-Override</code>属性会设置为实例的HTTP方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http.options.emulateHTTP = true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;">Vue.http.<span class="hljs-keyword">options</span>.emulateHTTP = <span class="hljs-keyword">true</span>;</code></pre>
<p><strong>emulateJSON</strong></p>
<p>emulateJSON(布尔值)<br>默认值为：<code>false</code>,当值为true并且data为对象时，设置请求头<code>Content-Type</code>的值为<code>application/x-www-form-urlencoded</code></p>
<p>如果服务器无法处理编码为<code>application/json</code>的请求，可以启用<code>emulateJSON</code>选项。启用之后，请求会以<code>application/x-www-form-urlencoded</code>为MIME type，就像普通的HTML表单一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http.options.emulateJSON = true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;">Vue.http.<span class="hljs-keyword">options</span>.emulateJSON = <span class="hljs-keyword">true</span>;</code></pre>
<p><strong>crossOrigin</strong></p>
<p>crossOrigin（布尔值）</p>
<p>默认值为：null，表示是否跨域，如果没有设置该属性，vue-resource内部会判断浏览器当前URL和请求URL是否跨域。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ( request.crossOrgin === null ) {
    request.corssOrigin = corssOrigin(request);
}
if ( request.corssOrigin ) {
    if ( !xhrCors ) {
        request.client = xdrClient;
    }
    request.enumlateHTTP = false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code><span class="hljs-keyword">if</span> ( <span class="hljs-built_in">request</span>.crossOrgin === <span class="hljs-literal">null</span> ) {
    <span class="hljs-built_in">request</span>.corssOrigin = corssOrigin(<span class="hljs-built_in">request</span>);
}
<span class="hljs-keyword">if</span> ( <span class="hljs-built_in">request</span>.corssOrigin ) {
    <span class="hljs-keyword">if</span> ( !xhrCors ) {
        <span class="hljs-built_in">request</span>.client = xdrClient;
    }
    <span class="hljs-built_in">request</span>.enumlateHTTP = <span class="hljs-literal">false</span>;
}</code></pre>
<p>如果最终crossOrigin为true并且浏览器不支持CORS，即不支持XMLHttpRequest2时，则会使用XDomainRequest来请求。目前XDomainRequest 只有IE8，IE9 浏览器支持用来进行AJAX跨域。</p>
<h2 id="articleHeader7">reqponse对象</h2>
<p>response对象包含服务端的数据，以及HTTP响应状态，响应头等信心。</p>
<ul>
<li><p>data （对象或字符串）： 服务端返回的数据，已使用 JSON.parse 解析。</p></li>
<li><p>ok（布尔值）：当HTTP响应状态码在200~299区间时该值为true，表示响应成功。</p></li>
<li><p>status(数值)： HTTP响应状态码。</p></li>
<li><p>statusText(字符串)： HTTP响应状态文本描述。</p></li>
<li><p>headers（函数）： 获取HTTP响应头信息，不传参表示获取整个响应头，返回一个相应头对象。传参表示获取对应的响应头信息。</p></li>
<li><p>request(对象)</p></li>
</ul>
<h2 id="articleHeader8">RESTful调用</h2>
<p>RESTful调用就是客户端通过HTTP动词来表示增，删，改，查实现对服务端数据操作的一种架构模式。</p>
<p>vue-resource提供全局调用<code>Vue.resource</code>或者在组件实例上调用<code>this.$rsource</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resource(url ,[params], [actions], [options]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">resource(url ,<span class="hljs-string">[params]</span>, <span class="hljs-string">[actions]</span>, <span class="hljs-string">[options]</span>);</code></pre>
<p><strong>url</strong></p>
<p>url（字符串）<br>请求地址，可以包含占位符，会被parms对象中的同名属性的值替换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$resource('/books/{cat}', { cat: 1 });
// 解析的URL为：/books/1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>this.<span class="hljs-variable">$resource</span>(<span class="hljs-string">'/books/{cat}'</span>, { cat: <span class="hljs-number">1</span> });
<span class="hljs-regexp">//</span> 解析的URL为：<span class="hljs-regexp">/books/</span><span class="hljs-number">1</span></code></pre>
<p><strong>params</strong></p>
<p>params(可选，对象)</p>
<p>参数对象，可用来提供url中的占位符，多出来的属性拼接url的查询参数。</p>
<p><strong>actions</strong></p>
<p>actions(可选，对象)</p>
<p>可以用来对已有的action进行配置，也可以用来定义新的action。</p>
<p>默认的aciton配置为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Resource.actions = {
    get: {method: 'GET'},
    save: {method: 'POST'},
    query: {method: 'GET'},
    update: {method: 'PUT'},
    remove: {method: 'delete'},
    delete: {method: 'DELETE'}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>Resource.actions = {
    get: {method: <span class="hljs-string">'GET'</span>},
    save: {method: <span class="hljs-string">'POST'</span>},
    query: {method: <span class="hljs-string">'GET'</span>},
    update: {method: <span class="hljs-string">'PUT'</span>},
    remove: {method: <span class="hljs-string">'delete'</span>},
    delete: {method: <span class="hljs-string">'DELETE'</span>}
}</code></pre>
<p>修改默认值action配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$resource(
    '/books/{cat}', 
    {
        cat: 1
    }, {
        charge: {
            method: 'POST',
            params: {
                charge: true
            }
        }
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">this.$resource(</span>
    <span class="hljs-string">'/books/{cat}'</span><span class="hljs-string">,</span> 
    <span class="hljs-string">{</span>
<span class="hljs-attr">        cat:</span> <span class="hljs-number">1</span>
    <span class="hljs-string">},</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        charge:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            method:</span> <span class="hljs-string">'POST'</span><span class="hljs-string">,</span>
<span class="hljs-attr">            params:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                charge:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">});</span></code></pre>
<p>actions对象中的单个action如charge对象可以包含options中的所有属性，且有限即高于iotions对象</p>
<p><strong>options</strong></p>
<p>options(可选，对象)</p>
<hr>
<p>resource方法执行后返回一个包含了所有action方法名的对象。其包含自定义的action方法</p>
<p>resource请求数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var resouce = this.$resource('/books/{id}');
// 查询
// 第一个参数为params对象，优先级高于resource发方法的params参数

resoure.get({id: 1}).then(function ( response ) {
    this.$set('item', response.item);
});

// 保存

// 第二个参数为要发送的数据
resource.seve({id: 1}, {item: this.item}).then(function () {
    // 请求成功回调
}, function () {
    // 请求失败回调
});

resource.delete({id: 1}).then(function () {
    // 请求成功回调
}, function () {
    // 请求失败回调    
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> resouce = <span class="hljs-keyword">this</span>.$resource(<span class="hljs-string">'/books/{id}'</span>);
<span class="hljs-comment">// 查询</span>
<span class="hljs-comment">// 第一个参数为params对象，优先级高于resource发方法的params参数</span>

resoure.get({<span class="hljs-attribute">id:</span><span class="hljs-string"> 1}).then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> response </span>) </span>{
    <span class="hljs-keyword">this</span>.$set(<span class="hljs-string">'item'</span>, response.item);
});

<span class="hljs-comment">// 保存</span>

<span class="hljs-comment">// 第二个参数为要发送的数据</span>
resource.seve({<span class="hljs-attribute">id:</span><span class="hljs-string"> 1}, {item</span>: <span class="hljs-keyword">this</span>.item}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 请求成功回调</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 请求失败回调</span>
});

resource.delete({<span class="hljs-attribute">id:</span><span class="hljs-string"> 1}).then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 请求成功回调</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 请求失败回调    </span>
});
</code></pre>
<h2 id="articleHeader9">拦截器</h2>
<p>可以全局进行拦截器设置。<br>拦截器在发送请求前或响应返回时做一些特殊的处理。</p>
<blockquote><p>拦截器的注册</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http.interceptors.push({
    request: function ( request ) {
        // 更改请求类型为POST
        request.method = 'POST';
        return request;
    },
    response: function ( response ) {
        // 修改返回数据
        response.data = [{
            custom: 'custom'
        }];
        return response;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.http.interceptors.push({
    request: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( request )</span> </span>{
        <span class="hljs-comment">// 更改请求类型为POST</span>
        request.method = <span class="hljs-string">'POST'</span>;
        <span class="hljs-keyword">return</span> request;
    },
    response: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( response )</span> </span>{
        <span class="hljs-comment">// 修改返回数据</span>
        response.data = [{
            custom: <span class="hljs-string">'custom'</span>
        }];
        <span class="hljs-keyword">return</span> response;
    }
});</code></pre>
<blockquote><p>工厂函数注册</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http.interceptors.push(function () {
    return {
        request: function ( request ) {
            return request;
        },
        response: function ( response ) {
            return response;
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>Vue.http.interceptors.push(<span class="hljs-keyword">function</span> <span class="hljs-title"></span>() {
    <span class="hljs-keyword">return</span> <span class="hljs-type">{</span>
        request: <span class="hljs-keyword">function</span> <span class="hljs-title"></span>( request ) {
            <span class="hljs-keyword">return</span> <span class="hljs-type">request</span>;
        },
        response: <span class="hljs-keyword">function</span> <span class="hljs-title"></span>( response ) {
            <span class="hljs-keyword">return</span> <span class="hljs-type">response</span>;
        }
    }
});</code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http.interceptors.push(function ( request, next ) {
    // 请求发送前的处理逻辑

    next(function () {    
        // 请求发送后的处理逻辑
        // 更具请求的状态， response参数会返回给 successCallback或errorCallback
        return response
    });
    
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.http.interceptors.push(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( request, next )</span> </span>{
    <span class="hljs-comment">// 请求发送前的处理逻辑</span>

    next(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{    
        <span class="hljs-comment">// 请求发送后的处理逻辑</span>
        <span class="hljs-comment">// 更具请求的状态， response参数会返回给 successCallback或errorCallback</span>
        <span class="hljs-keyword">return</span> response
    });
    
});</code></pre>
<p>实现的功能：</p>
<ul><li><p>AJAX请求的loading界面</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http.interceptors.push((request, next) => {
    // 通过控制 组件的`v-show`值显示loading组件
    loading.show = true;
    next((response) => {
        loading.show = false
        return response
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code>Vue.http.interceptors.push(<span class="hljs-function"><span class="hljs-params">(request, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
    // 通过控制 组件的`v-show`值显示loading组件
    loading.show = <span class="hljs-literal">true</span>;
    <span class="hljs-built_in">next</span>(<span class="hljs-function"><span class="hljs-params">(response)</span> =&gt;</span> {
        loading.show = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">return</span> response
    });
});</code></pre>
<ul><li><p>请求失败时的提示对话框</p></li></ul>
<h2 id="articleHeader10">跨域AJAX</h2>
<p>vue-resource中用到的CORS特性，和 XHMLHttpRequest2的替代品 XDomainRequest</p>
<p>XDomain只支持GET和POST两种请求。如果要在vue-resource中使用其它方法请求，设置请求选项的emulateHTTP为true。</p>
<blockquote><p>XHMLHttpRequest2 CORS</p></blockquote>
<p>XHMLHttpRequest2提交AJAX请求还是和普通的XMLHttpRequset请求一样，只是增加了一些新特性。</p>
<p>在提交AJAX跨域请求时，需要知道当前浏览器是支持XHMLHttpRequest2， 判断方法使用 <code>in操作符</code>检测当前 XMLHttpRequest实例对象是否包含 <code>withCredentials</code>属性，如果包含则支持CORS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhrCors = 'withCredentials' in new XMLHttpRequest();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> xhrCors = <span class="hljs-string">'withCredentials'</span> <span class="hljs-keyword">in</span> <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();</code></pre>
<p>在支持CORS的情况下，还需啊哟服务端启用CORS支持。</p>
<p>例如：<br>需要从<code>http://example.com:8080</code>提交到<code>http://example.com/8088</code>，需要在<code>http://example.com</code>添加响应头</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Origin: *" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Access</span>-Control-Allow-Origin: *</code></pre>
<blockquote><p>XDomainRequest</p></blockquote>
<p>如果vue0resource不支持XMLHttpRequest2,则会降级使用用<code>XDomainRequest</code></p>
<h2 id="articleHeader11">Promise</h2>
<p>vue.resource基本HTTP调用和RESTful调用action方法执行后都会返回一个Promise对象。<br>该Promise对象提供了then，catch，finally。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise - this.$http.post(
    'http://example.com/book/cretae',
    // 请求体中要发送给服务端数据
    {    
        cat: '1',
        name: 'newBook'
    }, {
        headers: {
            'Content-Type': 'x-www-form-urlencoded'
        }
    }
);

promise.then(function ( response ) {
    // 成功回调
}, function ( response ) {
    // 失败回调
});

promise.catch(function ( response ) {
    // 失败回调
});

promise.finally(function () {
    // 执行完成或者失败回调后都会执行此逻辑。
});

// 所有回调函数的this都指向组件实例" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> promise - this.$http.post(
    <span class="hljs-string">'http://example.com/book/cretae'</span>,
    <span class="hljs-comment">// 请求体中要发送给服务端数据</span>
    {    
        cat: <span class="hljs-string">'1'</span>,
        name: <span class="hljs-string">'newBook'</span>
    }, {
        headers: {
            <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'x-www-form-urlencoded'</span>
        }
    }
);

promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( response )</span> </span>{
    <span class="hljs-comment">// 成功回调</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( response )</span> </span>{
    <span class="hljs-comment">// 失败回调</span>
});

promise.<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( response )</span> </span>{
    <span class="hljs-comment">// 失败回调</span>
});

promise.<span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 执行完成或者失败回调后都会执行此逻辑。</span>
});

<span class="hljs-comment">// 所有回调函数的this都指向组件实例</span></code></pre>
<h2 id="articleHeader12">url模板</h2>
<p>vue-resource 使用<code>url-template</code>库来解析url模板.</p>
<p>在vue-resourece方法请求传参时 可以在url中放置花括号包围的占位符。vue-resouce内部会使用url0template将占位符用params对象中的属性进行替换。</p>
<h1 id="articleHeader13">question</h1>
<h2 id="articleHeader14">如何发送JSONP请求</h2>
<p>vue-resouce提供三种调用方式进行跨域</p>
<p><strong>全局方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http({
    url: 'http://example.com/books',
    // 参数部分，将会拼接在url之后
    params: {
        cat: 1
    },
    method: 'JSONP'
})
    .then(function ( response ){

    }, function () {
        //error

    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>Vue.http(<span class="hljs-comment">{
    url: 'http://example.com/books',
    // 参数部分，将会拼接在url之后
    params: {
        cat: 1
    }</span>,
    <span class="hljs-function"><span class="hljs-keyword">method</span>:</span> <span class="hljs-string">'JSONP'</span>
})
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( response )</span><span class="hljs-comment">{

    }</span>, <span class="hljs-title">function</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
        //error

    }</span>);</span></code></pre>
<p><strong>实例底层方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http.$http({
    url: 'http://example.com/books',
    params: {
        cat: 1
    },
    method: 'JSONP'
})
    .then(function () {
        // this 指向当前组件实例
    }, function () {

    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>http.$http({
    url: <span class="hljs-string">'http://example.com/books'</span>,
    params: {
        cat: <span class="hljs-number">1</span>
    },
    method: <span class="hljs-string">'JSONP'</span>
})
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">// this 指向当前组件实例</span>
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{

    });</code></pre>
<p><strong>实例便捷方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$http.jsonp(
    'http://www.example.com/books',
    {
        cat: 1
    }
)
    .then(function () {

    }, function () {
    
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.$http.jsonp(
    <span class="hljs-string">'http://www.example.com/books'</span>,
    {
        cat: <span class="hljs-number">1</span>
    }
)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{

    }, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    
    });</code></pre>
<h2 id="articleHeader15">修改数据类型</h2>
<p>如何修改发送给服务端的数据类型</p>
<p>在默认情况下，对于PUT，PSOT，PATCH，DELETE等请求，请求头中的<code>Content-Type</code>为<code>appliaction/json</code>即JSON类型。有时候需要将数据提交为指定类型如<code>application/x-www-form-urlencoded</code>,<code>multipart/form-data</code>,<code>txt/plain</code>等。</p>
<p><strong>全局headers配置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.http.heaers.post['Content-Type'] = 'application/x-www-form-urlencoded'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Vue<span class="hljs-selector-class">.http</span><span class="hljs-selector-class">.heaers</span><span class="hljs-selector-class">.post</span>[<span class="hljs-string">'Content-Type'</span>] = <span class="hljs-string">'application/x-www-form-urlencoded'</span>
</code></pre>
<p><strong>实例配置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$http.post(
    'http://example.com/books',
    // 成功回调
    function ( data, status, request ) {
        if ( status == 200 ) {
            consl.dir(data);
        }
    },
    // 配置请求头
    headres: {
        'Content-Type': 'multipart/form-data'
    }
);
// 实例配置的优先级高于全局配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.$http.post(
    <span class="hljs-string">'http://example.com/books'</span>,
    <span class="hljs-comment">// 成功回调</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">( data, status, request )</span> </span>{
        <span class="hljs-keyword">if</span> ( status == <span class="hljs-number">200</span> ) {
            consl.dir(data);
        }
    },
    <span class="hljs-comment">// 配置请求头</span>
    headres: {
        <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'multipart/form-data'</span>
    }
);
<span class="hljs-comment">// 实例配置的优先级高于全局配置</span></code></pre>
<h2 id="articleHeader16">跨域请求出错</h2>
<p>跨域请求需要服务端开启CORS支持</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue_VueResource

## 原文链接
[https://segmentfault.com/a/1190000007087934](https://segmentfault.com/a/1190000007087934)


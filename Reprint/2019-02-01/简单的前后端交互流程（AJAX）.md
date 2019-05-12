---
title: '简单的前后端交互流程（AJAX）' 
date: 2019-02-01 2:30:10
hidden: true
slug: u7upr9jx7ad
categories: [reprint]
---

{{< raw >}}

                    
<p>这是我写的第一篇文章，想想还有点小激动呢。本着助人为乐的思想，认识了一些前端的初学者，帮助他们更快的步入到前端这个一个行业。今天呢，我想要说的主题是：工作中的前后端交互。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.古老的表单提交
    这种形式呢，比较早，以后端为主。前端提交表单，后端验证(jsp,request.getParameter(&quot;&quot;))。这种方式后端做的比较多，我就不特别说明了。
2.AJAX的数据提交
    这种形式呢，现在用的较多。后端基本就做接口，做权限，其他的都交由前端去完成。这个呢就是我们今天主要说的。
3.表单和AJAX结合
    适合的才是最好的。这点我深信不疑
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>古老的表单提交
    这种形式呢，比较早，以后端为主。前端提交表单，后端验证(jsp,request.getParameter(<span class="hljs-string">""</span>))。这种方式后端做的比较多，我就不特别说明了。
<span class="hljs-number">2.</span>AJAX的数据提交
    这种形式呢，现在用的较多。后端基本就做接口，做权限，其他的都交由前端去完成。这个呢就是我们今天主要说的。
<span class="hljs-number">3.</span>表单和AJAX结合
    适合的才是最好的。这点我深信不疑
</code></pre>
<hr>
<p>常见的几种方式，我已经说明了。接下来我们谈一谈我们需要什么东西。<br>场景一：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="XXX:我们公司要做接口，我要怎么办？
LN:哦，接口文档发我看看。
XXX:什么是接口文档，我没有啊？
LN:接口文档由四部分组成：（这个看个人习惯有的写得特别简陋，所以第一次的时候问清楚每个参数意思）
    1.接口地址 URL
    2.请求方式 get/post
    3.请求参数 page,pageNum
    4.响应参数 state,list
XXX:哦哦，这样啊，那我和他们要一下。
    接口：/mvc/training/ge
    请求：key,orderBy,begin,length
LN:没给你响应，也没有给你请求方式啊。
    1.给接口补全URL,域名/mvc/training/ge。
    2.把你补全的URL，扔到浏览器的地址栏，看看返回的是什么。当然如果请求参数里面有必填项，那你要用URL?key=value&amp;key2=value2的形式模拟get请求。
        2.1 浏览器把服务器端的响应给你显示了出来。然后你对照这个问后端人员每个是什么意思。
        2.2 抛出405错误。这个就比较凄惨了。禁止get请求，那你有两种方式一个是下载一款软件可以模拟post请求，一个是直接写AJAX，然后改成post方式。
    3.由上面我们已经知道接口的四部分了，那我们就要用ajax获取我的数据了.
     $.ajax({
             url: &quot;/mvc/training/ge&quot;,//请求接口
             type: &quot;POST&quot;,//请求方式
             data: {key:1},//请求参数
             dataType: &quot;json&quot;,//响应类型
             success: function(data, textStatus){//访问成功的回调函数，参数是响应，描述状态的字符串
                 console.log(data);
             },
             error: function(XMLHttpRequest, textStatus, errorThrown){//访问失败的回调函数，参数是XMLHttpRequest对象、错误信息、捕获的错误对象(可选);
             }
    });
    个人大力推荐这个，第二步就可以省去了。success的console.log(data);也可以看到响应，完美的剧情。当然，你不要告诉我，你不会看控制台。
XXX:恩恩。好的。我试试去。    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">XXX:</span>我们公司要做接口，我要怎么办？
<span class="hljs-symbol">LN:</span>哦，接口文档发我看看。
<span class="hljs-symbol">XXX:</span>什么是接口文档，我没有啊？
<span class="hljs-symbol">LN:</span>接口文档由四部分组成：（这个看个人习惯有的写得特别简陋，所以第一次的时候问清楚每个参数意思）
    <span class="hljs-number">1.</span>接口地址 URL
    <span class="hljs-number">2.</span>请求方式 get/post
    <span class="hljs-number">3.</span>请求参数 page,pageNum
    <span class="hljs-number">4.</span>响应参数 state,list
<span class="hljs-symbol">XXX:</span>哦哦，这样啊，那我和他们要一下。
    接口：<span class="hljs-meta-keyword">/mvc/</span>training/ge
    请求：key,orderBy,begin,length
<span class="hljs-symbol">LN:</span>没给你响应，也没有给你请求方式啊。
    <span class="hljs-number">1.</span>给接口补全URL,域名<span class="hljs-meta-keyword">/mvc/</span>training/ge。
    <span class="hljs-number">2.</span>把你补全的URL，扔到浏览器的地址栏，看看返回的是什么。当然如果请求参数里面有必填项，那你要用URL?key=value<span class="hljs-variable">&amp;key2</span>=value2的形式模拟get请求。
        <span class="hljs-number">2.1</span> 浏览器把服务器端的响应给你显示了出来。然后你对照这个问后端人员每个是什么意思。
        <span class="hljs-number">2.2</span> 抛出<span class="hljs-number">405</span>错误。这个就比较凄惨了。禁止get请求，那你有两种方式一个是下载一款软件可以模拟post请求，一个是直接写AJAX，然后改成post方式。
    <span class="hljs-number">3.</span>由上面我们已经知道接口的四部分了，那我们就要用ajax获取我的数据了.
     $.ajax({
<span class="hljs-symbol">             url:</span> <span class="hljs-string">"/mvc/training/ge"</span>,<span class="hljs-comment">//请求接口</span>
<span class="hljs-symbol">             type:</span> <span class="hljs-string">"POST"</span>,<span class="hljs-comment">//请求方式</span>
<span class="hljs-symbol">             data:</span> {key:<span class="hljs-number">1</span>},<span class="hljs-comment">//请求参数</span>
<span class="hljs-symbol">             dataType:</span> <span class="hljs-string">"json"</span>,<span class="hljs-comment">//响应类型</span>
<span class="hljs-symbol">             success:</span> function(data, textStatus){<span class="hljs-comment">//访问成功的回调函数，参数是响应，描述状态的字符串</span>
                 console.log(data);
             },
<span class="hljs-symbol">             error:</span> function(XMLHttpRequest, textStatus, errorThrown){<span class="hljs-comment">//访问失败的回调函数，参数是XMLHttpRequest对象、错误信息、捕获的错误对象(可选);</span>
             }
    });
    个人大力推荐这个，第二步就可以省去了。success的console.log(data);也可以看到响应，完美的剧情。当然，你不要告诉我，你不会看控制台。
<span class="hljs-symbol">XXX:</span>恩恩。好的。我试试去。    
</code></pre>
<hr>
<p>场景二：<br>   XXX:这是我的接口。我要怎么做我的页面啊。逻辑怎么写。<br><span class="img-wrap"><img data-src="/img/bVEJEv?w=894&amp;h=321" src="https://static.alili.tech/img/bVEJEv?w=894&amp;h=321" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>   LN:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax(
    method:&quot;GET&quot;,//对于请求类型
    url:&quot;/isNickName&quot;,//请求url，这个我抹黑了。直接复制过来就可以了
    dataType: 'json',
    data: {nickName:$.trim($(&quot;#checktips&quot;).val())},//这个是一个验证是否重名的接口。参数只有一个 名字
).done(function(data){
    if(data.code == 0){//data.code的值这个是后端人员规定的。
        console.log(&quot;请求成功&quot;);
        if(data.object==1){//1为重复
            console.log(&quot;这个nickName重复啦&quot;);
            $(&quot;#retips&quot;).show();
        }else if(data.object==0){
            console.log(&quot;这个nickName不重复&quot;);
            $(&quot;#retips&quot;).hide();
        }else{
            console.log(&quot;未知异常&quot;);
        }
    }else if(data.code == -2){
        console.log(&quot;你没有权限，通常来讲，你是没有登录&quot;);
    }else if(data.code == -5){
        console.log(&quot;参数错误哦。&quot;);
    }else{
        console.log(data.result);
    }
}).fail(function(a,b,c){
    console.log(&quot;接口出问题啦&quot;);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.ajax(
    method:<span class="hljs-string">"GET"</span>,<span class="hljs-comment">//对于请求类型</span>
    url:<span class="hljs-string">"/isNickName"</span>,<span class="hljs-comment">//请求url，这个我抹黑了。直接复制过来就可以了</span>
    dataType: <span class="hljs-string">'json'</span>,
    <span class="hljs-attr">data</span>: {<span class="hljs-attr">nickName</span>:$.trim($(<span class="hljs-string">"#checktips"</span>).val())},<span class="hljs-comment">//这个是一个验证是否重名的接口。参数只有一个 名字</span>
).done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-keyword">if</span>(data.code == <span class="hljs-number">0</span>){<span class="hljs-comment">//data.code的值这个是后端人员规定的。</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"请求成功"</span>);
        <span class="hljs-keyword">if</span>(data.object==<span class="hljs-number">1</span>){<span class="hljs-comment">//1为重复</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"这个nickName重复啦"</span>);
            $(<span class="hljs-string">"#retips"</span>).show();
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(data.object==<span class="hljs-number">0</span>){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"这个nickName不重复"</span>);
            $(<span class="hljs-string">"#retips"</span>).hide();
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"未知异常"</span>);
        }
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(data.code == <span class="hljs-number">-2</span>){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"你没有权限，通常来讲，你是没有登录"</span>);
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(data.code == <span class="hljs-number">-5</span>){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"参数错误哦。"</span>);
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-built_in">console</span>.log(data.result);
    }
}).fail(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,c</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"接口出问题啦"</span>);
})</code></pre>
<p>我简单的解释一下上面这个代码，.done()里面的代码肯定每次都不一样。所以说肯定不能网上随便复制一个就可以，和公司的后端人员<strong>问清楚每一个参数的作用意义</strong>，对于写代码是特别有帮助的。从接口文档可以看出，这个人后端十分的懒，我所有的参数都是访问了以后然后自己猜出来的。</p>
<p>场景有上面的两个，我觉得已经可以了。就不在写了</p>
<hr>
<p>文章的最后我们来说一下 调用 和 .done事件里面的代码 虽然这两个没有关系。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.调用
    最简单的调用方法$(selector).on(&quot;click&quot;,function(){里面放刚才场景二的代码})。
    但是我们有的时候用的不是click.
    blur 失去焦点的时候触发
    change 失去焦点然后判断是否改变，改变触发
    keyDown keyup 按下抬起（这个是最好的，但是要用去抖，下一篇说）
2.done(function(){})
    这个里面一般来说，就是我们用得到的数据去和我们的DOM节点做一些操作。这个每个项目都不一样。但是肯定都和DOM的操作啦渲染啦有关。
    
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1.</span>调用
    最简单的调用方法$(selector).on(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{里面放刚才场景二的代码})。
    但是我们有的时候用的不是click.
    blur 失去焦点的时候触发
    change 失去焦点然后判断是否改变，改变触发
    keyDown keyup 按下抬起（这个是最好的，但是要用去抖，下一篇说）
<span class="hljs-number">2.</span>done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{})
    这个里面一般来说，就是我们用得到的数据去和我们的DOM节点做一些操作。这个每个项目都不一样。但是肯定都和DOM的操作啦渲染啦有关。
    
    </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单的前后端交互流程（AJAX）

## 原文链接
[https://segmentfault.com/a/1190000007281165](https://segmentfault.com/a/1190000007281165)


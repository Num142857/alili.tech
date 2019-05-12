---
title: '还在写冗长的 if else判断在你的代码中吗?' 
date: 2019-02-15 2:30:44
hidden: true
slug: h1yvqe318h
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote>今天无意间看到一篇文章(- -。忘记哪了..我大概说一下吧,本来可以直接分享的...),对于平时冗长的<code>if else</code>的<code>优化</code>. 平时也是这么处理的 通过<code>object</code>对象的数据结构来实现优雅的判断条件书写! 但是看到通过<code>map</code>数据结构的利用  感觉适用更广,局限更低了 ！一起来看看</blockquote>
<h4>首先对于<code>Map</code>数据结构来做个简单介绍:</h4>
<blockquote>
<p>定义:</p>
<blockquote>
<code>Map</code> 对象保存键值对。<code>任何值(对象或者原始值)</code>  都可以作为一个键或一个值。</blockquote>
<p>语法:</p>
<blockquote>
<code>new Map([iterable])</code> <code>Iterable</code> 可以是一个数组或者其他 <code>iterable</code> 对象，其元素或为键值对，或为两个元素的数组。 每个键值对都会添加到新的 <code>Map</code>。<code>null</code> 会被当做 <code>undefined</code>。</blockquote>
<p>方法:</p>
<blockquote>
<code>Map.prototype.get(key)</code> 返回键对应的值，如果不存在，则返回<code>undefined</code>。<br><code>Map.prototype.has(key)</code> 返回一个布尔值，表示Map实例是否包含键对应的值。<br><code>Map.prototype.set(key, value)</code> 设置Map对象中键的值。返回该Map对象。<br><code>对于Map数据结构来说,不支持  =   号的赋值~~~~~~~</code>
</blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map" rel="nofollow noreferrer" target="_blank">关于Map其他介绍API,**不多介绍了</a></p>
</blockquote>
<h2 id="articleHeader1">正文</h2>
<blockquote>对于判断条件的单一</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        var status = 8;
        
        // 常用的if else 进行 条件判断来do somethings
        if(status == 1){
            console.log(111111)
        }else if(status == 2){
            console.log(222222)
        }else if(status == 3){
            console.log(333333)
        }else if(status == 4){
            console.log(444444)
        }else if(status == 5){
            console.log(555555)
        }else{
            console.log(status)
        }                      // 8
        
        
        // switch case的写法 相比if else 是有一些优化了!
        switch (status){
            case 1:
            console.log(status)
            break
            case 2:
            console.log(status)
            break
            case 3:
            console.log(status)
            break
            case 4:
            console.log(status)
            break
            case 5:
            console.log(status)
            break
            default:
            console.log(status)
            break;
        }                            // 8
        
        // 对象object 数据结构的写法  简洁了
        var obj = {
            &quot;1&quot;:&quot;11111&quot;,
            &quot;2&quot;:&quot;22222&quot;,
            &quot;3&quot;:&quot;33333&quot;,
            &quot;4&quot;:&quot;44444&quot;,
            &quot;5&quot;:&quot;55555&quot;,
        }
        console.log(obj[status] || status)   // 8
        
        // Map数据结构的写法    和object差不多
        var mMap = new Map([
            [&quot;1&quot;,&quot;11111&quot;],
            [&quot;2&quot;,&quot;22222&quot;],
            [&quot;3&quot;,&quot;33333&quot;],
            [&quot;4&quot;,&quot;44444&quot;],
            [&quot;5&quot;,&quot;55555&quot;]
        ])
        console.log(mMap.get(status) || status)  // 8
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>        <span class="hljs-built_in">var</span> <span class="hljs-built_in">status</span> = <span class="hljs-number">8</span>;
        
        // 常用的<span class="hljs-keyword">if</span> <span class="hljs-keyword">else</span> 进行 条件判断来<span class="hljs-keyword">do</span> somethings
        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">1</span>){
            console.<span class="hljs-built_in">log</span>(<span class="hljs-number">111111</span>)
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">2</span>){
            console.<span class="hljs-built_in">log</span>(<span class="hljs-number">222222</span>)
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">3</span>){
            console.<span class="hljs-built_in">log</span>(<span class="hljs-number">333333</span>)
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">4</span>){
            console.<span class="hljs-built_in">log</span>(<span class="hljs-number">444444</span>)
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">5</span>){
            console.<span class="hljs-built_in">log</span>(<span class="hljs-number">555555</span>)
        }<span class="hljs-keyword">else</span>{
            console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">status</span>)
        }                      // <span class="hljs-number">8</span>
        
        
        // switch case的写法 相比<span class="hljs-keyword">if</span> <span class="hljs-keyword">else</span> 是有一些优化了!
        switch (<span class="hljs-built_in">status</span>){
            case <span class="hljs-number">1</span>:
            console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">status</span>)
            <span class="hljs-built_in">break</span>
            case <span class="hljs-number">2</span>:
            console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">status</span>)
            <span class="hljs-built_in">break</span>
            case <span class="hljs-number">3</span>:
            console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">status</span>)
            <span class="hljs-built_in">break</span>
            case <span class="hljs-number">4</span>:
            console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">status</span>)
            <span class="hljs-built_in">break</span>
            case <span class="hljs-number">5</span>:
            console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">status</span>)
            <span class="hljs-built_in">break</span>
            default:
            console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">status</span>)
            <span class="hljs-built_in">break</span>;
        }                            // <span class="hljs-number">8</span>
        
        // 对象object 数据结构的写法  简洁了
        <span class="hljs-built_in">var</span> obj = {
            <span class="hljs-string">"1"</span>:<span class="hljs-string">"11111"</span>,
            <span class="hljs-string">"2"</span>:<span class="hljs-string">"22222"</span>,
            <span class="hljs-string">"3"</span>:<span class="hljs-string">"33333"</span>,
            <span class="hljs-string">"4"</span>:<span class="hljs-string">"44444"</span>,
            <span class="hljs-string">"5"</span>:<span class="hljs-string">"55555"</span>,
        }
        console.<span class="hljs-built_in">log</span>(obj[<span class="hljs-built_in">status</span>] || <span class="hljs-built_in">status</span>)   // <span class="hljs-number">8</span>
        
        // Map数据结构的写法    和object差不多
        <span class="hljs-built_in">var</span> mMap = <span class="hljs-built_in">new</span> Map([
            [<span class="hljs-string">"1"</span>,<span class="hljs-string">"11111"</span>],
            [<span class="hljs-string">"2"</span>,<span class="hljs-string">"22222"</span>],
            [<span class="hljs-string">"3"</span>,<span class="hljs-string">"33333"</span>],
            [<span class="hljs-string">"4"</span>,<span class="hljs-string">"44444"</span>],
            [<span class="hljs-string">"5"</span>,<span class="hljs-string">"55555"</span>]
        ])
        console.<span class="hljs-built_in">log</span>(mMap.<span class="hljs-built_in">get</span>(<span class="hljs-built_in">status</span>) || <span class="hljs-built_in">status</span>)  // <span class="hljs-number">8</span>
        </code></pre>
<blockquote>结果都可以达到预期的效果! 判断进行的顺利 ! 然而条件是个<code>多个条件呢? 范围呢? 条件是个运算呢?</code> <code>怎么实现? 接着看</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       var name = &quot;lisi&quot; , status = 1;
       //if else 写法
       
        if(name == &quot;lisi&quot;){
            if(status == 1){
                console.log(&quot;lisi1&quot;)
            }else if(status == 2){
                console.log(&quot;lisi2&quot;)
            }else if(status == 3){
                console.log(&quot;lisi3&quot;)
            }else if(status == 4){
                console.log(&quot;lisi4&quot;)
            }else if(status == 5){
                console.log(&quot;lisi5&quot;)
            }else{
                console.log(status)
            }
        }else if(name == &quot;zhangsan&quot;){
            if(status == 1){
                console.log(&quot;zhangsan1&quot;)
            }else if(status == 2){
                console.log(&quot;zhangsan2&quot;)
            }else if(status == 3){
                console.log(&quot;zhangsan3&quot;)
            }else if(status == 4){
                console.log(&quot;zhangsan4&quot;)
            }else if(status == 5){
                console.log(&quot;zhangsan5&quot;)
            }else{
                console.log(status)
            }
        }                                               //lisi1
        
        //swtich case 写法
        switch (status &amp;&amp; name){
            case 1 &amp;&amp; &quot;lisi&quot;:
            console.log(name + status)
            break
            ...
            default:
            console.log(status)
            break;
        }                                               //lisi1
        
        // 对象数据结构的写法    //简洁
        var obj = {
            &quot;lisi_1&quot;:&quot;lisi1&quot;,
            &quot;lisi_2&quot;:&quot;lisi2&quot;,
            ...
            &quot;zhangsan_5&quot;:&quot;zhangsan5&quot;,
        } 
        console.log(obj[name + &quot;_&quot; + status] || status)   // lisi1
        
        // Map数据结构的写法    和object差不多
        var mMap = new Map([
            [&quot;lisi_1&quot;,&quot;lisi1&quot;],
            [&quot;lisi_2&quot;,&quot;lisi2&quot;],
            ...
            [&quot;zhangsan_5&quot;,&quot;zhangsan5&quot;]
        ])
        console.log(mMap.get(name + &quot;_&quot; +status) || status)  //lisi1
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>       <span class="hljs-built_in">var</span> name = <span class="hljs-string">"lisi"</span> , <span class="hljs-built_in">status</span> = <span class="hljs-number">1</span>;
       //<span class="hljs-keyword">if</span> <span class="hljs-keyword">else</span> 写法
       
        <span class="hljs-keyword">if</span>(name == <span class="hljs-string">"lisi"</span>){
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">1</span>){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"lisi1"</span>)
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">2</span>){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"lisi2"</span>)
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">3</span>){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"lisi3"</span>)
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">4</span>){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"lisi4"</span>)
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">5</span>){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"lisi5"</span>)
            }<span class="hljs-keyword">else</span>{
                console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">status</span>)
            }
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(name == <span class="hljs-string">"zhangsan"</span>){
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">1</span>){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"zhangsan1"</span>)
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">2</span>){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"zhangsan2"</span>)
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">3</span>){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"zhangsan3"</span>)
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">4</span>){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"zhangsan4"</span>)
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">status</span> == <span class="hljs-number">5</span>){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"zhangsan5"</span>)
            }<span class="hljs-keyword">else</span>{
                console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">status</span>)
            }
        }                                               //lisi1
        
        //swtich case 写法
        switch (<span class="hljs-built_in">status</span> &amp;&amp; name){
            case <span class="hljs-number">1</span> &amp;&amp; <span class="hljs-string">"lisi"</span>:
            console.<span class="hljs-built_in">log</span>(name + <span class="hljs-built_in">status</span>)
            <span class="hljs-built_in">break</span>
            ...
            default:
            console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">status</span>)
            <span class="hljs-built_in">break</span>;
        }                                               //lisi1
        
        // 对象数据结构的写法    //简洁
        <span class="hljs-built_in">var</span> obj = {
            <span class="hljs-string">"lisi_1"</span>:<span class="hljs-string">"lisi1"</span>,
            <span class="hljs-string">"lisi_2"</span>:<span class="hljs-string">"lisi2"</span>,
            ...
            <span class="hljs-string">"zhangsan_5"</span>:<span class="hljs-string">"zhangsan5"</span>,
        } 
        console.<span class="hljs-built_in">log</span>(obj[name + <span class="hljs-string">"_"</span> + <span class="hljs-built_in">status</span>] || <span class="hljs-built_in">status</span>)   // lisi1
        
        // Map数据结构的写法    和object差不多
        <span class="hljs-built_in">var</span> mMap = <span class="hljs-built_in">new</span> Map([
            [<span class="hljs-string">"lisi_1"</span>,<span class="hljs-string">"lisi1"</span>],
            [<span class="hljs-string">"lisi_2"</span>,<span class="hljs-string">"lisi2"</span>],
            ...
            [<span class="hljs-string">"zhangsan_5"</span>,<span class="hljs-string">"zhangsan5"</span>]
        ])
        console.<span class="hljs-built_in">log</span>(mMap.<span class="hljs-built_in">get</span>(name + <span class="hljs-string">"_"</span> +<span class="hljs-built_in">status</span>) || <span class="hljs-built_in">status</span>)  //lisi1
        </code></pre>
<blockquote>多个条件也进行了对比,都可以完美实现，书写上相对于来说更为简洁 当然可读性较低一点.. 性能差异肯定也存在. 不过对于平日的基础业务可以忽略不计.接下来对于<code>运算,范围</code>用<code>Map</code>来实现一下 来了解一下~</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        var mMap = new Map([
            [162,function(h,a){console.log(&quot;he height is&quot; + h + &quot; ,he age is&quot; + a)}],
            [174,function(h,a){console.log(&quot;he height is&quot; + h + &quot; ,he age is&quot; + a)}],
            [198,function(h,a){console.log(&quot;he height is&quot; + h + &quot; ,he age is&quot; + a)}],
        ]) 
        var height = 150, age = 12;
        mMap.get(height  + age)(height,age)  //he height is150 ,he age is12
        
        //正则
        var mMap = new Map([
            [/^\d{2,5}$/,function(h,a){console.log(&quot;位数大于2且小于5&quot;)}],
            [/^\d{5,10}$/,function(h,a){console.log(&quot;位数大于5且小于10&quot;)}],
        ]) 
        var arr = [...mMap].filter(([k,v])=>(k.test(`123`)))
        arr.forEach(([k,v])=>v.call(this))    //位数大于2且小于5
        
        
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-keyword">var</span> mMap = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([
            [<span class="hljs-number">162</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">h,a</span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"he height is"</span> + h + <span class="hljs-string">" ,he age is"</span> + a)}],
            [<span class="hljs-number">174</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">h,a</span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"he height is"</span> + h + <span class="hljs-string">" ,he age is"</span> + a)}],
            [<span class="hljs-number">198</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">h,a</span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"he height is"</span> + h + <span class="hljs-string">" ,he age is"</span> + a)}],
        ]) 
        <span class="hljs-keyword">var</span> height = <span class="hljs-number">150</span>, age = <span class="hljs-number">12</span>;
        mMap.get(height  + age)(height,age)  <span class="hljs-comment">//he height is150 ,he age is12</span>
        
        <span class="hljs-comment">//正则</span>
        <span class="hljs-keyword">var</span> mMap = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([
            [<span class="hljs-regexp">/^\d{2,5}$/</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">h,a</span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"位数大于2且小于5"</span>)}],
            [<span class="hljs-regexp">/^\d{5,10}$/</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">h,a</span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"位数大于5且小于10"</span>)}],
        ]) 
        <span class="hljs-keyword">var</span> arr = [...mMap].filter(<span class="hljs-function">(<span class="hljs-params">[k,v]</span>)=&gt;</span>(k.test(<span class="hljs-string">`123`</span>)))
        arr.forEach(<span class="hljs-function">(<span class="hljs-params">[k,v]</span>)=&gt;</span>v.call(<span class="hljs-keyword">this</span>))    <span class="hljs-comment">//位数大于2且小于5</span>
        
        
        </code></pre>
<blockquote>
<code>Map结构是支持任何对象任何原始值作为key|value的,所以你们可以开动大脑再试试其它,我就不介绍了.明白这样写就好</code>, 当然可以适当封装,但是这个业务代码耦合性略高,封装意义不大,此处就不做说明了!</blockquote>
<h2 id="articleHeader2">最后</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="有小伙伴看过那篇的可以评论区贴一下,(那篇文章篇幅比我长...比我肯定全一些..)我只是简单的介绍了一下.平日都这么用.分享给大家." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">有小伙伴看过那篇的可以评论区贴一下,(那篇文章篇幅比我长...比我肯定全一些..)我只是简单的介绍了一下.平日都这么用.分享给大家.</code></pre>
<blockquote>关于<code>webpack后续</code>的文章 周一见 !</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
还在写冗长的 if else判断在你的代码中吗?

## 原文链接
[https://segmentfault.com/a/1190000016941158](https://segmentfault.com/a/1190000016941158)


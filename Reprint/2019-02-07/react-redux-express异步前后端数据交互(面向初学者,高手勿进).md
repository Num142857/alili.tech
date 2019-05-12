---
title: 'react-redux-express异步前后端数据交互(面向初学者,高手勿进)' 
date: 2019-02-07 2:30:16
hidden: true
slug: 0cavat2kgo5c
categories: [reprint]
---

{{< raw >}}

                    
<p>花了整整三天的时间来解决一个非常非常小的问题.想要把一点心得体会记录下来.<br>首先是问题的提出:前端如果是react,后端是express,如何进行数据的交互.</p>
<h2 id="articleHeader0">1.总体思路</h2>
<p>以前接触<code>express</code>的时候前端模板用的是<code>ejs</code>,那时候就有些不理解的地方.最为不理解的几个问题是:前端和后端怎么配合?特别是前端特别复杂的时候,难道还是全用模板吗?如果前端用了框架呢?这些问题对于大部分开发者或者非初级学习者来说都不算问题,但是对于初学者来说,如果不能完整地知道这些概念和数据流动的方式,学起来就会有些"心虚".</p>
<p>所以在接触了<code>express</code>和<code>react</code> 之后,我强烈地想知道两者是怎么进行数据的交互的.我想要的技术栈是:<code>react-redux-webpack-express</code> .在google和github上找了很久都没有找到合适的,最后才发现,其实官网的那个已经是最好的例子<a href="http://cn.redux.js.org/docs/introduction/Examples.html" rel="nofollow noreferrer" target="_blank">Async</a>.</p>
<p>目前得到的比较好的方式是用异步的方式,通过前端ajax来发出请求,后端接收并处理请求,返回相应的数据(在这里不讲述<a href="http://cn.redux.js.org/docs/recipes/ServerRendering.html" rel="nofollow noreferrer" target="_blank">服务器渲染</a>).在这里的<code>ajax</code>如果引入jq会显得太笨重,所以按照官网的方法用 <code>isomorphic-fetch</code></p>
<p>而因为引入了<code>redux</code>,所以要把<code>ajax</code>写在哪里是一个问题. <code>google</code>了一下,发现大家都认为写在<code>action</code>里面最好(官网也是这么做的),所以就直接这么做吧.(跟着官网没错)</p>
<p>下面就以一个非常非常简单的例子为切入点,功能如下:有一个<code>input</code>和一个<code>button</code>,在<code>input</code>里面输入,点击按钮,把<code>input</code>的内容上传服务器(<code>POST</code>). 同时下面有一个列表,从服务器上获取数据并在<code>react</code>中渲染(<code>GET</code>). 非常非常非常简单.</p>
<h2 id="articleHeader1">2.GET方法</h2>
<p>把ajax全部写在<code>action</code>里面, 异步<code>action</code>需要用到中间件. 有关中间件最好的文章我认为是<a href="https://segmentfault.com/a/1190000005766289">这一篇</a>, 里面讲了<code>applyMiddleware</code> 的实现原理和例子(其实有点像俄罗斯套娃,把原本的<code>dispatch</code>慢慢加强,比如可以用<code>logger</code>加一点日志辅助找<code>bug</code>) 这里要用到一个叫做<code>thunk</code>的中间件(<a href="https://github.com/gaearon/redux-thunk" rel="nofollow noreferrer" target="_blank">实现原理</a>很简洁,可以自己找来琢磨)</p>
<p>下面的代码从服务器中获取列表. 其中的<code>fetch</code>的用法可以看<a href="https://github.com/github/fetch" rel="nofollow noreferrer" target="_blank">这里</a>, 这里也用到了<code>promise</code>对象用于处理异步事件,这个可以看阮一峰大神的<a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">这篇文章</a>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const fetchList = () => {
    return dispatch => {
        dispatch({ type:&quot;REQUEST_LIST&quot; })
        return fetch(`/list`, {
            header: {
                &quot;dataType&quot;: &quot;json&quot;
            }
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                dispatch(receiveList(json.items))
            }
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fetchList = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> {
        dispatch({ <span class="hljs-keyword">type</span>:<span class="hljs-string">"REQUEST_LIST"</span> })
        <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">`/list`</span>, {
            header: {
                <span class="hljs-string">"dataType"</span>: <span class="hljs-string">"json"</span>
            }
        })
            .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                <span class="hljs-keyword">return</span> response.json()
            })
            .then(<span class="hljs-function"><span class="hljs-params">json</span> =&gt;</span> {
                dispatch(receiveList(json.items))
            }
        )
    }
}</code></pre>
<h2 id="articleHeader2">3.POST方法</h2>
<p>POST方法与GET大同小异,不过在server写代码的时候要用上<code>body-parser</code>, 不然有可能请求会变成undefined,写法是<a href="http://stackoverflow.com/questions/9177049/express-js-req-body-undefined" rel="nofollow noreferrer" target="_blank">这样</a>的. </p>
<p>具体的代码如下: POST方法相对复杂一点点.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const postAddItem = (text) => {
    return dispatch => {
        dispatch({type: &quot;loadAddItem&quot;, text})
        fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': &quot;application/json&quot;,
                'Accept': &quot;application/json&quot;,
                'Content-Type': &quot;application/json&quot;
            },
            body: JSON.stringify({ item: text })
        }).then(res => {
            if(res.ok) {
                dispatch({ type: &quot;ADD_ITEM&quot;, text })
                console.log(&quot;POST SUCCESS&quot;);
            } 
        }, e => {
            dispatch({type: &quot;loadAddItem&quot;, text})
            alert(&quot;POST ERROR&quot;);
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> postAddItem = <span class="hljs-function">(<span class="hljs-params">text</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> {
        dispatch({<span class="hljs-keyword">type</span>: <span class="hljs-string">"loadAddItem"</span>, text})
        fetch(<span class="hljs-string">'/send'</span>, {
            method: <span class="hljs-string">'POST'</span>,
            headers: {
                <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">"application/json"</span>,
                <span class="hljs-string">'Accept'</span>: <span class="hljs-string">"application/json"</span>,
                <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">"application/json"</span>
            },
            body: <span class="hljs-built_in">JSON</span>.stringify({ item: text })
        }).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
            <span class="hljs-keyword">if</span>(res.ok) {
                dispatch({ <span class="hljs-keyword">type</span>: <span class="hljs-string">"ADD_ITEM"</span>, text })
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"POST SUCCESS"</span>);
            } 
        }, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
            dispatch({<span class="hljs-keyword">type</span>: <span class="hljs-string">"loadAddItem"</span>, text})
            alert(<span class="hljs-string">"POST ERROR"</span>);
        })
    }
}</code></pre>
<p>这些代码都是根据官网上<a href="http://cn.redux.js.org/docs/introduction/Examples.html" rel="nofollow noreferrer" target="_blank">Async</a>的代码改的. <br>所以要真正掌握redux, 官网文档和例子要熟读啊...</p>
<h2 id="articleHeader3">4.关于调试</h2>
<p>关于调试我没有什么值得分享的(我也在找比较方便的调试方法TAT,跪求推荐!!), 不过一个这几天下来总结了"肉眼debug"的思路就是: 看数据怎么流,从哪里开始变得不符合要求.之前在写的时候就是<code>connect</code>的地方开始有问题,结果死活找不出为什么渲染不出来...明明在<code>logger</code>上看到已经获取到了数据...</p>
<h2 id="articleHeader4">5.总结</h2>
<p>个人感觉如果要"打通前后端"(起码理解吧),一定要认真理解<code>redux</code>,基本概念,异步,中间件(整个官网的内容很丰富,要多读..) 不过基础也很重要!最基础的<code>es6</code>,<code>ajax</code>等一定要会...<br>自己写的粗糙的例子代码<a href="https://github.com/harryfyodor/react-redux-express-fetch-simple-example" rel="nofollow noreferrer" target="_blank">在此</a></p>
<p>(第一次写文章,本人是小白,有什么说得不对的不好的,感谢提出!)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react-redux-express异步前后端数据交互(面向初学者,高手勿进)

## 原文链接
[https://segmentfault.com/a/1190000005906458](https://segmentfault.com/a/1190000005906458)


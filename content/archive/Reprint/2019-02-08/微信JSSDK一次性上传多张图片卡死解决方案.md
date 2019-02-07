---
title: '微信JSSDK一次性上传多张图片卡死解决方案' 
date: 2019-02-08 2:30:40
hidden: true
slug: zhwd6opdyi
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">应用场景描述</h1>
<blockquote><p>微信禁止了使用表单<code>INPUT[TYPE="FILE"]</code>上传图片，必须使用微信<code>WEB JSSDK</code> 图片上传，该插件是<code>一张一张</code>的上传的。过程是这样的 <code>上传图片</code> ——&gt; <code>返回图片本地ID</code> ——&gt;<code>根据图片本地ID,获取图片媒体ID</code>——&gt;<code>服务端根据图片媒体ID下载图片</code>。</p></blockquote>
<h1 id="articleHeader1">上传卡死的原因</h1>
<blockquote>
<p>多张连续上传的时候,因为还未等一张图片获取完媒体ID，而下一张图片又开始请求获取媒体ID，所以会出现卡死问题。解决方案如下：</p>
<ul>
<li><p>递归处理 （<code>推荐</code>）</p></li>
<li><p>定时器处理</p></li>
</ul>
</blockquote>
<h1 id="articleHeader2">递归处理逻辑思路</h1>
<blockquote><p>定义两个变量 <code>var idx =0; var localIds;</code> 分别存储<code>上传序号,记录上传到第几张图片</code>，<code>本地图片ID数组，即调用微信 WEB JSSDK 的wx.chooseImage()返回的结果</code>  写递归函数实现获取<code>根据图片本地ID,获取图片媒体ID</code>这个环节。</p></blockquote>
<h1 id="articleHeader3">递归处理逻辑代码</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ID数组
var localIds = null;
// 上传序号
var idx = 0;
var serverIds='';
wx.ready(function(){ //配置web jssdk通过执行
    //调用图片上传接口
    wx.chooseImage({//返回本地图片id 也可做为img 路径显示图片 
           
          success: function (res) {//上传本地图片成功 
           
            localIds = res.localIds;//本地图片id数组，下标从0开始

            //调用上传递归函数
            wxUploadImg(localIds);
            
          }
    });


    /**
     * [wxUploadImg 获取图片媒体ID 递归函数]
     * @author 邱先生 
     * @copyright  
     * @version [V1.0版本] 
     * @date 2016-07-02
     * @param  {[type]} localIds [本地图片ID数组]
     * @return {[type]}          [description]
     */
    function wxUploadImg(localIds){


        wx.uploadImage({//获取图片媒体ID
         
            localId: localIds[idx].toString(),  // 需要上传的图片的本地ID
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {//获取成功
                // 上传序号，上传一张 累计 +1    
                idx++
                //存储图片媒体ID，用，号分割
                serverIds+=res.serverId+',';
                
                if(idx<localIds.length){//本地图片ID 还没全部获取完图片媒体ID
                     //调用上传递归函数
                    wxUploadImg(localIds);
                }else{
                    //上传序号归零
                    idx=0;
                    //服务器csrf 验证字符串，如果后端框架没开启csrf，则不需要
                    var csrf=$('meta[name=&quot;csrf-token&quot;]').attr('content');
                    $.ajax({
                        url: &quot;服务器端根据图片媒体ID下载图片处理操作地址&quot;,
                        type: 'POST',
                        dataType: 'json',
                        data: {_csrf:csrf,serverIds:serverIds},
                    })
                    .done(function(data) {
                        console.log(&quot;上传成功&quot;);
                    })
                    .fail(function() {
                        console.log(&quot;error&quot;);
                    })
                    .always(function() {
                        console.log(&quot;complete&quot;);
                    });

                    serverIds='';
                    return true;
                }
            },
            fail: function(res){//获取多媒体id失败 返回错误代码
                alert(&quot;上传失败，msg：&quot;+JSON.stringify(res));
            }
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ID数组</span>
<span class="hljs-keyword">var</span> localIds = <span class="hljs-literal">null</span>;
<span class="hljs-comment">// 上传序号</span>
<span class="hljs-keyword">var</span> idx = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> serverIds=<span class="hljs-string">''</span>;
wx.ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">//配置web jssdk通过执行</span>
    <span class="hljs-comment">//调用图片上传接口</span>
    wx.chooseImage({<span class="hljs-comment">//返回本地图片id 也可做为img 路径显示图片 </span>
           
          success: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{<span class="hljs-comment">//上传本地图片成功 </span>
           
            localIds = res.localIds;<span class="hljs-comment">//本地图片id数组，下标从0开始</span>

            <span class="hljs-comment">//调用上传递归函数</span>
            wxUploadImg(localIds);
            
          }
    });


    <span class="hljs-comment">/**
     * [wxUploadImg 获取图片媒体ID 递归函数]
     * @author 邱先生 
     * @copyright  
     * @version [V1.0版本] 
     * @date 2016-07-02
     * @param  {[type]} localIds [本地图片ID数组]
     * @return {[type]}          [description]
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wxUploadImg</span>(<span class="hljs-params">localIds</span>)</span>{


        wx.uploadImage({<span class="hljs-comment">//获取图片媒体ID</span>
         
            localId: localIds[idx].toString(),  <span class="hljs-comment">// 需要上传的图片的本地ID</span>
            isShowProgressTips: <span class="hljs-number">1</span>, <span class="hljs-comment">// 默认为1，显示进度提示</span>
            success: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{<span class="hljs-comment">//获取成功</span>
                <span class="hljs-comment">// 上传序号，上传一张 累计 +1    </span>
                idx++
                <span class="hljs-comment">//存储图片媒体ID，用，号分割</span>
                serverIds+=res.serverId+<span class="hljs-string">','</span>;
                
                <span class="hljs-keyword">if</span>(idx&lt;localIds.length){<span class="hljs-comment">//本地图片ID 还没全部获取完图片媒体ID</span>
                     <span class="hljs-comment">//调用上传递归函数</span>
                    wxUploadImg(localIds);
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-comment">//上传序号归零</span>
                    idx=<span class="hljs-number">0</span>;
                    <span class="hljs-comment">//服务器csrf 验证字符串，如果后端框架没开启csrf，则不需要</span>
                    <span class="hljs-keyword">var</span> csrf=$(<span class="hljs-string">'meta[name="csrf-token"]'</span>).attr(<span class="hljs-string">'content'</span>);
                    $.ajax({
                        <span class="hljs-attr">url</span>: <span class="hljs-string">"服务器端根据图片媒体ID下载图片处理操作地址"</span>,
                        <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>,
                        <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
                        <span class="hljs-attr">data</span>: {<span class="hljs-attr">_csrf</span>:csrf,<span class="hljs-attr">serverIds</span>:serverIds},
                    })
                    .done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"上传成功"</span>);
                    })
                    .fail(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"error"</span>);
                    })
                    .always(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"complete"</span>);
                    });

                    serverIds=<span class="hljs-string">''</span>;
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
                }
            },
            <span class="hljs-attr">fail</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{<span class="hljs-comment">//获取多媒体id失败 返回错误代码</span>
                alert(<span class="hljs-string">"上传失败，msg："</span>+<span class="hljs-built_in">JSON</span>.stringify(res));
            }
        });
    }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信JSSDK一次性上传多张图片卡死解决方案

## 原文链接
[https://segmentfault.com/a/1190000005856326](https://segmentfault.com/a/1190000005856326)


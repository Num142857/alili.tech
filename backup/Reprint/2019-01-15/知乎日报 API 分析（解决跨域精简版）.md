---
title: '知乎日报 API 分析（解决跨域精简版）' 
date: 2019-01-15 2:30:12
hidden: true
slug: tib01cnvk8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">特别感谢</h2>
<p><a href="http://m.2cto.com/kf/201604/501930.html" rel="nofollow noreferrer" target="_blank">知乎日报 API 分析</a></p>
<h2 id="articleHeader1">声明</h2>
<p>以下所有 API 均由知乎（Zhihu.Inc）提供，本人灵感均来自<a href="http://m.2cto.com/kf/201604/501930.html" rel="nofollow noreferrer" target="_blank">知乎日报 API 分析</a>，对于原来的分析进行了一些个人的整改，如有不当之处请告知本人，本人立即处理此文章。获取与共享之行为或有侵犯知乎权益的嫌疑。若被告知需停止共享与使用，本人会及时删除此页面与整个项目。请您暸解相关情况，并遵守知乎协议。</p>
<h2 id="articleHeader2">功能特性</h2>
<ul>
<li><p>获取最新消息</p></li>
<li><p>获取文章具体内容</p></li>
<li><p>获取过往消息</p></li>
<li><p>获取文章额外信息</p></li>
<li><p>获取文章较长评论</p></li>
<li><p>获取文章较短评论</p></li>
<li><p>查看主题日报列表</p></li>
<li><p>查看主题日报内容</p></li>
</ul>
<h2 id="articleHeader3">优点</h2>
<p>解决跨域问题，前端人员可直接调用</p>
<h2 id="articleHeader4">接口文档</h2>
<h4>调用前须知</h4>
<p>由于本项目托管在leancloud上，是开发版，如果接口调用太频繁，可能导致无法继续调用。</p>
<h4>获取最新消息：</h4>
<h5>接口地址</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/last-stories
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>http<span class="hljs-variable">s:</span>//zhihu-daily.leanapp.<span class="hljs-keyword">cn</span>/api/v1/<span class="hljs-keyword">last</span>-stories
</code></pre>
<h5>返回数据示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;STORIES&quot;: {
        &quot;date&quot;: &quot;20170429&quot;,
        &quot;stories&quot;: [
            {
                &quot;images&quot;: [
                    &quot;https://pic2.zhimg.com/v2-cdf8a4692d23ca04e01a1c5f249d0749.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9385790,
                &quot;ga_prefix&quot;: &quot;042914&quot;,
                &quot;title&quot;: &quot;控制私家车的排放，办法不一定是让大家轮流出门&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic1.zhimg.com/v2-7a4c243c29b1a245f01e771bc9026d28.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9385221,
                &quot;ga_prefix&quot;: &quot;042913&quot;,
                &quot;title&quot;: &quot;来到了江南，怎能不尝江鲜？&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic2.zhimg.com/v2-124f6d0e3d0c9354d76f58e16763fa51.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9379764,
                &quot;ga_prefix&quot;: &quot;042912&quot;,
                &quot;title&quot;: &quot;他们生长在珠峰上，守护着每一位前来的登山者&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic3.zhimg.com/v2-56cf60db120c44dc53e0f994d670931e.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9386462,
                &quot;ga_prefix&quot;: &quot;042912&quot;,
                &quot;title&quot;: &quot;大误 · 科技改变生活&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic4.zhimg.com/v2-dfe575acc13c197696149cbd5eccf703.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388207,
                &quot;ga_prefix&quot;: &quot;042911&quot;,
                &quot;title&quot;: &quot;想开餐馆可要想好了，哪怕是门庭若市也不一定好赚钱&quot;
            },
            {
                &quot;title&quot;: &quot;胆子不够大，还是别来这些地方玩了&quot;,
                &quot;ga_prefix&quot;: &quot;042909&quot;,
                &quot;images&quot;: [
                    &quot;https://pic4.zhimg.com/v2-9577d4156cebd3256a30cf6a82cb7133.jpg&quot;
                ],
                &quot;multipic&quot;: true,
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388123
            },
            {
                &quot;title&quot;: &quot;对糖葫芦，我有一种谄媚式的喜爱&quot;,
                &quot;ga_prefix&quot;: &quot;042908&quot;,
                &quot;images&quot;: [
                    &quot;https://pic1.zhimg.com/v2-5ab7cc566cbc3407ef3d085734a99738.jpg&quot;
                ],
                &quot;multipic&quot;: true,
                &quot;type&quot;: 0,
                &quot;id&quot;: 9387436
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic3.zhimg.com/v2-4c57b6f60fadbc9381dbc1dbd80b51da.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388976,
                &quot;ga_prefix&quot;: &quot;042907&quot;,
                &quot;title&quot;: &quot;- 你见过凌晨四点半的哈佛图书馆吗？\r\n- 见过啊&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic1.zhimg.com/v2-11e3f6fb0a5814abc2ef90e213db2f6c.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388899,
                &quot;ga_prefix&quot;: &quot;042907&quot;,
                &quot;title&quot;: &quot;亚马逊发布了一款「魔镜」，可以判断你穿得美不美&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic4.zhimg.com/v2-7372f608b9ee2eeacd05b5191bf88023.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388854,
                &quot;ga_prefix&quot;: &quot;042907&quot;,
                &quot;title&quot;: &quot;有人给我发了律师函，怎么才能知道是不是骗子？&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic4.zhimg.com/v2-766204df4ba818c989bdb492b072b75f.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9387639,
                &quot;ga_prefix&quot;: &quot;042906&quot;,
                &quot;title&quot;: &quot;瞎扯 · 如何正确地吐槽&quot;
            }
        ],
        &quot;top_stories&quot;: [
            {
                &quot;image&quot;: &quot;https://pic4.zhimg.com/v2-152ad03f7b0b245ea1d1dcb1b0418f8b.jpg&quot;,
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388123,
                &quot;ga_prefix&quot;: &quot;042909&quot;,
                &quot;title&quot;: &quot;胆子不够大，还是别来这些地方玩了&quot;
            },
            {
                &quot;image&quot;: &quot;https://pic1.zhimg.com/v2-bc74ab7cf112fecf0d001b6829e85e6c.jpg&quot;,
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388854,
                &quot;ga_prefix&quot;: &quot;042907&quot;,
                &quot;title&quot;: &quot;有人给我发了律师函，怎么才能知道是不是骗子？&quot;
            },
            {
                &quot;image&quot;: &quot;https://pic2.zhimg.com/v2-3ec6f70c9c3c1a86247f44cfca9f2b59.jpg&quot;,
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388099,
                &quot;ga_prefix&quot;: &quot;042814&quot;,
                &quot;title&quot;: &quot;「五一」小长假，我猜这些地方会很堵，比如周杰伦演唱会门口&quot;
            },
            {
                &quot;image&quot;: &quot;https://pic1.zhimg.com/v2-b33f30ab4af4e8339465fba5d077b5a8.jpg&quot;,
                &quot;type&quot;: 0,
                &quot;id&quot;: 9386190,
                &quot;ga_prefix&quot;: &quot;042807&quot;,
                &quot;title&quot;: &quot;微信也要做搜索，仔细想想有点可怕&quot;
            },
            {
                &quot;image&quot;: &quot;https://pic3.zhimg.com/v2-430ce94c5a87e98a7ed7a2d20f0ca85e.jpg&quot;,
                &quot;type&quot;: 0,
                &quot;id&quot;: 9383848,
                &quot;ga_prefix&quot;: &quot;042706&quot;,
                &quot;title&quot;: &quot;这里是广告 · 从电影的世界里看 AI&quot;
            }
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"STORIES"</span>: {
        <span class="hljs-attr">"date"</span>: <span class="hljs-string">"20170429"</span>,
        <span class="hljs-attr">"stories"</span>: [
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic2.zhimg.com/v2-cdf8a4692d23ca04e01a1c5f249d0749.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9385790</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042914"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"控制私家车的排放，办法不一定是让大家轮流出门"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic1.zhimg.com/v2-7a4c243c29b1a245f01e771bc9026d28.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9385221</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042913"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"来到了江南，怎能不尝江鲜？"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic2.zhimg.com/v2-124f6d0e3d0c9354d76f58e16763fa51.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9379764</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042912"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"他们生长在珠峰上，守护着每一位前来的登山者"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic3.zhimg.com/v2-56cf60db120c44dc53e0f994d670931e.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9386462</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042912"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"大误 · 科技改变生活"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic4.zhimg.com/v2-dfe575acc13c197696149cbd5eccf703.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388207</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042911"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"想开餐馆可要想好了，哪怕是门庭若市也不一定好赚钱"</span>
            },
            {
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"胆子不够大，还是别来这些地方玩了"</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042909"</span>,
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic4.zhimg.com/v2-9577d4156cebd3256a30cf6a82cb7133.jpg"</span>
                ],
                <span class="hljs-attr">"multipic"</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388123</span>
            },
            {
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"对糖葫芦，我有一种谄媚式的喜爱"</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042908"</span>,
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic1.zhimg.com/v2-5ab7cc566cbc3407ef3d085734a99738.jpg"</span>
                ],
                <span class="hljs-attr">"multipic"</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9387436</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic3.zhimg.com/v2-4c57b6f60fadbc9381dbc1dbd80b51da.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388976</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042907"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"- 你见过凌晨四点半的哈佛图书馆吗？\r\n- 见过啊"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic1.zhimg.com/v2-11e3f6fb0a5814abc2ef90e213db2f6c.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388899</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042907"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"亚马逊发布了一款「魔镜」，可以判断你穿得美不美"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic4.zhimg.com/v2-7372f608b9ee2eeacd05b5191bf88023.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388854</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042907"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"有人给我发了律师函，怎么才能知道是不是骗子？"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic4.zhimg.com/v2-766204df4ba818c989bdb492b072b75f.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9387639</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042906"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"瞎扯 · 如何正确地吐槽"</span>
            }
        ],
        <span class="hljs-attr">"top_stories"</span>: [
            {
                <span class="hljs-attr">"image"</span>: <span class="hljs-string">"https://pic4.zhimg.com/v2-152ad03f7b0b245ea1d1dcb1b0418f8b.jpg"</span>,
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388123</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042909"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"胆子不够大，还是别来这些地方玩了"</span>
            },
            {
                <span class="hljs-attr">"image"</span>: <span class="hljs-string">"https://pic1.zhimg.com/v2-bc74ab7cf112fecf0d001b6829e85e6c.jpg"</span>,
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388854</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042907"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"有人给我发了律师函，怎么才能知道是不是骗子？"</span>
            },
            {
                <span class="hljs-attr">"image"</span>: <span class="hljs-string">"https://pic2.zhimg.com/v2-3ec6f70c9c3c1a86247f44cfca9f2b59.jpg"</span>,
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388099</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042814"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"「五一」小长假，我猜这些地方会很堵，比如周杰伦演唱会门口"</span>
            },
            {
                <span class="hljs-attr">"image"</span>: <span class="hljs-string">"https://pic1.zhimg.com/v2-b33f30ab4af4e8339465fba5d077b5a8.jpg"</span>,
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9386190</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042807"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"微信也要做搜索，仔细想想有点可怕"</span>
            },
            {
                <span class="hljs-attr">"image"</span>: <span class="hljs-string">"https://pic3.zhimg.com/v2-430ce94c5a87e98a7ed7a2d20f0ca85e.jpg"</span>,
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9383848</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042706"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"这里是广告 · 从电影的世界里看 AI"</span>
            }
        ]
    }
}</code></pre>
<h5>返回数据说明</h5>
<ul>
<li><p>date: 日期</p></li>
<li><p>stories: 当日日报</p></li>
<li><p>title: 日报标题</p></li>
<li><p>images: 文章配图（小图）</p></li>
<li><p>ga_prefix: 供 Google Analytics 使用</p></li>
<li><p>type: 作用未知</p></li>
<li><p>id: 文章唯一id</p></li>
<li><p>multipic: 消息是否包含多张图片（仅出现在包含多图的新闻中）</p></li>
<li><p>top_stories: 热门文章</p></li>
</ul>
<h4>获取文章具体内容：</h4>
<h5>接口地址</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/contents/:id
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>https:<span class="hljs-regexp">//</span>zhihu-daily.leanapp.cn<span class="hljs-regexp">/api/</span>v1<span class="hljs-regexp">/contents/</span>:id
</code></pre>
<h5>调用示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/contents/9386190
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>https:<span class="hljs-regexp">//</span>zhihu-daily.leanapp.cn<span class="hljs-regexp">/api/</span>v1<span class="hljs-regexp">/contents/</span><span class="hljs-number">9386190</span>
</code></pre>
<h5>返回数据示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;CONTENTS&quot;: {
        &quot;body&quot;: &quot;<div class=\&quot;main-wrap content-wrap\&quot;>\n<div class=\&quot;headline\&quot;>\n\n<div class=\&quot;img-place-holder\&quot;></div>\n\n\n\n</div>\n\n<div class=\&quot;content-inner\&quot;>\n\n\n\n\n<div class=\&quot;question\&quot;>\n<h2 class=\&quot;question-title\&quot;>微信成立搜索应用部，微信的搜索有哪些想象空间？</h2>\n\n<div class=\&quot;answer\&quot;>\n\n<div class=\&quot;meta\&quot;>\n<img class=\&quot;avatar\&quot; src=\&quot;http://pic1.zhimg.com/e6de3ae3225bdf1adeca084de9813c7c_is.jpg\&quot;>\n<span class=\&quot;author\&quot;>潘一鸣，</span><span class=\&quot;bio\&quot;>PM/THU</span>\n</div>\n\n<div class=\&quot;content\&quot;>\n<p><strong>微信做搜索，是自然而言的事情。</strong></p>\r\n<p><strong>1. 搜索，本就是流量利用效率最高的功能。</strong></p>\r\n<p>PC 时代，所有网民都用百度，而移动时代，所有网民都有微信。这两年来，微信一直是互联网的流量黑洞。不管什么社交 APP，最终人和人认识了，就会加个微信。不管什么自媒体平台，写文章的人，总是时不时挂一个公众号的二维码。</p>\r\n<p>人们不再发短信，而是发微信。手机通讯录很久不再更新，微信联系人却越来越多。</p>\r\n<p>从社交，到内容消费，到支付，再到现在的小程序。微信承载的功能越来越多。</p>\r\n<p>14 年校招，被搜狗面试的时候，有一道题，问&amp;ldquo;你觉得移动端的浏览器未来是什么样子&amp;rdquo;，我记得我当时给出主要论点就是移动端最强大的浏览器未来就是微信。现在看来确实是这样，两年前盛行的&amp;ldquo;APP 已死，浏览器永生&amp;rdquo;的论调，也未尝不对，只是浏览器变成了微信。百度当初的直达号战略确实是一个方向，只不过，可能搜索框会放到微信里。</p>\r\n<p>我们的电脑里目前还保存的应用无非是两种，一种是工具类，用于工作娱乐，一种是游戏。大部分上网的功能，都在浏览器中完成。未来我们手机里大概也只会有两类应用，一类是工具类，一类是游戏类，而大部分其他场景功能，可能都在微信中完成。</p>\r\n<p>低频应用最终变成高频应用的功能点，这样例子，在互联网中不胜枚举。而所有 APP 之上确实有个最高频的微信。这一两年比较优秀的电商创业公司，基本上都是以微信为依托，甚至先有微信服务号，微信 H5，然后才有 APP 承接用户。包括拼多多，也包括每日优鲜。</p>\r\n<p>小程序不断在开放新的第三方功能，微信承接低频应用的步伐也在加快。</p>\r\n<p><strong>一方面大量的用户和关系链进入微信，一方面大量的自媒体内容沉淀在微信，一方面大量的低频场景接入微信。而如何将这些要匹配在一起，搜索，无疑是最佳的选择。</strong></p>\r\n<p><strong>2. 微信的搜索会是什么样？</strong></p>\r\n<p>首先是一个问题：搜索质量的核心是什么？</p>\r\n<p>算法？计算能力？</p>\r\n<p>算法现在都是机器学习那一套，卓越虽然难以企及，但优秀对于腾讯这样的公司却并不难。</p>\r\n<p>计算能力，其实是拼钱，腾讯最不缺这个。</p>\r\n<p><strong>其实搜索质量的核心，是数据。</strong></p>\r\n<p>搜索引擎一开始是算法根据 TF-IDF 等规则进行排序；后来算法参考用户在搜索结果中的点击行为，把点击率高的内容往前提，这是一个比较重大的进步，系统有了自反馈；再后来，算法开始加入了用户行为数据进行个性化排序。正是数据，在一步一步推进搜索引擎的进步，从第一代规则，到第二代自反馈，到第三代的个性化。</p>\r\n<p>百度无疑是第二代搜索引擎的霸主，对于后来者而言，想取代百度，迈不过去的坎儿，就是百度积累的大量用户搜索引擎使用数据。但是在第三代个性化排序的时候，百度账号体系弱，个性化数据收集比较有限。</p>\r\n<p>而微信所拥有的数据，也决定了微信可能会带给我们，比个性化搜索更强大的搜索方式。</p>\r\n<p>腾讯拥有用户互联网大部分的行为数据。文章，音乐，视频，支付，游戏，如此海量的多维度数据，百度和阿里也无法企及。而直接结果是，腾讯的系统里，用户特征和用户画像将更为准确。</p>\r\n<p>除此之外，更重要的是，腾讯有互联网用户的关系链。你和谁是好友，深夜的时候最喜欢和谁聊天，最喜欢给谁点赞，最喜欢看谁的朋友圈。如果有人能了解你所有的微信中的社交关系链，那这个人能够怎么了解你，微信搜索就能怎么了解你。</p>\r\n<p>当大量的社交数据被用于机器学习的时候，你的搜索会变得怎样的智能？</p>\r\n<p>这个想象空间太大了，微信搜索将更比所有的互联网产品都更懂你，而关于这部分的探索，Facebook 所做的 edgerank 也只是一个开始。随着算法的发展，计算能力的指数爆发，拥有用户，内容，数据的微信搜索，会成为什么样。这绝不是我们现在能够预测到的事情。</p>\r\n<p>至于微信搜索会不会去索引全部的网页，答案应该是不会，没必要。充斥着色情暴力诈骗的网页，风险不可控，对于绝对优势的微信而言，显然不值得尝试。</p>\r\n<p><strong>3. 小总结</strong></p>\r\n<p><strong>微信为什么要做搜索？</strong></p>\r\n<p>海量用户，海量内容，海量场景需要功能连接在一起。</p>\r\n<p><strong>微信搜索有什么优势？</strong></p>\r\n<p>全网用户数据，用户关系链和社交数据。而数据是搜索质量的核心。</p>\r\n<p><strong>微信搜索将来发展如何？</strong></p>\r\n<p>微信的数据量决定比目前的个性化搜索更进一步，而这样的数据量能产生多大的进步，目前并没有什么先例可供参考。</p>\r\n<p><strong>微信搜索是否会索引全部网页？</strong></p>\r\n<p>应该不会，网页太多不可控的风险，对于绝对优势的微信，没有必要去索引全部网页内容。</p>\n</div>\n</div>\n\n<div class=\&quot;answer\&quot;>\n\n<div class=\&quot;meta\&quot;>\n<img class=\&quot;avatar\&quot; src=\&quot;http://pic4.zhimg.com/37f0ed517_is.jpg\&quot;>\n<span class=\&quot;author\&quot;>望月，</span><span class=\&quot;bio\&quot;>微信公众号 wangyueblogging</span>\n</div>\n\n<div class=\&quot;content\&quot;>\n<p>在我看来，微信搜索的目的并不是取代百度搜狗，也不是想再造一个 soso，而是一种移动搜索的全新探索，在我看来，可以有三个方向。</p>\r\n<p>1.搜索即服务</p>\r\n<p>韩国信息应用 KakaoTalk 推出的 #Search 值得借鉴。借助这个#Search 功能，只需要在聊天框中输入#号，文本框就会瞬间变成搜索框，然后用户可以像在搜索引擎里一样自由检索，还可以将搜索结果分享给朋友，整个过程无需离开聊天对话框。</p>\r\n<p>这种完全开放的搜索方式估计不会微信不会接受，但可以借鉴的是#tag 这种方式。</p>\r\n<p>现在微信内置了很多服务，比如京东、滴滴、摩拜单车、美团和 58 到家等，但这些入口都比较深，如果在微信搜索中加上 #京东 就可以直接进入到京东的商品页面，那就是我们常说的移动搜索的趋势&amp;mdash;&amp;mdash;搜索即服务。</p>\r\n<p><img class=\&quot;content-image\&quot; src=\&quot;http://pic3.zhimg.com/70/v2-50c9266cde7e751ececc8620efb2fee6_b.jpg\&quot; alt=\&quot;\&quot; /></p>\r\n<p>微信搜索现在的&amp;ldquo;小说&amp;rdquo;搜索功能，搜索结果可以直接在微信读书中打开阅读，就隐隐有这种搜索即服务的味道。</p>\r\n<p>在这里，我们搜索的不仅是信息，还是直接获取服务。</p>\r\n<p>2.搜索即场景</p>\r\n<p>正常使用过 Google Now 的朋友应该知道，这个功能已经突破了我们现有的搜索的概念。</p>\r\n<p>比如，早上的时候，Google Now 会自动显示从家到公司的驾车或公交路线，根据路况计算堵车和行驶时间；外出旅游时，Google Now 会自动推送附近的景点资料和摄影角度、位置。</p>\r\n<p>在这里，我们搜索的不仅是信息，还是应用场景。</p>\r\n<p>在线上流量红利基本结束的情况下，大家把目光都瞄准了线下场景，这也是微信最近狂推小程序的原因。据说马上小程序就要推出&amp;ldquo;附近的小程序&amp;rdquo;功能了，入口设在哪里？显然是微信搜索比较合适。</p>\r\n<p>我判断，未来基于关键词甚至语音的搜索比例会下降，而基于位置和某些特定场景的搜索比例将会大幅增高，未来占据统治性的搜索操作是扫一扫，扫二维码是第一步，下一步是直接扫实物、扫描场景，也就是说，未来移动搜索可能成为从场景到场景的连接器。</p>\r\n<p>3.搜索之搜索</p>\r\n<p>近期发现 Google 的一个搜索功能，就是可以在搜索结果中再进行一次搜索。比如我搜索 500px，在搜索结果 500px 的官网中还会出现一个搜索框，可以直接在这个页面搜索<a href=\&quot;http://500px.com\&quot;>http://500px.com</a> 站内的内容。</p>\r\n<p><img class=\&quot;content-image\&quot; src=\&quot;http://pic1.zhimg.com/70/v2-11a86527289448599984cb187234c530_b.jpg\&quot; alt=\&quot;\&quot; /></p>\r\n<p>试想一下，如果在微信搜索&amp;ldquo;望月的博客&amp;rdquo;，继而可以直接搜索我这个号内的文章，那是多么一件美妙的事情。</p>\r\n<p>推而广之，如果可以在搜索中直接操作服务号、小程序甚至是 APP，将是怎样一番景象。</p>\n</div>\n</div>\n\n\n<div class=\&quot;view-more\&quot;><a href=\&quot;http://www.zhihu.com/question/58981321\&quot;>查看知乎讨论<span class=\&quot;js-question-holder\&quot;></span></a></div>\n\n</div>\n\n\n</div>\n</div>&quot;,
        &quot;image_source&quot;: &quot;Yestone.com 版权图片库&quot;,
        &quot;title&quot;: &quot;微信也要做搜索，仔细想想有点可怕&quot;,
        &quot;image&quot;: &quot;https://pic1.zhimg.com/v2-b33f30ab4af4e8339465fba5d077b5a8.jpg&quot;,
        &quot;share_url&quot;: &quot;http://daily.zhihu.com/story/9386190&quot;,
        &quot;js&quot;: [],
        &quot;ga_prefix&quot;: &quot;042807&quot;,
        &quot;images&quot;: [
            &quot;https://pic2.zhimg.com/v2-0296877f8f0e3d3d1ffd1e51dc35d909.jpg&quot;
        ],
        &quot;type&quot;: 0,
        &quot;id&quot;: 9386190,
        &quot;css&quot;: [
            &quot;http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3&quot;
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>{
    "CONTENTS": {
        "body": "&lt;div class=<span class="hljs-symbol">\"</span>main-wrap content-wrap<span class="hljs-symbol">\"</span>&gt;<span class="hljs-symbol">\n</span>&lt;div class=<span class="hljs-symbol">\"</span>headline<span class="hljs-symbol">\"</span>&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;div class=<span class="hljs-symbol">\"</span>img-place-holder<span class="hljs-symbol">\"</span>&gt;&lt;/div&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;/div&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;div class=<span class="hljs-symbol">\"</span>content-inner<span class="hljs-symbol">\"</span>&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;div class=<span class="hljs-symbol">\"</span>question<span class="hljs-symbol">\"</span>&gt;<span class="hljs-symbol">\n</span>&lt;h2 class=<span class="hljs-symbol">\"</span>question-title<span class="hljs-symbol">\"</span>&gt;微信成立搜索应用部，微信的搜索有哪些想象空间？&lt;/h2&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;div class=<span class="hljs-symbol">\"</span>answer<span class="hljs-symbol">\"</span>&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;div class=<span class="hljs-symbol">\"</span>meta<span class="hljs-symbol">\"</span>&gt;<span class="hljs-symbol">\n</span>&lt;img class=<span class="hljs-symbol">\"</span>avatar<span class="hljs-symbol">\"</span> src=<span class="hljs-symbol">\"</span>http://pic1.zhimg.com/e6de3ae3225bdf1adeca084de9813c7c_is.jpg<span class="hljs-symbol">\"</span>&gt;<span class="hljs-symbol">\n</span>&lt;span class=<span class="hljs-symbol">\"</span>author<span class="hljs-symbol">\"</span>&gt;潘一鸣，&lt;/span&gt;&lt;span class=<span class="hljs-symbol">\"</span>bio<span class="hljs-symbol">\"</span>&gt;PM/THU&lt;/span&gt;<span class="hljs-symbol">\n</span>&lt;/div&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;div class=<span class="hljs-symbol">\"</span>content<span class="hljs-symbol">\"</span>&gt;<span class="hljs-symbol">\n</span>&lt;p&gt;&lt;strong&gt;微信做搜索，是自然而言的事情。&lt;/strong&gt;&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;&lt;strong&gt;1. 搜索，本就是流量利用效率最高的功能。&lt;/strong&gt;&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;PC 时代，所有网民都用百度，而移动时代，所有网民都有微信。这两年来，微信一直是互联网的流量黑洞。不管什么社交 APP，最终人和人认识了，就会加个微信。不管什么自媒体平台，写文章的人，总是时不时挂一个公众号的二维码。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;人们不再发短信，而是发微信。手机通讯录很久不再更新，微信联系人却越来越多。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;从社交，到内容消费，到支付，再到现在的小程序。微信承载的功能越来越多。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;14 年校招，被搜狗面试的时候，有一道题，问&amp;ldquo;你觉得移动端的浏览器未来是什么样子&amp;rdquo;，我记得我当时给出主要论点就是移动端最强大的浏览器未来就是微信。现在看来确实是这样，两年前盛行的&amp;ldquo;APP 已死，浏览器永生&amp;rdquo;的论调，也未尝不对，只是浏览器变成了微信。百度当初的直达号战略确实是一个方向，只不过，可能搜索框会放到微信里。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;我们的电脑里目前还保存的应用无非是两种，一种是工具类，用于工作娱乐，一种是游戏。大部分上网的功能，都在浏览器中完成。未来我们手机里大概也只会有两类应用，一类是工具类，一类是游戏类，而大部分其他场景功能，可能都在微信中完成。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;低频应用最终变成高频应用的功能点，这样例子，在互联网中不胜枚举。而所有 APP 之上确实有个最高频的微信。这一两年比较优秀的电商创业公司，基本上都是以微信为依托，甚至先有微信服务号，微信 H5，然后才有 APP 承接用户。包括拼多多，也包括每日优鲜。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;小程序不断在开放新的第三方功能，微信承接低频应用的步伐也在加快。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;&lt;strong&gt;一方面大量的用户和关系链进入微信，一方面大量的自媒体内容沉淀在微信，一方面大量的低频场景接入微信。而如何将这些要匹配在一起，搜索，无疑是最佳的选择。&lt;/strong&gt;&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;&lt;strong&gt;2. 微信的搜索会是什么样？&lt;/strong&gt;&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;首先是一个问题：搜索质量的核心是什么？&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;算法？计算能力？&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;算法现在都是机器学习那一套，卓越虽然难以企及，但优秀对于腾讯这样的公司却并不难。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;计算能力，其实是拼钱，腾讯最不缺这个。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;&lt;strong&gt;其实搜索质量的核心，是数据。&lt;/strong&gt;&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;搜索引擎一开始是算法根据 TF-IDF 等规则进行排序；后来算法参考用户在搜索结果中的点击行为，把点击率高的内容往前提，这是一个比较重大的进步，系统有了自反馈；再后来，算法开始加入了用户行为数据进行个性化排序。正是数据，在一步一步推进搜索引擎的进步，从第一代规则，到第二代自反馈，到第三代的个性化。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;百度无疑是第二代搜索引擎的霸主，对于后来者而言，想取代百度，迈不过去的坎儿，就是百度积累的大量用户搜索引擎使用数据。但是在第三代个性化排序的时候，百度账号体系弱，个性化数据收集比较有限。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;而微信所拥有的数据，也决定了微信可能会带给我们，比个性化搜索更强大的搜索方式。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;腾讯拥有用户互联网大部分的行为数据。文章，音乐，视频，支付，游戏，如此海量的多维度数据，百度和阿里也无法企及。而直接结果是，腾讯的系统里，用户特征和用户画像将更为准确。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;除此之外，更重要的是，腾讯有互联网用户的关系链。你和谁是好友，深夜的时候最喜欢和谁聊天，最喜欢给谁点赞，最喜欢看谁的朋友圈。如果有人能了解你所有的微信中的社交关系链，那这个人能够怎么了解你，微信搜索就能怎么了解你。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;当大量的社交数据被用于机器学习的时候，你的搜索会变得怎样的智能？&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;这个想象空间太大了，微信搜索将更比所有的互联网产品都更懂你，而关于这部分的探索，Facebook 所做的 edgerank 也只是一个开始。随着算法的发展，计算能力的指数爆发，拥有用户，内容，数据的微信搜索，会成为什么样。这绝不是我们现在能够预测到的事情。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;至于微信搜索会不会去索引全部的网页，答案应该是不会，没必要。充斥着色情暴力诈骗的网页，风险不可控，对于绝对优势的微信而言，显然不值得尝试。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;&lt;strong&gt;3. 小总结&lt;/strong&gt;&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;&lt;strong&gt;微信为什么要做搜索？&lt;/strong&gt;&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;海量用户，海量内容，海量场景需要功能连接在一起。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;&lt;strong&gt;微信搜索有什么优势？&lt;/strong&gt;&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;全网用户数据，用户关系链和社交数据。而数据是搜索质量的核心。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;&lt;strong&gt;微信搜索将来发展如何？&lt;/strong&gt;&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;微信的数据量决定比目前的个性化搜索更进一步，而这样的数据量能产生多大的进步，目前并没有什么先例可供参考。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;&lt;strong&gt;微信搜索是否会索引全部网页？&lt;/strong&gt;&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;应该不会，网页太多不可控的风险，对于绝对优势的微信，没有必要去索引全部网页内容。&lt;/p&gt;<span class="hljs-symbol">\n</span>&lt;/div&gt;<span class="hljs-symbol">\n</span>&lt;/div&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;div class=<span class="hljs-symbol">\"</span>answer<span class="hljs-symbol">\"</span>&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;div class=<span class="hljs-symbol">\"</span>meta<span class="hljs-symbol">\"</span>&gt;<span class="hljs-symbol">\n</span>&lt;img class=<span class="hljs-symbol">\"</span>avatar<span class="hljs-symbol">\"</span> src=<span class="hljs-symbol">\"</span>http://pic4.zhimg.com/37f0ed517_is.jpg<span class="hljs-symbol">\"</span>&gt;<span class="hljs-symbol">\n</span>&lt;span class=<span class="hljs-symbol">\"</span>author<span class="hljs-symbol">\"</span>&gt;望月，&lt;/span&gt;&lt;span class=<span class="hljs-symbol">\"</span>bio<span class="hljs-symbol">\"</span>&gt;微信公众号 wangyueblogging&lt;/span&gt;<span class="hljs-symbol">\n</span>&lt;/div&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;div class=<span class="hljs-symbol">\"</span>content<span class="hljs-symbol">\"</span>&gt;<span class="hljs-symbol">\n</span>&lt;p&gt;在我看来，微信搜索的目的并不是取代百度搜狗，也不是想再造一个 soso，而是一种移动搜索的全新探索，在我看来，可以有三个方向。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;1.搜索即服务&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;韩国信息应用 KakaoTalk 推出的 #Search 值得借鉴。借助这个#Search 功能，只需要在聊天框中输入#号，文本框就会瞬间变成搜索框，然后用户可以像在搜索引擎里一样自由检索，还可以将搜索结果分享给朋友，整个过程无需离开聊天对话框。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;这种完全开放的搜索方式估计不会微信不会接受，但可以借鉴的是#tag 这种方式。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;现在微信内置了很多服务，比如京东、滴滴、摩拜单车、美团和 58 到家等，但这些入口都比较深，如果在微信搜索中加上 #京东 就可以直接进入到京东的商品页面，那就是我们常说的移动搜索的趋势&amp;mdash;&amp;mdash;搜索即服务。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;&lt;img class=<span class="hljs-symbol">\"</span>content-image<span class="hljs-symbol">\"</span> src=<span class="hljs-symbol">\"</span>http://pic3.zhimg.com/70/v2-50c9266cde7e751ececc8620efb2fee6_b.jpg<span class="hljs-symbol">\"</span> alt=<span class="hljs-symbol">\"</span><span class="hljs-symbol">\"</span> /&gt;&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;微信搜索现在的&amp;ldquo;小说&amp;rdquo;搜索功能，搜索结果可以直接在微信读书中打开阅读，就隐隐有这种搜索即服务的味道。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;在这里，我们搜索的不仅是信息，还是直接获取服务。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;2.搜索即场景&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;正常使用过 Google Now 的朋友应该知道，这个功能已经突破了我们现有的搜索的概念。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;比如，早上的时候，Google Now 会自动显示从家到公司的驾车或公交路线，根据路况计算堵车和行驶时间；外出旅游时，Google Now 会自动推送附近的景点资料和摄影角度、位置。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;在这里，我们搜索的不仅是信息，还是应用场景。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;在线上流量红利基本结束的情况下，大家把目光都瞄准了线下场景，这也是微信最近狂推小程序的原因。据说马上小程序就要推出&amp;ldquo;附近的小程序&amp;rdquo;功能了，入口设在哪里？显然是微信搜索比较合适。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;我判断，未来基于关键词甚至语音的搜索比例会下降，而基于位置和某些特定场景的搜索比例将会大幅增高，未来占据统治性的搜索操作是扫一扫，扫二维码是第一步，下一步是直接扫实物、扫描场景，也就是说，未来移动搜索可能成为从场景到场景的连接器。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;3.搜索之搜索&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;近期发现 Google 的一个搜索功能，就是可以在搜索结果中再进行一次搜索。比如我搜索 500px，在搜索结果 500px 的官网中还会出现一个搜索框，可以直接在这个页面搜索&lt;a href=<span class="hljs-symbol">\"</span>http://500px.com<span class="hljs-symbol">\"</span>&gt;http://500px.com&lt;/a&gt; 站内的内容。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;&lt;img class=<span class="hljs-symbol">\"</span>content-image<span class="hljs-symbol">\"</span> src=<span class="hljs-symbol">\"</span>http://pic1.zhimg.com/70/v2-11a86527289448599984cb187234c530_b.jpg<span class="hljs-symbol">\"</span> alt=<span class="hljs-symbol">\"</span><span class="hljs-symbol">\"</span> /&gt;&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;试想一下，如果在微信搜索&amp;ldquo;望月的博客&amp;rdquo;，继而可以直接搜索我这个号内的文章，那是多么一件美妙的事情。&lt;/p&gt;<span class="hljs-symbol">\r</span><span class="hljs-symbol">\n</span>&lt;p&gt;推而广之，如果可以在搜索中直接操作服务号、小程序甚至是 APP，将是怎样一番景象。&lt;/p&gt;<span class="hljs-symbol">\n</span>&lt;/div&gt;<span class="hljs-symbol">\n</span>&lt;/div&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;div class=<span class="hljs-symbol">\"</span>view-more<span class="hljs-symbol">\"</span>&gt;&lt;a href=<span class="hljs-symbol">\"</span>http://www.zhihu.com/question/58981321<span class="hljs-symbol">\"</span>&gt;查看知乎讨论&lt;span class=<span class="hljs-symbol">\"</span>js-question-holder<span class="hljs-symbol">\"</span>&gt;&lt;/span&gt;&lt;/a&gt;&lt;/div&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;/div&gt;<span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span><span class="hljs-symbol">\n</span>&lt;/div&gt;<span class="hljs-symbol">\n</span>&lt;/div&gt;",
        "image_source": "Yestone.com 版权图片库",
        "title": "微信也要做搜索，仔细想想有点可怕",
        "image": "https://pic1.zhimg.com/v2-b33f30ab4af4e8339465fba5d077b5a8.jpg",
        "share_url": "http://daily.zhihu.com/story/9386190",
        "js": [],
        "ga_prefix": "042807",
        "images": [
            "https://pic2.zhimg.com/v2-0296877f8f0e3d3d1ffd1e51dc35d909.jpg"
        ],
        "type": 0,
        "id": 9386190,
        "css": [
            "http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3"
        ]
    }
}</code></pre>
<h5>返回数据说明</h5>
<ul>
<li><p>body: HTML式的文章内容</p></li>
<li><p>image-source: 图片的内容提供方。为了避免被起诉非法使用图片，在显示图片时最好附上其版权信息。</p></li>
<li><p>title: 文章标题</p></li>
<li><p>image: 文章配图（大图）。</p></li>
<li><p>js: 供手机端 WebView 使用</p></li>
<li><p>recommenders: 这篇文章的推荐者</p></li>
<li><p>ga_prefix: 供 Google Analytics 使用</p></li>
<li><p>type: 文章的类型</p></li>
<li><p>id: 文章唯一id</p></li>
<li><p>css: 供手机端 WebView 使用</p></li>
</ul>
<h4>获取过往消息：</h4>
<h5>接口地址</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/before-stories/:date
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>https:<span class="hljs-regexp">//</span>zhihu-daily.leanapp.cn<span class="hljs-regexp">/api/</span>v1<span class="hljs-regexp">/before-stories/</span>:date
</code></pre>
<h5>调用示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/before-stories/20170429
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>https:<span class="hljs-regexp">//</span>zhihu-daily.leanapp.cn<span class="hljs-regexp">/api/</span>v1<span class="hljs-regexp">/before-stories/</span><span class="hljs-number">20170429</span>
</code></pre>
<h5>返回数据示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;STORIES&quot;: {
        &quot;date&quot;: &quot;20170428&quot;,
        &quot;stories&quot;: [
            {
                &quot;images&quot;: [
                    &quot;https://pic2.zhimg.com/v2-52a5b5a8df4be8de1afebb7b6df800d1.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388291,
                &quot;ga_prefix&quot;: &quot;042822&quot;,
                &quot;title&quot;: &quot;小事 · 小波澜&quot;
            },
            {
                &quot;title&quot;: &quot;第一次去女朋友家做客，差点把命丢了&quot;,
                &quot;ga_prefix&quot;: &quot;042821&quot;,
                &quot;images&quot;: [
                    &quot;https://pic4.zhimg.com/v2-044ce448f2ac3b720dcae10b83cce66f.jpg&quot;
                ],
                &quot;multipic&quot;: true,
                &quot;type&quot;: 0,
                &quot;id&quot;: 9387754
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic2.zhimg.com/v2-64bd6d5ad2dc64b1e0897119128d8371.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388497,
                &quot;ga_prefix&quot;: &quot;042820&quot;,
                &quot;title&quot;: &quot;- 什么是「会呼吸的痛」？\r\n- 跑步岔气&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic2.zhimg.com/v2-f6f31da35e3f4f200b7e5417020648e5.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9373977,
                &quot;ga_prefix&quot;: &quot;042820&quot;,
                &quot;title&quot;: &quot;五一出去玩最悲伤的事：没有找到好吃的……&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic4.zhimg.com/v2-70ddc3b7e901b28275efa67b9ca6e00f.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388157,
                &quot;ga_prefix&quot;: &quot;042819&quot;,
                &quot;title&quot;: &quot;塞尔达系列中最好的三部，只有很少的中国玩家玩过&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic4.zhimg.com/v2-5b4a964c992a6227d9f77e30ccf54e43.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388174,
                &quot;ga_prefix&quot;: &quot;042818&quot;,
                &quot;title&quot;: &quot;吃药病会好，硬熬过去病也能好，所以哪个对身体更好？&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic1.zhimg.com/v2-64ca6cdd2762a0955238e2621ea46098.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388165,
                &quot;ga_prefix&quot;: &quot;042817&quot;,
                &quot;title&quot;: &quot;我跟男朋友的星座不合，到底还要不要在一起？&quot;
            },
            {
                &quot;title&quot;: &quot;她赤裸地躺在卧室里，仆人慌忙为她寻找衣物&quot;,
                &quot;ga_prefix&quot;: &quot;042816&quot;,
                &quot;images&quot;: [
                    &quot;https://pic4.zhimg.com/v2-a8f1e46982ef08a686e52bc2d8050b3f.jpg&quot;
                ],
                &quot;multipic&quot;: true,
                &quot;type&quot;: 0,
                &quot;id&quot;: 9387794
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic1.zhimg.com/v2-9714a2d405cfaecac5b1ed97ed4013c4.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9388099,
                &quot;ga_prefix&quot;: &quot;042814&quot;,
                &quot;title&quot;: &quot;「五一」小长假，我猜这些地方会很堵，比如周杰伦演唱会门口&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic2.zhimg.com/v2-16b8ece0b785111d16653cda1b7011c5.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9387971,
                &quot;ga_prefix&quot;: &quot;042813&quot;,
                &quot;title&quot;: &quot;是，我们每个月交的社保是一个亏本买卖&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic4.zhimg.com/v2-f39b58bb8cbbbe4772221a07be396a4b.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9387644,
                &quot;ga_prefix&quot;: &quot;042812&quot;,
                &quot;title&quot;: &quot;雷军说的「毛利率高是一条不归路」是什么意思？&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic3.zhimg.com/v2-9ae58932c59b551ceae023e5b37d4aa2.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9384310,
                &quot;ga_prefix&quot;: &quot;042812&quot;,
                &quot;title&quot;: &quot;大误 · 东游传&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic3.zhimg.com/v2-46a6e748a2be60ee6ac6a457595ee126.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9387096,
                &quot;ga_prefix&quot;: &quot;042811&quot;,
                &quot;title&quot;: &quot;偶尔才听说，从来没用过，国产 CPU 和操作系统发展得好吗？&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic2.zhimg.com/v2-b0cd96880fe3694571c307bc32eddfcd.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9386898,
                &quot;ga_prefix&quot;: &quot;042809&quot;,
                &quot;title&quot;: &quot;注水肉又来了，教你 3 招简单辨别&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic3.zhimg.com/v2-23561f931106b6640bad1bee4a78f95a.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9385695,
                &quot;ga_prefix&quot;: &quot;042808&quot;,
                &quot;title&quot;: &quot;法律说「不得以营利为目的使用公民肖像权」，难道不营利的话就可以？&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic3.zhimg.com/v2-e2521a314332140d1c919228c39ce70a.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9384950,
                &quot;ga_prefix&quot;: &quot;042807&quot;,
                &quot;title&quot;: &quot;吃了「假的」铁，膳食中的铁元素的含量再足够也没用&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic2.zhimg.com/v2-0296877f8f0e3d3d1ffd1e51dc35d909.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9386190,
                &quot;ga_prefix&quot;: &quot;042807&quot;,
                &quot;title&quot;: &quot;微信也要做搜索，仔细想想有点可怕&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic3.zhimg.com/v2-794bdaff92d3a751f014119a2e164f5e.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9385871,
                &quot;ga_prefix&quot;: &quot;042807&quot;,
                &quot;title&quot;: &quot;「鸟巢要开富民大会，来了就能领 5 万」，这骗局全是套路&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;https://pic2.zhimg.com/v2-3245f9cf1b797056db48741a6a82058d.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 9385511,
                &quot;ga_prefix&quot;: &quot;042806&quot;,
                &quot;title&quot;: &quot;瞎扯 · 如何正确地吐槽&quot;
            }
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"STORIES"</span>: {
        <span class="hljs-attr">"date"</span>: <span class="hljs-string">"20170428"</span>,
        <span class="hljs-attr">"stories"</span>: [
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic2.zhimg.com/v2-52a5b5a8df4be8de1afebb7b6df800d1.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388291</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042822"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"小事 · 小波澜"</span>
            },
            {
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"第一次去女朋友家做客，差点把命丢了"</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042821"</span>,
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic4.zhimg.com/v2-044ce448f2ac3b720dcae10b83cce66f.jpg"</span>
                ],
                <span class="hljs-attr">"multipic"</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9387754</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic2.zhimg.com/v2-64bd6d5ad2dc64b1e0897119128d8371.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388497</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042820"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"- 什么是「会呼吸的痛」？\r\n- 跑步岔气"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic2.zhimg.com/v2-f6f31da35e3f4f200b7e5417020648e5.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9373977</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042820"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"五一出去玩最悲伤的事：没有找到好吃的……"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic4.zhimg.com/v2-70ddc3b7e901b28275efa67b9ca6e00f.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388157</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042819"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"塞尔达系列中最好的三部，只有很少的中国玩家玩过"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic4.zhimg.com/v2-5b4a964c992a6227d9f77e30ccf54e43.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388174</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042818"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"吃药病会好，硬熬过去病也能好，所以哪个对身体更好？"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic1.zhimg.com/v2-64ca6cdd2762a0955238e2621ea46098.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388165</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042817"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"我跟男朋友的星座不合，到底还要不要在一起？"</span>
            },
            {
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"她赤裸地躺在卧室里，仆人慌忙为她寻找衣物"</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042816"</span>,
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic4.zhimg.com/v2-a8f1e46982ef08a686e52bc2d8050b3f.jpg"</span>
                ],
                <span class="hljs-attr">"multipic"</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9387794</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic1.zhimg.com/v2-9714a2d405cfaecac5b1ed97ed4013c4.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9388099</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042814"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"「五一」小长假，我猜这些地方会很堵，比如周杰伦演唱会门口"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic2.zhimg.com/v2-16b8ece0b785111d16653cda1b7011c5.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9387971</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042813"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"是，我们每个月交的社保是一个亏本买卖"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic4.zhimg.com/v2-f39b58bb8cbbbe4772221a07be396a4b.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9387644</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042812"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"雷军说的「毛利率高是一条不归路」是什么意思？"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic3.zhimg.com/v2-9ae58932c59b551ceae023e5b37d4aa2.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9384310</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042812"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"大误 · 东游传"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic3.zhimg.com/v2-46a6e748a2be60ee6ac6a457595ee126.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9387096</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042811"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"偶尔才听说，从来没用过，国产 CPU 和操作系统发展得好吗？"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic2.zhimg.com/v2-b0cd96880fe3694571c307bc32eddfcd.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9386898</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042809"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"注水肉又来了，教你 3 招简单辨别"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic3.zhimg.com/v2-23561f931106b6640bad1bee4a78f95a.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9385695</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042808"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"法律说「不得以营利为目的使用公民肖像权」，难道不营利的话就可以？"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic3.zhimg.com/v2-e2521a314332140d1c919228c39ce70a.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9384950</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042807"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"吃了「假的」铁，膳食中的铁元素的含量再足够也没用"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic2.zhimg.com/v2-0296877f8f0e3d3d1ffd1e51dc35d909.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9386190</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042807"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"微信也要做搜索，仔细想想有点可怕"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic3.zhimg.com/v2-794bdaff92d3a751f014119a2e164f5e.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9385871</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042807"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"「鸟巢要开富民大会，来了就能领 5 万」，这骗局全是套路"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"https://pic2.zhimg.com/v2-3245f9cf1b797056db48741a6a82058d.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9385511</span>,
                <span class="hljs-attr">"ga_prefix"</span>: <span class="hljs-string">"042806"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"瞎扯 · 如何正确地吐槽"</span>
            }
        ]
    }
}</code></pre>
<h5>返回数据说明</h5>
<ul>
<li><p>date: 日期</p></li>
<li><p>stories: 当日日报</p></li>
<li><p>title: 日报标题</p></li>
<li><p>images: 文章配图（小图）</p></li>
<li><p>ga_prefix: 供 Google Analytics 使用</p></li>
<li><p>type: 作用未知</p></li>
<li><p>id: 文章唯一id</p></li>
<li><p>multipic: 消息是否包含多张图片（仅出现在包含多图的新闻中）</p></li>
</ul>
<h5>注意</h5>
<p>若果需要查询 4 月 28 日的消息，before后的数字应为20170429<br>知乎日报的生日为 2013 年 5 月 19 日，若before后数字小于20130520，只会接收到空消息<br>输入今日之后的日期将仍然获得今日内容，但是JSON格式将会改变</p>
<h4>获取文章额外信息：</h4>
<h5>接口地址</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/contents/extra/:id
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/zhihu-daily.leanapp.cn/api</span><span class="hljs-regexp">/v1/contents</span><span class="hljs-regexp">/extra/</span><span class="hljs-symbol">:id</span>
</code></pre>
<h5>调用示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/contents/extra/3942319
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code><span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/zhihu-daily.leanapp.cn/api</span><span class="hljs-regexp">/v1/contents</span><span class="hljs-regexp">/extra/</span><span class="hljs-number">3942319</span>
</code></pre>
<h5>返回数据示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;DES&quot;: {
        &quot;long_comments&quot;: 5,
        &quot;popularity&quot;: 8,
        &quot;short_comments&quot;: 49,
        &quot;comments&quot;: 54
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"DES"</span>: {
        <span class="hljs-attr">"long_comments"</span>: <span class="hljs-number">5</span>,
        <span class="hljs-attr">"popularity"</span>: <span class="hljs-number">8</span>,
        <span class="hljs-attr">"short_comments"</span>: <span class="hljs-number">49</span>,
        <span class="hljs-attr">"comments"</span>: <span class="hljs-number">54</span>
    }
}</code></pre>
<h5>返回数据说明</h5>
<ul>
<li><p>long_comments: 长评论总数</p></li>
<li><p>popularity: 点赞总数</p></li>
<li><p>short_comments: 短评论总数</p></li>
<li><p>comments: 评论总数</p></li>
</ul>
<h4>获取文章较长评论：</h4>
<h5>接口地址</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/contents/#{id}/long-comments
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>https:<span class="hljs-regexp">//</span>zhihu-daily.leanapp.cn<span class="hljs-regexp">/api/</span>v1<span class="hljs-regexp">/contents/</span><span class="hljs-comment">#{id}/long-comments</span>
</code></pre>
<h5>调用示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/contents/3942319/long-comments
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code><span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/zhihu-daily.leanapp.cn/api</span><span class="hljs-regexp">/v1/contents</span><span class="hljs-regexp">/3942319/long</span>-comments
</code></pre>
<h5>返回数据示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;COMMENTS&quot;: {
        &quot;comments&quot;: [
            {
                &quot;author&quot;: &quot;Tylov_ohno&quot;,
                &quot;content&quot;: &quot;吃货、虎牙、女王、瘫瘫、天气、果子、白菜、撒西、咪、主力奶、02、易哭马、迷路姬、二货彩、小贝、小樱花、煤炉、大帅、小帅、爱糖、持枪、拳王、鳗鱼、树杈、肉山大魔王、盐神、大饼子、太孙、托姆、白胖、大蛇丸、大头、喂鸡..........表示赞。&quot;,
                &quot;avatar&quot;: &quot;http://pic3.zhimg.com/01d9e29ae_im.jpg&quot;,
                &quot;time&quot;: 1401477748,
                &quot;id&quot;: 315711,
                &quot;likes&quot;: 1
            },
            {
                &quot;author&quot;: &quot;Z_C_大学狗&quot;,
                &quot;content&quot;: &quot;为什么感觉这些名字如此清新？不知道有没有会回答一下 果婊 婆崎 麦婊 懒妮 霉霉 丁日 这一类每天在微博刷屏的名字，这才是爱称，名字越贱，红得越长，这就是我们这些粉丝的小心愿。\n\n\n我来猜猜 第一个是水果姐 第二个是钱婆 第三个是麦大锤 第四个是小甜甜 第五个是公交车 第六个是小jb\n\n\n\n除了婆崎其它都对，婆崎是日本的滨崎步&quot;,
                &quot;avatar&quot;: &quot;http://pic1.zhimg.com/cea365438_im.jpg&quot;,
                &quot;time&quot;: 1401384835,
                &quot;id&quot;: 314679,
                &quot;likes&quot;: 6
            },
            {
                &quot;author&quot;: &quot;宋卓远zhorro&quot;,
                &quot;content&quot;: &quot;蜗壳、家嫂、忠诚、酱油、腮帮、萌波、包皮、硬特、C多、囧囧森、呆子、秃子、跑跑、泡椒、赫敏、希币、西布、阿杜……煤球、普姨、布教授、小白、三票、水哥、天使、魔笛、武僧、奉先、臀新、250、木鸟、爵爷……&quot;,
                &quot;avatar&quot;: &quot;http://pic1.zhimg.com/49ef4cc74_im.jpg&quot;,
                &quot;time&quot;: 1401378486,
                &quot;id&quot;: 314554,
                &quot;likes&quot;: 24
            },
            {
                &quot;author&quot;: &quot;肿痒朕治菊&quot;,
                &quot;content&quot;: &quot;为什么感觉这些名字如此清新？不知道有没有会回答一下 果婊 婆崎 麦婊 懒妮 霉霉 丁日 这一类每天在微博刷屏的名字，这才是爱称，名字越贱，红得越长，这就是我们这些粉丝的小心愿。\n\n\n我来猜猜 第一个是水果姐 第二个是钱婆 第三个是麦大锤 第四个是小甜甜 第五个是公交车 第六个是小jb&quot;,
                &quot;avatar&quot;: &quot;http://pic1.zhimg.com/a57d36674782e2d783bbe60cf1cf13c0_im.jpg&quot;,
                &quot;time&quot;: 1401377386,
                &quot;id&quot;: 314536,
                &quot;likes&quot;: 0
            },
            {
                &quot;author&quot;: &quot;NEO下载专用&quot;,
                &quot;content&quot;: &quot;这种绰号挺多的，感觉普通人没必要为了抖包袱而记忆。就像以前贴吧里流行的什么“年娇处”，“语死早”，似乎成了划定某个圈子的标志。\n虽然网络用语发展是一种趋势，但是太多属于某个小圈子的名词，还是给日常生活带来了一点不便…看贴时候还要搜索专有名词…&quot;,
                &quot;avatar&quot;: &quot;http://pic3.zhimg.com/01d9e29ae_im.jpg&quot;,
                &quot;time&quot;: 1401369982,
                &quot;id&quot;: 314356,
                &quot;likes&quot;: 11
            }
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"COMMENTS"</span>: {
        <span class="hljs-attr">"comments"</span>: [
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Tylov_ohno"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"吃货、虎牙、女王、瘫瘫、天气、果子、白菜、撒西、咪、主力奶、02、易哭马、迷路姬、二货彩、小贝、小樱花、煤炉、大帅、小帅、爱糖、持枪、拳王、鳗鱼、树杈、肉山大魔王、盐神、大饼子、太孙、托姆、白胖、大蛇丸、大头、喂鸡..........表示赞。"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic3.zhimg.com/01d9e29ae_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401477748</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315711</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">1</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Z_C_大学狗"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"为什么感觉这些名字如此清新？不知道有没有会回答一下 果婊 婆崎 麦婊 懒妮 霉霉 丁日 这一类每天在微博刷屏的名字，这才是爱称，名字越贱，红得越长，这就是我们这些粉丝的小心愿。\n\n\n我来猜猜 第一个是水果姐 第二个是钱婆 第三个是麦大锤 第四个是小甜甜 第五个是公交车 第六个是小jb\n\n\n\n除了婆崎其它都对，婆崎是日本的滨崎步"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic1.zhimg.com/cea365438_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401384835</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">314679</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">6</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"宋卓远zhorro"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"蜗壳、家嫂、忠诚、酱油、腮帮、萌波、包皮、硬特、C多、囧囧森、呆子、秃子、跑跑、泡椒、赫敏、希币、西布、阿杜……煤球、普姨、布教授、小白、三票、水哥、天使、魔笛、武僧、奉先、臀新、250、木鸟、爵爷……"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic1.zhimg.com/49ef4cc74_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401378486</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">314554</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">24</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"肿痒朕治菊"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"为什么感觉这些名字如此清新？不知道有没有会回答一下 果婊 婆崎 麦婊 懒妮 霉霉 丁日 这一类每天在微博刷屏的名字，这才是爱称，名字越贱，红得越长，这就是我们这些粉丝的小心愿。\n\n\n我来猜猜 第一个是水果姐 第二个是钱婆 第三个是麦大锤 第四个是小甜甜 第五个是公交车 第六个是小jb"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic1.zhimg.com/a57d36674782e2d783bbe60cf1cf13c0_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401377386</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">314536</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"NEO下载专用"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"这种绰号挺多的，感觉普通人没必要为了抖包袱而记忆。就像以前贴吧里流行的什么“年娇处”，“语死早”，似乎成了划定某个圈子的标志。\n虽然网络用语发展是一种趋势，但是太多属于某个小圈子的名词，还是给日常生活带来了一点不便…看贴时候还要搜索专有名词…"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic3.zhimg.com/01d9e29ae_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401369982</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">314356</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">11</span>
            }
        ]
    }
}</code></pre>
<h5>返回数据说明</h5>
<ul>
<li><p>comments: 长评论列表，形式为数组</p></li>
<li><p>author: 评论作者</p></li>
<li><p>id: 评论者的唯一标识符</p></li>
<li><p>content: 评论的内容</p></li>
<li><p>likes: 评论所获『赞』的数量</p></li>
<li><p>time: 评论时间</p></li>
<li><p>avatar: 用户头像图片的地址</p></li>
</ul>
<h4>获取文章较短评论：</h4>
<h5>接口地址</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/contents/#{id}/short-comments
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>https:<span class="hljs-regexp">//</span>zhihu-daily.leanapp.cn<span class="hljs-regexp">/api/</span>v1<span class="hljs-regexp">/contents/</span><span class="hljs-comment">#{id}/short-comments</span>
</code></pre>
<h5>调用示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/contents/3942319/short-comments
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code><span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/zhihu-daily.leanapp.cn/api</span><span class="hljs-regexp">/v1/contents</span><span class="hljs-regexp">/3942319/short</span>-comments
</code></pre>
<h5>返回数据示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;COMMENTS&quot;: {
        &quot;comments&quot;: [
            {
                &quot;author&quot;: &quot;LunaQ-&quot;,
                &quot;content&quot;: &quot;为什么我开起来就变成新毒霸网址了??&quot;,
                &quot;avatar&quot;: &quot;http://pic3.zhimg.com/445786476_im.jpg&quot;,
                &quot;time&quot;: 1402830238,
                &quot;id&quot;: 336776,
                &quot;likes&quot;: 0
            },
            {
                &quot;author&quot;: &quot;加一&quot;,
                &quot;content&quot;: &quot;兰兰 苍老师&quot;,
                &quot;avatar&quot;: &quot;http://pic1.zhimg.com/7bde31faacc3166ead9bd17ec18659d0_im.jpg&quot;,
                &quot;time&quot;: 1401718799,
                &quot;id&quot;: 319059,
                &quot;likes&quot;: 0
            },
            {
                &quot;author&quot;: &quot;geminisun83&quot;,
                &quot;content&quot;: &quot;只能看到一张图，无法拖动，日报更新以后难用了&quot;,
                &quot;avatar&quot;: &quot;http://pic3.zhimg.com/01d9e29ae_im.jpg&quot;,
                &quot;time&quot;: 1401676872,
                &quot;id&quot;: 318255,
                &quot;likes&quot;: 0
            },
            {
                &quot;author&quot;: &quot;骑车的小胖&quot;,
                &quot;content&quot;: &quot;妈的不能点开啊&quot;,
                &quot;avatar&quot;: &quot;http://pic4.zhimg.com/8e8c9610f_im.jpg&quot;,
                &quot;time&quot;: 1401585421,
                &quot;id&quot;: 316880,
                &quot;likes&quot;: 1
            },
            {
                &quot;author&quot;: &quot;Ryanne&quot;,
                &quot;content&quot;: &quot;郭紫丽，龚娇梅，康敏苏?&quot;,
                &quot;avatar&quot;: &quot;http://pic4.zhimg.com/bed9045c29d36181629d6a4884aa5003_im.jpg&quot;,
                &quot;time&quot;: 1401535356,
                &quot;id&quot;: 316375,
                &quot;likes&quot;: 0
            },
            {
                &quot;author&quot;: &quot;放洋宝宝_小知洋&quot;,
                &quot;content&quot;: &quot;纯粹为了一美过来留言~&quot;,
                &quot;avatar&quot;: &quot;http://pic3.zhimg.com/853e6fee6_im.jpg&quot;,
                &quot;time&quot;: 1401531916,
                &quot;id&quot;: 316309,
                &quot;likes&quot;: 2
            },
            {
                &quot;author&quot;: &quot;xuqingsongjn&quot;,
                &quot;content&quot;: &quot;汤姆哈迪在兄弟连里头发就是干的啊&quot;,
                &quot;avatar&quot;: &quot;http://pic1.zhimg.com/ce907db20_im.jpg&quot;,
                &quot;time&quot;: 1401522326,
                &quot;id&quot;: 316122,
                &quot;likes&quot;: 0
            },
            {
                &quot;author&quot;: &quot;波波砾&quot;,
                &quot;content&quot;: &quot;缺爷和潮爷是要放在一起看的～“又见灰毛衣，又见闪闪鞋，又见歪领带…”的缺爷更衬托出“一表人才”的潮爷，哈哈哈（但是缺还是我唯一的心头爱，哈哈）&quot;,
                &quot;avatar&quot;: &quot;http://pic2.zhimg.com/3f9dae8fd_im.jpg&quot;,
                &quot;time&quot;: 1401502226,
                &quot;id&quot;: 315893,
                &quot;likes&quot;: 1
            },
            {
                &quot;author&quot;: &quot;没尾巴狼&quot;,
                &quot;content&quot;: &quot;欧美圈自己圈地玩儿就行了，真心不需要科普，尤其是CP科普&quot;,
                &quot;avatar&quot;: &quot;http://pic4.zhimg.com/e732f2e43_im.jpg&quot;,
                &quot;time&quot;: 1401501162,
                &quot;id&quot;: 315873,
                &quot;likes&quot;: 4
            },
            {
                &quot;author&quot;: &quot;喵喵&quot;,
                &quot;content&quot;: &quot;花生不是华生的谐音么……&quot;,
                &quot;avatar&quot;: &quot;http://pic1.zhimg.com/12537e198_im.jpg&quot;,
                &quot;time&quot;: 1401491602,
                &quot;id&quot;: 315746,
                &quot;likes&quot;: 0
            },
            {
                &quot;author&quot;: &quot;赵茜&quot;,
                &quot;content&quot;: &quot;赞！&quot;,
                &quot;avatar&quot;: &quot;http://pic3.zhimg.com/187d8afe2_im.jpg&quot;,
                &quot;time&quot;: 1401491485,
                &quot;id&quot;: 315744,
                &quot;likes&quot;: 0
            },
            {
                &quot;author&quot;: &quot;yx&quot;,
                &quot;content&quot;: &quot;我想知道孔雀的来历\n—————————————\nmatt在white collar里的角色特别华丽帅气+喜欢show 得名孔雀。貌似是破烂熊字幕组最先开始这么叫的&quot;,
                &quot;avatar&quot;: &quot;http://pic1.zhimg.com/da8e974dc_im.jpg&quot;,
                &quot;time&quot;: 1401468700,
                &quot;id&quot;: 315673,
                &quot;likes&quot;: 2
            },
            {
                &quot;author&quot;: &quot;期末考试都是凑牛忙&quot;,
                &quot;content&quot;: &quot;啊！来得太是时候！刚复习完叉男系列快被弹幕搞晕死了！&quot;,
                &quot;avatar&quot;: &quot;http://pic3.zhimg.com/0697fa2ca_im.jpg&quot;,
                &quot;time&quot;: 1401467393,
                &quot;id&quot;: 315658,
                &quot;likes&quot;: 0
            },
            {
                &quot;author&quot;: &quot;fishski&quot;,
                &quot;content&quot;: &quot;付兰兰是franco的谐音吧？取fran&quot;,
                &quot;avatar&quot;: &quot;http://pic4.zhimg.com/db78bc02f_im.jpg&quot;,
                &quot;time&quot;: 1401463587,
                &quot;id&quot;: 315610,
                &quot;likes&quot;: 0
            },
            {
                &quot;author&quot;: &quot;弯弯死在Lonely_Night&quot;,
                &quot;content&quot;: &quot;大咚不是抖森么...&quot;,
                &quot;avatar&quot;: &quot;http://pic2.zhimg.com/dd411f805_im.jpg&quot;,
                &quot;time&quot;: 1401459568,
                &quot;id&quot;: 315558,
                &quot;likes&quot;: 1
            },
            {
                &quot;author&quot;: &quot;喀咖咔咯&quot;,
                &quot;content&quot;: &quot;其实好多明星都知道他们的中国昵称，起这些昵称也不是为了让他们知道吧……有时也是除了打Tom Hiddleston,Michael Fassbender以外的选择…&quot;,
                &quot;avatar&quot;: &quot;http://pic2.zhimg.com/f1f359e59d36f3551899bb42e202331d_im.jpg&quot;,
                &quot;time&quot;: 1401458330,
                &quot;id&quot;: 315537,
                &quot;likes&quot;: 3
            },
            {
                &quot;author&quot;: &quot;shoo-3-&quot;,
                &quot;content&quot;: &quot;我想知道孔雀的来历&quot;,
                &quot;avatar&quot;: &quot;http://pic3.zhimg.com/228411c3e_im.jpg&quot;,
                &quot;time&quot;: 1401455162,
                &quot;id&quot;: 315506,
                &quot;likes&quot;: 0
            },
            {
                &quot;author&quot;: &quot;聲帶抽筋&quot;,
                &quot;content&quot;: &quot;抖森明明是因为Loki是抖M&quot;,
                &quot;avatar&quot;: &quot;http://pic3.zhimg.com/cdfc3dcb6_im.jpg&quot;,
                &quot;time&quot;: 1401454784,
                &quot;id&quot;: 315503,
                &quot;likes&quot;: 6
            },
            {
                &quot;author&quot;: &quot;青菜弩兵&quot;,
                &quot;content&quot;: &quot;高司令呢？&quot;,
                &quot;avatar&quot;: &quot;http://pic1.zhimg.com/ad96931a4_im.jpg&quot;,
                &quot;time&quot;: 1401449283,
                &quot;id&quot;: 315447,
                &quot;likes&quot;: 0
            },
            {
                &quot;author&quot;: &quot;水果君ZQ&quot;,
                &quot;content&quot;: &quot;答主是混奥吧的吧，我想起了oricon吧百度百科，里面有超长绰号大全……&quot;,
                &quot;avatar&quot;: &quot;http://pic2.zhimg.com/4bff34c3d_im.jpg&quot;,
                &quot;time&quot;: 1401444124,
                &quot;id&quot;: 315354,
                &quot;likes&quot;: 0
            }
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"COMMENTS"</span>: {
        <span class="hljs-attr">"comments"</span>: [
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"LunaQ-"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"为什么我开起来就变成新毒霸网址了??"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic3.zhimg.com/445786476_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1402830238</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">336776</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"加一"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"兰兰 苍老师"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic1.zhimg.com/7bde31faacc3166ead9bd17ec18659d0_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401718799</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">319059</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"geminisun83"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"只能看到一张图，无法拖动，日报更新以后难用了"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic3.zhimg.com/01d9e29ae_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401676872</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">318255</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"骑车的小胖"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"妈的不能点开啊"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic4.zhimg.com/8e8c9610f_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401585421</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">316880</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">1</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Ryanne"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"郭紫丽，龚娇梅，康敏苏?"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic4.zhimg.com/bed9045c29d36181629d6a4884aa5003_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401535356</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">316375</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"放洋宝宝_小知洋"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"纯粹为了一美过来留言~"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic3.zhimg.com/853e6fee6_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401531916</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">316309</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">2</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"xuqingsongjn"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"汤姆哈迪在兄弟连里头发就是干的啊"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic1.zhimg.com/ce907db20_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401522326</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">316122</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"波波砾"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"缺爷和潮爷是要放在一起看的～“又见灰毛衣，又见闪闪鞋，又见歪领带…”的缺爷更衬托出“一表人才”的潮爷，哈哈哈（但是缺还是我唯一的心头爱，哈哈）"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic2.zhimg.com/3f9dae8fd_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401502226</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315893</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">1</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"没尾巴狼"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"欧美圈自己圈地玩儿就行了，真心不需要科普，尤其是CP科普"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic4.zhimg.com/e732f2e43_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401501162</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315873</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">4</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"喵喵"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"花生不是华生的谐音么……"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic1.zhimg.com/12537e198_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401491602</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315746</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"赵茜"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"赞！"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic3.zhimg.com/187d8afe2_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401491485</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315744</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"yx"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"我想知道孔雀的来历\n—————————————\nmatt在white collar里的角色特别华丽帅气+喜欢show 得名孔雀。貌似是破烂熊字幕组最先开始这么叫的"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic1.zhimg.com/da8e974dc_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401468700</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315673</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">2</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"期末考试都是凑牛忙"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"啊！来得太是时候！刚复习完叉男系列快被弹幕搞晕死了！"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic3.zhimg.com/0697fa2ca_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401467393</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315658</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"fishski"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"付兰兰是franco的谐音吧？取fran"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic4.zhimg.com/db78bc02f_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401463587</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315610</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"弯弯死在Lonely_Night"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"大咚不是抖森么..."</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic2.zhimg.com/dd411f805_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401459568</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315558</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">1</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"喀咖咔咯"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"其实好多明星都知道他们的中国昵称，起这些昵称也不是为了让他们知道吧……有时也是除了打Tom Hiddleston,Michael Fassbender以外的选择…"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic2.zhimg.com/f1f359e59d36f3551899bb42e202331d_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401458330</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315537</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">3</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"shoo-3-"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"我想知道孔雀的来历"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic3.zhimg.com/228411c3e_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401455162</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315506</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"聲帶抽筋"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"抖森明明是因为Loki是抖M"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic3.zhimg.com/cdfc3dcb6_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401454784</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315503</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">6</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"青菜弩兵"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"高司令呢？"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic1.zhimg.com/ad96931a4_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401449283</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315447</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            },
            {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"水果君ZQ"</span>,
                <span class="hljs-attr">"content"</span>: <span class="hljs-string">"答主是混奥吧的吧，我想起了oricon吧百度百科，里面有超长绰号大全……"</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic2.zhimg.com/4bff34c3d_im.jpg"</span>,
                <span class="hljs-attr">"time"</span>: <span class="hljs-number">1401444124</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">315354</span>,
                <span class="hljs-attr">"likes"</span>: <span class="hljs-number">0</span>
            }
        ]
    }
}</code></pre>
<h5>返回数据说明</h5>
<ul>
<li><p>comments: 短评论列表，形式为数组（请注意，其长度可能为 0）</p></li>
<li><p>author: 评论作者</p></li>
<li><p>id: 评论者的唯一标识符</p></li>
<li><p>content: 评论的内容</p></li>
<li><p>likes: 评论所获『赞』的数量</p></li>
<li><p>time: 评论时间</p></li>
<li><p>avatar: 用户头像图片的地址</p></li>
</ul>
<h4>查看主题日报列表：</h4>
<h5>接口地址</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/themes
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code><span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/zhihu-daily.leanapp.cn/api</span><span class="hljs-regexp">/v1/themes</span>
</code></pre>
<h5>返回数据示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;THEMES&quot;: {
        &quot;limit&quot;: 1000,
        &quot;subscribed&quot;: [],
        &quot;others&quot;: [
            {
                &quot;color&quot;: 15007,
                &quot;thumbnail&quot;: &quot;http://pic3.zhimg.com/0e71e90fd6be47630399d63c58beebfc.jpg&quot;,
                &quot;description&quot;: &quot;了解自己和别人，了解彼此的欲望和局限。&quot;,
                &quot;id&quot;: 13,
                &quot;name&quot;: &quot;日常心理学&quot;
            },
            {
                &quot;color&quot;: 8307764,
                &quot;thumbnail&quot;: &quot;http://pic4.zhimg.com/2c38a96e84b5cc8331a901920a87ea71.jpg&quot;,
                &quot;description&quot;: &quot;内容由知乎用户推荐，海纳主题百万，趣味上天入地&quot;,
                &quot;id&quot;: 12,
                &quot;name&quot;: &quot;用户推荐日报&quot;
            },
            {
                &quot;color&quot;: 14483535,
                &quot;thumbnail&quot;: &quot;http://pic3.zhimg.com/00eba01080138a5ac861d581a64ff9bd.jpg&quot;,
                &quot;description&quot;: &quot;除了经典和新片，我们还关注技术和产业&quot;,
                &quot;id&quot;: 3,
                &quot;name&quot;: &quot;电影日报&quot;
            },
            {
                &quot;color&quot;: 8307764,
                &quot;thumbnail&quot;: &quot;http://pic4.zhimg.com/4aa8400ba46d3d46e34a9836744ea232.jpg&quot;,
                &quot;description&quot;: &quot;为你发现最有趣的新鲜事，建议在 WiFi 下查看&quot;,
                &quot;id&quot;: 11,
                &quot;name&quot;: &quot;不许无聊&quot;
            },
            {
                &quot;color&quot;: 62140,
                &quot;thumbnail&quot;: &quot;http://p1.zhimg.com/d3/7b/d37b38d5c82b4345ccd7e50c4ae997da.jpg&quot;,
                &quot;description&quot;: &quot;好设计需要打磨和研习，我们分享灵感和路径&quot;,
                &quot;id&quot;: 4,
                &quot;name&quot;: &quot;设计日报&quot;
            },
            {
                &quot;color&quot;: 1615359,
                &quot;thumbnail&quot;: &quot;http://pic4.zhimg.com/aa94e197491fb9c44d384c4747773810.jpg&quot;,
                &quot;description&quot;: &quot;商业世界变化越来越快，就是这些家伙干的&quot;,
                &quot;id&quot;: 5,
                &quot;name&quot;: &quot;大公司日报&quot;
            },
            {
                &quot;color&quot;: 16031744,
                &quot;thumbnail&quot;: &quot;http://pic2.zhimg.com/f2e97ff073e5cf9e79c7ed498727ebd6.jpg&quot;,
                &quot;description&quot;: &quot;从业者推荐的财经金融资讯&quot;,
                &quot;id&quot;: 6,
                &quot;name&quot;: &quot;财经日报&quot;
            },
            {
                &quot;color&quot;: 9699556,
                &quot;thumbnail&quot;: &quot;http://pic2.zhimg.com/98d7b4f8169c596efb6ee8487a30c8ee.jpg&quot;,
                &quot;description&quot;: &quot;把黑客知识科普到你的面前&quot;,
                &quot;id&quot;: 10,
                &quot;name&quot;: &quot;互联网安全&quot;
            },
            {
                &quot;color&quot;: 59647,
                &quot;thumbnail&quot;: &quot;http://pic3.zhimg.com/2f214a4ca51855670668530f7d333fd8.jpg&quot;,
                &quot;description&quot;: &quot;如果你喜欢游戏，就从这里开始&quot;,
                &quot;id&quot;: 2,
                &quot;name&quot;: &quot;开始游戏&quot;
            },
            {
                &quot;color&quot;: 1564695,
                &quot;thumbnail&quot;: &quot;http://pic4.zhimg.com/eac535117ed895983bd2721f35d6e8dc.jpg&quot;,
                &quot;description&quot;: &quot;有音乐就很好&quot;,
                &quot;id&quot;: 7,
                &quot;name&quot;: &quot;音乐日报&quot;
            },
            {
                &quot;color&quot;: 6123007,
                &quot;thumbnail&quot;: &quot;http://pic1.zhimg.com/a0f97c523c64e749c700b2ddc96cfd7c.jpg&quot;,
                &quot;description&quot;: &quot;用技术的眼睛仔细看懂每一部动画和漫画&quot;,
                &quot;id&quot;: 9,
                &quot;name&quot;: &quot;动漫日报&quot;
            },
            {
                &quot;color&quot;: 16046124,
                &quot;thumbnail&quot;: &quot;http://pic1.zhimg.com/bcf7d594f126e5ceb22691be32b2650a.jpg&quot;,
                &quot;description&quot;: &quot;关注体育，不吵架。&quot;,
                &quot;id&quot;: 8,
                &quot;name&quot;: &quot;体育日报&quot;
            }
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"THEMES"</span>: {
        <span class="hljs-attr">"limit"</span>: <span class="hljs-number">1000</span>,
        <span class="hljs-attr">"subscribed"</span>: [],
        <span class="hljs-attr">"others"</span>: [
            {
                <span class="hljs-attr">"color"</span>: <span class="hljs-number">15007</span>,
                <span class="hljs-attr">"thumbnail"</span>: <span class="hljs-string">"http://pic3.zhimg.com/0e71e90fd6be47630399d63c58beebfc.jpg"</span>,
                <span class="hljs-attr">"description"</span>: <span class="hljs-string">"了解自己和别人，了解彼此的欲望和局限。"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">13</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"日常心理学"</span>
            },
            {
                <span class="hljs-attr">"color"</span>: <span class="hljs-number">8307764</span>,
                <span class="hljs-attr">"thumbnail"</span>: <span class="hljs-string">"http://pic4.zhimg.com/2c38a96e84b5cc8331a901920a87ea71.jpg"</span>,
                <span class="hljs-attr">"description"</span>: <span class="hljs-string">"内容由知乎用户推荐，海纳主题百万，趣味上天入地"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">12</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"用户推荐日报"</span>
            },
            {
                <span class="hljs-attr">"color"</span>: <span class="hljs-number">14483535</span>,
                <span class="hljs-attr">"thumbnail"</span>: <span class="hljs-string">"http://pic3.zhimg.com/00eba01080138a5ac861d581a64ff9bd.jpg"</span>,
                <span class="hljs-attr">"description"</span>: <span class="hljs-string">"除了经典和新片，我们还关注技术和产业"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">3</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"电影日报"</span>
            },
            {
                <span class="hljs-attr">"color"</span>: <span class="hljs-number">8307764</span>,
                <span class="hljs-attr">"thumbnail"</span>: <span class="hljs-string">"http://pic4.zhimg.com/4aa8400ba46d3d46e34a9836744ea232.jpg"</span>,
                <span class="hljs-attr">"description"</span>: <span class="hljs-string">"为你发现最有趣的新鲜事，建议在 WiFi 下查看"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">11</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"不许无聊"</span>
            },
            {
                <span class="hljs-attr">"color"</span>: <span class="hljs-number">62140</span>,
                <span class="hljs-attr">"thumbnail"</span>: <span class="hljs-string">"http://p1.zhimg.com/d3/7b/d37b38d5c82b4345ccd7e50c4ae997da.jpg"</span>,
                <span class="hljs-attr">"description"</span>: <span class="hljs-string">"好设计需要打磨和研习，我们分享灵感和路径"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">4</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"设计日报"</span>
            },
            {
                <span class="hljs-attr">"color"</span>: <span class="hljs-number">1615359</span>,
                <span class="hljs-attr">"thumbnail"</span>: <span class="hljs-string">"http://pic4.zhimg.com/aa94e197491fb9c44d384c4747773810.jpg"</span>,
                <span class="hljs-attr">"description"</span>: <span class="hljs-string">"商业世界变化越来越快，就是这些家伙干的"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">5</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"大公司日报"</span>
            },
            {
                <span class="hljs-attr">"color"</span>: <span class="hljs-number">16031744</span>,
                <span class="hljs-attr">"thumbnail"</span>: <span class="hljs-string">"http://pic2.zhimg.com/f2e97ff073e5cf9e79c7ed498727ebd6.jpg"</span>,
                <span class="hljs-attr">"description"</span>: <span class="hljs-string">"从业者推荐的财经金融资讯"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">6</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"财经日报"</span>
            },
            {
                <span class="hljs-attr">"color"</span>: <span class="hljs-number">9699556</span>,
                <span class="hljs-attr">"thumbnail"</span>: <span class="hljs-string">"http://pic2.zhimg.com/98d7b4f8169c596efb6ee8487a30c8ee.jpg"</span>,
                <span class="hljs-attr">"description"</span>: <span class="hljs-string">"把黑客知识科普到你的面前"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">10</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"互联网安全"</span>
            },
            {
                <span class="hljs-attr">"color"</span>: <span class="hljs-number">59647</span>,
                <span class="hljs-attr">"thumbnail"</span>: <span class="hljs-string">"http://pic3.zhimg.com/2f214a4ca51855670668530f7d333fd8.jpg"</span>,
                <span class="hljs-attr">"description"</span>: <span class="hljs-string">"如果你喜欢游戏，就从这里开始"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">2</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"开始游戏"</span>
            },
            {
                <span class="hljs-attr">"color"</span>: <span class="hljs-number">1564695</span>,
                <span class="hljs-attr">"thumbnail"</span>: <span class="hljs-string">"http://pic4.zhimg.com/eac535117ed895983bd2721f35d6e8dc.jpg"</span>,
                <span class="hljs-attr">"description"</span>: <span class="hljs-string">"有音乐就很好"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"音乐日报"</span>
            },
            {
                <span class="hljs-attr">"color"</span>: <span class="hljs-number">6123007</span>,
                <span class="hljs-attr">"thumbnail"</span>: <span class="hljs-string">"http://pic1.zhimg.com/a0f97c523c64e749c700b2ddc96cfd7c.jpg"</span>,
                <span class="hljs-attr">"description"</span>: <span class="hljs-string">"用技术的眼睛仔细看懂每一部动画和漫画"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">9</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"动漫日报"</span>
            },
            {
                <span class="hljs-attr">"color"</span>: <span class="hljs-number">16046124</span>,
                <span class="hljs-attr">"thumbnail"</span>: <span class="hljs-string">"http://pic1.zhimg.com/bcf7d594f126e5ceb22691be32b2650a.jpg"</span>,
                <span class="hljs-attr">"description"</span>: <span class="hljs-string">"关注体育，不吵架。"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">8</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"体育日报"</span>
            }
        ]
    }
}</code></pre>
<h5>返回数据说明</h5>
<ul>
<li><p>others: 其他条目</p></li>
<li><p>color: 主题日报背景颜色</p></li>
<li><p>thumbnail: 供显示的图片地址</p></li>
<li><p>description: 主题日报的介绍</p></li>
<li><p>id: 该主题日报的唯一id</p></li>
<li><p>name: 主题日报名称</p></li>
</ul>
<h4>查看主题日报内容：</h4>
<h5>接口地址</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/themes/:id
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>https:<span class="hljs-regexp">//</span>zhihu-daily.leanapp.cn<span class="hljs-regexp">/api/</span>v1<span class="hljs-regexp">/themes/</span>:id
</code></pre>
<h5>调用示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhihu-daily.leanapp.cn/api/v1/themes/2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>https:<span class="hljs-regexp">//</span>zhihu-daily.leanapp.cn<span class="hljs-regexp">/api/</span>v1<span class="hljs-regexp">/themes/</span><span class="hljs-number">2</span>
</code></pre>
<h5>返回数据示例</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;THEMEDES&quot;: {
        &quot;stories&quot;: [
            {
                &quot;type&quot;: 0,
                &quot;id&quot;: 8362807,
                &quot;title&quot;: &quot;更多游戏内容，都在读读日报里&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic2.zhimg.com/878b8960b617bfb4721a103e24a0509d.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 7785695,
                &quot;title&quot;: &quot;Necromanov：分裂红海：辐射4的喧嚣和争议&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic1.zhimg.com/9e9a4e7c539784f5488093cb6b0eeb50_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 7225331,
                &quot;title&quot;: &quot;MGS V幻痛：沙盘化的心血和代价&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic2.zhimg.com/761acb25a50564c8bafce6d1d4ec5b05_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 7173926,
                &quot;title&quot;: &quot;幸存者偏差——死在中国游戏圈的一百万种方式&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic3.zhimg.com/956663ab7cf64103a5a08d567db3f1c6_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 7121745,
                &quot;title&quot;: &quot;前《永恒之塔》技术总监谈如何使用Unity实现次世代效果&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic1.zhimg.com/e7cd0ddfd60855f00d45f29d9d0782c0_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 7114453,
                &quot;title&quot;: &quot;深度：第一份《LOVE LIVE!》全面分析报告&quot;
            },
            {
                &quot;type&quot;: 0,
                &quot;id&quot;: 7112210,
                &quot;title&quot;: &quot;和男/女朋友一起玩 Minecraft 是怎样的体验？&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic3.zhimg.com/d13bd513bde7372d146f4ed6790aa6be_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 7050232,
                &quot;title&quot;: &quot;为女儿推荐游戏是一种怎样的体验&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic4.zhimg.com/19593389111853d69c6ad0dc6e925667_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 7038710,
                &quot;title&quot;: &quot;10年前的CJ，我们都在看些什么？&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic3.zhimg.com/9b9fa0556dffba9982dca5a5915c061e_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 7015462,
                &quot;title&quot;: &quot;95后大学生都在玩什么游戏（图）？&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic3.zhimg.com/6f4719fca836a2816191c30d5d7675da_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 7014522,
                &quot;title&quot;: &quot;身为一个土豪（大R）玩家是一种怎样的体验？&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic1.zhimg.com/4c5498268b53287aad36e13e180dbcb4_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 7014069,
                &quot;title&quot;: &quot;“仙六陨落”：游戏如果没有游戏性，为何不去看动画？&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic4.zhimg.com/450b234d6afb0688d93138c04080b7d7_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 7012937,
                &quot;title&quot;: &quot;把原创游戏设计变得有趣(之一)&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic1.zhimg.com/6d54559b14df2d601354c12e7e3d4f6c_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 4893358,
                &quot;title&quot;: &quot;十三大发行商下半年产品IP储备大起底&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic1.zhimg.com/f5528e37f0b97e07c5bb36145ffd9ac0_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 4864466,
                &quot;title&quot;: &quot;专访《大圣归来》出品人路伟：CP如何靠精品内容逆袭渠道？&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic4.zhimg.com/b7463eb15e4b8179add9fd3778f7305f_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 4860434,
                &quot;title&quot;: &quot;【败局】如何将一家市值一百亿的游戏公司做垮&quot;
            },
            {
                &quot;type&quot;: 0,
                &quot;id&quot;: 4856808,
                &quot;title&quot;: &quot;反恐精英游戏史：Counter-Strike History 1999-2015&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic4.zhimg.com/ed17bcfd735977314cf70be104f78d63_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 4837591,
                &quot;title&quot;: &quot;从“小朋友”到“大英雄”：单打独斗二十年&quot;
            },
            {
                &quot;images&quot;: [
                    &quot;http://pic3.zhimg.com/9382872f7b2e5d898ffa11eb915ed992_t.jpg&quot;
                ],
                &quot;type&quot;: 0,
                &quot;id&quot;: 4833369,
                &quot;title&quot;: &quot;家有开发者：那些不曾与你说过的话&quot;
            },
            {
                &quot;type&quot;: 0,
                &quot;id&quot;: 4824545,
                &quot;title&quot;: &quot;我想做个好人，即便是在 GTA 中&quot;
            }
        ],
        &quot;description&quot;: &quot;如果你喜欢游戏，就从这里开始&quot;,
        &quot;background&quot;: &quot;http://p2.zhimg.com/55/e0/55e06f8fe322fd87b3261b204bae4786.jpg&quot;,
        &quot;color&quot;: 59647,
        &quot;name&quot;: &quot;开始游戏&quot;,
        &quot;image&quot;: &quot;http://p3.zhimg.com/64/5c/645cde143c9a371005f3f749366cffad.jpg&quot;,
        &quot;editors&quot;: [
            {
                &quot;url&quot;: &quot;http://www.zhihu.com/people/necromanov&quot;,
                &quot;bio&quot;: &quot;战略航空军旗舰的元帅&quot;,
                &quot;id&quot;: 3,
                &quot;avatar&quot;: &quot;http://pic4.zhimg.com/3553d57db_m.jpg&quot;,
                &quot;name&quot;: &quot;Necromanov&quot;
            },
            {
                &quot;url&quot;: &quot;http://www.zhihu.com/people/FireWolf&quot;,
                &quot;bio&quot;: &quot;原《电脑游戏攻略》编辑，现创业“有趣点”：youqudian.com&quot;,
                &quot;id&quot;: 76,
                &quot;avatar&quot;: &quot;http://pic2.zhimg.com/71d001b31_m.jpg&quot;,
                &quot;name&quot;: &quot;火狼&quot;
            },
            {
                &quot;url&quot;: &quot;http://www.zhihu.com/people/commando&quot;,
                &quot;bio&quot;: &quot;知名游戏人，触乐网创始人&quot;,
                &quot;id&quot;: 2,
                &quot;avatar&quot;: &quot;http://pic2.zhimg.com/2cacc4d6d_m.jpg&quot;,
                &quot;name&quot;: &quot;祝佳音&quot;
            },
            {
                &quot;url&quot;: &quot;http://www.zhihu.com/people/meng-de-er&quot;,
                &quot;bio&quot;: &quot;传统游戏遗老，SEGA 的守墓人&quot;,
                &quot;id&quot;: 5,
                &quot;avatar&quot;: &quot;http://pic3.zhimg.com/8a0f51296_m.jpg&quot;,
                &quot;name&quot;: &quot;孟德尔&quot;
            }
        ],
        &quot;image_source&quot;: &quot;&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"THEMEDES"</span>: {
        <span class="hljs-attr">"stories"</span>: [
            {
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">8362807</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"更多游戏内容，都在读读日报里"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic2.zhimg.com/878b8960b617bfb4721a103e24a0509d.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7785695</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Necromanov：分裂红海：辐射4的喧嚣和争议"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic1.zhimg.com/9e9a4e7c539784f5488093cb6b0eeb50_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7225331</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"MGS V幻痛：沙盘化的心血和代价"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic2.zhimg.com/761acb25a50564c8bafce6d1d4ec5b05_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7173926</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"幸存者偏差——死在中国游戏圈的一百万种方式"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic3.zhimg.com/956663ab7cf64103a5a08d567db3f1c6_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7121745</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"前《永恒之塔》技术总监谈如何使用Unity实现次世代效果"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic1.zhimg.com/e7cd0ddfd60855f00d45f29d9d0782c0_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7114453</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"深度：第一份《LOVE LIVE!》全面分析报告"</span>
            },
            {
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7112210</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"和男/女朋友一起玩 Minecraft 是怎样的体验？"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic3.zhimg.com/d13bd513bde7372d146f4ed6790aa6be_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7050232</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"为女儿推荐游戏是一种怎样的体验"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic4.zhimg.com/19593389111853d69c6ad0dc6e925667_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7038710</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"10年前的CJ，我们都在看些什么？"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic3.zhimg.com/9b9fa0556dffba9982dca5a5915c061e_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7015462</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"95后大学生都在玩什么游戏（图）？"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic3.zhimg.com/6f4719fca836a2816191c30d5d7675da_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7014522</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"身为一个土豪（大R）玩家是一种怎样的体验？"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic1.zhimg.com/4c5498268b53287aad36e13e180dbcb4_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7014069</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"“仙六陨落”：游戏如果没有游戏性，为何不去看动画？"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic4.zhimg.com/450b234d6afb0688d93138c04080b7d7_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">7012937</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"把原创游戏设计变得有趣(之一)"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic1.zhimg.com/6d54559b14df2d601354c12e7e3d4f6c_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">4893358</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"十三大发行商下半年产品IP储备大起底"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic1.zhimg.com/f5528e37f0b97e07c5bb36145ffd9ac0_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">4864466</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"专访《大圣归来》出品人路伟：CP如何靠精品内容逆袭渠道？"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic4.zhimg.com/b7463eb15e4b8179add9fd3778f7305f_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">4860434</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"【败局】如何将一家市值一百亿的游戏公司做垮"</span>
            },
            {
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">4856808</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"反恐精英游戏史：Counter-Strike History 1999-2015"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic4.zhimg.com/ed17bcfd735977314cf70be104f78d63_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">4837591</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"从“小朋友”到“大英雄”：单打独斗二十年"</span>
            },
            {
                <span class="hljs-attr">"images"</span>: [
                    <span class="hljs-string">"http://pic3.zhimg.com/9382872f7b2e5d898ffa11eb915ed992_t.jpg"</span>
                ],
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">4833369</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"家有开发者：那些不曾与你说过的话"</span>
            },
            {
                <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">4824545</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"我想做个好人，即便是在 GTA 中"</span>
            }
        ],
        <span class="hljs-attr">"description"</span>: <span class="hljs-string">"如果你喜欢游戏，就从这里开始"</span>,
        <span class="hljs-attr">"background"</span>: <span class="hljs-string">"http://p2.zhimg.com/55/e0/55e06f8fe322fd87b3261b204bae4786.jpg"</span>,
        <span class="hljs-attr">"color"</span>: <span class="hljs-number">59647</span>,
        <span class="hljs-attr">"name"</span>: <span class="hljs-string">"开始游戏"</span>,
        <span class="hljs-attr">"image"</span>: <span class="hljs-string">"http://p3.zhimg.com/64/5c/645cde143c9a371005f3f749366cffad.jpg"</span>,
        <span class="hljs-attr">"editors"</span>: [
            {
                <span class="hljs-attr">"url"</span>: <span class="hljs-string">"http://www.zhihu.com/people/necromanov"</span>,
                <span class="hljs-attr">"bio"</span>: <span class="hljs-string">"战略航空军旗舰的元帅"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">3</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic4.zhimg.com/3553d57db_m.jpg"</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Necromanov"</span>
            },
            {
                <span class="hljs-attr">"url"</span>: <span class="hljs-string">"http://www.zhihu.com/people/FireWolf"</span>,
                <span class="hljs-attr">"bio"</span>: <span class="hljs-string">"原《电脑游戏攻略》编辑，现创业“有趣点”：youqudian.com"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">76</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic2.zhimg.com/71d001b31_m.jpg"</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"火狼"</span>
            },
            {
                <span class="hljs-attr">"url"</span>: <span class="hljs-string">"http://www.zhihu.com/people/commando"</span>,
                <span class="hljs-attr">"bio"</span>: <span class="hljs-string">"知名游戏人，触乐网创始人"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">2</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic2.zhimg.com/2cacc4d6d_m.jpg"</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"祝佳音"</span>
            },
            {
                <span class="hljs-attr">"url"</span>: <span class="hljs-string">"http://www.zhihu.com/people/meng-de-er"</span>,
                <span class="hljs-attr">"bio"</span>: <span class="hljs-string">"传统游戏遗老，SEGA 的守墓人"</span>,
                <span class="hljs-attr">"id"</span>: <span class="hljs-number">5</span>,
                <span class="hljs-attr">"avatar"</span>: <span class="hljs-string">"http://pic3.zhimg.com/8a0f51296_m.jpg"</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"孟德尔"</span>
            }
        ],
        <span class="hljs-attr">"image_source"</span>: <span class="hljs-string">""</span>
    }
}</code></pre>
<h5>返回数据说明</h5>
<ul>
<li><p>stories: 该主题日报中的文章列表</p></li>
<li><p>images: 图像地址（小图）</p></li>
<li><p>type: 类型，作用未知</p></li>
<li><p>title: 文章的标题</p></li>
<li><p>description: 该主题日报的介绍</p></li>
<li><p>background: 该主题日报的背景图片（大图）</p></li>
<li><p>color: 主题颜色</p></li>
<li><p>name: 主题日报的名称</p></li>
<li><p>image: 背景图片（小图）</p></li>
<li><p>editors: 该主题日报的编辑</p></li>
<li><p>url: 主编的知乎用户主页</p></li>
<li><p>bio: 主编的个人简介</p></li>
<li><p>id: 数据库中的唯一表示符</p></li>
<li><p>avatar: 主编的头像</p></li>
<li><p>name: 主编的姓名</p></li>
<li><p>image_source: 图像的版权信息</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
知乎日报 API 分析（解决跨域精简版）

## 原文链接
[https://segmentfault.com/a/1190000009242864](https://segmentfault.com/a/1190000009242864)


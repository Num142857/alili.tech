---
title: 'vue开发微信商城项目总结之五--vue实现九宫格抽奖' 
date: 2018-12-29 2:30:10
hidden: true
slug: gq15sibhnef
categories: [reprint]
---

{{< raw >}}

                    
<p>根据产品提出的需求，<br>需要做一个抽奖活动页面</p>
<h2 id="articleHeader0">需求简介</h2>
<p>九宫格抽奖，中奖概率可配置，以九宫格转盘的形式进行抽奖，奖品分为三类，</p>
<ol>
<li>实物类奖品，收货人信息可编辑，默认为登陆用户，可生成订单</li>
<li>福币类奖品，直接发放，可在交易明细中查看</li>
<li>优惠劵类奖品，交易明细中查看</li>
</ol>
<p>九宫格转动之后，中奖之前，要进行降速处理，获奖后可以在右上角查看中奖记录，<br>活动未开始不能抽奖，并且更换按钮状态</p>
<h2 id="articleHeader1">示意图</h2>
<p><span class="img-wrap"><img data-src="/img/bVV7cE?w=417&amp;h=736" src="https://static.alili.tech/img/bVV7cE?w=417&amp;h=736" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>该项目脱离了Jquery，采用原生js和vue实现<br><a href="https://github.com/moshanghan/vue-mo-cli" rel="nofollow noreferrer" target="_blank">项目地址在这里</a></p>
<h2 id="articleHeader2">后台接口结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;bizCode&quot;: &quot;000000&quot;,
  &quot;bizMessage&quot;: &quot;&quot;,
  &quot;data&quot;: {
    &quot;prizeDesc&quot;: &quot;每人100次$utf8$一等奖华为p10&quot;,
    &quot;winners&quot;: [{
      &quot;randomId&quot;: &quot;11120fba76224eda8f819f0d0058606a&quot;,
      &quot;level&quot;: 1,
      &quot;name&quot;: &quot;张三&quot;,
      &quot;mobile&quot;: &quot;153****91106&quot;,
      &quot;commodityName&quot;: &quot;华为 P10 Plus 全网通 4G 手机 双卡双待-6G+128G-玫瑰金&quot;
    }, {
      &quot;randomId&quot;: &quot;fd47133f9bb4453a86a659f81640d1ef&quot;,
      &quot;level&quot;: 4,
      &quot;name&quot;: &quot;张四&quot;,
      &quot;mobile&quot;: &quot;189****01366&quot;,
      &quot;commodityName&quot;: &quot;15福币&quot;
    }, {
      &quot;randomId&quot;: &quot;e9ba39c8773b4edebf45e1e3c35f3fc1&quot;,
      &quot;level&quot;: 2,
      &quot;name&quot;: &quot;张五&quot;,
      &quot;mobile&quot;: &quot;189****01366&quot;,
      &quot;commodityName&quot;: &quot;200优惠券&quot;
    }, {
      &quot;randomId&quot;: &quot;88e3ecdabc354d7a8c0b56a822a6f5a5&quot;,
      &quot;level&quot;: 3,
      &quot;name&quot;: &quot;张六&quot;,
      &quot;mobile&quot;: &quot;150****00451&quot;,
      &quot;commodityName&quot;: &quot;100优惠券&quot;
    }, {
      &quot;randomId&quot;: &quot;784227fd523841afac3dee0e6a377113&quot;,
      &quot;level&quot;: 8,
      &quot;name&quot;: &quot;李四&quot;,
      &quot;mobile&quot;: &quot;189****01366&quot;,
      &quot;commodityName&quot;: &quot;3福币&quot;
    }, {
      &quot;randomId&quot;: &quot;7a95ad0b9522442a8ca12859e41f1fb9&quot;,
      &quot;level&quot;: 8,
      &quot;name&quot;: &quot;李五&quot;,
      &quot;mobile&quot;: &quot;151****73957&quot;,
      &quot;commodityName&quot;: &quot;3福币&quot;
    }, {
      &quot;randomId&quot;: &quot;0b92100d0a354ad3be334edf826c61e5&quot;,
      &quot;level&quot;: 8,
      &quot;name&quot;: &quot;李六&quot;,
      &quot;mobile&quot;: &quot;151****73957&quot;,
      &quot;commodityName&quot;: &quot;3福币&quot;
    }, {
      &quot;randomId&quot;: &quot;4b0a012886cd473d962f5ad9b60ba7e6&quot;,
      &quot;level&quot;: 8,
      &quot;name&quot;: &quot;李七&quot;,
      &quot;mobile&quot;: &quot;151****73957&quot;,
      &quot;commodityName&quot;: &quot;3福币&quot;
    }, {
      &quot;randomId&quot;: &quot;46e31a4dfd0d4cf889f1c0b8f9f04075&quot;,
      &quot;level&quot;: 7,
      &quot;name&quot;: &quot;李八&quot;,
      &quot;mobile&quot;: &quot;136****49120&quot;,
      &quot;commodityName&quot;: &quot;5福币&quot;
    }],
    &quot;defineId&quot;: &quot;b1dffba5c02f4fe19f3ac766f3432018&quot;,
    &quot;remainingTimes&quot;: 45,
    &quot;hasDrawed&quot;: true,
    &quot;prizeInfo&quot;: [{
      &quot;level&quot;: 1,
      &quot;picUrlDesc&quot;: &quot;http://qdtalk.com/wp-content/uploads/2017/09/1-2.png&quot;,
      &quot;prizeId&quot;: &quot;436066c40529401287658bfd67c1d346&quot;,
      &quot;commodityName&quot;: &quot;3福币&quot;
    }, {
      &quot;level&quot;: 2,
      &quot;picUrlDesc&quot;: &quot;http://qdtalk.com/wp-content/uploads/2017/09/2-2.png&quot;,
      &quot;prizeId&quot;: &quot;acdcb838bda74ec8b1fd202234f852ec&quot;,
      &quot;commodityName&quot;: &quot;200优惠劵&quot;
    }, {
      &quot;level&quot;: 3,
      &quot;picUrlDesc&quot;: &quot;http://qdtalk.com/wp-content/uploads/2017/09/3-2.png&quot;,
      &quot;prizeId&quot;: &quot;484bf4c856b94265960b3e182e9f597f&quot;,
      &quot;commodityName&quot;: &quot;100优惠劵&quot;
    }, {
      &quot;level&quot;: 4,
      &quot;picUrlDesc&quot;: &quot;http://qdtalk.com/wp-content/uploads/2017/09/4-2.png&quot;,
      &quot;prizeId&quot;: &quot;d5c7784c4c4d4a33b141fc1be3b11a71&quot;,
      &quot;commodityName&quot;: &quot;15福币&quot;
    }, {
      &quot;level&quot;: 5,
      &quot;picUrlDesc&quot;: &quot;http://qdtalk.com/wp-content/uploads/2017/09/5-2.png&quot;,
      &quot;prizeId&quot;: &quot;7221846d585a4bed80bf486f94fcabae&quot;,
      &quot;commodityName&quot;: &quot;10福币&quot;
    }, {
      &quot;level&quot;: 6,
      &quot;picUrlDesc&quot;: &quot;http://qdtalk.com/wp-content/uploads/2017/09/6-1.png&quot;,
      &quot;prizeId&quot;: &quot;33c6413801fd44c594cbf6642840a614&quot;,
      &quot;commodityName&quot;: &quot;8福币&quot;
    }, {
      &quot;level&quot;: 7,
      &quot;picUrlDesc&quot;: &quot;http://qdtalk.com/wp-content/uploads/2017/09/7-1.png&quot;,
      &quot;prizeId&quot;: &quot;e453f94905334ea083fca649e87b3308&quot;,
      &quot;commodityName&quot;: &quot;5福币&quot;
    }, {
      &quot;level&quot;: 8,
      &quot;picUrlDesc&quot;:&quot;http://qdtalk.com/wp-content/uploads/2017/09/8-1.png&quot;,
      &quot;prizeId&quot;: &quot;e8df88de1878428bb58d0cc9152d8849&quot;,
      &quot;commodityName&quot;: &quot;3&quot;
    }],
    &quot;beginTime&quot;: 1506519900000,
    &quot;endTime&quot;: 1601446191000,
    &quot;currTime&quot;: 1506751791732,
    &quot;title&quot;: &quot;奖品丰厚&quot;,
    &quot;lotteryDesc&quot;: &quot;100中奖$utf8$抓紧机会&quot;
  },
  &quot;success&quot;: true
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"bizCode"</span>: <span class="hljs-string">"000000"</span>,
  <span class="hljs-attr">"bizMessage"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"data"</span>: {
    <span class="hljs-attr">"prizeDesc"</span>: <span class="hljs-string">"每人100次$utf8$一等奖华为p10"</span>,
    <span class="hljs-attr">"winners"</span>: [{
      <span class="hljs-attr">"randomId"</span>: <span class="hljs-string">"11120fba76224eda8f819f0d0058606a"</span>,
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"张三"</span>,
      <span class="hljs-attr">"mobile"</span>: <span class="hljs-string">"153****91106"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"华为 P10 Plus 全网通 4G 手机 双卡双待-6G+128G-玫瑰金"</span>
    }, {
      <span class="hljs-attr">"randomId"</span>: <span class="hljs-string">"fd47133f9bb4453a86a659f81640d1ef"</span>,
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">4</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"张四"</span>,
      <span class="hljs-attr">"mobile"</span>: <span class="hljs-string">"189****01366"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"15福币"</span>
    }, {
      <span class="hljs-attr">"randomId"</span>: <span class="hljs-string">"e9ba39c8773b4edebf45e1e3c35f3fc1"</span>,
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"张五"</span>,
      <span class="hljs-attr">"mobile"</span>: <span class="hljs-string">"189****01366"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"200优惠券"</span>
    }, {
      <span class="hljs-attr">"randomId"</span>: <span class="hljs-string">"88e3ecdabc354d7a8c0b56a822a6f5a5"</span>,
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">3</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"张六"</span>,
      <span class="hljs-attr">"mobile"</span>: <span class="hljs-string">"150****00451"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"100优惠券"</span>
    }, {
      <span class="hljs-attr">"randomId"</span>: <span class="hljs-string">"784227fd523841afac3dee0e6a377113"</span>,
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">8</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"李四"</span>,
      <span class="hljs-attr">"mobile"</span>: <span class="hljs-string">"189****01366"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"3福币"</span>
    }, {
      <span class="hljs-attr">"randomId"</span>: <span class="hljs-string">"7a95ad0b9522442a8ca12859e41f1fb9"</span>,
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">8</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"李五"</span>,
      <span class="hljs-attr">"mobile"</span>: <span class="hljs-string">"151****73957"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"3福币"</span>
    }, {
      <span class="hljs-attr">"randomId"</span>: <span class="hljs-string">"0b92100d0a354ad3be334edf826c61e5"</span>,
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">8</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"李六"</span>,
      <span class="hljs-attr">"mobile"</span>: <span class="hljs-string">"151****73957"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"3福币"</span>
    }, {
      <span class="hljs-attr">"randomId"</span>: <span class="hljs-string">"4b0a012886cd473d962f5ad9b60ba7e6"</span>,
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">8</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"李七"</span>,
      <span class="hljs-attr">"mobile"</span>: <span class="hljs-string">"151****73957"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"3福币"</span>
    }, {
      <span class="hljs-attr">"randomId"</span>: <span class="hljs-string">"46e31a4dfd0d4cf889f1c0b8f9f04075"</span>,
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">7</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"李八"</span>,
      <span class="hljs-attr">"mobile"</span>: <span class="hljs-string">"136****49120"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"5福币"</span>
    }],
    <span class="hljs-attr">"defineId"</span>: <span class="hljs-string">"b1dffba5c02f4fe19f3ac766f3432018"</span>,
    <span class="hljs-attr">"remainingTimes"</span>: <span class="hljs-number">45</span>,
    <span class="hljs-attr">"hasDrawed"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"prizeInfo"</span>: [{
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"picUrlDesc"</span>: <span class="hljs-string">"http://qdtalk.com/wp-content/uploads/2017/09/1-2.png"</span>,
      <span class="hljs-attr">"prizeId"</span>: <span class="hljs-string">"436066c40529401287658bfd67c1d346"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"3福币"</span>
    }, {
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">"picUrlDesc"</span>: <span class="hljs-string">"http://qdtalk.com/wp-content/uploads/2017/09/2-2.png"</span>,
      <span class="hljs-attr">"prizeId"</span>: <span class="hljs-string">"acdcb838bda74ec8b1fd202234f852ec"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"200优惠劵"</span>
    }, {
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">3</span>,
      <span class="hljs-attr">"picUrlDesc"</span>: <span class="hljs-string">"http://qdtalk.com/wp-content/uploads/2017/09/3-2.png"</span>,
      <span class="hljs-attr">"prizeId"</span>: <span class="hljs-string">"484bf4c856b94265960b3e182e9f597f"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"100优惠劵"</span>
    }, {
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">4</span>,
      <span class="hljs-attr">"picUrlDesc"</span>: <span class="hljs-string">"http://qdtalk.com/wp-content/uploads/2017/09/4-2.png"</span>,
      <span class="hljs-attr">"prizeId"</span>: <span class="hljs-string">"d5c7784c4c4d4a33b141fc1be3b11a71"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"15福币"</span>
    }, {
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">5</span>,
      <span class="hljs-attr">"picUrlDesc"</span>: <span class="hljs-string">"http://qdtalk.com/wp-content/uploads/2017/09/5-2.png"</span>,
      <span class="hljs-attr">"prizeId"</span>: <span class="hljs-string">"7221846d585a4bed80bf486f94fcabae"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"10福币"</span>
    }, {
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">6</span>,
      <span class="hljs-attr">"picUrlDesc"</span>: <span class="hljs-string">"http://qdtalk.com/wp-content/uploads/2017/09/6-1.png"</span>,
      <span class="hljs-attr">"prizeId"</span>: <span class="hljs-string">"33c6413801fd44c594cbf6642840a614"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"8福币"</span>
    }, {
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">7</span>,
      <span class="hljs-attr">"picUrlDesc"</span>: <span class="hljs-string">"http://qdtalk.com/wp-content/uploads/2017/09/7-1.png"</span>,
      <span class="hljs-attr">"prizeId"</span>: <span class="hljs-string">"e453f94905334ea083fca649e87b3308"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"5福币"</span>
    }, {
      <span class="hljs-attr">"level"</span>: <span class="hljs-number">8</span>,
      <span class="hljs-attr">"picUrlDesc"</span>:<span class="hljs-string">"http://qdtalk.com/wp-content/uploads/2017/09/8-1.png"</span>,
      <span class="hljs-attr">"prizeId"</span>: <span class="hljs-string">"e8df88de1878428bb58d0cc9152d8849"</span>,
      <span class="hljs-attr">"commodityName"</span>: <span class="hljs-string">"3"</span>
    }],
    <span class="hljs-attr">"beginTime"</span>: <span class="hljs-number">1506519900000</span>,
    <span class="hljs-attr">"endTime"</span>: <span class="hljs-number">1601446191000</span>,
    <span class="hljs-attr">"currTime"</span>: <span class="hljs-number">1506751791732</span>,
    <span class="hljs-attr">"title"</span>: <span class="hljs-string">"奖品丰厚"</span>,
    <span class="hljs-attr">"lotteryDesc"</span>: <span class="hljs-string">"100中奖$utf8$抓紧机会"</span>
  },
  <span class="hljs-attr">"success"</span>: <span class="hljs-literal">true</span>
}
</code></pre>
<hr>
<h2 id="articleHeader3">部分字段说明</h2>
<hr>
<ul>
<li>prizeDesc：奖品说明，采用“$utf8$”分割，前端截取成数组，进行展示</li>
<li>winners：获奖名单</li>
<li>defineId：活动id</li>
<li>remainingTimes：剩余抽奖次数</li>
<li>beginTime：活动开始时间</li>
<li>endTime活动结束时间</li>
<li>currTime:当前时间</li>
<li>title：活动标题</li>
<li>prizeInfo：奖品信息</li>
<li>lotteryDesc：抽奖活动说明规则,同奖品说明prizeDesc</li>
</ul>
<p><a href="http://qdtalk.com/2017/09/12/vue%E5%BC%80%E5%8F%91%E5%BE%AE%E4%BF%A1%E5%95%86%E5%9F%8E%E9%A1%B9%E7%9B%AE%E6%80%BB%E7%BB%93/" rel="nofollow noreferrer" target="_blank">vue开发微信商城项目总结之一–项目介绍</a><br><a href="http://qdtalk.com/2017/09/11/eslint%E9%85%8D%E7%BD%AE/" rel="nofollow noreferrer" target="_blank">vue开发微信商城项目总结之二–Eslint配置</a><br><a href="https://segmentfault.com/a/1190000011239110">vue开发微信商城项目总结之三–根据不同的开发环境做配置</a><br><a href="https://segmentfault.com/a/1190000011297629" target="_blank">vue开发微信商城项目总结之四--本地代理处理跨域问题</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue开发微信商城项目总结之五--vue实现九宫格抽奖

## 原文链接
[https://segmentfault.com/a/1190000011428529](https://segmentfault.com/a/1190000011428529)


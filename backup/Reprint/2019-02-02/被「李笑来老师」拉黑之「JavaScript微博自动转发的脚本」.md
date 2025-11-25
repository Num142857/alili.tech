---
title: '被「李笑来老师」拉黑之「JavaScript微博自动转发的脚本」' 
date: 2019-02-02 2:30:11
hidden: true
slug: xc53io4msxr
categories: [reprint]
---

{{< raw >}}

                    
<p>故事的背景如下图，<a href="http://weibo.com/bylixiaolai" rel="nofollow noreferrer" target="_blank">李笑来</a> 老师于10月19日在 <a href="https://www.zhihu.com/lives/about" rel="nofollow noreferrer" target="_blank">知乎Live</a> 开设 <a href="https://www.zhihu.com/lives/763851343583547392" rel="nofollow noreferrer" target="_blank">一小时建立终生受用的阅读操作系统</a> 的讲座，他老人家看到大家伙报名踊跃，便在微博上发起了一个 <a href="http://weibo.com/1576218000/Eau3ZoPWd?type=comment" rel="nofollow noreferrer" target="_blank">猜数量赢取iPhone7</a> 的活动。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007062774?w=1204&amp;h=1236" src="https://static.alili.tech/img/remote/1460000007062774?w=1204&amp;h=1236" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>因为该活动注明了「不限猜的次数」，我便用 JavaScript 写一个自动转发的脚本，用机器代替手工转发，结果转发不到200次就被 <a href="http://weibo.com/bylixiaolai" rel="nofollow noreferrer" target="_blank">李笑来</a> 老师拉黑了，实在扫兴。与其独自郁闷，不如把技术细节分享给大家，祝大家能早日赢得 iPhone7。我的微博地址是：<a href="http://weibo.com/stone0090" rel="nofollow noreferrer" target="_blank">http://weibo.com/stone0090</a>，欢迎大家来围观。</p>
<p>本以为花一两个小时就能搞定这个微博自动转发的脚本，结果中途不停的踩坑折腾了大半天。还好早早的被 <a href="http://weibo.com/bylixiaolai" rel="nofollow noreferrer" target="_blank">李笑来</a> 老师拉黑。不然用 .NET 重写工具，再接入 <a href="http://www.dama2.com" rel="nofollow noreferrer" target="_blank">打码兔</a>，还得再花我好几个小时。好不容易国庆长假休息一下，还不是想给媳妇换个 iPhone7，我就能用她的 iPhone6s，要不然真心不想花太多时间捣鼓这个。废话不多说了，进入正题：</p>
<h3 id="articleHeader0">前期准备</h3>
<ul>
<li><p>JavaScript：如果不会 JavaScript，建议先学完 <a href="https://github.com/stone0090/javascript-lessons" rel="nofollow noreferrer" target="_blank">JavaScript 闯关记</a>，再继续看本文。</p></li>
<li><p>Chrome：开发调试 JavaScript 必备神器。</p></li>
<li><p>微博会员：据网上流言，普通用户如果转发过多会被封号，而会员则不会。</p></li>
</ul>
<h3 id="articleHeader1">填坑过程</h3>
<p>打开 Chrome 浏览器中，先登录自己的微博，再进入李笑来老师的微博首页 <a href="http://weibo.com/bylixiaolai" rel="nofollow noreferrer" target="_blank">http://weibo.com/bylixiaolai</a> 。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007062775?w=1268&amp;h=1262" src="https://static.alili.tech/img/remote/1460000007062775?w=1268&amp;h=1262" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>打开 Chrome 开发者工具（Mac 快捷键 <code>option</code> + <code>comand</code> + <code>j</code>，Window 快捷键 <code>ctrl</code> + <code>shift</code> + <code>i</code>），切换 tab 到 NetWork，并点击 clear，清除初始化时所加载的数据。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007062776?w=1374&amp;h=464" src="https://static.alili.tech/img/remote/1460000007062776?w=1374&amp;h=464" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>然后手动转发一次微博，获取到转发时所产生的请求。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007062777?w=1496&amp;h=872" src="https://static.alili.tech/img/remote/1460000007062777?w=1496&amp;h=872" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>利用上图红框中的关键数据，使用 JavaScript 模拟发送转发请求，具体代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 转发微博，并评论
function forwardWeibo(content, retcode) {
  var formData = new FormData();
  formData.append('pic_src', '');
  formData.append('pic_id', '');
  formData.append('appkey', '');
  formData.append('mid', '4024988475919525');
  formData.append('style_type', '1');
  formData.append('mark', '');
  formData.append('reason', content);
  formData.append('location', 'page_100505_home');
  formData.append('pdetail', '1005051576218000');
  formData.append('module', '');
  formData.append('page_module_id', '');
  formData.append('refer_sort', '');
  formData.append('is_comment_base', '1');
  formData.append('rank', '0');
  formData.append('rankid', '');
  formData.append('_t', '0');
  formData.append('retcode', retcode || '');

  var xhr = new XMLHttpRequest();
  xhr.timeout = 3000;
  xhr.responseType = &quot;text&quot;;
  xhr.open('POST', 'http://weibo.com/aj/v6/mblog/forward?ajwvr=6&amp;domain=100505&amp;__rnd=' + new Date().getTime(), true);
  xhr.onload = function(e) {
    if (this.status == 200 || this.status == 304) {
      var data = JSON.parse(this.responseText);
      if (data.code == &quot;100000&quot;) {
        // 转发微博成功
        console.log(content);
      } else if (data.code == &quot;100027&quot;) {
        // 转发微博失败，需要回答图片验证码的问题
        console.log(data);
      } else {
        // 转发微博失败，其他原因
        console.log(data);
      }
    }
  };
  xhr.send(formData);
}
//forwardWeibo('转发内容');
//forwardWeibo('转发内容',verified('答案'));

// 每5秒转发一次
var count = 35000;
setInterval(function(){
  forwardWeibo(count++);
}, 5000); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 转发微博，并评论</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">forwardWeibo</span>(<span class="hljs-params">content, retcode</span>) </span>{
  <span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData();
  formData.append(<span class="hljs-string">'pic_src'</span>, <span class="hljs-string">''</span>);
  formData.append(<span class="hljs-string">'pic_id'</span>, <span class="hljs-string">''</span>);
  formData.append(<span class="hljs-string">'appkey'</span>, <span class="hljs-string">''</span>);
  formData.append(<span class="hljs-string">'mid'</span>, <span class="hljs-string">'4024988475919525'</span>);
  formData.append(<span class="hljs-string">'style_type'</span>, <span class="hljs-string">'1'</span>);
  formData.append(<span class="hljs-string">'mark'</span>, <span class="hljs-string">''</span>);
  formData.append(<span class="hljs-string">'reason'</span>, content);
  formData.append(<span class="hljs-string">'location'</span>, <span class="hljs-string">'page_100505_home'</span>);
  formData.append(<span class="hljs-string">'pdetail'</span>, <span class="hljs-string">'1005051576218000'</span>);
  formData.append(<span class="hljs-string">'module'</span>, <span class="hljs-string">''</span>);
  formData.append(<span class="hljs-string">'page_module_id'</span>, <span class="hljs-string">''</span>);
  formData.append(<span class="hljs-string">'refer_sort'</span>, <span class="hljs-string">''</span>);
  formData.append(<span class="hljs-string">'is_comment_base'</span>, <span class="hljs-string">'1'</span>);
  formData.append(<span class="hljs-string">'rank'</span>, <span class="hljs-string">'0'</span>);
  formData.append(<span class="hljs-string">'rankid'</span>, <span class="hljs-string">''</span>);
  formData.append(<span class="hljs-string">'_t'</span>, <span class="hljs-string">'0'</span>);
  formData.append(<span class="hljs-string">'retcode'</span>, retcode || <span class="hljs-string">''</span>);

  <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
  xhr.timeout = <span class="hljs-number">3000</span>;
  xhr.responseType = <span class="hljs-string">"text"</span>;
  xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'http://weibo.com/aj/v6/mblog/forward?ajwvr=6&amp;domain=100505&amp;__rnd='</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime(), <span class="hljs-literal">true</span>);
  xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status == <span class="hljs-number">200</span> || <span class="hljs-keyword">this</span>.status == <span class="hljs-number">304</span>) {
      <span class="hljs-keyword">var</span> data = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-keyword">this</span>.responseText);
      <span class="hljs-keyword">if</span> (data.code == <span class="hljs-string">"100000"</span>) {
        <span class="hljs-comment">// 转发微博成功</span>
        <span class="hljs-built_in">console</span>.log(content);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (data.code == <span class="hljs-string">"100027"</span>) {
        <span class="hljs-comment">// 转发微博失败，需要回答图片验证码的问题</span>
        <span class="hljs-built_in">console</span>.log(data);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 转发微博失败，其他原因</span>
        <span class="hljs-built_in">console</span>.log(data);
      }
    }
  };
  xhr.send(formData);
}
<span class="hljs-comment">//forwardWeibo('转发内容');</span>
<span class="hljs-comment">//forwardWeibo('转发内容',verified('答案'));</span>

<span class="hljs-comment">// 每5秒转发一次</span>
<span class="hljs-keyword">var</span> count = <span class="hljs-number">35000</span>;
setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  forwardWeibo(count++);
}, <span class="hljs-number">5000</span>); </code></pre>
<p>打开 Chrome 开发者工具，切换 tab 到 Console，拷贝上面代码到 Console 中，按回车键即可以「5秒1次」的频率对李笑来老师的这条微博进行转发评论，如需停止请关闭该页面再重新打开。</p>
<p>然而仅过了2分钟，成功转发50多次之后，后面的转发全部失败。经检查发现，由于我转发频率过快，被微博官方暂时封号。回答一些简单的问题把账号解封，我把转发频率由「5秒1次」改为「10秒1次」，因为除我之外还有其他几个号也在用脚本刷，他们大概用「10秒1次」的频率，稳定的转发没有间断过，所以「10秒1次」应该是相对安全的。</p>
<p>我调整频率之后重新开始转发，但还是转发失败，手动操作后发现转发需要输入验证码，以前并没有这个环节，看来刚才的封号是有一些后遗症的。验证码我才不怕，专业的打码服务 <a href="http://www.dama2.com" rel="nofollow noreferrer" target="_blank">打码兔</a> 连12306的验证码都能轻松应付，识别这里的验证码就是小儿科。但接入 <a href="http://www.dama2.com" rel="nofollow noreferrer" target="_blank">打码兔</a> 的工作量有点大，我还是先找找看，有没有更简单的方法。</p>
<p>果然还真被我找到了，虽然转发的时候需要输入验证码，但评论的时候并不用，手动操作一把，评论并转发也能成功，便马上新增了一个评论的方法，具体代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 评论微博，并转发
function commentWeibo(content) {
  var formData = new FormData();
  formData.append('act', 'post');
  formData.append('mid', '4024988475919525');
  formData.append('uid', '1760390531');
  formData.append('forward', '1');
  formData.append('isroot', '0');
  formData.append('content', content);
  formData.append('location', 'page_100505_home');
  formData.append('module', 'scommlist');
  formData.append('group_source', '');
  formData.append('tranandcomm', '1');
  formData.append('pdetail', '1005051576218000');
  formData.append('_t', '0');

  var xhr = new XMLHttpRequest();
  xhr.timeout = 3000;
  xhr.responseType = &quot;text&quot;;
  xhr.open('POST', 'http://weibo.com/aj/v6/comment/add?ajwvr=6&amp;__rnd=' + new Date().getTime(), true);
  xhr.onload = function(e) {
    if (this.status == 200 || this.status == 304) {
      if (this.responseText.code == &quot;100000&quot;) {
        console.log(content);
      } else {
        console.log(this.responseText)
      }
    }
  };
  xhr.send(formData);
}
//commentWeibo('评论内容');

// 每10秒评论一次
var count = 35000;
setInterval(function(){
  forwardWeibo(count++);
}, 10000); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 评论微博，并转发</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">commentWeibo</span>(<span class="hljs-params">content</span>) </span>{
  <span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData();
  formData.append(<span class="hljs-string">'act'</span>, <span class="hljs-string">'post'</span>);
  formData.append(<span class="hljs-string">'mid'</span>, <span class="hljs-string">'4024988475919525'</span>);
  formData.append(<span class="hljs-string">'uid'</span>, <span class="hljs-string">'1760390531'</span>);
  formData.append(<span class="hljs-string">'forward'</span>, <span class="hljs-string">'1'</span>);
  formData.append(<span class="hljs-string">'isroot'</span>, <span class="hljs-string">'0'</span>);
  formData.append(<span class="hljs-string">'content'</span>, content);
  formData.append(<span class="hljs-string">'location'</span>, <span class="hljs-string">'page_100505_home'</span>);
  formData.append(<span class="hljs-string">'module'</span>, <span class="hljs-string">'scommlist'</span>);
  formData.append(<span class="hljs-string">'group_source'</span>, <span class="hljs-string">''</span>);
  formData.append(<span class="hljs-string">'tranandcomm'</span>, <span class="hljs-string">'1'</span>);
  formData.append(<span class="hljs-string">'pdetail'</span>, <span class="hljs-string">'1005051576218000'</span>);
  formData.append(<span class="hljs-string">'_t'</span>, <span class="hljs-string">'0'</span>);

  <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
  xhr.timeout = <span class="hljs-number">3000</span>;
  xhr.responseType = <span class="hljs-string">"text"</span>;
  xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'http://weibo.com/aj/v6/comment/add?ajwvr=6&amp;__rnd='</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime(), <span class="hljs-literal">true</span>);
  xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status == <span class="hljs-number">200</span> || <span class="hljs-keyword">this</span>.status == <span class="hljs-number">304</span>) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.responseText.code == <span class="hljs-string">"100000"</span>) {
        <span class="hljs-built_in">console</span>.log(content);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.responseText)
      }
    }
  };
  xhr.send(formData);
}
<span class="hljs-comment">//commentWeibo('评论内容');</span>

<span class="hljs-comment">// 每10秒评论一次</span>
<span class="hljs-keyword">var</span> count = <span class="hljs-number">35000</span>;
setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  forwardWeibo(count++);
}, <span class="hljs-number">10000</span>); </code></pre>
<p>没高兴几分钟，又发现新的问题，评论成功10条，只有1条转发成功了，这完全是坑爹啊。看来只有接入 <a href="http://www.dama2.com" rel="nofollow noreferrer" target="_blank">打码兔</a>  才能彻底解决问题了，估计要花2、3个小时才能搞定，算了，先吃饭、洗澡再弄。</p>
<p>磨蹭了1、2个小时之后回来，发现微博转发输入验证码的限制已经被取消，但我仍心有余悸，把脚本的频率改为「30秒1次」让它慢慢的跑。然后，埋头研究  <a href="http://www.dama2.com" rel="nofollow noreferrer" target="_blank">打码兔</a> 的 API，注册相关开发者账号，充值测试费用。就在我刚准备写代码之际，脚本又失败了，而且，这次的报错跟以前都不一样，原来是我已经被 <strong>李笑来老师拉黑了</strong>，再也不能转发评论他老人家任何微博了。</p>
<p>本以为会刷几万条微博出来，没想到只刷了200条不到，这些微博就留作纪念不删了。下面是提前准备好的批量删微博的脚本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//删除微博
function deleteWeibo() {
  var items = document.querySelectorAll(&quot;.WB_feed_type&quot;);
  for(var i in items){
    if(items[i].getAttribute){
      var formData = new FormData();
      formData.append('mid', items[i].getAttribute(&quot;mid&quot;));
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://weibo.com/aj/mblog/del?ajwvr=6', false);
      xhr.send(formData);
      console.log(xhr.responseText);
    }
  }
}
deleteWeibo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//删除微博</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deleteWeibo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> items = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">".WB_feed_type"</span>);
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> items){
    <span class="hljs-keyword">if</span>(items[i].getAttribute){
      <span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData();
      formData.append(<span class="hljs-string">'mid'</span>, items[i].getAttribute(<span class="hljs-string">"mid"</span>));
      <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
      xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'http://weibo.com/aj/mblog/del?ajwvr=6'</span>, <span class="hljs-literal">false</span>);
      xhr.send(formData);
      <span class="hljs-built_in">console</span>.log(xhr.responseText);
    }
  }
}
deleteWeibo();</code></pre>
<p>信念瞬间崩塌，思想得到解放，果断去抱着媳妇追 <a href="https://movie.douban.com/subject/3016187/" rel="nofollow noreferrer" target="_blank">权利的游戏</a>，啪啪啪，真是一个美好夜晚。</p>
<p>最后，祝大家国庆节快乐。如果还想听我聊技术（che dan），请关注微信公众号「劼哥舍」，老斯基带你飙车。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
被「李笑来老师」拉黑之「JavaScript微博自动转发的脚本」

## 原文链接
[https://segmentfault.com/a/1190000007062771](https://segmentfault.com/a/1190000007062771)


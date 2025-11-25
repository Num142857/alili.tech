---
title: '浏览器中唤起native app || 跳转到应用商城下载' 
date: 2019-02-08 2:30:40
hidden: true
slug: rztejd97myn
categories: [reprint]
---

{{< raw >}}

                    
<p>前段时间遇到一个小需求：要求在分享出来的h5页面中，有一个立即打开的按钮，如果本地安装了我们的app，那么点击就直接唤起本地app，如果没有安装，则跳转到下载。</p>
<p>因为从来没有做过这个需求，因此这注定是一个苦逼的调研过程。</p>
<p>我们最开始就面临2个问题：一是如何唤起本地app，二是如何判断浏览器是否安装了对应app。</p>
<h5>如何唤起本地app</h5>
<p>首先，想要实现这个需求，肯定是必须要客户端同学的配合才行，因此我们不用知道所有的实现细节，我们从前端角度思考看这个问题，需要知道的一点是，ios与Android都支持一种叫做schema协议的链接。比如网易新闻客户端的协议为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="newsapp://xxxxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span><span class="hljs-type">sapp</span>:<span class="hljs-comment">//xxxxx</span></code></pre>
<p>当然，这个协议不需要我们前端去实现，我们只需要将协议放在a标签的href属性里，或者使用location.href与iframe来实现激活这个链接。而location.href与iframe是解决这个需求的关键。</p>
<p>在ios中，还支持通过<code>smart app banner</code>来唤起app，即通过一个meta标签，在标签里带上app的信息，和打开后的行为，代码形如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;apple-itunes-app&quot; content=&quot;app-id=1023600494, app-argument=tigerbrokersusstock://com.tigerbrokers.usstock/post?postId=7125&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-itunes-app"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"app-id=1023600494, app-argument=tigerbrokersusstock://com.tigerbrokers.usstock/post?postId=7125"</span> /&gt;</span></code></pre>
<p>我们还需要知道的一点是，微信里屏蔽了schema协议。除非你是微信的合作伙伴之类的，他们专门给你配置进白名单。否则我们就没办法通过这个协议在微信中直接唤起app。</p>
<p>因此我们会判断页面场景是否在微信中，如果在微信中，则会提示用户在浏览器中打开。</p>
<h5>如何判断本地是否安装了app</h5>
<p>很无奈的是，在浏览器中无法明确的判断本地是否安装了app。因此我们必须采取一些取巧的思路来解决这个问题。</p>
<p>我们能够很容易想到，采用设置一个延迟定时器setTimeout的方式，第一时间尝试唤起app，如果200ms没有唤起成功，则默认本地没有安装app，200ms以后，将会触发下载行为。</p>
<p>结合这个思路，我们来全局考虑一下这个需求应该采用什么样的方案来实现它。</p>
<p>使用location.href的同学可能会面临一个担忧，在有的浏览器中，当我们尝试激活schema link的时候，若本地没有安装app，则会跳转到一个浏览器默认的错误页面去了。因此大多数人采用的解决方案都是使用iframe</p>
<blockquote>测试了很多浏览器，没有发现过这种情况</blockquote>
<p>后来观察了网易新闻，今日头条，YY等的实现方案，发现大家都采用的是iframe来实现。好吧，面对这种情况，只能屈服。</p>
<p>整理一下目前的思路，得到下面的解决方案</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = {
  open: 'app://xxxxx',
  down: 'xxxxxxxx'
};
var iframe = document.createElement('iframe');
var body = document.body;
iframe.style.cssText='display:none;width=0;height=0';
var timer = null;

// 立即打开的按钮
var openapp = document.getElementById('openapp');
openapp.addEventListener('click', function() {
  if(/MicroMessenger/gi.test(navigator.userAgent) {
    // 引导用户在浏览器中打开
  }) else{
    body.appendChild(iframe);
    iframe.src = url.open;
    timer = setTimeout(function() {
      wondow.location.href = url.down;
    }, 500);
  }
}, false)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> url = {
  <span class="hljs-attr">open</span>: <span class="hljs-string">'app://xxxxx'</span>,
  <span class="hljs-attr">down</span>: <span class="hljs-string">'xxxxxxxx'</span>
};
<span class="hljs-keyword">var</span> iframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>);
<span class="hljs-keyword">var</span> body = <span class="hljs-built_in">document</span>.body;
iframe.style.cssText=<span class="hljs-string">'display:none;width=0;height=0'</span>;
<span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;

<span class="hljs-comment">// 立即打开的按钮</span>
<span class="hljs-keyword">var</span> openapp = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'openapp'</span>);
openapp.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/MicroMessenger/gi</span>.test(navigator.userAgent) {
    <span class="hljs-comment">// 引导用户在浏览器中打开</span>
  }) <span class="hljs-keyword">else</span>{
    body.appendChild(iframe);
    iframe.src = url.open;
    timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      wondow.location.href = url.down;
    }, <span class="hljs-number">500</span>);
  }
}, <span class="hljs-literal">false</span>)
</code></pre>
<p>想法很美好，现实很残酷。一测试，就发现简单的这样实现有许多的问题。</p>
<p>第一个问题在于，当页面成功唤起app之后，我们再切换回来浏览器，发现跳转到了下载页面。</p>
<p>为了解决这个问题，发现各个公司都进行了不同方式的尝试。</p>
<p>也是历经的很多折磨，发现了几个比较有用的事件。</p>
<p>pageshow： 页面显示时触发，在load事件之后触发。需要将该事件绑定到window上才会触发</p>
<p>pagehide: 页面隐藏时触发</p>
<p>visibilitychange： 页面隐藏没有在当前显示时触发，比如切换tab，也会触发该事件</p>
<p>document.hidden 当页面隐藏时，该值为true，显示时为false</p>
<p>由于各个浏览器的支持情况不同，我们需要将这些事件都给绑定上，即使这样，也不一定能够保证所有的浏览器都能够解决掉这个小问题，实在没办法的事情就不管了。</p>
<p>因此需要扩充一下上面的方案，当本地app被唤起，则页面会隐藏掉，就会触发pagehide与visibilitychange事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).on('visibilitychange webkitvisibilitychange', function() {
    var tag = document.hidden || document.webkitHidden;
    if (tag) {
        clearTimeout(timer);
    }
})

$(window).on('pagehide', function() {
    clearTimeout(timer);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-built_in">document</span>).on(<span class="hljs-string">'visibilitychange webkitvisibilitychange'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> tag = <span class="hljs-built_in">document</span>.hidden || <span class="hljs-built_in">document</span>.webkitHidden;
    <span class="hljs-keyword">if</span> (tag) {
        clearTimeout(timer);
    }
})

$(<span class="hljs-built_in">window</span>).on(<span class="hljs-string">'pagehide'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    clearTimeout(timer);
})</code></pre>
<p>而另外一个问题就是IOS9+下面的问题了。ios9的Safari，根本不支持通过iframe跳转到其他页面去。也就是说，在safari下，我的整体方案被全盘否决！</p>
<p>于是我就只能尝试使用location.href的方式，这个方式能够唤起app，但是有一个坑爹的问题，使用schema协议唤起app会有弹窗而不会直接跳转去app！甚至当本地没有app时，会被判断为链接无效，然后还有一个弹窗。</p>
<p>这个弹窗会造成什么问题呢？如果用户不点确认按钮，根据上面的逻辑，这个时候就会发现页面会自动跳转到下载去了。而且无效的弹窗提示在用户体验上是不允许出现的。</p>
<p>好吧，继续扒别人的代码，看看别人是如何实现的。然后我又去观摩了其他公司的实现结果，发现网易新闻，今日头条都可以在ios直接从微信中唤起app。真是神奇了，可是今日头条在Android版微信上也没办法直接唤起的，他们在Android上都是直接到腾讯应用宝的下载里去。所以按道理来说这不是添加了白名单。</p>
<p>为了找到这个问题的解决方案，我在网易新闻的页面中扒出了他们的代码，并整理如下，添加了部分注释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
window.NRUM = window.NRUM || {};
window.NRUM.config = {
    key:'27e86c0843344caca7ba9ea652d7948d',
    clientStart: +new Date()
};
(function() {
    var n = document.getElementsByTagName('script')[0],
        s = document.createElement('script');

    s.type = 'text/javascript';
    s.async = true;
    s.src = '//nos.netease.com/apmsdk/napm-web-min-1.1.3.js';
    n.parentNode.insertBefore(s, n);
})();


;
(function(window,doc){

    // http://apm.netease.com/manual?api=web
    NRUM.mark &amp;&amp; NRUM.mark('pageload', true)

    var list = []
    var config = null

    // jsonp
    function jsonp(a, b, c) {
        var d;
        d = document.createElement('script');
        d.src = a;
        c &amp;&amp; (d.charset = c);
        d.onload = function() {
            this.onload = this.onerror = null;
            this.parentNode.removeChild(this);
            b &amp;&amp; b(!0);
        };
        d.onerror = function() {
            this.onload = this.onerror = null;
            this.parentNode.removeChild(this);
            b &amp;&amp; b(!1);
        };
        document.head.appendChild(d);
    };


    function localParam(search,hash){
        search = search || window.location.search;
        hash = hash || window.location.hash;
        var fn = function(str,reg){
            if(str){
                var data = {};
                str.replace(reg,function( $0, $1, $2, $3 ){
                    data[ $1 ] = $3;
                });
                return data;
            }
        }
        return {search: fn(search,new RegExp( &quot;([^?=&amp;]+)(=([^&amp;]*))?&quot;, &quot;g&quot; ))||{},hash: fn(hash,new RegExp( &quot;([^#=&amp;]+)(=([^&amp;]*))?&quot;, &quot;g&quot; ))||{"}}";
    }

    jsonp('http://active.163.com/service/form/v1/5847/view/1047.jsonp')

    window.search = localParam().search
    window._callback = function(data) {
        window._callback = null
        list = data.list
        if(search.s &amp;&amp; !!search.s.match(/^wap/i)) {
            config = list.filter(function(item){
                return item.type === 'wap'
            })[0]
            return
        }
        config = list.filter(function(item){
            return item.type === search.s
        })[0]
    }

    var isAndroid = !!navigator.userAgent.match(/android/ig),
        isIos = !!navigator.userAgent.match(/iphone|ipod/ig),
        isIpad = !!navigator.userAgent.match(/ipad/ig),
        isIos9 = !!navigator.userAgent.match(/OS 9/ig),
        isYx = !!navigator.userAgent.match(/MailMaster_Android/i),
        isNewsapp = !!navigator.userAgent.match(/newsapp/i),
        isWeixin = (/MicroMessenger/ig).test(navigator.userAgent),
        isYixin = (/yixin/ig).test(navigator.userAgent),
        isQQ = (/qq/ig).test(navigator.userAgent),
        params = localParam().search,
        url = 'newsapp://',
        iframe = document.getElementById('iframe');

    var isIDevicePhone = (/iphone|ipod/gi).test(navigator.platform);
    var isIDeviceIpad = !isIDevicePhone &amp;&amp; (/ipad/gi).test(navigator.platform);
    var isIDevice = isIDevicePhone || isIDeviceIpad;
    var isandroid2_x = !isIDevice &amp;&amp; (/android\s?2\./gi).test(navigator.userAgent);
    var isIEMobile = !isIDevice &amp;&amp; !isAndroid &amp;&amp; (/MSIE/gi).test(navigator.userAgent);
    var android_url = (!isandroid2_x) ? &quot;http://3g.163.com/links/4304&quot; : &quot;http://3g.163.com/links/6264&quot;;
    var ios_url = &quot;http://3g.163.com/links/3615&quot;;
    var wphone_url = &quot;http://3g.163.com/links/3614&quot;;
    var channel = params.s || 'newsapp'

    // 判断在不同环境下app的url
    if(params.docid){
        if(params['boardid'] &amp;&amp; params['title']){
            url = url + 'comment/' + params.boardid + '/' + params.docid + '/' + params.title
        }else{
            url = url + 'doc/' + params.docid
        }
    }else if(params.sid){
        url = url + 'topic/' + params.sid
    }else if(params.pid){
        var pid = params.pid.split('_')
        url = url + 'photo/' + pid[0] + '/' + pid[1]
    }else if(params.vid){
        url = url + 'video/' + params.vid
    }else if(params.liveRoomid){
        url = url + 'live/' + params.liveRoomid
    }else if(params.url){
        url = url + 'web/' + decodeURIComponent(params.url)
    }else if(params.expertid){
        url = url + 'expert/' + params.expertid
    }else if(params.subjectid){
        url = url + 'subject/' + params.subjectid
    }else if(params.readerid){
        url = url + 'reader/' + params.readerid
    }else{
        url += 'startup'
    }
    if(url.indexOf('?') >= 0){
        url += '&amp;s=' + (params.s || 'sps')
    }else{
        url += '?s=' + (params.s || 'sps')
    }

    // ios &amp;&amp; 易信  用iframe 打开
    if((isIos||isIpad) &amp;&amp; navigator.userAgent.match(/yixin/i)) {
        document.getElementById('iframe').src = url;
    }

    var height = document.documentElement.clientHeight;

    // 通常情况下先尝试使用iframe打开
    document.getElementById('iframe').src = url;

    // 移动端浏览器中，将下载页面显示出来
    if(!isWeixin &amp;&amp; !isQQ &amp;&amp; !isYixin &amp;&amp; !isYx){
        document.querySelector('.main-body').style.display = 'block'
        if(isIos9){
            document.querySelector('.main-body').classList.add('showtip')
        }

        setTimeout(function(){
            document.body.scrollTop = 0
        },200)
    }else{
        document.getElementById('guide').style.display = 'block'
    }

    // Forward To Redirect Url
    // Add by zhanzhixiang 12/28/2015
    if (params.redirect) {
        var redirectUrl = decodeURIComponent(params.redirect);
        if ( typeof(URL) === 'function' &amp;&amp; new URL(redirectUrl).hostname.search(&quot;163.com&quot;) !== -1) {
            window.location.href = redirectUrl;
        } else if (redirectUrl.search(&quot;163.com&quot;) !== -1){
            window.location.href = redirectUrl;
        };
    }

    // Forward To Redirect Url End
    if ((isWeixin || isQQ) &amp;&amp; isAndroid) {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.netease.newsreader.activity&amp;ckey=CK1331205846719&amp;android_schema=' +　url.match(/(.*)\?/)[1]
    }

    if(isIos||isIpad){
        document.getElementById(&quot;guide&quot;).classList.add('iosguideopen')
    }else if (isAndroid){
        document.getElementById(&quot;guide&quot;).classList.add('androidguideopen')
    }else{
        // window.location.href = 'http://www.163.com/newsapp'
    }

    document.getElementById('link').addEventListener('click', function(){

        // 统计
        neteaseTracker &amp;&amp; neteaseTracker(false,'http://sps.163.com/func/?func=downloadapp&amp;modelid='+modelid+'&amp;spst='+spst+'&amp;spsf&amp;spss=' + channel,'', 'sps' )

        if (config) {
            android_url = config.android
        }
        if (config &amp;&amp; config.iOS) {
            ios_url = config.iOS
        }
        if(isWeixin || isQQ){
            return
        }
        var msg = isIDeviceIpad ? &quot;检测到您正在使用iPad, 是否直接前往AppStore下载?&quot; : &quot;检测到您正在使用iPhone, 是否直接前往AppStore下载?&quot;;
        if (isIDevice){
            window.location = ios_url;
            return;
        }else if(isAndroid){
            // uc浏览器用iframe唤醒
            if(navigator.userAgent.match(/ucbrowser|yixin|MailMaster/i)){
                document.getElementById('iframe').src = url;
            } else {
                window.location.href = url;
            }
            setTimeout(function(){
                if(document.webkitHidden) {
                    return
                }
                if (confirm(&quot;检测到您正在使用Android 手机，是否直接下载程序安装包？&quot;)) {
                    neteaseTracker &amp;&amp; neteaseTracker(false,'http://sps.163.com/func/?func=downloadapp_pass&amp;modelid='+modelid+'&amp;spst='+spst+'&amp;spsf&amp;spss=' + channel,'', 'sps' )
                    window.location.href = android_url;
                } else {
                    neteaseTracker &amp;&amp; neteaseTracker(false,'http://sps.163.com/func/?func=downloadapp_cancel&amp;modelid='+modelid+'&amp;spst='+spst+'&amp;spsf&amp;spss=' + channel,'', 'sps' )
                }
            },200)
            return;
        }else if(isIEMobile){
            window.location = wphone_url;
            return;
        }else{
            window.open('http://www.163.com/special/00774IQ6/newsapp_download.html');
            return;
        }
    }, false)

    setTimeout(function(){
        if(isIDevice &amp;&amp; params.notdownload != 1 &amp;&amp; !isNewsapp &amp;&amp; !isIos9){
            document.getElementById('link').click()
        }
    }, 1000)

})(window,document);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-built_in">window</span>.NRUM = <span class="hljs-built_in">window</span>.NRUM || {};
<span class="hljs-built_in">window</span>.NRUM.config = {
    <span class="hljs-attr">key</span>:<span class="hljs-string">'27e86c0843344caca7ba9ea652d7948d'</span>,
    <span class="hljs-attr">clientStart</span>: +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
};
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> n = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'script'</span>)[<span class="hljs-number">0</span>],
        s = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);

    s.type = <span class="hljs-string">'text/javascript'</span>;
    s.async = <span class="hljs-literal">true</span>;
    s.src = <span class="hljs-string">'//nos.netease.com/apmsdk/napm-web-min-1.1.3.js'</span>;
    n.parentNode.insertBefore(s, n);
})();


;
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">window,doc</span>)</span>{

    <span class="hljs-comment">// http://apm.netease.com/manual?api=web</span>
    NRUM.mark &amp;&amp; NRUM.mark(<span class="hljs-string">'pageload'</span>, <span class="hljs-literal">true</span>)

    <span class="hljs-keyword">var</span> list = []
    <span class="hljs-keyword">var</span> config = <span class="hljs-literal">null</span>

    <span class="hljs-comment">// jsonp</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">jsonp</span>(<span class="hljs-params">a, b, c</span>) </span>{
        <span class="hljs-keyword">var</span> d;
        d = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
        d.src = a;
        c &amp;&amp; (d.charset = c);
        d.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.onload = <span class="hljs-keyword">this</span>.onerror = <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">this</span>.parentNode.removeChild(<span class="hljs-keyword">this</span>);
            b &amp;&amp; b(!<span class="hljs-number">0</span>);
        };
        d.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.onload = <span class="hljs-keyword">this</span>.onerror = <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">this</span>.parentNode.removeChild(<span class="hljs-keyword">this</span>);
            b &amp;&amp; b(!<span class="hljs-number">1</span>);
        };
        <span class="hljs-built_in">document</span>.head.appendChild(d);
    };


    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">localParam</span>(<span class="hljs-params">search,hash</span>)</span>{
        search = search || <span class="hljs-built_in">window</span>.location.search;
        hash = hash || <span class="hljs-built_in">window</span>.location.hash;
        <span class="hljs-keyword">var</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str,reg</span>)</span>{
            <span class="hljs-keyword">if</span>(str){
                <span class="hljs-keyword">var</span> data = {};
                str.replace(reg,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> $<span class="hljs-number">0</span>, $<span class="hljs-number">1</span>, $<span class="hljs-number">2</span>, $<span class="hljs-number">3</span> </span>)</span>{
                    data[ $<span class="hljs-number">1</span> ] = $<span class="hljs-number">3</span>;
                });
                <span class="hljs-keyword">return</span> data;
            }
        }
        <span class="hljs-keyword">return</span> {<span class="hljs-attr">search</span>: fn(search,<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>( <span class="hljs-string">"([^?=&amp;]+)(=([^&amp;]*))?"</span>, <span class="hljs-string">"g"</span> ))||{},<span class="hljs-attr">hash</span>: fn(hash,<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>( <span class="hljs-string">"([^#=&amp;]+)(=([^&amp;]*))?"</span>, <span class="hljs-string">"g"</span> ))||{"}}";
    }

    jsonp(<span class="hljs-string">'http://active.163.com/service/form/v1/5847/view/1047.jsonp'</span>)

    <span class="hljs-built_in">window</span>.search = localParam().search
    <span class="hljs-built_in">window</span>._callback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">window</span>._callback = <span class="hljs-literal">null</span>
        list = data.list
        <span class="hljs-keyword">if</span>(search.s &amp;&amp; !!search.s.match(<span class="hljs-regexp">/^wap/i</span>)) {
            config = list.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
                <span class="hljs-keyword">return</span> item.type === <span class="hljs-string">'wap'</span>
            })[<span class="hljs-number">0</span>]
            <span class="hljs-keyword">return</span>
        }
        config = list.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
            <span class="hljs-keyword">return</span> item.type === search.s
        })[<span class="hljs-number">0</span>]
    }

    <span class="hljs-keyword">var</span> isAndroid = !!navigator.userAgent.match(<span class="hljs-regexp">/android/ig</span>),
        isIos = !!navigator.userAgent.match(<span class="hljs-regexp">/iphone|ipod/ig</span>),
        isIpad = !!navigator.userAgent.match(<span class="hljs-regexp">/ipad/ig</span>),
        isIos9 = !!navigator.userAgent.match(<span class="hljs-regexp">/OS 9/ig</span>),
        isYx = !!navigator.userAgent.match(<span class="hljs-regexp">/MailMaster_Android/i</span>),
        isNewsapp = !!navigator.userAgent.match(<span class="hljs-regexp">/newsapp/i</span>),
        isWeixin = (<span class="hljs-regexp">/MicroMessenger/ig</span>).test(navigator.userAgent),
        isYixin = (<span class="hljs-regexp">/yixin/ig</span>).test(navigator.userAgent),
        isQQ = (<span class="hljs-regexp">/qq/ig</span>).test(navigator.userAgent),
        params = localParam().search,
        url = <span class="hljs-string">'newsapp://'</span>,
        iframe = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'iframe'</span>);

    <span class="hljs-keyword">var</span> isIDevicePhone = (<span class="hljs-regexp">/iphone|ipod/gi</span>).test(navigator.platform);
    <span class="hljs-keyword">var</span> isIDeviceIpad = !isIDevicePhone &amp;&amp; (<span class="hljs-regexp">/ipad/gi</span>).test(navigator.platform);
    <span class="hljs-keyword">var</span> isIDevice = isIDevicePhone || isIDeviceIpad;
    <span class="hljs-keyword">var</span> isandroid2_x = !isIDevice &amp;&amp; (<span class="hljs-regexp">/android\s?2\./gi</span>).test(navigator.userAgent);
    <span class="hljs-keyword">var</span> isIEMobile = !isIDevice &amp;&amp; !isAndroid &amp;&amp; (<span class="hljs-regexp">/MSIE/gi</span>).test(navigator.userAgent);
    <span class="hljs-keyword">var</span> android_url = (!isandroid2_x) ? <span class="hljs-string">"http://3g.163.com/links/4304"</span> : <span class="hljs-string">"http://3g.163.com/links/6264"</span>;
    <span class="hljs-keyword">var</span> ios_url = <span class="hljs-string">"http://3g.163.com/links/3615"</span>;
    <span class="hljs-keyword">var</span> wphone_url = <span class="hljs-string">"http://3g.163.com/links/3614"</span>;
    <span class="hljs-keyword">var</span> channel = params.s || <span class="hljs-string">'newsapp'</span>

    <span class="hljs-comment">// 判断在不同环境下app的url</span>
    <span class="hljs-keyword">if</span>(params.docid){
        <span class="hljs-keyword">if</span>(params[<span class="hljs-string">'boardid'</span>] &amp;&amp; params[<span class="hljs-string">'title'</span>]){
            url = url + <span class="hljs-string">'comment/'</span> + params.boardid + <span class="hljs-string">'/'</span> + params.docid + <span class="hljs-string">'/'</span> + params.title
        }<span class="hljs-keyword">else</span>{
            url = url + <span class="hljs-string">'doc/'</span> + params.docid
        }
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(params.sid){
        url = url + <span class="hljs-string">'topic/'</span> + params.sid
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(params.pid){
        <span class="hljs-keyword">var</span> pid = params.pid.split(<span class="hljs-string">'_'</span>)
        url = url + <span class="hljs-string">'photo/'</span> + pid[<span class="hljs-number">0</span>] + <span class="hljs-string">'/'</span> + pid[<span class="hljs-number">1</span>]
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(params.vid){
        url = url + <span class="hljs-string">'video/'</span> + params.vid
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(params.liveRoomid){
        url = url + <span class="hljs-string">'live/'</span> + params.liveRoomid
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(params.url){
        url = url + <span class="hljs-string">'web/'</span> + <span class="hljs-built_in">decodeURIComponent</span>(params.url)
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(params.expertid){
        url = url + <span class="hljs-string">'expert/'</span> + params.expertid
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(params.subjectid){
        url = url + <span class="hljs-string">'subject/'</span> + params.subjectid
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(params.readerid){
        url = url + <span class="hljs-string">'reader/'</span> + params.readerid
    }<span class="hljs-keyword">else</span>{
        url += <span class="hljs-string">'startup'</span>
    }
    <span class="hljs-keyword">if</span>(url.indexOf(<span class="hljs-string">'?'</span>) &gt;= <span class="hljs-number">0</span>){
        url += <span class="hljs-string">'&amp;s='</span> + (params.s || <span class="hljs-string">'sps'</span>)
    }<span class="hljs-keyword">else</span>{
        url += <span class="hljs-string">'?s='</span> + (params.s || <span class="hljs-string">'sps'</span>)
    }

    <span class="hljs-comment">// ios &amp;&amp; 易信  用iframe 打开</span>
    <span class="hljs-keyword">if</span>((isIos||isIpad) &amp;&amp; navigator.userAgent.match(<span class="hljs-regexp">/yixin/i</span>)) {
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'iframe'</span>).src = url;
    }

    <span class="hljs-keyword">var</span> height = <span class="hljs-built_in">document</span>.documentElement.clientHeight;

    <span class="hljs-comment">// 通常情况下先尝试使用iframe打开</span>
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'iframe'</span>).src = url;

    <span class="hljs-comment">// 移动端浏览器中，将下载页面显示出来</span>
    <span class="hljs-keyword">if</span>(!isWeixin &amp;&amp; !isQQ &amp;&amp; !isYixin &amp;&amp; !isYx){
        <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.main-body'</span>).style.display = <span class="hljs-string">'block'</span>
        <span class="hljs-keyword">if</span>(isIos9){
            <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.main-body'</span>).classList.add(<span class="hljs-string">'showtip'</span>)
        }

        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">document</span>.body.scrollTop = <span class="hljs-number">0</span>
        },<span class="hljs-number">200</span>)
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'guide'</span>).style.display = <span class="hljs-string">'block'</span>
    }

    <span class="hljs-comment">// Forward To Redirect Url</span>
    <span class="hljs-comment">// Add by zhanzhixiang 12/28/2015</span>
    <span class="hljs-keyword">if</span> (params.redirect) {
        <span class="hljs-keyword">var</span> redirectUrl = <span class="hljs-built_in">decodeURIComponent</span>(params.redirect);
        <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span>(URL) === <span class="hljs-string">'function'</span> &amp;&amp; <span class="hljs-keyword">new</span> URL(redirectUrl).hostname.search(<span class="hljs-string">"163.com"</span>) !== <span class="hljs-number">-1</span>) {
            <span class="hljs-built_in">window</span>.location.href = redirectUrl;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (redirectUrl.search(<span class="hljs-string">"163.com"</span>) !== <span class="hljs-number">-1</span>){
            <span class="hljs-built_in">window</span>.location.href = redirectUrl;
        };
    }

    <span class="hljs-comment">// Forward To Redirect Url End</span>
    <span class="hljs-keyword">if</span> ((isWeixin || isQQ) &amp;&amp; isAndroid) {
        <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">'http://a.app.qq.com/o/simple.jsp?pkgname=com.netease.newsreader.activity&amp;ckey=CK1331205846719&amp;android_schema='</span> +　url.match(<span class="hljs-regexp">/(.*)\?/</span>)[<span class="hljs-number">1</span>]
    }

    <span class="hljs-keyword">if</span>(isIos||isIpad){
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"guide"</span>).classList.add(<span class="hljs-string">'iosguideopen'</span>)
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isAndroid){
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"guide"</span>).classList.add(<span class="hljs-string">'androidguideopen'</span>)
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-comment">// window.location.href = 'http://www.163.com/newsapp'</span>
    }

    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'link'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

        <span class="hljs-comment">// 统计</span>
        neteaseTracker &amp;&amp; neteaseTracker(<span class="hljs-literal">false</span>,<span class="hljs-string">'http://sps.163.com/func/?func=downloadapp&amp;modelid='</span>+modelid+<span class="hljs-string">'&amp;spst='</span>+spst+<span class="hljs-string">'&amp;spsf&amp;spss='</span> + channel,<span class="hljs-string">''</span>, <span class="hljs-string">'sps'</span> )

        <span class="hljs-keyword">if</span> (config) {
            android_url = config.android
        }
        <span class="hljs-keyword">if</span> (config &amp;&amp; config.iOS) {
            ios_url = config.iOS
        }
        <span class="hljs-keyword">if</span>(isWeixin || isQQ){
            <span class="hljs-keyword">return</span>
        }
        <span class="hljs-keyword">var</span> msg = isIDeviceIpad ? <span class="hljs-string">"检测到您正在使用iPad, 是否直接前往AppStore下载?"</span> : <span class="hljs-string">"检测到您正在使用iPhone, 是否直接前往AppStore下载?"</span>;
        <span class="hljs-keyword">if</span> (isIDevice){
            <span class="hljs-built_in">window</span>.location = ios_url;
            <span class="hljs-keyword">return</span>;
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(isAndroid){
            <span class="hljs-comment">// uc浏览器用iframe唤醒</span>
            <span class="hljs-keyword">if</span>(navigator.userAgent.match(<span class="hljs-regexp">/ucbrowser|yixin|MailMaster/i</span>)){
                <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'iframe'</span>).src = url;
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-built_in">window</span>.location.href = url;
            }
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">if</span>(<span class="hljs-built_in">document</span>.webkitHidden) {
                    <span class="hljs-keyword">return</span>
                }
                <span class="hljs-keyword">if</span> (confirm(<span class="hljs-string">"检测到您正在使用Android 手机，是否直接下载程序安装包？"</span>)) {
                    neteaseTracker &amp;&amp; neteaseTracker(<span class="hljs-literal">false</span>,<span class="hljs-string">'http://sps.163.com/func/?func=downloadapp_pass&amp;modelid='</span>+modelid+<span class="hljs-string">'&amp;spst='</span>+spst+<span class="hljs-string">'&amp;spsf&amp;spss='</span> + channel,<span class="hljs-string">''</span>, <span class="hljs-string">'sps'</span> )
                    <span class="hljs-built_in">window</span>.location.href = android_url;
                } <span class="hljs-keyword">else</span> {
                    neteaseTracker &amp;&amp; neteaseTracker(<span class="hljs-literal">false</span>,<span class="hljs-string">'http://sps.163.com/func/?func=downloadapp_cancel&amp;modelid='</span>+modelid+<span class="hljs-string">'&amp;spst='</span>+spst+<span class="hljs-string">'&amp;spsf&amp;spss='</span> + channel,<span class="hljs-string">''</span>, <span class="hljs-string">'sps'</span> )
                }
            },<span class="hljs-number">200</span>)
            <span class="hljs-keyword">return</span>;
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(isIEMobile){
            <span class="hljs-built_in">window</span>.location = wphone_url;
            <span class="hljs-keyword">return</span>;
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-built_in">window</span>.open(<span class="hljs-string">'http://www.163.com/special/00774IQ6/newsapp_download.html'</span>);
            <span class="hljs-keyword">return</span>;
        }
    }, <span class="hljs-literal">false</span>)

    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(isIDevice &amp;&amp; params.notdownload != <span class="hljs-number">1</span> &amp;&amp; !isNewsapp &amp;&amp; !isIos9){
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'link'</span>).click()
        }
    }, <span class="hljs-number">1000</span>)

})(<span class="hljs-built_in">window</span>,<span class="hljs-built_in">document</span>);
</code></pre>
<p>虽然有一些外部的引用，和一些搞不懂是干什么用的方法和变量，但是基本逻辑还是能够看明白。好像也没有什么特别的地方。研究了许久，看到了一个jsonp请求很奇特。这是来干嘛用的？</p>
<p>于是费尽千辛万苦，搜索了很多文章，最终锁定了一个关键的名词 <strong>Universal links</strong>。</p>
<p>如果我早知道这个名词，那么问题就不会变的那么束手无策。所以这个东西是什么呢？</p>
<blockquote>Apple为iOS 9发布了一个所谓的通用链接的深层链接特性，即Universal links。虽然它并不完美，但是这一发布，让数以千计的应用开发人员突然意识到自己的应用体验被打破。<p>Universal links，一种能够方便的通过传统的HTTP/HTTPS 链接来启动App，使用相同的网址打开网站和App。</p>
</blockquote>
<p>关于这个问题的提问与universal links的介绍 <a href="http://stackoverflow.com/questions/31891777/ios-9-safari-iframe-src-with-custom-url-scheme-not-working" rel="nofollow noreferrer" target="_blank">点击这里查看</a></p>
<p>ios9推行的一个新的协议！ </p>
<p>关于本文的这个问题，国内的论坛有许许多多的文章来解决，但是提到universal links的文章少之又少，而我想吐槽的是，我们的ios开发也尼玛不知道这个名词，搞什么鬼。他改变了用户体验的关键在于，微信没有屏蔽这个协议。因此如果我们的app注册了这个协议，那么我们就能够从微信中直接唤起app。</p>
<p>这个时候我就发现，上面贴的网易新闻代码中的jsonp请求的内容，就是这个协议必须的一个叫做<code>apple-app-site-association</code>的JSON文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
   &quot;applinks&quot;: {
       &quot;apps&quot;: [ ],
       &quot;details&quot;: {
           &quot;TEAM-IDENTIFIER.YOUR.BUNDLE.IDENTIFIER&quot;: {
               &quot;paths&quot;: [
                   &quot;*&quot;
               ]
           }
       }
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
   <span class="hljs-string">"applinks"</span>: {
       <span class="hljs-string">"apps"</span>: [ ],
       <span class="hljs-string">"details"</span>: {
           <span class="hljs-string">"TEAM-IDENTIFIER.YOUR.BUNDLE.IDENTIFIER"</span>: {
               <span class="hljs-string">"paths"</span>: [
                   <span class="hljs-string">"*"</span>
               ]
           }
       }
   }
}</code></pre>
<p>大家可以直接访问这个链接，查看里面的内容</p>
<p><a href="http://active.163.com/service/form/v1/5847/view/1047.jsonp" rel="nofollow noreferrer" target="_blank">http://active.163.com/service...</a></p>
<p>至于universal links具体如何实现，让ios的同学去搞定吧，这里提供两个参考文章</p>
<p><a href="http://www.cocoachina.com/bbs/read.php?tid-1486368.html" rel="nofollow noreferrer" target="_blank">http://www.cocoachina.com/bbs...</a></p>
<p><a href="https://blog.branch.io/how-to-setup-universal-links-to-deep-link-on-apple-ios-9" rel="nofollow noreferrer" target="_blank">https://blog.branch.io/how-to...</a></p>
<p>支持了这个协议之后，我们又可以通过iframe来唤起app了，因此基本逻辑就是这样了。</p>
<p>但是！并不是就没有坑了。</p>
<p>universal links还有一个大坑，就是如果想要通过universal links只在在微信中打开app，同一个页面我们还得使用不同的两个域名。</p>
<p>这个特性虽然有点坑，但是通过这个特性却能够完美判断本地是否安装了你们的app。</p>
<p>比如我们正常访问当前页面的域名为A，对应的页面url为A+，而当我们点击按钮，需要打开app用到的域名为B，，对应的页面url为B+。</p>
<p>A与B都被注册成为了对应app的universal links，A+ 与 B+ 都指向同一个页面。 </p>
<p>我们通过js判断，如果是通过B+访问的该页面，则直接跳去下载app。这样，当我们从A+通过点击访问B+时，如果universal links生效并且本地安装了对应的app，app会直接被打开。如果本地没有安装App，则会直接执行刚才B+中跳去下载的设定。</p>
<p>OK，这个问题，几乎所有的坑我都在上面说到了，如果想要做好兼容，就是一个针对每个坑做最优选择了，这是一个工作量的问题。</p>
<p>不过最终的调研结果是</p>
<p><strong>没有完美的解决方案</strong></p>
<p>就算是网易新闻，这个按钮在使用过程中也会有一些小bug，无法做到完美的状态。</p>
<p>因为我们面临许多没办法解决的问题，比如无法真正意义上的判断本地是否安装了app，pageshow，pagehide并不是所有的浏览器都支持等。很多其他博客里面，什么计算时间差等方案，我花了很久的时间去研究这个方案，结果是，根！本！没！有！用！</p>
<p>老实说，从微信中跳转到外部浏览器，并不是一个好的解决方案，这样会导致很多用户流失，因此大家都在ios上实现了universal links。</p>
<p>网易新闻的逻辑是，点击打开会跳转到一个下载页面，这个下载页面一加载完成就尝试打开app，如果打开了就直接跑到app里面去了，如果没有就在页面上有一个立即下载的按钮，按钮行只有下载处理。</p>
<p>这个问题就总结到这里，如果大家有更好的方案，欢迎与我沟通。</p>
<blockquote>不用折腾universal link了，微信已经禁用 ~   2018-01-08</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浏览器中唤起native app || 跳转到应用商城下载

## 原文链接
[https://segmentfault.com/a/1190000005848133](https://segmentfault.com/a/1190000005848133)


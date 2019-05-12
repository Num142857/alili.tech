---
title: 'H5的Notification特性 - Web的桌面通知功能' 
date: 2018-12-25 2:30:11
hidden: true
slug: niskxu4tgfk
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文发布在我的博客<a href="https://2ue.github.io/2017/10/16/desktop-notification/" rel="nofollow noreferrer" target="_blank">H5的Notification特性 - Web的桌面通知功能</a><br>许可协议: 署名-非商业性使用-禁止演绎 4.0 国际    转载请保留原文链接及作者。</p></blockquote>
<hr>
<blockquote><p>目前，<code>web</code>网页使用桌面通知功能的越来越多，包括微博，腾讯视频等大厂站，桌面通知功能是<code>H5</code>的一个<code>API</code> - <code>Notifications</code>。它允许网页或应用程序可以发出通知，通知将被显示在页面之外的系统层面上（通常使用操作系统的标准通知机制，但是在不同的平台和浏览器上的表现会有差异），这样即使应用程序空闲或在后台也可以向用户发送信息。</p></blockquote>
<h2 id="articleHeader0">应用场景</h2>
<p><code>Notifications</code>的诞生简化了网站或者应用与用户之间的沟通成本（时间成本和开发成本），增强用户黏性（减少了用户离开应用的可能）。传统的通知方式，大多是通过站内信（消息），邮件，短信等方式，它们通常需要刷新（跳转）页面、离开应用打开其他应用或终端来查看消息；而桌面通知功能大大的简化了这个过程，消息的传递基本不消耗时间（如果不设置<code>setTimeout</code>，用时基本不会超过<code>1s</code>），并且用户不需要离开应用，这都带来了极大的方便。可以预见，<code>Notifications</code>将会在很多网页或应用中被大量使用。当然<code>Notifications</code>也具有它的局限性：无法存档、即看即毁<br>那么，这个功能到底能用在哪些场景呢？只能说能应用的场景很多：</p>
<ul>
<li><p>社交类网站</p></li>
<li><p>资讯类网站</p></li>
<li><p>网页版邮件服务</p></li>
<li><p>即时通知类网站</p></li>
<li><p>...</p></li>
</ul>
<p>举个例子，当你打开微博页面，你可能会看到（使用新版浏览器）如下图的通知：<br><span class="img-wrap"><img data-src="/img/bVY269?w=477&amp;h=189" src="https://static.alili.tech/img/bVY269?w=477&amp;h=189" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这就是网站使用了桌面通知功能，当你选择允许，那么当网站有推送消息或者你登陆账号有新的消息将会在桌面的右下角出现一个小弹窗通知，如下：<br><span class="img-wrap"><img data-src="/img/bVY27b?w=393&amp;h=147" src="https://static.alili.tech/img/bVY27b?w=393&amp;h=147" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>感觉有点酷酷的！！！</p>
<h2 id="articleHeader1">用户权限 - Notification.permission</h2>
<p><code>Notification.permission</code>是一个静态方法，可以获取用户当前的通知权限状态，返回一个<code>String</code>，可以根据返回值判断用户是否授予了通知权限。返回值有三种情况：</p>
<ul>
<li>
<p>default</p>
<ul><li><p>用户还未被询问是否授权，所以通知不会被显示。</p></li></ul>
</li>
<li>
<p>granted</p>
<ul><li><p>表示之前已经询问过用户，并且用户已经授予了显示通知的权限。</p></li></ul>
</li>
<li>
<p>denied</p>
<ul><li><p>用户已经明确的拒绝了显示通知的权限。</p></li></ul>
</li>
</ul>
<p>当值为<code>default</code>或者<code>denied</code>时都不会显示通知消息，只有明确的被设置成<code>granted</code>才会显示通知消息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const permission = Notification.permission;
if(permission === 'granted'){
    console.log('已经授权通知，可以进行你的通知啦！');
}else{
    console.log('用户还未授权，请先授权！');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> permission = Notification.permission;
<span class="hljs-keyword">if</span>(permission === <span class="hljs-string">'granted'</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'已经授权通知，可以进行你的通知啦！'</span>);
}<span class="hljs-keyword">else</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'用户还未授权，请先授权！'</span>);
}</code></pre>
<h2 id="articleHeader2">请求权限 - Notification.requestPermission(CALLBACK)</h2>
<p>应用发送通知之前必须要取得发送通知的权限，才能成功进行通知。<code>Notification.requestPermission(CALLBACK)</code>是请求获取权限的方法（有点类似<code>javascript</code>的<code>confirm</code>弹窗窗），允许传入一个回调，回调会返回用户选择的何种权限，返回两个值，<code>granted</code>代表允许，<code>denied</code>代表拒绝。并且<code>Notification.requestPermission()</code>支持<code>then</code>方式的链式调用，也就意味着可以异步调用它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Notification.requestPermission(function (permission) {
    console.log('用户是否允许通知： ',permission === 'granted' ? '允许' : '拒绝');
});
//两种方式是等价的
Notification.requestPermission().then(function (permission) {
    console.log('用户是否允许通知： ',permission === 'granted' ? '允许' : '拒绝');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Notification.requestPermission(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">permission</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'用户是否允许通知： '</span>,permission === <span class="hljs-string">'granted'</span> ? <span class="hljs-string">'允许'</span> : <span class="hljs-string">'拒绝'</span>);
});
<span class="hljs-comment">//两种方式是等价的</span>
Notification.requestPermission().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">permission</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'用户是否允许通知： '</span>,permission === <span class="hljs-string">'granted'</span> ? <span class="hljs-string">'允许'</span> : <span class="hljs-string">'拒绝'</span>);
});</code></pre>
<h2 id="articleHeader3">创建通知 - new Notification(TITLE, OPTIONS)</h2>
<p><code>new Notification(TITLE, OPTIONS)</code>方法创建可以创建一个通知实例，允许参入参数两个参数<code>TITLE</code>和<code>OPTIONS</code>。注意默认情况下（实际可以通过<code>OPTIONS</code>中的<code>timestamp</code>参数控制）一旦通知实例被创建出来，它会立即被显示出来。</p>
<h3 id="articleHeader4">TITLE参数</h3>
<p><code>TITLE</code>表示通知的标题。必须参数，允许数字、字符串和空</p>
<h3 id="articleHeader5">OPTIONS参数</h3>
<p><code>OPTIONS</code>是非必须参数，必须为一个对象，它包含：<br>ps: 部分参数在某些浏览器可能会不生效，建议使用最新版的谷歌浏览器。以下某些内容从<a href="https://developer.mozilla.org/en-US/docs/Web/API/notification" rel="nofollow noreferrer" target="_blank">Notification-MDN-EN</a>结合谷歌翻译得来，很有可能翻译不准确，如有，请提出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    //通知显示正文。非必须，默认为空
    body: '你的好友XX上线了！',
    //通知显示正文的图片地址。非必须，默认为空
    image: 'imgae url',
    //通知左侧图标。非必须，默认为空
    icon: 'imgae url',
    //通知的分类标记（ID）。非必须，默认为空
    tag: 'test',
    //通知相关联的数据，通常用于方法的回调，传参。非必须，默认为空
    data: '可以是任意数据类型',
    //通知显示延迟的时间。非必须，默认通知实例创建完成就显示
    timestamp: '',
    //通知主体内容的水平展示顺序，有点类似direction属性。非必须，默认值是auto, 可以是ltr或rtl
    dir: 'auto',
    //当没有足够的空间来显示通知本身时，用于表示通知的图像的URL。非必须，默认为空
    badge: 'xxx',
    //通知的语言。非必须默认为空
    lang: '',
    //通知显示时，设备的振动模式。非必须，默认为空
    vibrate: [200, 100, 200],
    //新通知出现是否覆盖旧的通知，覆盖（true）则永远只显示一条通知，不覆盖（false）则会多条通知重叠。非必须，默认为true
    renotify: true,
    //通知是否静音。非必须，默认为false，表示无声
    silent: false,
    //通知声源文件地址。非必须，默认为空
    sound: 'mp3',
    //是否不在屏幕上显示通知信息。非必须，默认为false表示要显示
    noscreen: false,
    //指定通知是否应该粘滞性，即不容易被用户清理。非必须，默认false表示不具粘滞性
    sticky: false,
    //指定通知是否保持活性，知道用户点击或关闭。非必须，默认为false
    requireInteraction: false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    //通知显示正文。非必须，默认为空
    body: '你的好友XX上线了！',
    //通知显示正文的图片地址。非必须，默认为空
    image: 'imgae url',
    //通知左侧图标。非必须，默认为空
    icon: 'imgae url',
    //通知的分类标记（ID）。非必须，默认为空
    tag: 'test',
    //通知相关联的数据，通常用于方法的回调，传参。非必须，默认为空
    data: '可以是任意数据类型',
    //通知显示延迟的时间。非必须，默认通知实例创建完成就显示
    timestamp: '',
    //通知主体内容的水平展示顺序，有点类似direction属性。非必须，默认值是auto, 可以是ltr或rtl
    dir: 'auto',
    //当没有足够的空间来显示通知本身时，用于表示通知的图像的URL。非必须，默认为空
    badge: 'xxx',
    //通知的语言。非必须默认为空
    lang: '',
    //通知显示时，设备的振动模式。非必须，默认为空
    vibrate: [<span class="hljs-number">200</span>, <span class="hljs-number">100</span>, <span class="hljs-number">200</span>],
    //新通知出现是否覆盖旧的通知，覆盖（true）则永远只显示一条通知，不覆盖（false）则会多条通知重叠。非必须，默认为true
    renotify: <span class="hljs-literal">true</span>,
    //通知是否静音。非必须，默认为false，表示无声
    silent: <span class="hljs-literal">false</span>,
    //通知声源文件地址。非必须，默认为空
    sound: 'mp3',
    //是否不在屏幕上显示通知信息。非必须，默认为false表示要显示
    noscreen: <span class="hljs-literal">false</span>,
    //指定通知是否应该粘滞性，即不容易被用户清理。非必须，默认false表示不具粘滞性
    sticky: <span class="hljs-literal">false</span>,
    //指定通知是否保持活性，知道用户点击或关闭。非必须，默认为false
    requireInteraction: <span class="hljs-literal">false</span>
}</code></pre>
<h3 id="articleHeader6">事件及事件钩子</h3>
<p>当通知被创建成功后：</p>
<ul>
<li><p>通知实例具有一个静态方法可以用来关闭通知</p></li>
<li><p>通知实例具有四个事件钩子，来跟踪通知当前的状态。这些事件可以通过事件处理跟踪<code>onshow</code>、<code>onclick</code>、<code>onclose</code>和<code>onerror</code>。因为<code>Notification</code>同样继承自<code>EventTarget</code>，因此可以对它调用<code>addEventListener()</code>方法。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const n = new Notification('XX网站消息通知', {
    body: '你的朋友有新状态啦，快去围观吧！',
    tag: '2ue',
    icon: 'https://2ue.github.io/images/common/avatar.png',
    data: {
        url: 'https://2ue.github.io'
    },
    timestamp: 3000
});

n.onshow = function () {
    console.log('通知显示了！');
}
n.onclick = function (e) {
    //可以直接通过实例的方式获取data内自定义的数据
    //也可以通过访问回调参数e来获取data的数据
    window.open(n.data.url, '_blank');
    n.close();
}
n.onclose = function () {
    console.log('你墙壁了我！！！');
}
n.onerror = function (err) {
    console.log('出错了，小伙子在检查一下吧');
    throw err;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> n = <span class="hljs-keyword">new</span> Notification(<span class="hljs-string">'XX网站消息通知'</span>, {
    <span class="hljs-attr">body</span>: <span class="hljs-string">'你的朋友有新状态啦，快去围观吧！'</span>,
    <span class="hljs-attr">tag</span>: <span class="hljs-string">'2ue'</span>,
    <span class="hljs-attr">icon</span>: <span class="hljs-string">'https://2ue.github.io/images/common/avatar.png'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">url</span>: <span class="hljs-string">'https://2ue.github.io'</span>
    },
    <span class="hljs-attr">timestamp</span>: <span class="hljs-number">3000</span>
});

n.onshow = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'通知显示了！'</span>);
}
n.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">//可以直接通过实例的方式获取data内自定义的数据</span>
    <span class="hljs-comment">//也可以通过访问回调参数e来获取data的数据</span>
    <span class="hljs-built_in">window</span>.open(n.data.url, <span class="hljs-string">'_blank'</span>);
    n.close();
}
n.onclose = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'你墙壁了我！！！'</span>);
}
n.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'出错了，小伙子在检查一下吧'</span>);
    <span class="hljs-keyword">throw</span> err;
}</code></pre>
<h2 id="articleHeader7">demo</h2>
<p>写一个简单的例子，可以打开页面体验一下，建议用最新版谷歌浏览器打开~ <a href="https://codepen.io/2ue/pen/rYYzwB" rel="nofollow noreferrer" target="_blank">Notification.js</a><button class="btn btn-xs btn-default ml10 preview" data-url="2ue/pen/rYYzwB" data-typeid="3">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const NotificationInstance = Notification || window.Notification;
if (!!NotificationInstance) {
    const permissionNow = NotificationInstance.permission;
    if (permissionNow === 'granted') {//允许通知
        CreatNotification();
    } else if (permissionNow === 'denied') {
        console.log('用户拒绝了你!!!');
    } else {
        setPermission();
    }
    function setPermission() {
        //请求获取通知权限
        NotificationInstance.requestPermission(function (PERMISSION) {
            if (PERMISSION === 'granted') {
                CreatNotification();
            } else {
                console.log('用户无情残忍的拒绝了你!!!');
            }
        });
    }
    function CreatNotification() {
        const n = new NotificationInstance('XX网站消息通知', {
            body: '你的朋友有新状态啦，快去围观吧！',
            tag: '2ue',
            icon: 'https://2ue.github.io/images/common/avatar.png',
            data: {
                url: 'https://2ue.github.io'
            }
        });
        n.onshow = function () {
            console.log('通知显示了！');
        }
        n.onclick = function (e) {
            //可以直接通过实例的方式获取data内自定义的数据
            //也可以通过访问回调参数e来获取data的数据
            window.open(n.data.url, '_blank');
            n.close();
        }
        n.onclose = function () {
            console.log('你墙壁了我！！！');
        }
        n.onerror = function (err) {
            console.log('出错了，小伙子在检查一下吧');
            throw err;
        }
        setTimeout(() => {
            n.close();
        }, 2000);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> NotificationInstance = Notification || <span class="hljs-built_in">window</span>.Notification;
<span class="hljs-keyword">if</span> (!!NotificationInstance) {
    <span class="hljs-keyword">const</span> permissionNow = NotificationInstance.permission;
    <span class="hljs-keyword">if</span> (permissionNow === <span class="hljs-string">'granted'</span>) {<span class="hljs-comment">//允许通知</span>
        CreatNotification();
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (permissionNow === <span class="hljs-string">'denied'</span>) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'用户拒绝了你!!!'</span>);
    } <span class="hljs-keyword">else</span> {
        setPermission();
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setPermission</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//请求获取通知权限</span>
        NotificationInstance.requestPermission(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">PERMISSION</span>) </span>{
            <span class="hljs-keyword">if</span> (PERMISSION === <span class="hljs-string">'granted'</span>) {
                CreatNotification();
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'用户无情残忍的拒绝了你!!!'</span>);
            }
        });
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CreatNotification</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> n = <span class="hljs-keyword">new</span> NotificationInstance(<span class="hljs-string">'XX网站消息通知'</span>, {
            <span class="hljs-attr">body</span>: <span class="hljs-string">'你的朋友有新状态啦，快去围观吧！'</span>,
            <span class="hljs-attr">tag</span>: <span class="hljs-string">'2ue'</span>,
            <span class="hljs-attr">icon</span>: <span class="hljs-string">'https://2ue.github.io/images/common/avatar.png'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">url</span>: <span class="hljs-string">'https://2ue.github.io'</span>
            }
        });
        n.onshow = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'通知显示了！'</span>);
        }
        n.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
            <span class="hljs-comment">//可以直接通过实例的方式获取data内自定义的数据</span>
            <span class="hljs-comment">//也可以通过访问回调参数e来获取data的数据</span>
            <span class="hljs-built_in">window</span>.open(n.data.url, <span class="hljs-string">'_blank'</span>);
            n.close();
        }
        n.onclose = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'你墙壁了我！！！'</span>);
        }
        n.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'出错了，小伙子在检查一下吧'</span>);
            <span class="hljs-keyword">throw</span> err;
        }
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            n.close();
        }, <span class="hljs-number">2000</span>);
    }
}</code></pre>
<h2 id="articleHeader8">兼容</h2>
<p><code>Notifications</code>是<code>H5</code>的新特性，毫无疑问，它的兼容肯定是一篇哀嚎.<br><span class="img-wrap"><img data-src="/img/bVY27l?w=693&amp;h=178" src="https://static.alili.tech/img/bVY27l?w=693&amp;h=178" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVY27p?w=666&amp;h=146" src="https://static.alili.tech/img/bVY27p?w=666&amp;h=146" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">参考</h2>
<ul>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/notification" rel="nofollow noreferrer" target="_blank">Notification-MDN-EN</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/notification" rel="nofollow noreferrer" target="_blank">Notification-MDN-CN</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
H5的Notification特性 - Web的桌面通知功能

## 原文链接
[https://segmentfault.com/a/1190000012127653](https://segmentfault.com/a/1190000012127653)


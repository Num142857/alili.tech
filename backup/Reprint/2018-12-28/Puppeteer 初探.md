---
title: 'Puppeteer 初探' 
date: 2018-12-28 2:30:11
hidden: true
slug: 73thoz8am18
categories: [reprint]
---

{{< raw >}}

                    
<p>我们日常使用浏览器或者说是有头浏览器时的步骤为：启动浏览器、打开一个网页、进行交互。</p>
<p>无头浏览器指的是我们使用脚本来执行以上过程的浏览器，能模拟真实的浏览器使用场景。</p>
<p>有了无头浏览器，我们就能做包括但不限于以下事情：</p>
<ul>
<li>对网页进行截图保存为图片或 pdf</li>
<li>抓取单页应用(SPA)执行并渲染(解决传统 HTTP 爬虫抓取单页应用难以处理异步请求的问题)</li>
<li>做表单的自动提交、UI的自动化测试、模拟键盘输入等</li>
<li>用浏览器自带的一些调试工具和性能分析工具帮助我们分析问题</li>
<li>在最新的无头浏览器环境里做测试、使用最新浏览器特性</li>
<li>写爬虫做你想做的事情(奸笑</li>
</ul>
<p>无头浏览器很多，包括但不限于:</p>
<ul>
<li>PhantomJS, 基于 Webkit</li>
<li>SlimerJS, 基于 Gecko</li>
<li>HtmlUnit, 基于 Rhnio</li>
<li>TrifleJS, 基于 Trident</li>
<li>Splash, 基于 Webkit</li>
</ul>
<p>这里主要介绍 Google 提供的无头浏览器(headless Chrome), 他基于 <a href="https://chromedevtools.github.io/devtools-protocol/" rel="nofollow noreferrer" target="_blank">Chrome DevTools protocol</a> 提供了不少高度封装的接口方便我们控制浏览器。</p>
<h2 id="articleHeader0">简单的代码示例</h2>
<blockquote><p>为了能使用 <code>async</code>/<code>await</code> 等新特性，需要使用 v7.6.0 或更高版本的 Node.</p></blockquote>
<h3 id="articleHeader1">启动/关闭浏览器、打开页面</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 启动浏览器
    const browser = await puppeteer.launch({
        // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
        // headless: false,
        timeout: 30000, // 默认超时为30秒，设置为0则表示不设置超时
    });

    // 打开空白页面
    const page = await browser.newPage();

    // 进行交互
    // ...

    // 关闭浏览器
    // await browser.close();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>    <span class="hljs-comment">// 启动浏览器</span>
    <span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> puppeteer.launch({
        <span class="hljs-comment">// 关闭无头模式，方便我们看到这个无头浏览器执行的过程</span>
        <span class="hljs-comment">// headless: false,</span>
        timeout: <span class="hljs-number">30000</span>, <span class="hljs-comment">// 默认超时为30秒，设置为0则表示不设置超时</span>
    });

    <span class="hljs-comment">// 打开空白页面</span>
    <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> browser.newPage();

    <span class="hljs-comment">// 进行交互</span>
    <span class="hljs-comment">// ...</span>

    <span class="hljs-comment">// 关闭浏览器</span>
    <span class="hljs-comment">// await browser.close();</span></code></pre>
<h3 id="articleHeader2">设置页面视窗大小</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 设置浏览器视窗
    page.setViewport({
        width: 1376,
        height: 768,
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>    <span class="hljs-comment">// 设置浏览器视窗</span>
    page.setViewport({
        <span class="hljs-built_in">width</span>: <span class="hljs-number">1376</span>,
        <span class="hljs-built_in">height</span>: <span class="hljs-number">768</span>,
    });</code></pre>
<h3 id="articleHeader3">输入网址</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 地址栏输入网页地址
    await page.goto('https://google.com/', {
        // 配置项
        // waitUntil: 'networkidle', // 等待网络状态为空闲的时候才继续执行
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>    <span class="hljs-regexp">//</span> 地址栏输入网页地址
    await page.goto(<span class="hljs-string">'https://google.com/'</span>, {
        <span class="hljs-regexp">//</span> 配置项
        <span class="hljs-regexp">//</span> waitUntil: <span class="hljs-string">'networkidle'</span>, <span class="hljs-regexp">//</span> 等待网络状态为空闲的时候才继续执行
    });</code></pre>
<h3 id="articleHeader4">保存网页为图片</h3>
<p>打开一个网页，然后截图保存到本地：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="await page.screenshot({
    path: 'path/to/saved.png',
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">await</span> <span class="hljs-selector-tag">page</span><span class="hljs-selector-class">.screenshot</span>({
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'path/to/saved.png'</span>,
});</code></pre>
<p><a href="https://github.com/laispace/puppeteer-explore/blob/master/demo/save-screenshot.js" rel="nofollow noreferrer" target="_blank">完整示例代码</a></p>
<h3 id="articleHeader5">保存网页为 pdf</h3>
<p>打开一个网页，然后保存 pdf 到本地：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="await page.pdf({
     path: 'path/to/saved.pdf',
    format: 'A4', // 保存尺寸
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">await</span> <span class="hljs-selector-tag">page</span><span class="hljs-selector-class">.pdf</span>({
     <span class="hljs-attribute">path</span>: <span class="hljs-string">'path/to/saved.pdf'</span>,
    format: <span class="hljs-string">'A4'</span>, // 保存尺寸
});</code></pre>
<p><a href="https://github.com/laispace/puppeteer-explore/blob/master/demo/save-pdf.js" rel="nofollow noreferrer" target="_blank">完整示例代码</a></p>
<h3 id="articleHeader6">执行脚本</h3>
<p>要获取打开的网页中的宿主环境，我们可以使用 <code>Page.evaluate</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取视窗信息
const dimensions = await page.evaluate(() => {
    return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
    };
});
console.log('视窗信息:', dimensions);

// 获取 html
// 获取上下文句柄
const htmlHandle = await page.$('html');

// 执行计算
const html = await page.evaluate(body => body.outerHTML, htmlHandle);

// 销毁句柄
await htmlHandle.dispose();

console.log('html:', html);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 获取视窗信息</span>
<span class="hljs-keyword">const</span> dimensions = <span class="hljs-keyword">await</span> page.evaluate(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">width</span>: <span class="hljs-built_in">document</span>.documentElement.clientWidth,
        <span class="hljs-attr">height</span>: <span class="hljs-built_in">document</span>.documentElement.clientHeight,
        <span class="hljs-attr">deviceScaleFactor</span>: <span class="hljs-built_in">window</span>.devicePixelRatio
    };
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'视窗信息:'</span>, dimensions);

<span class="hljs-comment">// 获取 html</span>
<span class="hljs-comment">// 获取上下文句柄</span>
<span class="hljs-keyword">const</span> htmlHandle = <span class="hljs-keyword">await</span> page.$(<span class="hljs-string">'html'</span>);

<span class="hljs-comment">// 执行计算</span>
<span class="hljs-keyword">const</span> html = <span class="hljs-keyword">await</span> page.evaluate(<span class="hljs-function"><span class="hljs-params">body</span> =&gt;</span> body.outerHTML, htmlHandle);

<span class="hljs-comment">// 销毁句柄</span>
<span class="hljs-keyword">await</span> htmlHandle.dispose();

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'html:'</span>, html);</code></pre>
<p><code>Page.$</code> 可以理解为我们常用的 <code>document.querySelector</code>, 而 <code>Page.$$</code> 则对应 <code>document.querySelectorAll</code>。</p>
<p><a href="https://github.com/laispace/puppeteer-explore/blob/master/demo/evalute-script.js" rel="nofollow noreferrer" target="_blank">完整示例代码</a></p>
<h3 id="articleHeader7">自动提交表单</h3>
<p>打开谷歌首页，输入关键字，回车进行搜索：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 地址栏输入网页地址
await page.goto('https://google.com/', {
    waitUntil: 'networkidle', // 等待网络状态为空闲的时候才继续执行
});

// 聚焦搜索框
// await page.click('#lst-ib');
await page.focus('#lst-ib');

// 输入搜索关键字
await page.type('辣子鸡', {
   delay: 1000, // 控制 keypress 也就是每个字母输入的间隔
});

// 回车
await page.press('Enter');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// 地址栏输入网页地址</span>
<span class="hljs-keyword">await</span> page.<span class="hljs-keyword">goto</span>(<span class="hljs-string">'https://google.com/'</span>, {
    waitUntil: <span class="hljs-string">'networkidle'</span>, <span class="hljs-comment">// 等待网络状态为空闲的时候才继续执行</span>
});

<span class="hljs-comment">// 聚焦搜索框</span>
<span class="hljs-comment">// await page.click('#lst-ib');</span>
<span class="hljs-keyword">await</span> page.focus(<span class="hljs-string">'#lst-ib'</span>);

<span class="hljs-comment">// 输入搜索关键字</span>
<span class="hljs-keyword">await</span> page.type(<span class="hljs-string">'辣子鸡'</span>, {
   delay: <span class="hljs-number">1000</span>, <span class="hljs-comment">// 控制 keypress 也就是每个字母输入的间隔</span>
});

<span class="hljs-comment">// 回车</span>
<span class="hljs-keyword">await</span> page.press(<span class="hljs-string">'Enter'</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011627348" src="https://static.alili.tech/img/remote/1460000011627348" alt="" title="" style="cursor: pointer;"></span></p>
<p><a href="https://github.com/laispace/puppeteer-explore/blob/master/demo/auto-submit-form.js" rel="nofollow noreferrer" target="_blank">完整示例代码</a></p>
<h2 id="articleHeader8">复杂点的代码示例</h2>
<p>每一个简单的动作连接起来，就是一连串复杂的交互，接下来我们看两个更具体的示例。</p>
<h3 id="articleHeader9">抓取单页应用: 模拟饿了么外卖下单</h3>
<p>传统的爬虫是基于 HTTP 协议，模拟 UserAgent 发送 http 请求，获取到 html 内容后使用正则解析出需要抓取的内容，这种方式面对服务端渲染直出 html 的网页时非常便捷。</p>
<p>但遇到单页应用(SPA)时，或遇到登录校验时，这种爬虫就显得比较无力。</p>
<p>而使用无头浏览器，抓取网页时完全使用了人机交互时的操作，所以页面的初始化完全能使用宿主浏览器环境渲染完备，不再需要关心这个单页应用在前端初始化时需要涉及哪些 HTTP 请求。</p>
<p>无头浏览器提供的各种点击、输入等指令，完全模拟人的点击、输入等指令，也就再也不用担心正则写不出来了啊哈哈哈</p>
<p>当然，有些场景下，使用传统的 HTTP 爬虫(写正则匹配) 还是比较高效的。</p>
<p>在这里就不再详细对比这些差异了，以下这个例子仅作为展示模拟一个完整的人机交互：使用移动版饿了么点外卖。</p>
<p>先看下效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011627349?w=873&amp;h=788" src="https://static.alili.tech/img/remote/1460000011627349?w=873&amp;h=788" alt="" title="" style="cursor: pointer;"></span></p>
<p>代码比较长就不全贴了，关键是几行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone6 = devices['iPhone 6'];

console.log('启动浏览器');
const browser = await puppeteer.launch();

console.log('打开页面');
const page = await browser.newPage();

// 模拟移动端设备
await page.emulate(iPhone6);

console.log('地址栏输入网页地址');
await page.goto(url);

console.log('等待页面准备好');
await page.waitForSelector('.search-wrapper .search');

console.log('点击搜索框');
await page.tap('.search-wrapper .search');

await page.type('麦当劳', {
    delay: 200, // 每个字母之间输入的间隔
});

console.log('回车开始搜索');
await page.tap('button');

console.log('等待搜素结果渲染出来');
await page.waitForSelector('[class^=&quot;index-container&quot;]');

console.log('找到搜索到的第一家外卖店！');
await page.tap('[class^=&quot;index-container&quot;]');


console.log('等待菜单渲染出来');
await page.waitForSelector('[class^=&quot;fooddetails-food-panel&quot;]');


console.log('直接选一个菜品吧');
await page.tap('[class^=&quot;fooddetails-cart-button&quot;]');

// console.log('===为了看清楚，傲娇地等两秒===');
await page.waitFor(2000);
await page.tap('[class^=submit-btn-submitbutton]');

// 关闭浏览器
await browser.close();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">const</span> puppeteer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'puppeteer'</span>);
<span class="hljs-keyword">const</span> devices = <span class="hljs-built_in">require</span>(<span class="hljs-string">'puppeteer/DeviceDescriptors'</span>);
<span class="hljs-keyword">const</span> iPhone6 = devices[<span class="hljs-string">'iPhone 6'</span>];

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'启动浏览器'</span>);
<span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> puppeteer.launch();

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'打开页面'</span>);
<span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> browser.newPage();

<span class="hljs-comment">// 模拟移动端设备</span>
<span class="hljs-keyword">await</span> page.emulate(iPhone6);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'地址栏输入网页地址'</span>);
<span class="hljs-keyword">await</span> page.goto(<span class="hljs-built_in">url</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'等待页面准备好'</span>);
<span class="hljs-keyword">await</span> page.waitForSelector(<span class="hljs-string">'.search-wrapper .search'</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'点击搜索框'</span>);
<span class="hljs-keyword">await</span> page.tap(<span class="hljs-string">'.search-wrapper .search'</span>);

<span class="hljs-keyword">await</span> page.type(<span class="hljs-string">'麦当劳'</span>, {
    <span class="hljs-attribute">delay</span>: <span class="hljs-number">200</span>, <span class="hljs-comment">// 每个字母之间输入的间隔</span>
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'回车开始搜索'</span>);
<span class="hljs-keyword">await</span> page.tap(<span class="hljs-string">'button'</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'等待搜素结果渲染出来'</span>);
<span class="hljs-keyword">await</span> page.waitForSelector(<span class="hljs-string">'[class^="index-container"]'</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'找到搜索到的第一家外卖店！'</span>);
<span class="hljs-keyword">await</span> page.tap(<span class="hljs-string">'[class^="index-container"]'</span>);


<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'等待菜单渲染出来'</span>);
<span class="hljs-keyword">await</span> page.waitForSelector(<span class="hljs-string">'[class^="fooddetails-food-panel"]'</span>);


<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'直接选一个菜品吧'</span>);
<span class="hljs-keyword">await</span> page.tap(<span class="hljs-string">'[class^="fooddetails-cart-button"]'</span>);

<span class="hljs-comment">// console.log('===为了看清楚，傲娇地等两秒===');</span>
<span class="hljs-keyword">await</span> page.waitFor(<span class="hljs-number">2000</span>);
<span class="hljs-keyword">await</span> page.tap(<span class="hljs-string">'[class^=submit-btn-submitbutton]'</span>);

<span class="hljs-comment">// 关闭浏览器</span>
<span class="hljs-keyword">await</span> browser.close();</code></pre>
<p>关键步骤是：</p>
<ul>
<li>加载页面</li>
<li>等待需要点击的 DOM 渲染出来后点击</li>
<li>继续等待下一步需要点击的 DOM 渲染出来再点击</li>
</ul>
<p>关键的几个指令：</p>
<ul>
<li>
<code>page.tap</code>(或 <code>page.click</code>) 为点击</li>
<li>
<code>page.waitForSelector</code> 意思是等待指定元素出现在网页中，如果已经出现了，则立即继续执行下去, 后面跟的参数为 <code>selector</code> 选择器，与我们常用的 <code>document.querySelector</code> 接收的参数一致</li>
<li>
<code>page.waitFor</code> 后面可以传入 <code>selector</code> 选择器、<code>function</code> 函数或 <code>timeout</code> 毫秒时间，如 <code>page.waitFor(2000)</code> 指等待2秒再继续执行，例子中用这个函数暂停操作主要是为了演示</li>
</ul>
<p>以上几个指令都可接受一个 <code>selector</code> 选择器作为参数，这里额外介绍几个方法：</p>
<ul>
<li>
<code>page.$(selector)</code> 与我们常用的 <code>document.querySelector(selector)</code> 一致，返回的是一个 <code>ElementHandle</code> 元素句柄</li>
<li>
<code>page.$$(selector)</code> 与我们常用的 <code>document.querySelectorAll(selector)</code> 一致，返回的是一个数组</li>
</ul>
<p>在有头浏览器上下文中，我们选择一个元素的方法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const body = document.querySelector('body');
const bodyInnerHTML = body.innerHTML;
console.log('bodyInnerHTML: ', bodyInnerHTML);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> body = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'body'</span>);
<span class="hljs-keyword">const</span> bodyInnerHTML = body.innerHTML;
console.log(<span class="hljs-string">'bodyInnerHTML: '</span>, bodyInnerHTML);</code></pre>
<p>而在无头浏览器里，我们首先需要获取一个句柄，通过句柄获取到环境中的信息后，销毁这个句柄。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取 html
// 获取上下文句柄
const bodyHandle = await page.$('body');
// 执行计算
const bodyInnerHTML = await page.evaluate(dom => dom.innerHTML, bodyHandle);
// 销毁句柄
await bodyHandle.dispose();
console.log('bodyInnerHTML:', bodyInnerHTML);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 获取 html</span>
<span class="hljs-comment">// 获取上下文句柄</span>
<span class="hljs-keyword">const</span> bodyHandle = <span class="hljs-keyword">await</span> page.$(<span class="hljs-string">'body'</span>);
<span class="hljs-comment">// 执行计算</span>
<span class="hljs-keyword">const</span> bodyInnerHTML = <span class="hljs-keyword">await</span> page.evaluate(<span class="hljs-function"><span class="hljs-params">dom</span> =&gt;</span> dom.innerHTML, bodyHandle);
<span class="hljs-comment">// 销毁句柄</span>
<span class="hljs-keyword">await</span> bodyHandle.dispose();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bodyInnerHTML:'</span>, bodyInnerHTML);</code></pre>
<p>除此之外，还可以使用 <code>page.$eval</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bodyInnerHTML = await page.$eval('body', dom => dom.innerHTML);
console.log('bodyInnerHTML: ', bodyInnerHTML);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> bodyInnerHTML = <span class="hljs-keyword">await</span> page.$<span class="hljs-built_in">eval</span>(<span class="hljs-string">'body'</span>, <span class="hljs-function"><span class="hljs-params">dom</span> =&gt;</span> dom.innerHTML);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bodyInnerHTML: '</span>, bodyInnerHTML);</code></pre>
<p><code>page.evaluate</code> 意为在浏览器环境执行脚本，可传入第二个参数作为句柄，而 <code>page.$eval</code> 则针对选中的一个 DOM 元素执行操作。</p>
<p><a href="https://github.com/laispace/puppeteer-explore/blob/master/demo/craw-spa.js" rel="nofollow noreferrer" target="_blank">完整示例代码</a></p>
<h3 id="articleHeader10">导出批量网页：下载图灵图书</h3>
<p>我在 <a href="http://www.ituring.com.cn/" rel="nofollow noreferrer" target="_blank">图灵社区</a> 上买了不少电子书，以前支持推送到 <code>mobi</code> 格式到 <code>kindle</code> 或推送 <code>pdf</code> 格式到邮箱进行阅读，不过经常会关闭这些推送渠道，只能留在网页上看书。</p>
<p>对我来说不是很方便，而这些书籍的在线阅读效果是服务器渲染出来的(带了大量标签，无法简单抽取出好的排版)，最好的方式当然是直接在线阅读并保存为 pdf 或图片了。</p>
<p>借助浏览器的无头模式，我写了个简单的下载已购买书籍为 <code>pdf</code> 到本地的脚本，支持批量下载已购买的书籍。</p>
<p>使用方法，传入帐号密码和保存路径，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node ./demo/download-ituring-books.js '用户名' '密码' './books'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ node ./demo/download-ituring-books<span class="hljs-selector-class">.js</span> <span class="hljs-string">'用户名'</span> <span class="hljs-string">'密码'</span> <span class="hljs-string">'./books'</span></code></pre>
<p>注意：<code>puppeteer</code> 的 <code>Page.pdf()</code> 目前仅支持在无头模式中使用，所以要想看有头状态的抓取过程的话，执行到 <code>Page.pdf()</code> 这步会先报错：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011627350?w=1163&amp;h=663" src="https://static.alili.tech/img/remote/1460000011627350?w=1163&amp;h=663" alt="" title="" style="cursor: pointer;"></span></p>
<p>所以启动这个脚本时，需要保持无头模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const browser = await puppeteer.launch({
    // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
    // 注意若调用了 Page.pdf 即保存为 pdf，则需要保持为无头模式
    // headless: false,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> puppeteer.launch({
    <span class="hljs-comment">// 关闭无头模式，方便我们看到这个无头浏览器执行的过程</span>
    <span class="hljs-comment">// 注意若调用了 Page.pdf 即保存为 pdf，则需要保持为无头模式</span>
    <span class="hljs-comment">// headless: false,</span>
});</code></pre>
<p>看下执行效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011627351?w=1163&amp;h=663" src="https://static.alili.tech/img/remote/1460000011627351?w=1163&amp;h=663" alt="" title="" style="cursor: pointer;"></span></p>
<p>我的书架里有20多本书，下载完后是这样子：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011627352?w=622&amp;h=984" src="https://static.alili.tech/img/remote/1460000011627352?w=622&amp;h=984" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/laispace/puppeteer-explore/blob/master/demo/download-ituring-books.js" rel="nofollow noreferrer" target="_blank">完整示例代码</a></p>
<h2 id="articleHeader11">无头浏览器还能做什么？</h2>
<p>无头浏览器说白了就是能模拟人工在有头浏览器中的各种操作，那自然很多人力活，都能使用无头浏览器来做(比如上面这个下载 pdf 的过程，其实是人力打开每一个文章页面，然后按 <code>ctrl+p</code> 或 <code>command+p</code> 保存到本地的自动化过程)。</p>
<p>那既然用自动化工具能解决的事情，就不应该浪费重复的人力劳动了，所以我们还可以做：</p>
<ul>
<li>自动化工具<br>如自动提交表单，自动下载</li>
<li>自动化 UI 测试<br>如记录下正确 DOM 结构或截图，然后自动执行指定操作后，检查 DOM 结构或截图是否匹配(UI 断言)</li>
<li>定时监控工具<br>如定时截图发周报，或定时巡查重要业务路径下的页面是否处于可用状态，配合邮件告警</li>
<li>爬虫<br>如传统 HTTP 爬虫怕不到的地方，就可配合无头浏览器渲染能力来做</li>
<li>etc</li>
</ul>
<p>感谢阅读！<br>(全文完)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Puppeteer 初探

## 原文链接
[https://segmentfault.com/a/1190000011627343](https://segmentfault.com/a/1190000011627343)


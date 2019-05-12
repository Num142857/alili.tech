---
title: '王者荣耀故事站小程序（nuxt + 小程序）' 
date: 2018-12-27 2:30:13
hidden: true
slug: dncz7gyulud
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>一直想学习开发一款小程序，无奈拖延至今，恰逢王者荣耀周年庆，然后本人对王者英雄的人物、配音比较感兴趣，就有开发一款王者荣耀故事站的小程序的念头。想要了解故事背景就直接打开小程序就好了。</p>
<p>ps: 因为是业余时间做的，所以 pc 端的爬虫数据展示方面就有点粗糙。</p>
<h3 id="articleHeader1">技术栈</h3>
<blockquote>小程序 + nuxt + koa2 + vue2.0 + vuex + nginx + pm2</blockquote>
<h3 id="articleHeader2">小程序效果图</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011747147?w=1600&amp;h=2540" src="https://static.alili.tech/img/remote/1460000011747147?w=1600&amp;h=2540" alt="WechatIMG2252.jpeg" title="WechatIMG2252.jpeg" style="cursor: pointer; display: inline;"></span></p>
<h4>线上体验</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011747148?w=344&amp;h=344" src="https://static.alili.tech/img/remote/1460000011747148?w=344&amp;h=344" alt="WechatIMG2252.jpeg" title="WechatIMG2252.jpeg" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">pc 爬虫效果图</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011747149?w=1575&amp;h=1046" src="https://static.alili.tech/img/remote/1460000011747149?w=1575&amp;h=1046" alt="44" title="44" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000011747150?w=1558&amp;h=770" src="https://static.alili.tech/img/remote/1460000011747150?w=1558&amp;h=770" alt="44" title="44" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000011747151?w=1558&amp;h=1025" src="https://static.alili.tech/img/remote/1460000011747151?w=1558&amp;h=1025" alt="44" title="44" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000011747152?w=1544&amp;h=993" src="https://static.alili.tech/img/remote/1460000011747152?w=1544&amp;h=993" alt="44" title="44" style="cursor: pointer;"></span></p>
<h4>线上地址</h4>
<p><a href="http://storyweb.naice.me/" rel="nofollow noreferrer" target="_blank"></a><a href="http://storyweb.naice.me/" rel="nofollow noreferrer" target="_blank">http://storyweb.naice.me/</a><br>(如果觉得很慢的同学不是你们的网速的问题，是我的服务器配置太渣了2333)</p>
<h3 id="articleHeader4">首先说下爬虫数据</h3>
<p>数据爬虫都是从王者荣耀故事站官网来爬取的，然后直接用 next/koa 作为后台，用<code>cheerio</code>模块和<code>request-promise</code>模块基本就可以爬到我们想要的数据了，有时候爬取出来的数据回事乱码（非 utf-8的）我们就借助<code>iconv</code>模块去转成我们想要的中文字符。这些模块说明文档在相应的 gihub中都说的很详细。就不一一介绍。<br>下面举例一下爬虫英雄列表首页的过程，都注释在代码里面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入相应的模块
import rp from 'request-promise'
import cheerio from 'cheerio'
import { writeFileSync } from 'fs'

const Iconv = require('iconv').Iconv
const iconv = new Iconv('GBK', 'UTF-8')

// request 国外网站的时候使用本地的 VPN
// import Agent from 'socks5-http-client/lib/Agent'

// 爬取英雄列表
const getHeroStory = async() => {
  // request-promise的配置
  const options = {
    uri: 'https://pvp.qq.com/act/a20160510story/herostory.htm',
    // agentClass: Agent,
    // agentOptions: {
    //   socksHost: 'localhost',
    //   socksPort: 1080 // 本地 VPN 的端口，这里用的 shadowsocks
    // },
    transform: body => cheerio.load(body) // 转成相应的爬虫
  }
  // 爬取导航复制给cheerio的$对象
  const $ = await rp(options)
  let navArr = []
  let heroList = []
  $('#campNav li').each(function () {
    // 分析节点拿到数据
    const type = $(this).attr('data-camptype')
    const text = $(this).find('a').text()
    // push 到navArr数组中
    navArr.push({ type, text })
  })
  // 爬取英雄列表
  const hreodata = await rp({
    uri: 'https://pvp.qq.com/webplat/info/news_version3/15592/18024/23901/24397/24398/m17330/list_1.shtml'
  })
  // 数据处理
  let str = hreodata.replace('createHeroList(', '')
  str = str.substr(0, str.length - 1)
  let r = JSON.parse(str)
  heroList = r.data.filter(item => item)

  let result = {
    nav: navArr,
    heroList
  }
  // 写入文件
  writeFileSync('./server/crawerdb/heroList.json', JSON.stringify(result, null, 2), 'utf-8')

  return result
}

// 跟去英雄 id，和 url 爬取英雄的详细介绍
const getHeroDatail = async(url, _id) => {
  // 配置
  const option = {
    encoding: null,
    url
  }
  // 爬取英雄详情
  const $ = await rp(option).then(body => {
    // 字符乱码处理
    var result = iconv.convert(new Buffer(body, 'binary')).toString()
    return cheerio.load(result)
  })
  // 这里拿到$之后就像 jq那样子，根据文档就可以进行爬虫的数据处理了
  // 下面都是数据处理
  let heroName = ''
  let heroDetail = []
  let ht = ''
  let hc = ''
  if ($('#heroStory').length) {
    heroName = $('.hero_name pf').text()
    $('#heroStory p').each(function () {
      let text = $(this).text().trim()
      heroDetail.push({
        type: 'text',
        text: text
      })
    })
  } else if ($('.textboxs').length) {
    $('.textboxs p').each(function () {
      if ($(this).find('img').length) {
        let src = $(this).find('img').attr('src')
        heroDetail.push({
          type: 'img',
          text: 'https:' + src
        })
      } else {
        let text = $(this).text().trim()
        heroDetail.push({
          type: 'text',
          text: text
        })
      }
    })
  }
  let hStr = ($('#history_content').text()).replace(/(^\s+)|(\s+$)/g, '');

  if (hStr.length > 0) {
    ht = $('.history_story h3').text()
    hc = $('#history_content').text()
  }
  let result = {
    heroName,
    heroDetail,
    historyTitle: ht,
    historyContent: hc
  }
  // 写入文件
  writeFileSync('./server/crawerdb/herodetail' + _id + '.json', JSON.stringify(result, null, 2), 'utf-8')
  return result
}

export default {
  getHeroStory,
  getHeroDatail
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 引入相应的模块</span>
<span class="hljs-keyword">import</span> rp <span class="hljs-keyword">from</span> <span class="hljs-string">'request-promise'</span>
<span class="hljs-keyword">import</span> cheerio <span class="hljs-keyword">from</span> <span class="hljs-string">'cheerio'</span>
<span class="hljs-keyword">import</span> { writeFileSync } <span class="hljs-keyword">from</span> <span class="hljs-string">'fs'</span>

<span class="hljs-keyword">const</span> Iconv = <span class="hljs-built_in">require</span>(<span class="hljs-string">'iconv'</span>).Iconv
<span class="hljs-keyword">const</span> iconv = <span class="hljs-keyword">new</span> Iconv(<span class="hljs-string">'GBK'</span>, <span class="hljs-string">'UTF-8'</span>)

<span class="hljs-comment">// request 国外网站的时候使用本地的 VPN</span>
<span class="hljs-comment">// import Agent from 'socks5-http-client/lib/Agent'</span>

<span class="hljs-comment">// 爬取英雄列表</span>
<span class="hljs-keyword">const</span> getHeroStory = <span class="hljs-keyword">async</span>() =&gt; {
  <span class="hljs-comment">// request-promise的配置</span>
  <span class="hljs-keyword">const</span> options = {
    uri: <span class="hljs-string">'https://pvp.qq.com/act/a20160510story/herostory.htm'</span>,
    <span class="hljs-comment">// agentClass: Agent,</span>
    <span class="hljs-comment">// agentOptions: {</span>
    <span class="hljs-comment">//   socksHost: 'localhost',</span>
    <span class="hljs-comment">//   socksPort: 1080 // 本地 VPN 的端口，这里用的 shadowsocks</span>
    <span class="hljs-comment">// },</span>
    transform: <span class="hljs-function"><span class="hljs-params">body</span> =&gt;</span> cheerio.load(body) <span class="hljs-comment">// 转成相应的爬虫</span>
  }
  <span class="hljs-comment">// 爬取导航复制给cheerio的$对象</span>
  <span class="hljs-keyword">const</span> $ = <span class="hljs-keyword">await</span> rp(options)
  <span class="hljs-keyword">let</span> navArr = []
  <span class="hljs-keyword">let</span> heroList = []
  $(<span class="hljs-string">'#campNav li'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 分析节点拿到数据</span>
    <span class="hljs-keyword">const</span> <span class="hljs-keyword">type</span> = $(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">'data-camptype'</span>)
    <span class="hljs-keyword">const</span> text = $(<span class="hljs-keyword">this</span>).find(<span class="hljs-string">'a'</span>).text()
    <span class="hljs-comment">// push 到navArr数组中</span>
    navArr.push({ <span class="hljs-keyword">type</span>, text })
  })
  <span class="hljs-comment">// 爬取英雄列表</span>
  <span class="hljs-keyword">const</span> hreodata = <span class="hljs-keyword">await</span> rp({
    uri: <span class="hljs-string">'https://pvp.qq.com/webplat/info/news_version3/15592/18024/23901/24397/24398/m17330/list_1.shtml'</span>
  })
  <span class="hljs-comment">// 数据处理</span>
  <span class="hljs-keyword">let</span> str = hreodata.replace(<span class="hljs-string">'createHeroList('</span>, <span class="hljs-string">''</span>)
  str = str.substr(<span class="hljs-number">0</span>, str.length - <span class="hljs-number">1</span>)
  <span class="hljs-keyword">let</span> r = <span class="hljs-built_in">JSON</span>.parse(str)
  heroList = r.data.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item)

  <span class="hljs-keyword">let</span> result = {
    nav: navArr,
    heroList
  }
  <span class="hljs-comment">// 写入文件</span>
  writeFileSync(<span class="hljs-string">'./server/crawerdb/heroList.json'</span>, <span class="hljs-built_in">JSON</span>.stringify(result, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>), <span class="hljs-string">'utf-8'</span>)

  <span class="hljs-keyword">return</span> result
}

<span class="hljs-comment">// 跟去英雄 id，和 url 爬取英雄的详细介绍</span>
<span class="hljs-keyword">const</span> getHeroDatail = <span class="hljs-keyword">async</span>(url, _id) =&gt; {
  <span class="hljs-comment">// 配置</span>
  <span class="hljs-keyword">const</span> option = {
    encoding: <span class="hljs-literal">null</span>,
    url
  }
  <span class="hljs-comment">// 爬取英雄详情</span>
  <span class="hljs-keyword">const</span> $ = <span class="hljs-keyword">await</span> rp(option).then(<span class="hljs-function"><span class="hljs-params">body</span> =&gt;</span> {
    <span class="hljs-comment">// 字符乱码处理</span>
    <span class="hljs-keyword">var</span> result = iconv.convert(<span class="hljs-keyword">new</span> Buffer(body, <span class="hljs-string">'binary'</span>)).toString()
    <span class="hljs-keyword">return</span> cheerio.load(result)
  })
  <span class="hljs-comment">// 这里拿到$之后就像 jq那样子，根据文档就可以进行爬虫的数据处理了</span>
  <span class="hljs-comment">// 下面都是数据处理</span>
  <span class="hljs-keyword">let</span> heroName = <span class="hljs-string">''</span>
  <span class="hljs-keyword">let</span> heroDetail = []
  <span class="hljs-keyword">let</span> ht = <span class="hljs-string">''</span>
  <span class="hljs-keyword">let</span> hc = <span class="hljs-string">''</span>
  <span class="hljs-keyword">if</span> ($(<span class="hljs-string">'#heroStory'</span>).length) {
    heroName = $(<span class="hljs-string">'.hero_name pf'</span>).text()
    $(<span class="hljs-string">'#heroStory p'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">let</span> text = $(<span class="hljs-keyword">this</span>).text().trim()
      heroDetail.push({
        <span class="hljs-keyword">type</span>: <span class="hljs-string">'text'</span>,
        text: text
      })
    })
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ($(<span class="hljs-string">'.textboxs'</span>).length) {
    $(<span class="hljs-string">'.textboxs p'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> ($(<span class="hljs-keyword">this</span>).find(<span class="hljs-string">'img'</span>).length) {
        <span class="hljs-keyword">let</span> src = $(<span class="hljs-keyword">this</span>).find(<span class="hljs-string">'img'</span>).attr(<span class="hljs-string">'src'</span>)
        heroDetail.push({
          <span class="hljs-keyword">type</span>: <span class="hljs-string">'img'</span>,
          text: <span class="hljs-string">'https:'</span> + src
        })
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">let</span> text = $(<span class="hljs-keyword">this</span>).text().trim()
        heroDetail.push({
          <span class="hljs-keyword">type</span>: <span class="hljs-string">'text'</span>,
          text: text
        })
      }
    })
  }
  <span class="hljs-keyword">let</span> hStr = ($(<span class="hljs-string">'#history_content'</span>).text()).replace(<span class="hljs-regexp">/(^\s+)|(\s+$)/g</span>, <span class="hljs-string">''</span>);

  <span class="hljs-keyword">if</span> (hStr.length &gt; <span class="hljs-number">0</span>) {
    ht = $(<span class="hljs-string">'.history_story h3'</span>).text()
    hc = $(<span class="hljs-string">'#history_content'</span>).text()
  }
  <span class="hljs-keyword">let</span> result = {
    heroName,
    heroDetail,
    historyTitle: ht,
    historyContent: hc
  }
  <span class="hljs-comment">// 写入文件</span>
  writeFileSync(<span class="hljs-string">'./server/crawerdb/herodetail'</span> + _id + <span class="hljs-string">'.json'</span>, <span class="hljs-built_in">JSON</span>.stringify(result, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>), <span class="hljs-string">'utf-8'</span>)
  <span class="hljs-keyword">return</span> result
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  getHeroStory,
  getHeroDatail
}
</code></pre>
<p>然后在 koa里面配置好路由就可以一步步爬取数据了</p>
<h3 id="articleHeader5">nuxt</h3>
<blockquote>Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。我们的目标是创建一个灵活的应用框架，你可以基于它初始化新项目的基础结构代码，或者在已有 Node.js 项目中使用 Nuxt.js。Nuxt.js 预设了利用Vue.js开发服务端渲染的应用所需要的各种配置。</blockquote>
<p>根据文档 page 下面的结构就是对应的 vue 的路由结构，然后配置好<code>nuxt.config.js</code>你所需要模块、插件、webpack 配置等等都有很好的<a href="https://zh.nuxtjs.org/guide/configuration" rel="nofollow noreferrer" target="_blank">中文文档</a>说明。会 vue的同学，去看一下官网就可以大概有个很好的了解了。<br>下面是整个项目的目录结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".nuxt/
build/  ---打包发布
components/ ---组件
layout/   ---布局
pages/    ---对应的路由
--| about.vue/
--| music.vue/
--| word.vue/
--| skin/
--| index.vue
--| ....
server/  --对应的koa 后台
static/  ---静态资源
store/  --vuex" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>.nuxt/
build/  ---打包发布
components/ ---组件
layout/   ---布局
pages/    ---对应的路由
-<span class="ruby">-<span class="hljs-params">| about.vue/
</span></span>-<span class="ruby"><span class="hljs-params">-|</span> music.vue/
</span>-<span class="ruby">-<span class="hljs-params">| word.vue/
</span></span>-<span class="ruby"><span class="hljs-params">-|</span> skin/
</span>-<span class="ruby">-<span class="hljs-params">| index.vue
</span></span>-<span class="ruby"><span class="hljs-params">-|</span> ....
</span>server/  --对应的koa 后台
static/  ---静态资源
store/  --vuex</code></pre>
<h3 id="articleHeader6">小程序</h3>
<p>这是我第一个小程序。所以一开始看文档，写起数据绑定的时候，会有种跟 vue 的异曲同工的感觉.<br>下面是官荒的小例子</p>
<p>demo.wxml</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<view> Hello "{{"name"}}"! </view>
<view wx:for=&quot;"{{"array"}}"&quot;>
  "{{"index"}}": "{{"item.message"}}"
</view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">view</span>&gt;</span> Hello </span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml">! <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"array"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
  </span><span class="hljs-template-variable">"{{"index"}}"</span><span class="xml">: </span><span class="hljs-template-variable">"{{"item.message"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></span></code></pre>
<p>demo.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Page({
  data: {
    name: '小程序',
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }]
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Page</span>({
  <span class="hljs-attribute">data</span>: {
    name: <span class="hljs-string">'小程序'</span>,
    array: [{
      message: <span class="hljs-string">'foo'</span>,
    }, {
      <span class="hljs-attribute">message</span>: <span class="hljs-string">'bar'</span>
    }]
  }
})</code></pre>
<p>是不是太熟悉了？？？？当然里面实现的技术还是想差别很大的，想去详细的了解，我觉得《<a href="https://zhuanlan.zhihu.com/p/25105936?utm_medium=social&amp;utm_source=weibo" rel="nofollow noreferrer" target="_blank">一起脱去小程序的外套 - 微信小程序架构解析</a>》这篇文章，很是不错，我初学的时候，是先体验一番<a href="https://mp.weixin.qq.com/debug/wxadoc/dev/demo.html" rel="nofollow noreferrer" target="_blank">小程序的demo</a>,然后直接动手（光看不动瞎扯淡），再去深入了解原理、pages 的生命周期，逻辑处理、框架、组件、api 等等，理解了这些之后，后面就很容易啦！！</p>
<p>附一张小程序的运行生命周期图(来源于遇见大神的文章)，用来理解小程序的整个运行过程<br><span class="img-wrap"><img data-src="/img/remote/1460000011747153?w=1156&amp;h=586" src="https://static.alili.tech/img/remote/1460000011747153?w=1156&amp;h=586" alt="44" title="44" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">github</h3>
<p>小程序：<a href="https://github.com/naihe138/heroStory" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/naihe138/heroStory" rel="nofollow noreferrer" target="_blank">https://github.com/naihe138/h...</a></p>
<p>小程序后台爬虫： <a href="https://github.com/naihe138/hero-story-crawer" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/naihe138/hero-story-crawer" rel="nofollow noreferrer" target="_blank">https://github.com/naihe138/h...</a></p>
<p>博客文章：<a href="https://blog.naice.me/" rel="nofollow noreferrer" target="_blank"></a><a href="https://blog.naice.me/" rel="nofollow noreferrer" target="_blank">https://blog.naice.me/</a></p>
<p>如果大家觉得有用的话，求一个闪晶晶的 start ，谢谢各位大佬</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
王者荣耀故事站小程序（nuxt + 小程序）

## 原文链接
[https://segmentfault.com/a/1190000011747142](https://segmentfault.com/a/1190000011747142)


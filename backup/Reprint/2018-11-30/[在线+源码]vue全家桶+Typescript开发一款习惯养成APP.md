---
title: '[在线+源码]vue全家桶+Typescript开发一款习惯养成APP' 
date: 2018-11-30 2:30:12
hidden: true
slug: 1jw0r8h3gnlj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-ts-daily</h1>
<p>基于Vue.js的2.5.13版本和TypeScript编写的模仿原生应用的WebApp.<br><a href="https://github.com/xiaomuzhu/vue-ts-daily" rel="nofollow noreferrer" target="_blank">源码地址</a> 欢迎star</p>
<p><a href="http://day.xiaomuzhu.top/" rel="nofollow noreferrer" target="_blank">项目演示地址</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014884806?w=280&amp;h=280" src="https://static.alili.tech/img/remote/1460000014884806?w=280&amp;h=280" alt="扫描二维码" title="扫描二维码" style="cursor: pointer; display: inline;"></span></p>
<p>建议直接添加到主屏幕(ios端体验差一些).</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014884807" src="https://static.alili.tech/img/remote/1460000014884807" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">前言</h2>
<p>为什么做这个项目？</p>
<ol>
<li>学习vue全家桶，很长一段时间在用React。</li>
<li>利用PWA技术来模仿原生应用,来探究PWA与原生的差异。</li>
<li>作者声称2.5之后vue增强了对TS的支持，探究TS在vue中的支持情况。</li>
</ol>
<p>那么为什么模仿一款"习惯养成APP"而不是饿了么、美团、头条等著名APP？</p>
<p>原生APP与WebApp最大的区别就是离线能力，我们希望做一款以离线能力为主的app，这种类型的app绝大多数都是工具类的，例如番茄闹钟、效率工具等等，诸如美团、头条这种app离线场景价值有限（离线怎么点餐看新闻啊？缓存里的应该叫旧闻了）。</p>
<p>这个项目跟其他Vue仿饿了么和qq音乐的项目有何不同?</p>
<ol>
<li>我们全程Typescript编写,组件完全Class化,写法更贴近Angular,ts是构建健壮应用的必备良药,众多团队在ts化自己的项目了,而github上我找不到任何一个ts+vue的完整app,此项目可以供你学习.</li>
<li>我们利用了pwa技术,pwa目前已经被ios支持(虽然支持得烂),所以,开花结果是迟早的事情,vue+pwa的项目也是十分有限,尤其是在vue-cli 3.0之后就没有相关的项目供参考了.</li>
</ol>
<h2 id="articleHeader2">技术栈</h2>
<p>vue2.5 + Typescript + vuex + vue-router</p>
<h2 id="articleHeader3">项目启动</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/xiaomuzhu/vue-ts-daily
npm i &amp;&amp; npm run dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/xiaomuzhu/vue-ts-daily
npm i &amp;&amp; npm run dev
</code></pre>
<h2 id="articleHeader4">开发环境</h2>
<blockquote>MacOS 10.12.6 node10.0.0</blockquote>
<h1 id="articleHeader5">目标功能</h1>
<ul>
<li>[x] 习惯新建 -- 完成</li>
<li>[x] 习惯编辑 -- 完成</li>
<li>[x] 习惯归档 -- 完成</li>
<li>[x] 习惯删除 -- 完成</li>
<li>[x] 习惯激活 -- 完成</li>
<li>[x] vuex持久化 -- 完成</li>
<li>[x] 当日习惯展示 -- 完成</li>
<li>[x] 对之前习惯的补签和取消 -- 完成</li>
<li>[x] 默认习惯选择列表 -- 完成</li>
<li>[x] 习惯图标与背景颜色的编辑 -- 完成</li>
<li>[x] 习惯的重复日期、激励语、重复时间段的编辑-- 完成</li>
<li>[x] 奖励卡领取 -- 完成</li>
<li>[x] 不同时间段不同习惯的tab筛选 -- 完成</li>
<li>[x] 习惯的总天数、当前连续天数、历史最高纪录等记录逻辑 -- 完成</li>
<li>[x] 登录 -- 完成</li>
<li>[x] 反馈 -- 完成</li>
<li>[x] 更新日志 -- 完成</li>
<li>[x] 远程同步信息 -- 完成</li>
<li>[ ] 开启https实现pwa</li>
<li>[ ] 加入后台推送功能</li>
<li>[ ] 加入主题更换</li>
<li>[ ] 丰富动画效果</li>
</ul>
<h2 id="articleHeader6">项目截图</h2>
<p>首页</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014884808" src="https://static.alili.tech/img/remote/1460000014884808" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>习惯管理</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014884809?w=236&amp;h=419" src="https://static.alili.tech/img/remote/1460000014884809?w=236&amp;h=419" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>习惯记录</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014884810" src="https://static.alili.tech/img/remote/1460000014884810" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>新建习惯</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014884811?w=233&amp;h=419" src="https://static.alili.tech/img/remote/1460000014884811?w=233&amp;h=419" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>编辑习惯</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014884812" src="https://static.alili.tech/img/remote/1460000014884812" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">最后</h2>
<p>本项目是还原了APP Store一个精选习惯管理app,叫"小日常"。</p>
<p>整体功能还原了90%以上，身为工具类的app还是以逻辑为主，有两个点比较难处理.</p>
<ol>
<li>逻辑耦合严重，例如一个习惯成功打卡或者取消打卡后，相关的连续天数、总天数、当前天数、习惯当前的ui、日历ui、弹窗逻辑全部要响应.</li>
<li>时间处理,习惯养成工具最主要的还是要处理时间,例如日历组件,当天之后的补签是不能响应的,因此需要做一个时间上的判断,而补签之前的相关连续记录要做改变,这个时候需要计算这个补签是否改变了连续的记录,其中又得涉及时间的处理,整个逻辑就是处理跟时间的关系.</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[在线+源码]vue全家桶+Typescript开发一款习惯养成APP

## 原文链接
[https://segmentfault.com/a/1190000014884801](https://segmentfault.com/a/1190000014884801)


---
title: 'React Native最佳学习模版- F8 App开源了' 
date: 2019-02-11 2:30:49
hidden: true
slug: 2fcqedn8m95
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVuTWF" src="https://static.alili.tech/img/bVuTWF" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在刚刚结束的Facebook f8开发者大会不久。FB开源了自己的f8 App。</p>
<p><span class="img-wrap"><img data-src="/img/bVuTW2" src="https://static.alili.tech/img/bVuTW2" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>界面和体验都是相当精美的。</p>
<h3 id="articleHeader0">React Native</h3>
<p>项目用的自己啊的React Native，可以同时build iOS和 Android.相信不少学习react native的人也希望看看FB团队自己怎样去写App的吧。正如介绍中一样，我们可以看到他们所用到的一些关键词:<code>React Native</code>, <code>Redux</code>, <code>Relay</code>, <code>GraphQL</code>。</p>
<h3 id="articleHeader1">开始构建</h3>
<p>环境需要React Native,CocoaPods 1.0+ (only for iOS),MongoDb（服务端使用）</p>
<ol>
<li>
<p><strong>git clone项目</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git clone https://github.com/fbsamples/f8app.git
$ cd f8app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/fbsamples/f8app.git
$ cd f8app</code></pre>
</li>
<li>
<p><strong>安装依赖</strong> (npm v3+):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install
$ (cd ios; pod install)        # only for iOS version" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>$ npm <span class="hljs-keyword">install</span>
$ (cd ios; pod <span class="hljs-keyword">install</span>)        # <span class="hljs-keyword">only</span> <span class="hljs-keyword">for</span> iOS <span class="hljs-keyword">version</span></code></pre>
</li>
<li>
<p><strong>打开mongodb 确保运行起来:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ lsof -iTCP:27017 -sTCP:LISTEN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">$ lsof -<span class="hljs-string">iTCP:</span><span class="hljs-number">27017</span> -<span class="hljs-string">sTCP:</span>LISTEN</code></pre>
</li>
</ol>
<p>或者使用mongo server, set <code>DATABASE_URI</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ export DATABASE_URI=mongodb://example-mongo-hosting.com:1337/my-awesome-database" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">export</span> DATABASE_URI=mongodb:<span class="hljs-comment">//example-mongo-hosting.com:1337/my-awesome-database</span></code></pre>
<ol>
<li>
<p><strong>启动 Parse/GraphQL servers:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-built_in">npm</span> start</code></pre>
</li>
<li>
<p><strong>倒入数据</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run import-data" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code style="word-break: break-word; white-space: initial;">$ npm run <span class="hljs-keyword">import</span>-<span class="hljs-keyword">data</span></code></pre>
</li>
</ol>
<p>Make sure everything works by visiting:</p>
<ul>
<li><p>Parse Dashboard: <a href="http://localhost:8080/dashboard" rel="nofollow noreferrer" target="_blank">http://localhost:8080/dashboard</a></p></li>
<li><p>Graph<em>i</em>QL: <a href="http://localhost:8080/graphql?query=query+%7B%0A++schedule+%7B%0A++++title%0A++++speakers+%7B%0A++++++name%0A++++++title%0A++++%7D%0A++++location+%7B%0A++++++name%0A++++%7D%0A++%7D%0A%7D" rel="nofollow noreferrer" target="_blank">http://localhost:8080/graphql</a></p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVuTXM" src="https://static.alili.tech/img/bVuTXM" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li>
<p><strong>运行 Android</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ react-native run-android
$ adb reverse tcp:8081 tcp:8081   # required to ensure the Android app can
$ adb reverse tcp:8080 tcp:8080   # access the Packager and GraphQL server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">$</span> <span class="hljs-string">react-native</span> <span class="hljs-string">run-android</span>
<span class="hljs-string">$</span> <span class="hljs-string">adb</span> <span class="hljs-string">reverse</span> <span class="hljs-attr">tcp:8081</span> <span class="hljs-attr">tcp:8081</span>   <span class="hljs-comment"># required to ensure the Android app can</span>
<span class="hljs-string">$</span> <span class="hljs-string">adb</span> <span class="hljs-string">reverse</span> <span class="hljs-attr">tcp:8080</span> <span class="hljs-attr">tcp:8080</span>   <span class="hljs-comment"># access the Packager and GraphQL server</span></code></pre>
</li></ol>
<ol><li>
<p><strong>运行 iOS:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ react-native run-ios " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">$ react-native <span class="hljs-keyword">run</span><span class="bash">-ios </span></code></pre>
</li></ol>
<p>项目地址:   <a href="https://github.com/fbsamples/f8app" rel="nofollow noreferrer" target="_blank">https://github.com/fbsamples/f8app</a></p>
<p>更多教程:  <a href="http://makeitopen.com/" rel="nofollow noreferrer" target="_blank">http://makeitopen.com/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Native最佳学习模版- F8 App开源了

## 原文链接
[https://segmentfault.com/a/1190000004942617](https://segmentfault.com/a/1190000004942617)


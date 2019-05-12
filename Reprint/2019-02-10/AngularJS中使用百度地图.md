---
title: 'AngularJS中使用百度地图' 
date: 2019-02-10 2:30:42
hidden: true
slug: 2rjf1ee806j
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><a href="https://angularjs.org/" rel="nofollow noreferrer" target="_blank">AngularJS</a>作为一个成功的框架，营造出了完备的生态系统。尤其<a href="https://docs.angularjs.org/guide/directive" rel="nofollow noreferrer" target="_blank">Directive</a>，对于组件化起了非常大的作用。很多时候，如我这般懒人，网上搜一搜，就找到一个合用的<code>Directive</code>，省了自己诸多麻烦。今天就简单介绍一下我的一个懒人组件 － 百度地图。</p>
<p>源码地址：<a href="https://github.com/leftstick/BaiduMapForAngularJS" rel="nofollow noreferrer" target="_blank">angular-baidu-map</a></p>
<p>效果图是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/bVvpMG" src="https://static.alili.tech/img/bVvpMG" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>注：本章介绍的是<a href="https://angularjs.org/" rel="nofollow noreferrer" target="_blank">AngularJS</a>的百度地图指令组件，如果需要<a href="https://angular.io/" rel="nofollow noreferrer" target="_blank">angular2</a>支持的，请看这里<a href="https://github.com/leftstick/angular2-baidu-map" rel="nofollow noreferrer" target="_blank">angular2-baidu-map</a></p>
<h2 id="articleHeader1">安装</h2>
<p><strong>最low式</strong></p>
<p>直接<a href="https://github.com/leftstick/BaiduMapForAngularJS/archive/2.0.1.zip" rel="nofollow noreferrer" target="_blank">下载</a>使用，为什么这种方式low，因为三方库不用个什么包管理工具，还随着自己的项目源码提交，浪费空间就算了，也丢了版本追踪的能力...吧啦吧啦吧啦</p>
<p><strong>推荐式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install angular-baidu-map --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> angular-baidu-<span class="hljs-keyword">map</span> <span class="hljs-comment">--save</span></code></pre>
<blockquote><p>有人问为什么不提供<a href="http://bower.io/" rel="nofollow noreferrer" target="_blank">bower</a>支持，那我建议你真该多逛逛社区了，<code>bower</code>已是明日黄花，诸多缺陷已经跟不上时代的节奏，更何况人人都用<code>node</code>，用自带的<code>npm</code>管理不是更省心么？(其实<code>angular-baidu-map@2.0.0</code>之前的版本也是支持<code>bower</code>的)</p></blockquote>
<h2 id="articleHeader2">引入资源</h2>
<p><strong>最牛ES2015式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {ngBaiduMap} from 'angular-baidu-map';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> {ngBaiduMap} <span class="hljs-keyword">from</span> <span class="hljs-string">'angular-baidu-map'</span>;</code></pre>
<p><strong>普通CommonJS式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ngBaiduMap = require('angular-baidu-map').ngBaiduMap;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> ngBaiduMap = <span class="hljs-built_in">require</span>(<span class="hljs-string">'angular-baidu-map'</span>).ngBaiduMap;</code></pre>
<p><strong>低调script直戳式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;node_modules/angular/angular.min.js&quot;></script>
<script type=&quot;text/javascript&quot; src=&quot;node_modules/angular-baidu-map/dist/angular-baidu-map.js&quot;></script>
<script type=&quot;text/javascript&quot;>
    var ngBaiduMap = window.ngBaiduMap;
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"node_modules/angular/angular.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"node_modules/angular-baidu-map/dist/angular-baidu-map.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> ngBaiduMap = <span class="hljs-built_in">window</span>.ngBaiduMap;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<blockquote><p>直戳式之所以写的多是因为需要手动显示指定<code>AngularJS</code>在<code>angular-baidu-map.min.js</code>之前加载</p></blockquote>
<h2 id="articleHeader3">用法</h2>
<p>作为迈向<code>AngularJS</code>的第一步，我们需要声明对<code>angular-baidu-map</code>的依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这里ngBaiduMap是上面得到的变量
var app = angular.module('app', [ngBaiduMap]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//这里ngBaiduMap是上面得到的变量</span>
<span class="hljs-keyword">var</span> app = angular.module(<span class="hljs-string">'app'</span>, [ngBaiduMap]);</code></pre>
<p>然后找到<code>html</code>或者<code>template</code>，挑选一处希望显示地图的位置，放置如下<code>Directive</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<baidu-map options=&quot;mapOptions&quot; ak=&quot;<your-ak>&quot; offline=&quot;offlineOpts&quot; class=&quot;<style-for-it>&quot;></baidu-map>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">baidu-map</span> <span class="hljs-attr">options</span>=<span class="hljs-string">"mapOptions"</span> <span class="hljs-attr">ak</span>=<span class="hljs-string">"&lt;your-ak&gt;"</span> <span class="hljs-attr">offline</span>=<span class="hljs-string">"offlineOpts"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"&lt;style-for-it&gt;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">baidu-map</span>&gt;</span></code></pre>
<ul>
<li><p><code>mapOptions</code> 表达式，用来描述地图本身。后面详细介绍该对象参数</p></li>
<li><p><code>ak</code> 字符串，是你在<a href="http://lbsyun.baidu.com/apiconsole/key" rel="nofollow noreferrer" target="_blank">百度开放平台</a>申请的<code>AppKey</code>，没有这个，你的地图显示不出来的</p></li>
<li><p><code>offlineOpts</code> 表达式，用来控制离线后的友好支持，后面详细介绍各参数。</p></li>
<li><p><code>class</code>或者<code>style</code> 必须为<code>baidu-map</code>标签指定一个样式(宽、高必须)，否则地图没了形状，显示不出来</p></li>
</ul>
<h2 id="articleHeader4">简单示例</h2>
<p><strong>写一个DemoController</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.controller('DemoController', ['$scope',
    function($scope) {

        //离线友好支持
        $scope.offlineOpts = {
            //无网络时，没10秒重试一次，看能否刷出地图
            retryInterval: 10000,
            //无网络时显示的文字
            txt: 'Offline Mode'
        };

        //地图显示中心经纬度
        var longitude = 121.506191;
        var latitude = 31.245554;
        $scope.mapOptions = {
            center: {
                longitude: longitude,
                latitude: latitude
            },
            zoom: 17,//缩放级别
            //显示一个标记
            markers: [{
                //标记坐标
                longitude: longitude,
                latitude: latitude,
                //标记图片
                icon: 'img/mappiont.png',
                //标记大小
                width: 49,
                height: 60,
                //点击标记后的提示框标题
                title: 'Where',
                //点击标记后的提示框内容
                content: 'Put description here'
            }]
        };
    }
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.controller(<span class="hljs-string">'DemoController'</span>, [<span class="hljs-string">'$scope'</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{

        <span class="hljs-comment">//离线友好支持</span>
        $scope.offlineOpts = {
            <span class="hljs-comment">//无网络时，没10秒重试一次，看能否刷出地图</span>
            retryInterval: <span class="hljs-number">10000</span>,
            <span class="hljs-comment">//无网络时显示的文字</span>
            txt: <span class="hljs-string">'Offline Mode'</span>
        };

        <span class="hljs-comment">//地图显示中心经纬度</span>
        <span class="hljs-keyword">var</span> longitude = <span class="hljs-number">121.506191</span>;
        <span class="hljs-keyword">var</span> latitude = <span class="hljs-number">31.245554</span>;
        $scope.mapOptions = {
            <span class="hljs-attr">center</span>: {
                <span class="hljs-attr">longitude</span>: longitude,
                <span class="hljs-attr">latitude</span>: latitude
            },
            <span class="hljs-attr">zoom</span>: <span class="hljs-number">17</span>,<span class="hljs-comment">//缩放级别</span>
            <span class="hljs-comment">//显示一个标记</span>
            markers: [{
                <span class="hljs-comment">//标记坐标</span>
                longitude: longitude,
                <span class="hljs-attr">latitude</span>: latitude,
                <span class="hljs-comment">//标记图片</span>
                icon: <span class="hljs-string">'img/mappiont.png'</span>,
                <span class="hljs-comment">//标记大小</span>
                width: <span class="hljs-number">49</span>,
                <span class="hljs-attr">height</span>: <span class="hljs-number">60</span>,
                <span class="hljs-comment">//点击标记后的提示框标题</span>
                title: <span class="hljs-string">'Where'</span>,
                <span class="hljs-comment">//点击标记后的提示框内容</span>
                content: <span class="hljs-string">'Put description here'</span>
            }]
        };
    }
]);</code></pre>
<h2 id="articleHeader5">
<code>mapOptions</code>详解</h2>
<table>
<thead><tr>
<th align="left">Attribute</th>
<th align="left">Type</th>
<th align="center">Required</th>
<th align="left">Description</th>
<th align="left">Example</th>
</tr></thead>
<tbody>
<tr>
<td align="left">options.center.longitude</td>
<td align="left">number</td>
<td align="center">是</td>
<td align="left">地图中心点经度</td>
<td align="left">121.506191</td>
</tr>
<tr>
<td align="left">options.center.latitude</td>
<td align="left">number</td>
<td align="center">是</td>
<td align="left">地图中心点纬度</td>
<td align="left">31.245554</td>
</tr>
<tr>
<td align="left">options.zoom</td>
<td align="left">number</td>
<td align="center">是</td>
<td align="left">地图缩放级别，取值范围3 ~ 19</td>
<td align="left">9</td>
</tr>
<tr>
<td align="left">options.navCtrl</td>
<td align="left">boolean</td>
<td align="center">否</td>
<td align="left">是否显示地图导航控制条，默认显示</td>
<td align="left">false</td>
</tr>
<tr>
<td align="left">options.scaleCtrl</td>
<td align="left">boolean</td>
<td align="center">否</td>
<td align="left">是否显示地图比例尺，默认显示</td>
<td align="left">false</td>
</tr>
<tr>
<td align="left">options.overviewCtrl</td>
<td align="left">boolean</td>
<td align="center">否</td>
<td align="left">是否显示缩略图，默认显示(在地图右下角)</td>
<td align="left">false</td>
</tr>
<tr>
<td align="left">options.enableScrollWheelZoom</td>
<td align="left">boolean</td>
<td align="center">否</td>
<td align="left">是否开启鼠标滚轮调整地图缩放级别，默认开启</td>
<td align="left">false</td>
</tr>
<tr>
<td align="left">options.markers</td>
<td align="left">array</td>
<td align="center">否</td>
<td align="left">地图标注</td>
<td align="left">[{longitude: longitude,latitude: latitude,icon: 'img/mappiont.png',width: 49,height: 60,title: 'Where',content: 'Put description here'}]</td>
</tr>
<tr>
<td align="left">marker.longitude</td>
<td align="left">number</td>
<td align="center">是</td>
<td align="left">标注经度</td>
<td align="left">121.506191</td>
</tr>
<tr>
<td align="left">marker.latitude</td>
<td align="left">number</td>
<td align="center">是</td>
<td align="left">标注纬度</td>
<td align="left">31.245554</td>
</tr>
<tr>
<td align="left">marker.icon</td>
<td align="left">string</td>
<td align="center">否</td>
<td align="left">标注自定义图标URL</td>
<td align="left">'img/mappiont.png'</td>
</tr>
<tr>
<td align="left">marker.width</td>
<td align="left">number</td>
<td align="center">否</td>
<td align="left">标注图片宽度</td>
<td align="left">40</td>
</tr>
<tr>
<td align="left">marker.height</td>
<td align="left">number</td>
<td align="center">否</td>
<td align="left">标注图片高度</td>
<td align="left">60</td>
</tr>
<tr>
<td align="left">marker.title</td>
<td align="left">string</td>
<td align="center">否</td>
<td align="left">点击标注显示的信息窗口里的标题</td>
<td align="left">'hello'</td>
</tr>
<tr>
<td align="left">marker.content</td>
<td align="left">string</td>
<td align="center">否</td>
<td align="left">点击标注显示的信息窗口里的内容</td>
<td align="left">'hello world'</td>
</tr>
<tr>
<td align="left">marker.enableMessage</td>
<td align="left">boolean</td>
<td align="center">否</td>
<td align="left">是否开启短信发送功能，默认关闭</td>
<td align="left">true</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader6">
<code>offlineOpts</code>详解</h2>
<table>
<thead><tr>
<th align="left">Attribute</th>
<th align="left">Type</th>
<th align="center">Required</th>
<th align="left">Description</th>
<th align="left">Example</th>
</tr></thead>
<tbody>
<tr>
<td align="left">offline.retryInterval</td>
<td align="left">number</td>
<td align="center">否</td>
<td align="left">无网络时重试间隔，默认30000浩渺</td>
<td align="left">5000</td>
</tr>
<tr>
<td align="left">offline.txt</td>
<td align="left">string</td>
<td align="center">否</td>
<td align="left">无网络时显示的字符，默认"OFFLINE"</td>
<td align="left">OFFLINE MODE</td>
</tr>
</tbody>
</table>
<p>这里有一个线上演示：<a href="http://leftstick.github.io/BaiduMapForAngularJS/" rel="nofollow noreferrer" target="_blank">github</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
AngularJS中使用百度地图

## 原文链接
[https://segmentfault.com/a/1190000005065417](https://segmentfault.com/a/1190000005065417)


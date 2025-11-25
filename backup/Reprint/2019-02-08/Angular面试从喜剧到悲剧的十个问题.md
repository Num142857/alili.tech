---
title: 'Angular面试从喜剧到悲剧的十个问题' 
date: 2019-02-08 2:30:40
hidden: true
slug: 0vlx5i5umvdf
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVyzEN" src="https://static.alili.tech/img/bVyzEN" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>虽然只有10个问题，但是覆盖了angular开发中的各个方面，有基本的知识点，也有在开发过程中遇见的问题，同时也有较为开放性的问题去辨别面试者的基础水准和项目经验如果自己一年前面试肯定是喜剧到悲剧的转变?。（<em>PS:答案仅供参考～</em>）。</p>
<h3 id="articleHeader0">1. <code>ng-show/ng-hide</code> 与 <code>ng-if</code>的区别？</h3>
<p>我们都知道ng-show/ng-hide实际上是通过<code>display</code>来进行隐藏和显示的。而ng-if实际上控制dom节点的增删除来实现的。因此如果我们是根据不同的条件来进行dom节点的加载的话，那么ng-if的性能好过ng-show.</p>
<h3 id="articleHeader1">2.解释下什么是<code>$rootScrope</code>以及和<code>$scope</code>的区别？</h3>
<p>通俗的说<code>$rootScrope</code> 页面所有<code>$scope</code>的<code>父亲</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bVyzE3" src="https://static.alili.tech/img/bVyzE3" alt="vuedb2d21a11da3775c809a068803370f98d.png" title="vuedb2d21a11da3775c809a068803370f98d.png" style="cursor: pointer;"></span></p>
<p>我们来看下如何产生<code>$rootScope</code>和<code>$scope</code>吧。</p>
<p>step1:Angular解析<code>ng-app</code>然后在内存中创建<code>$rootScope</code>。</p>
<p>step2:angular回继续解析，找到<code>"{{""}}"</code>表达式，并解析成变量。</p>
<p>step3:接着会解析带有<code>ng-controller</code>的div然后指向到某个controller函数。这个时候在这个controller函数变成一个$scope对象实例。</p>
<h3 id="articleHeader2">3. 表达式 <code>"{{"yourModel"}}"</code>是如何工作的？</h3>
<p>它依赖于 $interpolation服务，在初始化页面html后，它会找到这些表达式，并且进行标记，于是每遇见一个<code>"{{""}}"</code>，则会设置一个<code>$watch</code>。而<code>$interpolation</code>会返回一个带有上下文参数的函数，最后该函数执行，则算是表达式<code>$parse</code>到那个作用域上。</p>
<h3 id="articleHeader3">4. Angular中的digest周期是什么？</h3>
<p>每个digest周期中，angular总会对比scope上model的值，一般digest周期都是自动触发的，我们也可以使用$apply进行手动触发。更深层次的研究，可以移步<a href="https://www.ng-book.com/p/The-Digest-Loop-and-apply/" rel="nofollow noreferrer" target="_blank">The Digest Loop and apply</a>。</p>
<h3 id="articleHeader4">5. 如何取消 <code>$timeout</code>, 以及停止一个<code>$watch()</code>?</h3>
<p>停止 $timeout我们可以用cancel：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var customTimeout = $timeout(function () {
  // your code
}, 1000);

$timeout.cancel(customTimeout);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> customTimeout = $timeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// your code</span>
}, <span class="hljs-number">1000</span>);

$timeout.cancel(customTimeout);</code></pre>
<p>停掉一个<code>$watch</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .$watch() 会返回一个停止注册的函数
function that we store to a variable
var deregisterWatchFn = $rootScope.$watch(‘someGloballyAvailableProperty’, function (newVal) {
  if (newVal) {
    // we invoke that deregistration function, to disable the watch
    deregisterWatchFn();
    ...
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// .$watch() 会返回一个停止注册的函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">that</span> <span class="hljs-title">we</span> <span class="hljs-title">store</span> <span class="hljs-title">to</span> <span class="hljs-title">a</span> <span class="hljs-title">variable</span>
<span class="hljs-title">var</span> <span class="hljs-title">deregisterWatchFn</span> = <span class="hljs-title">$rootScope</span>.<span class="hljs-title">$watch</span>(<span class="hljs-params">‘someGloballyAvailableProperty’, function (newVal</span>) </span>{
  <span class="hljs-keyword">if</span> (newVal) {
    <span class="hljs-comment">// we invoke that deregistration function, to disable the watch</span>
    deregisterWatchFn();
    ...
  }
});</code></pre>
<h3 id="articleHeader5">6.  Angular Directive中restrict 中分别可以怎样设置？scope中@,=,&amp;有什么区别？</h3>
<p>restrict中可以分别设置:</p>
<ul>
<li><p><code>A</code>匹配属性</p></li>
<li><p><code>E</code>匹配标签</p></li>
<li><p><code>C</code>匹配class</p></li>
<li><p><code>M</code> 匹配注释</p></li>
</ul>
<p>当然你可以设置多个值比如<code>AEC</code>,进行多个匹配。</p>
<p>在scope中，@,=,&amp;在进行值绑定时分别表示</p>
<ul>
<li><p><code>@</code>获取一个设置的字符串，它可以自己设置的也可以使用"{{"yourModel"}}"进行绑定的;</p></li>
<li><p><code>=</code> 双向绑定，绑定scope上的一些属性；</p></li>
<li><p><code>&amp;</code> 用于执行父级scope上的一些表达式，常见我们设置一些需要执行的函数</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('docsIsolationExample', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.alertName = function() {
      alert('directive scope &amp;');
  }
}])
.directive('myCustomer', function() {
  return {
    restrict: 'E',
    scope: {
      clickHandle: '&amp;'
    },
    template: '<button ng-click=&quot;testClick()&quot;>Click Me</button>',
    controller: function($scope) {
      
      $scope.testClick = function() {
        $scope.clickHandle();
        
      }  
    }
  };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">angular.module(<span class="hljs-string">'docsIsolationExample'</span>, [])
.controller(<span class="hljs-string">'Controller'</span>, [<span class="hljs-string">'$scope'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
  $scope.alertName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      alert(<span class="hljs-string">'directive scope &amp;'</span>);
  }
}])
.directive(<span class="hljs-string">'myCustomer'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">restrict</span>: <span class="hljs-string">'E'</span>,
    <span class="hljs-attr">scope</span>: {
      <span class="hljs-attr">clickHandle</span>: <span class="hljs-string">'&amp;'</span>
    },
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;button ng-click="testClick()"&gt;Click Me&lt;/button&gt;'</span>,
    <span class="hljs-attr">controller</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
      
      $scope.testClick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $scope.clickHandle();
        
      }  
    }
  };
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;docsIsolationExample&quot;>
<div ng-controller=&quot;Controller&quot;>
  <my-customer click-handle=&quot;alertName()&quot;></my-customer>
</div>
 </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"docsIsolationExample"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"Controller"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-customer</span> <span class="hljs-attr">click-handle</span>=<span class="hljs-string">"alertName()"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-customer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><a href="http://codepen.io/Jack_Pu/pen/NrpRBK" rel="nofollow noreferrer" target="_blank">Codepen Demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="Jack_Pu/pen/NrpRBK" data-typeid="3">点击预览</button></p>
<ul><li><p><code>&lt;</code> 进行单向绑定。</p></li></ul>
<h3 id="articleHeader6">7. 列出至少三种实现不同模块之间通信方式？</h3>
<ul>
<li><p>Service</p></li>
<li><p>events,指定绑定的事件</p></li>
<li><p>使用 $rootScope</p></li>
<li><p>controller之间直接使用<code>$parent</code>, <code>$$childHead</code>等</p></li>
<li><p>directive 指定属性进行数据绑定</p></li>
</ul>
<h3 id="articleHeader7">8. 有哪些措施可以改善Angular 性能</h3>
<ul><li><p>官方提倡的，关闭debug,<code>$compileProvider</code></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myApp.config(function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">myApp.config(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">$compileProvider</span>) </span>{
  $compileProvider.debugInfoEnabled(<span class="hljs-literal">false</span>);
});</code></pre>
<ul>
<li><p>使用一次绑定表达式即"{{"::yourModel"}}"</p></li>
<li><p>减少watcher数量</p></li>
<li><p>在无限滚动加载中避免使用ng-repeat,关于解决方法可以参考这篇<a href="http://www.williambrownstreet.net/blog/2013/07/angularjs-my-solution-to-the-ng-repeat-performance-problem/" rel="nofollow noreferrer" target="_blank">文章</a></p></li>
<li><p>使用性能测试的小工具去挖掘你的angular性能问题，我们可以使用简单的<code>console.time()</code>也可以借助开发者工具以及<a href="https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en" rel="nofollow noreferrer" target="_blank">Batarang</a></p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.time(&quot;TimerName&quot;);
//your code
console.timeEnd(&quot;TimerName&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.time(<span class="hljs-string">"TimerName"</span>);
<span class="hljs-comment">//your code</span>
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">"TimerName"</span>);</code></pre>
<h3 id="articleHeader8">9. 你认为在Angular中使用jQuery好么？</h3>
<p>这是一个开放性的问题，尽管网上会有很多这样的争论，但是普遍还是认为这并不是一个特别好的尝试。其实当我们学习Angular的时候，我们应该做到从0去接受angular的思想，数据绑定，使用angular自带的一些api，合理的路由组织和，写相关指令和服务等等。angular自带了很多api可以完全替代掉jquery中常用的api，我们可以使用<code>angular.element</code>，<code>$http</code>,<code>$timeout</code>,<code>ng-init</code>等。</p>
<p>我们不妨再换个角度，如果业务需求，而对于一个新人（比较熟悉jQuery）的话，或许你引入jQuery可以让它在解决问题，比如使用插件上有更多的选择，当然这是通过影响代码组织来提高工作效率，随着对于angular理解的深入，在重构时会逐渐摒弃掉当初引入jquery时的一些代码。(?Po主就是这样的人，希望不要被嘲笑，业务却是赶着走)</p>
<p>所以我觉得两种框架说完全不能一起用肯定是错的，但是我们还是应该尽力去<strong>遵循angular的设计</strong>。</p>
<h3 id="articleHeader9">10. 如何进行angular的单元测试</h3>
<p>我们可以使用karam＋jasmine 进行单元测试,我们通过ngMock引入angular app然后自行添加我们的测试用例。<br>一段简单的测试代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('calculator', function () {

  beforeEach(module('calculatorApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('sum', function () {
        it('1 + 1 should equal 2', function () {
            var $scope = {};
            var controller = $controller('CalculatorController', { $scope: $scope });
            $scope.x = 1;
            $scope.y = 2;
            $scope.sum();
            expect($scope.z).toBe(3);
        });    
    });

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'calculator'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

  beforeEach(<span class="hljs-built_in">module</span>(<span class="hljs-string">'calculatorApp'</span>));

  <span class="hljs-keyword">var</span> $controller;

  beforeEach(inject(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">_$controller_</span>)</span>{
    $controller = _$controller_;
  }));

  describe(<span class="hljs-string">'sum'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        it(<span class="hljs-string">'1 + 1 should equal 2'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> $scope = {};
            <span class="hljs-keyword">var</span> controller = $controller(<span class="hljs-string">'CalculatorController'</span>, { <span class="hljs-attr">$scope</span>: $scope });
            $scope.x = <span class="hljs-number">1</span>;
            $scope.y = <span class="hljs-number">2</span>;
            $scope.sum();
            expect($scope.z).toBe(<span class="hljs-number">3</span>);
        });    
    });

});</code></pre>
<p>关于测试，大家可以看下<a href="http://www.jackpu.com/yi-shi-yong-karmajin-xing-angularce-shi/" rel="nofollow noreferrer" target="_blank">使用karma进行angular测试</a></p>
<p>除了<strong>Karam</strong> , Angular.js团队推出了一款e2e(end-to-end)的测试框架<a href="https://github.com/angular/protractor" rel="nofollow noreferrer" target="_blank">protractor</a></p>
<h3 id="articleHeader10">参考</h3>
<ul>
<li><p><a href="https://www.toptal.com/angular-js/interview-questions" rel="nofollow noreferrer" target="_blank">11 Essential AngularJS Interview Questions</a></p></li>
<li><p><a href="http://www.alexkras.com/11-tips-to-improve-angularjs-performance/#bind-once" rel="nofollow noreferrer" target="_blank">11 Tips to Improve AngularJS Performance</a></p></li>
<li><p><a href="http://www.williambrownstreet.net/blog/2013/07/angularjs-my-solution-to-the-ng-repeat-performance-problem/" rel="nofollow noreferrer" target="_blank">AngularJS: My solution to the ng-repeat performance problem</a></p></li>
<li><p><a href="https://www.codementor.io/angularjs/tutorial/angularjs-interview-questions-sample-answers" rel="nofollow noreferrer" target="_blank">29 AngularJS Interview Questions – Can You Answer Them All?</a></p></li>
<li><p><a href="https://www.ng-book.com/p/The-Digest-Loop-and-apply/" rel="nofollow noreferrer" target="_blank">The Digest Loop and $apply</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/14050195/angularjs-what-is-the-difference-between-and-in-directive-scope" rel="nofollow noreferrer" target="_blank">What is the difference between '@' and '=' in directive scope</a></p></li>
<li><p><a href="https://docs.angularjs.org/api/ng/service/%24compile#directive-definition-object" rel="nofollow noreferrer" target="_blank">Angular compile</a></p></li>
</ul>
<hr>
<p>本文同步博客：<a href="http://www.jackpu.com/shi-ge-jing-chang-yu-jian-de-angular-jsmian-shi-wen-ti/" rel="nofollow noreferrer" target="_blank">http://www.jackpu.com/shi-ge-jing-chang-yu-jian-de-angular-jsmian-shi-wen-ti/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular面试从喜剧到悲剧的十个问题

## 原文链接
[https://segmentfault.com/a/1190000005817928](https://segmentfault.com/a/1190000005817928)


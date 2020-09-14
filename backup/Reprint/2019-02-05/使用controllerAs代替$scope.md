---
title: '使用controllerAs代替$scope' 
date: 2019-02-05 2:30:09
hidden: true
slug: yhvzuti8j6p
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">controllerAs做了什么</h2>
<p>我们在定义路由时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".state('account.register', {
    url: '/register',
    templateUrl: 'app/account/register.html',
    controller: 'RegisterCtrl',
    controllrtAs: 'vm'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-class">.state</span>(<span class="hljs-string">'account.register'</span>, {
    <span class="hljs-attribute">url</span>: <span class="hljs-string">'/register'</span>,
    <span class="hljs-attribute">templateUrl</span>: <span class="hljs-string">'app/account/register.html'</span>,
    <span class="hljs-attribute">controller</span>: <span class="hljs-string">'RegisterCtrl'</span>,
    <span class="hljs-attribute">controllrtAs</span>: <span class="hljs-string">'vm'</span>
})</code></pre>
<p>在angular的源代码中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="locals.$scope[state.controllerAs] = controllerInstance;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">locals.<span class="hljs-variable">$scope</span>[<span class="hljs-keyword">state</span>.controllerAs] = controllerInstance;</code></pre>
<p>可以发现angular把控制器的实例作为$scope上以controllerAs的值为名称的对象属性上了。<br>我们用<a href="https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?utm_source=chrome-app-launcher-info-dialog" rel="nofollow noreferrer" target="_blank">Batarang</a>查看一下<br><span class="img-wrap"><img data-src="/img/bVBWTS" src="https://static.alili.tech/img/bVBWTS" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>发现确实是这样。</p>
<h2 id="articleHeader1">为什么要使用controllerAs</h2>
<ol>
<li>
<p>$scope是基于原型进行继承的，比如说当我们查找一个user对象时，angular会先查找当前$scope有没有user，如果没有的话就继续往上层$scope查找，直至$rootScope。<br><span class="img-wrap"><img data-src="/img/bVBW9D" src="https://static.alili.tech/img/bVBW9D" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>   而在controllerAs中，假设我们使用controllerAs</p>
<p><code> UserCtrl as ctrl </code><br>   angular将控制器自身挂载在$scope上，user也变为ctrl.user，就不会存在上述的一层层查找的过程。在很多情况下，比如在嵌套的路由中，上述$scope基于原型的查找，有时候确实会提供一些便利，但这些都可以用服务来实现，也应该使用服务来实现。<br><span class="img-wrap"><img data-src="/img/bVBXaI" src="https://static.alili.tech/img/bVBXaI" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
</li>
<li><p>大家在初次接触angular时一定会被推荐过将所有数据都绑定在$scope的一个对象上（比如$scope.data）来避免一些js中值的复制和对象的引用可能会造成的一些问题（公司里的新人大部分也确实遇到过这类问题），而使用controllerAs后就不需要这一步了，因为人家本来就是。</p></li>
<li><p>因为不使用$scope也就不能使用$on,$watch,$emit之类的方法，这些方法本来就应该尽量少用，这样就可以更好的控制项目中的代码，当不得不用这类方法时可以参考下面的案例。</p></li>
<li><p>便于新人学习，我发现新人对于$scope这个东西往往无法理解，而用controllerAs vm之后，则将vm（view model的简写）作为视图模型则比较好理解。</p></li>
</ol>
<h2 id="articleHeader2">当必须要使用$watch（$on、$emit、$broadcast）时该怎么做</h2>
<p>当出现这种情况时我们可以把$scope当做单纯的一种服务来使用，他提供了上述的方法，比如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyCtrl ($scope) {
    var vm = this;
    vm.name = 'liulei';
    vm.count = 0;
    $scope.$watch('vm.count', function (newVal, oldVal) {
        vm.count ++;
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyCtrl</span> <span class="hljs-params">($scope)</span> </span>{
    <span class="hljs-keyword">var</span> vm = this;
    vm.name = <span class="hljs-string">'liulei'</span>;
    vm.count = <span class="hljs-number">0</span>;
    $scope.$watch(<span class="hljs-string">'vm.count'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(newVal, oldVal)</span> </span>{
        vm.count ++;
    });
}</code></pre>
<h2 id="articleHeader3">在指令中使用controllerAs</h2>
<p>在指令中如果不需要数据绑定时，我们简单的将scope这个选项设置为<em>true</em>或者<em>{}</em>即可，可当我们需要从外部绑定一个值或者对象到指令中该怎么办呢？因为我们知道如果用scope选项的话，肯定是绑定到指令的scope对象上的，这里我们直接使用bindToController选项即可，上代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
angular.module('nodeInAction')
.directive('countCard', function () {
    return {
        restrict: 'E',
        controllerAs: 'vm',
        scope: {},
        bindToController: {
            icon: '@',
            title: '@',
            count: '@',
            unit: '@',
            colorStyle: '@'
        },
        templateUrl: 'app/components/countCard/countCard.html',
        controller: function () {
            var vm = this;        
            console.log(vm);
        }
    };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>;
angular.module(<span class="hljs-string">'nodeInAction'</span>)
.directive(<span class="hljs-string">'countCard'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">restrict</span>: <span class="hljs-string">'E'</span>,
        <span class="hljs-attr">controllerAs</span>: <span class="hljs-string">'vm'</span>,
        <span class="hljs-attr">scope</span>: {},
        <span class="hljs-attr">bindToController</span>: {
            <span class="hljs-attr">icon</span>: <span class="hljs-string">'@'</span>,
            <span class="hljs-attr">title</span>: <span class="hljs-string">'@'</span>,
            <span class="hljs-attr">count</span>: <span class="hljs-string">'@'</span>,
            <span class="hljs-attr">unit</span>: <span class="hljs-string">'@'</span>,
            <span class="hljs-attr">colorStyle</span>: <span class="hljs-string">'@'</span>
        },
        <span class="hljs-attr">templateUrl</span>: <span class="hljs-string">'app/components/countCard/countCard.html'</span>,
        <span class="hljs-attr">controller</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">this</span>;        
            <span class="hljs-built_in">console</span>.log(vm);
        }
    };
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVBXoq" src="https://static.alili.tech/img/bVBXoq" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>结果也是我们想要的结果。bindToController的作用的作用也很好理解也就是将属性绑定到controller自身上。<br>也可以这样写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
angular.module('nodeInAction')
.directive('countCard', function () {
    return {
        restrict: 'E',
        scope: {
            icon: '@',
            title: '@',
            count: '@',
            unit: '@',
            colorStyle: '@'
        },
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: 'app/components/countCard/countCard.html',
        controller: function () {
            var vm = this;        
            console.log(vm);
        }
    };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>;
angular.module(<span class="hljs-string">'nodeInAction'</span>)
.directive(<span class="hljs-string">'countCard'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">restrict</span>: <span class="hljs-string">'E'</span>,
        <span class="hljs-attr">scope</span>: {
            <span class="hljs-attr">icon</span>: <span class="hljs-string">'@'</span>,
            <span class="hljs-attr">title</span>: <span class="hljs-string">'@'</span>,
            <span class="hljs-attr">count</span>: <span class="hljs-string">'@'</span>,
            <span class="hljs-attr">unit</span>: <span class="hljs-string">'@'</span>,
            <span class="hljs-attr">colorStyle</span>: <span class="hljs-string">'@'</span>
        },
        <span class="hljs-attr">controllerAs</span>: <span class="hljs-string">'vm'</span>,
        <span class="hljs-attr">bindToController</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">templateUrl</span>: <span class="hljs-string">'app/components/countCard/countCard.html'</span>,
        <span class="hljs-attr">controller</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">this</span>;        
            <span class="hljs-built_in">console</span>.log(vm);
        }
    };
});</code></pre>
<p>效果是一样的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用controllerAs代替$scope

## 原文链接
[https://segmentfault.com/a/1190000006624138](https://segmentfault.com/a/1190000006624138)


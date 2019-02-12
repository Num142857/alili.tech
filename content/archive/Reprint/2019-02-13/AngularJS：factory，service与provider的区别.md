---
title: 'AngularJS：factory，service与provider的区别' 
date: 2019-02-13 2:31:22
hidden: true
slug: apgtugcoy9c
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>翻译自 <a href="http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/" rel="nofollow noreferrer" target="_blank">http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/</a></p></blockquote>
<p>当你开始使用Angular的时候，你会发现，你总是会让你的控制器和作用域充满各种不必要的逻辑。你应该早点意识到一个控制器应该是很简洁精炼的；同时大多数的商业逻辑和一些重复性的数据都应该要存储到服务中。一天我在Stack Overflow上看到一些问题说是考虑将重复性的数据放在控制器里，但是，这不是这不是一个控制器应该有的目的。如果为了内存需要，控制器就应该在需要他们的时候实例化，在不需要的时候就取消掉。因此，Angular在你每次切换路由的时候，就会清理当前的控制器。但是呢，服务为我们提供了一种长期存储应用数据的方式，同时，也可以在不同的控制器之间统一的使用服务。</p>
<p>Angular为我们提供了三种创建服务的方式：</p>
<p><strong>1、Factory</strong><br><strong>2、Service</strong><br><strong>3、Provider</strong></p>
<h3 id="articleHeader0">先简单介绍一下</h3>
<p><strong>一、</strong>当使用<code>factory</code>来创建服务的时候，相当于新创建了一个对象，然后在这个对象上新添属性，最后返回这个对象。当把这个服务注入控制器的时候，控制器就可以访问在那个对象上的属性了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.factory('MyFactory', function () {
        var _artist = '',
            service = {};

        service.getArtist = function () {
            return _artist;
        };

        return service;
    })
    .controller('myFactoryCtrl', [
        '$scope', 'MyFactory',
        function ( $scope, MyFactory ) {
            $scope.artist = MyFactory.getArtist();
        }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.factory(<span class="hljs-string">'MyFactory'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _artist = <span class="hljs-string">''</span>,
            service = {};

        service.getArtist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> _artist;
        };

        <span class="hljs-keyword">return</span> service;
    })
    .controller(<span class="hljs-string">'myFactoryCtrl'</span>, [
        <span class="hljs-string">'$scope'</span>, <span class="hljs-string">'MyFactory'</span>,
        <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $scope, MyFactory </span>) </span>{
            $scope.artist = MyFactory.getArtist();
        }]);</code></pre>
<p><strong>二、</strong>当使用<code>service</code>创建服务的时候，相当于使用<code>new</code>关键词进行了实例化。因此，你只需要在<code>this</code>上添加属性和方法，然后，服务就会自动的返回<code>this</code>。当把这个服务注入控制器的时候，控制器就可以访问在那个对象上的属性了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.service('MyService', function () {
        var _artist = '';
    
        this.getArtist = function () {
            return _artist;
        };
    })
    .controller('myServiceCtrl', [
        '$scope', 'MyService',
        function ( $scope, MyService ) {
            $scope.artist = MyService.getArtist();
        }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.service(<span class="hljs-string">'MyService'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _artist = <span class="hljs-string">''</span>;
    
        <span class="hljs-keyword">this</span>.getArtist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> _artist;
        };
    })
    .controller(<span class="hljs-string">'myServiceCtrl'</span>, [
        <span class="hljs-string">'$scope'</span>, <span class="hljs-string">'MyService'</span>,
        <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $scope, MyService </span>) </span>{
            $scope.artist = MyService.getArtist();
        }]);</code></pre>
<p><strong>三、</strong><code>provider</code>是唯一一种可以创建用来注入到<code>config()</code>函数的服务的方式。想在你的服务启动之前，进行一些模块化的配置的话，就使用<code>provider</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.provider('MyProvider', function () {

        // 只有直接添加在this上的属性才能被config函数访问
        this._artist = '';
        this.thingFromConfig = '';

        // 只有$get函数返回的属性才能被控制器访问
        this.$get = function () {
            var that = this;

            return {
                getArtist: function () {
                    return that._artist;
                },
                thingFromConfig: that.thingFromConfig
            };
        };
    })
    .config(['MyProvider', function ( MyProvider ) {
        MyProvider.thingFormConfig = 'this is set in config()';
    }])
    .controller('myProviderCtrl', [
        '$scope', 'MyProvider',
        function ( $scope, MyProvider ) {
            $scope.artist = MyProvider.getArtist();
        }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.provider(<span class="hljs-string">'MyProvider'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

        <span class="hljs-comment">// 只有直接添加在this上的属性才能被config函数访问</span>
        <span class="hljs-keyword">this</span>._artist = <span class="hljs-string">''</span>;
        <span class="hljs-keyword">this</span>.thingFromConfig = <span class="hljs-string">''</span>;

        <span class="hljs-comment">// 只有$get函数返回的属性才能被控制器访问</span>
        <span class="hljs-keyword">this</span>.$get = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;

            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">getArtist</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">return</span> that._artist;
                },
                <span class="hljs-attr">thingFromConfig</span>: that.thingFromConfig
            };
        };
    })
    .config([<span class="hljs-string">'MyProvider'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> MyProvider </span>) </span>{
        MyProvider.thingFormConfig = <span class="hljs-string">'this is set in config()'</span>;
    }])
    .controller(<span class="hljs-string">'myProviderCtrl'</span>, [
        <span class="hljs-string">'$scope'</span>, <span class="hljs-string">'MyProvider'</span>,
        <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $scope, MyProvider </span>) </span>{
            $scope.artist = MyProvider.getArtist();
        }]);</code></pre>
<h3 id="articleHeader1">下面我们来详细说明</h3>
<p>为了详细的说明这三种方式的不同之处，我们分别使用这三种方式来创建同一个服务。这个服务将会用到iTunes API以及promise的<code>$q</code>。</p>
<p><strong>使用<code>factory</code></strong></p>
<p>要创建和配置服务，最普通的做法就是使用<code>factory</code>。就像上面简单说明的那样，这里也没有太多要说明的地方，就是创建一个对象，然后为他添加属性和方法，最后返回这个对象。当把这个服务注入控制器的时候，控制器就可以访问在那个对象上的属性了。一个很普通的例子就像下面那样。</p>
<p>首先我们创建一个对象，然后返回这个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.factory('MyFactory', function () {
    var service = {};
    
    return service;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.factory(<span class="hljs-string">'MyFactory'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> service = {};
    
    <span class="hljs-keyword">return</span> service;
});</code></pre>
<p>现在，我们添加到<code>service</code>上的任何属性，只要将<code>MyFactory</code>注入到控制器，控制器就都可以访问了。</p>
<p>现在，我们添加一些私有属性到回调函数里，虽然不能从控制器里直接访问这些变量，但是最终我们会提供一些<code>getter</code>和<code>setter</code>方法到<code>service</code>上以便于我们在需要的时候修改这些属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.factory('MyFactory', [
    '$http', '$q', function ( $http, $q ) {
        var service = {},
            baseUrl = 'https://itunes.apple.com/search?term=',
            _artist = '',
            _finalUrl = '';

        function makeUrl() {
            _artist = _artist.split(' ').join('+');
            _finalUrl = baseUrl + _artist + '&amp;callback=JSON_CALLBACK';
            return _finalUrl;
        }

        return service;
    }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.factory(<span class="hljs-string">'MyFactory'</span>, [
    <span class="hljs-string">'$http'</span>, <span class="hljs-string">'$q'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $http, $q </span>) </span>{
        <span class="hljs-keyword">var</span> service = {},
            baseUrl = <span class="hljs-string">'https://itunes.apple.com/search?term='</span>,
            _artist = <span class="hljs-string">''</span>,
            _finalUrl = <span class="hljs-string">''</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeUrl</span>(<span class="hljs-params"></span>) </span>{
            _artist = _artist.split(<span class="hljs-string">' '</span>).join(<span class="hljs-string">'+'</span>);
            _finalUrl = baseUrl + _artist + <span class="hljs-string">'&amp;callback=JSON_CALLBACK'</span>;
            <span class="hljs-keyword">return</span> _finalUrl;
        }

        <span class="hljs-keyword">return</span> service;
    }]);</code></pre>
<p>你应该注意到了，我们没有把这些属性和方法添加到<code>service</code>对象上去。我们现在只是先简单的创建出来，以便于待会儿使用或者修改。</p>
<ul>
<li><p><code>baseUrl</code>是iTunes API需要的基本URL</p></li>
<li><p><code>_artist</code>是我们需要查找的艺术家</p></li>
<li><p><code>_finalUrl</code>是最终向iTunes发送请求的URL</p></li>
<li><p><code>makeUrl</code>是一个用来创建返回我们最终的URL的函数</p></li>
</ul>
<p>既然我们的辅助变量和函数都创建好了，那么，就往<code>service</code>添加一些属性吧。我们在<code>service</code>上添加的任何属性，只要服务注入了控制器中，那么，控制器就可以访问这些属性。</p>
<p>我们要创建一个<code>setArtist()</code>和<code>getArtist()</code>函数来设置以及取得艺术家的值。同时，也要创建一个用于向iTunes发送请求的函数。这个函数会返回一个promise对象，当有数据从iTunes返回的时候，这个promise对象就会执行。如果你对Angular的promise对象还不是很了解的话，推荐你去深入了解一下。</p>
<ul>
<li><p><code>setArtist()</code>接受一个参数并且允许用来设置艺术家的值</p></li>
<li><p><code>getArtist()</code>返回艺术家的值</p></li>
<li><p><code>callITunes()</code>首先会调用<code>makeUrl()</code>函数来创建我们需要使用<code>$http</code>进行请求的URL，然后使用我们最终的URL来发送请求，创建一个promise对象。由于<code>$http</code>返回了promise对象，我们就可以在请求之后调用<code>.success</code>和<code>.error</code>了。然后我们处理从iTunes返回的数据或者驳回，并返回一个错误消息，比如<code>There was an error</code>。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.factory('MyFactory', [
    '$http', '$q', function ( $http, $q ) {
        var service = {},
            baseUrl = 'https://itunes.apple.com/search?term=',
            _artist = '',
            _finalUrl = '';

        function makeUrl() {
            _artist = _artist.split(' ').join('+');
            _finalUrl = baseUrl + _artist + '&amp;callback=JSON_CALLBACK';
            return _finalUrl;
        }

        service.setArtist = function ( artist ) {
            _artist = artist;
        };

        service.getArtist = function () {
            return _artist;
        };

        service.callITunes = function () {
            var deferred = $q.defer();
            _finalUrl = makeUrl();

            $http({
                method: 'JSONP',
                url: _finalUrl
            }).success(function ( data ) {
                deferred.resolve(data);
            }).error(function ( error ) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        return service;
    }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.factory(<span class="hljs-string">'MyFactory'</span>, [
    <span class="hljs-string">'$http'</span>, <span class="hljs-string">'$q'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $http, $q </span>) </span>{
        <span class="hljs-keyword">var</span> service = {},
            baseUrl = <span class="hljs-string">'https://itunes.apple.com/search?term='</span>,
            _artist = <span class="hljs-string">''</span>,
            _finalUrl = <span class="hljs-string">''</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeUrl</span>(<span class="hljs-params"></span>) </span>{
            _artist = _artist.split(<span class="hljs-string">' '</span>).join(<span class="hljs-string">'+'</span>);
            _finalUrl = baseUrl + _artist + <span class="hljs-string">'&amp;callback=JSON_CALLBACK'</span>;
            <span class="hljs-keyword">return</span> _finalUrl;
        }

        service.setArtist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> artist </span>) </span>{
            _artist = artist;
        };

        service.getArtist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> _artist;
        };

        service.callITunes = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> deferred = $q.defer();
            _finalUrl = makeUrl();

            $http({
                <span class="hljs-attr">method</span>: <span class="hljs-string">'JSONP'</span>,
                <span class="hljs-attr">url</span>: _finalUrl
            }).success(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> data </span>) </span>{
                deferred.resolve(data);
            }).error(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> error </span>) </span>{
                deferred.reject(error);
            });

            <span class="hljs-keyword">return</span> deferred.promise;
        };

        <span class="hljs-keyword">return</span> service;
    }]);</code></pre>
<p>现在，我们的服务就完成了，我们可以将这个服务注入到任何的控制器了，并且，可以使用我们添加到<code>service</code>上的那些方法了(<code>getArtist</code>,  <code>setArtise</code>, <code>callITunes</code>)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.controller('myFactoryCtrl', [
    '$scope', 'MyFactory', function ( $scope, MyFactory ) {
        $scope.data = {};
        $scope.updateArtist = function () {
            MyFactory.setArtist($scope.data.artist);
        };

        $scope.submitArtist = function () {
            MyFactory.callITunes().then(function ( data ) {
                $scope.data.artistData = data;
            }, function ( error ) {
                alert(error);
            });
        };
    }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.controller(<span class="hljs-string">'myFactoryCtrl'</span>, [
    <span class="hljs-string">'$scope'</span>, <span class="hljs-string">'MyFactory'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $scope, MyFactory </span>) </span>{
        $scope.data = {};
        $scope.updateArtist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            MyFactory.setArtist($scope.data.artist);
        };

        $scope.submitArtist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            MyFactory.callITunes().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> data </span>) </span>{
                $scope.data.artistData = data;
            }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> error </span>) </span>{
                alert(error);
            });
        };
    }]);</code></pre>
<p>在上面的控制器中我们注入了<code>MyFactory</code>服务，然后，将从服务里来的数据设置到<code>$scope</code>的属性上。上面的代码中最难的地方应该就是你从来没有使用过promise。由于<code>callITunes()</code>返回了一个promise对象，所以一旦有数据从iTunes返回，promise执行的时候，我们就可以使用<code>.then()</code>方法来设置<code>$scope.data.artistData</code>的值了。你会注意到，我们的控制器非常简洁，我们所有的逻辑和重复性数据都写在了服务里面。</p>
<p><strong>使用<code>service</code></strong></p>
<p>也许在使用<code>service</code>创建服务时，我们需要知道的最重要的一件事就是他是使用<code>new</code>关键字进行实例化的。如果你是Javascript大师，你应该知道从代码的本质来思考。对于那些不了解Javascript背景的或者并不熟悉<code>new</code>实际做了什么的程序员，我们需要复习一下Javascript的基础知识，以便于最终帮助我们理解<code>service</code>的本质。</p>
<p>为了真正的看到当我们使用<code>new</code>来调用函数的时候发生了什么，我们来创建一个函数，并且使用<code>new</code>来调用他，然后，我们再看看在解释器发现<code>new</code>的时候，他会做什么。最终结果肯定是一样的。</p>
<p>首先创建我们的构造函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person( name, age ) {
    this.name = name;
    this.age = age;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"> name, age </span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
}</code></pre>
<p>这是一个典型的构造函数。现在，无论我们什么时候使用<code>new</code>来调用这个函数，<code>this</code>都会被绑定到新创建的那个对象上。</p>
<p>现在我们再在<code>Person</code>的原型上创建一个方法，以便于每一个实例都可以访问到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Person.prototype.sayName = function () {
    alert('My name is: ' + this.name);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">'My name is: '</span> + <span class="hljs-keyword">this</span>.name);
};</code></pre>
<p>现在，由于我们在<code>Person</code>对象的原型上创建了<code>sayName</code>函数，所以，<code>Person</code>的每一个实例都可以调用到这个方法。</p>
<p>既然我们已经有了构造函数和原型方法，那么，就来真正的创建一个<code>Person</code>的实例并且调用<code>sayName</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tyler = new Person('Tyler', 23);
tyler.sayName();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> tyler = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Tyler'</span>, <span class="hljs-number">23</span>);
tyler.sayName();</code></pre>
<p>所以，最终，所有的代码合起来就是下面这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person( name, age ) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayName = function () {
    alert('My name is: ' + this.name);
};

var tyler = new Person('Tyler', 23);
tyler.sayName();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"> name, age </span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
}

Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">'My name is: '</span> + <span class="hljs-keyword">this</span>.name);
};

<span class="hljs-keyword">var</span> tyler = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Tyler'</span>, <span class="hljs-number">23</span>);
tyler.sayName();</code></pre>
<p>现在我们来看看在使用<code>new</code>的时候到底发生了什么。首先你应该注意到的是，在我们的例子中，使用了<code>new</code>之后，我们可以使用<code>tyler</code>来调用<code>sayName</code>方法，就好像这是一个对象一样，当然，<code>tyler</code>确实是一个对象。所以，我们首先知道的就是无论我们是否能够在代码里面看见，<code>Person</code>构造函数是会返回一个对象的。第二，我们我们应该知道，<code>sayName</code>方法是在原型上的，不是直接定义在<code>Person</code>对象实例上的，所以，<code>Person</code>返回的对象必须是通过原型委托的。用更简单的例子说就是，当我们调用<code>tyler.sayName()</code>的时候，解释器就会说：“OK，我将会在刚创建的<code>tyler</code>对象上查找<code>sayName</code>函数，然后调用他。等会儿，我没有发现这个函数，只看到了<code>name</code>和<code>age</code>属性，让我再检查一下原型。哦，原来在原型上，让我来调用他”。</p>
<p>下面的代码就是你能够想象的在Javascript里，<code>new</code>实际做了什么。下面的代码是一个很基础的例子，我以解释器的视角来添加了一些注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person( name, age ) {
    //var obj = object.create(Person.prototype);
    //this = obj;

    this.name = name;
    this.age = age;
    
    //return thisl
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"> name, age </span>) </span>{
    <span class="hljs-comment">//var obj = object.create(Person.prototype);</span>
    <span class="hljs-comment">//this = obj;</span>

    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
    
    <span class="hljs-comment">//return thisl</span>
}</code></pre>
<p>现在，既然知道了<code>new</code>做了什么，那么，使用<code>service</code>来创建服务也很容易理解了。</p>
<p>在使用<code>service</code>创建服务时，我们需要知道的最重要的一件事就是他是使用<code>new</code>关键字进行实例化的。与上面的例子的知识相结合，你应该就能意识到你要把属性和方法添加到<code>this</code>上，并且，服务会自动返回<code>this</code>。</p>
<p>与我们使用<code>factory</code>创建服务的方式不同，我们不需要新创建一个对象然后再返回这个对象，因为正如我们前面所提到的那样，我们使用<code>new</code>的时候，解释器会自动创建对象，并且代理到他的原型，然后代替我们返回。</p>
<p>所以，在所有的开始之前，我们先创建我们的私有辅助函数，与我们之前使用<code>factory</code>创建的时候非常类似。现在我不会解释每一行的意义了，如果你有什么疑惑的话，可以看看前面的<code>factory</code>的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.service('MyService', [
    '$http', '$q', function ( $http, $q ) {
        var baseUrl = 'https://itunes.apple.com/search?term=',
            _artist = '',
            _finalUrl = '';

        function makeUrl() {
            _artist = _artist.split(' ').join('+');
            _finalUrl = baseUrl + _artist + '&amp;callback=JSON_CALLBACK';
            return _finalUrl;
        }
    }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.service(<span class="hljs-string">'MyService'</span>, [
    <span class="hljs-string">'$http'</span>, <span class="hljs-string">'$q'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $http, $q </span>) </span>{
        <span class="hljs-keyword">var</span> baseUrl = <span class="hljs-string">'https://itunes.apple.com/search?term='</span>,
            _artist = <span class="hljs-string">''</span>,
            _finalUrl = <span class="hljs-string">''</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeUrl</span>(<span class="hljs-params"></span>) </span>{
            _artist = _artist.split(<span class="hljs-string">' '</span>).join(<span class="hljs-string">'+'</span>);
            _finalUrl = baseUrl + _artist + <span class="hljs-string">'&amp;callback=JSON_CALLBACK'</span>;
            <span class="hljs-keyword">return</span> _finalUrl;
        }
    }]);</code></pre>
<p>现在，我们会把可用的方法都添加到<code>this</code>上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.service('MyService', [
    '$http', '$q', function ( $http, $q ) {
        var baseUrl = 'https://itunes.apple.com/search?term=',
            _artist = '',
            _finalUrl = '';

        function makeUrl() {
            _artist = _artist.split(' ').join('+');
            _finalUrl = baseUrl + _artist + '&amp;callback=JSON_CALLBACK';
            return _finalUrl;
        }

        this.setArtist = function ( artist ) {
            _artist = artist;
        };

        this.getArtist = function () {
            return _artist;
        };

        this.callITunes = function () {
            var deferred = $q.defer();
            _finalUrl = makeUrl();

            $http({
                method: 'JSONP',
                url: _finalUrl
            }).success(function ( data ) {
                deferred.resolve(data);
            }).error(function ( error ) {
                deferred.reject(error);
            });

            return deferred.promise;
        };
    }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.service(<span class="hljs-string">'MyService'</span>, [
    <span class="hljs-string">'$http'</span>, <span class="hljs-string">'$q'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $http, $q </span>) </span>{
        <span class="hljs-keyword">var</span> baseUrl = <span class="hljs-string">'https://itunes.apple.com/search?term='</span>,
            _artist = <span class="hljs-string">''</span>,
            _finalUrl = <span class="hljs-string">''</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeUrl</span>(<span class="hljs-params"></span>) </span>{
            _artist = _artist.split(<span class="hljs-string">' '</span>).join(<span class="hljs-string">'+'</span>);
            _finalUrl = baseUrl + _artist + <span class="hljs-string">'&amp;callback=JSON_CALLBACK'</span>;
            <span class="hljs-keyword">return</span> _finalUrl;
        }

        <span class="hljs-keyword">this</span>.setArtist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> artist </span>) </span>{
            _artist = artist;
        };

        <span class="hljs-keyword">this</span>.getArtist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> _artist;
        };

        <span class="hljs-keyword">this</span>.callITunes = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> deferred = $q.defer();
            _finalUrl = makeUrl();

            $http({
                <span class="hljs-attr">method</span>: <span class="hljs-string">'JSONP'</span>,
                <span class="hljs-attr">url</span>: _finalUrl
            }).success(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> data </span>) </span>{
                deferred.resolve(data);
            }).error(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> error </span>) </span>{
                deferred.reject(error);
            });

            <span class="hljs-keyword">return</span> deferred.promise;
        };
    }]);</code></pre>
<p>现在，就像我们使用<code>factory</code>所创建的服务那样，注入这个服务的任何一个控制器都可以使用<code>setArtist</code>，<code>getArtist</code>和<code>callITunes</code>方法了。下面是我们的<code>myServiceCtrl</code>，几乎与<code>myFactoryCtrl</code>相同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.controller('myServiceCtrl', [
    '$scope', 'MyService', function ( $scope, MyService ) {
        $scope.data = {};
        $scope.updateArtist = function () {
            MyService.setArtist($scope.data.artist);
        };

        $scope.submitArtist = function () {
            MyService.callITunes().then(function ( data ) {
                $scope.data.artistData = data;
            }, function ( error ) {
                alert(error);
            });
        };
    }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.controller(<span class="hljs-string">'myServiceCtrl'</span>, [
    <span class="hljs-string">'$scope'</span>, <span class="hljs-string">'MyService'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $scope, MyService </span>) </span>{
        $scope.data = {};
        $scope.updateArtist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            MyService.setArtist($scope.data.artist);
        };

        $scope.submitArtist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            MyService.callITunes().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> data </span>) </span>{
                $scope.data.artistData = data;
            }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> error </span>) </span>{
                alert(error);
            });
        };
    }]);</code></pre>
<p>正如我之前提到的，一旦你理解了<code>new</code>关键词做了什么，<code>service</code>和<code>factory</code>就几乎是相同的。</p>
<p><strong>使用<code>provider</code></strong></p>
<p>关于<code>provider</code>，要记住的最重要的一件事就是他是唯一一种可以创建用来注入到<code>app.config()</code>函数的服务的方式。</p>
<p>如果你需要在你的应用在别处运行之前对你的服务对象进行一部分的配置，那么，这个就显得很重要了。尽管与<code>service</code>和<code>provider</code>类似，但是我们还是会讲解一些他们的不同之处。</p>
<p>首先，类似的，我们设置我们的<code>provider</code>。下面的变量就是我们的私有函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.provider('MyProvider', function () {
    var baseUrl = 'https://itunes.apple.com/search?term=',
        _artist = '',
        _finalUrl = '';
    
    // 从config函数里设置这个属性
    this.thingFromConfig = '';

    function makeUrl() {
        _artist = _artist.split(' ').join('+');
        _finalUrl = baseUrl + _artist + '&amp;callback=JSON_CALLBACK';
        return _finalUrl;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.provider(<span class="hljs-string">'MyProvider'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> baseUrl = <span class="hljs-string">'https://itunes.apple.com/search?term='</span>,
        _artist = <span class="hljs-string">''</span>,
        _finalUrl = <span class="hljs-string">''</span>;
    
    <span class="hljs-comment">// 从config函数里设置这个属性</span>
    <span class="hljs-keyword">this</span>.thingFromConfig = <span class="hljs-string">''</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeUrl</span>(<span class="hljs-params"></span>) </span>{
        _artist = _artist.split(<span class="hljs-string">' '</span>).join(<span class="hljs-string">'+'</span>);
        _finalUrl = baseUrl + _artist + <span class="hljs-string">'&amp;callback=JSON_CALLBACK'</span>;
        <span class="hljs-keyword">return</span> _finalUrl;
    }
});</code></pre>
<blockquote><p>再说明一次，如果对上面的代码逻辑有疑问的话，可以参考之前的列子。</p></blockquote>
<p>你可以认为<code>provider</code>有三个部分，第一部分是私有变量和私有函数，这些变量和函数会在以后被修改。第二部分是在<code>app.config</code>函数里可以访问的变量和函数，所以，他们可以在在其他地方使用之前被修改。注意，这些变量和函数一定要添加到<code>this</code>上面才行。在我们的例子中，<code>app.config()</code>函数能够修改的只有<code>thingFromConfig</code>。第三部分是在控制器里可以访问的变量和函数。</p>
<p>当使用 <code>provider</code>创建服务的时候，唯一可以让控制器访问的属性和方法是在<code>$get()</code>函数里返回的属性和方法。下面的代码将<code>$get</code>添加到了<code>this</code>上面，最终这个函数会被返回。</p>
<p>现在，<code>$get()</code>函数会返回我们需要在控制器里访问的函数和变量。下面是代码例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$get = function ( $http, $q ) {
            return {
                setArtist: function ( artist ) {
                    _artist = artist;
                },
                getArtist: function () {
                    return _artist;
                },
                callITunes: function () {
                    var deferred = $q.defer();
                    _finalUrl = makeUrl();

                    $http({
                        method: 'JSONP',
                        url: _finalUrl
                    }).success(function ( data ) {
                        deferred.resolve(data);
                    }).error(function ( error ) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                },
                thingOnConfig: this.thingFromConfig
            };
        };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.$get = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $http, $q </span>) </span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">setArtist</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> artist </span>) </span>{
                    _artist = artist;
                },
                <span class="hljs-attr">getArtist</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">return</span> _artist;
                },
                <span class="hljs-attr">callITunes</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">var</span> deferred = $q.defer();
                    _finalUrl = makeUrl();

                    $http({
                        <span class="hljs-attr">method</span>: <span class="hljs-string">'JSONP'</span>,
                        <span class="hljs-attr">url</span>: _finalUrl
                    }).success(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> data </span>) </span>{
                        deferred.resolve(data);
                    }).error(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> error </span>) </span>{
                        deferred.reject(error);
                    });

                    <span class="hljs-keyword">return</span> deferred.promise;
                },
                <span class="hljs-attr">thingOnConfig</span>: <span class="hljs-keyword">this</span>.thingFromConfig
            };
        };</code></pre>
<p>现在，完整的<code>provider</code>就是这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.provider('MyProvider', [
    '$http', '$q', function ( $http, $q ) {
        var baseUrl = 'https://itunes.apple.com/search?term=',
            _artist = '',
            _finalUrl = '';

        this.thingFromConfig = '';

        this.$get = function ( $http, $q ) {
            return {
                setArtist: function ( artist ) {
                    _artist = artist;
                },
                getArtist: function () {
                    return _artist;
                },
                callITunes: function () {
                    var deferred = $q.defer();
                    _finalUrl = makeUrl();

                    $http({
                        method: 'JSONP',
                        url: _finalUrl
                    }).success(function ( data ) {
                        deferred.resolve(data);
                    }).error(function ( error ) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                },
                thingOnConfig: this.thingFromConfig
            };
        };

        function makeUrl() {
            _artist = _artist.split(' ').join('+');
            _finalUrl = baseUrl + _artist + '&amp;callback=JSON_CALLBACK';
            return _finalUrl;
        }
    }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.provider(<span class="hljs-string">'MyProvider'</span>, [
    <span class="hljs-string">'$http'</span>, <span class="hljs-string">'$q'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $http, $q </span>) </span>{
        <span class="hljs-keyword">var</span> baseUrl = <span class="hljs-string">'https://itunes.apple.com/search?term='</span>,
            _artist = <span class="hljs-string">''</span>,
            _finalUrl = <span class="hljs-string">''</span>;

        <span class="hljs-keyword">this</span>.thingFromConfig = <span class="hljs-string">''</span>;

        <span class="hljs-keyword">this</span>.$get = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $http, $q </span>) </span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">setArtist</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> artist </span>) </span>{
                    _artist = artist;
                },
                <span class="hljs-attr">getArtist</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">return</span> _artist;
                },
                <span class="hljs-attr">callITunes</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">var</span> deferred = $q.defer();
                    _finalUrl = makeUrl();

                    $http({
                        <span class="hljs-attr">method</span>: <span class="hljs-string">'JSONP'</span>,
                        <span class="hljs-attr">url</span>: _finalUrl
                    }).success(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> data </span>) </span>{
                        deferred.resolve(data);
                    }).error(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> error </span>) </span>{
                        deferred.reject(error);
                    });

                    <span class="hljs-keyword">return</span> deferred.promise;
                },
                <span class="hljs-attr">thingOnConfig</span>: <span class="hljs-keyword">this</span>.thingFromConfig
            };
        };

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeUrl</span>(<span class="hljs-params"></span>) </span>{
            _artist = _artist.split(<span class="hljs-string">' '</span>).join(<span class="hljs-string">'+'</span>);
            _finalUrl = baseUrl + _artist + <span class="hljs-string">'&amp;callback=JSON_CALLBACK'</span>;
            <span class="hljs-keyword">return</span> _finalUrl;
        }
    }]);</code></pre>
<p>现在，与之前的<code>service</code>和<code>factory</code>类似，只要我们把<code>MyProvider</code>注入到控制器里面，对应的方法就可以使用了。下面是<code>myProviderCtrl</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.controller('myProviderCtrl', [
    '$scope', 'MyProvider', function ( $scope, MyProvider ) {
        $scope.data = {};
        $scope.updateArtist = function () {
            MyProvider.setArtist($scope.data.artist);
        };

        $scope.submitArtist = function () {
            MyProvider.callITunes().then(function ( data ) {
                $scope.data.artistData = data;
            }, function ( error ) {
                alert(error);
            });
        };

        $scope.data.thingFromConfig = MyProvider.thingOnConfig;
    }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.controller(<span class="hljs-string">'myProviderCtrl'</span>, [
    <span class="hljs-string">'$scope'</span>, <span class="hljs-string">'MyProvider'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> $scope, MyProvider </span>) </span>{
        $scope.data = {};
        $scope.updateArtist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            MyProvider.setArtist($scope.data.artist);
        };

        $scope.submitArtist = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            MyProvider.callITunes().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> data </span>) </span>{
                $scope.data.artistData = data;
            }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> error </span>) </span>{
                alert(error);
            });
        };

        $scope.data.thingFromConfig = MyProvider.thingOnConfig;
    }]);</code></pre>
<p>正如之前提到的，使用<code>provider</code>来创建服务的目的就是为了能够通过<code>app.config()</code>函数修改一些变量来传递到最终的项目中。我们来看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.config(['MyProviderProvider', function ( MyProviderProvider ) {
    MyProviderProvider.thingFromConfig = 'This sentence was set in app.config. Providers are the only service that can be passed into app.config. Check out the code to see how it works.';
}]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.config([<span class="hljs-string">'MyProviderProvider'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> MyProviderProvider </span>) </span>{
    MyProviderProvider.thingFromConfig = <span class="hljs-string">'This sentence was set in app.config. Providers are the only service that can be passed into app.config. Check out the code to see how it works.'</span>;
}]);</code></pre>
<p>现在，你就能看到，在<code>provider</code>里，<code>thingFromConfig</code>是空字符串，但是，当我们在DOM里显示的时候，他就会是我们上面所设置的字符串了。</p>
<p>谢谢你的阅读，希望能够帮助你分辨这三者的不同之处。</p>
<blockquote><p>要查看完整的代码例子，欢迎fork我的项目：<a href="https://github.com/tylermcginnis33/AngularServices" rel="nofollow noreferrer" target="_blank">https://github.com/tylermcginnis33/AngularServices</a> 或者查看<a href="http://stackoverflow.com/a/23683176/1867084" rel="nofollow noreferrer" target="_blank">我在Stack Overflow的问题回答</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
AngularJS：factory，service与provider的区别

## 原文链接
[https://segmentfault.com/a/1190000004602085](https://segmentfault.com/a/1190000004602085)


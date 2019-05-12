---
title: '为Hexo加入浏览量的功能' 
date: 2019-01-12 2:30:24
hidden: true
slug: 0myb6q7a2nnk
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>版权声明：更多文章请访问我的个人站<a href="http://xilan.me" rel="nofollow noreferrer" target="_blank">Keyon Y</a>，转载请注明出处。</blockquote>
<p>Hexo是和WordPress一样的完善的博客系统，但是好多辅助功能/插件需要是访问谷歌的服务器的，在我大天朝就只能看看了。可是我们勤劳的程序猿们不甘心不那么完美，所以大神们写了各种教程，通过其他的方法解决了因为谷歌而不能使用的功能，<br>今天就来说说<strong>为Hexo博客网站加上的浏览量功能</strong>。</p>
<p><strong>原理就是使用<a href="https://leancloud.cn/" rel="nofollow noreferrer" target="_blank">leancloud</a>作为数据库托管</strong>，使用leancloud的API进行操作数据的读取和写入。  </p>
<p>在<a href="https://leancloud.cn/" rel="nofollow noreferrer" target="_blank">leancloud</a>上注册一个账号，然后参考<a href="https://leancloud.cn/docs/leanstorage_guide-js.html#" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<p>html页面引入js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 存储服务 -->
<script src=&quot;//cdn1.lncld.net/static/js/2.5.0/av-min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;!-- 存储服务 --&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn1.lncld.net/static/js/2.5.0/av-min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>在后台管理中新建一个应用  <br><span class="img-wrap"><img data-src="http://ormqw9b48.bkt.clouddn.com/leancloud%E6%96%B0%E5%BB%BA%E5%BA%94%E7%94%A8.png" src="https://static.alili.techhttp://ormqw9b48.bkt.clouddn.com/leancloud%E6%96%B0%E5%BB%BA%E5%BA%94%E7%94%A8.png" alt="img" title="img" style="cursor: pointer; display: inline;"></span><br>初始化，APP_ID和APP_KEY在应用的<strong>设置-应用key</strong>中查找</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var APP_ID = 'fasdfaICadjaklsdbaskd-gasdasfz';
var APP_KEY = 'gfdgsArfgsdg';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
var Todo = AV.Object.extend('test');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> APP_ID = <span class="hljs-string">'fasdfaICadjaklsdbaskd-gasdasfz'</span>;
<span class="hljs-keyword">var</span> APP_KEY = <span class="hljs-string">'gfdgsArfgsdg'</span>;
AV.init({
  <span class="hljs-attr">appId</span>: APP_ID,
  <span class="hljs-attr">appKey</span>: APP_KEY
});
<span class="hljs-keyword">var</span> Todo = AV.Object.extend(<span class="hljs-string">'test'</span>);</code></pre>
<p>由于hexo的链接地址都是这样子的<span class="img-wrap"><img data-src="http://ormqw9b48.bkt.clouddn.com/hexo%E9%93%BE%E6%8E%A5%E5%9C%B0%E5%9D%80.png" src="https://static.alili.techhttp://ormqw9b48.bkt.clouddn.com/hexo%E9%93%BE%E6%8E%A5%E5%9C%B0%E5%9D%80.png" alt="img" title="img" style="cursor: pointer;"></span><br>就是文章的标题作为链接地址，所以用文章的标题来查找和创建数据的唯一标识，用content字段来存储浏览次数；  <br>新增一条数据的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 保存
function saveToLeancloud(title){
    var newData = new Todo();
    newData.save({
        title: title,
        content: '0'
    }).then(function (data) {
        console.log(data);
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 保存</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">saveToLeancloud</span>(<span class="hljs-params">title</span>)</span>{
    <span class="hljs-keyword">var</span> newData = <span class="hljs-keyword">new</span> Todo();
    newData.save({
        <span class="hljs-attr">title</span>: title,
        <span class="hljs-attr">content</span>: <span class="hljs-string">'0'</span>
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data);
    })
}</code></pre>
<p>新增以后要实现浏览/刷新后点击量每次+1，就要更新数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 更新一条 文章浏览量数据
var _update = function(obj){
        // 第一个参数是 className，第二个参数是 objectId
        var todo = AV.Object.createWithoutData(className, obj.id);
        var count = parseInt(obj.get('content'))+1;
        // 修改属性
        todo.set('content', count.toString());
        // 保存到云端
        todo.save();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 更新一条 文章浏览量数据</span>
<span class="hljs-keyword">var</span> _update = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
        <span class="hljs-comment">// 第一个参数是 className，第二个参数是 objectId</span>
        <span class="hljs-keyword">var</span> todo = AV.Object.createWithoutData(className, obj.id);
        <span class="hljs-keyword">var</span> count = <span class="hljs-built_in">parseInt</span>(obj.get(<span class="hljs-string">'content'</span>))+<span class="hljs-number">1</span>;
        <span class="hljs-comment">// 修改属性</span>
        todo.set(<span class="hljs-string">'content'</span>, count.toString());
        <span class="hljs-comment">// 保存到云端</span>
        todo.save();
}</code></pre>
<p>html中加入类名为‘.leancloud_visitors’的元素用来往其中填充数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--我用的是jade模板引擎，#{}就是赋值，ejs、swig等模板请参考对应文档的写法 -->
span(id=&quot;#{item.title}&quot;, class=&quot;leancloud_visitors&quot;, data-pageNum=&quot;#{page.current}&quot;)
// page.current是系统变量直接调用，这个值用来记录列表页的当前页码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--我用的是jade模板引擎，#{}就是赋值，ejs、swig等模板请参考对应文档的写法 --&gt;</span>
span(id="#{item.title}", class="leancloud_visitors", data-pageNum="#{page.current}")
// page.current是系统变量直接调用，这个值用来记录列表页的当前页码</code></pre>
<p>获取数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pageCounts = 2;  // 每页返回条数
    if($('.leancloud_visitors').attr('data-pageNum')!= 'undefined'){    // 判断是否为列表页
        var pageNum = parseInt($('.leancloud_visitors').attr('data-pageNum'))-1;    // 当前页码
    }
// 获取详情页的访问次数数据
    var _getDetailTime = function(title) {
        var query = new AV.Query(className);
        query.equalTo(&quot;title&quot;, title);
        return query.find();
    }

    // 获取列表页的访问次数数据
    var _getListTime = function(){
        var query = new AV.Query(className);
        query.limit(pageCounts);            // 查询数据时返回的数量-每页返回的条数
        query.skip(pageCounts*pageNum);     // 查询数据时跳过的数量-当前页码*每页返回的条数
        query.descending('createdAt');      // 按新建的时间降序排列
        return query.find();
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> pageCounts = <span class="hljs-number">2</span>;  <span class="hljs-comment">// 每页返回条数</span>
    <span class="hljs-keyword">if</span>($(<span class="hljs-string">'.leancloud_visitors'</span>).attr(<span class="hljs-string">'data-pageNum'</span>)!= <span class="hljs-string">'undefined'</span>){    <span class="hljs-comment">// 判断是否为列表页</span>
        <span class="hljs-keyword">var</span> pageNum = <span class="hljs-built_in">parseInt</span>($(<span class="hljs-string">'.leancloud_visitors'</span>).attr(<span class="hljs-string">'data-pageNum'</span>))<span class="hljs-number">-1</span>;    <span class="hljs-comment">// 当前页码</span>
    }
<span class="hljs-comment">// 获取详情页的访问次数数据</span>
    <span class="hljs-keyword">var</span> _getDetailTime = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">title</span>) </span>{
        <span class="hljs-keyword">var</span> query = <span class="hljs-keyword">new</span> AV.Query(className);
        query.equalTo(<span class="hljs-string">"title"</span>, title);
        <span class="hljs-keyword">return</span> query.find();
    }

    <span class="hljs-comment">// 获取列表页的访问次数数据</span>
    <span class="hljs-keyword">var</span> _getListTime = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> query = <span class="hljs-keyword">new</span> AV.Query(className);
        query.limit(pageCounts);            <span class="hljs-comment">// 查询数据时返回的数量-每页返回的条数</span>
        query.skip(pageCounts*pageNum);     <span class="hljs-comment">// 查询数据时跳过的数量-当前页码*每页返回的条数</span>
        query.descending(<span class="hljs-string">'createdAt'</span>);      <span class="hljs-comment">// 按新建的时间降序排列</span>
        <span class="hljs-keyword">return</span> query.find();
    }</code></pre>
<p>然后是填充浏览量数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 填充访问次数
    var _writeCount = function(data){
        if($('.post-page').length == 0){    // 判断是在列表页还是详情页
            $('.leancloud_visitors').each(function(i,e){
                $(e).text(parseInt(data[i].get('content')));
            })
        }else{
            $('.leancloud_visitors').each(function(i,e){
                $(e).text(parseInt(data[i].get('content'))+1);
            })
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 填充访问次数</span>
    <span class="hljs-keyword">var</span> _writeCount = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-keyword">if</span>($(<span class="hljs-string">'.post-page'</span>).length == <span class="hljs-number">0</span>){    <span class="hljs-comment">// 判断是在列表页还是详情页</span>
            $(<span class="hljs-string">'.leancloud_visitors'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i,e</span>)</span>{
                $(e).text(<span class="hljs-built_in">parseInt</span>(data[i].get(<span class="hljs-string">'content'</span>)));
            })
        }<span class="hljs-keyword">else</span>{
            $(<span class="hljs-string">'.leancloud_visitors'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i,e</span>)</span>{
                $(e).text(<span class="hljs-built_in">parseInt</span>(data[i].get(<span class="hljs-string">'content'</span>))+<span class="hljs-number">1</span>);
            })
        }
    }</code></pre>
<p>判断当前在列表页还是详情页</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 判断列表页or详情页
    var _isList = function(){
        if($('.post-page').length == 0){
            return true;
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 判断列表页or详情页</span>
    <span class="hljs-keyword">var</span> _isList = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>($(<span class="hljs-string">'.post-page'</span>).length == <span class="hljs-number">0</span>){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
    }</code></pre>
<p><strong>最终完整的方法写在了一个js文件中，例如leancloudConfig.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var leanCloud = (function(){
    var APP_ID = 'fasdfaICadjaklsdbaskd-gasdasfz';
    var APP_KEY = 'gfdgsArfgsdg';
    var className,Todo;
    var pageCounts = 2; // 每页返回条数
    if($('.leancloud_visitors').attr('data-pageNum')!= 'undefined'){
        var pageNum = parseInt($('.leancloud_visitors').attr('data-pageNum'))-1;    // 当前页码
    }

    // 初始化
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });

    // 新增一条 文章统计数据【仅限一条】
    var _addCount = function() {
        // 监听 新增按钮 被点击
        function addListenButton(){
            setTimeout(function(){
                console.log('start listen...');
                $('.new-post_button').click(function(){addListenInput();})
            },5000)    //考虑到服务器的带宽仅有1M，网速较慢所以将此方法延迟执行
        }
        // 监听 回车/点击确定按钮 后 执行保存
        function addListenInput(){
            var inputTitle;
            setTimeout(function(){
                $('.new-post_input').blur(function(){
                    inputTitle = $(this).val();
                })
                $('.new-post_ok').mousedown(function(){
                    var title = $('.new-post_input').val();
                    saveToLeancloud(title);
                    addListenButton();
                })
                $(document).keypress(function(e){
                    if(e.which == 13){
                        var title = inputTitle;
                        saveToLeancloud(title);
                        addListenButton();
                    }
                })
            },500)
        }

        // 保存
        function saveToLeancloud(title){
            var newData = new Todo();
            newData.save({
                title: title,
                content: '0'
            }).then(function (data) {
                console.log(data);
            })
        }
        addListenButton();
    }

    // 获取详情页的访问次数数据
    var _getDetailTime = function(title) {
        var query = new AV.Query(className);
        query.equalTo(&quot;title&quot;, title);
        return query.find();
    }

    // 获取列表页的访问次数数据
    var _getListTime = function(){
        var query = new AV.Query(className);
        query.limit(pageCounts);            // 查询数据时返回的数量-每页返回的条数
        query.skip(pageCounts*pageNum);     // 查询数据时跳过的数量-当前页码*每页返回的条数
        query.descending('createdAt');      // 按新建的时间降序排列
        return query.find();
    }

    // 更新一条 文章浏览量数据
    var _update = function(obj){
        // 第一个参数是 className，第二个参数是 objectId
        var todo = AV.Object.createWithoutData(className, obj.id);
        var count = parseInt(obj.get('content'))+1;
        // 修改属性
        todo.set('content', count.toString());
        // 保存到云端
        todo.save();
    }
    // 填充访问次数
    var _writeCount = function(data){
        if($('.post-page').length == 0){
            $('.leancloud_visitors').each(function(i,e){
                $(e).text(parseInt(data[i].get('content')));
            })
        }else{
            $('.leancloud_visitors').each(function(i,e){
                $(e).text(parseInt(data[i].get('content'))+1);
            })
        }
    }

    // 判断列表页or详情页
    var _isList = function(){
        if($('.post-page').length == 0){
            return true;
        }
    }

    var constructor = function(config){}

    // 获取浏览量数据
    constructor.prototype._getTime = function(clsName){
        className = clsName;
        Todo = AV.Object.extend(className);
        if(_isList()){
            _getListTime().then(function(data) {
                _writeCount(data);
            }, function (error) {
                // error is an instance of AVError.
                console.log(error);
            });
        }else{
            var title = $('.leancloud_visitors').attr('id');
            _getDetailTime(title).then(function(data){
                _writeCount(data);
                _update(data[0]);
            })
        }
        return this;
    }
    constructor.prototype._addCount = function(clsName){
        className = clsName;
        Todo = AV.Object.extend(className);
        _addCount();
        return this;
    }

    //返回构造函数
    return constructor;
})()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> leanCloud = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> APP_ID = <span class="hljs-string">'fasdfaICadjaklsdbaskd-gasdasfz'</span>;
    <span class="hljs-keyword">var</span> APP_KEY = <span class="hljs-string">'gfdgsArfgsdg'</span>;
    <span class="hljs-keyword">var</span> className,Todo;
    <span class="hljs-keyword">var</span> pageCounts = <span class="hljs-number">2</span>; <span class="hljs-comment">// 每页返回条数</span>
    <span class="hljs-keyword">if</span>($(<span class="hljs-string">'.leancloud_visitors'</span>).attr(<span class="hljs-string">'data-pageNum'</span>)!= <span class="hljs-string">'undefined'</span>){
        <span class="hljs-keyword">var</span> pageNum = <span class="hljs-built_in">parseInt</span>($(<span class="hljs-string">'.leancloud_visitors'</span>).attr(<span class="hljs-string">'data-pageNum'</span>))<span class="hljs-number">-1</span>;    <span class="hljs-comment">// 当前页码</span>
    }

    <span class="hljs-comment">// 初始化</span>
    AV.init({
        <span class="hljs-attr">appId</span>: APP_ID,
        <span class="hljs-attr">appKey</span>: APP_KEY
    });

    <span class="hljs-comment">// 新增一条 文章统计数据【仅限一条】</span>
    <span class="hljs-keyword">var</span> _addCount = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 监听 新增按钮 被点击</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addListenButton</span>(<span class="hljs-params"></span>)</span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'start listen...'</span>);
                $(<span class="hljs-string">'.new-post_button'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{addListenInput();})
            },<span class="hljs-number">5000</span>)    <span class="hljs-comment">//考虑到服务器的带宽仅有1M，网速较慢所以将此方法延迟执行</span>
        }
        <span class="hljs-comment">// 监听 回车/点击确定按钮 后 执行保存</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addListenInput</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> inputTitle;
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                $(<span class="hljs-string">'.new-post_input'</span>).blur(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    inputTitle = $(<span class="hljs-keyword">this</span>).val();
                })
                $(<span class="hljs-string">'.new-post_ok'</span>).mousedown(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    <span class="hljs-keyword">var</span> title = $(<span class="hljs-string">'.new-post_input'</span>).val();
                    saveToLeancloud(title);
                    addListenButton();
                })
                $(<span class="hljs-built_in">document</span>).keypress(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
                    <span class="hljs-keyword">if</span>(e.which == <span class="hljs-number">13</span>){
                        <span class="hljs-keyword">var</span> title = inputTitle;
                        saveToLeancloud(title);
                        addListenButton();
                    }
                })
            },<span class="hljs-number">500</span>)
        }

        <span class="hljs-comment">// 保存</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">saveToLeancloud</span>(<span class="hljs-params">title</span>)</span>{
            <span class="hljs-keyword">var</span> newData = <span class="hljs-keyword">new</span> Todo();
            newData.save({
                <span class="hljs-attr">title</span>: title,
                <span class="hljs-attr">content</span>: <span class="hljs-string">'0'</span>
            }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
                <span class="hljs-built_in">console</span>.log(data);
            })
        }
        addListenButton();
    }

    <span class="hljs-comment">// 获取详情页的访问次数数据</span>
    <span class="hljs-keyword">var</span> _getDetailTime = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">title</span>) </span>{
        <span class="hljs-keyword">var</span> query = <span class="hljs-keyword">new</span> AV.Query(className);
        query.equalTo(<span class="hljs-string">"title"</span>, title);
        <span class="hljs-keyword">return</span> query.find();
    }

    <span class="hljs-comment">// 获取列表页的访问次数数据</span>
    <span class="hljs-keyword">var</span> _getListTime = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> query = <span class="hljs-keyword">new</span> AV.Query(className);
        query.limit(pageCounts);            <span class="hljs-comment">// 查询数据时返回的数量-每页返回的条数</span>
        query.skip(pageCounts*pageNum);     <span class="hljs-comment">// 查询数据时跳过的数量-当前页码*每页返回的条数</span>
        query.descending(<span class="hljs-string">'createdAt'</span>);      <span class="hljs-comment">// 按新建的时间降序排列</span>
        <span class="hljs-keyword">return</span> query.find();
    }

    <span class="hljs-comment">// 更新一条 文章浏览量数据</span>
    <span class="hljs-keyword">var</span> _update = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
        <span class="hljs-comment">// 第一个参数是 className，第二个参数是 objectId</span>
        <span class="hljs-keyword">var</span> todo = AV.Object.createWithoutData(className, obj.id);
        <span class="hljs-keyword">var</span> count = <span class="hljs-built_in">parseInt</span>(obj.get(<span class="hljs-string">'content'</span>))+<span class="hljs-number">1</span>;
        <span class="hljs-comment">// 修改属性</span>
        todo.set(<span class="hljs-string">'content'</span>, count.toString());
        <span class="hljs-comment">// 保存到云端</span>
        todo.save();
    }
    <span class="hljs-comment">// 填充访问次数</span>
    <span class="hljs-keyword">var</span> _writeCount = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-keyword">if</span>($(<span class="hljs-string">'.post-page'</span>).length == <span class="hljs-number">0</span>){
            $(<span class="hljs-string">'.leancloud_visitors'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i,e</span>)</span>{
                $(e).text(<span class="hljs-built_in">parseInt</span>(data[i].get(<span class="hljs-string">'content'</span>)));
            })
        }<span class="hljs-keyword">else</span>{
            $(<span class="hljs-string">'.leancloud_visitors'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i,e</span>)</span>{
                $(e).text(<span class="hljs-built_in">parseInt</span>(data[i].get(<span class="hljs-string">'content'</span>))+<span class="hljs-number">1</span>);
            })
        }
    }

    <span class="hljs-comment">// 判断列表页or详情页</span>
    <span class="hljs-keyword">var</span> _isList = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>($(<span class="hljs-string">'.post-page'</span>).length == <span class="hljs-number">0</span>){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
    }

    <span class="hljs-keyword">var</span> <span class="hljs-keyword">constructor</span> = function(config){}

    <span class="hljs-comment">// 获取浏览量数据</span>
    <span class="hljs-keyword">constructor</span>.prototype._getTime = function(clsName){
        className = clsName;
        Todo = AV.Object.extend(className);
        <span class="hljs-keyword">if</span>(_isList()){
            _getListTime().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                _writeCount(data);
            }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
                <span class="hljs-comment">// error is an instance of AVError.</span>
                <span class="hljs-built_in">console</span>.log(error);
            });
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">var</span> title = $(<span class="hljs-string">'.leancloud_visitors'</span>).attr(<span class="hljs-string">'id'</span>);
            _getDetailTime(title).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                _writeCount(data);
                _update(data[<span class="hljs-number">0</span>]);
            })
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    }
    <span class="hljs-keyword">constructor</span>.prototype._addCount = function(clsName){
        className = clsName;
        Todo = AV.Object.extend(className);
        _addCount();
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    }

    <span class="hljs-comment">//返回构造函数</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">constructor</span>;
})()
</code></pre>
<p>因为我使用的是hexo-admin做后台管理，安装和使用方法见<a href="https://github.com/jaredly/hexo-admin" rel="nofollow noreferrer" target="_blank">https://github.com/jaredly/hexo-admin</a>  <br>要在hexo-admin的后台中新增文章时自动添加一条数据，就要对其改造：<br>在根目录的node_modules中搜索hexo-admin,在其文件夹中找到www文件夹下的index.html，在其中引入leancloudConfig.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://cdn1.lncld.net/static/js/2.5.0/av-min.js&quot;></script>
<script src=&quot;/js/leancloudConfig.js&quot;></script>
// 调用方法
<script>
    // 创建新blog成功时，访问leancloud新建一条浏览量数据
    $(function () {
        var todo = new leanCloud()._addCount('test');
      });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdn1.lncld.net/static/js/2.5.0/av-min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/js/leancloudConfig.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
// 调用方法
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 创建新blog成功时，访问leancloud新建一条浏览量数据</span>
    $(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> todo = <span class="hljs-keyword">new</span> leanCloud()._addCount(<span class="hljs-string">'test'</span>);
      });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在前台页面的layout.jade中同样引入和调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="script(src= '//cdn1.lncld.net/static/js/2.5.0/av-min.js')
script(src= '/js/leancloudConfig.js')
script.
  $(function () {
      var todo = new leanCloud()._getTime('test');
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">script(src= '//cdn1.lncld.net/static/js/2.5.0/av-min.js')
script(src= '/js/leancloudConfig.js')
script.
  $(function () {
      var todo = new leanCloud()._getTime('test');
  });</code></pre>
<p>这样就实现了浏览量的功能</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为Hexo加入浏览量的功能

## 原文链接
[https://segmentfault.com/a/1190000009824281](https://segmentfault.com/a/1190000009824281)


---
title: 'webpack+vue项目实战（四，前端与后端的数据交互和前端展示数据）' 
date: 2019-01-10 2:30:08
hidden: true
slug: eae93toa84f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>今天要做的，就是在上一篇文章的基础上，进行功能页面的开发。简单点说呢，就是与后端的数据交互和怎么把数据展示出来，用到的资源主要是element-ui和<a href="https://github.com/pagekit/vue-resource" rel="nofollow noreferrer" target="_blank">vue-resource</a>，其它参考（<a href="http://www.cnblogs.com/axl234/p/5899137.html" rel="nofollow noreferrer" target="_blank">vue-resource插件使用</a>）。今天讲到的一些功能开发，主要就是请求列表数据，详情数据，分页功能操作，搜索，搜索标签等的开发。今天这个，按照下面步骤，一步一步来。一个一个功能的做！</p>
<h2 id="articleHeader1">2.数据接口</h2>
<p>我以<strong>‘回款管理’(<code>cashList.vue</code>)为开发的demo，下文讲到的各种增删改查都是在这个文件上操作，大家注意喔！</strong>这虽然是做5个功能，其实就只有两个接口。（按照我开发项目，后端提供的接口说明）</p>
<h3 id="articleHeader2">2-1分析接口</h3>
<p>下面分析下我们公司后端给我提供的其中两个接口。而且两个接口都是<code>get</code>请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let http_url={
    list:'http://xxx.xxx.com/xxx/cash/list',
    detail:'http://xxx.xxx.com/xxx/cash/detail'
}

/**
http_url.list接口接受参数
ordId  //String，订单号
cashId //String.回款编号
custoName //String，客户名称，模糊查询
cashType //int，回款类型
cashStatus //int，回款状态
userName//String，采购人，模糊查询
userMobile //String，采购人电话，模糊查询
//上面是搜索查询的字段，下面是数据的页码和每页的条数
pogeNo //int，页码(必填)
pageSize //int，每页显示条数(必填)


http_url.detail接口接受参数（按照我开发项目）
cashId //String.回款编号(必填)
**/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>let http_url={
    list:'http:<span class="hljs-comment">//xxx.xxx.com/xxx/cash/list',</span>
    detail:'http:<span class="hljs-comment">//xxx.xxx.com/xxx/cash/detail'</span>
}

/**
http_url.list接口接受参数
ordId  <span class="hljs-comment">//String，订单号</span>
cashId <span class="hljs-comment">//String.回款编号</span>
custoName <span class="hljs-comment">//String，客户名称，模糊查询</span>
cashType <span class="hljs-comment">//int，回款类型</span>
cashStatus <span class="hljs-comment">//int，回款状态</span>
userName<span class="hljs-comment">//String，采购人，模糊查询</span>
userMobile <span class="hljs-comment">//String，采购人电话，模糊查询</span>
<span class="hljs-comment">//上面是搜索查询的字段，下面是数据的页码和每页的条数</span>
pogeNo <span class="hljs-comment">//int，页码(必填)</span>
pageSize <span class="hljs-comment">//int，每页显示条数(必填)</span>


http_url.detail接口接受参数（按照我开发项目）
cashId <span class="hljs-comment">//String.回款编号(必填)</span>
**/</code></pre>
<h3 id="articleHeader3">2-2整理数据</h3>
<p>首先，由于接口http_url.list接口可以接受一些搜索，先把整个准备了！<br><span class="img-wrap"><img data-src="/img/bVQlVr?w=287&amp;h=227" src="https://static.alili.tech/img/bVQlVr?w=287&amp;h=227" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后再到页码的一些东西，主要是三个，当前页码，每页条数。（自己随便设的默认值）<br>数据就变成了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
    return {
        pageSize:10,//每页条数
        allCount:0,//记录总数
        currentPage:1,//当前页码
        cashList: [],   //列表数组(现在是准备请求接口，不需要模拟的数据，所以设置一个空数组)
        keyFrom: {....}//搜索字段
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>data(){
    <span class="hljs-class">return </span>{
<span class="hljs-symbol">        pageSize:</span><span class="hljs-number">10</span>,<span class="hljs-comment">//每页条数</span>
<span class="hljs-symbol">        allCount:</span><span class="hljs-number">0</span>,<span class="hljs-comment">//记录总数</span>
<span class="hljs-symbol">        currentPage:</span><span class="hljs-number">1</span>,<span class="hljs-comment">//当前页码</span>
<span class="hljs-symbol">        cashList:</span> [],   <span class="hljs-comment">//列表数组(现在是准备请求接口，不需要模拟的数据，所以设置一个空数组)</span>
<span class="hljs-symbol">        keyFrom:</span> {....}<span class="hljs-comment">//搜索字段</span>
    }
}
</code></pre>
<blockquote><p>大家可能不明白，同样是请求的参数，页码这些为什么要和搜索字段分开放？之所以分开放是因为页码这些，到下面分页的时候要单独使用，而且做搜索的时候，页码又不是搜索字段，所以就分开放，下面会详情的说明！</p></blockquote>
<p>准备就准备这么多了，之后还要用到什么数据，以后再添加！</p>
<h2 id="articleHeader4">3.请求列表数据</h2>
<p>先别急着写，大家可以想下，搜索字段那里，比如我只想根据回款ID(<code>cashId</code>)查询呢？<br>难道这样发送请求？<a href="http://xxx.xxx.com/xxx/cash/list?pageNo=1&amp;pageSize=10&amp;ordId=" rel="nofollow noreferrer" target="_blank">http://xxx.xxx.com/xxx/cash/l...</a>''&amp;cashId=xxx&amp;custoName=''&amp;cashType=''&amp;cashStatus=''&amp;userName=''&amp;userMobile=''<br>真没必要，我们想要的是这样<a href="http://xxx.xxx.com/xxx/cash/list?pageNo=1&amp;pageSize=10&amp;cashId=xxx" rel="nofollow noreferrer" target="_blank">http://xxx.xxx.com/xxx/cash/l...</a><br>所以，请求之前，先写一个方法，就是过滤搜索字段（<code>keyFrom</code>）里面，值为空的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 清除对象中值为空的属性
 */
filterParams(obj){
    let _form = obj, _newPar = {}, testStr;
    //遍历对象
    for (let key in _form) {
        testStr = null;
        //如果属性的值不为空。
        //注意，不要这样判断if (_form[key])。因为有些属性的值可能为0，到时候就会被过滤掉
        if (_form[key] !== null &amp;&amp; _form[key] !== &quot;&quot;) {
            //把值添加进新对象里面
            _newPar[key]=_form[key].toString()
        }
    }
    //返回对象
    return _newPar;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">/**
 * 清除对象中值为空的属性
 */</span>
filterParams(obj){
    <span class="hljs-keyword">let</span> _form = obj, _newPar = {}, testStr;
    <span class="hljs-comment">//遍历对象</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> <span class="hljs-built_in">key</span> in _form) {
        testStr = <span class="hljs-built_in">null</span>;
        <span class="hljs-comment">//如果属性的值不为空。</span>
        <span class="hljs-comment">//注意，不要这样判断if (_form[key])。因为有些属性的值可能为0，到时候就会被过滤掉</span>
        <span class="hljs-keyword">if</span> (_form[<span class="hljs-built_in">key</span>] !== <span class="hljs-built_in">null</span> &amp;&amp; _form[<span class="hljs-built_in">key</span>] !== <span class="hljs-string">""</span>) {
            <span class="hljs-comment">//把值添加进新对象里面</span>
            _newPar[<span class="hljs-built_in">key</span>]=_form[<span class="hljs-built_in">key</span>].toString()
        }
    }
    <span class="hljs-comment">//返回对象</span>
    <span class="hljs-keyword">return</span> _newPar;
}
</code></pre>
<h3 id="articleHeader5">3-1请求列表数据</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   getList(){
        //过滤搜索字段值为空的属性，然后对象合并，合并上页码。
        let _par = Object.assign(this.filterParams(this.keyFrom), {
            pageNo: this.currentPage,
            pageSize: this.pageSize
        });
        this.$http.get(http_url.list, {
            params: _par
        }).then(function (res) {
            
        });
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>   getList(){
        <span class="hljs-comment">//过滤搜索字段值为空的属性，然后对象合并，合并上页码。</span>
        let _par = Object.assign(<span class="hljs-keyword">this</span>.filterParams(<span class="hljs-keyword">this</span>.keyFrom), {
            pageNo: <span class="hljs-keyword">this</span>.currentPage,
            pageSize: <span class="hljs-keyword">this</span>.pageSize
        });
        <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(http_url.list, {
            params: _par
        }).then(function (res) {
            
        });
    }
    </code></pre>
<h3 id="articleHeader6">3-2写完之后，在mounted运行这方法。</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted(){
    this.getList();
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>mounted(){
    <span class="hljs-keyword">this</span>.getList();
},
</code></pre>
<p>为了能更直观看到结果，我在浏览器直接打开这个接口</p>
<p><span class="img-wrap"><img data-src="/img/bVQmjM?w=521&amp;h=949" src="https://static.alili.tech/img/bVQmjM?w=521&amp;h=949" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>需要的有的字段都有了<br>那么接下来就接收返回的字段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    getList(){
        //过滤搜索字段值为空的属性，然后对象合并，合并上页码。
        let _par = Object.assign(this.filterParams(this.keyFrom), {
            pageNo: this.currentPage,
            pageSize: this.pageSize
        });
        this.$http.get(http_url.list, {
            params: _par
        }).then(function (res) {
            res=res.body;
            //如果请求成功了，这接口code为0代表请求成功。具体怎样判断还需要看接口
            if(res.code===0){
                 //设置列表数据
                 this.cashList = res.datas.entityList;
            }
            else{
                this.$message.error(res.msg);
            }
        });
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    getList(){
        <span class="hljs-comment">//过滤搜索字段值为空的属性，然后对象合并，合并上页码。</span>
        let _par = Object.assign(<span class="hljs-keyword">this</span>.filterParams(<span class="hljs-keyword">this</span>.keyFrom), {
            pageNo: <span class="hljs-keyword">this</span>.currentPage,
            pageSize: <span class="hljs-keyword">this</span>.pageSize
        });
        <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(http_url.list, {
            params: _par
        }).then(function (res) {
            res=res.body;
            <span class="hljs-comment">//如果请求成功了，这接口code为0代表请求成功。具体怎样判断还需要看接口</span>
            <span class="hljs-keyword">if</span>(res.code===<span class="hljs-number">0</span>){
                 <span class="hljs-comment">//设置列表数据</span>
                 <span class="hljs-keyword">this</span>.cashList = res.datas.entityList;
            }
            <span class="hljs-keyword">else</span>{
                <span class="hljs-keyword">this</span>.$message.error(res.msg);
            }
        });
    }</code></pre>
<h3 id="articleHeader7">3-3在html页面铺数据</h3>
<p>怎么铺，随机应变呗！<br>来到<code>el-table</code>这个标签这里。不知道排版布局的话，参考<a href="https://segmentfault.com/a/1190000010053886">上一篇文章</a>喔！不要不知道我在说什么！</p>
<p><span class="img-wrap"><img data-src="/img/bVQmsZ?w=654&amp;h=156" src="https://static.alili.tech/img/bVQmsZ?w=654&amp;h=156" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>然后开始写&lt;el-table-column&gt;&lt;/el-table-column&gt;</p>
<p>下面简单写几个栗子</p>
<h4>3-3-1回款id</h4>
<p>点击回款id,会出来详情页面（详情页面的方法<code>getDetail</code>我们到下面写，现在）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-table-column label=&quot;编号&quot; width=&quot;180&quot;>
    <template scope=&quot;scope&quot;>
        <a href=&quot;javascript:;&quot;>"{{"scope.row.cashId"}}"</a>
    </template>
</el-table-column>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"编号"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"180"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span></span><span class="hljs-template-variable">"{{"scope.row.cashId"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
</span></code></pre>
<h4>3-3-2订单id</h4>
<p>订单id只需要显示，就简单了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-table-column label=&quot;订单编号&quot; width=&quot;160&quot;>
    <template scope=&quot;scope&quot;>
        <span>"{{" scope.row.ordId "}}"</span>
    </template>
</el-table-column>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"订单编号"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"160"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{" scope.row.ordId "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span></span></code></pre>
<h4>3-3-3回款时间</h4>
<p>回款时间需要把时间戳转成yyyy-mm-dd hh:mm:ss</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-table-column label=&quot;回款时间&quot; min-width=&quot;180&quot;>
    <template scope=&quot;scope&quot;>
        <span>"{{"new Date(scope.row.cashDate).toLocaleDateString().replace(/\//g, '-')"}}"&amp;nbsp;"{{"new Date(scope.row.cashDate).toTimeString().split(' ')[0]"}}"</span>
        </div>
    </template>
</el-table-column>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs twig"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"回款时间"</span> <span class="hljs-attr">min-width</span>=<span class="hljs-string">"180"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"new <span class="hljs-name">Date</span><span class="hljs-params">(scope.row.cashDate)</span>.toLocaleDateString().replace(/\//g, '-')"}}"</span><span class="xml">&amp;nbsp;</span><span class="hljs-template-variable">"{{"new <span class="hljs-name">Date</span><span class="hljs-params">(scope.row.cashDate)</span>.toTimeString().split(' ')[0]"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
</span></code></pre>
<h4>3-3-4回款状态</h4>
<p>回款状态需要把状态码转换成文字</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-table-column>
    <template scope=&quot;scope&quot;>
            <span v-if=&quot;scope.row.cashStatus === 0&quot;>待回款</span>
            <span v-if=&quot;scope.row.cashStatus === 1&quot;>部分回款</span>
            <span v-if=&quot;scope.row.cashStatus === 2&quot; style=&quot;color: green&quot;>已回款</span>
            <span v-if=&quot;scope.row.cashStatus === 3&quot; style=&quot;color: red&quot;>已取消</span>
    </template>
</el-table-column>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashStatus === 0"</span>&gt;</span>待回款<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashStatus === 1"</span>&gt;</span>部分回款<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashStatus === 2"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: green"</span>&gt;</span>已回款<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashStatus === 3"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: red"</span>&gt;</span>已取消<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span></code></pre>
<h4>3-3-5回款金额</h4>
<p>金额在数据库以分为单位，现在需要转换成元</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-table-column label=&quot;回款金额(元)&quot; width=&quot;150&quot;>
    <template scope=&quot;scope&quot;>
        <span>"{{" (scope.row.cashAmount / 100).toFixed(2) "}}"</span>
    </template>
</el-table-column>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"回款金额(元)"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"150"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{" (scope.row.cashAmount / 100).toFixed(2) "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
</span></code></pre>
<h4>3-3-6细节优化</h4>
<p>好了，典型的几种数据，以及处理的方法，就是在这里了。当然这个只是做展示作用，怎么展示是看项目的需求的！<br>小伙伴们运行起来的时候，可能会发现两个问题。</p>
<p>1.比如网速比较慢的时候，请求没完成的时候，就会看到这个（这个提醒是element-ui提供的，只要发现cashList是空的，就会出现这个提醒）<br><span class="img-wrap"><img data-src="/img/bVQmFD?w=1574&amp;h=301" src="https://static.alili.tech/img/bVQmFD?w=1574&amp;h=301" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>如果我们想体验好一点，做一个提示加载中的提示呢</p>
<p><span class="img-wrap"><img data-src="/img/bVQmG2?w=1712&amp;h=370" src="https://static.alili.tech/img/bVQmG2?w=1712&amp;h=370" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这个简单的。首先在el-table上，设置v-loading="loading"。</p>
<p><span class="img-wrap"><img data-src="/img/bVQmHC?w=628&amp;h=96" src="https://static.alili.tech/img/bVQmHC?w=628&amp;h=96" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后在data设置loading这个属性</p>
<p><span class="img-wrap"><img data-src="/img/bVQmH6?w=519&amp;h=419" src="https://static.alili.tech/img/bVQmH6?w=519&amp;h=419" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后就是在请求那里<br>进入方法的时候，设置loading=true，请求完了再设置成false。（当loading=true时，加载中的提示就会出现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getList(){
    //显示加载中提示
    this.loading=true;
    //过滤搜索字段值为空的属性，然后对象合并，合并上页码。
    let _par = Object.assign(this.filterParams(this.keyFrom), {
        pageNo: this.currentPage,
        pageSize: this.pageSize
    });
    this.$http.get(http_url.list, {
        params: _par
    }).then(function (res) {
        res=res.body;
        //如果请求成功了，这接口code为0代表请求成功。具体怎样判断还需要看接口
        if(res.code===0){
             //设置列表数据
             this.cashList = res.datas.entityList;
             //关闭加载中提示
            this.loading=false;
        }
        else{
            this.$message.error(res.msg);
        }
    });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>getList(){
    <span class="hljs-comment">//显示加载中提示</span>
    <span class="hljs-keyword">this</span>.loading=<span class="hljs-literal">true</span>;
    <span class="hljs-comment">//过滤搜索字段值为空的属性，然后对象合并，合并上页码。</span>
    let _par = Object.assign(<span class="hljs-keyword">this</span>.filterParams(<span class="hljs-keyword">this</span>.keyFrom), {
        pageNo: <span class="hljs-keyword">this</span>.currentPage,
        pageSize: <span class="hljs-keyword">this</span>.pageSize
    });
    <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(http_url.list, {
        params: _par
    }).then(function (res) {
        res=res.body;
        <span class="hljs-comment">//如果请求成功了，这接口code为0代表请求成功。具体怎样判断还需要看接口</span>
        <span class="hljs-keyword">if</span>(res.code===<span class="hljs-number">0</span>){
             <span class="hljs-comment">//设置列表数据</span>
             <span class="hljs-keyword">this</span>.cashList = res.datas.entityList;
             <span class="hljs-comment">//关闭加载中提示</span>
            <span class="hljs-keyword">this</span>.loading=<span class="hljs-literal">false</span>;
        }
        <span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">this</span>.$message.error(res.msg);
        }
    });
}
</code></pre>
<p>2.再有就是，如果展示的数据，有些是空的字符串，或者是null的话，在列表上就会看到。</p>
<p><span class="img-wrap"><img data-src="/img/bVQmKD?w=1717&amp;h=416" src="https://static.alili.tech/img/bVQmKD?w=1717&amp;h=416" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这样提示不太友好，因为只显示空白一片，用的人可能不知道怎么回事。这时候加个判断，如果某一个属性的值，为空字符串或者null,就替换成‘--’。<br>getList(){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //显示加载中提示
    this.loading=true;
    //过滤搜索字段值为空的属性，然后对象合并，合并上页码。
    let _par = Object.assign(this.filterParams(this.keyFrom), {
        pageNo: this.currentPage,
        pageSize: this.pageSize
    });
    this.$http.get(http_url.list, {
        params: _par
    }).then(function (res) {
        res=res.body;
        //如果请求成功了，这接口code为0代表请求成功。具体怎样判断还需要看接口
        if(res.code===0){
             //设置列表数据
             this.cashList = res.datas.entityList;
             this.cashList.map(function (value) {
                for (let key in value) {
                    //不要if(value[key])判断，有的值可能是0，会把0过滤
                    if (value[key] === null || value[key] === '') {
                        value[key] = '--'
                    }
                }
            });
             //关闭加载中提示
            this.loading=false;
        }
        else{
            this.$message.error(res.msg);
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    <span class="hljs-comment">//显示加载中提示</span>
    <span class="hljs-keyword">this</span>.loading=<span class="hljs-literal">true</span>;
    <span class="hljs-comment">//过滤搜索字段值为空的属性，然后对象合并，合并上页码。</span>
    let _par = Object.assign(<span class="hljs-keyword">this</span>.filterParams(<span class="hljs-keyword">this</span>.keyFrom), {
        pageNo: <span class="hljs-keyword">this</span>.currentPage,
        pageSize: <span class="hljs-keyword">this</span>.pageSize
    });
    <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(http_url.list, {
        params: _par
    }).then(function (res) {
        res=res.body;
        <span class="hljs-comment">//如果请求成功了，这接口code为0代表请求成功。具体怎样判断还需要看接口</span>
        <span class="hljs-keyword">if</span>(res.code===<span class="hljs-number">0</span>){
             <span class="hljs-comment">//设置列表数据</span>
             <span class="hljs-keyword">this</span>.cashList = res.datas.entityList;
             <span class="hljs-keyword">this</span>.cashList.map(function (value) {
                <span class="hljs-keyword">for</span> (let key <span class="hljs-keyword">in</span> value) {
                    <span class="hljs-comment">//不要if(value[key])判断，有的值可能是0，会把0过滤</span>
                    <span class="hljs-keyword">if</span> (value[key] === <span class="hljs-literal">null</span> || value[key] === <span class="hljs-string">''</span>) {
                        value[key] = <span class="hljs-string">'--'</span>
                    }
                }
            });
             <span class="hljs-comment">//关闭加载中提示</span>
            <span class="hljs-keyword">this</span>.loading=<span class="hljs-literal">false</span>;
        }
        <span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">this</span>.$message.error(res.msg);
        }
    });
}</code></pre>
<p>然后我们就会看到这样的结果，就明确的说明了，这里的值为空</p>
<p><span class="img-wrap"><img data-src="/img/bVQmNf?w=1600&amp;h=469" src="https://static.alili.tech/img/bVQmNf?w=1600&amp;h=469" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">4.请求详情数据</h2>
<p>详情的数据，就是点击列表的任何一条数据，出来一个详情页面。</p>
<p>先在浏览器请求一下（看下有身什么字段，可以方便在html里面铺数据），看到有很多字段。</p>
<p><span class="img-wrap"><img data-src="/img/bVQmP1?w=440&amp;h=695" src="https://static.alili.tech/img/bVQmP1?w=440&amp;h=695" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">详情的html</h3>
<p>现在项目上，用的是这个效果，我们现在也用这个吧！</p>
<p><span class="img-wrap"><img data-src="/img/bVQmvS?w=1289&amp;h=949" src="https://static.alili.tech/img/bVQmvS?w=1289&amp;h=949" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>代码如下，castInfo是在data声明的的变量，作用是储存请求回来的字段，包含字段如上图！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 详情弹窗 -->
<div class=&quot;cash-content-box&quot; v-if=&quot;contentShow&quot; :class=&quot;{'show-box':contentClass}&quot;>
    <div class=&quot;cash-main&quot;>
        <p class=&quot;content-close&quot;><a href=&quot;javascript:;&quot; @click=&quot;hideContentDo&quot;>X</a></p>
        <div class=&quot;content-top&quot;>
            <h2>回款金额："{{"(castInfo.cashAmount / 100).toFixed(2)"}}"元</h2>

            <p>
                回款编号："{{"castInfo.cashId"}}"<span>|</span>回款日期："{{"new Date(castInfo.cashDate).toLocaleDateString().replace(/\//g, '-')
                "}}"</p>
        </div>
        <div class=&quot;content-type&quot;>
            <ul class=&quot;flli&quot;>
                <li v-if=&quot;castInfo.cashStatus===0&quot;>回款状态：待回款</li>
                <li v-else-if=&quot;castInfo.cashStatus===1&quot;>回款状态：部分回款</li>
                <li v-else-if=&quot;castInfo.cashStatus===3&quot;>回款状态：已取消</li>
                <li v-else>回款状态：已回款</li>
            </ul>
            <div class=&quot;clear&quot;></div>
        </div>
        <div class=&quot;content-tab&quot;>
            <ul class=&quot;flli&quot;>
                <li class=&quot;cur&quot;>概要</li>
            </ul>
            <div class=&quot;clear&quot;></div>
        </div>
        <div class=&quot;content-info&quot;>
            <h3 class=&quot;content-title&quot;>基本信息</h3>
            <table class=&quot;content-table&quot;>
                <tr>
                    <td>回款编号</td>
                    <td><span>"{{"castInfo.cashId"}}"</span></td>
                </tr>
                <tr>
                    <td>回款金额</td>
                    <td>"{{"(castInfo.cashAmount / 100).toFixed(2)"}}"元</td>
                </tr>
                <tr>
                    <td>账户类型</td>
                    <td v-if=&quot;castInfo.cashAccountType&quot;>
                        "{{"castInfo.cashAccountType===1?'公账':'其他账户'"}}"
                    </td>
                    <td v-else-if=&quot;castInfo.cashAccountType===0&quot;>其他账户</td>
                    <td v-else>--</td>
                </tr>
                <tr>
                    <td>回款类型</td>
                    <td v-if=&quot;castInfo.cashType===0&quot;>立即回款</td>
                    <td v-if=&quot;castInfo.cashType===1&quot;>定期回款</td>
                    <td v-if=&quot;castInfo.cashType === '--'&quot;>--</td>
                </tr>
                <tr>
                    <td>回款日期</td>
                    <td>"{{"new Date(castInfo.cashDate).toLocaleDateString().replace(/\//g, '-') "}}"</td>
                </tr>
                <tr>
                    <td>回款状态</td>
                    <td v-if=&quot;castInfo.cashStatus===0&quot;>待回款</td>
                    <td v-if=&quot;castInfo.cashStatus===1&quot;>部分回款</td>
                    <td v-if=&quot;castInfo.cashStatus===2&quot;>已回款</td>
                    <td v-if=&quot;castInfo.cashStatus===3&quot;>已取消</td>
                    <td v-if=&quot;castInfo.cashStatus === '--'&quot;>--</td>
                </tr>
                <tr>
                    <td>回款渠道</td>
                    <td v-if=&quot;castInfo.payChannel === 'zfb'&quot;>支付宝</td>
                    <td v-if=&quot;castInfo.payChannel === 'wx_pay'&quot;>微信支付</td>
                    <td v-if=&quot;castInfo.payChannel === 'bank_trans'&quot;>银行转账</td>
                    <td v-if=&quot;castInfo.payChannel === 'easy_pay'&quot;>苏宁易付宝</td>
                    <td v-if=&quot;castInfo.payChannel === 'yi_ji_fu'&quot;>易极付</td>
                    <td v-if=&quot;castInfo.payChannel === 'ljl_pay'&quot;>蓝金灵支付</td>
                    <td v-if=&quot;castInfo.payChannel === '--'&quot;>--</td>
                </tr>
                <tr>
                    <td>备注</td>
                    <td>"{{"castInfo.remark"}}"</td>
                </tr>
            </table>
        </div>
    </div>
</div>
<!--遮罩层-->
<div class=&quot;cash-content&quot; v-show=&quot;contentShow&quot; @click=&quot;hideContentDo&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs twig"><code><span class="xml"><span class="hljs-comment">&lt;!-- 详情弹窗 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cash-content-box"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"contentShow"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'show-box':contentClass}"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cash-main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-close"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"hideContentDo"</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-top"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>回款金额：</span><span class="hljs-template-variable">"{{"(castInfo.cashAmount / 100).toFixed(2)"}}"</span><span class="xml">元<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
                回款编号：</span><span class="hljs-template-variable">"{{"castInfo.cashId"}}"</span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>|<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>回款日期：</span><span class="hljs-template-variable">"{{"new <span class="hljs-name">Date</span><span class="hljs-params">(castInfo.cashDate)</span>.toLocaleDateString().replace(/\//g, '-')
                "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-type"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flli"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.cashStatus===0"</span>&gt;</span>回款状态：待回款<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-else-if</span>=<span class="hljs-string">"castInfo.cashStatus===1"</span>&gt;</span>回款状态：部分回款<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-else-if</span>=<span class="hljs-string">"castInfo.cashStatus===3"</span>&gt;</span>回款状态：已取消<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-else</span>&gt;</span>回款状态：已回款<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clear"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-tab"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flli"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cur"</span>&gt;</span>概要<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clear"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-info"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-title"</span>&gt;</span>基本信息<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-table"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>回款编号<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"castInfo.cashId"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>回款金额<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"(castInfo.cashAmount / 100).toFixed(2)"}}"</span><span class="xml">元<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>账户类型<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.cashAccountType"</span>&gt;</span>
                        </span><span class="hljs-template-variable">"{{"castInfo.cashAccountType===1?'公账':'其他账户'"}}"</span><span class="xml">
                    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-else-if</span>=<span class="hljs-string">"castInfo.cashAccountType===0"</span>&gt;</span>其他账户<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-else</span>&gt;</span>--<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>回款类型<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.cashType===0"</span>&gt;</span>立即回款<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.cashType===1"</span>&gt;</span>定期回款<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.cashType === '--'"</span>&gt;</span>--<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>回款日期<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"new <span class="hljs-name">Date</span><span class="hljs-params">(castInfo.cashDate)</span>.toLocaleDateString().replace(/\//g, '-') "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>回款状态<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.cashStatus===0"</span>&gt;</span>待回款<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.cashStatus===1"</span>&gt;</span>部分回款<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.cashStatus===2"</span>&gt;</span>已回款<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.cashStatus===3"</span>&gt;</span>已取消<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.cashStatus === '--'"</span>&gt;</span>--<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>回款渠道<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.payChannel === 'zfb'"</span>&gt;</span>支付宝<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.payChannel === 'wx_pay'"</span>&gt;</span>微信支付<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.payChannel === 'bank_trans'"</span>&gt;</span>银行转账<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.payChannel === 'easy_pay'"</span>&gt;</span>苏宁易付宝<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.payChannel === 'yi_ji_fu'"</span>&gt;</span>易极付<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.payChannel === 'ljl_pay'"</span>&gt;</span>蓝金灵支付<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"castInfo.payChannel === '--'"</span>&gt;</span>--<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>备注<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"castInfo.remark"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--遮罩层--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cash-content"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"contentShow"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"hideContentDo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre>
<p>遮罩层和详情div里面的样式我不说了。最外层的样式是下面这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    width: 700px;
    z-index: 1006;
    position: fixed;
    top: 0;
    right: 0;
    transform: translate3d(700px, 0, 0);
    height: 100%;
    background: #535968;
    transition: transform 1s;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">700px</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1006</span>;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(700px, 0, 0);
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#535968</span>;
    <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">1s</span>;
}
</code></pre>
<p><code>transform: translate3d(700px, 0, 0);</code>是为了一开始吧它隐藏起来，相信大家都看得懂！怎么让它显示出来呢，把样式改成<code>transform: translate3d(0, 0, 0);</code>这个就行了，动画效果自动会有，因为加了<code>transition: transform 1s;</code>。</p>
<h3 id="articleHeader10">请求详情的方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getDetali: function (id) {
    //contentShow控制详情页和遮罩层的显示，contentClass控制详情页的动画，castInfo为记录请求回来的数据。大家要在data上面声明哦！
    //也是同样的处理方式，区别就是this.$loading是element提供的全局组件，效果就是整个屏幕显示加载中。
    let loadingContent = this.$loading({
        text: '正在加载中...'
    });
    //显示详情
    this.$http.get(http_url.detail, {
        params: {
            cashId: id
        }
    }).then(function (res) {
        res = res.body;
        if (res.code === 0) {
            this.castInfo = res.datas.castInfo;
            //关闭加载中提示
            loadingContent.close();
            //显示详情的div
            this.contentShow = true;
            //为了确保看到动画效果，所以让遮罩层和详情的DIV先显示，再执行this.contentClass = true;让详情DIV从右至左的出现
            setTimeout(() => {
                this.contentClass = true;
            })
        }
        else {
            this.$message.error(res.msg);
        }
    });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>getDetali: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
    <span class="hljs-comment">//contentShow控制详情页和遮罩层的显示，contentClass控制详情页的动画，castInfo为记录请求回来的数据。大家要在data上面声明哦！</span>
    <span class="hljs-comment">//也是同样的处理方式，区别就是this.$loading是element提供的全局组件，效果就是整个屏幕显示加载中。</span>
    <span class="hljs-keyword">let</span> loadingContent = <span class="hljs-keyword">this</span>.$loading({
        <span class="hljs-attr">text</span>: <span class="hljs-string">'正在加载中...'</span>
    });
    <span class="hljs-comment">//显示详情</span>
    <span class="hljs-keyword">this</span>.$http.get(http_url.detail, {
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">cashId</span>: id
        }
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
        res = res.body;
        <span class="hljs-keyword">if</span> (res.code === <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">this</span>.castInfo = res.datas.castInfo;
            <span class="hljs-comment">//关闭加载中提示</span>
            loadingContent.close();
            <span class="hljs-comment">//显示详情的div</span>
            <span class="hljs-keyword">this</span>.contentShow = <span class="hljs-literal">true</span>;
            <span class="hljs-comment">//为了确保看到动画效果，所以让遮罩层和详情的DIV先显示，再执行this.contentClass = true;让详情DIV从右至左的出现</span>
            setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-keyword">this</span>.contentClass = <span class="hljs-literal">true</span>;
            })
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.$message.error(res.msg);
        }
    });
}
</code></pre>
<h3 id="articleHeader11">隐藏详情</h3>
<p>既然是详情，又出现，就有隐藏</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @description 隐藏详情
 */
hideContentDo(){
    //先执行this.contentClass = false。让详情DIV从左至右回去，等回去了之后，再执行this.contentShow = false;在隐藏div,否则会看不到动画效果。设置的时间，就是当时动画的时间！transition: transform 1s
    this.contentClass = false;
    setTimeout(() => {
        this.contentShow = false;
    }, 1000)
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-comment">/**
 * @description 隐藏详情
 */</span>
hideContentDo(){
    //先执行this.<span class="hljs-attr">contentClass</span> = <span class="hljs-literal">false</span>。让详情DIV从左至右回去，等回去了之后，再执行this.<span class="hljs-attr">contentShow</span> = <span class="hljs-literal">false</span>;在隐藏div,否则会看不到动画效果。设置的时间，就是当时动画的时间！transition: transform <span class="hljs-number">1</span>s
    this.<span class="hljs-attr">contentClass</span> = <span class="hljs-literal">false</span>;
    setTimeout(() =&gt; {
        this.<span class="hljs-attr">contentShow</span> = <span class="hljs-literal">false</span>;
    }, <span class="hljs-number">1000</span>)
},</code></pre>
<h2 id="articleHeader12">5.分页</h2>
<p>分页这个功能，大家可能都接触过，写得也是很复杂。但是今天用了element-ui提供的<a href="http://element.eleme.io/#/zh-CN/component/pagination" rel="nofollow noreferrer" target="_blank">分页组件</a>，就简单多了！</p>
<h3 id="articleHeader13">引入分页组件</h3>
<p>在<code>.cash-table</code>这个DIV下面，直接引入下面的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;cash-page&quot;>
    <el-pagination @current-change=&quot;handleCurrentChange&quot;
                   :page-size=&quot;pageSize&quot;
                   :current-page=&quot;currentPage&quot;
                   layout=&quot;total, prev, pager, next, jumper&quot; :total=&quot;allCount&quot;>
    </el-pagination>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"cash-page"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">el-pagination</span> @<span class="hljs-attr">current-change</span>=<span class="hljs-string">"handleCurrentChange"</span>
                   <span class="hljs-attr">:page-size</span>=<span class="hljs-string">"pageSize"</span>
                   <span class="hljs-attr">:current-page</span>=<span class="hljs-string">"currentPage"</span>
                   <span class="hljs-attr">layout</span>=<span class="hljs-string">"total, prev, pager, next, jumper"</span> <span class="hljs-attr">:total</span>=<span class="hljs-string">"allCount"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-pagination</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<blockquote><p>handleCurrentChange这个方法待会写，allCount，pageSize，currentPage这三个变量，都是之前已经声明了的，大家往上翻下就知道了！参数大家看官网-<a href="http://element.eleme.io/#/zh-CN/component/pagination" rel="nofollow noreferrer" target="_blank">分页</a></p></blockquote>
<h3 id="articleHeader14">编写分页方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @description 分页处理
 * @param val
 */
handleCurrentChange(val) {
    //val是组件的返回值，返回当前是第几页
    //然后把值赋值给currentPage。
    this.currentPage = val;
    //然后再次调用getList。更新cashList
    this.getList();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
 * <span class="hljs-doctag">@description</span> 分页处理
 * <span class="hljs-doctag">@param</span> val
 */</span>
handleCurrentChange(<span class="hljs-keyword">val</span>) {
    <span class="hljs-comment">//val是组件的返回值，返回当前是第几页</span>
    <span class="hljs-comment">//然后把值赋值给currentPage。</span>
    <span class="hljs-keyword">this</span>.currentPage = <span class="hljs-keyword">val</span>;
    <span class="hljs-comment">//然后再次调用getList。更新cashList</span>
    <span class="hljs-keyword">this</span>.getList();
}</code></pre>
<p>这个的代码看着很简单。大家可能会不太理解原理。下面我简单分析下。<br>1.首先执行<code>this.currentPage = val;</code>获取当前是第几页，比如我点击第二页。<code>this.currentPage</code>的值就是2。<br>2.然后执行<code>this.getList();</code>。这个时候，在方法里面。</p>
<p><span class="img-wrap"><img data-src="/img/bVQnkP?w=634&amp;h=282" src="https://static.alili.tech/img/bVQnkP?w=634&amp;h=282" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>相当于发送了这个请求<a href="http://xxx.xxx.com/xxx/cash/list?pageNo=2&amp;pageSize=10" rel="nofollow noreferrer" target="_blank">http://xxx.xxx.com/xxx/cash/l...</a><br>然后在执行下去，cashList这个数组就更新了。我们分页就开发完了。</p>
<p><span class="img-wrap"><img data-src="/img/bVQnod?w=1000&amp;h=883" src="https://static.alili.tech/img/bVQnod?w=1000&amp;h=883" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">6.搜索功能</h2>
<p>搜索功能这个太常见了，我现在做的项目，搜索需求就是。</p>
<p><span class="img-wrap"><img data-src="/img/bVQnoN?w=993&amp;h=225" src="https://static.alili.tech/img/bVQnoN?w=993&amp;h=225" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后输入再点击</p>
<p><span class="img-wrap"><img data-src="/img/bVQnpA?w=992&amp;h=883" src="https://static.alili.tech/img/bVQnpA?w=992&amp;h=883" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>交互很容易理解。就是输入，然后再输出结果，如上图，我在回款ID下面的文本框输入‘M2017070400060002’。然后点击搜索。就会出现输出结果。<br>下面，我们一步步来</p>
<h3 id="articleHeader16">6-1点击<span class="img-wrap"><img data-src="/img/bVQnqu?w=35&amp;h=29" src="https://static.alili.tech/img/bVQnqu?w=35&amp;h=29" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>，出现搜索框。</h3>
<h4>6-1-1，找到这个按钮，在这个按钮上绑定一个方法</h4>
<p><span class="img-wrap"><img data-src="/img/bVQnrX?w=1155&amp;h=539" src="https://static.alili.tech/img/bVQnrX?w=1155&amp;h=539" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>6-1-2.编写<code>filterSearch</code>这个方法，代码如下</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 显示与隐藏搜索
 */
filterSearch(){
    //filterModel小伙伴们要在data上声明哦，初始值为false。这个值是记录当前是不是要显示搜索框，进行搜索的。
    //当前是否需要搜索状态
    if (this.filterModel) {
        this.cashList.splice(0, 1);
    } else {
        this.cashList.unshift({
            &quot;cashId&quot;: &quot;#&quot;,
        })
    }
    //显示或隐藏搜索
    this.filterModel = !this.filterModel;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
 * 显示与隐藏搜索
 */</span>
filterSearch(){
    <span class="hljs-comment">//filterModel小伙伴们要在data上声明哦，初始值为false。这个值是记录当前是不是要显示搜索框，进行搜索的。</span>
    <span class="hljs-comment">//当前是否需要搜索状态</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.filterModel) {
        <span class="hljs-keyword">this</span>.cashList.splice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.cashList.unshift({
            <span class="hljs-string">"cashId"</span>: <span class="hljs-string">"#"</span>,
        })
    }
    <span class="hljs-comment">//显示或隐藏搜索</span>
    <span class="hljs-keyword">this</span>.filterModel = !<span class="hljs-keyword">this</span>.filterModel;
}</code></pre>
<h4>6-1-3.列表的改造</h4>
<p><span class="img-wrap"><img data-src="/img/bVQnvb?w=448&amp;h=523" src="https://static.alili.tech/img/bVQnvb?w=448&amp;h=523" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>首先，清楚一个。后端返回的数据（如上图），并不是所有的字段都是可以进行搜索的字段。只有这几个字段（如下图），才可以进行搜索。</p>
<p><span class="img-wrap"><img data-src="/img/bVQnu3?w=276&amp;h=226" src="https://static.alili.tech/img/bVQnu3?w=276&amp;h=226" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>所以，这里我分三种请况。</p>
<p>一种情况是，比如回款编号，可以进行搜索的字段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //修改前
    <el-table-column label=&quot;回款编号&quot; width=&quot;200&quot;>
        <template scope=&quot;scope&quot;>
            <span>"{{" scope.row.cashId "}}"</span>
        </template>
    </el-table-column>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">    //修改前
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"回款编号"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{" scope.row.cashId "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //修改后
    <el-table-column label=&quot;回款编号&quot; width=&quot;180&quot;>
        <template scope=&quot;scope&quot;>
            <el-input v-if=&quot;scope.row.cashId=='#'&quot;
                      size=&quot;small&quot;
                      v-model=&quot;keyFrom.cashId&quot;
                      placeholder=&quot;请输入内容&quot;>
                <el-button slot=&quot;append&quot; icon=&quot;search&quot;></el-button>
            </el-input>
            <a href=&quot;javascript:;&quot; @click=&quot;getDetali(scope.row.cashId)&quot; v-else>"{{"scope.row.cashId"}}"</a>
        </template>
    </el-table-column>
    
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    <span class="hljs-comment">//修改后</span>
    &lt;el-table-column label=<span class="hljs-string">"回款编号"</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">"180"</span>&gt;
        &lt;template scope=<span class="hljs-string">"scope"</span>&gt;
            &lt;el-<span class="hljs-selector-tag">input</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"scope.row.cashId=='#'"</span>
                      size=<span class="hljs-string">"small"</span>
                      v-model=<span class="hljs-string">"keyFrom.cashId"</span>
                      placeholder=<span class="hljs-string">"请输入内容"</span>&gt;
                &lt;el-<span class="hljs-selector-tag">button</span> slot=<span class="hljs-string">"append"</span> <span class="hljs-attribute">icon</span>=<span class="hljs-string">"search"</span>&gt;&lt;/el-button&gt;
            &lt;/el-input&gt;
            &lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"javascript:;"</span> @click=<span class="hljs-string">"getDetali(scope.row.cashId)"</span> v-<span class="hljs-keyword">else</span>&gt;"{{"scope<span class="hljs-selector-class">.row</span><span class="hljs-selector-class">.cashId</span>"}}"&lt;/a&gt;
        &lt;/template&gt;
    &lt;/el-table-column&gt;
    
    </code></pre>
<p>第二种情况是，比如回款状态，可以进行搜索的字段。但是是下拉搜索的</p>
<p><span class="img-wrap"><img data-src="/img/bVQqz5?w=265&amp;h=286" src="https://static.alili.tech/img/bVQqz5?w=265&amp;h=286" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //修改前
    <el-table-column label=&quot;回款状态&quot; width=&quot;200&quot;>
        <template scope=&quot;scope&quot;>
            <span v-if=&quot;scope.row.cashStatus === 0&quot; class=&quot;color-red&quot;>待回款</span>
            <span v-if=&quot;scope.row.cashStatus === 1&quot;>部分回款</span>
            <span v-if=&quot;scope.row.cashStatus === 2&quot; class=&quot;color-green&quot;>已回款</span>
            <span v-if=&quot;scope.row.cashStatus === 3&quot; style=&quot;color: red&quot;>已取消</span>
        </template>
    </el-table-column>

    
    //修改后
    <el-table-column label=&quot;回款状态&quot; width=&quot;100&quot;>
        <template scope=&quot;scope&quot;>
            <el-select v-model=&quot;keyFrom.cashStatus&quot; size=&quot;small&quot; placeholder=&quot;请选择&quot;
                       v-if=&quot;scope.row.cashId=='#'&quot; @change=&quot;search&quot; :disabled=&quot;pageStatus!==null&quot;>
                <el-option value=&quot;&quot; label=&quot;全选&quot;></el-option>
                <el-option value=&quot;0&quot; label=&quot;待回款&quot;></el-option>
                <el-option value=&quot;1&quot; label=&quot;部分回款&quot;></el-option>
                <el-option value=&quot;2&quot; label=&quot;已回款&quot;></el-option>
                <el-option value=&quot;3&quot; label=&quot;已取消&quot;></el-option>
            </el-select>
            <div v-else>
                <span v-if=&quot;scope.row.cashStatus === 0&quot; class=&quot;color-red&quot;>待回款</span>
                <span v-if=&quot;scope.row.cashStatus === 1&quot;>部分回款</span>
                <span v-if=&quot;scope.row.cashStatus === 2&quot; class=&quot;color-green&quot;>已回款</span>
                <span v-if=&quot;scope.row.cashStatus === 3&quot; style=&quot;color: red&quot;>已取消</span>
            </div>
        </template>
    </el-table-column>      
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    //修改前
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"回款状态"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashStatus === 0"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"color-red"</span>&gt;</span>待回款<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashStatus === 1"</span>&gt;</span>部分回款<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashStatus === 2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"color-green"</span>&gt;</span>已回款<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashStatus === 3"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: red"</span>&gt;</span>已取消<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>

    
    //修改后
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"回款状态"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-select</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"keyFrom.cashStatus"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请选择"</span>
                       <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashId=='#'"</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">:disabled</span>=<span class="hljs-string">"pageStatus!==null"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"全选"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-option</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"待回款"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-option</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"部分回款"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-option</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"2"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"已回款"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-option</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"3"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"已取消"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-option</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-select</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-else</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashStatus === 0"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"color-red"</span>&gt;</span>待回款<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashStatus === 1"</span>&gt;</span>部分回款<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashStatus === 2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"color-green"</span>&gt;</span>已回款<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashStatus === 3"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: red"</span>&gt;</span>已取消<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>      
    </code></pre>
<p>另一种情况是，比如回款流水号，不可以进行搜索的字段。修改情况是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //修改前
    <el-table-column label=&quot;回款流水号&quot; width=&quot;150&quot;>
        <template scope=&quot;scope&quot;>
            <span>"{{"scope.row.payNo"}}"</span>
        </template>
    </el-table-column>

    //修改后
    <el-table-column label=&quot;回款流水号&quot; width=&quot;150&quot;>
        <template scope=&quot;scope&quot;>
            <span v-if=&quot;scope.row.cashId!='#'&quot;>"{{"scope.row.payNo"}}"</span>
        </template>
    </el-table-column>
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">    //修改前
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"回款流水号"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"150"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"scope.row.payNo"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>

    //修改后
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"回款流水号"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"150"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"scope.row.cashId!='#'"</span>&gt;</span></span><span class="hljs-template-variable">"{{"scope.row.payNo"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    
</span></code></pre>
<h4>6-1-4流程说明</h4>
<p>下面，我简单说明下执行的流程。<br>1.<code>filterModel</code>这个值，一开始设为<code>false</code>。<br>2.点击按钮，执行<code>filterSearch</code>，由于<code>filterModel=false；</code>所以最后执行<code>this.cashList.unshift({"cashId": "#"})</code>。<br>3.this.cashList这个数组，前面就添加了<code>{"cashId": "#"}</code>。<br>点击前</p>
<p><span class="img-wrap"><img data-src="/img/bVQnCS?w=1648&amp;h=604" src="https://static.alili.tech/img/bVQnCS?w=1648&amp;h=604" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>点击后</p>
<p><span class="img-wrap"><img data-src="/img/bVQnC8?w=1684&amp;h=763" src="https://static.alili.tech/img/bVQnC8?w=1684&amp;h=763" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>4.<code>this.cashList</code>第一条就变成了<code>{"cashId": "#"}</code>，表格在遍历到第一条的时候<br><span class="img-wrap"><img data-src="/img/bVQnDQ?w=1107&amp;h=55" src="https://static.alili.tech/img/bVQnDQ?w=1107&amp;h=55" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><code>el-table-column</code>里面，由于<code>**v-if**</code>的关系。排版就改变了！这就是数据驱动的魅力！<br>是搜索字段的第一行就变成了文本框</p>
<p><span class="img-wrap"><img data-src="/img/bVQnFj?w=404&amp;h=348" src="https://static.alili.tech/img/bVQnFj?w=404&amp;h=348" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>不是搜索字段的第一行就变成了空白的</p>
<p><span class="img-wrap"><img data-src="/img/bVQnFC?w=307&amp;h=135" src="https://static.alili.tech/img/bVQnFC?w=307&amp;h=135" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>5.交互就实现了！但是有一点要注意，就是搜索框v-model的值一定要绑定正确！</p>
<p><span class="img-wrap"><img data-src="/img/bVQnI6?w=982&amp;h=751" src="https://static.alili.tech/img/bVQnI6?w=982&amp;h=751" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader17">6-2实现搜索功能</h3>
<h4>6-2-1.首先，在每个按钮里面，都绑定一个点击事件，绑定search方法，用来启动搜索！</h4>
<p><span class="img-wrap"><img data-src="/img/bVQnJJ?w=1094&amp;h=850" src="https://static.alili.tech/img/bVQnJJ?w=1094&amp;h=850" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>这个按钮，大季家都知道是哪个吧！就是这里</p>
<p><span class="img-wrap"><img data-src="/img/bVQnKj?w=448&amp;h=110" src="https://static.alili.tech/img/bVQnKj?w=448&amp;h=110" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>6-2-2.然后，编写search方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 开始搜索
 */
search(){
    this.getList();
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-comment">/**
 * 开始搜索
 */</span>
search<span class="hljs-comment">()</span>{
    this.getList<span class="hljs-comment">()</span>;
},
</code></pre>
<p>没看错，就是这一行，代码，因为每一个文本框v-model了keyFrom相对应的值。所以，只要在文本输入，keyFrom对应的值自动改！然后执行getList，keyFrom中，只要不是空字符或者null。就不会被过滤！这样就相当于执行<a href="http://xxx.xxx.com/xxx/cash/list?cashId=123456&amp;pageNo=1&amp;pageSize=10" rel="nofollow noreferrer" target="_blank">http://xxx.xxx.com/xxx/cash/l...</a>的请求。至于为什么要令写一个方法，不直接绑定getList呢，因为这里还要触发下面的搜索标签。接下来会下面要说的！</p>
<h3 id="articleHeader18">6-3实现重置搜索功能</h3>
<p>看了搜搜索之后，我想大家都知道重置搜索怎么做了！就是先把keyFrom搜索的属性的值清空，再执行getList。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
* @description 重置筛选条件
*/
resetSearch(){
    for (let key in this.keyFrom) {
        this.keyFrom[key] = null
    }
    this.getList();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
* <span class="hljs-doctag">@description</span> 重置筛选条件
*/</span>
resetSearch(){
    <span class="hljs-keyword">for</span> (let key <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.keyFrom) {
        <span class="hljs-keyword">this</span>.keyFrom[key] = <span class="hljs-literal">null</span>
    }
    <span class="hljs-keyword">this</span>.getList();
}
</code></pre>
<h2 id="articleHeader19">7.搜索标签</h2>
<p>搜索标签，在很多地方都会见到过，就是给用户看到，执行了什么条件的搜索。<br>下面就实现下这个功能！</p>
<p><span class="img-wrap"><img data-src="/img/bVQn5i?w=610&amp;h=325" src="https://static.alili.tech/img/bVQn5i?w=610&amp;h=325" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader20">7-1.编写方法</h3>
<p>先实现，这个方法，这个方法，我想大家也已经知道了，就是遍历keyFrom，然后把属性和值遍历道一个数组里面，最后在html里面v-for循环一下！</p>
<h4>7-2-1添加标签</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    addTags(){
        //tagsArr就是存放筛选标签的数组，大家要在data里面设置哦，初始值为[];
        let _this = this,_label,_value;
        //用一个变量，获取清空keyFrom里面值为空的属性！
        let _params = Object.assign(this.filterParams(this.keyFrom);
        //用一个变量，获取_params属性的集合！
        let _paramKeys = Object.keys(_params);
        //先清空tagsArr,
        this.tagsArr = [];
        _paramKeys.forEach((val) => {
            //根据val,设置_label标签名
            swicth(val){
                case 'cashId':_label='回款编号';break;
                case 'ordId':_label='订单编号';break;
                case 'custoName':_label='客户名称';break;
                case 'cashType':_label='回款类型';break;
                case 'cashStatus':_label='回款状态';break;
                case 'userName':_label='采购人';break;
                case 'userMobile':_label='采购人电话';break;
            }
            //然后上面有提到到，比如回款状态，这个的值是下拉搜索的。传过来的值是状态码，并不是文字。我们主要手动把状态码转译成文字
            //比如状态吗是0，我们需要转成‘待回款’
            //如果val等于cashStatus，就是回款状态，我们需要转译
            if (_key === 'cashStatus') {
                //判断状态码
                switch (_keyFrom3[_key]) {
                    case '0':
                        _value = &quot;待回款&quot;;
                        break;
                    case '1':
                        _value = &quot;部分回款&quot;;
                        break;
                    case '2':
                        _value = &quot;已回款&quot;;
                        break;
                    case '2':
                        _value = &quot;已取消&quot;;
                        break;
                }
            }
            //tagsArr添加元素！
            //_value如果为真，就代表是把状态码转成文字的，就添加_value，否则就直接添加_params[val]
            _this.tagsArr.push({
                key: val,
                label: _label,
                value: _value||_params[val]
            });
        });
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>    addTags(){
        <span class="hljs-comment">//tagsArr就是存放筛选标签的数组，大家要在data里面设置哦，初始值为[];</span>
        <span class="hljs-keyword">let</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span> = <span class="hljs-keyword">this</span>,<span class="hljs-number">_</span>label,<span class="hljs-number">_</span><span class="hljs-keyword">value</span>;
        <span class="hljs-comment">//用一个变量，获取清空keyFrom里面值为空的属性！</span>
        <span class="hljs-keyword">let</span> <span class="hljs-number">_p</span>arams = Object.<span class="hljs-keyword">assign</span>(<span class="hljs-keyword">this</span>.filterParams(<span class="hljs-keyword">this</span>.keyFrom);
        <span class="hljs-comment">//用一个变量，获取_params属性的集合！</span>
        <span class="hljs-keyword">let</span> <span class="hljs-number">_p</span>aramKeys = Object.keys(<span class="hljs-number">_p</span>arams);
        <span class="hljs-comment">//先清空tagsArr,</span>
        <span class="hljs-keyword">this</span>.tagsArr = [];
        <span class="hljs-number">_p</span>aramKeys.forEach((val) =&gt; {
            <span class="hljs-comment">//根据val,设置_label标签名</span>
            swicth(val){
                <span class="hljs-keyword">case</span> <span class="hljs-string">'cashId'</span>:<span class="hljs-number">_</span>label=<span class="hljs-string">'回款编号'</span>;<span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'ordId'</span>:<span class="hljs-number">_</span>label=<span class="hljs-string">'订单编号'</span>;<span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'custoName'</span>:<span class="hljs-number">_</span>label=<span class="hljs-string">'客户名称'</span>;<span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'cashType'</span>:<span class="hljs-number">_</span>label=<span class="hljs-string">'回款类型'</span>;<span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'cashStatus'</span>:<span class="hljs-number">_</span>label=<span class="hljs-string">'回款状态'</span>;<span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'userName'</span>:<span class="hljs-number">_</span>label=<span class="hljs-string">'采购人'</span>;<span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'userMobile'</span>:<span class="hljs-number">_</span>label=<span class="hljs-string">'采购人电话'</span>;<span class="hljs-keyword">break</span>;
            }
            <span class="hljs-comment">//然后上面有提到到，比如回款状态，这个的值是下拉搜索的。传过来的值是状态码，并不是文字。我们主要手动把状态码转译成文字</span>
            <span class="hljs-comment">//比如状态吗是0，我们需要转成‘待回款’</span>
            <span class="hljs-comment">//如果val等于cashStatus，就是回款状态，我们需要转译</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-number">_k</span>ey === <span class="hljs-string">'cashStatus'</span>) {
                <span class="hljs-comment">//判断状态码</span>
                <span class="hljs-keyword">switch</span> (<span class="hljs-number">_k</span>eyFrom<span class="hljs-number">3</span>[<span class="hljs-number">_k</span>ey]) {
                    <span class="hljs-keyword">case</span> <span class="hljs-string">'0'</span>:
                        <span class="hljs-number">_</span><span class="hljs-keyword">value</span> = <span class="hljs-string">"待回款"</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">'1'</span>:
                        <span class="hljs-number">_</span><span class="hljs-keyword">value</span> = <span class="hljs-string">"部分回款"</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">'2'</span>:
                        <span class="hljs-number">_</span><span class="hljs-keyword">value</span> = <span class="hljs-string">"已回款"</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">'2'</span>:
                        <span class="hljs-number">_</span><span class="hljs-keyword">value</span> = <span class="hljs-string">"已取消"</span>;
                        <span class="hljs-keyword">break</span>;
                }
            }
            <span class="hljs-comment">//tagsArr添加元素！</span>
            <span class="hljs-comment">//_value如果为真，就代表是把状态码转成文字的，就添加_value，否则就直接添加_params[val]</span>
            <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.tagsArr.push({
                key: val,
                label: <span class="hljs-number">_</span>label,
                <span class="hljs-keyword">value</span>: <span class="hljs-number">_</span><span class="hljs-keyword">value</span>||<span class="hljs-number">_p</span>arams[val]
            });
        });
    },</code></pre>
<p>这个方法什么时候触发呢，就是在搜索和重置搜索的时候触发 。这也解释了为什么搜索要令写一个方法！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="search(){
   this.getList();
   this.addTags();
},
resetSearch(){
        for (let key in this.keyFrom) {
            this.keyFrom[key] = null
        }
        this.getList();
        this.addTags();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>search(){
   <span class="hljs-keyword">this</span>.getList();
   <span class="hljs-keyword">this</span>.addTags();
},
resetSearch(){
        <span class="hljs-keyword">for</span> (let key <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.keyFrom) {
            <span class="hljs-keyword">this</span>.keyFrom[key] = <span class="hljs-literal">null</span>
        }
        <span class="hljs-keyword">this</span>.getList();
        <span class="hljs-keyword">this</span>.addTags();
}</code></pre>
<p>但是大家应该还有注意到一个，就是比如‘回款状态’，是下拉搜索的，所以，在下拉框，就要绑定search方法。 </p>
<p><span class="img-wrap"><img data-src="/img/bVQqED?w=719&amp;h=363" src="https://static.alili.tech/img/bVQqED?w=719&amp;h=363" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>7-2-2html页面遍历</h4>
<p>然后在html页面遍历这个tagsArr。<br><span class="img-wrap"><img data-src="/img/bVQn9l?w=1185&amp;h=571" src="https://static.alili.tech/img/bVQn9l?w=1185&amp;h=571" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>7-2-3删除标签</h4>
<p>眼尖的小伙伴又发现了，tagClose这个方法对吧！<br>接下来就实现这个！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tagClose(key, _index){
    //根据下标，鼠标tagsArr数组某一项
    this.tagsArr.splice(_index, 1);
    //根据key，把keyFrom某一项设为空值
    this.keyFrom[key] = null;
    //重新请求，更新cashList
    this.getList();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>tagClose(key, _index){
    <span class="hljs-comment">//根据下标，鼠标tagsArr数组某一项</span>
    <span class="hljs-keyword">this</span>.tagsArr.splice(_index, <span class="hljs-number">1</span>);
    <span class="hljs-comment">//根据key，把keyFrom某一项设为空值</span>
    <span class="hljs-keyword">this</span>.keyFrom[key] = <span class="hljs-literal">null</span>;
    <span class="hljs-comment">//重新请求，更新cashList</span>
    <span class="hljs-keyword">this</span>.getList();
}</code></pre>
<h2 id="articleHeader21">8.未完待续</h2>
<p>好了，今天就到这里了，这篇文章也写了将近10个小时了！如果你有耐心读到这里，你也是很有耐心的勇士！当然，当面的代码和交互还是有细节是需要优化的，这个就比较简单，小伙伴们，随机应变下就知道怎么做了！也写累了！不想说太多了！下一篇文章，预热就是利用监听路由(vue-router)。来实现同一个页面，不同状态的处理。就比如：同样是回款管理，我要求新建一个待回款的页面，但是这个页面只有待回款的数据。回款状态也不能修改！这个小伙伴们也可以试着做下，怎么实现。这个相对简单！</p>
<h2 id="articleHeader22">9.往期占坑</h2>
<p><a href="https://segmentfault.com/a/1190000010025189">webpack+vue项目实战（一,搭建运行环境和相关配置）</a><br><a href="https://segmentfault.com/a/1190000010039810" target="_blank">webpack+vue项目实战（二，开发管理系统主页面）</a><br><a href="https://segmentfault.com/a/1190000010053886#articleHeader5">webpack+vue项目实战（三，配置功能操作页和组件的按需加载）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack+vue项目实战（四，前端与后端的数据交互和前端展示数据）

## 原文链接
[https://segmentfault.com/a/1190000010063757](https://segmentfault.com/a/1190000010063757)


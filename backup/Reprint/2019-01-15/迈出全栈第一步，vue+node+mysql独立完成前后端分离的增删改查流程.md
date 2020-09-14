---
title: '迈出全栈第一步，vue+node+mysql独立完成前后端分离的增删改查流程' 
date: 2019-01-15 2:30:12
hidden: true
slug: wort35u3hxj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>本文只是本人学习过程的一个记录，并不是什么非常严谨的教程，希望和大家一起共同进步。也希望大家能指出我的问题。适合有一定基础，志在全栈的前端初学者学习，从点击按钮提交ajax到获得服务器response，然后更新页面，这其中到底发生了什么？下面我们就来实现一个小demo，以前后端分离的方式独立跑通一个简单的增删改查流程，迈出全栈第一步。</p>
<p>用到的一些技术栈</p>
<ul>
<li>数据库：mysql mysqlfront(数据库gui工具)</li>
<li>后端：node express mysqljs(node数据库模块)</li>
<li>前端: vue(mvvm框架) elment-ui(快速搭建前端页面) axios(ajax) webpack(构建工具)</li>
</ul>
<p>后端负责提供接口，操作数据库提供前端所需的数据和状态。<br>前端负责调用接口，将数据展示给用户，并对用户的一些操作转发给后端处理。<br>数据库当然是负责存储数据啦，关于数据库，网上很多教程都是使用mongodb，通过mongoose操作mongdb的确比mysql便捷很多，不过实际工作中还是使用mysql的多，技术还是得回归实际应用才能体现出价值。</p>
<p>本demo使用node创建本地服务器，在localhost就能完成全部流程，并不需要线上服务器。虽然功能非常简单，但是用的的模块和工具还是蛮多的，建议大家把注意力放在从前到后的这个流程上，一些工具和库的使用我也不详细介绍了，大家自己google，要成为全栈这点学习能力还是要有的。</p>
<h2 id="articleHeader1">项目结构</h2>
<p>先上<a href="https://github.com/win5do/vue-mall-admin" rel="nofollow noreferrer" target="_blank">github仓库地址</a>吧</p>
<p><span class="img-wrap"><img data-src="/img/bVMXyM?w=463&amp;h=856" src="https://static.alili.tech/img/bVMXyM?w=463&amp;h=856" alt="项目结构" title="项目结构" style="cursor: pointer; display: inline;"></span></p>
<p>大致介绍下项目结构，前后端在不同的文件夹下面，互不影响。前端使用webpack构建，利用webpack-dev-server开发，前端入口是localhost:8888/dist/index.html。后端使用express框架，利用nodemon自动重启，主机是localhost:9999。使用webpack-dev-server和express分别创建了两个服务器，用同一个端口会冲突，so这里会有跨域问题，不过用devserver可以轻松解决，后面会说到具体解决办法。如果是线上服务器的话放一个里面就行了。</p>
<h2 id="articleHeader2">先从前端开始</h2>
<p>首先用vue-cli生成项目模板就行了，用webpack-simple就够了，改相关配置方便点。</p>
<p>我们的页面很简单，主要有两个组件list.vue(展示所有数据和相关操作)，一个form.vue(新增及修改商品)，这么一个页面各位前端估计啪啪几下就搞定了吧，至于你用不用element-ui都无所谓，用的话速度快点颜值高点。大家请无视我项目里使用的pug(jade)模板、饿了么主题文件、登录组件等，这只是为了方便以后扩展。前端index.html用一个空壳就行了。</p>
<p><span class="img-wrap"><img data-src="/img/bVMXF2?w=1919&amp;h=433" src="https://static.alili.tech/img/bVMXF2?w=1919&amp;h=433" alt="list" title="list" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVMXF4?w=1919&amp;h=517" src="https://static.alili.tech/img/bVMXF4?w=1919&amp;h=517" alt="form" title="form" style="cursor: pointer;"></span></p>
<p>配置一下前端路由，/admin下有两个子页面，list和form，默认为list(一般默认是个后台概况页)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
    routes: [
        {
            path: '/admin',
            redirect: '/admin/list',
            name: 'admin',
            component: Admin,
            children: [
                {
                    path: '/admin/list',
                    name: 'list',
                    component: List,
                },
                {
                    path: '/admin/form',
                    name: 'form',
                    component: Form,
                },]
        },
    ]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
    <span class="hljs-attribute">routes</span>: [
        {
            <span class="hljs-attribute">path</span>: <span class="hljs-string">'/admin'</span>,
            <span class="hljs-attribute">redirect</span>: <span class="hljs-string">'/admin/list'</span>,
            <span class="hljs-attribute">name</span>: <span class="hljs-string">'admin'</span>,
            <span class="hljs-attribute">component</span>: Admin,
            <span class="hljs-attribute">children</span>: [
                {
                    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/admin/list'</span>,
                    <span class="hljs-attribute">name</span>: <span class="hljs-string">'list'</span>,
                    <span class="hljs-attribute">component</span>: List,
                },
                {
                    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/admin/form'</span>,
                    <span class="hljs-attribute">name</span>: <span class="hljs-string">'form'</span>,
                    <span class="hljs-attribute">component</span>: Form,
                },]
        },
    ]
});</code></pre>
<p>静态部分基本完成了，下面来编写组件中的数据流转逻辑</p>
<p>列表的数据是从后端来的，所以list组件的created钩子里应有一个获取全部数据的ajax。先不急着上，要用ajax的地方很多，那么我们先对ajax方法做一个封装吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// pubulic/func.js

import axios from &quot;axios&quot;;

export default {
    ajaxGet (api, cb) {
        axios.get(api)
            .then(cb)
            .catch(err => {
                console.log(err);
            })
    },
    ajaxPost (api, post, cb) {
        axios.post(api, post)
            .then(cb)
            .catch(err => {
                console.log(err);
            })
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// pubulic/func.js</span>

<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">"axios"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    ajaxGet (api, cb) {
        axios.get(api)
            .then(cb)
            .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(err);
            })
    },
    ajaxPost (api, post, cb) {
        axios.post(api, post)
            .then(cb)
            .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(err);
            })
    },
}</code></pre>
<p>这里我们使用的axios模块来进行ajax请求，写法是promise的链式操作，封装一个get和一个post就够用了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// pubulic/api.js

let host = '/api';

export default {
    goodsList: host + '/goods-list',
    goodsDetail: host + '/goods-detail',
    goodsDelete: host + '/goods-delete',
    goodsAdd: host + '/goods-add',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// pubulic/api.js</span>

<span class="hljs-keyword">let</span> host = <span class="hljs-string">'/api'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">goodsList</span>: host + <span class="hljs-string">'/goods-list'</span>,
    <span class="hljs-attr">goodsDetail</span>: host + <span class="hljs-string">'/goods-detail'</span>,
    <span class="hljs-attr">goodsDelete</span>: host + <span class="hljs-string">'/goods-delete'</span>,
    <span class="hljs-attr">goodsAdd</span>: host + <span class="hljs-string">'/goods-add'</span>,
}</code></pre>
<p>同样在public文件夹下创建一个api.js把所有的接口信息都写在一起，方便后续修改。路径要与后端接口一致。</p>
<p>下面解决跨域问题，配置一下devserver.proxy就能轻松搞定，按照下面的配置，路径以/api开头的请求就会被node服务器转发到9999端口，关于webpack的一些东西可以看看我的另一篇文章<a href="https://segmentfault.com/a/1190000009243487">关于webpack的一点小心得</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
// ...

devServer: {
    port: 8888,
    historyApiFallback: true,
    stats: 'minimal',  // 输入精简信息
    overlay: true, // 将错误显示在html之上
    proxy: {
        '/api': {
            target: 'http://localhost:9999',
            secure: false,
            changeOrigin: true,
        }
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">//</span> <span class="hljs-string">webpack.config.js</span>
<span class="hljs-string">//</span> <span class="hljs-string">...</span>

<span class="hljs-attr">devServer:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    port:</span> <span class="hljs-number">8888</span><span class="hljs-string">,</span>
<span class="hljs-attr">    historyApiFallback:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    stats:</span> <span class="hljs-string">'minimal'</span><span class="hljs-string">,</span>  <span class="hljs-string">//</span> <span class="hljs-string">输入精简信息</span>
<span class="hljs-attr">    overlay:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">将错误显示在html之上</span>
<span class="hljs-attr">    proxy:</span> <span class="hljs-string">{</span>
        <span class="hljs-string">'/api'</span><span class="hljs-string">:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            target:</span> <span class="hljs-string">'http://localhost:9999'</span><span class="hljs-string">,</span>
<span class="hljs-attr">            secure:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">            changeOrigin:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">},</span></code></pre>
<p>终于要进入组件中写具体的业务逻辑了，我们在created里拿到数据，渲染进表格。虽然后端还没开始呢，但我们期望res.data是一个包含所有商品的数组(如果数据大了还要分页哦)，数据之后在后端中处理，实际项目中可以使用mock模拟数据。</p>
<p>删除操作把要删除的商品id post至指定接口，然后在回调里判断返回的状态，这个status应该是约定好的，我就设为201是成功好了。后端返回成功后，前端数据中对应的元素也要删掉，更新视图。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// list.vue

import func from '../../public/func';
import api from '../../public/api';
// ...省略代码若干行

methods: {
    // 删除
    handleDelete(row) {
        func.ajaxPost(api.goodsDelete, {id: row.Id}, res => {
            if (res.status === 201) {
                let index = this.tableData.indexOf(row);
                this.tableData.splice(index, 1);
                this.$message.success('删除成功');
            }
        });
    },

    // 修改
    handleEdit (row) {
        this.$router.push({name: 'form', query: {id: row.Id"}}");
    },
},

created () {
    func.ajaxGet(api.goodsList, res => {
        this.tableData = res.data;
    });
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// list.vue</span>

<span class="hljs-keyword">import</span> func <span class="hljs-keyword">from</span> <span class="hljs-string">'../../public/func'</span>;
<span class="hljs-keyword">import</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">'../../public/api'</span>;
<span class="hljs-comment">// ...省略代码若干行</span>

methods: {
    <span class="hljs-comment">// 删除</span>
    handleDelete(row) {
        func.ajaxPost(api.goodsDelete, {<span class="hljs-attr">id</span>: row.Id}, res =&gt; {
            <span class="hljs-keyword">if</span> (res.status === <span class="hljs-number">201</span>) {
                <span class="hljs-keyword">let</span> index = <span class="hljs-keyword">this</span>.tableData.indexOf(row);
                <span class="hljs-keyword">this</span>.tableData.splice(index, <span class="hljs-number">1</span>);
                <span class="hljs-keyword">this</span>.$message.success(<span class="hljs-string">'删除成功'</span>);
            }
        });
    },

    <span class="hljs-comment">// 修改</span>
    handleEdit (row) {
        <span class="hljs-keyword">this</span>.$router.push({<span class="hljs-attr">name</span>: <span class="hljs-string">'form'</span>, <span class="hljs-attr">query</span>: {<span class="hljs-attr">id</span>: row.Id"}}");
    },
},

created () {
    func.ajaxGet(api.goodsList, res =&gt; {
        <span class="hljs-keyword">this</span>.tableData = res.data;
    });
},</code></pre>
<p>list页的修改操作就是路由跳转到form页了，同时把id以query形式传过去。在form的created钩子里判断，如果有query.id的话就说明是在修改商品，没有的话就是添加，这样就可以复用这个form组件咯。不爱偷懒的程序员不是好程序员。这个修改操作也可以用vuex把商品数据传递过来，不过页面刷新就没有了，还是用ajax稳妥。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// form.vue

// ...省略代码若干行

created () {
    let id = this.$route.query.id;
    console.log(id);
    if (id) {
        func.ajaxPost(api.goodsDetail, {id}, res => {
            this.form = res.data;
        });
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code><span class="hljs-comment">// form.vue</span>

<span class="hljs-comment">// ...省略代码若干行</span>

created () {
    let <span class="hljs-keyword">id</span> = <span class="hljs-keyword">this</span>.$route.query.id;
    console.log(<span class="hljs-keyword">id</span>);
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">id</span>) {
        func.ajaxPost(api.goodsDetail, {<span class="hljs-keyword">id</span>}, res =&gt; {
            <span class="hljs-keyword">this</span>.form = res.data;
        });
    }
},</code></pre>
<p>其他的一些操作不具体说了，都挺简单的，让我们进入久违的后端吧。</p>
<h2 id="articleHeader3">创建数据库</h2>
<p>来到后端第一步就是创建一个数据库，这里我用的是phpstudy附带的，当然你也可以自己装，毕竟这个附带的还是老旧的5.5版本。sql语句我玩不来啊就用phpstudy附带的mysqlfront这个gui工具来撸了。建一个叫vue-admin的库，然后一张goods的表，只有id,name,price,create_time这四个字段，简单明了。<br><span class="img-wrap"><img data-src="/img/bVMXKv?w=1358&amp;h=772" src="https://static.alili.tech/img/bVMXKv?w=1358&amp;h=772" alt="mysql" title="mysql" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">编写后端接口</h2>
<p>终于玩到node了，首先全局安装nodemon帮我们自动重启，然后装好express等包，新手不推荐使用express-generator创建项目。看到这里请大家先去预习一下<a href="https://github.com/mysqljs/mysql" rel="nofollow noreferrer" target="_blank">mysqljs</a>这个模块。</p>
<p>我们把数据库的配置写在单独的文件中，抽离配置文件是一个好习惯。然后在控制器中使用mysql.createPool(db)创建连接池。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// db.js

module.exports = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'vue-admin'
};

// controls/goods.js

let pool = mysql.createPool(db);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-comment">// db.js</span>

<span class="hljs-keyword">module</span>.exports = {
    host: <span class="hljs-string">'localhost'</span>,
    port: <span class="hljs-number">3306</span>,
    user: <span class="hljs-string">'root'</span>,
    password: <span class="hljs-string">'root'</span>,
    database: <span class="hljs-string">'vue-admin'</span>
};

<span class="hljs-comment">// controls/goods.js</span>

<span class="hljs-keyword">let</span> pool = mysql.createPool(db);</code></pre>
<p>下面编写增删改查等路由接口，与前端的api.js中的路径保持一致，get还是post根据情况而定，回调函数不写在这里写进控制器goods.js中。在入口文件中use router，这时候我们的接口路径就是/api/goods-list</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// router.js

router.get('/goods-list', goods.getGoodsList);
router.post('/goods-detail', goods.getOneGoods);
router.post('/goods-add', goods.addGoods);
router.post('/goods-delete', goods.deleteGoods);

module.exports = router;

// app.js

let router = require('./routes/router');
app.use('/api', router);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// router.js</span>

router.get(<span class="hljs-string">'/goods-list'</span>, goods.getGoodsList);
router.post(<span class="hljs-string">'/goods-detail'</span>, goods.getOneGoods);
router.post(<span class="hljs-string">'/goods-add'</span>, goods.addGoods);
router.post(<span class="hljs-string">'/goods-delete'</span>, goods.deleteGoods);

<span class="hljs-built_in">module</span>.exports = router;

<span class="hljs-comment">// app.js</span>

<span class="hljs-keyword">let</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/router'</span>);
app.use(<span class="hljs-string">'/api'</span>, router);</code></pre>
<p>控制器中同样是增删改查四个方法，首先我们把一些可复用的sql语句封装起来。这是mysqljs中的语法，？就是变量，双??是表名或字段名，单?则为value。insert和update就不封装了，涉及到具体字段，直接写好了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// sql.js

module.exports = {
    queryAll: 'SELECT * FROM ??',
    queryById: 'SELECT * FROM ?? WHERE id=?',
    del: 'DELETE FROM ?? WHERE id=?',
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>// sql.js

module.exports = {
    queryAll: '<span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> ??<span class="hljs-string">',
    queryById: '</span><span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> ?? <span class="hljs-keyword">WHERE</span> id=?<span class="hljs-string">',
    del: '</span><span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> ?? <span class="hljs-keyword">WHERE</span> id=?<span class="hljs-string">',
};</span></code></pre>
<p>控制器里拿一个方法出来说一下吧，完整的代码都在github。使用pool.getConnection方法从连接池建立连接，SELECT * FROM goods获取goods表中所有数据，res.json将数据以json格式传给前端。读取操作完成后调用release()释放连接。rows及前端拿到的res的数据格式大家可以console看一下，都是数组类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取商品列表
    getGoodsList (req, res) {
    pool.getConnection((err, conn) => {
        conn.query(sql.queryAll, 'goods', (err, rows) => {
            if (err) throw err;

            rows = formatDate(rows);
            res.json(rows);

            conn.release();
        });
    });
},

// formatDate函数利用moment.js将数据库中的时间戳格式转化为年月日的格式
function formatDate(rows) {
    return rows.map(row => {
        let date = moment(row.create_time).format('YYYY-MM-DD');
        return Object.assign({}, row, {create_time: date});
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 获取商品列表</span>
    getGoodsList (req, res) {
    pool.getConnection(<span class="hljs-function">(<span class="hljs-params">err, conn</span>) =&gt;</span> {
        conn.query(sql.queryAll, <span class="hljs-string">'goods'</span>, (err, rows) =&gt; {
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;

            rows = formatDate(rows);
            res.json(rows);

            conn.release();
        });
    });
},

<span class="hljs-comment">// formatDate函数利用moment.js将数据库中的时间戳格式转化为年月日的格式</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatDate</span>(<span class="hljs-params">rows</span>) </span>{
    <span class="hljs-keyword">return</span> rows.map(<span class="hljs-function"><span class="hljs-params">row</span> =&gt;</span> {
        <span class="hljs-keyword">let</span> date = moment(row.create_time).format(<span class="hljs-string">'YYYY-MM-DD'</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, row, {<span class="hljs-attr">create_time</span>: date});
    });
}</code></pre>
<p>写后端接口的时候还跑去前端提交请求比较蛋疼，这里推荐大家使用postman这个工具来测试接口，提高效率。postman可以以chrome插件的形式安装，十分方便。</p>
<p><span class="img-wrap"><img data-src="/img/bVM4zp?w=1305&amp;h=701" src="https://static.alili.tech/img/bVM4zp?w=1305&amp;h=701" alt="postman" title="postman" style="cursor: pointer;"></span></p>
<p>后端接口跑通后，前后端协调修改一下，从前端调用接口，到后端从数据库中读取数据，最后返回给前端，整个流程至此就跑通了。</p>
<h2 id="articleHeader5">全栈之路修远兮</h2>
<p>我们只是完成了一个web应用最最基本的功能，新手可能一脸懵逼，大牛可能一脸蔑视，全栈之路还远着呢。接下来需要去增加登录等模块，更复杂的业务逻辑，还有安全方面的考虑，让程序健壮起来，大家一起加油吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
迈出全栈第一步，vue+node+mysql独立完成前后端分离的增删改查流程

## 原文链接
[https://segmentfault.com/a/1190000009246144](https://segmentfault.com/a/1190000009246144)


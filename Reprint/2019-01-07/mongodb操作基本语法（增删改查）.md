---
title: 'mongodb操作基本语法（增删改查）' 
date: 2019-01-07 2:30:11
hidden: true
slug: 1jy6155nahh
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">1、启动mongodb</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mongod -f /usr/local/etc/mongod.conf //启动服务
mongo  //输入命令进入mongo操作终端，需要新开窗口" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>mongod -f <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/etc/m</span>ongod.conf <span class="hljs-regexp">//</span>启动服务
mongo  <span class="hljs-regexp">//</span>输入命令进入mongo操作终端，需要新开窗口</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321535" src="https://static.alili.tech/img/remote/1460000010321535" alt="启动成功" title="启动成功" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321536" src="https://static.alili.tech/img/remote/1460000010321536" alt="进入mongo控制台" title="进入mongo控制台" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">2、mongodb基础语法</h3>
<h5>（1）查看当前所有的数据库</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="show dbs //查看当前所有的数据库" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">show</span> dbs <span class="hljs-comment">//查看当前所有的数据库</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321537" src="https://static.alili.tech/img/remote/1460000010321537" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<h5>（2）新建数据库</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="use  demo //创建demo的数据库
/*这个时候show dbs 是看不到demo的，因为数据库里没有任何东西。*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">use</span>  demo <span class="hljs-comment">//创建demo的数据库</span>
<span class="hljs-comment">/*这个时候show dbs 是看不到demo的，因为数据库里没有任何东西。*/</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321538" src="https://static.alili.tech/img/remote/1460000010321538" alt="新建数据库" title="新建数据库" style="cursor: pointer; display: inline;"></span></p>
<h5>（3）新建集合，也就是平时所说的表</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.createCollection(&quot;user&quot;)  //创建 user 集合，相当于表 db 代表就是当前的数据库
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>db.createCollection(<span class="hljs-string">"user"</span>)  //创建 <span class="hljs-keyword">user</span> <span class="hljs-title">集合，相当于表 db</span> 代表就是当前的数据库
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321539" src="https://static.alili.tech/img/remote/1460000010321539" alt="新建集合" title="新建集合" style="cursor: pointer; display: inline;"></span></p>
<h5>（4）新建集合同时插入数据，可以替换3步骤</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.users.insert({id:123,name:&quot;hello&quot;}) //这种方式创建集合的同时并插入一条数据，完全可以跳过上面创建集合的步骤" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">db<span class="hljs-selector-class">.users</span><span class="hljs-selector-class">.insert</span>({id:<span class="hljs-number">123</span>,name:<span class="hljs-string">"hello"</span>}) <span class="hljs-comment">//这种方式创建集合的同时并插入一条数据，完全可以跳过上面创建集合的步骤</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321540" src="https://static.alili.tech/img/remote/1460000010321540" alt="新建集合同时插入数据" title="新建集合同时插入数据" style="cursor: pointer; display: inline;"></span></p>
<h5>（5）查看当前所有集合，也就是表</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="show collections //查看当前数据库的集合" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">show</span> collections <span class="hljs-comment">//查看当前数据库的集合</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321541" src="https://static.alili.tech/img/remote/1460000010321541" alt="查看当前所有集合" title="查看当前所有集合" style="cursor: pointer; display: inline;"></span></p>
<h5>（6）删除数据库demo2</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.dropDatabase() //删除当前数据库" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;">db.dropDatabase<span class="hljs-comment">()</span> <span class="hljs-comment">//删除当前数据库</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321542" src="https://static.alili.tech/img/remote/1460000010321542" alt="删除数据库demo2" title="删除数据库demo2" style="cursor: pointer; display: inline;"></span></p>
<h5>（7）验证是否删除</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="show dbs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">show dbs</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321543" src="https://static.alili.tech/img/remote/1460000010321543" alt="验证是否删除" title="验证是否删除" style="cursor: pointer; display: inline;"></span></p>
<h5>（8）删除集合</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.user.drop() //删除集合 ，重新建集合才能删哦。。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">db<span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.drop</span>() <span class="hljs-comment">//删除集合 ，重新建集合才能删哦。。</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321544" src="https://static.alili.tech/img/remote/1460000010321544" alt="删除集合" title="删除集合" style="cursor: pointer; display: inline;"></span></p>
<h5>（9）查找集合所有信息</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.user.insert({userId:101,name:&quot;yuki&quot;,class:{num:21,name:&quot;1班&quot;"}}") 
//创建一个集合，并插入一条数据，数据里是带有对象的。自己多建几条哦
db.user.find() //查看当前集合的所有数据
db.user.findOne() //查看第一条数据" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.insert</span>({<span class="hljs-attribute">userId</span>:<span class="hljs-number">101</span>,<span class="hljs-attribute">name</span>:<span class="hljs-string">"yuki"</span>,<span class="hljs-attribute">class</span>:{<span class="hljs-attribute">num</span>:<span class="hljs-number">21</span>,<span class="hljs-attribute">name</span>:<span class="hljs-string">"1班"</span>"}}") 
<span class="hljs-comment">//创建一个集合，并插入一条数据，数据里是带有对象的。自己多建几条哦</span>
<span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.find</span>() <span class="hljs-comment">//查看当前集合的所有数据</span>
<span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.findOne</span>() <span class="hljs-comment">//查看第一条数据</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321545" src="https://static.alili.tech/img/remote/1460000010321545" alt="查找集合所有信息" title="查找集合所有信息" style="cursor: pointer; display: inline;"></span></p>
<h5>（10）美化方式查找集合所有信息</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.user.find().pretty() //格式化查看，其实就是美化，可能不支持部分windows
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>db<span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.find</span>().pretty() <span class="hljs-comment">//格式化查看，其实就是美化，可能不支持部分windows</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321546" src="https://static.alili.tech/img/remote/1460000010321546" alt="美化方式查找集合所有信息" title="美化方式查找集合所有信息" style="cursor: pointer; display: inline;"></span></p>
<h5>（11）更新数据</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.user.update({&quot;name&quot;:'jack'},{$set:{&quot;class.num&quot;:&quot;228&quot;"}}") 
//修改name为jack的班级人数 根据name去设置num" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>db<span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.update</span>({<span class="hljs-string">"name"</span>:<span class="hljs-string">'jack'</span>},{<span class="hljs-variable">$set</span>:{<span class="hljs-string">"class.num"</span>:<span class="hljs-string">"228"</span>"}}") 
<span class="hljs-comment">//修改name为jack的班级人数 根据name去设置num</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321547" src="https://static.alili.tech/img/remote/1460000010321547" alt="更新数据" title="更新数据" style="cursor: pointer; display: inline;"></span><br>验证数据是否更新</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.user.find({name:&quot;jack&quot;}) //根据name为jack,查看当前记录" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">db<span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.find</span>({name:<span class="hljs-string">"jack"</span>}) <span class="hljs-comment">//根据name为jack,查看当前记录</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321548" src="https://static.alili.tech/img/remote/1460000010321548" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<h5>（12）查找大于0的数据</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//有点类似于html的代码
$gt //大于
$lt //小于
$gte //大于等于
$lte //小于等于


db.user.find({&quot;class.num&quot;:{$gt:0"}}") //查找大于0的数据" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//有点类似于html的代码</span>
<span class="hljs-variable">$gt</span> <span class="hljs-comment">//大于</span>
<span class="hljs-variable">$lt</span> <span class="hljs-comment">//小于</span>
<span class="hljs-variable">$gte</span> <span class="hljs-comment">//大于等于</span>
<span class="hljs-variable">$lte</span> <span class="hljs-comment">//小于等于</span>


db<span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.find</span>({<span class="hljs-string">"class.num"</span>:{<span class="hljs-variable">$gt</span>:<span class="hljs-number">0</span>"}}") <span class="hljs-comment">//查找大于0的数据</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321549" src="https://static.alili.tech/img/remote/1460000010321549" alt="查找大于0的数据" title="查找大于0的数据" style="cursor: pointer; display: inline;"></span><br>这个结果如上图，可是结果显然有点不对啊！<br>看到之前的截图可以发现，我们一共有3条数据，怎么查到大于0的只有2条呢？<br>这是因为，我们在第11步更改数据的时候，把班级人数改成了"228"，这是字符串，我们查的大于0，0是数字。所以大家注意操作数据的时候不要犯这样的错误~</p>
<h5>（13）查找大于字符串200的数据</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.user.find({&quot;class.num&quot;:{$gt:&quot;200&quot;"}}") //查找大于字符串200的数据" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">db<span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.find</span>({<span class="hljs-string">"class.num"</span>:{<span class="hljs-variable">$gt</span>:<span class="hljs-string">"200"</span>"}}") <span class="hljs-comment">//查找大于字符串200的数据</span></code></pre>
<p>如下图，查找大于字符串200的数据，就有啦！<br><span class="img-wrap"><img data-src="/img/remote/1460000010321550" src="https://static.alili.tech/img/remote/1460000010321550" alt="查找大于字符串200的数据" title="查找大于字符串200的数据" style="cursor: pointer; display: inline;"></span></p>
<h5>（14）查找小于100的数据</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.user.find({&quot;class.num&quot;:{$lt:100"}}") //查找小于100的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">db<span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.find</span>({<span class="hljs-string">"class.num"</span>:{<span class="hljs-variable">$lt</span>:<span class="hljs-number">100</span>"}}") <span class="hljs-comment">//查找小于100的</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321551" src="https://static.alili.tech/img/remote/1460000010321551" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<h5>（15）删除数据</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.user.remove({userId:101}) // 根据userId为101删除这条数据" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">db<span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.remove</span>({userId:<span class="hljs-number">101</span>}) <span class="hljs-comment">// 根据userId为101删除这条数据</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010321552" src="https://static.alili.tech/img/remote/1460000010321552" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">3、总结</h3>
<p>刚刚学习，写错的地方希望各位不吝赐教。一起学习，一起进步~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mongodb操作基本语法（增删改查）

## 原文链接
[https://segmentfault.com/a/1190000010321530](https://segmentfault.com/a/1190000010321530)


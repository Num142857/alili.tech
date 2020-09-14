---
title: 'node.js 爬取招聘信息分析各职业钱途（爬虫+动态IP代理+数据可视化分析）' 
date: 2018-12-07 2:30:10
hidden: true
slug: pz0oy2gxwu
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前前言</h1>
<p>不想看爬虫过程只想看职位钱途数据分析请看这里：<br><a href="http://weiyu-chen.github.io/data-analysis/frontend.html" rel="nofollow noreferrer" target="_blank">前端招聘岗位分析</a><br><a href="http://weiyu-chen.github.io/data-analysis/cpp.html" rel="nofollow noreferrer" target="_blank">C++招聘岗位分析</a><br><a href="http://weiyu-chen.github.io/data-analysis/java.html" rel="nofollow noreferrer" target="_blank">JAVA招聘岗位分析</a><br><a href="http://weiyu-chen.github.io/data-analysis/php.html" rel="nofollow noreferrer" target="_blank">PHP招聘岗位分析</a><br><a href="http://weiyu-chen.github.io/data-analysis/python.html" rel="nofollow noreferrer" target="_blank">Python招聘岗位分析</a></p>
<p>想看源码或想自己爬一个请看这里：<a href="https://github.com/Weiyu-Chen/lagou-spider-node" rel="nofollow noreferrer" target="_blank">本文github源码</a></p>
<h1 id="articleHeader1">前言</h1>
<p>早在一年前大学校招期间，为了充实下简历，就写了个<code>node</code>爬虫，可惜当时能力有限，工程存在一定的局限性，不好意思拿出来<del>装逼</del>分享。 </p>
<p>一年过去了，现在能力依然有限，但是脸皮却练厚了，于是就有了这篇文章。</p>
<h1 id="articleHeader2">题纲</h1>
<p>关于爬虫，主流技术是用<code>python</code>，然而随着<code>node</code>的出现，对于对<code>python</code>了解有限的前端同学，用<code>node</code>来实现一个爬虫也不失为一个不错的选择。</p>
<p>当然无论是<code>python</code>爬虫还是<code>node</code>爬虫或者其他品种的爬虫，其实除了语言特性之外，其思路基本大同小异。下面我就为大家详细介绍下<code>node</code>爬虫的具体思路与实现，内容大概如下：</p>
<ul>
<li>
<p>爬前准备</p>
<ul>
<li>选择目标</li>
<li>分析可收集数据与目标可爬取入口</li>
</ul>
</li>
<li>
<p>爬虫</p>
<ul>
<li>爬取<code>JSON</code>数据</li>
<li>爬取<code>HTML</code>文档，提取有用信息</li>
<li>Mongodb 数据存储</li>
<li>并发控制</li>
<li>动态IP代理（防止IP被禁）</li>
</ul>
</li>
<li>数据可视化展示</li>
</ul>
<h1 id="articleHeader3">爬前准备</h1>
<h2 id="articleHeader4">选择目标</h2>
<p>既然要写爬虫，当然要爬一些利益相关的数据比较好玩啦。<strong>爬取招聘网站的招聘信息，来看看互联网圈子里各个工种的目前薪酬状况及其发展前景</strong>，想来是不错的选择。</p>
<p>经我夜观天下，掐指一算，就选<a href="https://www.lagou.com" rel="nofollow noreferrer" target="_blank">拉勾网</a>吧。</p>
<h2 id="articleHeader5">分析可收集数据</h2>
<p>一个职位招聘信息，一般来说，我们关注的重点信息会是：</p>
<ul>
<li>
<strong>薪酬</strong>（毫无疑问，重中之重）</li>
<li>工作城市</li>
<li>学历要求</li>
<li>工作年限要求</li>
<li>雇主公司</li>
<li>公司领域</li>
<li>公司规模</li>
</ul>
<p>带着想要收集的信息，首先，进入<a href="https://www.lagou.com" rel="nofollow noreferrer" target="_blank">拉勾官网</a>，搜索<code>web前端</code>岗位，能看到<br><span class="img-wrap"><img data-src="/img/bV4Ynm?w=976&amp;h=427" src="https://static.alili.tech/img/bV4Ynm?w=976&amp;h=427" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>很好，我们想要的信息基本都有了。</p>
<h2 id="articleHeader6">分析目标可爬取入口</h2>
<h3 id="articleHeader7">PC端入口</h3>
<p><code>F12</code> 分析请求资源，可得<code>https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&amp;isSchoolJob=0</code> <br>post 请求体</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    first:false,
    pn:1,
    kd:`web前端`
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">{</span>
<span class="hljs-attr">    first:</span><span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    pn:</span><span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">    kd:</span><span class="hljs-string">`web前端`</span>
<span class="hljs-string">}</span></code></pre>
<p>响应JSON数据</p>
<p><span class="img-wrap"><img data-src="/img/bV5Hor?w=548&amp;h=353" src="https://static.alili.tech/img/bV5Hor?w=548&amp;h=353" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>完美！！！</strong>  数据格式都已经帮我们整理好了，直接爬就行了。</p>
<p><strong>但，完美的数据总不会这么轻易让你得到</strong>，经我用 <code>node</code> 和 <code>python</code>，还有<code>postman</code> 携带浏览器全部<code>header</code>信息一一测试，均发现：<br><span class="img-wrap"><img data-src="/img/bV5Hpu?w=697&amp;h=58" src="https://static.alili.tech/img/bV5Hpu?w=697&amp;h=58" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><strong>好吧，此路不通</strong>。（此接口反爬虫机制不明，有研究的大神请留言=_=）</p>
<p>所谓条条大路通罗马，此路不通，咱绕路走。</p>
<h3 id="articleHeader8">移动端入口</h3>
<p>经过一番探索，发现 <a href="https://m.lagou.com/" rel="nofollow noreferrer" target="_blank">拉勾移动端站点</a> 空门大开！</p>
<blockquote>提示： 一般有点技术含量的网站都可能会存在不同强度的反爬虫机制，而一般其移动端站点的反爬虫机制相对于PC站点较弱，是一个不错的着手点。再不行的话，还可以去其app端抓包分析是否存在想要的请求哦。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV5OlN?w=566&amp;h=332" src="https://static.alili.tech/img/bV5OlN?w=566&amp;h=332" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>GET请求： <a href="https://m.lagou.com/search.json?city=%E5%85%A8%E5%9B%BD&amp;positionName=web%E5%89%8D%E7%AB%AF&amp;pageNo=1&amp;pageSize=15" rel="nofollow noreferrer" target="_blank">https://m.lagou.com/search.js...</a><br>响应信息：<br><span class="img-wrap"><img data-src="/img/bV5Otl?w=454&amp;h=302" src="https://static.alili.tech/img/bV5Otl?w=454&amp;h=302" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>很好，虽然数据信息有点少，但是总算是一个能爬的接口了。</p>
<h1 id="articleHeader9">爬虫</h1>
<p>好了，分析也分析完了，现在正式设计爬虫程序。</p>
<h2 id="articleHeader10">JSON数据爬取</h2>
<ol>
<li>
<p>首先，把请求的路径与参数单独抽离。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let spider = {
    requestUrl : &quot;http://m.lagou.com/search.json&quot;,
    query: {
        city: '',
        pageNum: '',
        job: '',
    },
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> spider = {
    <span class="hljs-attr">requestUrl</span> : <span class="hljs-string">"http://m.lagou.com/search.json"</span>,
    <span class="hljs-attr">query</span>: {
        <span class="hljs-attr">city</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">pageNum</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">job</span>: <span class="hljs-string">''</span>,
    },
    ...
}</code></pre>
</li>
<li>
<p>发出请求，此处的服务端构造请求使用 <a href="https://www.npmjs.com/package/superagent" rel="nofollow noreferrer" target="_blank">superagent</a>，当然，用 <a href="https://www.npmjs.com/package/request" rel="nofollow noreferrer" target="_blank">request</a> 等类似的包也可以，并无限定。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let spider = {
    ....
/**
 * 发起单个请求
 * @return {<Promise<Array>> | <Promise<String>>} 请求成功resolve原始数据，否则reject
  **/
    request() {
        return new Promise((resolve,reject)=>{
            superagent
            .get(this.requestUrl)
            .query({
                city: this.query.city,
                pageNo: this.query.pageNum,
                positionName: this.query.job
            }).end((err, res)=>{
                let dataList = [];
                if (err || !res || !res.ok) {
                    console.error(err);
                    reject('request failed!')
                } else  {
                    dataList = res.body.content.data.page.result
                    if (dataList.length === 0) {
                        // 当请求结果数组长度为0，即认为已经到末页，结束爬虫
                        reject('finish');                     
                    } else {
                        resolve(dataList)
                    }
                } 
            })
        })
    },
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> spider = {
    ....
<span class="hljs-comment">/**
 * 发起单个请求
 * @return {&lt;Promise&lt;Array&gt;&gt; | &lt;Promise&lt;String&gt;&gt;} 请求成功resolve原始数据，否则reject
  **/</span>
    request() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
            superagent
            .get(<span class="hljs-keyword">this</span>.requestUrl)
            .query({
                <span class="hljs-attr">city</span>: <span class="hljs-keyword">this</span>.query.city,
                <span class="hljs-attr">pageNo</span>: <span class="hljs-keyword">this</span>.query.pageNum,
                <span class="hljs-attr">positionName</span>: <span class="hljs-keyword">this</span>.query.job
            }).end(<span class="hljs-function">(<span class="hljs-params">err, res</span>)=&gt;</span>{
                <span class="hljs-keyword">let</span> dataList = [];
                <span class="hljs-keyword">if</span> (err || !res || !res.ok) {
                    <span class="hljs-built_in">console</span>.error(err);
                    reject(<span class="hljs-string">'request failed!'</span>)
                } <span class="hljs-keyword">else</span>  {
                    dataList = res.body.content.data.page.result
                    <span class="hljs-keyword">if</span> (dataList.length === <span class="hljs-number">0</span>) {
                        <span class="hljs-comment">// 当请求结果数组长度为0，即认为已经到末页，结束爬虫</span>
                        reject(<span class="hljs-string">'finish'</span>);                     
                    } <span class="hljs-keyword">else</span> {
                        resolve(dataList)
                    }
                } 
            })
        })
    },
 </code></pre>
</li>
<li>
<p>处理数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let spider = {
    ....
/**
 * 处理爬取到的原始数据，提取出所需的数据
 * @param {<Array>} - companyList : 原始数据
 * @return {<Promise<Array>>} resolve处理过的数据
  **/
    handleCallbackData(companyList) {
       
        //处理数据
         let arr = companyList.map((item) => {
            let salary = item.salary.split('-');
            
            //工资两种情况：”10k以上“ or &quot;10k-15k&quot;， 平均工资取中位数
            aveSalary = salary.length == 1 ? parseInt(salary[0])*1000 : (parseInt(salary[0]) + parseInt( salary[1] ) )*500;

            //过滤出所需数据
            return {
                companyFullName: item.companyFullName,
                positionId : item.positionId ,
                salary:aveSalary ,
                city:item.city ,

                field: '',
                companySize:'',
                workYear:'' ,
                qualification: '',
            }
        });

        return Promise.resolve(arr)
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> spider = {
    ....
<span class="hljs-comment">/**
 * 处理爬取到的原始数据，提取出所需的数据
 * @param {&lt;Array&gt;} - companyList : 原始数据
 * @return {&lt;Promise&lt;Array&gt;&gt;} resolve处理过的数据
  **/</span>
    handleCallbackData(companyList) {
       
        <span class="hljs-comment">//处理数据</span>
         <span class="hljs-keyword">let</span> arr = companyList.map(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
            <span class="hljs-keyword">let</span> salary = item.salary.split(<span class="hljs-string">'-'</span>);
            
            <span class="hljs-comment">//工资两种情况：”10k以上“ or "10k-15k"， 平均工资取中位数</span>
            aveSalary = salary.length == <span class="hljs-number">1</span> ? <span class="hljs-built_in">parseInt</span>(salary[<span class="hljs-number">0</span>])*<span class="hljs-number">1000</span> : (<span class="hljs-built_in">parseInt</span>(salary[<span class="hljs-number">0</span>]) + <span class="hljs-built_in">parseInt</span>( salary[<span class="hljs-number">1</span>] ) )*<span class="hljs-number">500</span>;

            <span class="hljs-comment">//过滤出所需数据</span>
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">companyFullName</span>: item.companyFullName,
                <span class="hljs-attr">positionId</span> : item.positionId ,
                <span class="hljs-attr">salary</span>:aveSalary ,
                <span class="hljs-attr">city</span>:item.city ,

                <span class="hljs-attr">field</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attr">companySize</span>:<span class="hljs-string">''</span>,
                <span class="hljs-attr">workYear</span>:<span class="hljs-string">''</span> ,
                <span class="hljs-attr">qualification</span>: <span class="hljs-string">''</span>,
            }
        });

        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(arr)
    }</code></pre>
</li>
<li>
<p>保存数据，此处数据库使用<code>mongodb</code>，<code>ORM</code>使用 <code>moogoose</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="save2db(jobList) {
    return new Promise((resolve, reject)=>{
        Job.create(jobList,function (err,product) {
            if (err) {
                console.error(err.errmsg)
                err.code == 11000 &amp;&amp; resolve('丢弃重复数据')
                reject(err);
            } else {
                resolve(&quot;save data to database successfully&quot;)
            }
        })    
    })
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>save2db(jobList) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>)=&gt;</span>{
        Job.create(jobList,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err,product</span>) </span>{
            <span class="hljs-keyword">if</span> (err) {
                <span class="hljs-built_in">console</span>.error(err.errmsg)
                err.code == <span class="hljs-number">11000</span> &amp;&amp; resolve(<span class="hljs-string">'丢弃重复数据'</span>)
                reject(err);
            } <span class="hljs-keyword">else</span> {
                resolve(<span class="hljs-string">"save data to database successfully"</span>)
            }
        })    
    })
},</code></pre>
</li>
</ol>
<h2 id="articleHeader11">HTML 数据解析爬取</h2>
<p>从上述的<code>json</code>数据其实我们可以看到，<code>JSON</code>返回的信息十分有限，那么我们需要爬取更多的信息，就需要在招聘详情页解析 html 后提取出所需的信息<br>随便打开一个移动端的招聘详情页<a href="https://m.lagou.com/jobs/3638173.html" rel="nofollow noreferrer" target="_blank">https://m.lagou.com/jobs/3638173.html</a>，目测出<code>url</code>结构很简单，就是<code>jobs/"{{"positionId"}}".html</code><br><span class="img-wrap"><img data-src="/img/bV6Kxi?w=400&amp;h=299" src="https://static.alili.tech/img/bV6Kxi?w=400&amp;h=299" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>从详情页中可以找出 JSON 数据中缺少的数据项：工作年限要求，学历要求，雇主公司领域，雇主公司融资情况，雇主公司规模大小。</p>
<p>爬取方法和上述爬取 <code>JSON</code> 数据相差无几，主要差别就是数据解析部分，这里需要用到<code>cherrio</code>来解析 爬取到的HTML，从而更简单地提取必要信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    handleCallbackData({res, jobId}) {
        var $ = cheerio.load(res.text);

        let workYear = $('#content > div.detail > div.items > span.item.workyear > span').text(),
            qualification = $('#content > div.detail > div.items > span.item.education').text().trim(),
            field = $('#content > div.company.activeable > div > div > p').text().trim().split(/\s*\/\s*/)[0]
            companySize = $('#content > div.company.activeable > div > div > p').text().trim().split(/\s*\/\s*/)[2];

        /* 如果这四项数据都没有提取到，很有可能是被拉勾的反爬虫机制拦截了 */
        if ( !(workYear || qualification || field || companySize) ) {
            console.log(res.text)
            return Promise.reject({code:-1, msg:'wrong response!', jobId});
        }

        return {
            id: jobId,
            jobInfo: {
                workYear,
                qualification,
                field,
                // financeStage,
                companySize,
            }
        }
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>    handleCallbackData({res, jobId}) {
        var $ = cheerio.load(res.<span class="hljs-keyword">text</span>);

        let workYear = $(<span class="hljs-string">'#content &gt; div.detail &gt; div.items &gt; span.item.workyear &gt; span'</span>).<span class="hljs-keyword">text</span>(),
            qualification = $(<span class="hljs-string">'#content &gt; div.detail &gt; div.items &gt; span.item.education'</span>).<span class="hljs-keyword">text</span>().<span class="hljs-keyword">trim</span>(),
            field = $(<span class="hljs-string">'#content &gt; div.company.activeable &gt; div &gt; div &gt; p'</span>).<span class="hljs-keyword">text</span>().<span class="hljs-keyword">trim</span>().split(/\s*\/\s*/)[<span class="hljs-number">0</span>]
            companySize = $(<span class="hljs-string">'#content &gt; div.company.activeable &gt; div &gt; div &gt; p'</span>).<span class="hljs-keyword">text</span>().<span class="hljs-keyword">trim</span>().split(/\s*\/\s*/)[<span class="hljs-number">2</span>];

        <span class="hljs-comment">/* 如果这四项数据都没有提取到，很有可能是被拉勾的反爬虫机制拦截了 */</span>
        <span class="hljs-keyword">if</span> ( !(workYear || qualification || field || companySize) ) {
            console.<span class="hljs-keyword">log</span>(res.<span class="hljs-keyword">text</span>)
            <span class="hljs-keyword">return</span> Promise.reject({code:<span class="hljs-number">-1</span>, msg:<span class="hljs-string">'wrong response!'</span>, jobId});
        }

        <span class="hljs-keyword">return</span> {
            id: jobId,
            jobInfo: {
                workYear,
                qualification,
                field,
                <span class="hljs-comment">// financeStage,</span>
                companySize,
            }
        }
    },</code></pre>
<h2 id="articleHeader12">并发控制</h2>
<p>做过爬虫的都知道，爬虫的请求并发量是必须要做的，为什么要控制并发？</p>
<ol>
<li>控制其爬取频率，以免没爬几个就网站被封IP了。</li>
<li>控制爬虫应用运行内存，不控制并发的话一下子处理N个请求，内存分分钟爆炸。</li>
</ol>
<p>实现并发控制可以使用<code>npm</code>包 <a href="https://www.npmjs.com/package/async" rel="nofollow noreferrer" target="_blank">async.mapLimit</a>，这里为了自由度更大我使用了自己实现的 <a href="https://segmentfault.com/a/1190000013128649">15 行代码实现并发控制</a>。</p>
<p>具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let ids = [2213545,5332233, ...], // 招聘岗位详情id列表
    limit = 10, // 并发数
    runningRequestNum = 0 , // 当前并发数
    count = 0; // 累计爬取数据项计数
    
mapLimit(ids, limit, async (jobId)=>{
    let requestUrl = `http://m.lagou.com/jobs/${jobId}.html?source=home_hot&amp;i=home_hot-6` ;
    let delay = parseInt(Math.random() * 2000);

    let currentIndex = count++;
    runningRequestNum++

    await sleep( delay );  // 避免爬太快被封ip，休眠一两秒
    
    let result = await spiderHTML.run({
                    requestUrl,
                    jobId,
                    proxyIp
                })
    console.log(`当前并发数`, runningRequestNum)
    runningRequestNum--
    
    return result;
}).then(mapResult => {
    // 并发控制下将 ids 全部迭代完毕
    // do something 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> ids = [<span class="hljs-number">2213545</span>,<span class="hljs-number">5332233</span>, ...], <span class="hljs-comment">// 招聘岗位详情id列表</span>
    limit = <span class="hljs-number">10</span>, <span class="hljs-comment">// 并发数</span>
    runningRequestNum = <span class="hljs-number">0</span> , <span class="hljs-comment">// 当前并发数</span>
    count = <span class="hljs-number">0</span>; <span class="hljs-comment">// 累计爬取数据项计数</span>
    
mapLimit(ids, limit, <span class="hljs-keyword">async</span> (jobId)=&gt;{
    <span class="hljs-keyword">let</span> requestUrl = <span class="hljs-string">`http://m.lagou.com/jobs/<span class="hljs-subst">${jobId}</span>.html?source=home_hot&amp;i=home_hot-6`</span> ;
    <span class="hljs-keyword">let</span> delay = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">2000</span>);

    <span class="hljs-keyword">let</span> currentIndex = count++;
    runningRequestNum++

    <span class="hljs-keyword">await</span> sleep( delay );  <span class="hljs-comment">// 避免爬太快被封ip，休眠一两秒</span>
    
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> spiderHTML.run({
                    requestUrl,
                    jobId,
                    proxyIp
                })
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`当前并发数`</span>, runningRequestNum)
    runningRequestNum--
    
    <span class="hljs-keyword">return</span> result;
}).then(<span class="hljs-function"><span class="hljs-params">mapResult</span> =&gt;</span> {
    <span class="hljs-comment">// 并发控制下将 ids 全部迭代完毕</span>
    <span class="hljs-comment">// do something </span>
})</code></pre>
<p><br><br>然而，即便严格控制了请求频率，我们还是不可避免地<strong>中招</strong>了。</p>
<p><span class="img-wrap"><img data-src="/img/bV6K2U?w=837&amp;h=602" src="https://static.alili.tech/img/bV6K2U?w=837&amp;h=602" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>对于反爬虫措施比较暴躁的网站来说，一个IP爬取太过频繁，被识别成机器爬虫几乎是不可避免的。</p>
<p>一般来讲，我们最简单直接的方法就是：<strong>换IP</strong>。这个IP访问频率太高了被反爬拦截到，换个IP就行了嘛。</p>
<h2 id="articleHeader13">动态IP代理</h2>
<p>单个IP爬虫对于反爬较为严厉的网站是走不通的。那么我们需要用到动态IP池，每次爬取时从IP池中拉取一个IP出来爬数据。</p>
<p>道理很简单，<br><strong>1秒内1个IP访问了100个页面，即便是单身20多年的手速也无法企及。只能是机器爬虫无疑。</strong><br><strong>但1秒内100个IP访问100个页面，平均每个IP一秒内访问了1个页面，那基本不会被反爬干掉</strong></p>
<p><strong>怎么搭建动态IP池？ </strong></p>
<ol>
<li>
<strong>首先我们得有一个IP源</strong>，动态IP池的补充都从这里拉取，这个网上搜一下"免费代理IP"就有很多出来，选其中一个，收费的IP源比较稳定可靠，免费的就一分钱一分货了。</li>
<li>其次，每次从IP源中拉取的IP都是无法确认其是否可用的，我们必须筛选一遍，<strong>提取出可用的IP</strong>。（PS: 此处和步骤4目的一直，如果IP源较为可靠，可以省略）</li>
<li>
<strong>设计从IP池中拉取单个IP的策略</strong>，使得每个IP使用频率均匀，尽量避免单个IP使用频率过高而失效。</li>
<li>
<strong>移除失效IP</strong>。尽管设计了拉取策略，但依旧不可避免某些IP失效，此时需要将其移出IP池废弃。</li>
</ol>
<p>动态IP池工作流程：</p>
<div id="flowDiagram0" class="flowChart"><div class="table-wrap"><svg height="389.828125" version="1.1" width="749.109375" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; top: -0.203125px;"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.1.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><path stroke-linecap="round" d="M5,0 0,2.5 5,5z" id="raphael-marker-block" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/><marker id="raphael-marker-endblock33" markerheight="3" markerwidth="3" orient="auto" refx="1.5" refy="1.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><use xlink:href="#raphael-marker-block" transform="rotate(180 1.5 1.5) scale(0.6,0.6)" stroke-width="1.6667" fill="black" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/></marker></defs><rect x="0" y="0" width="117.21875" height="36" r="20" rx="20" ry="20" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="st" transform="matrix(1,0,0,1,63.8047,46.207)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="stt" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,63.8047,46.207)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">提取一个可用IP</tspan></text><path fill="#ffffff" stroke="#000000" d="M58.20703125,29.103515625L0,58.20703125L116.4140625,116.4140625L232.828125,58.20703125L116.4140625,0L0,58.20703125" stroke-width="3" id="isEnought" class="flowchart" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" transform="matrix(1,0,0,1,6,138.207)"/><text x="63.20703125" y="58.20703125" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="isEnoughtt" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,6,138.207)"><tspan dy="5.00390625" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">池中IP数量是否足够</tspan></text><rect x="0" y="0" width="173.21875" height="36" r="20" rx="20" ry="20" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="e" transform="matrix(1,0,0,1,35.8047,350.8281)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="et" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,35.8047,350.8281)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">根据策略返回一个可用IP</tspan></text><rect x="0" y="0" width="102.453125" height="36" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="fetch" transform="matrix(1,0,0,1,360.0156,178.4141)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="fetcht" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,360.0156,178.4141)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">从IP源拉取IP</tspan></text><rect x="0" y="0" width="172.453125" height="36" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="valid" transform="matrix(1,0,0,1,548.6563,178.4141)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="validt" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,548.6563,178.4141)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">筛选出有效IP并存入IP池</tspan></text><path fill="none" stroke="#000000" d="M122.4140625,82.20703125C122.4140625,82.20703125,122.4140625,120.40780210494995,122.4140625,133.70719156763516" stroke-width="3" marker-end="url(#raphael-marker-endblock33)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/><path fill="none" stroke="#000000" d="M122.4140625,254.62109375C122.4140625,254.62109375,122.4140625,327.3372417401988,122.4140625,346.3329151653728" stroke-width="3" marker-end="url(#raphael-marker-endblock33)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/><text x="127.4140625" y="264.62109375" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" font-size="14px"><tspan dy="5.01171875" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">yes</tspan></text><path fill="none" stroke="#000000" d="M238.828125,196.4140625C238.828125,196.4140625,333.5902568548918,196.4140625,355.5225080752134,196.4140625" stroke-width="3" marker-end="url(#raphael-marker-endblock33)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/><text x="243.828125" y="186.4140625" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" font-size="14px"><tspan dy="5.0078125" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">no</tspan></text><path fill="none" stroke="#000000" d="M462.46875,196.4140625C462.46875,196.4140625,526.4463146440685,196.4140625,544.1588532930855,196.4140625" stroke-width="3" marker-end="url(#raphael-marker-endblock33)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/><path fill="none" stroke="#000000" d="M721.109375,196.4140625C721.109375,196.4140625,746.109375,196.4140625,746.109375,196.4140625C746.109375,196.4140625,746.109375,113.20703125,746.109375,113.20703125C746.109375,113.20703125,122.4140625,113.20703125,122.4140625,113.20703125C122.4140625,113.20703125,122.4140625,126.51100254058838,122.4140625,133.7086588833481" stroke-width="3" marker-end="url(#raphael-marker-endblock33)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/></svg></div></div>
<p>具体实现代码其实和上面的爬虫差不多，无非就是爬岗位变成了爬IP而已，具体<a href="https://github.com/Weiyu-Chen/lagou-spider-node" rel="nofollow noreferrer" target="_blank">实现源码</a>在这，就不在这写了。</p>
<h1 id="articleHeader14">数据可视化分析</h1>
<p>我们最终折腾爬虫，无非就是想要看爬到的数据到底说明了什么。<br>成功爬取了拉钩网上多个招聘岗位的具体信息后，数据可视化并得出分析结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV7dEE?w=758&amp;h=470" src="https://static.alili.tech/img/bV7dEE?w=758&amp;h=470" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>从整体看，北上广深杭这五个城市前端工程师招聘岗位，北京是遥遥领先，是深圳的两倍，是广州的三倍，其次到上海，深圳，杭州，广州居末。</p>
<p>从需求量大概可以看出，整体互联网产业发达程度是 北 &gt; 上 &gt; 深 &gt; 杭 &gt; 广</p>
<p><span class="img-wrap"><img data-src="/img/bV7dEL?w=759&amp;h=474" src="https://static.alili.tech/img/bV7dEL?w=759&amp;h=474" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>由平均工资曲线图可以看到，每隔2K算一档的话，北京一档，上海一档，杭州深圳一档，空一档，广州吊车尾，杭州竟然比深圳高了300，这就代表着深圳虽然招聘需求比杭州大，但两者薪酬待遇其实差不多。</p>
<p>从不同薪酬的招聘数量也能看出一些很大的区别，招聘提供薪资水平中，普遍数量最多的是10k-20k这个水平，但，北京牛逼，招聘岗位60%以上都是20K以上的。我们具体来看看，各个城市对高端人才（提供薪酬20k以上）的招聘比例，那就可以看出明显区别了：</p>
<ul>
<li>北京：招聘的薪资水平是"20k以上",大概是招聘总数的59.7%</li>
<li>上海：招聘的薪资水平是"20k以上",大概是招聘总数的41.3%</li>
<li>深圳：招聘的薪资水平是"20k以上",大概是招聘总数的29.2%</li>
<li>杭州：招聘的薪资水平是"20k以上",大概是招聘总数的30.4%，和深圳相差不大</li>
<li>广州：招聘的薪资水平是"20k以上",大概是招聘总数的……10.4%。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV7dEU?w=749&amp;h=500" src="https://static.alili.tech/img/bV7dEU?w=749&amp;h=500" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>基本可以看到一个明显的趋势，公司规模越大，能提供的薪酬越高，不差钱。<br>另外，从不同规模的公司的前端招聘数量来看，北京又一枝独秀，大公司招聘需求很高。</p>
<p>但从全国来看，不同规模的公司（除了15人以下的）招聘数量基本在同一水平，基本说明：大公司少，但是每个公司招聘的人多；小公司多，但是每个公司招聘的人少。<del>好像这是句废话。</del></p>
<p><span class="img-wrap"><img data-src="/img/bV7dFr?w=764&amp;h=515" src="https://static.alili.tech/img/bV7dFr?w=764&amp;h=515" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>从图上看，工作经历在1-5年的现在需求最旺盛，并且理所当然地，工作资历越高，薪资越高。<br>其中3-5年的最吃香，广州有点奇怪，1-3年的最吃香？综合上面的多项数据，感觉像是1-3年工资比3-5年低所以广州互联网公司多招1-3年</p>
<p>当然，这里存在这一个幸存者偏差，拉勾上大部分的都是社招性质的招聘，而应届生和1年经验的大部分都跑校招去了吧，所以数量低也不出奇。</p>
<p><span class="img-wrap"><img data-src="/img/bV7dF2?w=763&amp;h=475" src="https://static.alili.tech/img/bV7dF2?w=763&amp;h=475" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>移动互联网占据了大半壁江山，剩下之中，金融，电子商务，企业服务，数据服务在同一层次。另外，物联网，智能硬件各有一招聘岗位，薪酬都是5K...嗯虽说node现在也可以做物联网了(还别说，我还真的用node搞过硬件串口通信Orz)，但是终究不是主流技术，数据展示表明，前端基本与硬件绝缘。</p>
<p>薪酬待遇倒是都在同一水平上，“大数据”工资倒是一枝独秀，但是数据量太少，参考价值不大。</p>
<p><strong> 总结：北京钱多机会多当之无愧第一档；上海稍逊一筹；杭州深圳又低一筹；广州真的是差了两个身位。 而对于前端来说，北京 移动互联网 大公司，钱多！坑多！速来！ </strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node.js 爬取招聘信息分析各职业钱途（爬虫+动态IP代理+数据可视化分析）

## 原文链接
[https://segmentfault.com/a/1190000014128148](https://segmentfault.com/a/1190000014128148)


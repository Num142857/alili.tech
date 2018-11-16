---
title: Node.js+Mysql+Vue+ElementUI 实现登录注册注销功能
hidden: true
categories: [reprint]
slug: bfcd5ef3
date: 2018-10-27 02:30:17
---

{{< raw >}}
<p>&#x524D;&#x4E24;&#x4E2A;&#x6708;&#x4E00;&#x76F4;&#x5B66;&#x4E60;vue,node.js&#xFF0C;&#x4F46;&#x6CA1;&#x6709;&#x771F;&#x6B63;&#x5730;&#x52A8;&#x624B;&#x505A;&#x9879;&#x76EE;&#xFF0C;&#x6070;&#x597D;&#x8D76;&#x4E0A;&#x516C;&#x53F8;&#x8981;&#x6C42;&#x6211;&#x4EEC;&#x505A;&#x4E00;&#x4E2A;&#x7684;&#x767B;&#x5F55;&#x6CE8;&#x518C;&#x7684;&#x72EC;&#x7ACB;&#x8FD0;&#x884C;&#x7CFB;&#x7EDF;&#xFF0C;&#x8D81;&#x7740;&#x8FD9;&#x4E2A;&#x673A;&#x4F1A;&#x5B66;&#x4E60;&#x5DE9;&#x56FA;&#x4E0B;&#x81EA;&#x5DF1;&#x4E4B;&#x524D;&#x5B66;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x524D;&#x7AEF;&#x4F7F;&#x7528; vue&#xFF0C;&#x540E;&#x7AEF;&#x7528; Express &#x505A;&#x670D;&#x52A1;&#x7AEF;&#x63D0;&#x4F9B;&#x6570;&#x636E;&#x63A5;&#x53E3;&#xFF0C;&#x6570;&#x636E;&#x5E93;&#x7528; MySql&#x3002;<br>&#x5B9E;&#x73B0;&#x5BF9;&#x6570;&#x636E;&#x5E93;&#x7684;&#x589E;&#x6539;&#x67E5;&#x64CD;&#x4F5C;&#x3002;</p><p>demo &#x8981;&#x6C42;</p><p>&#x5B8C;&#x6210;&#x4E00;&#x5957;&#x53EF;&#x4EE5;&#x72EC;&#x7ACB;&#x8FD0;&#x884C;&#x7684;&#x524D;&#x7AEF;&#x7CFB;&#x7EDF;&#xFF0C;&#x5305;&#x62EC;&#x6CE8;&#x518C;&#xFF0C;&#x767B;&#x5F55;&#xFF0C;&#x4E2A;&#x4EBA;&#x4E2D;&#x5FC3;3&#x4E2A;&#x529F;&#x80FD;&#x6A21;&#x5757;&#x3002;</p><ul><li>1.&#x4E0D;&#x9650;&#x5B9A;&#x5F00;&#x53D1;&#x6280;&#x672F;&#x548C;&#x5F00;&#x53D1;&#x6846;&#x67B6;&#x3002;</li><li>2.&#x7528;&#x6237;&#x5305;&#x62EC;&#x4EE5;&#x4E0B;&#x4FE1;&#x606F;&#xFF1A;&#x7528;&#x6237;&#x540D;&#x79F0;&#xFF0C;&#x8D26;&#x53F7;&#x540D;&#x79F0;&#xFF0C;&#x5BC6;&#x7801;&#xFF0C;&#x5BC6;&#x7801;&#x91CD;&#x590D;&#xFF0C;&#x90AE;&#x7BB1;&#xFF0C;&#x624B;&#x673A;&#xFF0C;&#x8EAB;&#x4EFD;&#x8BC1;&#xFF0C;&#x51FA;&#x751F;&#x65E5;&#x671F;&#xFF0C;&#x6027;&#x522B;</li><li>3.&#x6CE8;&#x518C;&#x65F6;&#x9700;&#x8981;&#x5BF9;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x8FDB;&#x884C;&#x975E;&#x7A7A;&#x6821;&#x9A8C;&#x548C;&#x683C;&#x5F0F;&#x6821;&#x9A8C;&#xFF0C;&#x4E24;&#x6B21;&#x5BC6;&#x7801;&#x4E00;&#x81F4;&#x6027;&#x6821;&#x9A8C;&#xFF0C;&#x8868;&#x5355;&#x63D0;&#x4EA4;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x9632;&#x91CD;&#x590D;&#x63D0;&#x4EA4;</li><li>4.&#x767B;&#x5F55;&#x65F6;&#x9700;&#x8981;&#x6709;&#x9A8C;&#x8BC1;&#x7801;&#xFF0C;&#x9700;&#x8981;&#x5BF9;&#x9A8C;&#x8BC1;&#x7801;&#x6B63;&#x786E;&#x6027;&#x8FDB;&#x884C;&#x6821;&#x9A8C;&#xFF0C;&#x9A8C;&#x8BC1;&#x7801;&#x6821;&#x9A8C;&#x5931;&#x8D25;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x9A8C;&#x8BC1;&#x7801;&#xFF0C;&#x63D0;&#x4F9B;&#x624B;&#x52A8;&#x66F4;&#x65B0;&#x9A8C;&#x8BC1;&#x7801;&#x64CD;&#x4F5C;</li><li>5.&#x767B;&#x5F55;&#x6210;&#x529F;&#x5C55;&#x793A;&#x4E2A;&#x4EBA;&#x4E2D;&#x5FC3;&#xFF0C;&#x63D0;&#x4F9B;&#x4FEE;&#x6539;&#x4E2A;&#x4EBA;&#x4FE1;&#x606F;&#x64CD;&#x4F5C;&#xFF0C;&#x9000;&#x51FA;&#x64CD;&#x4F5C;&#xFF0C;&#x4FEE;&#x6539;&#x5BC6;&#x7801;&#x64CD;&#x4F5C;</li><li>&#x9644;&#x52A0;&#xFF1A;&#x4E2A;&#x4EBA;&#x4E2D;&#x5FC3;&#x63D0;&#x4F9B;&#x5934;&#x50CF;&#x4EE5;&#x53CA;&#x4FEE;&#x6539;&#x5934;&#x50CF;&#x529F;&#x80FD;</li></ul><h2 id="articleHeader0">&#x51C6;&#x5907;&#x5DE5;&#x4F5C;</h2><h4><a href="https://nodejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">node.js</a></h4><h4><a href="https://www.mysql.com/" rel="nofollow noreferrer" target="_blank">mysql</a></h4><h4><a href="https://git-scm.com/" rel="nofollow noreferrer" target="_blank">git</a></h4><h4><a href="http://www.expressjs.com.cn/" rel="nofollow noreferrer" target="_blank">express</a></h4><h4><a href="http://element.eleme.io/#/" rel="nofollow noreferrer" target="_blank">element-UI</a></h4><h2 id="articleHeader1">&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h2><p>&#x9996;&#x5148;&#x4ECB;&#x7ECD;&#x4E0B;&#x9879;&#x76EE;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;</p><p><span class="img-wrap"><img data-src="/img/bV717u?w=764&amp;h=615" src="https://static.alili.tech/img/bV717u?w=764&amp;h=615" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">vue-cli &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; webpack &#x7684; Vue &#x767B;&#x5F55;&#x6CE8;&#x518C;&#x7CFB;&#x7EDF;&#x9879;&#x76EE;</h2><p>&#x9996;&#x5148;&#x5168;&#x5C40;&#x5B89;&#x88C5;&#xFF1A; <code>npm install -g vue-cli</code></p><p>&#x5B89;&#x88C5;&#x4F9D;&#x8D56;&#xFF0C;&#x5B9E;&#x73B0;&#x5728;package.json &#x4E2D;&#x5BF9;&#x5E94;&#x6DFB;&#x52A0;&#x76F8;&#x5E94;&#x7684;&#x7248;&#x672C;&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C; <code>npm install</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;dependencies&quot;: {
    &quot;axios&quot;: &quot;^0.15.3&quot;,
    &quot;babel-polyfill&quot;: &quot;^6.23.0&quot;,
    &quot;body-parser&quot;: &quot;^1.18.2&quot;,
    &quot;element-ui&quot;: &quot;1.3.1&quot;,
    &quot;mysql&quot;: &quot;^2.15.0&quot;,
    &quot;vue&quot;: &quot;^2.3.2&quot;,
    &quot;vue-core-image-upload&quot;: &quot;2.1.11&quot;,
    &quot;vue-datasource&quot;: &quot;1.0.9&quot;,
    &quot;vue-router&quot;: &quot;^2.3.1&quot;,
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>  <span class="hljs-string">&quot;dependencies&quot;</span>: {
    <span class="hljs-string">&quot;axios&quot;</span>: <span class="hljs-string">&quot;^0.15.3&quot;</span>,
    <span class="hljs-string">&quot;babel-polyfill&quot;</span>: <span class="hljs-string">&quot;^6.23.0&quot;</span>,
    <span class="hljs-string">&quot;body-parser&quot;</span>: <span class="hljs-string">&quot;^1.18.2&quot;</span>,
    <span class="hljs-string">&quot;element-ui&quot;</span>: <span class="hljs-string">&quot;1.3.1&quot;</span>,
    <span class="hljs-string">&quot;mysql&quot;</span>: <span class="hljs-string">&quot;^2.15.0&quot;</span>,
    <span class="hljs-string">&quot;vue&quot;</span>: <span class="hljs-string">&quot;^2.3.2&quot;</span>,
    <span class="hljs-string">&quot;vue-core-image-upload&quot;</span>: <span class="hljs-string">&quot;2.1.11&quot;</span>,
    <span class="hljs-string">&quot;vue-datasource&quot;</span>: <span class="hljs-string">&quot;1.0.9&quot;</span>,
    <span class="hljs-string">&quot;vue-router&quot;</span>: <span class="hljs-string">&quot;^2.3.1&quot;</span>,
  },</code></pre><h2 id="articleHeader3">&#x670D;&#x52A1;&#x7AEF;&#x914D;&#x7F6E;</h2><p>&#x5728;&#x9879;&#x76EE;&#x6839;&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; service &#x6587;&#x4EF6;&#x5939;&#x3002;&#x7136;&#x540E;&#x521B;&#x5EFA;&#x4E0B;&#x9762;&#x56DB;&#x4E2A;&#x6587;&#x4EF6;&#xFF1A;<br>db/db.js --- &#x7528;&#x6765;&#x6DFB;&#x52A0; MySQL &#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    mysql: {
        host: &apos;localhost&apos;,
        user: &apos;root&apos;,
        password: &apos;&apos;,
        port: &apos;3306&apos;,
        database: &apos;login&apos;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>module.exports = {
    mysq<span class="hljs-variable">l:</span> {
        hos<span class="hljs-variable">t:</span> <span class="hljs-string">&apos;localhost&apos;</span>,
        user: <span class="hljs-string">&apos;root&apos;</span>,
        password: <span class="hljs-string">&apos;&apos;</span>,
        por<span class="hljs-variable">t:</span> <span class="hljs-string">&apos;3306&apos;</span>,
        database: <span class="hljs-string">&apos;login&apos;</span>
    }
}</code></pre><p>app.js --- Express&#x670D;&#x52A1;&#x5668;&#x5165;&#x53E3;&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const userApi = require(&apos;./api/userApi&apos;);
const fs = require(&apos;fs&apos;);
const path = require(&apos;path&apos;);
const bodyParser = require(&apos;body-parser&apos;);
const express = require(&apos;express&apos;);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

app.use(&apos;/api/user&apos;, userApi);

app.listen(3000);
console.log(&apos;success listen at port: 3000&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">const</span> userApi = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;./api/userApi&apos;</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> bodyParser = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;body-parser&apos;</span>);
<span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">const</span> app = express();

app.<span class="hljs-keyword">use</span>(bodyParser.json());
app.<span class="hljs-keyword">use</span>(bodyParser.urlencoded())

app.<span class="hljs-keyword">use</span>(<span class="hljs-string">&apos;/api/user&apos;</span>, userApi);

app.listen(<span class="hljs-number">3000</span>);
console.log(<span class="hljs-string">&apos;success listen at port: 3000&apos;</span>)</code></pre><p>db/sqlMap.js----SQL&#x8BED;&#x53E5;&#x6620;&#x5C04;&#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x662F;&#x5BF9;&#x6570;&#x636E;&#x5E93;&#x7684;&#x589E;&#x6539;&#x67E5;&#x64CD;&#x4F5C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sqlMap = {
    user: {
        add: &apos;insert into user (username, account, password, repeatPass, email, phone, card, birth, sex) values (?,?,?,?,?,?,?,?,?)&apos;,
        select_name: &apos;select * from user&apos;, 
        update_user: &apos;update user set&apos;
    }
}

module.exports = sqlMap;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs n1ql"><code>var sqlMap = {
    user: {
        add: &apos;<span class="hljs-keyword">insert</span> <span class="hljs-keyword">into</span> <span class="hljs-keyword">user</span> (username, account, <span class="hljs-keyword">password</span>, repeatPass, email, phone, card, birth, sex) <span class="hljs-keyword">values</span> (?,?,?,?,?,?,?,?,?)<span class="hljs-string">&apos;,
        select_name: &apos;</span><span class="hljs-keyword">select</span> * <span class="hljs-keyword">from</span> <span class="hljs-keyword">user</span><span class="hljs-string">&apos;, 
        update_user: &apos;</span><span class="hljs-keyword">update</span> <span class="hljs-keyword">user</span> <span class="hljs-keyword">set</span><span class="hljs-string">&apos;
    }
}

module.exports = sqlMap;</span></code></pre><p>&#x5176;&#x4E2D;&#x67E5;&#x8BE2;&#x8BED;&#x53E5;&#x4E00;&#x76F4;&#x6709;&#x95EE;&#x9898;</p><p><code>select_name: &apos;select * from user where username = ?&apos;,</code></p><p>node &#x4E00;&#x76F4;&#x62A5;&#x9519;&#xFF0C;&#x540E;&#x6765;&#xFF0C;&#x5C06; <code>where username = ?</code>&#x653E;&#x5728;api&#x4E2D;&#x62FC;&#x63A5;<br>&#x5177;&#x4F53;&#x89C1;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x6709;&#x66F4;&#x597D;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x4E5F;&#x8BF7;&#x591A;&#x6307;&#x6559;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.post(&apos;/login&apos;, (req, res) =&gt; {
    var sql_name = $sql.user.select_name;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    console.log(params);
    if (params.name) {
        sql_name += &quot;where username =&apos;&quot;+ params.name +&quot;&apos;&quot;;
    }
    var keywords = JSON.parse(Object.keys(params)[0]);
    conn.query(sql_name, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send(&apos;-1&apos;)   //&#x67E5;&#x8BE2;&#x4E0D;&#x51FA;username&#xFF0C;data &#x8FD4;&#x56DE;-1
        } else {
            var resultArray = result[0];
            console.log(resultArray.password);
           // console.log(keywords);
            if(resultArray.password === keywords.password) {
                jsonWrite(res, result);
            } else {
                res.send(&apos;0&apos;)   //username
            }
        }
    })
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>router.post(<span class="hljs-string">&apos;/login&apos;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> sql_name = $sql.user.select_name;
    <span class="hljs-comment">// var sql_password = $sql.user.select_password;</span>
    <span class="hljs-keyword">var</span> params = req.body;
    <span class="hljs-built_in">console</span>.log(params);
    <span class="hljs-keyword">if</span> (params.name) {
        sql_name += <span class="hljs-string">&quot;where username =&apos;&quot;</span>+ params.name +<span class="hljs-string">&quot;&apos;&quot;</span>;
    }
    <span class="hljs-keyword">var</span> keywords = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">Object</span>.keys(params)[<span class="hljs-number">0</span>]);
    conn.query(sql_name, params.name, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-built_in">console</span>.log(err);
        }
        <span class="hljs-comment">// console.log(result);</span>
        <span class="hljs-keyword">if</span> (result[<span class="hljs-number">0</span>] === <span class="hljs-literal">undefined</span>) {
            res.send(<span class="hljs-string">&apos;-1&apos;</span>)   <span class="hljs-comment">//&#x67E5;&#x8BE2;&#x4E0D;&#x51FA;username&#xFF0C;data &#x8FD4;&#x56DE;-1</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">var</span> resultArray = result[<span class="hljs-number">0</span>];
            <span class="hljs-built_in">console</span>.log(resultArray.password);
           <span class="hljs-comment">// console.log(keywords);</span>
            <span class="hljs-keyword">if</span>(resultArray.password === keywords.password) {
                jsonWrite(res, result);
            } <span class="hljs-keyword">else</span> {
                res.send(<span class="hljs-string">&apos;0&apos;</span>)   <span class="hljs-comment">//username</span>
            }
        }
    })
});</code></pre><p>api/userApi.js ---- &#x6D4B;&#x8BD5;&#x7528;api&#x793A;&#x4F8B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var models = require(&apos;../db/db&apos;);
var express = require(&apos;express&apos;);
var router = express.Router();
var mysql = require(&apos;mysql&apos;);
var $sql = require(&apos;../db/sqlMap&apos;);

var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
    if(typeof ret === &apos;undefined&apos;) {
        res.send(&apos;err&apos;);
    } else {
        console.log(ret);
        res.send(ret);
    }
}

var dateStr = function(str) {
    return new Date(str.slice(0,7));
}

// &#x589E;&#x52A0;&#x7528;&#x6237;&#x63A5;&#x53E3;
router.post(&apos;/addUser&apos;, (req, res) =&gt; {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    console.log(params.birth);
    conn.query(sql, [params.name, params.account, params.pass, params.checkPass,
                    params.email, params.phone, params.card, dateStr(params.birth), params.sex], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//&#x67E5;&#x627E;&#x7528;&#x6237;&#x63A5;&#x53E3;
router.post(&apos;/login&apos;, (req, res) =&gt; {
    var sql_name = $sql.user.select_name;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    console.log(params);
    if (params.name) {
        sql_name += &quot;where username =&apos;&quot;+ params.name +&quot;&apos;&quot;;
    }
    var keywords = JSON.parse(Object.keys(params)[0]);
    conn.query(sql_name, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send(&apos;-1&apos;)   //&#x67E5;&#x8BE2;&#x4E0D;&#x51FA;username&#xFF0C;data &#x8FD4;&#x56DE;-1
        } else {
            var resultArray = result[0];
            console.log(resultArray.password);
           // console.log(keywords);
            if(resultArray.password === keywords.password) {
                jsonWrite(res, result);
            } else {
                res.send(&apos;0&apos;)   //username
            }
        }
    })
});

//&#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;
router.get(&apos;/getUser&apos;, (req, res) =&gt; {
    var sql_name = $sql.user.select_name;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    console.log(params);
    if (params.name) {
        sql_name += &quot;where username =&apos;&quot;+ params.name +&quot;&apos;&quot;;
    }
    conn.query(sql_name, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send(&apos;-1&apos;)   //&#x67E5;&#x8BE2;&#x4E0D;&#x51FA;username&#xFF0C;data &#x8FD4;&#x56DE;-1
        } else {
            jsonWrite(res, result);
        }
    })
});

//&#x66F4;&#x65B0;&#x7528;&#x6237;&#x4FE1;&#x606F;
router.post(&apos;/updateUser&apos;, (req, res) =&gt; {
    var sql_update = $sql.user.update_user;
    var params = req.body;
    console.log(params);
    if (params.id) {
        sql_update  += &quot; email = &apos;&quot; + params.email +
                        &quot;&apos;,phone = &apos;&quot; + params.phone +
                        &quot;&apos;,card = &apos;&quot; + params.card +
                        &quot;&apos;,birth = &apos;&quot; + params.birth +
                        &quot;&apos;,sex = &apos;&quot; + params.sex +
                        &quot;&apos; where id =&apos;&quot;+ params.id + &quot;&apos;&quot;;
    }    
    conn.query(sql_update, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result.affectedRows === undefined) {
            res.send(&apos;&#x66F4;&#x65B0;&#x5931;&#x8D25;&#xFF0C;&#x8BF7;&#x8054;&#x7CFB;&#x7BA1;&#x7406;&#x5458;&apos;)   //&#x67E5;&#x8BE2;&#x4E0D;&#x51FA;username&#xFF0C;data &#x8FD4;&#x56DE;-1
        } else {
            res.send(&apos;ok&apos;); 
        }
    })
});

//&#x66F4;&#x6539;&#x5BC6;&#x7801;
router.post(&apos;/modifyPassword&apos;, (req, res) =&gt; {
    var sql_modify = $sql.user.update_user;
    var params = req.body;
    console.log(params);
    if (params.id) {
        sql_modify +=  &quot; password = &apos;&quot; + params.pass +
                        &quot;&apos;,repeatPass = &apos;&quot; + params.checkPass +
                        &quot;&apos; where id =&apos;&quot;+ params.id + &quot;&apos;&quot;;
    }
    conn.query(sql_modify, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result.affectedRows === undefined) {
            res.send(&apos;&#x4FEE;&#x6539;&#x5BC6;&#x7801;&#x5931;&#x8D25;&#xFF0C;&#x8BF7;&#x8054;&#x7CFB;&#x7BA1;&#x7406;&#x5458;&apos;)   //&#x67E5;&#x8BE2;&#x4E0D;&#x51FA;username&#xFF0C;data &#x8FD4;&#x56DE;-1
        } else {
            res.send(&apos;ok&apos;); 
        }
    })
});


module.exports = router;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> models = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../db/db&apos;</span>);
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">var</span> router = express.Router();
<span class="hljs-keyword">var</span> mysql = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;mysql&apos;</span>);
<span class="hljs-keyword">var</span> $sql = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../db/sqlMap&apos;</span>);

<span class="hljs-keyword">var</span> conn = mysql.createConnection(models.mysql);

conn.connect();

<span class="hljs-keyword">var</span> jsonWrite = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res, ret</span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> ret === <span class="hljs-string">&apos;undefined&apos;</span>) {
        res.send(<span class="hljs-string">&apos;err&apos;</span>);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(ret);
        res.send(ret);
    }
}

<span class="hljs-keyword">var</span> dateStr = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(str.slice(<span class="hljs-number">0</span>,<span class="hljs-number">7</span>));
}

<span class="hljs-comment">// &#x589E;&#x52A0;&#x7528;&#x6237;&#x63A5;&#x53E3;</span>
router.post(<span class="hljs-string">&apos;/addUser&apos;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> sql = $sql.user.add;
    <span class="hljs-keyword">var</span> params = req.body;
    <span class="hljs-built_in">console</span>.log(params);
    <span class="hljs-built_in">console</span>.log(params.birth);
    conn.query(sql, [params.name, params.account, params.pass, params.checkPass,
                    params.email, params.phone, params.card, dateStr(params.birth), params.sex], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-built_in">console</span>.log(err);
        }
        <span class="hljs-keyword">if</span> (result) {
            jsonWrite(res, result);
        }
    })
});

<span class="hljs-comment">//&#x67E5;&#x627E;&#x7528;&#x6237;&#x63A5;&#x53E3;</span>
router.post(<span class="hljs-string">&apos;/login&apos;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> sql_name = $sql.user.select_name;
    <span class="hljs-comment">// var sql_password = $sql.user.select_password;</span>
    <span class="hljs-keyword">var</span> params = req.body;
    <span class="hljs-built_in">console</span>.log(params);
    <span class="hljs-keyword">if</span> (params.name) {
        sql_name += <span class="hljs-string">&quot;where username =&apos;&quot;</span>+ params.name +<span class="hljs-string">&quot;&apos;&quot;</span>;
    }
    <span class="hljs-keyword">var</span> keywords = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">Object</span>.keys(params)[<span class="hljs-number">0</span>]);
    conn.query(sql_name, params.name, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-built_in">console</span>.log(err);
        }
        <span class="hljs-comment">// console.log(result);</span>
        <span class="hljs-keyword">if</span> (result[<span class="hljs-number">0</span>] === <span class="hljs-literal">undefined</span>) {
            res.send(<span class="hljs-string">&apos;-1&apos;</span>)   <span class="hljs-comment">//&#x67E5;&#x8BE2;&#x4E0D;&#x51FA;username&#xFF0C;data &#x8FD4;&#x56DE;-1</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">var</span> resultArray = result[<span class="hljs-number">0</span>];
            <span class="hljs-built_in">console</span>.log(resultArray.password);
           <span class="hljs-comment">// console.log(keywords);</span>
            <span class="hljs-keyword">if</span>(resultArray.password === keywords.password) {
                jsonWrite(res, result);
            } <span class="hljs-keyword">else</span> {
                res.send(<span class="hljs-string">&apos;0&apos;</span>)   <span class="hljs-comment">//username</span>
            }
        }
    })
});

<span class="hljs-comment">//&#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;</span>
router.get(<span class="hljs-string">&apos;/getUser&apos;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> sql_name = $sql.user.select_name;
    <span class="hljs-comment">// var sql_password = $sql.user.select_password;</span>
    <span class="hljs-keyword">var</span> params = req.body;
    <span class="hljs-built_in">console</span>.log(params);
    <span class="hljs-keyword">if</span> (params.name) {
        sql_name += <span class="hljs-string">&quot;where username =&apos;&quot;</span>+ params.name +<span class="hljs-string">&quot;&apos;&quot;</span>;
    }
    conn.query(sql_name, params.name, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-built_in">console</span>.log(err);
        }
        <span class="hljs-comment">// console.log(result);</span>
        <span class="hljs-keyword">if</span> (result[<span class="hljs-number">0</span>] === <span class="hljs-literal">undefined</span>) {
            res.send(<span class="hljs-string">&apos;-1&apos;</span>)   <span class="hljs-comment">//&#x67E5;&#x8BE2;&#x4E0D;&#x51FA;username&#xFF0C;data &#x8FD4;&#x56DE;-1</span>
        } <span class="hljs-keyword">else</span> {
            jsonWrite(res, result);
        }
    })
});

<span class="hljs-comment">//&#x66F4;&#x65B0;&#x7528;&#x6237;&#x4FE1;&#x606F;</span>
router.post(<span class="hljs-string">&apos;/updateUser&apos;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> sql_update = $sql.user.update_user;
    <span class="hljs-keyword">var</span> params = req.body;
    <span class="hljs-built_in">console</span>.log(params);
    <span class="hljs-keyword">if</span> (params.id) {
        sql_update  += <span class="hljs-string">&quot; email = &apos;&quot;</span> + params.email +
                        <span class="hljs-string">&quot;&apos;,phone = &apos;&quot;</span> + params.phone +
                        <span class="hljs-string">&quot;&apos;,card = &apos;&quot;</span> + params.card +
                        <span class="hljs-string">&quot;&apos;,birth = &apos;&quot;</span> + params.birth +
                        <span class="hljs-string">&quot;&apos;,sex = &apos;&quot;</span> + params.sex +
                        <span class="hljs-string">&quot;&apos; where id =&apos;&quot;</span>+ params.id + <span class="hljs-string">&quot;&apos;&quot;</span>;
    }    
    conn.query(sql_update, params.id, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-built_in">console</span>.log(err);
        }
        <span class="hljs-built_in">console</span>.log(result);
        <span class="hljs-keyword">if</span> (result.affectedRows === <span class="hljs-literal">undefined</span>) {
            res.send(<span class="hljs-string">&apos;&#x66F4;&#x65B0;&#x5931;&#x8D25;&#xFF0C;&#x8BF7;&#x8054;&#x7CFB;&#x7BA1;&#x7406;&#x5458;&apos;</span>)   <span class="hljs-comment">//&#x67E5;&#x8BE2;&#x4E0D;&#x51FA;username&#xFF0C;data &#x8FD4;&#x56DE;-1</span>
        } <span class="hljs-keyword">else</span> {
            res.send(<span class="hljs-string">&apos;ok&apos;</span>); 
        }
    })
});

<span class="hljs-comment">//&#x66F4;&#x6539;&#x5BC6;&#x7801;</span>
router.post(<span class="hljs-string">&apos;/modifyPassword&apos;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> sql_modify = $sql.user.update_user;
    <span class="hljs-keyword">var</span> params = req.body;
    <span class="hljs-built_in">console</span>.log(params);
    <span class="hljs-keyword">if</span> (params.id) {
        sql_modify +=  <span class="hljs-string">&quot; password = &apos;&quot;</span> + params.pass +
                        <span class="hljs-string">&quot;&apos;,repeatPass = &apos;&quot;</span> + params.checkPass +
                        <span class="hljs-string">&quot;&apos; where id =&apos;&quot;</span>+ params.id + <span class="hljs-string">&quot;&apos;&quot;</span>;
    }
    conn.query(sql_modify, params.id, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-built_in">console</span>.log(err);
        }
        <span class="hljs-comment">// console.log(result);</span>
        <span class="hljs-keyword">if</span> (result.affectedRows === <span class="hljs-literal">undefined</span>) {
            res.send(<span class="hljs-string">&apos;&#x4FEE;&#x6539;&#x5BC6;&#x7801;&#x5931;&#x8D25;&#xFF0C;&#x8BF7;&#x8054;&#x7CFB;&#x7BA1;&#x7406;&#x5458;&apos;</span>)   <span class="hljs-comment">//&#x67E5;&#x8BE2;&#x4E0D;&#x51FA;username&#xFF0C;data &#x8FD4;&#x56DE;-1</span>
        } <span class="hljs-keyword">else</span> {
            res.send(<span class="hljs-string">&apos;ok&apos;</span>); 
        }
    })
});


<span class="hljs-built_in">module</span>.exports = router;
</code></pre><p>&#x6B64;&#x65F6;&#x5728;service&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x6267;&#x884C;node app&#xFF08;&#x8FD9;&#x91CC;&#x4E5F;&#x53EF;&#x4EE5;&#x52A0;&#x8F7D;package.json&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x7528;npm&#x6267;&#x884C;&#xFF09;&#x770B;&#x5230;success listen at port:3000......&#x5373;&#x670D;&#x52A1;&#x7AEF;&#x542F;&#x52A8;&#x6210;&#x529F;&#x3002;</p><h2 id="articleHeader4">vue &#x767B;&#x5F55;&#x7EC4;&#x4EF6;</h2><p>&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x4ECB;&#x7ECD; &#x767B;&#x5F55;login.vue&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;div class=&quot;login-wrap&quot;&gt;
        &lt;div class=&quot;ms-title&quot;&gt;&#x767B;&#x5F55;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&lt;/div&gt;
        &lt;div class=&quot;ms-login&quot;&gt;
            &lt;el-form :model=&quot;ruleForm&quot; :rules=&quot;rules&quot; ref=&quot;ruleForm&quot; label-width=&quot;0px&quot; class=&quot;demo-ruleForm&quot;&gt;
                &lt;div v-if=&quot;errorInfo&quot;&gt;
                    &lt;span&gt;{{errInfo}}&lt;/span&gt;
                &lt;/div&gt;
                &lt;el-form-item prop=&quot;name&quot;&gt;
                    &lt;el-input v-model=&quot;ruleForm.name&quot; placeholder=&quot;&#x8D26;&#x53F7;&quot; &gt;&lt;/el-input&gt;
                &lt;/el-form-item&gt;
                &lt;el-form-item prop=&quot;password&quot;&gt;
                    &lt;el-input type=&quot;password&quot; placeholder=&quot;&#x5BC6;&#x7801;&quot; v-model=&quot;ruleForm.password&quot; @keyup.enter.native=&quot;submitForm(&apos;ruleForm&apos;)&quot;&gt;&lt;/el-input&gt;
                &lt;/el-form-item&gt;
                &lt;el-form-item  prop=&quot;validate&quot;&gt;
                    &lt;el-input v-model=&quot;ruleForm.validate&quot; class=&quot;validate-code&quot; placeholder=&quot;&#x9A8C;&#x8BC1;&#x7801;&quot; &gt;&lt;/el-input&gt;
                    &lt;div class=&quot;code&quot; @click=&quot;refreshCode&quot;&gt;
                        &lt;s-identify :identifyCode=&quot;identifyCode&quot;&gt;&lt;/s-identify&gt;
                    &lt;/div&gt;
                &lt;/el-form-item&gt;
                &lt;div class=&quot;login-btn&quot;&gt;
                    &lt;el-button type=&quot;primary&quot; @click=&quot;submitForm(&apos;ruleForm&apos;)&quot;&gt;&#x767B;&#x5F55;&lt;/el-button&gt;
                &lt;/div&gt;
                &lt;p style=&quot;font-size:14px;line-height:30px;color:#999;cursor: pointer;float:right;&quot; @click=&quot;handleCommand()&quot;&gt;&#x6CE8;&#x518C;&lt;/p&gt;  
            &lt;/el-form&gt;
        &lt;/div&gt;
    &lt;/div&gt;    
&lt;/template&gt;

&lt;script&gt;
    export default {
        name: &apos;login&apos;,
        data() {
            return {
                identifyCodes: &quot;1234567890&quot;,
                identifyCode: &quot;&quot;,
                errorInfo : false,
                ruleForm: {
                    name: &apos;&apos;,
                    password: &apos;&apos;,
                    validate: &apos;&apos;                    
                },
                rules: {
                    name: [
                        { required: true, message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&apos;, trigger: &apos;blur&apos; }
                    ],
                    password: [
                        { required: true, message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x5BC6;&#x7801;&apos;, trigger: &apos;blur&apos; }
                    ],
                    validate: [
                        { required: true, message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x9A8C;&#x8BC1;&#x7801;&apos;, trigger: &apos;blur&apos; }
                    ]
                }
            }
        },
        mounted() {
            this.identifyCode = &quot;&quot;;
            this.makeCode(this.identifyCodes, 4);
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) =&gt; {
                    if (valid) {
                        localStorage.setItem(&apos;ms_username&apos;,self.ruleForm.name);
                        localStorage.setItem(&apos;ms_user&apos;,JSON.stringify(self.ruleForm));
                        console.log(JSON.stringify(self.ruleForm));                        
                        self.$http.post(&apos;/api/user/login&apos;,JSON.stringify(self.ruleForm))
                        .then((response) =&gt; {
                            console.log(response);
                            if (response.data == -1) {
                                self.errorInfo = true;
                                self.errInfo = &apos;&#x8BE5;&#x7528;&#x6237;&#x4E0D;&#x5B58;&#x5728;&apos;;
                                console.log(&apos;&#x8BE5;&#x7528;&#x6237;&#x4E0D;&#x5B58;&#x5728;&apos;)
                            } else if (response.data == 0) {
                                console.log(&apos;&#x5BC6;&#x7801;&#x9519;&#x8BEF;&apos;)
                                self.errorInfo = true;
                                self.errInfo = &apos;&#x5BC6;&#x7801;&#x9519;&#x8BEF;&apos;;
                            } else if (response.status == 200) {
                                self.$router.push(&apos;/readme&apos;);
                            }                            
                        }).then((error) =&gt; {
                            console.log(error);
                        })
                    } else {
                        console.log(&apos;error submit!!&apos;);
                        return false;
                    }
                });
            },
            handleCommand() {
                this.$router.push(&apos;/register&apos;);
            },
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = &quot;&quot;;
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i &lt; l; i++) {
                    this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                    ];
                }
                console.log(this.identifyCode);
            }
        }
    }
&lt;/script&gt;

&lt;style scoped&gt;
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:240px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .ms-login span {
        color: red;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .code {
        width: 112px;
        height: 35px;
        border: 1px solid #ccc;
        float: right;
        border-radius: 2px;
    }
    .validate-code {
        width: 136px;
        float: left;
    }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;login-wrap&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ms-title&quot;</span>&gt;</span>&#x767B;&#x5F55;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ms-login&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-form</span> <span class="hljs-attr">:model</span>=<span class="hljs-string">&quot;ruleForm&quot;</span> <span class="hljs-attr">:rules</span>=<span class="hljs-string">&quot;rules&quot;</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;ruleForm&quot;</span> <span class="hljs-attr">label-width</span>=<span class="hljs-string">&quot;0px&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo-ruleForm&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;errorInfo&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"errInfo"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">&quot;name&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;ruleForm.name&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x8D26;&#x53F7;&quot;</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">&quot;password&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x5BC6;&#x7801;&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;ruleForm.password&quot;</span> @<span class="hljs-attr">keyup.enter.native</span>=<span class="hljs-string">&quot;submitForm(&apos;ruleForm&apos;)&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span>  <span class="hljs-attr">prop</span>=<span class="hljs-string">&quot;validate&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;ruleForm.validate&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;validate-code&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x9A8C;&#x8BC1;&#x7801;&quot;</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;code&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;refreshCode&quot;</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">s-identify</span> <span class="hljs-attr">:identifyCode</span>=<span class="hljs-string">&quot;identifyCode&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">s-identify</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;login-btn&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;primary&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;submitForm(&apos;ruleForm&apos;)&quot;</span>&gt;</span>&#x767B;&#x5F55;<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;font-size:14px;line-height:30px;color:#999;cursor: pointer;float:right;&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleCommand()&quot;</span>&gt;</span>&#x6CE8;&#x518C;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>  
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-form</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;login&apos;</span>,
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">identifyCodes</span>: <span class="hljs-string">&quot;1234567890&quot;</span>,
                <span class="hljs-attr">identifyCode</span>: <span class="hljs-string">&quot;&quot;</span>,
                <span class="hljs-attr">errorInfo</span> : <span class="hljs-literal">false</span>,
                <span class="hljs-attr">ruleForm</span>: {
                    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&apos;</span>,
                    <span class="hljs-attr">password</span>: <span class="hljs-string">&apos;&apos;</span>,
                    <span class="hljs-attr">validate</span>: <span class="hljs-string">&apos;&apos;</span>                    
                },
                <span class="hljs-attr">rules</span>: {
                    <span class="hljs-attr">name</span>: [
                        { <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&apos;</span>, <span class="hljs-attr">trigger</span>: <span class="hljs-string">&apos;blur&apos;</span> }
                    ],
                    <span class="hljs-attr">password</span>: [
                        { <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x5BC6;&#x7801;&apos;</span>, <span class="hljs-attr">trigger</span>: <span class="hljs-string">&apos;blur&apos;</span> }
                    ],
                    <span class="hljs-attr">validate</span>: [
                        { <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x9A8C;&#x8BC1;&#x7801;&apos;</span>, <span class="hljs-attr">trigger</span>: <span class="hljs-string">&apos;blur&apos;</span> }
                    ]
                }
            }
        },
        mounted() {
            <span class="hljs-keyword">this</span>.identifyCode = <span class="hljs-string">&quot;&quot;</span>;
            <span class="hljs-keyword">this</span>.makeCode(<span class="hljs-keyword">this</span>.identifyCodes, <span class="hljs-number">4</span>);
        },
        <span class="hljs-attr">methods</span>: {
            submitForm(formName) {
                <span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>;
                self.$refs[formName].validate(<span class="hljs-function">(<span class="hljs-params">valid</span>) =&gt;</span> {
                    <span class="hljs-keyword">if</span> (valid) {
                        localStorage.setItem(<span class="hljs-string">&apos;ms_username&apos;</span>,self.ruleForm.name);
                        localStorage.setItem(<span class="hljs-string">&apos;ms_user&apos;</span>,<span class="hljs-built_in">JSON</span>.stringify(self.ruleForm));
                        <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(self.ruleForm));                        
                        self.$http.post(<span class="hljs-string">&apos;/api/user/login&apos;</span>,<span class="hljs-built_in">JSON</span>.stringify(self.ruleForm))
                        .then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
                            <span class="hljs-built_in">console</span>.log(response);
                            <span class="hljs-keyword">if</span> (response.data == <span class="hljs-number">-1</span>) {
                                self.errorInfo = <span class="hljs-literal">true</span>;
                                self.errInfo = <span class="hljs-string">&apos;&#x8BE5;&#x7528;&#x6237;&#x4E0D;&#x5B58;&#x5728;&apos;</span>;
                                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8BE5;&#x7528;&#x6237;&#x4E0D;&#x5B58;&#x5728;&apos;</span>)
                            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (response.data == <span class="hljs-number">0</span>) {
                                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x5BC6;&#x7801;&#x9519;&#x8BEF;&apos;</span>)
                                self.errorInfo = <span class="hljs-literal">true</span>;
                                self.errInfo = <span class="hljs-string">&apos;&#x5BC6;&#x7801;&#x9519;&#x8BEF;&apos;</span>;
                            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (response.status == <span class="hljs-number">200</span>) {
                                self.$router.push(<span class="hljs-string">&apos;/readme&apos;</span>);
                            }                            
                        }).then(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
                            <span class="hljs-built_in">console</span>.log(error);
                        })
                    } <span class="hljs-keyword">else</span> {
                        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;error submit!!&apos;</span>);
                        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                    }
                });
            },
            handleCommand() {
                <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">&apos;/register&apos;</span>);
            },
            randomNum(min, max) {
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * (max - min) + min);
            },
            refreshCode() {
                <span class="hljs-keyword">this</span>.identifyCode = <span class="hljs-string">&quot;&quot;</span>;
                <span class="hljs-keyword">this</span>.makeCode(<span class="hljs-keyword">this</span>.identifyCodes, <span class="hljs-number">4</span>);
            },
            makeCode(o, l) {
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; l; i++) {
                    <span class="hljs-keyword">this</span>.identifyCode += <span class="hljs-keyword">this</span>.identifyCodes[
                    <span class="hljs-keyword">this</span>.randomNum(<span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.identifyCodes.length)
                    ];
                }
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.identifyCode);
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.login-wrap</span>{
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
    }
    <span class="hljs-selector-class">.ms-title</span>{
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">230px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font-size</span>:<span class="hljs-number">30px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;

    }
    <span class="hljs-selector-class">.ms-login</span>{
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">240px</span>;
        <span class="hljs-attribute">margin</span>:-<span class="hljs-number">150px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">190px</span>;
        <span class="hljs-attribute">padding</span>:<span class="hljs-number">40px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    }
    <span class="hljs-selector-class">.ms-login</span> <span class="hljs-selector-tag">span</span> {
        <span class="hljs-attribute">color</span>: red;
    }
    <span class="hljs-selector-class">.login-btn</span>{
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-class">.login-btn</span> <span class="hljs-selector-tag">button</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">36px</span>;
    }
    <span class="hljs-selector-class">.code</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">112px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">float</span>: right;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2px</span>;
    }
    <span class="hljs-selector-class">.validate-code</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">136px</span>;
        <span class="hljs-attribute">float</span>: left;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre><h2 id="articleHeader5">&#x8BBE;&#x7F6E;&#x4EE3;&#x7406;&#x4E0E;&#x8DE8;&#x57DF;</h2><p>&#x6267;&#x884C;&#x5B8C;&#x4E0A;&#x8FF0;3&#x6B65;&#x4E4B;&#x540E;&#xFF0C;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x6267;&#x884C; <code>npm run dev</code>&#xFF0C;&#xFF0C;&#x7136;&#x540E;&#x8F93;&#x5165;&#x4E00;&#x7EC4;&#x6570;&#x636E;&#xFF0C;&#x70B9;&#x51FB;&#x4FDD;&#x5B58;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x4F1A;&#x62A5;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#xFF1A;vue-resource.common.js?e289:1071 POST <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8082/api/user/login 404 (Not Found).<br>&#x8FD9;&#x662F;&#x7531;&#x4E8E;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;8082&#x7AEF;&#x53E3;&#xFF0C;&#x662F;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x4E00;&#x4E0B;&#x4EE3;&#x7406;&#x8F6C;&#x53D1;&#x6620;&#x5C04;.</p><p>vue-cli&#x7684;config&#x6587;&#x4EF6;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;proxyTable&#x53C2;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x5730;&#x5740;&#x6620;&#x5C04;&#x8868;&#xFF0C;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x5230;&#x5F00;&#x53D1;&#x65F6;&#x914D;&#x7F6E;&#xFF08;dev&#xFF09;&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dev: {
    // ...
    proxyTable: {
        &apos;/api&apos;: {
            target: &apos;http://127.0.0.1:3000/api/&apos;,
            changeOrigin: true,
            pathRewrite: {
                &apos;^/api&apos;: &apos;&apos;
            }
        }
    },
    // ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-attribute">dev</span>: {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-attribute">proxyTable</span>: {
        <span class="hljs-string">&apos;/api&apos;</span>: {
            <span class="hljs-attribute">target</span>: <span class="hljs-string">&apos;http://127.0.0.1:3000/api/&apos;</span>,
            <span class="hljs-attribute">changeOrigin</span>: true,
            <span class="hljs-attribute">pathRewrite</span>: {
                <span class="hljs-string">&apos;^/api&apos;</span>: <span class="hljs-string">&apos;&apos;</span>
            }
        }
    },
    <span class="hljs-comment">// ...</span>
}</code></pre><p>&#x5373;&#x8BF7;&#x6C42;/api&#x65F6;&#x5C31;&#x4EE3;&#x8868;<a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:3000/api/(&#x8FD9;&#x91CC;&#x8981;&#x5199;ip&#xFF0C;&#x4E0D;&#x8981;&#x5199;localhost)&#xFF0C;<br>changeOrigin&#x53C2;&#x6570;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x4E3A;true&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x4E0D;&#x4F1A;&#x6709;&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#x4E86;&#x3002;</p><p>&#x9879;&#x76EE;&#x4E2D;&#x8981;&#x6C42;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x63D0;&#x4EA4;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;&#x9632;&#x6296;&#x64CD;&#x4F5C;&#xFF1A;<br>&#x5177;&#x4F53;&#x8BF7;&#x79FB;&#x6B65;<a href="https://github.com/sakila1012/blog/issues/17" rel="nofollow noreferrer" target="_blank">&#x8282;&#x6D41;&#x548C;&#x9632;&#x6296;</a></p><h2 id="articleHeader6">&#x9879;&#x76EE;&#x8FD0;&#x884C;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x672C;&#x5730;&#x5F00;&#x53D1;
//&#x5F00;&#x542F;&#x524D;&#x7AEF;&#x670D;&#x52A1;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x8BBF;&#x95EE; http://localhost:8082
npm run dev
//&#x5F00;&#x542F;&#x540E;&#x7AEF;&#x670D;&#x52A1;
cd service
node app" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-comment">//&#x672C;&#x5730;&#x5F00;&#x53D1;</span>
<span class="hljs-comment">//&#x5F00;&#x542F;&#x524D;&#x7AEF;&#x670D;&#x52A1;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x8BBF;&#x95EE; http://localhost:8082</span>
npm <span class="hljs-keyword">run</span> dev
<span class="hljs-comment">//&#x5F00;&#x542F;&#x540E;&#x7AEF;&#x670D;&#x52A1;</span>
<span class="hljs-keyword">cd</span> service
node <span class="hljs-keyword">app</span></code></pre><p>&#x4E00;&#x6574;&#x5929;&#x52A0;&#x4E00;&#x4E2A;&#x4E0B;&#x5348;&#xFF0C;&#x7EC8;&#x4E8E;&#x8C03;&#x901A;&#x4E86;&#xFF0C;&#x5728;&#x6570;&#x636E;&#x5E93;&#x90A3;&#x8FB9;&#x9047;&#x5230;&#x4E86;&#x597D;&#x591A;&#x95EE;&#x9898;&#xFF0C;&#x4E0D;&#x8FC7;&#x7ECF;&#x8FC7;&#x4E0D;&#x65AD;&#x7684;&#x5C1D;&#x8BD5;&#x7EC8;&#x4E8E;&#x89E3;&#x51B3;&#x4E86;&#x3002;</p><p>&#x6548;&#x679C;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/bV72ft?w=889&amp;h=576" src="https://static.alili.tech/img/bV72ft?w=889&amp;h=576" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bV72fw?w=1340&amp;h=637" src="https://static.alili.tech/img/bV72fw?w=1340&amp;h=637" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bV72fA?w=1345&amp;h=380" src="https://static.alili.tech/img/bV72fA?w=1345&amp;h=380" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><a href="https://github.com/sakila1012/vue-login-manage-system" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;</a>&#x4E0D;&#x5F53;&#x4E4B;&#x5904;&#xFF0C;&#x8FD8;&#x8BF7;&#x6307;&#x6B63;&#xFF0C;&#x6B22;&#x8FCE; star</p><p>&#x53C2;&#x8003;&#x4E86;&#x4EE5;&#x4E0B;<a href="https://github.com/lin-xin/vue-manage-system" rel="nofollow noreferrer" target="_blank">vue-manage-system</a>&#xFF0C;<a href="https://segmentfault.com/a/1190000008176208#articleHeader1">&#x6D77;&#x5C9B;&#x5FC3;hey</a>&#xFF0C;<a href="https://segmentfault.com/a/1190000011288053" target="_blank">&#x7F57;&#x5764;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js+Mysql+Vue+ElementUI 实现登录注册注销功能

## 原文链接
[https://segmentfault.com/a/1190000014268935](https://segmentfault.com/a/1190000014268935)


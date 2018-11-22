---
title: 'vue+express 构建后台管理系统' 
date: 2018-11-22 11:48:10
hidden: true
slug: ozeyvuceykp
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x4E00;&#x4E2A;vue+express &#x6784;&#x5EFA;&#x7684;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;</h1><h3 id="articleHeader1">&#x8BF4;&#x660E;&#xFF1A;</h3><h4>vue+express &#x6784;&#x5EFA;&#x7684;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;,&#x5305;&#x62EC;&#x767B;&#x5F55;&#x3001;&#x6CE8;&#x518C;&#x3001;&#x8868;&#x683C;&#x7684;&#x589E;&#x5220;&#x6539;&#x67E5;</h4><p><a href="https://github.com/xuyanming/vue-express" rel="nofollow noreferrer" target="_blank">github</a> <a href="http://59.110.164.162" rel="nofollow noreferrer" target="_blank">&#x5728;&#x7EBF;</a></p><h5>1.&#x4FEE;&#x590D;mysql&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;</h5><h3 id="articleHeader2">&#x642D;&#x5EFA;vue&#x9879;&#x76EE;&#xFF1A;</h3><h5>1.&#x5B89;&#x88C5;vue-cli&#x811A;&#x624B;&#x67B6;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs avrasm"><code>npm install -g vue-<span class="hljs-keyword">cli</span>
</code></pre><h5>2.&#x521B;&#x5EFA;&#x57FA;&#x4E8E;webpack&#x6A21;&#x7248;&#x7684;&#x9879;&#x76EE;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack my-express
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>vue init webpack <span class="hljs-keyword">my</span>-express
</code></pre><h5>3.&#x5B89;&#x88C5;&#x5305;&#x4F9D;&#x8D56;&#x5E76;&#x8FD0;&#x884C;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd my-express
npm install
npm run dev
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>cd my-express
npm install
npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span></code></pre><blockquote>vue&#x9879;&#x76EE;&#x57FA;&#x4E8E;iview-admin&#x6539;&#x9020;&#x7684;</blockquote><h3 id="articleHeader3">&#x901A;&#x8FC7;&#x5E94;&#x7528;&#x751F;&#x6210;&#x5668;&#x5DE5;&#x5177; express&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5E94;&#x7528;&#x7684;&#x9AA8;&#x67B6;&#xFF1A;</h3><h5>1.&#x8FDE;&#x63A5;&#x6570;&#x636E;&#x5E93;</h5><blockquote>&#x5728;config&#x521B;&#x5EFA;db.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mysql = require(&quot;mysql&quot;);
var connection = mysql.createConnection({
    host:&quot;&quot;,
    port: 3306,
    user:&quot;root&quot;,
    password:&quot;&quot;,
    database:&quot;&quot;,
    useConnectionPooling: true
});

function query(sql,data,callback){
    // connection.connect()
    // pool.getConnection(function(err,connection){
        connection.query(sql,data,function (err,rows) {
            callback(err,rows);
            // connection.release();
            // connection.end()  
        });
    // });
}

exports.query = query;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> mysql = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;mysql&quot;</span>);
<span class="hljs-keyword">var</span> connection = mysql.createConnection({
    <span class="hljs-attr">host</span>:<span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-attr">port</span>: <span class="hljs-number">3306</span>,
    <span class="hljs-attr">user</span>:<span class="hljs-string">&quot;root&quot;</span>,
    <span class="hljs-attr">password</span>:<span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-attr">database</span>:<span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-attr">useConnectionPooling</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">query</span>(<span class="hljs-params">sql,data,callback</span>)</span>{
    <span class="hljs-comment">// connection.connect()</span>
    <span class="hljs-comment">// pool.getConnection(function(err,connection){</span>
        connection.query(sql,data,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err,rows</span>) </span>{
            callback(err,rows);
            <span class="hljs-comment">// connection.release();</span>
            <span class="hljs-comment">// connection.end()  </span>
        });
    <span class="hljs-comment">// });</span>
}

exports.query = query;</code></pre><blockquote>&#x5728;routers&#x8DEF;&#x7531;&#x6587;&#x4EF6;&#x4E0B;&#x5F15;&#x5165;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&apos;express&apos;);
var router = express.Router();
var db = require(&quot;../config/db&quot;);
const jwt = require(&apos;jsonwebtoken&apos;)
const token = require(&quot;../config/token&quot;)
var data={data:&apos;&apos;,meta:{code:&apos;200&apos;,message:&apos;&apos;"}}"
/* GET users listing. */
router.post(&apos;/add&apos;, function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    db.query(&quot;SELECT username FROM users where username=(?)&quot;,[username],function(err,rows){
        console.log(err,rows)
        if(rows.length&gt;0){
            data={data:&apos;&apos;,meta:{code:&apos;500&apos;,message:&apos;&#x7528;&#x6237;&#x540D;&#x5B58;&#x5728;&apos;"}}"
            res.send(data)
        }else{
            db.query(&quot;INSERT INTO `users` (`username`,`password`) VALUES (?,?)&quot;,[username,password],function(err,rows){
                data={data:&apos;&apos;,meta:{code:&apos;200&apos;,message:&apos;&#x6CE8;&#x518C;&#x6210;&#x529F;&apos;"}}"
                res.send(data)
            });   
        }
    });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">var</span> router = express.Router();
<span class="hljs-keyword">var</span> db = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;../config/db&quot;</span>);
<span class="hljs-keyword">const</span> jwt = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;jsonwebtoken&apos;</span>)
<span class="hljs-keyword">const</span> token = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;../config/token&quot;</span>)
<span class="hljs-keyword">var</span> data={<span class="hljs-attr">data</span>:<span class="hljs-string">&apos;&apos;</span>,<span class="hljs-attr">meta</span>:{<span class="hljs-attr">code</span>:<span class="hljs-string">&apos;200&apos;</span>,<span class="hljs-attr">message</span>:<span class="hljs-string">&apos;&apos;</span>"}}"
<span class="hljs-comment">/* GET users listing. */</span>
router.post(<span class="hljs-string">&apos;/add&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-keyword">let</span> username = req.body.username;
    <span class="hljs-keyword">let</span> password = req.body.password;
    db.query(<span class="hljs-string">&quot;SELECT username FROM users where username=(?)&quot;</span>,[username],<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,rows</span>)</span>{
        <span class="hljs-built_in">console</span>.log(err,rows)
        <span class="hljs-keyword">if</span>(rows.length&gt;<span class="hljs-number">0</span>){
            data={<span class="hljs-attr">data</span>:<span class="hljs-string">&apos;&apos;</span>,<span class="hljs-attr">meta</span>:{<span class="hljs-attr">code</span>:<span class="hljs-string">&apos;500&apos;</span>,<span class="hljs-attr">message</span>:<span class="hljs-string">&apos;&#x7528;&#x6237;&#x540D;&#x5B58;&#x5728;&apos;</span>"}}"
            res.send(data)
        }<span class="hljs-keyword">else</span>{
            db.query(<span class="hljs-string">&quot;INSERT INTO `users` (`username`,`password`) VALUES (?,?)&quot;</span>,[username,password],<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,rows</span>)</span>{
                data={<span class="hljs-attr">data</span>:<span class="hljs-string">&apos;&apos;</span>,<span class="hljs-attr">meta</span>:{<span class="hljs-attr">code</span>:<span class="hljs-string">&apos;200&apos;</span>,<span class="hljs-attr">message</span>:<span class="hljs-string">&apos;&#x6CE8;&#x518C;&#x6210;&#x529F;&apos;</span>"}}"
                res.send(data)
            });   
        }
    });
});</code></pre><h5>2.&#x52A0;&#x5165;token&#x9A8C;&#x8BC1;</h5><blockquote>&#x5B89;&#x88C5;jsonwebtoken</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install jsonwebtoken" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> jsonwebtoken</code></pre><blockquote>&#x5728;config&#x521B;&#x5EFA;token.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const crypto = require(&apos;jsonwebtoken&apos;)
const secret = &quot;JWT-TOKEN&quot;
const token={
    createToken:function(obj,timeout){
        // Token &#x6570;&#x636E;
        let payload = {
            name: obj.username,
            admin: true
        };
        // &#x5BC6;&#x94A5;
        
        // &#x7B7E;&#x53D1; Token
        let tokens = crypto.sign(payload, secret, { expiresIn: 3600})
        return  tokens;
    },
    decodeToken:function(tokens){
        console.log(tokens)
        let res = false;
        crypto.verify(tokens, secret , function(err,decoded) {
            if(err){
                res = {&apos;flag&apos;:false,&apos;decoded&apos;:decoded}
            }else{
                res = {&apos;flag&apos;:true,&apos;decoded&apos;:decoded}
            }
            })
        return res;
    },
    checkToken:function(token){
        var resDecode=this.decodeToken(token);
        if(!resDecode){
            return false;
        }
        //&#x662F;&#x5426;&#x8FC7;&#x671F;
        var expState=(parseInt(Date.now()/1000)-parseInt(resDecode.payload.created))&gt;parseInt(resDecode.payload.exp)?false:true;
        if(resDecode.signature===resDecode.checkSignature&amp;&amp;expState){
            return true;
        }
        return false;
    }
};
module.exports=exports=token;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;jsonwebtoken&apos;</span>)
<span class="hljs-keyword">const</span> secret = <span class="hljs-string">&quot;JWT-TOKEN&quot;</span>
<span class="hljs-keyword">const</span> token={
    <span class="hljs-attr">createToken</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj,timeout</span>)</span>{
        <span class="hljs-comment">// Token &#x6570;&#x636E;</span>
        <span class="hljs-keyword">let</span> payload = {
            <span class="hljs-attr">name</span>: obj.username,
            <span class="hljs-attr">admin</span>: <span class="hljs-literal">true</span>
        };
        <span class="hljs-comment">// &#x5BC6;&#x94A5;</span>
        
        <span class="hljs-comment">// &#x7B7E;&#x53D1; Token</span>
        <span class="hljs-keyword">let</span> tokens = crypto.sign(payload, secret, { <span class="hljs-attr">expiresIn</span>: <span class="hljs-number">3600</span>})
        <span class="hljs-keyword">return</span>  tokens;
    },
    <span class="hljs-attr">decodeToken</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tokens</span>)</span>{
        <span class="hljs-built_in">console</span>.log(tokens)
        <span class="hljs-keyword">let</span> res = <span class="hljs-literal">false</span>;
        crypto.verify(tokens, secret , <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,decoded</span>) </span>{
            <span class="hljs-keyword">if</span>(err){
                res = {<span class="hljs-string">&apos;flag&apos;</span>:<span class="hljs-literal">false</span>,<span class="hljs-string">&apos;decoded&apos;</span>:decoded}
            }<span class="hljs-keyword">else</span>{
                res = {<span class="hljs-string">&apos;flag&apos;</span>:<span class="hljs-literal">true</span>,<span class="hljs-string">&apos;decoded&apos;</span>:decoded}
            }
            })
        <span class="hljs-keyword">return</span> res;
    },
    <span class="hljs-attr">checkToken</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">token</span>)</span>{
        <span class="hljs-keyword">var</span> resDecode=<span class="hljs-keyword">this</span>.decodeToken(token);
        <span class="hljs-keyword">if</span>(!resDecode){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
        <span class="hljs-comment">//&#x662F;&#x5426;&#x8FC7;&#x671F;</span>
        <span class="hljs-keyword">var</span> expState=(<span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Date</span>.now()/<span class="hljs-number">1000</span>)-<span class="hljs-built_in">parseInt</span>(resDecode.payload.created))&gt;<span class="hljs-built_in">parseInt</span>(resDecode.payload.exp)?<span class="hljs-literal">false</span>:<span class="hljs-literal">true</span>;
        <span class="hljs-keyword">if</span>(resDecode.signature===resDecode.checkSignature&amp;&amp;expState){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
};
<span class="hljs-built_in">module</span>.exports=exports=token;</code></pre><blockquote>&#x5728;app.js&#x9A8C;&#x8BC1;token&#x662F;&#x5426;&#x8FC7;&#x671F;&#xFF0C;&#x8FC7;&#x53BB;&#x8FD4;&#x56DE;401</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.all(&apos;*&apos;, function(req, res, next) {
    res.header(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;);
    res.header(&apos;Access-Control-Allow-Methods&apos;, &apos;PUT, GET, POST, DELETE, OPTIONS&apos;);
    res.header(&quot;Access-Control-Allow-Headers&quot;, &quot;Content-Type, access_token, X-Requested-With&quot;)
    // res.header(&quot;Content-Type&quot;, &quot;application/json;charset=utf-8&quot;);
    console.log(req.originalUrl,&apos;11111&apos;)
    if(rouetpass.indexOf(req.originalUrl) &gt; -1 || req.originalUrl.split(&apos;/&apos;).indexOf(&apos;static&apos;) &gt; -1){

        next()
    }else{
        if (req.method != &quot;OPTIONS&quot;){
            var accesstoken = req.headers[&apos;access_token&apos;];
            let datatoken = token.decodeToken(accesstoken)
            // console.log(data)
            if(datatoken.flag){
                next()
            }else{
                data.meta.code=401;
                res.send(data) 
            }
        }else{
            next()
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code>app.all(<span class="hljs-string">&apos;*&apos;</span>, function(req, res, <span class="hljs-keyword">next</span>) {
    res.header(<span class="hljs-string">&quot;Access-Control-Allow-Origin&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>)<span class="hljs-comment">;</span>
    res.header(<span class="hljs-string">&apos;Access-Control-Allow-Methods&apos;</span>, <span class="hljs-string">&apos;PUT, GET, POST, DELETE, OPTIONS&apos;</span>)<span class="hljs-comment">;</span>
    res.header(<span class="hljs-string">&quot;Access-Control-Allow-Headers&quot;</span>, <span class="hljs-string">&quot;Content-Type, access_token, X-Requested-With&quot;</span>)
    // res.header(<span class="hljs-string">&quot;Content-Type&quot;</span>, <span class="hljs-string">&quot;application/json;charset=utf-8&quot;</span>)<span class="hljs-comment">;</span>
    console.<span class="hljs-built_in">log</span>(req.originalUrl,<span class="hljs-string">&apos;11111&apos;</span>)
    <span class="hljs-keyword">if</span>(rouetpass.indexOf(req.originalUrl) &gt; <span class="hljs-number">-1</span> || req.originalUrl.split(<span class="hljs-string">&apos;/&apos;</span>).indexOf(<span class="hljs-string">&apos;static&apos;</span>) &gt; <span class="hljs-number">-1</span>){

        <span class="hljs-keyword">next</span>()
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">if</span> (req.method != <span class="hljs-string">&quot;OPTIONS&quot;</span>){
            var accesstoken = req.headers[<span class="hljs-string">&apos;access_token&apos;</span>]<span class="hljs-comment">;</span>
            let datatoken = token.decodeToken(accesstoken)
            // console.<span class="hljs-built_in">log</span>(data)
            <span class="hljs-keyword">if</span>(datatoken.flag){
                <span class="hljs-keyword">next</span>()
            }<span class="hljs-keyword">else</span>{
                data.meta.code=<span class="hljs-number">401</span><span class="hljs-comment">;</span>
                res.<span class="hljs-built_in">send</span>(data) 
            }
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">next</span>()
        }
    }
})<span class="hljs-comment">;</span></code></pre><h3 id="articleHeader4">&#x9879;&#x76EE;&#x90E8;&#x7F72;&#xFF1A;</h3><h5>1.&#x5C06;vue&#x9879;&#x76EE;&#x6253;&#x5305;&#x540E;&#x653E;&#x5728;express&#x9879;&#x76EE;public&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#xFF0C;&#x901A;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000&#x5373;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x3002;</h5><h5>2.&#x90E8;&#x7F72;&#x963F;&#x91CC;&#x4E91;</h5><blockquote>&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;</blockquote><p><span class="img-wrap"><img data-src="/img/bVbdXLn?w=1687&amp;h=225" src="https://static.alili.tech/img/bVbdXLn?w=1687&amp;h=225" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><blockquote>&#x6DFB;&#x52A0;&#x5B89;&#x5168;&#x7EC4;&#x5141;&#x8BB8;3000&#x7AEF;&#x53E3;</blockquote><p><span class="img-wrap"><img data-src="/img/bVbdXMp?w=1673&amp;h=153" src="https://static.alili.tech/img/bVbdXMp?w=1673&amp;h=153" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><blockquote>&#x4F7F;&#x7528;putty&#x8FDE;&#x63A5;linux&#x670D;&#x52A1;&#x5668;,&#x5C06;express&#x9879;&#x76EE;&#x538B;&#x7F29;&#x4E0A;&#x4F20;</blockquote><h3 id="articleHeader5">&#x6CE8;&#xFF1A;&#x8868;&#x8FF0;&#x80FD;&#x529B;&#x6709;&#x9650;&#x5982;&#x679C;&#x6709;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#x6216;&#x63A2;&#x8BA8;&#x53EF;&#x4EE5;&#x52A0;qq:1726861462</h3><h4>&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x52B3;&#x9A7E;&#x7ED9;&#x4E2A;star <a href="https://github.com/xuyanming/vue-express" rel="nofollow noreferrer" target="_blank">github</a></h4>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+express 构建后台管理系统

## 原文链接
[https://segmentfault.com/a/1190000015688992](https://segmentfault.com/a/1190000015688992)


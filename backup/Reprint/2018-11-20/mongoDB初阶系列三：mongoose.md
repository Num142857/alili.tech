---
title: 'mongoDB初阶系列三：mongoose' 
date: 2018-11-20 2:30:10
hidden: true
slug: 0l96f4w8wvp
categories: [reprint]
---

{{< raw >}}
<h2>&#x524D;&#x8A00;</h2><p>&#x4E0A;&#x7BC7; <a href="https://segmentfault.com/a/1190000015783314">mongoDB&#x521D;&#x9636;&#x7CFB;&#x5217;&#x4E8C;&#xFF1A;node&#x4E2D;&#x7684;&#x589E;&#x5220;&#x6539;&#x67E5;</a> &#x4E2D;&#x8BB2;&#x89E3;&#x4E86;&#x7528;node&#x9A71;&#x52A8;&#x6765;&#x5BF9;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x589E;&#x5220;&#x6539;&#x67E5;&#xFF0C;&#x672C;&#x7BC7;&#x5C06;&#x7EE7;&#x7EED;&#x524D;&#x8FDB;&#xFF0C;&#x4F9D;&#x65E7;&#x901A;&#x8FC7;&#x589E;&#x5220;&#x6539;&#x67E5;&#x6765;&#x8BB2;&#x89E3;&#x5982;&#x4F55;&#x7528;mongoose&#x66F4;&#x987A;&#x7545;&#x7684;&#x64CD;&#x63A7;MongoDB&#x3002;</p><h2>&#x4EC0;&#x4E48;&#x662F;Mongoose</h2><p>Mongoose&#x662F;&#x4E00;&#x4E2A;Node&#x6A21;&#x5757;&#x3002;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x66F4;&#x9AD8;&#x6548;&#x7684;&#x5728;node&#x4E2D;&#x64CD;&#x4F5C;mongoDB&#x7684;&#x65B9;&#x6848;&#x3002;&#x5B83;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x5230;MongoDB&#x96C6;&#x5408;&#x7684;&#x63A5;&#x53E3;&#xFF0C;&#x4EE5;&#x53CA;&#x4E00;&#x4E9B;&#x5B9E;&#x7528;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x6BD4;&#x5982;schema&#x5C42;&#x6B21;&#x7ED3;&#x6784;&#xFF0C;&#x4E2D;&#x95F4;&#x4EF6;&#x4EE5;&#x53CA;&#x6570;&#x636E;&#x6821;&#x9A8C;&#x3002;</p><h2>schema&#x5B9A;&#x4E49;</h2><p>&#x9996;&#x5148;&#xFF0C;&#x9700;&#x8981;&#x5B89;&#x88C5;mongoose&#xFF0C;&#x5B89;&#x88C5;mongoose&#x7684;&#x547D;&#x4EE4;&#x5982;&#x4E0B;&#xFF1A;<code>npm install mongoose</code>&#xFF0C;&#x540C;&#x65F6;&#xFF0C;&#x8BB0;&#x5F97;&#x5F00;&#x542F;mongoDB&#x670D;&#x52A1;&#x3002;</p><p>&#x5728;Mongoose&#x4E2D;&#xFF0C;&#x4E00;&#x5207;&#x90FD;&#x88AB;Schema&#x6240;&#x9A71;&#x52A8;&#x3002;&#x5728;&#x4E0B;&#x9762;&#x7A0B;&#x5E8F;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;Tasks&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#xFF0C;&#x8FD9;&#x4E2A;Tasks&#x5BF9;&#x5E94;&#x5728;mongoDB&#x4E2D;&#x662F;&#x4E00;&#x4E2A;tasks&#x96C6;&#x5408;&#x3002;&#x8BE5;&#x96C6;&#x5408;&#x6709;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;project&#xFF0C;&#x7C7B;&#x578B;&#x4E3A;string&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x662F;description&#xFF0C;&#x7C7B;&#x578B;&#x4E5F;&#x662F;string&#x3002;</p><pre><code>var mongoose = require(&apos;mongoose&apos;)

mongoose.connect(&apos;mongodb://localhost:27017/demodb&apos;)
var db = mongoose.connection;
db.on(&apos;error&apos;, function(error) {
  console.log(error);
});

// schema&#x5B9A;&#x4E49;
var Tasks = new mongoose.Schema({
  project: {type : String, default : &apos;&#x9ED8;&#x8BA4;&#x4EFB;&#x52A1;&apos;},
  description: String
});
mongoose.model(&apos;Task&apos;, Tasks);</code></pre><h2>&#x589E;</h2><pre><code>// add
var Task = mongoose.model(&apos;Task&apos;);
var task = new Task();
task.description = &apos;task1 description.&apos;;
task.save(function(err) {
  if (err) throw err;
  console.log(&apos;Task saved.&apos;)
})</code></pre><p>&#x5982;&#x679C;&#x6570;&#x636E;&#x5E93;demodb&#x4E2D;&#x6CA1;&#x6709;tasks&#x8FD9;&#x4E2A;&#x96C6;&#x5408;&#xFF0C;&#x5F53;&#x4E0A;&#x9762;&#x7A0B;&#x5E8F;&#x6267;&#x884C;&#x65F6;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x521B;&#x5EFA;tasks&#x96C6;&#x5408;&#xFF0C;&#x5F53;&#x6267;&#x884C;&#x8BE5;&#x7A0B;&#x5E8F;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x6570;&#x636E;&#x5E93;&#x4E2D;tasks&#x96C6;&#x5408;&#x591A;&#x4E86;&#x4E00;&#x884C;&#x6570;&#x636E;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbesaA?w=833&amp;h=82" src="https://static.alili.tech/img/bVbesaA?w=833&amp;h=82" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4E0D;&#x5C0F;&#x5FC3;&#x628A;task.description&#x7684;&#x503C;&#x8D4B;&#x4E88;&#x4E86;&#x6570;&#x5B57;123&#xFF0C;&#x90A3;&#x4E48;&#x7A0B;&#x5E8F;&#x80FD;&#x6B63;&#x5E38;&#x6267;&#x884C;&#x5417;&#xFF1F;<br>&#x5F53;&#x7136;&#xFF0C;mongoose&#x4F1A;&#x5E2E;&#x6211;&#x4EEC;&#x81EA;&#x52A8;&#x5C06;&#x6570;&#x5B57;123&#x8F6C;&#x6362;&#x6210;&#x5B57;&#x7B26;&#x4E32;123&#x3002;&#x6700;&#x540E;&#x7ED3;&#x679C;&#x4F1A;&#x662F;&#x8FD9;&#x6837;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbesaI?w=835&amp;h=112" src="https://static.alili.tech/img/bVbesaI?w=835&amp;h=112" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><h2>&#x5220;</h2><p>&#x53EF;&#x4EE5;&#x7528;&#x6587;&#x6863;&#x7684;&#x5185;&#x90E8;ID&#x83B7;&#x53D6;&#x548C;&#x5220;&#x9664;&#x6587;&#x6863;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>// &#x5220;&#x9664;
var Task = mongoose.model(&apos;Task&apos;)
Task.findById(&apos;5b56ce3c2fa17f02e459fe54&apos;, function(err, task) {
  task.remove()
})</code></pre><p>&#x5F53;&#x7136;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x7528;&#x5176;&#x4ED6;&#x6761;&#x4EF6;&#x6765;&#x8FDB;&#x884C;&#x5220;&#x9664;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>var Task = mongoose.model(&apos;Task&apos;)
Task.findOne({ &apos;description&apos;: &apos;12&apos; }, function(err, task) {
  task.remove()
})</code></pre><h2>&#x6539;</h2><p>&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x7528;Mongoose&#x66F4;&#x65B0;&#x4E86;&#x4E00;&#x4E2A;&#x6587;&#x6863;id&#x4E3A;5b5bebbfbf04e70bd432bde1&#x7684;&#x6587;&#x6863;</p><pre><code>var Task = mongoose.model(&apos;Task&apos;);
Task.update(
  {_id: &apos;5b5bebbfbf04e70bd432bde1&apos;},
  {description: &apos;update description.&apos;},
  {multi: false},
  function(err, rows_updated) {
    if (err) throw err;
    console.log(&apos;Updated.&apos;);
  }
)</code></pre><p>&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;mongoose&#x7684;find&#x65B9;&#x6CD5;&#x5B9A;&#x4F4D;&#x4E00;&#x4E2A;&#x6587;&#x6863;&#xFF0C;&#x7136;&#x540E;&#x4FEE;&#x6539;&#x5E76;&#x4FDD;&#x5B58;&#x5B83;&#x3002;</p><h2>&#x67E5;</h2><p>&#x4E0B;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x5BF9;tasks&#x96C6;&#x5408;&#x8FDB;&#x884C;&#x641C;&#x7D22;&#xFF0C;&#x5E76;&#x8F93;&#x51FA;&#x6BCF;&#x9879;&#x4EFB;&#x52A1;&#x7684;&#x552F;&#x4E00;ID&#x548C;&#x63CF;&#x8FF0;&#xFF0C;&#x7B49;&#x6253;&#x5370;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x5173;&#x95ED;&#x6570;&#x636E;&#x5E93;&#x8FDE;&#x63A5;&#x3002;</p><pre><code>var Task = mongoose.model(&apos;Task&apos;);
Task.find((err, tasks) =&gt; {
  console.log(tasks)
  if (tasks != null) {
    tasks.map(v =&gt; {
      console.log(&apos;ID:&apos; + v._id);
      console.log(v.description);
    })
  }
  db.close()
});</code></pre><p>&#x5F53;&#x7136;&#xFF0C;&#x67E5;&#x8BE2;&#x65B9;&#x6CD5;&#x6709;&#x5F88;&#x591A;&#xFF0C;&#x8FD9;&#x91CC;&#x53EA;&#x662F;&#x5217;&#x4E3E;&#x5176;&#x4E00;&#x3002;</p><h2>&#x53EF;&#x89C6;&#x5316;&#x5DE5;&#x5177;&#x63A8;&#x8350;</h2><p>&#x987A;&#x4FBF;&#x63D0;&#x4E00;&#x4E0B;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;mongoDB&#x5B98;&#x65B9;&#x63A8;&#x51FA;&#x7684;compass&#x5DE5;&#x5177;&#x6765;&#x67E5;&#x770B;&#x548C;&#x64CD;&#x4F5C;&#x6570;&#x636E;&#xFF08;&#x5305;&#x62EC;&#x589E;&#x5220;&#x6539;&#x67E5;&#xFF09;&#xFF0C;&#x5BF9;&#x4E8E;&#x6D4B;&#x8BD5;&#x548C;&#x8C03;&#x8BD5;&#x6570;&#x636E;&#x6765;&#x8BF4;&#xFF0C;&#x975E;&#x5E38;&#x7684;&#x65B9;&#x4FBF;&#x3002;</p><h2>&#x5C0F;&#x7ED3;</h2><p>&#x89C9;&#x5F97;&#x81EA;&#x5DF1;&#x662F;&#x64CD;&#x63A7;mongoDB&#x7684;&#x9AD8;&#x624B;&#x4E86;&#x5417;&#xFF1F;&#x4E5F;&#x8BB8;&#x8FD8;&#x4E0D;&#x662F;&#xFF0C;&#x4F46;&#x8BFB;&#x5B8C;&#x672C;&#x7CFB;&#x5217;&#x7684;&#x521D;&#x9636;&#x4E09;&#x90E8;&#x66F2;&#xFF0C;&#x76F8;&#x4FE1;&#x4F60;&#x5E94;&#x8BE5;&#x5DF2;&#x7ECF;&#x638C;&#x63E1;&#x4E86;&#x5F88;&#x591A;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x51B3;&#x5B9A;&#x6DF1;&#x5165;&#x4F7F;&#x7528;Mongoose&#xFF0C;&#x8BF7;&#x53C2;&#x8003;&#x5B83;&#x7684;&#x5728;&#x7EBF;&#x6587;&#x6863; <a href="http://mongoosejs.com/docs/index.html" rel="nofollow noreferrer">http://mongoosejs.com/docs/in...</a></p><p>&#x5230;&#x8FD9;&#x91CC;&#x4E3A;&#x6B62;&#xFF0C;mongoDB&#x521D;&#x9636;&#x7CFB;&#x5217;&#x5C06;&#x544A;&#x4E00;&#x6BB5;&#x843D;&#xFF0C;&#x540C;&#x65F6;&#xFF0C;&#x63A8;&#x8350;&#x5982;&#x4E0B;&#x4E66;&#x7C4D;&#x4F9B;&#x9700;&#x8981;&#x6DF1;&#x5165;&#x7406;&#x89E3;mongoDB&#x7684;&#x670B;&#x53CB;&#x7EE7;&#x7EED;&#x53C2;&#x8003;&#xFF1A;<br><a href="https://book.douban.com/subject/25798102/" rel="nofollow noreferrer">MongoDB&#x6743;&#x5A01;&#x6307;&#x5357;&#xFF08;&#x7B2C;2&#x7248;&#xFF09;</a><br><a href="https://book.douban.com/subject/27061123/" rel="nofollow noreferrer">MongoDB&#x5B9E;&#x6218;(&#x7B2C;&#x4E8C;&#x7248;)</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mongoDB初阶系列三：mongoose

## 原文链接
[https://segmentfault.com/a/1190000015799027](https://segmentfault.com/a/1190000015799027)


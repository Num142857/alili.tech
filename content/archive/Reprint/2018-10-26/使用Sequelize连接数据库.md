---
title: 使用Sequelize连接数据库
hidden: true
categories: [reprint]
slug: 7c1265b7
date: 2018-10-26 02:30:12
---

{{< raw >}}
<p>Sequelize.js&#x662F;&#x4E00;&#x6B3E;&#x9488;&#x5BF9;nodejs&#x7684;ORM&#x6846;&#x67B6;&#x3002;</p><p>&#x4F7F;&#x7528;nodejs&#x8FDE;&#x63A5;&#x8FC7;&#x6570;&#x636E;&#x5E93;&#x7684;&#x4EBA;&#x80AF;&#x5B9A;&#x5BF9;&#x6570;&#x636E;&#x5E93;&#x4E0D;&#x964C;&#x751F;&#x4E86;&#x3002;&#x5982;&#x679C;&#x662F;&#x76F4;&#x63A5;&#x94FE;&#x63A5;&#xFF0C;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x5EFA;&#x7ACB;&#x5E76;&#x7BA1;&#x7406;&#x8FDE;&#x63A5;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x624B;&#x52A8;&#x7F16;&#x5199;sql&#x8BED;&#x53E5;&#x3002;&#x7B80;&#x5355;&#x7684;&#x9879;&#x76EE;&#x5230;&#x662F;&#x65E0;&#x6240;&#x8C13;&#xFF0C;&#x53EF;&#x662F;&#x4E00;&#x65E6;&#x9879;&#x76EE;&#x8BBE;&#x8BA1;&#x7684;&#x4E1C;&#x897F;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#xFF0C;&#x8868;&#x6BD4;&#x8F83;&#x591A;&#x7684;&#x65F6;&#x5019;&#x6574;&#x4E2A;sql&#x7684;&#x7F16;&#x5199;&#x5C31;&#x975E;&#x5E38;&#x7684;&#x6D88;&#x8017;&#x7CBE;&#x529B;&#x3002;</p><p>&#x5728;Java&#x3001;c#&#x7B49;&#x8BED;&#x8A00;&#x4E2D;&#x5DF2;&#x7ECF;&#x6709;&#x8F7B;&#x91CF;&#x7684;&#x6570;&#x636E;&#x5E93;&#x6846;&#x67B6;&#x6216;&#x8005;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x4E86;&#x3002;&#x5728;nodejs&#x4E2D;&#x6211;&#x63A8;&#x8350;Sequelize&#x3002;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x6210;&#x719F;&#x7684;&#x6846;&#x67B6;&#xFF0C;&#x5728;&#x901F;&#x5EA6;&#x548C;&#x6027;&#x80FD;&#x4E0A;&#x4E5F;&#x975E;&#x5E38;&#x6709;&#x4F18;&#x52BF;&#x3002;&#x800C;&#x5176;&#x4E2D;&#x6700;&#x5173;&#x952E;&#x7684;&#x5730;&#x65B9;&#x5C31;&#x5728;&#x4E8E;&#xFF0C;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x53EA;&#x9700;&#x8981;&#x7BA1;&#x7406;&#x5BF9;&#x8C61;&#x7684;&#x521B;&#x5EFA;&#x3001;&#x67E5;&#x8BE2;&#x65B9;&#x6CD5;&#x7684;&#x8C03;&#x7528;&#x7B49;&#x5373;&#x53EF;&#xFF0C;&#x6781;&#x5C11;&#x9700;&#x8981;&#x7F16;&#x5199;sql&#x8BED;&#x53E5;&#x3002;&#x8FD9;&#x4E00;&#x4E2A;&#x597D;&#x5904;&#x5C31;&#x662F;&#x7701;&#x53BB;&#x4E86;&#x590D;&#x6742;&#x7684;sql&#x8BED;&#x53E5;&#x7EF4;&#x62A4;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x907F;&#x514D;&#x4E86;&#x56E0;sql&#x800C;&#x5F15;&#x8D77;&#x7684;&#x4E0D;&#x5FC5;&#x8981;&#x7684;bug&#x3002;</p><p>Sequelize&#x662F;&#x9488;&#x5BF9;node.js&#x548C;io.js&#x63D0;&#x4F9B;&#x7684;ORM&#x6846;&#x67B6;&#x3002;&#x5177;&#x4F53;&#x5C31;&#x662F;&#x7A81;&#x51FA;&#x4E00;&#x4E2A;&#x652F;&#x6301;&#x5E7F;&#x6CDB;&#xFF0C;&#x914D;&#x7F6E;&#x548C;&#x67E5;&#x8BE2;&#x65B9;&#x6CD5;&#x7EDF;&#x4E00;&#x3002;&#x5B83;&#x652F;&#x6301;&#x7684;&#x6570;&#x636E;&#x5E93;&#x5305;&#x62EC;&#xFF1A;PostgreSQL&#x3001; MySQL&#x3001;MariaDB&#x3001; SQLite &#x548C; MSSQL&#x3002;</p><p>&#x672C;&#x6587;&#x4E2D;&#x6D4B;&#x8BD5;&#x4EE5;&#x53CA;API&#x5C55;&#x793A;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/cuo9958/sequelize-api" rel="nofollow noreferrer" target="_blank">github&#x5730;&#x5740;</a></p><h2 id="articleHeader0">&#x6F14;&#x793A;</h2><p>Sequelize&#x7684;&#x8C03;&#x7528;&#x7A81;&#x51FA;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x5FEB;&#x6377;&#x3002;&#x5177;&#x4F53;&#x60C5;&#x51B5;&#x53EF;&#x4EE5;&#x611F;&#x53D7;&#x4E00;&#x4E0B;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x5982;&#x679C;&#x6709;&#x8FC7;&#x5F00;&#x53D1;&#x7ECF;&#x9A8C;&#x7684;&#x53EF;&#x4EE5;&#x7565;&#x8FC7;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Table1.findById(23);
//select a,b,c,d from table1 where id=23;

Table1.findAll({
    where:{a:&quot;test&quot;,b:76}
});
//select a,b,c,d from table1 where a=&quot;test&quot; and &quot;b=76;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Table1.findById(<span class="hljs-number">23</span>);
<span class="hljs-comment">//select a,b,c,d from table1 where id=23;</span>

Table1.findAll({
    <span class="hljs-attr">where</span>:{<span class="hljs-attr">a</span>:<span class="hljs-string">&quot;test&quot;</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">76</span>}
});
<span class="hljs-comment">//select a,b,c,d from table1 where a=&quot;test&quot; and &quot;b=76;</span></code></pre><p>&#x5728;&#x5355;&#x8868;&#x67E5;&#x8BE2;&#x7684;&#x65F6;&#x5019;&#x53EA;&#x9700;&#x8981;&#x7B80;&#x5355;&#x7684;&#x914D;&#x7F6E;&#x5373;&#x53EF;&#x5B8C;&#x6210;&#x67E5;&#x8BE2;&#x3002;&#x662F;&#x4E0D;&#x662F;&#x975E;&#x5E38;&#x7684;&#x7B80;&#x5355;&#x65B9;&#x4FBF;&#x5462;&#xFF1F;</p><h2 id="articleHeader1">&#x8FDE;&#x63A5;&#x6570;&#x636E;&#x5E93;</h2><p>Sequelize&#x7684;&#x8FDE;&#x63A5;&#x9700;&#x8981;&#x4F20;&#x5165;&#x53C2;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x914D;&#x7F6E;&#x5F00;&#x542F;&#x7EBF;&#x7A0B;&#x6C60;&#x3001;&#x8BFB;&#x5199;&#x5206;&#x5E93;&#x7B49;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x7B80;&#x5355;&#x7684;&#x5199;&#x6CD5;&#x662F;&#x8FD9;&#x6837;&#x7684;:<code>new Sequelize(&quot;&#x8868;&#x540D;&quot;,&quot;&#x7528;&#x6237;&#x540D;&quot;,&quot;&#x5BC6;&#x7801;&quot;,&#x914D;&#x7F6E;)</code></p><p>&#x6B63;&#x5E38;&#x4F7F;&#x7528;&#x4E2D;&#x5F88;&#x5C11;&#x4F7F;&#x7528;&#x5230;&#x6240;&#x6709;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x91CC;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x5E38;&#x7528;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x81EA;&#x5DF1;&#x4F7F;&#x7528;&#x7684;&#x503C;&#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sequelize = new Sequelize(&apos;database&apos;, &apos;username&apos;, &apos;password&apos;,  {
  host: &apos;localhost&apos;,    //&#x6570;&#x636E;&#x5E93;&#x5730;&#x5740;,&#x9ED8;&#x8BA4;&#x672C;&#x673A;
  port:&apos;3306&apos;,
  dialect: &apos;mysql&apos;,
  pool: {   //&#x8FDE;&#x63A5;&#x6C60;&#x8BBE;&#x7F6E;
    max: 5, //&#x6700;&#x5927;&#x8FDE;&#x63A5;&#x6570;
    min: 0, //&#x6700;&#x5C0F;&#x8FDE;&#x63A5;&#x6570;
    idle: 10000
  },
 });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> sequelize = <span class="hljs-keyword">new</span> Sequelize(<span class="hljs-string">&apos;database&apos;</span>, <span class="hljs-string">&apos;username&apos;</span>, <span class="hljs-string">&apos;password&apos;</span>,  {
  <span class="hljs-attr">host</span>: <span class="hljs-string">&apos;localhost&apos;</span>,    <span class="hljs-comment">//&#x6570;&#x636E;&#x5E93;&#x5730;&#x5740;,&#x9ED8;&#x8BA4;&#x672C;&#x673A;</span>
  port:<span class="hljs-string">&apos;3306&apos;</span>,
  <span class="hljs-attr">dialect</span>: <span class="hljs-string">&apos;mysql&apos;</span>,
  <span class="hljs-attr">pool</span>: {   <span class="hljs-comment">//&#x8FDE;&#x63A5;&#x6C60;&#x8BBE;&#x7F6E;</span>
    max: <span class="hljs-number">5</span>, <span class="hljs-comment">//&#x6700;&#x5927;&#x8FDE;&#x63A5;&#x6570;</span>
    min: <span class="hljs-number">0</span>, <span class="hljs-comment">//&#x6700;&#x5C0F;&#x8FDE;&#x63A5;&#x6570;</span>
    idle: <span class="hljs-number">10000</span>
  },
 });</code></pre><p>&#x4E0B;&#x9762;&#x662F;&#x8BE6;&#x7EC6;&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sequelize = new Sequelize(&apos;database&apos;, &apos;username&apos;, &apos;password&apos;, {
  // &#x6570;&#x636E;&#x5E93;&#x7C7B;&#x578B;&#xFF0C;&#x652F;&#x6301;: &apos;mysql&apos;, &apos;sqlite&apos;, &apos;postgres&apos;, &apos;mssql&apos;
  dialect: &apos;mysql&apos;,
  // &#x81EA;&#x5B9A;&#x4E49;&#x94FE;&#x63A5;&#x5730;&#x5740;&#xFF0C;&#x53EF;&#x4EE5;&#x662F;ip&#x6216;&#x8005;&#x57DF;&#x540D;&#xFF0C;&#x9ED8;&#x8BA4;&#x672C;&#x673A;&#xFF1A;localhost
  host: &apos;my.server.tld&apos;,
  // &#x81EA;&#x5B9A;&#x4E49;&#x7AEF;&#x53E3;&#xFF0C;&#x9ED8;&#x8BA4;3306
  port: 12345,
  // postgres&#x4F7F;&#x7528;&#x7684;&#x53C2;&#x6570;,&#x8FDE;&#x63A5;&#x7C7B;&#x578B;&#xFF0C;&#x9ED8;&#x8BA4;&#xFF1A;tcp
  protocol: null,
  // &#x662F;&#x5426;&#x5F00;&#x59CB;&#x65E5;&#x5FD7;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x7528;console.log
  // &#x5EFA;&#x8BAE;&#x5F00;&#x542F;&#xFF0C;&#x65B9;&#x4FBF;&#x5BF9;&#x7167;&#x751F;&#x6210;&#x7684;sql&#x8BED;&#x53E5;
  logging: true,
  // &#x9ED8;&#x8BA4;&#x662F;&#x7A7A;
  // &#x652F;&#x6301;: &apos;mysql&apos;, &apos;postgres&apos;, &apos;mssql&apos;
  dialectOptions: {
    socketPath: &apos;/Applications/MAMP/tmp/mysql/mysql.sock&apos;,
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  // sqlite&#x7684;&#x5B58;&#x50A8;&#x4F4D;&#x7F6E;,&#x4EC5;sqlite&#x6709;&#x7528;
  // - &#x9ED8;&#x8BA4; &apos;:memory:&apos;
  storage: &apos;path/to/database.sqlite&apos;,

  // &#x662F;&#x5426;&#x5C06;undefined&#x8F6C;&#x5316;&#x4E3A;NULL
  // - &#x9ED8;&#x8BA4;: false
  omitNull: true,
  // pg&#x4E2D;&#x5F00;&#x542F;ssl&#x652F;&#x6301;
  // - &#x9ED8;&#x8BA4;: false
  native: true,
  // &#x6570;&#x636E;&#x5E93;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;,&#x5168;&#x5C40;&#x53C2;&#x6570;
  define: {
    underscored: false
    freezeTableName: false,
    charset: &apos;utf8&apos;,
    dialectOptions: {
      collate: &apos;utf8_general_ci&apos;
    },
    timestamps: true
  },
  // &#x662F;&#x5426;&#x540C;&#x6B65;
  sync: { force: true },
  // &#x8FDE;&#x63A5;&#x6C60;&#x914D;&#x7F6E;
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
  isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> sequelize = <span class="hljs-keyword">new</span> Sequelize(<span class="hljs-string">&apos;database&apos;</span>, <span class="hljs-string">&apos;username&apos;</span>, <span class="hljs-string">&apos;password&apos;</span>, {
  <span class="hljs-comment">// &#x6570;&#x636E;&#x5E93;&#x7C7B;&#x578B;&#xFF0C;&#x652F;&#x6301;: &apos;mysql&apos;, &apos;sqlite&apos;, &apos;postgres&apos;, &apos;mssql&apos;</span>
  dialect: <span class="hljs-string">&apos;mysql&apos;</span>,
  <span class="hljs-comment">// &#x81EA;&#x5B9A;&#x4E49;&#x94FE;&#x63A5;&#x5730;&#x5740;&#xFF0C;&#x53EF;&#x4EE5;&#x662F;ip&#x6216;&#x8005;&#x57DF;&#x540D;&#xFF0C;&#x9ED8;&#x8BA4;&#x672C;&#x673A;&#xFF1A;localhost</span>
  host: <span class="hljs-string">&apos;my.server.tld&apos;</span>,
  <span class="hljs-comment">// &#x81EA;&#x5B9A;&#x4E49;&#x7AEF;&#x53E3;&#xFF0C;&#x9ED8;&#x8BA4;3306</span>
  port: <span class="hljs-number">12345</span>,
  <span class="hljs-comment">// postgres&#x4F7F;&#x7528;&#x7684;&#x53C2;&#x6570;,&#x8FDE;&#x63A5;&#x7C7B;&#x578B;&#xFF0C;&#x9ED8;&#x8BA4;&#xFF1A;tcp</span>
  protocol: <span class="hljs-literal">null</span>,
  <span class="hljs-comment">// &#x662F;&#x5426;&#x5F00;&#x59CB;&#x65E5;&#x5FD7;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x7528;console.log</span>
  <span class="hljs-comment">// &#x5EFA;&#x8BAE;&#x5F00;&#x542F;&#xFF0C;&#x65B9;&#x4FBF;&#x5BF9;&#x7167;&#x751F;&#x6210;&#x7684;sql&#x8BED;&#x53E5;</span>
  logging: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x662F;&#x7A7A;</span>
  <span class="hljs-comment">// &#x652F;&#x6301;: &apos;mysql&apos;, &apos;postgres&apos;, &apos;mssql&apos;</span>
  dialectOptions: {
    <span class="hljs-attr">socketPath</span>: <span class="hljs-string">&apos;/Applications/MAMP/tmp/mysql/mysql.sock&apos;</span>,
    <span class="hljs-attr">supportBigNumbers</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">bigNumberStrings</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-comment">// sqlite&#x7684;&#x5B58;&#x50A8;&#x4F4D;&#x7F6E;,&#x4EC5;sqlite&#x6709;&#x7528;</span>
  <span class="hljs-comment">// - &#x9ED8;&#x8BA4; &apos;:memory:&apos;</span>
  storage: <span class="hljs-string">&apos;path/to/database.sqlite&apos;</span>,

  <span class="hljs-comment">// &#x662F;&#x5426;&#x5C06;undefined&#x8F6C;&#x5316;&#x4E3A;NULL</span>
  <span class="hljs-comment">// - &#x9ED8;&#x8BA4;: false</span>
  omitNull: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// pg&#x4E2D;&#x5F00;&#x542F;ssl&#x652F;&#x6301;</span>
  <span class="hljs-comment">// - &#x9ED8;&#x8BA4;: false</span>
  native: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// &#x6570;&#x636E;&#x5E93;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;,&#x5168;&#x5C40;&#x53C2;&#x6570;</span>
  define: {
    <span class="hljs-attr">underscored</span>: <span class="hljs-literal">false</span>
    freezeTableName: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">charset</span>: <span class="hljs-string">&apos;utf8&apos;</span>,
    <span class="hljs-attr">dialectOptions</span>: {
      <span class="hljs-attr">collate</span>: <span class="hljs-string">&apos;utf8_general_ci&apos;</span>
    },
    <span class="hljs-attr">timestamps</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-comment">// &#x662F;&#x5426;&#x540C;&#x6B65;</span>
  sync: { <span class="hljs-attr">force</span>: <span class="hljs-literal">true</span> },
  <span class="hljs-comment">// &#x8FDE;&#x63A5;&#x6C60;&#x914D;&#x7F6E;</span>
  pool: {
    <span class="hljs-attr">max</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">idle</span>: <span class="hljs-number">30000</span>,
    <span class="hljs-attr">acquire</span>: <span class="hljs-number">60000</span>,
  },
  <span class="hljs-attr">isolationLevel</span>: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
})</code></pre><h2 id="articleHeader2">&#x5B9A;&#x4E49;&#x6A21;&#x578B;&#x5BF9;&#x8C61;</h2><p>&#x5728;&#x4F7F;&#x7528;&#x4E4B;&#x524D;&#x4E00;&#x5B9A;&#x8981;&#x5148;&#x521B;&#x5EFA;&#x6A21;&#x578B;&#x5BF9;&#x8C61;&#x3002;&#x5C31;&#x662F;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x8868;&#x7684;&#x540D;&#x79F0;&#x3001;&#x4F7F;&#x7528;&#x5230;&#x7684;&#x5B57;&#x6BB5;&#x3001;&#x5B57;&#x6BB5;&#x7C7B;&#x578B;&#x7B49;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x63A8;&#x8350;&#x7684;&#x5F00;&#x53D1;&#x65B9;&#x5F0F;&#x3002;&#x5148;&#x5728;nodejs&#x4E2D;&#x5C06;&#x5BF9;&#x8C61;&#x521B;&#x5EFA;&#x51FA;&#x6765;&#xFF0C;&#x7136;&#x540E;&#x8C03;&#x7528;Sequelize&#x7684;&#x540C;&#x6B65;&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x6570;&#x636E;&#x5E93;&#x81EA;&#x52A8;&#x521B;&#x5EFA;&#x51FA;&#x6765;&#x3002;&#x8FD9;&#x6837;&#x5C31;&#x907F;&#x514D;&#x4E86;&#x65E2;&#x8981;&#x5199;&#x4EE3;&#x7801;&#x5EFA;&#x8868;&#xFF0C;&#x53C8;&#x8981;&#x624B;&#x5DE5;&#x521B;&#x5EFA;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x7684;&#x8868;&#x7684;&#x64CD;&#x4F5C;&#x3002;&#x53EA;&#x9700;&#x8981;&#x5355;&#x72EC;&#x8003;&#x8651;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x5BF9;&#x8C61;&#x7C7B;&#x578B;&#x7B49;&#x5C5E;&#x6027;&#x5C31;&#x597D;&#x4E86;&#x3002;</p><p>&#x5982;&#x679C;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x5DF2;&#x7ECF;&#x5EFA;&#x597D;&#x4E86;&#x8868;&#xFF0C;&#x5E76;&#x4E14;&#x4E0D;&#x80FD;&#x5220;&#x9664;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5C31;&#x4E0D;&#x80FD;&#x81EA;&#x52A8;&#x521B;&#x5EFA;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x521B;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x5220;&#x9664;&#x6389;&#x65E7;&#x7684;&#x6570;&#x636E;&#x3002;</p><p>&#x4E0B;&#x9762;&#x662F;&#x7B80;&#x5355;&#x7684;&#x5BF9;&#x8C61;&#x521B;&#x5EFA;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const users = db.define(&apos;t_user&apos;/*&#x81EA;&#x5B9A;&#x4E49;&#x8868;&#x540D;*/, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,       //&#x4E3B;&#x952E;
        autoIncrement: true,    //&#x81EA;&#x589E;
        comment: &quot;&#x81EA;&#x589E;id&quot;       //&#x6CE8;&#x91CA;:&#x53EA;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x6709;&#x6548;
    },
    //&#x7528;&#x6237;&#x540D;
    username: {
        type: Sequelize.STRING,
        validate:{
            isEmail: true,   //&#x7C7B;&#x578B;&#x68C0;&#x6D4B;,&#x662F;&#x5426;&#x662F;&#x90AE;&#x7BB1;&#x683C;&#x5F0F;
        }
    },
    //&#x5BC6;&#x7801;
    pwd: {
        type: Sequelize.STRING(10),
        allowNull: false,//&#x4E0D;&#x5141;&#x8BB8;&#x4E3A;null
    },
    //&#x72B6;&#x6001;
    status: {
        type: Sequelize.INTEGER,
         defaultValue: 0,//&#x9ED8;&#x8BA4;&#x503C;&#x662F;0
    },
    //&#x6635;&#x79F0;
    nickname: {
        type: Sequelize.STRING
    },
    //token
    token: {
        type: Sequelize.UUID
    },
    create_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    //&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x8868;&#x540D;
    freezeTableName: true,
    //&#x53BB;&#x6389;&#x9ED8;&#x8BA4;&#x7684;&#x6DFB;&#x52A0;&#x65F6;&#x95F4;&#x548C;&#x66F4;&#x65B0;&#x65F6;&#x95F4;
    timestamps: false,
    indexes:[
        //&#x666E;&#x901A;&#x7D22;&#x5F15;,&#x9ED8;&#x8BA4;BTREE
        {
            unique: true,
            fields: [&apos;pid&apos;]
        },
     ]
});

//&#x540C;&#x6B65;:&#x6CA1;&#x6709;&#x5C31;&#x65B0;&#x5EFA;,&#x6709;&#x5C31;&#x4E0D;&#x53D8;
// users.sync();
//&#x5148;&#x5220;&#x9664;&#x540E;&#x540C;&#x6B65;
users.sync({
    force: true
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> users = db.define(<span class="hljs-string">&apos;t_user&apos;</span><span class="hljs-comment">/*&#x81EA;&#x5B9A;&#x4E49;&#x8868;&#x540D;*/</span>, {
    <span class="hljs-attr">id</span>: {
        <span class="hljs-attr">type</span>: Sequelize.INTEGER,
        <span class="hljs-attr">primaryKey</span>: <span class="hljs-literal">true</span>,       <span class="hljs-comment">//&#x4E3B;&#x952E;</span>
        autoIncrement: <span class="hljs-literal">true</span>,    <span class="hljs-comment">//&#x81EA;&#x589E;</span>
        comment: <span class="hljs-string">&quot;&#x81EA;&#x589E;id&quot;</span>       <span class="hljs-comment">//&#x6CE8;&#x91CA;:&#x53EA;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x6709;&#x6548;</span>
    },
    <span class="hljs-comment">//&#x7528;&#x6237;&#x540D;</span>
    username: {
        <span class="hljs-attr">type</span>: Sequelize.STRING,
        <span class="hljs-attr">validate</span>:{
            <span class="hljs-attr">isEmail</span>: <span class="hljs-literal">true</span>,   <span class="hljs-comment">//&#x7C7B;&#x578B;&#x68C0;&#x6D4B;,&#x662F;&#x5426;&#x662F;&#x90AE;&#x7BB1;&#x683C;&#x5F0F;</span>
        }
    },
    <span class="hljs-comment">//&#x5BC6;&#x7801;</span>
    pwd: {
        <span class="hljs-attr">type</span>: Sequelize.STRING(<span class="hljs-number">10</span>),
        <span class="hljs-attr">allowNull</span>: <span class="hljs-literal">false</span>,<span class="hljs-comment">//&#x4E0D;&#x5141;&#x8BB8;&#x4E3A;null</span>
    },
    <span class="hljs-comment">//&#x72B6;&#x6001;</span>
    status: {
        <span class="hljs-attr">type</span>: Sequelize.INTEGER,
         <span class="hljs-attr">defaultValue</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x503C;&#x662F;0</span>
    },
    <span class="hljs-comment">//&#x6635;&#x79F0;</span>
    nickname: {
        <span class="hljs-attr">type</span>: Sequelize.STRING
    },
    <span class="hljs-comment">//token</span>
    token: {
        <span class="hljs-attr">type</span>: Sequelize.UUID
    },
    <span class="hljs-attr">create_time</span>: {
        <span class="hljs-attr">type</span>: Sequelize.DATE,
        <span class="hljs-attr">defaultValue</span>: Sequelize.NOW
    }
}, {
    <span class="hljs-comment">//&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x8868;&#x540D;</span>
    freezeTableName: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">//&#x53BB;&#x6389;&#x9ED8;&#x8BA4;&#x7684;&#x6DFB;&#x52A0;&#x65F6;&#x95F4;&#x548C;&#x66F4;&#x65B0;&#x65F6;&#x95F4;</span>
    timestamps: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">indexes</span>:[
        <span class="hljs-comment">//&#x666E;&#x901A;&#x7D22;&#x5F15;,&#x9ED8;&#x8BA4;BTREE</span>
        {
            <span class="hljs-attr">unique</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">fields</span>: [<span class="hljs-string">&apos;pid&apos;</span>]
        },
     ]
});

<span class="hljs-comment">//&#x540C;&#x6B65;:&#x6CA1;&#x6709;&#x5C31;&#x65B0;&#x5EFA;,&#x6709;&#x5C31;&#x4E0D;&#x53D8;</span>
<span class="hljs-comment">// users.sync();</span>
<span class="hljs-comment">//&#x5148;&#x5220;&#x9664;&#x540E;&#x540C;&#x6B65;</span>
users.sync({
    <span class="hljs-attr">force</span>: <span class="hljs-literal">true</span>
});</code></pre><h2 id="articleHeader3">&#x6570;&#x636E;&#x7C7B;&#x578B;</h2><p>&#x524D;&#x6BB5;&#x5C06;&#x4E86;&#x5BF9;&#x8C61;&#x7684;&#x521B;&#x5EFA;&#xFF0C;&#x91CC;&#x9762;&#x7528;&#x5230;&#x4E86;&#x5BF9;&#x8C61;&#x7684;&#x5404;&#x79CD;&#x7C7B;&#x578B;&#x3002;&#x8FD9;&#x91CC;&#x518D;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x7C7B;&#x578B;&#x7684;&#x5177;&#x4F53;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Sequelize.STRING         //&#x5B57;&#x7B26;&#x4E32;,&#x957F;&#x5EA6;&#x9ED8;&#x8BA4;255,VARCHAR(255)
Sequelize.STRING(1234)  //&#x8BBE;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x5B57;&#x7B26;&#x4E32;,VARCHAR(1234)
Sequelize.STRING.BINARY   //&#x5B9A;&#x4E49;&#x7C7B;&#x578B;VARCHAR BINARY
Sequelize.TEXT           //&#x957F;&#x5B57;&#x7B26;&#x4E32;,&#x6587;&#x672C; TEXT
Sequelize.TEXT(&apos;tiny&apos;)   //&#x5C0F;&#x6587;&#x672C;&#x5B57;&#x7B26;&#x4E32;,TINYTEXT

Sequelize.INTEGER      //int&#x6570;&#x5B57;,int
Sequelize.BIGINT       //&#x66F4;&#x5927;&#x7684;&#x6570;&#x5B57;,BIGINT
Sequelize.BIGINT(11)   //&#x8BBE;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x6570;&#x5B57;,BIGINT(11)

Sequelize.FLOAT        //&#x6D6E;&#x70B9;&#x7C7B;&#x578B;,FLOAT
Sequelize.FLOAT(11)     //&#x8BBE;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x6D6E;&#x70B9;,FLOAT(11)
Sequelize.FLOAT(11, 12)  //&#x8BBE;&#x5B9A;&#x957F;&#x5EA6;&#x548C;&#x5C0F;&#x6570;&#x4F4D;&#x6570;&#x7684;&#x6D6E;&#x70B9;,FLOAT(11,12)

Sequelize.REAL     //REAL  PostgreSQL only.
Sequelize.REAL(11) // REAL(11)    PostgreSQL only.
Sequelize.REAL(11, 12)  // REAL(11,12) PostgreSQL only.

Sequelize.DOUBLE     // DOUBLE
Sequelize.DOUBLE(11)  // DOUBLE(11)
Sequelize.DOUBLE(11, 12) // DOUBLE(11,12)

Sequelize.DECIMAL     // DECIMAL
Sequelize.DECIMAL(10, 2)  // DECIMAL(10,2)

Sequelize.DATE    // &#x65E5;&#x671F;&#x7C7B;&#x578B;,DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
Sequelize.DATE(6) // mysql 5.6.4+&#x652F;&#x6301;,&#x5206;&#x79D2;&#x7CBE;&#x5EA6;&#x4E3A;6&#x4F4D;
Sequelize.DATEONLY   // &#x4EC5;&#x65E5;&#x671F;&#x90E8;&#x5206;
Sequelize.BOOLEAN   // int&#x7C7B;&#x578B;,&#x957F;&#x5EA6;&#x4E3A;1,TINYINT(1)

Sequelize.ENUM(&apos;value 1&apos;, &apos;value 2&apos;)  // &#x679A;&#x4E3E;&#x7C7B;&#x578B;
Sequelize.ARRAY(Sequelize.TEXT)  //PostgreSQL only.
Sequelize.ARRAY(Sequelize.ENUM)  //  PostgreSQL only.

Sequelize.JSON   // JSON column. PostgreSQL, SQLite and MySQL only.
Sequelize.JSONB  // JSONB column. PostgreSQL only.

Sequelize.BLOB   // BLOB (bytea for PostgreSQL)
Sequelize.BLOB(&apos;tiny&apos;)  // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)

Sequelize.UUID  // PostgreSQL&#x548C;SQLite&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x662F;UUID, MySQL&#x662F;CHAR(36)&#x7C7B;&#x578B;

Sequelize.CIDR  // PostgreSQL&#x4E2D;&#x7684;CIDR&#x7C7B;&#x578B;
Sequelize.INET   // PostgreSQL&#x4E2D;&#x7684;INET&#x7C7B;&#x578B;
Sequelize.MACADDR  // PostgreSQL&#x4E2D;&#x7684;MACADDR&#x7C7B;&#x578B;

Sequelize.RANGE(Sequelize.INTEGER)    //PostgreSQL only.
Sequelize.RANGE(Sequelize.BIGINT)     // PostgreSQL only.
Sequelize.RANGE(Sequelize.DATE)       //PostgreSQL only.
Sequelize.RANGE(Sequelize.DATEONLY)   //PostgreSQL only.
Sequelize.RANGE(Sequelize.DECIMAL)    //PostgreSQL only.

Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // PostgreSQL only.

Sequelize.GEOMETRY   //PostgreSQL (with PostGIS) or MySQL only.
Sequelize.GEOMETRY(&apos;POINT&apos;)  // PostgreSQL (with PostGIS) or MySQL only.
Sequelize.GEOMETRY(&apos;POINT&apos;, 4326)// PostgreSQL (with PostGIS) or MySQL only." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Sequelize.STRING         <span class="hljs-comment">//&#x5B57;&#x7B26;&#x4E32;,&#x957F;&#x5EA6;&#x9ED8;&#x8BA4;255,VARCHAR(255)</span>
Sequelize.STRING(<span class="hljs-number">1234</span>)  <span class="hljs-comment">//&#x8BBE;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x5B57;&#x7B26;&#x4E32;,VARCHAR(1234)</span>
Sequelize.STRING.BINARY   <span class="hljs-comment">//&#x5B9A;&#x4E49;&#x7C7B;&#x578B;VARCHAR BINARY</span>
Sequelize.TEXT           <span class="hljs-comment">//&#x957F;&#x5B57;&#x7B26;&#x4E32;,&#x6587;&#x672C; TEXT</span>
Sequelize.TEXT(<span class="hljs-string">&apos;tiny&apos;</span>)   <span class="hljs-comment">//&#x5C0F;&#x6587;&#x672C;&#x5B57;&#x7B26;&#x4E32;,TINYTEXT</span>

Sequelize.INTEGER      <span class="hljs-comment">//int&#x6570;&#x5B57;,int</span>
Sequelize.BIGINT       <span class="hljs-comment">//&#x66F4;&#x5927;&#x7684;&#x6570;&#x5B57;,BIGINT</span>
Sequelize.BIGINT(<span class="hljs-number">11</span>)   <span class="hljs-comment">//&#x8BBE;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x6570;&#x5B57;,BIGINT(11)</span>

Sequelize.FLOAT        <span class="hljs-comment">//&#x6D6E;&#x70B9;&#x7C7B;&#x578B;,FLOAT</span>
Sequelize.FLOAT(<span class="hljs-number">11</span>)     <span class="hljs-comment">//&#x8BBE;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x6D6E;&#x70B9;,FLOAT(11)</span>
Sequelize.FLOAT(<span class="hljs-number">11</span>, <span class="hljs-number">12</span>)  <span class="hljs-comment">//&#x8BBE;&#x5B9A;&#x957F;&#x5EA6;&#x548C;&#x5C0F;&#x6570;&#x4F4D;&#x6570;&#x7684;&#x6D6E;&#x70B9;,FLOAT(11,12)</span>

Sequelize.REAL     <span class="hljs-comment">//REAL  PostgreSQL only.</span>
Sequelize.REAL(<span class="hljs-number">11</span>) <span class="hljs-comment">// REAL(11)    PostgreSQL only.</span>
Sequelize.REAL(<span class="hljs-number">11</span>, <span class="hljs-number">12</span>)  <span class="hljs-comment">// REAL(11,12) PostgreSQL only.</span>

Sequelize.DOUBLE     <span class="hljs-comment">// DOUBLE</span>
Sequelize.DOUBLE(<span class="hljs-number">11</span>)  <span class="hljs-comment">// DOUBLE(11)</span>
Sequelize.DOUBLE(<span class="hljs-number">11</span>, <span class="hljs-number">12</span>) <span class="hljs-comment">// DOUBLE(11,12)</span>

Sequelize.DECIMAL     <span class="hljs-comment">// DECIMAL</span>
Sequelize.DECIMAL(<span class="hljs-number">10</span>, <span class="hljs-number">2</span>)  <span class="hljs-comment">// DECIMAL(10,2)</span>

Sequelize.DATE    <span class="hljs-comment">// &#x65E5;&#x671F;&#x7C7B;&#x578B;,DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres</span>
Sequelize.DATE(<span class="hljs-number">6</span>) <span class="hljs-comment">// mysql 5.6.4+&#x652F;&#x6301;,&#x5206;&#x79D2;&#x7CBE;&#x5EA6;&#x4E3A;6&#x4F4D;</span>
Sequelize.DATEONLY   <span class="hljs-comment">// &#x4EC5;&#x65E5;&#x671F;&#x90E8;&#x5206;</span>
Sequelize.BOOLEAN   <span class="hljs-comment">// int&#x7C7B;&#x578B;,&#x957F;&#x5EA6;&#x4E3A;1,TINYINT(1)</span>

Sequelize.ENUM(<span class="hljs-string">&apos;value 1&apos;</span>, <span class="hljs-string">&apos;value 2&apos;</span>)  <span class="hljs-comment">// &#x679A;&#x4E3E;&#x7C7B;&#x578B;</span>
Sequelize.ARRAY(Sequelize.TEXT)  <span class="hljs-comment">//PostgreSQL only.</span>
Sequelize.ARRAY(Sequelize.ENUM)  <span class="hljs-comment">//  PostgreSQL only.</span>

Sequelize.JSON   <span class="hljs-comment">// JSON column. PostgreSQL, SQLite and MySQL only.</span>
Sequelize.JSONB  <span class="hljs-comment">// JSONB column. PostgreSQL only.</span>

Sequelize.BLOB   <span class="hljs-comment">// BLOB (bytea for PostgreSQL)</span>
Sequelize.BLOB(<span class="hljs-string">&apos;tiny&apos;</span>)  <span class="hljs-comment">// TINYBLOB (bytea for PostgreSQL. Other options are medium and long)</span>

Sequelize.UUID  <span class="hljs-comment">// PostgreSQL&#x548C;SQLite&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x662F;UUID, MySQL&#x662F;CHAR(36)&#x7C7B;&#x578B;</span>

Sequelize.CIDR  <span class="hljs-comment">// PostgreSQL&#x4E2D;&#x7684;CIDR&#x7C7B;&#x578B;</span>
Sequelize.INET   <span class="hljs-comment">// PostgreSQL&#x4E2D;&#x7684;INET&#x7C7B;&#x578B;</span>
Sequelize.MACADDR  <span class="hljs-comment">// PostgreSQL&#x4E2D;&#x7684;MACADDR&#x7C7B;&#x578B;</span>

Sequelize.RANGE(Sequelize.INTEGER)    <span class="hljs-comment">//PostgreSQL only.</span>
Sequelize.RANGE(Sequelize.BIGINT)     <span class="hljs-comment">// PostgreSQL only.</span>
Sequelize.RANGE(Sequelize.DATE)       <span class="hljs-comment">//PostgreSQL only.</span>
Sequelize.RANGE(Sequelize.DATEONLY)   <span class="hljs-comment">//PostgreSQL only.</span>
Sequelize.RANGE(Sequelize.DECIMAL)    <span class="hljs-comment">//PostgreSQL only.</span>

Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) <span class="hljs-comment">// PostgreSQL only.</span>

Sequelize.GEOMETRY   <span class="hljs-comment">//PostgreSQL (with PostGIS) or MySQL only.</span>
Sequelize.GEOMETRY(<span class="hljs-string">&apos;POINT&apos;</span>)  <span class="hljs-comment">// PostgreSQL (with PostGIS) or MySQL only.</span>
Sequelize.GEOMETRY(<span class="hljs-string">&apos;POINT&apos;</span>, <span class="hljs-number">4326</span>)<span class="hljs-comment">// PostgreSQL (with PostGIS) or MySQL only.</span></code></pre><h2 id="articleHeader4">&#x6570;&#x636E;&#x7C7B;&#x578B;&#x68C0;&#x6D4B;</h2><p>&#x4E0A;&#x9762;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x4F7F;&#x7528;validate&#x5B57;&#x6BB5;&#x53BB;&#x9A8C;&#x8BC1;&#x5B57;&#x6BB5;&#x7684;&#x503C;&#x662F;&#x5426;&#x7B26;&#x5408;&#x6807;&#x51C6;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x5165;&#x5E93;&#x4E4B;&#x524D;&#x5C31;&#x80FD;&#x77E5;&#x9053;&#x6570;&#x636E;&#x662F;&#x5426;&#x7B26;&#x5408;&#x89C4;&#x5219;&#x3002;&#x5426;&#x5219;&#x8D38;&#x7136;&#x5C06;&#x964C;&#x751F;&#x7684;&#x6570;&#x636E;&#x5B58;&#x5165;&#x6570;&#x636E;&#x5E93;&#x5C31;&#x597D;&#x50CF;&#x5C06;&#x964C;&#x751F;&#x4EBA;&#x5E26;&#x5230;&#x5BB6;&#x91CC;&#x4E00;&#x6837;&#xFF0C;&#x662F;&#x5426;&#x5B89;&#x5168;&#x5168;&#x9760;&#x7F18;&#x5206;&#x554A;&#x3002;</p><p>Sequelize&#x5185;&#x7F6E;&#x652F;&#x6301;&#x7684;&#x9A8C;&#x8BC1;&#x8FD8;&#x662F;&#x975E;&#x5E38;&#x7684;&#x591A;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x4E9B;&#x90FD;&#x4E0D;&#x6EE1;&#x610F;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="validate: {
    is: [&quot;^[a-z]+$&quot;,&apos;i&apos;],     // &#x5168;&#x5339;&#x914D;&#x5B57;&#x6BCD;
    is: /^[a-z]+$/i,          // &#x5168;&#x5339;&#x914D;&#x5B57;&#x6BCD;&#xFF0C;&#x7528;&#x89C4;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x5199;&#x6CD5;
    not: [&quot;[a-z]&quot;,&apos;i&apos;],       // &#x4E0D;&#x80FD;&#x5305;&#x542B;&#x5B57;&#x6BCD;
    isEmail: true,            // &#x68C0;&#x67E5;&#x90AE;&#x4EF6;&#x683C;&#x5F0F;
    isUrl: true,              // &#x662F;&#x5426;&#x662F;&#x5408;&#x6CD5;&#x7F51;&#x5740;
    isIP: true,               // &#x662F;&#x5426;&#x662F;&#x5408;&#x6CD5;IP&#x5730;&#x5740;
    isIPv4: true,             // &#x662F;&#x5426;&#x662F;&#x5408;&#x6CD5;IPv4&#x5730;&#x5740;
    isIPv6: true,             // &#x662F;&#x5426;&#x662F;&#x5408;&#x6CD5;IPv6&#x5730;&#x5740;
    isAlpha: true,            // &#x662F;&#x5426;&#x662F;&#x5B57;&#x6BCD;
    isAlphanumeric: true,     // &#x662F;&#x5426;&#x662F;&#x6570;&#x5B57;&#x548C;&#x5B57;&#x6BCD;
    isNumeric: true,          // &#x53EA;&#x5141;&#x8BB8;&#x6570;&#x5B57;
    isInt: true,              // &#x53EA;&#x5141;&#x8BB8;&#x6574;&#x6570;
    isFloat: true,            // &#x662F;&#x5426;&#x662F;&#x6D6E;&#x70B9;&#x6570;
    isDecimal: true,          // &#x662F;&#x5426;&#x662F;&#x5341;&#x8FDB;&#x5236;&#x4E66;
    isLowercase: true,        // &#x662F;&#x5426;&#x662F;&#x5C0F;&#x5199;
    isUppercase: true,        // &#x662F;&#x5426;&#x5927;&#x5199;
    notNull: true,            // &#x4E0D;&#x5141;&#x8BB8;&#x4E3A;null
    isNull: true,             // &#x662F;&#x5426;&#x662F;null
    notEmpty: true,           // &#x4E0D;&#x5141;&#x8BB8;&#x4E3A;&#x7A7A;
    equals: &apos;specific value&apos;, // &#x7B49;&#x4E8E;&#x67D0;&#x4E9B;&#x503C;
    contains: &apos;foo&apos;,          // &#x5305;&#x542B;&#x67D0;&#x4E9B;&#x5B57;&#x7B26;
    notIn: [[&apos;foo&apos;, &apos;bar&apos;]],  // &#x4E0D;&#x5728;&#x5217;&#x8868;&#x4E2D;
    isIn: [[&apos;foo&apos;, &apos;bar&apos;]],   // &#x5728;&#x5217;&#x8868;&#x4E2D;
    notContains: &apos;bar&apos;,       // &#x4E0D;&#x5305;&#x542B;
    len: [2,10],              // &#x957F;&#x5EA6;&#x8303;&#x56F4;
    isUUID: 4,                // &#x662F;&#x5426;&#x662F;&#x5408;&#x6CD5; uuids
    isDate: true,             // &#x662F;&#x5426;&#x662F;&#x6709;&#x6548;&#x65E5;&#x671F;
    isAfter: &quot;2011-11-05&quot;,    // &#x662F;&#x5426;&#x665A;&#x4E8E;&#x67D0;&#x4E2A;&#x65E5;&#x671F;
    isBefore: &quot;2011-11-05&quot;,   // &#x662F;&#x5426;&#x65E9;&#x4E8E;&#x67D0;&#x4E2A;&#x65E5;&#x671F;
    max: 23,                  // &#x6700;&#x5927;&#x503C;
    min: 23,                  // &#x6700;&#x5C0F;&#x503C;
    isArray: true,            // &#x662F;&#x5426;&#x662F;&#x6570;&#x7EC4;
    isCreditCard: true,       // &#x662F;&#x5426;&#x662F;&#x6709;&#x6548;&#x4FE1;&#x7528;&#x5361;&#x53F7;
    // &#x81EA;&#x5B9A;&#x4E49;&#x89C4;&#x5219;
    isEven: function(value) {
    if(parseInt(value) % 2 != 0) {
        throw new Error(&apos;&#x8BF7;&#x8F93;&#x5165;&#x5076;&#x6570;!&apos;)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">validate: {
    <span class="hljs-attr">is</span>: [<span class="hljs-string">&quot;^[a-z]+$&quot;</span>,<span class="hljs-string">&apos;i&apos;</span>],     <span class="hljs-comment">// &#x5168;&#x5339;&#x914D;&#x5B57;&#x6BCD;</span>
    is: <span class="hljs-regexp">/^[a-z]+$/i</span>,          <span class="hljs-comment">// &#x5168;&#x5339;&#x914D;&#x5B57;&#x6BCD;&#xFF0C;&#x7528;&#x89C4;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x5199;&#x6CD5;</span>
    not: [<span class="hljs-string">&quot;[a-z]&quot;</span>,<span class="hljs-string">&apos;i&apos;</span>],       <span class="hljs-comment">// &#x4E0D;&#x80FD;&#x5305;&#x542B;&#x5B57;&#x6BCD;</span>
    isEmail: <span class="hljs-literal">true</span>,            <span class="hljs-comment">// &#x68C0;&#x67E5;&#x90AE;&#x4EF6;&#x683C;&#x5F0F;</span>
    isUrl: <span class="hljs-literal">true</span>,              <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x5408;&#x6CD5;&#x7F51;&#x5740;</span>
    isIP: <span class="hljs-literal">true</span>,               <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x5408;&#x6CD5;IP&#x5730;&#x5740;</span>
    isIPv4: <span class="hljs-literal">true</span>,             <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x5408;&#x6CD5;IPv4&#x5730;&#x5740;</span>
    isIPv6: <span class="hljs-literal">true</span>,             <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x5408;&#x6CD5;IPv6&#x5730;&#x5740;</span>
    isAlpha: <span class="hljs-literal">true</span>,            <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x5B57;&#x6BCD;</span>
    isAlphanumeric: <span class="hljs-literal">true</span>,     <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x6570;&#x5B57;&#x548C;&#x5B57;&#x6BCD;</span>
    isNumeric: <span class="hljs-literal">true</span>,          <span class="hljs-comment">// &#x53EA;&#x5141;&#x8BB8;&#x6570;&#x5B57;</span>
    isInt: <span class="hljs-literal">true</span>,              <span class="hljs-comment">// &#x53EA;&#x5141;&#x8BB8;&#x6574;&#x6570;</span>
    isFloat: <span class="hljs-literal">true</span>,            <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x6D6E;&#x70B9;&#x6570;</span>
    isDecimal: <span class="hljs-literal">true</span>,          <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x5341;&#x8FDB;&#x5236;&#x4E66;</span>
    isLowercase: <span class="hljs-literal">true</span>,        <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x5C0F;&#x5199;</span>
    isUppercase: <span class="hljs-literal">true</span>,        <span class="hljs-comment">// &#x662F;&#x5426;&#x5927;&#x5199;</span>
    notNull: <span class="hljs-literal">true</span>,            <span class="hljs-comment">// &#x4E0D;&#x5141;&#x8BB8;&#x4E3A;null</span>
    isNull: <span class="hljs-literal">true</span>,             <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;null</span>
    notEmpty: <span class="hljs-literal">true</span>,           <span class="hljs-comment">// &#x4E0D;&#x5141;&#x8BB8;&#x4E3A;&#x7A7A;</span>
    equals: <span class="hljs-string">&apos;specific value&apos;</span>, <span class="hljs-comment">// &#x7B49;&#x4E8E;&#x67D0;&#x4E9B;&#x503C;</span>
    contains: <span class="hljs-string">&apos;foo&apos;</span>,          <span class="hljs-comment">// &#x5305;&#x542B;&#x67D0;&#x4E9B;&#x5B57;&#x7B26;</span>
    notIn: [[<span class="hljs-string">&apos;foo&apos;</span>, <span class="hljs-string">&apos;bar&apos;</span>]],  <span class="hljs-comment">// &#x4E0D;&#x5728;&#x5217;&#x8868;&#x4E2D;</span>
    isIn: [[<span class="hljs-string">&apos;foo&apos;</span>, <span class="hljs-string">&apos;bar&apos;</span>]],   <span class="hljs-comment">// &#x5728;&#x5217;&#x8868;&#x4E2D;</span>
    notContains: <span class="hljs-string">&apos;bar&apos;</span>,       <span class="hljs-comment">// &#x4E0D;&#x5305;&#x542B;</span>
    len: [<span class="hljs-number">2</span>,<span class="hljs-number">10</span>],              <span class="hljs-comment">// &#x957F;&#x5EA6;&#x8303;&#x56F4;</span>
    isUUID: <span class="hljs-number">4</span>,                <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x5408;&#x6CD5; uuids</span>
    isDate: <span class="hljs-literal">true</span>,             <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x6709;&#x6548;&#x65E5;&#x671F;</span>
    isAfter: <span class="hljs-string">&quot;2011-11-05&quot;</span>,    <span class="hljs-comment">// &#x662F;&#x5426;&#x665A;&#x4E8E;&#x67D0;&#x4E2A;&#x65E5;&#x671F;</span>
    isBefore: <span class="hljs-string">&quot;2011-11-05&quot;</span>,   <span class="hljs-comment">// &#x662F;&#x5426;&#x65E9;&#x4E8E;&#x67D0;&#x4E2A;&#x65E5;&#x671F;</span>
    max: <span class="hljs-number">23</span>,                  <span class="hljs-comment">// &#x6700;&#x5927;&#x503C;</span>
    min: <span class="hljs-number">23</span>,                  <span class="hljs-comment">// &#x6700;&#x5C0F;&#x503C;</span>
    isArray: <span class="hljs-literal">true</span>,            <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x6570;&#x7EC4;</span>
    isCreditCard: <span class="hljs-literal">true</span>,       <span class="hljs-comment">// &#x662F;&#x5426;&#x662F;&#x6709;&#x6548;&#x4FE1;&#x7528;&#x5361;&#x53F7;</span>
    <span class="hljs-comment">// &#x81EA;&#x5B9A;&#x4E49;&#x89C4;&#x5219;</span>
    isEven: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">parseInt</span>(value) % <span class="hljs-number">2</span> != <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x5076;&#x6570;!&apos;</span>)
    }
}</code></pre><h2 id="articleHeader5">API&#x7565;&#x8BB2;</h2><p>Sequelize&#x7684;API&#x57FA;&#x672C;&#x8986;&#x76D6;&#x4E86;&#x5E38;&#x7528;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF0C;&#x5176;&#x4E2D;&#x5355;&#x8868;&#x67E5;&#x8BE2;&#x5E38;&#x7528;&#x7684;&#x6709;&#x4E00;&#x4E0B;&#x51E0;&#x79CD;&#x3002;&#x590D;&#x6742;&#x7684;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x66F4;&#x591A;&#x7684;API&#x3002;</p><h3 id="articleHeader6">&#x67E5;&#x8BE2;&#x591A;&#x6761; findAll(opts) &#x6216;&#x8005; all(opts)</h3><p>&#x67E5;&#x8BE2;&#x7528;&#x7684;&#x53C2;&#x6570;&#x666E;&#x904D;&#x901A;&#x7528;&#xFF0C;&#x53EA;&#x6709;&#x90E8;&#x5206;API&#x7684;&#x6709;&#x7279;&#x6B8A;&#x53C2;&#x6570;&#x3002;&#x8FD9;&#x91CC;&#x5C55;&#x793A;&#x4E00;&#x6B21;&#x5E38;&#x7528;&#x53C2;&#x6570;&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x7565;&#x8FC7;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let list = await model.findAll({
    where:{
        id:{$gt:10},//id&#x5927;&#x4E8E;10&#x7684;
        name:&quot;test&quot;  //name&#x7B49;&#x4E8E;test
    },
    order:[
        &quot;id&quot;,   //&#x6839;&#x636E;id&#x6392;&#x5E8F;
        [&quot;id&quot;,&quot;desc&quot;]//&#x6839;&#x636E;id&#x5012;&#x5E8F;
    ],
    limit:10,//&#x8FD4;&#x56DE;&#x4E2A;&#x6570;
    offset:20,//&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;,&#x8DF3;&#x8FC7;&#x6570;&#x91CF;
    attributes:[&quot;attr1&quot;,&quot;attr2&quot;], //&#x8FD4;&#x56DE;&#x7684;&#x5B57;&#x6BB5;
});
//select attr1,attr2 from model where ......" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> list = <span class="hljs-keyword">await</span> model.findAll({
    <span class="hljs-attr">where</span>:{
        <span class="hljs-attr">id</span>:{<span class="hljs-attr">$gt</span>:<span class="hljs-number">10</span>},<span class="hljs-comment">//id&#x5927;&#x4E8E;10&#x7684;</span>
        name:<span class="hljs-string">&quot;test&quot;</span>  <span class="hljs-comment">//name&#x7B49;&#x4E8E;test</span>
    },
    <span class="hljs-attr">order</span>:[
        <span class="hljs-string">&quot;id&quot;</span>,   <span class="hljs-comment">//&#x6839;&#x636E;id&#x6392;&#x5E8F;</span>
        [<span class="hljs-string">&quot;id&quot;</span>,<span class="hljs-string">&quot;desc&quot;</span>]<span class="hljs-comment">//&#x6839;&#x636E;id&#x5012;&#x5E8F;</span>
    ],
    <span class="hljs-attr">limit</span>:<span class="hljs-number">10</span>,<span class="hljs-comment">//&#x8FD4;&#x56DE;&#x4E2A;&#x6570;</span>
    offset:<span class="hljs-number">20</span>,<span class="hljs-comment">//&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;,&#x8DF3;&#x8FC7;&#x6570;&#x91CF;</span>
    attributes:[<span class="hljs-string">&quot;attr1&quot;</span>,<span class="hljs-string">&quot;attr2&quot;</span>], <span class="hljs-comment">//&#x8FD4;&#x56DE;&#x7684;&#x5B57;&#x6BB5;</span>
});
<span class="hljs-comment">//select attr1,attr2 from model where ......</span></code></pre><h3 id="articleHeader7">&#x901A;&#x8FC7;id&#x67E5;&#x8BE2; findById(id,opts)</h3><p>&#x8FD9;&#x91CC;&#x9ED8;&#x8BA4;&#x6570;&#x636E;&#x7684;&#x4E3B;&#x952E;&#x662F;id&#xFF0C;&#x67E5;&#x8BE2;&#x7684;&#x65F6;&#x5019;&#x76F4;&#x63A5;&#x901A;&#x8FC7;id&#x67E5;&#x8BE2;&#x6570;&#x636E;&#x3002;&#x8FD9;&#x91CC;&#x63A8;&#x8350;&#x5728;&#x65B0;&#x5EFA;&#x6570;&#x636E;&#x5E93;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;id&#x4F5C;&#x4E3A;&#x552F;&#x4E00;&#x4E3B;&#x952E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let model = await model.findById(12);
//select a,b,c from model where id=12;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> model = <span class="hljs-keyword">await</span> model.findById(<span class="hljs-number">12</span>);
<span class="hljs-comment">//select a,b,c from model where id=12;</span></code></pre><h3 id="articleHeader8">&#x67E5;&#x8BE2;&#x4E00;&#x6761;&#x8BB0;&#x5F55; findOne(opts)</h3><p>&#x6839;&#x636E;&#x6761;&#x4EF6;&#x67E5;&#x8BE2;&#x8BB0;&#x5F55;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;&#x6761;&#x4EF6;&#x4E00;&#x5B9A;&#x8981;&#x586B;&#x5199;&#xFF0C;&#x4E0D;&#x7136;&#x5C31;&#x662F;&#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x6761;&#x6570;&#x636E;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let model = await model.findOne({
    where:{id:12}
});
//select a,b,c from model where id=12;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> model = <span class="hljs-keyword">await</span> model.findOne({
    <span class="hljs-attr">where</span>:{<span class="hljs-attr">id</span>:<span class="hljs-number">12</span>}
});
<span class="hljs-comment">//select a,b,c from model where id=12;</span></code></pre><h3 id="articleHeader9">&#x5206;&#x9875;&#x67E5;&#x8BE2; findAndCount(opts) &#x6216;&#x8005; findAndCountAll</h3><p>&#x5206;&#x9875;&#x67E5;&#x8BE2;&#x6050;&#x6015;&#x662F;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x5E38;&#x7528;&#x65B9;&#x6CD5;&#x4E86;&#x3002;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x5217;&#x8868;&#x90FD;&#x6709;&#x9700;&#x8981;&#x5206;&#x9875;&#x7684;&#x65F6;&#x5019;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4F1A;&#x540C;&#x65F6;&#x6267;&#x884C;2&#x8DF3;&#x8BED;&#x53E5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = await model.findAndCount({
    limit:10,//&#x6BCF;&#x9875;10&#x6761;
    offset:0*10,//&#x7B2C;x&#x9875;*&#x6BCF;&#x9875;&#x4E2A;&#x6570;
    where:{}
});
let list = data.rows;
let count = data.count;
//select count(*) from model where ...;
//select a,b,c from model where .... limit 0,10;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> model.findAndCount({
    <span class="hljs-attr">limit</span>:<span class="hljs-number">10</span>,<span class="hljs-comment">//&#x6BCF;&#x9875;10&#x6761;</span>
    offset:<span class="hljs-number">0</span>*<span class="hljs-number">10</span>,<span class="hljs-comment">//&#x7B2C;x&#x9875;*&#x6BCF;&#x9875;&#x4E2A;&#x6570;</span>
    where:{}
});
<span class="hljs-keyword">let</span> list = data.rows;
<span class="hljs-keyword">let</span> count = data.count;
<span class="hljs-comment">//select count(*) from model where ...;</span>
<span class="hljs-comment">//select a,b,c from model where .... limit 0,10;</span></code></pre><h3 id="articleHeader10">&#x6DFB;&#x52A0;&#x65B0;&#x6570;&#x636E; create(model,opts)</h3><p>&#x6DFB;&#x52A0;&#x5C31;&#x975E;&#x5E38;&#x7684;&#x81EA;&#x5728;&#x4E86;&#x3002;&#x7B80;&#x5355;&#x7684;&#x53EA;&#x9700;&#x8981;&#x4F20;&#x5165;model&#x5BF9;&#x8C61;&#x5373;&#x53EF;&#x3002;&#x8FD9;&#x91CC;&#x8981;&#x4FDD;&#x8BC1;model&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x5B57;&#x6BB5;&#x540D;&#x8981;&#x4E00;&#x81F4;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x4E00;&#x81F4;&#x5C31;&#x4F1A;&#x51FA;&#x9519;&#x3002;&#x4E5F;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x914D;&#x7F6E;&#x53C2;&#x6570;&#x6765;&#x589E;&#x52A0;&#x6761;&#x4EF6;&#x7B49;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let model= {
    name:&quot;test&quot;,
    token:&quot;adwadfv2324&quot;
}
 await model.create(model);
//insert into model (name,token) values(&quot;test&quot;,&quot;adwadfv2324&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> model= {
    <span class="hljs-attr">name</span>:<span class="hljs-string">&quot;test&quot;</span>,
    <span class="hljs-attr">token</span>:<span class="hljs-string">&quot;adwadfv2324&quot;</span>
}
 <span class="hljs-keyword">await</span> model.create(model);
<span class="hljs-comment">//insert into model (name,token) values(&quot;test&quot;,&quot;adwadfv2324&quot;);</span></code></pre><h3 id="articleHeader11">&#x67E5;&#x8BE2;,&#x4E0D;&#x5B58;&#x5728;&#x5C31;&#x8FD4;&#x56DE;&#x9ED8;&#x8BA4;&#x5BF9;&#x8C61; findOrInitialize(opts)</h3><p>opts.default &#x9ED8;&#x8BA4;&#x503C;&#x5BF9;&#x8C61;</p><p>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x9996;&#x5148;&#x4F1A;&#x67E5;&#x8BE2;&#x6570;&#x636E;&#x5E93;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x7ED3;&#x679C;&#x5C31;&#x4F1A;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#x4E2D;&#x7684;default&#x5BF9;&#x8C61;&#x3002;&#x8FD9;&#x4E2A;&#x6BD4;&#x8F83;&#x9002;&#x5408;&#x8FD4;&#x56DE;&#x9ED8;&#x8BA4;&#x5BF9;&#x8C61;&#x4E4B;&#x7C7B;&#x7684;&#x573A;&#x666F;&#x3002;</p><h3 id="articleHeader12">&#x67E5;&#x8BE2;,&#x4E0D;&#x5B58;&#x5728;&#x5C31;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; findOrCreate(opts)&#x6216;&#x8005;findCreateFind</h3><p>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x7528;&#x5230;&#x7684;&#x60C5;&#x51B5;&#x4E5F;&#x6BD4;&#x8F83;&#x591A;&#x3002;&#x901A;&#x5E38;&#x7528;&#x4E8E;&#x81EA;&#x52A8;&#x521B;&#x5EFA;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x6570;&#x636E;&#x3002;&#x76F4;&#x63A5;&#x5C31;&#x8FD4;&#x56DE;&#x4E86;&#x9ED8;&#x8BA4;&#x503C;&#x3002;</p><h3 id="articleHeader13">&#x6709;&#x5219;&#x66F4;&#x65B0;,&#x65E0;&#x5219;&#x6DFB;&#x52A0; upsert(model,opts) &#x6216;&#x8005; insertOrUpdate(model,opts)</h3><p>&#x6839;&#x636E;&#x4E3B;&#x952E;&#x6216;&#x8005;&#x552F;&#x4E00;&#x7EA6;&#x675F;&#x952E;&#x5339;&#x914D;</p><p>&#x5E38;&#x7528;&#x4E8E;&#x7F16;&#x8F91;&#x7684;&#x65F6;&#x5019;&#x6DFB;&#x52A0;&#x6216;&#x8005;&#x66F4;&#x65B0;&#x7EDF;&#x4E00;&#x64CD;&#x4F5C;&#x3002;</p><h3 id="articleHeader14">&#x66F4;&#x65B0;&#x8BB0;&#x5F55; update(model,opts)</h3><p>&#x5C31;&#x662F;&#x6700;&#x5E38;&#x7528;&#x7684;&#x66F4;&#x65B0;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x8981;&#x66F4;&#x65B0;&#x7684;model&#x5BF9;&#x8C61;&#xFF0C;&#x540C;&#x65F6;&#x7528;&#x914D;&#x7F6E;&#x53C2;&#x6570;&#x6709;&#x6761;&#x4EF6;&#x7684;&#x533A;&#x522B;&#x8981;&#x66F4;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p><h3 id="articleHeader15">&#x5220;&#x9664;&#x8BB0;&#x5F55; destroy(opts)</h3><p>&#x5220;&#x9664;&#x6709;2&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x4E00;&#x79CD;&#x662F;&#x7269;&#x7406;&#x5220;&#x9664;&#x3002;&#x5220;&#x9664;&#x5C31;&#x4ECE;&#x8868;&#x4E2D;&#x4E0D;&#x5B58;&#x5728;&#x4E86;&#x3002;&#x53E6;&#x5916;&#x4E00;&#x79CD;&#x5C31;&#x662F;&#x8BBE;&#x7F6E;paranoid&#xFF0C;&#x8FD9;&#x4E2A;&#x662F;&#x865A;&#x62DF;&#x5220;&#x9664;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E00;&#x4E2A;&#x5B57;&#x6BB5;&#x8868;&#x793A;&#x6570;&#x636E;&#x662F;&#x5426;&#x5220;&#x9664;&#xFF0C;&#x67E5;&#x8BE2;&#x7684;&#x65F6;&#x5019;&#x53BB;&#x6389;&#x8FD9;&#x4E2A;&#x6761;&#x4EF6;&#x5373;&#x53EF;&#x67E5;&#x8BE2;&#x5230;&#x5220;&#x9664;&#x7684;&#x6570;&#x636E;&#x3002;</p><h3 id="articleHeader16">&#x6062;&#x590D;&#x8BB0;&#x5F55; restore(opts)</h3><p>&#x6062;&#x590D;&#x591A;&#x4E2A;&#x5B9E;&#x4F8B;&#xFF0C;&#x5F53;&#x542F;&#x7528;paranoid&#x65F6;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5C06;&#x66FE;&#x4ECA;&#x5220;&#x9664;&#x7684;&#x6570;&#x636E;&#x6062;&#x590D;&#x4E86;&#x3002;</p><h3 id="articleHeader17">&#x5176;&#x4ED6;&#x5E38;&#x7528;API</h3><ol><li>&#x6307;&#x5B9A;&#x5B57;&#x6BB5;&#x67E5;&#x8BE2;&#x6700;&#x5927;&#x503C; max(&quot;id&quot;,opts)</li><li>&#x6307;&#x5B9A;&#x5B57;&#x6BB5;&#x67E5;&#x8BE2;&#x6700;&#x5C0F;&#x503C; min(&quot;id&quot;,opts)</li><li>&#x6C42;&#x548C; sum(&quot;id&quot;,opts)</li><li>&#x6279;&#x91CF;&#x6DFB;&#x52A0; bulkCreate([model],opts)</li><li>&#x67E5;&#x8868;&#x7ED3;&#x6784;&#x7684;&#x4FE1;&#x606F; describe()</li><li>&#x9012;&#x589E; increment(&quot;id&quot;,{by:1})</li><li>&#x9012;&#x51CF; decrement(&quot;id&quot;,{by:1})</li><li>&#x7EDF;&#x8BA1;&#x67E5;&#x8BE2;&#x4E2A;&#x6570; count(opts)</li></ol><h2 id="articleHeader18">&#x4E8B;&#x52A1;</h2><p>Sequelize&#x4E2D;&#x7684;&#x4E8B;&#x52A1;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#x3002;&#x4F46;&#x662F;&#x5982;&#x679C;&#x6709;&#x591A;&#x4E2A;&#x4E8B;&#x52A1;&#x7684;&#x8BDD;&#x5199;&#x51FA;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x4F1A;&#x975E;&#x5E38;&#x7684;&#x96BE;&#x770B;&#x3002;&#x8FD9;&#x4E5F;&#x7B97;&#x662F;Sequelize&#x4F18;&#x5316;&#x7684;&#x6BD4;&#x8F83;&#x5DEE;&#x7684;&#x5730;&#x65B9;&#x4E86;&#x3002;</p><p>&#x9700;&#x8981;&#x8BB0;&#x5F97;transaction&#x53C2;&#x6570;&#x8981;&#x4E00;&#x81F4;&#x4F20;&#x9012;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;&#x5176;&#x4ED6;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6B63;&#x5E38;&#x7684;Promise&#x8C03;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x8C03;&#x7528;Sequelize&#x521D;&#x59CB;&#x5316;&#x4E4B;&#x540E;&#x7684;sequelize&#x5BF9;&#x8C61;
return sequelize.transaction(function (t) {
    //&#x8FD4;&#x56DE;&#x6700;&#x7EC8;&#x7684;Promise
  return User.create({
    firstName: &apos;Abraham&apos;,
    lastName: &apos;Lincoln&apos;
  }, {transaction: t}).then(function (user) {
    return user.setShooter({
      firstName: &apos;John&apos;,
      lastName: &apos;Boothe&apos;
    }, {transaction: t});
  });
}).then(function (result) {
  //&#x4E3B;&#x52A8;&#x8C03;&#x7528;commit&#x63D0;&#x4EA4;&#x7ED3;&#x679C;
  return t.commit();
}).catch(function (err) {
  //&#x4E3B;&#x52A8;&#x56DE;&#x6EDA;&#x64CD;&#x4F5C;
  return t.rollback();
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x8C03;&#x7528;Sequelize&#x521D;&#x59CB;&#x5316;&#x4E4B;&#x540E;&#x7684;sequelize&#x5BF9;&#x8C61;</span>
<span class="hljs-keyword">return</span> sequelize.transaction(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">t</span>) </span>{
    <span class="hljs-comment">//&#x8FD4;&#x56DE;&#x6700;&#x7EC8;&#x7684;Promise</span>
  <span class="hljs-keyword">return</span> User.create({
    <span class="hljs-attr">firstName</span>: <span class="hljs-string">&apos;Abraham&apos;</span>,
    <span class="hljs-attr">lastName</span>: <span class="hljs-string">&apos;Lincoln&apos;</span>
  }, {<span class="hljs-attr">transaction</span>: t}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">user</span>) </span>{
    <span class="hljs-keyword">return</span> user.setShooter({
      <span class="hljs-attr">firstName</span>: <span class="hljs-string">&apos;John&apos;</span>,
      <span class="hljs-attr">lastName</span>: <span class="hljs-string">&apos;Boothe&apos;</span>
    }, {<span class="hljs-attr">transaction</span>: t});
  });
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">result</span>) </span>{
  <span class="hljs-comment">//&#x4E3B;&#x52A8;&#x8C03;&#x7528;commit&#x63D0;&#x4EA4;&#x7ED3;&#x679C;</span>
  <span class="hljs-keyword">return</span> t.commit();
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
  <span class="hljs-comment">//&#x4E3B;&#x52A8;&#x56DE;&#x6EDA;&#x64CD;&#x4F5C;</span>
  <span class="hljs-keyword">return</span> t.rollback();
});</code></pre><h2 id="articleHeader19">&#x591A;&#x8868;&#x8054;&#x67E5;</h2><p>&#x5916;&#x952E;&#x53EF;&#x80FD;&#x7B97;&#x662F;Sequelize&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x96BE;&#x70B9;&#x4E86;&#x3002;&#x8FD9;&#x91CC;&#x6D89;&#x53CA;&#x7684;&#x4E1C;&#x897F;&#x7A0D;&#x5FAE;&#x591A;&#x4E00;&#x70B9;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x6162;&#x6162;&#x634B;&#x4E00;&#x904D;&#x3002;</p><h3 id="articleHeader20">&#x5916;&#x952E;&#x77E5;&#x8BC6;&#x70B9;</h3><p>&#x5916;&#x952E;&#x7684;&#x5B9A;&#x5236;&#x4F5C;&#x7528;----&#x4E09;&#x79CD;&#x7EA6;&#x675F;&#x6A21;&#x5F0F;&#xFF1A;</p><ol><li>district&#xFF1A;&#x4E25;&#x683C;&#x6A21;&#x5F0F;(&#x9ED8;&#x8BA4;), &#x7236;&#x8868;&#x4E0D;&#x80FD;&#x5220;&#x9664;&#x6216;&#x66F4;&#x65B0;&#x4E00;&#x4E2A;&#x88AB;&#x5B50;&#x8868;&#x5F15;&#x7528;&#x7684;&#x8BB0;&#x5F55;&#x3002;</li><li>cascade&#xFF1A;&#x7EA7;&#x8054;&#x6A21;&#x5F0F;, &#x7236;&#x8868;&#x64CD;&#x4F5C;&#x540E;&#xFF0C;&#x5B50;&#x8868;&#x5173;&#x8054;&#x7684;&#x6570;&#x636E;&#x4E5F;&#x8DDF;&#x7740;&#x4E00;&#x8D77;&#x64CD;&#x4F5C;&#x3002;&#x4E5F;&#x662F;Sequelize&#x7684;&#x9ED8;&#x8BA4;&#x6A21;&#x5F0F;&#x3002;</li><li>set null&#xFF1A;&#x7F6E;&#x7A7A;&#x6A21;&#x5F0F;,&#x524D;&#x63D0;&#x5916;&#x952E;&#x5B57;&#x6BB5;&#x5141;&#x8BB8;&#x4E3A;NLL, &#x7236;&#x8868;&#x64CD;&#x4F5C;&#x540E;&#xFF0C;&#x5B50;&#x8868;&#x5BF9;&#x5E94;&#x7684;&#x5B57;&#x6BB5;&#x88AB;&#x7F6E;&#x7A7A;&#x3002;</li></ol><h3 id="articleHeader21">&#x4F7F;&#x7528;&#x5916;&#x952E;&#x7684;&#x524D;&#x63D0;</h3><p>&#x5728;Sequelize&#x4E2D;&#x4F7F;&#x7528;&#x5916;&#x952E;&#x9700;&#x8981;&#x63D0;&#x524D;&#x68C0;&#x67E5;&#x4E00;&#x4E0B;&#x4E0B;&#x9762;&#x7684;&#x8FD9;&#x4E9B;&#x9009;&#x9879;&#xFF0C;&#x91CC;&#x9762;&#x6709;&#x4E00;&#x6761;&#x51FA;&#x9519;&#x5C31;&#x4F1A;&#x5BFC;&#x81F4;&#x8BBE;&#x7F6E;&#x5931;&#x8D25;&#x3002;</p><ol><li>&#x8868;&#x50A8;&#x5B58;&#x5F15;&#x64CE;&#x5FC5;&#x987B;&#x662F;innodb&#xFF0C;&#x5426;&#x5219;&#x521B;&#x5EFA;&#x7684;&#x5916;&#x952E;&#x65E0;&#x7EA6;&#x675F;&#x6548;&#x679C;&#x3002;</li><li>&#x5916;&#x952E;&#x7684;&#x5217;&#x7C7B;&#x578B;&#x5FC5;&#x987B;&#x4E0E;&#x7236;&#x8868;&#x7684;&#x4E3B;&#x952E;&#x7C7B;&#x578B;&#x5B8C;&#x5168;&#x4E00;&#x81F4;&#x3002;</li><li>&#x5916;&#x952E;&#x7684;&#x540D;&#x5B57;&#x4E0D;&#x80FD;&#x91CD;&#x590D;&#x3002;</li><li>&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x6570;&#x636E;&#x7684;&#x5B57;&#x6BB5;&#x88AB;&#x8BBE;&#x4E3A;&#x5916;&#x952E;&#x65F6;&#xFF0C;&#x5FC5;&#x987B;&#x4FDD;&#x8BC1;&#x5B57;&#x6BB5;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x4E0E;&#x7236;&#x8868;&#x7684;&#x4E3B;&#x952E;&#x6570;&#x636E;&#x5BF9;&#x5E94;&#x8D77;&#x6765;&#x3002;</li></ol><h3 id="articleHeader22">&#x4F7F;&#x7528;&#x793A;&#x4F8B;---&#x9ED8;&#x8BA4;</h3><p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4E3B;&#x952E;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x4E3B;&#x8868;&#x7684;id&#x5B57;&#x6BB5;&#xFF0C;&#x5916;&#x952E;&#x662F;&#x4F7F;&#x7528;&#x7684;&#x6309;&#x7167;table+&#x5B57;&#x6BB5;&#x7684;&#x65B9;&#x5F0F;&#x5EFA;&#x7ACB;&#x7684;&#x5916;&#x952E;&#x3002;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x9700;&#x8981;&#x624B;&#x52A8;&#x6307;&#x5B9A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x4E3B;&#x8868;&#x6307;&#x5B9A;&#x5173;&#x7CFB;
 test1.hasMany(test2, {
     foreignKey: &quot;pid&quot;,//&#x5916;&#x952E;&#x540D;&#x79F0;
 });
 //&#x5B50;&#x8868;&#x6307;&#x5B9A;&#x5173;&#x7CFB;
 test2.belongsTo(test1, {
     foreignKey: &quot;pid&quot;,//&#x5916;&#x952E;&#x540D;&#x79F0;
 });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x4E3B;&#x8868;&#x6307;&#x5B9A;&#x5173;&#x7CFB;</span>
 test1.hasMany(test2, {
     <span class="hljs-attr">foreignKey</span>: <span class="hljs-string">&quot;pid&quot;</span>,<span class="hljs-comment">//&#x5916;&#x952E;&#x540D;&#x79F0;</span>
 });
 <span class="hljs-comment">//&#x5B50;&#x8868;&#x6307;&#x5B9A;&#x5173;&#x7CFB;</span>
 test2.belongsTo(test1, {
     <span class="hljs-attr">foreignKey</span>: <span class="hljs-string">&quot;pid&quot;</span>,<span class="hljs-comment">//&#x5916;&#x952E;&#x540D;&#x79F0;</span>
 });</code></pre><p>&#x9ED8;&#x8BA4;&#x5C31;&#x4F1A;&#x5728;&#x5B50;&#x8868;&#x4E2D;&#x6DFB;&#x52A0;&#x4E00;&#x6761;&#x5916;&#x952E;&#x8BB0;&#x5F55;&#xFF0C;&#x6307;&#x5411;&#x7684;&#x5C31;&#x662F;&#x4E3B;&#x8868;&#x7684;id&#x3002;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x8FD9;&#x6837;&#x5C31;&#x80FD;&#x591F;&#x6EE1;&#x8DB3;&#x6B63;&#x5E38;&#x7684;&#x4F7F;&#x7528;&#x4E86;&#x3002;&#x6BD4;&#x5982;&#x4E00;&#x4E2A;&#x4E3B;&#x8868;&#x8BB0;&#x5F55;&#x5546;&#x54C1;&#x4FE1;&#x606F;&#xFF0C;&#x4E00;&#x4E2A;&#x5B50;&#x8868;&#x8BB0;&#x5F55;&#x591A;&#x4E2A;&#x8BC4;&#x8BBA;&#x6D88;&#x606F;&#x3002;</p><h3 id="articleHeader23">&#x4F7F;&#x7528;&#x793A;&#x4F8B;---&#x81EA;&#x5B9A;&#x4E49;</h3><p>&#x5982;&#x679C;&#x4E3B;&#x8868;&#x4F7F;&#x7528;&#x7684;&#x4E3B;&#x952E;id&#x5E76;&#x4E0D;&#x80FD;&#x6EE1;&#x8DB3;&#x6B63;&#x5E38;&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x67D0;&#x4E00;&#x4E2A;&#x56FA;&#x5B9A;&#x7684;&#x5B57;&#x6BB5;&#x4F5C;&#x4E3A;&#x4E3B;&#x8868;&#x4E2D;&#x7684;&#x7EA6;&#x675F;&#x5173;&#x7CFB;&#x3002;</p><blockquote>tips&#xFF1A;&#x4E3B;&#x8868;&#x4E2D;&#x5982;&#x679C;&#x4E0D;&#x662F;&#x4F7F;&#x7528;id&#x4F5C;&#x4E3A;&#x4E3B;&#x8981;&#x5173;&#x7CFB;&#xFF0C;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5B57;&#x6BB5;&#x5FC5;&#x987B;&#x6DFB;&#x52A0;&#x7D22;&#x5F15;&#x7B49;&#x6761;&#x4EF6;&#xFF0C;&#x4F5C;&#x4E3A;&#x4F9D;&#x8D56;&#x4E2D;&#x7684;&#x5173;&#x7CFB;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" test1.hasMany(test2, {
     foreignKey: &quot;pid&quot;,//&#x5916;&#x952E;&#x5B57;&#x6BB5;&#x540D;
     sourceKey: &quot;pid&quot;,//&#x4E3B;&#x952E;&#x5B57;&#x6BB5;&#x540D;
 });
 test2.belongsTo(test1, {
     foreignKey: &quot;pid&quot;,//&#x5173;&#x8054;&#x540D;
     targetKey:&quot;pid&quot;//&#x81EA;&#x5B9A;&#x4E49;&#x5916;&#x952E;&#x5B57;&#x6BB5;
 });
 //&#x7B49;&#x5F85;&#x4E3B;&#x952E;&#x5EFA;&#x7ACB;&#x6210;&#x529F;&#x518D;&#x5EFA;&#x7ACB;&#x5B50;&#x8868;&#x7684;&#x5916;&#x952E;&#x5173;&#x7CFB;
 setTimeout(() =&gt; {
    test2.sync({
        force: true
    });
}, 2500);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"> test1.hasMany(test2, {
     <span class="hljs-attr">foreignKey</span>: <span class="hljs-string">&quot;pid&quot;</span>,<span class="hljs-comment">//&#x5916;&#x952E;&#x5B57;&#x6BB5;&#x540D;</span>
     sourceKey: <span class="hljs-string">&quot;pid&quot;</span>,<span class="hljs-comment">//&#x4E3B;&#x952E;&#x5B57;&#x6BB5;&#x540D;</span>
 });
 test2.belongsTo(test1, {
     <span class="hljs-attr">foreignKey</span>: <span class="hljs-string">&quot;pid&quot;</span>,<span class="hljs-comment">//&#x5173;&#x8054;&#x540D;</span>
     targetKey:<span class="hljs-string">&quot;pid&quot;</span><span class="hljs-comment">//&#x81EA;&#x5B9A;&#x4E49;&#x5916;&#x952E;&#x5B57;&#x6BB5;</span>
 });
 <span class="hljs-comment">//&#x7B49;&#x5F85;&#x4E3B;&#x952E;&#x5EFA;&#x7ACB;&#x6210;&#x529F;&#x518D;&#x5EFA;&#x7ACB;&#x5B50;&#x8868;&#x7684;&#x5916;&#x952E;&#x5173;&#x7CFB;</span>
 setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    test2.sync({
        <span class="hljs-attr">force</span>: <span class="hljs-literal">true</span>
    });
}, <span class="hljs-number">2500</span>);</code></pre><h3 id="articleHeader24">&#x4F7F;&#x7528;&#x793A;&#x4F8B;---&#x4F2A;&#x5173;&#x7CFB;</h3><p>&#x5B9E;&#x9645;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x6211;&#x8FD8;&#x662F;&#x503E;&#x5411;&#x4E8E;&#x8FD9;&#x79CD;&#x5173;&#x7CFB;&#x3002;&#x5373;&#x8868;&#x4E2D;&#x5173;&#x7CFB;&#x5DF2;&#x5B9A;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x4EC5;&#x4EC5;&#x6307;&#x5B9A;&#x5916;&#x952E;&#x5173;&#x7CFB;&#x3002;&#x540C;&#x6B65;&#x7684;&#x65F6;&#x5019;&#x4EC5;&#x4EC5;&#x540C;&#x6B65;&#x8868;&#x5185;&#x5BB9;&#xFF0C;&#x4E0D;&#x540C;&#x6B65;&#x8FD9;&#x4E2A;&#x5916;&#x952E;&#x5173;&#x7CFB;&#x3002;</p><blockquote>&#x771F;&#x6B63;&#x7684;&#x5EFA;&#x7ACB;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x624B;&#x52A8;&#x5EFA;&#x8868;&#x7684;&#x65F6;&#x5019;&#x6DFB;&#x52A0;&#x3002;&#x6216;&#x8005;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x81EA;&#x52A8;&#x5EFA;&#x8868;&#x7ED3;&#x675F;&#x540E;&#x5F02;&#x6B65;&#x518D;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x5916;&#x952E;&#x5173;&#x7CFB;&#x7684;&#x6DFB;&#x52A0;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" test1.hasMany(test2, {
     foreignKey: &quot;pid&quot;,
     sourceKey: &quot;pid&quot;,
     constraints: false //&#x4E0D;&#x540C;&#x6B65;&#x5EFA;&#x7ACB;&#x5916;&#x952E;&#x5173;&#x7CFB;
 });
 test2.belongsTo(test1, {
     foreignKey: &quot;pid&quot;,
     targetKey:&quot;pid&quot;,
     constraints: false //&#x4E0D;&#x540C;&#x6B65;&#x5EFA;&#x7ACB;&#x5916;&#x952E;&#x5173;&#x7CFB;
 });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"> test1.hasMany(test2, {
     <span class="hljs-attr">foreignKey</span>: <span class="hljs-string">&quot;pid&quot;</span>,
     <span class="hljs-attr">sourceKey</span>: <span class="hljs-string">&quot;pid&quot;</span>,
     <span class="hljs-attr">constraints</span>: <span class="hljs-literal">false</span> <span class="hljs-comment">//&#x4E0D;&#x540C;&#x6B65;&#x5EFA;&#x7ACB;&#x5916;&#x952E;&#x5173;&#x7CFB;</span>
 });
 test2.belongsTo(test1, {
     <span class="hljs-attr">foreignKey</span>: <span class="hljs-string">&quot;pid&quot;</span>,
     <span class="hljs-attr">targetKey</span>:<span class="hljs-string">&quot;pid&quot;</span>,
     <span class="hljs-attr">constraints</span>: <span class="hljs-literal">false</span> <span class="hljs-comment">//&#x4E0D;&#x540C;&#x6B65;&#x5EFA;&#x7ACB;&#x5916;&#x952E;&#x5173;&#x7CFB;</span>
 });</code></pre><h2 id="articleHeader25">&#x793A;&#x4F8B;</h2><p>&#x5B9E;&#x9645;&#x7684;&#x64CD;&#x4F5C;&#x90E8;&#x5206;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x770B;github&#x4E2D;&#x7684;test.js&#x3002;<a href="https://github.com/cuo9958/sequelize-api" rel="nofollow noreferrer" target="_blank">github&#x5730;&#x5740;</a></p><h3 id="articleHeader26">&#x5355;&#x8868;&#x64CD;&#x4F5C;</h3><p>Sequelize&#x5728;&#x67E5;&#x8BE2;&#x7ED3;&#x679C;&#x8FD4;&#x56DE;&#x4E4B;&#x540E;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5B83;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x662F;&#x652F;&#x6301;&#x7EE7;&#x7EED;&#x64CD;&#x4F5C;&#x7684;&#xFF0C;&#x5176;&#x4E2D;&#x5177;&#x4F53;&#x7684;&#x503C;&#x5B58;&#x653E;&#x5728;datavalues&#x4E2D;&#x3002;&#x4E0D;&#x8FC7;&#x53EF;&#x4EE5;&#x653E;&#x5FC3;&#x7684;&#x662F;&#x5728;&#x8F6C;&#x5316;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x65F6;&#x5019;&#x662F;&#x4E0D;&#x4F1A;&#x5E26;&#x6709;&#x4EFB;&#x4F55;Sequelize&#x7684;&#x5C5E;&#x6027;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x6839;&#x636E;&#x6761;&#x4EF6;&#x67E5;&#x8BE2;&#x4E00;&#x6761;&#x6570;&#x636E;
let model = await test1.findOne({
    where:{
        id:5,
        name:&quot;test&quot;
    }
});
//&#x4FEE;&#x6539;&#x5176;&#x4E2D;&#x7684;name&#x5B57;&#x6BB5;&#x7684;&#x503C;
model.name=&quot;&#x66F4;&#x65B0;&quot;;
//&#x4FDD;&#x5B58;,&#x4F1A;&#x81EA;&#x52A8;update&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x7684;&#x503C;
model.save();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x6839;&#x636E;&#x6761;&#x4EF6;&#x67E5;&#x8BE2;&#x4E00;&#x6761;&#x6570;&#x636E;</span>
<span class="hljs-keyword">let</span> model = <span class="hljs-keyword">await</span> test1.findOne({
    <span class="hljs-attr">where</span>:{
        <span class="hljs-attr">id</span>:<span class="hljs-number">5</span>,
        <span class="hljs-attr">name</span>:<span class="hljs-string">&quot;test&quot;</span>
    }
});
<span class="hljs-comment">//&#x4FEE;&#x6539;&#x5176;&#x4E2D;&#x7684;name&#x5B57;&#x6BB5;&#x7684;&#x503C;</span>
model.name=<span class="hljs-string">&quot;&#x66F4;&#x65B0;&quot;</span>;
<span class="hljs-comment">//&#x4FDD;&#x5B58;,&#x4F1A;&#x81EA;&#x52A8;update&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x7684;&#x503C;</span>
model.save();</code></pre><h3 id="articleHeader27">&#x8054;&#x67E5;</h3><p>&#x6B63;&#x5E38;&#x7684;&#x4F7F;&#x7528;&#x8FC7;&#x7A0B;&#x4E2D;&#x5F88;&#x5C11;&#x4F1A;&#x8BF4;&#x53EA;&#x9700;&#x8981;&#x67E5;&#x8BE2;&#x4E00;&#x4E2A;&#x8868;&#x5C31;&#x80FD;&#x7ED3;&#x679C;&#x95EE;&#x9898;&#x7684;&#x3002;&#x8FD9;&#x91CC;&#x518D;&#x8BF4;&#x4E00;&#x4E0B;2&#x4E2A;&#x8868;&#x67E5;&#x8BE2;&#x7684;&#x65F6;&#x5019;&#x662F;&#x600E;&#x4E48;&#x4F7F;&#x7528;&#x7684;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x7684;&#x67E5;&#x8BE2;&#x9ED8;&#x8BA4;&#x5DF2;&#x7ECF;&#x505A;&#x597D;&#x4E86;&#x5916;&#x952E;&#x7684;&#x7684;&#x5173;&#x7CFB;&#x3002;&#x4E0D;&#x8FC7;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x505A;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x67E5;&#x8BE2;&#x7684;&#x65F6;&#x5019;&#x6027;&#x80FD;&#x7A0D;&#x5FAE;&#x4E0D;&#x597D;&#x800C;&#x5DF2;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x67E5;&#x8BE2;&#x4E3B;&#x8868;list&#x7684;&#x6570;&#x636E;
//&#x4E00;&#x6761;list&#x4E2D;&#x7684;&#x6570;&#x636E;&#x5BF9;&#x5E94;&#x591A;&#x6761;item&#x4E2D;&#x7684;&#x6570;&#x636E;
 let data = await models.List.findAll({
     where:{id:5},//&#x6761;&#x4EF6;,&#x8FD9;&#x91CC;jiashe&#x53EA;&#x9700;&#x67E5;&#x8BE2;&#x4E00;&#x6761;
     include: [{
         model: models.Item,
         as:&quot;items&quot;,//&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x4FEE;&#x6539;&#x6210;&#x4E00;&#x4E2A;&#x56FA;&#x5B9A;&#x7684;&#x540D;&#x79F0;
     }]
 });
 let list1=data[0];//&#x8FD4;&#x56DE;&#x7684;&#x7B2C;&#x4E00;&#x6761;&#x6570;&#x636E;&#x5C31;&#x662F;&#x8981;&#x67E5;&#x8BE2;&#x7684;&#x6570;&#x636E;
 let list2=list1.items;//&#x8FD4;&#x56DE;&#x5B50;&#x8868;&#x6570;&#x636E;,items&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x540D;&#x79F0;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x67E5;&#x8BE2;&#x4E3B;&#x8868;list&#x7684;&#x6570;&#x636E;</span>
<span class="hljs-comment">//&#x4E00;&#x6761;list&#x4E2D;&#x7684;&#x6570;&#x636E;&#x5BF9;&#x5E94;&#x591A;&#x6761;item&#x4E2D;&#x7684;&#x6570;&#x636E;</span>
 <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> models.List.findAll({
     <span class="hljs-attr">where</span>:{<span class="hljs-attr">id</span>:<span class="hljs-number">5</span>},<span class="hljs-comment">//&#x6761;&#x4EF6;,&#x8FD9;&#x91CC;jiashe&#x53EA;&#x9700;&#x67E5;&#x8BE2;&#x4E00;&#x6761;</span>
     include: [{
         <span class="hljs-attr">model</span>: models.Item,
         <span class="hljs-attr">as</span>:<span class="hljs-string">&quot;items&quot;</span>,<span class="hljs-comment">//&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x4FEE;&#x6539;&#x6210;&#x4E00;&#x4E2A;&#x56FA;&#x5B9A;&#x7684;&#x540D;&#x79F0;</span>
     }]
 });
 <span class="hljs-keyword">let</span> list1=data[<span class="hljs-number">0</span>];<span class="hljs-comment">//&#x8FD4;&#x56DE;&#x7684;&#x7B2C;&#x4E00;&#x6761;&#x6570;&#x636E;&#x5C31;&#x662F;&#x8981;&#x67E5;&#x8BE2;&#x7684;&#x6570;&#x636E;</span>
 <span class="hljs-keyword">let</span> list2=list1.items;<span class="hljs-comment">//&#x8FD4;&#x56DE;&#x5B50;&#x8868;&#x6570;&#x636E;,items&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x540D;&#x79F0;</span></code></pre><h2 id="articleHeader28">&#x603B;&#x7ED3;</h2><p>&#x4E0A;&#x9762;&#x7684;&#x4ECB;&#x7ECD;&#x5DF2;&#x7ECF;&#x89E3;&#x51B3;&#x4E86;&#x5927;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#x7684;&#x67E5;&#x8BE2;&#x7B49;&#x64CD;&#x4F5C;&#x3002;&#x800C;&#x4E14;&#x6211;&#x4E5F;&#x76F8;&#x4FE1;&#xFF0C;&#x771F;&#x7684;&#x9047;&#x5230;&#x4E86;&#x74F6;&#x9888;&#xFF0C;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x5F88;&#x53EF;&#x80FD;&#x4E5F;&#x5E76;&#x4E0D;&#x662F;&#x5728;Sequelize&#x65B9;&#x9762;&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#x4E3B;&#x8981;&#x4E0D;&#x662F;Sequelize&#x7684;&#x95EE;&#x9898;&#x3002;&#x6BD4;&#x5982;&#x5927;&#x6570;&#x636E;&#x91CF;&#x7684;&#x65F6;&#x5019;&#x5206;&#x8868;&#x64CD;&#x4F5C;&#xFF0C;&#x5C31;&#x6D89;&#x53CA;&#x5230;&#x4E86;&#x66F4;&#x591A;&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x3002;</p><p>nodejs&#x5728;&#x505A;&#x540E;&#x7AEF;&#x65B9;&#x9762;&#x8FD8;&#x5904;&#x4E8E;&#x53D1;&#x5C55;&#x9636;&#x6BB5;&#x3002;&#x5E0C;&#x671B;&#x6709;&#x66F4;&#x591A;&#x7684;&#x524D;&#x7AEF;&#x80FD;&#x591F;&#x63A5;&#x89E6;&#x5E76;&#x4E86;&#x89E3;&#x5B83;&#x3002;&#x4E0D;&#x4EC5;&#x4EC5;&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x5BF9;&#x81EA;&#x5DF1;&#x662F;&#x4E00;&#x4E2A;&#x589E;&#x5F3A;&#xFF0C;&#x5728;&#x957F;&#x671F;&#x7684;&#x804C;&#x4E1A;&#x89C4;&#x5212;&#x4E2D;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7684;&#x589E;&#x5F3A;&#x81EA;&#x5DF1;&#x7684;&#x6B66;&#x5668;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Sequelize连接数据库

## 原文链接
[https://segmentfault.com/a/1190000015942694](https://segmentfault.com/a/1190000015942694)


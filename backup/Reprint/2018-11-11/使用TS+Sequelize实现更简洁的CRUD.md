---
title: 使用TS+Sequelize实现更简洁的CRUD
hidden: true
categories: [reprint]
slug: d0383db9
date: 2018-11-11 02:30:06
---

{{< raw >}}
<p>&#x5982;&#x679C;&#x662F;&#x7ECF;&#x5E38;&#x4F7F;&#x7528;Node&#x6765;&#x505A;&#x670D;&#x52A1;&#x7AEF;&#x5F00;&#x53D1;&#x7684;&#x7AE5;&#x978B;&#xFF0C;&#x80AF;&#x5B9A;&#x4E0D;&#x53EF;&#x907F;&#x514D;&#x7684;&#x4F1A;&#x64CD;&#x4F5C;&#x6570;&#x636E;&#x5E93;&#xFF0C;&#x505A;&#x4E00;&#x4E9B;&#x589E;&#x5220;&#x6539;&#x67E5;&#xFF08;<code>CRUD</code>&#xFF0C;<code>Create Read Update Delete</code>&#xFF09;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x4E00;&#x4E9B;&#x7B80;&#x5355;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x7C7B;&#x4F3C;&#x5B9A;&#x65F6;&#x811A;&#x672C;&#x4EC0;&#x4E48;&#x7684;&#xFF0C;&#x53EF;&#x80FD;&#x5C31;&#x76F4;&#x63A5;&#x751F;&#x5199;SQL&#x8BED;&#x53E5;&#x6765;&#x5B9E;&#x73B0;&#x529F;&#x80FD;&#x4E86;&#xFF0C;&#x800C;&#x5982;&#x679C;&#x662F;&#x5728;&#x4E00;&#x4E9B;&#x5927;&#x578B;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x6570;&#x5341;&#x5F20;&#x3001;&#x4E0A;&#x767E;&#x5F20;&#x7684;&#x8868;&#xFF0C;&#x4E4B;&#x95F4;&#x8FD8;&#x4F1A;&#x6709;&#x4E00;&#x4E9B;&#xFF08;&#x4E00;&#x5BF9;&#x591A;&#xFF0C;&#x591A;&#x5BF9;&#x591A;&#xFF09;&#x7684;&#x6620;&#x5C04;&#x5173;&#x7CFB;&#xFF0C;&#x90A3;&#x4E48;&#x5F15;&#x5165;&#x4E00;&#x4E2A;<code>ORM</code>&#xFF08;<code>Object Relational Mapping</code>&#xFF09;&#x5DE5;&#x5177;&#x6765;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x4E0E;&#x6570;&#x636E;&#x5E93;&#x6253;&#x4EA4;&#x9053;&#x5C31;&#x53EF;&#x4EE5;&#x51CF;&#x8F7B;&#x4E00;&#x90E8;&#x5206;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x5DE5;&#x4F5C;&#x91CF;&#xFF0C;<code>Sequelize</code>&#x5C31;&#x662F;&#x5176;&#x4E2D;&#x6BD4;&#x8F83;&#x53D7;&#x6B22;&#x8FCE;&#x7684;&#x4E00;&#x4E2A;&#x3002;</p><h2 id="articleHeader0">CRUD&#x539F;&#x59CB;&#x7248; &#x624B;&#x52A8;&#x62FC;&#x63A5;SQL</h2><p>&#x5148;&#x6765;&#x4E3E;&#x4F8B;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;&#x76F4;&#x63A5;&#x62FC;&#x63A5;<code>SQL</code>&#x8BED;&#x53E5;&#x8FD9;&#x6837;&#x6BD4;&#x8F83;&#x201C;&#x5E95;&#x5C42;&#x201D;&#x7684;&#x64CD;&#x4F5C;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CREATE TABLE animal (
  id INT AUTO_INCREMENT,
  name VARCHAR(14) NOT NULL,
  weight INT NOT NULL, 
  PRIMARY KEY (`id`)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="sql hljs"><code class="sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> animal (
  <span class="hljs-keyword">id</span> <span class="hljs-built_in">INT</span> AUTO_INCREMENT,
  <span class="hljs-keyword">name</span> <span class="hljs-built_in">VARCHAR</span>(<span class="hljs-number">14</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  weight <span class="hljs-built_in">INT</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>, 
  PRIMARY <span class="hljs-keyword">KEY</span> (<span class="hljs-string">`id`</span>)
);</code></pre><p>&#x521B;&#x5EFA;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x5F20;&#x8868;&#xFF0C;&#x4E09;&#x4E2A;&#x5B57;&#x6BB5;&#xFF0C;&#x81EA;&#x589E;ID&#x3001;<code>name</code>&#x4EE5;&#x53CA;<code>weight</code>&#x3002;<br>&#x5982;&#x679C;&#x4F7F;&#x7528;<code>mysql</code>&#x8FD9;&#x4E2A;&#x5305;&#x6765;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;&#x6570;&#x636E;&#x5E93;&#x5927;&#x6982;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const connection = mysql.createConnection({})
const tableName = &apos;animal&apos;

connection.connect()

// &#x6211;&#x4EEC;&#x5047;&#x8BBE;&#x5DF2;&#x7ECF;&#x652F;&#x6301;&#x4E86;Promise

// &#x67E5;&#x8BE2;
const [results] = await connection.query(`
  SELECT 
    id,
    name,
    weight
  FROM ${tableName}
`)

// &#x65B0;&#x589E;
const name = &apos;Niko&apos;
const weight = 70
await connection.query(`
  INSERT INTO ${tableName} (name, weight)
  VALUES (&apos;${name}&apos;, ${weight})
`)
// &#x6216;&#x8005;&#x901A;&#x8FC7;&#x4F20;&#x5165;&#x4E00;&#x4E2A;Object&#x7684;&#x65B9;&#x5F0F;&#x4E5F;&#x53EF;&#x4EE5;&#x505A;&#x5230;
await connection.query(`INSERT INTO ${tableName} SET ?`, {
  name,
  weight
})

connection.end()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> connection = mysql.createConnection({})
<span class="hljs-keyword">const</span> tableName = <span class="hljs-string">&apos;animal&apos;</span>

connection.connect()

<span class="hljs-comment">// &#x6211;&#x4EEC;&#x5047;&#x8BBE;&#x5DF2;&#x7ECF;&#x652F;&#x6301;&#x4E86;Promise</span>

<span class="hljs-comment">// &#x67E5;&#x8BE2;</span>
<span class="hljs-keyword">const</span> [results] = <span class="hljs-keyword">await</span> connection.query(<span class="hljs-string">`
  SELECT 
    id,
    name,
    weight
  FROM <span class="hljs-subst">${tableName}</span>
`</span>)

<span class="hljs-comment">// &#x65B0;&#x589E;</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">&apos;Niko&apos;</span>
<span class="hljs-keyword">const</span> weight = <span class="hljs-number">70</span>
<span class="hljs-keyword">await</span> connection.query(<span class="hljs-string">`
  INSERT INTO <span class="hljs-subst">${tableName}</span> (name, weight)
  VALUES (&apos;<span class="hljs-subst">${name}</span>&apos;, <span class="hljs-subst">${weight}</span>)
`</span>)
<span class="hljs-comment">// &#x6216;&#x8005;&#x901A;&#x8FC7;&#x4F20;&#x5165;&#x4E00;&#x4E2A;Object&#x7684;&#x65B9;&#x5F0F;&#x4E5F;&#x53EF;&#x4EE5;&#x505A;&#x5230;</span>
<span class="hljs-keyword">await</span> connection.query(<span class="hljs-string">`INSERT INTO <span class="hljs-subst">${tableName}</span> SET ?`</span>, {
  name,
  weight
})

connection.end()</code></pre><p>&#x770B;&#x8D77;&#x6765;&#x4E5F;&#x8FD8;&#x7B97;&#x662F;&#x6BD4;&#x8F83;&#x6E05;&#x6670;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x5E26;&#x6765;&#x7684;&#x95EE;&#x9898;&#x5C31;&#x662F;&#xFF0C;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x9700;&#x8981;&#x5BF9;&#x8868;&#x7ED3;&#x6784;&#x8DB3;&#x591F;&#x7684;&#x4E86;&#x89E3;&#x3002;<br>&#x5982;&#x679C;&#x8868;&#x4E2D;&#x6709;&#x5341;&#x51E0;&#x4E2A;&#x5B57;&#x6BB5;&#xFF0C;&#x5BF9;&#x4E8E;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x6765;&#x8BF4;&#x8FD9;&#x4F1A;&#x662F;&#x5F88;&#x5927;&#x7684;&#x8BB0;&#x5FC6;&#x6210;&#x672C;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x77E5;&#x9053;&#x67D0;&#x4E2A;&#x5B57;&#x6BB5;&#x662F;&#x4EC0;&#x4E48;&#x7C7B;&#x578B;&#xFF0C;&#x62FC;&#x63A5;<code>SQL</code>&#x65F6;&#x8FD8;&#x8981;&#x6CE8;&#x610F;&#x63D2;&#x5165;&#x65F6;&#x7684;&#x987A;&#x5E8F;&#x53CA;&#x7C7B;&#x578B;&#xFF0C;<code>WHERE</code>&#x6761;&#x4EF6;&#x5BF9;&#x5E94;&#x7684;&#x67E5;&#x8BE2;&#x53C2;&#x6570;&#x7C7B;&#x578B;&#xFF0C;&#x5982;&#x679C;&#x4FEE;&#x6539;&#x67D0;&#x4E2A;&#x5B57;&#x6BB5;&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x8FD8;&#x8981;&#x53BB;&#x5904;&#x7406;&#x5BF9;&#x5E94;&#x7684;&#x4F20;&#x53C2;&#x3002;<br>&#x8FD9;&#x6837;&#x7684;&#x9879;&#x76EE;&#x5C24;&#x5176;&#x662F;&#x5728;&#x8FDB;&#x884C;&#x4EA4;&#x63A5;&#x7684;&#x65F6;&#x5019;&#x66F4;&#x662F;&#x4E00;&#x4EF6;&#x6050;&#x6016;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x65B0;&#x4EBA;&#x53C8;&#x9700;&#x8981;&#x4ECE;&#x5934;&#x5B66;&#x4E60;&#x8FD9;&#x4E9B;&#x8868;&#x7ED3;&#x6784;&#x3002;<br><em>&#x4EE5;&#x53CA;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x54EA;&#x5929;&#x9700;&#x8981;&#x66F4;&#x6362;&#x6570;&#x636E;&#x5E93;&#x4E86;&#xFF0C;&#x653E;&#x5F03;&#x4E86;<code>MySQL</code>&#xFF0C;&#x90A3;&#x4E48;&#x6240;&#x6709;&#x7684;<code>SQL</code>&#x8BED;&#x53E5;&#x90FD;&#x8981;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#xFF08;&#x56E0;&#x4E3A;&#x5404;&#x4E2A;&#x6570;&#x636E;&#x5E93;&#x7684;&#x65B9;&#x8A00;&#x53EF;&#x80FD;&#x6709;&#x533A;&#x522B;&#xFF09;</em></p><h2 id="articleHeader1">CRUD&#x8FDB;&#x9636;&#x7248; Sequelize&#x7684;&#x4F7F;&#x7528;</h2><p>&#x5173;&#x4E8E;&#x8BB0;&#x5FC6;&#x8FD9;&#x4EF6;&#x4E8B;&#x60C5;&#xFF0C;&#x673A;&#x5668;&#x80AF;&#x5B9A;&#x4F1A;&#x6BD4;&#x4EBA;&#x8111;&#x66F4;&#x9760;&#x8C31;&#x513F;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x6709;&#x4E86;<code>ORM</code>&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x7528;&#x5230;&#x4E86;&#x5728;<code>Node</code>&#x4E2D;&#x6BD4;&#x8F83;&#x6D41;&#x884C;&#x7684;<code>Sequelize</code>&#x3002;</p><h3 id="articleHeader2">ORM&#x662F;&#x5E72;&#x561B;&#x7684;</h3><p>&#x9996;&#x5148;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x89E3;&#x91CA;&#x4E0B;<code>ORM</code>&#x662F;&#x505A;&#x4EC0;&#x4E48;&#x4F7F;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x5730;&#x7406;&#x89E3;&#x4E3A;&#xFF0C;&#x4F7F;&#x7528;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x901A;&#x8FC7;&#x64CD;&#x4F5C;&#x5BF9;&#x8C61;&#x6765;&#x5B9E;&#x73B0;&#x4E0E;&#x6570;&#x636E;&#x5E93;&#x4E4B;&#x524D;&#x7684;&#x4EA4;&#x6D41;&#xFF0C;&#x5B8C;&#x6210;<code>CRUD</code>&#x7684;&#x52A8;&#x4F5C;&#x3002;<br>&#x5F00;&#x53D1;&#x8005;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x5173;&#x5FC3;&#x6570;&#x636E;&#x5E93;&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x4E5F;&#x4E0D;&#x9700;&#x8981;&#x5173;&#x5FC3;&#x5B9E;&#x9645;&#x7684;&#x8868;&#x7ED3;&#x6784;&#xFF0C;&#x800C;&#x662F;&#x6839;&#x636E;&#x5F53;&#x524D;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x4E2D;&#x5BF9;&#x8C61;&#x7684;&#x7ED3;&#x6784;&#x4E0E;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x8868;&#x3001;&#x5B57;&#x6BB5;&#x8FDB;&#x884C;&#x6620;&#x5C04;&#x3002;</p><p>&#x5C31;&#x597D;&#x6BD4;&#x9488;&#x5BF9;&#x4E0A;&#x8FB9;&#x7684;<code>animal</code>&#x8868;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#xFF0C;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x53BB;&#x62FC;&#x63A5;<code>SQL</code>&#x8BED;&#x53E5;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x7C7B;&#x4F3C;<code>Animal.create</code>&#xFF0C;<code>Animal.find</code>&#x5C31;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x5BF9;&#x5E94;&#x7684;&#x52A8;&#x4F5C;&#x3002;</p><h3 id="articleHeader3">Sequelize&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</h3><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x8981;&#x5148;&#x4E0B;&#x8F7D;<code>Sequelize</code>&#x7684;&#x4F9D;&#x8D56;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i sequelize
npm i mysql2    # &#x4EE5;&#x53CA;&#x5BF9;&#x5E94;&#x7684;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#x5E93;&#x9A71;&#x52A8;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">npm i sequelize
npm i mysql2    <span class="hljs-comment"># &#x4EE5;&#x53CA;&#x5BF9;&#x5E94;&#x7684;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#x5E93;&#x9A71;&#x52A8;</span></code></pre><p>&#x7136;&#x540E;&#x5728;&#x7A0B;&#x5E8F;&#x4E2D;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>Sequelize</code>&#x7684;&#x5B9E;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Sequelize = require(&apos;Sequelize&apos;)
const sequelize = new Sequelize(&apos;mysql://root:jarvis@127.0.0.1:3306/ts_test&apos;)
//                             dialect://username:password@host:port/db_name

// &#x9488;&#x5BF9;&#x4E0A;&#x8FF0;&#x7684;&#x8868;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5148;&#x5EFA;&#x7ACB;&#x5BF9;&#x5E94;&#x7684;&#x6A21;&#x578B;&#xFF1A;
const Animal = sequelize.define(&apos;animal&apos;, {
  id: { type: Sequelize.INTEGER, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
  weight: { type: Sequelize.INTEGER, allowNull: false },
}, {
  // &#x7981;&#x6B62;sequelize&#x4FEE;&#x6539;&#x8868;&#x540D;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F1A;&#x5728;animal&#x540E;&#x8FB9;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5B57;&#x6BCD;`s`&#x8868;&#x793A;&#x8D1F;&#x6570;
  freezeTableName: true,
  // &#x7981;&#x6B62;&#x81EA;&#x52A8;&#x6DFB;&#x52A0;&#x65F6;&#x95F4;&#x6233;&#x76F8;&#x5173;&#x5C5E;&#x6027;
  timestamps: false,
})

// &#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x4F7F;&#x7528;&#x54AF;
// &#x8FD8;&#x662F;&#x5047;&#x8BBE;&#x65B9;&#x6CD5;&#x90FD;&#x5DF2;&#x7ECF;&#x652F;&#x6301;&#x4E86;Promise

// &#x67E5;&#x8BE2;
const results = await Animal.findAll({
  raw: true,
})

// &#x65B0;&#x589E;
const name = &apos;Niko&apos;
const weight = 70

await Animal.create({
  name,
  weight,
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Sequelize = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;Sequelize&apos;</span>)
<span class="hljs-keyword">const</span> sequelize = <span class="hljs-keyword">new</span> Sequelize(<span class="hljs-string">&apos;mysql://root:jarvis@127.0.0.1:3306/ts_test&apos;</span>)
<span class="hljs-comment">//                             dialect://username:password@host:port/db_name</span>

<span class="hljs-comment">// &#x9488;&#x5BF9;&#x4E0A;&#x8FF0;&#x7684;&#x8868;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5148;&#x5EFA;&#x7ACB;&#x5BF9;&#x5E94;&#x7684;&#x6A21;&#x578B;&#xFF1A;</span>
<span class="hljs-keyword">const</span> Animal = sequelize.define(<span class="hljs-string">&apos;animal&apos;</span>, {
  <span class="hljs-attr">id</span>: { <span class="hljs-attr">type</span>: Sequelize.INTEGER, <span class="hljs-attr">autoIncrement</span>: <span class="hljs-literal">true</span> },
  <span class="hljs-attr">name</span>: { <span class="hljs-attr">type</span>: Sequelize.STRING, <span class="hljs-attr">allowNull</span>: <span class="hljs-literal">false</span> },
  <span class="hljs-attr">weight</span>: { <span class="hljs-attr">type</span>: Sequelize.INTEGER, <span class="hljs-attr">allowNull</span>: <span class="hljs-literal">false</span> },
}, {
  <span class="hljs-comment">// &#x7981;&#x6B62;sequelize&#x4FEE;&#x6539;&#x8868;&#x540D;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F1A;&#x5728;animal&#x540E;&#x8FB9;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5B57;&#x6BCD;`s`&#x8868;&#x793A;&#x8D1F;&#x6570;</span>
  freezeTableName: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// &#x7981;&#x6B62;&#x81EA;&#x52A8;&#x6DFB;&#x52A0;&#x65F6;&#x95F4;&#x6233;&#x76F8;&#x5173;&#x5C5E;&#x6027;</span>
  timestamps: <span class="hljs-literal">false</span>,
})

<span class="hljs-comment">// &#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x4F7F;&#x7528;&#x54AF;</span>
<span class="hljs-comment">// &#x8FD8;&#x662F;&#x5047;&#x8BBE;&#x65B9;&#x6CD5;&#x90FD;&#x5DF2;&#x7ECF;&#x652F;&#x6301;&#x4E86;Promise</span>

<span class="hljs-comment">// &#x67E5;&#x8BE2;</span>
<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> Animal.findAll({
  <span class="hljs-attr">raw</span>: <span class="hljs-literal">true</span>,
})

<span class="hljs-comment">// &#x65B0;&#x589E;</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">&apos;Niko&apos;</span>
<span class="hljs-keyword">const</span> weight = <span class="hljs-number">70</span>

<span class="hljs-keyword">await</span> Animal.create({
  name,
  weight,
})</code></pre><blockquote>sequelize&#x5B9A;&#x4E49;&#x6A21;&#x578B;&#x76F8;&#x5173;&#x7684;&#x5404;&#x79CD;&#x914D;&#x7F6E;&#xFF1A;<a href="https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/models-definition.md" rel="nofollow noreferrer" target="_blank">docs</a></blockquote><p>&#x629B;&#x5F00;&#x6A21;&#x578B;&#x5B9A;&#x4E49;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x4F7F;&#x7528;<code>Sequelize</code>&#x65E0;&#x7591;&#x51CF;&#x8F7B;&#x4E86;&#x5F88;&#x591A;&#x4F7F;&#x7528;&#x4E0A;&#x7684;&#x6210;&#x672C;&#xFF0C;&#x56E0;&#x4E3A;&#x6A21;&#x578B;&#x7684;&#x5B9A;&#x4E49;&#x4E00;&#x822C;&#x4E0D;&#x592A;&#x4F1A;&#x53BB;&#x6539;&#x53D8;&#xFF0C;&#x4E00;&#x6B21;&#x5B9A;&#x4E49;&#x591A;&#x6B21;&#x4F7F;&#x7528;&#xFF0C;&#x800C;&#x4F7F;&#x7528;&#x624B;&#x52A8;&#x62FC;&#x63A5;<code>SQL</code>&#x7684;&#x65B9;&#x5F0F;&#x53EF;&#x80FD;&#x5C31;&#x9700;&#x8981;&#x5C06;&#x4E00;&#x6BB5;<code>SQL</code>&#x6539;&#x6765;&#x6539;&#x53BB;&#x7684;&#x3002;</p><p>&#x800C;&#x4E14;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x8FDB;&#x884C;&#x5B57;&#x6BB5;&#x7C7B;&#x578B;&#x7684;&#x8F6C;&#x6362;&#xFF0C;&#x907F;&#x514D;&#x51FA;&#x73B0;&#x7C7B;&#x578B;&#x5F3A;&#x5236;&#x8F6C;&#x6362;&#x51FA;&#x9519;<code>NaN</code>&#x6216;&#x8005;&#x6570;&#x5B57;&#x88AB;&#x622A;&#x65AD;&#x7B49;&#x4E00;&#x4E9B;&#x7C97;&#x5FC3;&#x5BFC;&#x81F4;&#x7684;&#x9519;&#x8BEF;&#x3002;</p><p>&#x901A;&#x8FC7;&#x5B9A;&#x4E49;&#x6A21;&#x578B;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x544A;&#x8BC9;&#x7A0B;&#x5E8F;&#xFF0C;&#x6709;&#x54EA;&#x4E9B;&#x6A21;&#x578B;&#xFF0C;&#x6A21;&#x578B;&#x7684;&#x5B57;&#x6BB5;&#x90FD;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x8BA9;&#x7A0B;&#x5E8F;&#x6765;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x8BB0;&#x5FC6;&#xFF0C;&#x800C;&#x975E;&#x8BA9;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x53BB;&#x8BB0;&#x5FC6;&#x3002;<br>&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x62FF;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x6A21;&#x578B;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x5C31;&#x597D;&#x4E86;&#x3002;</p><h3 id="articleHeader4">&#x8FD9;&#x8FD8;&#x4E0D;&#x591F;</h3><p><strong>But</strong>&#xFF0C;&#x867D;&#x8BF4;&#x5207;&#x6362;&#x4E3A;<code>ORM</code>&#x5DE5;&#x5177;&#x5DF2;&#x7ECF;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x51CF;&#x5C11;&#x4E86;&#x5F88;&#x5927;&#x4E00;&#x90E8;&#x5206;&#x7684;&#x8BB0;&#x5FC6;&#x6210;&#x672C;&#xFF0C;&#x4F46;&#x662F;&#x4F9D;&#x7136;&#x8FD8;&#x4E0D;&#x591F;&#xFF0C;&#x6211;&#x4EEC;&#x4ECD;&#x7136;&#x9700;&#x8981;&#x77E5;&#x9053;&#x6A21;&#x578B;&#x4E2D;&#x90FD;&#x6709;&#x54EA;&#x4E9B;&#x5B57;&#x6BB5;&#xFF0C;&#x624D;&#x80FD;&#x5728;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4E2D;&#x8FDB;&#x884C;&#x4F7F;&#x7528;&#xFF0C;&#x5982;&#x679C;&#x65B0;&#x4EBA;&#x63A5;&#x624B;&#x9879;&#x76EE;&#xFF0C;&#x4ECD;&#x7136;&#x9700;&#x8981;&#x53BB;&#x7FFB;&#x770B;&#x6A21;&#x578B;&#x7684;&#x5B9A;&#x4E49;&#x624D;&#x80FD;&#x77E5;&#x9053;&#x6709;&#x4EC0;&#x4E48;&#x5B57;&#x6BB5;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x6709;&#x4E86;&#x4ECA;&#x5929;&#x8981;&#x8BF4;&#x7684;&#x771F;&#x6B63;&#x7684;&#x4E3B;&#x89D2;&#x513F;&#xFF1A;<a href="https://www.npmjs.com/package/sequelize-typescript" rel="nofollow noreferrer" target="_blank">sequelize-typescript</a></p><h2 id="articleHeader5">CRUD&#x7EC8;&#x6781;&#x7248; &#x88C5;&#x9970;&#x5668;&#x5B9E;&#x73B0;&#x6A21;&#x578B;&#x5B9A;&#x4E49;</h2><p><code>Sequelize-typescript</code>&#x662F;&#x57FA;&#x4E8E;<code>Sequelize</code>&#x9488;&#x5BF9;<code>TypeScript</code>&#x6240;&#x5B9E;&#x73B0;&#x7684;&#x4E00;&#x4E2A;&#x589E;&#x5F3A;&#x7248;&#x672C;&#xFF0C;&#x629B;&#x5F03;&#x4E86;&#x4E4B;&#x524D;&#x7E41;&#x7410;&#x7684;&#x6A21;&#x578B;&#x5B9A;&#x4E49;&#xFF0C;&#x4F7F;&#x7528;&#x88C5;&#x9970;&#x5668;&#x76F4;&#x63A5;&#x8FBE;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x5230;&#x7684;&#x76EE;&#x7684;&#x3002;</p><h3 id="articleHeader6">Sequelize-typescript&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</h3><p>&#x9996;&#x5148;&#x56E0;&#x4E3A;&#x662F;&#x7528;&#x5230;&#x4E86;<code>TS</code>&#xFF0C;&#x6240;&#x4EE5;&#x73AF;&#x5883;&#x4F9D;&#x8D56;&#x4E0A;&#x8981;&#x5B89;&#x88C5;&#x7684;&#x4E1C;&#x897F;&#x4F1A;&#x591A;&#x4E00;&#x4E9B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x8FD9;&#x91CC;&#x91C7;&#x7528;ts-node&#x6765;&#x5B8C;&#x6210;&#x4E3E;&#x4F8B;
npm i ts-node typescript
npm i sequelize reflect-metadata sequelize-typescript" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># &#x8FD9;&#x91CC;&#x91C7;&#x7528;ts-node&#x6765;&#x5B8C;&#x6210;&#x4E3E;&#x4F8B;</span>
npm i ts-node typescript
npm i sequelize reflect-metadata sequelize-typescript</code></pre><p>&#x5176;&#x6B21;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x4FEE;&#x6539;<code>TS</code>&#x9879;&#x76EE;&#x5BF9;&#x5E94;&#x7684;<code>tsconfig.json</code>&#x6587;&#x4EF6;&#xFF0C;&#x7528;&#x6765;&#x8BA9;<code>TS</code>&#x652F;&#x6301;&#x88C5;&#x9970;&#x5668;&#x7684;&#x4F7F;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;compilerOptions&quot;: {
+   &quot;experimentalDecorators&quot;: true,
+   &quot;emitDecoratorMetadata&quot;: true
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="diff hljs"><code class="diff">{
  &quot;compilerOptions&quot;: {
<span class="hljs-addition">+   &quot;experimentalDecorators&quot;: true,</span>
<span class="hljs-addition">+   &quot;emitDecoratorMetadata&quot;: true</span>
  }
}</code></pre><p>&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x7F16;&#x5199;&#x811A;&#x672C;&#x6765;&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x4E86;&#xFF0C;&#x4E0E;<code>Sequelize</code>&#x4E0D;&#x540C;&#x4E4B;&#x5904;&#x57FA;&#x672C;&#x5728;&#x4E8E;&#x6A21;&#x578B;&#x5B9A;&#x4E49;&#x7684;&#x5730;&#x65B9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// /modles/animal.ts
import { Table, Column, Model } from &apos;sequelize-typescript&apos;

@Table({
  tableName: &apos;animal&apos;
})
export class Animal extends Model&lt;Animal&gt; {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column
  name: string

  @Column
  weight: number
}

// &#x521B;&#x5EFA;&#x4E0E;&#x6570;&#x636E;&#x5E93;&#x7684;&#x94FE;&#x63A5;&#x3001;&#x521D;&#x59CB;&#x5316;&#x6A21;&#x578B;
// app.ts
import path from &apos;path&apos;
import { Sequelize } from &apos;sequelize-typescript&apos;
import Animal from &apos;./models/animal&apos;

const sequelize = new Sequelize(&apos;mysql://root:jarvis@127.0.0.1:3306/ts_test&apos;)
sequelize.addModels([path.resolve(__dirname, `./models/`)])

// &#x67E5;&#x8BE2;
const results = await Animal.findAll({
  raw: true,
})

// &#x65B0;&#x589E;
const name = &apos;Niko&apos;
const weight = 70

await Animal.create({
  name,
  weight,
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// /modles/animal.ts</span>
<span class="hljs-keyword">import</span> { Table, Column, Model } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;sequelize-typescript&apos;</span>

@Table({
  <span class="hljs-attr">tableName</span>: <span class="hljs-string">&apos;animal&apos;</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Model</span>&lt;<span class="hljs-title">Animal</span>&gt; </span>{
  @Column({
    <span class="hljs-attr">primaryKey</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoIncrement</span>: <span class="hljs-literal">true</span>,
  })
  id: number

  @Column
  name: string

  @Column
  weight: number
}

<span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E0E;&#x6570;&#x636E;&#x5E93;&#x7684;&#x94FE;&#x63A5;&#x3001;&#x521D;&#x59CB;&#x5316;&#x6A21;&#x578B;</span>
<span class="hljs-comment">// app.ts</span>
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;path&apos;</span>
<span class="hljs-keyword">import</span> { Sequelize } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;sequelize-typescript&apos;</span>
<span class="hljs-keyword">import</span> Animal <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./models/animal&apos;</span>

<span class="hljs-keyword">const</span> sequelize = <span class="hljs-keyword">new</span> Sequelize(<span class="hljs-string">&apos;mysql://root:jarvis@127.0.0.1:3306/ts_test&apos;</span>)
sequelize.addModels([path.resolve(__dirname, <span class="hljs-string">`./models/`</span>)])

<span class="hljs-comment">// &#x67E5;&#x8BE2;</span>
<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> Animal.findAll({
  <span class="hljs-attr">raw</span>: <span class="hljs-literal">true</span>,
})

<span class="hljs-comment">// &#x65B0;&#x589E;</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">&apos;Niko&apos;</span>
<span class="hljs-keyword">const</span> weight = <span class="hljs-number">70</span>

<span class="hljs-keyword">await</span> Animal.create({
  name,
  weight,
})</code></pre><p>&#x4E0E;&#x666E;&#x901A;&#x7684;<code>Sequelize</code>&#x4E0D;&#x540C;&#x7684;&#x6709;&#x8FD9;&#x4E48;&#x51E0;&#x70B9;&#xFF1A;</p><ol><li>&#x6A21;&#x578B;&#x7684;&#x5B9A;&#x4E49;&#x91C7;&#x7528;&#x88C5;&#x9970;&#x5668;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5B9A;&#x4E49;</li><li>&#x5B9E;&#x4F8B;&#x5316;<code>Sequelize</code>&#x5BF9;&#x8C61;&#x65F6;&#x9700;&#x8981;&#x6307;&#x5B9A;&#x5BF9;&#x5E94;&#x7684;<code>model</code>&#x8DEF;&#x5F84;</li><li>&#x6A21;&#x578B;&#x76F8;&#x5173;&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x65B9;&#x6CD5;&#x90FD;&#x662F;&#x652F;&#x6301;<code>Promise</code>&#x7684;</li></ol><p><em>&#x5982;&#x679C;&#x5728;&#x4F7F;&#x7528;&#x8FC7;&#x7A0B;&#x4E2D;&#x9047;&#x5230;&#x63D0;&#x793A;<code>XXX used before model init</code>&#xFF0C;&#x53EF;&#x4EE5;&#x5C1D;&#x8BD5;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x524D;&#x8FB9;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;<code>await</code>&#x64CD;&#x4F5C;&#x7B26;&#xFF0C;&#x7B49;&#x5230;&#x4E0E;&#x6570;&#x636E;&#x5E93;&#x7684;&#x8FDE;&#x63A5;&#x5EFA;&#x7ACB;&#x5B8C;&#x6210;&#x4EE5;&#x540E;&#x518D;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;</em></p><p>&#x4F46;&#x662F;&#x597D;&#x50CF;&#x770B;&#x8D77;&#x6765;&#x8FD9;&#x6837;&#x5199;&#x7684;&#x4EE3;&#x7801;&#x76F8;&#x8F83;&#x4E8E;<code>Sequelize</code>&#x591A;&#x4E86;&#x4E0D;&#x5C11;&#x5462;&#xFF0C;&#x800C;&#x4E14;&#x81F3;&#x5C11;&#x9700;&#x8981;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x6765;&#x914D;&#x5408;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E48;&#x505A;&#x7684;&#x610F;&#x4E49;&#x662F;&#x4EC0;&#x4E48;&#x7684;&#xFF1F;<br>&#x7B54;&#x6848;&#x5C31;&#x662F;<code>OOP</code>&#x4E2D;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x7406;&#x5FF5;&#xFF1A;__&#x7EE7;&#x627F;__&#x3002;</p><h3 id="articleHeader7">&#x4F7F;&#x7528;Sequelize-typescript&#x5B9E;&#x73B0;&#x6A21;&#x578B;&#x7684;&#x7EE7;&#x627F;</h3><p>&#x56E0;&#x4E3A;<code>TypeScript</code>&#x7684;&#x6838;&#x5FC3;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x4E2D;&#x5305;&#x62EC;<code>C#</code>&#x7684;&#x67B6;&#x6784;&#x5E08;&#xFF0C;&#x6240;&#x4EE5;<code>TypeScript</code>&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5F88;&#x591A;&#x7C7B;&#x4F3C;<code>C#</code>&#x7684;&#x75D5;&#x8FF9;&#xFF0C;&#x5728;&#x6A21;&#x578B;&#x7684;&#x8FD9;&#x65B9;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C1D;&#x8BD5;&#x5229;&#x7528;&#x7EE7;&#x627F;&#x51CF;&#x5C11;&#x4E00;&#x4E9B;&#x5197;&#x4F59;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x6BD4;&#x5982;&#x8BF4;&#x6211;&#x4EEC;&#x57FA;&#x4E8E;<code>animal</code>&#x8868;&#x53C8;&#x6709;&#x4E86;&#x4E24;&#x5F20;&#x65B0;&#x8868;&#xFF0C;<code>dog</code>&#x548C;<code>bird</code>&#xFF0C;&#x8FD9;&#x4E24;&#x8005;&#x4E4B;&#x95F4;&#x80AF;&#x5B9A;&#x662F;&#x6709;&#x533A;&#x522B;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x6709;&#x4E86;&#x8FD9;&#x6837;&#x7684;&#x5B9A;&#x4E49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CREATE TABLE dog (
  id INT AUTO_INCREMENT,
  name VARCHAR(14) NOT NULL,
  weight INT NOT NULL, 
  leg INT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE bird (
  id INT AUTO_INCREMENT,
  name VARCHAR(14) NOT NULL,
  weight INT NOT NULL, 
  wing INT NOT NULL,
  claw INT NOT NULL,
  PRIMARY KEY (`id`)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="sql hljs"><code class="sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> dog (
  <span class="hljs-keyword">id</span> <span class="hljs-built_in">INT</span> AUTO_INCREMENT,
  <span class="hljs-keyword">name</span> <span class="hljs-built_in">VARCHAR</span>(<span class="hljs-number">14</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  weight <span class="hljs-built_in">INT</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>, 
  leg <span class="hljs-built_in">INT</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  PRIMARY <span class="hljs-keyword">KEY</span> (<span class="hljs-string">`id`</span>)
);

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> bird (
  <span class="hljs-keyword">id</span> <span class="hljs-built_in">INT</span> AUTO_INCREMENT,
  <span class="hljs-keyword">name</span> <span class="hljs-built_in">VARCHAR</span>(<span class="hljs-number">14</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  weight <span class="hljs-built_in">INT</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>, 
  wing <span class="hljs-built_in">INT</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  claw <span class="hljs-built_in">INT</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  PRIMARY <span class="hljs-keyword">KEY</span> (<span class="hljs-string">`id`</span>)
);</code></pre><p>&#x5173;&#x4E8E;<code>dog</code>&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x817F;<code>leg</code>&#x6570;&#x91CF;&#x7684;&#x63CF;&#x8FF0;&#xFF0C;&#x5173;&#x4E8E;<code>bird</code>&#x6211;&#x4EEC;&#x6709;&#x4E86;&#x7FC5;&#x8180;<code>wing</code>&#x548C;&#x722A;&#x5B50;<code>claw</code>&#x6570;&#x91CF;&#x7684;&#x63CF;&#x8FF0;&#x3002;<br><em>&#x7279;&#x610F;&#x8BA9;&#x4E24;&#x8005;&#x7684;&#x7279;&#x6B8A;&#x5B57;&#x6BB5;&#x6570;&#x91CF;&#x4E0D;&#x540C;&#xFF0C;&#x7701;&#x7684;&#x6709;&#x6760;&#x7CBE;&#x8BF4;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x6DFB;&#x52A0;<code>type</code>&#x5B57;&#x6BB5;&#x533A;&#x5206;&#x4E24;&#x79CD;&#x4E0D;&#x540C;&#x7684;&#x52A8;&#x7269; :p</em></p><p>&#x5982;&#x679C;&#x8981;&#x7528;<code>Sequelize</code>&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x8981;&#x5C06;&#x4E00;&#x4E9B;&#x76F8;&#x540C;&#x7684;&#x5B57;&#x6BB5;&#x5B9A;&#x4E49;<code>define</code>&#x4E09;&#x904D;&#x624D;&#x80FD;&#x5B9E;&#x73B0;&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#x5199;&#x5F97;&#x7075;&#x6D3B;&#x4E00;&#x4E9B;&#xFF0C;&#x5C06;<code>define</code>&#x65F6;&#x4F7F;&#x7528;&#x7684;<code>Object</code>&#x62BD;&#x51FA;&#x6765;&#x4F7F;&#x7528;<code>Object.assign</code>&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x7EE7;&#x627F;&#x7684;&#x6548;&#x679C;&#x3002;</p><p>&#x4F46;&#x662F;&#x5728;<code>Sequelize-typescript</code>&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x7EE7;&#x627F;&#x6765;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x9996;&#x5148;&#x8FD8;&#x662F;&#x6211;&#x4EEC;&#x7684;Animal&#x6A21;&#x578B;&#x5B9A;&#x4E49;
// /models/animal.ts
import { Table, Column, Model } from &apos;sequelize-typescript&apos;

@Table({
  tableName: &apos;animal&apos;
})
export default class Animal extends Model&lt;Animal&gt; {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column
  name: string

  @Column
  weight: number
}

// &#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x7EE7;&#x627F;&#x7684;&#x4F7F;&#x7528;&#x4E86;
// /models/dog.ts
import { Table, Column, Model } from &apos;sequelize-typescript&apos;
import Animal from &apos;./animal&apos;

@Table({
  tableName: &apos;dog&apos;
})
export default class Dog extends Animal {
  @Column
  leg: number
}

// /models/bird.ts
import { Table, Column, Model } from &apos;sequelize-typescript&apos;
import Animal from &apos;./animal&apos;

@Table({
  tableName: &apos;bird&apos;
})
export default class Bird extends Animal {
  @Column
  wing: number

  @Column
  claw: number
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x9996;&#x5148;&#x8FD8;&#x662F;&#x6211;&#x4EEC;&#x7684;Animal&#x6A21;&#x578B;&#x5B9A;&#x4E49;</span>
<span class="hljs-comment">// /models/animal.ts</span>
<span class="hljs-keyword">import</span> { Table, Column, Model } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;sequelize-typescript&apos;</span>

@Table({
  <span class="hljs-attr">tableName</span>: <span class="hljs-string">&apos;animal&apos;</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Model</span>&lt;<span class="hljs-title">Animal</span>&gt; </span>{
  @Column({
    <span class="hljs-attr">primaryKey</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoIncrement</span>: <span class="hljs-literal">true</span>,
  })
  id: number

  @Column
  name: string

  @Column
  weight: number
}

<span class="hljs-comment">// &#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x7EE7;&#x627F;&#x7684;&#x4F7F;&#x7528;&#x4E86;</span>
<span class="hljs-comment">// /models/dog.ts</span>
<span class="hljs-keyword">import</span> { Table, Column, Model } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;sequelize-typescript&apos;</span>
<span class="hljs-keyword">import</span> Animal <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./animal&apos;</span>

@Table({
  <span class="hljs-attr">tableName</span>: <span class="hljs-string">&apos;dog&apos;</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
  @Column
  leg: number
}

<span class="hljs-comment">// /models/bird.ts</span>
<span class="hljs-keyword">import</span> { Table, Column, Model } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;sequelize-typescript&apos;</span>
<span class="hljs-keyword">import</span> Animal <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./animal&apos;</span>

@Table({
  <span class="hljs-attr">tableName</span>: <span class="hljs-string">&apos;bird&apos;</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Bird</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
  @Column
  wing: number

  @Column
  claw: number
}</code></pre><p>&#x6709;&#x4E00;&#x70B9;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#xFF1A;<strong>&#x6BCF;&#x4E00;&#x4E2A;&#x6A21;&#x578B;&#x9700;&#x8981;&#x5355;&#x72EC;&#x5360;&#x7528;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x4E14;&#x91C7;&#x7528;<code>export default</code>&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5BFC;&#x51FA;</strong><br>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x76EE;&#x524D;&#x6211;&#x4EEC;&#x7684;&#x6587;&#x4EF6;&#x7ED3;&#x6784;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; models
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; animal.ts
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; bird.ts
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; dog.ts
&#x2514;&#x2500;&#x2500; app.ts" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">&#x251C;&#x2500;&#x2500; models
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; animal.ts
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; bird.ts
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; dog.ts
&#x2514;&#x2500;&#x2500; app.ts</code></pre><p>&#x5F97;&#x76CA;&#x4E8E;<code>TypeScript</code>&#x7684;&#x9759;&#x6001;&#x7C7B;&#x578B;&#xFF0C;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x5F88;&#x65B9;&#x4FBF;&#x5730;&#x5F97;&#x77E5;&#x8FD9;&#x4E9B;&#x6A21;&#x578B;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x4EE5;&#x53CA;&#x90FD;&#x5B58;&#x5728;&#x54EA;&#x4E9B;&#x5B57;&#x6BB5;&#x3002;<br>&#x5728;&#x7ED3;&#x5408;&#x7740;<code>VS Code</code>&#x5F00;&#x53D1;&#x65F6;&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x5F88;&#x591A;&#x52A8;&#x6001;&#x63D0;&#x793A;&#xFF0C;&#x7C7B;&#x4F3C;<code>findAll</code>&#xFF0C;<code>create</code>&#x4E4B;&#x7C7B;&#x7684;&#x64CD;&#x4F5C;&#x90FD;&#x4F1A;&#x6709;&#x63D0;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Animal.create&lt;Animal&gt;({
  abc: 1,
// ^ abc&#x4E0D;&#x662F;Animal&#x5DF2;&#x77E5;&#x7684;&#x5C5E;&#x6027;  
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Animal.create&lt;Animal&gt;({
  <span class="hljs-attr">abc</span>: <span class="hljs-number">1</span>,
<span class="hljs-comment">// ^ abc&#x4E0D;&#x662F;Animal&#x5DF2;&#x77E5;&#x7684;&#x5C5E;&#x6027;  </span>
})</code></pre><h3 id="articleHeader8">&#x901A;&#x8FC7;&#x7EE7;&#x627F;&#x6765;&#x590D;&#x7528;&#x4E00;&#x4E9B;&#x884C;&#x4E3A;</h3><p>&#x4E0A;&#x8FF0;&#x7684;&#x4F8B;&#x5B50;&#x4E5F;&#x53EA;&#x662F;&#x8BF4;&#x660E;&#x4E86;&#x5982;&#x4F55;&#x590D;&#x7528;&#x6A21;&#x578B;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x662F;&#x4E00;&#x4E9B;&#x5C01;&#x88C5;&#x597D;&#x7684;&#x65B9;&#x6CD5;&#x5462;&#xFF1F;<br>&#x7C7B;&#x4F3C;&#x7684;&#x83B7;&#x53D6;&#x8868;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x53EF;&#x80FD;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x83B7;&#x53D6;<code>JSON</code>&#x6570;&#x636E;&#x5C31;&#x591F;&#x4E86;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;<code>findAll({raw: true})</code><br>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x9488;&#x5BF9;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x7B80;&#x5355;&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x5F00;&#x53D1;&#x8005;&#x624B;&#x52A8;&#x53BB;&#x8C03;&#x7528;<code>findAll</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// /models/animal.ts
import { Table, Column, Model } from &apos;sequelize-typescript&apos;

@Table({
  tableName: &apos;animal&apos;
})
export default class Animal extends Model&lt;Animal&gt; {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column
  name: string

  @Column
  weight: number

  static async getList () {
    return this.findAll({raw: true})
  }
}

// /app.ts
// &#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8C03;&#x7528;`getList`&#x6765;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x7684;&#x6548;&#x679C;&#x4E86;
await Animal.getList() // &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;JSON&#x6570;&#x7EC4;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// /models/animal.ts</span>
<span class="hljs-keyword">import</span> { Table, Column, Model } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;sequelize-typescript&apos;</span>

@Table({
  <span class="hljs-attr">tableName</span>: <span class="hljs-string">&apos;animal&apos;</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Model</span>&lt;<span class="hljs-title">Animal</span>&gt; </span>{
  @Column({
    <span class="hljs-attr">primaryKey</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoIncrement</span>: <span class="hljs-literal">true</span>,
  })
  id: number

  @Column
  name: string

  @Column
  weight: number

  <span class="hljs-keyword">static</span> <span class="hljs-keyword">async</span> getList () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.findAll({<span class="hljs-attr">raw</span>: <span class="hljs-literal">true</span>})
  }
}

<span class="hljs-comment">// /app.ts</span>
<span class="hljs-comment">// &#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8C03;&#x7528;`getList`&#x6765;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x7684;&#x6548;&#x679C;&#x4E86;</span>
<span class="hljs-keyword">await</span> Animal.getList() <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;JSON&#x6570;&#x7EC4;</span></code></pre><p>&#x540C;&#x7406;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0A;&#x8FB9;&#x6211;&#x4EEC;&#x7684;&#x4E24;&#x4E2A;<code>Dog</code>&#x548C;<code>Bird</code>&#x7EE7;&#x627F;&#x81EA;<code>Animal</code>&#xFF0C;&#x6240;&#x4EE5;&#x4EE3;&#x7801;&#x4E0D;&#x7528;&#x6539;&#x52A8;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;<code>getList</code>&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const results = await Dog.getList()

results[0].leg // TS&#x63D0;&#x793A;&#x9519;&#x8BEF;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> Dog.getList()

results[<span class="hljs-number">0</span>].leg <span class="hljs-comment">// TS&#x63D0;&#x793A;&#x9519;&#x8BEF;</span></code></pre><p>&#x4F46;&#x662F;&#x5982;&#x679C;&#x4F60;&#x50CF;&#x4E0A;&#x8FB9;&#x90A3;&#x6837;&#x4F7F;&#x7528;&#x7684;&#x8BDD;&#xFF0C;TS&#x4F1A;&#x63D0;&#x793A;&#x9519;&#x8BEF;&#x7684;&#xFF1A;<code>[ts] &#x7C7B;&#x578B;&#x201C;Animal&#x201D;&#x4E0A;&#x4E0D;&#x5B58;&#x5728;&#x5C5E;&#x6027;&#x201C;leg&#x201D;&#x3002;</code>&#x3002;<br>&#x54C8;&#x54C8;&#xFF0C;&#x8FD9;&#x53C8;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x7EC6;&#x5FC3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x80FD;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;<code>getList</code>&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x4E00;&#x4E2A;<code>Animal[]</code>&#x7C7B;&#x578B;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x4E0A;&#x8FB9;&#x5E76;&#x6CA1;&#x6709;<code>leg</code>&#x5C5E;&#x6027;&#xFF0C;<code>Bird</code>&#x7684;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x4E5F;&#x662F;&#x5982;&#x6B64;&#x3002;</p><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6559;<code>TS</code>&#x8BA4;&#x8BC6;&#x6211;&#x4EEC;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x9700;&#x8981;&#x9488;&#x5BF9;<code>Animal</code>&#x7684;&#x5B9A;&#x4E49;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#x4E86;&#xFF0C;&#x7528;&#x5230;&#x4E86; __&#x8303;&#x578B;__&#x3002;<br>&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x5728;&#x51FD;&#x6570;&#x4E0A;&#x8FB9;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x8303;&#x578B;&#x7684;&#x5B9A;&#x4E49;&#xFF0C;&#x5E76;&#x4E14;&#x6DFB;&#x52A0;&#x9650;&#x5236;&#x4FDD;&#x8BC1;&#x4F20;&#x5165;&#x7684;&#x8303;&#x578B;&#x7C7B;&#x578B;&#x4E00;&#x5B9A;&#x662F;&#x7EE7;&#x627F;&#x81EA;<code>Animal</code>&#x7684;&#xFF0C;&#x5728;&#x8FD4;&#x56DE;&#x503C;&#x8F6C;&#x6362;&#x5176;&#x7C7B;&#x578B;&#x4E3A;<code>T</code>&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x529F;&#x80FD;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal {
  static async getList&lt;T extends Animal&gt;() {
    const results = await this.findAll({
      raw: true,
    })
    return results as T[]
  }
}

const dogList = await Dog.getList&lt;Dog&gt;()
// &#x6216;&#x8005;&#x4E0D;&#x4F5C;&#x4EFB;&#x4F55;&#x4FEE;&#x6539;&#xFF0C;&#x76F4;&#x63A5;&#x5728;&#x5916;&#x8FB9;&#x624B;&#x52A8;as&#x4E5F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x7684;&#x6548;&#x679C;
// &#x4F46;&#x662F;&#x8FD9;&#x6837;&#x8FD8;&#x662F;&#x4E0D;&#x592A;&#x7075;&#x6D3B;&#xFF0C;&#x56E0;&#x4E3A;&#x4F60;&#x8981;&#x9884;&#x5148;&#x77E5;&#x9053;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x5177;&#x4F53;&#x7C7B;&#x578B;&#x7ED3;&#x6784;&#xFF0C;&#x5C06;&#x9884;&#x671F;&#x7C7B;&#x578B;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#xFF0C;&#x7531;&#x51FD;&#x6570;&#x53BB;&#x7EC4;&#x88C5;&#x8FD4;&#x56DE;&#x7684;&#x7C7B;&#x578B;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x63A8;&#x8350;&#x7684;
const dogList = await Dog.getList() as Dog[]

console.log(dogList[0].leg) // success" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">async</span> getList&lt;T extends Animal&gt;() {
    <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.findAll({
      <span class="hljs-attr">raw</span>: <span class="hljs-literal">true</span>,
    })
    <span class="hljs-keyword">return</span> results <span class="hljs-keyword">as</span> T[]
  }
}

<span class="hljs-keyword">const</span> dogList = <span class="hljs-keyword">await</span> Dog.getList&lt;Dog&gt;()
<span class="hljs-comment">// &#x6216;&#x8005;&#x4E0D;&#x4F5C;&#x4EFB;&#x4F55;&#x4FEE;&#x6539;&#xFF0C;&#x76F4;&#x63A5;&#x5728;&#x5916;&#x8FB9;&#x624B;&#x52A8;as&#x4E5F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x7684;&#x6548;&#x679C;</span>
<span class="hljs-comment">// &#x4F46;&#x662F;&#x8FD9;&#x6837;&#x8FD8;&#x662F;&#x4E0D;&#x592A;&#x7075;&#x6D3B;&#xFF0C;&#x56E0;&#x4E3A;&#x4F60;&#x8981;&#x9884;&#x5148;&#x77E5;&#x9053;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x5177;&#x4F53;&#x7C7B;&#x578B;&#x7ED3;&#x6784;&#xFF0C;&#x5C06;&#x9884;&#x671F;&#x7C7B;&#x578B;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#xFF0C;&#x7531;&#x51FD;&#x6570;&#x53BB;&#x7EC4;&#x88C5;&#x8FD4;&#x56DE;&#x7684;&#x7C7B;&#x578B;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x63A8;&#x8350;&#x7684;</span>
<span class="hljs-keyword">const</span> dogList = <span class="hljs-keyword">await</span> Dog.getList() <span class="hljs-keyword">as</span> Dog[]

<span class="hljs-built_in">console</span>.log(dogList[<span class="hljs-number">0</span>].leg) <span class="hljs-comment">// success</span></code></pre><p>&#x8FD9;&#x65F6;&#x518D;&#x4F7F;&#x7528;<code>leg</code>&#x5C5E;&#x6027;&#x5C31;&#x4E0D;&#x4F1A;&#x51FA;&#x9519;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x4F7F;&#x7528;&#x8303;&#x578B;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x4F4F;&#x6DFB;&#x52A0;<code>extends Animal</code>&#x7684;&#x7EA6;&#x675F;&#xFF0C;&#x4E0D;&#x7136;<code>TS</code>&#x4F1A;&#x8BA4;&#x4E3A;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x4EFB;&#x610F;&#x7C7B;&#x578B;&#xFF0C;&#x90A3;&#x4E48;&#x5F88;&#x96BE;&#x4FDD;&#x8BC1;&#x53EF;&#x4EE5;&#x6B63;&#x786E;&#x7684;&#x517C;&#x5BB9;<code>Animal</code>&#xFF0C;&#x4F46;&#x662F;&#x7EE7;&#x627F;&#x81EA;<code>Animal</code>&#x7684;&#x4E00;&#x5B9A;&#x662F;&#x53EF;&#x4EE5;&#x517C;&#x5BB9;&#x7684;&#x3002;</p><p>&#x5F53;&#x7136;&#x5982;&#x679C;&#x8FDE;&#x8FD9;&#x91CC;&#x7684;&#x8303;&#x578B;&#x6216;&#x8005;<code>as</code>&#x4E5F;&#x4E0D;&#x60F3;&#x5199;&#x7684;&#x8BDD;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x5728;&#x5B50;&#x7C7B;&#x4E2D;&#x9488;&#x5BF9;&#x7236;&#x7C7B;&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x91CD;&#x5199;&#x3002;<br>&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x5B8C;&#x6574;&#x7684;&#x5B9E;&#x73B0;&#x903B;&#x8F91;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x83B7;&#x53D6;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x7136;&#x540E;&#x4FEE;&#x6539;&#x4E3A;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x7C7B;&#x578B;&#x5373;&#x53EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Dog extends Animal {
  static async getList() {
    // &#x8C03;&#x7528;&#x7236;&#x7C7B;&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x8FD4;&#x56DE;&#x503C;&#x6307;&#x5B9A;&#x4E3A;&#x67D0;&#x4E2A;&#x7C7B;&#x578B;
    const results = await super.getList()
    return results as Dog[]
  }
}

// &#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x8FD4;&#x56DE;&#x503C;&#x7C7B;&#x578B;&#x4E86;
const dogList = await Dog.getList()

console.log(dogList[0].leg) // success" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">async</span> getList() {
    <span class="hljs-comment">// &#x8C03;&#x7528;&#x7236;&#x7C7B;&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x8FD4;&#x56DE;&#x503C;&#x6307;&#x5B9A;&#x4E3A;&#x67D0;&#x4E2A;&#x7C7B;&#x578B;</span>
    <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-keyword">super</span>.getList()
    <span class="hljs-keyword">return</span> results <span class="hljs-keyword">as</span> Dog[]
  }
}

<span class="hljs-comment">// &#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x8FD4;&#x56DE;&#x503C;&#x7C7B;&#x578B;&#x4E86;</span>
<span class="hljs-keyword">const</span> dogList = <span class="hljs-keyword">await</span> Dog.getList()

<span class="hljs-built_in">console</span>.log(dogList[<span class="hljs-number">0</span>].leg) <span class="hljs-comment">// success</span></code></pre><h2 id="articleHeader9">&#x5C0F;&#x7ED3;</h2><p>&#x672C;&#x6587;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x5F15;&#x5B50;&#xFF0C;&#x4E00;&#x4E9B;&#x7B80;&#x5355;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x53EA;&#x4E3A;&#x4F53;&#x73B0;&#x51FA;&#x4E09;&#x8005;&#xFF08;<code>SQL</code>&#x3001;<code>Sequelize</code>&#x548C;<code>Sequelize-typescript</code>&#xFF09;&#x4E4B;&#x95F4;&#x7684;&#x533A;&#x522B;&#xFF0C;<code>Sequelize</code>&#x4E2D;&#x6709;&#x66F4;&#x591A;&#x9AD8;&#x9636;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x7C7B;&#x4F3C;&#x6620;&#x5C04;&#x5173;&#x7CFB;&#x4E4B;&#x7C7B;&#x7684;&#xFF0C;&#x8FD9;&#x4E9B;&#x5728;<code>Sequelize-typescript</code>&#x4E2D;&#x90FD;&#x6709;&#x5BF9;&#x5E94;&#x7684;&#x4F53;&#x73B0;&#xFF0C;&#x800C;&#x4E14;&#x56E0;&#x4E3A;&#x4F7F;&#x7528;&#x4E86;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x5B9E;&#x73B0;&#x8FD9;&#x4E9B;&#x529F;&#x80FD;&#x6240;&#x9700;&#x7684;&#x4EE3;&#x7801;&#x4F1A;&#x51CF;&#x5C11;&#x5F88;&#x591A;&#xFF0C;&#x770B;&#x8D77;&#x6765;&#x4E5F;&#x4F1A;&#x66F4;&#x6E05;&#x6670;&#x3002;</p><p><em>&#x5F53;&#x7136;&#x4E86;&#xFF0C;<code>ORM</code>&#x8FD9;&#x79CD;&#x4E1C;&#x897F;&#x4E5F;&#x4E0D;&#x662F;&#x8BF4;&#x8981;&#x4E00;&#x80A1;&#x8111;&#x7684;&#x4E0A;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x521D;&#x5B66;&#x8005;&#xFF0C;&#x4ECE;&#x4E2A;&#x4EBA;&#x5C42;&#x9762;&#x4E0A;&#x6211;&#x4E0D;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x6837;&#x4F1A;&#x5C11;&#x4E86;&#x4E00;&#x4E2A;&#x63A5;&#x89E6;SQL&#x7684;&#x673A;&#x4F1A;</em><br><em>&#x5982;&#x679C;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x4E5F;&#x4E0D;&#x662F;&#x5F88;&#x590D;&#x6742;&#xFF0C;&#x6216;&#x8005;&#x53EF;&#x9884;&#x671F;&#x7684;&#x672A;&#x6765;&#x4E5F;&#x4E0D;&#x4F1A;&#x592A;&#x590D;&#x6742;&#xFF0C;&#x90A3;&#x4E48;&#x4F7F;&#x7528;<code>ORM</code>&#x4E5F;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x610F;&#x4E49;&#xFF0C;&#x8FD8;&#x8BA9;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x53D8;&#x5F97;&#x590D;&#x6742;&#x8D77;&#x6765;</em><br><em>&#x4EE5;&#x53CA;&#xFF0C;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#x6765;&#x8BF4;&#xFF0C;&#x901A;&#x7528;&#x5C31;&#x610F;&#x5473;&#x7740;&#x59A5;&#x534F;&#xFF0C;&#x4E3A;&#x4E86;&#x4FDD;&#x8BC1;&#x591A;&#x4E2A;&#x6570;&#x636E;&#x5E93;&#x4E4B;&#x95F4;&#x7684;&#x6548;&#x679C;&#x90FD;&#x4E00;&#x81F4;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x629B;&#x5F03;&#x4E00;&#x4E9B;&#x6570;&#x636E;&#x5E93;&#x72EC;&#x6709;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x660E;&#x786E;&#x7684;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x7279;&#x6027;&#xFF0C;&#x90A3;&#x4E48;<code>ORM</code>&#x4E5F;&#x4E0D;&#x4F1A;&#x592A;&#x9002;&#x5408;</em><br><strong>&#x9009;&#x62E9;&#x6700;&#x5408;&#x9002;&#x7684;&#xFF0C;&#x8981;&#x77E5;&#x9053;&#x4F7F;&#x7528;&#x67D0;&#x6837;&#x4E1C;&#x897F;&#x7684;&#x610F;&#x4E49;</strong></p><p>&#x6700;&#x7EC8;&#x7684;&#x4E00;&#x4E2A;&#x793A;&#x4F8B;&#x653E;&#x5728;&#x4E86;GitHub&#x4E0A;&#xFF1A;<a href="https://github.com/jiasm/notebook/tree/master/labs/storage/typescript/sequelize" rel="nofollow noreferrer" target="_blank">notebook | typescript/sequelize</a></p><p>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;</p><ul><li><a href="https://www.npmjs.com/package/mysql" rel="nofollow noreferrer" target="_blank">mysql | npm</a></li><li><a href="http://docs.sequelizejs.com/" rel="nofollow noreferrer" target="_blank">sequelize</a></li><li><a href="https://www.npmjs.com/package/sequelize-typescript" rel="nofollow noreferrer" target="_blank">sequelize-typescript | npm</a></li><li><a href="https://stackoverflow.com/questions/398134/what-are-the-advantages-of-using-an-orm" rel="nofollow noreferrer" target="_blank">waht are the advantages of using an orm</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用TS+Sequelize实现更简洁的CRUD

## 原文链接
[https://segmentfault.com/a/1190000016335790](https://segmentfault.com/a/1190000016335790)


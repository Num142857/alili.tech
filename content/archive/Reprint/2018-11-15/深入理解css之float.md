---
title: 深入理解css之float
hidden: true
categories: reprint
slug: 83becf88
date: 2018-11-15 02:30:08
---

{{< raw >}}
<h3>&#x524D;&#x8A00;</h3><p>&#x5728;css&#x4E2D;&#xFF0C;&#x662F;&#x5B58;&#x5728;&#x6D41;&#x7684;&#x6982;&#x5FF5;&#x7684;&#x3002;&#x5728;&#x6B63;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x9875;&#x9762;&#x603B;&#x662F;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#xFF0C;&#x4ECE;&#x4E0A;&#x5230;&#x4E0B;&#x5E03;&#x5C40;&#xFF0C;&#x8FD9;&#x79CD;&#x88AB;&#x79F0;&#x4E3A;&#x6B63;&#x5E38;&#x7684;&#x6D41;&#x3002;&#x4F46;&#x662F;&#x6709;&#x5F88;&#x591A;&#x60C5;&#x51B5;&#xFF0C;&#x6B63;&#x5E38;&#x6D41;&#x662F;&#x6CA1;&#x529E;&#x6CD5;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E9B;&#x624B;&#x6BB5;&#x6765;&#x7834;&#x574F;&#x6D41;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x4E00;&#x4E9B;&#x7279;&#x6B8A;&#x7684;&#x5E03;&#x5C40;&#xFF0C;&#x800C;&#x672C;&#x8282;&#x7684;&#x4E3B;&#x89D2;float&#x5C31;&#x5177;&#x5907;&#x7834;&#x574F;&#x6D41;&#x7684;&#x7279;&#x6027;&#x3002;</p><h3>float&#x8BBE;&#x8BA1;&#x7684;&#x521D;&#x8877;</h3><p>&#x5F88;&#x591A;&#x65B0;&#x624B;&#x5728;&#x5E03;&#x5C40;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x603B;&#x559C;&#x6B22;&#x7528;float&#x6765;&#x5B9E;&#x73B0;&#x3002;&#x4F8B;&#x5982;&#x4E00;&#x4E2A;&#x4E09;&#x680F;&#x5E03;&#x5C40;&#xFF0C;&#x5DE6;&#x53F3;&#x56FA;&#x5B9A;&#xFF0C;&#x4E2D;&#x95F4;&#x81EA;&#x9002;&#x5E94;&#xFF0C;&#x6709;&#x4E9B;&#x4EBA;&#x4F1A;&#x901A;&#x8FC7;float&#x6765;&#x4E00;&#x5217;&#x4E00;&#x5217;&#x628A;&#x5B83;&#x4EEC;&#x780C;&#x8D77;&#x6765;&#x3002;&#x8FD9;&#x6837;&#x7684;&#x5E03;&#x5C40;&#x6781;&#x5176;&#x5BB9;&#x6613;&#x5D29;&#x6E83;&#xFF0C;&#x53EA;&#x8981;&#x9AD8;&#x5EA6;&#x6216;&#x8005;&#x5BBD;&#x5EA6;&#x7A0D;&#x5FAE;&#x6709;&#x4E9B;&#x53D8;&#x5316;&#xFF0C;&#x6574;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x4F1A;&#x9519;&#x4E71;&#x3002;&#x56E0;&#x6B64;float&#x8BBE;&#x8BA1;&#x7684;&#x521D;&#x8877;&#x5E76;&#x4E0D;&#x662F;&#x7528;&#x6765;&#x5E03;&#x5C40;&#x7684;&#xFF0C;&#x5176;&#x672C;&#x610F;&#x4EC5;&#x4EC5;&#x662F;&#x5B9E;&#x73B0;&#x56FE;&#x7247;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6548;&#x679C;&#xFF0C;&#x5373;&#x56FE;&#x7247;&#x5DE6;&#x6D6E;&#x52A8;&#xFF0C;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x56FE;&#x7247;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbfWi8?w=810&amp;h=346" src="https://static.alili.tech/img/bVbfWi8?w=810&amp;h=346" alt="&#x6587;&#x5B57;&#x73AF;&#x7ED5;" title="&#x6587;&#x5B57;&#x73AF;&#x7ED5;"></span></p><pre><code class="css">
.float {
    width: 150px;
    float: left;
}
.content {
    width: 400px;
}
</code></pre><pre><code class="html">
&lt;div&gt;
    &lt;img src=&quot;./card.jpg&quot; alt=&quot;&quot; class=&quot;float&quot;&gt;
    &lt;p class=&quot;content&quot;&gt;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&lt;/p&gt;
&lt;/div&gt;
</code></pre><h3>float&#x7684;&#x7279;&#x6027;</h3><p>&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E86;float&#x5C5E;&#x6027;&#xFF0C;&#x4F1A;&#x8868;&#x73B0;&#x51FA;&#x5982;&#x4E0B;&#x7279;&#x6027;&#xFF1A;</p><ul><li>&#x5305;&#x88F9;&#x6027;</li><li>&#x5757;&#x72B6;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;</li><li>&#x7834;&#x574F;&#x6587;&#x6863;&#x6D41;</li><li>&#x6CA1;&#x6709;margin&#x5408;&#x5E76;</li></ul><h4>&#x5305;&#x88F9;&#x6027;</h4><p>&#x5305;&#x88F9;&#x6027;&#x5305;&#x542B;&#x4E86;&#x5305;&#x88F9;&#x548C;&#x81EA;&#x9002;&#x5E94;&#x4E24;&#x4E2A;&#x7279;&#x6027;&#x3002;</p><p>&#x5305;&#x88F9;&#x6307;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#xFF0C;&#x5982;&#x679C;&#x5B50;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;&#x8DB3;&#x591F;&#x5C0F;&#xFF0C;&#x5219;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x5C31;&#x662F;&#x8BE5;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbfWjb?w=360&amp;h=216" src="https://static.alili.tech/img/bVbfWjb?w=360&amp;h=216" alt="&#x5305;&#x88F9;&#x6027;" title="&#x5305;&#x88F9;&#x6027;"></span></p><pre><code class="css">
.float {
    float: left;
}
</code></pre><pre><code class="html">
&lt;p class=&quot;float&quot;&gt;
    &lt;span&gt;&#x8FD9;&#x662F;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;&#x5B50;&#x5143;&#x7D20;&lt;/span&gt;
&lt;/p&gt;
</code></pre><p>&#x81EA;&#x9002;&#x5E94;&#x6307;&#x7684;&#x662F;&#x5982;&#x679C;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;&#x7236;&#x5143;&#x7D20;&#x6709;&#x8BBE;&#x7F6E;&#x5BBD;&#x5EA6;&#xFF0C;&#x5E76;&#x4E14;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;&#x8D85;&#x51FA;&#x4E86;&#x7236;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x6700;&#x7EC8;&#x8868;&#x73B0;&#x4E3A;&#x7236;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbfWjd?w=314&amp;h=272" src="https://static.alili.tech/img/bVbfWjd?w=314&amp;h=272" alt="&#x81EA;&#x9002;&#x5E94;" title="&#x81EA;&#x9002;&#x5E94;"></span></p><pre><code class="css">
.father {
    width: 100px;
}

.float {
    float: left;
}
</code></pre><pre><code class="html">
&lt;div class=&quot;father&quot;&gt;
    &lt;p class=&quot;float&quot;&gt;
        &lt;span&gt;&#x8FD9;&#x662F;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;&#x5B50;&#x5143;&#x7D20;&lt;/span&gt;
    &lt;/p&gt;
&lt;/div&gt;
</code></pre><h4>&#x5757;&#x72B6;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;</h4><p>&#x8BBE;&#x5B9A;&#x4E86;float&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5176;display&#x7684;&#x6700;&#x7EC8;&#x503C;&#x4F1A;&#x8868;&#x73B0;&#x4E3A;block&#x6216;&#x8005;table&#xFF0C;&#x5177;&#x4F53;&#x8F6C;&#x6362;&#x5982;&#x4E0B;&#x8868;&#xFF1A;</p><table><thead><tr><th>&#x8BBE;&#x5B9A;&#x503C;</th><th>&#x8BA1;&#x7B97;&#x503C;</th></tr></thead><tbody><tr><td>inline</td><td>block</td></tr><tr><td>inline-block</td><td>block</td></tr><tr><td>inline-table</td><td>table</td></tr><tr><td>table-row</td><td>block</td></tr><tr><td>table-row-group</td><td>block</td></tr><tr><td>table-column</td><td>block</td></tr><tr><td>table-column-group</td><td>block</td></tr><tr><td>table-cell</td><td>block</td></tr><tr><td>table-caption</td><td>block</td></tr><tr><td>table-header-group</td><td>block</td></tr><tr><td>table-footer-group</td><td>block</td></tr></tbody></table><p>&#x56E0;&#x6B64;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E86;float&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x5199;&#x6CD5;&#x662F;&#x591A;&#x4F59;&#x7684;&#xFF1A;</p><pre><code class="css">
    .float {
        float: left:
        display: block;
    }

    .float {
        float: left;
        vertical-align: middle; /* &#x4E0D;&#x8D77;&#x4F5C;&#x7528; */
    }
</code></pre><p>&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;&#x5C5E;&#x4E8E;BFC&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x6B64;&#x5904;&#x5148;&#x4E0D;&#x5C55;&#x5F00;&#x3002;</p><h4>&#x7834;&#x574F;&#x6587;&#x6863;&#x6D41;</h4><p>&#x8FD9;&#x662F;float&#x6700;&#x672C;&#x8D28;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x56E0;&#x6B64;float&#x8BBE;&#x8BA1;&#x7684;&#x521D;&#x8877;&#x5C31;&#x662F;&#x7834;&#x574F;&#x6587;&#x6863;&#x6D41;&#x3002;&#x8BBE;&#x7F6E;float&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x7236;&#x5143;&#x7D20;&#x9AD8;&#x5EA6;&#x584C;&#x9677;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbfWji?w=1334&amp;h=388" src="https://static.alili.tech/img/bVbfWji?w=1334&amp;h=388" alt="&#x7834;&#x574F;&#x6027;" title="&#x7834;&#x574F;&#x6027;"></span></p><pre><code class="css">
.float {
    float: left;
}
</code></pre><pre><code class="html">
&lt;div class=&quot;father&quot;&gt;
    &lt;img src=&quot;./card.jpg&quot; alt=&quot;&quot; class=&quot;float&quot;&gt;
&lt;/div&gt;
&lt;p&gt;
    &#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;
&lt;/p&gt;
</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x7236;&#x5143;&#x7D20;&#x7684;&#x9AD8;&#x5EA6;&#x4E3A;0&#xFF0C;&#x4F46;&#x8FD9;&#x4E0D;&#x662F;bug&#xFF0C;&#x800C;&#x662F;float&#x672C;&#x8EAB;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x8BBE;&#x8BA1;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x53EA;&#x6709;&#x8BA9;&#x7236;&#x5143;&#x7D20;&#x9AD8;&#x5EA6;&#x584C;&#x9677;&#x4E86;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x5143;&#x7D20;&#x624D;&#x6709;&#x673A;&#x4F1A;&#x6D6E;&#x4E0A;&#x6765;&#x3002;&#x4F46;&#x662F;&#x4EC5;&#x4EC5;&#x662F;&#x8FD9;&#x6837;&#x8FD8;&#x662F;&#x4E0D;&#x53EF;&#x4EE5;&#x5F62;&#x6210;&#x56FE;&#x7247;&#x73AF;&#x7ED5;&#x6548;&#x679C;&#x7684;&#xFF0C;&#x4E0D;&#x7136;&#x6587;&#x5B57;&#x6D6E;&#x4E0A;&#x6765;&#x5C31;&#x53EA;&#x4F1A;&#x8986;&#x76D6;&#x5728;&#x56FE;&#x7247;&#x4E0A;&#x9762;&#x3002;&#x8FD9;&#x91CC;&#x9762;&#x8FD8;&#x9690;&#x85CF;&#x7740;&#x4E00;&#x4E2A;&#x7279;&#x6027;&#xFF1A;</p><ul><li>&#x884C;&#x6846;&#x76D2;&#x5B50;&#x548C;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;&#x4E0D;&#x53EF;&#x91CD;&#x53E0;&#x6027;</li></ul><p>&#x610F;&#x601D;&#x662F;&#x8BF4;&#x884C;&#x6846;&#x76D2;&#x5B50;&#x548C;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x53D1;&#x751F;&#x91CD;&#x53E0;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x6587;&#x5B57;&#x6D6E;&#x4E0A;&#x53BB;&#x4E4B;&#x540E;&#x624D;&#x4E0D;&#x4F1A;&#x8986;&#x76D6;&#x5728;&#x56FE;&#x7247;&#x4E4B;&#x4E0A;&#x3002;&#x5373;&#x4F7F;&#x6211;&#x4EEC;&#x7ED9;&#x6587;&#x5B57;&#x8BBE;&#x7F6E;margin&#x8D1F;&#x503C;&#x4E5F;&#x4E0D;&#x4F1A;&#x8D77;&#x4F5C;&#x7528;&#x3002;</p><h4>&#x6CA1;&#x6709;margin&#x5408;&#x5E76;</h4><p>&#x8BBE;&#x7F6E;&#x4E86;float&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x7531;&#x4E8E;&#x5F62;&#x6210;&#x4E86;BFC&#xFF0C;&#x56E0;&#x6B64;&#x4E5F;&#x5C31;&#x6CA1;&#x6709;&#x4E86;margin&#x5408;&#x5E76;&#x3002;</p><h3>float&#x4F5C;&#x7528;&#x673A;&#x5236;</h3><p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><pre><code class="css">
.float {
    float: right;
}
</code></pre><pre><code class="html">
&lt;div&gt;
    &lt;span&gt;&#x6807;&#x9898;&lt;/span&gt;
    &lt;a class=&quot;float&quot;&gt;&#x94FE;&#x63A5;&lt;/a&gt;
&lt;/div&gt;
</code></pre><p>&#x5728;&#x6807;&#x51C6;&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#xFF0C;&#x201C;&#x6807;&#x9898;&#x201D;&#x548C;&#x201C;&#x94FE;&#x63A5;&#x201D;&#x4F1A;&#x5728;&#x540C;&#x4E00;&#x884C;&#x5C55;&#x793A;&#xFF0C;&#x5E76;&#x4E14;&#x201C;&#x94FE;&#x63A5;&#x201D;&#x4F1A;&#x6D6E;&#x52A8;&#x5728;&#x53F3;&#x8FB9;&#x3002;&#x4F46;&#x662F;&#x5982;&#x679C;&#x201C;&#x6807;&#x9898;&#x201D;&#x975E;&#x5E38;&#x957F;&#xFF0C;&#x4E00;&#x884C;&#x653E;&#x4E0D;&#x4E0B;&#x5462;&#xFF0C;&#x201C;&#x94FE;&#x63A5;&#x201D;&#x662F;&#x6D6E;&#x52A8;&#x5728;&#x7B2C;&#x4E00;&#x884C;&#x8FD8;&#x662F;&#x7B2C;&#x4E8C;&#x884C;&#x5462;&#xFF1F;&#x7B54;&#x6848;&#x662F;&#x7B2C;&#x4E8C;&#x884C;&#xFF0C;&#x8981;&#x60F3;&#x89E3;&#x91CA;&#x8FD9;&#x4E2A;&#xFF0C;&#x6211;&#x4EEC;&#x5F97;&#x5148;&#x7406;&#x89E3;&#x4E24;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x201C;&#x6D6E;&#x52A8;&#x951A;&#x70B9;&#x201D;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x201C;&#x6D6E;&#x52A8;&#x53C2;&#x8003;&#x201D;&#xFF1A;</p><ul><li>&#x6D6E;&#x52A8;&#x951A;&#x70B9;&#x662F;float&#x5143;&#x7D20;&#x6240;&#x5728;&#x7684;&#x201C;&#x6D41;&#x201D;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x70B9;&#xFF0C;&#x8FD9;&#x4E2A;&#x70B9;&#x672C;&#x8EAB;&#x5E76;&#x4E0D;&#x6D6E;&#x52A8;&#xFF0C;&#x8868;&#x73B0;&#x5F97;&#x5C31;&#x50CF;&#x662F;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;margin&#x3001;padding&#x548C;border&#x7684;&#x7A7A;&#x7684;&#x5185;&#x8054;&#x5143;&#x7D20;&#x3002;</li><li>&#x6D6E;&#x52A8;&#x53C2;&#x8003;&#x6307;&#x7684;&#x662F;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x5BF9;&#x9F50;&#x53C2;&#x8003;&#x7684;&#x5B9E;&#x4F53;&#x3002;</li></ul><p>float&#x5143;&#x7D20;&#x7684;&#x201C;&#x6D6E;&#x52A8;&#x53C2;&#x8003;&#x201D;&#x662F;&#x884C;&#x6846;&#x76D2;&#x5B50;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;float&#x5143;&#x7D20;&#x5728;&#x5F53;&#x524D;&#x201C;&#x884C;&#x6846;&#x76D2;&#x5B50;&#x201D;&#x5185;&#x5B9A;&#x4F4D;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x201C;&#x94FE;&#x63A5;&#x201D;&#x4F1A;&#x5728;&#x7B2C;&#x4E8C;&#x884C;&#x5C55;&#x793A;&#x3002;&#x4F46;&#x662F;&#x4E5F;&#x6709;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#x662F;&#xFF0C;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x524D;&#x540E;&#x5E76;&#x6CA1;&#x6709;&#x5185;&#x8054;&#x5143;&#x7D20;&#xFF0C;&#x56E0;&#x6B64;&#x4E5F;&#x5C31;&#x4E0D;&#x5B58;&#x5728;&#x884C;&#x6846;&#x76D2;&#x5B50;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x5C31;&#x662F;&#x201C;&#x6D6E;&#x52A8;&#x951A;&#x70B9;&#x201D;&#x5728;&#x8D77;&#x4F5C;&#x7528;&#x3002;&#x56E0;&#x4E3A;&#x201C;&#x6D6E;&#x52A8;&#x951A;&#x70B9;&#x201D;&#x8868;&#x73B0;&#x5F97;&#x50CF;&#x4E00;&#x4E2A;&#x5185;&#x8054;&#x5143;&#x7D20;&#xFF0C;&#x6709;&#x5185;&#x8054;&#x5143;&#x7D20;&#xFF0C;&#x81EA;&#x7136;&#x5C31;&#x6709;&#x884C;&#x6846;&#x76D2;&#x5B50;&#xFF0C;&#x53EA;&#x662F;&#x8FD9;&#x4E2A;&#x76D2;&#x5B50;&#x770B;&#x4E0D;&#x89C1;&#x4E5F;&#x6478;&#x4E0D;&#x7740;&#x7F62;&#x4E86;&#x3002;</p><h3>float&#x5B9E;&#x73B0;&#x6D41;&#x4F53;&#x5E03;&#x5C40;</h3><p>&#x524D;&#x9762;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x53EA;&#x8981;&#x7A0D;&#x5FAE;&#x6539;&#x9020;&#x4E00;&#x4E0B;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4E24;&#x680F;&#x6216;&#x591A;&#x680F;&#x7684;&#x81EA;&#x9002;&#x5E94;&#x5E03;&#x5C40;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code class="css">
.father {
    overflow: hidden;
    height: 200px;
}

.float {
    float: left;
    width: 100px;
}

.content {
    margin-left: 120px;
}
</code></pre><pre><code class="html">
&lt;div class=&quot;father&quot;&gt;
    &lt;img src=&quot;./card.jpg&quot; alt=&quot;&quot; class=&quot;float&quot;&gt;
    &lt;p class=&quot;content&quot;&gt;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&lt;/p&gt;
&lt;/div&gt;
</code></pre><h3>&#x603B;&#x7ED3;</h3><ul><li>float&#x8BBE;&#x8BA1;&#x7684;&#x521D;&#x8877;&#x4E0D;&#x662F;&#x5E03;&#x5C40;&#xFF0C;&#x800C;&#x662F;&#x6587;&#x5B57;&#x73AF;&#x7ED5;&#x6548;&#x679C;</li><li>float&#x7684;&#x7279;&#x6027;&#xFF1A;&#x5305;&#x88F9;&#x6027;&#x3001;&#x5757;&#x72B6;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;&#x3001;&#x7834;&#x574F;&#x6027;&#x3001;&#x6CA1;&#x6709;margin&#x5408;&#x5E76;</li><li>float&#x7684;&#x673A;&#x5236;&#xFF1A;&#x6D6E;&#x52A8;&#x951A;&#x70B9;&#x548C;&#x6D6E;&#x52A8;&#x53C2;&#x8003;</li><li>float&#x5B9E;&#x73B0;&#x81EA;&#x9002;&#x5E94;&#x5E03;&#x5C40;&#x7684;&#x601D;&#x8DEF;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解css之float

## 原文链接
[https://segmentfault.com/a/1190000016153055](https://segmentfault.com/a/1190000016153055)


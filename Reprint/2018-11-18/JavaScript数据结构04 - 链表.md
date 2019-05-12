---
title: 'JavaScript数据结构04 - 链表' 
date: 2018-11-18 3:32:07
hidden: true
slug: o09lz40oqgc
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x5B9A;&#x4E49;</h2><h3 id="articleHeader1">1.1 &#x6982;&#x5FF5;</h3><p>&#x524D;&#x9762;&#x6211;&#x4EEC;&#x5B66;&#x4E60;&#x4E86;<a href="https://segmentfault.com/a/1190000015768412">&#x6570;&#x7EC4;</a>&#x8FD9;&#x79CD;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;&#x6570;&#x7EC4;&#xFF08;&#x6216;&#x8005;&#x4E5F;&#x53EF;&#x4EE5;&#x79F0;&#x4E3A;&#x5217;&#x8868;&#xFF09;&#x662F;&#x4E00;&#x79CD;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x7684;&#x5B58;&#x50A8;&#x6570;&#x636E;&#x5E8F;&#x5217;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;&#x5728;&#x8FD9;&#x4E00;&#x8282;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x5B66;&#x4E60;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x548C;&#x4F7F;&#x7528;<strong>&#x94FE;&#x8868;</strong>&#x8FD9;&#x79CD;&#x52A8;&#x6001;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE;&#x4E2D;&#x4EFB;&#x610F;&#x6DFB;&#x52A0;&#x6216;&#x79FB;&#x9664;&#x9879;&#xFF0C;&#x5B83;&#x4F1A;&#x6309;&#x9700;&#x8FDB;&#x884C;&#x6269;&#x5BB9;&#x3002;</p><p>&#x8981;&#x5B58;&#x50A8;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x6570;&#x7EC4;&#xFF08;&#x6216;&#x5217;&#x8868;&#xFF09;&#x53EF;&#x80FD;&#x662F;&#x6700;&#x5E38;&#x7528;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x5B83;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x4FBF;&#x5229;&#x7684;<strong>[]</strong>&#x8BED;&#x6CD5;&#x6765;&#x8BBF;&#x95EE;&#x5B83;&#x7684;&#x5143;&#x7D20;&#x3002;&#x7136;&#x800C;&#xFF0C;&#x8FD9;&#x79CD;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x6709;&#x4E00;&#x4E2A;&#x7F3A;&#x70B9;&#xFF1A;&#xFF08;&#x5728;&#x5927;&#x591A;&#x6570;&#x5F3A;&#x7C7B;&#x578B;&#x8BED;&#x8A00;&#x4E2D;&#xFF09;&#x6570;&#x7EC4;&#x7684;&#x5927;&#x5C0F;&#x662F;&#x56FA;&#x5B9A;&#x7684;&#xFF0C;&#x9700;&#x8981;&#x9884;&#x5148;&#x5206;&#x914D;&#xFF0C;&#x4ECE;&#x6570;&#x7EC4;&#x7684;&#x8D77;&#x70B9;&#x6216;&#x4E2D;&#x95F4;&#x63D2;&#x5165;&#x6216;&#x79FB;&#x9664;&#x9879;&#x7684;&#x6210;&#x672C;&#x5F88;&#x9AD8;&#xFF0C;&#x56E0;&#x4E3A;&#x9700;&#x8981;&#x79FB;&#x52A8;&#x5143;&#x7D20;&#x3002;<br><strong>&#xFF08;&#x6CE8;&#x610F;&#xFF1A;&#x5728;JavaScript&#x4E2D;&#x6570;&#x7EC4;&#x7684;&#x5927;&#x5C0F;&#x968F;&#x65F6;&#x53EF;&#x53D8;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x9884;&#x5148;&#x5B9A;&#x4E49;&#x957F;&#x5EA6;&#xFF09;</strong></p><p><strong>&#x94FE;&#x8868;</strong>&#x5B58;&#x50A8;&#x6709;&#x5E8F;&#x7684;&#x5143;&#x7D20;&#x96C6;&#x5408;&#xFF0C;&#x4F46;&#x4E0D;&#x540C;&#x4E8E;&#x6570;&#x7EC4;&#xFF0C;&#x94FE;&#x8868;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x5E76;&#x4E0D;&#x662F;&#x8FDE;&#x7EED;&#x653E;&#x7F6E;&#x7684;&#x3002;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x7531;&#x4E00;&#x4E2A;&#x5B58;&#x50A8;&#x5143;&#x7D20;&#x672C;&#x8EAB;&#x7684;&#x8282;&#x70B9;&#x548C;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x4E0B;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x5F15;&#x7528;&#xFF08;&#x4E5F;&#x79F0;&#x6307;&#x9488;&#x6216;&#x94FE;&#x63A5;&#xFF09;&#x7EC4;&#x6210;&#x3002;</p><p>&#x76F8;&#x5BF9;&#x4E8E;&#x4F20;&#x7EDF;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x94FE;&#x8868;&#x7684;&#x4E00;&#x4E2A;&#x597D;&#x5904;&#x5728;&#x4E8E;&#xFF0C;&#x6DFB;&#x52A0;&#x6216;&#x5220;&#x9664;&#x5143;&#x7D20;&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x9700;&#x8981;&#x79FB;&#x52A8;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x3002;&#x7136;&#x800C;&#xFF0C;&#x94FE;&#x8868;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x6307;&#x9488;&#xFF0C;&#x56E0;&#x6B64;&#x5B9E;&#x73B0;&#x94FE;&#x8868;&#x65F6;&#x9700;&#x8981;&#x989D;&#x5916;&#x6CE8;&#x610F;&#x3002;&#x6570;&#x7EC4;&#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x7EC6;&#x8282;&#x662F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x4EFB;&#x4F55;&#x4F4D;&#x7F6E;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x800C;&#x60F3;&#x8981;&#x8BBF;&#x95EE;&#x94FE;&#x8868;&#x4E2D;&#x95F4;&#x7684;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x9700;&#x8981;&#x4ECE;&#x8D77;&#x70B9;&#xFF08;&#x8868;&#x5934;&#xFF09;&#x5F00;&#x59CB;&#x8FED;&#x4EE3;&#x5217;&#x8868;&#x76F4;&#x5230;&#x627E;&#x5230;&#x6240;&#x9700;&#x7684;&#x5143;&#x7D20;&#x3002;</p><p><strong>&#x706B;&#x8F66;</strong>&#x53EF;&#x4EE5;&#x5F53;&#x505A;&#x751F;&#x6D3B;&#x4E2D;&#x4E00;&#x4E2A;&#x5178;&#x578B;&#x7684;&#x94FE;&#x8868;&#x7684;&#x4F8B;&#x5B50;&#x3002;&#x4E00;&#x5217;&#x706B;&#x8F66;&#x662F;&#x7531;&#x4E00;&#x7CFB;&#x5217;&#x8F66;&#x53A2;&#x7EC4;&#x6210;&#x7684;&#x3002;&#x6BCF;&#x8282;&#x8F66;&#x53A2;&#x90FD;&#x76F8;&#x4E92;&#x8FDE;&#x63A5;&#x3002;&#x4F60;&#x5F88;&#x5BB9;&#x6613;&#x5206;&#x79BB;&#x4E00;&#x8282;&#x8F66;&#x53A2;&#xFF0C;&#x6539;&#x53D8;&#x5B83;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x6DFB;&#x52A0;&#x6216;&#x79FB;&#x9664;&#x5B83;&#x3002;</p><h3 id="articleHeader2">1.2 &#x5206;&#x7C7B;</h3><p><strong>&#x94FE;&#x8868;&#x6700;&#x5E38;&#x7528;&#x7684;&#x6709;&#x4E09;&#x7C7B;</strong>&#xFF1A;</p><ol><li>&#x5355;&#x5411;&#x94FE;&#x8868;</li><li>&#x53CC;&#x5411;&#x94FE;&#x8868;</li><li>&#x5FAA;&#x73AF;&#x94FE;&#x8868;</li></ol><h2 id="articleHeader3">&#x4E8C;&#x3001;&#x94FE;&#x8868;&#x7684;&#x5B9E;&#x73B0;</h2><h3 id="articleHeader4">2.1 &#x5355;&#x5411;&#x94FE;&#x8868;</h3><p>&#x521B;&#x5EFA;&#x5355;&#x5411;&#x94FE;&#x8868;&#x7C7B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// SinglyLinkedList
function SinglyLinkedList () {
  function Node (element) {
    this.element = element;
    this.next = null;
  }

  var length = 0;
  var head = null;
  
  this.append = function (element) {};
  this.insert = function (position, element) {};
  this.removeAt = function (position) {};
  this.remove = function (element) {};
  this.indexOf = function (element) {};
  this.isEmpty = function () {};
  this.size = function () {};
  this.getHead = function () {};
  this.toString = function () {};
  this.print = function () {};
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">// SinglyLinkedList</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SinglyLinkedList</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Node</span> <span class="hljs-params">(element)</span> </span>{
    <span class="hljs-keyword">this</span>.element = element;
    <span class="hljs-keyword">this</span>.next = <span class="hljs-literal">null</span>;
  }

  <span class="hljs-keyword">var</span> length = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">var</span> head = <span class="hljs-literal">null</span>;
  
  <span class="hljs-keyword">this</span>.append = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(element)</span> </span>{};
  <span class="hljs-keyword">this</span>.insert = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(position, element)</span> </span>{};
  <span class="hljs-keyword">this</span>.removeAt = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(position)</span> </span>{};
  <span class="hljs-keyword">this</span>.remove = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(element)</span> </span>{};
  <span class="hljs-keyword">this</span>.indexOf = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(element)</span> </span>{};
  <span class="hljs-keyword">this</span>.isEmpty = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{};
  <span class="hljs-keyword">this</span>.size = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{};
  <span class="hljs-keyword">this</span>.getHead = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{};
  <span class="hljs-keyword">this</span>.toString = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{};
  <span class="hljs-keyword">this</span>.print = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{};
}</code></pre><p>SinglyLinkedList&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x8F85;&#x52A9;&#x7C7B;Node&#x3002;Node&#x7C7B;&#x8868;&#x793A;&#x8981;&#x52A0;&#x5165;&#x94FE;&#x8868;&#x7684;&#x9879;&#x3002;&#x5B83;&#x5305;&#x542B;&#x4E00;&#x4E2A;element&#x5C5E;&#x6027;&#xFF0C;&#x5373;&#x8981;&#x6DFB;&#x52A0;&#x5230;&#x94FE;&#x8868;&#x7684;&#x503C;&#xFF0C;&#x4EE5;&#x53CA;&#x4E00;&#x4E2A;next&#x5C5E;&#x6027;&#xFF0C;&#x5373;&#x6307;&#x5411;&#x94FE;&#x8868;&#x4E2D;&#x4E0B;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x9879;&#x7684;&#x6307;&#x9488;&#x3002;</p><p>&#x94FE;&#x8868;&#x91CC;&#x9762;&#x6709;&#x4E00;&#x4E9B;&#x58F0;&#x660E;&#x7684;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li>append(element)&#xFF1A;&#x5411;&#x94FE;&#x8868;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x65B0;&#x9879;</li><li>insert(position, element)&#xFF1A;&#x5411;&#x94FE;&#x8868;&#x7684;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x9879;</li><li>removeAt(position)&#xFF1A;&#x4ECE;&#x94FE;&#x8868;&#x7684;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x79FB;&#x9664;&#x4E00;&#x9879;</li><li>remove(element)&#xFF1A;&#x4ECE;&#x94FE;&#x8868;&#x4E2D;&#x79FB;&#x9664;&#x4E00;&#x9879;</li><li>indexOf(element)&#xFF1A;&#x8FD4;&#x56DE;&#x5143;&#x7D20;&#x5728;&#x94FE;&#x8868;&#x4E2D;&#x7684;&#x7D22;&#x5F15;&#x3002;&#x5982;&#x679C;&#x94FE;&#x8868;&#x4E2D;&#x6CA1;&#x6709;&#x8BE5;&#x5143;&#x7D20;&#x5219;&#x8FD4;&#x56DE;-1</li><li>isEmpty()&#xFF1A;&#x5982;&#x679C;&#x94FE;&#x8868;&#x4E2D;&#x4E0D;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5982;&#x679C;&#x94FE;&#x8868;&#x957F;&#x5EA6;&#x5927;&#x4E8E;0&#xFF0C;&#x8FD4;&#x56DE;false</li><li>size()&#xFF1A;&#x8FD4;&#x56DE;&#x94FE;&#x8868;&#x5305;&#x542B;&#x7684;&#x5143;&#x7D20;&#x4E2A;&#x6570;&#xFF0C;&#x4E0E;&#x6570;&#x7EC4;&#x7684;length&#x5C5E;&#x6027;&#x7C7B;&#x4F3C;</li><li>getHead()&#xFF1A;&#x8FD4;&#x56DE;&#x94FE;&#x8868;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</li><li>toString()&#xFF1A;&#x7531;&#x4E8E;&#x94FE;&#x8868;&#x4F7F;&#x7528;&#x4E86;Node&#x7C7B;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x91CD;&#x5199;&#x7EE7;&#x627F;&#x81EA;JavaScript&#x5BF9;&#x8C61;&#x9ED8;&#x8BA4;&#x7684;toString()&#x65B9;&#x6CD5;&#xFF0C;&#x8BA9;&#x5176;&#x53EA;&#x8F93;&#x51FA;&#x5143;&#x7D20;&#x7684;&#x503C;</li><li>print()&#xFF1A;&#x6253;&#x5370;&#x94FE;&#x8868;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;</li></ul><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x4E00;&#x4E00;&#x5B9E;&#x73B0;&#x8FD9;&#x4E9B;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // &#x5411;&#x94FE;&#x8868;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x9879;
  this.append = function (element) {
    var node = new Node(element);
    var currentNode = head;

    // &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x7A7A;&#x94FE;&#x8868;
    if (currentNode === null) {
      // &#x7A7A;&#x94FE;&#x8868;
      head = node;
    } else {
      // &#x4ECE;head&#x5F00;&#x59CB;&#x4E00;&#x76F4;&#x627E;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;node
      while (currentNode.next) {
        // &#x540E;&#x9762;&#x8FD8;&#x6709;node
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }

    length++;
  };

  // &#x5411;&#x94FE;&#x8868;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x9879;
  this.insert = function (position, element) {
    if (position &lt; 0 &amp;&amp; position &gt; length) {
      // &#x8D8A;&#x754C;
      return false;
    } else {
      var node = new Node(element);
      var index = 0;
      var currentNode = head;
      var previousNode;

      if (position === 0) {
        node.next = currentNode;
        head = node;
      } else {
        while (index &lt; position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next; 
        }
  
        previousNode.next = node;
        node.next = currentNode;
      }

      length++;

      return true;
    }
  };

  // &#x4ECE;&#x94FE;&#x8868;&#x7684;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x79FB;&#x9664;&#x4E00;&#x9879;
  this.removeAt = function (position) {
    if (position &lt; 0 &amp;&amp; position &gt;= length || length === 0) {
      // &#x8D8A;&#x754C;
      return false;
    } else {
      var currentNode = head;
      var index = 0;
      var previousNode;

      if (position === 0) {
        head = currentNode.next;
      } else {
        while (index &lt; position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next;
        }
        previousNode.next = currentNode.next;
      }

      length--;

      return true;
    }
  };

  // &#x4ECE;&#x94FE;&#x8868;&#x7684;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x79FB;&#x9664;&#x4E00;&#x9879;
  this.removeAt = function (position) {
    if (position &lt; 0 &amp;&amp; position &gt;= length || length === 0) {
      // &#x8D8A;&#x754C;
      return false;
    } else {
      var currentNode = head;
      var index = 0;
      var previousNode;

      if (position === 0) {
        head = currentNode.next;
      } else {
        while (index &lt; position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next;
        }
        previousNode.next = currentNode.next;
      }

      length--;

      return true;
    }
  };

  // &#x4ECE;&#x94FE;&#x8868;&#x4E2D;&#x79FB;&#x9664;&#x6307;&#x5B9A;&#x9879;
  this.remove = function (element) {
    var index = this.indexOf(element);
    return this.removeAt(index);
  };

  // &#x8FD4;&#x56DE;&#x5143;&#x7D20;&#x5728;&#x94FE;&#x8868;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x5982;&#x679C;&#x94FE;&#x8868;&#x4E2D;&#x6CA1;&#x6709;&#x8BE5;&#x5143;&#x7D20;&#x5219;&#x8FD4;&#x56DE;-1
  this.indexOf = function (element) {
    var currentNode = head;
    var index = 0;

    while (currentNode) {
      if (currentNode.element === element) {
        return index;
      }

      index++;
      currentNode = currentNode.next;
    }

    return -1;
  };

  // &#x5982;&#x679C;&#x94FE;&#x8868;&#x4E2D;&#x4E0D;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5982;&#x679C;&#x94FE;&#x8868;&#x957F;&#x5EA6;&#x5927;&#x4E8E;0&#xFF0C;&#x8FD4;&#x56DE;false
  this.isEmpty = function () {
    return length == 0;
  };

  // &#x8FD4;&#x56DE;&#x94FE;&#x8868;&#x5305;&#x542B;&#x7684;&#x5143;&#x7D20;&#x4E2A;&#x6570;&#xFF0C;&#x4E0E;&#x6570;&#x7EC4;&#x7684;length&#x5C5E;&#x6027;&#x7C7B;&#x4F3C;
  this.size = function () {
    return length;
  };

  // &#x83B7;&#x53D6;&#x94FE;&#x8868;&#x5934;&#x90E8;&#x5143;&#x7D20;
  this.getHead = function () {
    return head.element;
  };

  // &#x7531;&#x4E8E;&#x94FE;&#x8868;&#x4F7F;&#x7528;&#x4E86;Node&#x7C7B;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x91CD;&#x5199;&#x7EE7;&#x627F;&#x81EA;JavaScript&#x5BF9;&#x8C61;&#x9ED8;&#x8BA4;&#x7684;toString()&#x65B9;&#x6CD5;&#xFF0C;&#x8BA9;&#x5176;&#x53EA;&#x8F93;&#x51FA;&#x5143;&#x7D20;&#x7684;&#x503C;
  this.toString = function () {
    var currentNode = head;
    var string = &apos;&apos;;

    while (currentNode) {
      string += &apos;,&apos; + currentNode.element;
      currentNode = currentNode.next;
    }

    return string.slice(1);
  };

  this.print = function () {
    console.log(this.toString());
  };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  <span class="hljs-comment">// &#x5411;&#x94FE;&#x8868;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x9879;</span>
  <span class="hljs-keyword">this</span>.append = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element</span>) </span>{
    <span class="hljs-keyword">var</span> node = <span class="hljs-keyword">new</span> Node(element);
    <span class="hljs-keyword">var</span> currentNode = head;

    <span class="hljs-comment">// &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x7A7A;&#x94FE;&#x8868;</span>
    <span class="hljs-keyword">if</span> (currentNode === <span class="hljs-literal">null</span>) {
      <span class="hljs-comment">// &#x7A7A;&#x94FE;&#x8868;</span>
      head = node;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// &#x4ECE;head&#x5F00;&#x59CB;&#x4E00;&#x76F4;&#x627E;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;node</span>
      <span class="hljs-keyword">while</span> (currentNode.next) {
        <span class="hljs-comment">// &#x540E;&#x9762;&#x8FD8;&#x6709;node</span>
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }

    length++;
  };

  <span class="hljs-comment">// &#x5411;&#x94FE;&#x8868;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x9879;</span>
  <span class="hljs-keyword">this</span>.insert = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">position, element</span>) </span>{
    <span class="hljs-keyword">if</span> (position &lt; <span class="hljs-number">0</span> &amp;&amp; position &gt; length) {
      <span class="hljs-comment">// &#x8D8A;&#x754C;</span>
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">var</span> node = <span class="hljs-keyword">new</span> Node(element);
      <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">var</span> currentNode = head;
      <span class="hljs-keyword">var</span> previousNode;

      <span class="hljs-keyword">if</span> (position === <span class="hljs-number">0</span>) {
        node.next = currentNode;
        head = node;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">while</span> (index &lt; position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next; 
        }
  
        previousNode.next = node;
        node.next = currentNode;
      }

      length++;

      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
  };

  <span class="hljs-comment">// &#x4ECE;&#x94FE;&#x8868;&#x7684;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x79FB;&#x9664;&#x4E00;&#x9879;</span>
  <span class="hljs-keyword">this</span>.removeAt = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">if</span> (position &lt; <span class="hljs-number">0</span> &amp;&amp; position &gt;= length || length === <span class="hljs-number">0</span>) {
      <span class="hljs-comment">// &#x8D8A;&#x754C;</span>
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">var</span> currentNode = head;
      <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">var</span> previousNode;

      <span class="hljs-keyword">if</span> (position === <span class="hljs-number">0</span>) {
        head = currentNode.next;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">while</span> (index &lt; position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next;
        }
        previousNode.next = currentNode.next;
      }

      length--;

      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
  };

  <span class="hljs-comment">// &#x4ECE;&#x94FE;&#x8868;&#x7684;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x79FB;&#x9664;&#x4E00;&#x9879;</span>
  <span class="hljs-keyword">this</span>.removeAt = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">if</span> (position &lt; <span class="hljs-number">0</span> &amp;&amp; position &gt;= length || length === <span class="hljs-number">0</span>) {
      <span class="hljs-comment">// &#x8D8A;&#x754C;</span>
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">var</span> currentNode = head;
      <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">var</span> previousNode;

      <span class="hljs-keyword">if</span> (position === <span class="hljs-number">0</span>) {
        head = currentNode.next;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">while</span> (index &lt; position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next;
        }
        previousNode.next = currentNode.next;
      }

      length--;

      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
  };

  <span class="hljs-comment">// &#x4ECE;&#x94FE;&#x8868;&#x4E2D;&#x79FB;&#x9664;&#x6307;&#x5B9A;&#x9879;</span>
  <span class="hljs-keyword">this</span>.remove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element</span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.indexOf(element);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.removeAt(index);
  };

  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x5143;&#x7D20;&#x5728;&#x94FE;&#x8868;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x5982;&#x679C;&#x94FE;&#x8868;&#x4E2D;&#x6CA1;&#x6709;&#x8BE5;&#x5143;&#x7D20;&#x5219;&#x8FD4;&#x56DE;-1</span>
  <span class="hljs-keyword">this</span>.indexOf = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element</span>) </span>{
    <span class="hljs-keyword">var</span> currentNode = head;
    <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">while</span> (currentNode) {
      <span class="hljs-keyword">if</span> (currentNode.element === element) {
        <span class="hljs-keyword">return</span> index;
      }

      index++;
      currentNode = currentNode.next;
    }

    <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
  };

  <span class="hljs-comment">// &#x5982;&#x679C;&#x94FE;&#x8868;&#x4E2D;&#x4E0D;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5982;&#x679C;&#x94FE;&#x8868;&#x957F;&#x5EA6;&#x5927;&#x4E8E;0&#xFF0C;&#x8FD4;&#x56DE;false</span>
  <span class="hljs-keyword">this</span>.isEmpty = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> length == <span class="hljs-number">0</span>;
  };

  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x94FE;&#x8868;&#x5305;&#x542B;&#x7684;&#x5143;&#x7D20;&#x4E2A;&#x6570;&#xFF0C;&#x4E0E;&#x6570;&#x7EC4;&#x7684;length&#x5C5E;&#x6027;&#x7C7B;&#x4F3C;</span>
  <span class="hljs-keyword">this</span>.size = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> length;
  };

  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x94FE;&#x8868;&#x5934;&#x90E8;&#x5143;&#x7D20;</span>
  <span class="hljs-keyword">this</span>.getHead = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> head.element;
  };

  <span class="hljs-comment">// &#x7531;&#x4E8E;&#x94FE;&#x8868;&#x4F7F;&#x7528;&#x4E86;Node&#x7C7B;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x91CD;&#x5199;&#x7EE7;&#x627F;&#x81EA;JavaScript&#x5BF9;&#x8C61;&#x9ED8;&#x8BA4;&#x7684;toString()&#x65B9;&#x6CD5;&#xFF0C;&#x8BA9;&#x5176;&#x53EA;&#x8F93;&#x51FA;&#x5143;&#x7D20;&#x7684;&#x503C;</span>
  <span class="hljs-keyword">this</span>.toString = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> currentNode = head;
    <span class="hljs-keyword">var</span> string = <span class="hljs-string">&apos;&apos;</span>;

    <span class="hljs-keyword">while</span> (currentNode) {
      string += <span class="hljs-string">&apos;,&apos;</span> + currentNode.element;
      currentNode = currentNode.next;
    }

    <span class="hljs-keyword">return</span> string.slice(<span class="hljs-number">1</span>);
  };

  <span class="hljs-keyword">this</span>.print = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.toString());
  };</code></pre><p>&#x521B;&#x5EFA;&#x5355;&#x5411;&#x94FE;&#x8868;&#x5B9E;&#x4F8B;&#x8FDB;&#x884C;&#x6D4B;&#x8BD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;&#x5355;&#x5411;&#x94FE;&#x8868;&#x5B9E;&#x4F8B;
var singlyLinked = new SinglyLinkedList();
console.log(singlyLinked.removeAt(0));              // true
console.log(singlyLinked.isEmpty());              // true
singlyLinked.append(&apos;Tom&apos;);                       
singlyLinked.append(&apos;Peter&apos;);
singlyLinked.append(&apos;Paul&apos;);
singlyLinked.print();                             // &quot;Tom,Peter,Paul&quot;
singlyLinked.insert(0, &apos;Susan&apos;);                  
singlyLinked.print();                             // &quot;Susan,Tom,Peter,Paul&quot;
singlyLinked.insert(1, &apos;Jack&apos;);                   
singlyLinked.print();                             // &quot;Susan,Jack,Tom,Peter,Paul&quot;
console.log(singlyLinked.getHead());              // &quot;Susan&quot;
console.log(singlyLinked.isEmpty());              // false
console.log(singlyLinked.indexOf(&apos;Peter&apos;));       // 3
console.log(singlyLinked.indexOf(&apos;Cris&apos;));        // -1
singlyLinked.remove(&apos;Tom&apos;);                       
singlyLinked.removeAt(2);                         
singlyLinked.print();                             // &quot;Susan,Jack,Paul&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code><span class="hljs-comment">// &#x521B;&#x5EFA;&#x5355;&#x5411;&#x94FE;&#x8868;&#x5B9E;&#x4F8B;</span>
var singlyLinked = <span class="hljs-keyword">new</span> SinglyLinkedList();
console.<span class="hljs-built_in">log</span>(singlyLinked.removeAt(<span class="hljs-number">0</span>));              <span class="hljs-comment">// true</span>
console.<span class="hljs-built_in">log</span>(singlyLinked.isEmpty());              <span class="hljs-comment">// true</span>
singlyLinked.<span class="hljs-built_in">append</span>(<span class="hljs-string">&apos;Tom&apos;</span>);                       
singlyLinked.<span class="hljs-built_in">append</span>(<span class="hljs-string">&apos;Peter&apos;</span>);
singlyLinked.<span class="hljs-built_in">append</span>(<span class="hljs-string">&apos;Paul&apos;</span>);
singlyLinked.<span class="hljs-built_in">print</span>();                             <span class="hljs-comment">// &quot;Tom,Peter,Paul&quot;</span>
singlyLinked.insert(<span class="hljs-number">0</span>, <span class="hljs-string">&apos;Susan&apos;</span>);                  
singlyLinked.<span class="hljs-built_in">print</span>();                             <span class="hljs-comment">// &quot;Susan,Tom,Peter,Paul&quot;</span>
singlyLinked.insert(<span class="hljs-number">1</span>, <span class="hljs-string">&apos;Jack&apos;</span>);                   
singlyLinked.<span class="hljs-built_in">print</span>();                             <span class="hljs-comment">// &quot;Susan,Jack,Tom,Peter,Paul&quot;</span>
console.<span class="hljs-built_in">log</span>(singlyLinked.getHead());              <span class="hljs-comment">// &quot;Susan&quot;</span>
console.<span class="hljs-built_in">log</span>(singlyLinked.isEmpty());              <span class="hljs-comment">// false</span>
console.<span class="hljs-built_in">log</span>(singlyLinked.indexOf(<span class="hljs-string">&apos;Peter&apos;</span>));       <span class="hljs-comment">// 3</span>
console.<span class="hljs-built_in">log</span>(singlyLinked.indexOf(<span class="hljs-string">&apos;Cris&apos;</span>));        <span class="hljs-comment">// -1</span>
singlyLinked.remove(<span class="hljs-string">&apos;Tom&apos;</span>);                       
singlyLinked.removeAt(<span class="hljs-number">2</span>);                         
singlyLinked.<span class="hljs-built_in">print</span>();                             <span class="hljs-comment">// &quot;Susan,Jack,Paul&quot;</span></code></pre><h3 id="articleHeader5">2.2 &#x53CC;&#x5411;&#x94FE;&#x8868;</h3><p><strong>&#x53CC;&#x5411;&#x94FE;&#x8868;</strong>&#x548C;&#x666E;&#x901A;&#x94FE;&#x8868;&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;&#xFF0C;&#x5728;&#x666E;&#x901A;&#x94FE;&#x8868;&#x4E2D;&#xFF0C;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x53EA;&#x6709;&#x94FE;&#x5411;&#x4E0B;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x7684;&#x94FE;&#x63A5;&#xFF0C;&#x800C;&#x5728;&#x53CC;&#x5411;&#x94FE;&#x8868;&#x4E2D;&#xFF0C;&#x94FE;&#x63A5;&#x662F;&#x53CC;&#x5411;&#x7684;&#xFF1A;&#x4E00;&#x4E2A;&#x94FE;&#x5411;&#x4E0B;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x94FE;&#x5411;&#x524D;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002;</p><p>&#x521B;&#x5EFA;&#x53CC;&#x5411;&#x94FE;&#x8868;&#x7C7B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;&#x53CC;&#x5411;&#x94FE;&#x8868;DoublyLinkedList&#x7C7B;
function DoublyLinkedList () {
  function Node (element) {
    this.element = element;
    this.next = null;
    this.prev = null;        // &#x65B0;&#x589E;
  }

  var length = 0;
  var head = null;
  var tail = null;          // &#x65B0;&#x589E;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">// &#x521B;&#x5EFA;&#x53CC;&#x5411;&#x94FE;&#x8868;DoublyLinkedList&#x7C7B;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DoublyLinkedList</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Node</span> <span class="hljs-params">(element)</span> </span>{
    <span class="hljs-keyword">this</span>.element = element;
    <span class="hljs-keyword">this</span>.next = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.prev = <span class="hljs-literal">null</span>;        <span class="hljs-comment">// &#x65B0;&#x589E;</span>
  }

  <span class="hljs-keyword">var</span> length = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">var</span> head = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">var</span> tail = <span class="hljs-literal">null</span>;          <span class="hljs-comment">// &#x65B0;&#x589E;</span>
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x53CC;&#x5411;&#x94FE;&#x8868;&#x5728;Node&#x7C7B;&#x91CC;&#x6709;prev&#x5C5E;&#x6027;&#xFF08;&#x4E00;&#x4E2A;&#x65B0;&#x6307;&#x9488;&#xFF09;&#xFF0C;&#x5728;DoublyLinkedList&#x7C7B;&#x91CC;&#x4E5F;&#x6709;&#x7528;&#x6765;&#x4FDD;&#x5B58;&#x5BF9;&#x5217;&#x8868;&#x6700;&#x540E;&#x4E00;&#x9879;&#x7684;&#x5F15;&#x7528;&#x7684;tail&#x5C5E;&#x6027;&#x3002;</p><p>&#x53CC;&#x5411;&#x94FE;&#x8868;&#x63D0;&#x4F9B;&#x4E86;&#x4E24;&#x79CD;&#x8FED;&#x4EE3;&#x5217;&#x8868;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;&#x4ECE;&#x5934;&#x5230;&#x5C3E;&#xFF0C;&#x6216;&#x8005;&#x4ECE;&#x5C3E;&#x5230;&#x5934;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x4E00;&#x4E2A;&#x7279;&#x5B9A;&#x8282;&#x70B9;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x6216;&#x524D;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002;</p><p>&#x5728;&#x5355;&#x5411;&#x94FE;&#x8868;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x8FED;&#x4EE3;&#x94FE;&#x8868;&#x65F6;&#x9519;&#x8FC7;&#x4E86;&#x8981;&#x627E;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x56DE;&#x5230;&#x94FE;&#x8868;&#x8D77;&#x70B9;&#xFF0C;&#x91CD;&#x65B0;&#x5F00;&#x59CB;&#x8FED;&#x4EE3;&#x3002;&#x5728;&#x53CC;&#x5411;&#x94FE;&#x8868;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x4ECE;&#x4EFB;&#x4E00;&#x8282;&#x70B9;&#xFF0C;&#x5411;&#x524D;&#x6216;&#x5411;&#x540E;&#x8FED;&#x4EE3;&#xFF0C;&#x8FD9;&#x662F;&#x53CC;&#x5411;&#x94FE;&#x8868;&#x7684;&#x4E00;&#x4E2A;&#x4F18;&#x70B9;&#x3002;</p><p>&#x5B9E;&#x73B0;&#x53CC;&#x5411;&#x94FE;&#x8868;&#x7684;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // &#x5411;&#x94FE;&#x8868;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x9879;
  this.append = function (element) {
    var node = new Node(element);
    var currentNode = tail;

    // &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x7A7A;&#x94FE;&#x8868;
    if (currentNode === null) {
      // &#x7A7A;&#x94FE;&#x8868;
      head = node;
      tail = node;
    } else {
      currentNode.next = node;
      node.prev = currentNode;
      tail = node; 
    }

    length++;
  };

  // &#x5411;&#x94FE;&#x8868;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x9879;
  this.insert = function (position, element) {
    if (position &lt; 0 &amp;&amp; position &gt; length) {
      // &#x8D8A;&#x754C;
      return false;
    } else {
      var node = new Node(element);
      var index = 0;
      var currentNode = head;
      var previousNode;

      if (position === 0) {
        if (!head) {
          head = node;
          tail = node;
        } else {
          node.next = currentNode;
          currentNode.prev = node;
          head = node;
        }
      } else if (position === length) {
        this.append(element);
      } else {
        while (index &lt; position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next; 
        }
  
        previousNode.next = node;
        node.next = currentNode;

        node.prev = previousNode;
        currentNode.prev = node;
      }

      length++;

      return true;
    }
  };

  // &#x4ECE;&#x94FE;&#x8868;&#x7684;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x79FB;&#x9664;&#x4E00;&#x9879;
  this.removeAt = function (position) {
    if (position &lt; 0 &amp;&amp; position &gt;= length || length === 0) {
      // &#x8D8A;&#x754C;
      return false;
    } else {
      var currentNode = head;
      var index = 0;
      var previousNode;

      if (position === 0) {
        // &#x79FB;&#x9664;&#x7B2C;&#x4E00;&#x9879;
        if (length === 1) {
          head = null;
          tail = null;
        } else {
          head = currentNode.next;
          head.prev = null;
        }
      } else if (position === length - 1) {
        // &#x79FB;&#x9664;&#x6700;&#x540E;&#x4E00;&#x9879;
        if (length === 1) {
          head = null;
          tail = null;
        } else {
          currentNode = tail;
          tail = currentNode.prev;
          tail.next = null;
        }
      } else {
        while (index &lt; position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next;
        }
        previousNode.next = currentNode.next;
        previousNode = currentNode.next.prev;
      }

      length--;

      return true;
    }
  };

  // &#x4ECE;&#x94FE;&#x8868;&#x4E2D;&#x79FB;&#x9664;&#x6307;&#x5B9A;&#x9879;
  this.remove = function (element) {
    var index = this.indexOf(element);
    return this.removeAt(index);
  };

  // &#x8FD4;&#x56DE;&#x5143;&#x7D20;&#x5728;&#x94FE;&#x8868;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x5982;&#x679C;&#x94FE;&#x8868;&#x4E2D;&#x6CA1;&#x6709;&#x8BE5;&#x5143;&#x7D20;&#x5219;&#x8FD4;&#x56DE;-1
  this.indexOf = function (element) {
    var currentNode = head;
    var index = 0;

    while (currentNode) {
      if (currentNode.element === element) {
        return index;
      }

      index++;
      currentNode = currentNode.next;
    }

    return -1;
  };

  // &#x5982;&#x679C;&#x94FE;&#x8868;&#x4E2D;&#x4E0D;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5982;&#x679C;&#x94FE;&#x8868;&#x957F;&#x5EA6;&#x5927;&#x4E8E;0&#xFF0C;&#x8FD4;&#x56DE;false
  this.isEmpty = function () {
    return length == 0;
  };

  // &#x8FD4;&#x56DE;&#x94FE;&#x8868;&#x5305;&#x542B;&#x7684;&#x5143;&#x7D20;&#x4E2A;&#x6570;&#xFF0C;&#x4E0E;&#x6570;&#x7EC4;&#x7684;length&#x5C5E;&#x6027;&#x7C7B;&#x4F3C;
  this.size = function () {
    return length;
  };

  // &#x83B7;&#x53D6;&#x94FE;&#x8868;&#x5934;&#x90E8;&#x5143;&#x7D20;
  this.getHead = function () {
    return head.element;
  };

  // &#x7531;&#x4E8E;&#x94FE;&#x8868;&#x4F7F;&#x7528;&#x4E86;Node&#x7C7B;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x91CD;&#x5199;&#x7EE7;&#x627F;&#x81EA;JavaScript&#x5BF9;&#x8C61;&#x9ED8;&#x8BA4;&#x7684;toString()&#x65B9;&#x6CD5;&#xFF0C;&#x8BA9;&#x5176;&#x53EA;&#x8F93;&#x51FA;&#x5143;&#x7D20;&#x7684;&#x503C;
  this.toString = function () {
    var currentNode = head;
    var string = &apos;&apos;;

    while (currentNode) {
      
      string += &apos;,&apos; + currentNode.element;
      currentNode = currentNode.next;
    }

    return string.slice(1);    
  };

  this.print = function () {
    console.log(this.toString());
  };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  <span class="hljs-comment">// &#x5411;&#x94FE;&#x8868;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x9879;</span>
  <span class="hljs-keyword">this</span>.append = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element</span>) </span>{
    <span class="hljs-keyword">var</span> node = <span class="hljs-keyword">new</span> Node(element);
    <span class="hljs-keyword">var</span> currentNode = tail;

    <span class="hljs-comment">// &#x5224;&#x65AD;&#x662F;&#x5426;&#x4E3A;&#x7A7A;&#x94FE;&#x8868;</span>
    <span class="hljs-keyword">if</span> (currentNode === <span class="hljs-literal">null</span>) {
      <span class="hljs-comment">// &#x7A7A;&#x94FE;&#x8868;</span>
      head = node;
      tail = node;
    } <span class="hljs-keyword">else</span> {
      currentNode.next = node;
      node.prev = currentNode;
      tail = node; 
    }

    length++;
  };

  <span class="hljs-comment">// &#x5411;&#x94FE;&#x8868;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x9879;</span>
  <span class="hljs-keyword">this</span>.insert = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">position, element</span>) </span>{
    <span class="hljs-keyword">if</span> (position &lt; <span class="hljs-number">0</span> &amp;&amp; position &gt; length) {
      <span class="hljs-comment">// &#x8D8A;&#x754C;</span>
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">var</span> node = <span class="hljs-keyword">new</span> Node(element);
      <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">var</span> currentNode = head;
      <span class="hljs-keyword">var</span> previousNode;

      <span class="hljs-keyword">if</span> (position === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">if</span> (!head) {
          head = node;
          tail = node;
        } <span class="hljs-keyword">else</span> {
          node.next = currentNode;
          currentNode.prev = node;
          head = node;
        }
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (position === length) {
        <span class="hljs-keyword">this</span>.append(element);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">while</span> (index &lt; position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next; 
        }
  
        previousNode.next = node;
        node.next = currentNode;

        node.prev = previousNode;
        currentNode.prev = node;
      }

      length++;

      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
  };

  <span class="hljs-comment">// &#x4ECE;&#x94FE;&#x8868;&#x7684;&#x7279;&#x5B9A;&#x4F4D;&#x7F6E;&#x79FB;&#x9664;&#x4E00;&#x9879;</span>
  <span class="hljs-keyword">this</span>.removeAt = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">if</span> (position &lt; <span class="hljs-number">0</span> &amp;&amp; position &gt;= length || length === <span class="hljs-number">0</span>) {
      <span class="hljs-comment">// &#x8D8A;&#x754C;</span>
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">var</span> currentNode = head;
      <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">var</span> previousNode;

      <span class="hljs-keyword">if</span> (position === <span class="hljs-number">0</span>) {
        <span class="hljs-comment">// &#x79FB;&#x9664;&#x7B2C;&#x4E00;&#x9879;</span>
        <span class="hljs-keyword">if</span> (length === <span class="hljs-number">1</span>) {
          head = <span class="hljs-literal">null</span>;
          tail = <span class="hljs-literal">null</span>;
        } <span class="hljs-keyword">else</span> {
          head = currentNode.next;
          head.prev = <span class="hljs-literal">null</span>;
        }
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (position === length - <span class="hljs-number">1</span>) {
        <span class="hljs-comment">// &#x79FB;&#x9664;&#x6700;&#x540E;&#x4E00;&#x9879;</span>
        <span class="hljs-keyword">if</span> (length === <span class="hljs-number">1</span>) {
          head = <span class="hljs-literal">null</span>;
          tail = <span class="hljs-literal">null</span>;
        } <span class="hljs-keyword">else</span> {
          currentNode = tail;
          tail = currentNode.prev;
          tail.next = <span class="hljs-literal">null</span>;
        }
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">while</span> (index &lt; position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next;
        }
        previousNode.next = currentNode.next;
        previousNode = currentNode.next.prev;
      }

      length--;

      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
  };

  <span class="hljs-comment">// &#x4ECE;&#x94FE;&#x8868;&#x4E2D;&#x79FB;&#x9664;&#x6307;&#x5B9A;&#x9879;</span>
  <span class="hljs-keyword">this</span>.remove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element</span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.indexOf(element);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.removeAt(index);
  };

  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x5143;&#x7D20;&#x5728;&#x94FE;&#x8868;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x5982;&#x679C;&#x94FE;&#x8868;&#x4E2D;&#x6CA1;&#x6709;&#x8BE5;&#x5143;&#x7D20;&#x5219;&#x8FD4;&#x56DE;-1</span>
  <span class="hljs-keyword">this</span>.indexOf = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element</span>) </span>{
    <span class="hljs-keyword">var</span> currentNode = head;
    <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">while</span> (currentNode) {
      <span class="hljs-keyword">if</span> (currentNode.element === element) {
        <span class="hljs-keyword">return</span> index;
      }

      index++;
      currentNode = currentNode.next;
    }

    <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
  };

  <span class="hljs-comment">// &#x5982;&#x679C;&#x94FE;&#x8868;&#x4E2D;&#x4E0D;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5982;&#x679C;&#x94FE;&#x8868;&#x957F;&#x5EA6;&#x5927;&#x4E8E;0&#xFF0C;&#x8FD4;&#x56DE;false</span>
  <span class="hljs-keyword">this</span>.isEmpty = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> length == <span class="hljs-number">0</span>;
  };

  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x94FE;&#x8868;&#x5305;&#x542B;&#x7684;&#x5143;&#x7D20;&#x4E2A;&#x6570;&#xFF0C;&#x4E0E;&#x6570;&#x7EC4;&#x7684;length&#x5C5E;&#x6027;&#x7C7B;&#x4F3C;</span>
  <span class="hljs-keyword">this</span>.size = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> length;
  };

  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x94FE;&#x8868;&#x5934;&#x90E8;&#x5143;&#x7D20;</span>
  <span class="hljs-keyword">this</span>.getHead = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> head.element;
  };

  <span class="hljs-comment">// &#x7531;&#x4E8E;&#x94FE;&#x8868;&#x4F7F;&#x7528;&#x4E86;Node&#x7C7B;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x91CD;&#x5199;&#x7EE7;&#x627F;&#x81EA;JavaScript&#x5BF9;&#x8C61;&#x9ED8;&#x8BA4;&#x7684;toString()&#x65B9;&#x6CD5;&#xFF0C;&#x8BA9;&#x5176;&#x53EA;&#x8F93;&#x51FA;&#x5143;&#x7D20;&#x7684;&#x503C;</span>
  <span class="hljs-keyword">this</span>.toString = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> currentNode = head;
    <span class="hljs-keyword">var</span> string = <span class="hljs-string">&apos;&apos;</span>;

    <span class="hljs-keyword">while</span> (currentNode) {
      
      string += <span class="hljs-string">&apos;,&apos;</span> + currentNode.element;
      currentNode = currentNode.next;
    }

    <span class="hljs-keyword">return</span> string.slice(<span class="hljs-number">1</span>);    
  };

  <span class="hljs-keyword">this</span>.print = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.toString());
  };</code></pre><p>&#x521B;&#x5EFA;&#x53CC;&#x5411;&#x94FE;&#x8868;&#x5B9E;&#x4F8B;&#x8FDB;&#x884C;&#x6D4B;&#x8BD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;&#x53CC;&#x5411;&#x94FE;&#x8868;
var doublyLinked = new DoublyLinkedList();
console.log(doublyLinked.isEmpty());              // true
doublyLinked.append(&apos;Tom&apos;);                       
doublyLinked.append(&apos;Peter&apos;);
doublyLinked.append(&apos;Paul&apos;);
doublyLinked.print();                             // &quot;Tom,Peter,Paul&quot;
doublyLinked.insert(0, &apos;Susan&apos;);                  
doublyLinked.print();                             // &quot;Susan,Tom,Peter,Paul&quot;
doublyLinked.insert(1, &apos;Jack&apos;);                   
doublyLinked.print();                             // &quot;Susan,Jack,Tom,Peter,Paul&quot;
console.log(doublyLinked.getHead());              // &quot;Susan&quot;
console.log(doublyLinked.isEmpty());              // false
console.log(doublyLinked.indexOf(&apos;Peter&apos;));       // 3
console.log(doublyLinked.indexOf(&apos;Cris&apos;));        // -1
doublyLinked.remove(&apos;Tom&apos;);                       
doublyLinked.removeAt(2);                         
doublyLinked.print();                             // &quot;Susan,Jack,Paul&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code><span class="hljs-comment">// &#x521B;&#x5EFA;&#x53CC;&#x5411;&#x94FE;&#x8868;</span>
var doublyLinked = <span class="hljs-keyword">new</span> DoublyLinkedList();
console.<span class="hljs-built_in">log</span>(doublyLinked.isEmpty());              <span class="hljs-comment">// true</span>
doublyLinked.<span class="hljs-built_in">append</span>(<span class="hljs-string">&apos;Tom&apos;</span>);                       
doublyLinked.<span class="hljs-built_in">append</span>(<span class="hljs-string">&apos;Peter&apos;</span>);
doublyLinked.<span class="hljs-built_in">append</span>(<span class="hljs-string">&apos;Paul&apos;</span>);
doublyLinked.<span class="hljs-built_in">print</span>();                             <span class="hljs-comment">// &quot;Tom,Peter,Paul&quot;</span>
doublyLinked.insert(<span class="hljs-number">0</span>, <span class="hljs-string">&apos;Susan&apos;</span>);                  
doublyLinked.<span class="hljs-built_in">print</span>();                             <span class="hljs-comment">// &quot;Susan,Tom,Peter,Paul&quot;</span>
doublyLinked.insert(<span class="hljs-number">1</span>, <span class="hljs-string">&apos;Jack&apos;</span>);                   
doublyLinked.<span class="hljs-built_in">print</span>();                             <span class="hljs-comment">// &quot;Susan,Jack,Tom,Peter,Paul&quot;</span>
console.<span class="hljs-built_in">log</span>(doublyLinked.getHead());              <span class="hljs-comment">// &quot;Susan&quot;</span>
console.<span class="hljs-built_in">log</span>(doublyLinked.isEmpty());              <span class="hljs-comment">// false</span>
console.<span class="hljs-built_in">log</span>(doublyLinked.indexOf(<span class="hljs-string">&apos;Peter&apos;</span>));       <span class="hljs-comment">// 3</span>
console.<span class="hljs-built_in">log</span>(doublyLinked.indexOf(<span class="hljs-string">&apos;Cris&apos;</span>));        <span class="hljs-comment">// -1</span>
doublyLinked.remove(<span class="hljs-string">&apos;Tom&apos;</span>);                       
doublyLinked.removeAt(<span class="hljs-number">2</span>);                         
doublyLinked.<span class="hljs-built_in">print</span>();                             <span class="hljs-comment">// &quot;Susan,Jack,Paul&quot;</span></code></pre><h3 id="articleHeader6">2.3 &#x5FAA;&#x73AF;&#x94FE;&#x8868;</h3><p>&#x5FAA;&#x73AF;&#x94FE;&#x8868;&#x53EF;&#x4EE5;&#x50CF;&#x5355;&#x5411;&#x94FE;&#x8868;&#x4E00;&#x6837;&#x53EA;&#x6709;&#x5355;&#x5411;&#x5F15;&#x7528;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x50CF;&#x53CC;&#x5411;&#x94FE;&#x8868;&#x4E00;&#x6837;&#x6709;&#x53CC;&#x5411;&#x5F15;&#x7528;&#x3002;&#x5FAA;&#x73AF;&#x94FE;&#x8868;&#x548C;&#x666E;&#x901A;&#x94FE;&#x8868;&#x4E4B;&#x95F4;&#x552F;&#x4E00;&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;&#xFF0C;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x6307;&#x5411;&#x4E0B;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x6307;&#x9488;&#xFF08;next&#xFF09;&#x4E0D;&#x662F;&#x5F15;&#x7528;null&#xFF0C;&#x800C;&#x662F;&#x6307;&#x5411;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF08;head&#xFF09;&#x3002;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x7ED3;&#x5408;&#x4E0A;&#x9762;&#x7684;&#x5355;&#x5411;&#x94FE;&#x8868;&#x548C;&#x53CC;&#x5411;&#x94FE;&#x8868;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x5FAA;&#x73AF;&#x94FE;&#x8868;&#x3002;</p><h2 id="articleHeader7">&#x4E09;&#x3001;&#x7ED3;&#x675F;</h2><p>&#x672C;&#x6587;&#x4F1A;&#x540C;&#x6B65;&#x5230;&#x6211;&#x7684;<a href="https://blog.liuxuan.site" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;</a>&#xFF0C;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x5230;&#x6211;&#x7684;<a href="https://github.com/leocoder351/data-structure" rel="nofollow noreferrer" target="_blank">github&#x4ED3;&#x5E93;&#x67E5;&#x770B;</a>&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#x8BDD;&#x6B22;&#x8FCE;&#x70B9;&#x4E00;&#x4E2A;Star~~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript数据结构04 - 链表

## 原文链接
[https://segmentfault.com/a/1190000015874540](https://segmentfault.com/a/1190000015874540)


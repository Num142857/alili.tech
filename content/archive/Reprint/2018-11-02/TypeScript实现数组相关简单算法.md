---
title: TypeScript实现数组相关简单算法
reprint: true
categories: reprint
abbrlink: da6c1d37
date: 2018-11-02 02:30:12
---

{{% raw %}}
<blockquote>&#x7B97;&#x6CD5;&#xFF08;algorithm&#xFF09;&#xFF0C;&#x5728;&#x6570;&#x5B66;&#xFF08;&#x7B97;&#x5B66;&#xFF09;&#x548C;&#x8BA1;&#x7B97;&#x673A;&#x79D1;&#x5B66;&#x4E4B;&#x4E2D;&#xFF0C;&#x4E3A;&#x4EFB;&#x4F55;&#x826F;&#x5B9A;&#x4E49;&#x7684;&#x5177;&#x4F53;&#x8BA1;&#x7B97;&#x6B65;&#x9AA4;&#x7684;&#x4E00;&#x4E2A;&#x5E8F;&#x5217;&#xFF0C;&#x5E38;&#x7528;&#x4E8E;&#x8BA1;&#x7B97;&#x3001;&#x6570;&#x636E;&#x5904;&#x7406;&#x548C;&#x81EA;&#x52A8;&#x63A8;&#x7406;&#x3002;&#x7CBE;&#x786E;&#x800C;&#x8A00;&#xFF0C;&#x7B97;&#x6CD5;&#x662F;&#x4E00;&#x4E2A;&#x8868;&#x793A;&#x4E3A;&#x6709;&#x9650;&#x957F;&#x5217;&#x8868;&#x7684;&#x6709;&#x6548;&#x65B9;&#x6CD5;&#x3002;&#x7B97;&#x6CD5;&#x5E94;&#x5305;&#x542B;&#x6E05;&#x6670;&#x5B9A;&#x4E49;&#x7684;&#x6307;&#x4EE4;&#x7528;&#x4E8E;&#x8BA1;&#x7B97;&#x51FD;&#x6570;&#x3002; - &#x6765;&#x81EA;&#x7EF4;&#x57FA;&#x767E;&#x79D1;</blockquote><h2 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;</h2><p>&#x7B97;&#x6CD5;&#x770B;&#x8D77;&#x6765;&#x5728;&#x79BB;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x7684;&#x5F00;&#x53D1;&#x8005;&#x4E0D;&#x662F;&#x5F88;&#x8FD1;&#xFF0C;&#x4F46;&#x662F;&#x5B9E;&#x9645;&#x4E0A;&#x53C8;&#x548C;&#x6211;&#x4EEC;&#x7684;&#x5F00;&#x53D1;&#x606F;&#x606F;&#x76F8;&#x5173;&#x3002;&#x4E0D;&#x540C;&#x7684;&#x7B97;&#x6CD5;&#x53EF;&#x80FD;&#x7528;&#x4E0D;&#x540C;&#x7684;&#x65F6;&#x95F4;&#x3001;&#x7A7A;&#x95F4;&#x6216;&#x6548;&#x7387;&#x6765;&#x5B8C;&#x6210;&#x540C;&#x6837;&#x7684;&#x4EFB;&#x52A1;&#x3002;&#x4E00;&#x4E2A;&#x7B97;&#x6CD5;&#x7684;&#x4F18;&#x52A3;&#x53EF;&#x4EE5;&#x7528;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E0E;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x6765;&#x8861;&#x91CF;&#x3002;&#x73B0;&#x5728;&#x60F3;&#x60F3;&#x5927;&#x5B66;&#x7684;&#x65F6;&#x5019;&#x6CA1;&#x6709;&#x597D;&#x597D;&#x7684;&#x5B66;&#x4E60;&#x7B97;&#x6CD5;&#x548C;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x771F;&#x7684;&#x662F;&#x540E;&#x6094;&#x7684;&#x5410;&#x8840;&#x3002;<strong>&#x672C;&#x6587;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7406;&#x89E3;&#x7B97;&#x6CD5;&#xFF0C;&#x5E76;&#x4E0D;&#x4F1A;&#x6DF1;&#x5165;&#x7684;&#x8BA8;&#x8BBA;&#x3002;&#x6BD5;&#x7ADF;&#x6BCF;&#x4E00;&#x4E2A;&#x6DF1;&#x5165;&#x8BA8;&#x8BBA;&#x90FD;&#x591F;&#x559D;&#x4E00;&#x58F6;&#x4E86;&#x3002;&#x53EA;&#x662F;&#x7406;&#x89E3;&#x4E00;&#x4E0B;&#x7B97;&#x6CD5;&#x7684;&#x601D;&#x7EF4;&#x548C;&#x5B9E;&#x73B0;&#x3002;</strong> &#x6BD5;&#x7ADF;9&#x6708;&#x662F;&#x4E2A;&#x8DF3;&#x69FD;&#x9EC4;&#x91D1;&#x65F6;&#x671F;&#xFF0C;&#x8BF4;&#x4E0D;&#x5B9A;&#x80FD;&#x5E2E;&#x4E0A;&#x4F60;&#x5F97;&#x5FD9;&#x5462;&#xFF1F;</p><p>&#x7B97;&#x6CD5;&#x5728;&#x5728;&#x6211;&#x770B;&#x6765;&#x6700;&#x76F4;&#x89C2;&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x5728;&#x4E8E;&#x53EF;&#x4EE5;&#x5F3A;&#x5316;&#x6211;&#x4EEC;&#x7684;&#x7F16;&#x7A0B;&#x601D;&#x7EF4;&#x903B;&#x8F91;&#x3002;&#x8BA9;&#x6211;&#x4E48;&#x517B;&#x6210;&#x662F;&#x7528;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x7684;&#x601D;&#x7EF4;&#x65B9;&#x5F0F;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x6765;&#x5165;&#x7B97;&#x6CD5;&#x7684;&#x5751;&#x3002;<strong>&#x672C;&#x6587;&#x4E2D;&#x63D0;&#x5230;&#x7684;&#x76F8;&#x5173;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x90FD;&#x662F;&#x76F8;&#x5BF9;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#x7684;</strong>&#x3002;&#x5927;&#x90E8;&#x5206;&#x6765;&#x81EA;<a href="https://leetcode-cn.com/" rel="nofollow noreferrer" target="_blank">leetcode</a>&#x6570;&#x7EC4;&#x90E8;&#x5206;&#x3002;&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x6211;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x5E76;&#x4E0D;&#x4E00;&#x5B9A;&#x662F;&#x6700;&#x4F18;&#x89E3;&#x3002;&#x6B22;&#x8FCE;&#x5404;&#x4F4D;&#x5927;&#x4F6C;&#x5728;<code>issue&#x4E2D;&#x63D0;&#x4EA4;</code>&#x66F4;&#x597D;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x3002;&#x89E3;&#x6790;&#x90FD;&#x5199;&#x5230;&#x4E86;&#x4EE3;&#x7801;&#x6CE8;&#x91CA;&#x4E2D;&#x3002;</p><p>&#x4E3A;&#x4E86;&#x907F;&#x514D;&#x4E00;&#x4E9B;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x6587;&#x4E2D;&#x7684;&#x793A;&#x4F8B;&#x4F7F;&#x7528;<code>Typescript</code>&#x7F16;&#x5199;&#xFF0C;<code>JavaScript</code> &#x90E8;&#x5206;&#x4EE3;&#x7801;&#x5728;<a href="https://github.com/QDMarkMan/usually-accumulated/blob/master/src/Algorithm.js" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x513F;</a>,&#x672C;&#x6587;&#x4E3B;&#x8981;&#x5206;&#x4E86;&#x4E24;&#x5927;&#x90E8;&#x5206; <strong>LeetCode/&#x7B80;&#x5355;&#x7B97;&#x6CD5;</strong></p><h2 id="articleHeader1">Leetcode&#x90E8;&#x5206;</h2><h3 id="articleHeader2">1&#xFF1A;&#x5220;&#x9664;&#x6392;&#x5E8F;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x91CD;&#x590D;&#x9879;</h3><blockquote>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6392;&#x5E8F;&#x6570;&#x7EC4;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x5728;&#x539F;&#x5730;&#x5220;&#x9664;&#x91CD;&#x590D;&#x51FA;&#x73B0;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x4F7F;&#x5F97;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x53EA;&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#xFF0C;&#x8FD4;&#x56DE;&#x79FB;&#x9664;&#x540E;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x957F;&#x5EA6;&#x3002;&#x4E0D;&#x8981;&#x4F7F;&#x7528;&#x989D;&#x5916;&#x7684;&#x6570;&#x7EC4;&#x7A7A;&#x95F4;&#xFF0C;&#x4F60;&#x5FC5;&#x987B;&#x5728;&#x539F;&#x5730;&#x4FEE;&#x6539;&#x8F93;&#x5165;&#x6570;&#x7EC4;&#x5E76;&#x5728;&#x4F7F;&#x7528; O(1) &#x989D;&#x5916;&#x7A7A;&#x95F4;&#x7684;&#x6761;&#x4EF6;&#x4E0B;&#x5B8C;&#x6210;&#x3002;</blockquote><p><strong>&#x793A;&#x4F8B;</strong><br>&#x7ED9;&#x5B9A;&#x6570;&#x7EC4; nums = [1,1,2],<br>&#x51FD;&#x6570;&#x5E94;&#x8BE5;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x957F;&#x5EA6; 2, &#x5E76;&#x4E14;&#x539F;&#x6570;&#x7EC4; nums &#x7684;&#x524D;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x88AB;&#x4FEE;&#x6539;&#x4E3A; 1, 2&#x3002;<br>&#x4F60;&#x4E0D;&#x9700;&#x8981;&#x8003;&#x8651;&#x6570;&#x7EC4;&#x4E2D;&#x8D85;&#x51FA;&#x65B0;&#x957F;&#x5EA6;&#x540E;&#x9762;&#x7684;&#x5143;&#x7D20;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 1 &#x5220;&#x9664;&#x6392;&#x5E8F;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x91CD;&#x590D;&#x9879;
 * &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6392;&#x5E8F;&#x6570;&#x7EC4;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x5728;&#x539F;&#x5730;&#x5220;&#x9664;&#x91CD;&#x590D;&#x51FA;&#x73B0;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x4F7F;&#x5F97;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x53EA;&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#xFF0C;&#x8FD4;&#x56DE;&#x79FB;&#x9664;&#x540E;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x957F;&#x5EA6;&#x3002;
 * &#x4E0D;&#x8981;&#x4F7F;&#x7528;&#x989D;&#x5916;&#x7684;&#x6570;&#x7EC4;&#x7A7A;&#x95F4;&#xFF0C;&#x4F60;&#x5FC5;&#x987B;&#x5728;&#x539F;&#x5730;&#x4FEE;&#x6539;&#x8F93;&#x5165;&#x6570;&#x7EC4;&#x5E76;&#x5728;&#x4F7F;&#x7528; O(1) &#x989D;&#x5916;&#x7A7A;&#x95F4;&#x7684;&#x6761;&#x4EF6;&#x4E0B;&#x5B8C;&#x6210;&#x3002;
 * &#x793A;&#x4F8B;
 * &#x7ED9;&#x5B9A;&#x6570;&#x7EC4; nums = [1,1,2], 
 * &#x51FD;&#x6570;&#x5E94;&#x8BE5;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x957F;&#x5EA6; 2, &#x5E76;&#x4E14;&#x539F;&#x6570;&#x7EC4; nums &#x7684;&#x524D;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x88AB;&#x4FEE;&#x6539;&#x4E3A; 1, 2&#x3002; 
 * &#x4F60;&#x4E0D;&#x9700;&#x8981;&#x8003;&#x8651;&#x6570;&#x7EC4;&#x4E2D;&#x8D85;&#x51FA;&#x65B0;&#x957F;&#x5EA6;&#x540E;&#x9762;&#x7684;&#x5143;&#x7D20;&#x3002;
 */
const removeDuplicates =  function(nums: number[]): number {
  let i: number = 0
  for (let j = 0; j &lt; nums.length; j++) {
    if(nums[j] !== nums[i]) {
      i++
      nums[i] = nums[j]
    }
  }
  nums.splice(i+1)
  console.log(nums)
  console.log(nums.length)
  return i + 1
}
/**
 * &#x89E3;&#x6790;
 * &#x65B9;&#x6CD5; &#x53CC;&#x6307;&#x9488;&#x6CD5;
 * i&#x662F;&#x6162;&#x6307;&#x9488;&#xFF0C;j&#x662F;&#x5FEB;&#x6307;&#x9488; &#x5F53;&#x6211;&#x4EEC;&#x9047;&#x5230; nums[j] \neq nums[i]nums[j]&#x2260;nums[i] &#x65F6;&#xFF0C;&#x8DF3;&#x8FC7;&#x91CD;&#x590D;&#x9879;&#x7684;&#x8FD0;&#x884C;&#x5DF2;&#x7ECF;&#x7ED3;&#x675F;&#xFF0C;
 * &#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x628A;&#x5B83;&#xFF08;nums[j]nums[j]&#xFF09;&#x7684;&#x503C;&#x590D;&#x5236;&#x5230; nums[i + 1]nums[i+1]&#x3002;&#x7136;&#x540E;&#x9012;&#x589E; ii&#xFF0C;&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x5C06;&#x518D;&#x6B21;&#x91CD;&#x590D;&#x76F8;&#x540C;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x76F4;&#x5230; jj &#x5230;&#x8FBE;&#x6570;&#x7EC4;&#x7684;&#x672B;&#x5C3E;&#x4E3A;&#x6B62;&#x3002;
 * &#x590D;&#x6742;&#x5EA6;&#x5206;&#x6790;&#xFF1A;
 * &#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#xFF1A; O(n) &#x5047;&#x8BBE;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x662F;n &#x90A3;&#x4E48;i&#x548C;j&#x6700;&#x591A;&#x5C31;&#x662F;&#x904D;&#x5386;n&#x6B65;
 * &#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#xFF1A; O(1)
 */
removeDuplicates([0,0,1,1,1,2,2,3,3,4])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * 1 &#x5220;&#x9664;&#x6392;&#x5E8F;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x91CD;&#x590D;&#x9879;
 * &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6392;&#x5E8F;&#x6570;&#x7EC4;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x5728;&#x539F;&#x5730;&#x5220;&#x9664;&#x91CD;&#x590D;&#x51FA;&#x73B0;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x4F7F;&#x5F97;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x53EA;&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#xFF0C;&#x8FD4;&#x56DE;&#x79FB;&#x9664;&#x540E;&#x6570;&#x7EC4;&#x7684;&#x65B0;&#x957F;&#x5EA6;&#x3002;
 * &#x4E0D;&#x8981;&#x4F7F;&#x7528;&#x989D;&#x5916;&#x7684;&#x6570;&#x7EC4;&#x7A7A;&#x95F4;&#xFF0C;&#x4F60;&#x5FC5;&#x987B;&#x5728;&#x539F;&#x5730;&#x4FEE;&#x6539;&#x8F93;&#x5165;&#x6570;&#x7EC4;&#x5E76;&#x5728;&#x4F7F;&#x7528; O(1) &#x989D;&#x5916;&#x7A7A;&#x95F4;&#x7684;&#x6761;&#x4EF6;&#x4E0B;&#x5B8C;&#x6210;&#x3002;
 * &#x793A;&#x4F8B;
 * &#x7ED9;&#x5B9A;&#x6570;&#x7EC4; nums = [1,1,2], 
 * &#x51FD;&#x6570;&#x5E94;&#x8BE5;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x957F;&#x5EA6; 2, &#x5E76;&#x4E14;&#x539F;&#x6570;&#x7EC4; nums &#x7684;&#x524D;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x88AB;&#x4FEE;&#x6539;&#x4E3A; 1, 2&#x3002; 
 * &#x4F60;&#x4E0D;&#x9700;&#x8981;&#x8003;&#x8651;&#x6570;&#x7EC4;&#x4E2D;&#x8D85;&#x51FA;&#x65B0;&#x957F;&#x5EA6;&#x540E;&#x9762;&#x7684;&#x5143;&#x7D20;&#x3002;
 */</span>
<span class="hljs-keyword">const</span> removeDuplicates =  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-title">number</span> </span>{
  <span class="hljs-keyword">let</span> i: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; nums.length; j++) {
    <span class="hljs-keyword">if</span>(nums[j] !== nums[i]) {
      i++
      nums[i] = nums[j]
    }
  }
  nums.splice(i+<span class="hljs-number">1</span>)
  <span class="hljs-built_in">console</span>.log(nums)
  <span class="hljs-built_in">console</span>.log(nums.length)
  <span class="hljs-keyword">return</span> i + <span class="hljs-number">1</span>
}
<span class="hljs-comment">/**
 * &#x89E3;&#x6790;
 * &#x65B9;&#x6CD5; &#x53CC;&#x6307;&#x9488;&#x6CD5;
 * i&#x662F;&#x6162;&#x6307;&#x9488;&#xFF0C;j&#x662F;&#x5FEB;&#x6307;&#x9488; &#x5F53;&#x6211;&#x4EEC;&#x9047;&#x5230; nums[j] \neq nums[i]nums[j]&#x2260;nums[i] &#x65F6;&#xFF0C;&#x8DF3;&#x8FC7;&#x91CD;&#x590D;&#x9879;&#x7684;&#x8FD0;&#x884C;&#x5DF2;&#x7ECF;&#x7ED3;&#x675F;&#xFF0C;
 * &#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x628A;&#x5B83;&#xFF08;nums[j]nums[j]&#xFF09;&#x7684;&#x503C;&#x590D;&#x5236;&#x5230; nums[i + 1]nums[i+1]&#x3002;&#x7136;&#x540E;&#x9012;&#x589E; ii&#xFF0C;&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x5C06;&#x518D;&#x6B21;&#x91CD;&#x590D;&#x76F8;&#x540C;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x76F4;&#x5230; jj &#x5230;&#x8FBE;&#x6570;&#x7EC4;&#x7684;&#x672B;&#x5C3E;&#x4E3A;&#x6B62;&#x3002;
 * &#x590D;&#x6742;&#x5EA6;&#x5206;&#x6790;&#xFF1A;
 * &#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#xFF1A; O(n) &#x5047;&#x8BBE;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x662F;n &#x90A3;&#x4E48;i&#x548C;j&#x6700;&#x591A;&#x5C31;&#x662F;&#x904D;&#x5386;n&#x6B65;
 * &#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#xFF1A; O(1)
 */</span>
removeDuplicates([<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>])</code></pre><h3 id="articleHeader3">2&#xFF1A;&#x4E70;&#x5356;&#x80A1;&#x7968;&#x7684;&#x6700;&#x4F73;&#x65F6;&#x673A;</h3><blockquote>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5B83;&#x7684;&#x7B2C; i &#x4E2A;&#x5143;&#x7D20;&#x662F;&#x4E00;&#x652F;&#x7ED9;&#x5B9A;&#x80A1;&#x7968;&#x7B2C; i &#x5929;&#x7684;&#x4EF7;&#x683C;&#x3002;&#x8BBE;&#x8BA1;&#x4E00;&#x4E2A;&#x7B97;&#x6CD5;&#x6765;&#x8BA1;&#x7B97;&#x4F60;&#x6240;&#x80FD;&#x83B7;&#x53D6;&#x7684;&#x6700;&#x5927;&#x5229;&#x6DA6;&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x5C3D;&#x53EF;&#x80FD;&#x5730;&#x5B8C;&#x6210;&#x66F4;&#x591A;&#x7684;&#x4EA4;&#x6613;&#xFF08;&#x591A;&#x6B21;&#x4E70;&#x5356;&#x4E00;&#x652F;&#x80A1;&#x7968;&#xFF09;&#x3002;</blockquote><p><strong>&#x6CE8;&#x610F;</strong>&#xFF1A;&#x4F60;&#x4E0D;&#x80FD;&#x540C;&#x65F6;&#x53C2;&#x4E0E;&#x591A;&#x7B14;&#x4EA4;&#x6613;&#xFF08;&#x4F60;&#x5FC5;&#x987B;&#x5728;&#x518D;&#x6B21;&#x8D2D;&#x4E70;&#x524D;&#x51FA;&#x552E;&#x6389;&#x4E4B;&#x524D;&#x7684;&#x80A1;&#x7968;&#xFF09;&#x3002;</p><p><strong>&#x793A;&#x4F8B;</strong></p><p>&#x8F93;&#x5165;: [7,1,5,3,6,4]</p><p>&#x8F93;&#x51FA;: 7</p><p><strong>&#x89E3;&#x91CA;:</strong> &#x5728;&#x7B2C; 2 &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = 1&#xFF09;&#x7684;&#x65F6;&#x5019;&#x4E70;&#x5165;&#xFF0C;&#x5728;&#x7B2C; 3 &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = 5&#xFF09;&#x7684;&#x65F6;&#x5019;<br>&#x5356;&#x51FA;, &#x8FD9;&#x7B14;&#x4EA4;&#x6613;&#x6240;&#x80FD;&#x83B7;&#x5F97;&#x5229;&#x6DA6; = 5-1 = 4 &#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x968F;&#x540E;&#xFF0C;&#x5728;&#x7B2C; 4 &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = 3&#xFF09;&#x7684;&#x65F6;&#x5019;&#x4E70;&#x5165;&#xFF0C;&#x5728;&#x7B2C; 5 &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = 6&#xFF09;&#x7684;&#x65F6;&#x5019;&#x5356;&#x51FA;, &#x8FD9;&#x7B14;&#x4EA4;&#x6613;&#x6240;&#x80FD;&#x83B7;&#x5F97;&#x5229;&#x6DA6; = 6-3 = 3 &#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code style="word-break:break-word;white-space:initial">&#x968F;&#x540E;&#xFF0C;&#x5728;&#x7B2C; <span class="hljs-number">4</span> &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = <span class="hljs-number">3</span>&#xFF09;&#x7684;&#x65F6;&#x5019;&#x4E70;&#x5165;&#xFF0C;&#x5728;&#x7B2C; <span class="hljs-number">5</span> &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = <span class="hljs-number">6</span>&#xFF09;&#x7684;&#x65F6;&#x5019;&#x5356;&#x51FA;, &#x8FD9;&#x7B14;&#x4EA4;&#x6613;&#x6240;&#x80FD;&#x83B7;&#x5F97;&#x5229;&#x6DA6; = <span class="hljs-number">6</span><span class="hljs-number">-3</span> = <span class="hljs-number">3</span> &#x3002;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/**
 * 2&#xFF1A;  &#x4E70;&#x5356;&#x80A1;&#x7968;&#x7684;&#x6700;&#x4F73;&#x65F6;&#x673A;
 * &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5B83;&#x7684;&#x7B2C; i &#x4E2A;&#x5143;&#x7D20;&#x662F;&#x4E00;&#x652F;&#x7ED9;&#x5B9A;&#x80A1;&#x7968;&#x7B2C; i &#x5929;&#x7684;&#x4EF7;&#x683C;&#x3002;
 * &#x8BBE;&#x8BA1;&#x4E00;&#x4E2A;&#x7B97;&#x6CD5;&#x6765;&#x8BA1;&#x7B97;&#x4F60;&#x6240;&#x80FD;&#x83B7;&#x53D6;&#x7684;&#x6700;&#x5927;&#x5229;&#x6DA6;&#x3002;&#x4F60;&#x6700;&#x591A;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x4E00;&#x6B21;&#x4EA4;&#x6613;
 * &#x6CE8;&#x610F;&#xFF1A;&#x4F60;&#x4E0D;&#x80FD;&#x540C;&#x65F6;&#x53C2;&#x4E0E;&#x591A;&#x7B14;&#x4EA4;&#x6613;&#xFF08;&#x4F60;&#x5FC5;&#x987B;&#x5728;&#x518D;&#x6B21;&#x8D2D;&#x4E70;&#x524D;&#x51FA;&#x552E;&#x6389;&#x4E4B;&#x524D;&#x7684;&#x80A1;&#x7968;&#xFF09;
 * 
 * &#x8F93;&#x5165;: [7,1,5,3,6,4]
 * &#x8F93;&#x51FA;: 7
 * &#x89E3;&#x91CA;: &#x5728;&#x7B2C; 2 &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = 1&#xFF09;&#x7684;&#x65F6;&#x5019;&#x4E70;&#x5165;&#xFF0C;&#x5728;&#x7B2C; 3 &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = 5&#xFF09;&#x7684;&#x65F6;&#x5019;&#x5356;&#x51FA;, &#x8FD9;&#x7B14;&#x4EA4;&#x6613;&#x6240;&#x80FD;&#x83B7;&#x5F97;&#x5229;&#x6DA6; = 5-1 = 4 &#x3002;
 * &#x968F;&#x540E;&#xFF0C;&#x5728;&#x7B2C; 4 &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = 3&#xFF09;&#x7684;&#x65F6;&#x5019;&#x4E70;&#x5165;&#xFF0C;&#x5728;&#x7B2C; 5 &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = 6&#xFF09;&#x7684;&#x65F6;&#x5019;&#x5356;&#x51FA;, &#x8FD9;&#x7B14;&#x4EA4;&#x6613;&#x6240;&#x80FD;&#x83B7;&#x5F97;&#x5229;&#x6DA6; = 6-3 = 3 &#x3002;
 */
 // &#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;
const maxProfit = function (prices: number[]): number {
  if(prices.length &lt; 2) return 0
  // &#x5B9A;&#x4E49;&#x5229;&#x6DA6;
  let count: number = 0
  let PreMin:number =prices[0]
  // &#x83B7;&#x53D6;&#x6700;&#x5927;&#x7684;&#x5355;&#x5929;&#x5229;&#x6DA6;
  for (let i = 0; i &lt; prices.length; i++) {
    count = Math.max(count, prices[i] - PreMin)
    PreMin = Math.min(PreMin, prices[i])
  }
  console.log(count)
  return count
}
/**
 * &#x89E3;&#x6790;&#xFF1A; &#x8D2A;&#x5FC3;&#x7B97;&#x6CD5;
 */
console.log(&apos;=================&#x80A1;&#x7968;&#x6700;&#x4F73;&#x8D2D;&#x4E70;&#x65F6;&#x673A;&#x8D2A;&#x5FC3;&#x7B97;&#x6CD5;===================&apos;);
console.log(maxProfit([7,1,5,3,6,4]));
console.log(&apos;====================================&apos;);

// &#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x5F0F;
const maxProfitMore = function (prices: number[]) :number{
  if(prices.length &lt; 2) return 0
  let ret = 0
  for (let i = 0; i &lt; prices.length; i++) {
    if (prices[i+1] &gt; prices[i]) {
      ret += prices[i+1] - prices[i]
    }
  }
  return ret
}
/**
 * &#x89E3;&#x6790;&#xFF1A; &#x975E;&#x8D2A;&#x5FC3;&#x7B97;&#x6CD5; 
 * &#x53EA;&#x8981;&#x4E0B;&#x4E00;&#x5929;&#x7684;&#x4EF7;&#x94B1; &#x5927;&#x4E8E;&#x4ECA;&#x5929;&#x7684;&#x4EF7;&#x94B1; &#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x5356;&#x51FA;&#x5F53;&#x524D;&#x5929;&#x7684; &#x6700;&#x7EC8;&#x7684;&#x7ED3;&#x679C;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x5229;&#x6DA6;&#x603B;&#x548C;
 */
console.log(&apos;==================&#x80A1;&#x7968;&#x6700;&#x4F73;&#x8D2D;&#x4E70;&#x65F6;&#x673A;&#x975E;&#x8D2A;&#x5FC3;&#x7B97;&#x6CD5;==================&apos;);
console.log(maxProfitMore([7,1,5,8,3,6,4]))
console.log(&apos;=============================================&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts">
<span class="hljs-comment">/**
 * 2&#xFF1A;  &#x4E70;&#x5356;&#x80A1;&#x7968;&#x7684;&#x6700;&#x4F73;&#x65F6;&#x673A;
 * &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5B83;&#x7684;&#x7B2C; i &#x4E2A;&#x5143;&#x7D20;&#x662F;&#x4E00;&#x652F;&#x7ED9;&#x5B9A;&#x80A1;&#x7968;&#x7B2C; i &#x5929;&#x7684;&#x4EF7;&#x683C;&#x3002;
 * &#x8BBE;&#x8BA1;&#x4E00;&#x4E2A;&#x7B97;&#x6CD5;&#x6765;&#x8BA1;&#x7B97;&#x4F60;&#x6240;&#x80FD;&#x83B7;&#x53D6;&#x7684;&#x6700;&#x5927;&#x5229;&#x6DA6;&#x3002;&#x4F60;&#x6700;&#x591A;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x4E00;&#x6B21;&#x4EA4;&#x6613;
 * &#x6CE8;&#x610F;&#xFF1A;&#x4F60;&#x4E0D;&#x80FD;&#x540C;&#x65F6;&#x53C2;&#x4E0E;&#x591A;&#x7B14;&#x4EA4;&#x6613;&#xFF08;&#x4F60;&#x5FC5;&#x987B;&#x5728;&#x518D;&#x6B21;&#x8D2D;&#x4E70;&#x524D;&#x51FA;&#x552E;&#x6389;&#x4E4B;&#x524D;&#x7684;&#x80A1;&#x7968;&#xFF09;
 * 
 * &#x8F93;&#x5165;: [7,1,5,3,6,4]
 * &#x8F93;&#x51FA;: 7
 * &#x89E3;&#x91CA;: &#x5728;&#x7B2C; 2 &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = 1&#xFF09;&#x7684;&#x65F6;&#x5019;&#x4E70;&#x5165;&#xFF0C;&#x5728;&#x7B2C; 3 &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = 5&#xFF09;&#x7684;&#x65F6;&#x5019;&#x5356;&#x51FA;, &#x8FD9;&#x7B14;&#x4EA4;&#x6613;&#x6240;&#x80FD;&#x83B7;&#x5F97;&#x5229;&#x6DA6; = 5-1 = 4 &#x3002;
 * &#x968F;&#x540E;&#xFF0C;&#x5728;&#x7B2C; 4 &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = 3&#xFF09;&#x7684;&#x65F6;&#x5019;&#x4E70;&#x5165;&#xFF0C;&#x5728;&#x7B2C; 5 &#x5929;&#xFF08;&#x80A1;&#x7968;&#x4EF7;&#x683C; = 6&#xFF09;&#x7684;&#x65F6;&#x5019;&#x5356;&#x51FA;, &#x8FD9;&#x7B14;&#x4EA4;&#x6613;&#x6240;&#x80FD;&#x83B7;&#x5F97;&#x5229;&#x6DA6; = 6-3 = 3 &#x3002;
 */</span>
 <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;</span>
<span class="hljs-keyword">const</span> maxProfit = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">prices: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-title">number</span> </span>{
  <span class="hljs-keyword">if</span>(prices.length &lt; <span class="hljs-number">2</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
  <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x5229;&#x6DA6;</span>
  <span class="hljs-keyword">let</span> count: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>
  <span class="hljs-keyword">let</span> PreMin:<span class="hljs-built_in">number</span> =prices[<span class="hljs-number">0</span>]
  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x6700;&#x5927;&#x7684;&#x5355;&#x5929;&#x5229;&#x6DA6;</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; prices.length; i++) {
    count = <span class="hljs-built_in">Math</span>.max(count, prices[i] - PreMin)
    PreMin = <span class="hljs-built_in">Math</span>.min(PreMin, prices[i])
  }
  <span class="hljs-built_in">console</span>.log(count)
  <span class="hljs-keyword">return</span> count
}
<span class="hljs-comment">/**
 * &#x89E3;&#x6790;&#xFF1A; &#x8D2A;&#x5FC3;&#x7B97;&#x6CD5;
 */</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;=================&#x80A1;&#x7968;&#x6700;&#x4F73;&#x8D2D;&#x4E70;&#x65F6;&#x673A;&#x8D2A;&#x5FC3;&#x7B97;&#x6CD5;===================&apos;</span>);
<span class="hljs-built_in">console</span>.log(maxProfit([<span class="hljs-number">7</span>,<span class="hljs-number">1</span>,<span class="hljs-number">5</span>,<span class="hljs-number">3</span>,<span class="hljs-number">6</span>,<span class="hljs-number">4</span>]));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>);

<span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x5F0F;</span>
<span class="hljs-keyword">const</span> maxProfitMore = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">prices: <span class="hljs-built_in">number</span>[]</span>) :<span class="hljs-title">number</span></span>{
  <span class="hljs-keyword">if</span>(prices.length &lt; <span class="hljs-number">2</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
  <span class="hljs-keyword">let</span> ret = <span class="hljs-number">0</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; prices.length; i++) {
    <span class="hljs-keyword">if</span> (prices[i+<span class="hljs-number">1</span>] &gt; prices[i]) {
      ret += prices[i+<span class="hljs-number">1</span>] - prices[i]
    }
  }
  <span class="hljs-keyword">return</span> ret
}
<span class="hljs-comment">/**
 * &#x89E3;&#x6790;&#xFF1A; &#x975E;&#x8D2A;&#x5FC3;&#x7B97;&#x6CD5; 
 * &#x53EA;&#x8981;&#x4E0B;&#x4E00;&#x5929;&#x7684;&#x4EF7;&#x94B1; &#x5927;&#x4E8E;&#x4ECA;&#x5929;&#x7684;&#x4EF7;&#x94B1; &#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x5356;&#x51FA;&#x5F53;&#x524D;&#x5929;&#x7684; &#x6700;&#x7EC8;&#x7684;&#x7ED3;&#x679C;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x5229;&#x6DA6;&#x603B;&#x548C;
 */</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;==================&#x80A1;&#x7968;&#x6700;&#x4F73;&#x8D2D;&#x4E70;&#x65F6;&#x673A;&#x975E;&#x8D2A;&#x5FC3;&#x7B97;&#x6CD5;==================&apos;</span>);
<span class="hljs-built_in">console</span>.log(maxProfitMore([<span class="hljs-number">7</span>,<span class="hljs-number">1</span>,<span class="hljs-number">5</span>,<span class="hljs-number">8</span>,<span class="hljs-number">3</span>,<span class="hljs-number">6</span>,<span class="hljs-number">4</span>]))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;=============================================&apos;</span>);</code></pre><h3 id="articleHeader4">3&#xFF1A;&#x65CB;&#x8F6C;&#x6570;&#x7EC4;</h3><blockquote>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5C06;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x5411;&#x53F3;&#x79FB;&#x52A8; k &#x4E2A;&#x4F4D;&#x7F6E;&#xFF0C;&#x5176;&#x4E2D; k &#x662F;&#x975E;&#x8D1F;&#x6570;&#x3002;</blockquote><p><strong>&#x793A;&#x4F8B;</strong><br>&#x8F93;&#x5165;: [1,2,3,4,5,6,7] &#x548C; k = 3</p><p>&#x8F93;&#x51FA;: [5,6,7,1,2,3,4]</p><p><strong>&#x89E3;&#x91CA;:</strong></p><p>&#x5411;&#x53F3;&#x65CB;&#x8F6C; 1 &#x6B65;: [7,1,2,3,4,5,6]</p><p>&#x5411;&#x53F3;&#x65CB;&#x8F6C; 2 &#x6B65;: [6,7,1,2,3,4,5]</p><p>&#x5411;&#x53F3;&#x65CB;&#x8F6C; 3 &#x6B65;: [5,6,7,1,2,3,4]</p><p><strong>&#x8981;&#x6C42;</strong></p><p>&#x8981;&#x6C42;&#x4F7F;&#x7528;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A; O(1) &#x7684;&#x539F;&#x5730;&#x7B97;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 3&#xFF1A; &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5C06;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x5411;&#x53F3;&#x79FB;&#x52A8; k &#x4E2A;&#x4F4D;&#x7F6E;&#xFF0C;&#x5176;&#x4E2D; k &#x662F;&#x975E;&#x8D1F;&#x6570;&#x3002;
 * &#x8981;&#x6C42;O(1)&#x7684;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#xFF0C;&#x5BF9;&#x539F;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;
 */
const rotate = function(nums: number[], k: number) {
  // &#x5FAA;&#x73AF;k,&#x901A;&#x8FC7;k&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x786E;&#x5B9A;&#x9700;&#x8981;&#x79FB;&#x52A8;&#x7684;&#x6B21;&#x6570;
  for (let i = 0; i &lt; k; i++) {
    // &#x5148;&#x5728;&#x524D;&#x9762;&#x63D2;&#x5165;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x79FB;&#x52A8;&#x7684;&#x5730;&#x65B9;
    nums.unshift(nums[nums.length -1 - i])
  }
  // &#x6700;&#x540E;&#x518D;&#x53BB;&#x5904;&#x7406;&#x6211;&#x4EEC;&#x7684;&#x6570;&#x7EC4;
  nums.splice(nums.length - k, k)
}
rotate([1,2,3,4,5,6,7],3)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * 3&#xFF1A; &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5C06;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x5411;&#x53F3;&#x79FB;&#x52A8; k &#x4E2A;&#x4F4D;&#x7F6E;&#xFF0C;&#x5176;&#x4E2D; k &#x662F;&#x975E;&#x8D1F;&#x6570;&#x3002;
 * &#x8981;&#x6C42;O(1)&#x7684;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#xFF0C;&#x5BF9;&#x539F;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;
 */</span>
<span class="hljs-keyword">const</span> rotate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums: <span class="hljs-built_in">number</span>[], k: <span class="hljs-built_in">number</span></span>) </span>{
  <span class="hljs-comment">// &#x5FAA;&#x73AF;k,&#x901A;&#x8FC7;k&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x786E;&#x5B9A;&#x9700;&#x8981;&#x79FB;&#x52A8;&#x7684;&#x6B21;&#x6570;</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; k; i++) {
    <span class="hljs-comment">// &#x5148;&#x5728;&#x524D;&#x9762;&#x63D2;&#x5165;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x79FB;&#x52A8;&#x7684;&#x5730;&#x65B9;</span>
    nums.unshift(nums[nums.length <span class="hljs-number">-1</span> - i])
  }
  <span class="hljs-comment">// &#x6700;&#x540E;&#x518D;&#x53BB;&#x5904;&#x7406;&#x6211;&#x4EEC;&#x7684;&#x6570;&#x7EC4;</span>
  nums.splice(nums.length - k, k)
}
rotate([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>],<span class="hljs-number">3</span>)</code></pre><h3 id="articleHeader5">4&#xFF1A;&#x5B58;&#x5728;&#x91CD;&#x590D;</h3><blockquote>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6574;&#x6570;&#x6570;&#x7EC4;&#xFF0C;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5B58;&#x5728;&#x91CD;&#x590D;&#x5143;&#x7D20;&#x3002;&#x5982;&#x679C;&#x4EFB;&#x4F55;&#x503C;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x51FA;&#x73B0;&#x81F3;&#x5C11;&#x4E24;&#x6B21;&#xFF0C;&#x51FD;&#x6570;&#x8FD4;&#x56DE; true&#x3002;&#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x4E0D;&#x76F8;&#x540C;&#xFF0C;&#x5219;&#x8FD4;&#x56DE; false&#x3002;</blockquote><p><strong>&#x793A;&#x4F8B;</strong><br>&#x8F93;&#x5165;: [1,2,3,1]<br>&#x8F93;&#x51FA;: true</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 4&#xFF1A; &#x5B58;&#x5728;&#x91CD;&#x590D; 
 * &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6574;&#x6570;&#x6570;&#x7EC4;&#xFF0C;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5B58;&#x5728;&#x91CD;&#x590D;&#x5143;&#x7D20;&#x3002;
 * &#x5982;&#x679C;&#x4EFB;&#x4F55;&#x503C;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x51FA;&#x73B0;&#x81F3;&#x5C11;&#x4E24;&#x6B21;&#xFF0C;&#x51FD;&#x6570;&#x8FD4;&#x56DE; true&#x3002;&#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x4E0D;&#x76F8;&#x540C;&#xFF0C;&#x5219;&#x8FD4;&#x56DE; false&#x3002;
 * 
 * &#x8FD9;&#x4E2A;&#x4E00;&#x5B9A;&#x4E0D;&#x662F;&#x6700;&#x4F18;&#x89E3;
 */
const containsDuplicate = function (nums: number[]) :boolean{
    // &#x8BBE;&#x7F6E;flag
    let judge = false
    // &#x5BB9;&#x9519;&#x5224;&#x65AD;
    if (nums.length &lt;= 1) {
      return judge
    }
    // &#x901A;&#x8FC7;&#x6700;&#x7B80;&#x5355;&#x76F4;&#x767D;&#x7684;&#x53BB;&#x91CD;&#x7684;&#x601D;&#x60F3;&#x53BB;&#x5904;&#x7406;
    let current :number[] =[]
    for (let i = 0; i &lt; nums.length; i++) {
      if (current.indexOf(nums[i]) === -1) {
        current.push(nums[i])
      } else {
        return judge = true
      }
    }
    return judge
}
console.log(&apos;================&#x662F;&#x5426;&#x5B58;&#x5728;&#x91CD;&#x590D;&#x7B97;&#x6CD5;====================&apos;);
console.log(containsDuplicate([3,1]))
console.log(&apos;====================================&apos;);
// &#x8FD9;&#x4E2A;&#x5176;&#x5B9E;&#x662F;&#x975E;&#x5E38;&#x5E38;&#x89C1;&#x800C;&#x4E14;&#x7B80;&#x5355;&#x5F97;&#x4E00;&#x4E2A;&#x7B97;&#x6CD5; &#x4F46;&#x662F;&#x8981;&#x8003;&#x8651;&#x5230;&#x5F97;&#x60C5;&#x51B5;&#x591A;&#x4E00;&#x70B9;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * 4&#xFF1A; &#x5B58;&#x5728;&#x91CD;&#x590D; 
 * &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6574;&#x6570;&#x6570;&#x7EC4;&#xFF0C;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5B58;&#x5728;&#x91CD;&#x590D;&#x5143;&#x7D20;&#x3002;
 * &#x5982;&#x679C;&#x4EFB;&#x4F55;&#x503C;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x51FA;&#x73B0;&#x81F3;&#x5C11;&#x4E24;&#x6B21;&#xFF0C;&#x51FD;&#x6570;&#x8FD4;&#x56DE; true&#x3002;&#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x4E0D;&#x76F8;&#x540C;&#xFF0C;&#x5219;&#x8FD4;&#x56DE; false&#x3002;
 * 
 * &#x8FD9;&#x4E2A;&#x4E00;&#x5B9A;&#x4E0D;&#x662F;&#x6700;&#x4F18;&#x89E3;
 */</span>
<span class="hljs-keyword">const</span> containsDuplicate = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">nums: <span class="hljs-built_in">number</span>[]</span>) :<span class="hljs-title">boolean</span></span>{
    <span class="hljs-comment">// &#x8BBE;&#x7F6E;flag</span>
    <span class="hljs-keyword">let</span> judge = <span class="hljs-literal">false</span>
    <span class="hljs-comment">// &#x5BB9;&#x9519;&#x5224;&#x65AD;</span>
    <span class="hljs-keyword">if</span> (nums.length &lt;= <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">return</span> judge
    }
    <span class="hljs-comment">// &#x901A;&#x8FC7;&#x6700;&#x7B80;&#x5355;&#x76F4;&#x767D;&#x7684;&#x53BB;&#x91CD;&#x7684;&#x601D;&#x60F3;&#x53BB;&#x5904;&#x7406;</span>
    <span class="hljs-keyword">let</span> current :<span class="hljs-built_in">number</span>[] =[]
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; nums.length; i++) {
      <span class="hljs-keyword">if</span> (current.indexOf(nums[i]) === <span class="hljs-number">-1</span>) {
        current.push(nums[i])
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> judge = <span class="hljs-literal">true</span>
      }
    }
    <span class="hljs-keyword">return</span> judge
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;================&#x662F;&#x5426;&#x5B58;&#x5728;&#x91CD;&#x590D;&#x7B97;&#x6CD5;====================&apos;</span>);
<span class="hljs-built_in">console</span>.log(containsDuplicate([<span class="hljs-number">3</span>,<span class="hljs-number">1</span>]))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>);
<span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x5176;&#x5B9E;&#x662F;&#x975E;&#x5E38;&#x5E38;&#x89C1;&#x800C;&#x4E14;&#x7B80;&#x5355;&#x5F97;&#x4E00;&#x4E2A;&#x7B97;&#x6CD5; &#x4F46;&#x662F;&#x8981;&#x8003;&#x8651;&#x5230;&#x5F97;&#x60C5;&#x51B5;&#x591A;&#x4E00;&#x70B9;</span></code></pre><h3 id="articleHeader6">5&#xFF1A;&#x53EA;&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#x7684;&#x6570;&#x5B57;</h3><blockquote>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x6574;&#x6570;&#x6570;&#x7EC4;&#xFF0C;&#x9664;&#x4E86;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x53EA;&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#x4EE5;&#x5916;&#xFF0C;&#x5176;&#x4F59;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x5747;&#x51FA;&#x73B0;&#x4E24;&#x6B21;&#x3002;&#x627E;&#x51FA;&#x90A3;&#x4E2A;&#x53EA;&#x51FA;&#x73B0;&#x4E86;&#x4E00;&#x6B21;&#x7684;&#x5143;&#x7D20;&#x3002;</blockquote><p><strong>&#x793A;&#x4F8B;</strong></p><p>&#x8F93;&#x5165;: [2,2,1]</p><p>&#x8F93;&#x51FA;: 1</p><p><strong>&#x8981;&#x6C42;</strong><br>&#x4F60;&#x7684;&#x7B97;&#x6CD5;&#x5E94;&#x8BE5;&#x5177;&#x6709;&#x7EBF;&#x6027;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x3002; &#x4E0D;&#x9002;&#x7528;&#x989D;&#x5916;&#x7684;&#x7A7A;&#x95F4;&#x6765;&#x5B9E;&#x73B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 5: &#x53EA;&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#x5F97;&#x6570;&#x5B57;
 * &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x6574;&#x6570;&#x6570;&#x7EC4;&#xFF0C;&#x9664;&#x4E86;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x53EA;&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#x4EE5;&#x5916;&#xFF0C;&#x5176;&#x4F59;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x5747;&#x51FA;&#x73B0;&#x4E24;&#x6B21;&#x3002;&#x627E;&#x51FA;&#x90A3;&#x4E2A;&#x53EA;&#x51FA;&#x73B0;&#x4E86;&#x4E00;&#x6B21;&#x7684;&#x5143;&#x7D20;&#x3002;
 * &#x4F60;&#x7684;&#x7B97;&#x6CD5;&#x5E94;&#x8BE5;&#x5177;&#x6709;&#x7EBF;&#x6027;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x3002; &#x4E0D;&#x4F7F;&#x7528;&#x989D;&#x5916;&#x7A7A;&#x95F4;&#x6765;&#x5B9E;&#x73B0;
 */
const singleNumber = function(nums: number[]) :number {
  let index= -1
  // &#x53CC;&#x5C42;&#x8FDB;&#x884C;&#x6BD4;&#x5BF9; &#x76EE;&#x7684;&#x662F;&#x5F53;&#x524D;key&#x548C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;key&#x8FDB;&#x884C;&#x6BD4;&#x8F83;
  nums.forEach((key, j)=&gt; {
    //&#x6BCF;&#x6B21;&#x5FAA;&#x73AF;&#x5C0F;&#x6E38;&#x6807;
    let count = 0
    for (let k = 0; k &lt; nums.length; k++) {
      if (key === nums[k]) {
        count += 1
      }
      // &#x5FAA;&#x73AF;&#x5B8C;&#x627E;&#x51FA;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x7684;&#x4E0B;&#x6807;
      if (k === nums.length -1 &amp;&amp; count === 1) {
        index = j
      }
    }
  })
  return nums[index]
}
console.log(&apos;=================&#x67E5;&#x627E;&#x5355;&#x72EC;&#x6570;&#x7B97;&#x6CD5;===================&apos;);
console.log(singleNumber([2,2,1,3,3]))
console.log(&apos;====================================&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * 5: &#x53EA;&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#x5F97;&#x6570;&#x5B57;
 * &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x6574;&#x6570;&#x6570;&#x7EC4;&#xFF0C;&#x9664;&#x4E86;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x53EA;&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#x4EE5;&#x5916;&#xFF0C;&#x5176;&#x4F59;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x5747;&#x51FA;&#x73B0;&#x4E24;&#x6B21;&#x3002;&#x627E;&#x51FA;&#x90A3;&#x4E2A;&#x53EA;&#x51FA;&#x73B0;&#x4E86;&#x4E00;&#x6B21;&#x7684;&#x5143;&#x7D20;&#x3002;
 * &#x4F60;&#x7684;&#x7B97;&#x6CD5;&#x5E94;&#x8BE5;&#x5177;&#x6709;&#x7EBF;&#x6027;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x3002; &#x4E0D;&#x4F7F;&#x7528;&#x989D;&#x5916;&#x7A7A;&#x95F4;&#x6765;&#x5B9E;&#x73B0;
 */</span>
<span class="hljs-keyword">const</span> singleNumber = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums: <span class="hljs-built_in">number</span>[]</span>) :<span class="hljs-title">number</span> </span>{
  <span class="hljs-keyword">let</span> index= <span class="hljs-number">-1</span>
  <span class="hljs-comment">// &#x53CC;&#x5C42;&#x8FDB;&#x884C;&#x6BD4;&#x5BF9; &#x76EE;&#x7684;&#x662F;&#x5F53;&#x524D;key&#x548C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;key&#x8FDB;&#x884C;&#x6BD4;&#x8F83;</span>
  nums.forEach(<span class="hljs-function">(<span class="hljs-params">key, j</span>)=&gt;</span> {
    <span class="hljs-comment">//&#x6BCF;&#x6B21;&#x5FAA;&#x73AF;&#x5C0F;&#x6E38;&#x6807;</span>
    <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> k = <span class="hljs-number">0</span>; k &lt; nums.length; k++) {
      <span class="hljs-keyword">if</span> (key === nums[k]) {
        count += <span class="hljs-number">1</span>
      }
      <span class="hljs-comment">// &#x5FAA;&#x73AF;&#x5B8C;&#x627E;&#x51FA;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x7684;&#x4E0B;&#x6807;</span>
      <span class="hljs-keyword">if</span> (k === nums.length <span class="hljs-number">-1</span> &amp;&amp; count === <span class="hljs-number">1</span>) {
        index = j
      }
    }
  })
  <span class="hljs-keyword">return</span> nums[index]
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;=================&#x67E5;&#x627E;&#x5355;&#x72EC;&#x6570;&#x7B97;&#x6CD5;===================&apos;</span>);
<span class="hljs-built_in">console</span>.log(singleNumber([<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">3</span>]))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>);</code></pre><h3 id="articleHeader7">6&#xFF1A;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x4EA4;&#x96C6;</h3><blockquote>&#x7ED9;&#x5B9A;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x8BA1;&#x7B97;&#x5B83;&#x4EEC;&#x7684;&#x4EA4;&#x96C6;&#x3002;</blockquote><p><strong>&#x793A;&#x4F8B;</strong></p><p>&#x8F93;&#x5165;: nums1 = [1,2,2,1], nums2 = [2,2]</p><p>&#x8F93;&#x51FA;: [2,2]</p><p><strong>&#x8981;&#x6C42;</strong></p><ul><li>&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x4E2D;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x51FA;&#x73B0;&#x7684;&#x6B21;&#x6570;&#xFF0C;&#x5E94;&#x4E0E;&#x5143;&#x7D20;&#x5728;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x4E2D;&#x51FA;&#x73B0;&#x7684;&#x6B21;&#x6570;&#x4E00;&#x81F4;&#x3002;</li><li>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E0D;&#x8003;&#x8651;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x7684;&#x987A;&#x5E8F;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 6&#xFF1A;&#x6C42;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x4EA4;&#x96C6;
 */
const intersect = function (nums1:number[], nums2:number[]) :number[]{
  let arr:number[] = []
  for (let i = 0; i &lt; nums1.length; i++) {
    if (nums2.indexOf(nums1[i]) !== -1 ) {
      nums2.splice(nums2.indexOf(nums1[i]), 1)
      arr.push(nums1[i])
    }
  }
  return arr
}
/**
 * &#x89E3;&#x6790;&#xFF1A; &#x5728;&#x6C42;&#x4EA4;&#x96C6;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x3002;&#x4E3B;&#x8981;&#x7684;&#x601D;&#x60F3;&#x662F;&#x5173;&#x4E8E;&#x4EC0;&#x4E48;&#x662F;&#x4EA4;&#x96C6;&#x3002;
 * &#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x91CD;&#x5408;&#x90E8;&#x5206;&#x7406;&#x8BBA;&#x4E0A;&#x6765;&#x8BB2;&#x5C31;&#x662F;&#x4EA4;&#x96C6;
 * &#x5FAA;&#x73AF;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;nums1&#x5728;&#x540E;&#x5728;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;nums2&#x4E2D;&#x6BD4;&#x5BF9;&#x662F;&#x5426;&#x51FA;&#x73B0;&#xFF0C;&#x5982;&#x679C;&#x51FA;&#x73B0;&#x7684;&#x8BDD;&#x5C31;&#x5220;&#x9664;nums2&#x4E2D;&#x51FA;&#x73B0;&#x8FC7;&#x7684;&#x6570;&#x7EC4;&#xFF08;&#x6CE8;&#x610F;&#x662F;&#x4FEE;&#x6539;nums2&#xFF09;
 */
intersect([1,2,2,1], [2,2])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * 6&#xFF1A;&#x6C42;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x4EA4;&#x96C6;
 */</span>
<span class="hljs-keyword">const</span> intersect = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">nums1:<span class="hljs-built_in">number</span>[], nums2:<span class="hljs-built_in">number</span>[]</span>) :<span class="hljs-title">number</span>[]</span>{
  <span class="hljs-keyword">let</span> arr:<span class="hljs-built_in">number</span>[] = []
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; nums1.length; i++) {
    <span class="hljs-keyword">if</span> (nums2.indexOf(nums1[i]) !== <span class="hljs-number">-1</span> ) {
      nums2.splice(nums2.indexOf(nums1[i]), <span class="hljs-number">1</span>)
      arr.push(nums1[i])
    }
  }
  <span class="hljs-keyword">return</span> arr
}
<span class="hljs-comment">/**
 * &#x89E3;&#x6790;&#xFF1A; &#x5728;&#x6C42;&#x4EA4;&#x96C6;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x3002;&#x4E3B;&#x8981;&#x7684;&#x601D;&#x60F3;&#x662F;&#x5173;&#x4E8E;&#x4EC0;&#x4E48;&#x662F;&#x4EA4;&#x96C6;&#x3002;
 * &#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x91CD;&#x5408;&#x90E8;&#x5206;&#x7406;&#x8BBA;&#x4E0A;&#x6765;&#x8BB2;&#x5C31;&#x662F;&#x4EA4;&#x96C6;
 * &#x5FAA;&#x73AF;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;nums1&#x5728;&#x540E;&#x5728;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;nums2&#x4E2D;&#x6BD4;&#x5BF9;&#x662F;&#x5426;&#x51FA;&#x73B0;&#xFF0C;&#x5982;&#x679C;&#x51FA;&#x73B0;&#x7684;&#x8BDD;&#x5C31;&#x5220;&#x9664;nums2&#x4E2D;&#x51FA;&#x73B0;&#x8FC7;&#x7684;&#x6570;&#x7EC4;&#xFF08;&#x6CE8;&#x610F;&#x662F;&#x4FEE;&#x6539;nums2&#xFF09;
 */</span>
intersect([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>], [<span class="hljs-number">2</span>,<span class="hljs-number">2</span>])</code></pre><h3 id="articleHeader8">7&#xFF1A;&#x52A0;1</h3><blockquote>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x7531;&#x6574;&#x6570;&#x7EC4;&#x6210;&#x7684;&#x975E;&#x7A7A;&#x6570;&#x7EC4;&#x6240;&#x8868;&#x793A;&#x7684;&#x975E;&#x8D1F;&#x6574;&#x6570;&#xFF0C;&#x5728;&#x8BE5;&#x6570;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x52A0;&#x4E00;.&#x4F60;&#x53EF;&#x4EE5;&#x5047;&#x8BBE;&#x9664;&#x4E86;&#x6574;&#x6570; 0 &#x4E4B;&#x5916;&#xFF0C;&#x8FD9;&#x4E2A;&#x6574;&#x6570;&#x4E0D;&#x4F1A;&#x4EE5;&#x96F6;&#x5F00;&#x5934;&#x3002;</blockquote><p><strong>&#x793A;&#x4F8B;</strong></p><p>&#x8F93;&#x5165;: [1,2,3]</p><p>&#x8F93;&#x51FA;: [1,2,4]</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 7&#xFF1A;&#x52A0;1
 * &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x7531;&#x6574;&#x6570;&#x7EC4;&#x6210;&#x7684;&#x975E;&#x7A7A;&#x6570;&#x7EC4;&#x6240;&#x8868;&#x793A;&#x7684;&#x975E;&#x8D1F;&#x6574;&#x6570;&#xFF0C;&#x5728;&#x8BE5;&#x6570;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x52A0;&#x4E00;&#x3002;
 * &#x4F60;&#x53EF;&#x4EE5;&#x5047;&#x8BBE;&#x9664;&#x4E86;&#x6574;&#x6570; 0 &#x4E4B;&#x5916;&#xFF0C;&#x8FD9;&#x4E2A;&#x6574;&#x6570;&#x4E0D;&#x4F1A;&#x4EE5;&#x96F6;&#x5F00;&#x5934;&#x3002;
 */
const plusOne =function (nums: number[]) :number[] {
  let j = nums.length - 1
  // js&#x65E0;&#x6CD5;&#x6B63;&#x5E38;&#x8868;&#x793A;&#x5927;&#x4E8E;16&#x4F4D;&#x7684;&#x6574;&#x6570;&#x3010;&#x975E;&#x79D1;&#x5B66;&#x8BA1;&#x6570;&#x3011;
  for (let i = nums.length - 1; i &gt;=0; i--) {
    // &#x5F00;&#x59CB;&#x9010;&#x4E2A;&#x8FDB;&#x884C;&#x52A0;&#x6CD5;&#x8FD0;&#x7B97;
    if(i == j) {
      // &#x5927;&#x4E8E;10&#x7684;&#x60C5;&#x51B5;
      if(nums[i] + 1 &gt;= 10){
        nums[i] = nums[i] + 1 -10
        j--
        // &#x6700;&#x540E;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;
        if (i === 0) {
          nums.unshift(1)
        }
      } else {
        nums[j] ++
      }
    } else {
      break
    }
  }
  console.log(nums)
  return nums
}
/**
 * &#x89E3;&#x6790;&#xFF1A; &#x5982;&#x679C;&#x4F7F;&#x7528;&#x592A;&#x5927;&#x7684;&#x6570;&#x7684;&#x8BDD;&#x8F6C;&#x6210;&#x6570;&#x5B57;&#x518D;&#x52A0;1&#x662F;&#x4E0D;&#x884C;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7684;&#x5355;&#x4E2A;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x8FD0;&#x7B97;&#xFF0C;&#x540C;&#x6837;&#x7684;&#x662F;&#x4EE5;&#x8F85;&#x52A9;&#x6E38;&#x6807;&#x8FDB;&#x884C;&#x8FD0;&#x7B97;
 * &#x8F85;&#x52A9;&#x6E38;&#x6807;j&#x7684;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x662F;&#x8BB0;&#x5F55;&#x9700;&#x8981;+1&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x5982;&#x679C;&#x5F53;&#x524D;&#x7684;&#x4E0B;&#x6807;&#x4E0D;&#x7B49;&#x4E8E;j&#x90A3;&#x4E48;&#x5C31;&#x8DF3;&#x51FA;&#x4E86;&#x5FAA;&#x73AF;&#xFF1A;&#x540C;&#x65F6;&#x4E5F;&#x63D0;&#x9AD8;&#x4E86;&#x6027;&#x80FD;
 */
console.log(&apos;================&#x52A0;1&#x7B97;&#x6CD5;====================&apos;);
console.log(plusOne([8,2,1,,1,2,2,2,3,5,5,5,5,5,2,3,4,2,3,4,5,5,5,5,2,9]))
console.log(&apos;====================================&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * 7&#xFF1A;&#x52A0;1
 * &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x7531;&#x6574;&#x6570;&#x7EC4;&#x6210;&#x7684;&#x975E;&#x7A7A;&#x6570;&#x7EC4;&#x6240;&#x8868;&#x793A;&#x7684;&#x975E;&#x8D1F;&#x6574;&#x6570;&#xFF0C;&#x5728;&#x8BE5;&#x6570;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x52A0;&#x4E00;&#x3002;
 * &#x4F60;&#x53EF;&#x4EE5;&#x5047;&#x8BBE;&#x9664;&#x4E86;&#x6574;&#x6570; 0 &#x4E4B;&#x5916;&#xFF0C;&#x8FD9;&#x4E2A;&#x6574;&#x6570;&#x4E0D;&#x4F1A;&#x4EE5;&#x96F6;&#x5F00;&#x5934;&#x3002;
 */</span>
<span class="hljs-keyword">const</span> plusOne =<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">nums: <span class="hljs-built_in">number</span>[]</span>) :<span class="hljs-title">number</span>[] </span>{
  <span class="hljs-keyword">let</span> j = nums.length - <span class="hljs-number">1</span>
  <span class="hljs-comment">// js&#x65E0;&#x6CD5;&#x6B63;&#x5E38;&#x8868;&#x793A;&#x5927;&#x4E8E;16&#x4F4D;&#x7684;&#x6574;&#x6570;&#x3010;&#x975E;&#x79D1;&#x5B66;&#x8BA1;&#x6570;&#x3011;</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = nums.length - <span class="hljs-number">1</span>; i &gt;=<span class="hljs-number">0</span>; i--) {
    <span class="hljs-comment">// &#x5F00;&#x59CB;&#x9010;&#x4E2A;&#x8FDB;&#x884C;&#x52A0;&#x6CD5;&#x8FD0;&#x7B97;</span>
    <span class="hljs-keyword">if</span>(i == j) {
      <span class="hljs-comment">// &#x5927;&#x4E8E;10&#x7684;&#x60C5;&#x51B5;</span>
      <span class="hljs-keyword">if</span>(nums[i] + <span class="hljs-number">1</span> &gt;= <span class="hljs-number">10</span>){
        nums[i] = nums[i] + <span class="hljs-number">1</span> <span class="hljs-number">-10</span>
        j--
        <span class="hljs-comment">// &#x6700;&#x540E;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;</span>
        <span class="hljs-keyword">if</span> (i === <span class="hljs-number">0</span>) {
          nums.unshift(<span class="hljs-number">1</span>)
        }
      } <span class="hljs-keyword">else</span> {
        nums[j] ++
      }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">break</span>
    }
  }
  <span class="hljs-built_in">console</span>.log(nums)
  <span class="hljs-keyword">return</span> nums
}
<span class="hljs-comment">/**
 * &#x89E3;&#x6790;&#xFF1A; &#x5982;&#x679C;&#x4F7F;&#x7528;&#x592A;&#x5927;&#x7684;&#x6570;&#x7684;&#x8BDD;&#x8F6C;&#x6210;&#x6570;&#x5B57;&#x518D;&#x52A0;1&#x662F;&#x4E0D;&#x884C;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7684;&#x5355;&#x4E2A;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x8FD0;&#x7B97;&#xFF0C;&#x540C;&#x6837;&#x7684;&#x662F;&#x4EE5;&#x8F85;&#x52A9;&#x6E38;&#x6807;&#x8FDB;&#x884C;&#x8FD0;&#x7B97;
 * &#x8F85;&#x52A9;&#x6E38;&#x6807;j&#x7684;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x662F;&#x8BB0;&#x5F55;&#x9700;&#x8981;+1&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x5982;&#x679C;&#x5F53;&#x524D;&#x7684;&#x4E0B;&#x6807;&#x4E0D;&#x7B49;&#x4E8E;j&#x90A3;&#x4E48;&#x5C31;&#x8DF3;&#x51FA;&#x4E86;&#x5FAA;&#x73AF;&#xFF1A;&#x540C;&#x65F6;&#x4E5F;&#x63D0;&#x9AD8;&#x4E86;&#x6027;&#x80FD;
 */</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;================&#x52A0;1&#x7B97;&#x6CD5;====================&apos;</span>);
<span class="hljs-built_in">console</span>.log(plusOne([<span class="hljs-number">8</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">5</span>,<span class="hljs-number">5</span>,<span class="hljs-number">5</span>,<span class="hljs-number">5</span>,<span class="hljs-number">5</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">5</span>,<span class="hljs-number">5</span>,<span class="hljs-number">5</span>,<span class="hljs-number">2</span>,<span class="hljs-number">9</span>]))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>);</code></pre><h3 id="articleHeader9">8&#xFF1A;&#x79FB;&#x52A8;&#x96F6;</h3><blockquote>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4; nums&#xFF0C;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5C06;&#x6240;&#x6709; 0 &#x79FB;&#x52A8;&#x5230;&#x6570;&#x7EC4;&#x7684;&#x672B;&#x5C3E;&#xFF0C;&#x540C;&#x65F6;&#x4FDD;&#x6301;&#x975E;&#x96F6;&#x5143;&#x7D20;&#x7684;&#x76F8;&#x5BF9;&#x987A;&#x5E8F;&#x3002;</blockquote><p><strong>&#x793A;&#x4F8B;</strong></p><p>&#x8F93;&#x5165;: [0,1,0,3,12]</p><p>&#x8F93;&#x51FA;: [1,3,12,0,0]</p><p><strong>&#x8981;&#x6C42;</strong></p><ul><li>&#x5FC5;&#x987B;&#x5728;&#x539F;&#x6570;&#x7EC4;&#x4E0A;&#x64CD;&#x4F5C;&#xFF0C;&#x4E0D;&#x80FD;&#x62F7;&#x8D1D;&#x989D;&#x5916;&#x7684;&#x6570;&#x7EC4;&#x3002;</li><li>&#x5C3D;&#x91CF;&#x51CF;&#x5C11;&#x64CD;&#x4F5C;&#x6B21;&#x6570;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 8: &#x79FB;&#x52A8;&#x96F6;
 * &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4; nums&#xFF0C;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5C06;&#x6240;&#x6709; 0 &#x79FB;&#x52A8;&#x5230;&#x6570;&#x7EC4;&#x7684;&#x672B;&#x5C3E;&#xFF0C;&#x540C;&#x65F6;&#x4FDD;&#x6301;&#x975E;&#x96F6;&#x5143;&#x7D20;&#x7684;&#x76F8;&#x5BF9;&#x987A;&#x5E8F;&#x3002;
 */
const moveZeroes = function(nums: number[]) {
  // 0&#x51FA;&#x73B0;&#x7684;&#x4E2A;&#x6570;
  let j = 0
  nums.forEach((el: number, index: number, arr: number[]) =&gt; {
    if (nums[j] === 0) {
      nums.splice(j, 1)
      nums.push(0)
    } else {
      j++ 
    }
  })
  console.log(nums)
}
/**
 * &#x89E3;&#x6790;&#xFF1A; &#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x5C0F;&#x6E38;&#x6807;j &#x8FD9;&#x4E2A;&#x662F;&#x7528;&#x6765;&#x6807;&#x8BC6;0&#x51FA;&#x73B0;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6BCF;&#x6B21;&#x79FB;&#x52A8;&#x5B8C;&#x4E4B;&#x540E;&#x5C0F;&#x6E38;&#x6807;&#x662F;&#x4E0D;&#x53D8;&#x5316;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x539F;&#x6570;&#x7EC4;&#x5DF2;&#x7ECF;&#x4FEE;&#x6539;&#x6240;&#x4EE5;&#x8981;&#x56FA;&#x5B9A;&#x4E00;&#x4E0B;&#x6E38;&#x6807;
 * &#x53CC;&#x6E38;&#x6807;&#x6CD5;&#x5728;&#x7B97;&#x6CD5;&#x771F;&#x7684;&#x5F88;&#x5B9E;&#x7528;
 */
console.log(&apos;==================&#x79FB;&#x52A8;&#x96F6;&#x7B97;&#x6CD5;==================&apos;);
moveZeroes([1,2,0,0,0,1])
console.log(&apos;====================================&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * 8: &#x79FB;&#x52A8;&#x96F6;
 * &#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4; nums&#xFF0C;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5C06;&#x6240;&#x6709; 0 &#x79FB;&#x52A8;&#x5230;&#x6570;&#x7EC4;&#x7684;&#x672B;&#x5C3E;&#xFF0C;&#x540C;&#x65F6;&#x4FDD;&#x6301;&#x975E;&#x96F6;&#x5143;&#x7D20;&#x7684;&#x76F8;&#x5BF9;&#x987A;&#x5E8F;&#x3002;
 */</span>
<span class="hljs-keyword">const</span> moveZeroes = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums: <span class="hljs-built_in">number</span>[]</span>) </span>{
  <span class="hljs-comment">// 0&#x51FA;&#x73B0;&#x7684;&#x4E2A;&#x6570;</span>
  <span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>
  nums.forEach(<span class="hljs-function">(<span class="hljs-params">el: <span class="hljs-built_in">number</span>, index: <span class="hljs-built_in">number</span>, arr: <span class="hljs-built_in">number</span>[]</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (nums[j] === <span class="hljs-number">0</span>) {
      nums.splice(j, <span class="hljs-number">1</span>)
      nums.push(<span class="hljs-number">0</span>)
    } <span class="hljs-keyword">else</span> {
      j++ 
    }
  })
  <span class="hljs-built_in">console</span>.log(nums)
}
<span class="hljs-comment">/**
 * &#x89E3;&#x6790;&#xFF1A; &#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x5C0F;&#x6E38;&#x6807;j &#x8FD9;&#x4E2A;&#x662F;&#x7528;&#x6765;&#x6807;&#x8BC6;0&#x51FA;&#x73B0;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6BCF;&#x6B21;&#x79FB;&#x52A8;&#x5B8C;&#x4E4B;&#x540E;&#x5C0F;&#x6E38;&#x6807;&#x662F;&#x4E0D;&#x53D8;&#x5316;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x539F;&#x6570;&#x7EC4;&#x5DF2;&#x7ECF;&#x4FEE;&#x6539;&#x6240;&#x4EE5;&#x8981;&#x56FA;&#x5B9A;&#x4E00;&#x4E0B;&#x6E38;&#x6807;
 * &#x53CC;&#x6E38;&#x6807;&#x6CD5;&#x5728;&#x7B97;&#x6CD5;&#x771F;&#x7684;&#x5F88;&#x5B9E;&#x7528;
 */</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;==================&#x79FB;&#x52A8;&#x96F6;&#x7B97;&#x6CD5;==================&apos;</span>);
moveZeroes([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>])
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>);</code></pre><h3 id="articleHeader10">9&#xFF1A;&#x4E24;&#x6570;&#x4E4B;&#x548C;</h3><blockquote>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x6574;&#x6570;&#x6570;&#x7EC4;&#x548C;&#x4E00;&#x4E2A;&#x76EE;&#x6807;&#x503C;&#xFF0C;&#x627E;&#x51FA;&#x6570;&#x7EC4;&#x4E2D;&#x548C;&#x4E3A;&#x76EE;&#x6807;&#x503C;&#x7684;&#x4E24;&#x4E2A;&#x6570;&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x5047;&#x8BBE;&#x6BCF;&#x4E2A;&#x8F93;&#x5165;&#x53EA;&#x5BF9;&#x5E94;&#x4E00;&#x79CD;&#x7B54;&#x6848;&#xFF0C;&#x4E14;&#x540C;&#x6837;&#x7684;&#x5143;&#x7D20;&#x4E0D;&#x80FD;&#x88AB;&#x91CD;&#x590D;&#x5229;&#x7528;&#x3002;</blockquote><p><strong>&#x793A;&#x4F8B;</strong></p><p>&#x7ED9;&#x5B9A; nums = [2, 7, 11, 15], target = 9</p><p>&#x56E0;&#x4E3A; nums[0] + nums[1] = 2 + 7 = 9</p><p>&#x6240;&#x4EE5;&#x8FD4;&#x56DE; [0, 1]</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x7B2C;&#x4E00;&#x79CD;&#x89E3;&#x6CD5;
 * @param nums 
 * @param target 
 */
const twoSumA = function (nums: number[], target: number) :number[] {
  console.log(&apos;&#x4E24;&#x6570;&#x6C42;&#x548C;&#x7B2C;&#x4E00;&#x79CD;&#x89E3;&#x6CD5;&apos;)
  let arr = [0,0] ,flag = false
  for (let i = 0; i &lt; nums.length; i++) {
    compare(i)
    if (flag) {
      arr = [i, compare(i)]
      break
    }
  }
  /**
   * @param num 
   */
  function compare(index: number) :number {
    for (let j = 0; j &lt; nums.length; j++) {
      if (j!== index &amp;&amp; nums[index] + nums[j] === target) {
        flag = true
        return j
      }
    }
  }
  return arr
}
/**
 * &#x7B2C;&#x4E8C;&#x79CD;&#x89E3;&#x6CD5;
 */
const twoSumB = function (nums: number[], target: number) :number[] {
  let arr = [0,0]
  console.log(&apos;&#x4E24;&#x6570;&#x6C42;&#x548C;&#x7B2C;&#x4E8C;&#x79CD;&#x89E3;&#x6CD5;&apos;)
  for (let i = 0; i &lt; nums.length; i++) {
    for (let j = 0; j &lt; nums.length; j++) {
      if (j!== i &amp;&amp; nums[i] + nums[j] === target) {
        return arr = [i,j]
      }
    }
  }
  return arr
}
// &#x5728;&#x8FDB;&#x884C;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x4E2D;&#x4E24;&#x4E2A;&#x6570;&#x5F97;&#x6BD4;&#x8F83;&#x4E2D;&#xFF1A;&#x4E00;&#x5B9A;&#x8981;&#x6CE8;&#x610F;&#x5728;&#x76F8;&#x52A0;&#x5F97;&#x65F6;&#x5019;&#x8981;&#x6392;&#x9664;&#x81EA;&#x8EAB;&#x53BB;&#x8FDB;&#x884C;&#x76F8;&#x52A0;&#x3002;
console.log(&apos;=================&#x4E24;&#x6570;&#x4E4B;&#x548C;&#x7B97;&#x6CD5;===================&apos;);
console.log(twoSumA([3,2,4],6))
console.log(twoSumB([2, 7, 11, 15],9))
console.log(&apos;====================================&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * &#x7B2C;&#x4E00;&#x79CD;&#x89E3;&#x6CD5;
 * @param nums 
 * @param target 
 */</span>
<span class="hljs-keyword">const</span> twoSumA = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">nums: <span class="hljs-built_in">number</span>[], target: <span class="hljs-built_in">number</span></span>) :<span class="hljs-title">number</span>[] </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4E24;&#x6570;&#x6C42;&#x548C;&#x7B2C;&#x4E00;&#x79CD;&#x89E3;&#x6CD5;&apos;</span>)
  <span class="hljs-keyword">let</span> arr = [<span class="hljs-number">0</span>,<span class="hljs-number">0</span>] ,flag = <span class="hljs-literal">false</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; nums.length; i++) {
    compare(i)
    <span class="hljs-keyword">if</span> (flag) {
      arr = [i, compare(i)]
      <span class="hljs-keyword">break</span>
    }
  }
  <span class="hljs-comment">/**
   * @param num 
   */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compare</span>(<span class="hljs-params">index: <span class="hljs-built_in">number</span></span>) :<span class="hljs-title">number</span> </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; nums.length; j++) {
      <span class="hljs-keyword">if</span> (j!== index &amp;&amp; nums[index] + nums[j] === target) {
        flag = <span class="hljs-literal">true</span>
        <span class="hljs-keyword">return</span> j
      }
    }
  }
  <span class="hljs-keyword">return</span> arr
}
<span class="hljs-comment">/**
 * &#x7B2C;&#x4E8C;&#x79CD;&#x89E3;&#x6CD5;
 */</span>
<span class="hljs-keyword">const</span> twoSumB = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">nums: <span class="hljs-built_in">number</span>[], target: <span class="hljs-built_in">number</span></span>) :<span class="hljs-title">number</span>[] </span>{
  <span class="hljs-keyword">let</span> arr = [<span class="hljs-number">0</span>,<span class="hljs-number">0</span>]
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4E24;&#x6570;&#x6C42;&#x548C;&#x7B2C;&#x4E8C;&#x79CD;&#x89E3;&#x6CD5;&apos;</span>)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; nums.length; i++) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; nums.length; j++) {
      <span class="hljs-keyword">if</span> (j!== i &amp;&amp; nums[i] + nums[j] === target) {
        <span class="hljs-keyword">return</span> arr = [i,j]
      }
    }
  }
  <span class="hljs-keyword">return</span> arr
}
<span class="hljs-comment">// &#x5728;&#x8FDB;&#x884C;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x4E2D;&#x4E24;&#x4E2A;&#x6570;&#x5F97;&#x6BD4;&#x8F83;&#x4E2D;&#xFF1A;&#x4E00;&#x5B9A;&#x8981;&#x6CE8;&#x610F;&#x5728;&#x76F8;&#x52A0;&#x5F97;&#x65F6;&#x5019;&#x8981;&#x6392;&#x9664;&#x81EA;&#x8EAB;&#x53BB;&#x8FDB;&#x884C;&#x76F8;&#x52A0;&#x3002;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;=================&#x4E24;&#x6570;&#x4E4B;&#x548C;&#x7B97;&#x6CD5;===================&apos;</span>);
<span class="hljs-built_in">console</span>.log(twoSumA([<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>],<span class="hljs-number">6</span>))
<span class="hljs-built_in">console</span>.log(twoSumB([<span class="hljs-number">2</span>, <span class="hljs-number">7</span>, <span class="hljs-number">11</span>, <span class="hljs-number">15</span>],<span class="hljs-number">9</span>))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>);</code></pre><h3 id="articleHeader11">10&#xFF1A;&#x6709;&#x6548;&#x7684;&#x6570;&#x72EC;</h3><blockquote>&#x5224;&#x65AD;&#x4E00;&#x4E2A; 9x9 &#x7684;&#x6570;&#x72EC;&#x662F;&#x5426;&#x6709;&#x6548;&#x3002;&#x53EA;&#x9700;&#x8981;&#x6839;&#x636E;&#x4EE5;&#x4E0B;&#x89C4;&#x5219;&#xFF0C;&#x9A8C;&#x8BC1;&#x5DF2;&#x7ECF;&#x586B;&#x5165;&#x7684;&#x6570;&#x5B57;&#x662F;&#x5426;&#x6709;&#x6548;&#x5373;&#x53EF;&#x3002;</blockquote><ol><li>&#x6570;&#x5B57; 1-9 &#x5728;&#x6BCF;&#x4E00;&#x884C;&#x53EA;&#x80FD;&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#x3002;</li><li>&#x6570;&#x5B57; 1-9 &#x5728;&#x6BCF;&#x4E00;&#x5217;&#x53EA;&#x80FD;&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#x3002;</li><li>&#x6570;&#x5B57; 1-9 &#x5728;&#x6BCF;&#x4E00;&#x4E2A;&#x4EE5;&#x7C97;&#x5B9E;&#x7EBF;&#x5206;&#x9694;&#x7684; 3x3 &#x5BAB;&#x5185;&#x53EA;&#x80FD;&#x51FA;&#x73B0;&#x4E00;&#x6B21;&#x3002;</li></ol><p><strong>&#x793A;&#x4F8B;</strong></p><p>&#x7ED9;&#x5B9A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  [&quot;5&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],
  [&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],
  [&quot;.&quot;,&quot;9&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;],
  [&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;3&quot;],
  [&quot;4&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;],
  [&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;],
  [&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;8&quot;,&quot;.&quot;],
  [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;.&quot;,&quot;.&quot;,&quot;5&quot;],
  [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;9&quot;]
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">[
  [<span class="hljs-string">&quot;5&quot;</span>,<span class="hljs-string">&quot;3&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;7&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>],
  [<span class="hljs-string">&quot;6&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;1&quot;</span>,<span class="hljs-string">&quot;9&quot;</span>,<span class="hljs-string">&quot;5&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>],
  [<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;9&quot;</span>,<span class="hljs-string">&quot;8&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;6&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>],
  [<span class="hljs-string">&quot;8&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;6&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;3&quot;</span>],
  [<span class="hljs-string">&quot;4&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;8&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;3&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;1&quot;</span>],
  [<span class="hljs-string">&quot;7&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;2&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;6&quot;</span>],
  [<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;6&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;2&quot;</span>,<span class="hljs-string">&quot;8&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>],
  [<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;4&quot;</span>,<span class="hljs-string">&quot;1&quot;</span>,<span class="hljs-string">&quot;9&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;5&quot;</span>],
  [<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;8&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;7&quot;</span>,<span class="hljs-string">&quot;9&quot;</span>]
]</code></pre><p>&#x8F93;&#x51FA; <code>js true</code></p><p><strong>&#x8BF4;&#x660E;</strong></p><ul><li>&#x4E00;&#x4E2A;&#x6709;&#x6548;&#x7684;&#x6570;&#x72EC;&#xFF08;&#x90E8;&#x5206;&#x5DF2;&#x88AB;&#x586B;&#x5145;&#xFF09;&#x4E0D;&#x4E00;&#x5B9A;&#x662F;&#x53EF;&#x89E3;&#x7684;&#x3002;</li><li>&#x53EA;&#x9700;&#x8981;&#x6839;&#x636E;&#x4EE5;&#x4E0A;&#x89C4;&#x5219;&#xFF0C;&#x9A8C;&#x8BC1;&#x5DF2;&#x7ECF;&#x586B;&#x5165;&#x7684;&#x6570;&#x5B57;&#x662F;&#x5426;&#x6709;&#x6548;&#x5373;&#x53EF;&#x3002;</li><li>&#x7ED9;&#x5B9A;&#x6570;&#x72EC;&#x5E8F;&#x5217;&#x53EA;&#x5305;&#x542B;&#x6570;&#x5B57; 1-9 &#x548C;&#x5B57;&#x7B26; &apos;.&apos; &#x3002;</li><li>&#x7ED9;&#x5B9A;&#x6570;&#x72EC;&#x6C38;&#x8FDC;&#x662F; 9x9 &#x5F62;&#x5F0F;&#x7684;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 10&#xFF1A;&#x6709;&#x6548;&#x5F97;&#x6570;&#x72EC;
 */
let board = /* [
  [&quot;5&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],
  [&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],
  [&quot;.&quot;,&quot;9&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;],
  [&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;3&quot;],
  [&quot;4&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;],
  [&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;],
  [&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;8&quot;,&quot;.&quot;],
  [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;.&quot;,&quot;.&quot;,&quot;5&quot;],
  [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;9&quot;] 
]*/
[[&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;4&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],
 [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;6&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],
 [&quot;.&quot;,&quot;1&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],
 [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;9&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],
 [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;5&quot;,&quot;.&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;],
 [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],
 [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;],
 [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],
 [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]
]
const isValidSudoku = function (board: string[][]): boolean {
  let isPass = true
  const sudokuDeep = 9 // &#x6570;&#x72EC;&#x6DF1;&#x5EA6;
  // &#x5224;&#x65AD;&#x884C;&#x548C;&#x5217;
  for (let i = 0; i &lt; sudokuDeep; i++) {
    let row:any = {}
    let col:any = {}
    for (let j = 0; j &lt; sudokuDeep; j++) {
      // &#x5224;&#x65AD;&#x884C;
      /**
       * &#x5224;&#x65AD;&#x65B9;&#x5F0F;
       * &#x9996;&#x5148;&#x5224;&#x65AD;&#x4E0D;&#x4E3A;&apos;.&apos; =&gt; &#x7136;&#x540E;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5B58;&#x5728;row&#x5BF9;&#x8C61;&#x4E2D; 
       */
      if (board[i][j] !== &apos;.&apos;) {
        if (row[board[i][j]]) {
          console.log(board[i][j])
          return isPass = false
        } else {
          row[board[i][j]] = board[i][j]
        }
      }
      // &#x5224;&#x65AD;&#x5217;
      if (board[j][i] !== &apos;.&apos;) {
        if (col[board[j][i]]) {
          console.log(board[j][i]);
          return isPass = false
        } else {
          col[board[j][i]] = board[j][i]
        }
      }
      // &#x5224;&#x65AD;&#x4E5D;&#x5BAB;&#x683C; &#x901A;&#x8FC7;&#x4F59;&#x6570;&#x7684;&#x5F62;&#x5F0F;&#x5224;&#x65AD;&#x51FA;&#x6765;&#x5F53;&#x524D;&#x6240;&#x5904;&#x7684;9&#x5BAB;&#x683C;
      // &#x5148;&#x8BA1;&#x7B97;&#x51FA;&#x4F4D;&#x7F6E;
      let c = Math.floor(i/3)  // col&#x4F4D;&#x7F6E;
      let r = Math.floor(j/3) // row &#x4F4D;&#x7F6E;
      // &#x52FE;&#x52D2;&#x51FA;&#x4E5D;&#x5BAB;&#x683C;
      for (let m = c*3; m &lt; c*3 + 3; m++) {
        for (let n = r * 3; n &lt; r * 3 + 3; n++) {
          if (m === i &amp;&amp; n === j) {
            // m === i &amp;&amp; n === j &#x8FD9;&#x65F6;&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;
            continue
          } else {
            // &#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x6B21;&#x6C42;&#x503C;&#x5224;&#x65AD;
            if(board[m][n] != &apos;.&apos; &amp;&amp; board[i][j]!== &apos;.&apos; &amp;&amp; (board[i][j]) === board[m][n]) {
              return isPass = false
            } 
          }
        }
      }
      
    }
  }
  return isPass
}
console.log(&apos;=================&#x6709;&#x6548;&#x6570;&#x72EC;&#x7B97;&#x6CD5;&#x7ED3;&#x679C;===================&apos;);
console.log(isValidSudoku(board))
console.log(&apos;====================================&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * 10&#xFF1A;&#x6709;&#x6548;&#x5F97;&#x6570;&#x72EC;
 */</span>
<span class="hljs-keyword">let</span> board = <span class="hljs-comment">/* [
  [&quot;5&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],
  [&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],
  [&quot;.&quot;,&quot;9&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;],
  [&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;3&quot;],
  [&quot;4&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;],
  [&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;],
  [&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;8&quot;,&quot;.&quot;],
  [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;.&quot;,&quot;.&quot;,&quot;5&quot;],
  [&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;9&quot;] 
]*/</span>
[[<span class="hljs-string">&quot;7&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;4&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>],
 [<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;8&quot;</span>,<span class="hljs-string">&quot;6&quot;</span>,<span class="hljs-string">&quot;5&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>],
 [<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;1&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;2&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>],
 [<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;9&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>],
 [<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;5&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;5&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>],
 [<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>],
 [<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;2&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>],
 [<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>],
 [<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>,<span class="hljs-string">&quot;.&quot;</span>]
]
<span class="hljs-keyword">const</span> isValidSudoku = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">board: <span class="hljs-built_in">string</span>[][]</span>): <span class="hljs-title">boolean</span> </span>{
  <span class="hljs-keyword">let</span> isPass = <span class="hljs-literal">true</span>
  <span class="hljs-keyword">const</span> sudokuDeep = <span class="hljs-number">9</span> <span class="hljs-comment">// &#x6570;&#x72EC;&#x6DF1;&#x5EA6;</span>
  <span class="hljs-comment">// &#x5224;&#x65AD;&#x884C;&#x548C;&#x5217;</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; sudokuDeep; i++) {
    <span class="hljs-keyword">let</span> row:<span class="hljs-built_in">any</span> = {}
    <span class="hljs-keyword">let</span> col:<span class="hljs-built_in">any</span> = {}
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; sudokuDeep; j++) {
      <span class="hljs-comment">// &#x5224;&#x65AD;&#x884C;</span>
      <span class="hljs-comment">/**
       * &#x5224;&#x65AD;&#x65B9;&#x5F0F;
       * &#x9996;&#x5148;&#x5224;&#x65AD;&#x4E0D;&#x4E3A;&apos;.&apos; =&gt; &#x7136;&#x540E;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5B58;&#x5728;row&#x5BF9;&#x8C61;&#x4E2D; 
       */</span>
      <span class="hljs-keyword">if</span> (board[i][j] !== <span class="hljs-string">&apos;.&apos;</span>) {
        <span class="hljs-keyword">if</span> (row[board[i][j]]) {
          <span class="hljs-built_in">console</span>.log(board[i][j])
          <span class="hljs-keyword">return</span> isPass = <span class="hljs-literal">false</span>
        } <span class="hljs-keyword">else</span> {
          row[board[i][j]] = board[i][j]
        }
      }
      <span class="hljs-comment">// &#x5224;&#x65AD;&#x5217;</span>
      <span class="hljs-keyword">if</span> (board[j][i] !== <span class="hljs-string">&apos;.&apos;</span>) {
        <span class="hljs-keyword">if</span> (col[board[j][i]]) {
          <span class="hljs-built_in">console</span>.log(board[j][i]);
          <span class="hljs-keyword">return</span> isPass = <span class="hljs-literal">false</span>
        } <span class="hljs-keyword">else</span> {
          col[board[j][i]] = board[j][i]
        }
      }
      <span class="hljs-comment">// &#x5224;&#x65AD;&#x4E5D;&#x5BAB;&#x683C; &#x901A;&#x8FC7;&#x4F59;&#x6570;&#x7684;&#x5F62;&#x5F0F;&#x5224;&#x65AD;&#x51FA;&#x6765;&#x5F53;&#x524D;&#x6240;&#x5904;&#x7684;9&#x5BAB;&#x683C;</span>
      <span class="hljs-comment">// &#x5148;&#x8BA1;&#x7B97;&#x51FA;&#x4F4D;&#x7F6E;</span>
      <span class="hljs-keyword">let</span> c = <span class="hljs-built_in">Math</span>.floor(i/<span class="hljs-number">3</span>)  <span class="hljs-comment">// col&#x4F4D;&#x7F6E;</span>
      <span class="hljs-keyword">let</span> r = <span class="hljs-built_in">Math</span>.floor(j/<span class="hljs-number">3</span>) <span class="hljs-comment">// row &#x4F4D;&#x7F6E;</span>
      <span class="hljs-comment">// &#x52FE;&#x52D2;&#x51FA;&#x4E5D;&#x5BAB;&#x683C;</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> m = c*<span class="hljs-number">3</span>; m &lt; c*<span class="hljs-number">3</span> + <span class="hljs-number">3</span>; m++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> n = r * <span class="hljs-number">3</span>; n &lt; r * <span class="hljs-number">3</span> + <span class="hljs-number">3</span>; n++) {
          <span class="hljs-keyword">if</span> (m === i &amp;&amp; n === j) {
            <span class="hljs-comment">// m === i &amp;&amp; n === j &#x8FD9;&#x65F6;&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;</span>
            <span class="hljs-keyword">continue</span>
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// &#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x6B21;&#x6C42;&#x503C;&#x5224;&#x65AD;</span>
            <span class="hljs-keyword">if</span>(board[m][n] != <span class="hljs-string">&apos;.&apos;</span> &amp;&amp; board[i][j]!== <span class="hljs-string">&apos;.&apos;</span> &amp;&amp; (board[i][j]) === board[m][n]) {
              <span class="hljs-keyword">return</span> isPass = <span class="hljs-literal">false</span>
            } 
          }
        }
      }
      
    }
  }
  <span class="hljs-keyword">return</span> isPass
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;=================&#x6709;&#x6548;&#x6570;&#x72EC;&#x7B97;&#x6CD5;&#x7ED3;&#x679C;===================&apos;</span>);
<span class="hljs-built_in">console</span>.log(isValidSudoku(board))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>);</code></pre><h3 id="articleHeader12">11&#xFF1A;&#x65CB;&#x8F6C;&#x56FE;&#x50CF;</h3><blockquote>&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A; n &#xD7; n &#x7684;&#x4E8C;&#x7EF4;&#x77E9;&#x9635;&#x8868;&#x793A;&#x4E00;&#x4E2A;&#x56FE;&#x50CF;&#x3002;&#x5C06;&#x56FE;&#x50CF;&#x987A;&#x65F6;&#x9488;&#x65CB;&#x8F6C; 90 &#x5EA6;&#x3002;</blockquote><p><strong>&#x793A;&#x4F8B;</strong></p><p>&#x7ED9;&#x5B9A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  [1,2,3],
  [4,5,6],
  [7,8,9]
]," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">[
  [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],
  [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>],
  [<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>]
],</code></pre><p>&#x8F93;&#x51FA;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">[
  [<span class="hljs-number">7</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1</span>],
  [<span class="hljs-number">8</span>,<span class="hljs-number">5</span>,<span class="hljs-number">2</span>],
  [<span class="hljs-number">9</span>,<span class="hljs-number">6</span>,<span class="hljs-number">3</span>]
]</code></pre><p><strong>&#x8981;&#x6C42;</strong></p><p>&#x4F60;&#x5FC5;&#x987B;&#x5728;&#x539F;&#x5730;&#x65CB;&#x8F6C;&#x56FE;&#x50CF;&#xFF0C;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x4F60;&#x9700;&#x8981;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x8F93;&#x5165;&#x7684;&#x4E8C;&#x7EF4;&#x77E9;&#x9635;&#x3002;&#x8BF7;&#x4E0D;&#x8981;&#x4F7F;&#x7528;&#x53E6;&#x4E00;&#x4E2A;&#x77E9;&#x9635;&#x6765;&#x65CB;&#x8F6C;&#x56FE;&#x50CF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 11&#xFF1A; &#x65CB;&#x8F6C;&#x56FE;&#x50CF;
 **/
const matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]
// 
/* const matrix = [
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
] */
const rotateMaps = function (matrix:number[][]) {
  const n = matrix.length
  // &#x5012;&#x53D9;&#x5FAA;&#x73AF;&#x8FDB;&#x884C;90&#x5EA6;&#x7684;&#x53CD;&#x8F6C;
  for (let i = n-1; i &gt;= 0; i--) {
    // &#x65B0;&#x6570;&#x7EC4;&#x8865;&#x4F4D;&#x5230;&#x539F;&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x4E3A;&#x4E86;&#x662F;&#x5B9E;&#x73B0;&#x539F;&#x5730;&#x7684;&#x65CB;&#x8F6C;&#x64CD;&#x4F5C;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x9700;&#x8981;
    for (let j = 0; j &lt; n ; j++) {
      // console.log(`&#x5F53;&#x524D;&#x5750;&#x6807;[${i},${j}]`)
      const current = matrix[i][j]
      matrix[j].push(current)
      // &#x6CA1;&#x5B8C;&#x6210;&#x4E00;&#x7EC4;&#x7684;&#x8D4B;&#x503C;&#x64CD;&#x4F5C;&#xFF0C;&#x5C31;&#x5220;&#x9664;&#x65CB;&#x8F6C;&#x524D;&#x6570;&#x7EC4;
      if(j === n - 1) {
        matrix[i].splice(0, n)
      }
    }
  }
  console.log(matrix)
  // return matrix
}

console.log(&apos;================&#x65CB;&#x8F6C;&#x56FE;&#x50CF;&#x7B97;&#x6CD5;====================&apos;);
console.log(rotateMaps(matrix));
console.log(&apos;====================================&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * 11&#xFF1A; &#x65CB;&#x8F6C;&#x56FE;&#x50CF;
 **/</span>
<span class="hljs-keyword">const</span> matrix = [
  [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],
  [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>],
  [<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>]
]
<span class="hljs-comment">// </span>
<span class="hljs-comment">/* const matrix = [
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
] */</span>
<span class="hljs-keyword">const</span> rotateMaps = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">matrix:<span class="hljs-built_in">number</span>[][]</span>) </span>{
  <span class="hljs-keyword">const</span> n = matrix.length
  <span class="hljs-comment">// &#x5012;&#x53D9;&#x5FAA;&#x73AF;&#x8FDB;&#x884C;90&#x5EA6;&#x7684;&#x53CD;&#x8F6C;</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = n<span class="hljs-number">-1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
    <span class="hljs-comment">// &#x65B0;&#x6570;&#x7EC4;&#x8865;&#x4F4D;&#x5230;&#x539F;&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x4E3A;&#x4E86;&#x662F;&#x5B9E;&#x73B0;&#x539F;&#x5730;&#x7684;&#x65CB;&#x8F6C;&#x64CD;&#x4F5C;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x9700;&#x8981;</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; n ; j++) {
      <span class="hljs-comment">// console.log(`&#x5F53;&#x524D;&#x5750;&#x6807;[${i},${j}]`)</span>
      <span class="hljs-keyword">const</span> current = matrix[i][j]
      matrix[j].push(current)
      <span class="hljs-comment">// &#x6CA1;&#x5B8C;&#x6210;&#x4E00;&#x7EC4;&#x7684;&#x8D4B;&#x503C;&#x64CD;&#x4F5C;&#xFF0C;&#x5C31;&#x5220;&#x9664;&#x65CB;&#x8F6C;&#x524D;&#x6570;&#x7EC4;</span>
      <span class="hljs-keyword">if</span>(j === n - <span class="hljs-number">1</span>) {
        matrix[i].splice(<span class="hljs-number">0</span>, n)
      }
    }
  }
  <span class="hljs-built_in">console</span>.log(matrix)
  <span class="hljs-comment">// return matrix</span>
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;================&#x65CB;&#x8F6C;&#x56FE;&#x50CF;&#x7B97;&#x6CD5;====================&apos;</span>);
<span class="hljs-built_in">console</span>.log(rotateMaps(matrix));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>);</code></pre><h2 id="articleHeader13">&#x5176;&#x4ED6;&#x90E8;&#x5206;(&#x6301;&#x7EED;&#x66F4;&#x65B0;...)</h2><p>&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#x5148;&#x51FA;demo&#xFF0C;&#x540E;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x89E3;&#x6790;&#x6CE8;&#x91CA;&#x4F1A;&#x6162;&#x6162;&#x52A0;&#x4E0A;</p><h3 id="articleHeader14">12: &#x67E5;&#x627E;&#x7236;&#x4EB2;&#x8282;&#x70B9;</h3><blockquote>fid&#x4E3A;0&#x4EE3;&#x8868;&#x4E00;&#x7EA7;&#xFF0C;fid&#x5982;&#x679C;&#x548C;fid&#x4E3A;0&#x7684;cid&#x76F8;&#x7B49;&#x7684;&#x8BDD;&#x4EE3;&#x8868;&#x4E8C;&#x7EA7; &#x4EE5;&#x6B64;&#x7C7B;&#x63A8;...</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 10&#xFF1A;&#x627E;&#x7236;&#x4EB2;&#x8282;&#x70B9;
 * fid&#x4E3A;0&#x4EE3;&#x8868;&#x4E00;&#x7EA7;&#xFF0C;fid&#x5982;&#x679C;&#x548C;fid&#x4E3A;0&#x7684;cid&#x76F8;&#x7B49;&#x7684;&#x8BDD;&#x4EE3;&#x8868;&#x4E8C;&#x7EA7; &#x4EE5;&#x6B64;&#x7C7B;&#x63A8;...
 */
const findArr = [
  {&quot;fid&quot;:0,&quot;cid&quot;:3,&quot;flag&quot;:&quot;&#x6700;&#x5916;&#x5C42;3&quot;},
  {&quot;fid&quot;:0,&quot;cid&quot;:4,&quot;flag&quot;:&quot;&#x6700;&#x5916;&#x5C42;4&quot;},
  {&quot;fid&quot;:4,&quot;cid&quot;:5,&quot;flag&quot;:&quot;&#x6700;&#x5916;&#x5C42;-4&quot;},
  {&quot;fid&quot;:5,&quot;cid&quot;:6,&quot;flag&quot;:&quot;&#x6700;&#x5916;&#x5C42;-4-1&quot;},
  {&quot;fid&quot;:0,&quot;cid&quot;:7,&quot;flag&quot;:&quot;&#x6700;&#x5916;&#x5C42;7&quot;},
  {&quot;fid&quot;:7,&quot;cid&quot;:8,&quot;flag&quot;:&quot;&#x6700;&#x5916;&#x5C42;-7&quot;},
  {&quot;fid&quot;:0,&quot;cid&quot;:9,&quot;flag&quot;:&quot;&#x6700;&#x5916;&#x5C42;9&quot;},
  {&quot;fid&quot;:9,&quot;cid&quot;:10,&quot;flag&quot;:&quot;&#x6700;&#x5916;&#x5C42;9-1&quot;},
  {&quot;fid&quot;:9,&quot;cid&quot;:11,&quot;flag&quot;:&quot;&#x6700;&#x5916;&#x5C42;9-2&quot;},
  {&quot;fid&quot;:11,&quot;cid&quot;:12,&quot;flag&quot;:&quot;&#x6700;&#x5916;&#x5C42;9-2-1&quot;}
]
/**
 * &#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#xFF1A;&#x53CC;&#x9012;&#x5F52;&#x65B9;&#x5F0F;
 * @param arr 
 */
const findfid  = function (arr: any[]): any[] {
  let newArr:any[] = []
  for (let i = 0; i &lt; arr.length; i++) {
    let flagId = arr[i].cid // &#x53D6;&#x51FA;&#x6765;&#x4E00;&#x4E2A;flag &#x8FD9;&#x4E2A;&#x662F;&#x7528;&#x4E8E;&#x548C;&#x4E0B;&#x4E00;&#x4E2A;&#x7EA7;&#x522B;&#x5339;&#x914D;&#x7684;
    for (let j = 0; j &lt; arr.length; j++) {
      const elJ = arr[j]
      if (elJ.fid === flagId) { // fid &#x548C; &#x4E0A;&#x7EA7;id &#x5339;&#x914D;
        (arr[i].children = []).push(elJ)
      }
    }
    // &#x53EA;&#x5B58;&#x5165;&#x7B2C;&#x4E00;&#x7B49;&#x7EA7;
    arr[i].fid === 0 &amp;&amp; newArr.push(arr[i])
  }
  return newArr
}
/**
 * &#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x6CD5;&#xFF1A; &#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x5B58;&#x50A8;id &#x7136;&#x540E;&#x548C;fid&#x8FDB;&#x884C;&#x5BF9;&#x6BD4;
 * @param arr 
 */
const findfidByObj = function (arr: any[]): any[] {
  let newArr:any[] = []
  let flagObj: any = {}
  arr.forEach(v =&gt; {
    flagObj[v.cid] = v
  })
  arr.forEach (item =&gt; {
    // &#x6839;&#x636E;&#x5F53;&#x524D;&#x904D;&#x5386;&#x5BF9;&#x8C61;&#x7684;fid,&#x53BB;map&#x5BF9;&#x8C61;&#x4E2D;&#x627E;&#x5230;&#x5BF9;&#x5E94;&#x7D22;&#x5F15;&#x7684;id
    const top = flagObj[item.fid]
    if (top) {
      // &#x5982;&#x679C;&#x627E;&#x5230;&#x7D22;&#x5F15;&#xFF0C;&#x90A3;&#x4E48;&#x8BF4;&#x660E;&#x6B64;&#x9879;&#x4E0D;&#x5728;&#x9876;&#x7EA7;&#x5F53;&#x4E2D;,&#x90A3;&#x4E48;&#x9700;&#x8981;&#x628A;&#x6B64;&#x9879;&#x6DFB;&#x52A0;&#x5230;&#xFF0C;&#x4ED6;&#x5BF9;&#x5E94;&#x7684;&#x7236;&#x7EA7;&#x4E2D;
      (top.children || (top.children = [])).push(item)
    } else {
      // &#x5982;&#x679C;&#x6CA1;&#x6709;&#x5728;map&#x4E2D;&#x627E;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x7D22;&#x5F15;ID,&#x90A3;&#x4E48;&#x76F4;&#x63A5;&#x628A;&#x5F53;&#x524D;&#x7684;item&#x6DFB;&#x52A0;&#x5230;newData&#x7ED3;&#x679C;&#x96C6;&#x4E2D;&#x4F5C;&#x4E3A;&#x9876;&#x7EA7;
      newArr.push(item)
    }
  })
  return newArr
}
console.log(&apos;====================================&apos;);
console.log(&apos;&#x627E;&#x7236;&#x4EB2;&#x8282;&#x70B9;&#x65B9;&#x5F0F;&apos;);
console.log(findfid(findArr))
console.log(findfidByObj(findArr))
console.log(&apos;====================================&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * 10&#xFF1A;&#x627E;&#x7236;&#x4EB2;&#x8282;&#x70B9;
 * fid&#x4E3A;0&#x4EE3;&#x8868;&#x4E00;&#x7EA7;&#xFF0C;fid&#x5982;&#x679C;&#x548C;fid&#x4E3A;0&#x7684;cid&#x76F8;&#x7B49;&#x7684;&#x8BDD;&#x4EE3;&#x8868;&#x4E8C;&#x7EA7; &#x4EE5;&#x6B64;&#x7C7B;&#x63A8;...
 */</span>
<span class="hljs-keyword">const</span> findArr = [
  {<span class="hljs-string">&quot;fid&quot;</span>:<span class="hljs-number">0</span>,<span class="hljs-string">&quot;cid&quot;</span>:<span class="hljs-number">3</span>,<span class="hljs-string">&quot;flag&quot;</span>:<span class="hljs-string">&quot;&#x6700;&#x5916;&#x5C42;3&quot;</span>},
  {<span class="hljs-string">&quot;fid&quot;</span>:<span class="hljs-number">0</span>,<span class="hljs-string">&quot;cid&quot;</span>:<span class="hljs-number">4</span>,<span class="hljs-string">&quot;flag&quot;</span>:<span class="hljs-string">&quot;&#x6700;&#x5916;&#x5C42;4&quot;</span>},
  {<span class="hljs-string">&quot;fid&quot;</span>:<span class="hljs-number">4</span>,<span class="hljs-string">&quot;cid&quot;</span>:<span class="hljs-number">5</span>,<span class="hljs-string">&quot;flag&quot;</span>:<span class="hljs-string">&quot;&#x6700;&#x5916;&#x5C42;-4&quot;</span>},
  {<span class="hljs-string">&quot;fid&quot;</span>:<span class="hljs-number">5</span>,<span class="hljs-string">&quot;cid&quot;</span>:<span class="hljs-number">6</span>,<span class="hljs-string">&quot;flag&quot;</span>:<span class="hljs-string">&quot;&#x6700;&#x5916;&#x5C42;-4-1&quot;</span>},
  {<span class="hljs-string">&quot;fid&quot;</span>:<span class="hljs-number">0</span>,<span class="hljs-string">&quot;cid&quot;</span>:<span class="hljs-number">7</span>,<span class="hljs-string">&quot;flag&quot;</span>:<span class="hljs-string">&quot;&#x6700;&#x5916;&#x5C42;7&quot;</span>},
  {<span class="hljs-string">&quot;fid&quot;</span>:<span class="hljs-number">7</span>,<span class="hljs-string">&quot;cid&quot;</span>:<span class="hljs-number">8</span>,<span class="hljs-string">&quot;flag&quot;</span>:<span class="hljs-string">&quot;&#x6700;&#x5916;&#x5C42;-7&quot;</span>},
  {<span class="hljs-string">&quot;fid&quot;</span>:<span class="hljs-number">0</span>,<span class="hljs-string">&quot;cid&quot;</span>:<span class="hljs-number">9</span>,<span class="hljs-string">&quot;flag&quot;</span>:<span class="hljs-string">&quot;&#x6700;&#x5916;&#x5C42;9&quot;</span>},
  {<span class="hljs-string">&quot;fid&quot;</span>:<span class="hljs-number">9</span>,<span class="hljs-string">&quot;cid&quot;</span>:<span class="hljs-number">10</span>,<span class="hljs-string">&quot;flag&quot;</span>:<span class="hljs-string">&quot;&#x6700;&#x5916;&#x5C42;9-1&quot;</span>},
  {<span class="hljs-string">&quot;fid&quot;</span>:<span class="hljs-number">9</span>,<span class="hljs-string">&quot;cid&quot;</span>:<span class="hljs-number">11</span>,<span class="hljs-string">&quot;flag&quot;</span>:<span class="hljs-string">&quot;&#x6700;&#x5916;&#x5C42;9-2&quot;</span>},
  {<span class="hljs-string">&quot;fid&quot;</span>:<span class="hljs-number">11</span>,<span class="hljs-string">&quot;cid&quot;</span>:<span class="hljs-number">12</span>,<span class="hljs-string">&quot;flag&quot;</span>:<span class="hljs-string">&quot;&#x6700;&#x5916;&#x5C42;9-2-1&quot;</span>}
]
<span class="hljs-comment">/**
 * &#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#xFF1A;&#x53CC;&#x9012;&#x5F52;&#x65B9;&#x5F0F;
 * @param arr 
 */</span>
<span class="hljs-keyword">const</span> findfid  = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arr: <span class="hljs-built_in">any</span>[]</span>): <span class="hljs-title">any</span>[] </span>{
  <span class="hljs-keyword">let</span> newArr:<span class="hljs-built_in">any</span>[] = []
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    <span class="hljs-keyword">let</span> flagId = arr[i].cid <span class="hljs-comment">// &#x53D6;&#x51FA;&#x6765;&#x4E00;&#x4E2A;flag &#x8FD9;&#x4E2A;&#x662F;&#x7528;&#x4E8E;&#x548C;&#x4E0B;&#x4E00;&#x4E2A;&#x7EA7;&#x522B;&#x5339;&#x914D;&#x7684;</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; arr.length; j++) {
      <span class="hljs-keyword">const</span> elJ = arr[j]
      <span class="hljs-keyword">if</span> (elJ.fid === flagId) { <span class="hljs-comment">// fid &#x548C; &#x4E0A;&#x7EA7;id &#x5339;&#x914D;</span>
        (arr[i].children = []).push(elJ)
      }
    }
    <span class="hljs-comment">// &#x53EA;&#x5B58;&#x5165;&#x7B2C;&#x4E00;&#x7B49;&#x7EA7;</span>
    arr[i].fid === <span class="hljs-number">0</span> &amp;&amp; newArr.push(arr[i])
  }
  <span class="hljs-keyword">return</span> newArr
}
<span class="hljs-comment">/**
 * &#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x6CD5;&#xFF1A; &#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x5B58;&#x50A8;id &#x7136;&#x540E;&#x548C;fid&#x8FDB;&#x884C;&#x5BF9;&#x6BD4;
 * @param arr 
 */</span>
<span class="hljs-keyword">const</span> findfidByObj = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arr: <span class="hljs-built_in">any</span>[]</span>): <span class="hljs-title">any</span>[] </span>{
  <span class="hljs-keyword">let</span> newArr:<span class="hljs-built_in">any</span>[] = []
  <span class="hljs-keyword">let</span> flagObj: <span class="hljs-built_in">any</span> = {}
  arr.forEach(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> {
    flagObj[v.cid] = v
  })
  arr.forEach (<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
    <span class="hljs-comment">// &#x6839;&#x636E;&#x5F53;&#x524D;&#x904D;&#x5386;&#x5BF9;&#x8C61;&#x7684;fid,&#x53BB;map&#x5BF9;&#x8C61;&#x4E2D;&#x627E;&#x5230;&#x5BF9;&#x5E94;&#x7D22;&#x5F15;&#x7684;id</span>
    <span class="hljs-keyword">const</span> top = flagObj[item.fid]
    <span class="hljs-keyword">if</span> (top) {
      <span class="hljs-comment">// &#x5982;&#x679C;&#x627E;&#x5230;&#x7D22;&#x5F15;&#xFF0C;&#x90A3;&#x4E48;&#x8BF4;&#x660E;&#x6B64;&#x9879;&#x4E0D;&#x5728;&#x9876;&#x7EA7;&#x5F53;&#x4E2D;,&#x90A3;&#x4E48;&#x9700;&#x8981;&#x628A;&#x6B64;&#x9879;&#x6DFB;&#x52A0;&#x5230;&#xFF0C;&#x4ED6;&#x5BF9;&#x5E94;&#x7684;&#x7236;&#x7EA7;&#x4E2D;</span>
      (top.children || (top.children = [])).push(item)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// &#x5982;&#x679C;&#x6CA1;&#x6709;&#x5728;map&#x4E2D;&#x627E;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x7D22;&#x5F15;ID,&#x90A3;&#x4E48;&#x76F4;&#x63A5;&#x628A;&#x5F53;&#x524D;&#x7684;item&#x6DFB;&#x52A0;&#x5230;newData&#x7ED3;&#x679C;&#x96C6;&#x4E2D;&#x4F5C;&#x4E3A;&#x9876;&#x7EA7;</span>
      newArr.push(item)
    }
  })
  <span class="hljs-keyword">return</span> newArr
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x627E;&#x7236;&#x4EB2;&#x8282;&#x70B9;&#x65B9;&#x5F0F;&apos;</span>);
<span class="hljs-built_in">console</span>.log(findfid(findArr))
<span class="hljs-built_in">console</span>.log(findfidByObj(findArr))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>);</code></pre><h3 id="articleHeader15">13&#xFF1A;&#x7B80;&#x5355;&#x9009;&#x62E9;&#x6392;&#x5E8F;</h3><blockquote>&#x9009;&#x62E9;&#x6392;&#x5E8F;&#xFF08;Selection sort&#xFF09;&#x662F;&#x4E00;&#x79CD;&#x7B80;&#x5355;&#x76F4;&#x89C2;&#x7684;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;&#x3002;&#x5B83;&#x7684;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#x662F;&#x6BCF;&#x4E00;&#x6B21;&#x4ECE;&#x5F85;&#x6392;&#x5E8F;&#x7684;&#x6570;&#x636E;&#x5143;&#x7D20;&#x4E2D;&#x9009;&#x51FA;&#x6700;&#x5C0F;&#xFF08;&#x6216;&#x6700;&#x5927;&#xFF09;&#x7684;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5B58;&#x653E;&#x5728;&#x5E8F;&#x5217;&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;&#xFF0C;&#x76F4;&#x5230;&#x5168;&#x90E8;&#x5F85;&#x6392;&#x5E8F;&#x7684;&#x6570;&#x636E;&#x5143;&#x7D20;&#x6392;&#x5B8C;&#x3002; &#x9009;&#x62E9;&#x6392;&#x5E8F;&#x662F;&#x4E0D;&#x7A33;&#x5B9A;&#x7684;&#x6392;&#x5E8F;&#x65B9;&#x6CD5;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x4EA4;&#x6362;&#x53C2;&#x6570;
 * @param {*} arr 
 * @param {*} a 
 * @param {*} b 
 */
const swap = function(arr: number[], a:number, b:number) {
  let curr = arr[a]
  arr[a] = arr[b]
  arr[b] = curr
}
/**
 * 
 * @param {&#x9009;&#x62E9;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;} arr 
 */
const sort = function (arr: number[]) {
  console.time()
  for (let i = 0; i &lt; arr.length; i++) {
    //&#x5047;&#x8BBE;&#x904D;&#x5386;&#x7684;&#x5F53;&#x524D;&#x7B2C;&#x4E00;&#x4E2A;&#x662F;&#x6700;&#x5C0F;&#x7684;
    let minIndex = i
    //&#x7B2C;&#x4E8C;&#x6B21;&#x904D;&#x5386;&#x628A;arr[minIndex]&#x548C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5176;&#x4ED6;&#x7684;&#x503C;&#x8FDB;&#x884C;&#x904D;&#x5386;
    for (let j = 0; j &lt; arr.length; j++) {
      if(arr[minIndex] &gt; arr[j]){
        minIndex = j
      }
    }
    //&#x5916;&#x5C42;&#x5FAA;&#x73AF;&#x505A;&#x4EA4;&#x6362;
    swap(arr,minIndex,i)
  }
  console.log(arr)
  console.timeEnd()
}
sort([3,6,28,123,34])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * &#x4EA4;&#x6362;&#x53C2;&#x6570;
 * @param {*} arr 
 * @param {*} a 
 * @param {*} b 
 */</span>
<span class="hljs-keyword">const</span> swap = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr: <span class="hljs-built_in">number</span>[], a:<span class="hljs-built_in">number</span>, b:<span class="hljs-built_in">number</span></span>) </span>{
  <span class="hljs-keyword">let</span> curr = arr[a]
  arr[a] = arr[b]
  arr[b] = curr
}
<span class="hljs-comment">/**
 * 
 * @param {&#x9009;&#x62E9;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;} arr 
 */</span>
<span class="hljs-keyword">const</span> sort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arr: <span class="hljs-built_in">number</span>[]</span>) </span>{
  <span class="hljs-built_in">console</span>.time()
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    <span class="hljs-comment">//&#x5047;&#x8BBE;&#x904D;&#x5386;&#x7684;&#x5F53;&#x524D;&#x7B2C;&#x4E00;&#x4E2A;&#x662F;&#x6700;&#x5C0F;&#x7684;</span>
    <span class="hljs-keyword">let</span> minIndex = i
    <span class="hljs-comment">//&#x7B2C;&#x4E8C;&#x6B21;&#x904D;&#x5386;&#x628A;arr[minIndex]&#x548C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5176;&#x4ED6;&#x7684;&#x503C;&#x8FDB;&#x884C;&#x904D;&#x5386;</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; arr.length; j++) {
      <span class="hljs-keyword">if</span>(arr[minIndex] &gt; arr[j]){
        minIndex = j
      }
    }
    <span class="hljs-comment">//&#x5916;&#x5C42;&#x5FAA;&#x73AF;&#x505A;&#x4EA4;&#x6362;</span>
    swap(arr,minIndex,i)
  }
  <span class="hljs-built_in">console</span>.log(arr)
  <span class="hljs-built_in">console</span>.timeEnd()
}
sort([<span class="hljs-number">3</span>,<span class="hljs-number">6</span>,<span class="hljs-number">28</span>,<span class="hljs-number">123</span>,<span class="hljs-number">34</span>])</code></pre><h3 id="articleHeader16">14&#xFF1A;&#x7B80;&#x5355;&#x5192;&#x6CE1;&#x6392;&#x5E8F;</h3><blockquote>&#x5192;&#x6CE1;&#x6392;&#x5E8F;&#xFF08;Bubble Sort&#xFF09;&#xFF0C;&#x662F;&#x4E00;&#x79CD;&#x8BA1;&#x7B97;&#x673A;&#x79D1;&#x5B66;&#x9886;&#x57DF;&#x7684;&#x8F83;&#x7B80;&#x5355;&#x7684;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;&#x3002;&#x5B83;&#x91CD;&#x590D;&#x5730;&#x8D70;&#x8BBF;&#x8FC7;&#x8981;&#x6392;&#x5E8F;&#x7684;&#x5143;&#x7D20;&#x5217;&#xFF0C;&#x4F9D;&#x6B21;&#x6BD4;&#x8F83;&#x4E24;&#x4E2A;&#x76F8;&#x90BB;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5982;&#x679C;&#x4ED6;&#x4EEC;&#x7684;&#x987A;&#x5E8F;&#xFF08;&#x5982;&#x4ECE;&#x5927;&#x5230;&#x5C0F;&#x3001;&#x9996;&#x5B57;&#x6BCD;&#x4ECE;A&#x5230;Z&#xFF09;&#x9519;&#x8BEF;&#x5C31;&#x628A;&#x4ED6;&#x4EEC;&#x4EA4;&#x6362;&#x8FC7;&#x6765;&#x3002;&#x8D70;&#x8BBF;&#x5143;&#x7D20;&#x7684;&#x5DE5;&#x4F5C;&#x662F;&#x91CD;&#x590D;&#x5730;&#x8FDB;&#x884C;&#x76F4;&#x5230;&#x6CA1;&#x6709;&#x76F8;&#x90BB;&#x5143;&#x7D20;&#x9700;&#x8981;&#x4EA4;&#x6362;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x8BE5;&#x5143;&#x7D20;&#x5DF2;&#x7ECF;&#x6392;&#x5E8F;&#x5B8C;&#x6210;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {*&#x5192;&#x6CE1;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;} arr 
 */
const bubbleSort = function (arr: number[]){
  console.log(&apos;&#x5192;&#x6CE1;&#x7B97;&#x6CD5;&#x5F00;&#x59CB;&#x65F6;&#x95F4;:&apos;)
  console.time()
  for (let i = 0; i &lt; arr.length; i++) {
    // &#x8FD9;&#x4E2A;&#x5FAA;&#x73AF;&#x65F6;&#x83B7;&#x53D6;&#x5230;&#x4E4B;&#x540E;&#x7684;&#x9879;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;
    for (let j = i+1; j &gt; 0; j--) {
      // &#x8FD9;&#x4E2A;&#x6838;&#x5FC3;&#x5C31;&#x662F; &#x5982;&#x679C;&#x5F53;&#x524D;&#x9879;&#x5C0F;&#x4E8E;&#x524D;&#x4E00;&#x9879;&#x90A3;&#x4E48;&#x5F53;&#x524D;&#x9879;&#x5411;&#x4E0A;&#x5192;&#x6CE1;
      if(arr[i] &lt; arr[j-1]){
        // &#x5192;&#x6CE1;&#x4EA4;&#x6362;
        swap(arr,j,j-1)
      }
    }
  }
  console.timeEnd()
  console.log(arr)
}
bubbleSort([3,123,6,28,34])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * @param {*&#x5192;&#x6CE1;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;} arr 
 */</span>
<span class="hljs-keyword">const</span> bubbleSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arr: <span class="hljs-built_in">number</span>[]</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x5192;&#x6CE1;&#x7B97;&#x6CD5;&#x5F00;&#x59CB;&#x65F6;&#x95F4;:&apos;</span>)
  <span class="hljs-built_in">console</span>.time()
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x5FAA;&#x73AF;&#x65F6;&#x83B7;&#x53D6;&#x5230;&#x4E4B;&#x540E;&#x7684;&#x9879;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = i+<span class="hljs-number">1</span>; j &gt; <span class="hljs-number">0</span>; j--) {
      <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x6838;&#x5FC3;&#x5C31;&#x662F; &#x5982;&#x679C;&#x5F53;&#x524D;&#x9879;&#x5C0F;&#x4E8E;&#x524D;&#x4E00;&#x9879;&#x90A3;&#x4E48;&#x5F53;&#x524D;&#x9879;&#x5411;&#x4E0A;&#x5192;&#x6CE1;</span>
      <span class="hljs-keyword">if</span>(arr[i] &lt; arr[j<span class="hljs-number">-1</span>]){
        <span class="hljs-comment">// &#x5192;&#x6CE1;&#x4EA4;&#x6362;</span>
        swap(arr,j,j<span class="hljs-number">-1</span>)
      }
    }
  }
  <span class="hljs-built_in">console</span>.timeEnd()
  <span class="hljs-built_in">console</span>.log(arr)
}
bubbleSort([<span class="hljs-number">3</span>,<span class="hljs-number">123</span>,<span class="hljs-number">6</span>,<span class="hljs-number">28</span>,<span class="hljs-number">34</span>])</code></pre><h3 id="articleHeader17">15&#xFF1A;&#x7B80;&#x5355;&#x63D2;&#x5165;&#x6392;&#x5E8F;</h3><blockquote>&#x63D2;&#x5165;&#x6392;&#x5E8F;&#x662F;&#x57FA;&#x4E8E;&#x6BD4;&#x8F83;&#x7684;&#x6392;&#x5E8F;&#x3002;&#x6240;&#x8C13;&#x7684;&#x57FA;&#x4E8E;&#x6BD4;&#x8F83;&#xFF0C;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x6BD4;&#x8F83;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x770B;&#x8C01;&#x5927;&#x8C01;&#x5C0F;&#xFF0C;&#x6839;&#x636E;&#x7ED3;&#x679C;&#x6765;&#x8C03;&#x6574;&#x5143;&#x7D20;&#x7684;&#x4F4D;&#x7F6E;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x63D2;&#x5165;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;
/**
 * 
 * @param {&#x63D2;&#x5165;&#x6392;&#x5E8F;} arr 
 */
const insertSort = function (arr: number[]){
  console.time()
  for (let i = 0; i &lt; arr.length; i++) {
    // &#x5728;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x7684;&#x65F6;&#x5019;&#x9996;&#x5148;&#x7F13;&#x5B58;&#x4E0B;&#x6765;&#x5F53;&#x524D;&#x7684;&#x503C;&#x548C;&#x4E0A;&#x4E00;&#x4E2A;index &#x7F13;&#x5B58;&#x4E0A;&#x4E00;&#x4E2A;index&#x7528;&#x6765;&#x6BD4;&#x8F83;
    let compareIndex = i -1
    let currentValue = arr[i]
    // &#x5728;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;&#x53EF;&#x4EE5;&#x6BD4;&#x8F83;&#x5E76;&#x4E14;&#x5F53;&#x524D;&#x7684;&#x503C;&#x5C0F;&#x4E8E;&#x524D;&#x4E00;&#x9879;&#x7684;&#x503C;&#x7684;&#x65F6;&#x5019;&#x63D2;&#x5165;&#x7F13;&#x5B58;&#x7684;&#x503C;&#x7136;&#x540E;&#x4FEE;&#x6539;index
    while (compareIndex &gt;=0 &amp;&amp; arr[compareIndex] &gt; currentValue) {
      arr[compareIndex + 1] = arr[compareIndex]
      compareIndex--
    }
    arr[compareIndex + 1 ] = currentValue
  }
  console.timeEnd()
  console.log(arr)
}
insertSort([3,2,1])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">//&#x63D2;&#x5165;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;</span>
<span class="hljs-comment">/**
 * 
 * @param {&#x63D2;&#x5165;&#x6392;&#x5E8F;} arr 
 */</span>
<span class="hljs-keyword">const</span> insertSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arr: <span class="hljs-built_in">number</span>[]</span>)</span>{
  <span class="hljs-built_in">console</span>.time()
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    <span class="hljs-comment">// &#x5728;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x7684;&#x65F6;&#x5019;&#x9996;&#x5148;&#x7F13;&#x5B58;&#x4E0B;&#x6765;&#x5F53;&#x524D;&#x7684;&#x503C;&#x548C;&#x4E0A;&#x4E00;&#x4E2A;index &#x7F13;&#x5B58;&#x4E0A;&#x4E00;&#x4E2A;index&#x7528;&#x6765;&#x6BD4;&#x8F83;</span>
    <span class="hljs-keyword">let</span> compareIndex = i <span class="hljs-number">-1</span>
    <span class="hljs-keyword">let</span> currentValue = arr[i]
    <span class="hljs-comment">// &#x5728;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;&#x53EF;&#x4EE5;&#x6BD4;&#x8F83;&#x5E76;&#x4E14;&#x5F53;&#x524D;&#x7684;&#x503C;&#x5C0F;&#x4E8E;&#x524D;&#x4E00;&#x9879;&#x7684;&#x503C;&#x7684;&#x65F6;&#x5019;&#x63D2;&#x5165;&#x7F13;&#x5B58;&#x7684;&#x503C;&#x7136;&#x540E;&#x4FEE;&#x6539;index</span>
    <span class="hljs-keyword">while</span> (compareIndex &gt;=<span class="hljs-number">0</span> &amp;&amp; arr[compareIndex] &gt; currentValue) {
      arr[compareIndex + <span class="hljs-number">1</span>] = arr[compareIndex]
      compareIndex--
    }
    arr[compareIndex + <span class="hljs-number">1</span> ] = currentValue
  }
  <span class="hljs-built_in">console</span>.timeEnd()
  <span class="hljs-built_in">console</span>.log(arr)
}
insertSort([<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>])</code></pre><h3 id="articleHeader18">16&#xFF1A;&#x7B80;&#x5355;&#x4E8C;&#x5206;&#x67E5;&#x627E;&#x7B97;&#x6CD5;</h3><blockquote>&#x4E8C;&#x5206;&#x67E5;&#x627E;&#x4E5F;&#x79F0;&#x4E3A;&#x6298;&#x534A;&#x67E5;&#x627E;&#x3002;&#x662F;&#x6307;&#x5728;&#x6709;&#x5E8F;&#x7684;&#x6570;&#x7EC4;&#x91CC;&#x627E;&#x51FA;&#x6307;&#x5B9A;&#x7684;&#x503C;&#xFF0C;&#x8FD4;&#x56DE;&#x8BE5;&#x503C;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7D22;&#x5F15;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x4E8C;&#x5206;&#x67E5;&#x627E;&#x7B97;&#x6CD5; 
 * &#x4EC0;&#x4E48;&#x53EB;&#x4E8C;&#x5206;&#x67E5;&#x627E;&#xFF1F; &#x4E8C;&#x5206;&#x67E5;&#x627E;&#x4E5F;&#x79F0;&#x4E3A;&#x6298;&#x534A;&#x67E5;&#x627E;&#x3002;&#x662F;&#x6307;&#x5728;&#x6709;&#x5E8F;&#x7684;&#x6570;&#x7EC4;&#x91CC;&#x627E;&#x51FA;&#x6307;&#x5B9A;&#x7684;&#x503C;&#xFF0C;&#x8FD4;&#x56DE;&#x8BE5;&#x503C;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7D22;&#x5F15;&#x3002;
 * &#xFF08;1&#xFF09;&#x4ECE;&#x6709;&#x5E8F;&#x6570;&#x7EC4;&#x7684;&#x6700;&#x4E2D;&#x95F4;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x67E5;&#x627E;&#xFF0C;&#x5982;&#x679C;&#x8BE5;&#x5143;&#x7D20;&#x6B63;&#x597D;&#x662F;&#x6307;&#x5B9A;&#x67E5;&#x627E;&#x7684;&#x503C;&#xFF0C;&#x5219;&#x67E5;&#x627E;&#x8FC7;&#x7A0B;&#x7ED3;&#x675F;&#x3002;&#x5426;&#x5219;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B65;; 
 * &#xFF08;2&#xFF09;&#x5982;&#x679C;&#x6307;&#x5B9A;&#x8981;&#x67E5;&#x627E;&#x7684;&#x5143;&#x7D20;&#x5927;&#x4E8E;&#x6216;&#x8005;&#x5C0F;&#x4E8E;&#x4E2D;&#x95F4;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x5728;&#x6570;&#x7EC4;&#x5927;&#x4E8E;&#x6216;&#x5C0F;&#x4E8E;&#x4E2D;&#x95F4;&#x5143;&#x7D20;&#x7684;&#x90A3;&#x4E00;&#x534A;&#x533A;&#x57DF;&#x67E5;&#x627E;&#xFF0C;&#x7136;&#x540E;&#x91CD;&#x590D;&#x7B2C;&#x4E00;&#x6B65;&#x7684;&#x64CD;&#x4F5C;; 
 * &#xFF08;3&#xFF09;&#x91CD;&#x590D;&#x4EE5;&#x4E0A;&#x8FC7;&#x7A0B;&#xFF0C;&#x76F4;&#x5230;&#x627E;&#x5230;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x67E5;&#x627E;&#x6210;&#x529F;;&#x6216;&#x8005;&#x76F4;&#x5230;&#x5B50;&#x6570;&#x7EC4;&#x4E3A;&#x7A7A;&#xFF0C;&#x67E5;&#x627E;&#x5931;&#x8D25;&#x3002;
 * &#x6CE8;&#x610F;&#xFF1A; &#x8FD9;&#x4E2A;&#x5148;&#x8981;&#x628A;&#x6570;&#x7EC4;&#x6392;&#x5E8F;&#x4E00;&#x4E0B; &#x5728;&#x6709;&#x5E8F;&#x6570;&#x7EC4;&#x4E2D;&#x67E5;&#x627E;
 * &#x4F18;&#x70B9;&#x662F;&#x6BD4;&#x8F83;&#x6B21;&#x6570;&#x5C11;&#xFF0C;&#x67E5;&#x627E;&#x901F;&#x5EA6;&#x5FEB;&#xFF0C;&#x5E73;&#x5747;&#x6027;&#x80FD;&#x597D;&#xFF1B;
 * &#x5176;&#x7F3A;&#x70B9;&#x662F;&#x8981;&#x6C42;&#x5F85;&#x67E5;&#x8868;&#x4E3A;&#x6709;&#x5E8F;&#x8868;&#xFF0C;&#x4E14;&#x63D2;&#x5165;&#x5220;&#x9664;&#x56F0;&#x96BE;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x6298;&#x534A;&#x67E5;&#x627E;&#x65B9;&#x6CD5;&#x9002;&#x7528;&#x4E8E;&#x4E0D;&#x7ECF;&#x5E38;&#x53D8;&#x52A8;&#x800C;&#x67E5;&#x627E;&#x9891;&#x7E41;&#x7684;&#x6709;&#x5E8F;&#x5217;&#x8868;&#x3002;
 */
/**
 * &#x975E;&#x9012;&#x5F52;&#x5B9E;&#x73B0;
 * @param {*} arr 
 * @param {*} target 
 */
function binarySearcNoRecursive(arr: number[], target: number){
  let low: number = 0, high: number = arr.length-1
  while(low &lt;= high) {
    // &#x9996;&#x5148;&#x627E;&#x5230;&#x4E2D;&#x95F4;&#x4F4D;&#x7F6E;
    let middle = ((high + low ) / 2)
    if( target === arr[middle]){
      return middle
    } else if (target &gt; arr[middle]){
      low = middle + 1
    } else if ( target &lt; arr[middle] ){
      high = middle -1
    }else { 
      return -1
    }
  }
}
const result = binarySearcNoRecursive( [1,2,3,4,5,6,7,8,9,10,11,23,44,86], 23)
console.log(`&#x4E8C;&#x5206;&#x67E5;&#x627E;&#x4E0D;&#x7528;&#x5FAA;&#x73AF;&#x627E;&#x5230;&#x7684;&#x4F4D;&#x7F6E;:${result}`)
/**
 * &#x9012;&#x5F52;&#x5B9E;&#x73B0; &#x5FAA;&#x73AF;&#x8C03;&#x7528;&#x81EA;&#x8EAB;
 * @param {*} arr 
 * @param {*} target 
 */
function binarySearcRecursive(arr: number[], low:number, high: number, target:number){
  if(low &gt; high){
    return -1
  }
  let middle = ((high + low ) / 2)
  if(arr[middle] === target){
    return middle
  } else if(arr[middle] &gt; target){
    high = middle -1
    binarySearcRecursive(arr, low, high, target)
  } else if(arr[middle] &lt; target){
    low = middle + 1
    binarySearcRecursive(arr, low, high, target)
  }
}
const  recursiveRes = binarySearcNoRecursive( [1,2,3,4,5,6,7,8,9,10,11,23,44,86], 3)
console.log(`&#x4E8C;&#x5206;&#x67E5;&#x627E;&#x4E0D;&#x7528;&#x5FAA;&#x73AF;&#x627E;&#x5230;&#x7684;&#x4F4D;&#x7F6E;:${recursiveRes}`)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/**
 * &#x4E8C;&#x5206;&#x67E5;&#x627E;&#x7B97;&#x6CD5; 
 * &#x4EC0;&#x4E48;&#x53EB;&#x4E8C;&#x5206;&#x67E5;&#x627E;&#xFF1F; &#x4E8C;&#x5206;&#x67E5;&#x627E;&#x4E5F;&#x79F0;&#x4E3A;&#x6298;&#x534A;&#x67E5;&#x627E;&#x3002;&#x662F;&#x6307;&#x5728;&#x6709;&#x5E8F;&#x7684;&#x6570;&#x7EC4;&#x91CC;&#x627E;&#x51FA;&#x6307;&#x5B9A;&#x7684;&#x503C;&#xFF0C;&#x8FD4;&#x56DE;&#x8BE5;&#x503C;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x7D22;&#x5F15;&#x3002;
 * &#xFF08;1&#xFF09;&#x4ECE;&#x6709;&#x5E8F;&#x6570;&#x7EC4;&#x7684;&#x6700;&#x4E2D;&#x95F4;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#x67E5;&#x627E;&#xFF0C;&#x5982;&#x679C;&#x8BE5;&#x5143;&#x7D20;&#x6B63;&#x597D;&#x662F;&#x6307;&#x5B9A;&#x67E5;&#x627E;&#x7684;&#x503C;&#xFF0C;&#x5219;&#x67E5;&#x627E;&#x8FC7;&#x7A0B;&#x7ED3;&#x675F;&#x3002;&#x5426;&#x5219;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B65;; 
 * &#xFF08;2&#xFF09;&#x5982;&#x679C;&#x6307;&#x5B9A;&#x8981;&#x67E5;&#x627E;&#x7684;&#x5143;&#x7D20;&#x5927;&#x4E8E;&#x6216;&#x8005;&#x5C0F;&#x4E8E;&#x4E2D;&#x95F4;&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x5728;&#x6570;&#x7EC4;&#x5927;&#x4E8E;&#x6216;&#x5C0F;&#x4E8E;&#x4E2D;&#x95F4;&#x5143;&#x7D20;&#x7684;&#x90A3;&#x4E00;&#x534A;&#x533A;&#x57DF;&#x67E5;&#x627E;&#xFF0C;&#x7136;&#x540E;&#x91CD;&#x590D;&#x7B2C;&#x4E00;&#x6B65;&#x7684;&#x64CD;&#x4F5C;; 
 * &#xFF08;3&#xFF09;&#x91CD;&#x590D;&#x4EE5;&#x4E0A;&#x8FC7;&#x7A0B;&#xFF0C;&#x76F4;&#x5230;&#x627E;&#x5230;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x67E5;&#x627E;&#x6210;&#x529F;;&#x6216;&#x8005;&#x76F4;&#x5230;&#x5B50;&#x6570;&#x7EC4;&#x4E3A;&#x7A7A;&#xFF0C;&#x67E5;&#x627E;&#x5931;&#x8D25;&#x3002;
 * &#x6CE8;&#x610F;&#xFF1A; &#x8FD9;&#x4E2A;&#x5148;&#x8981;&#x628A;&#x6570;&#x7EC4;&#x6392;&#x5E8F;&#x4E00;&#x4E0B; &#x5728;&#x6709;&#x5E8F;&#x6570;&#x7EC4;&#x4E2D;&#x67E5;&#x627E;
 * &#x4F18;&#x70B9;&#x662F;&#x6BD4;&#x8F83;&#x6B21;&#x6570;&#x5C11;&#xFF0C;&#x67E5;&#x627E;&#x901F;&#x5EA6;&#x5FEB;&#xFF0C;&#x5E73;&#x5747;&#x6027;&#x80FD;&#x597D;&#xFF1B;
 * &#x5176;&#x7F3A;&#x70B9;&#x662F;&#x8981;&#x6C42;&#x5F85;&#x67E5;&#x8868;&#x4E3A;&#x6709;&#x5E8F;&#x8868;&#xFF0C;&#x4E14;&#x63D2;&#x5165;&#x5220;&#x9664;&#x56F0;&#x96BE;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x6298;&#x534A;&#x67E5;&#x627E;&#x65B9;&#x6CD5;&#x9002;&#x7528;&#x4E8E;&#x4E0D;&#x7ECF;&#x5E38;&#x53D8;&#x52A8;&#x800C;&#x67E5;&#x627E;&#x9891;&#x7E41;&#x7684;&#x6709;&#x5E8F;&#x5217;&#x8868;&#x3002;
 */</span>
<span class="hljs-comment">/**
 * &#x975E;&#x9012;&#x5F52;&#x5B9E;&#x73B0;
 * @param {*} arr 
 * @param {*} target 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">binarySearcNoRecursive</span>(<span class="hljs-params">arr: <span class="hljs-built_in">number</span>[], target: <span class="hljs-built_in">number</span></span>)</span>{
  <span class="hljs-keyword">let</span> low: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>, high: <span class="hljs-built_in">number</span> = arr.length<span class="hljs-number">-1</span>
  <span class="hljs-keyword">while</span>(low &lt;= high) {
    <span class="hljs-comment">// &#x9996;&#x5148;&#x627E;&#x5230;&#x4E2D;&#x95F4;&#x4F4D;&#x7F6E;</span>
    <span class="hljs-keyword">let</span> middle = ((high + low ) / <span class="hljs-number">2</span>)
    <span class="hljs-keyword">if</span>( target === arr[middle]){
      <span class="hljs-keyword">return</span> middle
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (target &gt; arr[middle]){
      low = middle + <span class="hljs-number">1</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( target &lt; arr[middle] ){
      high = middle <span class="hljs-number">-1</span>
    }<span class="hljs-keyword">else</span> { 
      <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>
    }
  }
}
<span class="hljs-keyword">const</span> result = binarySearcNoRecursive( [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>,<span class="hljs-number">10</span>,<span class="hljs-number">11</span>,<span class="hljs-number">23</span>,<span class="hljs-number">44</span>,<span class="hljs-number">86</span>], <span class="hljs-number">23</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x4E8C;&#x5206;&#x67E5;&#x627E;&#x4E0D;&#x7528;&#x5FAA;&#x73AF;&#x627E;&#x5230;&#x7684;&#x4F4D;&#x7F6E;:<span class="hljs-subst">${result}</span>`</span>)
<span class="hljs-comment">/**
 * &#x9012;&#x5F52;&#x5B9E;&#x73B0; &#x5FAA;&#x73AF;&#x8C03;&#x7528;&#x81EA;&#x8EAB;
 * @param {*} arr 
 * @param {*} target 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">binarySearcRecursive</span>(<span class="hljs-params">arr: <span class="hljs-built_in">number</span>[], low:<span class="hljs-built_in">number</span>, high: <span class="hljs-built_in">number</span>, target:<span class="hljs-built_in">number</span></span>)</span>{
  <span class="hljs-keyword">if</span>(low &gt; high){
    <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>
  }
  <span class="hljs-keyword">let</span> middle = ((high + low ) / <span class="hljs-number">2</span>)
  <span class="hljs-keyword">if</span>(arr[middle] === target){
    <span class="hljs-keyword">return</span> middle
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(arr[middle] &gt; target){
    high = middle <span class="hljs-number">-1</span>
    binarySearcRecursive(arr, low, high, target)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(arr[middle] &lt; target){
    low = middle + <span class="hljs-number">1</span>
    binarySearcRecursive(arr, low, high, target)
  }
}
<span class="hljs-keyword">const</span>  recursiveRes = binarySearcNoRecursive( [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>,<span class="hljs-number">10</span>,<span class="hljs-number">11</span>,<span class="hljs-number">23</span>,<span class="hljs-number">44</span>,<span class="hljs-number">86</span>], <span class="hljs-number">3</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x4E8C;&#x5206;&#x67E5;&#x627E;&#x4E0D;&#x7528;&#x5FAA;&#x73AF;&#x627E;&#x5230;&#x7684;&#x4F4D;&#x7F6E;:<span class="hljs-subst">${recursiveRes}</span>`</span>)</code></pre><h1 id="articleHeader19">&#x603B;&#x7ED3;</h1><p>&#x7B97;&#x6CD5;&#x518D;&#x7F16;&#x7A0B;&#x4E2D;&#x5360;&#x636E;&#x7740;&#x76F8;&#x5F53;&#x91CD;&#x8981;&#x7684;&#x5730;&#x4F4D;&#xFF0C;&#x8BED;&#x8A00;&#x7684;&#x6280;&#x672F;&#x90FD;&#x53EF;&#x4EE5;&#x901F;&#x6210;&#x3002;&#x4F46;&#x662F;&#x7B97;&#x6CD5;&#x9700;&#x8981;&#x624E;&#x5B9E;&#x7684;&#x7406;&#x8BBA;&#x77E5;&#x8BC6;&#x4F5C;&#x4E3A;&#x5730;&#x57FA;&#x3002;&#x672C;&#x6587;&#x53EA;&#x662F;&#x6839;&#x636E;leetcode&#x4E2D;&#x7684;&#x9898;&#x76EE;&#xFF0C;&#x7B80;&#x5355;&#x7684;&#x5B9E;&#x73B0;&#x4E00;&#x4E0B;&#x3002;&#x611F;&#x53D7;&#x4E00;&#x4E0B;&#x7B97;&#x6CD5;&#x7684;&#x9B45;&#x529B;&#x3002;&#x5B66;&#x4E60;&#x7684;&#x8BDD;&#x6211;&#x5EFA;&#x8BAE;&#x8FD8;&#x662F;&#x7CFB;&#x7EDF;&#x6DF1;&#x5165;&#x7684;&#x5B66;&#x3002;</p><p><a href="https://github.com/QDMarkMan/usually-accumulated/blob/master/src/Algorithm.ts" rel="nofollow noreferrer" target="_blank">&#x4EE3;&#x7801;&#x5730;&#x5740;</a></p><p>&#x76F8;&#x5E94;&#x7684;<code>JavaScript</code>&#x793A;&#x4F8B;<a href="https://github.com/QDMarkMan/usually-accumulated/blob/master/src/Algorithm.js" rel="nofollow noreferrer" target="_blank">&#x4EE3;&#x7801;&#x5730;&#x5740;</a></p><p><a href="https://github.com/QDMarkMan/CodeBlog/blob/master/Javascript/highOrderFunc.md" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x5730;&#x5740;</a> &#x5982;&#x679C;&#x89C9;&#x5F97;&#x6709;&#x7528;&#x5F97;&#x8BDD;&#x7ED9;&#x4E2A;&#x2B50;&#x5427;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
TypeScript实现数组相关简单算法

## 原文链接
[https://segmentfault.com/a/1190000016354385](https://segmentfault.com/a/1190000016354385)


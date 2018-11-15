---
title: 'JavaScript中Array类型中的方法' 
date: 2018-11-15 21:20:48
hidden: true
slug: lba27wvhim
categories: reprint
---

{{< raw >}}
<h2>Array&#x7C7B;&#x578B;</h2><h4>&#x68C0;&#x6D4B;&#x6570;&#x7EC4;</h4><p>&#x68C0;&#x6D4B;&#x6570;&#x7EC4;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x79CD;&#x65B9;&#x6CD5;&#xFF0C;</p><ul><li>instanceof</li></ul><pre><code>var arr=[&apos;&#x524D;&#x7AEF;&apos;,&apos;&#x4FDD;&#x5B9A;&apos;,&apos;&#x5C31;&#x4E1A;&apos;];
console.log(arr instanceof Array);//true</code></pre><ul><li>Object.prototype.toString.call()&#x65B9;&#x6CD5;</li></ul><pre><code>var arr=[&apos;&#x524D;&#x7AEF;&apos;,&apos;&#x4FDD;&#x5B9A;&apos;,&apos;&#x5C31;&#x4E1A;&apos;];
console.log(Object.prototype.toString.call(arr));//[object Array]</code></pre><ul><li>Array.prototype.isPrototypeOf()</li></ul><pre><code>var arr=[&apos;&#x524D;&#x7AEF;&apos;,&apos;&#x4FDD;&#x5B9A;&apos;,&apos;&#x5C31;&#x4E1A;&apos;];
console.log(Array.prototype.isPrototypeOf(arr));//true</code></pre><ul><li>Array.isArray()</li></ul><pre><code>var arr=[&apos;&#x524D;&#x7AEF;&apos;,&apos;&#x4FDD;&#x5B9A;&apos;,&apos;&#x5C31;&#x4E1A;&apos;];
console.log(Array.isArray(arr));//true</code></pre><h4>&#x8F6C;&#x6362;&#x6570;&#x7EC4;</h4><ul><li>&#x5229;&#x7528;toString()&#x65B9;&#x6CD5;&#x5C06;&#x6570;&#x7EC4;&#x8F6C;&#x6362;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;</li></ul><pre><code>var arr=[&apos;&#x524D;&#x7AEF;&apos;,&apos;&#x6DF1;&#x5733;&apos;,&apos;&#x4FDD;&#x5B9A;&apos;];
console.log(arr.toString());//&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x5B57;&#x7B26;&#x4E32;&#x524D;&#x7AEF;,&#x6DF1;&#x5733;,&#x4FDD;&#x5B9A;</code></pre><ul><li>valueOf()&#x8F6C;&#x6362;&#x539F;&#x59CB;&#x503C;</li></ul><pre><code>var obj={
    name:&apos;&#x5F20;&#x4E09;&apos;,
}
console.log(obj.valueOf());//{name:&#x5F20;&#x4E09;}</code></pre><h4>&#x8FDB;&#x51FA;&#x6808;&#x65B9;&#x6CD5;</h4><ul><li>push();&#x5728;&#x6570;&#x7EC4;&#x6700;&#x540E;&#x9762;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x5143;&#x7D20;</li></ul><pre><code>var arr=[&apos;&#x524D;&#x7AEF;&apos;,&apos;&#x4FDD;&#x5B9A;&apos;];
arr.push(&apos;&#x6DF1;&#x5733;&apos;);
console.log(arr);//[&apos;&#x524D;&#x7AEF;&apos;,&apos;&#x4FDD;&#x5B9A;&apos;,&apos;&#x6DF1;&#x5733;&apos;]</code></pre><ul><li>pop();&#x5728;&#x6570;&#x7EC4;&#x6700;&#x540E;&#x9762;&#x5220;&#x9664;&#x5143;&#x7D20;</li></ul><pre><code>var arr=[&apos;&#x524D;&#x7AEF;&apos;,&apos;java&apos;,&apos;js&apos;];
arr.pop();
console.log(arr);//[&apos;&#x524D;&#x7AEF;&apos;,&apos;java&apos;]</code></pre><ul><li>unshift();&#x5728;&#x6570;&#x7EC4;&#x6700;&#x524D;&#x9762;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x5143;&#x7D20;</li></ul><pre><code>var arr=[&apos;&#x524D;&#x7AEF;&apos;,&apos;&#x6DF1;&#x5733;&apos;];
arr.unshift(&apos;JavaScript&apos;);
console.log(arr);//[&apos;JavaScript&apos;,&apos;&#x524D;&#x7AEF;&apos;,&apos;&#x6DF1;&#x5733;&apos;]</code></pre><ul><li>shift();&#x5728;&#x6570;&#x7EC4;&#x6700;&#x524D;&#x9762;&#x5220;&#x9664;&#x5143;&#x7D20;</li></ul><pre><code>var arr=[&apos;&#x524D;&#x7AEF;&apos;,&apos;&#x6DF1;&#x5733;&apos;,&apos;JavaScript&apos;];
arr.shift();
console.log(arr);//[&apos;&#x6DF1;&#x5733;&apos;,&apos;JavaScript&apos;]</code></pre><h4>&#x6392;&#x5E8F;&#x65B9;&#x6CD5;</h4><ul><li>reverse()&#x6570;&#x7EC4;&#x7FFB;&#x8F6C;</li></ul><pre><code>var arr=[1,2,3,4,5];
console.log(arr.reverse());//[5,4,3,2,1]</code></pre><ul><li>sort()&#x65B9;&#x6CD5;:&#x5BF9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x4ECE;&#x5C0F;&#x5230;&#x5927;&#x7684;&#x6392;&#x5E8F;&#xFF0C;&#x4F1A;&#x5F71;&#x54CD;&#x539F;&#x6709;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x987A;&#x5E8F;</li></ul><pre><code>//&#x4ECE;&#x4E0B;&#x5217;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;sort()&#x5E76;&#x4E0D;&#x80FD;&#x5B9E;&#x73B0;&#x4ECE;&#x5C0F;&#x5230;&#x5927;&#x7684;&#x6392;&#x5E8F;
var arr=[1,3,5,10,4,2];
console.log(arr.sort());//[ 1, 10, 2, 3, 4, 5 ]

//&#x89E3;&#x51B3;&#x4EE5;&#x4E0A;sort()&#x4E0D;&#x80FD;&#x4EE5;&#x5C0F;&#x5230;&#x5927;&#x7684;&#x987A;&#x5E8F;&#x6392;&#x5217;&#x7684;&#x95EE;&#x9898;
var result=arr.sort(function(a,b){
    if(a&gt;b){
        return 1;
    }
});
console.log(result);</code></pre><h4>&#x8FDE;&#x63A5;&#x65B9;&#x6CD5;</h4><p>concat()&#x7528;&#x4E8E;&#x6570;&#x7EC4;&#x4E4B;&#x95F4;&#x7684;&#x62FC;&#x63A5;</p><pre><code>var arr=[1,2,3,4,5];
var arr1=[6,7,8,9,10];
console.log(arr.concat(6));//[1,2,3,4,5,6]
console.log(arr.concat([7,8,9]));//[1,2,3,4,5,7,8,9]
console.log(arr.concat(arr1));//[1,2,3,4,5,6,7,8,9,10]</code></pre><h4>&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;</h4><ul><li>splice(&#x5220;&#x9664;&#x5F00;&#x59CB;&#x4F4D;&#x7F6E;&#xFF0C;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#x4E2A;&#x6570;)&#x65B9;&#x6CD5;:&#x7528;&#x4E8E;&#x5220;&#x9664;&#x5F53;&#x524D;&#x6570;&#x7EC4;&#x6307;&#x5B9A;&#x4F4D;&#x7F6E;&#x6307;&#x5B9A;&#x4E2A;&#x6570;&#x7684;&#x5143;&#x7D20;</li></ul><pre><code>var arr=[1,2,3,4,5];
/*&#x4ECE;arr&#x7684;0&#x4F4D;&#x7F6E;&#x5F00;&#x59CB;&#x5220;&#x9664;&#x4E24;&#x4E2A;&#x5143;&#x7D20;,&#x5220;&#x9664;&#x6389;&#x7684;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x88AB;result&#x53D8;&#x91CF;&#x63A5;&#x4F4F;&#x4E86;*/
var result=arr.splice(0,2);
console.log(result);//[1,2]
console.log(arr);//[3,4,5]

//&#x4E5F;&#x53EF;&#x4EE5;&#x7528;splice&#x7ED9;&#x6570;&#x7EC4;&#x6DFB;&#x52A0;&#x5143;&#x7D20;&#xFF0C;&#x9ED8;&#x8BA4;&#x5728;&#x6570;&#x7EC4;&#x6700;&#x524D;&#x9762;&#x6DFB;&#x52A0;
//&#x8BBE;&#x7F6E;&#x4ECE;&#x4F4D;&#x7F6E;0&#x5F00;&#x59CB;&#xFF0C;&#x5220;&#x9664;0&#x4E2A;&#xFF0C;&#x518D;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x5143;&#x7D20;
var result1=arr.splice(0,0,6,7,8);
console.log(arr);//[1,2,3,4,5,6,7,8]</code></pre><ul><li>slice()&#x622A;&#x53D6;&#x6307;&#x5B9A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x662F;&#x5F00;&#x59CB;&#x622A;&#x53D6;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4ECE;0&#x5F00;&#x59CB;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x662F;&#x7ED3;&#x675F;&#x622A;&#x53D6;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x622A;&#x53D6;&#x4E0D;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4F4D;&#xFF0C;&#x800C;&#x662F;&#x622A;&#x53D6;&#x6700;&#x540E;&#x4E00;&#x4F4D;&#x7684;&#x524D;&#x4E00;&#x4E2A;&#x5143;&#x7D20;,&#x622A;&#x53D6;&#x7684;&#x5143;&#x7D20;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x6570;&#x7EC4;</li></ul><pre><code>var arr=[1,2,3];
var result=arr.slice(0,2);
console.log(result);//[1,2]</code></pre><h4>&#x68C0;&#x7D22;&#x65B9;&#x6CD5;</h4><ul><li>indexOf()&#x7528;&#x4E8E;&#x68C0;&#x67E5;&#x6570;&#x7EC4;&#x4E2D;&#x662F;&#x5426;&#x5305;&#x542B;&#x6307;&#x5B9A;&#x5143;&#x7D20;&#x5185;&#x5BB9;&#xFF0C;&#x8FD4;&#x56DE;&#x5143;&#x7D20;&#x6240;&#x5728;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4ECE;&#x5DE6;&#x81F3;&#x53F3;&#x987A;&#x5E8F;&#x8FDB;&#x884C;&#x68C0;&#x67E5;&#xFF0C;&#x53EA;&#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x5339;&#x914D;&#x5143;&#x7D20;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x540E;&#x9762;&#x5982;&#x679C;&#x8FD8;&#x6709;&#x76F8;&#x540C;&#x7684;&#x5143;&#x7D20;&#x4E0D;&#x8003;&#x8651;,&#x5982;&#x679C;&#x8BE5;&#x5143;&#x7D20;&#x4E0D;&#x5B58;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x8FD4;&#x56DE;-1</li></ul><pre><code>var arr=[&apos;&#x5F20;&#x4E09;&apos;,&apos;&#x674E;&#x56DB;&apos;,&apos;&#x5C0F;&#x660E;&apos;];
console.log(arr.indexOf(&apos;&#x5F20;&#x4E09;&apos;));//0
console.log(arr.indexOf(&apos;&#x5C0F;&#x7EA2;&apos;));//-1</code></pre><ul><li>lastIndexOf()&#x7528;&#x4E8E;&#x68C0;&#x67E5;&#x6570;&#x7EC4;&#x4E2D;&#x662F;&#x5426;&#x5305;&#x542B;&#x6307;&#x5B9A;&#x5143;&#x7D20;&#x5185;&#x5BB9;&#xFF0C;&#x8FD4;&#x56DE;&#x5143;&#x7D20;&#x6240;&#x5728;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4ECE;&#x53F3;&#x81F3;&#x5DE6;&#x987A;&#x5E8F;&#x8FDB;&#x884C;&#x68C0;&#x67E5;&#xFF0C;&#x53EA;&#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x5339;&#x914D;&#x5143;&#x7D20;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x540E;&#x9762;&#x5982;&#x679C;&#x8FD8;&#x6709;&#x76F8;&#x540C;&#x7684;&#x5143;&#x7D20;&#x4E0D;&#x8003;&#x8651;,&#x5982;&#x679C;&#x8BE5;&#x5143;&#x7D20;&#x4E0D;&#x5B58;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x8FD4;&#x56DE;-1</li></ul><pre><code>var arr=[&apos;&#x5F20;&#x4E09;&apos;,&apos;&#x674E;&#x56DB;&apos;,&apos;&#x5C0F;&#x660E;&apos;];
console.log(arr.lastIndexOf(&apos;&#x674E;&#x56DB;&apos;));//1</code></pre><h4>forEach()&#x65B9;&#x6CD5;</h4><p>&#x7528;&#x4E8E;&#x904D;&#x5386;&#x6307;&#x5B9A;&#x6570;&#x7EC4;<br>callback&#xFF1A;&#x8868;&#x793A;&#x56DE;&#x8C03;&#x51FD;&#x6570;<br>currentValue&#xFF1A;&#x8868;&#x793A;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x5F97;&#x5230;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;<br>index&#xFF1A;&#x8868;&#x793A;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x5F97;&#x5230;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x5BF9;&#x5E94;&#x7684;&#x7D22;&#x5F15;&#x503C;<br>array&#xFF1A;&#x8868;&#x793A;&#x904D;&#x5386;&#x7684;&#x6570;&#x7EC4;</p><pre><code>var arr=[&apos;&#x5F20;&#x4E09;&apos;,&apos;&#x674E;&#x56DB;&apos;,&apos;&#x5C0F;&#x7EA2;&apos;,&apos;&#x5C0F;&#x660E;&apos;];
arr.forEach(function(value,index,array){
    console.log(vaule);
    console.log(index);
    console.log(array);
});</code></pre><h4>&#x8FED;&#x4EE3;&#x65B9;&#x6CD5;</h4><p>&#x5224;&#x65AD;&#x6570;&#x7EC4;&#x7684;&#x5143;&#x7D20;&#x662F;&#x5426;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#xFF0C;&#x7B26;&#x5408;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false</p><pre><code>var arr=[1,2,3,4,5];
var result=arr.every(function(currentVaule,index,array){
    return (cunrrentValue &lt;=5);
});
console.log(result);//true</code></pre><h4>&#x5F52;&#x5E76;&#x65B9;&#x6CD5;</h4><pre><code>var arr=[1,2,3,4,5];
arr.reduce(function(accumulator,currentValue,currentIndex,array){
    console.log(accumulator);
    return accumulator+currentValue;
});</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript中Array类型中的方法

## 原文链接
[https://segmentfault.com/a/1190000016095259](https://segmentfault.com/a/1190000016095259)


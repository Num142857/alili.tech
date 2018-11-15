---
title: js面向对象编程
reprint: true
categories: reprint
abbrlink: 318077db
date: 2018-11-12 02:30:05
---

{{% raw %}}
<h2>js&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7F16;&#x7A0B;</h2><h3>&#x4EC0;&#x4E48;&#x662F;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7F16;&#x7A0B;&#xFF1F;&#x7528;&#x5BF9;&#x8C61;&#x7684;&#x601D;&#x60F3;&#x53BB;&#x5199;&#x4EE3;&#x7801;&#xFF0C;&#x5C31;&#x662F;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7F16;&#x7A0B;</h3><h4>&#x5BF9;&#x8C61;&#x7684;&#x7EC4;&#x6210;&#xFF1A;</h4><ul><li>&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;</li><li>&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x4E9B;&#x884C;&#x4E3A;&#xFF08;&#x901A;&#x5E38;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF09;</li></ul><pre><code>        var person = {
            name: &quot;&#x9ECE;&#x660E;&quot;,
            sex: &quot;&#x7537;&quot;,
            age: 18,
            sayHello: function() {
                console.log(&quot;&#x5927;&#x5BB6;&#x597D;&#xFF0C;&#x6211;&#x7684;&#x540D;&#x5B57;&#x662F;&quot; + this.name + &quot;,&quot; + this.sex + &quot;&#xFF0C;&#x4ECA;&#x5E74;&quot; + this.age)
                //this &#x4EE3;&#x8868;&#x5F53;&#x524D;&#x5BF9;&#x8C61;
            }
        }
        console.log(person.name); //&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;

        person.sayHello(); //&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;
</code></pre><h3>&#x4EC0;&#x4E48;&#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF1F;</h3><ul><li>&#x7B80;&#x5355;&#x7684;&#x8BF4;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x7C7B;&#x51FD;&#x6570;</li><li>&#x5BF9;&#x8C61;&#x662F;&#x7C7B;&#x7684;&#x4E00;&#x4E2A;&#x5177;&#x4F53;&#x5B9E;&#x4F8B;</li><li>&#x7C7B;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x62BD;&#x8C61; &#x6216;&#x8005;&#x8BF4; &#x662F;&#x7531;&#x5BF9;&#x8C61;&#x6CDB;&#x5316;&#x800C;&#x6765;</li></ul><p>&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><pre><code>function Car(name, color, num) {
            this.name = name;
            this.color = color;
            this.num = num;
            this.say = function() {
                console.log(&quot;&#x5927;&#x5BB6;&#x597D;&#xFF0C;&#x6211;&#x662F;&#x4E00;&#x8F86;&quot; + this.name + &quot;&#x8F66;&#xFF0C;&#x6211;&#x662F;&quot; + this.color + &quot;,&#x6709;&quot; + this.num + &quot;&#x4E2A;&#x8F6E;&#x80CE;&quot;);
            }
        }
        var lubu = new Car(&quot;&#x8DEF;&#x864E;&quot;, &quot;&#x7EA2;&#x8272;&quot;, &quot;4&quot;);
        lubu.say();</code></pre><h4>&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5FC5;&#x987B;&#x5148;&#x7528;new Object &#x521D;&#x59CB;&#x5316;&#x6784;&#x9020;&#x51FD;&#x6570;</h4>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js面向对象编程

## 原文链接
[https://segmentfault.com/a/1190000016291775](https://segmentfault.com/a/1190000016291775)


---
title: 高效的Mobx模式（Part 2 - 掌握数据变更方法）
hidden: true
categories: [reprint]
slug: 2e6d8964
date: 2018-11-12 02:30:05
---

{{< raw >}}
<p>&#x5728;&#x4E0A;&#x4E00;&#x90E8;&#x5206;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x7814;&#x7A76;&#x4E86;&#x5982;&#x4F55;&#x8BBE;&#x7F6E;MobX&#x72B6;&#x6001;&#x6811;&#x5E76;&#x4F7F;&#x5176;&#x53EF;&#x89C2;&#x5BDF;&#x3002; &#x6709;&#x4E86;&#x8FD9;&#x4E2A;&#xFF0C;&#x4E0B;&#x4E00;&#x6B65;&#x5C31;&#x662F;&#x5F00;&#x59CB;&#x5BF9;&#x53D8;&#x5316;&#x4F5C;&#x51FA;&#x53CD;&#x5E94;&#x3002; &#x5766;&#x7387;&#x5730;&#x8BF4;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x6709;&#x8DA3;&#x7684;&#x5F00;&#x59CB;&#xFF01;</p><p>MobX&#x4FDD;&#x8BC1;&#x53EA;&#x8981;&#x60A8;&#x7684;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x56FE;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x4F9D;&#x8D56;&#x4E8E;&#x53EF;&#x89C2;&#x5BDF;&#x5C5E;&#x6027;&#x7684;&#x90E8;&#x5206;&#x5C31;&#x4F1A;&#x81EA;&#x52A8;&#x540C;&#x6B65;&#x3002; &#x8FD9;&#x610F;&#x5473;&#x7740;&#x60A8;&#x73B0;&#x5728;&#x53EF;&#x4EE5;&#x4E13;&#x6CE8;&#x4E8E;&#x5BF9;&#x53D8;&#x5316;&#x505A;&#x51FA;&#x53CD;&#x5E94;&#x5E76;&#x5F15;&#x8D77;&#x7684;&#x526F;&#x4F5C;&#x7528;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x62C5;&#x5FC3;&#x6570;&#x636E;&#x540C;&#x6B65;&#x3002;</p><p>&#x8BA9;&#x6211;&#x4EEC;&#x6DF1;&#x5165;&#x7814;&#x7A76;&#x4E00;&#x4E0B;&#x53EF;&#x4EE5;&#x5F15;&#x8D77;&#x526F;&#x4F5C;&#x7528;&#x7684;&#x5404;&#x79CD;&#x65B9;&#x6CD5;&#x3002;</p><h3>&#x4F7F;&#x7528;<code>@action</code>&#x4F5C;&#x4E3A;&#x5165;&#x53E3;&#x70B9;</h3><p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5F53;&#x60A8;&#x4FEE;&#x6539;observable&#x65F6;&#xFF0C;MobX&#x5C06;&#x68C0;&#x6D4B;&#x5E76;&#x4FDD;&#x6301;&#x5176;&#x4ED6;&#x4F9D;&#x8D56;&#x7684;&#x53EF;&#x89C2;&#x5BDF;&#x5BF9;&#x8C61;&#x540C;&#x6B65;&#x3002; &#x8FD9;&#x662F;&#x540C;&#x6B65;&#x53D1;&#x751F;&#x7684;&#x3002; &#x4F46;&#x662F;&#xFF0C;&#x6709;&#x65F6;&#x60A8;&#x53EF;&#x80FD;&#x5E0C;&#x671B;&#x5728;&#x540C;&#x4E00;&#x65B9;&#x6CD5;&#x4E2D;&#x4FEE;&#x6539;&#x591A;&#x4E2A;observable&#x3002; &#x8FD9;&#x53EF;&#x80FD;&#x4F1A;&#x5BFC;&#x81F4;&#x591A;&#x4E2A;&#x901A;&#x77E5;&#x88AB;&#x89E6;&#x53D1;&#xFF0C;&#x751A;&#x81F3;&#x53EF;&#x80FD;&#x4F1A;&#x964D;&#x4F4E;&#x60A8;&#x7684;&#x5E94;&#x7528;&#x901F;&#x5EA6;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000016279190" src="https://static.alili.tech/img/remote/1460000016279190" alt="action" title="action"></span></p><p>&#x66F4;&#x597D;&#x7684;&#x65B9;&#x6CD5;&#x662F;<code>action()</code>&#x4E2D;&#x5305;&#x88C5;&#x8981;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#x3002; &#x8FD9;&#x4F1A;&#x5728;&#x60A8;&#x7684;&#x65B9;&#x6CD5;&#x5468;&#x56F4;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4E8B;&#x52A1;&#x8FB9;&#x754C;&#xFF0C;&#x5E76;&#x4E14;&#x6240;&#x6709;&#x53D7;&#x5F71;&#x54CD;&#x7684;<code>observable</code>&#x5C06;&#x5728;&#x60A8;&#x6267;&#x884C;&#x64CD;&#x4F5C;&#x540E;&#x4FDD;&#x6301;&#x540C;&#x6B65;&#x3002; &#x8BF7;&#x6CE8;&#x610F;&#xFF0C;&#x6B64;&#x5EF6;&#x8FDF;&#x901A;&#x77E5;&#x4EC5;&#x9002;&#x7528;&#x4E8E;&#x5F53;&#x524D;&#x51FD;&#x6570;&#x8303;&#x56F4;&#x4E2D;&#x7684;<code>observable</code>&#x3002; &#x5982;&#x679C;&#x60A8;&#x5177;&#x6709;&#x4FEE;&#x6539;&#x66F4;&#x591A;&#x53EF;&#x89C2;&#x5BDF;&#x5BF9;&#x8C61;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x5219;&#x5FC5;&#x987B;&#x5C06;&#x5B83;&#x4EEC;&#x5305;&#x88C5;&#x5728;<code>runInAction()</code>&#x4E2D;&#x3002;</p><pre><code class="javascript">class Person {
    @observable firstName;
    @observable lastName;

    // &#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x5728;@action&#x4E2D;&#x5305;&#x88C5;&#x4E86;&#x6B64;&#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x6709;&#x5728;changeName()&#x6210;&#x529F;&#x6267;&#x884C;&#x540E;&#xFF0C;fullName&#x624D;&#x4F1A;&#x66F4;&#x6539;
    @action changeName(first, last) {
        this.firstName = first;
        this.lastName = last;
    }

    @computed get fullName() {
        return `${this.firstName}, ${this.lastName}`;
    }
}

const p = new Person();
p.changeName(&apos;Pavan&apos;, &apos;Podila&apos;);
</code></pre><p><code>Actions</code>&#x662F;&#x6539;&#x53D8;<strong>Store</strong>&#x7684;&#x5207;&#x5165;&#x70B9;&#x3002; &#x901A;&#x8FC7;&#x4F7F;&#x7528;<code>Actions</code>&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x5C06;&#x591A;&#x4E2A;observable&#x66F4;&#x65B0;&#x4E3A;&#x539F;&#x5B50;&#x64CD;&#x4F5C;&#x3002;</p><blockquote>&#x5C3D;&#x53EF;&#x80FD;&#x907F;&#x514D;&#x76F4;&#x63A5;&#x4ECE;&#x5916;&#x90E8;&#x64CD;&#x7EB5;<code>observable</code>&#x5E76;&#x516C;&#x5F00;<code>@action</code>&#x65B9;&#x6CD5;&#x4E3A;&#x4F60;&#x505A;&#x8FD9;&#x4E2A;&#x6539;&#x53D8;&#x3002; &#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8BBE;&#x7F6E;<code>useStrict(true)</code>&#x6765;&#x5F3A;&#x5236;&#x6267;&#x884C;&#x6B64;&#x64CD;&#x4F5C;&#x3002;<br><hr></blockquote><h3>&#x4F7F;&#x7528;<code>@autorun</code>&#x89E6;&#x53D1;&#x526F;&#x4F5C;&#x7528;</h3><p>MobX&#x786E;&#x4FDD;&#x53EF;&#x89C2;&#x5BDF;&#x56FE;&#x5F62;&#x59CB;&#x7EC8;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x3002; &#x4F46;&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x4E16;&#x754C;&#x53EA;&#x662F;&#x5173;&#x4E8E;&#x53EF;&#x89C2;&#x5BDF;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x90A3;&#x5C31;&#x4E0D;&#x597D;&#x73A9;&#x4E86;&#x3002; &#x6211;&#x4EEC;&#x9700;&#x8981;&#x4ED6;&#x4EEC;&#x7684;&#x540C;&#x884C;&#xFF1A;&#x89C2;&#x5BDF;&#x8005;&#x4F7F;&#x4E8B;&#x60C5;&#x53D8;&#x5F97;&#x6709;&#x8DA3;&#x3002;</p><p>&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;UI&#x662F;<code>mobx store</code>&#x7684;&#x7F8E;&#x5316;&#x89C2;&#x5BDF;&#x8005;&#x3002; &#x4F7F;&#x7528;<code>mobx-react</code>&#xFF0C;&#x60A8;&#x5C06;&#x83B7;&#x5F97;&#x4E00;&#x4E2A;&#x7ED1;&#x5B9A;&#x5E93;&#xFF0C;&#x4F7F;&#x60A8;&#x7684;React&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x89C2;&#x5BDF;&#x5B58;&#x50A8;&#x5E76;&#x5728;&#x5B58;&#x50A8;&#x66F4;&#x6539;&#x65F6;&#x81EA;&#x52A8;&#x5448;&#x73B0;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;UI&#x4E0D;&#x662F;&#x7CFB;&#x7EDF;&#x4E2D;&#x552F;&#x4E00;&#x7684;&#x89C2;&#x5BDF;&#x8005;&#x3002; &#x60A8;&#x53EF;&#x4EE5;&#x5411;<code>store</code>&#x6DFB;&#x52A0;&#x66F4;&#x591A;&#x89C2;&#x5BDF;&#x8005;&#x4EE5;&#x6267;&#x884C;&#x5404;&#x79CD;&#x6709;&#x8DA3;&#x7684;&#x4E8B;&#x60C5;&#x3002; &#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x57FA;&#x672C;&#x7684;&#x89C2;&#x5BDF;&#x8005;&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x4E2A;&#x63A7;&#x5236;&#x53F0;&#x8BB0;&#x5F55;&#x5668;&#xFF0C;&#x5B83;&#x53EA;&#x662F;&#x5728;&#x53EF;&#x89C2;&#x5BDF;&#x7684;&#x53D8;&#x5316;&#x65F6;&#x5C06;&#x5F53;&#x524D;&#x503C;&#x8BB0;&#x5F55;&#x5230;&#x63A7;&#x5236;&#x53F0;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016279191" src="https://static.alili.tech/img/remote/1460000016279191" alt="" title=""></span></p><p>&#x901A;&#x8FC7;<code>autorun</code>&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x975E;&#x5E38;&#x8F7B;&#x677E;&#x5730;&#x8BBE;&#x7F6E;&#x8FD9;&#x4E9B;&#x89C2;&#x5BDF;&#x8005;&#x3002; &#x6700;&#x5FEB;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x63D0;&#x4F9B;<code>autorun</code>&#x529F;&#x80FD;&#x3002; MobX&#x4F1A;&#x81EA;&#x52A8;&#x8DDF;&#x8E2A;&#x60A8;&#x5728;&#x6B64;&#x51FD;&#x6570;&#x4E2D;&#x4F7F;&#x7528;&#x7684;&#x4EFB;&#x4F55;&#x53EF;&#x89C2;&#x5BDF;&#x5BF9;&#x8C61;&#x3002; &#x6BCF;&#x5F53;&#x5B83;&#x4EEC;&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x4F60;&#x7684;&#x529F;&#x80FD;&#x90FD;&#x4F1A;&#x91CD;&#x65B0;&#x6267;&#x884C;&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x81EA;&#x52A8;&#x8FD0;&#x884C;&#xFF09;&#xFF01;</p><pre><code class="javascript">class Person {

    @observable firstName = &apos;None&apos;;
    @observable lastName = &apos;None&apos;;

    constructor() {

        // A simple console-logger
        autorun(()=&gt;{
            console.log(`Name changed: ${this.firstName}, ${this.lastName}`);
        });

        // &#x8FD9;&#x91CC;&#x4F1A;&#x5BFC;&#x81F4;autorun()&#x8FD0;&#x884C;
        this.firstName = &apos;Mob&apos;;

        // autorun()&#x518D;&#x4E00;&#x6B21;&#x8FD0;&#x884C;
        this.lastName = &apos;X&apos;;
    }
}

// Will log: Name changed: None, None
// Will log: Name changed: Mob, None
// Will log: Name changed: Mob, X</code></pre><p>&#x6B63;&#x5982;&#x60A8;&#x5728;&#x4E0A;&#x9762;&#x7684;&#x65E5;&#x5FD7;&#x4E2D;&#x6240;&#x770B;&#x5230;&#x7684;&#xFF0C;&#x81EA;&#x52A8;&#x8FD0;&#x884C;&#x5C06;&#x7ACB;&#x5373;&#x8FD0;&#x884C;&#xFF0C;&#x5E76;&#x4E14;&#x6BCF;&#x6B21;&#x8DDF;&#x8E2A;&#x7684;&#x53EF;&#x89C2;&#x5BDF;&#x91CF;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#x4E5F;&#x4F1A;&#x8FD0;&#x884C;&#x3002; &#x5982;&#x679C;&#x60A8;&#x4E0D;&#x60F3;&#x7ACB;&#x5373;&#x8FD0;&#x884C;&#xFF0C;&#x800C;&#x662F;&#x4EC5;&#x5728;&#x53D1;&#x751F;&#x66F4;&#x6539;&#x65F6;&#x8FD0;&#x884C;&#xFF0C;&#x8BE5;&#x600E;&#x4E48;&#x529E;&#xFF1F; &#x8BF7;&#x7EE7;&#x7EED;&#x9605;&#x8BFB;&#x3002;<br></p><hr><h3>&#x9996;&#x6B21;&#x66F4;&#x6362;&#x540E;&#x4F7F;&#x7528;<code>reaction</code>&#x89E6;&#x53D1;&#x526F;&#x4F5C;&#x7528;</h3><p>&#x4E0E;<code>autorun</code>&#x76F8;&#x6BD4;&#xFF0C;<code>reaction</code>&#x63D0;&#x4F9B;&#x4E86;&#x66F4;&#x7EC6;&#x7C92;&#x5EA6;&#x7684;&#x63A7;&#x5236;&#x3002; &#x9996;&#x5148;&#xFF0C;&#x5B83;&#x4EEC;&#x4E0D;&#x4F1A;&#x7ACB;&#x5373;&#x8FD0;&#x884C;&#x5E76;&#x7B49;&#x5F85;&#x5BF9;&#x8DDF;&#x8E2A;&#x7684;&#x53EF;&#x89C2;&#x5BDF;&#x91CF;&#x7684;&#x7B2C;&#x4E00;&#x6B21;&#x66F4;&#x6539;&#x3002; API&#x4E5F;&#x4E0E;<code>autorun</code>&#x7565;&#x6709;&#x4E0D;&#x540C;&#x3002; &#x5728;&#x6700;&#x7B80;&#x5355;&#x7684;&#x7248;&#x672C;&#x4E2D;&#xFF0C;&#x60A8;&#x63D0;&#x4F9B;&#x4E24;&#x4E2A;&#x8F93;&#x5165;&#x53C2;&#x6570;&#xFF1A;</p><pre><code class="javascript">reaction(()=&gt; data, data =&gt; { /* side effect */})</code></pre><p>&#x7B2C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF08;&#x8DDF;&#x8E2A;&#x51FD;&#x6570; <code>tracking function</code>&#xFF09;&#x5E94;&#x8BE5;&#x8FD4;&#x56DE;&#x5C06;&#x7528;&#x4E8E;&#x8DDF;&#x8E2A;&#x7684;&#x6570;&#x636E;&#x3002; &#x7136;&#x540E;&#x5C06;&#x8BE5;&#x6570;&#x636E;&#x4F20;&#x9012;&#x7ED9;&#x7B2C;&#x4E8C;&#x4E2A;&#x51FD;&#x6570;&#xFF08;&#x6548;&#x679C;&#x51FD;&#x6570; <code>effect function</code>&#xFF09;&#x3002; &#x4E0D;&#x8DDF;&#x8E2A;&#x6548;&#x679C;&#x51FD;&#x6570;&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x5728;&#x6B64;&#x5904;&#x4F7F;&#x7528;&#x5176;&#x4ED6;&#x53EF;&#x89C2;&#x5BDF;&#x5BF9;&#x8C61;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016279192" src="https://static.alili.tech/img/remote/1460000016279192" alt="" title=""></span></p><p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;<code>reaction</code>&#x5C06;&#x4E0D;&#x4F1A;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8FD0;&#x884C;&#xFF0C;&#x5E76;&#x5C06;&#x7B49;&#x5F85;&#x8FFD;&#x8E2A;&#x51FD;&#x6570;&#x7684;&#x53D8;&#x66F4;&#x3002; &#x53EA;&#x6709;&#x5F53;<code>tracking function</code>&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x624D;&#x4F1A;&#x6267;&#x884C;&#x526F;&#x4F5C;&#x7528;&#x3002; &#x901A;&#x8FC7;&#x5C06;&#x539F;&#x59CB;&#x81EA;&#x52A8;&#x8FD0;&#x884C;&#x5206;&#x89E3;&#x4E3A;<code>tracking function</code>+<code>effect function</code>&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x66F4;&#x597D;&#x5730;&#x63A7;&#x5236;&#x5B9E;&#x9645;&#x5BFC;&#x81F4;&#x526F;&#x4F5C;&#x7528;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><pre><code class="javascript">import {reaction} from &apos;mobx&apos;;

class Router {

    @observable page = &apos;main&apos;;

    setupNavigation() {
        reaction(()=&gt;this.page, (page)=&gt;{
            switch(page) {
                case &apos;main&apos;:
                    this.navigateToUrl(&apos;/&apos;);
                    break;

                case &apos;profile&apos;:
                    this.navigateToUrl(&apos;/profile&apos;);
                    break;

                case &apos;admin&apos;:
                    this.navigateToUrl(&apos;/admin&apos;);
                    break;
            }
        });
    }

    navigateToUrl(url) { /* ... */ }
}</code></pre><p>&#x5728;&#x4E0A;&#x9762;&#x7684;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x6211;&#x5728;&#x52A0;&#x8F7D;&#x201C;main&#x201D;&#x9875;&#x9762;&#x65F6;&#x4E0D;&#x9700;&#x8981;&#x5BFC;&#x822A;&#x3002; &#x4E00;&#x4E2A;<code>reaction</code>&#x4F7F;&#x7528;&#x7684;&#x5B8C;&#x7F8E;&#x6848;&#x4F8B;&#x3002; &#x4EC5;&#x5F53;&#x8DEF;&#x7531;&#x5668;&#x7684;&#x9875;&#x9762;&#x5C5E;&#x6027;&#x53D1;&#x751F;&#x66F4;&#x6539;&#x65F6;&#xFF0C;&#x624D;&#x4F1A;&#x5BFC;&#x822A;&#x5230;&#x7279;&#x5B9A;URL&#x3002;</p><p>&#x4EE5;&#x4E0A;&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x7684;&#x8DEF;&#x7531;&#x5668;&#xFF0C;&#x5177;&#x6709;&#x56FA;&#x5B9A;&#x7684;&#x9875;&#x9762;&#x96C6;&#x3002; &#x60A8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5411;URL&#x6DFB;&#x52A0;&#x9875;&#x9762;&#x5730;&#x56FE;&#x6765;&#x4F7F;&#x5176;&#x66F4;&#x5177;&#x53EF;&#x6269;&#x5C55;&#x6027;&#x3002; &#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#xFF0C;&#x8DEF;&#x7531;&#xFF08;&#x4F7F;&#x7528;URL&#x66F4;&#x6539;&#xFF09;&#x4F1A;&#x6210;&#x4E3A;&#x66F4;&#x6539;<strong>Store</strong>&#x67D0;&#x4E9B;&#x5C5E;&#x6027;&#x7684;&#x526F;&#x4F5C;&#x7528;&#x3002;</p><h3>&#x4F7F;&#x7528;<code>when</code>&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#x6027;&#x7684;&#x526F;&#x4F5C;&#x7528;</h3><p><code>autorun</code>&#x548C;<code>reaction</code>&#x662F;&#x6301;&#x7EED;&#x7684;&#x526F;&#x4F5C;&#x7528;&#x3002; &#x521D;&#x59CB;&#x5316;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x65F6;&#xFF0C;&#x60A8;&#x5C06;&#x521B;&#x5EFA;&#x6B64;&#x7C7B;&#x526F;&#x4F5C;&#x7528;&#xFF0C;&#x5E76;&#x671F;&#x671B;&#x5B83;&#x4EEC;&#x5728;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x5185;&#x8FD0;&#x884C;&#x3002;</p><p>&#x6211;&#x4E4B;&#x524D;&#x6CA1;&#x6709;&#x63D0;&#x5230;&#x7684;&#x4E00;&#x4EF6;&#x4E8B;&#x662F;&#x8FD9;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#x90FD;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5904;&#x7406;&#x5668;&#x51FD;&#x6570;&#x3002; &#x60A8;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x8C03;&#x7528;&#x8BE5;&#x5904;&#x7406;&#x5668;&#x51FD;&#x6570;&#x5E76;&#x53D6;&#x6D88;&#x526F;&#x4F5C;&#x7528;&#x3002;</p><pre><code class="javascript">const disposer = autorun(()=&gt;{ 
    /* side-effects based on tracked observables */ 
});

// .... At a later time
disposer(); // Cancel the autorun </code></pre><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x6784;&#x5EFA;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x6709;&#x5404;&#x79CD;&#x7528;&#x4F8B;&#x3002; &#x60A8;&#x53EF;&#x80FD;&#x5E0C;&#x671B;&#x67D0;&#x4E9B;&#x526F;&#x4F5C;&#x7528;&#x4EC5;&#x5728;&#x60A8;&#x5230;&#x8FBE;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4E2D;&#x7684;&#x67D0;&#x4E2A;&#x70B9;&#x65F6;&#x8FD0;&#x884C;&#x3002; &#x6B64;&#x5916;&#xFF0C;&#x60A8;&#x53EF;&#x80FD;&#x5E0C;&#x671B;&#x8FD9;&#x4E9B;&#x526F;&#x4F5C;&#x7528;&#x53EA;&#x8FD0;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x4E5F;&#x4E0D;&#x4F1A;&#x8FD0;&#x884C;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016279194" src="https://static.alili.tech/img/remote/1460000016279194" alt="" title=""></span></p><p>&#x8BA9;&#x6211;&#x4EEC;&#x4E3E;&#x4E00;&#x4E2A;&#x5177;&#x4F53;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;&#x6BD4;&#x5982;&#x8BF4;&#xFF0C;&#x5F53;&#x7528;&#x6237;&#x5230;&#x8FBE;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4E2D;&#x7684;&#x67D0;&#x4E2A;&#x91CC;&#x7A0B;&#x7891;&#x65F6;&#xFF0C;&#x60A8;&#x5E0C;&#x671B;&#x5411;&#x7528;&#x6237;&#x663E;&#x793A;&#x4E00;&#x6761;&#x6D88;&#x606F;&#x3002; &#x6B64;&#x91CC;&#x7A0B;&#x7891;&#x4EC5;&#x5BF9;&#x4EFB;&#x4F55;&#x7528;&#x6237;&#x53D1;&#x751F;&#x4E00;&#x6B21;&#xFF0C;&#x56E0;&#x6B64;&#x60A8;&#x4E0D;&#x5E0C;&#x671B;&#x8BBE;&#x7F6E;&#x6301;&#x7EED;&#x8FD0;&#x884C;&#x7684;&#x526F;&#x4F5C;&#x7528;&#xFF0C;&#x5982;<code>autorun</code>&#x6216;<code>reaction</code>&#x3002; &#x73B0;&#x5728;&#x662F;&#x65F6;&#x5019;&#x62FF;&#x51FA;<strong><code>when</code></strong> &#x8FD9;&#x4E2A;API&#x6765;&#x5B8C;&#x6210;&#x8FD9;&#x9879;&#x5DE5;&#x4F5C;&#x4E86;&#x3002;</p><p>&#x5F53;&#x62FF;&#x51FA;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x65F6;&#xFF0C;&#x5C31;&#x50CF;<code>reaction</code>&#x4E00;&#x6837;&#x3002; &#x7B2C;&#x4E00;&#x4E2A;&#xFF08;&#x8DDF;&#x8E2A;&#x5668;&#x51FD;&#x6570;&#xFF09;&#x5E94;&#x8BE5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#x3002; &#x5F53;&#x8FD9;&#x53D8;&#x4E3A;&#x771F;&#x65F6;&#xFF0C;&#x5B83;&#x5C06;&#x8FD0;&#x884C;&#x6548;&#x679C;&#x51FD;&#x6570;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;<code>when</code>&#x3002; &#x6700;&#x68D2;&#x7684;&#x90E8;&#x5206;&#x662F;&#x5B83;&#x4F1A;&#x5728;&#x8FD0;&#x884C;&#x540E;&#x81EA;&#x52A8;&#x5904;&#x7406;&#x526F;&#x4F5C;&#x7528;&#x3002; &#x56E0;&#x6B64;&#xFF0C;&#x65E0;&#x9700;&#x8DDF;&#x8E2A;&#x5904;&#x7406;&#x5668;&#x5E76;&#x624B;&#x52A8;&#x8C03;&#x7528;&#x5B83;&#x3002;</p><pre><code class="javascript">when(()=&gt;this.reachedMilestone, ()=&gt;{
    this.showMessage({ 
        title: &apos;Congratulations&apos;, 
        message: &apos;You did it!&apos;
    });
})</code></pre><p></p><hr><p>&#x5230;&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x770B;&#x5230;&#x4E86;&#x5404;&#x79CD;&#x6280;&#x672F;&#x6765;&#x8DDF;&#x8E2A;&#x5BF9;&#x8C61;&#x56FE;&#x4E0A;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x5E76;&#x5BF9;&#x8FD9;&#x4E9B;&#x53D8;&#x5316;&#x505A;&#x51FA;&#x53CD;&#x5E94;&#x3002; MobX&#x63D0;&#x9AD8;&#x4E86;&#x62BD;&#x8C61;&#x7EA7;&#x522B;&#xFF0C;&#x4EE5;&#x4FBF;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x66F4;&#x9AD8;&#x7EA7;&#x522B;&#x8FDB;&#x884C;&#x601D;&#x8003;&#xFF0C;&#x800C;&#x4E0D;&#x5FC5;&#x62C5;&#x5FC3;&#x8DDF;&#x8E2A;&#x548C;&#x5BF9;&#x53D8;&#x5316;&#x505A;&#x51FA;&#x53CD;&#x5E94;&#x7684;&#x610F;&#x5916;&#x590D;&#x6742;&#x6027;&#x3002;</p><p>&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x57FA;&#x7840;&#xFF0C;&#x53EF;&#x4EE5;&#x6784;&#x5EFA;&#x4F9D;&#x8D56;&#x4E8E;&#x57DF;&#x6A21;&#x578B;&#x66F4;&#x6539;&#x7684;&#x5F3A;&#x5927;&#x7CFB;&#x7EDF;&#x3002; &#x901A;&#x8FC7;&#x5C06;&#x57DF;&#x6A21;&#x578B;&#x4E4B;&#x5916;&#x7684;&#x6240;&#x6709;&#x5185;&#x5BB9;&#x89C6;&#x4E3A;&#x526F;&#x4F5C;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x63D0;&#x4F9B;&#x89C6;&#x89C9;&#x53CD;&#x9988;&#xFF08;UI&#xFF09;&#x5E76;&#x6267;&#x884C;&#x8BB8;&#x591A;&#x5176;&#x4ED6;&#x6D3B;&#x52A8;&#xFF0C;&#x5982;&#x76D1;&#x63A7;&#xFF0C;&#x5206;&#x6790;&#xFF0C;&#x65E5;&#x5FD7;&#x8BB0;&#x5F55;&#x7B49;&#x3002;</p><ul><li><a href="https://segmentfault.com/a/1190000016266272">Part 1 - &#x6784;&#x5EFA;&#x53EF;&#x89C2;&#x5BDF;&#x6570;&#x636E;</a></li><li>Part 2 - &#x638C;&#x63E1;&#x6570;&#x636E;&#x53D8;&#x66F4;&#x65B9;&#x6CD5;</li><li><a href="https://segmentfault.com/a/1190000016298558">Part 3 - &#x9AD8;&#x9636;&#x5E94;&#x7528;&#x5B9E;&#x4F8B;</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高效的Mobx模式（Part 2 - 掌握数据变更方法）

## 原文链接
[https://segmentfault.com/a/1190000016279185](https://segmentfault.com/a/1190000016279185)


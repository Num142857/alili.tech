---
title: 前端爬坑日记之vue内嵌iframe并跨域通信
reprint: true
categories: reprint
abbrlink: 49baafed
date: 2018-11-12 02:30:05
---

{{% raw %}}
<p>&#x7531;&#x4E8E;&#x8BE5;&#x9879;&#x76EE;&#x662F;&#x57FA;&#x4E8E;&#x539F;&#x672C;&#x7684;&#x5B89;&#x5353;app&#xFF0C;&#x505A;&#x7684;&#x5FAE;&#x4FE1;h5&#xFF0C;&#x6240;&#x4EE5;&#x539F;&#x6765;&#x7684;&#x4F7F;&#x7528;webview&#x7684;&#x9875;&#x9762;&#x73B0;&#x5728;&#x9700;&#x8981;&#x5728;vue&#x4E2D;&#x5B9E;&#x73B0;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x4F7F;&#x7528;iframe<br>&#x67E5;&#x770B;&#x4E86;&#x5F88;&#x591A;&#x5F88;&#x591A;&#x6587;&#x6863;&#xFF0C;&#x5176;&#x4E2D;&#x8FD9;&#x4E00;&#x7BC7;&#x662F;&#x5F88;&#x6709;&#x4EF7;&#x503C;&#x7684; <a href="https://gist.github.com/pbojinov/8965299" rel="nofollow noreferrer">https://gist.github.com/pboji...</a></p><p>&#x4E0B;&#x9762;&#x5C06;3&#x5929;&#x7684;&#x722C;&#x5751;&#x6700;&#x7EC8;&#x4EE5;&#x95EE;&#x7B54;&#x7684;&#x65B9;&#x5F0F;&#x603B;&#x7ED3;&#x5982;&#x4E0B;&#xFF1A;</p><p>1&#x3001;Vue&#x7EC4;&#x4EF6;&#x4E2D;&#x5982;&#x4F55;&#x5F15;&#x5165;iframe&#xFF1F;</p><p>2&#x3001;vue&#x5982;&#x4F55;&#x83B7;&#x53D6;iframe&#x5BF9;&#x8C61;&#x4EE5;&#x53CA;iframe&#x5185;&#x7684;window&#x5BF9;&#x8C61;&#xFF1F;</p><p>3&#x3001;vue&#x5982;&#x4F55;&#x5411;iframe&#x5185;&#x4F20;&#x9001;&#x4FE1;&#x606F;&#xFF1F;</p><p>4&#x3001;iframe&#x5185;&#x5982;&#x4F55;&#x5411;&#x5916;&#x90E8;vue&#x53D1;&#x9001;&#x4FE1;&#x606F;&#xFF1F;</p><p>1&#x3001;Vue&#x7EC4;&#x4EF6;&#x4E2D;&#x5982;&#x4F55;&#x5F15;&#x5165;iframe&#xFF1F;</p><pre><code>&lt;template&gt;
  &lt;div class=&quot;act-form&quot;&gt;
    &lt;iframe :src=&quot;src&quot;&gt;&lt;/iframe&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;

export default {
  data () {
    return {
      src: &apos;&#x4F60;&#x7684;src&apos;
    }
  }
}
&lt;/script&gt;</code></pre><pre><code>&#x5982;&#x4E0A;&#xFF0C;&#x76F4;&#x63A5;&#x901A;&#x8FC7;&#x6DFB;&#x52A0;iframe&#x6807;&#x7B7E;&#xFF0C;src&#x5C5E;&#x6027;&#x7ED1;&#x5B9A;data&#x4E2D;&#x7684;src&#xFF0C;&#x7B2C;&#x4E00;&#x6B65;&#x5F15;&#x5165;&#x5C31;&#x5B8C;&#x6210;&#x4E86;
</code></pre><p>2&#x3001;vue&#x5982;&#x4F55;&#x83B7;&#x53D6;iframe&#x5BF9;&#x8C61;&#x4EE5;&#x53CA;iframe&#x5185;&#x7684;window&#x5BF9;&#x8C61;&#xFF1F;</p><pre><code>&#x5728;vue&#x4E2D;&#xFF0C;dom&#x64CD;&#x4F5C;&#x6BD4;&#x4E0D;&#x4E0A;jquery&#x7684;$(&apos;#id&apos;)&#x6765;&#x7684;&#x65B9;&#x4FBF;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x6709;&#x529E;&#x6CD5;&#xFF0C;&#x5C31;&#x662F;&#x901A;&#x8FC7;ref</code></pre><pre><code>&lt;template&gt;
  &lt;div class=&quot;act-form&quot;&gt;
    &lt;iframe :src=&quot;src&quot; ref=&quot;iframe&quot;&gt;&lt;/iframe&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;

export default {
  data () {
    return {
      src: &apos;&#x4F60;&#x7684;src&apos;
    }
  },
  mounted () {
    // &#x8FD9;&#x91CC;&#x5C31;&#x62FF;&#x5230;&#x4E86;iframe&#x7684;&#x5BF9;&#x8C61;
    console.log(this.$refs.iframe)
  }
}
&lt;/script&gt;</code></pre><p>&#x7136;&#x540E;&#x5C31;&#x662F;&#x83B7;&#x53D6;iframe&#x7684;window&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x4E3A;&#x53EA;&#x6709;&#x62FF;&#x5230;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x624D;&#x80FD;&#x5411;iframe&#x4E2D;&#x4F20;&#x4E1C;&#x897F;</p><pre><code>&lt;template&gt;
  &lt;div class=&quot;act-form&quot;&gt;
    &lt;iframe :src=&quot;src&quot; ref=&quot;iframe&quot;&gt;&lt;/iframe&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;

export default {
  data () {
    return {
      src: &apos;&#x4F60;&#x7684;src&apos;
    }
  },
  mounted () {
    // &#x8FD9;&#x91CC;&#x5C31;&#x62FF;&#x5230;&#x4E86;iframe&#x7684;&#x5BF9;&#x8C61;
    console.log(this.$refs.iframe)
    // &#x8FD9;&#x91CC;&#x5C31;&#x62FF;&#x5230;&#x4E86;iframe&#x7684;window&#x5BF9;&#x8C61;
    console.log(this.$refs.iframe.contentWindow)
  }
}
&lt;/script&gt;</code></pre><p>3&#x3001;vue&#x5982;&#x4F55;&#x5411;iframe&#x5185;&#x4F20;&#x9001;&#x4FE1;&#x606F;&#xFF1F;</p><pre><code>&#x901A;&#x8FC7;postMessage&#xFF0C;&#x5177;&#x4F53;&#x5173;&#x4E8E;postMessage&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x81EA;&#x5DF1;&#x53BB;google&#xFF0C;

&#x6211;&#x7684;&#x7406;&#x89E3;postMessage&#x662F;&#x6709;&#x70B9;&#x7C7B;&#x4F3C;&#x4E8E;UDP&#x534F;&#x8BAE;&#xFF0C;&#x5C31;&#x50CF;&#x77ED;&#x4FE1;&#xFF0C;&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF0C;&#x4F60;&#x53D1;&#x4FE1;&#x606F;&#x8FC7;&#x53BB;&#xFF0C;&#x4F46;&#x662F;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#xFF0C;&#x53EA;&#x80FD;&#x5185;&#x90E8;&#x5904;&#x7406;&#x5B8C;&#x6210;&#x4EE5;&#x540E;&#x518D;&#x901A;&#x8FC7;postMessage&#x5411;&#x5916;&#x90E8;&#x53D1;&#x9001;&#x4E00;&#x4E2A;&#x6D88;&#x606F;&#xFF0C;&#x5916;&#x90E8;&#x76D1;&#x542C;message

&#x4E3A;&#x4E86;&#x8BA9;postMessage&#x50CF;TCP&#xFF0C;&#x4E3A;&#x4E86;&#x4F53;&#x9A8C;&#x50CF;&#x540C;&#x6B65;&#x7684;&#x548C;&#x5B9E;&#x73B0;&#x591A;&#x901A;&#x4FE1;&#x4E92;&#x4E0D;&#x5E72;&#x6270;&#xFF0C;&#x7279;&#x522B;&#x5236;&#x5B9A;&#x7684;message&#x7ED3;&#x6784;&#x5982;&#x4E0B;</code></pre><pre><code>{
  cmd: &apos;&#x547D;&#x4EE4;&apos;,
  params: {
    &apos;&#x952E;1&apos;: &apos;&#x503C;1&apos;,
    &apos;&#x952E;2&apos;: &apos;&#x503C;2&apos;
  }
}</code></pre><p>&#x901A;&#x8FC7;cmd&#x6765;&#x533A;&#x522B;&#x8FD9;&#x6761;message&#x7684;&#x76EE;&#x7684;</p><p>&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><pre><code>&lt;template&gt;
  &lt;div class=&quot;act-form&quot;&gt;
    &lt;iframe :src=&quot;src&quot; ref=&quot;iframe&quot;&gt;&lt;/iframe&gt;
    &lt;div @click=&quot;sendMessage&quot;&gt;&#x5411;iframe&#x53D1;&#x9001;&#x4FE1;&#x606F;&lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;

export default {
  data () {
    return {
      src: &apos;&#x4F60;&#x7684;src&apos;,
      iframeWin: {}
    }
  },
  methods: {
    sendMessage () {
      // &#x5916;&#x90E8;vue&#x5411;iframe&#x5185;&#x90E8;&#x4F20;&#x6570;&#x636E;
      this.iframeWin.postMessage({
        cmd: &apos;getFormJson&apos;,
        params: {}
      }, &apos;*&apos;)
    },
  },
  mounted () {
    // &#x5728;&#x5916;&#x90E8;vue&#x7684;window&#x4E0A;&#x6DFB;&#x52A0;postMessage&#x7684;&#x76D1;&#x542C;&#xFF0C;&#x5E76;&#x4E14;&#x7ED1;&#x5B9A;&#x5904;&#x7406;&#x51FD;&#x6570;handleMessage
    window.addEventListener(&apos;message&apos;, this.handleMessage)
    this.iframeWin = this.$refs.iframe.contentWindow
  },
  handleMessage (event) {
    // &#x6839;&#x636E;&#x4E0A;&#x9762;&#x5236;&#x5B9A;&#x7684;&#x7ED3;&#x6784;&#x6765;&#x89E3;&#x6790;iframe&#x5185;&#x90E8;&#x53D1;&#x56DE;&#x6765;&#x7684;&#x6570;&#x636E;
    const data = event.data
    switch (data.cmd) {
      case &apos;returnFormJson&apos;:
        // &#x4E1A;&#x52A1;&#x903B;&#x8F91;
        break
      case &apos;returnHeight&apos;:
        // &#x4E1A;&#x52A1;&#x903B;&#x8F91;
        break
    }
  }
}
&lt;/script&gt;</code></pre><p>4&#x3001;iframe&#x5185;&#x5982;&#x4F55;&#x5411;&#x5916;&#x90E8;vue&#x53D1;&#x9001;&#x4FE1;&#x606F;&#xFF1F;</p><p>&#x73B0;&#x5728;&#x901A;&#x8FC7;&#x70B9;&#x51FB;&#x201C;&#x5411;iframe&#x53D1;&#x9001;&#x4FE1;&#x606F;&#x201D;&#x8FD9;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x4ECE;&#x5916;&#x90E8;vue&#x4E2D;&#x5DF2;&#x7ECF;&#x5411;iframe&#x4E2D;&#x53D1;&#x9001;&#x4E86;&#x4E00;&#x6761;&#x4FE1;&#x606F;</p><pre><code>{
  cmd: &apos;getFormJson&apos;,
  params: {}
}</code></pre><p>&#x90A3;&#x4E48;iframe&#x5185;&#x90E8;&#x5982;&#x4F55;&#x5904;&#x7406;&#x8FD9;&#x4E2A;&#x4FE1;&#x606F;&#x5462;&#xFF1F;</p><pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;iframe Window&lt;/title&gt;
    &lt;style&gt;
        body {
            background-color: #D53C2F;
            color: white;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;h1&gt;Hello there, i&apos;m an iframe&lt;/h1&gt;

    &lt;script&gt;
        // &#x5411;&#x7236;vue&#x9875;&#x9762;&#x53D1;&#x9001;&#x4FE1;&#x606F;
        window.parent.postMessage({
            cmd: &apos;returnHeight&apos;,
            params: {
              success: true,
              data: document.body.scrollHeight + &apos;px&apos;
            }
        }, &apos;*&apos;);

        // &#x63A5;&#x53D7;&#x7236;&#x9875;&#x9762;&#x53D1;&#x6765;&#x7684;&#x4FE1;&#x606F;
        window.addEventListener(&quot;message&quot;, function(event){
          var data = event.data;
          switch (data.cmd) {
            case &apos;getFormJson&apos;:
                // &#x5904;&#x7406;&#x4E1A;&#x52A1;&#x903B;&#x8F91;
                break;
            }
        });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre><p>&#x81F3;&#x6B64;&#x5185;&#x90E8;&#x7684;&#x6536;&#x53D1;&#x4FE1;&#x606F;&#x5DF2;&#x7ECF;&#x89E3;&#x51B3;&#x4E86;&#xFF0C;&#x5916;&#x90E8;&#x7684;&#x6536;&#x53D1;&#x4E5F;&#x5DF2;&#x7ECF;&#x89E3;&#x51B3;&#x4E86;&#xFF0C;&#x5FEB;&#x53BB;&#x89E3;&#x51B3;&#x4F60;&#x7684;&#x95EE;&#x9898;&#x5427;</p><p>&#x5728;&#x8FD9;&#x91CC;&#x5148;&#x76F4;&#x63A5;&#x7ED9;&#x51FA;&#x6211;&#x9879;&#x76EE;&#x7684;&#x6E90;&#x7801;</p><pre><code>&lt;template&gt;
  &lt;div class=&quot;act-form&quot;&gt;
    &lt;div class=&quot;nav&quot;&gt;
      &lt;img src=&quot;https://cxkccdn.oss-cn-shanghai.aliyuncs.com/lesai_img/icon_back_white.png&quot; @click=&quot;back()&quot;&gt;
      &lt;div class=&quot;title&quot;&gt;&#x62A5;&#x540D;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;iframe-out&quot;&gt;
      &lt;iframe :src=&quot;src&quot; ref=&quot;iframe&quot; @load=&quot;iframeLoad&quot;&gt;&lt;/iframe&gt;
    &lt;/div&gt;
    &lt;div v-if=&quot;isLoaded&quot; class=&quot;send-form&quot;&gt;&lt;div class=&quot;send&quot; @click=&quot;sendMessage()&quot;&gt;&#x63D0;&#x4EA4;&lt;/div&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;!-- Add &quot;scoped&quot; attribute to limit CSS to this component only --&gt;
&lt;style lang=&quot;sass&quot; rel=&quot;stylesheet/sass&quot;&gt;
  @import &quot;style.scss&quot;;
&lt;/style&gt;

&lt;script&gt;
import { Toast, Indicator } from &apos;mint-ui&apos;
import api from &apos;@/utils/api&apos;

export default {
  data () {
    return {
      src: &apos;&apos;,
      iframeWin: null,
      isLoaded: false
    }
  },
  created () {
    let matchFamily = this.$store.state.matchFamily
    this.src = process.env.BASE_URL + &apos;/matches/&apos; + matchFamily.match.id + &apos;/act/&apos; + matchFamily.act.id + &apos;/joinweb?token=&apos; + this.$store.state.token
  },
  mounted () {
    window.addEventListener(&apos;message&apos;, this.handleMessage)
    this.iframeWin = this.$refs.iframe.contentWindow
    // &#x5F00;&#x542F;&#x52A0;&#x8F7D;&#x52A8;&#x753B;
    Indicator.open({
      text: &apos;&#x52AA;&#x529B;&#x52A0;&#x8F7D;&#x4E2D;...&apos;,
      spinnerType: &apos;triple-bounce&apos;
    })
  },
  methods: {
    back () {
      this.$router.push(&apos;/actIntro&apos;)
    },
    sendMessage () {
      this.iframeWin.postMessage({
        cmd: &apos;getFormJson&apos;,
        params: {}
      }, &apos;*&apos;)
    },
    iframeLoad () {
      // &#x5173;&#x95ED;&#x52A0;&#x8F7D;&#x52A8;&#x753B;
      Indicator.close()
    },
    async handleMessage (event) {
      const data = event.data
      switch (data.cmd) {
        case &apos;returnFormJson&apos;:
          if (data.params.success) {
            // &#x8C03;&#x7528;&#x62A5;&#x540D;&#x65B9;&#x6CD5;
            await this.enroll(data.params.data)
          } else {
            console.log(&apos;returnFormJson&#x5931;&#x8D25;&apos;)
            console.log(data.params)
          }
          break
        case &apos;returnHeight&apos;:
          if (data.params.success) {
            this.$refs.iframe.height = data.params.data
            this.isLoaded = true
          }
          break
      }
    },
    async enroll (data) {
      let matchFamily = this.$store.state.matchFamily
      let result = await api.enroll(matchFamily.match.id, matchFamily.act.id, data)
      if (result.success) {
        if (result.data.status === &apos;no_pay&apos;) {
          // &#x66F4;&#x65B0;&#x7F13;&#x5B58;
          let resultMatch = await api.match(matchFamily.match.id, {})
          if (resultMatch.success) {
            this.$store.commit(&apos;SET_CURRENT_MATCH&apos;, resultMatch.data)
          }
          Toast({
            message: &apos;&#x62A5;&#x540D;&#x6210;&#x529F;&apos;,
            position: &apos;bottom&apos;
          })
          this.$router.push(&apos;/match/&apos; + matchFamily.match.id + &apos;/mdetail&apos;)
        } else {
          console.log(&apos;&#x9700;&#x8981;&#x8DF3;&#x8F6C;&#x5230;&#x652F;&#x4ED8;&#x9875;&#x9762;&apos;)
        }
      }
    }
  }
}
&lt;/script&gt;</code></pre><p>&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6765;&#x770B;&#x770B;&#x6211;&#x7684;&#x535A;&#x5BA2; <a href="https://www.windzh.com" rel="nofollow noreferrer">https://www.windzh.com</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端爬坑日记之vue内嵌iframe并跨域通信

## 原文链接
[https://segmentfault.com/a/1190000016258735](https://segmentfault.com/a/1190000016258735)


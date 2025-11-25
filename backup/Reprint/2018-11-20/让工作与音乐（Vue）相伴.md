---
title: '让工作与音乐（Vue）相伴' 
date: 2018-11-20 2:30:10
hidden: true
slug: 908czpu2dh
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000015805758" src="https://static.alili.tech/img/remote/1460000015805758" alt="" title=""></span></p><h1>&#x524D;&#x8A00;</h1><p>&#x6700;&#x8FD1;&#x5728;&#x81EA;&#x5B66;vue,&#x6253;&#x7B97;&#x81EA;&#x5DF1;&#x4EFF;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x6765;&#x5B9E;&#x6218;&#x4E00;&#x4E0B;&#xFF0C;&#x7531;&#x4E8E;&#x672C;&#x4EBA;&#x5F88;&#x559C;&#x6B22;&#x542C;&#x6B4C;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x9009;&#x62E9;&#x4E86;&#x7F51;&#x6613;&#x4E91;&#x97F3;&#x4E50;&#xFF0C;&#x5728;&#x8FD9;&#x4E0E;&#x5927;&#x5BB6;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#x81EA;&#x5DF1;&#x6240;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5176;&#x4E2D;&#x4E5F;&#x6709;&#x4E9B;&#x4E0D;&#x8DB3;&#x4E4B;&#x5904;&#x4E5F;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x63D0;&#x4E00;&#x4E9B;&#x5B9D;&#x8D35;&#x7684;&#x610F;&#x89C1;&#xFF0C;&#x4E92;&#x76F8;&#x5B66;&#x4E60;&#xFF0C;&#x4E00;&#x8D77;&#x8FDB;&#x6B65;&#x3002;</p><h2>&#x5173;&#x4E8E;&#x9879;&#x76EE;&#x4F7F;&#x7528;&#x7684;&#x6280;&#x672F;&#x6808;</h2><ul><li>Vue&#xFF1A;&#x91C7;&#x7528;Vue&#x7684;&#x8BED;&#x6CD5;</li><li>Vuex&#xFF1A;&#x5B9E;&#x73B0;&#x4E0D;&#x540C;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x72B6;&#x6001;&#x5171;&#x4EAB;</li><li>vue-router&#xFF1A;&#x5355;&#x9875;&#x5E94;&#x7528;&#x8DEF;&#x7531;&#x7BA1;&#x7406;&#x5FC5;&#x5907;</li><li>axios&#xFF1A;&#x53D1;&#x8D77;http&#x8BF7;&#x6C42;</li><li>SASS(SCSS)&#xFF1A;css&#x9884;&#x5904;&#x7406;&#x8BED;&#x8A00;</li></ul><h2>&#x9879;&#x76EE;</h2><p>&#x7531;&#x4E8E;&#x65F6;&#x95F4;&#x6709;&#x9650;&#xFF0C;&#x53EA;&#x662F;&#x505A;&#x4E86;&#x4E2A;&#x9875;&#x9762;&#x7684;&#x64AD;&#x653E;&#x529F;&#x80FD;&#xFF0C;&#x5176;&#x4E2D;&#x7528;&#x5230;&#x4E86;&#x7F51;&#x6613;&#x4E91;&#x97F3;&#x4E50;&#x7684;API<a href="https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3" rel="nofollow noreferrer">&#x7F51;&#x6613;&#x4E91;</a>&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x53EF;&#x4EE5;&#x53BB;&#x73A9;&#x73A9;&#xFF0C;&#x5176;&#x4E2D;&#x4E5F;&#x6D89;&#x53CA;&#x5230;&#x4E86;&#x4E00;&#x4E9B;&#x77E5;&#x8BC6;&#x70B9;&#xFF0C;&#x5728;&#x8FD9;&#x4E0E;&#x5927;&#x5BB6;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#x3002;</p><h2>&#x4E0A;&#x56FE;</h2><p>&#x6574;&#x4E2A;&#x6548;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015805759" src="https://static.alili.tech/img/remote/1460000015805759" alt="" title=""></span>)</p><h2>&#x5206;&#x4EAB;&#x505A;&#x8FD9;&#x4E2A;&#x5355;&#x9875;&#x9762;&#x7684;&#x8FC7;&#x7A0B;</h2><p>&#x8FD9;&#x5C31;&#x662F;&#x4E00;&#x4E2A;header&#x7EC4;&#x4EF6;&#xFF0C;&#x4E00;&#x4E2A;footer&#x7EC4;&#x4EF6;&#xFF0C;&#x4E00;&#x4E2A;musicList&#x7EC4;&#x4EF6;&#x548C;&#x4E00;&#x4E2A;paly&#x7EC4;&#x4EF6;&#x7EC4;&#x6210;&#x7684;&#x5355;&#x9875;&#x9762;&#x3002;</p><h3>1. &#x5982;&#x4F55;&#x83B7;&#x53D6;&#x97F3;&#x4E50;&#x7684;&#x6570;&#x636E;</h3><p>&#x6211;&#x8FD9;&#x662F;&#x4ECE;&#x7F51;&#x6613;&#x4E91;&#x97F3;&#x4E50;api&#x6252;&#x51FA;&#x6765;&#x7684;&#xFF0C;&#x6252;&#x51FA;&#x6765;&#x4E4B;&#x540E;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x628A;&#x6570;&#x636E;&#x653E;&#x8FDB;&#x53BB;&#xFF0C;&#x4E4B;&#x540E;&#x901A;&#x8FC7;axios&#x83B7;&#x53D6;&#xFF0C;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>actions: {
    getData({ commit,state }) {
      if (localStorage.musics !== &apos;[]&apos; &amp;&amp; localStorage.musics) {
        state.musicData = JSON.parse(localStorage.musics);
        return;
      }
      return new Promise((resolve, reject) =&gt; {
        Vue.axios.get(&apos;music-data&apos;)
            .then (res =&gt; {
              if (res.data.error === 0) {
                state.musicData = res.data.musicData;
                localStorage.musics = JSON.stringify(state.musicData);
              }
            })
            .then(() =&gt; {
              commit(&apos;toggleMusic&apos;,0)
            });
        resolve();
      });
    }
  }</code></pre><h3>2. &#x5220;&#x9664;&#x529F;&#x80FD;</h3><p>&#x6211;&#x662F;&#x5728;&#x8FD9;&#x5220;&#x9664;&#x8FD9;&#x4E2A;&#x56FE;&#x6807;&#x4E0B;&#x7ED1;&#x5B9A;&#x4E86;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#xFF0C;&#x4E3B;&#x8981;&#x5C31;&#x4E8C;&#x53E5;&#x4EE3;&#x7801;:</p><pre><code>&lt;span v-on:click=&quot;del(index)&quot; class=&quot;del-icon&quot;&gt;&lt;/span&gt;
&#x5728;methods&#x5B9A;&#x4E49;del&#x4E8B;&#x4EF6;&#x5C31;&#x597D;&#x4E86;
        del(index){
            this.$store.commit(&apos;del&apos;,index);
        }</code></pre><h3>3. &#x5C3E;&#x90E8;&#x7684;&#x64AD;&#x653E;&#x63A7;&#x5236;</h3><p>&#x5C3E;&#x90E8;&#x7684;&#x64AD;&#x653E;&#x529F;&#x80FD;&#x6211;&#x4E00;&#x5F00;&#x59CB;&#x9047;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x96BE;&#x9898;&#x5C31;&#x662F;&#x5982;&#x4F55;&#x83B7;&#x53D6;&#x6B4C;&#x66F2;&#x7684;&#x65F6;&#x95F4;&#x548C;&#x63A7;&#x5236;&#x64AD;&#x653E;&#x7684;&#x8FDB;&#x5EA6;&#x3002;&#x540E;&#x6765;&#x901A;&#x8FC7;&#x67E5;&#x627E;&#x8D44;&#x6599;&#x548C;&#x767E;&#x5EA6;&#x89E3;&#x51B3;&#x4E86;</p><p><strong>&#x83B7;&#x53D6;&#x6B4C;&#x66F2;&#x65F6;&#x95F4;&#x7684;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</strong></p><pre><code> &lt;span class=&quot;start&quot;&gt;"{{"transformTime(now)"}}"&lt;/span&gt;
 js&#x90E8;&#x5206;&#x4EE3;&#x7801;
  this.nativeAudio = document.querySelector(&apos;audio&apos;);
    this.nativeAudio.addEventListener(&apos;play&apos;, () =&gt; {
      this.totalTime = this.transformTime(this.nativeAudio.duration);
      this.now = this.nativeAudio.currentTime;
      setInterval(() =&gt; {
        this.now = this.nativeAudio.currentTime;
      }, 1000)
    })
    
    transformTime(seconds) {
      let m, s;
      m = Math.floor(seconds / 60);
      m = m.toString().length == 1 ? (&apos;0&apos; + m) : m;
      s = Math.floor(seconds - 60 * m);
      s = s.toString().length == 1 ? (&apos;0&apos; + s) : s;
      return m + &apos;:&apos; + s;
    }</code></pre><p><strong>&#x63A7;&#x5236;&#x64AD;&#x653E;&#x8FDB;&#x5EA6;&#x7684;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</strong></p><pre><code>changeTime(event) {
      let progressBar = this.$refs.progressBar;
      let coordStart = progressBar.getBoundingClientRect().left;  //getBoundingClientRect()&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x5143;&#x7D20;&#x7684;&#x5927;&#x5C0F;&#x53CA;&#x5176;&#x76F8;&#x5BF9;&#x4E8E;&#x89C6;&#x53E3;&#x7684;&#x4F4D;&#x7F6E;
      let coordEnd = event.pageX;
      this.nativeAudio.currentTime = (coordEnd - coordStart) / progressBar.offsetWidth * this.nativeAudio.duration;
      this.now = this.nativeAudio.currentTime;
      this.nativeAudio.play();
      this.$store.commit(&apos;play&apos;, true);
    },
touchMove(event) {
      let progressBar = this.$refs.progressBar;
      let coordStart = progressBar.getBoundingClientRect().left;
      let coordEnd = event.touches[0].pageX;
      this.$refs.now.style.width = ((coordEnd - coordStart) / progressBar.offsetWidth).toFixed(3) * 100 + &apos;%&apos;;  //toFixed(3)&#x4FDD;&#x7559;&#x5C0F;&#x6570;&#x70B9;&#x540E;3&#x4F4D;
    },
touchEnd(event) {
      this.nativeAudio.currentTime = this.$refs.now.style.width.replace(&apos;%&apos;, &apos;&apos;)/100 * this.nativeAudio.duration;
      this.now = this.nativeAudio.currentTime;
      this.nativeAudio.play();
      this.$store.commit(&apos;play&apos;, true);
    },</code></pre><h3>4. &#x6362;&#x80A4;</h3><p>&#x6362;&#x80A4;&#x4E3B;&#x8981;&#x63D0;&#x4F9B;&#x4E86;&#x56DB;&#x79CD;&#x989C;&#x8272;&#xFF0C;&#x7EA2;&#x8272; &#x84DD;&#x8272; &#x9ED1;&#x8272; &#x548C;&#x7EFF;&#x8272;&#xFF0C;&#x6837;&#x5F0F;&#x4F7F;&#x7528;&#x7684;&#x662F;flex&#x5E03;&#x5C40;&#xFF0C;&#x4E3B;&#x8981;css&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>.skin {
        position: absolute;
        display: flex;
        flex-direction: column;
        bottom: 50px;
        right: 15px;
        width: 30px;
        .skin-colors {
          flex: 4;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .selected {
            border: 1px solid white;
          }
          i {
            flex: 1;
            display: inline-block;
            width: 20px;
            height: 20px;
            cursor: pointer;
            border-radius: 10px;
            margin-bottom: 5px;
          }
          i.one {
            background-color: #B72712;
          }
          i.two {
            background-color: #1565C0;
          }
          i.three {
            background-color: #212121;
          }
          i.four {
            background-color: #1B5E20;
          }
        }
        .icon-skin {
          flex: 1;
          width: 100%;
          height: 30px;
          background-repeat: no-repeat;
          background-size: contain;
          margin-top: 3px;
          cursor: pointer;
        }
        .icon-skin-red {
          background-image: url(&apos;./skinRed.svg&apos;);
        }
        .icon-skin-green {
          background-image: url(&apos;./skinGreen.svg&apos;);
        }
        .icon-skin-blue {
          background-image: url(&apos;./skinBlue.svg&apos;);
        }
        .icon-skin-black {
          background-image: url(&apos;./skinBlack.svg&apos;);
        }</code></pre><h3>5. &#x63A7;&#x5236;&#x6B4C;&#x66F2;&#x7684;&#x4E0A;&#x4E00;&#x9996;&#x4E0B;&#x4E00;&#x9996;&#x7684;&#x64AD;&#x653E;</h3><p>&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>    prev() {
      this.audio.index = this.audio.index === 0 ? this.musicData.length - 1 : (--this.audio.index);
      this.$store.commit(&apos;toggleMusic&apos;, this.audio.index);
    }
    
    next() {
      this.audio.index = this.audio.index === this.musicData.length - 1 ? 0 : (++this.audio.index);
      this.$store.commit(&apos;toggleMusic&apos;, this.audio.index);
    }</code></pre><p><strong>&#x603B;&#x7ED3;&#xFF1A;&#x901A;&#x8FC7;&#x6A21;&#x4EFF;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x66F4;&#x52A0;&#x6E05;&#x695A;&#x5730;&#x4E86;&#x89E3;&#x5404;&#x7EC4;&#x4EF6;&#x4E4B;&#x524D;&#x7684;&#x4F7F;&#x7528;&#x548C;&#x4E0D;&#x540C;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#x5171;&#x4EAB;&#x3002;&#x5F53;&#x7136;&#x4E5F;&#x9047;&#x5230;&#x4E86;&#x4E00;&#x4E9B;&#x5751;&#xFF0C;&#x6587;&#x7AE0;&#x5199;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x4E5F;&#x6CA1;&#x6709;&#x5B8C;&#x5168;&#x5199;&#x5B8C;&#xFF0C;&#x53EA;&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x5355;&#x9875;&#x9762;&#xFF0C;&#x4F46;&#x4E5F;&#x7B97;&#x662F;&#x4E00;&#x4E2A;&#x5C0F;&#x5C0F;&#x7684;&#x603B;&#x7ED3;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x9644;&#x4E0A;&#x6211;&#x7684;&#x6E90;&#x7801;&#xFF1A;<a href="https://github.com/duzuimoye/vue-music-tool" rel="nofollow noreferrer">&#x9879;&#x76EE;&#x6E90;&#x7801;</a>&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x987A;&#x4FBF;&#x5E2E;&#x5FD9;&#x70B9;&#x4E2A;star&#x548C;fork,&#x4E5F;&#x5E0C;&#x671B;&#x80FD;&#x5E2E;&#x52A9;&#x5230;&#x4E00;&#x4E9B;&#x670B;&#x53CB;&#x3002;&#x4F5C;&#x4E3A;&#x4E00;&#x540D;&#x5FEB;&#x8981;&#x6210;&#x4E3A;&#x5927;&#x56DB;&#x7684;&#x5B66;&#x751F;&#xFF0C;&#x65F6;&#x95F4;&#x771F;&#x7684;&#x5B9D;&#x8D35;&#xFF0C;&#x5BF9;&#x5F85;&#x5B66;&#x4E60;&#x4E5F;&#x4E0D;&#x6562;&#x61C8;&#x6020;&#xFF0C;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x6709;&#x4EC0;&#x4E48;&#x597D;&#x7684;&#x60F3;&#x6CD5;&#x7684;&#x8BDD;&#x53EF;&#x4EE5;&#x8054;&#x7CFB;&#x6211;&#x7684;qq:137032979.&#x7801;&#x5B57;&#x4E0D;&#x5BB9;&#x6613;&#xFF0C;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x70B9;&#x4E2A;&#x8D5E;&#x3002;&#x524D;&#x7AEF;&#x8DEF;&#x6F2B;&#x6F2B;&#xFF0C;&#x4E0E;&#x541B;&#x5171;&#x52C9;&#x4E4B;&#x3002;</strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015805760" src="https://static.alili.tech/img/remote/1460000015805760" alt="" title=""></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
让工作与音乐（Vue）相伴

## 原文链接
[https://segmentfault.com/a/1190000015805754](https://segmentfault.com/a/1190000015805754)


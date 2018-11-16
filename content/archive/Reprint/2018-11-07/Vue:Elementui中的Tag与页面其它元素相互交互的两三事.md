---
title: 'Vue:Elementui中的Tag与页面其它元素相互交互的两三事'
hidden: true
categories: [reprint]
slug: ce6b0714
date: 2018-11-07 02:30:15
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><blockquote>&#x516C;&#x53F8;&#x7CFB;&#x7EDF;&#x5728;&#x7528;elementui&#x505A;&#x540E;&#x53F0;&#x5F00;&#x53D1;&#xFF0C;&#x4E0D;&#x514D;&#x9047;&#x5230;&#x4E00;&#x4E9B;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x53BB;&#x6839;&#x636E;&#x539F;&#x6709;&#x7684;&#x529F;&#x80FD;&#x4E0A;&#xFF0C;&#x52A0;&#x4E00;&#x4E9B;&#x4EA4;&#x4E92;&#x7684;&#x529F;&#x80FD;&#x3002;<br>&#x4ECA;&#x5929;&#x6765;&#x4ECB;&#x7ECD;&#x4E0B;&#x6211;&#x5728;&#x7528;elementUi&#x91CC;&#x7684;Tag&#x6807;&#x7B7E;&#x4E0E;&#x591A;&#x9009;&#x6846;&#x4EA4;&#x4E92;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x4E1C;&#x897F;&#x542C;&#x4E0A;&#x53BB;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4F46;&#x5C31;&#x662F;&#x8D8A;&#x7B80;&#x5355;&#x7684;&#x4E1C;&#x897F;&#x8D8A;&#x5BB9;&#x6613;&#x51FA;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#x3002;&#x5B98;&#x65B9;tag&#x6587;&#x6863;&#xFF1A;<a href="http://element-cn.eleme.io/#/zh-CN/component/tag" rel="nofollow noreferrer" target="_blank">elementUi-tag&#x6807;&#x7B7E;</a></blockquote><p>&#x6548;&#x679C;&#x56FE;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbhoM5?w=599&amp;h=243" src="https://static.alili.tech/img/bVbhoM5?w=599&amp;h=243" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x601D;&#x8DEF;</h2><blockquote><strong>&#x4E00;&#x3001;&#x591A;&#x9009;&#x6846;&#x52FE;&#x9009;&#xFF0C;&#x51FA;&#x73B0;&#x5BF9;&#x5E94;&#x7684;tag</strong>:<br>1.&#x5229;&#x7528;watch&#x76D1;&#x542C;&#x591A;&#x9009;&#x6846;&#x7ED1;&#x5B9A;&#x7684;&#x503C;<strong>A</strong>(&#x6570;&#x7EC4;)&#x7684;&#x53D8;&#x5316;&#xFF1B;<br>2.&#x6839;&#x636E;<strong>A</strong>&#x7684;&#x53D8;&#x5316;,&#x5FAA;&#x73AF;&#x62FF;&#x5230;&#x52FE;&#x9009;&#x591A;&#x9009;&#x6846;&#x7684;id&#x5BF9;&#x5E94;&#x7684;name&#xFF0C;&#x5C06;id&#x4EE5;&#x53CA;&#x5BF9;&#x5E94;&#x7684;name&#x7EC4;&#x6210;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#x6570;&#x7EC4;&#xFF1B;<br>3.&#x5C06;&#x4E0A;&#x4E00;&#x6B65;&#x5F97;&#x5230;&#x7684;&#x5BF9;&#x8C61;&#x6570;&#x7EC4;&#xFF0C;&#x53BB;&#x91CD;(&#x4EA7;&#x54C1;&#x8981;&#x6C42;&#xFF0C;&#x51FA;&#x73B0;&#x7684;tag&#x91CC;&#x4E0D;&#x80FD;&#x6709;&#x91CD;&#x590D;&#x7684;)&#x5F97;&#x5230;&#x7ED3;&#x679C;<strong>B</strong>&#xFF1B;<br>4.&#x5C06;<strong>B</strong>&#x8D4B;&#x503C;&#x7ED9;tags&#xFF0C;&#x5FAA;&#x73AF;&#x5C55;&#x793A;&#x51FA;&#x6765;&#xFF1B;<p><strong>&#x4E8C;&#x3001;&#x70B9;&#x51FB;tag&#x4E0A;&#x7684;&#x5220;&#x9664;&#x6309;&#x94AE;&#xFF0C;&#x5220;&#x9664;&#x5F53;&#x524D;&#x7684;tag&#xFF0C;&#x5E76;&#x5C06;&#x5BF9;&#x5E94;&#x52FE;&#x9009;&#x7684;&#x591A;&#x9009;&#x6846;&#x53D6;&#x6D88;&#x52FE;&#x9009;:</strong><br>1.&#x70B9;&#x51FB;tag&#x5220;&#x9664;&#x7684;&#x6309;&#x94AE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x62FF;&#x5230;&#x5F53;&#x524D;tag&#x7684;id <strong>C</strong>&#xFF1B;<br>2.&#x6267;&#x884C;&#x65B9;&#x6CD5;&#xFF0C;&#x53BB;&#x9664;&#x6389;<strong>A</strong>&#x91CC;&#x7684;<strong>C</strong>&#xFF1B;<br>3.watch&#x4E8B;&#x4EF6;&#x91CD;&#x65B0;&#x8FDB;&#x5165;&#x5230;&#x7B2C;&#x4E00;&#x6B65;&#x7684;&#x65B9;&#x6CD5;;</p><p><strong>&#x603B;&#x7ED3;&#xFF1A;</strong>&#x76D1;&#x542C;&#x591A;&#x9009;&#x6846;&#x5BF9;&#x5E94;&#x7684;model <strong>A</strong>&#xFF0C;&#x6839;&#x636E;<strong>A</strong>&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x53D6;&#x5230;&#x5BF9;&#x5E94;&#x7684;id&#x4E0E;name&#xFF0C;&#x8D4B;&#x503C;&#x7ED9;tag&#x4F5C;&#x5C55;&#x793A;&#xFF0C;tag&#x7684;&#x5220;&#x9664;&#x4E8B;&#x4EF6;&#x53CD;&#x8FC7;&#x6765;&#x5728;&#x53BB;&#x63A7;&#x5236;<strong>A</strong>&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x91CD;&#x65B0;&#x8FDB;&#x5165;watch&#x4E8B;&#x4EF6;&#x91CC;&#x7684;&#x65B9;&#x6CD5;</p></blockquote><p>&#x542C;&#x8D77;&#x6765;&#x633A;&#x7B80;&#x5355;&#xFF0C;&#x601D;&#x8DEF;&#x5927;&#x6982;&#x4E5F;&#x660E;&#x786E;&#xFF0C;&#x5148;&#x8BB2;&#x4E0A;&#x8FF0;&#x601D;&#x8DEF;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x540E;&#x8FB9;&#x518D;&#x8BB2;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;&#x3001;&#x5751;</p><h2 id="articleHeader2">&#x4EE3;&#x7801;</h2><blockquote>&#x590D;&#x5236;&#x6574;&#x4E00;&#x5757;&#x4EE3;&#x7801;&#x5230;&#x4F60;&#x7684;elementUi&#x9879;&#x76EE;&#x91CC;&#x5C31;&#x80FD;&#x770B;&#x5230;&#x6548;&#x679C;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    &lt;el-row type=&quot;flex&quot; justify=&quot;bettwen&quot;&gt;
      &lt;el-col :span=&quot;15&quot;&gt;
        &lt;!-- &#x8868;&#x5355; --&gt;
        &lt;el-form :model=&quot;tempForm&quot; ref=&quot;tempForms&quot;&gt;
          &lt;el-form-item label=&quot;&#x8BF7;&#x9009;&#x62E9;&#x4EBA;&#x5458;&quot;&gt;
            &lt;!-- &#x591A;&#x9009;&#x4EBA;&#x5458; --&gt;
            &lt;el-checkbox-group v-model=&quot;tempForm.checkboxGroup5&quot; size=&quot;small&quot;&gt;
              &lt;el-checkbox border v-for=&quot;(item,index) in checkBox&quot; @change=&quot;perChange(item)&quot; :label=&quot;item.id&quot; :key=&quot;index&quot;&gt;{{item.name}}&lt;/el-checkbox&gt;
            &lt;/el-checkbox-group&gt;
            &lt;!-- &#x591A;&#x9009;&#x4EBA;&#x5458; end--&gt;
          &lt;/el-form-item&gt;
        &lt;/el-form&gt;
        &lt;!-- &#x8868;&#x5355; end--&gt;
        &lt;!-- tag&#x5C55;&#x793A;&#x533A; --&gt;
        &lt;el-row&gt;
          &lt;el-tag class=&quot;tagClass&quot; v-for=&quot;(tag,index) in tags&quot; :key=&quot;index&quot; closable @close=&quot;handleClose(tag)&quot; :type=&quot;tag.id&quot;&gt;
            {{tag.name}}
          &lt;/el-tag&gt;
          &lt;el-button v-if=&quot;tags.length&gt;0&quot; @click=&quot;clearAll&quot; plain&gt;&#x5168;&#x90E8;&#x5220;&#x9664;&lt;/el-button&gt;
        &lt;/el-row&gt;
        &lt;!-- tag&#x5C55;&#x793A;&#x533A; end--&gt;
      &lt;/el-col&gt;
     
    &lt;/el-row&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  name: &apos;kk&apos;,
  mounted() {},
  data() {
    return {
      msg: &apos;Welcome to Your Vue.js App&apos;,
      tags: [],
      tempForm: {
        checkboxGroup5: [], //&#x9009;&#x62E9;&#x7684;&#x4EBA;&#x5458;
      },
      detailData: [],
      checkBox: [{
          name: &apos;&#x5C0F;&#x7EA2;&apos;,
          id: &apos;101&apos;
        },
        {
          name: &apos;&#x5C0F;&#x9EC4;&apos;,
          id: &apos;100&apos;

        }, {
          name: &apos;&#x5C0F;&#x660E;&apos;,
          id: &apos;102&apos;

        }, {
          name: &apos;&#x5C0F;&#x660E;&apos;,
          id: &apos;102&apos;

        }
      ],
     
    }
  },
  methods: {
    clearAll() { //&#x5168;&#x90E8;&#x6E05;&#x7A7A;&#x6570;&#x636E;
      this.tags = []
      this.tempForm.checkboxGroup5 = []
    },
    perChange(item) {
      this.detailData.push(item)
    },
    handleClose(tag) { //&#x6807;&#x7B7E;&#x7684;&#x5220;&#x9664;&#x4E8B;&#x4EF6;
      // &#x53BB;&#x6389;&#x5F53;&#x524D;&#x5220;&#x9664;&#x7684;tag
      let yourChoseTags = this.tempForm.checkboxGroup5

      this.tempForm.checkboxGroup5 = yourChoseTags.filter(item =&gt; {
        if (tag.id !== item) {
          return true
        }
      })

     
    },
    delRepeat(arr) { //&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x53BB;&#x91CD;
      return Object.values(
        arr.reduce((obj, next) =&gt; {
          var key = JSON.stringify(next);
          return (obj[key] = next), obj;
        }, {}),
      );
    },
    moreArr() {
      let yourChose = this.tempForm.checkboxGroup5
      let tempTags = []

      tempTags = this.baseDataDetail(yourChose, this.checkBox, tempTags)
      this.detailData = tempTags
    },
    baseDataDetail(yourChose, baseData, callBack) { //&#x5C01;&#x88C5;&#x7684;&#x6570;&#x7EC4;&#x65B9;&#x6CD5;
      let temp = callBack
      // &#x5FAA;&#x73AF;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x62FF;&#x5230;&#x9009;&#x62E9;&#x7684;checkbox&#x7684;id&#x5BF9;&#x5E94;&#x7684;&#x521D;&#x59CB;&#x6570;&#x636E;
      yourChose.forEach(item =&gt; {
        baseData.forEach(itemSecond =&gt; {
          if (item === itemSecond.id) {
            temp.push(itemSecond)
          }
        })
      })
      return temp
    },

  },
  watch: {
    detailData() {
      let tempArr = Object.assign([], this.detailData)
      tempArr = this.delRepeat(tempArr)
      // console.log(tempArr)
      this.tags = tempArr
    },
    &quot;tempForm.checkboxGroup5&quot; () {
      this.moreArr()
    },
  }
}

&lt;/script&gt;
&lt;!-- Add &quot;scoped&quot; attribute to limit CSS to this component only --&gt;
&lt;style scoped&gt;
.tempArea {
  /*width: 100%;*/
}
.tagClass{
  margin-right: 10px;
}

&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;flex&quot;</span> <span class="hljs-attr">justify</span>=<span class="hljs-string">&quot;bettwen&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">&quot;15&quot;</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &#x8868;&#x5355; --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-form</span> <span class="hljs-attr">:model</span>=<span class="hljs-string">&quot;tempForm&quot;</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;tempForms&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;&#x8BF7;&#x9009;&#x62E9;&#x4EBA;&#x5458;&quot;</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- &#x591A;&#x9009;&#x4EBA;&#x5458; --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-checkbox-group</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;tempForm.checkboxGroup5&quot;</span> <span class="hljs-attr">size</span>=<span class="hljs-string">&quot;small&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-checkbox</span> <span class="hljs-attr">border</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item,index) in checkBox&quot;</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">&quot;perChange(item)&quot;</span> <span class="hljs-attr">:label</span>=<span class="hljs-string">&quot;item.id&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;index&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">el-checkbox</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-checkbox-group</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- &#x591A;&#x9009;&#x4EBA;&#x5458; end--&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-form</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &#x8868;&#x5355; end--&gt;</span>
        <span class="hljs-comment">&lt;!-- tag&#x5C55;&#x793A;&#x533A; --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-tag</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tagClass&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(tag,index) in tags&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;index&quot;</span> <span class="hljs-attr">closable</span> @<span class="hljs-attr">close</span>=<span class="hljs-string">&quot;handleClose(tag)&quot;</span> <span class="hljs-attr">:type</span>=<span class="hljs-string">&quot;tag.id&quot;</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"tag.name"}}"</span><span class="xml">
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-tag</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;tags.length&gt;0&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;clearAll&quot;</span> <span class="hljs-attr">plain</span>&gt;</span>&#x5168;&#x90E8;&#x5220;&#x9664;<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- tag&#x5C55;&#x793A;&#x533A; end--&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
     
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;kk&apos;</span>,
  mounted() {},
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">&apos;Welcome to Your Vue.js App&apos;</span>,
      <span class="hljs-attr">tags</span>: [],
      <span class="hljs-attr">tempForm</span>: {
        <span class="hljs-attr">checkboxGroup5</span>: [], <span class="hljs-comment">//&#x9009;&#x62E9;&#x7684;&#x4EBA;&#x5458;</span>
      },
      <span class="hljs-attr">detailData</span>: [],
      <span class="hljs-attr">checkBox</span>: [{
          <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x5C0F;&#x7EA2;&apos;</span>,
          <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;101&apos;</span>
        },
        {
          <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x5C0F;&#x9EC4;&apos;</span>,
          <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;100&apos;</span>

        }, {
          <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x5C0F;&#x660E;&apos;</span>,
          <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;102&apos;</span>

        }, {
          <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x5C0F;&#x660E;&apos;</span>,
          <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;102&apos;</span>

        }
      ],
     
    }
  },
  <span class="hljs-attr">methods</span>: {
    clearAll() { <span class="hljs-comment">//&#x5168;&#x90E8;&#x6E05;&#x7A7A;&#x6570;&#x636E;</span>
      <span class="hljs-keyword">this</span>.tags = []
      <span class="hljs-keyword">this</span>.tempForm.checkboxGroup5 = []
    },
    perChange(item) {
      <span class="hljs-keyword">this</span>.detailData.push(item)
    },
    handleClose(tag) { <span class="hljs-comment">//&#x6807;&#x7B7E;&#x7684;&#x5220;&#x9664;&#x4E8B;&#x4EF6;</span>
      <span class="hljs-comment">// &#x53BB;&#x6389;&#x5F53;&#x524D;&#x5220;&#x9664;&#x7684;tag</span>
      <span class="hljs-keyword">let</span> yourChoseTags = <span class="hljs-keyword">this</span>.tempForm.checkboxGroup5

      <span class="hljs-keyword">this</span>.tempForm.checkboxGroup5 = yourChoseTags.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (tag.id !== item) {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
        }
      })

     
    },
    delRepeat(arr) { <span class="hljs-comment">//&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x53BB;&#x91CD;</span>
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.values(
        arr.reduce(<span class="hljs-function">(<span class="hljs-params">obj, next</span>) =&gt;</span> {
          <span class="hljs-keyword">var</span> key = <span class="hljs-built_in">JSON</span>.stringify(next);
          <span class="hljs-keyword">return</span> (obj[key] = next), obj;
        }, {}),
      );
    },
    moreArr() {
      <span class="hljs-keyword">let</span> yourChose = <span class="hljs-keyword">this</span>.tempForm.checkboxGroup5
      <span class="hljs-keyword">let</span> tempTags = []

      tempTags = <span class="hljs-keyword">this</span>.baseDataDetail(yourChose, <span class="hljs-keyword">this</span>.checkBox, tempTags)
      <span class="hljs-keyword">this</span>.detailData = tempTags
    },
    baseDataDetail(yourChose, baseData, callBack) { <span class="hljs-comment">//&#x5C01;&#x88C5;&#x7684;&#x6570;&#x7EC4;&#x65B9;&#x6CD5;</span>
      <span class="hljs-keyword">let</span> temp = callBack
      <span class="hljs-comment">// &#x5FAA;&#x73AF;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x62FF;&#x5230;&#x9009;&#x62E9;&#x7684;checkbox&#x7684;id&#x5BF9;&#x5E94;&#x7684;&#x521D;&#x59CB;&#x6570;&#x636E;</span>
      yourChose.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        baseData.forEach(<span class="hljs-function"><span class="hljs-params">itemSecond</span> =&gt;</span> {
          <span class="hljs-keyword">if</span> (item === itemSecond.id) {
            temp.push(itemSecond)
          }
        })
      })
      <span class="hljs-keyword">return</span> temp
    },

  },
  <span class="hljs-attr">watch</span>: {
    detailData() {
      <span class="hljs-keyword">let</span> tempArr = <span class="hljs-built_in">Object</span>.assign([], <span class="hljs-keyword">this</span>.detailData)
      tempArr = <span class="hljs-keyword">this</span>.delRepeat(tempArr)
      <span class="hljs-comment">// console.log(tempArr)</span>
      <span class="hljs-keyword">this</span>.tags = tempArr
    },
    <span class="hljs-string">&quot;tempForm.checkboxGroup5&quot;</span> () {
      <span class="hljs-keyword">this</span>.moreArr()
    },
  }
}

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- Add &quot;scoped&quot; attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.tempArea</span> {
  <span class="hljs-comment">/*width: 100%;*/</span>
}
<span class="hljs-selector-class">.tagClass</span>{
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
}

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre><h2 id="articleHeader3">&#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x70B9;:</h2><blockquote>1.&#x6211;&#x5728;&#x591A;&#x9009;&#x6846;&#x7ED1;&#x5B9A;&#x503C;<strong>tempForm.checkboxGroup5</strong>&#x7684;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x91CC;&#x7684;&#x65B9;&#x6CD5;&#x7684;&#x6700;&#x540E;&#xFF0C;&#x5F97;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x91CD;&#x590D;&#x6570;&#x636E;(&#x91CD;&#x590D;id&#x8DDF;name)&#xFF0C;&#x518D;&#x5C06;&#x8FD9;&#x4E2A;&#x542B;&#x6709;&#x91CD;&#x590D;&#x6570;&#x636E;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x8D4B;&#x503C;&#x7ED9;&#x53E6;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;<strong>detailData</strong>,&#x5728;watch&#x76D1;&#x542C;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x53BB;&#x5B8C;&#x91CD;&#x540E;&#xFF0C;&#x8D4B;&#x503C;&#x7ED9;tags&#x505A;&#x5C55;&#x793A;&#x3002;<br>&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x6837;&#x505A;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x9700;&#x6C42;&#x91CC;&#xFF0C;&#x9664;&#x4E86;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x591A;&#x9009;&#x6846;&#x9009;&#x62E9;&#x4EBA;&#x5458;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x9009;&#x62E9;&#x5168;&#x516C;&#x53F8;&#x5458;&#x5DE5;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FD9;&#x6837;&#x4E0D;&#x7BA1;&#x4ECE;&#x54EA;&#x4E2A;&#x6E20;&#x9053;&#x9009;&#x62E9;&#x7684;&#x4EBA;&#x5458;&#x90FD;&#x80FD;&#x6700;&#x540E;&#x5C06;&#x7ED3;&#x679C;&#x6307;&#x5411;<strong>detailData</strong>&#xFF0C;&#x4FDD;&#x8BC1;&#x6E32;&#x67D3;&#x6B63;&#x786E;<p>2.&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x53BB;&#x91CD;&#xFF0C;&#x521D;&#x59CB;&#x6570;&#x636E;&#x91CC;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x91CD;id&#x3001;&#x91CD;&#x540D;&#x7684;&#x5BF9;&#x8C61;(<strong>&#x5C0F;&#x660E;</strong>)&#xFF0C;&#x5373;&#x4FBF;&#x7ED1;&#x5B9A;&#x591A;&#x9009;&#x6846;&#x7684;model&#x503C;&#x91CC;&#x4E0D;&#x4F1A;&#x6709;&#x91CD;&#x590D;&#x7684;id&#xFF0C;&#x4F46;&#x5728; &#x5229;&#x7528;id&#x53D6;&#x5BF9;&#x5E94;name&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD8;&#x662F;&#x4F1A;&#x68C0;&#x6D4B;&#x51FA;&#x591A;&#x6761;&#xFF0C;&#x8FD9;&#x6837;tag&#x5C31;&#x53EF;&#x80FD;&#x4F1A;&#x663E;&#x793A;&#x91CD;&#x590D;&#x7684;<br>&#x6240;&#x4EE5;&#x5229;&#x7528;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;,&#x5C31;&#x80FD;&#x4FDD;&#x8BC1;&#x6700;&#x540E;&#x5904;&#x7406;&#x597D;&#x7684;&#x6570;&#x636E;&#x6CA1;&#x6709;&#x91CD;&#x590D;&#x7684;&#xFF0C;tag&#x4E0D;&#x4F1A;&#x663E;&#x793A;&#x591A;&#x4E2A;&#x4E00;&#x6837;&#x7684;&#xFF0C;<br>&#x4F46;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x6709;&#x70B9;&#x4E0D;&#x7075;&#x6D3B;&#x7684;&#x5730;&#x65B9;&#x5C31;&#x662F;&#xFF0C;&#x4F60;&#x8981;&#x5904;&#x7406;&#x7684;&#x6570;&#x636E;({id:1,name:&apos;&#x5C0F;&#x660E;&apos;,type:now})&#x5FC5;&#x987B;id&#x3001;name&#xFF0C;type&#x90FD;&#x91CD;&#x590D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x624D;&#x4F1A;&#x88AB;&#x53BB;&#x91CD;&#xFF0C;<br>&#x62D3;&#x5C55;&#xFF1A;&#x53EF;&#x6839;&#x636E;&#x4F60;&#x8BBE;&#x7F6E;&#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x91CC;&#x7684;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x52A8;&#x6001;&#x53BB;&#x91CD;</p></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x53BB;&#x91CD;&#xFF1A;id&#x3001;name&#xFF0C;type&#x90FD;&#x91CD;&#x590D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x624D;&#x4F1A;&#x88AB;&#x53BB;&#x91CD;
delRepeat(arr) { 
      return Object.values(
        arr.reduce((obj, next) =&gt; {
          var key = JSON.stringify(next);
          return (obj[key] = next), obj;
        }, {}),
      );
    }
//&#x62D3;&#x5C55;&#xFF1A;&#x6839;&#x636E;&#x4F60;&#x8BBE;&#x7F6E;&#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x91CC;&#x7684;name&#x5C5E;&#x6027;&#x52A8;&#x6001;&#x53BB;&#x91CD;
 baseDel(arr) {
      const res = new Map();
      return arr.filter((item) =&gt; !res.has(item.name) &amp;&amp; res.set(item.name, 1))
    }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x53BB;&#x91CD;&#xFF1A;id&#x3001;name&#xFF0C;type&#x90FD;&#x91CD;&#x590D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x624D;&#x4F1A;&#x88AB;&#x53BB;&#x91CD;</span>
delRepeat(arr) { 
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.values(
        arr.reduce(<span class="hljs-function">(<span class="hljs-params">obj, next</span>) =&gt;</span> {
          <span class="hljs-keyword">var</span> key = <span class="hljs-built_in">JSON</span>.stringify(next);
          <span class="hljs-keyword">return</span> (obj[key] = next), obj;
        }, {}),
      );
    }
<span class="hljs-comment">//&#x62D3;&#x5C55;&#xFF1A;&#x6839;&#x636E;&#x4F60;&#x8BBE;&#x7F6E;&#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x91CC;&#x7684;name&#x5C5E;&#x6027;&#x52A8;&#x6001;&#x53BB;&#x91CD;</span>
 baseDel(arr) {
      <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
      <span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> !res.has(item.name) &amp;&amp; res.set(item.name, <span class="hljs-number">1</span>))
    },</code></pre><blockquote>3.&#x6211;&#x4E00;&#x5F00;&#x59CB;&#x662F;&#x5728;&#x591A;&#x9009;&#x6846;&#x7684;change&#x4E8B;&#x4EF6;&#x4E0A;&#x6765;&#x505A;tag&#x7684;&#x5C55;&#x793A;&#x903B;&#x8F91;&#xFF0C;&#x56E0;&#x4E3A;change&#x4E8B;&#x4EF6;&#x91CC;&#x53EF;&#x4EE5;&#x540C;&#x65F6;&#x62FF;&#x5230;&#x5F53;&#x524D;&#x9009;&#x62E9;&#x7684;name&#x548C;id&#xFF0C;&#x4F46;&#x662F;&#xFF0C;change&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x8FD9;&#x662F;&#x5728;&#x52FE;&#x9009;&#x8FD8;&#x662F;&#x5728;&#x53D6;&#x6D88;&#x52FE;&#x9009;&#xFF0C;&#x8FD9;&#x6837;tags&#x7684;&#x5C55;&#x793A;&#x5C31;&#x4F1A;&#x51FA;&#x95EE;&#x9898;&#xFF1B;</blockquote><p>&#x8FD9;&#x4E2A;&#x903B;&#x8F91;&#x53EF;&#x80FD;&#x4E0D;&#x592A;&#x5B8C;&#x7F8E;&#xFF0C;&#x56E0;&#x4E3A;&#x6709;&#x53EF;&#x80FD;&#x4F60;&#x7684;&#x4EBA;&#x5458;&#x662F;&#x4ECE;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x91CC;&#x9009;&#x6765;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5F53;&#x4F60;&#x5220;&#x9664;tag&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x53EF;&#x80FD;&#x51FA;&#x95EE;&#x9898;(&#x6682;&#x65F6;&#x5148;&#x4E0D;&#x8BA8;&#x8BBA;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;)</p><p>&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6765;&#x6307;&#x6B63;&#x548C;&#x8865;&#x5145;&#xFF0C;&#x6216;&#x8005;&#x4F60;&#x7684;&#x4E1A;&#x52A1;&#x9700;&#x6C42;&#x4EE5;&#x53CA;&#x89E3;&#x51B3;&#x65B9;&#x5F0F;&#xFF0C;&#x6492;&#x82B1;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue:Elementui中的Tag与页面其它元素相互交互的两三事

## 原文链接
[https://segmentfault.com/a/1190000016500866](https://segmentfault.com/a/1190000016500866)


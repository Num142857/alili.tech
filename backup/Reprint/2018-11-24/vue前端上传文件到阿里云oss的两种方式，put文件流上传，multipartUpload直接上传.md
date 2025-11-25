---
title: 'vue前端上传文件到阿里云oss的两种方式，put文件流上传，multipartUpload直接上传' 
date: 2018-11-24 2:30:10
hidden: true
slug: 2im4crk2abp
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x5F15;&#x5165;&#x963F;&#x91CC;&#x4E91;oss&#x7684;js</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;input type=&quot;file&quot; name=&quot;file&quot; @change=&apos;selectFile&apos; multiple=&quot;multiple&quot;/&gt;&#x4E0A;&#x4F20;&#x56FE;&#x7247;/&#x6587;&#x4EF6;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code style="word-break:break-word;white-space:initial">&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">&quot;file&quot;</span> name=<span class="hljs-string">&quot;file&quot;</span> <span class="hljs-meta">@change</span>=<span class="hljs-symbol">&apos;selectFil</span>e&apos; multiple=<span class="hljs-string">&quot;multiple&quot;</span>/&gt;&#x4E0A;&#x4F20;&#x56FE;&#x7247;/&#x6587;&#x4EF6;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted () {
  this.initConfig() // &#x8C03;&#x7528;&#x540E;&#x53F0;&#x63A5;&#x53E3;&#x83B7;&#x53D6;&#x963F;&#x91CC;&#x4E91;&#x4E0A;&#x4F20;&#x4E0B;&#x8F7D;&#x901A;&#x884C;&#x8BC1;
}
methods: {
  initConfig () {
    // &#x521D;&#x59CB;&#x5316;oss&#x6743;&#x9650;
    let url = &apos;document.getAccess&apos;
    let params = {
       type: &apos;H&apos;
    }
    this.$api.send(url, params).then((response) =&gt; {
      if (response.status === 200) {
        let data = response.body.data.data
        /* global OSS */ // &#x53BB;&#x6389;esllint&#x5BF9;OSS&#x7684;&#x6821;&#x9A8C;
        this.client = new OSS.Wrapper({
          region: &apos;oss-cn-shenzhen&apos;,
          accessKeyId: &apos;your accessKeyId&apos;,
          accessKeySecret: &apos;your accessKeySecret&apos;,
          stsToken: &apos;your stsToken&apos;,
          bucket: &apos;xx&apos;
       })
     }
   })
  },
  selectFile (e) {
    // &#x9009;&#x62E9;&#x6587;&#x4EF6;
    for (let i = 0; i &lt; e.target.files.length; i++) {
      this.pushFile(e.target.files[i])
    }
  },
  pushFile (file) {
    let that = this
    let _file = file
    var storeAs = &apos;&apos; // &#x4F20;&#x5230;oss&#x4E0A;&#x7684;&#x540D;&#x5B57;
    // &#x8C03;&#x7528;&#x4E0A;&#x4F20;&#x65B9;&#x6CD5;
    that.client.multipartUpload(&apos;cloudStorage/&apos; + storeAs, _file, {
      progress: function* (percentage) {
        let fileloadingNum = Math.ceil(percentage * 100) + &apos;%&apos;
        console.log(fileloadingNum) // &#x4E0A;&#x4F20;&#x6587;&#x4EF6;&#x8FDB;&#x5EA6;
      }
    }).then(function (result) {
      // &#x8C03;&#x7528;&#x540E;&#x53F0;&#x6DFB;&#x52A0;&#x6587;&#x4EF6;&#x7684;&#x63A5;&#x53E3;
      let url = &apos;netdisc.addDoc&apos;
      let params = {
        data: &apos;xx&apos;
      }
      that.$api.send(url, params).then((response) =&gt; {
        if (response.status === 200) {
          // &#x4E0A;&#x4F20;&#x6210;&#x529F;
        }
      })
    }).catch(function (err) {
      // &#x4E0A;&#x4F20;&#x5931;&#x8D25;,&#x5F39;&#x51FA;&#x4E0A;&#x4F20;&#x5931;&#x8D25;&#x7684;&#x6D88;&#x606F;
    })
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>mounted () {
  <span class="hljs-keyword">this</span>.initConfig() <span class="hljs-comment">// &#x8C03;&#x7528;&#x540E;&#x53F0;&#x63A5;&#x53E3;&#x83B7;&#x53D6;&#x963F;&#x91CC;&#x4E91;&#x4E0A;&#x4F20;&#x4E0B;&#x8F7D;&#x901A;&#x884C;&#x8BC1;</span>
}
methods: {
  initConfig () {
    <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;oss&#x6743;&#x9650;</span>
    <span class="hljs-keyword">let</span> url = <span class="hljs-string">&apos;document.getAccess&apos;</span>
    <span class="hljs-keyword">let</span> params = {
       <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;H&apos;</span>
    }
    <span class="hljs-keyword">this</span>.$api.send(url, params).then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (response.status === <span class="hljs-number">200</span>) {
        <span class="hljs-keyword">let</span> data = response.body.data.data
        <span class="hljs-comment">/* global OSS */</span> <span class="hljs-comment">// &#x53BB;&#x6389;esllint&#x5BF9;OSS&#x7684;&#x6821;&#x9A8C;</span>
        <span class="hljs-keyword">this</span>.client = <span class="hljs-keyword">new</span> OSS.Wrapper({
          <span class="hljs-attr">region</span>: <span class="hljs-string">&apos;oss-cn-shenzhen&apos;</span>,
          <span class="hljs-attr">accessKeyId</span>: <span class="hljs-string">&apos;your accessKeyId&apos;</span>,
          <span class="hljs-attr">accessKeySecret</span>: <span class="hljs-string">&apos;your accessKeySecret&apos;</span>,
          <span class="hljs-attr">stsToken</span>: <span class="hljs-string">&apos;your stsToken&apos;</span>,
          <span class="hljs-attr">bucket</span>: <span class="hljs-string">&apos;xx&apos;</span>
       })
     }
   })
  },
  selectFile (e) {
    <span class="hljs-comment">// &#x9009;&#x62E9;&#x6587;&#x4EF6;</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; e.target.files.length; i++) {
      <span class="hljs-keyword">this</span>.pushFile(e.target.files[i])
    }
  },
  pushFile (file) {
    <span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">let</span> _file = file
    <span class="hljs-keyword">var</span> storeAs = <span class="hljs-string">&apos;&apos;</span> <span class="hljs-comment">// &#x4F20;&#x5230;oss&#x4E0A;&#x7684;&#x540D;&#x5B57;</span>
    <span class="hljs-comment">// &#x8C03;&#x7528;&#x4E0A;&#x4F20;&#x65B9;&#x6CD5;</span>
    that.client.multipartUpload(<span class="hljs-string">&apos;cloudStorage/&apos;</span> + storeAs, _file, {
      <span class="hljs-attr">progress</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">percentage</span>) </span>{
        <span class="hljs-keyword">let</span> fileloadingNum = <span class="hljs-built_in">Math</span>.ceil(percentage * <span class="hljs-number">100</span>) + <span class="hljs-string">&apos;%&apos;</span>
        <span class="hljs-built_in">console</span>.log(fileloadingNum) <span class="hljs-comment">// &#x4E0A;&#x4F20;&#x6587;&#x4EF6;&#x8FDB;&#x5EA6;</span>
      }
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">result</span>) </span>{
      <span class="hljs-comment">// &#x8C03;&#x7528;&#x540E;&#x53F0;&#x6DFB;&#x52A0;&#x6587;&#x4EF6;&#x7684;&#x63A5;&#x53E3;</span>
      <span class="hljs-keyword">let</span> url = <span class="hljs-string">&apos;netdisc.addDoc&apos;</span>
      <span class="hljs-keyword">let</span> params = {
        <span class="hljs-attr">data</span>: <span class="hljs-string">&apos;xx&apos;</span>
      }
      that.$api.send(url, params).then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (response.status === <span class="hljs-number">200</span>) {
          <span class="hljs-comment">// &#x4E0A;&#x4F20;&#x6210;&#x529F;</span>
        }
      })
    }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
      <span class="hljs-comment">// &#x4E0A;&#x4F20;&#x5931;&#x8D25;,&#x5F39;&#x51FA;&#x4E0A;&#x4F20;&#x5931;&#x8D25;&#x7684;&#x6D88;&#x606F;</span>
    })
  }
}</code></pre><p>&#x5982;&#x679C;&#x4F20;&#x5230;&#x963F;&#x91CC;&#x4E91;&#x7684;&#x56FE;&#x7247;&#x8981;&#x5C55;&#x793A;&#x51FA;&#x6765;,&#x8981;&#x5728;src&#x7684;&#x56FE;&#x7247;&#x8DEF;&#x5F84;&#x540E;&#x9762;&#x52A0;&#x4E0A;&#x963F;&#x91CC;&#x4E91;&#x540E;&#x7F00;,&#x8FD9;&#x6837;&#x7528;&#x82F9;&#x679C;&#x624B;&#x673A;&#x62CD;&#x7684;&#x7167;&#x7247;&#x5C31;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x56FE;&#x7247;&#x7FFB;&#x8F6C;&#x7684;&#x95EE;&#x9898;,&#x50CF;&#x8FD9;&#x6837;<br><strong>xxx.JPG?x-oss-process=image/auto-orient,1/resize,m_fill,w_1600</strong></p><p>&#x5982;&#x679C;&#x56FE;&#x7247;&#x8981;&#x7528;canvas&#x505A;&#x538B;&#x7F29;, &#x5F97;&#x5230;&#x7684;&#x662F;base64&#x6570;&#x636E;&#xFF0C;&#x8981;&#x8F6C;&#x6362;&#x6210;blob&#x5BF9;&#x8C61;&#xFF0C;&#x518D;&#x8F6C;&#x4E3A;buffer&#x6D41;&#x3002;&#x7528;put&#x4E0A;&#x4F20;<br>&#x6709;&#x4E9B;&#x624B;&#x673A;&#x4E0D;&#x652F;&#x6301;canvas&#x76F4;&#x63A5;&#x8F6C;&#x4E3A;blob&#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x5F15;&#x5165;canvas-to-blob.min.js &#x5C06;canvas&#x8F6C;&#x4E3A;blob&#x5BF9;&#x8C61;<br>blob&#x63D2;&#x4EF6;&#x5730;&#x5740;: <a href="https://github.com/blueimp/JavaScript-Canvas-to-Blob" rel="nofollow noreferrer" target="_blank">https://github.com/blueimp/Ja...</a><br>&#x83B7;&#x5F97;&#x56FE;&#x7247;&#x7684;&#x65B9;&#x5411;&#xFF0C;&#x5F15;&#x5165;exif.js<br>exif.js &#x5B98;&#x7F51;&#x5730;&#x5740; <a href="http://code.ciaoca.com/javascript/exif-js/" rel="nofollow noreferrer" target="_blank">http://code.ciaoca.com/javasc...</a><br>&#x9879;&#x76EE;&#x4E2D;&#x90FD;&#x662F;&#x7528;&lt;script&gt;&#x6807;&#x7B7E;&#x76F4;&#x63A5;&#x5728;index.html&#x4E2D;&#x5F15;&#x7528;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  pushFile (file) {
    let that = this
    if ([&apos;jpeg&apos;, &apos;png&apos;, &apos;jpg&apos;].indexOf(file.type.split(&apos;/&apos;)[1]) &lt; 0) {
      alert(&apos;&#x53EA;&#x652F;&#x6301;jpg/png&#x683C;&#x5F0F;&#x7684;&#x56FE;&#x7247;&apos;)
      return false
    }
    // orient=&gt;&#x7167;&#x7247;&#x7684;&#x89D2;&#x5EA6;
    /* global EXIF */
    let orient
    EXIF.getData(file, function () {
      orient = EXIF.getTag(this, &apos;Orientation&apos;)
    })
    // &#x538B;&#x7F29;&#x56FE;&#x7247;&#x9700;&#x8981;&#x7684;&#x4E00;&#x4E9B;&#x5143;&#x7D20;&#x548C;&#x5BF9;&#x8C61;
    let reader = new FileReader()
    let img = new Image()
    // &#x9009;&#x62E9;&#x5F97;&#x662F;&#x56FE;&#x7247;
    if (file.type.indexOf(&apos;image&apos;) === 0) {
      reader.readAsDataURL(file)
    }
    // &#x7F29;&#x653E;&#x56FE;&#x7247;&#x9700;&#x8981;&#x7684;canvas
    let canvas = document.createElement(&apos;canvas&apos;)
    let context = canvas.getContext(&apos;2d&apos;)
    // base64 &#x5730;&#x5740;&#x52A0;&#x8F7D;&#x5B8C;&#x540E;
    img.onload = function () {
      // &#x56FE;&#x7247;&#x539F;&#x59CB;&#x5C3A;&#x5BF8;
      let originWidth = this.width
      let oringinHeight = this.height
      // &#x6700;&#x5927;&#x5C3A;&#x5BF8;&#x9650;&#x5236;
      let maxWidth = 800
      let maxHeight = 800
      // &#x76EE;&#x6807;&#x5C3A;&#x5BF8;
      let targetWidth = originWidth
      let targetHeight = oringinHeight
      // &#x56FE;&#x7247;&#x5C3A;&#x5BF8;&#x8D85;&#x8FC7;800x800&#x7684;&#x9650;&#x5236;
      if (originWidth &gt; maxWidth || oringinHeight &gt; maxHeight) {
        if (originWidth / oringinHeight &gt; maxWidth / maxHeight) {
          // &#x66F4;&#x5BBD;
          targetWidth = maxWidth
          targetHeight = Math.round(maxWidth * (oringinHeight / originWidth))
        } else {
          targetHeight = maxHeight
          targetWidth = Math.round(maxHeight * (originWidth / oringinHeight))
        }
      }
      // canvas &#x5BF9;&#x56FE;&#x7247;&#x8FDB;&#x884C;&#x7F29;&#x653E;
      canvas.width = targetWidth
      canvas.height = targetHeight
      // &#x6E05;&#x9664;&#x753B;&#x5E03;
      context.clearRect(0, 0, targetWidth, targetHeight)
      // &#x56FE;&#x7247;&#x538B;&#x7F29;
      context.drawImage(img, 0, 0, targetWidth, targetHeight)
      if (orient !== &apos;&apos; &amp;&amp; orient !== 1) {
        // orient === 1&#x662F;&#x6B63;&#x5E38;&#x7684;
          switch (orient) {
            case 6: // &#x9700;&#x8981;&#x987A;&#x65F6;&#x9488;&#x5411;&#x5DE6;90&#x5EA6;&#x65CB;&#x8F6C;
              that.rotateImg(img, &apos;left&apos;, canvas, targetWidth, targetHeight)
              break
            case 8: // &#x9700;&#x8981;&#x9006;&#x65F6;&#x9488;&#x5411;&#x53F3;90&#x5EA6;&#x65CB;&#x8F6C;
              that.rotateImg(img, &apos;right&apos;, canvas, targetWidth, targetHeight)
              break
            case 3: // &#x9700;&#x8981;180&#x5EA6;&#x65CB;&#x8F6C;
              that.rotateImg(img, &apos;right&apos;, canvas, targetWidth, targetHeight)
              that.rotateImg(img, &apos;right&apos;, canvas, targetWidth, targetHeight)
              break
          }
        }
        if (canvas.toBlob) {
          canvas.toBlob(function (blob) {
            // &#x5728;&#x8FD9;&#x91CC;&#x5B9E;&#x73B0;&#x4E0A;&#x4F20;&#x64CD;&#x4F5C;
            let reader2 = new FileReader()
            reader2.readAsArrayBuffer(blob)
            reader2.onload = function (event) {
              let buffer = new OSS.Buffer(event.target.result)
              that.client.put(storeAs, buffer).then((result) =&gt; {
                if (result.url) {
                  // &#x83B7;&#x5F97;&#x56FE;&#x7247;&#x5730;&#x5740;
                  that.src= result.url
                }
              }).catch((err) =&gt; {
                console.log(err)
                alert(&apos;&#x4E0A;&#x4F20;&#x5931;&#x8D25;, &#x8BF7;&#x91CD;&#x65B0;&#x4E0A;&#x4F20;&apos;)
              })
            }
          }, file.type || &apos;image/png&apos;)
        }
      }
    rotateImg (img, direction, canvas, targetWidth, targetHeight) {
      // &#x6700;&#x5C0F;&#x4E0E;&#x6700;&#x5927;&#x65CB;&#x8F6C;&#x65B9;&#x5411;&#xFF0C;&#x56FE;&#x7247;&#x65CB;&#x8F6C;4&#x6B21;&#x540E;&#x56DE;&#x5230;&#x539F;&#x65B9;&#x5411;
      var minstep = 0
      var maxstep = 3
      if (img === null) return
      // img&#x7684;&#x9AD8;&#x5EA6;&#x548C;&#x5BBD;&#x5EA6;&#x4E0D;&#x80FD;&#x5728;img&#x5143;&#x7D20;&#x9690;&#x85CF;&#x540E;&#x83B7;&#x53D6;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x51FA;&#x9519;
      var step = 2
      if (step === null) {
        step = minstep
      }
      if (direction === &apos;right&apos;) {
        step++
        // &#x65CB;&#x8F6C;&#x5230;&#x539F;&#x4F4D;&#x7F6E;&#xFF0C;&#x5373;&#x8D85;&#x8FC7;&#x6700;&#x5927;&#x503C;
        step &gt; maxstep &amp;&amp; (step = minstep)
      } else {
        step--
        step &lt; minstep &amp;&amp; (step = maxstep)
      }
      // &#x65CB;&#x8F6C;&#x89D2;&#x5EA6;&#x4EE5;&#x5F27;&#x5EA6;&#x503C;&#x4E3A;&#x53C2;&#x6570;
      let degree = step * 90 * Math.PI / 180
      var ctx = canvas.getContext(&apos;2d&apos;)
      switch (step) {
        case 0:
          canvas.width = targetWidth
          canvas.height = targetHeight
          ctx.clearRect(0, 0, targetWidth, targetHeight)
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
          break
        case 1:
          canvas.width = targetHeight
          canvas.height = targetWidth
          ctx.rotate(degree)
          ctx.clearRect(0, 0, targetHeight, targetWidth)
          ctx.drawImage(img, 0, -targetHeight, targetWidth, targetHeight)
          break
        case 2:
          canvas.width = targetWidth
          canvas.height = targetHeight
          ctx.rotate(degree)
          ctx.clearRect(0, 0, targetWidth, targetHeight)
          ctx.drawImage(img, -targetWidth, -targetHeight, targetWidth, targetHeight)
          break
        case 3:
          canvas.width = targetHeight
          canvas.height = targetWidth
          ctx.rotate(degree)
          ctx.clearRect(0, 0, targetHeight, targetWidth)
          ctx.drawImage(img, -targetHeight, 0, targetWidth, targetHeight)
          break
      }
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  pushFile (file) {
    <span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">if</span> ([<span class="hljs-string">&apos;jpeg&apos;</span>, <span class="hljs-string">&apos;png&apos;</span>, <span class="hljs-string">&apos;jpg&apos;</span>].indexOf(file.type.split(<span class="hljs-string">&apos;/&apos;</span>)[<span class="hljs-number">1</span>]) &lt; <span class="hljs-number">0</span>) {
      alert(<span class="hljs-string">&apos;&#x53EA;&#x652F;&#x6301;jpg/png&#x683C;&#x5F0F;&#x7684;&#x56FE;&#x7247;&apos;</span>)
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
    <span class="hljs-comment">// orient=&gt;&#x7167;&#x7247;&#x7684;&#x89D2;&#x5EA6;</span>
    <span class="hljs-comment">/* global EXIF */</span>
    <span class="hljs-keyword">let</span> orient
    EXIF.getData(file, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      orient = EXIF.getTag(<span class="hljs-keyword">this</span>, <span class="hljs-string">&apos;Orientation&apos;</span>)
    })
    <span class="hljs-comment">// &#x538B;&#x7F29;&#x56FE;&#x7247;&#x9700;&#x8981;&#x7684;&#x4E00;&#x4E9B;&#x5143;&#x7D20;&#x548C;&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">let</span> reader = <span class="hljs-keyword">new</span> FileReader()
    <span class="hljs-keyword">let</span> img = <span class="hljs-keyword">new</span> Image()
    <span class="hljs-comment">// &#x9009;&#x62E9;&#x5F97;&#x662F;&#x56FE;&#x7247;</span>
    <span class="hljs-keyword">if</span> (file.type.indexOf(<span class="hljs-string">&apos;image&apos;</span>) === <span class="hljs-number">0</span>) {
      reader.readAsDataURL(file)
    }
    <span class="hljs-comment">// &#x7F29;&#x653E;&#x56FE;&#x7247;&#x9700;&#x8981;&#x7684;canvas</span>
    <span class="hljs-keyword">let</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;canvas&apos;</span>)
    <span class="hljs-keyword">let</span> context = canvas.getContext(<span class="hljs-string">&apos;2d&apos;</span>)
    <span class="hljs-comment">// base64 &#x5730;&#x5740;&#x52A0;&#x8F7D;&#x5B8C;&#x540E;</span>
    img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// &#x56FE;&#x7247;&#x539F;&#x59CB;&#x5C3A;&#x5BF8;</span>
      <span class="hljs-keyword">let</span> originWidth = <span class="hljs-keyword">this</span>.width
      <span class="hljs-keyword">let</span> oringinHeight = <span class="hljs-keyword">this</span>.height
      <span class="hljs-comment">// &#x6700;&#x5927;&#x5C3A;&#x5BF8;&#x9650;&#x5236;</span>
      <span class="hljs-keyword">let</span> maxWidth = <span class="hljs-number">800</span>
      <span class="hljs-keyword">let</span> maxHeight = <span class="hljs-number">800</span>
      <span class="hljs-comment">// &#x76EE;&#x6807;&#x5C3A;&#x5BF8;</span>
      <span class="hljs-keyword">let</span> targetWidth = originWidth
      <span class="hljs-keyword">let</span> targetHeight = oringinHeight
      <span class="hljs-comment">// &#x56FE;&#x7247;&#x5C3A;&#x5BF8;&#x8D85;&#x8FC7;800x800&#x7684;&#x9650;&#x5236;</span>
      <span class="hljs-keyword">if</span> (originWidth &gt; maxWidth || oringinHeight &gt; maxHeight) {
        <span class="hljs-keyword">if</span> (originWidth / oringinHeight &gt; maxWidth / maxHeight) {
          <span class="hljs-comment">// &#x66F4;&#x5BBD;</span>
          targetWidth = maxWidth
          targetHeight = <span class="hljs-built_in">Math</span>.round(maxWidth * (oringinHeight / originWidth))
        } <span class="hljs-keyword">else</span> {
          targetHeight = maxHeight
          targetWidth = <span class="hljs-built_in">Math</span>.round(maxHeight * (originWidth / oringinHeight))
        }
      }
      <span class="hljs-comment">// canvas &#x5BF9;&#x56FE;&#x7247;&#x8FDB;&#x884C;&#x7F29;&#x653E;</span>
      canvas.width = targetWidth
      canvas.height = targetHeight
      <span class="hljs-comment">// &#x6E05;&#x9664;&#x753B;&#x5E03;</span>
      context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, targetWidth, targetHeight)
      <span class="hljs-comment">// &#x56FE;&#x7247;&#x538B;&#x7F29;</span>
      context.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, targetWidth, targetHeight)
      <span class="hljs-keyword">if</span> (orient !== <span class="hljs-string">&apos;&apos;</span> &amp;&amp; orient !== <span class="hljs-number">1</span>) {
        <span class="hljs-comment">// orient === 1&#x662F;&#x6B63;&#x5E38;&#x7684;</span>
          <span class="hljs-keyword">switch</span> (orient) {
            <span class="hljs-keyword">case</span> <span class="hljs-number">6</span>: <span class="hljs-comment">// &#x9700;&#x8981;&#x987A;&#x65F6;&#x9488;&#x5411;&#x5DE6;90&#x5EA6;&#x65CB;&#x8F6C;</span>
              that.rotateImg(img, <span class="hljs-string">&apos;left&apos;</span>, canvas, targetWidth, targetHeight)
              <span class="hljs-keyword">break</span>
            <span class="hljs-keyword">case</span> <span class="hljs-number">8</span>: <span class="hljs-comment">// &#x9700;&#x8981;&#x9006;&#x65F6;&#x9488;&#x5411;&#x53F3;90&#x5EA6;&#x65CB;&#x8F6C;</span>
              that.rotateImg(img, <span class="hljs-string">&apos;right&apos;</span>, canvas, targetWidth, targetHeight)
              <span class="hljs-keyword">break</span>
            <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>: <span class="hljs-comment">// &#x9700;&#x8981;180&#x5EA6;&#x65CB;&#x8F6C;</span>
              that.rotateImg(img, <span class="hljs-string">&apos;right&apos;</span>, canvas, targetWidth, targetHeight)
              that.rotateImg(img, <span class="hljs-string">&apos;right&apos;</span>, canvas, targetWidth, targetHeight)
              <span class="hljs-keyword">break</span>
          }
        }
        <span class="hljs-keyword">if</span> (canvas.toBlob) {
          canvas.toBlob(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">blob</span>) </span>{
            <span class="hljs-comment">// &#x5728;&#x8FD9;&#x91CC;&#x5B9E;&#x73B0;&#x4E0A;&#x4F20;&#x64CD;&#x4F5C;</span>
            <span class="hljs-keyword">let</span> reader2 = <span class="hljs-keyword">new</span> FileReader()
            reader2.readAsArrayBuffer(blob)
            reader2.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
              <span class="hljs-keyword">let</span> buffer = <span class="hljs-keyword">new</span> OSS.Buffer(event.target.result)
              that.client.put(storeAs, buffer).then(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
                <span class="hljs-keyword">if</span> (result.url) {
                  <span class="hljs-comment">// &#x83B7;&#x5F97;&#x56FE;&#x7247;&#x5730;&#x5740;</span>
                  that.src= result.url
                }
              }).catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(err)
                alert(<span class="hljs-string">&apos;&#x4E0A;&#x4F20;&#x5931;&#x8D25;, &#x8BF7;&#x91CD;&#x65B0;&#x4E0A;&#x4F20;&apos;</span>)
              })
            }
          }, file.type || <span class="hljs-string">&apos;image/png&apos;</span>)
        }
      }
    rotateImg (img, direction, canvas, targetWidth, targetHeight) {
      <span class="hljs-comment">// &#x6700;&#x5C0F;&#x4E0E;&#x6700;&#x5927;&#x65CB;&#x8F6C;&#x65B9;&#x5411;&#xFF0C;&#x56FE;&#x7247;&#x65CB;&#x8F6C;4&#x6B21;&#x540E;&#x56DE;&#x5230;&#x539F;&#x65B9;&#x5411;</span>
      <span class="hljs-keyword">var</span> minstep = <span class="hljs-number">0</span>
      <span class="hljs-keyword">var</span> maxstep = <span class="hljs-number">3</span>
      <span class="hljs-keyword">if</span> (img === <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span>
      <span class="hljs-comment">// img&#x7684;&#x9AD8;&#x5EA6;&#x548C;&#x5BBD;&#x5EA6;&#x4E0D;&#x80FD;&#x5728;img&#x5143;&#x7D20;&#x9690;&#x85CF;&#x540E;&#x83B7;&#x53D6;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x51FA;&#x9519;</span>
      <span class="hljs-keyword">var</span> step = <span class="hljs-number">2</span>
      <span class="hljs-keyword">if</span> (step === <span class="hljs-literal">null</span>) {
        step = minstep
      }
      <span class="hljs-keyword">if</span> (direction === <span class="hljs-string">&apos;right&apos;</span>) {
        step++
        <span class="hljs-comment">// &#x65CB;&#x8F6C;&#x5230;&#x539F;&#x4F4D;&#x7F6E;&#xFF0C;&#x5373;&#x8D85;&#x8FC7;&#x6700;&#x5927;&#x503C;</span>
        step &gt; maxstep &amp;&amp; (step = minstep)
      } <span class="hljs-keyword">else</span> {
        step--
        step &lt; minstep &amp;&amp; (step = maxstep)
      }
      <span class="hljs-comment">// &#x65CB;&#x8F6C;&#x89D2;&#x5EA6;&#x4EE5;&#x5F27;&#x5EA6;&#x503C;&#x4E3A;&#x53C2;&#x6570;</span>
      <span class="hljs-keyword">let</span> degree = step * <span class="hljs-number">90</span> * <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">180</span>
      <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">&apos;2d&apos;</span>)
      <span class="hljs-keyword">switch</span> (step) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
          canvas.width = targetWidth
          canvas.height = targetHeight
          ctx.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, targetWidth, targetHeight)
          ctx.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, targetWidth, targetHeight)
          <span class="hljs-keyword">break</span>
        <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
          canvas.width = targetHeight
          canvas.height = targetWidth
          ctx.rotate(degree)
          ctx.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, targetHeight, targetWidth)
          ctx.drawImage(img, <span class="hljs-number">0</span>, -targetHeight, targetWidth, targetHeight)
          <span class="hljs-keyword">break</span>
        <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
          canvas.width = targetWidth
          canvas.height = targetHeight
          ctx.rotate(degree)
          ctx.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, targetWidth, targetHeight)
          ctx.drawImage(img, -targetWidth, -targetHeight, targetWidth, targetHeight)
          <span class="hljs-keyword">break</span>
        <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
          canvas.width = targetHeight
          canvas.height = targetWidth
          ctx.rotate(degree)
          ctx.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, targetHeight, targetWidth)
          ctx.drawImage(img, -targetHeight, <span class="hljs-number">0</span>, targetWidth, targetHeight)
          <span class="hljs-keyword">break</span>
      }
    }
  }</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue前端上传文件到阿里云oss的两种方式，put文件流上传，multipartUpload直接上传

## 原文链接
[https://segmentfault.com/a/1190000015545333](https://segmentfault.com/a/1190000015545333)


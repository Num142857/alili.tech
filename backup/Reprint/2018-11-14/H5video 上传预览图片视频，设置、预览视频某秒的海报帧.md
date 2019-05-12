---
title: H5video 上传预览图片视频，设置、预览视频某秒的海报帧
hidden: true
categories: [reprint]
slug: 4214947a
date: 2018-11-14 02:30:09
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbfZhC?w=206&amp;h=162" src="https://static.alili.tech/img/bVbfZhC?w=206&amp;h=162" alt="clipboard.png" title="clipboard.png"></span></p><p>&#x5F53;&#x4E00;&#x6536;&#x5230;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x89C6;&#x9891;&#x5E76;&#x53EF;&#x4EE5;&#x52A8;&#x6001;&#x8BBE;&#x7F6E;&#x89C6;&#x9891;&#x663E;&#x793A;&#x7684;&#x6D77;&#x62A5;&#x5E27;&#x7684;&#x9700;&#x6C42;&#x65F6;&#xFF0C;&#x4E3B;&#x8981;&#x60F3;&#x7684;&#x662F;&#x600E;&#x4E48;&#x6837;&#x89E3;&#x6790;&#x89C6;&#x9891;&#x5E76;&#x83B7;&#x53D6;&#x4FDD;&#x5B58;&#x6BCF;&#x5E27;&#x7684;&#x56FE;&#x7247;&#xFF0C;&#x767E;&#x5EA6;&#x51FA;&#x6765;&#x7684;&#x5927;&#x591A;&#x662F;&#x7C7B;&#x4F3C;&#x4E0B;&#x9762;&#x8FD9;&#x79CD;&#x9700;&#x8981;&#x64AD;&#x653E;video&#x5E76;&#x70B9;&#x51FB;&#x622A;&#x56FE;&#x7684;&#xFF0C;&#x6216;&#x8005;&#x662F;&#x7528;php ffmpeg&#x6269;&#x5C55;&#xFF0C;&#x8DDF;&#x9700;&#x6C42;&#x4E0D;&#x4E00;&#x81F4;&#xFF0C;&#x6709;&#x70B9;&#x6293;&#x72C2;&#x4E86;&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x5148;&#x505A;&#x4E86;&#x89C6;&#x9891;&#x56FE;&#x7247;&#x7684;&#x9884;&#x89C8;&#x529F;&#x80FD;&#xFF0C;&#x8FDB;&#x800C;&#x5BF9;&#x8BBE;&#x7F6E;&#x6D77;&#x62A5;&#x5E27;&#x6362;&#x4E86;&#x79CD;&#x601D;&#x8DEF;&#xFF0C;&#x901A;&#x8FC7;&#x8F93;&#x5165;&#x8BBE;&#x7F6E;video&#x5F00;&#x59CB;&#x64AD;&#x653E;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x53D6;&#x6D88;&#x81EA;&#x52A8;&#x64AD;&#x653E;&#x548C;&#x63A7;&#x5236;&#x6761;&#xFF0C;&#x8FD9;&#x6837;&#x7528;&#x6237;&#x770B;&#x5230;&#x7684;&#x5C31;&#x662F;&#x4E00;&#x5F20;&#x56FE;&#x7247;</p><pre><code> /*&#x9884;&#x89C8;*/
              
$(&apos;.qtuploader__items&apos;).on(&apos;click&apos;, &apos;[name=&quot;viewVideoPicBtn&quot;]&apos;, function() {
    var parent = $(this).closest(&apos;.qtab__page&apos;);
    var video = $(this).closest(&apos;.qtuploader__itemsbd&apos;).find(&apos;video&apos;);
    var srcStr = &apos;&apos;, htmlStr = &apos;&apos;;
    if($(this).siblings(&apos;.qtuploader__picinputbox&apos;).hasClass(&apos;is-error&apos;)){
      $.fn.toast({
        &apos;parentDom&apos;: parent,
        &apos;classes&apos;: &apos;isorange&apos;,
        &apos;top&apos;: &apos;0&apos;,
        &apos;spacing&apos;: 0,
        &apos;toastContent&apos;: &apos;&#x8BF7;&#x8BBE;&#x7F6E;&#x6B63;&#x786E;&#x8303;&#x56F4;&#x7684;&#x6D77;&#x62A5;&#x5E27;&apos;,
        &apos;autoHide&apos;: 3000,
        &apos;position&apos;: {
          &apos;top&apos;: &apos;5px&apos;,
          &apos;left&apos;: &apos;50%&apos;
        }
      });
      return;
    }
    if (video.length &gt; 0) {
      var thumbHeight = setSize(video)[0];
      var thumbWidth = setSize(video)[1];
      srcStr = video.attr(&apos;src&apos;);
      htmlStr = &apos;&lt;div class=&quot;qtuploader__view&quot;&gt;&lt;div class=&quot;qtuploader__mask&quot;&gt;&lt;/div&gt;&lt;div class=&quot;qtuploader__thumb&quot; style=&quot;width:&apos; + thumbWidth + &apos;px;height:&apos; + thumbHeight + &apos;px;margin:0 auto;&quot;&gt;&lt;video controls width=&quot;&apos; + thumbWidth + &apos;&quot; height=&quot;&apos; + thumbHeight + &apos;&quot; src=&quot;&apos; + srcStr + &apos;&quot;&gt;&#x60A8;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x652F;&#x6301; video &#x6807;&#x7B7E;&lt;/video&gt;&lt;/div&gt;&lt;/div&gt;&apos;;
    }
    parent.append(htmlStr);
    parent.find(&apos;.qtuploader__view video&apos;)[0].currentTime = $(this).siblings(&apos;.qtuploader__picinputbox&apos;).find(&apos;.qtuploader__picinput&apos;).val();
    parent.find(&apos;.qtuploader__view&apos;).fadeIn();
  });
  
  /*&#x8BBE;&#x7F6E;&#x6D77;&#x62A5;&#x5E27;&#x9884;&#x89C8;&#x65F6;&#x95F4;*/
  $(&apos;.qtuploader__items&apos;).on(&apos;keyup&apos;, &apos;.qtuploader__picinput&apos;, function() {
    var parent = $(this).closest(&apos;.qtuploader__picinputbox&apos;);
    var video = $(this).closest(&apos;.qtuploader__itemsbd&apos;).find(&apos;video&apos;);
    var strVal = $.trim($(this).val());
    console.log(strVal)
    if (strVal == &apos;&apos;) {
      parent.addClass(&apos;is-error&apos;);
      parent.find(&apos;.qverify__font&apos;).text(&apos;&#x8BF7;&#x8BBE;&#x7F6E;&#x6D77;&#x62A5;&#x5E27;&apos;);
    } else if (!(/^[0-9]*$/.test(strVal))) {
      parent.addClass(&apos;is-error&apos;);
      parent.find(&apos;.qverify__font&apos;).text(&apos;&#x8BF7;&#x8F93;&#x5165;&#x6570;&#x5B57;&apos;);
    } else if (video.length &gt; 0 &amp;&amp; strVal &gt; video[0].duration) {
      parent.addClass(&apos;is-error&apos;);
      parent.find(&apos;.qverify__font&apos;).text(&apos;&#x4E0D;&#x8D85;&#x8FC7;(&apos; + video[0].duration + &apos;)&apos;);
      console.log(&apos;111---&apos; + video[0].duration)
    } else {
      parent.removeClass(&apos;is-error&apos;);
      parent.find(&apos;.qverify__font&apos;).text(&apos;&#x8BF7;&#x8BBE;&#x7F6E;&#x6D77;&#x62A5;&#x5E27;&apos;);
    }
  })
  /*&#x5173;&#x95ED;&#x9884;&#x89C8;*/
  $(document).undelegate(&apos;.qtuploader__mask&apos;, &apos;click&apos;);
  $(document).delegate(&apos;.qtuploader__mask&apos;, &apos;click&apos;, function() {
    $(this).closest(&apos;.qtuploader__view&apos;).fadeOut(&apos;normal&apos;, function() {
      $(this).closest(&apos;.qtuploader__view&apos;).remove();
    })
  })
  /*&#x8BBE;&#x7F6E;&#x9884;&#x89C8;&#x5927;&#x5C0F;*/
  function setSize(element) {
    var thumbWidth = 0, thumbHeight = 0, arr = [];
    var winWidth = $(window).width(), winHeight = $(window).height();
    var imgWidth = element.width(), imgHeight = element.height();
    if (imgWidth &gt; imgHeight) {
      thumbHeight = parseInt(winHeight - 200);
      thumbWidth = parseInt((1920 * thumbHeight) / 1080);
    } else {
      thumbHeight = parseInt(winHeight - 200);
      thumbWidth = parseInt((1080 * thumbHeight) / 1920);
    }
    arr.push(thumbHeight, thumbWidth)
    return arr;
  }
</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
H5video 上传预览图片视频，设置、预览视频某秒的海报帧

## 原文链接
[https://segmentfault.com/a/1190000016164517](https://segmentfault.com/a/1190000016164517)


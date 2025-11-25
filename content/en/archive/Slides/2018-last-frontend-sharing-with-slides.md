---
title: 2018 Last Frontend Sharing (Slides Provided)
tags: [Slides]
slug: unui11c01ml
keywords: Training,Sharing,Frontend Sharing,Knowledge Sharing
date: 2018-12-13 21:32:05
---

{{< safeHTML >}}
<script src='/js/lazyload.js'></script>
<script>
    $(function(){
      let str = ""
      for(var i = 2;i<=81;i++){
          var count ="";
          if(i<10){
              count = "00"+ i;
          }else if(i<100&&i>=10){
               count = "0"+ i;
          }
          
          str = str + '<img class="lazyload" data-src="https://static.alili.tech/images/slides/vueConfSlides/vueConfSlides.'+ count +'.jpeg" style="margin-bottom:10px" src="/images/squares.svg" />'
      }
      $('.imageBox').html(str)
      var images = document.querySelectorAll(".lazyload");
      lazyload(images);
    })
</script>
<div class='imageBox'></div>
{{< /safeHTML >}}


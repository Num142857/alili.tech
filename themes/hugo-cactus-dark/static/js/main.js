if (!!$.prototype.justifiedGallery) { // if justifiedGallery method is defined
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: 'justify'
  };
  $('.article-gallery').justifiedGallery(options);
}

$(document).ready(function () {
  $("#menu > #nav").show();
  $("#menu-icon, #menu-icon-tablet").click(function () {
    if ($('#menu').css('visibility') == 'hidden') {
      $('#menu').css('visibility', 'visible');
      $('#menu-icon, #menu-icon-tablet').addClass('active');

      var topDistance = $("#menu > #nav").offset().top;

      if ($('#menu').css('visibility') != 'hidden' && topDistance < 50) {
        $("#menu > #nav").show();
      } else if ($('#menu').css('visibility') != 'hidden' && topDistance > 100) {
        $("#menu > #nav").hide();
      }
      return false;
    } else {
      $('#menu').css('visibility', 'hidden');
      $('#menu-icon, #menu-icon-tablet').removeClass('active');
      return false;
    }
  });

  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
  $("#header > #nav > ul > .icon").click(function () {
    $("#header > #nav > ul").toggleClass("responsive");
  });

  if ($("#menu").length) {
    $(window).on('scroll', function () {
      var topDistance = $("#menu > #nav").offset().top;

      if ($('#menu').css('visibility') != 'hidden' && topDistance < 50) {
        $("#menu > #nav").show();
      } else if ($('#menu').css('visibility') != 'hidden' && topDistance > 100) {
        $("#menu > #nav").hide();
      }

      if (!$("#menu-icon").is(":visible") && topDistance < 50) {
        $("#menu-icon-tablet").show();
        $("#top-icon-tablet").hide();
      } else if (!$("#menu-icon").is(":visible") && topDistance > 100) {
        $("#menu-icon-tablet").hide();
        $("#top-icon-tablet").show();
      }
    });
  }

  if ($("#footer-post").length) {
    var lastScrollTop = 0;
    $(window).on('scroll', function () {
      var topDistance = $(window).scrollTop();

      if (topDistance > lastScrollTop) {
        // downscroll code
        $("#footer-post").hide();
      } else {
        // upscroll code
        $("#footer-post").show();
      }
      lastScrollTop = topDistance;

      $("#nav-footer").hide();
      $("#toc-footer").hide();
      $("#share-footer").hide();

      if (topDistance < 50) {
        $("#actions-footer > ul > #top").hide();
        $("#actions-footer > ul > #menu").show();
      } else if (topDistance > 100) {
        $("#actions-footer > ul > #menu").hide();
        $("#actions-footer > ul > #top").show();
      }
    });
  }
});

$(function () {
  if(location.pathname !=='/') return;
  setTimeout(function () {
    $.get("/data/shanbayToday.json", function (data) {
      var data = data.data;
      var str = data.content;
      print(data.content, ".description .en", function () {
        print(data.translation, ".description .ch", function () {
          print("---- " + data.author, ".description .author", function () {
            // document.querySelector('.description .ad-text').classList.add("show")
            // print("p.s. 网站已经支持PWA,可尝试添加到桌面", ".description .ad-text", function () {})
          })
        })
      })
    })
  }, 150);

  function print(str, target, callback) {
    var content = "";
    var index = 0;
    var timerLoop = function(){
      var randomNum = parseInt(Math.random()*30+10);
      var timer = setTimeout(function () {
        if (index >= str.length) {
          clearInterval(timer);
          $(target).html(content);
          if (callback) callback();
          return
        }else{
          timerLoop()
        }
        content += str[index];
        index++;
        $(target).html(content + "<span style='color:#2bbc8a'>▌</span>")
      }, randomNum);
    }

    timerLoop()
  }
});

// (function () {
//   var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
//   document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_1274673764'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s22.cnzz.com/z_stat.php%3Fid%3D1274673764%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));
// })()

var _mtac = {};
(function() {
    var mta = document.createElement("script");
    mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.2";
    mta.setAttribute("name", "MTAH5");
    mta.setAttribute("sid", "500643908");
    var s = document.getElementsByTagName("script")[0];
    if(window.location.host=="localhost:4000")return;
    s.parentNode.insertBefore(mta, s);
})();

// Notification.requestPermission().then(function(permission) {
//   if(permission === 'granted'){
//       console.log('用户允许通知');
//   }else if(permission === 'denied'){
//       console.log('用户拒绝通知');
//   }
// });

//  toc 里面是a标签问题
$(function(){
  if($("#toc li a")){
    $("#toc a").each(function(index){
      var ele = $(this);
      if(ele.attr('href').indexOf('http') != -1){
        ele.attr('href',ele.prev().attr('href'))
      }
    })
  }
  
})

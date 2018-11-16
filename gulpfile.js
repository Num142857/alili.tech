var gulp = require("gulp");
const htmlmin = require('gulp-htmlmin');
var fs = require('fs');
const xml2js = require('xml2js')
var parser = new xml2js.Parser();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var xz_appid = '1613049289050283';
var xz_token = 'PEQAd9p3kMBAzNjY';
var baidu_token= 'QsL3LjB4I2GLWGbj' 

gulp.task('minify', () => {
    return gulp.src('public/**/*.html')
      .pipe(htmlmin({ 
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        // collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        // removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        // removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        // removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        // minifyCSS: true//压缩页面CSS
       }))
      .pipe(gulp.dest('public'));
  });

gulp.task('seo', () => {
    fs.readFile(__dirname + '/public/sitemap.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            
            urlSubmint(result.urlset.url)
            console.log('Done');
        });
    });
  });




function urlSubmint(urls) {
    // 最新内容提交
    var new_target = "http://data.zz.baidu.com/urls?appid="+xz_appid+"&token="+xz_token+"&type=realtime"

    // 百度站长
    var baidu_target = "http://data.zz.baidu.com/urls?site=https://alili.tech&token="+baidu_token

    // 历史提交
    var history_target = "http://data.zz.baidu.com/urls?appid="+xz_appid+"&token="+xz_token+"&type=batch"

    var MIP_target = "http://data.zz.baidu.com/urls?site=https://alili.tech&token=QsL3LjB4I2GLWGbj&type=mip"

    var AMP_target = "http://data.zz.baidu.com/urls?site=https://alili.tech&token=QsL3LjB4I2GLWGbj&type=amp"

    // 最新url,看熊掌号情况而定
    urls = urls.map(item=>item.loc[0])
    urls.length = 35
    var new_urls = urls.join('\n')
    
    console.info('百度站长最新数据开始提交')
    sendData(baidu_target,new_urls,'百度站长提交成功')

    console.info('最新数据开始提交')
    sendData(new_target,new_urls,'最新数据提交完成')

    // 提交历史url 每天最多500w条
    console.info("历史数据开始提交")
    sendData(history_target,new_urls,"历史数据提交完成")

    console.info("MIP 开始提交")
    sendData(MIP_target,new_urls,"MIP提交成功")

    console.info("AMP 开始提交")
    sendData(AMP_target,new_urls,"AMP提交成功")

    function sendData(target,urls,message){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', target, false);
        xhr.setRequestHeader('Content-type', 'text/plain');
        xhr.onload = function () {
            console.log(this.responseText);
            if(message){console.info(message)}
        };
        xhr.send(urls);
    }

};


gulp.task("default",[
    'seo',
    // 'minify'
])
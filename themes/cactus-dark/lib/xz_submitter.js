var pathFn = require('path');
var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function(args) {
    var log = this.log;
    var config = this.config;

    var urlsPath = config.baidu_url_submit.path;
    var xz_appid = config.baidu_url_submit.xz_appid;
    var xz_token = config.baidu_url_submit.xz_token;
    var xz_count = config.baidu_url_submit.xz_count;

    var publicDir = this.public_dir;
    var baiduUrlsFile = pathFn.join(publicDir, 'baidu_urls.txt');
    var urls = fs.readFileSync(baiduUrlsFile, 'utf8');

    

    // 最新内容提交
    var new_target = "http://data.zz.baidu.com/urls?appid="+xz_appid+"&token="+xz_token+"&type=realtime"

    // 历史提交
    var history_target = "http://data.zz.baidu.com/urls?appid="+xz_appid+"&token="+xz_token+"&type=batch"


    var MIP_target = "http://data.zz.baidu.com/urls?site=https://alili.tech&token=QsL3LjB4I2GLWGbj&type=mip"

    var AMP_target = "http://data.zz.baidu.com/urls?site=https://alili.tech&token=QsL3LjB4I2GLWGbj&type=amp"

    
    
    // 最新url,看熊掌号情况而定
    var new_ursl_arr = urls.split('\n');
    new_ursl_arr.length = xz_count
    var new_urls = new_ursl_arr.join('\n')

    log.info('最新数据开始提交')
    sendData(new_target,new_urls,'最新数据提交完成')

    // 提交历史url 每天最多500w条
    log.info("历史数据开始提交")
    sendData(history_target,urls,"历史数据提交完成")

    log.info("MIP 开始提交")
    sendData(MIP_target,urls,"MIP提交成功")

    log.info("AMP 开始提交")
    sendData(AMP_target,urls,"AMP提交成功")

    function sendData(target,urls,message){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', target, false);
        xhr.setRequestHeader('Content-type', 'text/plain');
        xhr.onload = function () {
            console.log(this.responseText);
            if(message){log.info(message)}
        };
        xhr.send(urls);
    }

};
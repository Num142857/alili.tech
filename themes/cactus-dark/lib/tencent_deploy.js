
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function(args) {
    var log = this.log;

    log.info('腾讯服务器开始部署')
    sendData('http://deploy.alili.tech/deploy/blog','腾讯服务器部署完成')

    function sendData(target,message){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', target, false);
        xhr.setRequestHeader('Content-type', 'text/plain');
        xhr.onload = function () {
            console.log(this.responseText);
            if(message){log.info(message)}
        };
        xhr.send();
    }

};
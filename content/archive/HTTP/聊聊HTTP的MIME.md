---
title: 聊聊HTTP的MIME
tags: HTTP
abbrlink: 3b54e2d1
keywords: http,浏览器特性,MIME,格式
date: 2017-07-26 16:14:25
---
## MIME是什么?
MIME(Multipurpose Internet Mail Extensions)多用途互联网邮件扩展类型;


在最早的HTTP协议中,没有附加的数据类型信息.

所有传送的数据都被客户程序解释为超文本标记语言HTML 文档，而为了支持多媒体数据类型，HTTP协议中就使用了附加在文档之前的MIME数据类型信息来标识数据类型。

----

每个MIME类型由两部分组成，前面是数据的大类别，例如声音audio、图象image等，后面定义具体的种类。

## 常见的MIME类型(通用型)：
* 超文本标记语言文本 .html text/html
* xml文档 .xml text/xml
* XHTML文档 .xhtml application/xhtml+xml
* 普通文本 .txt text/plain
* RTF文本 .rtf application/rtf
* PDF文档 .pdf application/pdf
* Microsoft Word文件 .word application/msword
* PNG图像 .png image/png
* GIF图形 .gif image/gif
* JPEG图形 .jpeg,.jpg image/jpeg
* au声音文件 .au audio/basic
* MIDI音乐文件 mid,.midi audio/midi,audio/x-midi
* RealAudio音乐文件 .ra, .ram audio/x-pn-realaudio
* MPEG文件 .mpg,.mpeg video/mpeg
* AVI文件 .avi video/x-msvideo
* GZIP文件 .gz application/x-gzip
* TAR文件 .tar application/x-tar
* 任意的二进制数据 application/octet-stream


## 用于WAP服务器的MIME类型有：
* MRP文件（国内普遍的手机）.mrp application/octet-stream
* IPA文件(IPHONE) .ipa application/iphone-package-archive
* Debian软件包格式 .deb application/x-debian-package-archive
* APK文件(安卓系统) .apk application/vnd.android.package-archive
* CAB文件(Windows Mobile) .cab application/vnd.cab-com-archive
* XAP文件(Windows Phone 7) .xap application/x-silverlight-app
* SIS文件(symbian平台/S60V1) .sis application/vnd.symbian.install-archive *
* SISX文件(symbian平台/S60V3/V5) .sisx application/vnd.symbian.epoc/x-sisx-app
* JAR、JAD文件(JAVA平台手机通用格式) .jar .jad


服务器在发送真正的数据之前，就要先发送标志数据的MIME类型的信息，这个信息使用Content-type关键字进行定义.

```
Content-type: text/html
```
Content-type就是我们经常在 http请求头里 response header看到的那个.

里面包含的就是MIME信息.

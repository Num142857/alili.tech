---
title: Talking About HTTP MIME
tags: [HTTP]
slug: talking-about-http-mime
keywords: http,browser features,MIME,format
date: 2017-07-26 16:14:25
---
## What is MIME?
MIME (Multipurpose Internet Mail Extensions) Multipurpose Internet Mail Extensions;


In the earliest HTTP protocol, there was no additional data type information.

All transmitted data was interpreted by client programs as HTML documents, and to support multimedia data types, the HTTP protocol used MIME data type information attached before documents to identify data types.

----

Each MIME type consists of two parts, the front part is the general category of data, such as audio, image, etc., and the back part defines the specific type.

## Common MIME Types (General):
* HTML text .html text/html
* XML document .xml text/xml
* XHTML document .xhtml application/xhtml+xml
* Plain text .txt text/plain
* RTF text .rtf application/rtf
* PDF document .pdf application/pdf
* Microsoft Word file .word application/msword
* PNG image .png image/png
* GIF image .gif image/gif
* JPEG image .jpeg,.jpg image/jpeg
* au audio file .au audio/basic
* MIDI music file mid,.midi audio/midi,audio/x-midi
* RealAudio music file .ra, .ram audio/x-pn-realaudio
* MPEG file .mpg,.mpeg video/mpeg
* AVI file .avi video/x-msvideo
* GZIP file .gz application/x-gzip
* TAR file .tar application/x-tar
* Arbitrary binary data application/octet-stream


## MIME Types Used for WAP Servers:
* MRP file (common domestic mobile phones).mrp application/octet-stream
* IPA file (IPHONE) .ipa application/iphone-package-archive
* Debian package format .deb application/x-debian-package-archive
* APK file (Android system) .apk application/vnd.android.package-archive
* CAB file (Windows Mobile) .cab application/vnd.cab-com-archive
* XAP file (Windows Phone 7) .xap application/x-silverlight-app
* SIS file (symbian platform/S60V1) .sis application/vnd.symbian.install-archive *
* SISX file (symbian platform/S60V3/V5) .sisx application/vnd.symbian.epoc/x-sisx-app
* JAR, JAD files (JAVA platform mobile phone common format) .jar .jad


Before sending the actual data, the server must first send MIME type information that identifies the data, this information is defined using the Content-type keyword.

```
Content-type: text/html
```
Content-type is what we often see in HTTP request headers' response header.

It contains MIME information.


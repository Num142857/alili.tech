const axios = require('axios');
const fs = require('fs');
const fse = require('fs-extra');
const gulp = require("gulp");
const htmlmin = require('gulp-htmlmin');
const shell = require('gulp-shell');
const workbox = require('workbox-build');
const xml2js = require('xml2js');
const { XMLHttpRequest } = require("xmlhttprequest");
const gulpsync = require('gulp-sync')(gulp);

// Configuration parameters
const xz_appid = '1613049289050283';
const xz_token = 'PEQAd9p3kMBAzNjY';
const baidu_token = 'QsL3LjB4I2GLWGbj';
const urlCount = 75;

const parser = new xml2js.Parser();

gulp.task('minify', () => {
    return gulp.src('public/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('public'));
});

gulp.task('build', () => gulp.src('./').pipe(shell(['hugo --buildFuture'])));

gulp.task('deploy', () => gulp.src('./').pipe(shell(['node oss.js'])));

gulp.task('baiduSeo', async () => {
    const data = fs.readFileSync(__dirname + '/public/sitemap.xml');
    const result = await parser.parseStringPromise(data);
    urlSubmit(result.urlset.url);
});

gulp.task('getTodayData', async () => {
    try {
        const response = await axios.get('https://apiv3.shanbay.com/weapps/dailyquote/quote/');
        fse.writeJsonSync('./static/data/today.json', response.data);
        console.log('今日骚话:', response.data.content);
    } catch (error) {
        console.log('骚话获取失败', error);
    }
});

gulp.task('generate-service-worker', () => {
    return workbox.generateSW({
        globDirectory: './public',
        globPatterns: ['**/*.{woff2,woff,js,css,png.jpg}'],
        globIgnores: ['sw.js'],
        swDest: `./public/sw.js`,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
            {
                urlPattern: /.*\.js/,
                handler: 'networkFirst'
            },
            {
                urlPattern: /.*\.css/,
                handler: 'staleWhileRevalidate',
                options: {
                    plugins: [
                        {
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    ]
                }
            },
            {
                urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
                handler: 'cacheFirst',
                options: {
                    plugins: [
                        {
                            expiration: {
                                maxEntries: 50
                            }
                        }
                    ]
                }
            },
            {
                urlPattern: /.*\.html/,
                handler: 'networkFirst'
            }
        ]
    })
    .then(() => {
        console.info('Service worker generation completed.');
    })
    .catch(error => {
        console.warn('Service worker generation failed: ' + error);
    });
});

gulp.task('sendMessage', async () => {
    let msgUrl = 'https://xizhi.qqoq.net/XZ69d0fc72426ced1c020c56f9b045957e.send';
    let data = {
        title: "Hello Alili 博客部署成功",
        content: `
            世界上 ，没有一拳解决不了的事，
            如果有，那就两拳 
            ——– ONE PUNCH-MAN
        `
    };
    console.log("开始通知博主");

    try {
        await axios.post(msgUrl, data);
        console.log('通知完毕');
    } catch (error) {
        console.log('通知发送失败', error);
    }
});

function urlSubmit(urls) {
    const new_target = `http://data.zz.baidu.com/urls?appid=${xz_appid}&token=${xz_token}&type=realtime`;
    const history_target = `http://data.zz.baidu.com/urls?appid=${xz_appid}&token=${xz_token}&type=batch`;
    const baidu_target = `http://data.zz.baidu.com/urls?site=https://alili.tech&token=${baidu_token}`;
    const MIP_target = `http://data.zz.baidu.com/urls?site=https://alili.tech&token=${baidu_token}&type=mip`;
    const AMP_target = `http://data.zz.baidu.com/urls?site=https://alili.tech&token=${baidu_token}&type=amp`;

    urls = urls.map(item => item.loc[0]);
    urls = urls.slice(0, urlCount);
    const urls_string = urls.join("\n");

    sendData(new_target, urls_string, "实时推送成功");
    sendData(history_target, urls_string, "历史推送成功");
    sendData(baidu_target, urls_string, "百度推送成功");
    sendData(MIP_target, urls_string, "MIP推送成功");
    sendData(AMP_target, urls_string, "AMP推送成功");
}

function sendData(target, urls, message) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', target, false);
    xhr.setRequestHeader('Content-type', 'text/plain');
    xhr.onload = function () {
        console.log(this.responseText);
        if (message) {
            console.info(message);
        }
    };
    xhr.send(urls);
}

gulp.task("default", gulpsync.sync([
    'getTodayData',
    'build',
    'baiduSeo',
    "generate-service-worker",
    'minify',
    'sendMessage'
]));

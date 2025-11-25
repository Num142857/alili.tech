const axios = require('axios');
const fse = require('fs-extra');
const gulp = require("gulp");
const htmlmin = require('gulp-htmlmin');
const shell = require('gulp-shell');
const workbox = require('workbox-build');
const gulpsync = require('gulp-sync')(gulp);

gulp.task('minify', () => {
    return gulp.src('public/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('public'));
});

gulp.task('build', () => gulp.src('./').pipe(shell(['hugo --buildFuture'])));

gulp.task('deploy', () => gulp.src('./').pipe(shell(['node oss.js'])));


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


gulp.task("default", gulpsync.sync([
    'getTodayData',
    'build',
    "generate-service-worker",
    'minify',
    'sendMessage'
]));

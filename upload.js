const COS = require('cos-nodejs-sdk-v5');

let cos = new COS({
    SecretId: process.env.TENCENT_SECRET_ID,
    SecretKey: process.env.TENCENT_SECRET_KEY
});

const bucket = 'serverless-page-bucket-5z6gco4t-1257581837'; 
const region = 'ap-shanghai'; 

function uploadDirectory(directory) {
    const fs = require('fs');
    fs.readdirSync(directory).forEach(file => {
        let fullPath = directory + '/' + file;
        if (fs.lstatSync(fullPath).isDirectory()) {
            uploadDirectory(fullPath);
        } else {
            let key = fullPath.replace('public/', '');
            cos.putObject({
                Bucket: bucket,
                Region: region,
                Key: key,
                Body: fs.readFileSync(fullPath),
                onProgress: function (progressData) {
                    console.log(progressData);
                }
            }, function (err, data) {
                if (err) console.error(err);
                console.log(data);
            });
        }
    });
}

uploadDirectory('public');

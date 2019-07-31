const AWS = require('aws-sdk');

const s3SigV4Client = new AWS.S3({
    signatureVersion: 'v4'
});

module.exports.getS3PreSignedUrl = function getS3PreSignedUrl(s3ObjectKey) {

    const bucketName = process.env.S3_PERSISTENCE_BUCKET;
    const s3PreSignedUrl = s3SigV4Client.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: s3ObjectKey,
        Expires: 60 * 1 // the Expires is capped for 1 minute
    });
    console.log(`Util.s3PreSignedUrl: ${s3ObjectKey} URL ${s3PreSignedUrl}`);
    return s3PreSignedUrl;

}


// util.js へ以下を追加
module.exports.isAPLSupported = function isAPLSupported(request) {
    return request &&
        request.context &&
        request.context.System &&
        request.context.System.device &&
        request.context.System.device.supportedInterfaces &&
        request.context.System.device.supportedInterfaces['Alexa.Presentation.APL'];
}

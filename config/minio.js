var Minio = require('minio')

let minioClient = new Minio.Client({
    endPoint: "127.0.0.1",
    port: 9000,
    useSSL: false,
    accessKey: 'AKIAIOSFODNN7EXAMPLE',
    secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
});

minioClient.makeBucket('books-img', 'local', (err) => {
    if(err)
        return console.log('Error in creating Bucket');
    console.log('img-bucket created');
})

export default minioClient;
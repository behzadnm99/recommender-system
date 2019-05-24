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


minioClient.makeBucket('movies-img', 'local', (err) => {
    if(err)
        return console.log('Error in creating movies Bucket');
    console.log('movies-bucket created');
})

var moviesBucketPolicy = `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetBucketLocation",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "*"
        ]
      },
      "Resource": [
        "arn:aws:s3:::movies-img"
      ],
      "Sid": ""
    },
    {
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "*"
        ]
      },
      "Resource": [
        "arn:aws:s3:::movies-img/*"
      ],
      "Sid": ""
    }
  ]
}`

var bookBucketPolicy = `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetBucketLocation",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "*"
        ]
      },
      "Resource": [
        "arn:aws:s3:::books-img"
      ],
      "Sid": ""
    },
    {
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "*"
        ]
      },
      "Resource": [
        "arn:aws:s3:::books-img/*"
      ],
      "Sid": ""
    }
  ]
}`

minioClient.setBucketPolicy('books-img', bookBucketPolicy, (err) => {
    if(err) {
        throw err
    } 
    console.log('books bucket policy seted up');
});

minioClient.setBucketPolicy('movies-img', moviesBucketPolicy, (err) => {
    if(err) {
        throw err
    } 
    console.log('movies bucket policy seted up');
});

export default minioClient;
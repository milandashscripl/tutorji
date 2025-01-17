const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'your-cloud-name', // Replace with your Cloudinary Cloud Name
  api_key: 'your-api-key',      // Replace with your API Key
  api_secret: 'your-api-secret' // Replace with your API Secret
});

module.exports = cloudinary;

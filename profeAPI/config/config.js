module.exports = {
    database: {
      url: 'mongodb://localhost:27017/API-2023',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
    secretKey: 'GeneradorDeContraseña',
    emailConfig: {
      service: 'Outlook',
      auth: {
        user: 'api-nieva-belatti@outlook.com',
        pass: 'InfoAplicacioneInteractivas2023',
      },
      tls: {
        rejectUnauthorized: false,
      },
      secure: false,
    },
    cloudinaryConfig:{ 
      cloud_name: 'dzuayphy6', 
      api_key: '558371743286996', 
      api_secret: 'ztLJamWbIeZaPXmBLrtLb6WgtKY' 
    }
  };
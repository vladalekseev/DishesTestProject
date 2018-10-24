const config = {
    database: 'mongodb://localhost:27017/internship',
    port: 8080,
    secret: 'secret',
    oauth: {
        google: {
            clientID: '807743130772-bkda1av2sqn79vjc4e4t8oog58beemvu.apps.googleusercontent.com',
            clientSecret: 'AeFVmV2VybX3GaRSNbSrPYe0'
        },
        facebook: {
            clientID: '130852187598344',
            clientSecret: '7a0f0b21256941c290a4fca1c23e6b27'
        },
        instagram: {
            clientID: '73ddde0ea4c7491c910ded36d13b7b30',
            clientSecret: 'f27728c768e74a45b4692fe2974d64e3'
        }
    }
};

export default config;

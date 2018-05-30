const env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
    let config = require('./config.json');
    let envConfig = config[env];

    Object.keys(envConfig).forEach((key)=>{
        process.env[key] = envConfig[key];
    });
}
// console.log(process.env);


// if (env === 'development') {
//     process.env.PORT = 3000;
// }else if(env === 'test'){
//     process.env.PORT = 3000;
// }

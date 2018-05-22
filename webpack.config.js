/*
 * 2018/2/6
 * administractor
 */
var path = require('path');
console.log('loading...');
module.exports = {
    entry:{
        'login':'./web/js/login.js',
        'index':'./web/js/index.js'
    },
    output:{
        //for html
        filename:'[name].js',
        path:path.resolve(__dirname,'./web/dist/')
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                //排除node_modules,bower_components下的JS文件
                exclude:/node_modules/,
                loader: 'babel-loader',
                query: {
                    //for jsx and es6
                    presets: ['react', 'env']
                }
            }
        ]
    }
};

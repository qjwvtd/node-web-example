/*
 * 2018/2/10
 * administractor
 */
module.exports = function(app){

    //user 模块
    var user = require('./../api/user');
    user(app);

    //404 处理
    var Error = require('./../404');
    Error(app);

    //读取文件
    var file = require('./../api/getFileTest');
    file(app);
};

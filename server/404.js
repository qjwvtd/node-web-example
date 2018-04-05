/*
 * 2018/2/9
 * administractor
 */
var fs = require('fs');
module.exports = function(app){
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        console.log('已发送404页面');
        console.log(err);
        //解析图片发送到前端
        var filePath = './resource/404.jpg';
        var bData = fs.readFileSync(filePath);
        var base64Str = bData.toString('base64');
        var dataUri = 'data:image/jpeg;base64,' + base64Str;
        res.writeHeader(404,{'content-type' : 'text/html;charset="utf-8"'});
        res.end('<div style="text-align:center"><img src="'+dataUri+'" style="width:50%"></div>');
    });
};
var crypto = require('crypto');
var  Md5Helper=function(para){
    var md5 = crypto.createHash('md5');
    var md5Email = md5.update(para).digest('hex');
    return md5Email;
};
exports.Md5Helper=Md5Helper;
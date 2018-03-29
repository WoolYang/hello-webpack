function WebpackPlugin(options) {
    // 使用配置（options）设置插件实例
}

WebpackPlugin.prototype.apply = function (compiler) {

    compiler.plugin("compilation", function (compilation) {
        // console.log(compilation)
        console.log(compiler)
        // 现在设置回调来访问编译中的步骤：
        compilation.plugin("optimize", function () {
            console.log("Assets are being optimized.");
        });
    });

    compiler.plugin('done', function () {
        console.log('Webpack done!');
    });

    compiler.plugin('emit', function (compilation, callback) {
        // 创建一个头部字符串：
        var filelist = 'In this build:\n\n';

        // 检查所有编译好的资源文件：
        // 为每个文件名新增一行
        for (var filename in compilation.assets) {
            filelist += ('- ' + filename + '\n');
        }

        // 把它作为一个新的文件资源插入到 webpack 构建中：
        compilation.assets['filelist.md'] = {
            source: function () {
                return filelist;
            },
            size: function () {
                return filelist.length;
            }
        };

        callback();
    });

    /*     compiler.plugin('emit', function (compilation, callback) {
            console.log('Webpack emit!');
        }) */
};

module.exports = WebpackPlugin;
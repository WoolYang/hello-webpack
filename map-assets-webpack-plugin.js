const fs = require('fs');
const path = require('path');

function MapAssetsWebpackPlugin(options) {
    this.filePath = options.filePath || __dirname;
    this.publicPath = options.publicPath || '';
    this.fileName = options.fileName || 'fileName.json';
    this.extensions = options.extensions || ['js', 'css'];
}

function toArray(params) {
    return Object.prototype.toString.call(params) === '[object Array]' ? params : [params]
}

MapAssetsWebpackPlugin.prototype.apply = function (compiler) {
    let output = {},
        extensions = toArray(this.extensions),
        publicPath = this.publicPath,
        filePath = path.join(this.filePath, this.fileName);


    compiler.plugin('done', function (compilation) {
        let assetsByChunkName = compilation.assetsByChunkName; //获取资源名称及对应打包hash名称 {[x:string]:Array<string>|string}
        for (let chunkName in assetsByChunkName) {
            if (assetsByChunkName.hasOwnProperty(chunkName)) {
                let assets = assetsByChunkName[chunkName], //获取对应chunk的hash名称
                    newOutput = output[chunkName] = {}; //创建新的映射对象
                assets = toArray(assets); //转换为数组
                assets.forEach(function (item, index) {
                    extensions.forEach(function (subItem, subIndex) {
                        if (!newOutput[extensions[subIndex]]) {
                            newOutput[extensions[subIndex]] = []
                        }
                        if (item.endsWith(extensions[subIndex])) {
                            newOutput[extensions[subIndex]].push(path.join(publicPath, item));
                        }
                    })
                })
            }
        }
        /*         compilation.assets[this.fileName] = {
                    source: function () {
                        return output;
                    },
                    size: function () {
                        return output.length;
                    }
                };
                callback(); */
        fs.writeFileSync(
            filePath,
            JSON.stringify(output)
        )
    })
};

module.exports = MapAssetsWebpackPlugin;
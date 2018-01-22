const webpack = require('webpack'),
    plugins = [
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: 'common',
            minChunks: 3
        })
    ];



module.exports = plugins;
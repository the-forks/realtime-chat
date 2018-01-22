const webpack = require('webpack'),
    path = require('path'),
    config = {
        entry: ['babel-polyfill', 'react-hot-loader/patch', './index.js'],
        context: path.join(__dirname, 'src/client'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'public')
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)?$/,
                    use: ['babel-loader'],
                    exclude: /node_modules/,
                },
                {
                    test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    use: [{
                        loader: 'file-loader'
                    }],
                    exclude: /node_modules/
                },
                {
                    test: /\.(css|scss)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                    exclude: /node_modules/
                }
            ],
        },
        resolve: {
            modules: [
                path.join(__dirname, 'node_modules'),
                path.join(__dirname, 'src/client'),
                path.join(__dirname, 'src/redux'),
                path.join(__dirname, 'src'),
                path.join(__dirname, 'assets'),
            ],
            extensions: ['.js', '.jsx']
        },
        plugins: require('./webpack.plugins'),
        devtool: 'source-map',
        devServer: {
            contentBase: path.join(__dirname, "public"),
            compress: true,
            port: 9000,
            host: require('./src/config').api.host,
            publicPath: '/',
            hot: true,
            inline: true
        }
    };

console.log(process.env.NODE_ENV)
module.exports = config;
const HtmlWebpackPlugin = require('html-webpack-plugin'),
    { VueLoaderPlugin } = require('vue-loader'),
    { resolve } = require('path')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    externals: {
        'vue': 'Vue'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue$/i,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/i,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'public/index.html')
        })
    ]
}

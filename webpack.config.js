const path = require('path');
module.exports = {
    devtool: 'inline-source-map',
    entry: './src/main.ts',
    mode: 'development',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            include: [path.resolve(__dirname, 'src')]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        publicPath: 'public',
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    }
}
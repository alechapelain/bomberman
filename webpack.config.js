const path = require('path');

module.exports = {
    entry: './src/game/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    },
    output: {
        publicPath: '/',
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'src'),
        port: 9000
    }
};

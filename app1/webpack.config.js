const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 3001,
        static: './dist',
    },
    entry: './src/index.js',
    output: {
        publicPath: 'http://localhost:3001/',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'app1',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/Catalogue',
            },
            shared: {
                react: { singleton: true, eager: true, requiredVersion: '^17.0.2' },
                'react-dom': { singleton: true, eager: true, requiredVersion: '^17.0.2' },
            },
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

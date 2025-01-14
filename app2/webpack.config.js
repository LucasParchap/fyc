const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 3002,
        static: './dist',
    },
    entry: './src/index.js',
    output: {
        publicPath: 'http://localhost:3002/',
    },
    module: {
        rules: [
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
            name: 'app2',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/Panier',
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

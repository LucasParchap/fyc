const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    mode: 'development',
    devServer: {
        port: 3000,
        static: './dist',
    },
    entry: './src/index.js',
    output: {
        publicPath: 'http://localhost:3000/',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", 'postcss-loader'],
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
            name: 'shell',
            filename: 'remoteEntry.js',
            exposes: {
                './eventBus': './src/shared/eventBus',
                './LanguageStore': './src/shared/store.js',
            },
            remotes: {
                app1: 'app1@http://localhost:3001/remoteEntry.js',
                app2: 'app2@http://localhost:3002/remoteEntry.js',
                toggleLanguage: 'toggleLanguage@http://localhost:3003/remoteEntry.js',
            },
            shared: {
                react: { singleton: true, eager: true, requiredVersion: '^17.0.2' },
                'react-dom': { singleton: true, eager: true, requiredVersion: '^17.0.2' },
                zustand: { singleton: true },
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

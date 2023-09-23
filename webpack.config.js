// This project is using Webpack 5!
// https://webpack.js.org/configuration/

// Plugins
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// Settings
const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = MiniCssExtractPlugin.loader;
const buildFolder = 'dist';             // Name of build output directory
const staticInputFolder = 'public'      // Name of input directory for static content
const staticOutputFolder = 'static';    // Name of subdirectory in build folder where static content is stored

const config = {
    entry: {
        'index': './src/main.tsx'
    },
    output: {
        filename: staticOutputFolder + '/scripts/[name].js',
        path: path.resolve(__dirname, buildFolder),
        clean: true,
        // publicPath: '/',
    },
    devServer: {
        open: false,
        host: 'localhost',
        port: 8000,
        liveReload: true,
        // historyApiFallback: true,
        client: {
            logging: 'none',
            progress: false,
        },
    },
    // https://webpack.js.org/configuration/plugins/
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: staticInputFolder + '/index.html',
            favicon: staticInputFolder + '/favicon.png',
            // publicPath: '/',
            hash: false,
        }),
        new MiniCssExtractPlugin({
            filename: staticOutputFolder + '/css/[name].css',
        }),
    ],
    module: {
        // https://webpack.js.org/loaders/
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    // https://webpack.js.org/configuration/resolve/
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    // https://webpack.js.org/configuration/optimization/
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
    // https://webpack.js.org/configuration/stats/
    stats: {
        preset: 'errors-warnings',
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};

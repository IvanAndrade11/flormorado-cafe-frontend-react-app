const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    const isProd = argv.mode === "production";

    return {
        entry: "./src/index.tsx",

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
            assetModuleFilename: "assets/media/[hash][ext][query]",
            publicPath: "/",
            clean: true,
        },

        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx"],
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@components": path.resolve(__dirname, "src/components"),
                "@pages": path.resolve(__dirname, "src/pages"),
                "@assets": path.resolve(__dirname, "src/assets"),
            },
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/i,
                    type: "asset",
                    parser: {
                        dataUrlCondition: {
                            maxSize: 8 * 1024,
                        },
                    },
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(mp4|webm|ogg|ogv|mov)$/i,
                    type: "asset/resource", // siempre emite el archivo (no inline)
                },

            ],
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "public/index.html"),
                filename: "index.html",
                favicon: './public/icon.svg',
            }),
            new Dotenv({
                path: isProd ? './.env.production' : './.env.development'
            })
        ],

        devtool: isProd ? "source-map" : "eval-cheap-module-source-map",

        devServer: {
            static: {
                directory: path.resolve(__dirname, "dist"),
            },
            historyApiFallback: true, // para manejar rutas en SPA (React Router)
            port: 3000,
            open: true,
            hot: true,
            compress: true,
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            },
        },

        optimization: {
            splitChunks: {
                chunks: "all",
            },
            runtimeChunk: "single",
        },

        performance: {
            hints: false,
        },
    };
};

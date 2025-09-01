import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.module\.scss$/, // SCSS-модули
                use: [
                    "style-loader", // можно заменить на MiniCssExtractPlugin.loader для продакшена
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]--[hash:base64:5]", // Button__root--abc12
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            additionalData: `
         @use "@/assets/styles/_global.scss" as *;
        `,
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, "src")],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.scss$/, // обычные SCSS
                exclude: /\.module\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            additionalData: `
          @use "@/assets/styles/_global.scss" as *;
        `,
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, "src")],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff2?|ttf|eot|otf)$/, // поддержка woff, woff2, ttf, eot, otf
                type: 'asset/resource',          // автоматически копирует файлы в output
                generator: {
                    filename: 'fonts/[name][hash][ext]', // куда копировать в dist
                },
            },

        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
    devServer: {
        static: "./dist",
        port: 3000,
        open: true,
        hot: true,
    },
    devtool: 'source-map',
};

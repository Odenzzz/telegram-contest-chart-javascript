const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: ["./src/js/script.js", "./src/scss/style.scss"],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "./js/bundle.js"
	},
	devtool: "source-map",
	mode: "development",
	module: {
		rules: [{
				test: /\.(sass|scss)$/,
				include: path.resolve(__dirname, "src/scss"),
				use: [{
						loader: MiniCssExtractPlugin.loader,
						options: {}
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							url: false
						}
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							sourceMap: true,
							plugins: () => [
								require("cssnano")({
									preset: [
										"default",
										{
											discardComments: {
												removeAll: true
											}
										}
									]
								})
							]
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: false
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "./css/style.bundle.css"
		}),
		new HtmlWebpackPlugin({
			template: './src/html/index.html'
		}),
		new CopyWebpackPlugin([{
			from: './src/data',
			to: './data'
		}]),
		new BrowserSyncPlugin({
			host: "localhost",
			port: 3000,
			files: [
				'./dist/*.html',
				'./dist/*.js',
				'./dist/*.css',
				'./dist/*.json',
			],
			server: {
				baseDir: ["dist"]
			}
		})
	]
};
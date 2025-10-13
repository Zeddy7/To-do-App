const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   entry: "./src/index.js",
   output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/index.html",
      }),
   ],
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
         },
         {
            test: /\.html$/i,
            use: "html-loader",
         },
         // Rule for image files (using Webpack 5 Asset Modules)
         {
            test: /\.(png|jpe?g|gif|svg|webp)$/i,
            type: "asset/resource", // Copies the asset to the output directory
         },
      ],
   },
};

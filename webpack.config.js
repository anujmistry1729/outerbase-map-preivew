const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    mode: 'production',
    entry: './plugin/define.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'plugin.bundle.js',
    },
    
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true,
                }
              })
            ]
      },  
    plugins: [
        new BundleAnalyzerPlugin()
      ]  
};

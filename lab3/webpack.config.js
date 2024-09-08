const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/images',
                    to: 'dist/images'
                },
            ],
        }),
    ],
};

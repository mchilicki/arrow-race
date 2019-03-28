const path = require('path')

module.exports = {
  entry: './src/arrow-game.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'         
          }, 
          {
            loader: 'css-loader'
          }, 
          {
            loader: 'sass-loader'
          }
        ]
       }
    ]
  },
}
/**
 * Created by Feng on 2017/7/15.
 */
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var baseConfig = {
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js', // 基于 CommonJS 的完整构建
      config: resolve('config'),
      components: resolve('src/pc/components'),
      libs: resolve('libs')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'vue-style-loader'
              }),
              less: ExtractTextPlugin.extract({
                use: 'css-loader!less-loader'
              })
            }
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader?cacheDirectory',
        exclude: /node_modules(?!\/opentype.js)/
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp4)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?minimize'
        })
      },

      {
        test: /\.eot/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?[hash]',
              limit: 10000,
              mimetype: 'application/vnd.ms-fontobject'
            }
          }
        ]
      },
      {
        test: /\.woff(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?[hash]',
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.ttf(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?[hash]',
              limit: 10000,
              mimetype: 'application/font-ttf'
            }
          }
        ]
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader'
      }
    ]
  }
}

module.exports = baseConfig

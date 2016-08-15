let ExtractTextPlugin = require('extract-text-webpack-plugin');
let AutoPrefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let path = require('path');

const env = process.env.NODE_ENV;

let loaders = [];
let plugins = [];
let pages = ['index'];

loaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel'
});

// loaders.push({
//     test: /\.swf$/,
//     loader: 'file?name=[path][name].[ext]'
// });

// loaders.push({
//     test: /\.vtt$/,
//     loader: 'file?name=[path][name].[ext]'
// });
// loaders.push({
//     test: /\.(webm|ogv|mp4)$/,
//     loader: 'file?name=[path][name].[ext]'
// });

loaders.push({
    test: /\.html/,
    loader: 'html?attrs[]=video:poster&attrs[]=img:src&attrs[]=source:src&attrs[]=track:src'
});

// loaders.push({
//     test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
//     loader : 'file-loader'
// });

if( env === 'dev' ){
  loaders.push({
    test: /\.css$/,
    loader: 'style!css!postcss'
  });

  loaders.push({
    test: /\.scss$/,
    loader: 'style!css!postcss!sass'
  });
}
else {
  loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss', {
      publicPath: '../'
    })
  });

  loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss!sass', {
      publicPath: '../'
    })
  });
  
  pages.forEach(function(page){
    plugins.push(new ExtractTextPlugin('css/' + page + '.css'));
  })
}


loaders.push({ 
  test: /\.(png|gif|jpe?g)$/, 
  loader: "url?limit=5000&name=img/[name]-[hash].[ext]!image-webpack"
});


plugins.push(new webpack.DefinePlugin({
  DEBUG: env === 'dev' ? true : false
}));

pages.forEach(function(page){
  plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index.html'),
    filename: './index.html'
  }));
});

module.exports = {
  entry: {
    index: './src/js/index.js'
  },
  output: {
    filename: 'js/index.js',
    path: __dirname + '/build',
    // publicPath: './'
  },
  module: {
    loaders: loaders
  },
  postcss: function(){
    return [AutoPrefixer({ browsers: ['last 20 versions'] })]
  },
  // 打包时忽略jq
  externals: {
  	'jquery': 'jQuery'
  },
  plugins: plugins,
  imageWebpackLoader: {
    pngquant:{
      quality: "65-90",
      speed: 4
    }
  }
}
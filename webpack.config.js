const path=require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let pathsToClean = [
  'build/assets/js/*.*',
  'build/assets/css/*.*'
]
module.exports={
	entry:["babel-polyfill",__dirname+'/src/app.js'],
	output:{
		path:path.join(__dirname,'build',"assets"),
		filename:'js/[name].[hash].js',
		publicPath:'/assets/',
		chunkFilename: 'js/[id].[chunkhash].js',
	},
	devServer: {
	    contentBase: "./build", 
	    historyApiFallback: true, 
	    inline: true, 
	    hot:true
    },
    devtool: 'source-map',
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude: [/node_modules/,],
		   },
		   {
				test:/\.scss$/,
				loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
		   },
		    {
				test:/\.css$/,
				loader:'style-loader!css-loader'
		   }
		]
	},
	plugins: [
		new ExtractTextPlugin('css/[name].[contenthash:7].css'),
   		new webpack.HotModuleReplacementPlugin(),
	    new webpack.DefinePlugin({
			'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new HtmlWebpackPlugin({
            filename:'../index.html',
            template: path.resolve(__dirname+"/index.html")
	        }),
		new webpack.optimize.CommonsChunkPlugin({
		    name: 'vendor',
		    minChunks: function (module, count) {
		        // any required modules inside node_modules are extracted to vendor
		        return (
		          module.resource &&
		          /\.js$/.test(module.resource) &&
		          module.resource.indexOf(
		            path.join(__dirname, '/node_modules')
		          ) === 0
		        )
	        }
		}),
	    // extract webpack runtime and module manifest to its own file in order to
	    // prevent vendor hash from being updated whenever app bundle is updated
	    new webpack.optimize.CommonsChunkPlugin({
	      	name: 'manifest',
	      	chunks: ['vendor']
	    })
   ]
}
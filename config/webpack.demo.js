const helpers = require('./helpers');
const webpack = require('webpack');
const path = require('path');

/**
 * Webpack Plugins
 */
const AotPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

// MiniCssExtractPlugin
const extractCSS = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: "[id].css"
});

// NOTE: AOT is temporarily disabled because mini-css-extract-plugin has an issue with AngularCompilerPlugin
// See: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/186
const aotMode = false;

module.exports = {
  devServer: {
    inline: true,
    stats: 'minimal'
  },

  devtool: 'cheap-module-eval-source-map',

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': aotMode ? './src/demo-aot.ts' : './src/demo.ts'
  },

  /**
   * As of Webpack 4 we need to set the mode.
   * Since this is a library and it uses gulp to build the library
   */
  mode: 'development',

  resolve: {
    extensions: ['.webpack.js', '.wep.js', '.js', '.ts']
  },

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: aotMode ? [
          '@ngtools/webpack'
        ] : [
          'ts-loader',
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        use: ['html-loader']
      }, {
        test: /node_modules\/@swimlane\/ngx-datatable\/.*\.css$/,
        use: [
          {
            loader: 'to-string-loader'
          }, {
            loader: 'css-loader',
            options: {
              context: '/'
            }
          }
        ]
      },

      /*
       * to string and css loader support for *.css files
       * Returns file content as string
       *
       */
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: "css-loader",
            options: {
              minimize: true,
              sourceMap: true
            }
          }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'css-to-string-loader'
        }, {
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true,
            context: '/'
          }
        }, {
          loader: 'less-loader',
          options: {
            paths: [
              path.resolve(__dirname, "../node_modules/patternfly/dist/less"),
              path.resolve(__dirname, "../node_modules/patternfly/dist/less/dependencies"),
              path.resolve(__dirname, "../node_modules/patternfly/dist/less/dependencies/bootstrap"),
              path.resolve(__dirname, "../node_modules/patternfly/dist/less/dependencies/font-awesome"),
            ],
            sourceMap: true
          }
        }]
      },

      /**
       * File loader for supporting fonts, for example, in CSS files.
       */
      {
        test: /\.(woff2|woff|ttf|eot|svg)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 3000,
            includePaths: [
              path.resolve(__dirname, "../node_modules/patternfly/dist/fonts/")
            ],
            name: 'assets/fonts/[name].[ext]'
          }
        },
        exclude: path.resolve(__dirname, "../src/demo/images/")
      },
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 3000,
            includePaths: [
              path.resolve(__dirname, "../src/demo/images/")
            ],
            name: 'assets/images/[name].[ext]'
          }
        },
        exclude: path.resolve(__dirname, "../node_modules/patternfly/dist/fonts/")
      }
    ]
  },

  output: {
    path: helpers.root('dist-demo'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },

  plugins: [
    extractCSS,

    /*
     * StyleLintPlugin
     */
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      syntax: 'less',
      context: 'src',
      files: '**/*.less',
      failOnError: false,
      quiet: false,
    }),

    /*
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      template: 'src/demo.html'
    }),

    /**
     * Plugin: NamedModulesPlugin (experimental)
     * Description: Uses file names as module name.
     *
     * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
     */
    new NamedModulesPlugin(),

    /**
     * Plugin: ContextReplacementPlugin
     * Description: Provides context to Angular's use of System.import
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
     * See: https://github.com/angular/angular/issues/11580
     */
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      // /angular(\\|\/)core(\\|\/)@angular/,
      /\@angular(\\|\/)core(\\|\/)fesm5/,
      helpers.root('./src')
    ),
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src')
    ),

    new TypedocWebpackPlugin({
      name: 'PatternFly NG',
      mode: 'file',
      includeDeclarations: false,
      ignoreCompilerErrors: true,
      excludeExternals: true,
      excludePrivate: true,
      excludeProtected: true,
      exclude: ['**/+(example|demo|tree-list)/**' ],
      tsconfig: 'tsconfig.json'
    }, './src/app'),

    /**
     * Plugin: copy-webpack-plugin
     * Description: Copies individual files or entire directories to the build directory
     *
     * See: https://github.com/kevlened/copy-webpack-plugin
     */
    new CopyWebpackPlugin([{
      from: helpers.root('README.md')
    }])
  ],

  /**
   * These common plugins were removed from Webpack 3 and are now set in this object.
   */
  optimization: {
    namedModules: true, // NamedModulesPlugin()
    splitChunks: { // CommonsChunkPlugin()
      name: 'all'
    },
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true //ModuleConcatenationPlugin
  },
};

/**
 * Plugin: AotPlugin
 * Description: Angular Ahead-of-Time Webpack Plugin
 *
 * See: https://www.npmjs.com/package/@ngtools/webpack
 */
if (aotMode) {
  module.exports.plugins.push(new AotPlugin({
    entryModule: helpers.root('src/demo/app.module.ts#AppModule'),
    tsConfigPath: helpers.root('tsconfig-demo.json')
  }));
}

import {
  uglify
} from "rollup-plugin-uglify";
import postcss from 'rollup-plugin-postcss';


let config = {
  input: 'src/index.js',
  output: {
    file: '',
    name: "lazySkeleton",
    format: 'iife'
  },
  plugins: [
    postcss({

      extensions: ['.css'],

    })
  ],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  }
}

if (process.env.NODE_ENV == 'prod') {
  config.output.file = 'build/lazySkeleton_mini.js'
  config.plugins.push(uglify());
} else if (process.env.NODE_ENV == 'dev') {
  config.output.file = 'dev/lazySkeleton.js'
}

export default config;
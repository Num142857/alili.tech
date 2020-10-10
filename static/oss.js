const publish = require('ali-oss-publish')


publish({
    entry: '.', // defaults to '.'
    output: '/',
    // include: /bin|cli|lib|index\.js$|\.md$/,
    exclude: /.DS_Store$|.git/,
    mime: (filename) => {
      if (/\.md$/.test(filename)) {
        return 'text/markdown'
      }
  
      return undefined
    },
    meta: {
      ref: Date.now()
    },
    headers: {
      'Cache-Control': 'max-age=30672000'
    },
    rules: [
      {
      test: /(index\.html|service-worker\.js)$/,
      use: {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    }
  ],
    // config: '/path/to/config/file.js', // defaults to try load config from 'ali-oss-publish.config.js' when config is not set
    retry: 1,
    concurrency: 4,
    force: true
  }, (err, stats) => {
    if (err) {
      console.error('ali-oss-publish encountered a fatal error.')
      console.error(err)
  
      process.exit(1)
    }
  
    if (stats.hasProgress()) {
      const {
        type,
        index,
        current,
        total,
        message
      } = stats
  
      console.log('[%s] [%s/%s] #%s: %s', type, current, total, index, message)
    } else {
      console.log(stats.message)
    }
  
    if (stats.hasWarnings()) {
      console.warn('ali-oss-publish encountered some warnings.')
      stats.warnings.forEach((x) => {
        console.warn(x)
      })
    }
  
    if (stats.hasErrors()) {
      console.error('ali-oss-publish encountered some errors.')
      stats.errors.forEach((x) => {
        console.error(x)
      })
    }
  })
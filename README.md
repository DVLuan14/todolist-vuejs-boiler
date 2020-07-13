# vuejs-boilerplate

## Structure

```
├── build                      # config for production preview
├── plop-templates             # basic template (Plop.js)
├── public                     # pure static assets (directly copied)
│   │── favicon.ico            # favicon
│   └── index.html             # index.html template
├── src                        # main source code
│   ├── api                    # api service
│   ├── assets                 # module assets like fonts,images (processed by webpack)
│   ├── components             # global components
│   ├── lang                   # i18n language
│   ├── layout                 # global layout
│   ├── router                 # router
│   ├── store                  # store (vuex)
│   ├── utils                  # global utils
│   │   ├── filters.js         # global filters
│   │   ├── request.js         # global config for axios
│   │   ├── response.js        # global handlers for response
│   │   └── ...                # other utils
│   ├── views                  # views
│   ├── App.vue                # main app component
│   ├── main.js                # app entry file
│   └── middleware.js          # permission authentication,...
├── tests                      # tests
├── .env.xxx                   # env variable configuration
├── .eslintrc.js               # eslint config
├── .babelrc                   # babel config
├── .travis.yml                # automated CI configuration
├── vue.config.js              # vue-cli config
├── postcss.config.js          # postcss config
└── package.json               # package.json
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Quick create component / view using plop
```
npm run new
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

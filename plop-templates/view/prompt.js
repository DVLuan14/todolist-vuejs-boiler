const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a view inside src/views',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'Enter view name:',
    validate: notEmpty('name')
  },
  {
    type: 'input',
    name: 'fileName',
    message: 'Enter file name:',
    default: 'index'
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true
    },
    {
      name: '<script>',
      value: 'script',
      checked: true
    },
    {
      name: 'style',
      value: 'style',
      checked: true
    }
    ],
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return 'View require at least a <script> or <template> tag.'
      }
      return true
    }
  }
  ],
  actions: data => {
    const name = '{{kebabCase name}}'
    const fileName = '{{kebabCase fileName}}'
    const actions = [{
      type: 'add',
      path: `src/views/${name}/${fileName}.vue`,
      templateFile: 'plop-templates/view/index.hbs',
      data: {
        name: name,
        fileName: fileName,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }]

    return actions
  }
}

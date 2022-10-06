// .prettierrc.js
module.exports = {
    ...require('@monogram/prettier-config'),
    tabWidth: 2,
    useTabs: false,
    overrides: [
      {
        files: '*.scss',
        options: {
          singleQuote: true,
          tabWidth: 2,
          useTabs: false,
          printWidth: 160
        }
      }
    ]
   }
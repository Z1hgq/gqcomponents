module.exports = {
    env: {
        es6: true,
        node: true,
        browser: true
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            legacyDecorators: true
        }
    },
    plugins: ["react", "import"],
    // extends: "eslint:recommended",
    extends: [
        // "plugin:react/recommended"
        // "plugin:prettier/recommended"
    ],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".json"]
            }
        },
        react: {
            pragma: "React",
            version: "detect"
        },
        propWrapperFunctions: [
            "forbidExtraProps", // https://www.npmjs.com/package/airbnb-prop-types
            "exact", // https://www.npmjs.com/package/prop-types-exact
            "Object.freeze" // https://tc39.github.io/ecma262/#sec-object.freeze
        ]
    },
    rules: {
        /** es6 */
        "jsx-quotes": ["error", "prefer-double"],
        // 1.1 如果该变量没有被重新赋值，请使用const
        "prefer-const": [
            "error",
            {
                destructuring: "any",
                ignoreReadBeforeAssign: true
            }
        ],
        // 1.2 不允许使用var
        "no-var": "error",
        // 5.3 永远不要在字符串上使用 `eval()` ，它会打开太多的漏洞。
        "no-eval": "error",
        // 5.4 不要转义字符串中不必要转义的字符。
        "no-useless-escape": "error",
        // 6.1 使用命名函数表达式而不是函数声明。
        "func-style": ["off", "expression"],
        // 6.2 用圆括号包裹立即调用函数表达式 (IIFE)。
        "wrap-iife": ["error", "outside", { functionPrototypeMethods: false }],
        // 6.6 隔开函数签名，括号两边用空格隔开。
        "space-before-function-paren": [
            "error",
            {
                anonymous: "always",
                named: "never",
                asyncArrow: "always"
            }
        ],
        // 6.7-6.8 不要改变参数。
        "no-param-reassign": [
            "off",
            {
                props: true,
                ignorePropertyModificationsFor: [
                    "acc", // for reduce accumulators
                    "accumulator", // for reduce accumulators
                    "e", // for e.returnvalue
                    "ctx", // for Koa routing
                    "req", // for Express requests
                    "request", // for Express requests
                    "res", // for Express responses
                    "response", // for Express responses
                    "$scope", // for Angular 1 scopes
                    "staticContext" // for ReactRouter context
                ]
            }
        ],
        // 7.4 避免使用比较运算符(`&lt; =`, `&gt;=`)时，混淆箭头函数语法(`=&gt;`)。
        "no-confusing-arrow": [
            "error",
            {
                allowParens: true
            }
        ],
        // 7.5 在隐式return中强制约束函数体的位置， 就写在箭头后面。
        "implicit-arrow-linebreak": ["error", "beside"],
        // 8.2 避免重复类成员。
        "no-dupe-class-members": "error",
        // 9.1 一个地方只在一个路径中 import(导入) 。
        "no-duplicate-imports": "error",
        // 9.2 不要 export(导出) 可变绑定。
        "import/no-mutable-exports": "error",
        // 9.4 将所有 `import` 导入放在非导入语句的上面。
        "import/first": "error",
        // 10.2 如果您必须使用 generators (生成器)，请确保它们的函数签名恰当的间隔。
        "generator-star-spacing": ["error", { before: false, after: true }],
        // 12.2 使用 `const` 或 `let`声明每个变量。
        "one-var": ["error", "never"],
        // 12.3 变量不要链式赋值。
        "no-multi-assign": ["error"],
        // 13.3 三元表达式不应该嵌套，通常写成单行表达式。
        "no-nested-ternary": "error",
        // 13.4 避免不必要的三元表达式语句。
        "no-unneeded-ternary": ["error", { defaultAssignment: false }],
        // 13.5 当运算符混合在一个语句中时，请将其放在括号内。混合算术运算符时，不要将 `**` 和 `%` 与 `+` ， `-`，`*`，`/` 混合在一起。
        "no-mixed-operators": ["off"],
        // 14.1 使用大括号包裹所有的多行代码块。
        "nonblock-statement-body-position": ["error", "beside", { overrides: {} }],
        // 14.2 如果通过 `if` 和 `else` 使用多行代码块，把 `else` 放在 `if` 代码块闭合括号的同一行。
        "brace-style": ["error", "1tbs", { allowSingleLine: true }],
        // 15.1  所有注释符和注释内容用一个空格隔开，让它更容易阅读。
        "spaced-comment": [
            "error",
            "always",
            {
                line: {
                    exceptions: ["-", "+"],
                    markers: ["=", "!"] // space here to support sprockets directives
                },
                block: {
                    exceptions: ["-", "+"],
                    markers: ["=", "!", ":", "::"], // space here to support sprockets directives and flow comment types
                    balanced: true
                }
            }
        ],
        // 16.1 使用 4 个空格作为缩进。
        indent: ["error", 2, { SwitchCase: 1 }],
        // 16.2 在大括号前放置 1 个空格。
        "space-before-blocks": "error",
        // 16.3 在控制语句（`if`、`while` 等）的小括号前放一个空格。在函数调用及声明中，不在函数的参数列表前加空格。
        "keyword-spacing": [
            "error",
            {
                before: true,
                after: true,
                overrides: {
                    return: { after: true },
                    throw: { after: true },
                    case: { after: true }
                }
            }
        ],
        // 16.4 使用空格把运算符隔开。
        "space-infix-ops": "error",
        // 16.9 不要在圆括号内加空格。
        "space-in-parens": ["error", "never"],
        // 16.10 不要在中括号内添加空格。
        "array-bracket-spacing": ["error", "never"],
        // 16.11 在大括号内添加空格。
        "object-curly-spacing": ["error", "always"],
        // 16.12 避免有超过100个字符（包括空格）的代码行。
        "max-len": [
            "error",
            100,
            2,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true
            }
        ],
        // 16.13 作为语句的花括号内也要加空格 —— `{` 后和 `}` 前都需要空格。
        "block-spacing": ["error", "always"],
        // 16.14 `,` 前不要空格， `,` 后需要空格。
        "comma-spacing": ["error", { before: false, after: true }],
        // 16.15 计算属性内要空格。参考上述花括号和中括号的规则。
        "computed-property-spacing": ["error", "never"],
        // 16.16 调用函数时，函数名和小括号之间不要空格。
        "func-call-spacing": ["error", "never"],
        // 16.17 在对象的字面量属性中， `key` `value` 之间要有空格。
        "key-spacing": ["error", { beforeColon: false, afterColon: true }],
        // 17.1 行开头处**不要**实用使用逗号。
        "comma-style": [
            "error",
            "last",
            {
                exceptions: {
                    ArrayExpression: false,
                    ArrayPattern: false,
                    ArrowFunctionExpression: false,
                    CallExpression: false,
                    FunctionDeclaration: false,
                    FunctionExpression: false,
                    ImportDeclaration: false,
                    ObjectExpression: false,
                    ObjectPattern: false,
                    VariableDeclaration: false,
                    NewExpression: false
                }
            }
        ],
        // 18.1 当然要使用封号
        semi: ["error", "always"],
        // 20.1 避免使用单字母名称。使你的命名具有描述性。
        "id-length": "off",
        // 20.2 当命名对象，函数和实例时使用驼峰式命名。
        camelcase: ["error", { properties: "never", ignoreDestructuring: false }],
        // 20.3 当命名构造函数或类的时候使用 PascalCase 式命名，（注：即单词首字母大写）。
        "new-cap": [
            "error",
            {
                newIsCap: true,
                newIsCapExceptions: [],
                capIsNew: false,
                capIsNewExceptions: ["Immutable.Map", "Immutable.Set", "Immutable.List"]
            }
        ],
        /** react */
        // 1.1 如果你要用 state refs， 最好用 `class extends React.Component` 而不是 `React.createClass`
        "react/prefer-es6-class": ["error", "always"],
        "react/prefer-stateless-function": ["error", { ignorePureComponents: true }],
        // 2.1 **文件名**: 用大驼峰作为文件名。**参数命名**: React 组件用大驼峰，组件的实例用小驼峰。
        "react/jsx-pascal-case": [
            "error",
            {
                allowAllCaps: true,
                ignore: []
            }
        ],
        //   3.1 对 JSX 语法使用这些对齐风格。
        "react/jsx-closing-bracket-location": ["error", "line-aligned"],
        "react/jsx-closing-tag-location": "error",
        // 4.1 在自闭和标签内空一格。
        "react/jsx-props-no-multi-spaces": "error",
        // 4.2 JSX 里的大括号不要空格。
        "react/jsx-curly-spacing": ["error", "never", { allowMultiline: true }],
        // 5.1 如果 prop 的值是 true 可以忽略这个值，直接写 prop 名就可以。
        "react/jsx-boolean-value": ["error", "never", { always: [] }],
        // 6.1推荐用 ref callback 函数。
        "react/no-string-refs": "error",
        // 7.1 当 JSX 标签有多行时，用圆括号包起来。
        "react/jsx-wrap-multilines": [
            "error",
            {
                declaration: "parens-new-line",
                assignment: "parens-new-line",
                return: "parens-new-line",
                arrow: "parens-new-line",
                condition: "parens-new-line",
                logical: "parens-new-line",
                prop: "parens-new-line"
            }
        ],
        //   7.1 当没有子元素时，最好用自闭合标签。
        "react/self-closing-comp": "error",
        // 7.2 如果你的组件有多行属性，用他的闭合标签单独作为结束行。
        "react/jsx-closing-bracket-location": ["error", "line-aligned"],
        // 8.1 在构造函数里绑定事件处理函数。
        "react/jsx-no-bind": [
            "off",
            {
                ignoreRefs: true,
                allowArrowFunctions: false,
                allowFunctions: false,
                allowBind: true,
                ignoreDOMComponents: false
            }
        ],
        //   8.2 确保你的 `render` 函数有返回值。
        "react/require-render-return": "error",
        "react/jsx-first-prop-new-line": ["error", "multiline"],
        "react/jsx-max-props-per-line": ["error", { maximum: 3 }]
    }
};

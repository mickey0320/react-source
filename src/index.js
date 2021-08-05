import React from './react'
import ReactDOM from './react-dom'

const Hello = React.createElement('div', {style: {color: 'red'}}, 'hello')

ReactDOM.render(Hello, document.getElementById('root'))

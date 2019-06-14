import React from 'react'
import ReactDOM from 'react-dom'
import './polyfills'

import './styles/global.scss'

import {Main} from './main'

const root = document.getElementById('main')
ReactDOM.render(<Main />, root)

import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from './routes'

render(
    <Router routes={routes} />,
    document.getElementById('root')
)
import React, { Component } from 'react'
import DevTools from './DevTools'

export default class App extends Component {
    render() {
        return (
            <div>
                <p className='test' color='blue'>Hello world</p>
                { process.env.NODE_ENV !== 'production' && <DevTools /> }
            </div>
        )
    }
}
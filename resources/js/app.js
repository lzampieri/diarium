require('./bootstrap');

import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import $ from 'jquery';
import MainWrapper from './GeneralComponents/MainWrapper';

window.$ = $;

createInertiaApp({
    resolve: name => {
        const page = require(`./Pages/${name}`).default
        page.layout = MainWrapper
        return page
    },
    setup({ el, App, props }) {
        render(<App {...props} />, el)
    },
})

InertiaProgress.init()
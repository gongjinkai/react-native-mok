/**
 * Created by Gong on 2020/04/27 0001.
 */
import React from 'react'
import dva from './utils/dva'
import models from './models'
import Router, { routerMiddleware, routerReducer } from './Router'

const dvaApp = dva({
  initState: {},
  models: models,
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
});



const Application = dvaApp.start(<Router />);

export default Application

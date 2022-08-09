import App from './App.svelte'
import Admin from './Admin.svelte'

import { current } from './ts/store'
import type { State } from './ts/types'
import { STATES } from './ts/types'
import { updateClient } from './ts/client'

let app: any = null;
//if endpoint is /admin, then load admin.svelte into the app
if (window.location.pathname.startsWith('/admin')) {
  app = new Admin({
    target: document.getElementById('app')
  })
}else{
  let query = new URLSearchParams(window.location.search)
  if(query.has('state')){
    let state = parseInt(query.get('state')) as State
    if(state > STATES || state < 0){
      state = -1
    }
    current.set(state)
    updateClient()
  }
  app = new App({
    target: document.getElementById('app'),
    props: {
      pos_err: {
        type: '400',
        message: `Where are you going?  Click me to go back home.`,
      }
    }
  })
}

export default app

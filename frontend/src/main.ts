import App from './App.svelte'
import Admin from './Admin.svelte'

let app: any = null;
//if endpoint is /admin, then load admin.svelte into the app
if (window.location.pathname.startsWith('/admin')) {
  app = new Admin({
    target: document.getElementById('app')
  })
}else{
  app = new App({
    target: document.getElementById('app')
  })
}

export default app

use wasm_bindgen::prelude::*;
// use js_sys::Promise;
#[allow(unused_imports)]
use wasm_bindgen_test::*;
use lazy_static::lazy_static;
use std::collections::HashMap;
use wasm_bindgen_futures::JsFuture;
// use web_sys::AbortController;

wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

//make clonable and serializable
#[derive(Clone, std::cmp::Eq, std::cmp::PartialEq, std::hash::Hash)]
enum State {
    NONE = -100,
    LOADING = -2,
    ERROR = -1,
    ABOUT = 0,
    DOCS = 1,
    BLOG = 2,
    CONTACT = 3,
}

lazy_static! {
    static ref STATEMAP: HashMap<State, &'static str> = {
        let mut m = HashMap::new();
        m.insert(State::NONE, "NONE");
        m.insert(State::LOADING, "LOADING");
        m.insert(State::ERROR, "ERROR");
        m.insert(State::ABOUT, "ABOUT");
        m.insert(State::DOCS, "DOCS");
        m.insert(State::BLOG, "BLOG");
        m.insert(State::CONTACT, "CONTACT");
        m
    };
}

impl State {
    fn from_i32(val: i32) -> State {
        match val {
            -100 => State::NONE,
            -2 => State::LOADING,
            -1 => State::ERROR,
            0 => State::ABOUT,
            1 => State::DOCS,
            2 => State::BLOG,
            3 => State::CONTACT,
            _ => State::NONE,
        }
    }
    fn to_i32(&self) -> i32 {
        match self {
            State::NONE => -100,
            State::LOADING => -2,
            State::ERROR => -1,
            State::ABOUT => 0,
            State::DOCS => 1,
            State::BLOG => 2,
            State::CONTACT => 3,
        }
    }
}

#[wasm_bindgen]
pub fn update_url(raw_state: i32, load: bool) -> Result<(), JsError> {
    let state: State = State::from_i32(raw_state);
    let window_raw = web_sys::window();
    if window_raw.is_none() {
        return Err(JsError::new("No window"));
    }
    let window = window_raw.unwrap();
    let location = window.location();
    let origin_raw = location.origin();
    if let Err(e) = origin_raw {
        return Err(JsError::new(&e.as_string().unwrap()));
    }
    let origin = origin_raw.unwrap();
    if load {
        if let Err(e) = location.set_href(&format!("{}/loading/?backtrace={}", origin, state.to_i32())){
            return Err(JsError::new(&e.as_string().unwrap()));
        }
    } else {
        if let Err(e) = location.set_href(&format!("{}/{}", origin, STATEMAP.get(&state).unwrap().to_lowercase())) {
            return Err(JsError::new(&e.as_string().unwrap()));
        }
    }
    Ok(())
}

#[wasm_bindgen]
pub async fn pong(addr: &str, error: &str) -> Result<JsValue,JsError> {
    //fetch addr
    let window_raw = web_sys::window();
    if window_raw.is_none() {
        return Err(JsError::new("No window"));
    }
    let window = window_raw.unwrap();
    let mut request_init = web_sys::RequestInit::new();
    request_init.method("GET")
        .mode(web_sys::RequestMode::Cors);
    let request_raw = web_sys::Request::new_with_str_and_init(addr, &request_init);
    if request_raw.is_err() {
        return Err(JsError::new("Failed to create request"));
    }
    let request = request_raw.unwrap();
    let resp = window.fetch_with_request(&request);

    let res = JsFuture::from(resp).await;
    if let Err(_) = res {
        if let Err(_) = window.location().set_href(error){
            return Err(JsError::new("Failed to redirect"));
        }
        return Err(JsError::new("500"));
    }
    Ok(JsValue::from_str("200"))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[wasm_bindgen_test]
    fn test_update_url(){
        let res = update_url(0, false);
        assert!(res.is_ok());
    }
    #[wasm_bindgen_test]
    async fn test_pong(){
        let res = pong("https://www.google.com", "https://www.google.com").await;
        assert!(res.is_ok());
    }
}

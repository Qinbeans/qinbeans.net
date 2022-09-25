use wasm_bindgen::prelude::*;

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
    fn to_string(&self) -> Result<String,String> {
        match self {
            State::ABOUT => Ok("about".to_string()),
            State::DOCS => Ok("docs".to_string()),
            State::BLOG => Ok("blog".to_string()),
            State::CONTACT => Ok("contact".to_string()),
            State::ERROR => Ok("error".to_string()),
            _ => Err("Not found".to_string()),
        }
    }
}

#[wasm_bindgen]
pub fn update_url(raw_state: i32, load: bool) -> Result<(), JsError> {
    let state: State = State::from_i32(raw_state);
    let window = web_sys::window().unwrap();
    let location = window.location();
    let origin_raw = location.origin();
    if let Err(e) = origin_raw {
        return Err(JsError::new(&e.as_string().unwrap()));
    }
    let origin = origin_raw.ok().unwrap();
    let state_str = state.to_string();
    if let Err(e) = state_str {
        if let Err(e2) = location.set_href(&format!("{}/error", origin)){
            return Err(JsError::new(&e2.as_string().unwrap()));
        }
        return Err(JsError::new(&e));
    }
    if load {
        if let Err(e) = location.set_href(&format!("{}/loading/?backtrace={}", origin, state.to_i32())){
            return Err(JsError::new(&e.as_string().unwrap()));
        }
    } else {
        if let Err(e) = location.set_href(&format!("{}/{}", origin, state_str.ok().unwrap())) {
            return Err(JsError::new(&e.as_string().unwrap()));
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_update_url(){
        let res = update_url(0, false);
        assert!(res.is_ok());
    }
}

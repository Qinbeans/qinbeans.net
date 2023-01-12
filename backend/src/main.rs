#[macro_use] extern crate rocket;

mod models;
mod schema;
mod response;
mod request;

use models::{
    establish_connection,
    Database
};
use rocket::{
    serde::json::Json,
    State,
    form::Form
};
use tokio::sync::Mutex;
use dotenvy::dotenv;

const START_ATTEMPT: u32 = 0;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/blog?<start>&<num>")]
async fn blogs(start: &str, num: i32, state: &State<Database>) -> Json<response::Status> {
    let mut conn = state.conn.lock().await;
    let blogs = response::Blog::get(start.parse().unwrap(), num, &mut conn);
    let blogs_string = serde_json::to_string(&blogs);
    if blogs_string.is_err() {
        return Json(response::Status {
            message: "Failed to serialize blogs.".to_string(),
            status: response::StatusType::Error,
            data: None,
        });
    }
    Json(response::Status {
        message: "Success".to_string(),
        status: response::StatusType::Ok,
        data: Some(blogs_string.unwrap()),
    })
}

#[post("/post", data = "<blog>")]
async fn post_blog<'r>(mut blog: Form<request::Blog<'r>>, state: &State<Database>) -> Json<response::Status> {
    let mut conn = state.conn.lock().await;
    let n_blog = blog.to_blog_model();
    let result = n_blog.to_owned().insert(&mut conn);
    if result.is_err() {
        return Json(response::Status {
            message: "Failed to insert blog.".to_string(),
            status: response::StatusType::Error,
            data: None,
        });
    }
    let blog_id = n_blog.get_id(&mut conn);
    if blog_id < 0 {
        return Json(response::Status {
            message: "Failed to get blog id.".to_string(),
            status: response::StatusType::Error,
            data: None,
        });
    }
    let n_images = blog.to_image_models(blog_id).await;
    for n_image in n_images {
        let result = n_image.insert(&mut conn);
        if result.is_err() {
            return Json(response::Status {
                message: "Failed to insert image.".to_string(),
                status: response::StatusType::Error,
                data: None,
            });
        }
    }

    Json(response::Status {
        message: "Success".to_string(),
        status: response::StatusType::Ok,
        data: None,
    })
}

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    dotenv().ok();
    let conn = establish_connection(START_ATTEMPT);
    if conn.is_none() {
        panic!("Failed to connect to database.");
    }
    let db = Database {
        conn: Mutex::new(conn.unwrap()),
    };
    let rocket_result = rocket::build()
        .manage(db)
        .mount("/", routes![index,blogs])
        .mount("/admin", routes![post_blog])
        .launch().await;
    if rocket_result.is_err() {
        return Err(rocket_result.err().unwrap());
    }
    Ok(())
}
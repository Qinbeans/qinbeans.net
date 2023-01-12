use diesel::prelude::*;
use diesel::MysqlConnection;
use rocket::serde::Serialize;
use crate::schema::image;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
#[allow(dead_code)]
pub enum StatusType {
    Ok,
    Error,
    Warning,
    Wip
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Status {
    pub message: String,
    pub status: StatusType,
    pub data: Option<String>,
}

#[derive(Serialize, Queryable, PartialEq, Debug)]
#[serde(crate = "rocket::serde")]
pub struct Image {
    pub id: i32,
    pub data: String,//base64
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Blog {
    pub id: i32,
    pub subject: String,
    pub body: String,
    pub visible: bool,
    pub created: String,
    pub updated: String,
    pub images: Vec<Image>,
}

impl Image {
    fn from_model(img: crate::models::Image) -> Image {
        Image {
            id: img.id,
            data: img.data,
        }
    }
    fn from_models(imgs: Vec<crate::models::Image>) -> Vec<Image> {
        let mut images = Vec::new();
        for img in imgs {
            images.push(Image::from_model(img));
        }
        images
    }
}

impl Blog {
    pub fn get(start: i32, num: i32, conn: &mut MysqlConnection) -> Vec<Blog> {
        use crate::schema::blog;
        let mut blogs = Vec::new();
        for blog in blog::table
            .limit(num as i64)
            .offset(start as i64)
            .load::<crate::models::Blog>(conn)
            .expect("Error loading blogs")
        {
            let images = image::table
                .filter(image::blog_id.eq(blog.id))
                .load::<crate::models::Image>(conn)
                .expect("Error loading images");
            blogs.push(Blog {
                id: blog.id,
                subject: blog.subject,
                body: blog.body,
                visible: blog.visible,
                created: blog.created.to_string(),
                updated: blog.updated.to_string(),
                images: Image::from_models(images),
            });
        }
        blogs
    }
}
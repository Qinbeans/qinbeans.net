use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use std::env;
use std::thread::sleep;
use std::time::Duration;
use chrono::NaiveDateTime;
use tokio::sync::Mutex;
use crate::schema::{
   blog,
   image,
   message
};

const MAX_ATTEMPTS: u32 = 5;

pub struct Database {
   pub conn: Mutex<MysqlConnection>,
}

pub fn establish_connection(attempts: u32) -> Option<MysqlConnection> {
   if attempts >= MAX_ATTEMPTS{
      return None;
   }
   let database_url = env::var("DATABASE_URL").expect("DATABASE_URL not set.");
   let results = MysqlConnection::establish(&database_url);
   if results.is_err(){
      sleep(Duration::from_secs(5));
      return establish_connection(attempts+1);
   }
   Some(results.unwrap())
}

#[derive(Queryable, Insertable, Clone)]
#[diesel(table_name=blog)]
pub struct Blog {
   pub id: i32,
   pub subject: String,
   pub body: String,
   pub visible: bool,
   pub created: NaiveDateTime,
   pub updated: NaiveDateTime,
}

#[derive(Queryable, Insertable)]
#[diesel(table_name=image)]
pub struct Image {
   pub id: i32,
   pub blog_id: i32,
   pub data: String,
   pub created: NaiveDateTime,
   pub updated: NaiveDateTime,
}

#[allow(dead_code)]
pub struct FullBlog {
   pub blog: Blog,
   pub images: Vec<Image>,
}

#[derive(Queryable, Insertable)]
#[diesel(table_name=message)]
pub struct Message {
   pub id: i32,
   pub contact: String,
   pub subject: String,
   pub content: String,
   pub ishuman: bool,
   pub created: NaiveDateTime,
   pub updated: NaiveDateTime,
}

#[derive(Insertable, Clone)]
#[diesel(table_name=blog)]
pub struct NaiveBlog {
   pub subject: String,
   pub body: String,
   pub visible: bool,
}

#[derive(Insertable)]
#[diesel(table_name=image)]
pub struct NaiveImage {
   pub blog_id: i32,
   pub data: String,
}

#[derive(Insertable)]
#[diesel(table_name=message)]
pub struct NaiveMessage {
   pub contact: String,
   pub subject: String,
   pub content: String,
   pub ishuman: bool,
}

impl Blog {
   pub fn create(title: String, content: String, visibility: bool, conn: &mut MysqlConnection) -> Result<NaiveBlog, String> {
      let new_blog = NaiveBlog {
         subject: title,
         body: content,
         visible: visibility,
      };
      let results = diesel::insert_into(blog::table)
         .values(&new_blog)
         .execute(conn);
      if results.is_err(){
         println!("Error: {}", results.err().unwrap());
         return Err("Error creating blog post.".to_string());
      }
      Ok(new_blog)
   }
}

impl NaiveBlog {
   pub fn get_id(self, conn: &mut MysqlConnection) -> i32 {
      // get the blog with matching details to the naive blog
      let results = blog::table
         .filter(blog::subject.eq(&self.subject))
         .filter(blog::body.eq(&self.body))
         .filter(blog::visible.eq(&self.visible))
         .select(blog::id)
         .load::<i32>(conn);
      if results.is_err(){
         println!("Error: {}", results.err().unwrap());
         return -1;
      }
      results.unwrap()[0]
   }
   pub fn expand(self, conn: &mut MysqlConnection) -> Result<Blog, String> {
      let results = blog::table
         .filter(blog::subject.eq(&self.subject))
         .filter(blog::body.eq(&self.body))
         .filter(blog::visible.eq(&self.visible))
         .load::<Blog>(conn);
      if results.is_err(){
         println!("Error: {}", results.err().unwrap());
         return Err("Error expanding blog post.".to_string());
      }
      Ok(results.unwrap()[0].clone())
   }
   pub fn insert(self, conn: &mut MysqlConnection) -> Result<String, String> {
      //create new entry
      let results = diesel::insert_into(blog::table)
         .values(&self)
         .execute(conn);
      if results.is_err(){
         println!("Error: {}", results.err().unwrap());
         return Err("Error creating blog post.".to_string());
      }
      Ok("Blog post created.".to_string())
   }
}

impl Image {
   pub fn create(blog: i32, data: String, conn: &mut MysqlConnection) -> Result<NaiveImage, String> {
      let new_image = NaiveImage {
         blog_id: blog,
         data: data,
      };
      let results = diesel::insert_into(image::table)
         .values(&new_image)
         .execute(conn);
      if results.is_err(){
         println!("Error: {}", results.err().unwrap());
         return Err("Error creating image.".to_string());
      }
      Ok(new_image)
   }
}

impl NaiveImage {
   pub fn get_id(self, conn: &mut MysqlConnection) -> i32 {
      // get the image with matching details to the naive image
      let results = image::table
         .filter(image::blog_id.eq(&self.blog_id))
         .filter(image::data.eq(&self.data))
         .select(image::id)
         .load::<i32>(conn);
      if results.is_err(){
         println!("Error: {}", results.err().unwrap());
         return 0;
      }
      results.unwrap()[0]
   }
   pub fn related_to_blog(blod_id: i32, conn: &mut MysqlConnection) -> Vec<Image> {
      let results = image::table
         .filter(image::blog_id.eq(&blod_id))
         .load::<Image>(conn);
      if results.is_err(){
         println!("Error: {}", results.err().unwrap());
         return Vec::new();
      }
      results.unwrap()
   }
   pub fn insert(self, conn: &mut MysqlConnection) -> Result<String, String> {
      //create new entry
      let results = diesel::insert_into(image::table)
         .values(&self)
         .execute(conn);
      if results.is_err(){
         println!("Error: {}", results.err().unwrap());
         return Err("Error creating image.".to_string());
      }
      Ok("Image created.".to_string())
   }
}

impl Message {
   pub fn create(contact: String, subject: String, content: String, ishuman: bool, conn: &mut MysqlConnection) -> Result<NaiveMessage, String> {
      let new_message = NaiveMessage {
         contact: contact,
         subject: subject,
         content: content,
         ishuman: ishuman,
      };
      let results = diesel::insert_into(message::table)
         .values(&new_message)
         .execute(conn);
      if results.is_err(){
         println!("Error: {}", results.err().unwrap());
         return Err("Error creating message.".to_string());
      }
      Ok(new_message)
   }
}

impl NaiveMessage {
   pub fn get_id(self, conn: &mut MysqlConnection) -> i32 {
      // get the message with matching details to the naive message
      let results = message::table
         .filter(message::contact.eq(&self.contact))
         .filter(message::subject.eq(&self.subject))
         .filter(message::content.eq(&self.content))
         .filter(message::ishuman.eq(&self.ishuman))
         .select(message::id)
         .load::<i32>(conn);
      if results.is_err(){
         println!("Error: {}", results.err().unwrap());
         return -1;
      }
      results.unwrap()[0]
   }
}

impl FullBlog {
   #[allow(dead_code)]
   pub fn get(n_blog: NaiveBlog, conn: &mut MysqlConnection) -> Option<FullBlog> {
      let result = n_blog.expand(conn);
      if result.is_err(){
         return None;
      }
      let blog = result.unwrap();
      let images = NaiveImage::related_to_blog(blog.id, conn);
      Some(FullBlog {
         blog: blog,
         images: images,
      })
   }
}

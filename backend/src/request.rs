use rocket::fs::TempFile;
use uuid::Uuid;
use image::io::Reader as ImageReader;
use rocket::form::{
    FromForm,
    Strict
};

#[derive(FromForm)]
pub struct Blog<'r> {
    pub subject: Strict<&'r str>,
    pub body: Strict<&'r str>,
    pub visible: Strict<bool>,
    pub images: Vec<TempFile<'r>>,
}

impl<'r> Blog<'r> {
    pub fn to_blog_model(&self) -> crate::models::NaiveBlog {
        crate::models::NaiveBlog {
            subject: self.subject.to_string(),
            body: self.body.to_string(),
            visible: *self.visible,
        }
    }
    pub async fn to_image_models(&mut self, blog_id: i32) -> Vec<crate::models::NaiveImage> {
        let mut images = Vec::new();
        //get temp dir
        for image in &mut self.images {
            //uuid
            let path = format!("{}/{}", std::env::temp_dir().to_str().unwrap(), Uuid::new_v4().to_string());
            let persist= image.persist_to(path.to_owned()).await;
            if persist.is_err() {
                continue;
            }
            //turn file content into base64 string
            let reader_result= ImageReader::open(path);
            if reader_result.is_err() {
                //delete file
                continue;
            }
            let img_result = reader_result.unwrap().decode();
            if img_result.is_err() {
                continue;
            }
            //parse into base64 string
            let image = img_result.unwrap();
            let data = "";
            for ele in image.to_rgb8().into_raw() {
                format!("{}{}", data, ele);
            };
            images.push(crate::models::NaiveImage {
                blog_id,
                data: data.to_string(),
            });
        }
        images
    }
}
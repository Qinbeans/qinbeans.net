// @generated automatically by Diesel CLI.

diesel::table! {
    blog (id) {
        id -> Integer,
        subject -> Varchar,
        body -> Text,
        visible -> Bool,
        created -> Datetime,
        updated -> Datetime,
    }
}

diesel::table! {
    blog_tag (id) {
        id -> Integer,
        blog_id -> Integer,
        tag_id -> Integer,
    }
}

diesel::table! {
    image (id) {
        id -> Integer,
        blog_id -> Integer,
        data -> Text,
        created -> Datetime,
        updated -> Datetime,
    }
}

diesel::table! {
    message (id) {
        id -> Integer,
        contact -> Varchar,
        subject -> Varchar,
        content -> Text,
        ishuman -> Bool,
        created -> Datetime,
        updated -> Datetime,
    }
}

diesel::table! {
    tag (id) {
        id -> Integer,
        name -> Varchar,
    }
}

diesel::joinable!(blog_tag -> blog (blog_id));
diesel::joinable!(blog_tag -> tag (tag_id));
diesel::joinable!(image -> blog (blog_id));

diesel::allow_tables_to_appear_in_same_query!(
    blog,
    blog_tag,
    image,
    message,
    tag,
);

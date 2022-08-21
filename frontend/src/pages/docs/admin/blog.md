---
layout: ../../../layouts/docs.astro
title: Blog Form
---
# Blog Form
Each new blog requires a title and message.  There's an optional image used as a background for the blog.

## Structure for viewing
The backend will be queried for blogs (~4 blogs per full height window).  This means the buffer will hold and increment by 4, keeping traffic to the backend to a minimal.

### Query
```json
{
    "token": "d3474044-17c8-4ded-969c-f0bbfe708b10",
    "query": "SELECT * FROM users WHERE id = 1"
}
```

### Result
```json
{
    "results": [
        {
            "id": "d3474044-17c8-4ded-969c-f0bbfe708b10",
            "title": "title",
            "content": "content",
            "date": "2006-01-02 15:04:05",
            "img": "<raw bytes for image>"
        }
    ],
    "message": "some message"
}
```
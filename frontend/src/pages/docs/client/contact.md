---
layout: ../../../layouts/docs.astro
title: Contact Form
---
# Client Contact Form
Clients will fill out a form for contact with a title, message, and email.

```json
{
    "message": "some message"
}
```

![diagram](/docs/client/client.drawio.webp)

## Dealing with spam
The backend will sift through each incoming message and increment into one of the following counters: Spam, Unknown, and Accepted.  If it is accepted, the message will be logged and sent to me at the end of the day vie Email.
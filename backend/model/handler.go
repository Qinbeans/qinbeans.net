package model

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

type Request struct {
	Token string `json:"token"`
	Query string `json:"query"`
}

type Response struct {
	Posts   []Post `json:"posts"`
	Message string `json:"message"`
}

func PostsGuard(c *gin.Context) {
	queries := c.Request.URL.Query()
	if !(queries.Has("num") && queries.Has("filter") && queries.Has("order")) {
		if !(queries.Has("start") && queries.Has("end")) {
			c.JSON(400, gin.H{
				"message": "start and end are required",
			})
			return
		}
		start, err := strconv.Atoi(queries.Get("start"))
		if err != nil {
			//write a response
			c.JSON(400, Response{Message: "Where do I begin?"})
			return
		}
		end, err := strconv.Atoi(queries.Get("end"))
		if err != nil {
			//write a response
			c.JSON(400, Response{Message: "Where do I end?"})
			return
		}
		getPostsWithStartEnd(start, end)
		//query DB for posts with ids starting at start until end
	} else {
		num, err := strconv.Atoi(queries.Get("num"))
		if err != nil {
			//write a response
			c.JSON(400, Response{Message: "How many posts do you want?"})
			return
		}
		order, err := strconv.Atoi(queries.Get("order"))
		if err != nil || (order != 0 && order != 1) {
			//write a response
			c.JSON(400, Response{Message: "Order by ascending or descending?"})
			return
		}
		filter := queries.Get("filter")
		//query DB for num posts
		getPostsWithFilter(filter, num, order)
		return
	}
	//return posts in JSON format
}

func PostGuard(c *gin.Context) {
	//get form
	title := c.PostForm("title")
	if title == "" {
		c.JSON(400, Response{Message: "Title is required"})
		return
	}
	content := c.PostForm("content")
	if content == "" {
		c.JSON(400, Response{Message: "Content is required"})
		return
	}
	img := c.PostForm("img")
	if img == "" {
		c.JSON(400, Response{Message: "Image is required"})
		return
	}
	//create post
	post := NewPost(title, content, img)
	PostIt(c.Writer, c.Request, post)
}

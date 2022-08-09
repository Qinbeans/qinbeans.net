package model

import (
	"net/http"
	"time"

	"api.qinbeans.net/backend/log"
	"github.com/google/uuid"
)

// gorm and json
type Post struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Date    string `json:"date"`
	Img     string `json:"img"`
}

// WIP
func getPostsWithFilter(filter string, num int, order int) []Post {
	log.Logf("filter: %s, number: %d, order: %d", filter, num, order)
	return []Post{}
}

// WIP
func getPostsWithStartEnd(start int, end int) []Post {
	log.Logf("start: %d, end: %d", start, end)
	return []Post{}
}

// WIP
func PostIt(w http.ResponseWriter, r *http.Request, post Post) error {
	//do some GORM stuff
	return nil
}

func NewPost(title string, content string, img string) Post {
	//get today's date
	currentTime := time.Now()
	date := currentTime.Format("2006-01-02 15:04:05")
	id := uuid.New().String()
	return Post{id, title, content, date, img}
}

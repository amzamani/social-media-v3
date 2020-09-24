function loadPosts() {
  $.get("/api/posts", (posts) => {
    //got posts from api

    console.log(posts);
    // let a = abc[posts];

    console.log(posts.length);

    // console.log(posts.(20));

    console.log(posts.__proto__);

    let ab;
    

    for (let p of posts) {
      //looping through each post

      let item = $(`
                    <div class="card border-success mb-3" style="max-width: 180rem ; margin : 40px;" >
                      <div class="card mb-6 card-1 " style="max-width: 1400px; padding: 20px; ">
                        <div class="card-body">
                          <h5 class="card-title ">${p.title}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${
                            p.user.username
                          }</h6>
                          <p class="card-text" id="half">
                            ${p.body.substr(0, 200)}
                            <a  id = "ab" class = " badge badge-pill badge-light">...read more</a>
                          </p>
                          <p class ="card-text" id="full" style="display:none">
                          ${p.body}
                          <br>
                          <br>
                          </p>
                          <input type="text" placeholder="add Comments" class="newComment">
                          <br>
                          <br>
                          <button class="card-link btnComment btn btn-secondary">Comment</button>  
                          <br>
                          <br>
                          <ul class="comment " ></ul> 
                          
                        </div>
                      </div>
                    </div>   
                `);

      
      item.find("#ab").on("click",()=>{
        console.log("rclicked");
        
        // p.body.substr(0, 1000)
        item.find("#full").attr('style','display: inline');
        item.find("#half").attr('style','display: none');
        
      })       
      let commentBox = item.find(".comment");
      for (let comment of p.comments) {
        commentBox.prepend(
          $("<li></li>").text(`[${comment.title}] : ${comment.body}`)
        );
      }

      item.find(".btnComment").on("click", () => {
        $.post(
          "/api/comments",
          {
            post_id: p.id,
            comment_body: item.find(".newComment").val(),
            user_id: JSON.parse(window.localStorage.user).id,
          },
          (comment) => {
            $("#content").load(`/components/all-posts.html`);
          }
        );
      });
      $("#posts-container").prepend(item);
    } 
    $('#ab').on("click",()=>{
      console.log("readmore");
    })
    //loop ends
    
  });
}

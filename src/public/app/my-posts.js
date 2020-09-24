// localStorage.setItem("cbox", 1);
function loadMyPosts() {
  const userId = JSON.parse(window.localStorage.user).id;
  

  $.get(`/api/posts?userId=${userId}`, (posts) => {
    for (let p of posts) {
      let item = $(`
      <div class="card border-success mb-3" style="max-width: 180rem ; margin : 40px;">
        <div class="card m-2">
          <div class="card-body">
            <h5 class="card-title">${p.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${p.user.username}</h6>
            <p class="card-text" id="half">
              ${p.body.substr(0, 200)}
              <a class = " badge badge-pill badge-light" id = "ab">... more</a>
            </p>
            <p class ="card-text" id="full" style="display:none">
                          ${p.body}
                          <br>
                          <br>
                          
            <input type="text" placeholder="add suggestions" class="newComment">
            <br>
            <br>
            <button class="card-link btnComment btn btn-secondary">Comment</button>  
            <br>
            <ul class="comment " id = "list" style = "display : none"></ul>
            </p>
          </div>
        </div>
      </div>   
      `);
      item.find("#ab").on("click", () => {
        console.log("rclicked");
        // p.body.substr(0, 1000)
        // let ccbox = localStorage.getItem("cbox");
        // console.log(ccbox);

        item.find("#half").attr('style', 'display: none');

        
        item.find("#full").attr('style', 'display: inline');
        
        item.find("#list").attr('style', 'display: inline');
        

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
            $("#content").load(`/components/my-posts.html`);
          }
        );
        item.find("#full").attr('style', 'display: inline');
        
        item.find("#list").attr('style', 'display: inline');

      });
      $("#posts-container").prepend(item);
    }
  });
}

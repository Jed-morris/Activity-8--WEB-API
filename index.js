// Initialize postsData array
let postsData = [];

// Function to publish a post
function publishPost() {
  let postText = document.getElementById('postText').value;
  let authorName = document.getElementById('authorName').value || 'Anonymous';
  let newPost = {
    text: postText,
    author: authorName,
    replies: [],
    likes: 0,
    loves: 0,
    unlikes: 0
  };

  postsData.push(newPost);
  localStorage.setItem('postsData', JSON.stringify(postsData));
  showPosts();

  // Clear the text area and author name after publishing
  document.getElementById('postText').value = "";
  document.getElementById('authorName').value = "";
}

// Function to show posts
function showPosts() {
  let storedPosts = JSON.parse(localStorage.getItem('postsData')) || [];
  let postsSection = $('#postsSection');
  postsSection.empty(); // Clear existing posts

  storedPosts.forEach(function (post, index) {
    let postHtml = `
      <div class="col-sm-12">
        <p class="author-name">${post.author}: ${post.text}</p>
        <button type="button" class="btn btn-primary" onclick="toggleLike(${index})">
          <span class="glyphicon glyphicon-thumbs-up"></span> Like
        </button>
        <span id="likesCount${index}" class="like-icon">${post.likes || 0}</span>
        <button type="button" class="btn btn-danger" onclick="toggleLove(${index})">
          <span class="glyphicon glyphicon-heart"></span> Love
        </button>
        <span id="lovesCount${index}" class="love-icon">${post.loves || 0}</span>
        <button type="button" class="btn btn-warning" onclick="toggleUnlike(${index})">
          <span class="glyphicon glyphicon-thumbs-down"></span> Unlike
        </button>
        <span id="unlikesCount${index}" class="unlike-icon">${post.unlikes || 0}</span>
        <br>
        <textarea id="replyText${index}" rows="2" placeholder="Write a reply"></textarea>
        <button type="button" class="btn btn-info" onclick="replyToPost(${index})">Reply</button>
        <br>
        <div id="repliesSection${index}">
          <!-- Replies will be dynamically added here -->
        </div>
      </div>
    `;

    postsSection.append(postHtml);
    renderReplies(index);
  });

  // Update post count
  $('#postCount').text(storedPosts.length);
}

// Function to render replies for a post
function renderReplies(postIndex) {
  let repliesSection = $('#repliesSection' + postIndex);
  repliesSection.empty(); // Clear existing replies

  postsData[postIndex].replies.forEach(function (reply, replyIndex) {
    let replyHtml = `
      <div class="col-sm-12">
        <p class="author-name">${reply.author}: ${reply.text}</p>
        <button type="button" class="btn btn-primary" onclick="toggleLike(${postIndex}, ${replyIndex})">
          <span class="glyphicon glyphicon-thumbs-up"></span> Like
        </button>
        <span id="likesCount${postIndex}-${replyIndex}" class="like-icon">${reply.likes || 0}</span>
        <button type="button" class="btn btn-danger" onclick="toggleLove(${postIndex}, ${replyIndex})">
          <span class="glyphicon glyphicon-heart"></span> Love
        </button>
        <span id="lovesCount${postIndex}-${replyIndex}" class="love-icon">${reply.loves || 0}</span>
        <button type="button" class="btn btn-warning" onclick="toggleUnlike(${postIndex}, ${replyIndex})">
          <span class="glyphicon glyphicon-thumbs-down"></span> Unlike
        </button>
        <span id="unlikesCount${postIndex}-${replyIndex}" class="unlike-icon">${reply.unlikes || 0}</span>
      </div>
    `;

    repliesSection.append(replyHtml);
  });
}

// Function to reply to a post
function replyToPost(postIndex) {
  let replyText = document.getElementById('replyText' + postIndex).value;
  let authorName = document.getElementById('authorName').value || 'Anonymous'; // Changed from 'authorName' + postIndex to 'authorName'
  let newReply = {
    text: replyText,
    author: authorName,
    likes: 0,
    loves: 0,
    unlikes: 0
  };

  postsData[postIndex].replies.push(newReply);
  renderReplies(postIndex);
  localStorage.setItem('postsData', JSON.stringify(postsData));

  // Clear the reply text area and author name after replying
  document.getElementById('replyText' + postIndex).value = "";
  document.getElementById('authorName').value = ""; // Changed from 'authorName' + postIndex to 'authorName'
}

// Function to toggle like on a post or reply
function toggleLike(postIndex, replyIndex) {
  let target = replyIndex !== undefined ? postsData[postIndex].replies[replyIndex] : postsData[postIndex];
  target.likes = target.likes ? 0 : 1; // Toggle like

  // Update likes count and color
  let elementId = replyIndex !== undefined ? `likesCount${postIndex}-${replyIndex}` : `likesCount${postIndex}`;
  $('#' + elementId).text(target.likes);
  $('#' + elementId).toggleClass('like-icon', target.likes !== 0);
  localStorage.setItem('postsData', JSON.stringify(postsData));
}

// Function to toggle love on a post or reply
function toggleLove(postIndex, replyIndex) {
  let target = replyIndex !== undefined ? postsData[postIndex].replies[replyIndex] : postsData[postIndex];
  target.loves = target.loves ? 0 : 1; // Toggle love

  // Update loves count and color
  let elementId = replyIndex !== undefined ? `lovesCount${postIndex}-${replyIndex}` : `lovesCount${postIndex}`;
  $('#' + elementId).text(target.loves);
  $('#' + elementId).toggleClass('love-icon', target.loves !== 0);
  localStorage.setItem('postsData', JSON.stringify(postsData));
}

// Function to toggle unlike on a post or reply
function toggleUnlike(postIndex, replyIndex) {
  let target = replyIndex !== undefined ? postsData[postIndex].replies[replyIndex] : postsData[postIndex];
  target.unlikes = target.unlikes ? 0 : 1; // Toggle unlike

  // Update unlikes count and color
  let elementId = replyIndex !== undefined ? `unlikesCount${postIndex}-${replyIndex}` : `unlikesCount${postIndex}`;
  $('#' + elementId).text(target.unlikes);
  $('#' + elementId).toggleClass('unlike-icon', target.unlikes !== 0);
  localStorage.setItem('postsData', JSON.stringify(postsData));
}

// Initial rendering of posts
showPosts();
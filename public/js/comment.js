// Comment handler
async function commentFormHandler(event) {
  event.preventDefault();
  // Collect values from the comment form
  const comment_text = document.querySelector("#comment-text").value.trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  // Send a POST request to the API endpoint
  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // If successful, reload the page
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
    .querySelector("#comment-form")
    .addEventListener("submit", commentFormHandler);

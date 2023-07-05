// New post form handler
async function newFormHandler(event) {
  console.log("AAAAAAAAAAAAAAAAAA");
  event.preventDefault();
  // Collect values from the new post form
  const title = document.querySelector("#post-title").value.trim();
  const post_text = document.querySelector("#post-text").value.trim();
  // Send a POST request to the API endpoint
  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content: post_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response", response);
  // If successful, reload the page to display the new post
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

// Add event listener to the new post form
document
  .querySelector("#createPost-btn")
  .addEventListener("click", newFormHandler);

// New post form handler
async function newFormHandler(event) {
  event.preventDefault();
  // Collect values from the new post form
  const title = document.querySelector("#post-title").value.trim();
  const post_text = document.querySelector("#post-text").value.trim();
  // Send a POST request to the API endpoint
  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      post_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // If successful, redirect the browser to the dashboard page
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

// Add event listener to the new post form
document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormHandler);

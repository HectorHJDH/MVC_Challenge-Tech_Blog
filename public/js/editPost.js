// Edit post form handler

async function editFormHandler(event) {
  event.preventDefault();
  // Collect values from the edit post form
  const title = document.querySelector("#post-title").value.trim();
  const post_text = document.querySelector("#post-text").value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  // Send a PUT request to the API endpoint
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
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

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editFormHandler);

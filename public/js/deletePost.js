// delete post handler
async function deleteFormHandler(event) {
  event.preventDefault();
  // Collect values from the delete post form
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  // Send a DELETE request to the API endpoint
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  // If successful, redirect the browser to the dashboard page
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#delete-post-btn")
  .addEventListener("click", deleteFormHandler);

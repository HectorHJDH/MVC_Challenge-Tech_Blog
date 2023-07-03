// signup handler
const signUpFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    // Send a POST request to the server for sign-in
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect the user to the dashboard or any other page
        document.location.replace("/dashboard");
      } else {
        // Display an error message if sign-in is unsuccessful
        alert("Sign-in failed. Please check your username and password.");
      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signUpFormHandler);

const existingToken = localStorage.getItem("token");
if (existingToken) {
  window.location.href = "admin.html";
}

async function login() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const msg = document.getElementById("msg");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    msg.innerText = "Please enter email and password";
    msg.style.color = "red";
    return;
  }

  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "admin.html";
    } else {
      msg.innerText = data.message || "Invalid email or password";
      msg.style.color = "red";
      passwordInput.value = "";
    }
  } catch (err) {
    msg.innerText = "Server error. Please try again.";
    msg.style.color = "red";
    passwordInput.value = "";
  }
}

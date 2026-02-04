console.log("js connected");

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
    }
  });
}

// 🎬 Video playlist
const playlist = [
  "assests/video/hero1.mp4",
  "assests/video/hero2.mp4",
  "assests/video/hero3.mp4"
];

const video = document.getElementById("heroVideo");

if (video) {
  let index = 0;
  video.src = playlist[index];
  video.play();

  video.addEventListener("ended", () => {
    index = (index + 1) % playlist.length;
    video.src = playlist[index];
    video.play();
  });
}

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ✅ Booking Form
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      service: document.getElementById("service").value,
      date: document.getElementById("date").value,
      message: document.getElementById("message").value,
    };

    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/api/booking/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Booking Successful! ✅");
        bookingForm.reset();
      } else {
        alert(result.message || "Booking failed");
      }
    } catch (error) {
      alert("Server error");
    }
  });
}

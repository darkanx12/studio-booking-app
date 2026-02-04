const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "admin-login.html";
}

async function loadBookings() {
  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/api/booking/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "admin-login.html";
      return;
    }

    const data = await res.json();

    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const table = document.getElementById("bookingTable");
    table.innerHTML = "";

    data.forEach((booking) => {
      const formattedDate = booking.date
        ? new Date(booking.date).toLocaleDateString()
        : "-";

      table.innerHTML += `
        <tr>
          <td>${booking.name}</td>
          <td>${booking.phone}</td>
          <td>${booking.service}</td>
          <td>${formattedDate}</td>
          <td>${booking.message || "-"}</td>
          <td>
            <button onclick="deleteBooking('${booking._id}')">Delete</button>
          </td>
        </tr>
      `;
    });
  } catch (err) {
    console.error(err);
  }
}

async function deleteBooking(id) {
  await fetch(`${CONFIG.API_BASE_URL}/api/booking/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  loadBookings();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "admin-login.html";
}

loadBookings();

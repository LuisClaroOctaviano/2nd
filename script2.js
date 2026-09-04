const activities = {
  "Rug Tufting": {
    location: "Makati City",
    image: "activity-images/rug-tufting.png"
  },
  "Ceramic Painting": {
    location: "Makati City",
    image: "activity-images/ceramic-painting.png"
  },
  "Clay Pottery": {
    location: "Makati City",
    image: "activity-images/clay-pottery.png"
  }
};

const activitySelect = document.getElementById("activity-selected");
const result = document.getElementById("activity-result");
const message = document.getElementById("selection-message");
const submitButton = document.getElementById("submit-selection");

function showActivity(activityName) {
  const activity = activities[activityName];
  result.innerHTML = "";
  message.innerHTML = "";

  if (!activity) return;

  result.innerHTML = `
    <div class="activity-card">
      <div class="activity-image-wrap">
        <img src="${activity.image}" alt="${activityName}">
      </div>
      <div class="activity-info">
        <h2>${activityName}</h2>
        <p>📍 ${activity.location}</p>
      </div>
    </div>
  `;
}

activitySelect.addEventListener("change", function () {
  showActivity(this.value);
});

submitButton.addEventListener("click", function () {
  const activity = activitySelect.value;

  if (!activity) {
    message.innerHTML = "<p class='error'>Please choose an activity first.</p>";
    return;
  }

  localStorage.setItem("selectedActivity", activity);
  localStorage.setItem("selectedLocation", activities[activity].location);
  localStorage.setItem("selectedImage", activities[activity].image);

  window.location.href = "2.html";
});

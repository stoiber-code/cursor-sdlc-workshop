const profiles = [
  {
    name: "Maya",
    handicap: "HCP 12",
    distance: "6 miles away",
    course: "Presidio Golf Course",
    availability: "Sat mornings",
    bio: "Walking 18, keeps a steady pace, always up for a casual competitive round.",
    hints: ["Similar skill level", "Shared morning availability", "Mutual course"],
    photo: "linear-gradient(135deg, #2f855a, #68d391)",
  },
  {
    name: "Jordan",
    handicap: "HCP 16-20",
    distance: "11 miles away",
    course: "TPC Harding Park",
    availability: "Sun afternoons",
    bio: "Rides most rounds, likes 9 holes after lunch, relaxed vibe and no pressure.",
    hints: ["Within travel radius", "Same 9-hole preference", "Good weekend overlap"],
    photo: "linear-gradient(135deg, #2b6cb0, #63b3ed)",
  },
  {
    name: "Chris",
    handicap: "New / Unknown",
    distance: "4 miles away",
    course: "Lincoln Park Golf Course",
    availability: "Weekday twilight",
    bio: "Newer golfer looking for a recurring group, easygoing round, and good course chat.",
    hints: ["Very close by", "Flexible schedule", "Recurring group interest"],
    photo: "linear-gradient(135deg, #805ad5, #d6bcfa)",
  },
];

const profileCard = document.getElementById("profile-card");
const profileCount = document.getElementById("profile-count");
const matchCount = document.getElementById("match-count");
const matchesList = document.getElementById("matches-list");
const passButton = document.getElementById("pass-button");
const likeButton = document.getElementById("like-button");

let currentIndex = 0;
let likedProfiles = [];

function renderProfile() {
  const profile = profiles[currentIndex];

  profileCount.textContent = profile
    ? `${currentIndex + 1} of ${profiles.length}`
    : "Done";

  if (!profile) {
    profileCard.innerHTML = `
      <div class="profile-body">
        <p class="section-label">All caught up</p>
        <h3>No more golfers to review.</h3>
        <p class="profile-bio">You made it through the starter stack. Refresh to browse again.</p>
      </div>
    `;
    passButton.disabled = true;
    likeButton.disabled = true;
    return;
  }

  profileCard.innerHTML = `
    <div class="profile-photo" style="background-image: ${profile.photo};">
      <h3>${profile.name}</h3>
    </div>
    <div class="profile-body">
      <ul class="profile-meta">
        <li>${profile.handicap}</li>
        <li>${profile.distance}</li>
        <li>${profile.course}</li>
        <li>${profile.availability}</li>
      </ul>
      <p class="profile-bio">${profile.bio}</p>
      <p class="section-label">Why this match?</p>
      <ul class="hint-list">
        ${profile.hints.map((hint) => `<li>${hint}</li>`).join("")}
      </ul>
    </div>
  `;

  passButton.disabled = false;
  likeButton.disabled = false;
}

function renderMatches() {
  matchCount.textContent = `${likedProfiles.length} liked`;

  if (likedProfiles.length === 0) {
    matchesList.innerHTML = `
      <li>
        <p class="empty-state">Liked golfers will appear here so you can quickly review possible playing partners.</p>
      </li>
    `;
    return;
  }

  matchesList.innerHTML = likedProfiles
    .map(
      (profile) => `
        <li class="match-item">
          <strong>${profile.name}</strong>
          <p>${profile.handicap} · ${profile.course} · ${profile.availability}</p>
        </li>
      `,
    )
    .join("");
}

function moveToNextProfile() {
  currentIndex += 1;
  renderProfile();
}

passButton.addEventListener("click", () => {
  moveToNextProfile();
});

likeButton.addEventListener("click", () => {
  const profile = profiles[currentIndex];

  if (profile) {
    likedProfiles = [...likedProfiles, profile];
    renderMatches();
  }

  moveToNextProfile();
});

renderProfile();
renderMatches();

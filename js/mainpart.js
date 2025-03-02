let completedTasks = 0;
const totalTasks = 6;

const bgColors = [
  "#f1f5f9",
  "#c9bba0",
  "#dbe5c3",
  "#9999ff",
  "#fdf2f8",
  "#153578",
  "#becee3",
  "#f4c2c2",
  "#ffd89c",
  "#ff6b81",
];

function completeTask(buttonId) {
  if (!buttonId) {
    const button = event.target;
    handleTaskCompletion(button);
  } else {
    const button = document.getElementById(buttonId);
    handleTaskCompletion(button);
  }
}

function handleTaskCompletion(button) {
  if (!button.disabled) {
    const card = button.closest(".bg-white.rounded-lg.p-5");
    const projectName = card
      .querySelector(".bg-gray-50.inline-block")
      .textContent.trim();
    const taskName = card
      .querySelector(".font-bold.text-lg")
      .textContent.trim();

    alert(`Board Update Successfully`);

    button.disabled = true;
    button.classList.remove("bg-blue-600");
    button.classList.add("bg-gray-400", "cursor-not-allowed");
    button.textContent = "Completed";

    updateCounters();
    addActivityLog(projectName, taskName);

    completedTasks++;
    if (completedTasks === totalTasks) {
      setTimeout(() => {
        alert("Congrates!!! You Have Completed All the current Task");
      }, 500);
    }
  }
}

function updateCounters() {
  let checkCount = document.getElementById("addcunt");
  checkCount.innerText = parseInt(checkCount.innerText) + 1;

  let taskCount = document.getElementById("les");
  taskCount.innerText = parseInt(taskCount.innerText) - 1;
}

function addActivityLog(project, task) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;

  const activityLogContainer = document.querySelector(".space-y-4");
  const logEntry = document.createElement("div");
  logEntry.className = "border-l-4 border-blue-600 bg-blue-50 p-3 rounded";
  logEntry.innerHTML = `<p class="text-sm">You have completed the task ${task} at ${formattedTime}</p>`;

  activityLogContainer.prepend(logEntry);
}

function clearActivityHistory() {
  const activityLogContainer = document.querySelector(".space-y-4");
  activityLogContainer.innerHTML = "";
}

function goToBlogs(event) {
  event.preventDefault();
  window.location.href = "./blogs.html";
}

function changeTheme() {
  const currentColor = document.body.style.backgroundColor;
  let newColor;

  do {
    newColor = bgColors[Math.floor(Math.random() * bgColors.length)];
  } while (newColor === currentColor && bgColors.length > 1);

  document.body.style.backgroundColor = newColor;

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 1500);
}

function updateDateDisplay() {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  const year = now.getFullYear();

  document.getElementById("current-day").textContent = dayOfWeek + ",";
  document.getElementById("current-date").textContent =
    month + " " + date + " " + year;
}

document.addEventListener("DOMContentLoaded", function () {
  updateDateDisplay();

  const completeButtons = document.querySelectorAll(
    ".bg-blue-600.text-white.px-4.py-2.rounded-md.text-sm:not([onclick])"
  );
  completeButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      completeTask();
    });
  });

  const clearHistoryButton = document.querySelector(
    ".flex.justify-center.mb-6 .bg-blue-600.text-white.px-4.py-2.rounded-md.text-sm"
  );
  clearHistoryButton.addEventListener("click", clearActivityHistory);

  const discoverBanner = document.querySelector(
    ".bg-primary-gradient.rounded-lg"
  );
  discoverBanner.addEventListener("click", goToBlogs);

  if (document.getElementById("completeBtn")) {
    document
      .getElementById("completeBtn")
      .setAttribute("onclick", "completeTask('completeBtn')");
  }

  if (document.getElementById("completeBtn-2")) {
    document
      .getElementById("completeBtn-2")
      .setAttribute("onclick", "completeTask('completeBtn-2')");
  }

  const themeButton = document.querySelector(
    "nav .flex.items-center.gap-6 div:last-child img"
  );
  if (themeButton) {
    themeButton.style.cursor = "pointer";
    themeButton.addEventListener("click", changeTheme);
  }
});

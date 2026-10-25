// Edit this project list to make each tile open your own work.
const projects = {
  film: {
    number: "01", label: "FILM / 2026", title: "somewhere, after the rain",
    description: "A short film about a place, a memory, and the version of it that stays with you. Replace this with your own description.",
    type: "video", media: "", link: ""
  },
  vlog: {
    number: "02", label: "VLOG / 2026", title: "a few days outside",
    description: "A personal video log assembled from little observations and moments worth keeping.",
    type: "video", media: "", link: ""
  },
  design: {
    number: "03", label: "GRAPHIC DESIGN / 2026", title: "not here yet.",
    description: "A poster and type study. Add the concept, tools, and context behind your design.",
    type: "image", media: "assets/your-poster.jpg", link: ""
  },
  edit: {
    number: "04", label: "VIDEO EDIT / 2025", title: "cut / pause / repeat",
    description: "An edit exploring pacing, repetition, and the texture of found images.",
    type: "video", media: "", link: ""
  },
  music: {
    number: "05", label: "MUSIC / 2026", title: "demo for later",
    description: "A work-in-progress track. Add a note about the sound, production, or idea behind it.",
    type: "audio", media: "assets/demo-for-later.mp3", link: ""
  },
  posts: {
    number: "06", label: "DIGITAL DESIGN / 2025", title: "untitled post #17",
    description: "A fictional social post / digital object. Use this space to show a sequence of designs or link to a full project.",
    type: "image", media: "assets/your-post.jpg", link: ""
  }
};

const filterButtons = [...document.querySelectorAll(".category")];
const workItems = [...document.querySelectorAll(".work-item")];
const emptyMessage = document.querySelector(".empty-message");
filterButtons.forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  let count = 0;
  filterButtons.forEach(b => {
    const active = b === button;
    b.classList.toggle("active", active);
    b.setAttribute("aria-pressed", String(active));
  });
  workItems.forEach(item => {
    const visible = filter === "all" || item.dataset.category === filter;
    item.hidden = !visible;
    if (visible) count++;
  });
  emptyMessage.hidden = count > 0;
}));

const modal = document.querySelector("#project-modal");
const modalMedia = document.querySelector("#modal-media");
let previousFocus = null;

function showProject(id, button) {
  const p = projects[id];
  if (!p) return;
  previousFocus = button;
  document.querySelector("#modal-label").textContent = p.label;
  document.querySelector("#modal-number").textContent = `[ ${p.number} ]`;
  document.querySelector("#modal-title").textContent = p.title;
  document.querySelector("#modal-description").textContent = p.description;
  modalMedia.replaceChildren();

  if (!p.media) {
    const note = document.createElement("div");
    note.className = "media-note";
    note.textContent = "ADD YOUR MEDIA: set the media field for this project in script.js. You can use an image path, a direct audio file, or an official video embed URL.";
    modalMedia.append(note);
  } else if (p.type === "image") {
    const img = document.createElement("img");
    img.src = p.media;
    img.alt = p.title;
    img.loading = "lazy";
    modalMedia.append(img);
  } else if (p.type === "audio") {
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "none";
    audio.src = p.media;
    modalMedia.append(audio);
  } else {
    const frame = document.createElement("iframe");
    frame.src = p.media; // Example: https://www.youtube-nocookie.com/embed/VIDEO_ID
    frame.title = `${p.title} video`;
    frame.loading = "lazy";
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    modalMedia.append(frame);
  }

  const link = document.querySelector("#modal-link");
  if (p.link) {
    link.href = p.link;
    link.hidden = false;
  } else {
    link.hidden = true;
    link.removeAttribute("href");
  }
  modal.showModal();
  document.querySelector("#modal-close").focus();
}
document.querySelectorAll(".work-button").forEach(button => button.addEventListener("click", () => showProject(button.dataset.id, button)));
function closeModal() { if (modal.open) modal.close(); }
document.querySelector("#modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
modal.addEventListener("close", () => {
  modalMedia.replaceChildren(); // Stops audio/video when the dialog closes.
  if (previousFocus) previousFocus.focus();
});

const toggle = document.querySelector("#nav-toggle");
const nav = document.querySelector("#site-nav");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
  toggle.querySelector("span").textContent = open ? "＋" : "－";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.querySelector("span").textContent = "＋";
}));
document.querySelector("#year").textContent = new Date().getFullYear();

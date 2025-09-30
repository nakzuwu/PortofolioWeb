/* ===========================
 🌟 PORTFOLIO LOADER
=========================== */
fetch("data/portfolio.json")
  .then((res) => res.json())
  .then((data) => {
    const imageContainer = document.querySelector(".portfolio-images");
    const videoContainer = document.querySelector(".portfolio-videos");

    // Gambar
    data.images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Portfolio Image";
      imageContainer.appendChild(img);
    });

    // Video
    data.videos.forEach((src) => {
      const wrapper = document.createElement("div");
      wrapper.className = "grid-item";

      const video = document.createElement("video");
      Object.assign(video, {
        src,
        muted: true,
        autoplay: true,
        loop: true,
        playsInline: true,
      });

      video.setAttribute("playsinline", "");
      video.setAttribute("muted", "");
      video.setAttribute("preload", "auto");
      Object.assign(video.style, {
        pointerEvents: "none",
        userSelect: "none",
        display: "block",
        width: "100%",
        borderRadius: "10px",
      });

      wrapper.appendChild(video);
      videoContainer.appendChild(wrapper);
    });
  })
  .catch((err) => console.error("❌ Gagal memuat portfolio.json:", err));

/* ===========================
 🖼️ NON-CLICKABLE MEDIA
=========================== */
document.addEventListener("contextmenu", (e) => {
  if (["IMG", "VIDEO"].includes(e.target.tagName)) e.preventDefault();
});

/* ===========================
 💻 REPOSITORY SECTION
=========================== */
document.addEventListener("DOMContentLoaded", () => {
  const repos = [
    {
      name: "UsekaiWeb",
      description: "Website untuk aplikasi Usekai, menggunakan Blade.",
      url: "https://github.com/nakzuwu/UsekaiWeb",
      language: "Laravel",
      image: "repo-image.jpg",
    },
    {
      name: "VisionAidBackend",
      description: "Backend untuk aplikasi VisionAid, menggunakan Python.",
      url: "https://github.com/nakzuwu/VisionAidBackend",
      language: "Python",
      image: "repo-image.jpg",
    },
    {
      name: "VisionAidFrontend",
      description: "Frontend untuk aplikasi VisionAid, menggunakan Dart.",
      url: "https://github.com/nakzuwu/VisionAidFrontend",
      language: "Flutter",
      image: "repo-image.jpg",
    },
    {
      name: "Reika-Bot-Discord",
      description: "Discord bot yang dibuat dengan Python.",
      url: "https://github.com/nakzuwu/Reika-Bot-Discord",
      language: "Python",
      image: "repo-image.jpg",
    },
    {
      name: "WarisanBiru",
      description: "Sebuah Game Pembelajaran mengenai Terumbu Karang.",
      url: "https://github.com/nakzuwu/WarisanBiru",
      language: "C#",
      image: "repo-image.jpg",
    },
  ];

  const reposContainer = document.querySelector(".portfolio-repos");

  repos.forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.classList.add("repo-card");
    repoCard.innerHTML = `
      <img src="${repo.image}" alt="${repo.name}">
      <h4>${repo.name}</h4>
      <p>${repo.description}</p>
      <a href="${repo.url}" target="_blank">View on GitHub</a>
    `;
    reposContainer.appendChild(repoCard);
  });
});

/* ===========================
 🔁 TAB SWITCHING
=========================== */
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active-tab"));
    contents.forEach((c) => c.classList.add("hidden"));
    tab.classList.add("active-tab");
    document
      .querySelector(`#tab-${tab.dataset.tab}`)
      .classList.remove("hidden");
  });
});

/* ===========================
 ✨ CHANGING WORD ANIMATION
=========================== */
const words = ["Creative!", "Happy!", "Smile!", "Positive!", "Humble!"];
const wordEl = document.getElementById("changing-word");
let index = 0;
let animating = false;

function changeWord() {
  if (animating) return;
  animating = true;

  wordEl.style.animation = "slideOut 0.4s ease forwards";

  setTimeout(() => {
    index = (index + 1) % words.length;
    wordEl.textContent = words[index];
    wordEl.style.animation = "slideIn 0.4s ease forwards";

    setTimeout(() => (animating = false), 400);
  }, 400);
}

setInterval(changeWord, 2000);

/* ===========================
 🧩 PLACEHOLDER UTILS
=========================== */
function createImagePlaceholder(aspect = "landscape") {
  const placeholder = document.createElement("div");
  placeholder.className = `image-placeholder ${aspect}`;
  return placeholder;
}

function createVideoPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.className = "video-placeholder";
  return placeholder;
}

/* ===========================
 🖼️ LAZY LOAD MEDIA
=========================== */
function loadImageWithPlaceholder(img, src, alt = "Portfolio image") {
  const gridItem = img.closest(".grid-item");
  const placeholder = createImagePlaceholder(
    gridItem?.dataset.aspect || "landscape"
  );

  img.style.display = "none";
  gridItem.appendChild(placeholder);
  gridItem.classList.add("loading");

  img.onload = () => {
    placeholder.remove();
    img.style.display = "block";
    gridItem.classList.replace("loading", "loaded");
    setTimeout(() => (img.style.opacity = "1"), 50);
  };

  img.onerror = () => {
    placeholder.classList.add("error");
    gridItem.classList.add("error");
    gridItem.classList.remove("loading");
    console.error(`Failed to load image: ${src}`);
  };

  img.src = src;
  img.alt = alt;
}

function loadVideoWithPlaceholder(
  video,
  src,
  poster = "",
  alt = "Portfolio video"
) {
  const gridItem = video.closest(".grid-item");
  const placeholder = createVideoPlaceholder();

  video.style.display = "none";
  gridItem.appendChild(placeholder);
  gridItem.classList.add("loading");

  video.onloadeddata = () => {
    placeholder.remove();
    video.style.display = "block";
    gridItem.classList.replace("loading", "loaded");
    setTimeout(() => (video.style.opacity = "1"), 50);
  };

  video.onerror = () => {
    placeholder.classList.add("error");
    gridItem.classList.add("error");
    gridItem.classList.remove("loading");
    console.error(`Failed to load video: ${src}`);
  };

  if (poster) video.poster = poster;
  video.src = src;
}

/* ===========================
 🎞️ PORTFOLIO INITIALIZER
=========================== */
function initializePortfolioImages() {
  const imagesGrid = document.querySelector(".portfolio-images.grid");
  if (!imagesGrid) return;

  const portfolioImages = [
    { src: "images/design1.jpg", alt: "Graphic Design 1", aspect: "landscape" },
    { src: "images/design2.jpg", alt: "Graphic Design 2", aspect: "portrait" },
    { src: "images/design3.jpg", alt: "Graphic Design 3", aspect: "square" },
    { src: "images/design4.jpg", alt: "Graphic Design 4", aspect: "landscape" },
  ];

  portfolioImages.forEach((image, i) => {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.dataset.type = "image";
    gridItem.dataset.aspect = image.aspect;

    const img = document.createElement("img");
    img.loading = "lazy";
    gridItem.appendChild(img);
    imagesGrid.appendChild(gridItem);

    setTimeout(
      () => loadImageWithPlaceholder(img, image.src, image.alt),
      i * 100
    );
  });
}

function initializePortfolioVideos() {
  const videosGrid = document.querySelector(".portfolio-videos.grid");
  if (!videosGrid) return;

  const portfolioVideos = [
    {
      src: "videos/edit1.mp4",
      poster: "videos/poster1.jpg",
      alt: "Video Edit 1",
    },
    {
      src: "videos/edit2.mp4",
      poster: "videos/poster2.jpg",
      alt: "Video Edit 2",
    },
  ];

  portfolioVideos.forEach((video, i) => {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.dataset.type = "video";

    const videoEl = document.createElement("video");
    videoEl.controls = true;
    videoEl.muted = true;
    videoEl.preload = "metadata";

    gridItem.appendChild(videoEl);
    videosGrid.appendChild(gridItem);

    setTimeout(
      () =>
        loadVideoWithPlaceholder(videoEl, video.src, video.poster, video.alt),
      i * 150
    );
  });
}

/* ===========================
 💤 INTERSECTION OBSERVER
=========================== */
function initializeLazyLoading() {
  const lazyMedia = document.querySelectorAll(
    'img[loading="lazy"], video[loading="lazy"]'
  );
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const media = entry.target;
      media.src = media.dataset.src;
      if (media.dataset.poster) media.poster = media.dataset.poster;
      obs.unobserve(media);
    });
  });

  lazyMedia.forEach((m) => observer.observe(m));
}

/* ===========================
 📁 REPO GRID (LIMIT + SHOW MORE)
=========================== */
const repoContainer = document.getElementById("repo-grid");
const showMoreBtn = document.getElementById("show-more");
const reposList = Array.from({ length: 20 }, (_, i) => ({
  name: `Project-${i + 1}`,
  desc: "My awesome project!",
  link: "#",
}));
let visibleCount = 10;

function renderRepos() {
  repoContainer.innerHTML = reposList
    .slice(0, visibleCount)
    .map(
      (r) => `
        <div class="repo-card">
          <h4>${r.name}</h4>
          <p>${r.desc}</p>
          <a href="${r.link}" target="_blank">View Repo</a>
        </div>
      `
    )
    .join("");

  showMoreBtn.classList.toggle("hidden", visibleCount >= reposList.length);
}

showMoreBtn.addEventListener("click", () => {
  visibleCount += 10;
  renderRepos();
});

renderRepos();

/* ===========================
 🚀 INITIALIZATION
=========================== */
document.addEventListener("DOMContentLoaded", () => {
  initializeLazyLoading();

  // Tab logic
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.dataset.tab;
      initializePortfolioImages();
      initializePortfolioVideos();
    });
  });

  // Init first tab
  const activeTab = document.querySelector(".tab-btn.active-tab");
  if (activeTab) initializePortfolioImages();
});

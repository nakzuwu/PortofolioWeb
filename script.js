fetch("data/portfolio.json")
  .then((res) => res.json())
  .then((data) => {
    const imageContainer = document.querySelector(".portfolio-images");
    const videoContainer = document.querySelector(".portfolio-videos");

    data.images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Portfolio Image";
      imageContainer.appendChild(img);
    });

    data.videos.forEach((src) => {
      const wrapper = document.createElement("div");
      wrapper.className = "grid-item";

      const video = document.createElement("video");
      video.src = src;
      video.muted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("muted", "");
      video.setAttribute("preload", "auto");
      video.controls = false;
      video.style.pointerEvents = "none";
      video.style.userSelect = "none";
      video.style.display = "block";
      video.style.width = "100%";
      video.style.borderRadius = "10px";

      wrapper.appendChild(video);
      videoContainer.appendChild(wrapper);
    });
  })
  .catch((err) => console.error("❌ Gagal memuat portfolio.json:", err));
document.addEventListener("contextmenu", function (e) {
  if (e.target.tagName === "IMG" || e.target.tagName === "VIDEO") {
    e.preventDefault();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Daftar repositori manual
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
      image: "repo-image.jpg", // Ganti dengan gambar repositori jika ada
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
      name: "WarisanBiru ",
      description: "Sebuah Game Pembelajaran mengenai Terumbu Karang",
      url: "https://github.com/nakzuwu/WarisanBiru",
      language: "C#",
      image: "repo-image.jpg",
    },
  ];

  const reposContainer = document.querySelector(".portfolio-repos");

  repos.forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.classList.add("repo-card");

    // Gambar repositori
    const repoImage = document.createElement("img");
    repoImage.src = repo.image; // Menggunakan gambar repositori yang dimasukkan manual
    repoImage.alt = repo.name;
    repoCard.appendChild(repoImage);

    const repoTitle = document.createElement("h4");
    repoTitle.textContent = repo.name;

    const repoDesc = document.createElement("p");
    repoDesc.textContent = repo.description;

    const repoLink = document.createElement("a");
    repoLink.href = repo.url;
    repoLink.target = "_blank";
    repoLink.textContent = "View on GitHub";

    repoCard.appendChild(repoTitle);
    repoCard.appendChild(repoDesc);
    repoCard.appendChild(repoLink);

    reposContainer.appendChild(repoCard);
  });
});

const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // reset tab aktif
    tabs.forEach((t) => t.classList.remove("active-tab"));
    contents.forEach((c) => c.classList.add("hidden"));

    // aktifkan tab baru
    tab.classList.add("active-tab");
    document
      .querySelector(`#tab-${tab.dataset.tab}`)
      .classList.remove("hidden");
  });
});

const words = ["Creative!", "Happy!", "Smile!", "Positive!", "Humble!"];
const wordEl = document.getElementById("changing-word");
let index = 0;
let animating = false;

function changeWord() {
  if (animating) return;
  animating = true;

  // Animasi keluar
  wordEl.style.animation = "slideOut 0.4s ease forwards";

  setTimeout(() => {
    // Ganti kata setelah keluar
    index = (index + 1) % words.length;
    wordEl.textContent = words[index];

    // Animasi masuk
    wordEl.style.animation = "slideIn 0.4s ease forwards";

    // Selesai animasi
    setTimeout(() => {
      animating = false;
    }, 400);
  }, 400);
}

// Ganti setiap 2 detik
setInterval(changeWord, 2000);


// Fungsi untuk membuat placeholder
function createImagePlaceholder(aspect = 'landscape') {
  const placeholder = document.createElement('div');
  placeholder.className = `image-placeholder ${aspect}`;
  return placeholder;
}

function createVideoPlaceholder() {
  const placeholder = document.createElement('div');
  placeholder.className = 'video-placeholder';
  return placeholder;
}

// Fungsi untuk load gambar dengan placeholder
function loadImageWithPlaceholder(imgElement, src, alt = 'Portfolio image') {
  const gridItem = imgElement.closest('.grid-item');
  const placeholder = createImagePlaceholder(gridItem?.dataset.aspect || 'landscape');
  
  // Set placeholder sementara
  imgElement.style.display = 'none';
  gridItem.appendChild(placeholder);
  gridItem.classList.add('loading');
  
  imgElement.onload = function() {
    // Gambar berhasil dimuat
    placeholder.remove();
    imgElement.style.display = 'block';
    gridItem.classList.remove('loading');
    gridItem.classList.add('loaded');
    
    // Trigger custom event untuk animasi
    setTimeout(() => {
      imgElement.style.opacity = '1';
    }, 50);
  };
  
  imgElement.onerror = function() {
    // Gambar gagal dimuat
    placeholder.classList.add('error');
    gridItem.classList.add('error');
    gridItem.classList.remove('loading');
    console.error(`Failed to load image: ${src}`);
  };
  
  // Set source setelah event listener
  imgElement.src = src;
  imgElement.alt = alt;
}

// Fungsi untuk load video dengan placeholder
function loadVideoWithPlaceholder(videoElement, src, poster = '', alt = 'Portfolio video') {
  const gridItem = videoElement.closest('.grid-item');
  const placeholder = createVideoPlaceholder();
  
  // Set placeholder sementara
  videoElement.style.display = 'none';
  gridItem.appendChild(placeholder);
  gridItem.classList.add('loading');
  
  videoElement.onloadstart = function() {
    // Video mulai loading
    console.log('Video loading started:', src);
  };
  
  videoElement.onloadeddata = function() {
    // Video data loaded
    placeholder.remove();
    videoElement.style.display = 'block';
    gridItem.classList.remove('loading');
    gridItem.classList.add('loaded');
    
    setTimeout(() => {
      videoElement.style.opacity = '1';
    }, 50);
  };
  
  videoElement.onerror = function() {
    // Video gagal dimuat
    placeholder.classList.add('error');
    gridItem.classList.add('error');
    gridItem.classList.remove('loading');
    console.error(`Failed to load video: ${src}`);
  };
  
  // Set source
  if (poster) videoElement.poster = poster;
  videoElement.src = src;
}

// Contoh implementasi untuk portfolio images
function initializePortfolioImages() {
  const imagesGrid = document.querySelector('.portfolio-images.grid');
  if (!imagesGrid) return;
  
  // Contoh data images (ganti dengan data aktual Anda)
  const portfolioImages = [
    { src: 'images/design1.jpg', alt: 'Graphic Design Project 1', aspect: 'landscape' },
    { src: 'images/design2.jpg', alt: 'Graphic Design Project 2', aspect: 'portrait' },
    { src: 'images/design3.jpg', alt: 'Graphic Design Project 3', aspect: 'square' },
    { src: 'images/design4.jpg', alt: 'Graphic Design Project 4', aspect: 'landscape' },
    { src: 'images/design5.jpg', alt: 'Graphic Design Project 5', aspect: 'portrait' },
    { src: 'images/design6.jpg', alt: 'Graphic Design Project 6', aspect: 'landscape' }
  ];
  
  portfolioImages.forEach((image, index) => {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.setAttribute('data-type', 'image');
    gridItem.setAttribute('data-aspect', image.aspect);
    
    const img = document.createElement('img');
    img.loading = 'lazy';
    
    gridItem.appendChild(img);
    imagesGrid.appendChild(gridItem);
    
    // Load image dengan placeholder
    setTimeout(() => {
      loadImageWithPlaceholder(img, image.src, image.alt);
    }, index * 100); // Stagger loading untuk performance
  });
}

// Contoh implementasi untuk portfolio videos
function initializePortfolioVideos() {
  const videosGrid = document.querySelector('.portfolio-videos.grid');
  if (!videosGrid) return;
  
  // Contoh data videos (ganti dengan data aktual Anda)
  const portfolioVideos = [
    { src: 'videos/edit1.mp4', poster: 'videos/poster1.jpg', alt: 'Video Edit Project 1' },
    { src: 'videos/edit2.mp4', poster: 'videos/poster2.jpg', alt: 'Video Edit Project 2' },
    { src: 'videos/edit3.mp4', poster: 'videos/poster3.jpg', alt: 'Video Edit Project 3' },
    { src: 'videos/edit4.mp4', poster: 'videos/poster4.jpg', alt: 'Video Edit Project 4' }
  ];
  
  portfolioVideos.forEach((video, index) => {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.setAttribute('data-type', 'video');
    
    const videoElement = document.createElement('video');
    videoElement.controls = true;
    videoElement.muted = true;
    videoElement.preload = 'metadata';
    
    gridItem.appendChild(videoElement);
    videosGrid.appendChild(gridItem);
    
    // Load video dengan placeholder
    setTimeout(() => {
      loadVideoWithPlaceholder(videoElement, video.src, video.poster, video.alt);
    }, index * 150);
  });
}

// Intersection Observer untuk lazy loading
function initializeLazyLoading() {
  const lazyMedia = document.querySelectorAll('img[loading="lazy"], video[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const lazyMediaObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const media = entry.target;
          media.src = media.dataset.src;
          if (media.dataset.poster) {
            media.poster = media.dataset.poster;
          }
          lazyMediaObserver.unobserve(media);
        }
      });
    });
    
    lazyMedia.forEach(media => {
      lazyMediaObserver.observe(media);
    });
  }
}

// Initialize ketika tab images/videos diaktifkan
function initializeTabContent(tabId) {
  if (tabId === 'tab-images') {
    initializePortfolioImages();
  } else if (tabId === 'tab-videos') {
    initializePortfolioVideos();
  }
}

// Event listener untuk tab switching
document.addEventListener('DOMContentLoaded', function() {
  // Initialize lazy loading
  initializeLazyLoading();
  
  // Tab switching handler
  document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.dataset.tab;
      initializeTabContent(`tab-${tabId}`);
    });
  });
  
  // Initialize first tab
  const activeTab = document.querySelector('.tab-btn.active-tab');
  if (activeTab) {
    const tabId = activeTab.dataset.tab;
    initializeTabContent(`tab-${tabId}`);
  }
});




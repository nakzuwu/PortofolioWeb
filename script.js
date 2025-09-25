fetch('data/portfolio.json')
  .then(res => res.json())
  .then(data => {
    const imageContainer = document.querySelector('.portfolio-images');
    const videoContainer = document.querySelector('.portfolio-videos');

    data.images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = "Portfolio Image";
      imageContainer.appendChild(img);
    });

    data.videos.forEach(src => {
        const wrapper = document.createElement('div');
        wrapper.className = 'grid-item';

        const video = document.createElement('video');
        video.src = src;
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
        video.setAttribute('preload', 'auto');
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
  .catch(err => console.error("❌ Gagal memuat portfolio.json:", err));
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
      e.preventDefault();
    }
  });

  document.addEventListener("DOMContentLoaded", function() {
  // Daftar repositori manual
  const repos = [
    {
      name: "UsekaiWeb",
      description: "Website untuk aplikasi Usekai, menggunakan Blade.",
      url: "https://github.com/nakzuwu/UsekaiWeb",
      language: "Laravel",
      image: "repo-image.jpg"
    },
    {
      name: "VisionAidBackend",
      description: "Backend untuk aplikasi VisionAid, menggunakan Python.",
      url: "https://github.com/nakzuwu/VisionAidBackend",
      language: "Python",
      image: "repo-image.jpg"  // Ganti dengan gambar repositori jika ada
    },
    {
      name: "VisionAidFrontend",
      description: "Frontend untuk aplikasi VisionAid, menggunakan Dart.",
      url: "https://github.com/nakzuwu/VisionAidFrontend",
      language: "Flutter",
      image: "repo-image.jpg"
    },
    {
      name: "Reika-Bot-Discord",
      description: "Discord bot yang dibuat dengan Python.",
      url: "https://github.com/nakzuwu/Reika-Bot-Discord",
      language: "Python",
      image: "repo-image.jpg"
    },
    {
      name: "WarisanBiru ",
      description: "Sebuah Game Pembelajaran mengenai Terumbu Karang",
      url: "https://github.com/nakzuwu/WarisanBiru",
      language: "C#",
      image: "repo-image.jpg"
    }
  ];

  const reposContainer = document.querySelector(".portfolio-repos");

  repos.forEach(repo => {
    const repoCard = document.createElement("div");
    repoCard.classList.add("repo-card");

    // Gambar repositori
    const repoImage = document.createElement("img");
    repoImage.src = repo.image;  // Menggunakan gambar repositori yang dimasukkan manual
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

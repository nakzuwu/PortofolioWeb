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
document.addEventListener('DOMContentLoaded', function() {
  // Lazy-load images with data-src and reveal animations using IntersectionObserver
  var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
  if ('IntersectionObserver' in window) {
    var imgObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.getAttribute('data-src');
          img.addEventListener('load', function() { img.classList.add('loaded'); });
          observer.unobserve(img);
        }
      });
    }, {rootMargin: '200px 0px'});

    lazyImages.forEach(function(img) { imgObserver.observe(img); });

    var reveals = [].slice.call(document.querySelectorAll('.reveal-up, .reveal-left'));
    var revObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.08});
    reveals.forEach(function(r){ revObserver.observe(r); });
  } else {
    // Fallback: load all images and reveal everything
    lazyImages.forEach(function(img){ img.src = img.getAttribute('data-src'); img.classList.add('loaded'); });
    document.querySelectorAll('.reveal-up, .reveal-left').forEach(function(el){ el.classList.add('reveal-in'); });
  }
});
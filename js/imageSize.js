/**
 * 
 * HANDLES FULLSCREEN IMAGE ON CLICK
 * 
 */
document.addEventListener("DOMContentLoaded", function() {
  var openFullscreenLinks = document.querySelectorAll(".open-fullscreen");
  var fullscreenOverlay = document.querySelector(".fullscreen-overlay");
  var fullscreenImage = document.querySelector(".fullscreen-image");
  var fullscreenClose = document.querySelector(".fullscreen-close");

  openFullscreenLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      var imageUrl = link.querySelector("img").getAttribute("src");
      fullscreenImage.setAttribute("src", imageUrl);
      fullscreenOverlay.style.display = "block";
    });
  });

  fullscreenClose.addEventListener("click", function() {
    fullscreenOverlay.style.display = "none";
  });

  fullscreenOverlay.addEventListener("click", function(e) {
    if (e.target === fullscreenOverlay) {
      fullscreenOverlay.style.display = "none";
    }
  });
});

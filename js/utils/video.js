/**
 * Video helper — enforces the spec's mandatory attributes for autoplay
 * clips (animated water etc.). `playsinline` is required or iOS forces
 * the native fullscreen player.
 */

/**
 * @param {string} src - MP4 / H.264 source URL
 * @param {string} [className]
 * @returns {HTMLVideoElement}
 */
export function createAutoplayVideo(src, className = "") {
  const video = document.createElement("video");
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute("playsinline", ""); // attribute form for iOS Safari
  video.preload = "auto";
  video.src = src;
  if (className) video.className = className;
  return video;
}

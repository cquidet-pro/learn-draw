/** Smoothly scroll the page up (-1) or down (+1) by most of a screenful.
 *  Shared by the home grid and the gallery pages (flags, paintings, stickers)
 *  so the "up"/"down" voice commands scroll long grids the same way everywhere. */
export function scrollPage(dir: 1 | -1) {
  window.scrollBy({ top: dir * Math.round(window.innerHeight * 0.7), behavior: "smooth" });
}

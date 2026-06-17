import type { Animal } from "../animals";
import starryNightImg from "../../assets/paintings/starry-night.jpg";

// A simple, original kid-sketch inspired by Van Gogh's "The Starry Night".
export const starryNight: Animal = {
  id: "starry-night",
  name: "Starry Night",
  emoji: "🌌",
  artist: "Van Gogh",
  fact: "Vincent van Gogh painted Starry Night from his window — with big swirly brushstrokes!",
  image: starryNightImg,
  viewBox: "0 0 200 200",
  color: "#3a5ba0",
  steps: [
    {
      hint: "Draw the rolling hills at the bottom 🏞️",
      color: "#2a4d69",
      strokes: [
        "M 0,160 Q 45,150 75,159 Q 115,170 150,156 Q 180,148 200,158",
      ],
    },
    {
      hint: "Add big swirls in the sky 🌀",
      color: "#3a5ba0",
      strokes: [
        "M 70,82 C 52,82 52,58 78,58 C 104,58 104,96 64,96 C 40,96 44,56 84,52",
        "M 140,64 C 126,64 126,46 146,46 C 166,46 166,76 134,76",
      ],
    },
    {
      hint: "Add a glowing moon and twinkly stars 🌙",
      color: "#ffd166",
      strokes: [
        "M 150,40 a 17,17 0 1,0 34,0 a 17,17 0 1,0 -34,0",
        "M 46,40 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 104,52 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 28,92 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 116,108 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
      ],
    },
    {
      hint: "Finish with the tall cypress tree 🌲",
      color: "#1b3a2b",
      strokes: [
        "M 40,168 C 30,124 50,96 42,58 C 38,96 30,124 38,168 Z",
      ],
    },
  ],
};

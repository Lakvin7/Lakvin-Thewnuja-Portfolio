import React from "react";
import { BookOpen, Plane } from "lucide-react";
import foregroundImage from "../assets/Images/about/foreground-primary.png";
import alternateForegroundImage from "../assets/Images/about/foreground-secondary.png";
import mainPortraitImage from "../assets/Images/about/portrait-designer.jpeg";
import backgroundImage from "../assets/Images/about/background-primary.png";
import alternateBackgroundImage from "../assets/Images/about/background-secondary.png";
import footballImage from "../assets/Images/about/portrait-football.jpeg";
import photographerImage from "../assets/Images/about/portrait-photographer.jpeg";
import gamerImage from "../assets/Images/about/portrait-gamer.jpeg";
import appMindWaveImage from "../assets/Images/projects/mindwave-app-preview.png";
import mindwaveAppLogoImage from "../assets/Images/projects/mindwave-app-logo.png";
import mindwavePreviewImage from "../assets/Images/projects/mindwave-web-preview.png";
import mindwaveLogoImage from "../assets/Images/projects/mindwave-web-logo.png";
import illustratorIconImage from "../assets/Images/tools/illustrator.jpg";
import photoshopIconImage from "../assets/Images/tools/photoshop.jpg";
import premiereProIconImage from "../assets/Images/tools/premiere-pro.jpg";
import canvaIconImage from "../assets/Images/tools/canva.jpg";
import llmIconImage from "../assets/Images/tools/llm.jpg";
import cvPdf from "../cv/Lakvin-Thewnuja-CV.pdf";

export {
  foregroundImage,
  alternateForegroundImage,
  mainPortraitImage,
  backgroundImage,
  alternateBackgroundImage,
  footballImage,
  photographerImage,
  gamerImage,
  appMindWaveImage,
  mindwaveAppLogoImage,
  mindwavePreviewImage,
  mindwaveLogoImage,
  illustratorIconImage,
  photoshopIconImage,
  premiereProIconImage,
  canvaIconImage,
  llmIconImage,
  cvPdf,
};

export const cvDownloadUrl = cvPdf;

export const heroHoverImages = [foregroundImage, alternateForegroundImage];

export const aboutBackdropPortraits = [
  {
    image: backgroundImage,
    alt: "background portrait one",
    width: "min(100%,240px)",
    height: "45vh",
    maxHeight: 420,
    top: "-6%",
    right: "-24%",
    rotate: 12,
    floatClass: "abt-float",
  },
  {
    image: alternateBackgroundImage,
    alt: "background portrait two",
    width: "min(100%,200px)",
    height: "38vh",
    maxHeight: 340,
    bottom: "4%",
    left: "-22%",
    rotate: -10,
    floatClass: "abt-float2",
  },
  {
    image: foregroundImage,
    alt: "background portrait three",
    width: "min(100%,168px)",
    height: "28vh",
    maxHeight: 250,
    top: "18%",
    left: "8%",
    rotate: -4,
    floatClass: "abt-float",
  },
  {
    image: alternateForegroundImage,
    alt: "background portrait four",
    width: "min(100%,150px)",
    height: "24vh",
    maxHeight: 220,
    top: "6%",
    right: "12%",
    rotate: 8,
    floatClass: "abt-float2",
  },
];

export const aboutPortraitOptions = {
  Designer: mainPortraitImage,
  Photographer: photographerImage,
  Football: footballImage,
  Gamer: gamerImage,
};

export const aboutPortraitOrder = ["Designer", "Photographer", "Football", "Gamer"];

export const aboutIntroCopy = [
  "I'm not just a web developer. I work across websites, mobile apps, UI design, branding, visuals, and creative digital experiences, depending on what the idea needs most.",
  "What started as curiosity turned into a real passion for building things that feel thoughtful, modern, and alive. I enjoy learning, experimenting, solving problems, and turning ideas into clean, engaging work through both design and code.",
].join(" ");

export const aboutTechStack = [
  { name: "Python", category: "Language", color: "#3776AB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", category: "Language", color: "#F89820", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "JavaScript", category: "Language", color: "#F7DF1E", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "HTML5", category: "Markup", color: "#E34F26", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", category: "Styling", color: "#1572B6", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "React", category: "Front-End", color: "#61DAFB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "GitHub", category: "Version", color: "#181717", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Figma", category: "Design", color: "#F24E1E", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Canva", category: "Design", color: "#00C4CC", icon: canvaIconImage },
  { name: "Firebase", category: "Backend", color: "#FFCA28", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "LLM", category: "AI", color: "#412991", icon: llmIconImage },
  { name: "Databases", category: "Data", color: "#336791", icon: "https://cdn.simpleicons.org/postgresql/336791" },
  { name: "Illustrator", category: "Adobe", color: "#FF9A00", icon: illustratorIconImage },
  { name: "Photoshop", category: "Adobe", color: "#31A8FF", icon: photoshopIconImage },
  { name: "Premiere Pro", category: "Adobe", color: "#9999FF", icon: premiereProIconImage },
  { name: "Blender", category: "3D", color: "#F5792A", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
];

export const workProjects = [
  {
    number: "01",
    tag: "Marketing Website",
    year: "2025",
    title: "Mind Wave - Website",
    description: "Mental wellness and focus platform designed to feel calm, modern, and supportive, with a clean interface that helps users stay grounded and intentional.",
    cardTextColor: "rgba(255,255,255,0.92)",
    descriptionColor: "rgba(255,255,255,0.92)",
    stack: ["React", "HTML", "CSS"],
    visitUrl: "https://www.mindwave-app.com",
    previewImage: mindwavePreviewImage,
    sideLogo: mindwaveLogoImage,
    logoInset: 2,
    logoScale: 1.08,
    accent: "#C8FF00",
    background: "#0d1f2d",
    artwork: (
      <svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg">
        <circle cx="160" cy="95" r="130" fill="none" stroke="#c8ff00" strokeWidth="0.5" opacity="0.3" />
        <circle cx="160" cy="95" r="90" fill="none" stroke="#c8ff00" strokeWidth="0.5" opacity="0.2" />
        <circle cx="160" cy="95" r="50" fill="none" stroke="#c8ff00" strokeWidth="0.5" opacity="0.15" />
        <line x1="0" y1="95" x2="320" y2="95" stroke="#c8ff00" strokeWidth="0.4" opacity="0.2" />
        <line x1="160" y1="0" x2="160" y2="190" stroke="#c8ff00" strokeWidth="0.4" opacity="0.2" />
        <circle cx="160" cy="95" r="8" fill="#c8ff00" opacity="0.9" />
        <circle cx="80" cy="55" r="4" fill="#c8ff00" opacity="0.5" />
        <circle cx="240" cy="135" r="4" fill="#c8ff00" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: "02",
    tag: "Mobile",
    year: "2025",
    title: "Mind Wave - App",
    description: "Mobile version of Mind Wave built to bring focus tools, wellness support, and AI-powered guidance into a smoother everyday experience on the go.",
    stack: ["React Native", "Node.js", "Firebase", "OpenAI API"],
    visitUrl: "#",
    previewImage: appMindWaveImage,
    sideLogo: mindwaveAppLogoImage,
    logoFit: "cover",
    logoScale: 1.34,
    accent: "#FF4D6D",
    background: "#1a0a00",
    artwork: (
      <svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="15" width="110" height="155" rx="2" fill="none" stroke="#ff4d6d" strokeWidth="0.5" opacity="0.3" />
        <rect x="70" y="45" width="190" height="125" rx="2" fill="none" stroke="#ff4d6d" strokeWidth="0.5" opacity="0.2" />
        <rect x="110" y="65" width="60" height="60" rx="2" fill="#ff4d6d" opacity="0.12" />
        <rect x="112" y="67" width="56" height="56" rx="1" fill="none" stroke="#ff4d6d" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: "03",
    tag: "Education",
    year: "2023",
    title: "Past Paper Hub",
    description: "Study support program built for Edexcel Lower Secondary students, making it easier to find, download, and organize past papers for more focused exam preparation.",
    stack: ["Python", "Desktop App", "PDF Tools"],
    visitUrl: "#",
    sideIcon: BookOpen,
    useNeutralBanner: true,
    accent: "#7EB8F7",
    background: "#0a0d1a",
    artwork: (
      <svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg">
        <polygon points="160,18 300,172 20,172" fill="none" stroke="#7eb8f7" strokeWidth="0.5" opacity="0.3" />
        <polygon points="160,48 270,162 50,162" fill="none" stroke="#7eb8f7" strokeWidth="0.4" opacity="0.2" />
        <polygon points="160,78 240,152 80,152" fill="none" stroke="#7eb8f7" strokeWidth="0.4" opacity="0.15" />
        <circle cx="160" cy="105" r="3" fill="#7eb8f7" opacity="0.8" />
        <circle cx="90" cy="155" r="2.5" fill="#7eb8f7" opacity="0.5" />
        <circle cx="230" cy="155" r="2.5" fill="#7eb8f7" opacity="0.5" />
        <circle cx="160" cy="18" r="2.5" fill="#7eb8f7" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: "04",
    tag: "Data Analysis",
    year: "2023",
    title: "Flight Data Analysis System",
    description: "System built to organize and analyze flight-related data, helping turn raw records into clearer insights and more useful reporting.",
    stack: ["Python", "Data Analysis", "Reporting"],
    visitUrl: "https://github.com/Lakvin7/FlightDataAnalysisSystem.git",
    sideIcon: Plane,
    useNeutralBanner: true,
    accent: "#F5C842",
    background: "#0d0a1a",
    artwork: (
      <svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="18" width="55" height="55" fill="none" stroke="#f5c842" strokeWidth="0.5" opacity="0.4" />
        <rect x="90" y="18" width="55" height="55" rx="27" fill="none" stroke="#f5c842" strokeWidth="0.5" opacity="0.4" />
        <rect x="165" y="18" width="55" height="55" rx="5" fill="none" stroke="#f5c842" strokeWidth="0.5" opacity="0.4" />
        <rect x="240" y="18" width="55" height="55" fill="#f5c842" opacity="0.07" />
        <rect x="15" y="95" width="290" height="1" fill="#f5c842" opacity="0.15" />
        <circle cx="45" cy="148" r="18" fill="none" stroke="#f5c842" strokeWidth="0.5" opacity="0.3" />
        <rect x="80" y="132" width="38" height="38" rx="2" fill="none" stroke="#f5c842" strokeWidth="0.5" opacity="0.3" />
        <rect x="135" y="138" width="155" height="4" rx="2" fill="#f5c842" opacity="0.1" />
        <rect x="135" y="150" width="120" height="4" rx="2" fill="#f5c842" opacity="0.07" />
      </svg>
    ),
  },
];

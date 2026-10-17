# StoryCast: Adulting with Mitchie

A small, accessible storytelling site of video and audio stories about studying abroad, surviving uni, learning to code and making friends as an adult. It's built with semantic HTML5, Sass and a small amount of vanilla JavaScript, with no frameworks or build tools.

## Project structure

```
storycast/
├── index.html            Home: hero, featured stories carousel, topics
├── story.html            Story page: one template for all 5 stories (?story=1 to ?story=5)
├── about.html            About: why I started, who it's for, accessibility, how to engage
├── css/
│   └── main.css          Compiled stylesheet (generated from sass/, do not edit by hand)
├── sass/
│   ├── main.scss         Entry point: loads base, layout and components
│   ├── _colors.scss      Colour tokens (Ink, Cream, Sky, Lime, Tomato, Bubblegum)
│   ├── _typography.scss  Fonts, type scale, line heights, letter spacing
│   ├── _spacing.scss     Spacing scale, widths, radii, borders, breakpoints
│   ├── _base.scss        Reset, page defaults, focus styles, accessibility helpers
│   ├── _layout.scss      Header, hero, page grids, footer
│   └── _components.scss  Buttons, story and topic cards, carousel, media
├── js/
│   └── main.js           Story data and the story page switcher
├── assets/
│   ├── video/            story-1.mp4 to story-3.mp4
│   ├── audio/            story-4.m4a, story-5.m4a
│   ├── captions/         WebVTT captions for the videos (story-N-en.vtt)
│   ├── transcripts/      Plain-text transcripts for every story (story-N.txt)
│   ├── images/           Hero, About photo, story posters and thumbnails
│   └── icons/            SVG icons for the topic and accessibility cards
└── .vscode/settings.json Live Sass Compiler output settings
```

### How the story page works

There is one story page, `story.html`. Each story card links to `story.html?story=N`. `js/main.js` holds the details of all 5 stories and, based on `N`:

- shows the video player (stories 1 to 3) or the cover image and audio player (stories 4 and 5)
- fills in the title, format, duration, location, description and transcript link
- shows three other stories under "You might also like"

Without JavaScript, or without `?story=`, the page shows story 1, which is written into the HTML.

Media files follow one naming pattern, so adding a story means adding its files and one entry in `main.js`:

| File | Path |
|---|---|
| Video | `assets/video/story-N.mp4` |
| Audio | `assets/audio/story-N.m4a` |
| Captions | `assets/captions/story-N-en.vtt` |
| Transcript | `assets/transcripts/story-N.txt` |
| Poster or audio cover | `assets/images/story-N-poster.jpg` |
| Card thumbnail | `assets/images/story-N-thumb.jpg` |

## Accessibility checklist

The goal is WCAG 2.2 level AA. This is how each requirement is met.

### Structure and semantics

- [x] Semantic HTML5 landmarks on every page: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`, `<footer>`
- [x] One `<h1>` per page, and headings never skip a level
- [x] `lang="en"` and a unique, descriptive `<title>` on every page
- [x] Lists are real `<ul>` and `<ol>` elements; durations use `<time datetime="PT3M34S">`
- [x] All pages pass the [html-validate](https://html-validate.org/) checker

### Media

- [x] Every video has English captions (`<track kind="captions">`, on by default)
- [x] Every story, video or audio, has a full text transcript linked below the player
- [x] Captions and transcripts mark music, sound effects and on-screen text in `[brackets]`, and label speakers when more than one person talks
- [x] No autoplay: media only plays when the visitor presses play
- [x] Native browser controls, which work with the keyboard and screen readers
- [x] A download fallback link inside each player for browsers that can't play the file

### Images

- [x] Meaningful images have descriptive `alt` text (the About page group photo)
- [x] Decorative images use `alt=""` (the hero background, card thumbnails and audio covers, which sit next to a title that already names the story)
- [x] Decorative symbols such as arrows, dots and card icons are hidden with `aria-hidden="true"`
- [x] Card icons stay visible in Windows High Contrast mode (`forced-colors`)

### Colour and contrast

All text meets the AA minimum of 4.5:1, and borders on buttons and cards meet 3:1.

| Text and background | Contrast |
|---|---|
| Ink on Cream (body text) | 16.7:1 |
| Lime on Ink (hero title) | 14.8:1 |
| Ink on Lime | 14.8:1 |
| Ink on Bubblegum | 11.3:1 |
| Ink on Tomato (buttons) | 5.8:1 |
| Ink on Sky | 4.7:1 |

- [x] Text on bright colours is always Ink; white text is never used on Sky or Tomato
- [x] Bright shapes on Cream have a 3px Ink border, so buttons and cards stand out at 3:1 or more
- [x] The hero photo sits under an 85% Ink overlay, so the Lime title stays readable
- [x] Colour is never the only signal: links are underlined, and the current page in the nav has a thick underline

### Keyboard and focus

- [x] Everything works with the keyboard alone (Tab, Shift+Tab, Enter)
- [x] A "Skip to main content" link appears on the first Tab press
- [x] A visible 3px focus outline: Ink on light areas, Lime on dark areas
- [x] Story cards show the outline around the whole card
- [x] The carousel has no buttons to get stuck on: Tab moves through the cards and scrolls them into view

### Screen readers

- [x] The navigation is labelled, and the current page is marked with `aria-current="page"`
- [x] Sections are labelled by their headings (`aria-labelledby`)
- [x] Visually hidden labels add context, e.g. "Duration:", "Location:" and "(opens in a new tab)"
- [x] Lists keep their list semantics in Safari even without bullets

### Layout, zoom and motion

- [x] Responsive from 320px wide, with no sideways scrolling of the page
- [x] Text sizes use `rem`, so zooming and browser font settings work
- [x] Breakpoints are in `em`, so the layout adapts when text is enlarged
- [x] Buttons and links you tap are at least 44px tall
- [x] Animations only run when the visitor hasn't asked to reduce motion (`prefers-reduced-motion`)

## Running locally

You need a modern browser. Nothing has to be installed to view the site.

### View the site

1. Clone the repository:
   ```
   git clone https://github.com/MitchellBarure/storycast.git
   cd storycast
   ```
2. Open it with a local server. The easiest option is the **Live Server** extension for VS Code: right-click `index.html` and choose **Open with Live Server**. The site opens at `http://127.0.0.1:5500/index.html`.

   Without VS Code, any static server works, for example:
   ```
   npx serve .
   ```

Opening `index.html` directly from your files also works, but a local server is closer to how the site behaves online.

### Edit the styles

The styles are written in Sass. Edit the files in `sass/`, never `css/main.css` directly.

- **In VS Code:** install the **Live Sass Compiler** extension by Glenn Marks and click **Watch Sass** in the status bar. The settings in `.vscode/settings.json` save the output to `css/main.css`.
- **From the terminal** (needs Node.js):
  ```
  npx sass --watch sass/main.scss css/main.css --no-source-map
  ```

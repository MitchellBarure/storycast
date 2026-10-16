// Story data. Keep in sync with the story cards in index.html.
// Media files follow one naming pattern per story number N:
//   video:      assets/video/story-N.mp4
//   captions:   assets/captions/story-N-en.vtt
//   audio:      assets/audio/story-N.mp3
//   poster:     assets/images/story-N-poster.jpg  (video poster, or cover image for audio)
//   thumbnail:  assets/images/story-N-thumb.jpg
//   transcript: assets/transcripts/story-N.txt
const STORIES = {
    1: {
        title: "Where I Come From, and Where I'm Going",
        format: "Video",
        duration: "3:34",
        datetime: "PT3M34S",
        location: "African Leadership University, Kigali",
        description: "Where I was born, where I grew up, and the mission behind everything I build: using technology and storytelling to make healthcare more affordable for single parents and low-income families in Zimbabwe."
    },
    2: {
        title: "My First Football Match in Kigali",
        format: "Video",
        duration: "1:31",
        datetime: "PT1M31S",
        location: "Kigali, Rwanda",
        description: "Description coming soon." // TODO: add description
    },
    3: {
        title: "Building AmaiReady: An App for Expecting Mothers",
        format: "Video",
        duration: "2:00",
        datetime: "PT2M",
        location: "African Leadership University, Kigali",
        description: "Description coming soon." // TODO: add description
    },
    4: {
        title: "A Day Managing Frontend Interns",
        format: "Audio",
        duration: "0:40",
        datetime: "PT40S",
        location: "Kigali, Rwanda",
        description: "Description coming soon." // TODO: add description
    },
    5: {
        title: "Why My Website Needed a CDN",
        format: "Audio",
        duration: "3:20",
        datetime: "PT3M20S",
        location: "Kigali, Rwanda",
        description: "Description coming soon." // TODO: add description
    }
};

// Number of cards in "You might also like"
const RELATED_COUNT = 3;

// Fill one story card (cloned from the existing markup) with a story's details
function fillStoryCard(card, id) {
    const story = STORIES[id];
    const link = card.querySelector(".story-card-title a");

    card.querySelector("img").src = `assets/images/story-${id}-thumb.jpg`;
    link.href = `story.html?story=${id}`;
    link.textContent = story.title;
    card.querySelector(".story-card-format").textContent = story.format;

    const time = card.querySelector("time");
    time.dateTime = story.datetime;
    time.textContent = story.duration;
}

// story.html: show the story from ?story=N, using the video or audio layout
function initStoryPage() {
    const page = document.querySelector(".story-layout");
    if (!page) return;

    const id = new URLSearchParams(window.location.search).get("story");
    const story = STORIES[id];
    // No or unknown story number: keep story #1, which is already in the HTML
    if (!story) return;

    const isAudio = story.format === "Audio";
    const videoFigure = page.querySelector('[data-media="video"]');
    const audioFigure = page.querySelector('[data-media="audio"]');
    const activeFigure = isAudio ? audioFigure : videoFigure;
    const player = activeFigure.querySelector("video, audio");
    const mediaSrc = isAudio ? `assets/audio/story-${id}.mp3` : `assets/video/story-${id}.mp4`;
    const poster = `assets/images/story-${id}-poster.jpg`;

    // Pause and hide the player that isn't used, then show the right one
    const inactivePlayer = (isAudio ? videoFigure : audioFigure).querySelector("video, audio");
    inactivePlayer.pause();
    inactivePlayer.preload = "none";
    videoFigure.hidden = isAudio;
    audioFigure.hidden = !isAudio;

    player.querySelector("source").src = mediaSrc;
    activeFigure.querySelector("[data-media-download]").href = mediaSrc;
    if (isAudio) {
        activeFigure.querySelector("img").src = poster;
    } else {
        player.poster = poster;
        player.querySelector("track").src = `assets/captions/story-${id}-en.vtt`;
    }
    player.preload = "metadata";
    player.load();

    // Title, meta and description
    document.title = `${story.title} | StoryCast`;
    page.querySelector("#story-title").textContent = story.title;
    page.querySelector("[data-story-format]").textContent = story.format;
    const time = page.querySelector("[data-story-duration]");
    time.dateTime = story.datetime;
    time.textContent = story.duration;
    page.querySelector("[data-story-location]").textContent = story.location;
    page.querySelector("#story-description").textContent = story.description;
    page.querySelector("[data-transcript-download]").href = `assets/transcripts/story-${id}.txt`;

    // "You might also like": the other stories, in order, reusing the first card as a template
    const relatedList = page.querySelector(".related-list");
    const template = relatedList.querySelector("li");
    const relatedIds = Object.keys(STORIES).filter((key) => key !== id).slice(0, RELATED_COUNT);
    relatedList.replaceChildren(...relatedIds.map((key) => {
        const item = template.cloneNode(true);
        fillStoryCard(item, key);
        return item;
    }));
}

initStoryPage();

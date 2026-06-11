const songs = [
{
    title: "SoundHelix Song 1",
    artist: "Artist One",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/id/101/300"
},
{
    title: "SoundHelix Song 2",
    artist: "Artist Two",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/id/102/300"
},
{
    title: "SoundHelix Song 3",
    artist: "Artist Three",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/id/103/300"
}
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const playlist = document.getElementById("playlist");

let songIndex = 0;

loadSong(songIndex);

function loadSong(index){

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;
    audio.src = songs[index].src;

    updatePlaylist();
}

function playSong(){
    audio.play();
    playBtn.textContent = "⏸";
}

function pauseSong(){
    audio.pause();
    playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {

    if(audio.paused){
        playSong();
    }else{
        pauseSong();
    }

});

nextBtn.addEventListener("click", () => {
    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
});

prevBtn.addEventListener("click", () => {
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();
});

audio.addEventListener("timeupdate", () => {

    const progressPercent =
        (audio.currentTime / audio.duration) * 100;

    progress.value = progressPercent || 0;

    currentTimeEl.textContent =
        formatTime(audio.currentTime);

    durationEl.textContent =
        formatTime(audio.duration);
});

progress.addEventListener("input", () => {

    audio.currentTime =
        (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", () => {

    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
});

function formatTime(time){

    if(isNaN(time)) return "0:00";

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return `${minutes}:${seconds}`;
}

songs.forEach((song,index)=>{

    const li = document.createElement("li");

    li.textContent =
        `${song.title} - ${song.artist}`;

    li.addEventListener("click",()=>{

        songIndex = index;

        loadSong(songIndex);

        playSong();
    });

    playlist.appendChild(li);
});

function updatePlaylist(){

    const items = playlist.querySelectorAll("li");

    items.forEach((item,index)=>{

        item.classList.remove("active");

        if(index === songIndex){
            item.classList.add("active");
        }

    });
}
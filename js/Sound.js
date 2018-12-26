
class Sound {
  constructor(filenameWithPath) {
    this.audioFormat;
    this.setFormat();
    this.mainSound = new Audio(filenameWithPath + this.audioFormat);
  }
  setFormat() {
    let audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
      this.audioFormat = ".mp3";
    } else {
      this.audioFormat = ".ogg";
    }
  }
  play() {
    this.mainSound.currentTime = 0;
    this.mainSound.play();
  }
}



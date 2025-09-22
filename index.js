const reset = document.querySelector(".reset");
const sections = document.querySelectorAll(".section");
const redPoint = document.querySelector(".redpoint");
const bluePoint = document.querySelector(".bluepoint");
const html = document.querySelector("html");
const icon=document.querySelector(".icon");
const audio=document.querySelector("audio");
const container=document.querySelector(".conteiner");
const body=document.querySelector("body")

const w = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

let flag = "red";
let iconFlag="unmute";
let red = [];
let blue = [];
let rPoint = 0;
let bPoint = 0;

const flagHandler = () => {
  if (flag == "red") {
    redPoint.classList.remove("opacity");
    bluePoint.classList.add("opacity");
  } else {
    redPoint.classList.add("opacity");
    bluePoint.classList.remove("opacity");
  }
};
const sendId = (event) => {
  const id = event.target.dataset.id;
  const clas = event.target.className;
  if (!clas.includes("red") && !clas.includes("blue")) {
    if (flag == "red") {
      red.push(id);
      sectionHandler("red");
      flag = "blue";
    } else {
      blue.push(id);
      sectionHandler("blue");
      flag = "red";
    }
  }
  flagHandler();
};
const sectionHandler = (color) => {
  sections.forEach((s) => {
    s.className = "section";
  });
  if (red.length == 4) red.shift();
  red?.forEach((r) => {
    let section;
    sections.forEach((s) => {
      if (s.dataset.id == +r) section = s;
    });
    section?.classList.add("red");
  });
  if (blue.length == 4) blue.shift();
  blue?.forEach((b) => {
    let section;
    sections.forEach((s) => {
      if (s.dataset.id == +b) section = s;
    });
    section?.classList.add("blue");
  });
  if (red.length == 3) {
    sections.forEach((s) => {
      if (s.dataset.id == red[0]) s.classList.add("opacity");
    });
  }
  if (blue.length == 3) {
    sections.forEach((s) => {
      if (s.dataset.id == blue[0]) s.classList.add("opacity");
    });
  }
  winner();
};
const winner = () => {
  w.forEach((a) => {
    if (m(a, red)) {
      red?.forEach((r) => {
        let section;
        sections.forEach((s) => {
          if (s.dataset.id == +r) section = s;
        });
        section?.classList.remove("opacity");
      });
      sections.forEach((s)=>{
        // if(!s.className.includes("red"))
        s.classList.add("none");
      })
      container.classList.add("stalin");
      if(iconFlag=="unmute")
      {audio.setAttribute("src","./AudioCutter_national_anthem_of_ussr.mp3")
      audio.play();}
      body.classList.add("noclick");
      setTimeout(() => {
        sections.forEach((s) => {
          s.className = "section";
        });
        body.classList.remove("noclick")
        red = [];
        blue = [];
        rPoint++;
        redPoint.innerHTML = rPoint;
        container.classList.remove("stalin");
      }, 5000);
    } else if (m(a, blue)) {
      blue?.forEach((b) => {
        let section;
        sections.forEach((s) => {
          if (s.dataset.id == +b) section = s;
        });
        section?.classList.remove("opacity");
      });
      sections.forEach((s)=>{
        // if(!s.className.includes("blue"))
        s.classList.add("none");
      })
      container.classList.add("hitler");
      if(iconFlag=="unmute")
      {audio.setAttribute("src","./AudioCutter_main.fure.mp3")
      audio.play();}
      body.classList.add("noclick");
      setTimeout(() => {
        sections.forEach((s) => {
          s.className = "section";
        });
        body.classList.remove("noclick")
        red = [];
        blue = [];
        bPoint++;
        bluePoint.innerHTML = bPoint;
        container.classList.remove("hitler");
      }, 5000);
    }
  });
};
const m = (a, b) => {
  let result = false;
  a.forEach((x) => {
    if (a.includes(b[0]) && a.includes(b[1]) && a.includes(b[2])) result = true;
  });
  return result;
};
sections.forEach((s) => {
  s.addEventListener("click", sendId);
});
flagHandler();
reset.addEventListener("click", () => {
  location.reload();
});
icon.addEventListener("click",()=>{
  if(iconFlag=="unmute"){
    iconFlag="mute";
    audio.volume=0;
    icon.classList.remove("unmute");
    icon.classList.add("mute")
  }else{
    iconFlag="unmute";
    audio.volume=1;
    icon.classList.add("unmute");
    icon.classList.remove("mute")
  }
})
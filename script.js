/* =====================================================
   ELEMENTS
===================================================== */

const intro = document.getElementById("letterIntro");

const gift = document.getElementById("giftLetter");

const tapMsg = document.getElementById("tapMessage");

const tapSub = document.getElementById("tapSubMessage");

const dots = [
    ...document.querySelectorAll(".tap-dot")
];

const musicBtn =
    document.getElementById("musicBtn");

const bgMusic =
    document.getElementById("bgMusic");

const toast =
    document.getElementById("toast");


/* =====================================================
   MUSIC
===================================================== */

let musicStarted = false;


/*
    YOUR MUSIC FILE:

    images/bg-music.mp3
*/

bgMusic.loop = true;
bgMusic.preload = "auto";


// Volume
bgMusic.volume = 0.45;


/* Start music */

async function playMusic() {

    try {

        bgMusic.volume = 0.45;

        await bgMusic.play();

        musicStarted = true;

        musicBtn.textContent = "♫";

        musicBtn.classList.add("playing");

    } catch (error) {

        console.warn(
            "Music playback error:",
            error
        );

        musicBtn.textContent = "▶";

    }
}


/* Stop music */

function stopMusic() {

    bgMusic.pause();

    musicBtn.textContent = "▶";

    musicBtn.classList.remove(
        "playing"
    );
}


/* Music button */

musicBtn.addEventListener(
    "click",
    async function (event) {

        event.stopPropagation();

        if (bgMusic.paused) {

            await playMusic();

        } else {

            stopMusic();

        }

    }
);


/* =====================================================
   BACKGROUND PARTICLES
===================================================== */

const particles =
    document.getElementById("particles");

for (let i = 0; i < 55; i++) {

    const p =
        document.createElement("span");

    p.className =
        "glow-particle";

    const size =
        Math.random() * 3 + 1;

    p.style.width =
        size + "px";

    p.style.height =
        size + "px";

    p.style.left =
        Math.random() * 100 + "%";

    p.style.top =
        Math.random() * 100 + "%";

    p.style.setProperty(
        "--drift",
        (Math.random() * 160 - 80) + "px"
    );

    p.style.animationDuration =
        (Math.random() * 15 + 12) + "s";

    p.style.animationDelay =
        Math.random() * 10 + "s";

    particles.appendChild(p);
}


/* =====================================================
   SLIDES
===================================================== */

const slides =
    [
        ...document.querySelectorAll(
            ".slide[data-slide]"
        )
    ];

const count =
    document.getElementById("count");

let idx = 0;


/* Update navigation */

function updateNav() {

    count.textContent =
        String(idx + 1).padStart(2, "0")
        + " / 09";
}


/* Go to slide */

function go(n) {

    idx =
        Math.max(
            0,
            Math.min(
                slides.length - 1,
                n
            )
        );

    slides[idx].scrollIntoView({
        behavior: "smooth"
    });

    updateNav();
}


/* Navigation buttons */

document.getElementById("prev")
    .addEventListener(
        "click",
        () => go(idx - 1)
    );

document.getElementById("next")
    .addEventListener(
        "click",
        () => go(idx + 1)
    );


/* =====================================================
   SCROLL REVEAL
===================================================== */

const io =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList
                            .add("visible");

                        const n =
                            Number(
                                entry.target
                                    .dataset
                                    .slide
                            );

                        if (n) {

                            idx = n - 1;

                            updateNav();

                        }

                    }

                }
            );

        },
        {
            threshold: 0.25
        }
    );


slides.forEach(
    slide => io.observe(slide)
);


/* =====================================================
   AGE 0 → 18 COUNTER
===================================================== */

const age =
    document.getElementById(
        "ageOrbit"
    );

const counter =
    document.getElementById(
        "ageCounter"
    );

let ageStarted = false;


if (age) {

    const ageObserver =
        new IntersectionObserver(
            (entries) => {

                if (
                    entries[0].isIntersecting
                    &&
                    !ageStarted
                ) {

                    ageStarted = true;

                    age.classList.add(
                        "visible"
                    );

                    let start =
                        performance.now();


                    function tick(time) {

                        const progress =
                            Math.min(
                                (time - start) / 2200,
                                1
                            );


                        const value =
                            Math.floor(
                                (
                                    1 -
                                    Math.pow(
                                        1 - progress,
                                        3
                                    )
                                ) * 18
                            );


                        counter.textContent =
                            value;


                        if (
                            progress < 1
                        ) {

                            requestAnimationFrame(
                                tick
                            );

                        } else {

                            counter.textContent =
                                "18";

                            setTimeout(
                                birthdayPop,
                                650
                            );

                        }

                    }


                    requestAnimationFrame(
                        tick
                    );

                }

            },
            {
                threshold: 0.55
            }
        );

    ageObserver.observe(age);

}


/* =====================================================
   BIRTHDAY CONFETTI
===================================================== */

function birthdayPop() {

    const burst =
        document.getElementById(
            "birthdayBurst"
        );


    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const confetti =
            document.createElement(
                "span"
            );

        confetti.className =
            "confetti";


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            Math.random() * 380
            + 100;


        confetti.style.background =
            [
                "#f3edf2",
                "#c98ca3",
                "#8d294c",
                "#e6b7c6",
                "#fff"
            ][
                Math.floor(
                    Math.random() * 5
                )
            ];


        confetti.style.setProperty(
            "--x",
            Math.cos(angle)
            * distance
            + "px"
        );


        confetti.style.setProperty(
            "--y",
            Math.sin(angle)
            * distance
            + "px"
        );


        confetti.style.setProperty(
            "--rotation",
            (
                Math.random() * 720
                - 360
            )
            + "deg"
        );


        burst.appendChild(
            confetti
        );


        setTimeout(
            () => confetti.remove(),
            2400
        );

    }


    showToast(
        "18 YEARS ✦ HAPPY BIRTHDAY"
    );
}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        1700
    );
}


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowRight"
        ) {

            go(idx + 1);

        }

        if (
            event.key === "ArrowLeft"
        ) {

            go(idx - 1);

        }

    }
);


/* =====================================================
   MOBILE SWIPE
===================================================== */

let startX = 0;


document.addEventListener(
    "touchstart",
    (event) => {

        startX =
            event.touches[0].clientX;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    (event) => {

        const difference =
            event.changedTouches[0].clientX
            - startX;


        if (
            Math.abs(difference) > 50
        ) {

            go(
                idx +
                (
                    difference < 0
                        ? 1
                        : -1
                )
            );

        }

    },
    {
        passive: true
    }
);


/* =====================================================
   INITIAL NAVIGATION
===================================================== */

updateNav();


/* =====================================================
   3-TAP ENVELOPE
===================================================== */

let taps = 0;


gift.addEventListener(
    "click",
    async function () {

        taps++;


        /* Reset animation */

        gift.classList.remove(
            "step-1",
            "step-2",
            "step-3"
        );


        void gift.offsetWidth;


        /* -------------------------
           TAP 1
        -------------------------- */

        if (taps === 1) {

            gift.classList.add(
                "step-1"
            );

            tapMsg.textContent =
                "One more tap";

            tapSub.textContent =
                "The ribbon is loosening…";


            dots[0].classList.remove(
                "active"
            );

            dots[1].classList.add(
                "active"
            );

        }


        /* -------------------------
           TAP 2
        -------------------------- */

        else if (taps === 2) {

            gift.classList.add(
                "step-2"
            );

            tapMsg.textContent =
                "Almost there";

            tapSub.textContent =
                "One last little tap.";


            dots[1].classList.remove(
                "active"
            );

            dots[2].classList.add(
                "active"
            );

        }


        /* -------------------------
           TAP 3
        -------------------------- */

        else if (taps === 3) {

            gift.classList.add(
                "step-3"
            );


            tapMsg.textContent =
                "For you ♡";

            tapSub.textContent =
                "Happy birthday";


            dots.forEach(
                dot =>
                    dot.classList.remove(
                        "active"
                    )
            );


            /*
                OPEN MAIN WEBSITE
            */

            document.body.classList.add(
                "open"
            );


            intro.classList.add(
                "opened"
            );


            document
                .getElementById(
                    "mainContent"
                )
                .classList.add(
                    "show"
                );


            /*
                IMPORTANT:

                This is the user's
                actual music file:

                images/bg-music.mp3

                Because this function is
                called from a real click,
                browser autoplay restrictions
                allow the music to start.
            */

            await playMusic();

        }

    }
);
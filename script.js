// =========================================================
// MAHMOUD ELHOFY PORTFOLIO — PROFESSIONAL MOTION ENGINE
// Keeps the original portfolio features and adds:
// particles, cursor, 3D cards, active nav, progress bar,
// smoother reveals, counters, magnetic buttons and ripple.
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // LOADER
    // =====================================================

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        if (!loader) return;

        setTimeout(() => {

            loader.classList.add("loaded");
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            loader.style.pointerEvents = "none";

        }, 1800);

    });


    // =====================================================
    // TYPING EFFECT
    // =====================================================

    const typingText = document.querySelector(".typing");

    const words = [
        "Front-End Developer",
        "Full-Stack Developer",
        "Embedded Systems Developer",
        "Python Developer",
        "IoT Developer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let typingTimer;

    function typing() {

        if (!typingText) return;

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingText.textContent =
                currentWord.substring(0, charIndex++);

            if (charIndex > currentWord.length) {

                deleting = true;

                typingTimer = setTimeout(typing, 1200);
                return;

            }

        } else {

            typingText.textContent =
                currentWord.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;

            }

        }

        typingTimer = setTimeout(
            typing,
            deleting ? 55 : 105
        );

    }

    typing();


    // =====================================================
    // SCROLL PROGRESS
    // =====================================================

    const progress = document.getElementById("scroll-progress");

    function updateProgress() {

        if (!progress) return;

        const scrollTop = window.scrollY;
        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const percent =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progress.style.width = `${percent}%`;

    }


    // =====================================================
    // HEADER
    // =====================================================

    const header =
        document.querySelector(".header");

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

        header.style.background =
            window.scrollY > 50
                ? "rgba(8,17,31,.95)"
                : "rgba(8,17,31,.80)";

    }


    // =====================================================
    // SCROLL REVEAL — INTERSECTION OBSERVER
    // =====================================================

    const reveals =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");
                            revealObserver.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold:0.12,
                    rootMargin:"0px 0px -60px 0px"
                }
            );

        reveals.forEach(item => {
            revealObserver.observe(item);
        });

    } else {

        reveals.forEach(item => {
            item.classList.add("active");
        });

    }


    // =====================================================
    // COUNTERS — INTERSECTION OBSERVER
    // =====================================================

    const counters =
        document.querySelectorAll(".counter");

    let countersStarted = false;

    function animateCounter(counter) {

        const target =
            Number(counter.dataset.target || 0);

        const duration = 1200;
        const startTime = performance.now();

        function frame(now) {

            const progress =
                Math.min((now - startTime) / duration, 1);

            // Ease-out
            const eased =
                1 - Math.pow(1 - progress, 3);

            counter.textContent =
                Math.floor(eased * target);

            if (progress < 1) {

                requestAnimationFrame(frame);

            } else {

                counter.textContent = target;

            }

        }

        requestAnimationFrame(frame);

    }

    const about =
        document.querySelector(".about");

    if (about && counters.length) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    if (
                        entries[0].isIntersecting &&
                        !countersStarted
                    ) {

                        countersStarted = true;

                        counters.forEach(
                            animateCounter
                        );

                        counterObserver.disconnect();

                    }

                },
                { threshold:0.25 }
            );

        counterObserver.observe(about);

    }


    // =====================================================
    // MOBILE MENU
    // =====================================================

    const menuBtn =
        document.querySelector(".menu-btn");

    const nav =
        document.querySelector(".nav-links");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

            menuBtn.classList.toggle("active");

            const icon =
                menuBtn.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-bars"
                );

                icon.classList.toggle(
                    "fa-xmark"
                );

            }

        });


        nav.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    nav.classList.remove("active");
                    menuBtn.classList.remove("active");

                    const icon =
                        menuBtn.querySelector("i");

                    if (icon) {

                        icon.classList.add("fa-bars");
                        icon.classList.remove("fa-xmark");

                    }

                });

            });

    }


    // =====================================================
    // ACTIVE NAVIGATION
    // =====================================================

    const navLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    const sections =
        document.querySelectorAll("section[id]");

    if (navLinks.length && sections.length) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        navLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${entry.target.id}`
                            ) {

                                link.classList.add("active");

                            }

                        });

                    });

                },
                {
                    rootMargin:"-35% 0px -55% 0px",
                    threshold:0
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    // =====================================================
    // SCROLL TOP
    // =====================================================

    const scrollTop =
        document.getElementById("scroll-top");

    function updateScrollTop() {

        if (!scrollTop) return;

        scrollTop.classList.toggle(
            "show",
            window.scrollY > 500
        );

    }

    if (scrollTop) {

        scrollTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top:0,
                    behavior:"smooth"
                });

            }
        );

    }


    // =====================================================
    // CURSOR GLOW
    // =====================================================

    const finePointer =
        window.matchMedia(
            "(pointer:fine)"
        ).matches;

    if (finePointer) {

        const dot =
            document.createElement("div");

        const ring =
            document.createElement("div");

        dot.className = "cursor-dot";
        ring.className = "cursor-ring";

        document.body.append(dot, ring);

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;

        window.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

                dot.style.left =
                    `${mouseX}px`;

                dot.style.top =
                    `${mouseY}px`;

                document.body.classList.add(
                    "cursor-ready"
                );

            },
            { passive:true }
        );

        function animateCursor() {

            ringX +=
                (mouseX - ringX) * .16;

            ringY +=
                (mouseY - ringY) * .16;

            ring.style.left =
                `${ringX}px`;

            ring.style.top =
                `${ringY}px`;

            requestAnimationFrame(
                animateCursor
            );

        }

        animateCursor();

        const interactive =
            document.querySelectorAll(
                "a, button, input, textarea, .project-card, .skill-card, .service-card"
            );

        interactive.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {
                    document.body.classList.add(
                        "cursor-hover"
                    );
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    document.body.classList.remove(
                        "cursor-hover"
                    );
                }
            );

        });

    }


    // =====================================================
    // 3D CARD TILT + LIGHT SPOT
    // =====================================================

    if (finePointer) {

        const cards =
            document.querySelectorAll(
                ".project-card, .service-card, .skill-card, .certificate-card"
            );

        cards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const rotateY =
                        ((x / rect.width) - .5) * 8;

                    const rotateX =
                        ((y / rect.height) - .5) * -8;

                    card.style.setProperty(
                        "--mx",
                        `${x}px`
                    );

                    card.style.setProperty(
                        "--my",
                        `${y}px`
                    );

                    card.style.transform =
                        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

    }


    // =====================================================
    // MAGNETIC BUTTONS
    // =====================================================

    if (finePointer) {

        const magnetic =
            document.querySelectorAll(
                ".btn, .project-btn, .footer-social a"
            );

        magnetic.forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(${x * .12}px, ${y * .12}px) translateY(-3px)`;

                }
            );

            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform = "";

                }
            );

        });

    }


    // =====================================================
    // RIPPLE CLICK EFFECT
    // =====================================================

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".btn, .project-btn"
                );

            if (!button) return;

            const rect =
                button.getBoundingClientRect();

            const ripple =
                document.createElement("span");

            ripple.className =
                "click-ripple";

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 650);

        }
    );


    // =====================================================
    // PARTICLE NETWORK
    // =====================================================

    const canvas =
        document.createElement("canvas");

    canvas.id = "particles-canvas";

    document.body.prepend(canvas);

    const ctx =
        canvas.getContext("2d");

    const particles = [];

    let particleWidth =
        window.innerWidth;

    let particleHeight =
        window.innerHeight;

    const isMobile =
        window.innerWidth < 700;

    const particleCount =
        isMobile ? 24 : 48;

    function resizeCanvas() {

        particleWidth =
            window.innerWidth;

        particleHeight =
            window.innerHeight;

        const dpr =
            Math.min(window.devicePixelRatio || 1, 2);

        canvas.width =
            particleWidth * dpr;

        canvas.height =
            particleHeight * dpr;

        canvas.style.width =
            `${particleWidth}px`;

        canvas.style.height =
            `${particleHeight}px`;

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

    }

    resizeCanvas();

    for (let i = 0; i < particleCount; i++) {

        particles.push({
            x:Math.random() * particleWidth,
            y:Math.random() * particleHeight,
            vx:(Math.random() - .5) * .28,
            vy:(Math.random() - .5) * .28,
            size:Math.random() * 1.7 + .6
        });

    }

    let particleMouseX = -1000;
    let particleMouseY = -1000;

    if (finePointer) {

        window.addEventListener(
            "mousemove",
            event => {

                particleMouseX =
                    event.clientX;

                particleMouseY =
                    event.clientY;

            },
            { passive:true }
        );

    }

    function drawParticles() {

        ctx.clearRect(
            0,
            0,
            particleWidth,
            particleHeight
        );

        for (const p of particles) {

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -20) p.x = particleWidth + 20;
            if (p.x > particleWidth + 20) p.x = -20;
            if (p.y < -20) p.y = particleHeight + 20;
            if (p.y > particleHeight + 20) p.y = -20;

            const dx =
                particleMouseX - p.x;

            const dy =
                particleMouseY - p.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                p.x -= dx * .0007;
                p.y -= dy * .0007;

            }

            ctx.beginPath();
            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(0,229,255,.48)";

            ctx.fill();

        }

        for (let i = 0; i < particles.length; i++) {

            for (let j = i + 1; j < particles.length; j++) {

                const a = particles[i];
                const b = particles[j];

                const dx = a.x - b.x;
                const dy = a.y - b.y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < 105) {

                    const opacity =
                        (1 - distance / 105) * .11;

                    ctx.beginPath();

                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);

                    ctx.strokeStyle =
                        `rgba(0,229,255,${opacity})`;

                    ctx.lineWidth = .6;
                    ctx.stroke();

                }

            }

        }

        requestAnimationFrame(drawParticles);

    }

    if (
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        drawParticles();

    }


    // =====================================================
    // RESIZE
    // =====================================================

    window.addEventListener(
        "resize",
        () => {

            resizeCanvas();

        },
        { passive:true }
    );


    // =====================================================
    // GLOBAL SCROLL HANDLER
    // =====================================================

    function onScroll() {

        updateProgress();
        updateHeader();
        updateScrollTop();

    }

    window.addEventListener(
        "scroll",
        onScroll,
        { passive:true }
    );

    onScroll();


    // =====================================================
    // CONTACT FORM
    // =====================================================

    const form =
        document.querySelector(".contact-form");

    if (form) {

        form.addEventListener(
            "submit",
            () => {
                // Formspree handles the actual submission.
            }
        );

    }

});

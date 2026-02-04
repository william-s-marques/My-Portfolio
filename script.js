/* RPG PORTFOLIO LOGIC */

document.addEventListener("DOMContentLoaded", () => {
    // Navigation Logic
    const menuButtons = document.querySelectorAll(".menu-bar .btn-retro");
    const screens = document.querySelectorAll(".screen");

    function playSound(type) {
        // Placeholder for future sound effects
        // console.log(`Playing sound: ${type}`);
    }

    menuButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");

            // Only proceed if it's a navigation button
            if (!targetId) return;

            // Update Buttons
            menuButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Update Screens
            screens.forEach(screen => {
                screen.classList.remove("active");
                if (screen.id === targetId) {
                    screen.classList.add("active");
                }
            });

            playSound("click");
        });
    });

    // Typewriter Effect for Intro
    const textElement = document.getElementById("intro-text");
    if (textElement) {
        const text = textElement.getAttribute("data-text");
        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                textElement.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50); // Speed of typing
            }
        }

        // Start typing after a small delay
        setTimeout(typeWriter, 500);
    }

    /* ===========================
       AUDIO SYSTEM
    =========================== */
    const audio = document.getElementById("bg-music");
    const muteBtn = document.getElementById("mute-btn");
    let isPlaying = false;

    // Audio only plays when button is clicked
    audio.volume = 0.3; // Set default volume

    // Toggle Button Logic
    muteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering the global enabler
        if (audio.paused) {
            audio.play();
            muteBtn.textContent = "🔊 ON";
        } else {
            audio.pause();
            muteBtn.textContent = "🔇 OFF";
        }
    });

    /* ===========================
       INVENTORY SYSTEM
    =========================== */
    const itemSlots = document.querySelectorAll(".item-slot");
    const descriptionBox = document.getElementById("item-description-box");

    itemSlots.forEach(slot => {
        slot.addEventListener("click", () => {
            // Visual feedback for selection
            itemSlots.forEach(s => s.style.borderColor = "#555");
            slot.style.borderColor = "var(--accent-secondary)";

            const description = slot.getAttribute("data-desc");
            if (descriptionBox) {
                descriptionBox.innerHTML = `<p>${description}</p>`;
                // Simple animation reset
                descriptionBox.style.animation = 'none';
                descriptionBox.offsetHeight; /* trigger reflow */
                descriptionBox.style.animation = 'fadeIn 0.3s forwards';
            }
        });
    });

    /* ===========================
       AVATAR CAROUSEL
    =========================== */
    const avatarContainer = document.getElementById("avatar-container");
    const avatarTitle = document.getElementById("avatar-title");

    const classes = [
        { icon: "🧙‍♂️", title: "MAGE", type: "emoji" },
        { icon: "Assets/Eu.jpeg", title: "DEV", type: "image" }, // Your photo
        { icon: "⚔️", title: "WARRIOR", type: "emoji" }
    ];

    let currentClassIndex = 0;

    function rotateAvatar() {
        currentClassIndex = (currentClassIndex + 1) % classes.length;
        const current = classes[currentClassIndex];

        // Animate Out
        avatarContainer.style.opacity = 0;
        avatarTitle.style.opacity = 0;

        setTimeout(() => {
            // Change Content
            if (current.type === "image") {
                avatarContainer.innerHTML = `<img src="${current.icon}" alt="My Avatar">`;
            } else {
                avatarContainer.innerHTML = current.icon;
            }
            avatarTitle.textContent = current.title;

            // Animate In
            avatarContainer.style.opacity = 1;
            avatarTitle.style.opacity = 1;
        }, 500); // Wait for fade out
    }

    // Rotate every 3 seconds
    setInterval(rotateAvatar, 3000);
});

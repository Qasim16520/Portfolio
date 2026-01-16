document.addEventListener("DOMContentLoaded", function () {

    /* ======================
       DARK MODE
    ====================== */
    const moon = document.getElementById("moon");
    if (moon) {
        moon.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            moon.classList.toggle("ri-sun-line");
            moon.classList.toggle("ri-moon-line");
        });
    }

    /* ======================
       RESUME TABS
    ====================== */
    const tabBtns = document.querySelectorAll(".tab-btn");
    const resumeSections = {
        education: document.getElementById("education"),
        experience: document.getElementById("experience"),
        skills: document.getElementById("skills")
    };

    if (resumeSections.experience) resumeSections.experience.style.display = "none";
    if (resumeSections.skills) resumeSections.skills.style.display = "none";

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            Object.values(resumeSections).forEach(sec => {
                if (!sec) return;
                sec.classList.add("tab-hide");
                setTimeout(() => sec.style.display = "none", 300);
            });

            let target =
                btn.textContent.includes("Education") ? resumeSections.education :
                btn.textContent.includes("Experience") ? resumeSections.experience :
                resumeSections.skills;

            setTimeout(() => {
                if (!target) return;
                target.style.display = "block";
                target.classList.remove("tab-hide");
            }, 300);
        });
    });

    /* ======================
       SERVICE MODAL
    ====================== */
    const modal = document.getElementById("serviceModal");
    const closeModal = document.getElementById("closeModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalList = document.getElementById("modalList");

    document.querySelectorAll(".see-more").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const card = btn.closest(".service-card");
            if (!card) return;

            modalTitle.textContent = card.dataset.title;
            modalDesc.textContent = card.dataset.desc;
            modalList.innerHTML = "";

            card.dataset.list.split("|").forEach(text => {
                const li = document.createElement("li");
                li.textContent = text;
                modalList.appendChild(li);
            });

            modal.classList.add("active");
        });
    });

    if (closeModal) {
        closeModal.addEventListener("click", () => modal.classList.remove("active"));
    }
    if (modal) {
        modal.addEventListener("click", e => {
            if (e.target === modal) modal.classList.remove("active");
        });
    }

    /* ======================
       PORTFOLIO FILTER
    ====================== */
    const filterBtns = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".portfolio-item");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            items.forEach(item => {
                if (filter === "all" || item.classList.contains(filter)) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            });
        });
    });

    /* ======================
       TESTIMONIAL SLIDER
    ====================== */
    const testimonials = document.querySelectorAll(".testimonial-card");
    let index = 0;

    function showTestimonial(i) {
        testimonials.forEach(t => t.classList.remove("active"));
        testimonials[i].classList.add("active");
    }

    const nextBtn = document.getElementById("nextTest");
    const prevBtn = document.getElementById("prevTest");

    if (nextBtn) nextBtn.onclick = () => {
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
    };

    if (prevBtn) prevBtn.onclick = () => {
        index = (index - 1 + testimonials.length) % testimonials.length;
        showTestimonial(index);
    };

    setInterval(() => {
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
    }, 3000);

    /* ==============================
       ✅ RADIAL NAV (FINAL FIX)
    ================================ */
    const menuItems = document.querySelectorAll(".menu-item");
    const pageSections = document.querySelectorAll("section");

    menuItems.forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();

            const targetId = item.dataset.target;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });

    window.addEventListener("scroll", () => {
        let current = "";

        pageSections.forEach(section => {
            const sectionTop = section.offsetTop - 250;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                current = section.id;
            }
        });

        menuItems.forEach(item => {
            item.classList.remove("active");
            if (item.dataset.target === current) {
                item.classList.add("active");
            }
        });
    });

});

/* ======================
   RADIAL TOGGLE BUTTON
====================== */
const navToggle = document.getElementById("navToggle");
const radialNav = document.querySelector(".radial-nav");

if (navToggle && radialNav) {
    navToggle.addEventListener("click", () => {
        radialNav.classList.toggle("open");
    });
}



// Scroll Down 
document.querySelector(".scroll-indicator").addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({
    behavior: "smooth"
  });
});



(function () {
    emailjs.init("P6TF3B0x1KPuQYx8w"); // 👈 yahan apni PUBLIC KEY
})();

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_hmjkfji",   // 👈 Service ID
        "template_wghvk8e",  // 👈 Template ID
        this
    )
    .then(function () {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset();
    }, function (error) {
        alert("Failed to send message!");
        console.error(error);
    });
});

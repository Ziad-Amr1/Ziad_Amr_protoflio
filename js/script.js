document.addEventListener('DOMContentLoaded', () => {
    // ------ State ------
    const state = {
        currentPage: 1,
        projectsPerPage: 6,
        totalProjects: document.querySelectorAll('.project-card').length
    };

    // ------ DOM Elements ------
    const DOM = {
        typingText: document.querySelector(".change"),
        cursor: document.querySelector(".cursor"),
        skillsGrid: document.querySelector('.skills-grid'),
        modal: {
            element: document.querySelector('.project-modal'),
            image: document.querySelector('.modal-image'),
            title: document.querySelector('.modal-title'),
            description: document.querySelector('.modal-description'),
            links: document.querySelector('.modal-links'),
            close: document.querySelector('.modal-close')
        }
    };

    // ------  Projects Data ------
    const PROJECTS_DATA = {         1: {
        title: "Modern Villa Design",
        image: "images/Projects/Arc_1.jpg",
        description: "Complete architectural design for a luxury villa including 3D modeling, interior design, and landscape planning.",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "Case Study", url: "#"}
        ]
    },
    2: {
        title: "Hu Tao Poster",
        image: "images/Projects/hu tao poster4.jpg",
        description: "A vibrant and eye-catching poster design for a luxury brand.",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "photoshop file", url: "#"}
        ]
    },
    3: {
        title: "Hu Tao Poster",
        image: "images/Projects/hu_tao.jpg",
        description: "A vibrant and eye-catching poster design for a luxury brand.",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "Photoshop File", url: "#"}
        ]
    },
    4: {
        title: "Anime Cover",
        image: "images/Projects/pink cover.png",
        description: "A stunning and eye-catching cover design for an anime series.",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "Photoshop File", url: "#"}
        ]
    },
    5: {
        title: "Jean Poster",
        image: "images/Projects/jean poster.png",
        description: "A modern and elegant poster design for a luxury brand.",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "Photoshop File", url: "#"}
        ]
    },
    6: {
        title: "Deku Quote Poster",
        image: "images/Projects/DEKU.jpg",
        description: "A modern and elegant poster design for a luxury brand.",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "Photoshop File", url: "#"}
        ]
    },
    7: {
        title: "Healthy Food Poster",
        image: "images/Projects/heal1.jpg",
        description: "Healthy Food Poster",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "Photoshop File", url: "#"}
        ]
    },
    8: {
        title: "azin Poster",
        image: "images/Projects/azin copy.jpg",
        description: "A modern and elegant poster design for a luxury brand.",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "Photoshop File", url: "#"}
        ]
    },
    9: {
        title: "Bank Vector",
        image: "images/Projects/BANK-01.jpg",
        description: "A modern and elegant poster design for a luxury brand.",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "Photoshop File", url: "#"}
        ]
    },
    10: {
        title: "Moon Night Vector",
        image: "images/Projects/Moon night.jpg",
        description: "A modern and elegant poster design for a luxury brand.",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "Photoshop File", url: "#"}
        ]
    },
    11: {
        title: "Front Elevation",
        image: "images/Projects/Arc_2.jpg",
        description: "A modern and elegant poster design for a luxury brand.",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "Photoshop File", url: "#"}
        ]
    },
    12: {
        title: "Arc_3",
        image: "images/Projects/Arc_3.jpg",
        description: "A modern and elegant poster design for a luxury brand.",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "Photoshop File", url: "#"}
        ]
    },
 };

    // ------ AOS Init ------
    const initAOS = () => {
        AOS.init({
            once: true,
            duration: 800,
            disable: window.innerWidth < 768
        });
    };

    // ------  Typing Effect ------
    const initTypingEffect = () => {
        const texts = ["Architect", "Graphic Designer", "Front-end Developer"];
        let count = 0, index = 0, isDeleting = false;

        const type = () => {
            const currentText = texts[count];
            
            if (!isDeleting) {
                DOM.typingText.textContent = currentText.slice(0, ++index);
                if (index === currentText.length) {
                    isDeleting = true;
                    DOM.cursor.style.animation = 'none';
                    setTimeout(() => {
                        DOM.cursor.style.animation = 'blink 1s infinite';
                        type();
                    }, 2000);
                    return;
                }
            } else {
                DOM.typingText.textContent = currentText.slice(0, --index);
                if (index === 0) {
                    isDeleting = false;
                    count = (count + 1) % texts.length;
                }
            }
            
            setTimeout(type, isDeleting ? 50 : 100);
        };
        type();
    };

    // ------   Skills System ------
        // Skills Data
        const SKILLS_DATA = {
            architecture: [
                {name: 'AutoCAD', img: 'images/skills/cad-file.png'},
                {name: 'Revit', img: 'images/skills/revit.png'},
                {name: 'SketchUp', img: 'images/skills/skp.png'},
                {name: 'Lumion', img: 'images/skills/lumion.webp'},
            ],
            design: [
                {name: 'Photoshop', img: 'images/skills/photoshop.png'},
                {name: 'Illustrator', img: 'images/skills/illustrator.png'},
                {name: 'InDesign', img: 'images/skills/indesign.png'},
                {name: 'Premiere Pro', img: 'images/skills/premiere-pro.png'},
                {name: 'Figma', img: 'images/skills/figma.webp'},
                {name: 'Canva', img: 'images/skills/canva.webp'},
            ],
            development: [
                {name: 'HTML', img: 'images/skills/html.webp'}, 
                {name: 'CSS', img: 'images/skills/css.webp'},
                {name: 'JavaScript', img: 'images/skills/js.webp'},
                {name: 'Node.js', img: 'images/skills/nodejs.webp'},
            ]
        };

    const handleSkills = () => {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateSkillsGrid(btn.dataset.category);
            });
        });

        const updateSkillsGrid = (category) => {
            DOM.skillsGrid.style.opacity = 0;
            setTimeout(() => {
                DOM.skillsGrid.innerHTML = SKILLS_DATA[category]
                    .map(skill => `
                        <div class="skill-card card">
                            <img src="${skill.img}" alt="${skill.name} icon">
                            <h3>${skill.name}</h3>
                        </div>
                    `).join('');
                DOM.skillsGrid.style.opacity = 1;
            }, 300);
        };

        updateSkillsGrid('architecture');
    };

    // ------  Projects System ------
    const handleProjects = () => {
        let filteredProjects = [];
        const allProjects = Array.from(document.querySelectorAll('.project-card'));
        const container = document.querySelector('#projects .container');
        const filters = document.querySelectorAll('.filter-btn');
    
        // Apply Filter
        const applyFilter = (filter) => {
            filteredProjects = allProjects.filter(project => 
                filter === 'all' || project.dataset.category === filter
            );
            allProjects.forEach(p => p.style.display = 'none');
            state.totalProjects = filteredProjects.length;
            state.currentPage = 1;
            updateProjectsVisibility();
        };
    
        // Filter Buttons Event
        filters.forEach(btn => {
            btn.addEventListener('click', () => {
                filters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilter(btn.dataset.filter);
            });
        });
    
        // Update Projects Visibility
        const updateProjectsVisibility = () => {
            const start = (state.currentPage - 1) * state.projectsPerPage;
            const end = start + state.projectsPerPage;
    
            filteredProjects.forEach(p => p.style.display = 'none');
            filteredProjects.slice(start, end).forEach(project => {
                project.style.display = 'block';
                project.classList.add('visible');
            });
    
            setupPagination();
        };
    
        //  Pagination System
        const setupPagination = () => {
            const pagination = container.querySelector('.pagination');
            if (!pagination) return;
    
            const pagesContainer = pagination.querySelector('.pagination-pages');
            pagesContainer.innerHTML = '';
            const pageCount = Math.ceil(filteredProjects.length / state.projectsPerPage);
    
            for (let i = 1; i <= pageCount; i++) {
                const btn = document.createElement('button');
                btn.className = `page-item ${i === state.currentPage ? 'active' : ''}`;
                btn.textContent = i;
                btn.addEventListener('click', () => {
                    state.currentPage = i;
                    updateProjectsVisibility();
                });
                pagesContainer.appendChild(btn);
            }
    
            //  Update Prev and Next Buttons
            const prevBtn = pagination.querySelector('.prev');
            const nextBtn = pagination.querySelector('.next');
            prevBtn.disabled = state.currentPage === 1;
            nextBtn.disabled = state.currentPage === pageCount;
    
            prevBtn.addEventListener('click', () => {
                if (state.currentPage > 1) {
                    state.currentPage--;
                    updateProjectsVisibility();
                }
            });
    
            nextBtn.addEventListener('click', () => {
                if (state.currentPage < pageCount) {
                    state.currentPage++;
                    updateProjectsVisibility();
                }
            });
        };
    
        //  Initial Filter
        applyFilter('all');
    };
    
    // ------  Lazy Loading ------
    const initLazyLoading = () => {
        const lazyLoadObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              // Replace Data Only If Exists
              if (img.dataset.src) img.src = img.dataset.src;
              if (img.dataset.srcset) img.srcset = img.dataset.srcset;
              img.classList.remove('lazy-load');
              img.classList.add('loaded');
              lazyLoadObserver.unobserve(img);
            }
          });
        }, { 
          rootMargin: '200px 0px 200px 0px' // Increase thresholds
        });
      
        document.querySelectorAll('.lazy-load').forEach(img => {
          lazyLoadObserver.observe(img);
        });
      };

    // ------   Modal System ------
    const handleModal = () => {
        document.querySelectorAll('.project-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = e.target.dataset.project;
                loadProjectData(projectId);
                DOM.modal.element.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        DOM.modal.close.addEventListener('click', () => {
            DOM.modal.element.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        const loadProjectData = (id) => {
            const project = PROJECTS_DATA[id];
            if (!project) return;

            // Create Image and Check if Exists
            const img = new Image();
            img.src = project.image;
            img.onload = () => DOM.modal.image.src = project.image;
            img.onerror = () => DOM.modal.image.src = 'images/fallback.jpg';

            // Update Modal Content
            DOM.modal.title.textContent = project.title;
            DOM.modal.description.textContent = project.description;
            DOM.modal.links.innerHTML = project.links.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener" class="modal-link">
                    ${link.text}
                </a>
            `).join('');
        };

            // Add Check for Image
            const img = new Image();
            img.src = project.image;
            img.onerror = () => {
                DOM.modal.image.src = 'images/fallback-image.jpg';
            };
            img.onload = () => {
                DOM.modal.image.src = project.image;
            };

            DOM.modal.title.textContent = project.title;
            DOM.modal.description.textContent = project.description;
            DOM.modal.links.innerHTML = project.links
                .map(link => `
                    <a href="${link.url}" 
                    target="_blank" 
                    rel="noopener" 
                    class="modal-link">
                    ${link.text}
                    </a>
                `).join('');
        };

    // ------   Scroll Smooth ------
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            const offset = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
              top: offset,
              behavior: 'smooth'
            });
          });
        });
      };

    // ------   Dark Mode ------
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
            const slider = document.querySelector('.slider');
            toggle.checked ? slider.classList.add('night-mode') : slider.classList.remove('night-mode');
            localStorage.setItem('theme', toggle.checked ? 'dark' : 'light');
        });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            toggle.checked = true;
            document.querySelector('.slider').classList.add('night-mode');
        }
    }

    // ------   Mobile Menu ------
    // const initMobileMenu = () => {
    //     const toggleMenu = document.querySelector('.menu-toggle');
    //     const sidebarNav = document.querySelector('.sidebar-nav');

    //     if (!toggleMenu || !sidebarNav) return;

    //     // Open/Close Menu
    //     const toggleMenuHandler = (e) => {
    //         e.stopPropagation();
    //         toggleMenu.classList.toggle('active');
    //         sidebarNav.classList.toggle('active');
    //         const icon = toggleMenu.querySelector('i');
    //         icon.classList.toggle('fa-bars');
    //         icon.classList.toggle('fa-times');
    //     };

    //     //  Close Menu
    //     const closeMenu = () => {
    //         toggleMenu.classList.remove('active');
    //         sidebarNav.classList.remove('active');
    //         const icon = toggleMenu.querySelector('i');
    //         icon.classList.remove('fa-times');
    //         icon.classList.add('fa-bars');
    //     };

    //     //  Event
    //     toggleMenu.addEventListener('click', toggleMenuHandler);
    //     document.addEventListener('click', (e) => {
    //         if (!sidebarNav.contains(e.target) && !toggleMenu.contains(e.target)) closeMenu();
    //     });
    //     document.querySelectorAll('.sidebar-nav a').forEach(link => link.addEventListener('click', closeMenu));
    // };

    // Menu Manual
   
    const toggleMenu = document.querySelector('.menu-toggle')
    const sidebarNav = document.querySelector('.sidebar-nav')

    toggleMenu.addEventListener('click', () => {
      sidebarNav.classList.toggle('active');
      toggleMenu.classList.toggle('active');
    }); 

    document.addEventListener('click', (event) => {
        if (!sidebarNav.contains(event.target) && 
            !toggleMenu.contains(event.target)) {
            sidebarNav.classList.remove('active');
            toggleMenu.classList.remove('active');
        }
    });

    sidebarNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            sidebarNav.classList.remove('active');
            toggleMenu.classList.remove('active');
            // toggleMenu.querySelector('i').classList.remove('fa-times');
        });
    });

    window.addEventListener('scroll', () => {
        sidebarNav.classList.remove('active');
        toggleMenu.classList.remove('active');
      });

    // ------   Init ------
    const init = () => {
        initAOS();
        initTypingEffect();
        handleSkills();
        handleProjects();
        initLazyLoading();
        handleModal();
        initSmoothScroll();
        initMobileMenu();
    };

    // ------ Start ------
    init();
});
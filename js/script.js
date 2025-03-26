document.addEventListener('DOMContentLoaded', () => {
    // ------ التهيئة العامة ------
    const state = {
        currentPage: 1,
        projectsPerPage: 6,
        totalProjects: document.querySelectorAll('.project-card').length
    };

    // ------ العناصر الرئيسية ------
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

    // ------ بيانات المشاريع (لا تغيير) ------
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
        title: "Arc_1",
        image: "images/Projects/Arc_1.jpg",
        description: "A modern and elegant poster design for a luxury brand.",
        links: [
            {text: "View Prototype", url: "#"},
            {text: "Photoshop File", url: "#"}
        ]
    },
 };

    // ------ تهيئة المكتبات ------
    const initAOS = () => {
        AOS.init({
            once: true,
            duration: 800,
            disable: window.innerWidth < 768
        });
    };

    // ------ تأثير الكتابة ------
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

    // ------ نظام المهارات ------
        // نظام المهارات
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

    // ------ نظام المشاريع والترقيم ------
    const handleProjects = () => {
        const projects = document.querySelectorAll('.project-card');
        
        // الترشيح
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                
                projects.forEach(project => {
                    project.style.display = 
                        (filter === 'all' || project.dataset.category === filter) 
                            ? 'block' 
                            : 'none';
                });
            });
        });

        // الترقيم
        // تحسين نظام الترقيم
        const setupPagination = () => {
            const container = document.querySelector('#projects .container');
            const pageCount = Math.ceil(state.totalProjects / state.projectsPerPage);
            const paginationContainer = container.querySelector('.pagination-pages') || document.createElement('div');
            
            // تنظيف المحتوى الحالي
            container.querySelectorAll('.pagination').forEach(n => n.remove());
            
            // إنشاء العناصر الجديدة
            const paginationNav = document.createElement('nav');
            paginationNav.className = 'pagination';
            paginationNav.setAttribute('aria-label', 'Project pagination');
          
            // أزرار السابق والتالي
            const prevButton = document.createElement('button');
            prevButton.className = 'pagination-btn prev';
            prevButton.textContent = '« Prev';
            prevButton.disabled = state.currentPage === 1;
            prevButton.addEventListener('click', () => {
              if (state.currentPage > 1) {
                // state.currentPage--;
                state.currentPage = 1;
                updateProjectsVisibility();
              }
            });
          
            const nextButton = document.createElement('button');
            nextButton.className = 'pagination-btn next';
            nextButton.textContent = 'Next »';
            nextButton.disabled = state.currentPage === pageCount;
            nextButton.addEventListener('click', () => {
              if (state.currentPage < pageCount) {
                state.currentPage++;
                updateProjectsVisibility();
              }
            });
          
            // أزرار الصفحات
            paginationContainer.className = 'pagination-pages';
            paginationContainer.innerHTML = '';
            
            const startPage = Math.max(1, state.currentPage - 2);
            const endPage = Math.min(pageCount, state.currentPage + 2);
            
            for (let i = startPage; i <= endPage; i++) {
              const pageBtn = document.createElement('button');
              pageBtn.className = `page-item ${i === state.currentPage ? 'active' : ''}`;
              pageBtn.textContent = i;
              pageBtn.addEventListener('click', () => {
                state.currentPage = i;
                updateProjectsVisibility();
              });
              paginationContainer.appendChild(pageBtn);
            }
          
            // تجميع العناصر
            paginationNav.appendChild(prevButton);
            paginationNav.appendChild(paginationContainer);
            paginationNav.appendChild(nextButton);
            container.appendChild(paginationNav);
          };

        const updateProjectsVisibility = () => {
            const start = (state.currentPage - 1) * state.projectsPerPage;
            const end = start + state.projectsPerPage;

            projects.forEach((project, index) => {
                project.style.display = (index >= start && index < end) ? 'block' : 'none';
                project.classList.toggle('visible', (index >= start && index < end));
            });

            document.querySelectorAll('.page-item').forEach(item => {
                item.classList.toggle('active', item.textContent == state.currentPage);
            });
        };

        setupPagination();
        updateProjectsVisibility();
    };

    // ------ التحميل المتأخر ------
    const initLazyLoading = () => {
        const lazyLoadObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              // استبدال البيانات فقط إذا كانت موجودة
              if (img.dataset.src) img.src = img.dataset.src;
              if (img.dataset.srcset) img.srcset = img.dataset.srcset;
              img.classList.remove('lazy-load');
              img.classList.add('loaded');
              lazyLoadObserver.unobserve(img);
            }
          });
        }, { 
          rootMargin: '200px 0px 200px 0px' // زيادة الهوامش العلوية والسفلية
        });
      
        document.querySelectorAll('.lazy-load').forEach(img => {
          lazyLoadObserver.observe(img);
        });
      };

    // ------ نظام المودال ------
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

        // تحسين نظام المودال (إزالة التكرار)
        const loadProjectData = (id) => {
            const project = PROJECTS_DATA[id];
            if (!project) return;

            // إنشاء صورة والتحقق من وجودها
            const img = new Image();
            img.src = project.image;
            img.onload = () => DOM.modal.image.src = project.image;
            img.onerror = () => DOM.modal.image.src = 'images/fallback.jpg';

            // تحديث محتوى المودال
            DOM.modal.title.textContent = project.title;
            DOM.modal.description.textContent = project.description;
            DOM.modal.links.innerHTML = project.links.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener" class="modal-link">
                    ${link.text}
                </a>
            `).join('');
        };

            // إضافة تحقق من وجود الصورة
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

    // ------ التمرير السلس ------
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

    // ------ الوضع الداكن ------
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

    // ------ نظام القائمة الجانبية (الحل النهائي) ------
    // const initMobileMenu = () => {
    //     const toggleMenu = document.querySelector('.menu-toggle');
    //     const sidebarNav = document.querySelector('.sidebar-nav');

    //     if (!toggleMenu || !sidebarNav) return;

    //     // فتح/إغلاق القائمة
    //     const toggleMenuHandler = (e) => {
    //         e.stopPropagation();
    //         toggleMenu.classList.toggle('active');
    //         sidebarNav.classList.toggle('active');
    //         const icon = toggleMenu.querySelector('i');
    //         icon.classList.toggle('fa-bars');
    //         icon.classList.toggle('fa-times');
    //     };

    //     // إغلاق القائمة
    //     const closeMenu = () => {
    //         toggleMenu.classList.remove('active');
    //         sidebarNav.classList.remove('active');
    //         const icon = toggleMenu.querySelector('i');
    //         icon.classList.remove('fa-times');
    //         icon.classList.add('fa-bars');
    //     };

    //     // الأحداث
    //     toggleMenu.addEventListener('click', toggleMenuHandler);
    //     document.addEventListener('click', (e) => {
    //         if (!sidebarNav.contains(e.target) && !toggleMenu.contains(e.target)) closeMenu();
    //     });
    //     document.querySelectorAll('.sidebar-nav a').forEach(link => link.addEventListener('click', closeMenu));
    // };

    // Menu mainal
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

    // ------ تهيئة جميع المكونات ------
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

    // ------ بدء التشغيل ------
    init();
});
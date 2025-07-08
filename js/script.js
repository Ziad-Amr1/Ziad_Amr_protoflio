document.addEventListener('DOMContentLoaded', () => {
    // ------ State ------
    const state = {
        currentPage: 1,
        projectsPerPage: 6,
        totalProjects: document.querySelectorAll('.project-card').length
    };

    // calculate current page from hash
    function getCurrentPageFromHash() {
    const hash = window.location.hash;
    const match = hash.match(/#page=(\d+)/);
    return match ? parseInt(match[1]) : 1;
    };

    // ------ DOM Elements ------
    const DOM = {
        typingText: document.querySelector(".change"),
        cursor: document.querySelector(".cursor"),
        skillsGrid: document.querySelector('.skills-grid'),
        modal: {
            element: document.querySelector('.project-modal'),
            content: document.querySelector('.modal-content'),
            image: document.querySelector('.modal-image'),
            title: document.querySelector('.modal-title'),
            description: document.querySelector('.modal-description'),
            links: document.querySelector('.modal-links'),
            close: document.querySelector('.modal-close')
        }
    };

    // ------  Projects Data ------
    let PROJECTS_DATA = {};

    // تحميل بيانات المشاريع من ملف JSON
    async function loadProjectsData() {
    try {
        const response = await fetch('../json/projects.json');
        if (!response.ok) throw new Error('فشل تحميل الملف');
        const data = await response.json();
        
        // التأكد من أن البيانات صحيحة
        if (!data.projects || !Array.isArray(data.projects)) {
        throw new Error('هيكل البيانات غير صحيح');
        }

        // تحويل المصفوفة إلى كائن لسهولة الوصول
        PROJECTS_DATA = data.projects.reduce((acc, project) => {
        if (!project.id) throw new Error(`المشروع بدون ID: ${project.title}`);
        acc[project.id] = project;
        return acc;
        }, {});
        
        console.log('✅ PROJECTS_DATA:', PROJECTS_DATA); // تأكيد التحميل
        return PROJECTS_DATA;
    } catch (error) {
        console.error('❌ خطأ في تحميل المشاريع:', error);
        alert('تعذر تحميل المشاريع. يرجى التحقق من الملف أو الاتصال بالإنترنت.');
    }
    } 

    // ================= AOS Init =================
    const initAOS = () => {
        AOS.init({
            once: true,
            duration: 800,
            disable: window.innerWidth < 768
        });
    };

    // ------  Typing Effect ------
    const initTypingEffect = () => {
        const texts = ["Architect", "Graphic Designer", "Front-End Developer"];
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
                {name: 'AutoCAD', img: 'images/skills/cad-file.webp'},
                {name: 'Revit', img: 'images/skills/revit.webp'},
                {name: 'SketchUp', img: 'images/skills/skp.webp'},
                {name: 'Lumion', img: 'images/skills/lumion.webp'},
            ],
            design: [
                {name: 'Photoshop', img: 'images/skills/photoshop.webp'},
                {name: 'Illustrator', img: 'images/skills/illustrator.webp'},
                {name: 'InDesign', img: 'images/skills/indesign.webp'},
                {name: 'Dimension', img: 'images/skills/Dn.webp'},
                {name: 'Premiere Pro', img: 'images/skills/premiere-pro.webp'},
                {name: 'Figma', img: 'images/skills/figma.webp'},
                {name: 'Canva', img: 'images/skills/canva.webp'},
            ],
            development: [
                {name: 'HTML', img: 'images/skills/html.webp'}, 
                {name: 'CSS', img: 'images/skills/css.webp'},
                {name: 'JavaScript', img: 'images/skills/js.webp'},
                {name: 'Node.js', img: 'images/skills/nodejs.webp'},
                {name: 'React', img: 'images/skills/React.webp'},
                {name: 'python', img: 'images/skills/python.webp'},
                {name: 'Git', img: 'images/skills/git.webp'},
                {name: 'GitHub', img: 'images/skills/github.webp'},
                {name: 'bootstrap', img: 'images/skills/bootstrap.webp'},
                {name: 'VS Code', img: 'images/skills/vscode.webp'},
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

    // 
        // تحديث المشاريع المعروضة حسب الصفحة الحالية
    const updateProjectsVisibility = (projects) => {
    const start = (state.currentPage - 1) * state.projectsPerPage;
    const end = start + state.projectsPerPage;

    // إخفاء الجميع أولًا
    projects.forEach(p => p.style.display = 'none');

    // عرض المشاريع في الصفحة الحالية
    projects.slice(start, end).forEach(p => p.style.display = 'block');

    // ✅ إعادة إنشاء الترقيم دائمًا
    window.location.hash = `#page=${state.currentPage}`;
    setupPagination(projects);
    };

    // إعداد أزرار الترقيم
    const setupPagination = (projects) => {
    const pagesContainer = document.querySelector('.pagination-pages');
    if (!pagesContainer) return;
    pagesContainer.innerHTML = ''; // إعادة تعيين الأرقام دائمًا

    const pageCount = Math.ceil(projects.length / state.projectsPerPage);

    // إضافة أزرار الصفحات
    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement('button');
        btn.className = `page-item ${i === state.currentPage ? 'active' : ''}`;
        btn.textContent = i;
        btn.addEventListener('click', () => {
        state.currentPage = i;
        updateProjectsVisibility(projects);
        });
        pagesContainer.appendChild(btn);
    }

    // تحديث حالة زري التالي والسابق
    const prevBtn = document.querySelector('.pagination .prev');
    const nextBtn = document.querySelector('.pagination .next');

    if (prevBtn && nextBtn) {
        prevBtn.disabled = state.currentPage === 1;
        nextBtn.disabled = state.currentPage === pageCount;
    }
    };


    // ------  Projects System ------
    const handleProjects = () => {
    // الحصول على جميع المشاريع وأزرار الفلاتر
    const allProjects = Array.from(document.querySelectorAll('.project-card'));
    const filters = document.querySelectorAll('.filter-btn');
    let filteredProjects = [];

    // تطبيق الفلتر
    const applyFilter = (filter) => {
        // تصفية المشاريع حسب الفئة
        filteredProjects = allProjects.filter(p => filter === 'all' || p.dataset.category === filter);
        
        // إخفاء جميع المشاريع أولًا
        allProjects.forEach(p => p.style.display = 'none');
        
        // إعادة تعيين الصفحة الحالية إلى 1
        state.currentPage = getCurrentPageFromHash();
        
        // تحديث عرض المشاريع
        updateProjectsVisibility(filteredProjects);
    };

    // تفعيل الفلتر عند النقر على الأزرار
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
        });
    });

    // تفعيل الفلتر الافتراضي
    applyFilter('all');
    };
    
    // ------  Lazy Loading ------
    const initLazyLoading = () => {
    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) img.src = img.dataset.src;
            if (img.dataset.srcset) img.srcset = img.dataset.srcset;
            
            // إضافة تأثير تلاشي عند التحميل
            img.onload = () => {
            img.classList.remove('lazy-load');
            img.classList.add('loaded');
            };
            
            lazyLoadObserver.unobserve(img);
        }
        });
    }, { rootMargin: '0px 0px 200px 0px' });

    document.querySelectorAll('.lazy-load').forEach(img => {
        lazyLoadObserver.observe(img);
    });
    };

// Zoom عند النقر (اختياري)
DOM.modal.image.addEventListener('click', () => {
  DOM.modal.image.classList.toggle('zoomed');
});

    // ------   Modal System ------
const handleModal = () => {
    let modalProjectOrder = [];
    let currentModalIndex = 0;

    // ===== تحميل بيانات المشروع =====
    const loadProjectData = (id) => {
        const project = PROJECTS_DATA[id];
        if (!project) return;

        // تحديث البيانات داخل المودال
        DOM.modal.title.textContent = project.title;
        DOM.modal.description.textContent = project.description;

        const aspectRatio = project.aspect_ratio || 'auto';
        const img = new Image();
        img.src = project.image;

        img.onload = () => {
            DOM.modal.image.src = img.src;

            if (aspectRatio === 'landscape' || (img.width > img.height && aspectRatio === 'auto')) {
                DOM.modal.content.classList.add('modal-landscape');
                DOM.modal.content.classList.remove('modal-portrait');
            } else {
                DOM.modal.content.classList.add('modal-portrait');
                DOM.modal.content.classList.remove('modal-landscape');
            }
        };

        img.onerror = () => {
            DOM.modal.image.src = 'images/fallback.jpg';
            DOM.modal.content.classList.add('modal-landscape');
            DOM.modal.content.classList.remove('modal-portrait');
        };

        // تحديث الروابط
        DOM.modal.links.innerHTML = project.links.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="modal-link">
                ${link.text}
            </a>
        `).join('');

        // تعطيل أزرار التنقل حسب الموضع
        document.querySelector('.modal-prev').disabled = currentModalIndex === 0;
        document.querySelector('.modal-next').disabled = currentModalIndex === modalProjectOrder.length - 1;
    };

    // ===== فتح المودال عند الضغط على المشروع =====
    document.querySelectorAll('.project-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.dataset.project;

            // تحديث ترتيب المشاريع المعروضة حاليًا
            modalProjectOrder = Array.from(document.querySelectorAll('.project-card'))
                .filter(p => p.style.display !== 'none')
                .map(p => p.querySelector('.project-view').dataset.project);

            currentModalIndex = modalProjectOrder.indexOf(projectId);

            loadProjectData(projectId);
            DOM.modal.element.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // ===== زر الإغلاق × =====
    DOM.modal.close.addEventListener('click', () => {
        DOM.modal.element.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // ===== إغلاق عند الضغط خارج المودال =====
    DOM.modal.element.addEventListener('click', (e) => {
        if (e.target === DOM.modal.element) {
            DOM.modal.element.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ===== إغلاق عند الضغط على Escape =====
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            DOM.modal.element.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ===== التنقل للمشروع السابق =====
    document.querySelector('.modal-prev').addEventListener('click', () => {
        if (currentModalIndex > 0) {
            currentModalIndex--;
            loadProjectData(modalProjectOrder[currentModalIndex]);
        }
    });

    // ===== التنقل للمشروع التالي =====
    document.querySelector('.modal-next').addEventListener('click', () => {
        if (currentModalIndex < modalProjectOrder.length - 1) {
            currentModalIndex++;
            loadProjectData(modalProjectOrder[currentModalIndex]);
        }
    });
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

    //   reder projects data
    function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) {
        console.error('❌ عنصر #projects-grid غير موجود في الصفحة');
        return;
    }

    // مسح المحتوى القديم
    grid.innerHTML = '';

    // التأكد من أن PROJECTS_DATA ليست فارغة
    if (!PROJECTS_DATA || Object.keys(PROJECTS_DATA).length === 0) {
        grid.innerHTML = '<p>لا توجد مشاريع لعرضها</p>';
        return;
    }

    // تحويل الكائن إلى مصفوفة وعرض المشاريع
    Object.values(PROJECTS_DATA).forEach(project => {
        const card = document.createElement('div');
        card.className = `project-card ${project.category || 'unknown'}`;
        card.setAttribute('data-category', project.category || 'unknown');
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-duration', '800');
        card.setAttribute('data-aos-delay', '100');

        card.innerHTML = `
        <div class="project-image">
            <img src="images/placeholder.webp"
                data-src="${project.image}"
                alt="${project.title}"
                class="lazy-load"
                loading="lazy"
                width="800"
                height="600">
            <div class="project-overlay">
            <h3 class="project-title">${project.title}</h3>
            <div class="project-tags">
                ${project.tags?.map(tag => `<span>${tag}</span>`).join('') || ''}
            </div>
            <button class="project-view hover-lift" data-project="${project.id}">
                see details
            </button>
            </div>
        </div>
        `;

        grid.appendChild(card);
    });

    // إعادة تهيئة الفلاتر والـ pagination
    handleProjects();
    initLazyLoading();
    handleModal();
    };

    // init pagination
    const initPagination = () => {
    const prevBtn = document.querySelector('.pagination .prev');
    const nextBtn = document.querySelector('.pagination .next');

    window.addEventListener("hashchange", () => {
        const page = getCurrentPageFromHash();
        const currentFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        const currentProjects = Array.from(document.querySelectorAll('.project-card')).filter(p =>
            currentFilter === 'all' || p.dataset.category === currentFilter
        );
        state.currentPage = page;
        updateProjectsVisibility(currentProjects);
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const currentFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
            const currentProjects = Array.from(document.querySelectorAll('.project-card')).filter(p =>
                currentFilter === 'all' || p.dataset.category === currentFilter
            );

            if (state.currentPage > 1) {
                state.currentPage--;
                updateProjectsVisibility(currentProjects);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const currentFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
            const currentProjects = Array.from(document.querySelectorAll('.project-card')).filter(p =>
                currentFilter === 'all' || p.dataset.category === currentFilter
            );
            const pageCount = Math.ceil(currentProjects.length / state.projectsPerPage);

            if (state.currentPage < pageCount) {
                state.currentPage++;
                updateProjectsVisibility(currentProjects);
            }
        });
    }
    };


        
    // ================= init =================
    const init = async () => {
    await loadProjectsData();
    console.log('📊 PROJECTS_DATA بعد التحميل:', PROJECTS_DATA);
    initAOS();
    initTypingEffect();
    handleSkills();
    handleProjects();
    getCurrentPageFromHash();
    initLazyLoading();
    handleModal();
    initSmoothScroll();
    // initMobileMenu();
    renderProjects();
    initPagination();

    console.log('📦 PROJECTS_DATA:', PROJECTS_DATA);
    console.log('📄 عدد المشاريع:', Object.keys(PROJECTS_DATA).length);
    };

    // ================= start =================
    init();
});
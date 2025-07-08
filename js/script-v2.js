document.addEventListener('DOMContentLoaded', () => {
    class App {
        constructor() {
            this.state = {
                currentPage: 1,
                projectsPerPage: 6,
                totalProjects: document.querySelectorAll('.project-card').length
            };
            
            this.modules = {
                typing: new TypingEffect(),
                pagination: new PaginationManager(this.state),
                projects: new ProjectsManager(this.state, this.modules),
                modal: new ModalManager(),
                skills: new SkillsManager(),
                theme: new ThemeManager(),
                menu: new MobileMenuManager(),
                scroll: new SmoothScroll(),
                lazyLoad: new LazyLoader(),
            };
        }

        async init() {
            await this.modules.projects.loadProjectsData();
            this.initAOS();
            this.modules.typing.init();
            this.modules.skills.init();
            this.modules.projects.init();
            this.modules.pagination.init();
            this.modules.modal.init({
                projectsData: this.modules.projects.projectsData
            });
            this.modules.theme.init();
            this.modules.menu.init();
            this.modules.scroll.init();
        }

        initAOS() {
            AOS.init({
                once: true,
                duration: 800,
                disable: window.innerWidth < 768
            });
        }
    }

    class TypingEffect {
        constructor() {
            this.typingText = document.querySelector(".change");
            this.cursor = document.querySelector(".cursor");
            this.texts = ["Architect", "Graphic Designer", "Front-End Developer"];
            this.count = 0;
            this.index = 0;
            this.isDeleting = false;
        }

        type() {
            const currentText = this.texts[this.count];
            
            if (!this.isDeleting) {
                this.typingText.textContent = currentText.slice(0, ++this.index);
                if (this.index === currentText.length) {
                    this.isDeleting = true;
                    this.cursor.style.animation = 'none';
                    setTimeout(() => {
                        this.cursor.style.animation = 'blink 1s infinite';
                        this.type();
                    }, 2000);
                    return;
                }
            } else {
                this.typingText.textContent = currentText.slice(0, --this.index);
                if (this.index === 0) {
                    this.isDeleting = false;
                    this.count = (this.count + 1) % this.texts.length;
                }
            }
            
            setTimeout(() => this.type(), this.isDeleting ? 50 : 100);
        }

        init() {
            this.type();
        }
    }

    class PaginationManager {
        constructor(state) {
            this.state = state;
            this.pagesContainer = document.querySelector('.pagination-pages');
        }

        setup(projects) {
            this.pagesContainer.innerHTML = '';
            const pageCount = Math.ceil(projects.length / this.state.projectsPerPage);

            for (let i = 1; i <= pageCount; i++) {
                const btn = document.createElement('button');
                btn.className = `page-item ${i === this.state.currentPage ? 'active' : ''}`;
                btn.textContent = i;
                btn.addEventListener('click', () => {
                    this.state.currentPage = i;
                    this.updateProjectsVisibility(projects); // ✅
                });
                this.pagesContainer.appendChild(btn);
            }
            this.updateNavButtons(projects);
        }

        handlePageClick(page, projects) {
            this.state.currentPage = page;
            this.updateProjectsVisibility(projects);
        }

        updateNavButtons(projects) {
            const prevBtn = document.querySelector('.pagination .prev');
            const nextBtn = document.querySelector('.pagination .next');
            const pageCount = Math.ceil(projects.length / this.state.projectsPerPage);

            if (prevBtn && nextBtn) {
                prevBtn.disabled = this.state.currentPage === 1;
                nextBtn.disabled = this.state.currentPage === pageCount;
            }
        }

        updateProjectsVisibility(projects) {
            const start = (this.state.currentPage - 1) * this.state.projectsPerPage;
            const end = start + this.state.projectsPerPage;

            projects.forEach(p => p.style.display = 'none');
            projects.slice(start, end).forEach(p => p.style.display = 'block');
            
            window.location.hash = `#page=${this.state.currentPage}`;
            this.setup(projects);
        }

        init() {
            window.addEventListener("hashchange", () => {
                const page = this.getCurrentPageFromHash();
                this.state.currentPage = page;
            });
        }

        getCurrentPageFromHash() {
            const hash = window.location.hash;
            const match = hash.match(/#page=(\d+)/);
            return match ? parseInt(match[1]) : 1;
        }
    }

    class ProjectsManager {
        constructor(state) {
            this.state = state;
            this.modules = modules;
            this.projectsData = {};
            this.grid = document.getElementById('projects-grid');
        }

        async loadProjectsData() {
            try {
                 const response = await fetch('../json/projects.json');
                if (!response.ok) throw new Error('Failed to load');
                const data = await response.json();
                
                if (!data.projects || !Array.isArray(data.projects)) {
                    throw new Error('Invalid data structure');
                }

                this.projectsData = data.projects.reduce((acc, project) => {
                    acc[project.id] = project;
                    return acc;
                }, {});
                
                return this.projectsData;
            } catch (error) {
                console.error('Error loading projects:', error);
                this.grid.innerHTML = `<p class="error">${error.message}</p>`;
            }
        }

        render() {
            this.grid.innerHTML = '';
            Object.values(this.projectsData).forEach(project => {
                const card = this.createProjectCard(project);
                this.grid.appendChild(card);
            });
            AOS.refresh();
            AOS.init({
            once: true,
            duration: 800,
            disable: window.innerWidth < 768
        });
        }

        createProjectCard(project) {
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

        const viewBtn = card.querySelector('.project-view');
        viewBtn.addEventListener('click', (e) => {
            this.modules.modal.openModal(e);
        });


        // تأكد من تحميل الصورة عند الظهور
        const img = card.querySelector('img');
        this.modules.lazyLoad.observer.observe(img);

            return card;
        }

        initLazyLoading() {
            this.modules.lazyLoad.init();
        }

        init() {
            this.modules.lazyLoad.init();
            this.initLazyLoading();
            this.render();
            this.setupFilters();
            // this.initLazyLoading();
        }

        setupFilters() {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => this.handleFilter(btn));
            });
        }

        handleFilter(btn) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            this.applyFilter(btn.dataset.filter);
        }

        applyFilter(filter) {
            const allProjects = Array.from(document.querySelectorAll('.project-card'));
            
            // إخفاء جميع المشاريع أولاً
            allProjects.forEach(p => p.style.display = 'none');
            
            // تصفية المشاريع حسب الفئة
            const filtered = allProjects.filter(p => 
                filter === 'all' || p.dataset.category === filter
            );
            
            // تحديث حالة الترقيم
            this.state.currentPage = 1;
            this.modules.pagination.setup(filtered);
            this.modules.pagination.updateProjectsVisibility(filtered);
        }
    }

        class ModalManager {
        constructor() {
            this.elements = {
                modal: document.querySelector('.project-modal'),
                content: document.querySelector('.modal-content'),
                image: document.querySelector('.modal-image'),
                title: document.querySelector('.modal-title'),
                description: document.querySelector('.modal-description'),
                links: document.querySelector('.modal-links'),
                close: document.querySelector('.modal-close'),
                prev: document.querySelector('.modal-prev'),
                next: document.querySelector('.modal-next')
            };
            this.currentIndex = 0;
            this.projectsOrder = [];
        }

        init({ projectsData }) {
            this.projectsData = projectsData;
            this.setupEventListeners();
        }

        setupEventListeners() {
            document.querySelectorAll('.project-view').forEach(btn => {
                btn.addEventListener('click', (e) => this.openModal(e));
            });

            this.elements.close.addEventListener('click', () => this.closeModal());
            this.elements.modal.addEventListener('click', (e) => {
                if (e.target === this.elements.modal) this.closeModal();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === "Escape") this.closeModal();
            });
            this.elements.prev.addEventListener('click', () => this.navigate(-1));
            this.elements.next.addEventListener('click', () => this.navigate(1));
        }

        openModal(event) {
            const projectId = event.target.dataset.project;
            this.projectsOrder = Array.from(document.querySelectorAll('.project-card:not([style*="none"])'))
                .map(p => p.querySelector('.project-view').dataset.project);
            this.currentIndex = this.projectsOrder.indexOf(projectId);
            this.updateContent(projectId);
            this.elements.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.projectsOrder = Array.from(document.querySelectorAll('.project-card'))
            .filter(p => p.style.display !== 'none')
            .map(p => p.querySelector('.project-view').dataset.project);
        }

        updateContent(projectId) {
            const project = this.projectsData[projectId];
            if (!project) return;

            this.elements.title.textContent = project.title;
            this.elements.description.textContent = project.description;
            this.loadImage(project.image);
            this.updateLinks(project.links);
            this.updateNavButtons();
        }

        loadImage(src) {
            const img = new Image();
            img.onload = () => {
                this.elements.image.src = src;
                this.elements.content.classList.toggle('modal-landscape', img.width > img.height);
            };
            img.src = src;
        }

        updateLinks(links) {
            this.elements.links.innerHTML = links.map(link => `
                <a href="${link.url}" target="_blank" class="modal-link">
                    ${link.text}
                </a>
            `).join('');
        }

        navigate(direction) {
            const newIndex = this.currentIndex + direction;
            if (newIndex >= 0 && newIndex < this.projectsOrder.length) {
                this.currentIndex = newIndex;
                this.updateContent(this.projectsOrder[this.currentIndex]);
            }
        }

        updateNavButtons() {
            this.elements.prev.disabled = this.currentIndex === 0;
            this.elements.next.disabled = this.currentIndex === this.projectsOrder.length - 1;
        }

        closeModal() {
            this.elements.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    class SkillsManager {
        constructor() {
            this.dom = {
                grid: document.querySelector('.skills-grid'),
                tabs: document.querySelectorAll('.tab-btn')
            };
            this.data = {
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
        }

        init() {
            this.setupTabs();
            this.updateGrid('architecture');
        }

        setupTabs() {
            this.dom.tabs.forEach(tab => {
                tab.addEventListener('click', () => this.handleTabClick(tab));
            });
        }

        handleTabClick(tab) {
            this.dom.tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            this.updateGrid(tab.dataset.category);
        }

        updateGrid(category) {
            this.dom.grid.style.opacity = '0';
            setTimeout(() => {
                this.dom.grid.innerHTML = this.generateSkillCards(category);
                this.dom.grid.style.opacity = '1';
            }, 300);
        }

        generateSkillCards(category) {
            return this.data[category].map(skill => `
                <div class="skill-card card">
                    <img src="${skill.img}" alt="${skill.name}">
                    <h3>${skill.name}</h3>
                </div>
            `).join('');
        }
    }

    class ThemeManager {
        constructor() {
            this.toggle = document.getElementById('themeToggle');
            this.slider = document.querySelector('.slider');
        }

        init() {
            if (!this.toggle) return;
            this.toggle.addEventListener('change', () => this.toggleTheme());
            this.loadTheme();
        }

        toggleTheme() {
            document.body.classList.toggle('dark-theme');
            this.slider.classList.toggle('night-mode');
            localStorage.setItem('theme', this.toggle.checked ? 'dark' : 'light');
        }

        loadTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                this.toggle.checked = true;
                this.slider.classList.add('night-mode');
            }
        }
    }

    class MobileMenuManager {
        constructor() {
            this.menuToggle = document.querySelector('.menu-toggle');
            this.sidebar = document.querySelector('.sidebar-nav');
        }

        init() {
            if (!this.menuToggle || !this.sidebar) return;
            this.setupEventListeners();
        }

        setupEventListeners() {
            this.menuToggle.addEventListener('click', (e) => this.toggleMenu(e));
            document.addEventListener('click', (e) => this.handleOutsideClick(e));
            this.sidebar.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            window.addEventListener('scroll', () => this.closeMenu());
        }

        toggleMenu(e) {
            e.stopPropagation();
            this.menuToggle.classList.toggle('active');
            this.sidebar.classList.toggle('active');
        }

        handleOutsideClick(e) {
            if (!this.sidebar.contains(e.target) && !this.menuToggle.contains(e.target)) {
                this.closeMenu();
            }
        }

        closeMenu() {
            this.menuToggle.classList.remove('active');
            this.sidebar.classList.remove('active');
        }
    }

    class SmoothScroll {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => this.scrollTo(e, anchor));
            });
        }

        scrollTo(e, anchor) {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            const offset = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    }

    class LazyLoader {
        init() {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                    }
                });
            }, { rootMargin: '0px 0px 200px 0px' });

            document.querySelectorAll('.lazy-load').forEach(img => {
                this.observer.observe(img);
            });
        }

        loadImage(img) {
            if (img.dataset.src) img.src = img.dataset.src;
            img.classList.add('loaded');
            this.observer.unobserve(img);
        }
    }

    // تشغيل التطبيق
    const portfolioApp = new App();
    portfolioApp.init();
});
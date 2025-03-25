// script.js
// script.js - التحديث النهائي
document.addEventListener('DOMContentLoaded', () => {
    // تأثير الكتابة المتكرر مع الحذف
    const texts = ["Architect", "Graphic Designer", "Front-end Developer"];
    let count = 0;
    let index = 0;
    let isDeleting = false;
    const typingElement = document.querySelector(".change");
    const cursorElement = document.querySelector(".cursor");

    function type() {
        const currentText = texts[count];
        
        if (!isDeleting) {
            // مرحلة الكتابة
            typingElement.textContent = currentText.slice(0, ++index);
            if (index === currentText.length) {
                isDeleting = true;
                cursorElement.style.animation = 'none'; // إيقاف الوميض عند التوقف
                setTimeout(() => {
                    cursorElement.style.animation = 'blink 1s infinite';
                    type();
                }, 2000);
                return;
            }
        } else {
            // مرحلة الحذف
            typingElement.textContent = currentText.slice(0, --index);
            if (index === 0) {
                isDeleting = false;
                count = (count + 1) % texts.length;
            }
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }

    // بدء التأثير
    type();

    // Skills Data
    const skillsData = {
        architecture: [
            {name: 'AutoCAD', img: 'images/cad-file.png'},
            {name: 'Revit', img: 'images/revit.png'},
            {name: 'SketchUp', img: 'images/skp.png'},
            {name: 'Lumion', img: 'images/lumion.webp'},
        ],
        design: [
            {name: 'Photoshop', img: 'images/photoshop.png'},
            {name: 'Illustrator', img: 'images/illustrator.png'},
            {name: 'InDesign', img: 'images/indesign.png'},
            {name: 'Premiere Pro', img: 'images/premiere-pro.png'},
            {name: 'Figma', img: 'images/figma.webp'},
            {name: 'Canva', img: 'images/canva.webp'},
        ],
        development: [
            {name: 'HTML', img: 'images/HTML.webp'}, 
            {name: 'CSS', img: 'images/CSS.webp'},
            {name: 'JavaScript', img: 'images/JS.webp'},
            {name: 'Node.js', img: 'images/nodejs.webp'},
        ]
    };

    // Skills Tab Functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateSkillsGrid(btn.dataset.category);
        });
    });

    function updateSkillsGrid(category) {
        const grid = document.querySelector('.skills-grid');
        grid.style.opacity = 0;
        
        setTimeout(() => {
            grid.innerHTML = skillsData[category].map(skill => `
                <div class="skill-card">
                    <img src="${skill.img}" alt="${skill.name}">
                    <h3>${skill.name}</h3>
                </div>
            `).join('');
            
            grid.style.opacity = 1;
        }, 300);
    }

    function getSkillIcon(skill) {
        const icons = {
            'AutoCAD': 'fas fa-drafting-compass',
            'Revit': 'fas fa-building',
            'Photoshop': 'fas fa-palette',
            'JavaScript': 'fab fa-js-square'
        };
        return icons[skill] || 'fas fa-star';
    }

    // Initial Load
    updateSkillsGrid('architecture');
});

// Add smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project Filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            if (filter === 'all' || project.dataset.category === filter) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
});

// Project Modal
const modal = document.querySelector('.project-modal');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.project-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const projectId = e.target.dataset.project;
        // يمكنك إضافة بيانات المشروع من مصدر خارجي أو مصفوفة
        loadProjectData(projectId);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Example Project Data
function loadProjectData(id) {
    const projects = {
        1: {
            title: "Modern Villa Design",
            image: "images/project1.jpg",
            description: "Complete architectural design for a luxury villa including 3D modeling, interior design, and landscape planning.",
            links: [
                {text: "View Prototype", url: "#"},
                {text: "Case Study", url: "#"}
            ]
        },
        2: {
            title: "Hu Tao Poster",
            image: "images/Projects/hu_tao.jpg",
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
            title: "Modern Villa Design",
            image: "images/Projects/Arc_1.jpg",
            description: "Complete architectural design for a luxury villa including 3D modeling, interior design, and landscape planning.",
            links: [
                {text: "View Prototype", url: "#"},
                {text: "Case Study", url: "#"}
            ]
        },
        7: {
            title: "E-Commerce Dashboard",
            image: "images/Projects/hu tao poster4.jpg",
            description: "User-centered dashboard design for e-commerce analytics with real-time data visualization.",
            links: [
                {text: "Live Demo", url: "#"},
                {text: "Photoshop File", url: "#"}
            ]
        },
        8: {
            title: "Modern Villa Design",
            image: "images/Projects/Arc_1.jpg",
            description: "Complete architectural design for a luxury villa including 3D modeling, interior design, and landscape planning.",
            links: [
                {text: "View Prototype", url: "#"},
                {text: "Case Study", url: "#"}
            ]
        },
        9: {
            title: "E-Commerce Dashboard",
            image: "images/Projects/hu tao poster4.jpg",
            description: "User-centered dashboard design for e-commerce analytics with real-time data visualization.",
            links: [
                {text: "Live Demo", url: "#"},
                {text: "Photoshop File", url: "#"}
            ]
        },
        10: {
            title: "Modern Villa Design",
            image: "images/Projects/Arc_1.jpg",
            description: "Complete architectural design for a luxury villa including 3D modeling, interior design, and landscape planning.",
            links: [
                {text: "View Prototype", url: "#"},
                {text: "Case Study", url: "#"}
            ]
        },
        11: {
            title: "E-Commerce Dashboard",
            image: "images/Projects/hu tao poster4.jpg",
            description: "User-centered dashboard design for e-commerce analytics with real-time data visualization.",
            links: [
                {text: "Live Demo", url: "#"},
                {text: "Photoshop File", url: "#"}
            ]
        }
    };

    const project = projects[id];
    if (!project) return;

    modal.querySelector('.modal-image').src = project.image;
    modal.querySelector('.modal-title').textContent = project.title;
    modal.querySelector('.modal-description').textContent = project.description;
    
    const linksContainer = modal.querySelector('.modal-links');
    linksContainer.innerHTML = project.links.map(link => `
        <a href="${link.url}" target="_blank">${link.text}</a>
    `).join('');
}

// Initialize AOS
AOS.init({
    once: true, // التأثير يظهر مرة واحدة فقط
    disable: 'mobile' // تعطيل على الأجهزة المحمولة
  });

  let currentPage = 1;
const projectsPerPage = 6; // عدد المشاريع في كل صفحة

function setupPagination(projects) {
  const pageCount = Math.ceil(projects.length / projectsPerPage);
  const pageNumbers = document.querySelector('.page-numbers');
  
  pageNumbers.innerHTML = Array(pageCount).fill()
    .map((_, i) => `<button class="page-btn ${i === 0 ? 'active' : ''}">${i + 1}</button>`)
    .join('');
}

function showPage(page, projects) {
  currentPage = page;
  const start = (page - 1) * projectsPerPage;
  const end = start + projectsPerPage;

  document.querySelectorAll('.project-card').forEach((project, i) => {
    project.style.display = (i >= start && i < end) ? 'block' : 'none';
  });

  document.querySelectorAll('.page-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent == page);
  });
}

// Event Listeners
document.querySelector('.pagination').addEventListener('click', (e) => {
  if (e.target.classList.contains('page-btn')) {
    showPage(parseInt(e.target.textContent), projects);
  }
  
  if (e.target.classList.contains('page-prev') && currentPage > 1) {
    showPage(currentPage - 1, projects);
  }
  
  if (e.target.classList.contains('page-next') && currentPage < pageCount) {
    showPage(currentPage + 1, projects);
  }
});

// التهيئة الأولية
const projects = document.querySelectorAll('.project-card');
setupPagination(projects);
showPage(1, projects);

// lazy loading
const lazyImages = document.querySelectorAll('.lazy-load');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy-load');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => observer.observe(img));

// Lazy Loading مع Pagination
document.addEventListener('DOMContentLoaded', () => {
    // تهيئة AOS
    AOS.init({
        once: true,
        duration: 800
    });

    // Lazy Load الصور
    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                lazyLoadObserver.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });

    document.querySelectorAll('.lazy-load').forEach(img => {
        lazyLoadObserver.observe(img);
    });

    // Pagination
    const projectsPerPage = 6;
    let currentPage = 1;
    const projects = Array.from(document.querySelectorAll('.project-card'));
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    function updatePagination() {
        const start = (currentPage - 1) * projectsPerPage;
        const end = start + projectsPerPage;

        projects.forEach((project, index) => {
            project.style.display = (index >= start && index < end) ? 'block' : 'none';
            project.classList.toggle('visible', (index >= start && index < end));
        });

        document.querySelectorAll('.page-item').forEach(item => {
            item.classList.remove('active');
            if (item.textContent == currentPage) item.classList.add('active');
        });
    }

    // إنشاء أزرار الترقيم
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-container';
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-item ${i === 1 ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            updatePagination();
        });
        paginationContainer.appendChild(pageBtn);
    }

    document.querySelector('#projects .container').appendChild(paginationContainer);
    
    // التهيئة الأولية
    updatePagination();
});

// تحسين التمرير مع مراعاة الهيدر الثابت
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});


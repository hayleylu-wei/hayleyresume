// DOM 載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    
    // 獲取元素
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTop');
    
    // 漢堡選單切換功能
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // 點擊導覽連結時關閉漢堡選單
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // 平滑滾動到指定區塊
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 考慮導覽列高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 返回頂部按鈕功能
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 導覽列滾動效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 滾動時高亮當前區塊的導覽連結
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // 作品展示卡片懸停效果
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 技能專長卡片動畫
    const skillCategories = document.querySelectorAll('.skill-category');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 為所有需要動畫的元素添加觀察
    const animatedElements = document.querySelectorAll('.skill-category, .experience-item, .portfolio-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 聯絡方式連結點擊效果
    const contactLinks = document.querySelectorAll('#contact a');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果是外部連結，不需要特殊處理
            if (this.getAttribute('href').startsWith('http') || this.getAttribute('href').startsWith('mailto') || this.getAttribute('href').startsWith('tel')) {
                return;
            }
            
            e.preventDefault();
            // 添加點擊效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // 頁面載入完成後的歡迎動畫
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 100);
    
    // 鍵盤導航支援
    document.addEventListener('keydown', function(e) {
        // ESC 鍵關閉漢堡選單
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // 方向鍵上下滾動
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            window.scrollBy(0, -100);
        } else if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            window.scrollBy(0, 100);
        }
    });
    
    // 觸控設備優化
    if ('ontouchstart' in window) {
        // 為觸控設備添加特殊樣式
        document.body.classList.add('touch-device');
        
        // 優化觸控滾動
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
        });
        
        document.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // 向上滑動 - 可以添加特殊功能
                } else {
                    // 向下滑動 - 可以添加特殊功能
                }
            }
        }
    }
    
    // 性能優化：防抖函數
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 使用防抖優化滾動事件
    const debouncedScrollHandler = debounce(function() {
        // 滾動相關的處理邏輯
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // 可以根據滾動百分比添加特殊效果
        if (scrollPercent > 80) {
            document.body.classList.add('near-bottom');
        } else {
            document.body.classList.remove('near-bottom');
        }
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // 錯誤處理
    window.addEventListener('error', function(e) {
        console.error('頁面發生錯誤:', e.error);
        // 可以在這裡添加錯誤報告邏輯
    });
    
    // 頁面可見性變化處理
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 頁面隱藏時暫停動畫
            document.body.classList.add('page-hidden');
        } else {
            // 頁面顯示時恢復動畫
            document.body.classList.remove('page-hidden');
        }
    });
});

// 全域函數：平滑滾動到指定元素
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 作品集展開/收合功能
function togglePortfolio(portfolioId) {
    const gallery = document.getElementById(`gallery-${portfolioId}`);
    if (gallery) {
        gallery.classList.toggle('active');
        
        // 防止背景滾動
        if (gallery.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

// 點擊背景關閉作品集
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('portfolio-gallery')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ESC鍵關閉作品集
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeGallery = document.querySelector('.portfolio-gallery.active');
        if (activeGallery) {
            activeGallery.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// 全域函數：複製聯絡資訊到剪貼板
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            // 顯示複製成功提示
            showNotification('已複製到剪貼板');
        }).catch(err => {
            console.error('複製失敗:', err);
        });
    } else {
        // 降級處理
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('已複製到剪貼板');
    }
}

// 顯示通知函數
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #3498db;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// 添加通知動畫樣式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .page-hidden * {
        animation-play-state: paused !important;
    }
    .touch-device .portfolio-item:hover {
        transform: none;
    }
    .nav-link.active {
        color: #3498db;
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);


// === 手風琴（修正版）：事件委派，靠相鄰面板，不吃 ID ===
document.addEventListener('click', function (e) {
  const flip = e.target.closest('.flip');
  if (!flip) return;

  // 只處理 .flip 後面緊鄰的 .panel
  const panel = flip.nextElementSibling;
  if (!panel || !panel.classList.contains('panel')) return;

  // 關閉其它面板
  document.querySelectorAll('.panel').forEach(p => {
    if (p !== panel) {
      p.style.display = 'none';
      const btn = p.previousElementSibling;
      if (btn && btn.classList.contains('flip')) btn.classList.remove('active');
    }
  });

  // 切換當前面板
  const willOpen = panel.style.display !== 'block';
  panel.style.display = willOpen ? 'block' : 'none';
  flip.classList.toggle('active', willOpen);
});

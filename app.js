// ==========================================
// LOGIC SECTION (ส่วนการทำงานของระบบ)
// ==========================================

let currentDepartmentId = null;

// อ้างอิง Elements จาก HTML
const menuList = document.getElementById('menuList');
const contentContainer = document.getElementById('contentContainer');
const headerTitle = document.getElementById('headerTitle');
const headerSubtitle = document.getElementById('headerSubtitle');
const mobileHeaderTitle = document.getElementById('mobileHeaderTitle');
const mobileHeaderSubtitle = document.getElementById('mobileHeaderSubtitle');

// Mobile Sidebar Elements
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');

// ฟังก์ชันเปิด/ปิด เมนูด้านข้าง (สำหรับมือถือ)
function toggleSidebar() {
    const isClosed = sidebar.classList.contains('-translate-x-full');
    if (isClosed) {
        sidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.remove('hidden');
    } else {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
    }
}

mobileMenuBtn.addEventListener('click', toggleSidebar);
closeSidebarBtn.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', toggleSidebar);

// ฟังก์ชันสร้างเมนูใน Sidebar
function renderMenu() {
    menuList.innerHTML = '';
    portalData.forEach(dept => {
        const li = document.createElement('li');
        
        const btn = document.createElement('button');
        const isActive = currentDepartmentId === dept.id;
        
        // รูปแบบคลาสของปุ่มเมนู (เปลี่ยนสีเมื่อถูกเลือก)
        btn.className = `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 
            ${isActive 
                ? 'bg-corporate-blue text-white shadow-md font-medium' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`;
        
        btn.innerHTML = `
            <div class="${isActive ? 'bg-white/20' : 'bg-slate-700/50'} w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                <i class="fa-solid ${dept.icon} ${isActive ? 'text-white' : 'text-slate-400'}"></i>
            </div>
            <span class="flex-1 truncate">${dept.name}</span>
        `;
        
        btn.onclick = () => {
            selectDepartment(dept.id);
            // ปิดเมนูอัตโนมัติบนมือถือเมื่อกดเลือก
            if (window.innerWidth < 1024) { 
                toggleSidebar();
            }
        };
        
        li.appendChild(btn);
        menuList.appendChild(li);
    });
}

// ฟังก์ชันเลือกไอคอนตามประเภทของลิงก์ (PDF หรือ Web)
function getIconHtml(type) {
    if (type === 'pdf') {
        return `<div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-105 transition-transform">
                    <i class="fa-solid fa-file-pdf text-red-500 text-2xl"></i>
                </div>`;
    }
    return `<div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-globe text-blue-500 text-2xl"></i>
            </div>`;
}

// ฟังก์ชันอัปเดตข้อมูลเมื่อมีการเลือกแผนก
function selectDepartment(id) {
    currentDepartmentId = id;
    const dept = portalData.find(d => d.id === id);
    
    if (!dept) return;

    // อัปเดตชื่อหัวข้อ
    headerTitle.textContent = dept.name;
    headerSubtitle.textContent = dept.description;
    mobileHeaderTitle.textContent = dept.name;
    mobileHeaderSubtitle.textContent = dept.description;

    // สร้างเนื้อหา (HTML)
    let contentHtml = '';
    
    dept.categories.forEach(category => {
        contentHtml += `
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div class="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center gap-3">
                    <div class="w-1.5 h-6 bg-corporate-blue rounded-full"></div>
                    <h3 class="text-lg font-bold text-slate-800">${category.title}</h3>
                </div>
                <div class="p-4 md:p-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        `;

        category.links.forEach(link => {
            const isPdf = link.type === 'pdf';
            contentHtml += `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
                   class="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md hover:bg-blue-50/30 transition-all duration-300 group bg-white cursor-pointer relative overflow-hidden">
                    ${getIconHtml(link.type)}
                    <div class="flex-1 min-w-0 pr-6">
                        <h4 class="text-slate-800 font-semibold truncate group-hover:text-corporate-blue transition-colors text-[15px]">
                            ${link.title}
                        </h4>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-[11px] font-medium px-2 py-0.5 rounded-full ${isPdf ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}">
                                ${isPdf ? 'PDF File' : 'Web Link'}
                            </span>
                            <span class="text-[12px] text-slate-400 truncate">
                                คลิกเพื่อเปิดในแท็บใหม่
                            </span>
                        </div>
                    </div>
                    <div class="absolute right-4 text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </div>
                </a>
            `;
        });

        contentHtml += `
                    </div>
                </div>
            </div>
        `;
    });

    // ใส่แอนิเมชัน Fade-in ใหม่ทุกครั้งที่เปลี่ยนหน้า
    contentContainer.classList.remove('animate-fade-in');
    void contentContainer.offsetWidth; // บังคับให้เบราว์เซอร์ลบแอนิเมชันเดิมก่อน
    contentContainer.classList.add('animate-fade-in');
    
    contentContainer.innerHTML = contentHtml;
    
    // วาดเมนูใหม่เพื่อให้ไฮไลต์แผนกที่ถูกเลือกอยู่
    renderMenu();
}

// เริ่มต้นการทำงานของหน้าเว็บ
function init() {
    renderMenu();
}

// สั่งทำงานเมื่อโหลดไฟล์
init();

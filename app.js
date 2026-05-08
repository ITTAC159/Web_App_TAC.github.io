// ==========================================
// LOGIC SECTION (ส่วนการทำงานของระบบ)
// ==========================================

let currentDepartmentId = null;

// อ้างอิง Elements จาก HTML
const contentContainer = document.getElementById('contentContainer');
const headerTitle = document.getElementById('headerTitle');
const headerSubtitle = document.getElementById('headerSubtitle');
const mobileHeaderTitle = document.getElementById('mobileHeaderTitle');
const mobileHeaderSubtitle = document.getElementById('mobileHeaderSubtitle');



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

}

// ฟังก์ชันสำหรับวาดหน้าแรก (Home Dashboard)
function renderHome() {
    currentDepartmentId = null;

    headerTitle.textContent = 'Welcome';
    headerSubtitle.textContent = 'to the employee information center';
    mobileHeaderTitle.textContent = 'Welcome';
    mobileHeaderSubtitle.textContent = 'to the employee information center';

    let contentHtml = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">';

    portalData.forEach(dept => {
        contentHtml += `
            <div onclick="selectDepartment('${dept.id}')" class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col h-full">
                <div class="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all">
                    <i class="fa-solid ${dept.icon} text-2xl text-corporate-blue"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-corporate-blue transition-colors">${dept.name}</h3>
                <p class="text-sm text-slate-500 flex-1">${dept.description}</p>
                <div class="mt-4 flex items-center gap-2 text-sm font-medium text-corporate-blue opacity-0 group-hover:opacity-100 transition-opacity">
                    ดูรายละเอียด <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        `;
    });

    contentHtml += '</div>';

    contentContainer.classList.remove('animate-fade-in');
    void contentContainer.offsetWidth;
    contentContainer.classList.add('animate-fade-in');

    contentContainer.innerHTML = contentHtml;

}

// โลโก้คลิกกลับหน้าแรก
const logoBtn = document.getElementById('logoBtn');
const mobileLogoBtn = document.getElementById('mobileLogoBtn');
if (logoBtn) logoBtn.addEventListener('click', renderHome);
if (mobileLogoBtn) mobileLogoBtn.addEventListener('click', renderHome);

// เริ่มต้นการทำงานของหน้าเว็บ
function init() {
    renderHome();
}

// สั่งทำงานเมื่อโหลดไฟล์
init();

// ==========================================
// ส่วนสำหรับระบบ Pull-to-Refresh
// ==========================================
let touchStart = 0;
let touchEnd = 0;

// 1. ตรวจจับจุดที่เริ่มแตะหน้าจอ
window.addEventListener('touchstart', (e) => {
    touchStart = e.targetTouches[0].pageY;
}, { passive: true });

// 2. ตรวจจับจุดที่ปล่อยนิ้ว
window.addEventListener('touchend', (e) => {
    touchEnd = e.changedTouches[0].pageY;
    handleGesture();
}, { passive: true });

// 3. คำนวณว่าเป็นการลากลงหรือไม่
function handleGesture() {
    // ถ้าลากนิ้วลงมาเกิน 150 พิกเซล และอยู่ที่บนสุดของหน้าเว็บ
    if (touchEnd - touchStart > 150 && window.scrollY === 0) {
        // ทำการรีเฟรชข้อมูล (เรียกฟังก์ชันเริ่มต้นใหม่)
        location.reload();
    }
}

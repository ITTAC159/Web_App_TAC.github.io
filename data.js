// ==========================================
// DATA SECTION (ส่วนของข้อมูล - สำคัญที่สุด)
// คุณสามารถแก้ไข เพิ่ม หรือลบข้อมูลข้อความและลิงก์ได้ที่ตัวแปร portalData นี้
// ==========================================
const portalData = [
    {
        id: 'hr',
        name: 'ฝ่ายทรัพยากรบุคคล (HR)',
        icon: 'fa-users',
        description: 'ข้อมูลสวัสดิการ กฎระเบียบ และระบบสำหรับพนักงาน',
        categories: [
            {
                title: 'คู่มือและนโยบาย',
                links: []
            },
            {
                title: 'ระบบออนไลน์ (E-Services)',
                links: []
            }
        ]
    },
    {
        id: 'it',
        name: 'ฝ่ายเทคโนโลยีสารสนเทศ (IT)',
        icon: 'fa-laptop-code',
        description: 'บริการช่วยเหลือด้านไอที ซอฟต์แวร์ และนโยบายความปลอดภัย',
        categories: [
            {
                title: 'บริการความช่วยเหลือ (IT Support)',
                links: [
                    { title: 'ระบบแจ้งซ่อม IT (Helpdesk System)', url: 'https://helpdesk.example.com', type: 'web' },
                ]
            },
            {
                title: 'ซอฟต์แวร์และนโยบายความปลอดภัย',
                links: []
            }
        ]
    },
    {
        id: 'ga',
        name: 'ฝ่ายธุรการทั่วไป (GA)',
        icon: 'fa-building',
        description: 'บริการส่วนกลาง อาคารสถานที่ และยานพาหนะ',
        categories: [
            {
                title: 'บริการส่วนกลาง',
                links: []
            },
            {
                title: 'แบบฟอร์มและระเบียบปฏิบัติ',
                links: []
            }
        ]
    },
    {
        id: 'safety',
        name: 'ฝ่ายความปลอดภัย (Safety/JorPor)',
        icon: 'fa-hard-hat',
        description: 'มาตรฐานความปลอดภัย อาชีวอนามัย และสิ่งแวดล้อม',
        categories: [
            {
                title: 'มาตรฐานและความปลอดภัย (OH&S)',
                links: []
            },
            {
                title: 'รายงานและการจัดการ',
                links: []
            }
        ]
    }
];

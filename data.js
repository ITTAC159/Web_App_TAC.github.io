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
                    { title: 'ระบบแจ้งซ่อม IT (Helpdesk System)', url: `https://apps.powerapps.com/play/e/default-d7cb89dc-f748-4a69-9ffc-7dc54794aff5/a/9d77669f-bebd-42f9-a86e-db439684169e?source=teamsopenwebsite&screenColor=rgba(0%2C%20176%2C%20240%2C%201)&hint=362c3461-6fd1-4cb6-84be-da419a0e8abd&tenantId=d7cb89dc-f748-4a69-9ffc-7dc54794aff5`, type: 'web' },
                    { title: 'เบอร์ติดต่อภายในองค์กร', url: 'https://thaiauto.sharepoint.com/:b:/r/sites/it/Shared%20Documents/IT%20Application/Aek%20Test/Test%20new/TAC%20Internal%20Contacts%20Rv.02.pdf?csf=1&web=1&e=MDjcuG', type: 'pdf' },
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

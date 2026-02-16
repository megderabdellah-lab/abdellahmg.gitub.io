// SwissWay - جميع الوظائف التفاعلية

// إدارة اللغة
let currentLang = 'ar';

document.getElementById('langSwitch').addEventListener('click', function() {
if (currentLang === 'ar') {
this.innerHTML = '<i class="fas fa-language"></i><span>AR</span>';
currentLang = 'fr';
document.documentElement.lang = 'fr';
document.documentElement.dir = 'ltr';
showNotification('Passé en français');
} else {
this.innerHTML = '<i class="fas fa-language"></i><span>FR</span>';
currentLang = 'ar';
document.documentElement.lang = 'ar';
document.documentElement.dir = 'rtl';
showNotification('تم التبديل إلى العربية');
}
});

// إظهار الإشعارات
function showNotification(message) {
const notification = document.createElement('div');
notification.textContent = message;
notification.style.cssText = `
position: fixed;
top: 80px;
left: 50%;
transform: translateX(-50%);
background: #FF0000;
color: white;
padding: 12px 25px;
border-radius: 30px;
box-shadow: 0 5px 15px rgba(255,0,0,0.5);
z-index: 2000;
animation: slideDown 0.3s ease;
border: 2px solid #FFD700;
`;
document.body.appendChild(notification);

setTimeout(() => {
notification.remove();
}, 2000);
}

// إظهار صفحة التفاصيل من البطاقات
function showDetail(section) {
console.log('فتح القسم:', section);
// إخفاء الشبكة الرئيسية
document.getElementById('mainGrid').style.display = 'none';
// إخفاء كل صفحات التفاصيل
document.querySelectorAll('.detail-page').forEach(page => {
page.classList.remove('active');
});
// إظهار الصفحة المطلوبة
const detailPage = document.getElementById(`detail-${section}`);
if (detailPage) {
detailPage.classList.add('active');
updateActiveNav(section);
window.scrollTo({ top: 0, behavior: 'smooth' });
} else {
console.error('الصفحة غير موجودة:', section);
showNotification('هذا القسم قيد التطوير');
}
}

// إخفاء صفحة التفاصيل والعودة للرئيسية
function hideDetail(section) {
const detailPage = document.getElementById(`detail-${section}`);
if (detailPage) {
detailPage.classList.remove('active');
}
document.getElementById('mainGrid').style.display = 'grid';
updateActiveNav('home');
}

// إظهار قسم من التبويب السفلي
function showSection(section) {
// تحديث التبويبات
document.querySelectorAll('.nav-item').forEach(item => {
item.classList.remove('active');
});
event.currentTarget.classList.add('active');

if (section === 'home') {
document.getElementById('mainGrid').style.display = 'grid';
document.querySelectorAll('.detail-page').forEach(page => {
page.classList.remove('active');
});
} else {
document.getElementById('mainGrid').style.display = 'none';
document.querySelectorAll('.detail-page').forEach(page => {
page.classList.remove('active');
});
// معالجة خاصة لكل قسم
const detailPage = document.getElementById(`detail-${section}`);
if (detailPage) {
detailPage.classList.add('active');
} else {
console.error('الصفحة غير موجودة:', section);
showNotification('هذا القسم قيد التطوير');
}
}
}

// تحديث التبويب النشط
function updateActiveNav(section) {
const navItems = document.querySelectorAll('.nav-item');
const sectionToNav = {
'home': 0,
'employment': 1,
'emergency': 2,
'permits': 3
};

const navIndex = sectionToNav[section] !== undefined ? sectionToNav[section] : 0;

navItems.forEach((item, index) => {
if (index === navIndex) {
item.classList.add('active');
} else {
item.classList.remove('active');
}
});
}

// قائمة المزيد
function showMoreMenu() {
const menu = document.createElement('div');
menu.className = 'more-menu';
menu.innerHTML = `
<div class="more-menu-content">
<h3><i class="fas fa-th-large"></i> جميع الأقسام</h3>
<div class="more-menu-grid">
<div class="more-menu-item" onclick="showDetail('restaurants')">
<i class="fas fa-utensils"></i>
<span>مطاعم</span>
</div>
<div class="more-menu-item" onclick="showDetail('mosques')">
<i class="fas fa-mosque"></i>
<span>مساجد</span>
</div>
<div class="more-menu-item" onclick="showDetail('transport')">
<i class="fas fa-train"></i>
<span>النقل</span>
</div>
<div class="more-menu-item" onclick="showDetail('community')">
<i class="fas fa-users"></i>
<span>الجالية</span>
</div>
<div class="more-menu-item" onclick="showDetail('money')">
<i class="fas fa-money-bill-transfer"></i>
<span>تحويل أموال</span>
</div>
<div class="more-menu-item" onclick="showDetail('insurance')">
<i class="fas fa-heartbeat"></i>
<span>تأمين صحي</span>
</div>
<div class="more-menu-item" onclick="showDetail('banks')">
<i class="fas fa-university"></i>
<span>بنوك</span>
</div>
<div class="more-menu-item" onclick="showDetail('education')">
<i class="fas fa-school"></i>
<span>تعليم</span>
</div>
</div>
<button class="close-menu" onclick="closeMenu(this)">إغلاق</button>
</div>
`;

menu.style.cssText = `
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0,0,0,0.9);
backdrop-filter: blur(10px);
display: flex;
align-items: center;
justify-content: center;
z-index: 2000;
`;

document.body.appendChild(menu);
}

// إغلاق القائمة
function closeMenu(btn) {
const menu = btn.closest('.more-menu').parentElement;
menu.remove();
}

// الاتصال بأرقام الهاتف
function callNumber(number) {
const cleanNumber = number.replace(/[\s-]/g, '');

const dialog = document.createElement('div');
dialog.className = 'call-dialog';
dialog.innerHTML = `
<div class="call-dialog-content">
<i class="fas fa-phone-alt"></i>
<h3>اتصال</h3>
<p>هل تريد الاتصال بالرقم <strong>${number}</strong>؟</p>
<div class="dialog-buttons">
<button onclick="makeCall('${cleanNumber}')" class="call-btn">
<i class="fas fa-phone"></i> اتصل الآن
</button>
<button onclick="closeDialog(this)" class="cancel-btn">
<i class="fas fa-times"></i> إلغاء
</button>
</div>
</div>
`;

dialog.style.cssText = `
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0,0,0,0.8);
backdrop-filter: blur(5px);
display: flex;
align-items: center;
justify-content: center;
z-index: 3000;
`;

document.body.appendChild(dialog);
}

function makeCall(number) {
window.location.href = `tel:${number}`;
closeDialog(event.target);
}

function closeDialog(element) {
const dialog = element.closest('.call-dialog').parentElement;
dialog.remove();
}

// فتح المواقع
function openWebsite(site) {
const urls = {
'fragomen': 'https://www.fragomen.com',
'legal12': 'https://www.legal12tablesavocats.ch',
'simax': 'https://www.simaxlaw.com',
'jobs.ch': 'https://www.jobs.ch',
'jobup.ch': 'https://www.jobup.ch',
'linkedin.com': 'https://www.linkedin.com',
'indeed.ch': 'https://www.indeed.ch',
'wise': 'https://wise.com',
'revolut': 'https://www.revolut.com',
'westernunion': 'https://www.westernunion.com',
'yamersal': 'https://yamersal.com'
};

const url = urls[site] || `https://www.${site}`;
window.open(url, '_blank');
}

// البحث
document.getElementById('searchInput').addEventListener('keyup', function(e) {
if (e.key === 'Enter') {
search(this.value);
}
});

document.getElementById('searchBtn').addEventListener('click', function() {
const query = document.getElementById('searchInput').value;
search(query);
});

function search(query) {
if (!query.trim()) {
showNotification('اكتب كلمة للبحث');
return;
}

showNotification(`جاري البحث عن: ${query}`);
// هنا يمكن إضافة منطق البحث
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
console.log('🚀 SwissWay جاهز للانطلاق!');
// التأكد من وجود جميع الصفحات
const pages = ['legal', 'permits', 'paperwork', 'employment', 'newcomers',
'emergency', 'restaurants', 'mosques', 'transport', 'community',
'money', 'insurance', 'banks', 'education'];

pages.forEach(page => {
const element = document.getElementById(`detail-${page}`);
if (element) {
console.log(`✅ صفحة ${page} موجودة`);
} else {
console.warn(`⚠️ صفحة ${page} غير موجودة`);
}
});
// إضافة تأثيرات حركية للبطاقات
document.querySelectorAll('.card').forEach((card, index) => {
card.style.animation = `fadeIn 0.3s ease forwards ${index * 0.05}s`;
});
});

// إضافة الأنيميشن
const style = document.createElement('style');
style.textContent = `
@keyframes slideDown {
from {
opacity: 0;
transform: translate(-50%, -20px);
}
to {
opacity: 1;
transform: translate(-50%, 0);
}
}

.more-menu-grid {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 15px;
margin: 20px 0;
}

.more-menu-item {
background: rgba(255, 255, 255, 0.1);
padding: 15px;
border-radius: 15px;
text-align: center;
cursor: pointer;
transition: all 0.3s;
color: white;
border: 1px solid rgba(255, 215, 0, 0.3);
}

.more-menu-item:hover {
background: #FF0000;
transform: scale(1.05);
border-color: #FFD700;
}

.more-menu-item i {
font-size: 30px;
margin-bottom: 5px;
display: block;
color: #FFD700;
}

.more-menu-item:hover i {
color: white;
}

.close-menu {
background: #FF0000;
color: white;
border: 2px solid #FFD700;
padding: 12px 30px;
border-radius: 40px;
font-weight: bold;
cursor: pointer;
margin-top: 20px;
width: 100%;
font-size: 16px;
transition: all 0.3s;
}

.close-menu:hover {
background: #8B0000;
transform: scale(1.02);
}

.more-menu-content {
background: linear-gradient(135deg, #1a1a2c, #16213e);
padding: 30px;
border-radius: 30px;
max-width: 500px;
width: 90%;
color: white;
border: 2px solid #FF0000;
box-shadow: 0 25px 50px rgba(255, 0, 0, 0.3);
}

.call-dialog-content {
background: linear-gradient(135deg, #1a1a2c, #16213e);
padding: 30px;
border-radius: 30px;
max-width: 400px;
width: 90%;
text-align: center;
border: 2px solid #FFD700;
box-shadow: 0 25px 50px rgba(255, 0, 0, 0.5);
}

.call-dialog-content i {
font-size: 60px;
color: #FF0000;
margin-bottom: 20px;
}

.call-dialog-content h3 {
color: #FFD700;
margin-bottom: 10px;
font-size: 24px;
}

.call-dialog-content p {
color: white;
margin-bottom: 20px;
font-size: 16px;
}

.call-dialog-content strong {
color: #FFD700;
font-size: 20px;
direction: ltr;
display: inline-block;
}

.dialog-buttons {
display: flex;
gap: 10px;
}

.call-btn, .cancel-btn {
flex: 1;
padding: 12px;
border: none;
border-radius: 25px;
font-weight: bold;
cursor: pointer;
transition: all 0.3s;
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
}

.call-btn {
background: #FF0000;
color: white;
border: 2px solid #FFD700;
}

.call-btn:hover {
background: #8B0000;
transform: scale(1.02);
}

.cancel-btn {
background: rgba(255, 255, 255, 0.1);
color: white;
border: 2px solid #666;
}

.cancel-btn:hover {
background: rgba(255, 0, 0, 0.3);
border-color: #FF0000;
}
`;
document.head.appendChild(style);
// فتح المواقع
function openWebsite(site) {
const urls = {
'fragomen': 'https://www.fragomen.com',
'legal12': 'https://www.legal12tablesavocats.ch',
'simax': 'https://www.simaxlaw.com',
'jobs.ch': 'https://www.jobs.ch',
'jobup.ch': 'https://www.jobup.ch',
'linkedin.com': 'https://www.linkedin.com',
'indeed.ch': 'https://www.indeed.ch',
'wise': 'https://wise.com',
'revolut': 'https://www.revolut.com',
'westernunion': 'https://www.westernunion.com',
'yamersal': 'https://yamersal.com',
'neon': 'https://www.neon-free.ch',
'yuh': 'https://www.yuh.com',
'zak': 'https://www.zak.ch',
'tpg': 'https://www.tpg.ch',
'cff': 'https://www.sbb.ch',
'googlemaps': 'https://maps.google.com',
'fairtiq': 'https://fairtiq.com',
'easyride': 'https://www.sbb.ch/easyride'
};

const url = urls[site] || `https://www.${site}.ch`;
window.open(url, '_blank');
}

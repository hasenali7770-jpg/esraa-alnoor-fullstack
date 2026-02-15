# Esraa Al-Noor — Full Stack (Next.js + Django + Supabase)

هذا المشروع جاهز بنفس ستايل الصور (دارك + كروت زجاجية + RTL) ويحتوي:
- Frontend: Next.js + Tailwind
- Page Builder: GrapesJS (سحب/إفلات) + رفع صور إلى Supabase Storage
- Backend: Django + DRF API لحفظ الصفحات + نظام أكواد تفعيل بسيط
- Database: Supabase Postgres (اختياري محليًا SQLite)

## 1) تشغيل محلي (بدون دومين)
### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# عدّل .env.local وضع القيم الصح
npm run dev
```

افتح:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/
- Django Admin: http://localhost:8000/admin/

## 2) Supabase (لازم)
1) سوّي مشروع في Supabase
2) سوّي Bucket باسم `uploads` وخليه Public
3) خذ:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- DATABASE_URL (Postgres connection string)

## 3) النشر على الإنترنت
### Frontend على Vercel
- Import من GitHub
- Root Directory: `frontend`
- ENV:
  - NEXT_PUBLIC_API_URL = رابط الباكند على Render
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY

### Backend على Render
- New Web Service من GitHub
- Root Directory: `backend`
- Build Command:
  `pip install -r requirements.txt && python manage.py migrate`
- Start Command:
  `gunicorn core.wsgi:application --bind 0.0.0.0:$PORT`
- ENV:
  - DATABASE_URL
  - DJANGO_SECRET_KEY
  - DEBUG=0
  - ALLOWED_HOSTS=*

## 4) ربط الدومين esraa-alnoor.com
**الواجهة (Vercel)**
- من Vercel Project Settings → Domains
- أضف: `esraa-alnoor.com` و `www.esraa-alnoor.com`
- في DNS عند مزوّد الدومين:
  - A record لـ `@` إلى IP الخاص بـ Vercel (يعطيك إياه داخل Vercel)
  - CNAME لـ `www` إلى `cname.vercel-dns.com` (عادةً)

**الباكند**
الأفضل تخليه على subdomain مثل:
- `api.esraa-alnoor.com` → يشير إلى Render
وبعدين تخلي:
- NEXT_PUBLIC_API_URL = https://api.esraa-alnoor.com

> ملاحظة: تفاصيل الـ DNS الدقيقة Vercel/Render رح يعطوك القيم النهائية داخل لوحة التحكم.

## 5) محرر السحب والإفلات
افتح:
- /admin/builder
زر Upload يرفع الصور إلى Supabase Storage ويضيفها للأصول.


import { Btn, Card, Container, Pill, TopNav } from "@/components/ui";

const tags = ["الكل","العمل","المال","نظام","عادات","تواصل","وعي","أهداف","تركيز","نجاح","انضباط","تطوير","ثقة","حدود","تمكين"];

const courses = [
  { title:"تحقيق الأهداف", desc:"خطة واضحة لإدارة الوقت، العادات، والتحفيز للوصول للنتائج.", price:"٠٠٠٠٠ د.ع", pills:["أهداف","عادات","تركيز"] },
  { title:"سيكولوجية الذكر والأنثى", desc:"فهم أعمق للفروق النفسية وبناء تواصل صحي ومتوازن.", price:"٠٠٠٠٠ د.ع", pills:["علاقات","تواصل","وعي"] },
  { title:"أسس العمل والمال", desc:"تبني قاعدة واضحة لعلاقتك بالعمل والمال وتحولها لنظام عملي.", price:"٠٠٠٠٠ د.ع", pills:["العمل","المال","نظام"] },
];

export default function CoursesPage(){
  return (
    <>
      <TopNav />
      <main className="py-12">
        <Container>
          <h1 className="text-3xl font-extrabold">الدورات</h1>
          <p className="mt-2 text-muted">ابحث وفلتر الدورات واختر الأنسب لك.</p>

          <Card className="mt-6 p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <input className="glass rounded-xl2 px-4 py-3 outline-none" placeholder="ابحث عن دورة..." />
              <select className="glass rounded-xl2 px-4 py-3 outline-none">
                <option>السعر - من الأقل للأعلى</option>
                <option>السعر - من الأعلى للأقل</option>
              </select>
              <button className="glass rounded-xl2 px-4 py-3 text-sm">مسح</button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map(t => (
                <span key={t} className={`rounded-full px-4 py-2 text-xs border ${t==="الكل" ? "bg-primary/25 border-primary" : "bg-surface/50 border-border"} `}>
                  {t}
                </span>
              ))}
            </div>
          </Card>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {courses.map(c => (
              <Card key={c.title} className="overflow-hidden">
                <div className="h-40 bg-white/95" />
                <div className="p-5">
                  <h3 className="text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-muted text-sm leading-6">{c.desc}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Pill>المدة: +10 ساعة</Pill>
                    {c.pills.map(p => <Pill key={p}>{p}</Pill>)}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-primary">اشترِ / فعّل</span>
                    <Btn href="/activate" variant="white">عرض التفاصيل</Btn>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}

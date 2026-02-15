import { Card, Container, Pill, TopNav } from "@/components/ui";

export default function AboutPage(){
  return (
    <>
      <TopNav />
      <main className="py-12">
        <Container>
          <h1 className="text-3xl font-extrabold">من نحن</h1>
          <p className="mt-2 text-muted">نبذة مختصرة عن الأكاديمية.</p>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="overflow-hidden rounded-[28px]">
              <div className="h-[420px] bg-white/90" />
            </Card>

            <Card className="p-7 rounded-[28px]">
              <p className="text-sm leading-7 text-muted">
                أكاديمية Esraa Al-Noor تقدم كورسات نفسية وتطوير ذات بأسلوب عملي ومنظم.
                الهدف هو تبسيط المفاهيم وتحويلها لخطوات يومية قابلة للتطبيق.
              </p>

              <div className="mt-6">
                <div className="text-sm font-semibold mb-2">لماذا هذه المنصة مختلفة؟</div>
                <ul className="list-disc pr-6 text-sm text-muted space-y-2">
                  <li>كورسات طويلة مقسمة لحلقات</li>
                  <li>تصميم مريح + دارك مود</li>
                  <li>تفعيل يدوي آمن عبر كود</li>
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>تعلم</Pill>
                <Pill>وعي</Pill>
                <Pill>تطوير</Pill>
              </div>
            </Card>
          </div>
        </Container>
      </main>
    </>
  );
}

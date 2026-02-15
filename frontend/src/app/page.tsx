import { Btn, Card, Container, Pill, TopNav } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <main className="py-14">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <Card className="min-h-[520px] rounded-[34px] p-6 flex flex-col justify-between">
              <div className="text-center text-sm text-muted">Esraa Al-Noor</div>
              <div className="text-xs text-muted text-right">
                إسراء النور<br/>نحو وعي أعمق وسلام داخلي..
              </div>
            </Card>

            <div className="pt-10">
              <div className="flex justify-end">
                <Pill>أكاديمية إسراء النور • تطوير ووعي</Pill>
              </div>
              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
                رحلة وعي... بخطوات عملية
              </h1>
              <p className="mt-4 text-muted leading-7">
                كورسات نفسية وتطوير ذات بطريقة منظمة وواضحة، تجربة مشاهدة مريحة، دعم عربي/إنكليزي، وتفعيل آمن عبر كود بعد الدفع.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Btn href="/courses">استعرض الدورات</Btn>
                <Btn href="/activate" variant="ghost">كيف يتم التفعيل؟</Btn>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card className="p-5">
                  <div className="text-sm font-semibold">التفعيل</div>
                  <div className="text-xs text-muted mt-1">يدوي عبر كود</div>
                </Card>
                <Card className="p-5">
                  <div className="text-sm font-semibold">الدفع</div>
                  <div className="text-xs text-muted mt-1">Qi Card + Zain Cash</div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

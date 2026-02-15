import { Btn, Card, Container, TopNav } from "@/components/ui";

const plans = [
  { title:"اشتراك سنوي", price:"قابل للتعديل", sub:"12 شهر (كورس واحد)" },
  { title:"اشتراك نصف سنوي", price:"قابل للتعديل", sub:"6 أشهر (كورس واحد)" },
  { title:"اشتراك شهري", price:"٢٠٠٠٠ د.ع", sub:"شهر (كورس واحد)" },
  { title:"شراء كورس واحد", price:"٥٠٠٠٠ د.ع", sub:"وصول للكورس" },
];

export default function PricingPage(){
  return (
    <>
      <TopNav />
      <main className="py-12">
        <Container>
          <h1 className="text-3xl font-extrabold">الأسعار</h1>
          <p className="mt-2 text-muted">خطط مرة - اشتراك - شراء كورس واحد.</p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
            {plans.map(p => (
              <Card key={p.title} className="p-7 text-center">
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-3 text-3xl font-extrabold">{p.price}</div>
                <div className="mt-2 text-xs text-muted">{p.sub}</div>
                <Btn className="mt-6 w-full">ابدأ الآن</Btn>
              </Card>
            ))}
          </div>

          <Card className="mt-8 p-5">
            <div className="text-sm font-semibold">ملاحظة</div>
            <div className="mt-2 text-sm text-muted">
              الاشتراك يفتح كورس واحد فقط لمدة الاشتراك. بعد الدفع يتم التفعيل يدويًا عبر كود.
            </div>
          </Card>
        </Container>
      </main>
    </>
  );
}

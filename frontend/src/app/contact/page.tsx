import { Btn, Card, Container, TopNav } from "@/components/ui";

export default function ContactPage(){
  return (
    <>
      <TopNav />
      <main className="py-12">
        <Container>
          <h1 className="text-3xl font-extrabold">تواصل معنا</h1>
          <p className="mt-2 text-muted">اختر الطريقة المناسبة للتواصل.</p>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="p-7 rounded-[28px]">
              <form className="space-y-4">
                <div>
                  <label className="text-sm">الاسم</label>
                  <input className="mt-2 w-full glass rounded-xl2 px-4 py-3 outline-none" />
                </div>
                <div>
                  <label className="text-sm">رقم الهاتف (اختياري)</label>
                  <input className="mt-2 w-full glass rounded-xl2 px-4 py-3 outline-none" />
                </div>
                <div>
                  <label className="text-sm">الرسالة</label>
                  <textarea className="mt-2 w-full glass rounded-xl2 px-4 py-3 outline-none h-36" />
                </div>
                <Btn type="submit" className="w-full">إرسال</Btn>
              </form>
            </Card>

            <Card className="p-7 rounded-[28px]">
              <div className="text-sm font-semibold">روابط مباشرة</div>
              <div className="mt-4 space-y-3">
                <div className="glass rounded-xl2 px-4 py-3 text-sm">WhatsApp: 07882862419</div>
                <div className="glass rounded-xl2 px-4 py-3 text-sm">Instagram</div>
                <div className="glass rounded-xl2 px-4 py-3 text-sm">Facebook</div>
                <div className="glass rounded-xl2 px-4 py-3 text-sm">Email: yoty3464@gmail.com</div>
              </div>
            </Card>
          </div>
        </Container>
      </main>
    </>
  );
}

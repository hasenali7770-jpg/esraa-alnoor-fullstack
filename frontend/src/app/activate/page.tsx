"use client";

import { useState } from "react";
import { Btn, Card, Container, TopNav } from "@/components/ui";

export default function ActivatePage(){
  const [code, setCode] = useState("ALN-1A2B-3C4D");
  const [status, setStatus] = useState("");

  async function activate(){
    try{
      setStatus("جاري التفعيل...");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activate/`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data?.detail || "فشل التفعيل");
      setStatus("تم التفعيل ✅");
    }catch(e:any){
      setStatus(e.message || "خطأ");
    }
  }

  return (
    <>
      <TopNav />
      <main className="py-12">
        <Container>
          <h1 className="text-3xl font-extrabold">تفعيل الوصول</h1>
          <p className="mt-2 text-muted">
            بعد الدفع عبر Qi Card أو Zain Cash يتم إرسال كود تفعيل من الإدارة. أدخل الكود هنا لفتح الوصول.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="p-7 rounded-[28px]">
              <div className="text-sm font-semibold mb-4">طريقة الدفع</div>
              <ol className="list-decimal pr-6 text-sm text-muted space-y-2">
                <li>اختر الكورس من صفحة الدورات</li>
                <li>حوّل المبلغ عبر Qi Card أو Zain Cash</li>
                <li>أرسل إثبات التحويل للإدارة</li>
                <li>تستلم كود تفعيل (مثال: ALN-1A2B-3C4D)</li>
                <li>أدخل الكود هنا لفتح الكورس</li>
              </ol>
            </Card>

            <Card className="p-7 rounded-[28px]">
              <div className="text-sm font-semibold">كود التفعيل</div>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-3 w-full glass rounded-xl2 px-4 py-3 outline-none text-center tracking-widest"
              />
              <Btn className="mt-5 w-full" onClick={activate}>تفعيل الآن</Btn>
              <div className="mt-3 text-xs text-muted text-center">{status || "ملاحظة: التفعيل يدوي لضمان الأمان ومنع الاحتيال."}</div>
            </Card>
          </div>
        </Container>
      </main>
    </>
  );
}

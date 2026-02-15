"use client";

import { useEffect, useRef, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { Container, TopNav, Btn, Card } from "@/components/ui";
import { supabase } from "@/lib/supabase";

export default function BuilderPage(){
  const editorRef = useRef<Editor | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!hostRef.current || editorRef.current) return;

    const editor = grapesjs.init({
      container: hostRef.current,
      height: "75vh",
      storageManager: { type: "none" },
      fromElement: false,
      canvas: { styles: [] },
    });

    // Blocks
    editor.BlockManager.add("section", {
      label: "Section",
      content: `<section style="padding:24px;border-radius:16px;background:#0F1A2E;border:1px solid #1E2B44">
        <h2 style="font-size:24px;font-weight:800;color:#EAF2FF">عنوان</h2>
        <p style="color:#9FB0CF;margin-top:8px">نص...</p>
      </section>`
    });

    editor.BlockManager.add("button", {
      label: "Button",
      content: `<a style="display:inline-block;padding:12px 18px;border-radius:16px;background:#2A7D8F;color:white;font-weight:700">زر</a>`
    });

    // Image upload to Supabase Storage bucket: uploads
    editor.on("asset:upload", async () => {
      // GrapesJS will call its uploader; we provide a simple custom way:
      // Use the default Assets panel -> Add -> Upload (it triggers this event in many setups).
    });

    // Provide a command to upload via file input
    editor.Commands.add("upload-image-supabase", {
      run: async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
          if(!input.files || !input.files[0]) return;
          const file = input.files[0];
          const path = `builder/${Date.now()}-${file.name}`;
          const { error } = await supabase.storage.from("uploads").upload(path, file, { upsert: true });
          if(error){ alert("فشل رفع الصورة: " + error.message); return; }
          const { data } = supabase.storage.from("uploads").getPublicUrl(path);
          editor.AssetManager.add({ src: data.publicUrl, type: "image" });
          alert("تم رفع الصورة وإضافتها للأصول ✅");
        };
        input.click();
      }
    });

    // Add button in panels
    editor.Panels.addButton("options", {
      id: "upload-image",
      className: "fa fa-upload",
      label: "Upload",
      command: "upload-image-supabase",
      attributes: { title: "رفع صورة إلى Supabase" },
    });

    editorRef.current = editor;
  }, []);

  async function save(){
    try{
      setStatus("جاري الحفظ...");
      const ed = editorRef.current!;
      const payload = {
        slug: "home",
        title: "الصفحة الرئيسية",
        content_json: ed.getProjectData(),
        html: ed.getHtml(),
        css: ed.getCss(),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(payload),
      });

      if(!res.ok){
        // If already exists, update it:
        const upd = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/upsert/`, {
          method: "POST",
          headers: { "Content-Type":"application/json" },
          body: JSON.stringify(payload),
        });
        if(!upd.ok) throw new Error("فشل الحفظ");
      }
      setStatus("تم الحفظ ✅");
    }catch(e:any){
      setStatus(e.message || "خطأ");
    }
  }

  async function load(){
    try{
      setStatus("جاري التحميل...");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/by-slug/home/`);
      if(!res.ok) throw new Error("فشل التحميل");
      const data = await res.json();
      editorRef.current!.loadProjectData(data.content_json || {});
      setStatus("تم التحميل ✅");
    }catch(e:any){
      setStatus(e.message || "خطأ");
    }
  }

  return (
    <>
      <TopNav />
      <main className="py-10">
        <Container>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold">محرر الصفحات (سحب وإفلات)</h1>
            <div className="flex gap-2">
              <Btn variant="ghost" className="px-4 py-2" href="/">عرض الموقع</Btn>
              <Btn variant="ghost" className="px-4 py-2" onClick={load}>تحميل</Btn>
              <Btn className="px-4 py-2" onClick={save}>حفظ</Btn>
            </div>
          </div>

          <Card className="mt-4 p-4">
            <div className="text-sm text-muted mb-3">الحالة: {status || "جاهز"}</div>
            <div ref={hostRef} className="rounded-xl2 overflow-hidden border border-border" />
            <div className="mt-3 text-xs text-muted">
              ملاحظة: قبل رفع الصور، تأكد عامل Bucket اسمها <b>uploads</b> في Supabase وفعّال Public.
            </div>
          </Card>
        </Container>
      </main>
    </>
  );
}

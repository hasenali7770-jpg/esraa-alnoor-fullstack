// ✅ Upload Image/Video to Supabase Storage bucket: uploads
editor.Commands.add("upload-media-supabase", {
  run: async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*"; // ✅ صور + فيديو
    input.onchange = async () => {
      try {
        if (!input.files || !input.files[0]) return;

        const file = input.files[0];
        const isVideo = file.type.startsWith("video/");
        const folder = isVideo ? "videos" : "images";

        // sanitize filename (safe path)
        const safeName = file.name.replace(/[^\w.\-]+/g, "_");
        const path = `builder/${folder}/${Date.now()}-${safeName}`;

        // Upload with contentType for better serving
        const { error: upErr } = await supabase.storage
          .from("uploads")
          .upload(path, file, { upsert: true, contentType: file.type });

        if (upErr) {
          alert("فشل الرفع: " + upErr.message);
          return;
        }

        const { data } = supabase.storage.from("uploads").getPublicUrl(path);
        const url = data.publicUrl;

        // Add to Assets list
        editor.AssetManager.add({
          src: url,
          type: isVideo ? "video" : "image",
        });

        // If video, insert element directly into canvas (optional but useful)
        if (isVideo) {
          editor.addComponents(`
            <video controls style="width:100%;max-width:720px;border-radius:16px;border:1px solid #1E2B44;background:#000">
              <source src="${url}" type="${file.type}" />
            </video>
          `);
        }

        alert("تم الرفع وإضافته للأصول ✅");
      } catch (e: any) {
        alert("حدث خطأ: " + (e?.message || "غير معروف"));
      }
    };

    input.click();
  },
});

// ✅ Replace the old panel button with a media button
editor.Panels.addButton("options", {
  id: "upload-media",
  className: "fa fa-upload",
  label: "Upload",
  command: "upload-media-supabase",
  attributes: { title: "رفع صورة/فيديو إلى Supabase" },
});

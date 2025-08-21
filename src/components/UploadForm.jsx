// frontend/src/components/UploadForm.jsx
import { useState } from "react";

export default function UploadForm({ farmerId, onSubmitted }) {
  const [text, setText] = useState("");
  const [urgency, setUrgency] = useState("medium");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("farmer_id", farmerId);
      fd.append("query_text", text);
      fd.append("urgency", urgency);
      if (file) fd.append("image", file);

      const res = await fetch("http://127.0.0.1:8000/farmers/submit-query", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed");

      onSubmitted?.(data);
      setText("");
      setFile(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <textarea
        className="border p-2 w-full"
        placeholder="Describe your crop issue..."
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <select className="border p-2" value={urgency} onChange={e=>setUrgency(e.target.value)}>
        <option>low</option><option>medium</option><option>high</option>
      </select>
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <button disabled={busy} className="bg-green-600 text-white px-4 py-2 rounded">
        {busy ? "Submitting..." : "Submit query"}
      </button>
    </form>
  );
}

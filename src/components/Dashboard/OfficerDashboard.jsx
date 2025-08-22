import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export default function OfficerDashboard() {
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [error, setError] = useState("");

  async function load() {
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/officers/queries`);
      setQueries(data.data || []);
    } catch (e) {
      setError("Failed to load queries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function sendReply(qid) {
    setError("");
    const text = (replyText[qid] || "").trim();
    if (!text) return;

    try {
      await axios.post(`${API_BASE}/officers/reply`, {
        query_id: qid,
        officer_id: "0234234f-1aa4-46b2-8195-a8e99f5d2f1f", // replace with real officer user id
        response_text: text
        // no audio field – your table doesn't have one
      });
      setReplyText(prev => ({ ...prev, [qid]: "" }));
      await load();
    } catch (e) {
      console.error(e);
      setError("Error sending reply");
    }
  }

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Officer Dashboard</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      {queries.length === 0 && <div>No farmer queries yet.</div>}

      <div className="space-y-6">
        {queries.map(q => (
          <div key={q.id} className="rounded-xl border p-4 bg-white">
            <div className="flex items-start gap-4">
              {q.image_url && (
                <img
                  src={q.image_url}
                  alt="crop"
                  className="w-40 h-28 object-cover rounded-md border"
                />
              )}
              <div className="flex-1">
                <div className="text-sm text-gray-500">{new Date(q.created_at).toLocaleString()}</div>
                <div className="font-semibold mt-1">Status: {q.status}</div>
                <div className="mt-2">{q.query_text || <i>No text provided</i>}</div>
                {q.farmer && (
                  <div className="mt-1 text-sm text-gray-600">
                    Farmer: {q.farmer.full_name || q.farmer.email}
                  </div>
                )}
              </div>
            </div>

            {/* replies */}
            <div className="mt-3 space-y-2">
              {(q.replies || []).map(r => (
                <div key={r.id} className="text-sm bg-gray-50 rounded p-2 border">
                  <div className="text-gray-500">{new Date(r.created_at).toLocaleString()}</div>
                  <div>{r.response_text}</div>
                </div>
              ))}
              {(!q.replies || q.replies.length === 0) && (
                <div className="text-sm text-gray-500">No replies yet.</div>
              )}
            </div>

            {/* reply box */}
            <div className="mt-3 flex gap-2">
              <input
                className="flex-1 border rounded p-2"
                placeholder="Type your reply…"
                value={replyText[q.id] || ""}
                onChange={e => setReplyText(prev => ({ ...prev, [q.id]: e.target.value }))}
              />
              <button
                onClick={() => sendReply(q.id)}
                className="px-3 py-2 rounded bg-green-600 text-white"
              >
                Send
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

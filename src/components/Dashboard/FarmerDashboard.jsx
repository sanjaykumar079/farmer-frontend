import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";
const FARMER_ID = "0234234f-1aa4-46b2-8195-a8e99f5d2f1f"; // replace with logged-in farmer id

export default function FarmerDashboard() {
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/farmers/my-queries/${FARMER_ID}`);
      setQueries(data.data || []);
    } catch (e) {
      console.error(e);
      setError("Failed to load your queries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Farmer Dashboard</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {loading && <div>Loading…</div>}
      {!loading && queries.length === 0 && <div>No queries yet. Submit one from the form.</div>}

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
                <div className="mt-2">{q.query_text || <i>No text</i>}</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="font-semibold">Replies</div>
              <div className="space-y-2 mt-2">
                {(q.replies || []).map(r => (
                  <div key={r.id} className="text-sm bg-green-50 rounded p-2 border">
                    <div className="text-gray-500">{new Date(r.created_at).toLocaleString()}</div>
                    <div>{r.response_text}</div>
                  </div>
                ))}
                {(!q.replies || q.replies.length === 0) && (
                  <div className="text-sm text-gray-500">No replies yet.</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

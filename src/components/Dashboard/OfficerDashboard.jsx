import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export default function OfficerDashboard() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await axios.get(`${API_BASE}/officers/queries`);
      setQueries(res.data);
    } catch (err) {
      console.error("Failed to fetch queries", err);
    } finally {
      setLoading(false);
    }
  };

  const sendReply = async (queryId) => {
    try {
      await axios.post(`${API_BASE}/officers/reply`, {
        query_id: queryId,
        officer_id: "PUT_OFFICER_UUID_HERE", // replace with real officer_id (UUID from Supabase)
        response_text: replyText[queryId] || "",
        audio_path: null,
      });
      alert("Reply sent!");
      fetchQueries();
    } catch (err) {
      console.error("Failed to send reply", err);
      alert("Error sending reply");
    }
  };

  if (loading) return <p>Loading queries...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Officer Dashboard</h1>
      {queries.length === 0 ? (
        <p>No queries yet</p>
      ) : (
        <div className="space-y-6">
          {queries.map((q) => (
            <div key={q.id} className="border rounded-xl p-4 shadow">
              <h2 className="font-semibold">{q.query_text}</h2>
              {q.image_url && (
                <img
                  src={q.image_url}
                  alt="Crop Issue"
                  className="w-64 h-64 object-cover my-2 rounded-lg"
                />
              )}
              <p className="text-sm text-gray-700">
                Status: {q.status} | Urgency: {q.urgency}
              </p>
              {q.profiles && (
                <p className="text-sm">
                  Farmer: {q.profiles.full_name} ({q.profiles.email})
                </p>
              )}

              {/* Replies */}
              {q.replies && q.replies.length > 0 && (
                <div className="mt-2">
                  <h3 className="font-medium">Replies:</h3>
                  {q.replies.map((r) => (
                    <p key={r.id} className="text-gray-700 text-sm">
                      {r.response_text} ({new Date(r.created_at).toLocaleString()})
                    </p>
                  ))}
                </div>
              )}

              {/* Reply box */}
              <div className="mt-3">
                <textarea
                  placeholder="Write reply..."
                  className="w-full border rounded p-2"
                  value={replyText[q.id] || ""}
                  onChange={(e) =>
                    setReplyText({ ...replyText, [q.id]: e.target.value })
                  }
                />
                <button
                  onClick={() => sendReply(q.id)}
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Send Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

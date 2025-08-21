// src/components/Dashboard/FarmerDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";
const FARMER_ID = "0234234f-1aa4-46b2-8195-a8e99f5d2f1f"; // replace with dynamic ID if needed

export default function FarmerDashboard() {
  const [queries, setQueries] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [urgency, setUrgency] = useState("medium");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch farmer's queries
  const fetchQueries = async () => {
    try {
      const res = await axios.get(`${API_BASE}/farmers/my-queries/${FARMER_ID}`);
      setQueries(res.data || []);
    } catch (err) {
      console.error("Error fetching queries:", err);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // Submit new query
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!queryText) return alert("Please enter a query");

    setLoading(true);
    const formData = new FormData();
    formData.append("farmer_id", FARMER_ID);
    formData.append("query_text", queryText);
    formData.append("urgency", urgency);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post(`${API_BASE}/farmers/submit-query`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setQueryText("");
      setImage(null);
      setUrgency("medium");
      fetchQueries(); // refresh list
    } catch (err) {
      console.error("Error submitting query:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Farmer Dashboard</h1>

      {/* Upload Query Form */}
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-6 bg-white">
        <h2 className="text-lg font-semibold mb-2">Submit New Query</h2>
        <textarea
          className="w-full border p-2 rounded mb-2"
          placeholder="Describe your crop issue..."
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
        />
        <div className="mb-2">
          <label className="mr-2">Urgency:</label>
          <select
            className="border p-1 rounded"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <input
          type="file"
          accept="image/*"
          className="mb-2"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Submitting..." : "Submit Query"}
        </button>
      </form>

      {/* List of Queries */}
      <h2 className="text-xl font-semibold mb-2">My Queries</h2>
      {queries.length === 0 && <p>No queries submitted yet.</p>}
      {queries.map((query) => (
        <div key={query.id} className="border p-4 mb-4 rounded bg-white shadow">
          <p><strong>Query:</strong> {query.query_text}</p>
          {query.image_url && (
            <img src={query.image_url} alt="crop" className="w-40 mt-2 rounded" />
          )}
          <p className="mt-1"><strong>Urgency:</strong> {query.urgency}</p>
          <p><strong>Status:</strong> {query.status}</p>
          <small className="text-gray-500">
            Submitted on {new Date(query.created_at).toLocaleString()}
          </small>

          {/* Officer Replies */}
          {query.replies && query.replies.length > 0 && (
            <div className="mt-3 border-t pt-2">
              <h4 className="font-semibold">Officer Replies:</h4>
              {query.replies.map((reply) => (
                <div key={reply.id} className="mt-2 p-2 bg-gray-100 rounded">
                  <p>{reply.response_text}</p>
                  {reply.audio_path && (
                    <audio controls className="mt-1">
                      <source src={reply.audio_path} type="audio/mpeg" />
                    </audio>
                  )}
                  <small className="text-gray-500">
                    Replied on {new Date(reply.created_at).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

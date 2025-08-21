import React, { useEffect, useState } from "react";
import axios from "axios";

export default function YoutuberTable() {
    const [youtubers, setYoutubers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/youtubers")
            .then(response => {
                setYoutubers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500 mt-10">Loading...</div>;
    }

    return (
        <div className="overflow-x-auto mt-10">
            <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-800 text-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left">#</th>
                        <th className="px-4 py-2 text-left">Channel Name</th>
                        <th className="px-4 py-2 text-left">Subscribers</th>
                        <th className="px-4 py-2 text-left">Views</th>
                        <th className="px-4 py-2 text-left">Videos</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-900 text-gray-300">
                    {youtubers.map((yt, index) => (
                        <tr key={yt.channel_id} className="hover:bg-gray-800 transition">
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2 font-semibold">{yt.channel_name}</td>
                            <td className="px-4 py-2">{yt.subscriber_count.toLocaleString()}</td>
                            <td className="px-4 py-2">{yt.view_count.toLocaleString()}</td>
                            <td className="px-4 py-2">{yt.video_count.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

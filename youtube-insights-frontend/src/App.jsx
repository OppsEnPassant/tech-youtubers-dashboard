import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronUp, ChevronDown } from "lucide-react"; 

function App() {
    const [channels, setChannels] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "subscribers", direction: "desc" });

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/data`)
            .then(res => setChannels(res.data))
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    const sortedChannels = [...channels].sort((a, b) => {
        const { key, direction } = sortConfig;
        const valA = key === "name" ? a[key] : parseInt(a[key] || 0);
        const valB = key === "name" ? b[key] : parseInt(b[key] || 0);

        if (valA < valB) return direction === "asc" ? -1 : 1;
        if (valA > valB) return direction === "asc" ? 1 : -1;
        return 0;
    });

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const SortIcon = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) return null;
        return sortConfig.direction === "asc" ? (
            <ChevronUp className="inline w-4 h-4 ml-1" />
        ) : (
            <ChevronDown className="inline w-4 h-4 ml-1" />
        );
    };

    return (
        <div className="bg-[#0d1117] min-h-screen text-gray-200 flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-5xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-100">
                    YouTube Insights
                </h1>

                <div className="overflow-hidden rounded-xl border border-gray-700 shadow-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#161b22] text-gray-300 text-sm uppercase">
                            <tr>
                                <th
                                    onClick={() => requestSort("name")}
                                    className="px-6 py-3 border-b border-gray-700 cursor-pointer select-none"
                                >
                                    Name <SortIcon columnKey="name" />
                                </th>
                                <th
                                    onClick={() => requestSort("subscribers")}
                                    className="px-6 py-3 border-b border-gray-700 cursor-pointer select-none"
                                >
                                    Subscribers <SortIcon columnKey="subscribers" />
                                </th>
                                <th
                                    onClick={() => requestSort("views")}
                                    className="px-6 py-3 border-b border-gray-700 cursor-pointer select-none"
                                >
                                    Views <SortIcon columnKey="views" />
                                </th>
                                <th
                                    onClick={() => requestSort("videos")}
                                    className="px-6 py-3 border-b border-gray-700 cursor-pointer select-none"
                                >
                                    Videos <SortIcon columnKey="videos" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedChannels.map((c, idx) => (
                                <tr
                                    key={idx}
                                    className="hover:bg-[#21262d] transition-colors duration-150"
                                >
                                    <td className="px-6 py-4 border-b border-gray-800 font-medium text-gray-100">
                                        {c.name}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-800">
                                        {parseInt(c.subscribers).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-800">
                                        {parseInt(c.views).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-800">
                                        {parseInt(c.videos).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;

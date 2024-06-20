// components/AnalyticsData.js
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

const AnalyticsData = () => {
    const { data: session } = useSession();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (session) {
            fetch("/api/analytics")
                .then((res) => res.json())
                .then((data) => setData(data))
                .catch((error) => console.error("Error fetching analytics data:", error));
        }
    }, [session]);

    if (!session) {
        return (
            <div>
                <button onClick={() => signIn("google")}>Sign in with Google</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => signOut()}>Sign out</button>
            <h1>Analytics Data</h1>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AnalyticsData;

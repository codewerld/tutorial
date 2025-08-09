import { useState } from "react";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function ButtonFetch() {
  const [data, setData] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTodo = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const json: Todo = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button data-testid="fetch-button" disabled={loading} onClick={fetchTodo}>
        {loading ? "Loading..." : "Fetch Todo"}
      </button>

      <pre
        data-testid="json-output"
        style={{
          background: "#111",
          color: "#0f0",
          padding: 12,
          marginTop: 12,
        }}
      >
        {data ? JSON.stringify(data, null, 2) : "No data yet"}
      </pre>
    </div>
  );
}

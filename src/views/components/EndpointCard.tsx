interface ComponentProps {
  title: string;
  description: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  response?: any;
}

export function EndpointCard({
  title,
  description,
  endpoint = "/",
  method = "GET",
  response,
}: ComponentProps) {
  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 flex flex-col gap-3">
      <h1 className="text-lg font-semibold">{title}</h1>
      <h2 className="text-sm text-gray-600">{description}</h2>
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 text-sm font-mono bg-red-100 text-red-800 rounded">
          {method}
        </span>
        <span className="font-mono text-sm text-gray-600">{endpoint}</span>
      </div>
      <h3 className="font-medium mt-6">Reponse</h3>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
        <code>{response}</code>
      </pre>
    </div>
  );
}

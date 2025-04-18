import { EndpointCard } from "~/views/components/EndpointCard";

export default async function HomePage() {
  return (
    <main class="relative w-full h-auto min-h-svh bg-gradient-to-b from-white to-red-50">
      <div class="mx-auto max-w-3xl w-full relative flex flex-col pb-36 px-4">
        <section
          id="hero"
          class="flex flex-col items-center gap-3 py-12 mx-auto"
        >
          <h1 class="font-bold text-5xl text-red-500">Fufufafapi</h1>
          <h2 class="text-xl text-gray-600">
            Fufufafa's quotes in RESTful APIs
          </h2>
        </section>
        <section id="documentation" class="flex flex-col gap-6 pt-16">
          <h1 class="text-3xl font-bold mb-8 text-gray-800">API Usage</h1>
          <EndpointCard
            title="Lists of all quotes"
            description="Lists all fufufafa quotes in an array"
            endpoint="/api"
            method="GET"
            response={`// GET /api
[
  {
    "id": 418,
    "content": Kalo kata panasbung, borobudur itu berhala,
    "datetime": "1516340658000",
    "doksli": "https://m.kaskus.co.id/show_post/5a6185b2e052276d128b4570",
    "image_url": "https://npvb6fi2oc.ufs.sh/f/14yPIqSXnAiOSK4WdBab4hEJd8VTXzrAk2ca5RKD9HQN3xY6"
  },
]
              `}
          />
          <EndpointCard
            title="Search Quotes"
            description="Search quotes with specific keywords with ?content param"
            endpoint="/api?content=<keyword>"
            method="GET"
            response={`// GET /api?content=om wowo
[
  {
    "id": 5,
    "content": "Gw baru nyadar kalo fotonya om wowo naik sapi",
    "datetime": "1399911383000",
    "doksli": "https://m.kaskus.co.id/show_post/5370f3d7a2cb17c4268b4569",
    "image_url": "https://npvb6fi2oc.ufs.sh/f/14yPIqSXnAiO3V6Dd2NqWg2mjMz8kSuN0LPDEblfFIB1TZC7"
  },
]
              `}
          />
          <EndpointCard
            title="Quotes by ID"
            description="Get specific quotes by using its ID's"
            endpoint="/api/<id>"
            method="GET"
            response={`// GET /api/<id>
{
  "id": 475,
  "content": "Lulusnya kapan, kampusnya dimana, tau2 jadi alumni",
  "datetime": "1511309505000",
  "doksli": "https://m.kaskus.co.id/show_post/5a14c0c1a2c06e253e8b4569",
  "image_url": "https://npvb6fi2oc.ufs.sh/f/14yPIqSXnAiOrC1rGmgbF9SR6owYev5mZqk1IxMnGTuyNiDH"
}
              `}
          />
          <EndpointCard
            title="Random quotes"
            description="Randomly select one of the available quotes and forward it to /api/<id>"
            endpoint="/api/random"
            method="GET"
            response={`// GET /api/random (302 redirected)
{
  "id": 69,
  "content": "Banjir gpp yg penting gubernurnya seiman",
  "datetime": "1556511553000",
  "doksli": "https://m.kaskus.co.id/show_post/5cc67b41a2d1954236751c50",
  "image_url": "https://npvb6fi2oc.ufs.sh/f/14yPIqSXnAiOKOGsJeMzHV4hcqn1BIUR9yFgWxY0tjOGm5QA"
}
              `}
          />
        </section>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to My App</h1>
        <p className="text-gray-700">
          This is a simple Home Page with a fixed, collapsible sidebar.
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Features:</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Responsive sidebar navigation</li>
            <li>Dynamic context management</li>
            <li>Lucide-react icons</li>
            <li>Modern design with Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

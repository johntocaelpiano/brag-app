export default function LoadingSearchPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto animate-pulse">

      <div className="h-12 bg-gray-200 rounded mb-8" />

      <div className="space-y-4">

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 rounded"
          />
        ))}

      </div>

    </main>
  )
}
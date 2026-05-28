export const dynamic = 'force-static'

export default function OfflinePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
      <div className="max-w-md">
        <div className="text-6xl mb-4">🚴</div>

        <h1 className="text-3xl font-bold mb-4">
          You&apos;re Offline
        </h1>

        <p className="text-gray-600 mb-6">
          Cached pages you&apos;ve already visited may still work.
        </p>

        <div className="bg-gray-100 rounded-xl p-4 text-left text-sm">
          <p className="font-semibold mb-2">
            Available Offline:
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>Main route guide</li>
            <li>Previously viewed days</li>
            <li>Previously viewed venues</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
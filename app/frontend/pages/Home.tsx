import { Head } from '@inertiajs/react'

interface HomeProps {
  message?: string
}

export default function Home({ message = "Welcome to Diquis!" }: HomeProps) {
  return (
    <>
      <Head title="Home" />
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {message}
          </h1>
          <p className="text-gray-600 mb-6">
            Your Rails application with Inertia.js and React is ready to go!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Rails 8</h3>
              <p className="text-blue-700">
                Built with the latest Rails framework for robust backend functionality.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Inertia.js</h3>
              <p className="text-green-700">
                Modern SPA experience without the complexity of separate API endpoints.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">React</h3>
              <p className="text-purple-700">
                Dynamic frontend with React components and TypeScript support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
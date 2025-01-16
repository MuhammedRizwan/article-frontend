import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8">Sorry, the page you are looking for does not exist.</p>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        aria-label="Go back to previous page"
      >
        Go Back
      </button>
    </div>
  )
}

export default NotFound
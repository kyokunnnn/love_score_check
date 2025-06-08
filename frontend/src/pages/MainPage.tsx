import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold mb-6">love score checker</h1>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => navigate('/category-select')}
      >
        スタート
      </button>
    </div>
  )
}

export default MainPage

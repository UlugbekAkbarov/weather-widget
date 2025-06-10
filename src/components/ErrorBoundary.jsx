export default function ErrorBoundary({ error, children }) {
  if (error) {
    return (
      <div className='p-4 bg-red-100 text-red-800 rounded'>
        <h2 className='font-bold text-lg'>Произошла ошибка</h2>
        <p>{error}</p>
      </div>
    )
  }

  return children
}

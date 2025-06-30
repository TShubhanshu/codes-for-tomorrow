import { usePosts } from '../context/PostsContext';
import '../App.css';

export function Pagination() {
  const { state, dispatch } = usePosts();
  const { posts, currentPage, postsPerPage } = state;

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (newPage) => {
    // Ensure new page is within valid range
    const validatedPage = Math.max(1, Math.min(newPage, totalPages));
    if (validatedPage !== currentPage) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: validatedPage });
    }
  };

  // Only show limited page numbers for better UX
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5; // Show max 5 page buttons
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <nav className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {currentPage > 3 && totalPages > 5 && (
        <>
          <button onClick={() => handlePageChange(1)}>1</button>
          {currentPage > 4 && <span className="ellipsis">...</span>}
        </>
      )}

      {getVisiblePages().map(number => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}

      {currentPage < totalPages - 2 && totalPages > 5 && (
        <>
          {currentPage < totalPages - 3 && <span className="ellipsis">...</span>}
          <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
}
import { useNavigate, useLocation } from 'react-router-dom';

export function useRemoveQueryParams() {
  const navigate = useNavigate();
  const location = useLocation();

  const removeQueryParams = (paramToRemove) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(paramToRemove);
    navigate(location.pathname + '?' + searchParams.toString() + location.hash, { replace: true });
  };

  return removeQueryParams;
}

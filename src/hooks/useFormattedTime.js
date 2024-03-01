import { useMemo } from 'react';

const useFormattedTime = (dateInput) => {
  const formattedTime = useMemo(() => {
    const date = new Date(dateInput);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }, [dateInput]);

  return formattedTime;
};

export default useFormattedTime;

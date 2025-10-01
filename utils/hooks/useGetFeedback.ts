import { useCallback, useEffect, useState } from "react";

const useGetFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [err, setError] = useState<string | null>(null);

  const fetchFeedbacks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/feedback");
      if (!res.ok) throw new Error(`Failed: ${res.status}`);

      const data = await res.json();
      setFeedbacks(data.feedbacks);
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch once on mount
  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return { feedbacks, isLoading, err, fetchFeedbacks };
};

export default useGetFeedbacks;

export type Feedback = {
  id: string;
  name: string;
  email: string;
  text: string;
  createdAt: Date;
};

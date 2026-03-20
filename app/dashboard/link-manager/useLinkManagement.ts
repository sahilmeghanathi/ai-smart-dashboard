import { useState, useCallback, useEffect } from "react";
import type { Link, LinkResponse, LinkListResponse } from "@/app/api/types";

export const useLinkManagement = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [isSubLoading, setIsSubLoading] = useState(false);

  // Fetch links
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true);
        setError(undefined);

        const response = await fetch("/api/links");
        const data: LinkListResponse = await response.json();

        if (data.success && data.data) {
          setLinks(data.data);
        } else {
          setError("Failed to load links");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch links. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  // Add link
  const handleAddLink = useCallback(
    async (data: { title: string; url: string }) => {
      try {
        setIsSubLoading(true);

        const response = await fetch("/api/links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: LinkResponse = await response.json();

        if (result.success && result.data) {
          setLinks((prev) => [result.data!, ...prev]);
        } else {
          setError(result.error || "Failed to add link");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to add link. Please try again.",
        );
      } finally {
        setIsSubLoading(false);
      }
    },
    [],
  );

  // Delete link
  const handleDeleteLink = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/links?id=${id}`, {
        method: "DELETE",
      });

      const data: LinkResponse = await response.json();

      if (data.success) {
        setLinks((prev) => prev.filter((link) => link.id !== id));
      } else {
        setError(data.error || "Failed to delete link");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete link. Please try again.",
      );
    }
  }, []);

  // Track visit
  const handleLinkVisit = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/links?id=${id}`, {
        method: "PATCH",
      });

      const data: LinkResponse = await response.json();

      if (data.success && data.data) {
        setLinks((prev) =>
          prev.map((link) =>
            link.id === id
              ? { ...link, visitCount: data.data!.visitCount }
              : link,
          ),
        );
      }
    } catch (err) {
      console.error("Failed to track visit:", err);
    }
  }, []);

  return {
    links,
    isLoading,
    isSubLoading,
    error,
    setError,
    handleAddLink,
    handleDeleteLink,
    handleLinkVisit,
  };
};

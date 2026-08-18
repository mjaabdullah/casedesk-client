
export const getCases = async (filters: Record<string, string | number | boolean>) => {
    const queryParams = new URLSearchParams(filters as Record<string, string>).toString();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases?${queryParams}`);
    return response.json();
}
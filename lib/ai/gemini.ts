// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateChatResponse(prompt: string, history: any[], language: string = "hi") {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, history, language }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to fetch response");
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    return "I am currently having trouble connecting. Please try again later.";
  }
}

import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';

export const aiCategorizer = async (
  description: string
): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'Return only one category.',
          },
          {
            role: 'user',
            content: `
Categorize:

"${description}"

Categories:
Food
Travel
Shopping
Bills
Entertainment
Other

Return category only.
`,
          },
        ],
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch {
    return 'Other';
  }
};
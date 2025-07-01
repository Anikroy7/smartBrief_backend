import config from "../../config";

const { GoogleGenerativeAI } = require('@google/generative-ai');


const genAI = new GoogleGenerativeAI(config.gemini_api_key);

export const callOpenAI = async (content: string, prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(`${prompt}\n\n${content}`);
    const response = await result.response;
    const text = await response.text();
    console.log('OpenAI response from worker:', text);
    if (!text) {
      throw new Error('Empty summary received from OpenAI');
    }

    return text;
  } catch (error) {
    console.error('OpenAI API call error:', error);
    throw error;
  }
};

import type { Outfit } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GeminiAnalysis {
  pattern: 'solid' | 'floral' | 'striped' | 'geometric' | 'mixed';
  style: 'casual' | 'formal' | 'bohemian' | 'edgy' | 'classic';
  dominantColors: string[];
  recommendations: string[];
}


export async function analyzeClothingWithGemini(imageBase64: string): Promise<GeminiAnalysis> {
  if (!GEMINI_API_KEY) {
    console.warn('Gemini API key not found, using fallback analysis');
    return fallbackAnalysis();
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: `Analyze this clothing item and provide:
1. Pattern type (solid/floral/striped/geometric/mixed)
2. Style category (casual/formal/bohemian/edgy/classic)
3. Dominant colors (list 2-3 main colors)
4. What would pair well with this (be specific about colors and styles)

Format your response as JSON with keys: pattern, style, dominantColors (array), recommendations (array of specific suggestions)`
            },
            {
              inline_data: {
                mime_type: 'image/jpeg',
                data: imageBase64.split(',')[1] 
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]) {
      console.warn('No candidates in Gemini response, using fallback');
      return fallbackAnalysis();
    }
    
    const textResponse = data.candidates[0].content.parts[0].text;
    
  
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return fallbackAnalysis();
  } catch (error) {
    console.error('Gemini AI analysis failed:', error);
    return fallbackAnalysis();
  }
}


export function scoreOutfitWithAI(
  aiAnalysis: GeminiAnalysis,
  outfit: Outfit,
  uploadedCategory: string
): number {
  let score = 0;

  
  if (aiAnalysis.pattern === 'floral' || aiAnalysis.pattern === 'geometric' || aiAnalysis.pattern === 'mixed') {
    
    if (outfit.color === 'black' || outfit.color === 'white') {
      score += 40; 
    } else if (outfit.color === 'blue' && outfit.category === 'bottoms') {
      score += 35; 
    } else if (aiAnalysis.dominantColors.includes(outfit.color)) {
      score += 20; 
    } else {
      score += 5; 
    }
  } else if (aiAnalysis.pattern === 'solid') {
    
    if (outfit.color === 'multi') {
      score += 30; 
    } else {
      score += 25; 
    }
  }

  const styleCompatibility: Record<string, string[]> = {
    'casual': ['casual', 'bohemian'],
    'formal': ['formal', 'classic'],
    'bohemian': ['casual', 'bohemian'],
    'edgy': ['edgy', 'casual'],
    'classic': ['classic', 'formal', 'casual']
  };

  if (styleCompatibility[aiAnalysis.style]?.includes(outfit.category)) {
    score += 20;
  }

  
  const categoryMatch: Record<string, string[]> = {
    'top': ['bottoms', 'footwear', 'accessory'],
    'dress': ['footwear', 'accessory', 'outerwear'],
    'bottoms': ['top', 'footwear', 'accessory'],
  };

  if (categoryMatch[uploadedCategory]?.includes(outfit.category)) {
    score += 30;
  }

  
  if (outfit.color === 'black' || outfit.color === 'white') {
    score += 10;
  }

  return score;
}


export function getAIRecommendedOutfits(
  aiAnalysis: GeminiAnalysis,
  allOutfits: Outfit[],
  uploadedCategory: string,
  selectedPairings: string[]
): Outfit[] {
  
  let filtered = allOutfits.filter(outfit => 
    selectedPairings.includes(outfit.category)
  );

  
  const scored = filtered.map(outfit => ({
    outfit,
    score: scoreOutfitWithAI(aiAnalysis, outfit, uploadedCategory)
  }));

  
  scored.sort((a, b) => b.score - a.score);

  
  return scored.map(item => item.outfit);
}


function fallbackAnalysis(): GeminiAnalysis {
  return {
    pattern: 'solid',
    style: 'casual',
    dominantColors: ['black', 'white'],
    recommendations: [
      'Pair with neutral bottoms',
      'Add simple accessories',
      'Choose complementary colors'
    ]
  };
}


export function getStyleTips(aiAnalysis: GeminiAnalysis, uploadedCategory: string): string[] {
  const tips: string[] = [];

  if (aiAnalysis.pattern === 'floral' || aiAnalysis.pattern === 'geometric') {
    tips.push('✨ Pair with solid, neutral colors to balance the pattern');
    tips.push('🎨 Avoid mixing multiple patterns');
  }

  if (aiAnalysis.pattern === 'striped') {
    tips.push('📏 Pair with solid colors or subtle textures');
  }

  if (uploadedCategory === 'top' && aiAnalysis.pattern !== 'solid') {
    tips.push('👖 Best with: Black jeans, white pants, or denim');
  }

  if (aiAnalysis.style === 'bohemian') {
    tips.push('🌸 Add natural accessories like wooden jewelry or woven bags');
  }

  if (aiAnalysis.style === 'formal') {
    tips.push('👔 Keep it classic with structured pieces');
  }

  return tips;
}

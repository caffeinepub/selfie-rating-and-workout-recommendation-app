import { ImageResult } from '../../backend';

interface ScoreExplanation {
  badges: string[];
  description: string;
}

export function getScoreExplanation(details: ImageResult[]): ScoreExplanation {
  const badges: string[] = [];
  const positives: string[] = [];

  details.forEach((result) => {
    switch (result) {
      case ImageResult.goodLighting:
        badges.push('✨ Good Lighting');
        positives.push('well-lit');
        break;
      case ImageResult.smileDetected:
        badges.push('😊 Smile Detected');
        positives.push('positive expression');
        break;
      case ImageResult.centeredFace:
        badges.push('🎯 Centered Composition');
        positives.push('well-framed');
        break;
    }
  });

  let description = '';
  if (positives.length === 3) {
    description = `Excellent selfie! Your photo shows ${positives.join(', ')}. You're presenting yourself at your best.`;
  } else if (positives.length === 2) {
    description = `Great selfie! Your photo has ${positives.join(' and ')}. Small improvements in other areas could boost your rating.`;
  } else if (positives.length === 1) {
    description = `Good start! Your photo shows ${positives[0]}. Consider improving lighting, framing, or expression for a higher rating.`;
  } else {
    description = 'Your selfie has room for improvement. Try better lighting, centering your face, and a natural smile for a higher rating.';
  }

  return { badges, description };
}

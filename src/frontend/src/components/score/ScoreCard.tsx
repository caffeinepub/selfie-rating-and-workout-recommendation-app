import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CrossRealityScore } from '../../backend';
import { getScoreExplanation } from '../../lib/score/explanations';
import { formatRating } from '../../lib/score/format';
import { TrendingUp, Star, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ScoreCardProps {
  score: CrossRealityScore;
}

export default function ScoreCard({ score }: ScoreCardProps) {
  const explanation = getScoreExplanation(score.details);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-6 w-6 text-primary" />
          Your Ratings
        </CardTitle>
        <CardDescription>
          Based on analysis of your selfie
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 p-4 rounded-lg bg-accent/50">
            <div className="text-sm font-medium text-muted-foreground">Current Rating</div>
            <div className="text-4xl font-bold text-primary">
              {formatRating(score.rating)}
              <span className="text-xl text-muted-foreground">/30</span>
            </div>
          </div>
          <div className="space-y-2 p-4 rounded-lg bg-primary/10">
            <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Potential Rating
            </div>
            <div className="text-4xl font-bold text-primary">
              {formatRating(score.potentialRating)}
              <span className="text-xl text-muted-foreground">/30</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Analysis Details</h4>
          <div className="flex flex-wrap gap-2">
            {explanation.badges.map((badge, index) => (
              <Badge key={index} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{explanation.description}</p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>Disclaimer:</strong> This rating is for entertainment purposes only and is not a medical, 
            professional, or scientific assessment. Results are based on simple image characteristics and 
            should not be taken as an evaluation of your appearance, health, or fitness level.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

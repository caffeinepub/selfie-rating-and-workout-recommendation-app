import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

export default function HistoryEmptyState() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-12 text-center space-y-6">
          <img
            src="/assets/generated/empty-selfie-state.dim_1200x800.png"
            alt="No selfies yet"
            className="w-full max-w-md mx-auto rounded-lg"
          />
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">No Selfies Yet</h3>
            <p className="text-muted-foreground">
              Start your journey by taking your first selfie and discovering your rating!
            </p>
          </div>
          <Button size="lg" onClick={() => window.location.reload()}>
            <Camera className="mr-2 h-5 w-5" />
            Take Your First Selfie
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

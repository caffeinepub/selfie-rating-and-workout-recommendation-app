import { useGetAllSessions, useGetSessionCount } from '../../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ScoreCard from '../../components/score/ScoreCard';
import type { SelfieSession } from '../../backend';
import HistoryEmptyState from './HistoryEmptyState';
import { ExternalBlob } from '../../lib/blob-storage';
import { formatRating } from '../../lib/score/format';

export default function HistoryPage() {
  const { data: sessions, isLoading } = useGetAllSessions();
  const { data: sessionCount } = useGetSessionCount();
  const [selectedSession, setSelectedSession] = useState<SelfieSession | null>(null);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">History</h2>
          <p className="text-muted-foreground">Your selfie rating history</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!sessions || sessions.length === 0) {
    return <HistoryEmptyState />;
  }

  const count = sessionCount !== undefined ? Number(sessionCount) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">History</h2>
        <p className="text-muted-foreground">
          {count > 0
            ? `${count} ${count === 1 ? 'selfie' : 'selfies'} captured`
            : 'Your selfie rating history'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sessions.map((session, index) => {
          const imageUrl = ExternalBlob.fromURL(session.imageId).getDirectURL();
          const timestamp = Number(session.timestamp) / 1_000_000;

          return (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedSession(session)}
            >
              <CardContent className="p-4 space-y-3">
                <div className="relative w-full bg-muted rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={imageUrl}
                    alt="Selfie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Rating</span>
                    <span className="text-lg font-bold text-primary">
                      {formatRating(session.score.rating)}/30
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Potential</span>
                    <span className="text-lg font-bold text-primary">
                      {formatRating(session.score.potentialRating)}/30
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">
                    {formatDistanceToNow(timestamp, { addSuffix: true })}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedSession && (
        <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Selfie Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="relative w-full bg-muted rounded-lg overflow-hidden">
                <img
                  src={ExternalBlob.fromURL(selectedSession.imageId).getDirectURL()}
                  alt="Selfie"
                  className="w-full object-cover max-h-[400px]"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(Number(selectedSession.timestamp) / 1_000_000, {
                  addSuffix: true,
                })}
              </div>
              <ScoreCard score={selectedSession.score} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

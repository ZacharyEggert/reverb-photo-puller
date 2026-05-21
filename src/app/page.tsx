import Interactables from './_components/Interactables';
import List from './_components/ListingGroup';
import LoadingSpinner from './_components/LoadingSpinner';
import PhotoDisplay from './_components/PhotoDisplay';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <LoadingSpinner />
      <main className="flex min-h-screen flex-col xl:mr-[360px]">
        <header className="flex shrink-0 items-center gap-3 border-b border-border px-6 py-4">
          <span className="block h-1.5 w-1.5 rounded-full bg-amber" />
          <div className="flex items-baseline gap-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Reverb
            </span>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-ink">
              Photobank
            </span>
          </div>
        </header>
        <Interactables />
        <PhotoDisplay />
      </main>
      <List />
    </div>
  );
}

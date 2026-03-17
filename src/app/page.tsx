import Interactables from './_components/Interactables';
import List from './_components/ListingGroup';
import LoadingSpinner from './_components/LoadingSpinner';
import PhotoDisplay from './_components/PhotoDisplay';

export default function Home() {
  return (
    <main className="relative grid min-h-screen grid-cols-9 overflow-x-hidden bg-neutral-700 px-2 text-white">
      <section className="col-span-9 xl:col-span-6">
        <Interactables />
        <PhotoDisplay />
        <LoadingSpinner />
      </section>
      <List />
    </main>
  );
}

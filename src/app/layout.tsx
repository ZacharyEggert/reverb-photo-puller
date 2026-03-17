import { FormProvider } from '~/lib/context/FormContext';

// oxlint-disable-next-line
import '~/styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-neutral-700">
      <FormProvider>
        <body>{children}</body>
      </FormProvider>
    </html>
  );
}

import { FormProvider } from '~/lib/context/FormContext';

import '~/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <FormProvider>
        <body>{children}</body>
      </FormProvider>
    </html>
  );
}

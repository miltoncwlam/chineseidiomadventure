export const clerkAppearance = {
  layout: {
    logoPlacement: 'none' as const,
    socialButtonsPlacement: 'top' as const,
    socialButtonsVariant: 'blockButton' as const
  },
  variables: {
    colorPrimary: '#176b5b',
    colorBackground: '#ffffff',
    colorText: '#16352f',
    colorTextSecondary: '#658078',
    borderRadius: '1.25rem'
  },
  elements: {
    rootBox: 'w-full',
    cardBox: 'w-full',
    card: 'w-full max-w-none border border-[rgba(23,107,91,0.12)] shadow-lg shadow-[rgba(22,53,47,0.08)]',
    logoBox: { display: 'none' },
    header: { display: 'none' },
    headerTitle: { display: 'none' },
    headerSubtitle: { display: 'none' },
    socialButtonsBlockButton: 'font-bold',
    formButtonPrimary: 'font-black'
  }
};

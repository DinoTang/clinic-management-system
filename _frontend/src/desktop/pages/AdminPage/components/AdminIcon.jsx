import React from "react";

export function AdminIcon({ name, size = 20 }) {
  const paths = {
    overview: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="5" rx="2" />
        <rect x="13" y="10" width="8" height="11" rx="2" />
        <rect x="3" y="13" width="8" height="8" rx="2" />
      </>
    ),
    accounts: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 21v-1.5a6.5 6.5 0 0 1 13 0V21zM16 11a3.5 3.5 0 1 0 0-7M18 14a6 6 0 0 1 3.5 5.5V21" />
      </>
    ),
    patients: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2z" />
      </>
    ),
    doctors: (
      <>
        <path d="M12 3v5m-4-5h8" />
        <circle cx="12" cy="14" r="7" />
        <path d="M9 14h6m-3-3v6" />
      </>
    ),
    specialties: (
      <>
        <path d="M12 3 20 7v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
        <path d="M12 8v8m-4-4h8" />
      </>
    ),
    rooms: (
      <>
        <path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16M2 21h20M8 7h2m4 0h2m-8 4h2m4 0h2m-6 10v-5h4v5" />
      </>
    ),
    schedules: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18m2 3h.01M8 14h3v3H8z" />
      </>
    ),
    appointments: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18m4 5 2 2 4-4" />
      </>
    ),
    medicines: (
      <>
        <path d="M4.9 19.1a5 5 0 0 1 0-7.1l7.1-7.1a5 5 0 0 1 7.1 7.1L12 19.1a5 5 0 0 1-7.1 0Z" />
        <path d="m8.4 8.4 7.1 7.1" />
      </>
    ),
    services: (
      <>
        <path d="M12 3v18m-9-9h18" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
    invoices: (
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
        <path d="M9 8h6m-6 4h6m-6 4h3" />
      </>
    ),
    reports: (
      <>
        <path d="M4 19V5m0 14h17M7 15l4-4 3 2 5-6" />
        <path d="M16 7h3v3" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    plus: <path d="M12 5v14m-7-7h14" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />
      </>
    ),
    edit: (
      <>
        <path d="m14 5 5 5M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16z" />
      </>
    ),
    dots: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
    filter: (
      <>
        <path d="M4 7h16M7 12h10m-7 5h4" />
        <circle cx="8" cy="7" r="2" />
        <circle cx="15" cy="12" r="2" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5m5 5H3" />
        <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

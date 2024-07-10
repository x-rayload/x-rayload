type IconStyleProps = {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
};

export const ICONS = {
  SEARCH: (styles?: IconStyleProps) => (
    <svg data-icon="search-template" viewBox="0 0 20 20" {...styles}>
      <path
        d="M13 8H5c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1zm0 3H5c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1zm0-6H5c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1zm6.56 12.44l-3.23-3.23A8.939 8.939 0 0018 9a9 9 0 10-9 9c1.94 0 3.74-.62 5.21-1.67l3.23 3.23a1.498 1.498 0 102.12-2.12zM9 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
  BROWSER: (styles?: IconStyleProps) => (
    <svg data-icon="browser" height="20" viewBox="0 0 20 20" {...styles}>
      <path
        d="M19 1a1 1 0 011 1v16a1 1 0 01-1 1H1a1 1 0 01-1-1V2a1 1 0 011-1h18zm-1 4H2v12h16V5zm-3-3h-2v2h2V2zm3 0h-2v2h2V2z"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
  HISTORY: (styles?: IconStyleProps) => (
    <svg data-icon="history" viewBox="0 0 20 20" {...styles}>
      <path
        d="M10 0C6.71 0 3.82 1.6 2 4.05V2c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1H3.76C5.23 3.17 7.47 2 10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8c0-.55-.45-1-1-1s-1 .45-1 1c0 5.52 4.48 10 10 10s10-4.48 10-10S15.52 0 10 0zm0 3c-.55 0-1 .45-1 1v6c0 .28.11.53.29.71l3 3a1.003 1.003 0 001.42-1.42L11 9.59V4c0-.55-.45-1-1-1z"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
  TIME: (styles?: IconStyleProps) => (
    <svg data-icon="time" viewBox="0 0 20 20" {...styles}>
      <path
        d="M11 9.59V4c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .28.11.53.29.71l3 3a1.003 1.003 0 001.42-1.42L11 9.59zM10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
  DELETE: (styles?: IconStyleProps) => (
    <svg data-icon="delete" viewBox="0 0 20 20" {...styles}>
      <path
        d="M15 6a1.003 1.003 0 00-1.71-.71L10 8.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L8.59 10 5.3 13.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l3.29-3.3 3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L11.41 10l3.29-3.29c.19-.18.3-.43.3-.71zm-5-6C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
};

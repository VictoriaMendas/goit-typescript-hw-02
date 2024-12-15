interface ErrorProps {
  error: string;
}

export default function ErrorMessage({ error}: ErrorProps) {
  return <div>{error}</div>;
}

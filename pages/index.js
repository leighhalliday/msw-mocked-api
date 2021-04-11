import useSWR from "swr";
import Link from "next/link";

function getCoins() {
  return fetch("/coins").then((response) => response.json());
}

export default function Home() {
  const { data, error } = useSWR("coins", getCoins);

  if (error) return <span>error</span>;
  if (!data) return <span>loading</span>;

  return (
    <ul>
      {data.map((coin) => (
        <li key={coin.symbol}>
          <Link href={`/coins/${coin.symbol.toLowerCase()}`}>{coin.name}</Link>
        </li>
      ))}
    </ul>
  );
}

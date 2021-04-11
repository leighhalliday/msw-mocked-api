export default function Coin({ coin }) {
  return (
    <div>
      <h1>
        {coin.name} - {coin.symbol}
      </h1>
      <p>
        <a href={coin.website}>{coin.website}</a>
      </p>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const symbol = query.symbol.toUpperCase();
  const response = await fetch(`https://coins.com/${symbol}`);

  if (response.status === 404) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const data = await response.json();

  return {
    props: {
      coin: data,
    },
  };
}

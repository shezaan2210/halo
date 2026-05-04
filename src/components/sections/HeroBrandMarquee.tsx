

export const HeroBrandMarquee = () => {
  const brands = [
    <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '15px' }}>Stripe</div>,
    <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 900, letterSpacing: '0.08em', fontSize: '13px', textTransform: 'uppercase' }}>Coinbase</div>,
    <div style={{ fontFamily: '"Trebuchet MS", sans-serif', fontWeight: 600, letterSpacing: '0.01em', fontSize: '15px', fontStyle: 'italic' }}>Uniswap</div>,
    <div style={{ fontFamily: '"Courier New", monospace', fontWeight: 700, letterSpacing: '0.12em', fontSize: '13px', textTransform: 'uppercase' }}>Aave</div>,
    <div style={{ fontFamily: 'Palatino, "Book Antiqua", serif', fontWeight: 400, letterSpacing: '-0.01em', fontSize: '16px' }}>Compound</div>,
    <div style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif', fontWeight: 400, letterSpacing: '0.04em', fontSize: '14px' }}>MakerDAO</div>,
    <div style={{ fontFamily: 'Verdana, sans-serif', fontWeight: 700, letterSpacing: '-0.03em', fontSize: '13px' }}>Chainlink</div>,
  ];

  const brandElements = brands.map((brand, i) => (
    <div key={i} className="mx-7 shrink-0 text-black/60 whitespace-nowrap">
      {brand}
    </div>
  ));

  return (
    <div className="mt-24 w-full max-w-md overflow-hidden relative">
      <div className="marquee-track">
        {brandElements}
        {brandElements}
      </div>
    </div>
  );
};
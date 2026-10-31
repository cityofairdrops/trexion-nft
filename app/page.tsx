
const artwork =
  "https://raw.githubusercontent.com/cityofairdrops/trexion-nft/main/trexion.png";

const faqs = [
  {
    q: "What is Trexion?",
    a: "Trexion is a Genesis NFT collection of 10,000 NFTs on BNB Smart Chain."
  },
  {
    q: "How many NFTs can I mint?",
    a: "Each wallet can mint up to 10 NFTs over its lifetime. Transferring an NFT does not reset the original minter's limit."
  },
  {
    q: "What is the mint price?",
    a: "The first mint is displayed as FREE (gas fee only). The contract payment is 0.00002 BNB. Each subsequent mint costs 0.0011 BNB."
  },
  {
    q: "What are the airdrop rewards?",
    a: "Each eligible NFT is allocated 45,000 $TREXION through the community airdrop, subject to the official snapshot and claim process."
  },
  {
    q: "When can I claim the airdrop?",
    a: "The $TREXION airdrop claim will open immediately after the NFT minting phase concludes. Eligible NFT holders will be able to claim their allocated tokens through the official Trexion platform."
  },
  {
    q: "What is the $TREXION tokenomics?",
    a: (
      <>
        <p>
          The total supply of $TREXION is 1,000,000,000 tokens,
          distributed as follows:
        </p>
        <ul>
          <li>
            <strong>45% — Community:</strong> 450,000,000 tokens,
            fully unlocked at TGE.
          </li>
          <li>
            <strong>35% — Liquidity:</strong> 350,000,000 tokens.
            15% of the total supply unlocks at TGE; the remaining
            20% will be locked for 12 months.
          </li>
          <li>
            <strong>10% — Marketing:</strong> 100,000,000 tokens.
            5% of the total supply unlocks at TGE; the remaining
            5% will be locked for 12 months.
          </li>
          <li>
            <strong>10% — Team:</strong> 100,000,000 tokens,
            locked for 12 months.
          </li>
        </ul>
      </>
    )
  },
  {
    q: "When will $TREXION be listed on exchanges?",
    a: "$TREXION is planned to be listed on decentralized exchanges (DEXs) immediately after the airdrop claim period ends, allowing holders to trade their tokens. Centralized exchange (CEX) listings may follow. Details regarding exchange partnerships and listing announcements will be communicated through official Trexion channels."
  }
];

export default function Home() {
  return (
    <main>
      <header className="navbar">
        <a className="brand" href="#">
          TREXION<span>.</span>
        </a>

        <nav>
          <a href="#mint">Mint</a>
          <a href="#rewards">Rewards</a>
          <a href="#how">How to mint</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a className="nav-cta" href="#mint">
          Explore mint <span>↗</span>
        </a>
      </header>

      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="eyebrow">
            <i /> THE GENESIS NFT COLLECTION
          </div>

          <h1>
            MINT THE
            <br />
            <em>FUTURE.</em>
          </h1>

          <p className="hero-lead">
            10,000 unique NFTs. One growing community. Step into the
            Trexion Genesis collection on BNB Smart Chain.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#mint">
              Explore the mint <span>↗</span>
            </a>
            <a className="text-link" href="#rewards">
              Discover rewards <span>↓</span>
            </a>
          </div>

          <div className="hero-note">
            <span className="pulse" /> BUILT FOR THE COMMUNITY
          </div>
        </div>

        <div className="hero-art">
          <div className="art-glow" />
          <div className="art-frame">
            <img src={artwork} alt="Trexion Genesis NFT artwork" />
            <div className="art-label">
              <span>GENESIS / 001</span>
              <span>BNB CHAIN</span>
            </div>
          </div>
          <div className="floating-tag">
            10,000
            <small>GENESIS NFTs</small>
          </div>
        </div>
      </section>

      <section className="stats section-wrap">
        <div>
          <span className="stat-label">TOTAL COLLECTION</span>
          <strong>10,000</strong>
          <small>Genesis NFTs</small>
        </div>
        <div>
          <span className="stat-label">NETWORK</span>
          <strong>BNB</strong>
          <small>BNB Smart Chain</small>
        </div>
        <div>
          <span className="stat-label">WALLET LIMIT</span>
          <strong>10</strong>
          <small>Lifetime mints</small>
        </div>
        <div>
          <span className="stat-label">HOLDER REWARD</span>
          <strong>45,000</strong>
          <small>$TREXION per eligible NFT</small>
        </div>
      </section>

      <section id="mint" className="mint-section section-wrap">
        <div className="section-heading">
          <div className="eyebrow">
            <i /> THE GENESIS DROP
          </div>
          <h2>
            Your place in
            <br />
            <em>Trexion starts here.</em>
          </h2>
          <p>
            The mint interface will activate when the NFT smart contract
            is deployed and connected.
          </p>
        </div>

        <div className="mint-card">
          <div className="mint-card-top">
            <div>
              <span className="stat-label">TREXION GENESIS</span>
              <h3>Public mint</h3>
            </div>
            <span className="status">
              <i /> COMING SOON
            </span>
          </div>

          <div className="mint-preview">
            <img src={artwork} alt="Trexion NFT preview" />
            <div>
              <strong>Trexion Genesis</strong>
              <span>10,000 NFTs · BNB Chain</span>
            </div>
          </div>

          <div className="mint-row">
            <span>First mint</span>
            <strong className="green">FREE*</strong>
          </div>

          <div className="mint-row">
            <span>Each additional mint</span>
            <strong>0.0011 BNB</strong>
          </div>

          <div className="mint-row">
            <span>Wallet limit</span>
            <strong>10 NFTs</strong>
          </div>

          <button className="button button-disabled" disabled>
            Minting opens soon
          </button>

          <p className="fine-print">
            *First mint has a 0.00002 BNB contract payment and is displayed
            as nearly free. Network gas is paid separately. Minting will
            open after contract deployment.
          </p>
        </div>
      </section>

      <section id="rewards" className="rewards-section">
        <div className="section-wrap rewards-inner">
          <div>
            <div className="eyebrow">
              <i /> GENESIS HOLDER REWARD
            </div>

            <h2>
              Mint an NFT.
              <br />
              <em>Share in the airdrop.</em>
            </h2>

            <p>
              Each eligible Trexion Genesis NFT is allocated 45,000
              $TREXION tokens through the community airdrop.
            </p>

            <p className="reward-disclaimer">
              Airdrop eligibility is subject to the official snapshot,
              verification and claim process. Snapshot and claim dates
              will be announced officially.
            </p>
          </div>

          <div className="reward-number">
            <span>ALLOCATION PER ELIGIBLE NFT</span>
            <strong>45,000</strong>
            <b>$TREXION</b>
            <small>COMMUNITY AIRDROP</small>
          </div>
        </div>
      </section>

      <section id="how" className="how-section section-wrap">
        <div className="section-heading centered">
          <div className="eyebrow">
            <i /> GETTING STARTED
          </div>
          <h2>
            Three steps.
            <br />
            <em>One Genesis collection.</em>
          </h2>
        </div>

        <div className="steps">
          <article>
            <span>01</span>
            <h3>Connect your wallet</h3>
            <p>
              Use a compatible wallet connected to BNB Smart Chain.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Choose your mint</h3>
            <p>
              Review the applicable mint price and stay within the
              10-NFT lifetime wallet limit.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Mint your NFT</h3>
            <p>
              Confirm the transaction in your wallet. Your NFT will
              receive a unique Trexion number.
            </p>
          </article>
        </div>
      </section>

      <section className="collection-section section-wrap">
        <div className="collection-copy">
          <div className="eyebrow">
            <i /> THE COLLECTION
          </div>
          <h2>
            One artwork.
            <br />
            <em>10,000 identities.</em>
          </h2>
          <p>
            Every NFT shares the Trexion Genesis artwork and receives
            its own unique token number, from Trexion #1 to Trexion #10000.
          </p>
        </div>

        <div className="collection-image">
          <img src={artwork} alt="Trexion collection artwork" />
        </div>
      </section>

      <section id="faq" className="faq-section section-wrap">
        <div className="section-heading">
          <div className="eyebrow">
            <i /> NEED TO KNOW
          </div>
          <h2>
            Frequently asked
            <br />
            <em>questions.</em>
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.q}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.q}
                <b>+</b>
              </summary>
              <div className="faq-answer">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <footer className="footer section-wrap">
        <a className="brand" href="#">
          TREXION<span>.</span>
        </a>
        <p>THE GENESIS NFT COLLECTION · BNB SMART CHAIN</p>
        <span>
          © {new Date().getFullYear()} TREXION. ALL RIGHTS RESERVED.
        </span>
      </footer>
    </main>
  );
}

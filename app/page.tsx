
import MintPanel from "./mint-panel";
import ClaimPanel from "./claim-panel";

const artwork =
  "https://raw.githubusercontent.com/cityofairdrops/trexion-nft/main/trexion.png";

const faqs = [
  {
    q: "What is Trexion?",
    a: "Trexion Genesis is a collection of 10,000 NFTs on BNB Smart Chain.",
  },
  {
    q: "How many NFTs can I mint?",
    a: "Each wallet can mint a maximum of 10 NFTs in total. Transferring NFTs does not restore your mint allowance.",
  },
  {
    q: "What is the mint price?",
    a: "The first NFT per wallet is completely free. Each additional NFT costs 0.001 BNB. Network gas fees apply.",
  },
  {
    q: "How does the free mint work?",
    a: "Every wallet receives one free NFT. You can mint up to 9 additional NFTs from the same wallet at 0.001 BNB each.",
  },
  {
    q: "What are the airdrop rewards?",
    a: "Each NFT originally minted by your wallet earns an allocation of 45,000 $TREXION. Your claim entitlement is tied to the original minter, not the wallet currently holding the NFT.",
  },
  {
    q: "How do I claim my TREXION?",
    a: "Copy the Agentic Wallet claim prompt from the Claim section, paste it into your Agentic Wallet, and review the eligibility and transaction details. The smart contract verifies your allocation.",
  },
  {
    q: "Can I claim more than once?",
    a: "Yes. If you mint additional NFTs after an earlier claim, you can claim the allocation for those newly minted NFTs. Previously claimed NFTs cannot be claimed again. Each successful claim costs 0.00015 BNB.",
  },
  {
    q: "What is the maximum claim allocation?",
    a: "Each wallet can receive up to 450,000 $TREXION for a maximum of 10 originally minted NFTs.",
  },
  {
    q: "What is the $TREXION tokenomics?",
    a: "The total supply is 1,000,000,000 $TREXION: 45% Community, 35% Liquidity, 10% Marketing and 10% Team. Refer to the official token allocation and unlock information for details.",
  },
  {
    q: "When will $TREXION be listed?",
    a: "$TREXION is planned for decentralized exchange listing after the airdrop claim period. Further announcements will be shared through Trexion's official channels.",
  },
];

export default function Home() {
  return (
    <main>
      {/* NAVIGATION */}

      <header className="navbar">
        <a className="brand" href="#">
          TREXION<span>.</span>
        </a>

        <nav>
          <a href="#mint">Mint</a>
          <a href="#rewards">Rewards</a>
          <a href="#claim">Claim</a>
          <a href="#tokenomics">Tokenomics</a>
          <a href="#how">How to mint</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a className="nav-cta" href="#mint">
          Explore mint <span>↗</span>
        </a>
      </header>

      {/* HERO */}

      <section className="hero section-wrap">
        <div className="hero-copy">
          <h1>
            MINT THE
            <br />
            <em>DINOSAURS.</em>
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

      {/* COLLECTION STATS */}

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
          <span className="stat-label">MAX MINT LIMIT</span>
          <strong>10 NFTs</strong>
          <small>Per wallet</small>
        </div>

        <div>
          <span className="stat-label">HOLDER REWARD</span>
          <strong>45,000</strong>
          <small>$TREXION per eligible NFT</small>
        </div>
      </section>

      {/* NFT MINT */}

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
            Mint your Trexion Genesis NFT directly through Binance Agentic
            Wallet. Your first NFT is free, and each additional NFT costs
            0.001 BNB. Track the collection's live mint progress below.
          </p>
        </div>

        <MintPanel />
      </section>

      {/* REWARDS */}

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
              Each NFT originally minted by your wallet earns an
              allocation of 45,000 $TREXION through the community
              airdrop.
            </p>

            <p className="reward-disclaimer">
              Claim entitlement belongs to the original minter and
              is not transferred when an NFT is sold or transferred.
              You can make additional claims when you mint more
              eligible NFTs.
            </p>

            <a className="button button-primary" href="#claim">
              Claim your TREXION <span>↗</span>
            </a>
          </div>

          <div className="reward-number">
            <span>ALLOCATION PER ORIGINALLY MINTED NFT</span>
            <strong>45,000</strong>
            <b>$TREXION</b>
            <small>COMMUNITY AIRDROP</small>
          </div>
        </div>
      </section>

      {/* TREXION CLAIM */}

      <section id="claim" className="claim-page-section">
        <ClaimPanel />
      </section>

      {/* TOKENOMICS */}

      <section id="tokenomics" className="tokenomics-section section-wrap">
        <div className="section-heading">
          <div className="eyebrow">
            <i /> $TREXION TOKEN
          </div>

          <h2>
            Built for the
            <br />
            <em>community.</em>
          </h2>

          <p>
            $TREXION is the community token powering the Trexion ecosystem.
            Its total supply is allocated across community rewards,
            liquidity, marketing and the team.
          </p>
        </div>

        <div className="token-overview">
          <div className="token-total">
            <span className="stat-label">TOTAL TOKEN SUPPLY</span>
            <strong>1,000,000,000</strong>
            <span>$TREXION</span>
          </div>

          <div className="token-facts">
            <div>
              <span>Token</span>
              <strong>$TREXION</strong>
            </div>

            <div>
              <span>Launch chain</span>
              <strong>BNB Smart Chain</strong>
            </div>

            <div>
              <span>Token standard</span>
              <strong>BEP-20</strong>
            </div>

            <div>
              <span>Chain ID</span>
              <strong>56 · Mainnet</strong>
            </div>
          </div>
        </div>

        <div className="tokenomics-content">
          <div className="token-chart-panel">
            <h3>Token allocation</h3>

            <p className="chart-caption">
              Distribution of the total 1 billion $TREXION supply
            </p>

            <div
              className="token-pie"
              role="img"
              aria-label="Community 45 percent, Liquidity 35 percent, Marketing 10 percent, Team 10 percent."
            >
              <div className="token-pie-center">
                <strong>100%</strong>
                <span>TOTAL SUPPLY</span>
              </div>
            </div>

            <div className="token-legend">
              <div>
                <i className="legend-community" />
                <span>Community</span>
                <strong>45%</strong>
              </div>

              <div>
                <i className="legend-liquidity" />
                <span>Liquidity</span>
                <strong>35%</strong>
              </div>

              <div>
                <i className="legend-marketing" />
                <span>Marketing</span>
                <strong>10%</strong>
              </div>

              <div>
                <i className="legend-team" />
                <span>Team</span>
                <strong>10%</strong>
              </div>
            </div>
          </div>

          <div className="allocation-list">
            <h3>Allocation details</h3>

            <article>
              <div className="allocation-title">
                <span>
                  <i className="legend-community" />
                  Community
                </span>
                <strong>45%</strong>
              </div>

              <b>450,000,000 $TREXION</b>
              <p>Community allocation.</p>
            </article>

            <article>
              <div className="allocation-title">
                <span>
                  <i className="legend-liquidity" />
                  Liquidity
                </span>
                <strong>35%</strong>
              </div>

              <b>350,000,000 $TREXION</b>
              <p>
                Liquidity allocation. Refer to official launch
                documentation for applicable liquidity and unlock
                arrangements.
              </p>
            </article>

            <article>
              <div className="allocation-title">
                <span>
                  <i className="legend-marketing" />
                  Marketing
                </span>
                <strong>10%</strong>
              </div>

              <b>100,000,000 $TREXION</b>
              <p>Marketing allocation.</p>
            </article>

            <article>
              <div className="allocation-title">
                <span>
                  <i className="legend-team" />
                  Team
                </span>
                <strong>10%</strong>
              </div>

              <b>100,000,000 $TREXION</b>
              <p>Team allocation.</p>
            </article>
          </div>
        </div>
      </section>

      {/* HOW TO MINT */}

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
            <h3>Enable Agentic Wallet</h3>
            <p>
              Open Binance Agentic Wallet and enable Developer Mode in
              the wallet settings.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Copy the mint prompt</h3>
            <p>
              Select your quantity, copy the generated prompt and paste
              it into Agentic Wallet.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Review and confirm</h3>
            <p>
              Check the transaction preview and confirm it inside
              Agentic Wallet. Your NFTs will arrive after the transaction
              succeeds.
            </p>
          </article>
        </div>
      </section>

      {/* COLLECTION */}

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

      {/* FAQ */}

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

              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* FOOTER */}

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

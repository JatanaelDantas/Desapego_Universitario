export default function HeroSection({ adsCount }) {
  return (
    <>
      <header className="hero-section">
        <h1>Desapego Universitário</h1>
        <p>A economia circular do nosso campus. Doe o que não usa, compre o que precisa por menos.</p>
      </header>

      <section className="stats-section">
        <div className="stat-card"><h3>+500</h3><p>Alunos</p></div>
        <div className="stat-card"><h3>{adsCount}</h3><p>Itens Listados</p></div>
        <div className="stat-card"><h3>R$ 5k</h3><p>Economizados</p></div>
      </section>
    </>
  );
}
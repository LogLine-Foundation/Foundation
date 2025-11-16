import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <header>
        <div className="container">
          <Nav />
        </div>
      </header>
      <main className="container">
        <Component {...pageProps} />
      </main>
      <footer>
        <div className="container">
          <p>LogLine Foundation — Padrões abertos, provas verificáveis, governança computável.</p>
        </div>
      </footer>
    </>
  )
}

function Nav(){
  return (
    <nav>
      <a href="/">Institucional</a>
      <a href="/governanca">Governança</a>
      <a href="/padroes">Padrões</a>
      <a href="/transparencia">Transparência</a>
      <a href="/comites">Comitês</a>
      <a href="/publicacoes">Publicações</a><a href="/engenharia/logline-101">Engenharia</a>
      <a href="/politicas">Políticas</a>
      <a href="/calendario">Calendário</a>
      <a href="/contato">Contato</a>
      <a href="/transparencia/ledger">Ledger Viewer</a>
    </nav>
  )
}

export default function PeaceSeal({ ok=true, compact=false }){
  const cls = ok ? 'badge verified' : 'badge'
  const text = ok ? 'Uso Pacífico — Verificado' : 'Uso Pacífico — Pendente'
  return (
    <span className={cls} style={{display:'inline-flex', alignItems:'center', gap:6}}>
      <span aria-hidden>☮︎</span>
      {!compact && <strong>{text}</strong>}
      {compact && <span>{text}</span>}
    </span>
  )
}

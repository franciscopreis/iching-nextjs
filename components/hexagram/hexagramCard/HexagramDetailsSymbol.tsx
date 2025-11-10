type HexagramDetailsSymbolProps = {
  number: number
  unicode: string
  title?: string
  name?: string
}

// Componente que mostra o símbolo do hexagrama (número, nome, unicode)
function HexagramDetailsSymbol({
  number,
  unicode,
  title,
  name,
}: HexagramDetailsSymbolProps) {
  return (
    <>
      <h2 className="font-semibold md:text-base text-center">{title}</h2>
      <p className="text-center md:pb-0 pb:2">
        {number}. {name}
      </p>
      <p className="text-8xl md:text-9xl pb-5 text-center">{unicode}</p>
    </>
  )
}

export default HexagramDetailsSymbol

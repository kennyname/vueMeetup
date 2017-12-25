export default (value) => {
  const date = new Date(value)
  return date.toLocaleString(['en-US'], { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

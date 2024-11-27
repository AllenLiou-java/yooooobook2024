export default function (value) {
  const regex = /\B(?=(\d{3})+(?!\d))/g
  value = value.toString()
  return value.replace(regex, ',')
}

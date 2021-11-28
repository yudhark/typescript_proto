type range = 1|2|3|4|5|6|7|8|9|10|11|12
const generate_chart_data = (length: range): Array<any> => {
  const labels = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  let data: Array<any> = []
  for(let i=0; i<length; i++) {
    data.push({id: labels[i], sold: Math.floor(Math.random()*101), broken: Math.floor(Math.random()*101), return: Math.floor(Math.random()*101)})
  }
  return data
}

export {generate_chart_data}
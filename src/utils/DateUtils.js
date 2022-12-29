const pad = (n, z) => {
    z = z || 2;
    return ('00' + n).slice(-z);
}

export const secToTime = (s) => {  
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;

    let result = ''

    if (hrs != 0) result += hrs + 'ч '
    if (mins != 0) result += mins + 'м '
    if (secs != 0) result += secs + 'с '

    return result.trimEnd()
}

export const dateString = (date) => {
    let dayWord = ''
    const currentDate = new Date()
  
    const dateMinusDays = (dt, dy) => {
      const d = new Date(dt)
      d.setDate(d.getDate() - dy)
      return d
    }
  
    if (date.toDateString() == currentDate.toDateString())
      dayWord = 'Сегодня'
    else if (date.toDateString() == dateMinusDays(currentDate, 1).toDateString())
      dayWord = 'Вчера'
    else if (date.toDateString() == dateMinusDays(currentDate, 2).toDateString())
      dayWord = 'Позавчера'
    else dayWord = `${date.toLocaleDateString('ru', { month: 'long', day: 'numeric' })}`

    if (date.getFullYear() != currentDate.getFullYear()) dayWord += ' ' + date.getFullYear()
      
    return `${dayWord} в ${date.getHours()}:${pad(date.getMinutes())}`
  }
  
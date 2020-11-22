import Vue from 'vue'
import config from '../config'
import axios from 'axios'

require('halfmoon/css/halfmoon-variables.min.css')

var app = new Vue({
  el: '#main',
  data: {
    name: 'Shreesh',
    hours: new Date().getHours(),
    seconds: new Date().getSeconds(),
    minutes: new Date().getMinutes(),
    quote: {
      author: '',
      quote: '',
    },
    welcome: '',
    timer: {},
    settings: false,
    weather: {},
    location: '',
    randomQuote: false,
    settings: false,
    tempLocation: '',
    fontAP: true,
    weatherDetails: false,
    image: {},
    imageQuery: '',
    tempImageQuery: '',
    opacity: 60,
    timeout: {},
    search: '',
    searchStatus: false,
  },
  created() {
    this.getQuote()
    this.getWeather()
    let image = localStorage.getItem('image')
    let imageQuery = localStorage.getItem('imageQuery')
    if (imageQuery) {
      imageQuery = JSON.parse(imageQuery)
      this.imageQuery = imageQuery
    }
    image = JSON.parse(image)
    if (image && Date.now() - image.date < 6000000) {
      this.image = image.image
      this.setStyle()
    } else {
      this.getWallpaper()
    }
    if (this.hours >= 22 || this.hours < 4) {
      this.welcome = 'Good night'
    } else if (this.hours >= 4 && this.hours < 9) {
      this.welcome = "Rise'N Shine"
    } else if (this.hours >= 9 && this.hours < 12) {
      this.welcome = 'Good morning'
    } else if (this.hours >= 12 && this.hours < 16) {
      this.welcome = 'Good afternoon'
    } else if (this.hours >= 16 && this.hours < 22) {
      this.welcome = 'Good evening'
    }
  },
  mounted() {
    let opacity = localStorage.getItem('opacity')
    opacity = JSON.parse(opacity)
    if (opacity !== null) {
      this.opacity = opacity
    }
    var locStatus = localStorage.getItem('location')
    locStatus = JSON.parse(locStatus)
    console.log(locStatus)
    if (locStatus && locStatus !== '') {
      this.location = locStatus
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation)
    }

    var randomStatus = localStorage.getItem('randomQuote')
    randomStatus = JSON.parse(randomStatus)
    this.randomQuote = randomStatus
    document.addEventListener('keydown', this.searchFocus)
    this.timer = setInterval(() => {
      this.seconds += 1
      if (this.seconds === 60) {
        this.seconds = 0
        this.minutes += 1
        if (this.minutes === 60) {
          this.minutes = 0
          this.hours += 1
          if (this.hours === 24) {
            this.hours = 0
          }
        }
      }
    }, 1000)
  },
  computed: {
    getHours() {
      return this.hours > 9 ? this.hours : '0' + this.hours
    },
    getMinutes() {
      return this.minutes > 9 ? this.minutes : '0' + this.minutes
    },
    getSeconds() {
      return this.seconds > 9 ? this.seconds : '0' + this.seconds
    },
  },
  methods: {
    searchFocus(e) {
      if (this.settings === true) {
        console.log(this.settings)
        return
      } else if (e.keyCode <= 90 && e.keyCode >= 65) {
        if (this.searchStatus === false) {
          this.searchStatus = true
          this.search = e.key
        }
        //this.searchStatus = true
        this.$refs.searchInput.focus()
      } else if (e.keyCode == 49 && e.shiftKey === true) {
        if (this.searchStatus === false) {
          this.searchStatus = true
          this.search = '!'
        }
        this.$refs.searchInput.focus()
      } else if (e.keyCode === 27) {
        this.$refs.searchInput.blur()
        this.searchStatus = false
        this.search = ''
      } else if (e.keyCode === 13 && this.search.length > 0) {
        window.open(
          `https://duckduckgo.com?q=${encodeURIComponent(this.search)}`,
          '_self'
        )
        this.searchStatus = false
        this.search = ''
      } else {
        console.log({ e: e.keyCode })
      }
    },
    getToday() {
      let today = new Date()
      let dd = String(today.getDate()).padStart(2, '0')
      let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      let yyyy = today.getFullYear()

      today = mm + '/' + dd + '/' + yyyy
      return today
    },
    setLocation(position) {
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      console.log('location: ', this.location)
    },
    getQuote() {
      if (this.randomQuote) {
        axios
          .get('https://api.quotable.io/random')
          .then(({ data }) => {
            console.log(data)
            this.quote.quote = data.content
            this.quote.author = data.author
          })
          .catch((err) => {
            console.error(err)
          })
      } else {
        let localQuote = localStorage.getItem('quote')
        if (localQuote) {
          localQuote = JSON.parse(localQuote)
          if (localQuote.date === this.getToday()) {
            this.quote = localQuote.quote
            return
          }
        }
        axios
          .get('https://quotes.rest/qod')
          .then(({ data }) => {
            console.log(data)

            this.quote = data.contents.quotes[0]
            localStorage.setItem(
              'quote',
              JSON.stringify({
                quote: this.quote,
                date: this.getToday(),
              })
            )
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    getWeather() {
      var url
      if (typeof this.location === 'string' && this.location !== '') {
        url = `http://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${config.OWA_API_KEY}`
      } else if (typeof this.location === 'object') {
        url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.location.latitude}&lon=${this.location.longitude}&appid=${config.OWA_API_KEY}`
      } else {
        url = `http://api.openweathermap.org/data/2.5/weather?q=belgaum&appid=${config.OWA_API_KEY}`
      }
      axios
        .get(url)
        .then(({ data }) => {
          console.log(data)
          this.weather = data
        })
        .catch((err) => {
          if (
            err.response &&
            err.response.data.cod &&
            err.response.data.cod === '404'
          ) {
            alert('Your location could not be found!')
          }
          console.error(err)
        })
    },
    getRandomQuery() {
      if (this.imageQuery.length > 0) {
        let queries = this.imageQuery.split(',')
        return queries[Math.floor(Math.random() * queries.length)]
      }
    },
    getWallpaper() {
      if ((this, imageQuery !== '')) {
        localStorage.setItem('imageQuery', JSON.stringify(this.imageQuery))
      }
      var url = 'https://api.unsplash.com/photos/random'
      axios
        .get(url, {
          headers: {
            'Accept-Version': 'v1',
            Authorization: `Client-ID ${config.UNSPLASH_API_KEY}`,
          },
          params: {
            query: this.imageQuery.length > 0 ? this.getRandomQuery() : '',
          },
        })
        .then(({ data }) => {
          console.log(data.urls)
          this.image = data
          localStorage.setItem(
            'image',
            JSON.stringify({
              image: this.image,
              date: Date.now(),
            })
          )
          this.setStyle()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    setStyle() {
      if (this.image && this.image.urls && this.image.urls.regular) {
        let styleEle = document.getElementById('bgStyle')
        styleEle.innerHTML = `#bgImg::before{
                background-image: url('${this.image.urls.regular}');
            }`
      }
    },
  },
  watch: {
    location(val) {
      if (val !== '') {
        localStorage.setItem('location', JSON.stringify(val))
        this.getWeather()
      }
    },
    randomQuote(val) {
      localStorage.setItem('randomQuote', JSON.stringify(val))
      if (val) {
        this.getQuote()
      }
    },
    opacity(val) {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        localStorage.setItem('opacity', val)
      }, 200) // delay

      let bgImgStyle = document.getElementById('bgOpacity')
      if (!bgImgStyle) {
        bgImgStyle = document.createElement('style')
        bgImgStyle.setAttribute('id', 'bgOpacity')
        document.head.appendChild(bgImgStyle)
      }
      console.log(bgImgStyle)
      bgImgStyle.innerHTML = `
              #bgImg::before{
                filter: opacity(${(val / 100).toFixed(1)});
            }
            `
    },
  },
})

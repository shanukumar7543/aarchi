import axios from 'axios'
import { config } from './common'

const token = localStorage.getItem('token')
const axiosConfig = {
  headers: {
    Authorization: `bearer ${token}`,
  },
}
export const ChangeTheameMode = () => {
  const element = document.getElementById('root')
  const theme = localStorage.getItem('THEME')

  if (theme === 'dark-theme') {
    element.classList.remove('dark-theme')
    localStorage.setItem('THEME', 'light-theme')
    element.classList.add('light-theme')
  } else {
    element.classList.remove('light-theme')
    localStorage.setItem('THEME', 'dark-theme')
    element.classList.add('dark-theme')
  }
}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export const toggleSidebar = () => {
  const sidebar = document.getElementById('sidebarWrapper')
  if (sidebar.style.display !== 'block') {
    sidebar.style.display = 'block'
  } else {
    sidebar.style.display = 'none'
  }
}

export const wagmiConnectButton = () => {
  document.querySelector('.iekbcc0').getElementsByTagName('button')[0].click()
}

export const registerUserAPI = async (loginDetails) => {
  return axios.post(
    'http://20.77.73.112:5005/api/Auth/admin/register',
    loginDetails,
  )
}

export const loginUserAPI = async (userDetails) => {
  return axios.post('http://20.77.73.112:5005/api/Auth/login', userDetails)
}

export const categoryAdd = async (userDetails) => {
  return axios.post('http://20.77.73.112:5005/api/Category/add', userDetails)
}

export const categoryGet = async (userDetails) => {
  return axios.post('http://20.77.73.112:5005/api/Category/get', userDetails)
}

export const categoryDelete = async (userDetails) => {
  return axios.post('http://20.77.73.112:5005/api/Category/delete', userDetails)
}

/*** Catefories */
// add

export const saveCategoryApi = async (data) => {
  return axios.post(`${config.BASE_URL}Category/add`, data, axiosConfig)
}

export const deleteCategoryApi = async (data) => {
  return axios.post(`${config.BASE_URL}Category/delete`, data, axiosConfig)
}

export const getCategoryApi = async () => {
  return axios.post(`${config.BASE_URL}Category/get`, null, axiosConfig)
}

// abudence price
export const getAbudencePriceApi = async () => {
  return axios.get(`${config.BASE_URL}Price/globalprice`, axiosConfig)
}

// slider
export const sliderAdd = async (sliderDetails) => {
  return axios.post('http://20.77.73.112:5005/api/Slider/add', sliderDetails)
}

export const sliderGet = async (sliderDetails) => {
  return axios.post('http://20.77.73.112:5005/api/Slider/get', sliderDetails)
}

export const sliderDelete = async (sliderDetails) => {
  return axios.post('http://20.77.73.112:5005/api/Slider/delete', sliderDetails)
}

// stripe Payment

export const stripePaymentApi = async (data) => {
  return axios.post(
    `https://mvp-api.aarchik.com/public/stripe/payment/save`,
    data,
    axiosConfig,
  )
}

//Login user

export const saveLoginApi = async (data) => {
  return axios.post(`${config.BASE_URL}user/login/otp`, data, axiosConfig)
}
export const otpLoginApi = async (data) => {
  return axios.post(
    `${config.BASE_URL}user/login/otp/verify`,
    data,
    axiosConfig,
  )
}

// user

export const saveUserApi = async (data) => {
  const {
    bio,
    dreams,
    interest,
    your_affiliate_link,
    is_sponsor,
    sponsor_link,
    address,
    address1,
    address2,
    address3,
    address4,
    address5,
    streaming_keys1,
    streaming_keys2,
    streaming_keys3,
    streaming_keys4,
  } = data
  const formData = new FormData()
  formData.append('bio', bio)
  formData.append('dreams', dreams)
  formData.append('interest', interest)
  formData.append('your_affiliate_link', your_affiliate_link)
  formData.append('is_sponsor', is_sponsor)
  formData.append('sponsor_link', sponsor_link)
  formData.append('address', [address1, address2, address3, address4, address5])
  formData.append(
    'streaming_keys',
    JSON.stringify([
      streaming_keys1,
      streaming_keys2,
      streaming_keys3,
      streaming_keys4,
    ]),
  )

  return axios.post(`${config.BASE_URL}user/save`, formData, {
    headers: {
      // ...axiosConfig.headers,
      'Content-Type': 'multipart/form-data',
    },
  })
}

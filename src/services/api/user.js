import axios from 'axios'

axios.defaults.baseURL = 'https://randomuser.me/api'

export default {
  getUsers(n){
    return axios.get('/?inc=gender,name,email,picture,cell&results='+n)
      .then(response => {
        return response
      })
  }
}

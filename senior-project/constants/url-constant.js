import environment from '../environment'

url_dev = 'http://localhost:5000'
url_prod = 'https://senior-project-server.herokuapp.com'
url = environment === 'dev' ? url_dev : url_prod
console.log(url)
export default{
  url_users: url+'/users',
  url_users_profile: url+'/users/profile',
  url_login: url+'/login',
  url_sportsfield: url+'/sport-field',
}

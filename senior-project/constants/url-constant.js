import environment from '../environment'

url_dev = 'http://localhost:5000'
url_prod = 'https://senior-project-server.herokuapp.com'
url = environment === 'dev' ? url_dev : url_prod
console.log(url)
export default{
  url_users: 'https://senior-project-server.herokuapp.com/users',
  url_login: 'https://senior-project-server.herokuapp.com/login',
  url_sportsfield: 'http://senior-project-server.herokuapp.com/sport-field',
  url_users: url+'/users',
  url_login: url+'/login',
}

import React from "react";
import axios from "axios";
import qs from 'querystring';
import config from './config.json'
class App extends React.Component {
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      this.fetchToken(code);

    } else {
    window.location.href = `${config.oauth2.hostname}/${config.oauth2.tenant}${config.oauth2.authorize_path}?client_id=${config.oauth2.client_id}&response_type=${config.oauth2.response_type}&redirect_uri=${config.oauth2.redirect_uri}&scope=${config.oauth2.client_id}${config.oauth2.scope}`;

    }
  }
  fetchToken(code) {
    const url = `${config.oauth2.hostname}/${config.oauth2.tenant}${config.oauth2.token_path}`;
  const body = qs.stringify({
    client_id: config.oauth2.client_id,
    scope: config.oauth2.client_id + config.oauth2.scope,
    grant_type: config.oauth2.grant_type,
    redirect_uri: config.oauth2.redirect_uri,
    client_secret: config.oauth2.client_secret,
    code
  });
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: body,
    url
  };
  axios(options)
    .then(axiosResponse => {
      console.log('resposne---->', axiosResponse);
    })
    .catch(error => {
      console.log('error---->', error);
    });
  }
  render () {
    return <h1>Hello World</h1>;

  }
};

export default App;

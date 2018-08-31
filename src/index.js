import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'components/Layout';
import Routes from './scenes/routes.js';
import moment from 'moment';

import 'moment/locale/pt-br';
import './assets/styles/style.css';

moment.locale('pt-br');

const App = () => {
   return (
      <Layout>
         <Routes />
      </Layout>
   );
}

ReactDOM.render(<App />, document.getElementById('root'));

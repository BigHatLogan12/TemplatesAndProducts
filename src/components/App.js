import React from 'react';
import NavTabs from './CustomizedTabs';
import Typography from '@material-ui/core/Typography';

class App extends React.Component {
  render() {
    return (
      <div>
        <Typography variant='h5' gutterBottom>
          Manage Subscription
        </Typography>
        <NavTabs />
      </div>
    );
  }
}

export default App;

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: blue
  }
});

const styles = {
  card: {
    maxWidth: 270,
    minHeight: '30vh',
    display: 'inline-block',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  description: {
    fontSize: 12,
    'word-wrap': 'break-word',
    paddingLeft: 12,
    paddingRight: 12,
    'margin-bottom': '10px',
    height: '5vh'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    textAlign: 'left',
    maxHeight: '15vh'
  },
  price: {
    marginBottom: 12,
    marginTop: 12,
    height: '5vh'
  },
  buttonContainer: {
    height: '5vh',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center'
  },
  button: {
    'align-self': 'flex-end'
  },
  backgroundSelected: {
    backgroundColor: '#2196f3'
  },
  backgroundDefault: {
    backgroundColor: '#FFFFFF'
  }
};

const createBullets = props => {
  return props.features.length > 0
    ? props.features.map(feature => {
        return (
          <Typography key={feature} variant='subtitle2' gutterBottom>
            • {feature}
          </Typography>
        );
      })
    : null;
};

class CustomCard extends React.Component {
  state = {
    selected: false
  };

  toggleSelect = () => {
    const { onToggleSelect } = this.props;
    onToggleSelect(!this.state.selected);
    this.setState({ selected: !this.state.selected });
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <div
            className={
              this.state.selected
                ? classes.backgroundSelected
                : classes.backgroundDefault
            }
          >
            <Typography variant='h5' component='h2'>
              This is a title
            </Typography>
          </div>
          <Divider />
          <Typography
            className={classes.description}
            variant='subtitle1'
            gutterBottom
            align='center'
          >
            {this.props.description}
          </Typography>
          <div style={styles.bullet}>{createBullets(this.props)}</div>
          <Typography className={classes.price} variant='h5' gutterBottom>
            {this.props.price}
          </Typography>
        </CardContent>
        <CardActions className={classes.buttonContainer}>
          <React.Fragment>
            <MuiThemeProvider theme={theme}>
              <Button
                className={classes.button}
                variant='contained'
                color={this.state.selected ? 'secondary' : 'primary'}
                onClick={this.toggleSelect}
              >
                Select
              </Button>
            </MuiThemeProvider>
          </React.Fragment>
        </CardActions>
      </Card>
    );
  }
}

CustomCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomCard);

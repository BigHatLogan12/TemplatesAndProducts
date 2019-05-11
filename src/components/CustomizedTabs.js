import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from './TabContainer';
import AxiosInstance from '../api/AxiosInstance';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8'
  },
  tabsIndicator: {
    backgroundColor: '#1890ff'
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium
    },
    '&:focus': {
      color: '#40a9ff'
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3
  }
});

class CustomizedTabs extends React.Component {
  state = {
    value: 0,
    templates: [],
    products: [],
    countProducts: 0,
    countTemplates: 0
  };

  fetchTemplatesData = async term => {
    const response = await AxiosInstance.get('/templates');
    this.setState({ templates: response.data });
  };

  fetchProductsData = async term => {
    const response = await AxiosInstance.get('/products');
    this.setState({ products: response.data });
  };

  componentDidMount() {
    this.fetchTemplatesData();
  }

  handleChange = (event, value) => {
    this.setState({ value: value, countProducts: 0, countTemplates: 0 });
    value === 0 ? this.fetchTemplatesData() : this.fetchProductsData();
  };

  updateCountProducts = selected => {
    selected
      ? this.setState({ countProducts: this.state.countProducts + 1 })
      : this.setState({ countProducts: this.state.countProducts - 1 });
  };

  updateCountTemplates = selected => {
    selected
      ? this.setState({ countTemplates: this.state.countTemplates + 1 })
      : this.setState({ countTemplates: this.state.countTemplates - 1 });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={`Products(${this.state.countProducts})`}
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={`Templates(${this.state.countTemplates})`}
          />
        </Tabs>
        {value === 0 ? (
          <TabContainer
            updateParentCountTemplates={this.updateCountProducts}
            tab={value}
            templates={this.state.templates}
          />
        ) : (
          <TabContainer
            updateParentCountProducts={this.updateCountTemplates}
            tab={value}
            products={this.state.products}
          />
        )}
      </div>
    );
  }
}

CustomizedTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedTabs);

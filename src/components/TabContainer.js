import React from 'react';
import CustomCard from './CustomCard';

const cStyles = {
  parent: {
    display: 'inline-block',
    textAlign: 'center',
    width: '-webkit-fill-available',
    marginLeft: '15%',
    marginRight: '15%'
  }
};

class TabContainer extends React.Component {

  updateCounterProducts = selected => {
    const { updateParentCountProducts } = this.props;
    updateParentCountProducts(selected);
  };

  updateCounterTemplates = selected => {
    const { updateParentCountTemplates } = this.props;
    updateParentCountTemplates(selected);
  };

  renderTab = props => {
    switch (props.tab) {
      case 0: {
        return props.templates.length > 0
          ? props.templates.map(template => {
              return (
                <CustomCard
                  onToggleSelect={this.updateCounterTemplates}
                  key={template._id}
                  description={template.description}
                  features={template.features}
                  price={template.price}
                />
              );
            })
          : null;
      }
      case 1: {
        return props.products.length > 0
          ? props.products.map(product => {
              return (
                <CustomCard
                  onToggleSelect={this.updateCounterProducts}
                  key={product._id}
                  description={product.description}
                  features={product.features}
                  price={product.price}
                />
              );
            })
          : null;
      }
      default:
        return null;
    }
  };

  render() {
    return <div style={cStyles.parent}>{this.renderTab(this.props)}</div>;
  }
}

export default TabContainer;

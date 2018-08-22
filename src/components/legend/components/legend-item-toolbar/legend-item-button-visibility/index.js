import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

// Components
import Icon from 'components/icon';

// Tooltip
import Tooltip from 'components/tooltip';

// Styles
import styles from '../styles-button.scss';

class LegendItemButtonVisibility extends PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object,
    visibility: PropTypes.bool,
    tooltipOpened: PropTypes.bool,
    onChangeVisibility: PropTypes.func,
    iconShow: PropTypes.string,
    iconHide: PropTypes.string,
    focusStyle: PropTypes.object,
    defaultStyle: PropTypes.object,
    tooltipText: PropTypes.string
  }

  static defaultProps = {
    activeLayer: {},
    visibility: true,
    tooltipOpened: false,
    iconShow: '',
    iconHide: '',
    focusStyle: {},
    defaultStyle: {},
    tooltipText: '',

    onChangeVisibility: () => {}
  }

  state = {
    visible: false
  }

  render() {
    const { activeLayer, visibility, tooltipOpened, iconShow, iconHide, focusStyle, defaultStyle, tooltipText } = this.props;
    const { visible } = this.state;

    const showIcon = iconShow || 'icon-show';
    const hideIcon = iconHide || 'icon-hide';
    const activeIcon = visibility ? hideIcon : showIcon;

    return (
      <Tooltip
        overlay={tooltipText || (visibility ? 'Hide layer' : 'Show layer')}
        overlayClassName="c-rc-tooltip -default"
        placement="top"
        trigger={tooltipOpened ? '' : 'hover'}
        mouseLeaveDelay={0}
        destroyTooltipOnHide
        onVisibleChange={v => this.setState({ visible: v })}
        visible={visible}
      >
        <button
          type="button"
          styleName="c-legend-button toggle"
          onClick={() => this.props.onChangeVisibility(activeLayer, !visibility)}
          aria-label="Toggle the visibility"
        >
          <Icon name={activeIcon} className="-small" style={visible ? focusStyle : defaultStyle} />
        </button>
      </Tooltip>
    );
  }
}

export default CSSModules(LegendItemButtonVisibility, styles, { allowMultiple: true });
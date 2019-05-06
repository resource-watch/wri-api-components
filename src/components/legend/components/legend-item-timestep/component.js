import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import moment from 'moment';

// components
import Icon from 'components/icon';
import Slider from 'components/slider';
// import Datepicker from 'components/datepicker';

// styles
import './styles.scss';

class Timeline extends PureComponent {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    handleTogglePlay: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    trim: PropTypes.number.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    handleOnAfterChange: PropTypes.func.isRequired,
    marks: PropTypes.shape({}).isRequired,
    formatDateString: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    canPlay: PropTypes.bool.isRequired,
    customClass: PropTypes.string,
    trackStyles: PropTypes.shape({})
  }

  static defaultProps = {
    customClass: null,
    trackStyles: {}
  }

  render() {
    const {
      isPlaying,
      handleTogglePlay,
      min,
      max,
      start,
      end,
      trim,
      handleOnChange,
      handleOnAfterChange,
      marks,
      formatDateString,
      step,
      canPlay,
      customClass,
      trackStyles
    } = this.props;

    const externalClass = classnames({
      'wri_api__can-play': canPlay,
      [customClass]: !!customClass
    });
    const sliderClass = classnames(
      'wri_api__range',
      { 'wri_api__can-play': canPlay }
    );
    const iconStatus = classnames({
      'icon-pause2': isPlaying,
      'icon-play3': !isPlaying
    });

    return (
      <div
        styleName="c-timestep"
        className={externalClass}
      >
        <div styleName="range-slider">
          {canPlay && (
            <button
              type="button"
              styleName="player-btn"
              onClick={handleTogglePlay}
            >
              <Icon name={iconStatus} />
            </button>
          )}
          <Slider
            range
            className="wri_api__slider-timestep"
            customClass={sliderClass}
            marks={marks}
            disabled={isPlaying}
            min={min}
            max={max}
            value={canPlay ? [start, end, trim] : [start, end]}
            step={step}
            onChange={handleOnChange}
            onAfterChange={handleOnAfterChange}
            formatValue={formatDateString}
            trackStyle={trackStyles}
            showTooltip={index => isPlaying && index === 1 && trim !== end}
            pushable
            count={2}
          />
        </div>
      </div>
    );
  }
}

export default Timeline;

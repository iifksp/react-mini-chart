import React from 'react'
import PropTypes from 'prop-types';

class MiniChart extends React.Component {
  constructor() {
    super();
    this.points = [];
    this.state = {
      aIdx: -1
    }
  }

  handleMouseMove = (e) => {
    let mx = e.nativeEvent.offsetX;
    const span = this.props.width / (this.props.dataSet.length - 1);
    const offset = Math.floor(span / 2);
    let idx = -1;
    for (let i = 0; i < this.points.length; i++) {
      if (mx < this.points[i].x + offset && mx > this.points[i].x - offset) {
        idx = i;
        break;
      }
    }
    if (idx >= 0) {
      this.setState({ aIdx: idx });
    }
  };

  handleMouseLeave = () => {
    this.setState({ aIdx: -1 });
  };

  render() {
    const {
      dataSet,
      width,
      height,
      strokeColor,
      strokeWidth,
      padding,
      activePointRadius,
      activePointColor,
      labelFontSize,
    } = this.props;

    const edgeFactor = Math.max(Math.ceil(strokeWidth / 2), activePointRadius);
    const len = dataSet.length;
    const max = len > 0 ? dataSet.reduce(function (a, b) {
      return Math.max(a, b);
    }) : 0;

    const min = len > 0 ? dataSet.reduce(function (a, b) {
      return Math.min(a, b);
    }) : 0;

    const paddingNum = `${padding}`.indexOf('%') >= 0 ? (parseInt(padding) / 100) * height : padding;
    const pointsY = dataSet.map(function (val) {
      return height - (Math.round((( val - min) / (max - min)) * (height - paddingNum * 2)) + paddingNum);
    });

    this.points = [];

    for (let i = 0; i < len; i++) {
      // calculate each pointX
      let pointX = edgeFactor + Math.round(i * ((width - edgeFactor * 2) / (len - 1)));

      // store all point pairs
      this.points.push({ x: pointX, y: pointsY[i] });
    }

    // compose polyline points param
    const param = this.points.map(function (elm) {
      return (elm.x + ',' + elm.y)
    }).join(' ');

    const polyline =
      <polyline
        style={{ transition: 'all 0.3s' }}
        points={param}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />;

    const viewBox = '0 0 ' + width + ' ' + height;

    const activePoint = this.state.aIdx >= 0 ?
      <circle
        fill={activePointColor}
        cx={this.points[this.state.aIdx].x}
        cy={this.points[this.state.aIdx].y}
        r={activePointRadius} /> : '';

    const tip = this.state.aIdx >= 0 ?
      <span
        style={{
          fontSize: labelFontSize,
          border: '1px solid #ddd',
          lineHeight: '1.2',
          padding: `0 ${labelFontSize / 5}px`,
          borderRadius: 1,
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(255,255,255, 0.8)',
          color: strokeColor,
          position: 'absolute',
          userSelect: 'none',
          top: this.points[this.state.aIdx].y - (labelFontSize * 1.3) - activePointRadius,
          left: this.points[this.state.aIdx].x
        }}>
        {this.props.dataSet[this.state.aIdx]}
      </span>
      :
      '';

    return (
      <div
        style={{
          display: 'inline-block',
          position: 'relative'
        }}
        onMouseLeave={this.handleMouseLeave}
      >
        <svg
          onMouseMove={this.handleMouseMove}
          style={{ transition: 'all 0.3s', display: 'block' }}
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox={viewBox}
        >
          {polyline}
          {activePoint}
        </svg>
        {tip}
      </div>
    )
  }
}

MiniChart.defaultProps = {
  dataSet: [],
  width: 200,
  height: 50,
  strokeColor: '#039BE5',
  strokeWidth: 2,
  padding: '15%',
  activePointRadius: 3,
  labelFontSize: 11,
  activePointColor: '#039BE5',
};

MiniChart.propTypes = {
  dataSet: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  padding: PropTypes.string,
  activePointRadius: PropTypes.number,
  activePointColor: PropTypes.string,
  labelFontSize: PropTypes.number,
};

export default MiniChart;

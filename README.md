# react-mini-chart
Simple react mini line chart using SVG

## Install
```
npm install react-mini-chart
```

## Usage

default
```
<MiniChart dataSet={[0, -20, 343, 49.3, -100, 200, 78]}/>
```

custom
```
<MiniChart
  strokeColor="#FF6600"
  activePointColor="#FF6600"
  activePointRadius={8}
  strokeWidth={5}
  labelFontSize={50}
  width={500}
  height={100}
  dataSet={[0, -20, 343, 49.3, -100, 200, 78]}
/>
```

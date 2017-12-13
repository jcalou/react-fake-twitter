import React from 'react';
import ReactPoint from 'react-point';
import ReactDOM from 'react-dom';

const PointTarget = ReactPoint.PointTarget

export class CalculatorKey extends React.Component {
  render() {
    const { onPress, className, ...props } = this.props

    return (
      <PointTarget onPoint={onPress}>
        <button className={`calculator-key ${className}`} {...props}/>
      </PointTarget>
    )
  }
}

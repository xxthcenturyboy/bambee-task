import React, { PureComponent } from 'react';

import * as UI from './UI';

interface Props {
  variant?: string;
  color?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  children: any;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  style?: Object;
  className?: string;
}

class Button extends PureComponent<Props, {}> {
  render() {
    const {
      children,
      variant,
      color,
      onClick
    } = this.props;

    const disabled = this.props.disabled || false;
    const fullWidth = this.props.fullWidth || false;

    const ButtonVariants = {
      outline: UI.OutlineButton
    };

    return (
      <UI.Button
        className={this.props.className}
        style={this.props.style}
        color={color}
        disabled={disabled}
        fullWidth={fullWidth}
        onClick={onClick}
        as={variant && ButtonVariants[variant]}
      >
        {children}
      </UI.Button>
    );
  }
}

export default Button;

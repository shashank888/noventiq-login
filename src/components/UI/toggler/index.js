import React from 'react';
import "./style.css"

const Toggler = ({isChecked,onChange}) => {
    return (
        <div class="ant-switch">
        <input
          type="checkbox"
          id="remember-me"
          class="ant-switch-input"
          checked={isChecked}
          onChange={onChange}
        />
        <label for="remember-me" class="ant-switch-label">
          <span class="ant-switch-inner"></span>
          <span class="ant-switch-handler"></span>
        </label>
      </div>
    );
}

export default Toggler;

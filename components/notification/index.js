import React from 'react';
import PropTypes from 'prop-types';
import { ToastNotification } from '@carbon/react';
import './styles.scss'
function Notifications({ kind, caption, timeout, title, subtitle }) {
  return (
    <div className="toast-container">
      <ToastNotification
        kind={kind}
        role="status"
        caption={caption}
        timeout={timeout}
        title={title}
        subtitle={subtitle}
      />
    </div>
  );
}

Notifications.propTypes = {
  kind: PropTypes.string.isRequired,
  caption: PropTypes.string,
  timeout: PropTypes.number,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

Notifications.defaultProps = {
  caption: 'From Medlink',
  // timeout: 3000,
};

export default Notifications;

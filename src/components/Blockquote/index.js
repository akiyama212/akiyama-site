import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import defaultTheme from '../../theme';
import { capitalize } from '../../helpers';

const useStyles = makeStyles(
  theme => ({
    root: ({ blockColor, blockWidth, blockPadding, blockMargin, blockSide }) => {
      const {
        primary: { main: primary },
        secondary: { main: secondary },
        text: { primary: textPrimary, secondary: textSecondary }
      } = theme.palette;
      const color = {
        primary,
        secondary,
        textPrimary,
        textSecondary
      };

      return {
        [`border${capitalize(blockSide)}`]: `${theme.spacing(blockWidth)}px solid ${
          color[blockColor]
        }`,
        padding: `1rem ${theme.spacing(blockPadding)}px`,
        margin: `${theme.spacing(blockMargin)}px 0`
      };
    }
  }),
  { defaultTheme }
);

const Blockquote = ({ children, dangerouslySetInnerHTML, ...props }) => {
  const classes = useStyles(props);

  return (
    <blockquote
      className={classes.root}
      {...(!!dangerouslySetInnerHTML ? { dangerouslySetInnerHTML } : {})}
    >
      {children}
    </blockquote>
  );
};

Blockquote.propTypes = {
  blockColor: PropTypes.oneOf(['primary', 'sencondary', 'textPrimary', 'textSecondary']),
  blockWidth: PropTypes.number,
  blockPadding: PropTypes.number,
  blockMargin: PropTypes.number,
  blockSide: PropTypes.oneOf(['left', 'right'])
};

Blockquote.defaultProps = {
  blockColor: 'primary',
  blockWidth: 1,
  blockPadding: 5,
  blockMargin: 1,
  blockSide: 'left'
};

export default Blockquote;

import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     imgSRC: '',
  //   };
  // }

  hashGravatar = () => {
    const { email } = this.props;
    // console.log(email);
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return url;
    // this.setState({ imgSRC: url });
  };

  render() {
    const { name, score } = this.props;
    // const { imgSRC } = this.state;
    return (
      <div>
        <header>
          <img
            src={ this.hashGravatar() }
            alt={ `Avatar do ${name}` }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);

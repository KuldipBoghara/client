import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  //state = { isSignedIn: null };

  componentDidMount() {
    //.load only provide us the notification/signal when process id complete by passing call back function
    window.gapi.load('client:auth2', () => {
      //we don't need callback function with init because it returns a promise/object after the libe has succesfully intialize
      window.gapi.client
        .init({
          clientId:
            '320035607234-1q3uc8evj620j8l4vqi2gc71q41opqr3.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          //this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.onAuthChange(this.auth.isSignedIn.get()); //we can also use this insted of upper line for intialization
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    //this.setState({ isSignedIn: this.auth.isSignedIn.get() });

    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  /* If we put the () while calling the methods (ex. onClick={this.onSignOut()}) 
  then it will automatically call when we first render the component*/

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui blue google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

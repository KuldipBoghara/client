import React from 'react';
import { Field, reduxForm } from 'redux-form';
// Field is a react component which we will show on the screen
//reduxForm is a function (same as connect function from react-redux)

class StreamCreate extends React.Component {
  render() {
    return (
      <form>
        {/* we use Field component whenever we want to show any fields (checkbox, button, texbox, etc) into the screen */}
        <Field name="title" />
        <Field name="description" />
      </form>
    );
  }
}

export default reduxForm({
  form: 'StreamCreate'
})(StreamCreate);

//As first argument in reduxForm is a form object with the name of the form

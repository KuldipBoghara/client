import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// Field is a react component which we will show on the screen
//reduxForm is a function (same as connect function from react-redux)

import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  //error and touched are the property of the meta whitch is from redux-form
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error mesage">
          <div className="=header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    // console.log(meta);
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      /* New sytex for input element*/
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>

      /*renderInput(formProps) {
      return (  
        <input
        onChange={formProps.input.onChange}
        value={formProps.input.value}
      /> */
    );
  };
  /*New sysntex without object desctructure
    renderInput(formProps) {
      return <input {...formProps.input} />;    }
  */

  //onSubmit will call with formProps (values of Field given by users) instead of event
  //value of formValues will be the data which is entered by users when submiting the form
  onSubmit = (formValues) => {
    //When we call onSubmit using handleSubmit, it will automatic receive event object and calls preventDefault fun
    //event.preventDefault();
    //console.log(formValues);
    this.props.createStream(formValues);
  };

  render() {
    //handleSubmit is the inbuilt callback-function of reduxForm
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        {/* we use Field component whenever we want to show any fields (checkbox, button, texbox, etc) into the screen */}
        {/* Field only connect all the stuf of redux-for, to show the element on screen we have customize it */}
        {/* Field component does not requre label prop so it will transfer it to the renderInput fun */}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'Must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'Must enter a description';
  }

  return errors;
};

/* First way to use both connect and reduxform together
 export default connect() (reduxForm({
  form: 'StreamCreate',
  validate: validate
})(StreamCreate)); */

//Second way
const formWrapped = reduxForm({
  form: 'StreamCreate',
  validate: validate
})(StreamCreate);
//As first argument in reduxForm is a form object with the name of the form

export default connect(null, { createStream })(formWrapped);

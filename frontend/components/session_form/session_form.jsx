import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    if (props.match.path === "/login") {
      this.state = {username: "", password: ""};
    } else {
      this.state = {username: "", password: "", email: ""};
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.escapeHandle = this.escapeHandle.bind(this);
    this.demoHandleSubmit = this.demoHandleSubmit.bind(this);
    this.usernames = ["Demo_User", "Demo_User_2", "Demo_User_3", "Demo_User_4", "Demo_User_5", "Demo_User_6", "Demo_User_7"];
    this.password = "password".split("");
  }

  update(field) {
    return e => this.setState(
      {[field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  demoHandleSubmit(e) {
    e.preventDefault();
    let username = this.usernames[Math.floor((Math.random() * 7))];
    this.demoType(username.split(""), this.password);
  }

  demoType(username,password){
    window.setTimeout(() => {
      if (username.length !== 0){
        this.setState({username: this.state.username + username.shift()});
        this.demoType(username,password);
      } else if (password.length !== 0) {
        this.setState({password: this.state.password + password.shift()});
        this.demoType(username,password);
      } else {
        this.props.action(this.state);
      }
    }, 100);
  }

  renderErrors() {
    return(
      <ul className="errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  componentDidMount(){
    this.usernameInput.focus();
    document.addEventListener("keydown", this.escapeHandle);
  }

  escapeHandle(event){
    switch ( event.keyCode ) {
      case 27:
        this.props.history.push("/");
        break;
      default:
        break;
    }
  }

  componentWillUnmount(){
    this.props.receiveErrors([]);
    document.removeEventListener("keydown", this.escapeHandle);
  }

  render(){
    let formName = this.props.match.path === "/login" ? "Sign In" : "Sign Up";
    return (
      <div className="modal">
      <Link to={"/"} className="exit-button">
        <div className="modal-shade">
        </div>
      </Link>


        <div className="modal-form animated fadeInDown">
          <div className="modal-form-content">
          {this.renderErrors()}
          <form onSubmit={this.handleSubmit}>

            <div className="banner">
              <div className="banner-text">LOUDFOG</div>

            {
              (formName === "Sign In") ?

              <div className="banner-text welcome">
                <br></br>
                Welcome Back
              </div> : null
            }
            </div>


              <input type="text"
                className="auth-input"
                ref={(input) => {this.usernameInput = input; }}
                onChange={this.update("username")}
                value={this.state.username}
                placeholder="Username" />

              {
               (formName === "Sign Up") ?
                  <input type="text"
                    className="auth-input"
                    onChange={this.update("email")}
                    value={this.state.email}
                    placeholder="Email" />
              : null
            }

              <input type="password"
                onChange={this.update("password")}
                value={this.state.password}
                className="auth-input password"
                placeholder="Password" />

          <div className="button-container">
            <input type="submit"
               value={formName}
               className={`auth-submit ${formName}`} />

             {
               (formName === "Sign In") ?
               <button className="auth-submit guest"
                 onClick={this.demoHandleSubmit}>
                 Guest
               </button>
               : null
             }
             </div>
          </form>
          </div>
        </div>
    </div>
    );
  }
}

export default withRouter(SessionForm);

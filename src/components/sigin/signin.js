import React from 'react';
import { render } from 'react-dom';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SigninEmail: '',
            SigninPassword: '',
            erroror: false
        }
    }
    onEmailchange = (event) => {
        this.setState({ SigninEmail: event.target.value });
        this.setState({ erroror: false });
    }
    onPasswordChange = (event) => {
        this.setState({ SigninPassword: event.target.value });
        this.setState({ erroror: false });
    }

    onSubmitSignIn = () => {
        //console.log(this.state);
        fetch(' https://fathomless-plateau-82518.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.SigninEmail,
                password: this.state.SigninPassword
            })
        }).then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.Loaduser(user);
                    this.props.onRouteChange('home');
                }
                else {
                    this.setState({ erroror: true });
                }
            })

    }
    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-500 w-50-m w-25-l  shadow-3 mw5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailchange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"
                                onClick={this.onSubmitSignIn} />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('signup')} className="f6 link dim black db pointer">Sign up</p>

                        </div>
                        {this.state.erroror === true ?
                            <div> <h4 className="dark-red" >INVALID CREDENTIALS </h4></div>
                            : <div></div>
                        }
                    </div>
                </main>
            </article>

        )
    }
}


export default Signin;
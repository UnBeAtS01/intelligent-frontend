import React from 'react';

class Signout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',

        }
    }
    onNamechange = (event) => {
        this.setState({ name: event.target.value });

    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value });

    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });

    }
    onSignup = (event) => {
        //console.log(this.state);
        fetch(' https://fathomless-plateau-82518.herokuapp.com/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        }).then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.Loaduser(user);
                    this.props.onRouteChange('home');
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
                            <legend className="f1 fw6 ph0 mh0">Register</legend>

                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" for="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="email-address"
                                    id="Name"
                                    onChange={this.onNamechange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" for="Email">Email</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="Email"
                                    id="Email"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" for="Email">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>

                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                                value="Sign in"
                                onClick={this.onSignup} />
                        </div>

                    </div>
                </main>
            </article>

        );
    }

}
export default Signout;
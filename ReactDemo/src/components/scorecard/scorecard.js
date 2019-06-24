import React, { Component } from 'react';
import './scorecard.css'
import withAuth from '../services/withAuth';
import Autosuggest from 'react-autosuggest';
import AuthService from '../services/AuthService';
import HeaderComponent from '../nav/nav'
import ViewScorecardComponent from './view-scorecard/view-scorecard';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CreateScorecardComponent from './create-scorecard/create-scorecard';
class ScoreCardComponent extends Component {
    constructor() {
        super();
        this.state = {
            suggestions: [],
            value: '',
            selectedRiskType: 'qualitative',
            viewscorecardFlag: false,
            selectedOption: null,
            createScorecardFlag: false
        };
        this.Auth = new AuthService();
        this.token = localStorage.getItem('id_token');
        this.handleAuthorization = this.handleAuthorization.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        this.Auth.logout();
        this.props.history.replace('/login');
    }
    handleAuthorization = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    getSuggestionValue(suggestion) {
        this.setState({
            selectedOption: suggestion

        }, () => { console.log(this.state.selectedOption) })
        return suggestion.value
    };
    onSuggestionsFetchRequested = ({ value }) => {
        console.log(value);
        if (value.length > 3) {
            if (this.token) {
                console.log(value);
                this.Auth.getSearchResult(value, this.state.selectedRiskType).then(result => {
                    if (result.status === 200) {
                        this.setState({
                            suggestions: getSuggestions(value, result.data)
                        });
                    }

                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status === 401) {
                            this.handleAuthorization();
                        } else {
                            console.log(error);
                        }
                    }
                });
            }
        }
    };
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };
    handleView(event) {
        event.preventDefault();
        this.setState({
            viewscorecardFlag: true
        }, () => {
            console.log(this.state);
        })
    }
    handleCreateScorecard(event) {
        event.preventDefault();
        this.setState({createScorecardFlag: true});
    }
    render() {
        const { value, suggestions } = this.state;
        let inputProps;
        inputProps = {
            placeholder: "Search Risk Factor's",
            value,
            onChange: this.onChange,
            disabled: false
        }
        if (this.state.viewscorecardFlag) {
            return <ViewScorecardComponent selectedScorecard={this.state.selectedOption} />;
        } else if(this.state.createScorecardFlag){
            return <CreateScorecardComponent/>
        } else {
            return (
                <div className="container-fluid">
                    <HeaderComponent loggedIn={this.state.loggedIn} navigationCallback={this.navigationCallback} />
                    <div className="scorecard-search">
                        <h3> Scorecard</h3>
                        <div className="form-group row score-title">
                            <div className="col-md -2 col-sm-2">
                                <label htmlFor="title" className="score-bar"><strong>Search</strong></label>
                            </div>
                            <div className="col-md-10 col-lg-10 col-sm-10 search-bar">
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={(event) => this.getSuggestionValue(event)}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}
                                />
                            </div>
                        </div>
                        <div className="row score-buttons">
                            <div className="col-md-2 col-sm-2 col-lg-2">
                                <button className="btn btn-type1" onClick={(event) => this.handleView(event)} disabled={!this.state.selectedOption}>View details</button>
                            </div>
                            <div className="col-md-2 col-sm-2 col-lg-2">
                                <button className="btn btn-type1" onClick={(event) => this.handleCreateScorecard(event)}>Create Scorecard</button>
                            </div>
                        </div>
                    </div>
                    <a color="danger" onClick={this.toggle}>{this.props.buttonLabel}</a>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Authorization Error 401</ModalHeader>
                        <ModalBody>
                            Authorization Error Click Next to Logout
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleLogout}>Logout</Button>{' '}
                            {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
                        </ModalFooter>
                    </Modal>
                </div>
            );
        }
    }
}
const getSuggestions = (value, result) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : result.filter(result =>
        result.value.toLowerCase().slice(0, inputLength) === inputValue
    );
};
const renderSuggestion = suggestion => (
    <div>
        {suggestion.value}
    </div>
);
export default withAuth(ScoreCardComponent);
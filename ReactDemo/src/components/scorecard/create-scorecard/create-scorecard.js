import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import AuthService from '../../services/AuthService';
class CreateScorecardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            value: '',
            nonFinancialSearch: [],
            selectedRiskType: 'qualitative'
        }
        this.financialSearch = []
        this.financialList = null
        this.Auth = new AuthService();
        this.token = localStorage.getItem('id_token');
    }
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    handleFinancialChange (event) {
        console.log(event.target.value);
    }
    getSuggestionValue(suggestion) {
        this.setState({
            selectedOption: suggestion

        }, () => {
            this.financialSearch.push(this.state.selectedOption);
            console.log(this.financialSearch);
            this.financialList = this.financialSearch.map(p => {
                console.log(p);
                return (
                    <tr className="grey2" key={p.id} >
                        <td className="grey1" key={p.id + 'td'}>
                            {p.value}
                        </td>
                        <td className="grey1" key={p.id + 'td1'}>
                            <input type="text" name= {p.value} onChange={(event) => this.handleFinancialChange(event)} />
                        </td>

                    </tr>
                );
            });
        });
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
    render() {
        const { value, suggestions } = this.state;
        let inputProps;
        inputProps = {
            placeholder: "Search Risk Factor's",
            value,
            onChange: this.onChange,
            disabled: false
        }
        return (
            <div className="container-fluid">
                <div className="create-score">
                    <h3>Scorecard</h3>
                    <form>
                        <div className="row score">
                            <div className="col-md-6 col-sm-6 col-lg-6">
                                <div className="row">
                                    <span className="score-columns"><strong>Name Of Scorecard</strong></span>
                                </div>
                                <div className="row">
                                    <span className="score-columns"><strong>Applicable To</strong></span>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-lg-6">
                                <div className="row form-group">
                                    <input className="form-control" type="text" />
                                </div>
                                <div className="row form-group">
                                    <input className="form-control" type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="row financial-factors">
                            <div className="col-md-6 col-sm-6 col-lg-6">
                                <div className="row">
                                    <span className="score-columns"><strong>Financial Factors</strong></span>
                                </div>
                                <div className="row">
                                    <Autosuggest id="financialSearch"
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                        getSuggestionValue={(event) => this.getSuggestionValue(event)}
                                        renderSuggestion={renderSuggestion}
                                        inputProps={inputProps}
                                    />
                                </div>
                                <div className="financial-risk">
                                    <div className="row" >
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Factor</th>
                                                    <th>Weight</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.financialList}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-lg-6">
                                <div className="row">
                                    <span className="score-columns"><strong>Risk Grades</strong></span>
                                </div>
                                <div className="risk-grade">
                                    <div className="row primary-columns">
                                        <div className="col-md-4 col-lg-4 col-sm-4 score-range">
                                            <strong>Score Range</strong>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-3 grade-name">
                                            <strong>Grade</strong>
                                        </div>
                                        <div className="col-md-5 col-lg-5 col-sm-5 grade-desc">
                                            <strong>Grade</strong>
                                        </div>
                                    </div>
                                    <table className="table table-bordered risk-table">
                                        <thead>
                                            <tr>
                                                <th>Min</th>
                                                <th>Max</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>PD</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
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
export default CreateScorecardComponent;